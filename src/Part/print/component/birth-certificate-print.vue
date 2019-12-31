<template>
  <div id="birthCertificatePrint">
    <div class="iframe" v-html="sheetModel"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#birthCertificatePrint {
  padding: 0;
  margin: 0 auto;
  overflow: hidden;

  .form-content {
    margin: 0 auto;
    page-break-after: always;
    min-height: 1000px;
  }

  .noPrint {
    display: none;
  }

  .inPrint {
    display: block;
  }

  .form-content {
    width: 740px;
    margin: 0 auto;
    padding: 28px 50px 41px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
    color: #333;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

    h3 {
      font-size: 22px;
      text-align: center;
      line-height: 30px;
      padding-bottom: 13px;
    }

    input {
      border: none;
    }

    .date {
      input {
        width: 20px;
      }
    }
  }

  .from-paste {
    padding: 77px 70px 35px 70px;

    p {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      line-height: 25px;
      padding-bottom: 16px;
    }

    .left, .right {
      .paste-area {
        width: 300px;
        height: 840px;
        border: 1px solid rgba(0, 0, 0, 1);
        box-sizing: border-box;
        text-align: center;
      }

      span {
        display: inline-block;
        width: 43px;
        font-size: 30px;
        line-height: 63px;
        padding-top: 172px;
      }
    }

    .left {
      float: left;
    }

    .right {
      padding-left: 310px;
    }

    .pageNum {
      font-size: 15px;
      line-height: 21px;
      text-align: center;
      padding-top: 50px;
    }
  }

  .excel {
    table {
      width: 100%;

      th, td {
        font-size: 13px;
        border-top: 1px solid #000;
        border-right: 1px solid #000;
        border-left: 1px solid #000;
        height: 36px;
        vertical-align: middle;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        &.label {
          background-color: #f4f2f5;
          padding-left: 15px;
        }

        > div {
          span {
            span, input {
              font-size: 13px;
            }
          }
        }

        > div, input {
          display: inline-block;
          width: 100%;
          height: 100%;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }

        input {
          padding-left: 5px;
          padding-right: 5px;
        }
      }

      tr {
        &:last-of-type {
          td {
            border-bottom: 1px solid #000;
          }
        }
      }

      input {
        border: none;
        outline: none;

        &:focus {
          background-color: #fef8b1;
        }
      }

      .title {
        font-size: 16px;
        text-align: center;
        font-weight: bold;
        height: 34px;
      }
    }

    .sign-img {
      display: none;
    }

    .containTable {
      padding-left: 0;
      height: 100%;
      vertical-align: middle;

      table {
        height: 100%;
      }

      td {
        border: none !important;
        border-right: 1px solid #000 !important;

        &:last-of-type {
          border-right: none !important;
        }
      }
    }

    .fillDate {
      > div {
        padding-top: 11px;
      }
    }
  }
}

@media print {
  #birthCertificatePrint {
    .form-content {
      box-shadow: 0 0 0 0;

      .page-con {
        bottom: 0;
      }

      .his-logo {
        top: 0;
        left: 0;
      }
    }
  }
}

@page {
  margin: 0 10mm;
}
</style>
<script>
import $ from "jquery";
import bus from "vue-happy-bus";
import { printDir } from "../control/common-print.js";
export default {
  data() {
    return {
      iframeHeight: 0,
      pageLoading: true,
      bus: bus(this)
    };
  },
  created() {},
  mounted() {
    $("#app").css({
      minWidth: "700px"
    });
    printDir("v");
  },
  methods: {},
  computed: {
    sheetModel() {
      let html = window.localStorage.previewBirthCertificate;
      var reg = /data-value/g;
      return html.replace(reg, "value");
      return html;
    }
  },
  components: {}
};
</script>
