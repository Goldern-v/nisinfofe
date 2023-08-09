<template>
  <sweet-modal
    ref="modal"
    :modalWidth="600"
    :title="title"
    :enable-mobile-fullscreen="false"
    class="modal"
  >
    <!-- 腕带 -->
    <div
      class="bed-card-wrapper wrist"
      v-loading="modalLoading"
      ref="printConW"
      v-if="printMode == 'wrist'"
    >
      <!-- <div class="wrist-header">
        {{ HOSPITAL_NAME }}
      </div> -->
      <div class="wrist-line1">
        <span>{{ query.wardName }}</span>
        <span>
          入院时间：{{ moment(query.admissionDate).format("YYYY-MM-DD") }}
        </span>
        血型：
      </div>
      <div class="wrist-lin1">
      <span>{{ query.name }}</span>&nbsp;
        <span>{{ query.sex }}</span>&nbsp;
        <span>{{ query.age }}</span>&nbsp;
        <span>床号:{{ query.bedLabel }}</span>&nbsp;
        <span>ID:{{ query.patientId }}</span>

      </div>
      <div class="wrist-line2">
        <div>
          <span>手术名称：</span>
          <input type="text" v-model="operationName" />
        </div>
        <div>
          <span>手术部位：</span>
          <input type="text" v-model="operationName1" />
        </div>
        <!-- <div>
          <span>住院号：</span>
          <span>{{ query.inpNo }}</span>
        </div> -->
      </div>

      <div class="wrist-line2">
        <div>
          <span>诊断：</span>
          <span>{{ query.diagnosis }}</span>
          <!-- <input type="text" v-model="formData.remark" /> -->
        </div>
        <div>
          <span>过敏：</span>
          <input type="text" />
        </div>
      </div>
      <img class="qr-code" :class="{ hasRemark: hasRemark }" :src="qrCode" />
    </div>
    <!-- 床头卡 -->
    <div class="bed-card-warpper"
    v-else
    v-loading="modalLoading" ref="printCon">
        <div
          class="bed-card-con"
          flex
          :class="{ remarkCon: formData.remarkPrint,itemHeight:HOSPITAL_ID=='sdlj' }"
        >
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div flex="cross:center" class="qr-code-item" style="height:150px;">
              <p  class="name">{{query.name}}</p>
              <img
                class="qr-code"
                :class="{ hasRemark: hasRemark }"
                :src="qrCode"
              />
            </div>
            <div flex="cross:center" :class="{'input-item-nopadding':HOSPITAL_ID=='sdlj' && query.patientId.indexOf('$')>=0}"
            class="input-item input-item-row">
              <div class="fontSize-50">{{query.sex}}</div>
              <div class="fontSize-50" >{{query.age}}</div>
              <div>{{wardName}}</div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:50px">
              <div style="display:flex " >
                <span  class="label">ID:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 26px;width:65px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.inpNo"
                />
              </div>
              <div>
                <span  class="label">住院号:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 26px;width:100px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.patientId"
                />
                </div>
              <div class="bedNum">{{query.bedLabel + '床'}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">入院日期:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px"
                flex-box="1"
                class="bottom-line"
                :value="moment(query.admissionDate).format('YYYY-MM-DD HH:mm:ss')"
              />
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">诊断:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px"
                flex-box="1"
                class="bottom-line"
                v-model="formData.diagnosis"
              />
            </div>
          </div>
        </div>
      </div>
    <div slot="button">
      <el-button class="modal-btn" @click="close">取消</el-button>
      <el-button class="modal-btn" type="info" @click="onPrint">打印</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal {
  >>>.sweet-content {
    background: #dfdfdf;
    padding-bottom: 20px;
  }
}

.bed-card-wrapper {
  background: #fff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  position: relative;
  padding: 20px;
  font-size: 20px;
  line-height: 26px;
  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
  input {
    border: none;
    outline: none;
    width: 0;
  }
  .bottom-line {
    border-bottom: 1px solid #000;
  }
}

.bed-card-wrapper-h {
  padding: 30px 20px;
  font-size: 20px;
  // height: 720px
  line-height: 32px;

  .header {
    font-size: 26px;
    line-height: 42px;
    .left-title{
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
    }
  }

  .dept-name {
    border-top: 5px solid #000;
    font-size: 20px;
    line-height: 58px;
  }

  .patient-name {
    font-size: 60px;
    line-height: 1;
    padding: 50px 0 60px;
    text-align: center;
  }

  .other-info {
    display: flex;
    justify-content: space-between;
    span {
      margin-right: 20px;
    }
    textarea {
      width: 100%;
      font-size: 20px;
      line-height: 26px;
      outline: none;
      border: none;
      padding: 0;
      height: 234px;
      resize: none;
    }
  }

  .diagnosis {
    margin: 10px 0;
    border-top: 3px solid #000;

    span {
      background: #000;
      color: #fff;
    }
    textarea {
      width: 100%;
      font-size: 20px;
      line-height: 26px;
      outline: none;
      border: none;
      padding: 0;
      height: 80px;
      resize: none;
    }
  }

  .dn-title {
    position: relative;
    display: flex;
    justify-content: space-around;
    border-top: 5px solid #000;
    padding-right: 100px;
    align-items: center;

    span {
      background: #000;
      color: #fff;
      line-height: 35px;
      font-size: 30px;
    }
  }

  .dn-box {
    display: flex;
    padding-right: 100px;
    margin-top: 22px;
    >div {
      flex: 1;
      display: flex;
      align-items: center;
    }

    input.bottom-line {
      flex: 1;
    }
  }

  .admission-date {
    margin: 50px 0 20px;
    text-align: center;
    position: relative;
    background: linear-gradient(90deg, #000 47%, #fff 47%, #fff 98%, #000 98%);
    border: 2px solid #000;
    color: #fff;

    span {
      display: inline-block;
      mix-blend-mode: difference;
    }

    &::after {
      position: absolute;
      content: '';
      left: 0;
      bottom: -20px;
      width: 100%;
      border-bottom: 5px solid #000;
    }
  }

  .qr-code {
    position: absolute;
    top: 2px;
    right: 8px;
    height: 150px;
    width: 150px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }
}
.bed-card-warpper {
  background: #fff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  display: inline-block;
  font-size: 16px;

  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}

.bed-card-con {
  margin: 20px;
  width: 511px;
  height: 335px;
  // padding: 5px 8px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  // border: 1px solid #000;
  height: 370px;
  &.itemHeight{
    .input-item{
      height:50px;
    }
  }
  .bed-card-con-top{
    height: 150px;
  }
  // &.remarkCon
  .name{
    line-height: 160px;
    white-space: nowrap;
    height: 160px;
    width: 360px;
    text-align: center;
    font-size: 88px;
    z-index: 10;
  }
  .qr-code {
    position: absolute;
    top: -12px;
    right: -15px;
    height: 175px;
    width: 200px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }

  .qr-code-num {
    position: absolute;
    top: 92px;
    left: 0px;
    width: 96px;
    text-align: center;
    z-index: 2;
    font-size: 16px;

    &.hasRemark {
      top: 78px;
      left: 0px;
      width: 84px;
      font-size: 14px;
    }
  }
}
.qr-code-item {
  height: 40px;
  padding-right: 12px;
  font-size: 22px;
  font-weight: bold;
  position: relative;
  z-index: 2;

  .input-item-left {
    display: inline-block;

    width 75px {
      .input-item-left-label {
        margin-right: 2px;
      }
    }
  }
}

.input-item-row {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  width: auto
  &.input-item-nopadding{
    padding:0;
  }
  .fontSize-50{
    height: 50px;
    font-size: 43px;
    font-weight: bold;
    line-height: 50px;
  }
}
.bedNum{
  position: absolute;
  top: 0;
  right: 10px;
  min-width: 100px;
  font-size: 50px;
  text-align: right;
  height: 50px;
  line-height: 50px;
}
.wrist-strap-print {
  .bed-card-vert-con {
    margin: 20px;
    width: 119px;
    height: 498px;
    padding: 35px 8px 5px !important;
    box-sizing: border-box;
    position: relative;
    border: 3px solid #000;
    text-align: left;
    width: 500px;
    height: auto;
    padding: 5px 0 0 0 !important;
    border: none;

    .top {
      span {
        margin-left: 10px;

        &:first-of-type {
          margin-left: 10px;
        }
      }
    }

    >>>.allergy {
      width: 80%;

      &.whhkAllergy {
        width: 100%;
        display: flex;
        align-items: center;

        >p {
          display: flex;
          align-items: center;
        }

        >.input-item {
          height: 25px;
          font-size: 20px;
          margin-left: 10px;

          >span {
            font-size: 16px;
          }

          >input {
            font-size: 16px;
            width: 100px;
          }
        }
      }

      p {
        height: 25px;
        overflow: hidden;
        margin-left: 10px;
        font-size: 20px;
      }

      span {
        margin-left: 0px;
        font-size: 20px;
      }

      p.gm {
        span {
          color: red;
        }
      }
    }

    span {
      font-size: 20px;
      line-height: 24px;
      margin-left: 10px;
    }

    .qr-code {
      position: absolute;
      right: 25px;
      top: 50%;
      margin-top: -56px;
      height: 112px;
      width: 112px;

      &.hasRemark {
        width: 96px;
        height: 96px;
      }
    }

    svg {
      height: 60px !important;
      margin-left: 15px;
    }
  }

  &.children-wrist {
    width: 10cm;
    height: 3cm;
    box-sizing: border-box;

    .bed-card-vert-con {
      transform: scale(0.8) translateX(-2.1cm) translateY(-0.7cm);
    }

    .qr-code {
      position: absolute;
      right: 75px !important;
      top: 55% !important;
      margin-top: -56px;
      height: 112px;
      width: 112px;
    }
  }
}
.bed-card-wrapper-h-small {
  width:9.3cm;
  height:4.3cm;
  font-size: 13px;
  font-weight: normal;
  padding: 10px 20px 24px;

  .hs-content {
    position: relative;
    padding: 1px;
    border: 1px solid #000;
  }
  .hs-header {
    font-size: 24px;
    letter-spacing: 15px;
    line-height: 30px;
    text-align: center;
  }
  .hs-line1 {
  width: calc(100% - 50px);
  height:24px;
  }
  .hs-line2 {
    width: calc(100% - 95px);
    display: flex;
    height:24px;
    div.input-item {
      display: flex;
      height: 24px;
      padding-right: 2px;
      font-size: 13px;
    }
    .label {
      margin-right: 0px;
      line-height: 24px;
    }

    input {
      padding: 0px;
      flex: 1;
      font-size: 13px;
      line-height: 26px;
    }
  }
  .qr-code {
    position: absolute;
    right: 5px;
    bottom: 5px;
    height: 100px;
    width: 100px;
  }
}

.wrist {
  padding: 20px 30px;
  font-size: 19px;
  line-height: 26px;

  .wrist-line1, .wrist-line2 {
    width: calc(100% - 100px);
    display: flex;
    justify-content: space-between;
  }

  .wrist-line2 {
    div {
      flex: 1;
      display: flex;
      span:nth-child(2n), input {
        flex: 1;
        // border-bottom: 1px solid #000;
      }
    }
  }

  .qr-code {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -50px;
    height: 100px;
    width: 100px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }
  input {
    font-size: 19px;
    line-height: 26px;
  }
}

[noWidth] {
  width: 0;
}

.bottom-line {
  border: 0;
  border-bottom: 2px solid #000;
  text-align: left;
  padding-left: 5px;
  outline: none;
  font-size: 28px;
}

.remark {
  height: 60px;
  resize: none;
  overflow: hidden;
  border-bottom: 1px solid #000;
  margin-top: 1px;
  font-size: 22px;
  line-height: 30px;
  border: 0;
  padding: 0;
}

.input-item {
  height: 40px;
  padding-right: 12px;
  font-size: 22px;
  font-weight: bold;
  position: relative;
  z-index: 2;

  .input-item-left {
    display: inline-block;
    width: 75px;

    .input-item-left-label {
      margin-right: 2px;
    }
  }
}
.flex-between {
  display: flex;
  justify-content: space-between;
  >* {
    flex: 1;
  }
}

.label {
  margin-right: 2px;
  line-height: 32px;
  white-space: nowrap;
}

label {
  cursor: pointer;
}
</style>

<script>
import { getEntity, saveBed } from "./api/index.js";
import printing from "printing";
var qr = require("qr-image");
import moment from "moment";
import { textOver } from "@/utils/text-over";
// import { multiDictInfo } from "@/api/common";
import { getOperationName } from "@/api/commonData";
import { query } from "quill";
export default {
  data() {
    return {
      moment,
      qrCode: "" /** 二维码 */,
      qrCodeNum: "" /** 二维码 */,
      modalLoading: false,
      formData: {
        diet: "",
        // registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: true,
        drugGms:''
      },
      ysList: [],
      operationName: "",
      /**
       * 打印类型
       * h: 床头卡,
       * wrist: 腕带
       */
      printMode: "h",
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
     wardName() {
      return this.$store.state.lesion.deptName;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    },
    title() {
      switch (this.printMode) {
        case "h":
          return "床头卡打印";
        case "wrist":
          return "腕带打印";
        case "wrist-children":
          return "儿童腕带打印";
        default:
          return "打印";
      }
    },
  },
  methods: {
    init() {
      this.formData = {
        diet: "",
        // registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        drugGms:''
      };
      getEntity(this.query.patientId, this.query.visitId).then((res) => {
        let resData = res.data.data;
        let diagnosis = textOver(this.query.diagnosis, 52);
        this.formData = {
          diet: resData.diet || "",
          mainDoctors: resData.mainDoctors || "",
          dutyNurses: resData.dutyNurses || "",
          remark: diagnosis,
          remarkPrint: resData.remarkPrint,
          drugGms:resData.drugGms||'无',
        };
        this.modalLoading = false;
        this.isOpen();

      });

      if (this.printMode === "wrist") {
        getOperationName(
          this.query.patientId,
          this.query.visitId,
          moment().format("YYYY-MM-DD")
        ).then((res) => {
          this.operationName = res.data.operationName;
        });
      }
    },
    open(printMode = "h") {
      this.printMode = printMode;
      this.init();
      this.isOpen();
    },
    isOpen() {
      this.$refs.modal.open();
      let qr_png_value = "P" +this.query.patientId + "|" + this.query.visitId;
      var qr_png = qr.imageSync(qr_png_value, { type: "png", margin: 2 });
      function arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return "data:image/png;base64," + window.btoa(binary);
      }
      let base64 = arrayBufferToBase64(qr_png);
      this.qrCode = base64;
      this.qrCodeNum = qr_png_value;
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      let data = {};
      data.name = this.query.name;
      data.sex = this.query.sex;
      data.patientId = this.query.patientId;
      data.visitId = this.query.visitId;
      data.diet = this.formData.diet;
      data.registCare = this.formData.registCare.join(",");
      data.mainDoctors = this.formData.mainDoctors;
      data.dutyNurses = this.formData.dutyNurses;
      data.remarkPrint = this.formData.remarkPrint;
      data.remark = this.formData.remark.slice(0, 24);
      data.drugGms = this.formData.drugGms;
      saveBed(data).then((res) => {
        this.$message.success("保存成功");
        this.close();
      });
    },
    onPrint() {
      this.$nextTick(() => {
        let printRef, css;
        switch (this.printMode) {
          case "wrist":
            printRef = this.$refs.printConW;
            css = `
              .bed-card-wrapper {
                box-shadow: none !important;
                width:560px!important;
                // transform: rotate(-90deg) translateY(65%) translateX(-67%) scale(0.8);
                transform: rotate(-90deg) translateY(30%) translateX(-97%) scale(0.8)!important;
                transform-origin: 0 0;
              }
            `;
            break;
          default:
            printRef = this.$refs.printCon;
            css = `
              .bed-card-wrapper {
                margin-top: 40px;
                box-shadow: none !important;
                font-size: 28px !important;
                line-height: 36px !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color-adjust: exact;
              }
              .header {
                font-size: 36px !important;
              }
              .title{
                font-size: 20px !important;
              }
              .dept-name {
                font-size: 28px !important;
              }
              .patient-name {
                padding: 10px 0 20px !important;
                font-size: 160px !important;
              }
              .dn-title {
                line-height: 150px !important;
              }
              .mb200 {
                margin-bottom: 300px !important;
              }
              .input-item pre {
                font-size: 28px !important;
                width: 100px !important;
                line-height: 36px !important;
              }
              .qr-code {
                    position: absolute;
                    top: -12px !important;
                    right: -15px !important;
                    height: 175px !important;
                    width: 200px !important;
              }
              .input-item .label {
                font-size: 28px !important;
                width: 100px !important;
                line-height: 36px !important;
              }
              .diagnosis-content {
                display: block;
                width: 100%;
                white-space: pre-wrap;
                word-break: break-all;
                word-wrap: break-word;
                height: 120px;
              }
              `;
              break
        }
        // this.post();
        printing(printRef, {
          // direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            ${css}
            @page {
              width: 50%;
              margin: 0;
            }
            `,
        })
      });
    },
    /**切换大小床头卡 */
    switchBed() {
      if (this.printMode == 'h') {
        return this.printMode = 'h-small'
      }
      this.printMode = 'h'
    }
  },
  mounted() {},
  components: {},
};
</script>
