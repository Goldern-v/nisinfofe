<template>
  <div id="sheetNursingOrderPrint">
    <!-- {{process}} -->
    <!-- <iframe :src="url" :style="{height: iframeHeight + 'px'}" @load="onload" ref="iframe"></iframe> -->
    <div class="iframe" v-html="sheetNursingOrderModel"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#sheetNursingOrderPrint{
  overflow hidden
  .contant{
    margin 0 !important
    margin-top: 10px !important;
    border: 0px!important;
    width 700px !important
    }
  .sheet-table {
      width 640px !important
      }
  .add-row {
      display none 
    }  
  .body-con {
    background #fff !important  
  }  
  input {
    color #000 !important;
  }
  .canSet{
    color #000  
  }
  td[datakey="signerNo"] {
    display: table-cell !important
  }
  td[datakey="signerName"] {
    display none !important
  }
  td[datakey="signerNo2"] {
    display: table-cell !important
  }
  td[datakey="signerName2"] {
    display none !important
  }
}
@media print {
  body{
    padding-top:30px;
  }
  @page {
    size: A4;
    margin:0;
  }
  #sheetNursingOrderPrint {
     .contant {
       border: 0px!important;
       margin 0 !important
       margin-top 20 !important
       padding 0 !important
       width 660px !important
       page-break-after always
      }
    .sheet-table {
      width 640px !important
      }
    .his-logo {
      top 0 !important
      left 0 !important
      }
    .header-con h1 {
      margin-top 0 !important
      }
    } 

}    
</style>
<script>
import $ from 'jquery'
import bus from 'vue-happy-bus'
import {printDir} from '../control/common-print.js'
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
      this.url = `${host}/sheet-nursing-order-print.html`
    },
    mounted() {
       $('#app').css({
         width: '100%'
       })
      // this.$nextTick(() => {
      //   $('#sheetNursingOrderPrint').find('span').each((index,item) => {
      //   if($(item).html() == ('签名')) {
      //     $(item).html('')
      //   }
      //   if(($(item).html().indexOf('标题1') > -1) || 
      //      ($(item).html().indexOf('标题2') > -1) ||
      //      ($(item).html().indexOf('标题3') > -1) ||
      //      ($(item).html().indexOf('标题4') > -1) ||
      //      ($(item).html().indexOf('标题5') > -1) ||
      //      ($(item).html().indexOf('标题6') > -1) ||
      //      ($(item).html().indexOf('标题7') > -1) ||
      //      ($(item).html().indexOf('标题8') > -1) ||
      //      ($(item).html().indexOf('标题9') > -1)) {
      //      $(item).html('')
      //   }
      //   })
      // })
      printDir('')
    },
    methods: {

    },
    computed: {
      sheetNursingOrderModel() {
        let html = window.localStorage.sheetNursingOrderModel
        var reg = /data-value/g;
        // return html
        return html.replace(reg, 'value')
      }
    },
    components: {}
  }
</script>
