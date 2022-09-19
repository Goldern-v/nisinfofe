<template>
  <SweetModal
    ref="modal"
    title="创建病房日报"
    :modal-width="420"
  >
    <ElForm>
      <ElFormItem label="请选择日期：" label-width="130px">
        <ElDatePicker v-model="date"/>
      </ElFormItem>
      <ElFormItem label="选择科室：" label-width="130px">
        <ElSelect v-model="code">
          <ElOption
            v-for="d of depts"
            :key="d.deptCode"
            :label="d.deptName"
            :value="d.deptCode"
          />
        </ElSelect>
      </ElFormItem>
    </ElForm>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" :disabled="loading" type="primary" @click="onConfirm(false)">创建</ElButton>
    <!-- <ElButton slot="button" :disabled="loading" type="primary" @click="onConfirm(true)">复制前一天并创建</ElButton> -->
  </SweetModal>
</template>

<script>
  import common from '@/common/mixin/common.mixin.js'
  import * as apis from '../apis'

  export default {
    mixins: [common],
    data: () => ({
      loading: false,
      depts: [],
      code: '',
      date: new Date(),
    }),
    methods: {
      async open (code) {
        await this.loadDepts()

        this.date = new Date()
        this.code = code || this.code
        this.$refs.modal.open()
      },
      close () {
        this.$refs.modal.close()
      },
      async loadDepts () {
        const res1 = await apis.listDepartment(this.deptCode)
        const {data: {data: depts}} = res1

        this.depts = depts
        this.code = depts[0].deptCode
      },
      onClose () {
        this.close()
      },
      onConfirm (copy = false) {
        if (this.loading) return

        this.loading = true
        this.$emit('confirm', {
          date: this.date,
          code: this.code,
          copy,
          done: () => {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scroped>
</style>
