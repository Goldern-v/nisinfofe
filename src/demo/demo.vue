<template>
  <div>
    <!-- <button @click="getCertAndRandomSign">测试签名</button> -->
    <!-- <mewsChart></mewsChart> -->
    <!-- <baseTree :configList="configList"></baseTree> -->
    <iframe @load="onload"></iframe>
  </div>
</template>

<script>
import mewsChart from "@/components/chart/mews-chart";
import { verifyCaSign } from "@/api/ca-sign_wx.js";
import baseTree from "@/components/baseTree/baseTree";
export default {
  data() {
    return {
      configList: [
        {
          label: "标题",
          children: [
            {
              label: "内容",
              onClick(config) {
                console.log(config, "config");
              }
            },
            {
              label: "内容",
              onClick(config) {
                console.log(config, "config");
              }
            }
          ]
        },
        {
          label: "标题",
          children: [
            {
              label: "内容",
              onClick(config) {
                console.log(config, "config");
              }
            },
            {
              label: "内容",
              onClick(config) {
                console.log(config, "config");
              }
            }
          ]
        }
      ]
    };
  },
  methods: {
    getCertAndRandomSign() {
      verifyCaSign();
    },
    onload() {
      let wid = document.querySelector("iframe").contentWindow;
      let n = document.createElement("div");
      let h = document.createElement("meta");

      h["http-equiv"] = "Content-Type";
      h["content"] = "text/html; charset=gbk";
      n.innerHTML = `<iframe src="/hcres/emr_pdf/6508682_1/A.1.html" frameborder="0" class="emr-pdf" />`;
      wid.document.body.appendChild(n);
      wid.document.head.appendChild(h);
    }
  },
  components: {
    mewsChart,
    baseTree
  }
};
</script>

<style lang='scss' scoped>
</style>
