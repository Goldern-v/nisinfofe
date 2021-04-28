<template>
  <div>
    <div class="content">
      <div class="left-part">
        <treeNursingPreview ref="treeNursingPreview"></treeNursingPreview>
      </div>
      <div class="right-part">
        <component :is="otherComponent" v-if="otherComponent"></component>
        <rightPart v-show="!otherComponent"></rightPart>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  .left-part {
    float: left;
    width: 240px;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 2px;
    height: 100vh !important;
  }

  .right-part {
    margin-left: 240px;
    overflow: auto;
    height: 100vh !important;
  }
}
</style>
<script>
import treeNursingPreview from "@/Page/patientInfo/supPage/record/component/treeNursingPreview.vue"; //树
import temperature from "@/Page/patientInfo/supPage/temperature/temperature"; //体温单
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue"; //护理记录单
import rightPart from "@/Page/patientInfo/supPage/record/component/right-part/right-part.vue";
import bus from "vue-happy-bus";
export default {
  data() {
    return {
      bus: bus(this),
      otherComponent: null
    };
  },
  created() {
    this.$store.commit("closeFullPageRecord");
    this.bus.$on("openOtherForm", data => {
      this.otherComponent = data.component;
    });
    this.bus.$on("openAssessmentBox", data => {
      this.otherComponent = null;
    });
  },
  components: {
    treeNursingPreview,
    rightPart,
    sheet,
    temperature
  }
};
</script>
