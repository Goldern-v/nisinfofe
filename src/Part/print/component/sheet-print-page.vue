<template>
  <div
    id="sheetPagePrint"
    :class="[
      HOSPITAL_ID == 'guizhou'
        ? 'guizhou'
        : ['fuyou'].includes(HOSPITAL_ID)
        ? 'fontInputW'
        : ['zhzxy'].includes(HOSPITAL_ID)
        ? 'zhzxyInputW'
        : '',
    ]"
    :style="[overflowAuto && { overflow: 'auto' }]"
  >
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
  * {
    pointer-events: none;
  }
.sheet-page-container .sheet-table .body-con.clickRow td,
.sheet-excel-container .sheet-table .body-con.clickRow td{
  background: transparent;
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

  input, textarea {
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

  th[dataname='检查者'] {
    width: 60px !important;
  }

  th[dataname='审核签名'] {
    display: none !important;
  }

  th[dataname='记录人签名']:first-child {
    width: 90px !important;
  }

  th[dataname='记录人签名'] {
    width: 90px !important;
  }

  th[dataname='护士<br>签名'] {
    width: 90px !important;
  }

  th[dataname='带教<br/>护士'] {
    display: none !important;
  }

  /* 打印时隐藏第二列签名表头---th */
  th[dataname='记录人签名']:last-child {
    display: none;
  }

  // th[dataname='护士签名']:last-child{
  // display :none;
  // }
  th[dataname='护士<br>签名']:last-child {
    display: none;
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
      // margin: 0 -5px;
      width: min(50px, 100%);
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

  &.zhzxyInputW {
    table td, th textarea, input, span {
      font-size: 14px !important;
    }
  }
}

// 字体变黑体，解决打印模糊问题
.fontInputW {
  input {
    color: #000000 !important;
    font-family: 'SimHei' !important;
    font-weight: 400;
  }

  textarea {
    color: #000000 !important;
    font-family: 'SimHei' !important;
    font-weight: 400 !important;
  }

  div {
    color: #000000 !important;
    font-family: 'SimHei' !important;
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

    &.nfyksdyyInputW {
      input, textarea {
        color: #000 !important;
        // font-size:12px !important;
        // color: #000000 !important;
        // font-family: "SimHei" !important;
      }
    }

    &.guizhou {
      .contant {
        margin-top: -50px !important;
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

    .iframe > div:last-child {
      page-break-after: auto;
    }

    /* 横沥所有护记头尾部空白减少 */
    .reduceGap> div {
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
    font-family: 'SimHei' !important;
    font-size: 13px !important;
  }
}

@page {
  margin: 0 10mm;
}
</style>

<script>
// le f = ''
import $ from "jquery";
import bus from "vue-happy-bus";
import { printDir } from "../control/common-print.js";
import common from "@/common/mixin/common.mixin.js";
import { addCSS } from "@/utils/css";
import { formatSub } from "@/utils/sup";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import { readTxt } from "@/Page/sheet-page/components/sheet-tool/sheetPageModal.js"
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
      sheetModel:"",
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
        "wait_delivery_zhzxy", // 珠海中西医_候产记录单
        "neonatology_hd", // 花都_新生儿科护理记录单
        "neonatal_care_jm", //江门妇幼_新生儿监护单
        "pediatric_surgery_jm", //江门妇幼_小儿外科护理记录单
        "pediatrics_jm", //江门妇幼_儿科护理记录单
        "child_recovery_jm", //江门妇幼_儿童康复科护理记录单
        "gynaecology_jm", //江门妇幼_妇科护理记录单
        "generalsurgery_jm", //江门妇幼_普外科护理记录单
        "neonatology_jm", //江门妇幼_产科新生儿护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产记录单
        "tcm_pediatrics_jm", //江门妇幼_中医儿科护理记录单
        "breastkenursing_jm", //江门妇幼_乳腺科护理记录单
        "obstetricnursing_jm", //江门妇幼_产科护理记录单
        "antenatalwaiting_jm", //江门妇幼_产前待产护理记录单
        "postpartumnursing_jm", //江门妇幼_产后护理记录单
        "entdepartment_jm", //江门妇幼_耳鼻喉科护理记录单
        "ear_nose_jm", //江门妇幼_耳鼻喉科护理记录单-成人
        "internalCareRecord", //江门妇幼_内科护理记录单
        "catheterplacement_jm", //江门妇幼_深静脉导管置入术后维护单
        "safemetachysis_jm", //江门妇幼_输血护理记录单
        "internal_eval_lcey", //聊城_一般患者护理记录单
        "critical_new_lcey", //聊城_病重（危）患者护理记录单(带瞳孔）
        "critical2_lcey", //聊城_病重（危）患者护理记录单
        "critical_lcey", //聊城_病重（病危）患者护理记录单（带瞳孔）
      ],
      heightAdjuthd: ["postpartum_hd", "wait_delivery_hd", "prenatal_hd"],
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
  async mounted() {
    await this.getData()
    console.log(
      "this.sheetInfo.sheetType",
      this.sheetInfo.sheetType,
      this.HOSPITAL_ID
    );
    if (document.querySelector('th[dataname="审核签名"]')) {
      $(".contant").width(Math.max($(".contant").width()));
    }
    // if(){
    //   document.getElementById("sheetPagePrint").style.overflow = "auto"
    // }

    if (this.HOSPITAL_ID == "lingcheng") {
      let pageEle = document.querySelectorAll("div.contant");
      let arr = Array.from(pageEle);
      arr.map((child) => {
        child.style.width = child.offsetWidth + 40 + "px";
      });
    }
    let sheetTableWidth = document.querySelector("div.contant").offsetWidth;
    //   医院的护理单打印双数页面会翻转（双面打印）。这些医院都是不需要偶数页面打印翻转的
    if (
      this.HOSPITAL_ID === "sdlj" ||
      this.HOSPITAL_ID === "fuyou" ||
      this.sheetInfo.sheetType === "ventilation_hl" ||
      this.HOSPITAL_ID === "wujing" ||
      this.HOSPITAL_ID === "fsxt" ||
      this.HOSPITAL_ID === "gdtj" ||
      this.HOSPITAL_ID === "whfk" ||
      this.HOSPITAL_ID === "foshanrenyi" ||
      this.HOSPITAL_ID === "zhzxy" ||
      this.HOSPITAL_ID === "lyxrm" ||
      this.HOSPITAL_ID === "huadu" ||
      this.HOSPITAL_ID === "xiegang" ||
      this.HOSPITAL_ID === "whsl" ||
      this.HOSPITAL_ID === "ytll" ||
      this.HOSPITAL_ID === "stmz" ||
      this.HOSPITAL_ID === "lyyz" ||
      this.HOSPITAL_ID === "hj" ||
      this.HOSPITAL_ID === "nfyksdyy" ||
      this.HOSPITAL_ID === "dglb" ||
      this.HOSPITAL_ID === "beihairenyi"
    ) {
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
      minWidth: sheetTableWidth + "px",
    });
    console.log("this.sheetInfo.sheetType ", this.sheetInfo.sheetType);

    if (
      sheetTableWidth > 1000 &&
      !["ops_linyi", "nicu_custody_hd"].includes(this.sheetInfo.sheetType) &&
      this.query.sheetType !== "critical2_weihai"
    ) {
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
    } else if (this.sheetInfo.sheetType == "ops_linyi") {
      //解决A3打印偶数页时会多一页空白页
      printDir("h");
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(2n) {
            height: ${sheetTableWidth * 0.75}px !important;
          }
        }
        `
      );
    } else if (this.sheetInfo.sheetType == "nicu_custody_hd") {
      printDir("h");
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(2n) {
            height: ${sheetTableWidth * 0.74}px !important;
          }
        }
        `
      );
    } else if ("critical2_weihai" === this.query.sheetType) {
      addCSS(
        window,
        `
        @media print {
          @page{
            size:A4;
          }
          .iframe > div:nth-of-type(n){
            transform: rotateZ(90deg) scaleX(.9) scaleY(1.33) translateY(615px) !important;
            margin-top: 30px !important;
            transform-origin: center center !important;
            height: 1620px !important;
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
    if (
      [
        "orthopedics",
        "gynecology",
        "infectious_diseases",
        "respiration",
        "internal_eval_hj",
        "reha_medicine",
        "urology",
        "neurology",
        "endocrinology",
        "general_surgery",
        "neurosurgery",
        "gastroenterology",
        "neonatology2",
        "medicine_cardiovascular",
        "ear_nose_throat",
        "tumor_hemodialysis",
        "obstetrics",
        "pediatrics",
      ].includes(this.query.sheetType)
    ) {
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(n) {
            height:auto !important;
            transform: scaleY(1) !important;
            margin-top:-50px !important;
          }
        }
        `
      );
    }
    if (["prenatal"].includes(this.query.sheetType)) {
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(n) {
            height:auto !important;
            transform: scaleY(1) !important;
            margin-top:-30px !important;
          }
        }
        `
      );
    }else if (["extracardi_three_weihai"].includes(this.query.sheetType)) {
    // }else if (this.sheetInfo.sheetType ==  "extracardi_three_weihai") {
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(n) {
            height: ${sheetTableWidth * 0.755}px !important;
            transform: scaleX(0.99) scaleY(1.2) !important;
            transform-origin: top center !important;
            margin-top: -40px !important;
          }
        }
        `
      );
    } else if (["intervention_cure", "cpr"].includes(this.query.sheetType)) {
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(n) {
            height:auto !important;
            transform: scaleY(1) !important;
            margin-top:-70px !important;
          }
        }
        `
      );
    } else if (this.sheetInfo.sheetType == "postpartumnursing_jm") {
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(n) {
            transform: scaleY(1) !important;
            margin-top:-40px !important;
        }
        `
      );
    }
    if (this.HOSPITAL_ID === "huadu") {
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
    if (
      this.HOSPITAL_ID === "quzhou" &&
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
    if (
      this.HOSPITAL_ID === "sdlj" &&
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
    if (
      this.HOSPITAL_ID === "wujing" &&
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
    if (['common_wj', 'waiting_birth_wj'].includes(sheetInfo.sheetType)) {
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
    if (this.sheetInfo.sheetType == "cardiovascular_xt") {
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
    if (["zhzxy"].includes(this.HOSPITAL_ID)) {
      addCSS(
        window,
        `
        @media print {
          .body-con{
            height: 37px !important;
          }
        }
        `
      );
    }
    if (
      ["foshanrenyi"].includes(this.HOSPITAL_ID) &&
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
    /* 花都打印双签名：第二个护士签名打印时隐藏 */
    if (
      this.HOSPITAL_ID === "huadu" &&
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
      this.HOSPITAL_ID === "huadu" &&
      this.heightAdjuthd.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
          @media print {
            .body-con{
              height: 37px !important;
            }
            #sheetPagePrint .contant{
              margin-top:-20px;!important;
            }
          }
        `
      );
    }

    if (this.HOSPITAL_ID === "fsxt") {
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
      this.HOSPITAL_ID === "liaocheng" &&
      this.multiSignArr.includes(this.sheetInfo.sheetType)
    ) {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='医师签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='护士签名']{
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
    if (this.HOSPITAL_ID === "qhwy") {
      addCSS(
        window,
        `
           img{
              transform: scale(0.8);
            }

        `
      );
    }
    if (
      this.sheetInfo.sheetType == "neonatal_care_qhwy"
    ) {
      addCSS(
        window,
        `
           #sheetPagePrint th[dataname="护士签名"] {
              min-width: 70px !important;
              max-width: 70px !important;
            }
        `
      );
    }
    if (this.HOSPITAL_ID === "gdtj") {
      addCSS(
        window,
        `
            #sheetPagePrint th[dataname="护士<br/>签名"] {
              min-width: 100px !important;
              max-width: 100px !important;
           }
           img{
              transform: scale(0.8);
            }
        `
      );
    }
    if (this.HOSPITAL_ID === "xiegang") {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='审核<br/>签名']{
            display:none !important;
          }
           #sheetPagePrint#sheetPagePrint th[dataname='审核人<br/>签名']{
            display:none !important;
          }
          #sheetPagePrint th[dataname="记录者<br/>签名"] {
              min-width: 100px !important;
              max-width: 100px !important;
            }
        `
      );
    }
    if (
      this.HOSPITAL_ID === "sdlj" &&
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
    if (["foshanrenyi"].includes(this.HOSPITAL_ID)) {
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
      );
    }
    if (
      this.HOSPITAL_ID === "fuyou" &&
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
    if (this.HOSPITAL_ID === "925") {
      printDir("h");
      addCSS(
        window,
        `
           @media print {
             @page{
                 padding:10px 0 0 10px;

            }
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
          #sheetPagePrint#sheetPagePrint th[dataname='上级护士签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='护士<br>签名']{
             min-width: 100px !important;
              max-width: 100px !important;
          }
          @media print {
            #sheetPagePrint .contant{
              margin-top:-20px;!important;
            }
          }
        `
      );
    }
    //骨科护理记录单
    if (this.query.sheetType === "orthopaedic_sdlj" ) {
      addCSS(
        window,
        `
        .info-con{
            font-size:14px!improtant;
          }
          @media print {
            #sheetPagePrint .body-con{ height: 40px !important; }
            #sheetPagePrint .body-con td input { font-size: 14px !important;}
            #sheetPagePrint .body-con td  textarea{ font-size: 14px !important;}
            #sheetPagePrint .body-con td[datakey="description"]  textarea{ font-size: 12px !important;}
          }
        `
      );
    }
    //普通护记
      if (this.query.sheetType === "ordinary_sdlj" ) {
      // if (this.sheetInfo.sheetType == "ordinary_sdlj" ) {
      addCSS(
        window,
        `
          @media print {
            #sheetPagePrint .contant{
              margin-top:-35px !important;
            }
          }
        `
      );
    }
    if (this.HOSPITAL_ID === "nfyksdyy") {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='查房签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='上级<br/>签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='上级签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='上级护士签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='护士<br>签名']{
             min-width: 100px !important;
              max-width: 100px !important;
          }
          .info-con{
            font-size:16px!important;
          }

          #sheetPagePrint td[datakey="signerNo"] .sign-img img{
              transform:scale(0.81)
          }
          @media print {
            #sheetPagePrint .body-con{ height: 40px !important; }
            #sheetPagePrint .body-con td input { font-size: 14px !important;}
            #sheetPagePrint .body-con td  textarea{ font-size: 14px !important;}
            #sheetPagePrint .body-con td[datakey="description"]  textarea{ font-size: 14px !important;}
          }

        `
      );
    }
    //
    if (this.query.sheetType === "baby_sdry" || this.query.sheetType === "postpartum2_sdry" ) {
      addCSS(
        window,
        `
        .info-con{
            font-size:16px!improtant;
          }

          #sheetPagePrint td[datakey="signerNo"] .sign-img img{
              transform:scale(0.81)
          }
          @media print {
            #sheetPagePrint .body-con{ height: 36px !important; }
            #sheetPagePrint .body-con td input { font-size: 14px !important;}
            #sheetPagePrint .body-con td  textarea{ font-size: 14px !important;}
          }
        `
      );
    }
    if (sheetInfo.sheetType == "critical_new_weihai" ) {
      addCSS(
        window,
        `
        .info-con{
            font-size:14px!improtant;
          }

          #sheetPagePrint td[datakey="signerNo"] .sign-img img{
              transform:scale(0.81)
          }
          @media print {
            #sheetPagePrint .body-con{ height: 40px !important; }
            #sheetPagePrint .body-con td input { font-size: 14px !important;}
            #sheetPagePrint .body-con td  textarea{ font-size: 14px !important;}
            #sheetPagePrint .body-con td[datakey="description"]  textarea{ font-size: 14px !important;}
          }
        `
      );
    }
    if (this.query.sheetType === "postpartum_sdry") {
      addCSS(
        window,
        `
        .info-con{
            font-size:16px!improtant;
          }

          #sheetPagePrint td[datakey="signerNo"] .sign-img img{
              transform:scale(0.81)
          }
          @media print {
            #sheetPagePrint .body-con{ height: 35px !important; }
            #sheetPagePrint .body-con td input { font-size: 14px !important;}
            #sheetPagePrint .body-con td  textarea{ font-size: 14px !important;}
            #sheetPagePrint .contant{margin-top:-30px !important;}
          }
        `
      );
    }
    if (sheetInfo.sheetType == "oxytocin_sdry") {
      addCSS(
        window,
        `
        .info-con{
            font-size:15px!improtant;
          }

          #sheetPagePrint td[datakey="signerNo"] .sign-img img{
              transform:scale(0.81)
          }
          @media print {
            #sheetPagePrint .body-con{ height: 33px !important; }
            #sheetPagePrint .body-con td input { font-size: 14px !important;}
            #sheetPagePrint .body-con td  textarea{ font-size: 14px !important;}
            #sheetPagePrint .contant{margin-top:-30px !important;}
          }
        `
      );
    }
    // 如果双签可以这里加。打印的时候签名二合一。签名列拉宽
    if (sheetInfo.sheetType == "generalnursing_tj") {
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
    if (sheetInfo.sheetType == "baby_tj") {
      addCSS(
        window,
        `
            #sheetPagePrint th[dataname="签 名"] {
              min-width: 100px !important;
              max-width: 100px !important;
           }
           @media print {
            #sheetPagePrint td {
              line-height: 36px !important;
            }

          }
        `
      );
    }
    if (sheetInfo.sheetType == "two_whhk") {
      addCSS(
        window,
        `
              @media print {
    #sheetPagePrint .iframe > div{
       padding-top:20px !important;
   }
    .iframe > div:nth-of-type(2n) {
             margin-top:50px !important;
            }
           #sheetPagePrint .body-con {
           height: 46px !important;
           font-size:15px !important;
            }
        `
      );
    }
    if (sheetInfo.sheetType == "one_whhk") {
      addCSS(
        window,
        `
           @media print {
      .iframe > div:nth-of-type(2n) {
             margin-top:50px !important;
            }
           #sheetPagePrint .body-con {
           height: 46px !important;
           font-size:15px !important;
            }
        `
      );
    }
    if (["zjhj"].includes(this.HOSPITAL_ID)) {
      addCSS(
        window,
        `
          #sheetPagePrint#sheetPagePrint th[dataname='质控人签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='记录人签名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='质控人<br/>签  名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='审核人<br/>签  名']{
            display:none !important;
          }
          #sheetPagePrint#sheetPagePrint th[dataname='记录人<br/>签  名']{
             min-width: 90px !important;
              max-width: 90px !important;
          }

        `
      );
    }
    if (["record_common_zjhj" , "neonatology_zjhj"].includes(this.query.sheetType) ) {
      addCSS(
        window,
        `
        @media print {
          .iframe > div:nth-of-type(n) {
            height: ${sheetTableWidth * 0.755}px !important;
            transform: scaleX(0.98) scaleY(1.2) !important;
            transform-origin: top center !important;
            margin-top: -40px ;
          }
        }
        `
      );
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
      if (this.HOSPITAL_ID === "whyx") {
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
            $(item).html().indexOf("标题1") > -1 ||
            $(item).html().indexOf("标题2") > -1 ||
            $(item).html().indexOf("标题3") > -1 ||
            $(item).html().indexOf("标题4") > -1 ||
            $(item).html().indexOf("标题5") > -1 ||
            $(item).html().indexOf("标题6") > -1 ||
            $(item).html().indexOf("标题7") > -1 ||
            $(item).html().indexOf("标题8") > -1 ||
            $(item).html().indexOf("标题9") > -1
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
        cssArr.forEach((item) => {
          item.style.display = "none";
          item.outerText =
            (item.attributes.value && item.attributes.value.value) || "";
        });
      }
      /** 添加上标下标 */
      $('[datakey="description"]').each((index, el) => {
        let dataValue = $(el).find("input").val();
        let resultValue = `<span>${formatSub(
          formatSub(formatSub(dataValue))
        )}</span>`;
        if (dataValue.indexOf("^") > -1) {
          $(el).empty().append(resultValue);
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
    getData(){
      return new Promise((resolve)=>{
        if(this.HOSPITAL_ID === "whhk"){
          readTxt().then(res=>{
            var reg = /data-value/g;
            this.sheetModel = res.replace(reg, "value");
            resolve(true)
          });
        }else {
          let html = window.localStorage.sheetModel;
          var reg = /data-value/g;
          this.sheetModel = html.replace(reg, "value");
          resolve(true)
        }
      })
    },
    print() {
      if (
        Array.from(window.document.querySelectorAll("img")).every(
          (img) => img.complete
        )
      ) {
        window.print();
      } else {
        setTimeout(() => {
          this.print();
        }, 1000);
      }
    },
  },
  computed: {
    overflowAuto(){
      if(['critical2_weihai','extracardi_three_weihai'].includes(this.query.sheetType)) return true
      return false
    },
    // sheetModel() {
    //     let html = window.localStorage.sheetModel;
    //     var reg = /data-value/g;
    //     return html.replace(reg, "value");
    // },
    query() {
      return this.$route.query;
    },
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
    },
  },
  components: {},
};
</script>
