<template>
  <!-- 签名确认 -->
  <sweet-modal ref="modalName" size="small" :title="title">
    <p for class="name-title">{{title}}</p>
    <el-input type="text" v-model="text"></el-input>

    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 5px 0 10px
  font-weight bold
</style>

<script>
export default {
  data() {
    return {
      callback: "",
      text: "",
      title: ""
    };
  },
  methods: {
    open(callback, text, title) {
      this.callback = callback;
      this.text = text || "";
      this.title = title || "修改文字信息";
      this.password = "";
      this.$refs.modalName.open();
      this.$nextTick(() => {});
    },
    post() {
      this.$refs.modalName.close();
      this.callback(this.text);
    }
  },
  components: {}
};
</script>
