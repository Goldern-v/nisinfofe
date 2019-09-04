<template>
  <div id="sheetPagePrint">
    <!-- {{process}} -->
    <!-- <iframe :src="url" :style="{height: iframeHeight + 'px'}" @load="onload" ref="iframe"></iframe> -->
    <div class="iframe" v-html="sheetModel"></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#sheetPagePrint {
  overflow: hidden;

  .contant {
    margin: 0 !important;
    padding: 20px 20px;
    box-sizing: content-box;
  }

  .sheet-table {
    // width 1100px !important
  }

  .add-row {
    display: none;
  }

  .body-con {
    background: #fff !important;
  }

  input {
    color: #000 !important;
  }

  .canSet {
    color: #000;
  }

  td[datakey='signerNo'] {
    display: table-cell !important;
  }

  td[datakey='sign'] {
    display: none !important;
  }

  // td[datakey="auditorNo"] {
  // display: table-cell !important
  // }
  td[datakey='audit'] {
    display: none !important;
  }

  td[datakey='auditorNo'] {
    display: none !important;
  }

  th[dataname='护士签名'] {
    width: 90px !important;
  }

  th[dataname='审核签名'] {
    display: none !important;
  }

  .sign-img {
    width: 100%;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 0;
      flex: 1;
      height: 30px;
      object-fit: contain;
      margin: 0 -5px;
    }

    span {
      font-size: 20px;
      color: #000;
      margin: 0 -1px;
    }
  }

  .no-print {
    display: none !important;
  }

  .border-none {
    border: 0 !important;
  }

  .head-sign-text {
    display: none;
  }

  .head-sign-img {
    display: inline-block;
  }

  [datakey='description'] {
    text-align: left;
  }
}

@media print {
  #sheetPagePrint {
    .contant {
      box-shadow: 0 0 0 !important;
      padding: 0 !important;
      // margin 80px 0 0 !important
      // width 1100px !important
      margin: 0 !important;
    }

    .his-logo {
      top: 0 !important;
      left: 0 !important;
    }

    .header-con h1 {
      margin-top: 0 !important;
    }

    .iframe > div {
      page-break-after: always;
      padding-top: 80px;
      box-sizing: border-box;
    }

    .iframe > div:nth-of-type(2n) {
      transform: rotate(180deg);
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
import common from "@/common/mixin/common.mixin.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
export default {
  props: ["qoSelect"],
  mixins: [common],
  data() {
    return {
      url: "",
      iframeHeight: 0,
      pageLoading: true,
      bus: bus(this)
    };
  },
  created() {
    let host;
    if (process.env.NODE_ENV === "production") {
      host = "/crNursing";
    } else {
      host = "";
    }
    this.url = `${host}/sheet-page-print.html`;
  },
  mounted() {
    if (document.querySelector('th[dataname="审核签名"]')) {
      $(".contant").width(Math.max($(".contant").width()));
    }
    let sheetTableWidth = document.querySelector("div.contant").offsetWidth;
    $("#app").css({
      minWidth: sheetTableWidth + "px"
    });
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
          #sheetPagePrint .iframe > div{
           padding-top: 40px !important;
           }
           .iframe > div:nth-of-type(2n) {
               transform: rotate(0) !important;
          }
       }
        `
      );
    }

    /** 如果是威县超宽打印 */
    if (this.HOSPITAL_ID == "weixian") {
      addCSS(
        window,
        `
        @page{
          margin: 5mm;
          size: ${Math.round((sheetTableWidth * 25.4) / 96)}mm ${Math.round(
          ((sheetTableWidth * 25.4) / 96) * 0.68
        )}mm;
        }

        @media print {
        #sheetPagePrint#sheetPagePrint .iframe > div:nth-of-type(2n) {
         height: auto !important;
         }
        #sheetPagePrint#sheetPagePrint .iframe > div:nth-of-type(2n) {
            transform: rotate(0deg) !important;
       }
       }
        `
      );
    }

    if (!this.isDev) $('[style="display: none;"]').remove();
    if (!this.isDev) $(".no-print").remove();

    this.$nextTick(() => {
      $("#sheetPagePrint")
        .find("span")
        .each((index, item) => {
          if ($(item).html() == "签名") {
            $(item).html("");
          }
          if (
            $(item)
              .html()
              .indexOf("标题1") > -1 ||
            $(item)
              .html()
              .indexOf("标题2") > -1 ||
            $(item)
              .html()
              .indexOf("标题3") > -1 ||
            $(item)
              .html()
              .indexOf("标题4") > -1 ||
            $(item)
              .html()
              .indexOf("标题5") > -1 ||
            $(item)
              .html()
              .indexOf("标题6") > -1 ||
            $(item)
              .html()
              .indexOf("标题7") > -1 ||
            $(item)
              .html()
              .indexOf("标题8") > -1 ||
            $(item)
              .html()
              .indexOf("标题9") > -1
          ) {
            $(item).html("");
          }
        });
      $("[ischecked='true']").each((index, el) => {
        $(el).prop("checked", true);
      });
      /** 添加上标下标 */
      $('[datakey="description"]').each((index, el) => {
        let dataValue = $(el)
          .find("input")
          .val();
        let resultValue = `<span>${formatSub(
          formatSub(formatSub(dataValue))
        )}</span>`;
        if (dataValue.indexOf("^") > -1) {
          $(el)
            .empty()
            .append(resultValue);
        }
      });
    });
    $(".iframe > div").each((index, element) => {
      console.log($(element).find(".contant").length);
      if ($(element).find(".contant").length == 0) {
        $(element).remove();
      }
    });
    $("textarea").each((index, el) => {
      $(el).html($(el).attr("value"));
    });
  },
  methods: {},
  computed: {
    sheetModel() {
      let html = window.localStorage.sheetModel;
      var reg = /data-value/g;
      return html.replace(reg, "value");
    }
  },
  watch: {
    qoSelect() {
      if (this.qoSelect == "0") {
        $(".iframe>div").show();
      } else if (this.qoSelect == "1") {
        $(".iframe>div").show();
        $(".iframe>div:nth-of-type(2n)").hide();
      } else if (this.qoSelect == "2") {
        $(".iframe>div").show();
        $(".iframe>div:nth-of-type(2n - 1)").hide();
      }
    }
  },
  components: {}
};
</script>
