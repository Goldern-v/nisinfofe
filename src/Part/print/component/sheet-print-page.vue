<template>
  <div id="sheetPagePrint" :class="[HOSPITAL_ID=='guizhou'?'guizhou':['fuyou'].includes(HOSPITAL_ID)?'fontInputW':'']">
    <!-- {{process}} -->
    <!-- <iframe :src="url" :style="{height: iframeHeight + 'px'}" @load="onload" ref="iframe"></iframe> -->
    <div
      class="iframe"
      :class="HOSPITAL_ID === 'hengli' ? 'reduceGap' : ''"
      v-html="sheetModel"
    ></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
#sheetPagePrint {
  *{
    pointer-events: none;
  }
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
    // color: #000000 !important;
    // font-family: "SimHei" !important;
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
/* 打印时隐藏第二列签名---td */
  td[datakey='sign2'] {
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
  th[dataname='签名'] {
    width: 60px !important;
  }

  th[dataname='审核签名'] {
    display: none !important;
  }

  th[dataname='记录人签名']:first-child{
    width: 90px !important;
  }
  th[dataname='记录人签名']{
    width: 90px !important;
  }
  th[dataname='护士<br>签名']{
    width: 90px !important;
  }

/* 打印时隐藏第二列签名表头---th */
  th[dataname='记录人签名']:last-child{
    display :none;
  }
  // th[dataname='护士签名']:last-child{
  //   display :none;
  // }
  th[dataname='护士<br>签名']:last-child{
    display :none;
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
//字体变黑体，解决打印模糊问题
.fontInputW{
   input {
    color: #000000 !important;
    font-family: "SimHei" !important;
    font-weight: 400;
  }
   textarea {
    color: #000000 !important;
    font-family: "SimHei" !important;
    font-weight: 400 !important; 
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
    &.guizhou{
      .contant {
        margin-top: -50px!important;
      }
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
    /* 横沥所有护记头尾部空白减少 */
    .reduceGap> div{
      padding-top: 20px !important;
    }
    .iframe > div:nth-of-type(2n) {
      transform: rotate(180deg);
    }
    .el-checkbox__inner::after {
      border-color: #000;
    }
  }
  strong {
    font-family: "SimHei" !important;
    font-size: 13px !important;
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
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
export default {
  props: ["qoSelect"],
  mixins: [common],
  data() {
    return {
      url: "",
      iframeHeight: 0,
      pageLoading: true,
      bus: bus(this),
      sheetInfo,
      // 需要扩大行距的记录单code
      lineSpacingArr: [
        "icu_qz", // 曲周_重症护理记录单
        "neonatology_hd", // 花都_新生儿科护理记录单
        "postpartum_wj", // 武警_产后(产房)观察记录单
        "iabp_fs", // 佛山市一_IABP护理记录单
        "intravenous_sdlj", // 顺德龙江_硫酸镁、安宝静脉点滴观察记录表
        "mechanical_sdlj", // 机械通气监护记录单（儿科）
      ],
      // 需要双签名的记录单code
      multiSignArr: [
        "common_hd", // 花都_通用护理记录单
        "neurosurgery_hd", // 花都_神经外科护理记录单
        "prenatal_hd", // 花都_产前记录单
        "neonatology2_hd", // 花都_新生儿护理记录单
        "postpartum_hd", // 花都_产后记录单
        "wait_delivery_hd", // 花都_候产记录单
        "neonatology_hd", // 花都_新生儿科护理记录单

        "neonatal_care_jm", //江门妇幼_新生儿监护单
        "pediatric_surgery_jm", //江门妇幼_小儿外科护理记录单
        "pediatrics_jm", //江门妇幼_儿科护理记录单
        "child_recovery_jm", //江门妇幼_儿童康复科护理记录单
        "gynaecology_jm", //江门妇幼_妇科护理记录单
        "breastkenursing_jm", //江门妇幼_乳腺科护理记录单
        "obstetricnursing_jm", //江门妇幼_产科护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产护理记录单
        "postpartumnursing_jm",//江门妇幼_产后护理记录单
        "entdepartment_jm",//江门妇幼_耳鼻喉科护理记录单
        "catheterplacement_jm",//江门妇幼_深静脉导管置入术后维护单
        "safemetachysis_jm",//江门妇幼_输血护理记录单
        "internal_eval_lcey",//聊城_一般患者护理记录单
        "critical_new_lcey",//聊城_病重（危）患者护理记录单(带瞳孔）
        "critical_lcey",//聊城_病重（病危）患者护理记录单（带瞳孔）
      ]
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
    if (this.HOSPITAL_ID == "lingcheng") {
      let pageEle = document.querySelectorAll("div.contant");
      let arr = Array.from(pageEle);
      arr.map(child => {
        child.style.width = child.offsetWidth + 40 + "px";
      });
    }
    let sheetTableWidth = document.querySelector("div.contant").offsetWidth;
    // 江门妇幼的护理单打印双数页面会翻转,横沥ICU机械通气护理单,武汉肺科。修复
    if(this.HOSPITAL_ID==="sdlj" || this.HOSPITAL_ID==="fuyou"||this.sheetInfo.sheetType==="ventilation_hl"||this.HOSPITAL_ID==="wujing"||this.HOSPITAL_ID==="fsxt"||this.HOSPITAL_ID==="whfk"){
      printDir("h");
            addCSS(
              window,
              `
          @media print {
            .iframe > div:nth-of-type(2n) {
              transform: rotate(0deg) !important;
            }
          }
          `
            );
    }
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
    if((this.HOSPITAL_ID === "huadu")){
      addCSS(
        window,
        `
        @media print {
          .has-background{
            background:none!important;
          }
        }
        `
      );
    }
    /* 护理记录单行高 */
    if ( (this.HOSPITAL_ID === "quzhou") &&
      this.lineSpacingArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
        @media print {
          .body-con{
            height: 35px !important;
          }
        }
        `
      );
    }
    if ( (this.HOSPITAL_ID === "sdlj") &&
      this.lineSpacingArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
        @media print {
          .body-con{
            height: 35px !important;
          }
        }
        `
      );
    }
    if ( (this.HOSPITAL_ID === "wujing") &&
      this.lineSpacingArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
        @media print {
          .body-con{
            height: 30px !important;
          }
        }
        `
      );
    }
    if(this.sheetInfo.sheetType=="common_wj"){
      addCSS(
        window,
        `
        @media print {
          @page{
            margin:-55px 0 0;
          }
        }
        `
      );
    }
    if(this.sheetInfo.sheetType=="cardiovascular_xt"){
      addCSS(
        window,
        `
        @media print {
          @page{
            margin-top: -30px;
          }
        }
        `
      );
    }
    if ( (this.HOSPITAL_ID === "foshanrenyi") &&
      this.lineSpacingArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
        @media print {
          .body-con{
            height: 30px !important;
          }
        }
        `
      );
    }
    /* 护理记录单行高 */
    // if ((this.HOSPITAL_ID === "huadu") &&
    //   this.lineSpacingArr.includes(this.sheetInfo.sheetType)
    // ) {
    //   addCSS(
    //     window,
    //     `
    //     @media print {
    //       .body-con{
    //         height: 40px !important;
    //       }
    //       .body-con textarea{
    //         font-size: 16px !important;
    //       }
    //     }
    //     `
    //   );
    // }
    /* 花都打印双签名：第二个护士签名打印时隐藏 */
    if (
      (this.HOSPITAL_ID === "huadu") &&
      this.multiSignArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='质控护士签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='质控人<br/>签名']{
            display:none !important;
          }
          @media print {
            #sheetPagePrint .contant{
              margin-top:-20px;!important;
            }
          }
        `
      );
    }
    if (
      (this.HOSPITAL_ID === "fsxt")
    ) {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='审核签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='审核<br/>签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='审核<br/>护士']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='护士<br/>签名']{
            width:100px
          }
          img{
            transform: scale(0.7);
          }
          @media print {
            #sheetPagePrint .contant{
              margin-top:-20px;!important;
            }
          }
        `
      );
    }
     if (
      (this.HOSPITAL_ID === "liaocheng") &&
      this.multiSignArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='医师签名']{
            display:none !important;
          }
           #sheetPagePrint th[dataname="护士签名"] {
              min-width: 100px !important;
              max-width: 100px !important;
            }
           img{
              transform: scale(0.8);
            }
        `
      );
    }
     if (
      (this.HOSPITAL_ID === "sdlj") &&
      this.sheetInfo.sheetType == "neonate_sdlj"
    ) {
      addCSS(
        window,
        `
           #sheetPagePrint th[dataname="护士<br/>签名"] {
              min-width: 100px !important;
              max-width: 100px !important;
            }
        `
      );
    }
    if (this.HOSPITAL_ID === "foshanrenyi") {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='质控护士签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='质控护士']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='质控人<br/>签名']{
            display:none !important;
          }
          @media print {
            #sheetPagePrint .contant{
              margin-top:-20px;!important;
            }
          }
        `
      )
    }
    if (
      (this.HOSPITAL_ID === "fuyou") &&
      this.multiSignArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='上级护士签名']{
            display:none !important;
          }
           #sheetPagePrint#sheetPagePrint th[dataname='核对者']{
            display:none !important;
          }
        `
      );
    }
    if (this.HOSPITAL_ID == "weixian") {
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
        #sheetPagePrint#sheetPagePrint .iframe > div:nth-of-type(2n) {
         height: auto !important;
         }
        #sheetPagePrint#sheetPagePrint .iframe > div:nth-of-type(2n) {
            transform: rotate(0deg) !important;
       }
       }
       #sheetPagePrint#sheetPagePrint th[dataname='护士签名'] {
         width: 60px !important;
       }
       .sign-img img {
         width: 40px !important;
         height: calc(100% - 2px)  !important;
         margin: 0  !important;
       }
        `
      );
    }
    if (this.HOSPITAL_ID === "sdlj") {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='上级<br/>签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='上级签名']{
            display:none !important;
          }

          @media print {
            #sheetPagePrint .contant{
              margin-top:-20px;!important;
            }
          }
        `
      )
    }

    // 陵城打印
    if (this.HOSPITAL_ID == "lingcheng") {
      addCSS(
        window,
        `
       .table-footer {
         padding-bottom: 10px;
       }
       .sign-img img {
         margin: 0  !important;
       }
        `
      );
      //亚心打印
      if (
      (this.HOSPITAL_ID === "whyx") 
      ) {
      addCSS(
        window,
        `
           img{
              transform: scale(0.8);
            }
        `
      );
    }
      if (sheetInfo.sheetType == "Record_Children_Serious_Lc") {
        addCSS(
          window,
          `
          @media print {
            #sheetPagePrint td[datakey="description"] input{
              font-size: 14px !important;
            }
            #sheetPagePrint th[dataname="特殊情况记录"] {
              min-width: 350px !important;
              max-width: 350px !important;
            }
          }
          `
        );
      }
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
      /* 聊城二院-介入诊疗护理记录单时间选择器打印显示 */
      if ($(".editOrPirnt").length) {
        const cssArr = Array.from($(".editOrPirnt"));
        cssArr.forEach(item => {
          item.style.display = "none";
          item.outerText =
            (item.attributes.value && item.attributes.value.value) || "";
        });
      }
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

    if (this.$route.query.toPrint == "true") {
      setTimeout(() => {
        this.print();
      }, 1000);
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
      let html =window.localStorage.sheetModel;
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
