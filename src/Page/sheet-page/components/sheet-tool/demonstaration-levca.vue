<template>
  <div>
    <el-tooltip class="item" effect="dark" content="留痕追溯" placement="left">
      <div class="fixed-icon" :class="{ open: open }" @click="onToggle">
        <img src="./images/检查报告@2x.png" alt />
      </div>
    </el-tooltip>

    <demonstration
      :faultNurseRecordList="notNurseRecordList"
      ref="demonstration"
      @onClose="onClose"
    ></demonstration>
  </div>
</template>
<style lang="scss" scoped>
.fixed-icon {
  position: fixed;
  right: 0;
  top: 210px;
  background: #ffffff;
  width: 50px;
  height: 42px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
  border-radius: 100px 0px 0px 100px;
  z-index: 2;
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
import demonstration from "./modal/demonstration";
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
        this.$refs.demonstration.open();
      } else {
        this.$refs.demonstration.close();
      }
    },
    onClose() {
      this.open = false;
    },
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
  },
  components: {
    demonstration,
  },
  created(){
    // 三个参数 type打开哪个类型,close是否关闭弹窗,feature是否有回填护记特殊情况功能
    this.bus.$on("openclosePatientInfo",(type,close,feature)=>{
      this.onToggle()
      if(close) return
      setTimeout(()=>{
         this.$refs.demonstration.openModal(type,feature)
      },800)
    });
  }
};
</script>
