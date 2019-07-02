<template>
  <div class="container">
    <div class="tool-con">
      <toolBar :config="toolBarConfig"></toolBar>
    </div>
    <div class="body-con" v-loading="pdfLoading" element-loading-text="正在生成pdf,请稍后,数据不一致请点击清除缓存刷新">
      <iframe frameborder="0" v-if="pdfUrl" :src="pdfUrl" ref="pdfIframe" @load="onload"></iframe>
    </div>
  </div>
</template>

<script>
import toolBar from "@/components/toolBar/toolBar";
import { toolBarConfig } from "./config/toolBar";
import { toPdfPrint } from "../api/index";
import { setTimeout } from "timers";
import { addCSS } from "@/utils/css";
export default {
  data() {
    return {
      toolBarConfig: [],
      pdfLoading: true,
      pdfUrl: ""
    };
  },
  methods: {
    toPdfPrint(isRefresh = false) {
      this.pdfUrl = "";
      this.pdfLoading = true;
      toPdfPrint(this.$route.query.blockId, isRefresh).then(res => {
        console.log(res, "res");

        if (res.data.code == "200") {
          this.pdfUrl = res.data.data.uri;
          this.pdfLoading = false;
        }
        if (res.data.code == "400") {
          setTimeout(() => {
            this.toPdfPrint();
          }, 4000);
        }
      });
    },
    onload() {
      let wid = this.$refs.pdfIframe.contentWindow;

      console.log(
        wid.document.head || wid.document.getElementsByTagName("head")[0],
        "wid"
      );
      addCSS(
        wid,
        `viewer-pdf-toolbar #toolbar {
          display: none !important;
        }
      `
      );
    }
  },
  created() {
    this.toolBarConfig = toolBarConfig(this);
    this.toPdfPrint();
  },
  components: { toolBar }
};
</script>

<style lang='scss' scoped>
.body-con {
  height: calc(100vh - 40px);
  iframe {
    height: 100%;
    width: 100%;
  }
}
</style>