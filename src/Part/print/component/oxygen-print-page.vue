<template>
  <div id="sugarPagePrint">
    <div class="iframe"
         v-html="sheetModel"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#sugarPagePrint
  padding 0
  margin 0
  // background yellow
  overflow hidden
  .sugr-page
    margin 0
    page-break-after always
    min-height 1020px
    // background red
  .noPrint
    display none
  .inPrint
    display block
@media print
  #sugarPagePrint
    .sugr-page
      padding 0
      margin 50px 0 0 !important
      box-shadow 0 0 0 0
      .page-con
        bottom 0
      .his-logo
        top 0
        left 0
    .liaocheng-img
      width:55px;
      height:18px;
@page {
  margin 0 10mm 
}        
</style>
<script>
import $ from 'jquery'
import bus from 'vue-happy-bus'
import { printDir } from '../control/common-print.js'
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
    if (process.env.NODE_ENV === 'production') {
      host = '/crNursing'
    }
    else {
      host = ''
    }
    this.url = `${host}/sheet-page-print.html`
  },
  mounted() {
    $('#app').css({
      minWidth: '700px'
    })
    printDir('v')
  },
  methods: {

  },
  computed: {
    sheetModel() {
      let html = window.localStorage.oxygenModel
      var reg = /data-value/g;
      return html.replace(reg, "value");
    }
  },
  components: {}
}
</script>
