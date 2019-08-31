<template>
  <div>
    <button @click="getCertAndRandomSign">测试签名</button>
    <!-- <mewsChart></mewsChart> -->
  </div>
</template>

<script>
import mewsChart from "@/components/chart/mews-chart";
import { verifyCaSign } from "@/api/ca-sign_wx.js";
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    getCertAndRandomSign() {
      verifyCaSign();
    }
  },
  components: {
    mewsChart
  }
};
</script>

<style lang='scss' scoped>
</style>
