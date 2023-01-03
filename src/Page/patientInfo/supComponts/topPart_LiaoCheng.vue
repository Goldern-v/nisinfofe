<template>
  <div>
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
          path: '/advice',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">医嘱</div>
      </router-link>
      <router-link
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
          path: '/temperature',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">体温单</div>
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
          path: '/diagnosis',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理诊断计划</div>
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
          path: '/bloodSugar',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">血糖</div>
      </router-link>
      <router-link
        :to="{
          path: '/catheter',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">导管</div>
      </router-link>
      <!-- <el-dropdown
        menu-align="start"
        :class="{ 'router-link-active': isActivePage }"
      >
        <el-row class="nav-item" type="flex" align="middle">
          <div class="before"></div>
          导管
        </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :class="{
                    active: $route.path.includes('deep')
                  }">
            <router-link
              :to="{
                path: '/deep',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle"
                >深静脉导管</el-row
              >
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item :class="{
                    active: $route.path.includes('catheter')
                  }">
            <router-link
              :to="{
                path: '/catheter',
                query: { patientId: query.patientId, visitId: query.visitId }
              }"
              tag="span"
            >
              <el-row class="menu-item" type="flex" align="middle"
                >导尿管</el-row
              >
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <router-link
        :to="{
          path: '/test',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">检验</div>
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
          path: '/record',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理文书</div>
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
          path: '/implementationPerson', 
          query: { patientId: query.patientId, visitId: query.visitId },
        }"
        tag="span"
      >
        <div class="nav-item">执行单</div>
      </router-link>
      <router-link
        :to="{path:'/otherPage', query: {patientId:query.patientId, visitId: query.visitId}}" 
        tag="span"
      >
        <div class="nav-item">患者360</div>
      </router-link>
      <router-link
        :to="{path:'/patientFlowForm', query: {patientId:query.patientId, visitId: query.visitId}}"
        tag="span"
      >
        <div class="nav-item">患者流转单</div>
      </router-link>

      <!-- <router-link :to="{path:'/sheetNursingOrder', query: {patientId:query.patientId, visitId: query.visitId}}" tag="span">
        <div class="nav-item">护嘱单</div>
      </router-link> -->

      <!-- <router-link to="/dev" tag="span">
        <div class="nav-item">手术</div>
      </router-link>-->
      <!-- <router-link :to="{path:'/consultation', query: {patientId:query.patientId, visitId: query.visitId}}" tag="span">
        <div class="nav-item">会诊</div>
      </router-link>-->
      <!-- <router-link :to="{path:'/recordSheet', query: {patientId:query.patientId, visitId: query.visitId}}" tag="span">
        <div class="nav-item">护理记录单</div>
      </router-link>-->
    </div>
    <div style="height: 50px"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
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

  >>> .el-dropdown {
    float: left;
  }
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
.menu-item {
  height: 38px;
  padding: 0 0px;
  text-align: center;
  font-size: 13px;
  color: #687179;
  letter-spacing: 0;
  cursor: pointer;
}
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item.active {
  background-color: #F8F8FA;

  .menu-item {
    color: #333;
    font-weight: bold;
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
  computed: {
    query() {
      let query = this.$route.query;
      return query;
    },
     isActivePage() {
      if (this.$route.path == "/deep") return true;
      if (this.$route.path == "/catheter") return true;
      return false;
    }
  },
  components: {}
};
</script>
