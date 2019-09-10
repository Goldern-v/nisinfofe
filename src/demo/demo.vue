<template>
  <div>
    <!-- <button @click="getCertAndRandomSign">测试签名</button> -->
    <!-- <mewsChart></mewsChart> -->
    <baseTree :configList="configList"></baseTree>
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
