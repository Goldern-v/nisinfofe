<template>
  <div id="lcHealthContentPrintPage">
    <div class="iframe" v-html="lcHealthContentPrintPage"></div>
  </div>
</template>
<style lang="scss" rel="stylesheet/stylus" type="text/stylus">
.iframe {
  // min-height: 1000px;
  width: 700px;
  padding: 10px 30px 20px 30px;
  box-sizing: border-box;
  background: #ffffff;
  .health-education-head {
    padding: 10px;
    .hospital {
      font-size: 18px;
      text-align: center;
      font-weight: bold;
    }
    .title {
      font-size: 21px;
      padding: 5px 0 0px;
      text-align: center;
      font-weight: bold;
      margin-top: 5px;
    }
    .info {
      margin-top: 15px;
      margin-bottom: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 13px; // 小四
    }
  }
  table {
    width: 100%;
  }
  th,
  td {
    border: 1px solid #000;
    padding: 6px 10px;
    box-sizing: border-box;
    text-align: center;
    word-break: break-all;
    word-wrap: break-word;
  }
  .health-table-page {
    font-size: 13px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
}
.content {
  width: 620px;
  padding: 0 20px 10px 20px;
  box-sizing: border-box;
}
.content_title {
  font-size: 18px;
  text-align: left;
  font-weight: 900;
  margin: 10px 0 0 10px;
}
</style>
<script>
import { printDir } from "../control/common-print.js";
export default {
  data() {
    return {};
  },
  mounted() {
    $("#app").css({
      width: "100%"
    });
    printDir("");
  },
  methods: {},
  computed: {
    lcHealthContentPrintPage() {
      let html = window.localStorage.lcHealthContentPrintPage;
      var reg = /data-value/g;
      return html.replace(reg, "value");
    }
  }
};
</script>
