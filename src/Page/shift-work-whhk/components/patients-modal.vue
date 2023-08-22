<template>
  <SweetModal
    ref="modal"
    title="请选择交班病人"
    :modal-width="900"
  >
    <div class="container">
      <div class="group">
        <div class="title">当前在床：</div>
        <div class="items" v-if="groups['当前在床']">
          <div class="item" v-for="item of groups['当前在床']" :key="item.key">
            <ElCheckbox
              :disabled="selectedKeys.includes(item.key)"
              :value="selectedKeys.includes(item.key) || isChecked(item)"
              @change="onCheckChange($event, item)"
            >
              {{item.bedLabel}} {{item.name}}{{item.patientStatus ? `（${item.patientStatus}）` : ''}}
            </ElCheckbox>
          </div>
        </div>
        <div class="empty" v-else>
          暂无
        </div>
      </div>
      <div class="group">
        <div class="title">他科借床：</div>
        <div class="items" v-if="groups['他科借床']">
          <div class="item" v-for="item of groups['他科借床']" :key="item.key">
            <ElCheckbox
              :disabled="selectedKeys.includes(item.key)"
              :value="selectedKeys.includes(item.key) || isChecked(item)"
              @change="onCheckChange($event, item)"
            >
              {{item.bedLabel}} {{item.name}}{{item.patientStatus ? `（${item.patientStatus}）` : ''}}
            </ElCheckbox>
          </div>
        </div>
        <div class="empty" v-else>
          暂无
        </div>
      </div>
      <div class="group">
        <div class="title">已出院\已转出：</div>
        <div class="items" v-if="groups['已出院\已转出']">
          <div class="item" v-for="item of groups['已出院\已转出']" :key="item.key">
            <ElCheckbox
              :disabled="selectedKeys.includes(item.key)"
              :value="selectedKeys.includes(item.key) || isChecked(item)"
              @change="onCheckChange($event, item)"
            >
              {{item.bedLabel}} {{item.name}}{{item.patientStatus ? `（${item.patientStatus}）` : ''}}
            </ElCheckbox>
          </div>
        </div>
        <div class="empty" v-else>
          暂无
        </div>
      </div>
    </div>
    <div class="footer" slot="button">
      <div class="left">
        <ElCheckbox
          :disabled="!patients"
          :value="patients.length === selectedItems.length"
          @change="onCheckAll"
        >全部
        </ElCheckbox>
        <ElCheckbox
          v-for="item in statusList"
          :key="item.label"
          :disabled="!groups[item.value]"
          :value="isAllCheck(item.value)"
          @change="onCheckStatus($event, item.value)"
        >{{ item.label }}
        </ElCheckbox>
      </div>
      <div class="right">
        <ElButton @click="onClose">取消</ElButton>
        <ElButton type="primary" @click="onConfirm">保存</ElButton>
      </div>
    </div>
  </SweetModal>
</template>

<script>
  import common from '@/common/mixin/common.mixin.js'
  import { groupBy } from 'lodash'

  import * as apis from '../apis'
  import Button from './button'

  export default {
    mixins: [common],
    data: () => ({
      patients: [],
      selectedKeys: [],
      selectedItems: [],
      groups: {},
      statusList: [
        { label: '新入', value: '新' },
        { label: '转入', value: '转入' },
        { label: '今手', value: '今手' },
        { label: '明手', value: '明手' },
        { label: '明出', value: '明出' },
        { label: '病重', value: '病重' },
        { label: '病危', value: '病危' },
        { label: '出院', value: '出院' },
      ]
    }),
    methods: {
      open ({
        deptCode,
        date,
        id,
        selectedKeys
      }) {
        this.patients = []
        this.selectedItems = []
        this.groups = {}
        this.selectedKeys = selectedKeys
        this.$refs.modal.open()
        this.loadPatients(deptCode, date, id)
      },
      close () {
        this.$refs.modal.close()
      },
      onClose () {
        this.close()
      },
      onConfirm () {
        this.$emit('confirm', this.selectedItems)
      },
      async loadPatients (deptCode, date, id) {
        const { data } = await apis.listPatients(deptCode, date, id)
        const patients = data.data.map((p) => ({
          ...p,
          key: p.patientId + '//' + p.visitId,
          // statusList: p.patientStatus.split('、'),
          background: p.background !== ',' && p.background !== '，' ? p.background : ''
        }))

        const groups = groupBy(patients, 'patientType')
        const status = ['新', '转入', '今手', '明手', '明出', '病重', '病危', '出院']
        if (groups['出院']) {
          const {'出院': arr2 = []} = groups
          groups['已出院\已转出'] = [...arr2].filter(item => this.selectedKeys.includes(item.key))
        }
        this.patients = patients.filter((p) => !this.selectedKeys.includes(p.key))
        status.forEach((s) => {
          const group = this.patients.filter((p) => p.patientStatus.split('、').includes(s))
          groups[s] = group.length ? group: undefined
        })

        if (groups['转出'] || groups['出院']) {
          const {'转出': arr1 = [], '出院': arr2 = []} = groups
          groups['已出院\已转出'] = groups['已出院\已转出'] && groups['已出院\已转出'].length
            ? [...groups['已出院\已转出'], ...arr1, ...arr2]
            : [...arr1, ...arr2]

          delete groups['转出']
          // delete groups['出院']
        }
        if (groups['新'] || groups['新入']) {
          const {'新': arr1 = [], '新入': arr2 = []} = groups
          groups['新'] = [...arr1, ...arr2]

          delete groups['新入']
        }
        this.groups = groups
      },
      isChecked (item) {
        return !!this.selectedItems.find((i) => i === item)
      },
      isAllCheck (status) {
        const all = this.groups[status] || []
        const selected = this.selectedItems.filter((p) => p.patientStatus.split('、').includes(status))

        return all.length && all.length === selected.length
      },
      onCheckChange (e, item) {
        const checked = e.target.checked
        this.selectedItems = checked
          ? [...this.selectedItems, item]
          : this.selectedItems.filter((i) => i !== item)
      },
      onCheckStatus (e, status) {
        const all = this.groups[status] || []
        const items = this.selectedItems.filter((i) => !all.find((ii) => ii === i))
        const checked = e.target.checked

        this.selectedItems = checked ? [...items, ...all] : items
      },
      onCheckAll (e) {
        const checked = e.target.checked

        this.selectedItems = checked ? [...this.patients] : []
      }
    },
    components: {
      Button
    }
  }
</script>

<style lang="stylus" scoped>
  .container {

  }

  .footer {
    overflow: hidden;

    .left {
      margin-top: 6px;
      float: left;
    }

    .right {
      float: right;
    }
  }

  .items {
    margin-top: 5px;
  }

  .item {
    margin-top: 5px;
    display: inline-block;
    width: 20%;
  }

  .title {
    margin-top: 10px;
  }

  .empty {
    margin-top: 10px;
    color: #bbb;
  }
</style>
