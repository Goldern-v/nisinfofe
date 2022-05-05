<template>
<div class="patient-flow-form">
  <div class="patient-flow-form__side">
    <div class="side__title">患者流转单</div>
    <base-tree :configList="configList" class="side__tree"></base-tree>
  </div>
  <div class="patient-flow-form__content" v-loading="pageLoading">
    <!-- 无推送内容 -->
    <div v-if="currentId" style="height:100%">
      <form-detail ref="formDetail" :master="master" :itemDataMap="itemDataMap" :detail="formModel"></form-detail>
    </div>
    <div v-else>
      <null-bg/>
    </div>
  </div>
</div>
</template>
<style lang='scss' scoped>
.patient-flow-form {
    display: flex;
    .patient-flow-form__side {
      width: 20%;
      height: calc(100vh - 65px);
      background: #fff;
      margin: 10px 0 5px 15px;
      border: 1px solid #cbd5dd;
      box-sizing: border-box;
      .side__title{
        height: 35px;
        background: #f7fafa;
        padding: 0 13px;
        border-bottom: 1px solid #eaeef1;
        font-size: 13px;
        color: #333;
        font-weight: bold;
        line-height: 35px;
      }
      .side__tree{
        overflow: auto;
        height: calc(100vh - 98px);
      }
    }
    .patient-flow-form__content {
      width: 80%;
      height: calc(100vh - 65px);
      box-sizing: border-box;
      border: 1px solid #cbd5dd;
      margin: 10px 10px 5px 0;
      border-left: none;
      overflow: hidden;
    }
  }
</style>
<script>
import baseTree from "@/components/baseTree/baseTree";
import { getPatientFlowList } from './api/index'
import NullBg from "@/components/null/null-bg.vue"; // 页面初始化背景
import formDetail from '../../../patient-flow-msg/components/form-detail.vue'
import { getPatientFlowDetail, getFlowForm } from '@/api/patient-flow';

export default {
props: {},
data() {
  return {
    pageLoading: false,
    configList: [],
    currentId: '',
    master: {},
    formModel: {},
    itemDataMap: {},
  };
},
computed: {
  patientInfo() {
    return this.$route.query
  },
},
async mounted() {
  await this.init()
},
methods: {
  async init() {
    await this.getTree()
  },
  async getTree() {
    try {
      const { patientId, visitId } = this.patientInfo
      const res = await getPatientFlowList({
        patientId, visitId
      })

      let configObj = {
        transfer: '转科流转',
        operation: '手术流转',
        intervention: '介入流转',
        delivery: '分娩流转',
      }
      let arr = []
      Object.keys(configObj).map((v, i) => {
        if (res.data.data[v]) {
          arr.push({
            label: configObj[v],
            children: res.data.data[v].map(v1 => ({
              label: `${configObj[v]} ${v1.createDateTime}`,
              onClick: () => {
                this.changeForm(v1.id)
              }
            }))
          })
        }
      })
      this.configList = arr
    } catch (e) {}
  },
  changeForm(id) {
    this.currentId = id
    this.getFormDetail(id)
  },
  async getFormDetail(id) {
    try {
      this.master = {}
      this.itemDataMap = {}
      this.formModel = {}
      const res1 = await getPatientFlowDetail(id)
      this.master = res1.data.data && res1.data.data.master || {}
      // this.master = { ...this.master, age }
      this.itemDataMap = res1.data.data && res1.data.data.itemDataMap || {}
      if (!this.master.formCode) return
      let { patientId, visitId, formCode } = this.master;
      const res2 = await getFlowForm({ formCode, patientId, visitId })

      this.formModel = res2 && res2.data.data || {}
      this.$refs.formDetail.load()
    } catch (err) {
      this.$message({
        showClose: true,
        message: '服务器开小差了',
        type: 'error'
      })
      this.$refs.formDetail.pageLoading = false
    }
  }
},
components: {
  baseTree,
  NullBg,
  formDetail,
}
};
</script>
