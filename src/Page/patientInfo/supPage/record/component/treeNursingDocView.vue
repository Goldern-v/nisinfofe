<template>
  <div>
    <div class="body" :style="{ height: height }" v-loading="treeLoading">
      <div v-if="isDoc">
        <div style="position: relative;">
          <div
            class="title"
            style="cursor: pointer;"
            @click="setItemShow('one')"
          >
            护理文书
          </div>
          <el-button
            type="text"
            style="
              position: absolute;
              right: 0px;
              top: 3px;
              font-size: 12px;
              color: #687179;
            "
            @click="newRecordOpen"
          >
            <i class="el-icon-plus"></i>
            创建
          </el-button>
        </div>
        <el-tree
          v-if="isShowObj.one"
          class="record-tree"
          :data="allFormList"
          highlight-current
          :render-content="renderContent"
          @node-click="nodeClick"
          node-key="index"
          :default-expanded-keys="expandList"
          @node-expand="node_expand"
          @node-collapse="node_collapse"
          :style="{ height: height }"
        ></el-tree>
      </div>
      <div v-if="isRecord">
        <div @click="setItemShow('two')" class="title">护理记录单</div>
        <div v-if="isShowObj.two" @click="showForm('sheet')" class="fromCss">
          <img src="@/common/images/record/文件.png" class="img" />
          <span class="name">护理记录单</span>
        </div>
      </div>
      <div v-if="isTemperature">
        <div @click="setItemShow('three')" class="title">体温单</div>
        <div
          v-if="isShowObj.three"
          @click="showForm('temperature')"
          class="fromCss"
        >
          <img src="@/common/images/record/文件.png" class="img" />
          <span class="name">体温单</span>
        </div>
      </div>
      <div v-if="showBloodSugar.includes(HOSPITAL_ID)">
        <div @click="setItemShow('four')" class="title">血糖</div>
        <div
          v-if="isShowObj.four"
          @click="showForm('bloodSugar')"
          class="fromCss"
        >
          <img src="@/common/images/record/文件.png" class="img" />
          <span class="name">血糖</span>
        </div>
      </div>
      <div v-if="showBloodOxygen.includes(HOSPITAL_ID)">
        <div @click="setItemShow('five')" class="title">血氧</div>
        <div
          v-if="isShowObj.five"
          @click="showForm('bloodOxygen')"
          class="fromCss"
        >
          <img src="@/common/images/record/文件.png" class="img" />
          <span class="name">血氧</span>
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <newForm ref="newForm"></newForm>
    <!-- 自定义模板弹窗 -->
    <templateSide ref="templateSide" />
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.body {
  overflow-y: auto;
  .title {
    cursor: pointer;
    height: 37px;
    background: #F7FAFA;
    padding: 0 13px;
    border-bottom: 1px solid #EAEEF1;
    font-size: 13px;
    color: #333333;
    font-weight: bold;
    line-height: 37px;
  }
  .fromCss {
    cursor: pointer;
    height: 37px;
    color: #687179;
    font-size: 8px;
    position relative;
    .name {
      position: relative;
      font-size: 12px;
      color: #687179;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 92%;
      display: inline-block;
      line-height: 37px;
      margin-left: 45px;
      font-family: 'SimSun', "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif !important;
    }
    .img {
      width: 20px;
      position: absolute;
      left: 25px;
      top: 8px;
    }
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.el-tree-node__content {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  // &:hover
  // .tree-node
  // background rgb(228, 241, 240)
}

.tree-node {
  margin-left: -16px;
  position: relative;
  font-size: 12px;
  color: #687179;
  top: 3px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 92%;
  display: inline-block;

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background: rgb(228, 241, 240);
}

.tree-box-node {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 13px;
  color: #687179;
  position: relative;
  top: 3px;

  img {
    width: 20px;
    position: relative;
    top: 3px;
    margin-right: 2px;
  }
}

.el-tree {
  border: 0 !important;
}

.modal-record {
  .record-con {
    background: #ffffff;
    overflow: auto;
    margin: 20px 0 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
  }
}

.record-tree {
  overflow:auto;
  .el-tree {
    border: 0 !important;
  }
}
</style>

<script>
/* eslint-disable */
import fileicon from '@/common/images/record/文件.png'
import filebox from '@/common/images/record/文件夹.png'

import fileiconRed from '@/common/images/record/文件红点.png'
import fileboxRed from '@/common/images/record/文件夹红点.png'

import fileiconGreen from '@/common/images/record/文件绿点.png'
import fileboxGreen from '@/common/images/record/文件夹绿点.png'
import { SweetModal, SweetModalTab } from '@/plugin/sweet-modal-vue'
import {
  listPatientRecord,
  emrList,
  groupList,
  listRecord,
} from '@/api/patientInfo'
import BusFactory from 'vue-happy-bus'
import newForm from '../modal/new-form.vue'
import commonMixin from '@/common/mixin/common.mixin'
import { getFormConfig } from '../config/form-config.js'
import templateSide from '@/Page/sheet-page/components/modal/template-slide.vue'

export default {
  mixins: [commonMixin],
  data() {
    return {
      regions: [],
      otherFormList: [],
      bus: BusFactory(this),
      treeLoading: false,
      expandList: [],
      expandListCopy: [],
      isShowObj: {
        one: false,
        two: false,
        three: false, //默认显示体温单模块
        four: false,
        five: false,
      }, // 一级菜单开关 (默认关闭)
      handleAddTemplateAtDoc: null,
      nursingPreviewIsShow: true, //南医三嘉禾展示去除头部按钮 -true展示  false去除
      showBloodSugar: [
        'guizhou',
        'hengli',
        'huadu',
        'whfk',
        'beihairenyi',
        'nanfangzhongxiyi',
        'sdlj',
        'foshanrenyi',
        'fsxt',
        'zhzxy',
        'lyyz',
      ], // 是否开放血糖模块
      showBloodOxygen: ['whfk'], // 是否开放血氧模块
      timer: null,
      isDoc: false,
      isRecord: false,
      isTemperature: false,
    }
  },
  computed: {
    wih() {
      return this.$store.state.common.wih
    },
    height() {
      // 南医三嘉禾展示高度单独处理
      if (this.$route.path == '/nursingPreview') {
        return `${this.wih - 40}px`
      }
      if (this.$route.path == '/formPage') {
        return `${this.wih - 120}px`
      } else {
        return `${this.wih - 40}px`
      }
    },
    allFormList() {
      return [...this.regions, ...this.otherFormList]
    },
  },
  methods: {
    // 控制右边表单
    showForm(type) {
      this.bus.$emit('openOtherForm', { component: type })
      this.bus.$emit('refreshImg')
    },
    nodeClick(data, node) {
      this.$refs.templateSide.close()

      if (data.component) {
        return this.bus.$emit('openOtherForm', data)
      }
      if (node.level === 2) {
        this.bus.$emit(
          'openAssessmentBox',
          Object.assign({}, getFormConfig(node.data.formName), {
            id: node.data.form_id,
            formCode: node.parent.data.formCode,
            showCurve: node.parent.data.showCurve,
            creator: node.parent.data.creator,
            listPrint: node.parent.data.listPrint,
            nooForm: node.parent.data.nooForm,
            pageUrl: node.parent.data.pageUrl,
            type: node.parent.data.type,
          }),
        )
      }
    },
    renderContent(h, { node, data, store }) {
      // 如果存在保存
      let hasSave =
        node.childNodes.filter((item) => {
          return item.data.status == '0'
        }).length > 0
      let hasSign =
        node.childNodes.filter((item) => {
          return item.data.status == '1'
        }).length > 0

      let fileHasSave = node.data.status == 0
      let fileHasSign = node.data.status == 1

      let icon
      let box

      if (hasSave) {
        box = fileboxRed
      } else if (hasSign) {
        box = fileboxGreen
      } else {
        box = filebox
      }

      if (fileHasSave) {
        icon = fileiconRed
      } else if (fileHasSign && !node.data.notRemindForNotAudit) {
        icon = fileiconGreen
      } else {
        icon = fileicon
      }
      if (node.level !== 2) {
        return (
          <span class="tree-box-node">
            {' '}
            <img src={box} />
            {node.label}
          </span>
        )
      } else {
        return (
          <span class="tree-node" title={node.label}>
            {' '}
            <img src={icon} />
            {node.label}
          </span>
        )
      }
    },
    getTreeData() {
      let hiddenFormCode = [
        'ICULineChart',
        'ICUBasicSign',
        'ICUDescription',
        'ICUCatheter',
      ]
      this.treeLoading = true
      Promise.all([
        groupList(this.$route.query.patientId, this.$route.query.visitId),
      ])
        .then((res) => {
          let index = 0
          window.app.$store.commit('cleanFormLastId')
          let list_1 = res[0].data.data.map((item) => {
            index += 1
            return {
              label: item.formName,
              index: index,
              formCode: item.formCode,
              showCurve: item.showCurve,
              creator: item.creator,
              listPrint: item.listPrint,
              nooForm: item.nooForm,
              pageUrl: item.pageUrl,
              type: item.formType,
              children: item.formInstanceDtoList.map((option, i) => {
                if (item.formInstanceDtoList.length - 1 == i) {
                  window.app.$store.commit('upFormLastId', {
                    formName: item.formName,
                    formCode: item.formCode,
                    id: option.id,
                    patientId: this.$route.query.patientId,
                    visitId: this.$route.query.visitId,
                    evalDate: option.evalDate,
                  })
                }
                return {
                  status: option.status,
                  label: `${option.evalDate || ''} ${
                    option.creatorName || ''
                  } ${option.status == 0 ? 'T' : option.status}`,
                  form_id: option.id,
                  formName: item.formName,
                }
              }),
            }
          })

          // filter ICU
          list_1 = list_1.filter(
            (item) => hiddenFormCode.indexOf(item.formCode) == -1,
          )

          // upFormTree
          if (list_1) {
            window.app.$store.commit('upFormTree', [...list_1])
          }
          this.regions = list_1
        })
        .then((res) => {
          this.treeLoading = false
        })
    },
    node_expand(curNode) {
      if (this.expandListCopy.indexOf(curNode.index) == -1) {
        this.expandListCopy.push(curNode.index)
      }
    },
    node_collapse(curNode) {
      this.expandListCopy.remove(curNode.index)
    },
    newRecordOpen() {
      this.$refs.newForm.open()
    },

    // 开关控制
    setItemShow(type) {
      this.isShowObj[type] = !this.isShowObj[type]
    },
  },
  created() {
    if (this.$route.query.viewType == 'doc') {
      this.isDoc = true
      this.isRecord = false
      this.isTemperature = false
      this.setItemShow('one')
    } else if (this.$route.query.viewType == 'record') {
      this.isDoc = false
      this.isRecord = true
      this.isTemperature = false
      this.setItemShow('two')
    } else if (this.$route.query.viewType == 'temperature') {
      this.isDoc = false
      this.isRecord = false
      this.isTemperature = true
      this.setItemShow('three')
    } else if (this.$route.query.viewType == 'nursingPreview') {
      this.isDoc = true
      this.isRecord = true
      this.isTemperature = true
    }
    if (!(this.$route.query.patientId && this.$route.query.visitId)) return
    this.getTreeData(true)
  },
  async mounted() {
    let isOk = this.$route.query.nursingPreviewIsShow
    if (isOk && isOk == '1') {
      this.nursingPreviewIsShow = false
    }
    // await this.bus.$emit('openOtherForm', { component: 'temperature' }) //默认打开体温单界面
    this.timer = setTimeout(() => {
      this.bus.$emit('refreshImg')
    }, 1000)
    //回应子界面打开自定义模板弹窗
    this.bus.$on('templateSideOpen', (payload) => {
      this.handleAddTemplateAtDoc = payload.callback
      this.$refs.templateSide.open(payload.recordCode)
    })
    //回应子界面关闭自定义模板弹窗
    this.bus.$on('templateSideClose', () => this.$refs.templateSide.close())
    //将自定义模板弹窗传递给子界面
    this.bus.$on('addTemplateAtDoc', (payload) => {
      this.handleAddTemplateAtDoc && this.handleAddTemplateAtDoc(payload)
    })
  },
  beforeDestroy() {
    this.$refs.templateSide.close()
    clearTimeout(this.timer)
  },
  components: {
    SweetModal,
    SweetModalTab,
    newForm,
    templateSide,
  },
}
</script>
