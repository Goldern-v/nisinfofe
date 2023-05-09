<template>
  <div id="diagnosisPagePrint">
    <!-- {{process}} -->
    <div class="iframe" v-html="sheetModel"></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#diagnosisPagePrint {
  .containter {
    margin: 0 !important;
    border-radius: 2px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px;
    width: 1500px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    height: 1100px;
    position: relative;
  }

  .containter {
    .el-table th {
      height: 30px;

      .cell {
        font-size: 12px;
        font-weight: 400;
        color: #000;
        background: #fff;
      }
    }

    .el-table {
      border: none;

      &::before, &::after {
        height: 0;
      }

      table {
        width: 100% !important;
        // border: 1px solid #000 !important;
      }

      th {
        border: 1px solid #000 !important;
      }

      td {
        border-right: 1px solid #000 !important;
        border-left: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
      }

      .cell {
        padding: 0 5px;
      }
      .gutter{
        border:none !important;
      }

      .selected-row td {
        background: #fff8b1 !important;
      }

      .el-table__header-wrapper, .el-table__body-wrapper {
        // margin-top: -1px;
        margin-left: 0;
      }

      .el-table__body-wrapper {
        height: auto !important;
      }
    }

  }
}

@media print {
  #diagnosisPagePrint {
    .containter {
      box-shadow: 0 0 0 !important;
      padding: 0 !important;
      margin: 0!important;

    }

    .el-table th {
      .cell {
        line-height:13px;
        // background: #f4f2f4;
      }
    }
    .el-table .cell{
      line-height:13px;
    }

    .iframe > div {
      padding-top: 80px !important;
      page-break-after: always;
      box-sizing: border-box;

    }
    // .iframe > div:nth-of-type(2n) {
    //   transform: rotate(180deg);
    // }
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
import common from "@/common/mixin/common.mixin.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
export default {
  mixins: [common],
  data() {
    return {
      iframeHeight: 0,
      pageLoading: true,
      bus: bus(this)
    };
  },
  created() {},
  mounted() {
    let sheetTableWidth = document.querySelector("div.containter").offsetWidth;

    $("#app").css({
      minWidth: sheetTableWidth + "px"
    });
    addCSS(
      window,
      `
      @media print {
          .iframe > div:nth-of-type(2n) {
            transform: rotate(180px) !important;
        }
      }
      `
    );
    if (sheetTableWidth > 1000) {
      printDir("h");
      addCSS(
        window,
        `
    @media print {
       .iframe > div:nth-of-type(2n) {
         height: ${sheetTableWidth * 0.755}px !important;
       }
    }
    `
      );
    } else {
      printDir("v");
      addCSS(
        window,
        `
        @media print {
          #diagnosisPagePrint .iframe > div{
           padding-top: 40px !important;
           }
           .iframe > div:nth-of-type(2n) {
               transform: rotate(0) !important;
          }
       }
        `
      );
    }

    /** 如果是超宽打印 */
    if (this.HOSPITAL_ID == "hj") {
      addCSS(
        window,
        `
        @page{
          margin: 0 5mm;
          size: ${Math.round((sheetTableWidth * 25.4) / 96)}mm ${Math.round(
          ((sheetTableWidth * 25.4) / 96) * 0.68
        )}mm;
        }

        @media print {
        diagnosisPagePrint .iframe > div:nth-of-type(2n) {
         height: auto !important;
         }
       }
        `
      );
    }
    if (this.HOSPITAL_ID == "qhwy") {
      addCSS(
        window,
        `
         @media print {
         .containter  {
          height: 1100px !important;
         }
       }
        `
      );
    }
    if (this.HOSPITAL_ID == "foshanrenyi") {
      addCSS(
        window,
        `
        #diagnosisPagePrint .containter  {
          width: 1300px !important;
        }
        @media print {
          #diagnosisPagePrint .containter  {
            width: 1300px !important;
          }
          #diagnosisPagePrint .iframe > div:nth-of-type(2n) {
            transform: rotate(-180px) !important;
          }
        }
        `
      );
    }
  },
  methods: {
    print() {
      if (
        Array.from(window.document.querySelectorAll("img")).every(
          img => img.complete
        )
      ) {
        window.print();
      } else {
        setTimeout(() => {
          this.print();
        }, 1000);
      }
    }
  },
  computed: {
    sheetModel() {
      let html = window.localStorage.diagnosisModel;
      var reg = /data-value/g;
      console.log('html',html)
      return html.replace(reg, "value");
    }
  },
  components: {}
};
</script>
