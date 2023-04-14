<template>
  <div class="patient-info-head">
    <el-row
      class="logo-con"
      type="flex"
      align="middle"
      v-if="HOSPITAL_ID == 'hj'"
    >
      <img src="../../../common/images/logo_hj.png" height="63" width="63" />
      <span>
        东莞市厚街医院
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
      <template v-if="HOSPITAL_ID != 'foshanrenyi'">
        <router-link
          :to="{
            path: '/record',
            query: { patientId: query.patientId, visitId: query.visitId } 
          }"
          tag="span"
        >
          <div class="nav-item" v-if="HOSPITAL_ID == 'beihairenyi'">护理评估单</div>
          <div class="nav-item" v-else>护理文书</div>
        </router-link>
      </template>
      <el-dropdown
        v-else 
        menu-align="start"
        class="nav-item" 
        :class="{ 'router-link-active': isNursing }"
      >
        <el-row type="flex" align="middle">
          <!-- <div class="before"></div> -->
          护理文书
        </el-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :class="{active: $route.path == '/admissionPageAdult2'}">
            <router-link
             :to="{
                path: '/admissionPageAdult2',
                query: { patientId: query.patientId, visitId: query.visitId } 
              }"
              tag="span">
              <el-row class="menu-item" type="flex" align="middle">
                <i class="sheetHospitalAdmission"></i> 入院评估
              </el-row>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item :class="{active: $route.path == '/admissionPageChild2'}">
            <router-link 
            :to="{
              path: '/admissionPageChild2',
              query: { patientId: query.patientId, visitId: query.visitId } 
            }"
            tag="span">
              <el-row class="menu-item" type="flex" align="middle">
                <i class="sheetHospitalAdmission"></i> 入院评估(儿童)
              </el-row>
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item :class="{active: $route.path == '/record'}">
            <router-link
              :to="{
                path: '/record',
                query: { patientId: query.patientId, visitId: query.visitId } 
              }"
              tag="span"
              >
              <el-row class="menu-item" type="flex" align="middle">
                <i class="nursingAssessment"></i> 其他文书评估
              </el-row>
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
          path: '/temperature',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">体温单</div>
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
          path: '/diagnosis',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护理计划</div>
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
          path: '/sheetNursingOrder',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">护嘱单</div>
      </router-link>
      <router-link
        :to="{
          path: '/implementationPerson',
          query: {
            patientId: query.patientId,
            visitId: query.visitId,
            bedLabel: query.bedLabel
          }
        }"
        tag="span"
      >
        <div class="nav-item">执行记录</div>
      </router-link>
      <!-- <router-link
        :to="{path:'/otherPage', query: {patientId:query.patientId, visitId: query.visitId}}"
        tag="span"
      >
      </router-link> -->
        <div class="nav-item"  @click="openOtherPage('360')">360视图</div>
         <div class="nav-item" @click="openOtherPage('新嘉和')">新嘉和</div>

      <!-- <router-link
        :to="{
          path: '/hospitalEval',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">住院日常评估</div>
      </router-link> -->
      <!-- <router-link
        :to="{
          path: '/catheter',
          query: { patientId: query.patientId, visitId: query.visitId }
        }"
        tag="span"
      >
        <div class="nav-item">导管</div>
      </router-link> -->
      <!-- <router-link to="/dev" tag="span">
        <div class="nav-item">手术</div>
      </router-link>-->
      <!-- <router-link :to="{path:'/consultation', query:$route.query}" tag="span">
        <div class="nav-item">会诊</div>
      </router-link>-->
      <!-- <router-link :to="{path:'/recordSheet', query:$route.query}" tag="span">
        <div class="nav-item">护理记录单</div>
      </router-link>-->

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
.el-dropdown-menu__item:not(.is-disabled):hover, .el-dropdown-menu__item.active {
  background-color: #F8F8FA;

  .menu-item {
    color: #333;
    font-weight: bold;
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

  i {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center;

    &.sheetHospitalAdmission {
      background-image: url('../../../common/images/index/入院评估.png');
    }

    &.nursingAssessment {
      background-image: url('../../../common/images/index/护理评估.png');
    }
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
  font-size: 16px;
  color: #000;
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
      msg: "hello vue",
      query:null,
    };
  },
  created(){
    this.query=this.$route.query
  },
  computed: {
    query() {
      let query = this.$route.query;
      return query;
    },
    isNursing() {
      let path = this.$route.path;
      return path.includes("sheetHospitalAdmission") || path.includes("formPage")
    }
  },
  components: {},
  methods:{
    openOtherPage(data) {
      // console.log("query",this.query);
      if(data == '360'){
         window.open(`http://hz360.fsyyy.com:8081/cdr/personal/?patientId=${this.query.patientId}&visitNumber=1&systemcode=HLXT&doctorcode=${JSON.parse(localStorage.user).empNo}&oporIp=IP`)
      }else{
        window.open(`http://192.168.99.72:8099/?hospital_no=45607379-3&patient_id=${this.query.patientId}&visit_id=${this.query.visitId}`)
      }


    }
  }
};
</script>
