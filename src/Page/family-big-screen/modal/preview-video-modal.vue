<template>
  <sweet-modal ref="modalName" title="标题">
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang='scss' scoped></style>
<script>
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
  components: {}
};
</script>
