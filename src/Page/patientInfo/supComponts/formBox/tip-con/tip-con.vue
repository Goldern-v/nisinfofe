<template>
  <div class="t-con">
    <div class="head-con" flex="cross:center">
      诊断提示
    </div>
     <div class="body-con"> 
      <!-- <div class="title">定义</div> -->
      <iframe :src="url" :style="{height: iframeHeight + 'px'}" frameborder="0" class="iframe-con" @load="onload" ref="iframe"></iframe>
    </div> 
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.t-con
  background: #FFFFFF;
  border: 1px solid #BDC3C4;
  border-radius: 4px 4px 4px 4px;
  color: #333333;
  font-size 12px
  box-shadow 0 5px 5px rgba(0,0,0,.3) 
  margin 10px
  transform-origin right top
  transform scale(.7,.7)
  .head-con
    background: #F7F7F7;
    height 40px
    border-bottom: 1px solid #E7EAEC;
    padding 0 22px
    font-size: 18px;
    color: #333333;
    font-weight bold
  .body-con 
    padding 15px
    background #fff
    .title
      font-size: 13px
.iframe-con
  width 100%    
</style>
<script>
import comminMixin from '@/common/mixin/common.mixin'
  export default {
    props: {
      data: Object
    },
    mixins: [comminMixin],
    data() {
      return {
        url: '',
        iframeHeight: 500
      }
    },
    created() {
      this.url = `/crNursing/api/diagnosis/view/${this.data.code}?${this.token}`
    },
    methods: {
      onload() {
        let wid = this.$refs.iframe.contentWindow
        // this.iframeHeight = wid.document.body.scrollHeight 
      }
    },
    components: {}
  }
</script>
