<template>
  <sweet-modal ref="modalName" :modalWidth="800" title="归档预览">
    <iframe :src="url" frameborder="0"></iframe>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
iframe {
  width: 100%;
  height: calc(100vh - 240px);
}
</style>

<script>
export default {
  props: {},
  data() {
    return {
      url: ""
    };
  },
  methods: {
    open(url) {
      this.url = url || "";
      this.$refs.modalName.open();
    },
    post() {}
  },
  components: {}
};
</script>
