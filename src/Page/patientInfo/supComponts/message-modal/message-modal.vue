<template>
  <div>
    <sweet-modal ref="modal" :size="size" :title="title" :enable-mobile-fullscreen="false" overlay-theme="no-bg">
     <div class="content" v-html="content">
     </div> 
      <div slot="button">
        <div style="text-align:center">
        <el-button class="modal-btn" @click="close">我知道了</el-button>
        </div>
      </div>
    </sweet-modal>
    <iframe :src="url" style="display:none" frameborder="0" @load="loadCon"></iframe>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>

</style>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.content
  .message-list-item
    margin-bottom 15px
    text-align left 
    .list-key
      width 80px;
      float left
      font-weight bold
      font-size 14px
    .list-value
      margin-left 80px
      font-size 14px
      p
      margin-bottom 10px
  .message-title
    display none    

</style>
<script>
  export default {
    props: {
    // title: {
    //   type: String,
    //   default: ''
    //   },
    // content: {
    //   type: String,
    //   default: ''
    //   },
    },
    data() {
      return {
        title: '',
        icon: require('../../../../common/images/warn.png'),
        article: '',
        content: '',
        url: '',
        size:'body-modal'
      }
    },
    methods: {
      open(url,content,title,size) {
        this.url = ''
        this.title = title||''
        this.content = content||''
        this.size = size||'body-modal'
        this.$nextTick(() => {
          this.$refs.modal.open()
          this.url = url
        })
      },
      close() {
        this.$refs.modal.close()
      },
      loadCon(e) {
        this.content = (e.target.contentWindow.document.querySelector('body').innerHTML)
        this.title = `<img src="${this.icon}" style="position: relative;right:3px;top:3px;"/>${e.target.contentWindow.document.title}`
      }
    },
    mounted() {
       window.openMessageModal = (url) => {
        this.open(url)
      }
    },
    components: {}
  }
</script>
