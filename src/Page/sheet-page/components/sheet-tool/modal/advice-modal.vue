<template>
  <sweet-modal ref="modalName" title="医嘱" class="modal-con">
    <advice></advice>
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
import advice from "@/Page/patientInfo/supPage/advice/advice";
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
    advice
  }
};
</script>
