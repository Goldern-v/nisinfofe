<template>
  <div class="contain" :class="{fullpage}" v-loading="pageLoading" element-loading-text="正在保存" >
    <div class="head-con" flex>
      <div
        class="dept-select-con"
        :style="{width: openLeft?'200px':'0',transition: 'all 0.4s cubic-bezier(0.55, 0, 0.1, 1)'}"
      ></div>
      <div class="tool-con" flex-box="1">
        <sheetTool :formCodeFy='formCode' ref="sheetHospitalAdmissionTool"></sheetTool>
      </div>
    </div>
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="left-part" v-show="!$route.path.includes('admissionHisView')">
        <!-- <patientList :data="data.bedList" :isSelectPatient="isSelectPatient" v-loading="patientListLoading"></patientList> -->
        <patientList :toName="pathRouter" :callFunction="isSelectPatient"/>
      </div>
      <div class="right-part" :style="{marginLeft: openLeft?'200px':'0'}">
        <!-- <record></record> -->
        <div class="sheetTable-contain">
          <!-- <pages /> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 0
  background #fff
  border 1px solid #CBD5DD
  border-radius 2px

  &.fullpage
    position fixed !important
    z-index 10000
    left 0
    top 0
    bottom 0
    right 0
    margin 0

  .head-con
    height 41px
    position relative
    width 100%

  .body-con
    position relative

    .left-part
      width 199px
      position absolute
      left 0
      top: -40px
      bottom 0

    .right-part
      margin-left 199px
      height 100%
      overflow hidden
      transition: all .4s cubic-bezier(.55, 0, .1, 1);

.dept-select-con
  box-sizing border-box
  width 199px
  height 41px
  //   background #F7FAFA
  //   border-right 1px solid #CBD5DD
  //   border-bottom 1px solid #EAEEF1
  //   border-radius 2px 0 0 0
  display flex
  justify-content center
  align-items center

  >>> .el-input__inner
    width 172px
    height 28px
    border 1px solid #C2CBD2
    border-radius 4px
    font-size 12px

.sheetTable-contain
  height 100%
  background #DFDFDF
  overflow auto
  padding 15px 5px 0 15px
  box-sizing border-box
  margin 0 auto 20px
  position relative

.null-btn
  position absolute
  top 0px
  bottom 150px
  left 0
  right 0
  margin auto
  font-size 17px
  color #687179
  width 195px
  height 50px
  background #FFFFFF
  border 1px solid #ADB4BA
  box-shadow 0 1px 2px 0 rgba(200, 200, 200, 0.5)
  border-radius 2px
  cursor pointer

  &:hover
    background #fafafa

  i
    margin-right 4px
</style>

<script>
import patientList from "@/components/patient-list/patient-list-router-link.vue";
import sheetTool from "./components/sheet-tool/sheet-tool.vue";
import pages from "./components/pages/page.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
// import record from "@/Page/patientInfo/supPage/record/record";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      pageLoading: false,
      patientListLoading: false,
      bus: bus(this),
      routerPath: '',
      formCode: '',
      pathRouter: 'sheetHospitalAdmissionPage',
    };
  },
  computed: {
    isAdmissionHisView(){
      return this.$route.path.includes('admissionHisView')
    },
    containHeight() {
      if(this.isAdmissionHisView){
        return '100vh'
      }
      return this.wih - 105 + "px";
      // if (this.fullpage) {
      //   return this.wih - 14 + "px";
      // } else {
      //   return this.wih + 0 + "px";
      // }
      let c = []
      for (const key in a) {
        if (a.hasOwnProperty(key)) {
          // console.log(a[key],key)
          if (a[key] && b[key] && a[key].length != b[key].length) {
            console.log(key)
            c = [...c, key]
          }
        }
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage||this.isAdmissionHisView;
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft&&!this.isAdmissionHisView;
    }
  },
  methods: {
    isSelectPatient(item) {
      console.log('itemitmeitme',item);
      this.bus.$emit("setHosptialAdmissionLoading", true);
      this.bus.$emit("setIsNewForm", false);
      this.bus.$emit("getHEvalBlockList", item);
      this.selectPatientId = item.patientId;
      this.$store.commit("upPatientInfo", item);
    },
  },
  created() {
    let route = this.$route
    this.formCode = (route.meta && route.meta.formCode) || ''
    this.pathRouter =  (['nfyksdyy', 'foshanrenyi', 'whyx'].includes(this.HOSPITAL_ID))? route.name : 'sheetHospitalAdmissionPage'
    if(this.isAdmissionHisView){
      // console.log('this.$route',this.$route);
      // console.log('this.data.bedList',this.data.bedList);
      return
    }
    this.$store.commit("upPatientInfo", {});
  },
  beforeRouteUpdate(to,from,next){
    this.formCode = (to.meta && to.meta.formCode) || ''
    this.pathRouter = to.name
     next();
  },
  beforeRouteLeave(to, from, next) {
    if(this.HOSPITAL_ID == 'nfyksdyy' && !this.$store.state.admittingSave.isLeaveTip ){
    window.app
      .$confirm("入院评估（成人），离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then((res) => {
        this.$store.commit("upIsLeaveTip", true);
        next();
      });
    }else{
      next()
    }
  },
  mounted() {

  },
  watch: {},
  components: {
    patientList,
    // record,
    sheetTool,
    pages
  }
};
</script>
