<template>
  <div id="noticePrint" v-loading="pageLoading">
    <!-- {{process}} -->
    <iframe :src="url" :style="{height: iframeHeight + 'px'}" @load="onload" ref="iframe"></iframe>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#notice
  width 760px
  min-height 600px
  overflow hidden
  padding 30px
  iframe
    width 100%
    overflow hidden
</style>
<script>
import bus from 'vue-happy-bus'
  export default {
    data() {
      return {
        url: '',
        iframeHeight: 0,
        pageLoading: true,
        bus: bus(this)
      }
    },
    created() {
      let host
      if (process.env.NODE_ENV === 'production'){
        host = '/crNursing'
      }
      else {
        host = ''
      } 
      this.url = `${host}/notice.html`
    },
    methods: {
      onload() {
        this.pageLoading = false
        let wid = this.$refs.iframe.contentWindow
        let timer = setInterval(() => {
          this.iframeHeight = wid.document.body.scrollHeight + 25
          if(this.iframeHeight > 601) {
            clearInterval(timer)
          }
        }, 500)
        this.bus.$on('printNotice', () => {
          wid.print()
       }) 
      }
    },
    components: {}
  }
</script>
