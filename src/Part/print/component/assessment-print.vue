<template>
<div class="print-contain" id="assessment_print_con" v-loading="pageLoading" :element-loading-text="pageLoadingText">
  <iframe :style="{height: iframeHeight + 'px'}" v-if="url" :src="url" frameborder="0" class="iframe-con" @load="onload" ref="iframe"></iframe>
</div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
body
  zoom 1
  transform scale(1)
.print-contain
  padding 20px
  position relative
  box-sizing border-box
  width 760px
  overflow hidden
  .iframe-con
    width 100%
    overflow hidden
    min-height 600px
// @page
//   margin-left: 20mm

>>>.el-loading-mask
      background: white!important;
</style>
<script>
import moment from 'moment'
import fixPrint from '../control/fix-print'
import bus from 'vue-happy-bus'
import $ from 'jquery'
import formFill from "@/Page/patientInfo/supComponts/formBox/form.fill"
import formFillPrintPage from "@/Page/patientInfo/supComponts/formBox/form.fill.printpage"
import {
  initList
} from '@/Page/patientInfo/supComponts/formBox/form.details.printpage'
import {
  evalDetail,
  formPrintPage,
  formInputPrint
} from "@/api/form_hj"
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";
export default {
  mixins: [common],
  data() {
    return {
      url: '',
      pageLoading: true,
      pageLoadingText: "正在载入中...",
      iframeHeight: 0,
      bus: bus(this),
      wid: null
    }
  },
  created() {
    // window.openPringUrl = this.openPringUrl
    this.url = localStorage.assessment_printUrl
    // this.pageLoadingText = "正在载入"+this.url
    // this.pageReady()
  },
  mounted() {
    // this.pageReady()
  },
  methods: {
    openPringUrl(url) {
      this.url = url
      this.pageLoading = true
    },
    onload() {
      // this.pageLoading = false

      if(this.pageLoading === true){
        this.pageReady()
      }
    },
    pageReady() {
      // this.pageLoading = false
      this.wid = this.$refs.iframe.contentWindow
      window.wid= this.wid
      // 获取 浏览器本地存储 打印模版调用接口需的参数 和 获取页面数据接口的参数
      let printPageArgs = JSON.parse(localStorage.assessment_printPageArgs)
      let pageDataArgs = JSON.parse(localStorage.assessment_pageDataArgs)

      this.pageLoadingText = "正在获取打印页面和页面数据..."
      // 获取 页面模版 和 页面数据
      Promise.all([
        // formInputPrint(printPageArgs),
        formPrintPage(pageDataArgs)
      ]).then(res => {
        console.log("Promise.all.ass_print", res);
        // let page = res[0].data
        // // 将打印页模版 html 写入 iframe内嵌框架内
        // if (page && page != "") {
        //   this.wid.document.open();
        //   this.wid.document.write(page);
        //   this.wid.document.close();
        // } else {
        //   this.url = localStorage.assessment_printUrl
        // }
        // window.wid = this.wid

        try {
        this.wid.document.querySelector('.hospital').innerText = this.hospitalNameSpace
      } catch (error) {
        //
      }

        let pageData = res[0];
        let query = JSON.parse(localStorage.assessment_query)
        // 页面数据回填处理
        if (pageData) {
          query['numOfData'] = pageData.data.data.length
          initList(this.wid, query);
          // 多页数据类型的页面回填数据
          if (pageData.data.data && pageDataArgs.listPrint === true) {
            formFillPrintPage.fill(pageData.data.data, this.wid)
            // 单页数据类型的页面回填数据
          } else if (pageData.data.data && pageDataArgs.listPrint === false) {
            formFill.fill(pageData.data.data, this.wid);
          }
        }
        // 自适应iframe高度
        this.iframeHeight = 'auto'
        this.iframeHeight = this.wid.document.body.scrollHeight * 1.08;




         setTimeout(() => {
          // 自适应iframe高度
          this.iframeHeight = 'auto'
          this.iframeHeight = this.wid.document.body.scrollHeight * 1.03;
          // 加载完数据后 关闭隐藏 预加载 动画
           this.pageLoading = false
        }, 1000);

      });


      // 修改打印样式
      fixPrint(this.wid)
      this.iframeHeight = 'auto'
      this.iframeHeight = this.wid.document.body.scrollHeight * 1.08

      // if (this.wid.document.body.innerText == '') {
      //   this.$notify({
      //     title: '警告',
      //     message: '打印前请签名',
      //     type: 'warning'
      //   });
      // }
      this.bus.$on('printAssessment', () => {
        this.wid.print()
      })


    }
  },
  components: {}
}
</script>
