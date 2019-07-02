<template>
    <!-- 签名确认 -->
    <sweet-modal ref="modalName" size="small" title="设置标题">
      <p for="" class="name-title">设置自定义标题</p>
      <div action="" @keyup.13="post" ref="titleInput">
        <el-input size="small" type="text" placeholder="输入标题名称" v-model="title"></el-input>
      </div>
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
        title: '',
        callback: ''
      }
    },
    methods: {
      open(callback, title) {
        this.callback = callback
        this.title = title.indexOf('标题') > -1 ? '': title
        this.$refs.modalName.open()
        this.$nextTick(() => {
          this.$refs.titleInput.querySelector('input').focus()
        })
      },
      post() {
        this.$refs.modalName.close()
        this.callback(this.title)
      }
    },
    components: {}
  }
</script>
