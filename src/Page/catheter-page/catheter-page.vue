
<template>
  <div class="catheter-container" :style="{height: containHeight}">
    <div class="left-wrapper">
      <patientList :data="data.bedList" v-loading="patientListLoading"></patientList>
    </div>
    <div class="right-wrapper" :style="{marginLeft: openLeft?'200px':'0'}">
      <div class="main-part" flex="cross:stretch">
        <div class="left-part">
          <catheterList></catheterList>
        </div>
        <div class="right-part" flex-box="1">
          <catheterMain></catheterMain>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/stylus" type="text/stylus" scoped>
.catheter-container {
  margin: 0;
  border: 1px solid #cbd5dd;
  border-radius: 2px;
  position: relative;
  .left-wrapper {
    width: 199px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .right-wrapper {
    margin-left: 199px;
    height: 100%;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    .main-part {
      padding: 10px 10px 10px 15px;
      height: 100%;
      box-sizing: border-box;
    }
    .left-part {
      width: 230px;
    }
    .right-part {
      width: 0;
    }
  }
}
</style>

<script>
import patientList from "./components/patient-list/patient-list.vue";
import common from "@/common/mixin/common.mixin.js";
import { patients } from "@/api/lesion";
import bus from "vue-happy-bus";
import catheterList from "./components/catheter-list/catheter-list";
import catheterMain from "./components/catheter-main/catheter-main";
import { model } from "./store";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      patientListLoading: false,
      bus: bus(this)
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    containHeight() {
      return this.wih - 63 + "px";
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    }
  },
  methods: {
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {
          showCatheter: true
        }).then(res => {
          this.data.bedList = res.data.data.filter(item => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    }
  },
  created() {
    this.$store.commit("upPatientInfo", {});
    this.bus.$on("refreshCatheterPatientList", this.getDate);
    model.init();
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }
  },
  watch: {
    deptCode() {
      this.getDate();
    }
  },
  components: {
    patientList,
    catheterList,
    catheterMain
  }
};
</script>
