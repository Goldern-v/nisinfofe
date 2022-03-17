<template>
<div class="patient-flow-form">
  <div class="patient-flow-form__side">
    <div class="side__title">患者流转单</div>
    <baseTree :configList="configList" class="side__tree"></baseTree>
  </div>
  <div class="patient-flow-form__content" v-loading="pageLoading">
    <!-- 无推送内容 -->
    <div v-if="1" style="height:100%">
    </div>
    <div v-else></div>
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

export default {
props: {},
data() {
  return {
    pageLoading: false,
    configList: []
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
      this.configList = res.data.data.operation || []
    } catch (e) {}
  }
},
components: {
  baseTree,
}
};
</script>
