<template>
  <div
    :style="`height:${wih - 60}px!important;`"
    class="form-detail">
    <div
      class="form-detail-page"
      v-loading="pageLoading"
      :element-loading-text="pageLoadingText"
      ref="iframeLoadingV2">
      <iframe
        :style="{ minHeight: `${wih - 60}px` }"
        frameborder="0"
        class="form-detail-iframe"
        v-if="url"
        :src="url"
        @load="onload"
        ref="iframeV2"/>
    </div>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import BusFactory from "vue-happy-bus";
import qs from "qs";
import { formUrl, devFormUrl } from "@/common/pathConfig/index.js";

export default {
  name: 'form-detail',
  mixins: [common],
  props: {
    // 流转单详情数据
    detail: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      bus: BusFactory(this),
      // 流转单路径
      url: '',
      pageLoading: false,
      pageLoadingText: "表单加载中...",
      iframeHeight: this.whi + 50,
      params: {},
      wid: {},
      onlyView: true,
      isLandscape: false,
    }
  },
  watch: {
    id() {
      this.load()
    }
  },
  created() {
    // this.pageLoading = true;
  },
  mounted() {
    this.load()

  },
  methods: {
    load() {
      // 初始化iframe 路径，参数
      if (this.detail.documentName && this.id) {
        this.pageLoading = true
        let { documentName } = this.detail
        let commonUrl = this.isDev ? devFormUrl : formUrl;
        // 表单数据
        let queryObj = {
          id: this.id,
          onlyView: this.onlyView,
        }
        this.url = `${commonUrl}/${documentName}.html?${qs.stringify(queryObj)}`
        this.pageLoadingText = documentName + ",正在加载中...";
        this.onload()
      }
    },
    onload() {
      // 设置iframe高度
      this.iframeHeight = "auto";
      if (!this.$refs.iframeV2) return
      let wid = this.$refs.iframeV2.contentWindow;
      window.wid = wid;
      this.wid = wid;
      this.iframeHeight = wid.document.body.scrollHeight * 1.05;

      // 预览模式
      if (this.onlyView) {
        if (this.wid.document.querySelector(".tool-contain")) {
          this.wid.document.querySelector(".tool-contain").style = "display:none;";
          if (this.wid.document.querySelector("#app .form")) {
            this.wid.document.querySelector("#app .form").style =
              "padding-top:20px;";
          }
        }
        // 隐藏btn
        if (this.wid.document.querySelector(".top-bar")) {
          this.wid.document.querySelector(".top-bar").style = "display:none;";
          this.wid.document.querySelector("body").style = "padding-top:20px;";
        }
        // 禁止编辑
        if(this.wid.document.querySelector(".page-wrapper")) {
          this.wid.document.querySelector('.page-wrapper').style = 'pointer-events:none;'
        }
      }
      // 隐藏手术单的一部分
      if(this.detail.formCode === 'E0607') {
        this.$nextTick(() => {
          let css = `.page:first-child .page_table-wrapper table tr:nth-child(-n+24):nth-child(n+5) td:nth-child(3) {
            display: none;
          }`;
          var style = document.createElement("style");
          style.type = "text/css";
          try {
            style.appendChild(document.createTextNode(css));
          } catch (ex) {
            style.styleSheet.cssText = css; //针对IE
          }
          var head = wid.document.querySelector("head");
          head.appendChild(style);
          this.wid.document.querySelector('.page:first-child .page_table-wrapper table colgroup col:nth-child(3)').width = '31.5%'
          this.wid.document.querySelector('.page:first-child .page_table-wrapper table colgroup col:nth-child(2)').width = '31.5%'
          this.wid.document.querySelector('.page:first-child .page_table-wrapper table colgroup col:nth-child(4)').width = '31.5%'
          // this.onFormLoaded();
        });
      }
      this.pageLoading = false
    },

  }
}
</script>

<style lang="scss">
.form-detail {
  width: 100%;
  .form-detail-page {
    position: relative;
    margin: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
  }

  .form-detail-iframe {
    width: 100%;
    height: -webkit-fill-available;
    height: auto;
    background: #ccc;
    min-height: auto;
  }
  /deep/ .circular {
    &.hidden-loading {
      display: none !important;
      visibility: hidden !important;
    }
  }

  /deep/ .hidden-loading {
    display: none !important;
    visibility: hidden !important;
  }
}
</style>
