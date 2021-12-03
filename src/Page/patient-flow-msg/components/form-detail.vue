<template>
  <div
    :style="`height:${wih - 60}px!important;`"
    class="form-detail">
    <div
      class="form-detail-page"
      v-loading="formDetailPageLoading"
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
  computed: {
    formDetailPageLoading() {
      return window.pageLoading || this.pageLoading;
    }
  },
  watch: {
    "detail.documentName"() {
      this.load()
      this.onload();
    },
    pageLoading(v) {
      console.log('test-loading', v)
    }
  },
  created() {
    this.pageLoading = true;
    this.bus.$on("closeAssessmentV2", () => {
      this.url = "";
    });
    // this.bus.$on("openAssessmentV2", this.openUrl);
    this.bus.$on("assessmentRefreshV2", this.refresh);
    // this.bus.$on("assessmentLoadedV2", this.onFormLoaded);
  },
  mounted() {
    this.load()
    // window.onFormLoaded = this.onFormLoaded;

    this.$refs["iframeLoadingV2"]["$methods"] = () => ({
      busEmit: this.bus.$emit,
      setLoadingText: this.setLoadingText,
      // setLoadingStatus: this.setLoadingStatus,
      setLoadingButton: this.setLoadingButton,
      setloadingSVGHidden: this.setloadingSVGHidden,
    })
    this.$refs["iframeLoadingV2"]["setLoadingText"] = this.setLoadingText;
    // this.$refs["iframeLoadingV2"]["setLoadingStatus"] = this.setLoadingStatus;
    this.$refs["iframeLoadingV2"]["setLoadingButton"] = this.setLoadingButton;
    this.$refs["iframeLoadingV2"]["setloadingSVGHidden"] = this.setloadingSVGHidden;
  },
  methods: {
    load() {
      // 初始化iframe 路径，参数
      if (this.detail.documentName) {
        let { documentName } = this.detail
        let commonUrl = this.isDev ? devFormUrl : formUrl;
        // 表单数据
        let {id, ...data} = this.info
        let queryObj = {
          ...data,
          onlyView: this.onlyView,
        }
        this.url = `${commonUrl}/${documentName}.html?${qs.stringify(queryObj)}`
        this.pageLoadingText = documentName + ",正在加载中...";
        this.pageLoading = false
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
      // this.setLoadingStatus(false)
      this.pageLoading = false
      console.log('test-wid', this)
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
      if(this.info.formCode === 'E0607') {
        // let arr = Array.from(new Array(19), (j,k) => 4 + k)
        // arr.map((v) => {
        //   this.wid.document.querySelector(`.page:first-child .page_table-wrapper table tr:nth-child(${v + 1}) td:nth-child(3)`).style = 'display: none;'
        // })
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

      this.isLandscape = false;
      try {
        if (
          this.wid.formInfo &&
          this.wid.formInfo.hasOwnProperty("rotation") > -1
        ) {
          this.isLandscape =
            this.wid.formInfo.rotation == "landscape" ? true : false;
        }
        if (!this.wid.formInfo) {
          this.setLoadingStatus(true);
          this.setLoadingText(
            `网络异常,${
              this.info.name || this.info.pageUrl.replace(".html", "")
            },页面无法获取,请尝试刷新`
          );
          this.setloadingSVGHidden(true);
          this.setLoadingButton(true, "刷新", () => {
            console.log("刷新", window.wid.location);
            // window.wid.location.reload();
            this.setLoadingText("数据加载中...");
            this.refresh();
          });
        }
      } catch (error) {
        console.error("onload:formInfo:error", { error });
        // this.setLoadingStatus(true);
        this.setLoadingText(
          `网络异常,${this.info.name},页面无法获取,请尝试刷新.`
        );
        this.setloadingSVGHidden(true);
        this.setLoadingButton(true, "刷新", () => {
          console.log("err刷新", window.wid.location);
          // window.wid.location.reload();
          this.setLoadingText("数据加载中...");
          this.refresh();
        });
      } finally {
        this.setLoadingStatus(false)
      }

      if (
        this.wid.loadTimeData &&
        this.wid.loadTimeData.data_ &&
        this.wid.loadTimeData.data_.errorCode
      ) {
        console.log(
          "找不到页面",
          this.wid.loadTimeData.data_,
          this.wid.loadTimeData.data_.errorCode
        );
        this.pageLoadingText = "网络异常,页面无法获取,请尝试刷新";
        this.setloadingSVGHidden(true);
        this.setLoadingButton(true, "刷新", () => {
          console.log("刷新...");
          this.pageLoadingText = "刷新中...";
          setTimeout(() => {
            window.wid.location.reload();
          }, 100);
        });
      }
    },
    refresh() {
      try {
        this.$refs.iframe.contentWindow.location.reload();
      } catch (e) {}
    },

    // onFormLoaded(type = "") {
    //   console.log('test-1', 1)
    //   this.pageLoadingText = "数据加载中";
    //   this.pageLoading = false;
    //   this.setloadingSVGHidden(false);

    //   let wid = this.$refs.iframeV2.contentWindow;
    //   this.wid = this.$refs.iframeV2.contentWindow;
    //   this.wid.onmessage = this.onmessage;

    //   // 预览模式
    //   if (this.onlyView) {
    //     if (wid.document.querySelector(".tool-contain")) {
    //       wid.document.querySelector(".tool-contain").style = "display:none;";
    //       if (wid.document.querySelector("#app .form")) {
    //         wid.document.querySelector("#app .form").style =
    //           "padding-top:20px;";
    //       }
    //     }
    //     console.log('test-2', )
    //     if (wid.document.querySelector(".top-bar")) {
    //       wid.document.querySelector(".top-bar").style = "display:none;";
    //       wid.document.querySelector("body").style = "padding-top:20px;";
    //     }
    //   }

    //   // 这部分不需要
    //   // try {
    //   //   this.wid.formInfo.hospital = this.hospitalNameSpace;
    //   //   console.info("onFormLoaded:hospital", this.wid.formInfo);
    //   //   if (
    //   //     this.HOSPITAL_ID == "hj" &&
    //   //     this.$route.path.includes("showPatientDetails")
    //   //   ) {
    //   //     this.wid.formInfo.hospital = "";
    //   //   }
    //   // } catch (error) {
    //   //   console.info("onFormLoaded", error);
    //   // }
    // },
    setLoadingStatus(bool) {
      this.pageLoading = bool;
    },
    setLoadingText(text, callback = null) {
      this.pageLoadingText = text;
      if (callback) {
        callback();
      }
    },
    setLoadingButton(isShow, text = "知道了", callback = null) {
      var spinners = window.document.querySelectorAll(".el-loading-spinner");
      spinners = [...spinners];
      var spin = null,
        sinput = null,
        input = null;
      sinput = window.document.querySelector("#spin-button");
      if (isShow) {
        // console.log("spinners", spinners, sinput);
        if (spinners && spinners.length > 0) {
          spin = spinners.find((res) => {
            let className = "";
            try {
              className = res.parentNode.parentNode.className;
            } catch (error) {
              //
            }
            // console.log(className, res.innerText);
            return className == "contantV2";
            // return res.innerText.indexOf(key) > -1;
          });
          // console.log("spin", spin);
          if (spin) {
            if (!sinput) {
              input = document.createElement("input");
              input.type = "button";
              input.classList.add("mask-loading-button");
              input.id = "spin-button";
              input.value = text; //"知道了";
              input.onclick = () => {
                if (callback) {
                  callback();
                }
                this.setLoadingStatus(false);
                input.parentNode.removeChild(input);
              };
              spin.appendChild(input);
            } else {
              // console.log("sinput", sinput);
              sinput.value = text;
              if (callback) {
                sinput.onclick = callback;
              }
            }
          }
        }
      } else {
        if (sinput) {
          sinput.parentNode.removeChild(sinput);
        }
      }
    },
    setloadingSVGHidden(bool) {
      let svgs = [];
      svgs = window.document.querySelectorAll(".contantV2 .circular");
      svgs = [...svgs];
      //
      if (bool == true) {
        console.log("setloadingSVGHidden", bool, true, svgs);
        if (svgs && svgs.length > 0) {
          svgs.forEach((svg) => {
            svg.classList.add("hidden-loading"); //.setAttribute("visibility", "hidden");
          });
        }
        this.setLoadingButton(true);
      } else {
        console.log("setloadingSVGHidden", bool, false, svgs);
        // console.log("spinners:", spinners);
        // console.log("sinput:", sinput);
        if (svgs && svgs.length > 0) {
          svgs.forEach((svg) => {
            svg.classList.remove("hidden-loading"); //.setAttribute("visibility", "visible");
          });
        }
        this.setLoadingButton(false);
        // if (sinput) {
        //   sinput.parentNode.removeChild(sinput);
        // }
      }
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
}
</style>
