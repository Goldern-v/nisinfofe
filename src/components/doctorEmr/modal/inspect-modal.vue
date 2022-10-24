<template>
  <sweet-modal ref="modalName" title="检查报告" class="modal-con">
    <inspectFSRY v-if="['foshanrenyi'].includes(HOSPITAL_ID)"></inspectFSRY>
    <inspect v-else></inspect>
    <!-- <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div> -->
  </sweet-modal>
</template>
<style lang="stylus" scoped>
.modal-con
  >>>.sweet-content
    max-height 100vh
  >>>.content
    overflow hidden
    margin: 0 0 10px
  >>>.sweet-content
    background #F0f0f0
</style>
<script>
import inspect from "@/Page/patientInfo/supPage/inspect/inspect";
import inspectFSRY from "@/Page/patientInfo/supPage/inspect/inspectFSRY";
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    open() {
      this.$refs.modalName.open();
    },
    post() {}
  },
  components: {
    inspect,
    inspectFSRY
  }
};
</script>
