<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="500" title="请选择审核类型">
      <div class="title">如果审核失败，请填写原因</div>
      <el-input type="textarea" class="textarea" v-model="content"/>
      <div slot="button">
        <div>
          <el-button class="modal-btn" type="primary" @click="post(false)">审核成功</el-button>
          <el-button class="modal-btn" type="danger" @click="post(true)">审核失败</el-button>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='stylus' rel='stylesheet/stylus' type='text/stylus' scoped>
.title
  font-size 14px;
  margin 5px 0 10px
  font-weight bold
.textarea >>> textarea
  height 150px
</style>
<script>
export default {
  data() {
    return {
      callback: null,
      content: ""
    };
  },
  methods: {
    open(callback, content) {
      this.callback = callback;
      this.content = content || "";
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post(reject) {
      this.callback(reject, this.content);
      this.close();
    }
  },
  components: {}
};
</script>
