
<template>
  <div class="contain">
    <div class="body-con" id="sheet_body_con" :style="{height: containHeight}">
      <div class="left-part">
        <!-- <patientList :data="data.bedList" :isSelectPatient="isSelectPatient" v-loading="patientListLoading"></patientList> -->

        <patientList toName="formPage" :callFunction="isSelectPatient" />
      </div>
      <div class="right-part" :style="{marginLeft: openLeft?'200px':'0'}">
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
import {unLock} from "@/Page/sheet-hospital-eval/api/index.js"
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      bus: bus(this),
      lockHospitalList:['huadu']//配置了评估单锁定功能的医院
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
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },
    isSelectPatient(item) {
      this.$router.replace(
        {
          path: "/formPage",
          query: item,
        },
        () => {
          this.bus.$emit("refreshTree", true);
          this.bus.$emit("closeAssessment");
        }
      );
    },
    destroyUnlock(){
     const lockForm=localStorage.getItem("lockForm")?JSON.parse(localStorage.getItem("lockForm")) :localStorage.getItem("lockForm")
     /* 判断是否已经自动解锁 */
     if(lockForm && lockForm.initTime){
        /* 默认是10分钟后自己解锁 ,后期可根据医院修改*/
        let min=10
        /* 评估单初始化时间 乘于多少分钟  1分钟=60000 */
        const afterInitTime= +lockForm.initTime + 60000 * min
        const nowTime=Date.now()
        if(nowTime > afterInitTime ){
          /* 超时间 */
          localStorage.setItem('lockForm','')
          return
        }
     }
     if(lockForm && lockForm.formId && this.lockHospitalList.includes(this.HOSPITAL_ID)){
        unLock(lockForm.type,lockForm.formId).then(res=>{
          localStorage.setItem('lockForm','')
        })
     }
    }
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
    this.bus.$on("refreshFormPagePatientList", this.getDate);
    // 解锁
    this.bus.$on("quitUnlock",this.destroyUnlock)
  },
  watch: {
    deptCode(val, oldValue) {
      if (oldValue && val) {
        this.$router.replace({
          path: "/formPage",
          query: {},
        });
        this.bus.$emit("refreshTree", true);
        this.bus.$emit("closeAssessment");
        this.destroyUnlock()
      }
      // 优化后bedList由组件自己维护。不需要发请求
      // this.getDate();
    },
  },
  beforeRouteUpdate(to, from, next) {
    if(!this.$store.state.admittingSave.admittingSave){
      return this.$confirm('入院评估单还未保存，是否需要离开页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
           this.$store.state.admittingSave.admittingSave = true
           return next()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          }); 
          return next(false)
        });
        // console.log(comfirm,'ddd');
        // if(!comfirm) {
        //   return next()
        // }else{
        //   next(false)
        // }
    }else{
      next()
    }
  },
  beforeRouteLeave(to,from,next){
     if(!this.$store.state.admittingSave.admittingSave){
      return this.$confirm('入院评估单还未保存，是否需要离开页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
           this.$store.state.admittingSave.admittingSave = true
           return next()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          }); 
          return next(false)
        });
        // console.log(comfirm,'ddd');
        // if(!comfirm) {
        //   return next()
        // }else{
        //   next(false)
        // }
    }else{
      next()
    }
  },
  components: {
    patientList,
    record,
  },
  beforeDestroy(){
    // 切换模块的时候解锁
    this.destroyUnlock()
  }
};
</script>
