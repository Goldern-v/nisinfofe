
<template>
  <div class="catheter-container" :style="{height: containHeight}">
    <div class="right-wrapper">
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
  /* border: 1px solid #cbd5dd; */
  border-radius: 2px;
  position: relative;

  .right-wrapper {
    height: 100%;
    overflow: hidden;
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
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import catheterList from "@/Page/catheter-page/components/catheter-list/catheter-list";
import catheterMain from "@/Page/catheter-page/components/catheter-main/catheter-main";
import { model } from "@/Page/catheter-page/store";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: []
      },
      bus: bus(this)
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    containHeight() {
      return this.wih - 110 + "px";
    }
  },
  methods: {
    getDate() {}
  },
  created() {
    model.init();
    this.$store.commit("upPatientInfo", {});
    setTimeout(() => {
      this.$store.commit("upPatientInfo", this.$route.query);
      model.setSelectedPatient(this.$route.query);
    }, 100);
  },
  components: {
    catheterList,
    catheterMain
  }
};
</script>
