
<template>
  <div class="contain">
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="left-part" :style="{ left: openLeft ? '0' : '-201px' }">
        <!-- <patientList :data="data.bedList" :isSelectPatient="isSelectPatient" v-loading="patientListLoading"></patientList> -->

        <patientList toName="formPage" :callFunction="isSelectPatient" />
      </div>
      <div class="right-part" :style="{marginLeft: openLeft ? '200px' : '0'}">
        <record></record>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 0;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  &.fullpage {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0;
  }

  .head-con {
    height: 41px;
  }

  .body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 1
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
}
</style>

<script>
// import patientList from "@/components/patient-list/patient-list.vue";
import patientList from "@/components/patient-list/patient-list-router-link.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
import record from "@/Page/patientInfo/supPage/record/record";
import {unLock,unLockTime} from "@/Page/sheet-hospital-eval/api/index.js"
import { DATA_CHANGE } from '@/utils/localStorage'
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      bus: bus(this),
      lockHospitalList:['huadu','nfyksdyy']//配置了评估单锁定功能的医院
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    containHeight() {
      return this.wih - 62 + "px";
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
  },
  methods: {
    // getDate() {
    //   if (this.deptCode) {
    //     this.patientListLoading = true;
    //     patients(this.deptCode).then((res) => {
    //       let bedList = res.data.data.filter((item) => {
    //         return item.patientId;
    //       });
    //       this.patientListLoading = false;
    //     });
    //   }
    // },
    isSelectPatient(item) {
      this.$router.replace(
        {
          path: "/formPage",
          query: item,
        },
        () => {
          this.bus.$emit("refreshTree", true,true);
          this.bus.$emit("closeAssessment");
        }
      );
    },
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    //初始化，进入页面就设置为空
    localStorage.setItem('lockForm','')
    // 初始化
    // 优化后bedList由组件自己维护。不需要发请求
    // if (this.deptCode) {
    //   this.getDate();
    // }
    // this.bus.$on("refreshFormPagePatientList", this.getDate);
    // 解锁
    // this.bus.$on("quitUnlock",this.destroyUnlock)
  },
  watch: {
    deptCode(val, oldValue) {
      if (oldValue && val) {
        if (this.HOSPITAL_ID !== 'nfyksdyy') {
          this.$router.replace({
            path: "/formPage",
            query: {},
          });
          this.bus.$emit("refreshTree", true);
        }
        this.bus.$emit("closeAssessment");
        this.destroyUnlock()
      }
      // this.getDate(true)
      // 优化后bedList由组件自己维护。不需要发请求
      // this.getDate();
    },
    "$route.query.patientId"(val, oldValue){
     if(this.HOSPITAL_ID== 'nfyksdyy'){
      this.bus.$emit(
        "openAssessmentBox",{},true
      );
     }
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 这里监听路由变化，如果是同一个页面，就不执行更新逻辑
    if (to.path === from.path) {
      if(!this.$store.state.admittingSave.admittingSave){
      return this.$confirm('护理文书还未保存，是否需要离开页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
           this.$store.commit("upAdmittingSave", true);
           return next()
        }).catch(() => {
          
          return next(false)
        });
       }else{
        next()
       }
    } else {
      next(false)
    }
  },
  beforeRouteLeave(to,from,next){
     if(!this.$store.state.admittingSave.admittingSave){
      return this.$confirm('护理文书还未保存，是否需要离开页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.commit("upAdmittingSave", true);
          return next()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
          return next(false)
        });
    }else{
      next()
    }
  },
  components: {
    patientList,
    record,
  },
  beforeDestroy(){
  }
};
</script>
