<template>
  <div class="patient-info-head">
    <el-row
      class="logo-con"
      type="flex"
      align="middle"
    >
      <img src="../../../common/images/jmfy_log.png" height="60" width="60" />
      <span>
        江门市妇幼保健院
        <br />智慧护理信息系统
      </span>
    </el-row>
    <div class="nav-con">
      <router-link
        :to="{
          path: '/home',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">首页</div>
      </router-link>
      <router-link
        :to="{
          path: '/record',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理文书</div>
      </router-link>
      <router-link
        v-if="
          HOSPITAL_ID == 'hj' ||
            HOSPITAL_ID == 'fuyou' ||
            HOSPITAL_ID == 'liaocheng'
        "
        :to="{
          path: '/doctorEmr',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">病历</div>
      </router-link>
      <router-link
        :to="{
          path: '/sheetNursingOrder',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护嘱单</div>
      </router-link>
      <router-link
        :to="{
          path: '/sheet',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理记录单</div>
      </router-link>
      <router-link
        :to="{
          path: '/hospitalEval',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">住院日常评估</div>
      </router-link>
      <!-- <router-link
        :to="{
          path: '/catheter',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">导管</div>
      </router-link> -->
      <router-link
        :to="{
          path: '/diagnosis',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理诊断计划</div>
      </router-link>
      <router-link
        :to="{
          path: '/bloodSugar',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">血糖</div>
      </router-link>
      <router-link
        :to="{
          path: '/healthEducation',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">健康教育单</div>
      </router-link>
      <router-link
        :to="{
          path: '/cost',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">费用信息</div>
      </router-link>
      <router-link
        :to="{
          path: '/information',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">基本信息</div>
      </router-link>
      <router-link
        :to="{
          path: '/advice',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">医嘱</div>
      </router-link>
      <router-link
        :to="{
          path: '/inspect',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检查</div>
      </router-link>
      <router-link
        :to="{
          path: '/test',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检验</div>
      </router-link>
      <!-- <router-link to="/dev" tag="span">
        <div class="nav-item">手术</div>
      </router-link>-->
      <!-- <router-link :to="{path:'/consultation', query:$route.query}" tag="span">
        <div class="nav-item">会诊</div>
      </router-link>-->
      <!-- <router-link :to="{path:'/recordSheet', query:$route.query}" tag="span">
        <div class="nav-item">护理记录单</div>
      </router-link>-->
      <router-link
        :to="{
          path: '/temperature',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">体温单</div>
      </router-link>
      <router-link
        :to="{path:'/otherPage', query: {patientId:query.patientId, visitId: query.visitId}}"
        tag="span"
      >
        <div class="nav-item">患者360</div>
      </router-link>
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.logo-con {
  width: 200px;
  min-width: 200px;
  height: 50px;
  background: #4bb08d;
  position: fixed;
  left: 0;
  top: 0;
  padding-left: 10px;

  img {
    width: 36px;
    height: 36px;
  }

  span {
    margin-left: 6px;
    font-size: 14px;
    color: #EFF2F9;
    letter-spacing: 0;
    line-height: 16px;
  }
}

.nav-con {
  height: 50px;
  min-width: 1030px;
  background-image: linear-gradient(-180deg, #F7F7F9 0%, #EAEBEF 100%);
  padding-top: 12px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #CBD5DD;
  position: fixed;
  width: 100%;
  z-index: 10;
}

.nav-item {
  height: 37px;
  line-height: 37px;
  padding: 0 10px;
  font-size: 13px;
  color: #687179;
  letter-spacing: 0.26px;
  float: left;
  cursor: pointer;
}

.router-link-active {
  .nav-item {
    background: #F2F2F2;
    border: 1px solid #CBD5DD;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
  }
}
</style>
<script>
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      msg: "hello vue"
    };
  },
  created(){
    if(["fuyou"].includes(this.HOSPITAL_ID) && !localStorage["fuyouCaData"]){
      window.openFuyouCaSignModal(true);
    } 
  },
  computed: {
    query() {
      let query = this.$route.query;
      return query;
    }
  },
  components: {}
};
</script>
