
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

export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      bus: bus(this),
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
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    // 初始化  
    // 优化后bedList由组件自己维护。不需要发请求
    // if (this.deptCode) {
    //   this.getDate();
    // }
    this.bus.$on("refreshFormPagePatientList", this.getDate);
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
};
</script>
