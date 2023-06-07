<template>
  <div id="healthPrintPage">
    <div class="iframe" v-html="healthPrintPage"></div>
  </div>
</template>
<style lang="scss" rel="stylesheet/stylus" type="text/stylus">
#healthPrintPage{
  padding: 0 20px;
  margin: 0;
  overflow: hidden;
  .health-education-head {
    padding-top: 50px !important;
  }
  .health-page{
    margin: 0;
    page-break-after: always;
    min-height: 1000px;
  }
  .noPrint{
    display: none;
  }
  .inPrint{
    display: block;
  }
}
@media print {
  @page {
    margin:0 10mm;
  }
  #healthPrintPage {
    .health-education-head {
      /* border: 0px!important; */
      /* margin: 50px 0 0 0 !important; */
      /* margin-top: 0 !important; */
      padding-top: 50px !important;
      box-shadow: 0 0 0 0;
      .page-con{
        bottom: 0
      }
      .his-logo{
        top: 0;
        left: 0
      }
      /* width: 660px !important;
      page-break-after: always */
    }
  }
}
</style>
<script>
import {printDir} from '../control/common-print.js'
  export default {
    data() {
      return {
      }
    },
    mounted() {
       $('#app').css({
         width: '100%'
       })
      printDir('')
    },
    methods: {
    },
    computed: {
      healthPrintPage() {
        let html = window.localStorage.healthPrintPage
        var reg = /data-value/g;
        return html.replace(reg, 'value')
      }
    }
  }
</script>
