<template>
  <div
    :class="isLandscape?'print-contain-landscape':'print-contain'"
    id="assessment_print_con"
    v-loading="pageLoading"
    :element-loading-text="pageLoadingText"
  >
    <!-- <div class="mask"></div> -->
    <iframe
      :style="{height: iframeHeight + 'px'}"
      v-if="url"
      :src="url"
      frameborder="0"
      class="iframe-con"
      @load="onload"
      ref="iframe"
    ></iframe>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.print-contain
  padding 20px 0px
  position relative
  box-sizing border-box
  width 760px
  overflow hidden
  .iframe-con
    width 100%
    overflow hidden
    min-height 600px
.print-contain-landscape
  padding 20px
  position relative
  box-sizing border-box
  width 1080px
  overflow hidden
  .iframe-con
    width 100%
    overflow hidden
    min-height 600px

.mask
    position absolute
    width 100%
    height 100%
    z-index 1
    // filter alpha(opacity=0)
    opacity 0
    background #ffffff
    margin -12px -20px

>>>.el-loading-mask
      background: white!important;

</style>

<style>
</style>

<script>
import moment from "moment";
import fixPrint from "../control/fix-print";
import bus from "vue-happy-bus";
import $ from "jquery";
import formFill from "@/Page/patientInfo/supComponts/formBox/form.fill";
import formFillPrintPage from "@/Page/patientInfo/supComponts/formBox/form.fill.printpage";
import { initList } from "@/Page/patientInfo/supComponts/formBox/form.details.printpage";
import { evalDetail, formPrintPage, formInputPrint } from "@/api/form_hj";
import common from "@/common/mixin/common.mixin.js";
import qs from "qs";
export default {
  mixins: [common],
  data() {
    return {
      url: "",
      pageLoading: true,
      pageLoadingText: "正在载入中...",
      iframeHeight: 0,
      bus: bus(this),
      wid: null,
      isLandscape: false
    };
  },
  created() {
    this.pageLoading = true;
    this.url = localStorage.assessment_printUrl;
    this.pageLoadingText = "正在获取打印页面和页面数据...";
  },
  mounted() {
    this.wid = this.$refs.iframe.contentWindow;
    this.bus.$on("printAssessmentv1", () => {
      this.wid.print();
    });
  },
  methods: {
    onload() {
      this.pageLoading = false;
      this.wid = this.$refs.iframe.contentWindow;
      this.iframeHeight = "auto";
      this.iframeHeight = this.wid.document.body.scrollHeight + 25;
      this.wid.addEventListener("message", this.onmessage, false);

      try {
        this.wid.document.querySelector('.hospital').innerText = this.hospitalNameSpace
      } catch (error) {
        //
      }

      console.log("载入表单模版信息", this.wid.formInfo);
      try {
        for (const key in this.wid.formInfo) {
          if (this.wid.formInfo.hasOwnProperty(key)) {
            const element = this.wid.formInfo[key];
            if (key === "rotation" && element === "landscape") {
              this.isLandscape = true;
              break;
            }
          }
        }
      } catch (error) {
        //
        console.log(error);
      }

      // rotation:"landscape"
    },
    onmessage(e) {
      console.log(e);
      if (e.data.type === "loaded") {
        this.iframeHeight = this.wid.document.body.scrollHeight + 25;
        console.log("iframeHeight", this.iframeHeight);
      }
    }
  },
  components: {}
};
</script>
