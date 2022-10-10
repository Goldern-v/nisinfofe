<template>
  <sweet-modal ref="modalName" title="检验报告" class="modal-con">
    <testFSRY v-if="HOSPITAL_ID == 'foshanrenyi'"></testFSRY>
    <test v-else></test>
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
  >>>.body
    padding: 20px 20px 40px !important
</style>
<script>
import test from "@/Page/patientInfo/supPage/test/test";
import testFSRY from "@/Page/patientInfo/supPage/test/testFSRY";
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
    test,
    testFSRY
  }
};
</script>
