<template>
  <div class="tooltipBox">
    <el-tooltip class="item" data-content="患者资料" effect="dark" content="患者资料" placement="left">
      <div class="fixed-icon" :class="{ open: open }" @click="onToggle">
        <img src="./images/患者资料@2x.png" alt />
      </div>
    </el-tooltip>
    <el-tooltip class="item" data-content="出入量实时统计" effect="dark" content="出入量实时统计" placement="left" v-show="showFoodAndOut">
      <div class="fixed-icon" style="top:200px" :class="{ secondOpen: secondOpen }" @click="opentongji">
        <img src="./images/患者资料@2x.png" alt />
      </div>
    </el-tooltip>

    <patientInfoSlide
      :faultNurseRecordList="notNurseRecordList"
      ref="patientInfoSlide"
      @onClose="onClose"
    ></patientInfoSlide>
    <patientInfoOutFood
      ref="patientInfoOutFood"
      @onClose="OutFoodClose"
    ></patientInfoOutFood>
  </div>
</template>
<style lang="scss" scoped>
.fixed-icon {
  position: fixed;
  right: 0;
  top: 140px;
  background: #ffffff;
  width: 50px;
  height: 42px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 100px 0px 0px 100px;
  z-index: 222;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;
  &.open {
    right: 230px;
  }
  img {
    width: 18px;
    height: 18px;
  }
}
</style>
<script>
import patientInfoSlide from "./modal/patient-info-slide";
import patientInfoOutFood from "./modal/patient-info-outFood";
import sheetInfo from "../config/sheetInfo";
import bus from "vue-happy-bus";
export default {
  props: {
    // 解决不是护理记录单样式问题。
    notNurseRecordList:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      open: false,
      secondOpen: false,
      sheetInfo,
      bus: bus(this),
    };
  },
  methods: {
    onToggle() {
      this.open = !this.open;
      if (!this.patientInfo.patientId) {
        this.$store.commit("upPatientInfo", this.$route.query);
      }
      if (this.open) {
        this.$route.query.patientId = this.patientInfo.patientId;
        this.$route.query.visitId = this.patientInfo.visitId;
        this.$refs.patientInfoSlide.open();
      } else {
        this.$refs.patientInfoSlide.close();
      }
    },
    opentongji() {
      this.secondOpen = !this.secondOpen;
      if (!this.patientInfo.patientId) {
        this.$store.commit("upPatientInfo", this.$route.query);
      }
      if (this.secondOpen) {
        this.$refs.patientInfoOutFood.open();
      } else {
        this.$refs.patientInfoOutFood.close();
      }
    },
    onClose() {
      this.open = false;
    },
    OutFoodClose() {
      this.secondOpen = false;
    },
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    showFoodAndOut(){
      if(['whsl'].includes(this.HOSPITAL_ID)){
        return ['critical2_weihai','critical_new_weihai','baby2_weihai'].includes(this.sheetInfo.sheetType)
      }
      return false
    }
  },
  components: {
    patientInfoSlide,
    patientInfoOutFood
  },
  created(){
    // 四个参数 type打开哪个类型,close是否关闭弹窗,feature是否有回填护记特殊情况功能 data(传值时 data:Object) 患者基本信息（交班志基本信息  从交班志打开【检查报告】没有拿到基本信息）
    this.bus.$on("openclosePatientInfo",(type,close,feature, data = null)=>{
      this.onToggle()
      if(close) return
      setTimeout(()=>{
         this.$refs.patientInfoSlide.openModal(type,feature, data)
      },800)
    });
  }
};
</script>
