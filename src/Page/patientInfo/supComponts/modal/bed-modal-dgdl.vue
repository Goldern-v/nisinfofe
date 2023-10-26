<template>
  <sweet-modal
    ref="modal"
    :modalWidth="605"
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
      <div class="wrist-header" style="font-size: 25px;">
        <!-- <span>{{ query.wardName }}</span> -->
        <span>{{ query.name }}</span>
        <span>{{ query.sex }}</span>
        <span>{{ query.age }}</span>
        &nbsp;
        <span>{{ moment(query.admissionDate).format("YYYY-MM-DD") }}</span>
      </div>
      <div class="wrist-line1">
        <span>科室：{{ query.wardName }}</span>
        <!-- <span>{{ query.name }}</span>
        <span>{{ query.sex }}</span>
        <span>{{ query.age }}</span> -->
        <span>床位:{{ query.bedLabel }}</span>
        <!-- <span>ID:{{ query.patientId }}</span> -->
      </div>
      <!-- <div class="wrist-line2">
        <div>
          <span>诊断:</span> -->
          <!-- <span>{{ query.diagnosis }}</span> -->
          <!-- <input type="text" v-model="formData.remark" />
        </div>
      </div> -->
      <div class="wrist-line2">
        <div >
          <span>过敏史:</span>
          <input type="text" />
        </div>
      </div>
      <img class="qr-code"  :src="qrCode" />
      <div
         class="qr-code-num"
         :class="{ hasRemark: hasRemark, }"
          >
            {{ qrCodeNum }}
      </div>
      <div
         class="qr-code-num_hsName"
         :class="{ hasRemark: hasRemark, }"
          >
            {{ HOSPITAL_NAME }}
      </div>
    </div>
    <div
        class="bed-card-warpper printRef  wrist-strap-print children-wrist"
        ref="printCon4"
        v-else-if="printMode == 'wrist-children'"
      >
        <div class="bed-card-vert-con">
          <div class="top">
            <span>{{ query.name }}</span>
              <span>{{ query.sex }}</span>
              <span>{{ query.age }}</span>
          </div>
          <div>
            <div>
            <span>{{ query.wardName }}</span>
              <span>{{ query.bedLabel }}</span>
               <span>{{moment(query.admissionDate).format("YYYY-MM-DD")  }}</span>
            </div>
          </div>
          <div>
            <div>
               <span>过敏:</span>
              <input style="border:none" type="text" />
            </div>
          </div>
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
          <div
            class="qr-code-num"
            :class="{ hasRemark: hasRemark, }"
              >
                {{ qrCodeNum }}
          </div>
          <div
            class="qr-code-num_hsName"
            :class="{ hasRemark: hasRemark, }"
              >
                {{ HOSPITAL_NAME }}
          </div>
        </div>
    </div>
    <!-- 床头卡 -->
    <div class="bed-card-warpper"
       v-else
       v-loading="modalLoading" ref="printCon">
        <div
          class="bed-card-con"
          flex
        >
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div flex="cross:center" class="qr-code-item" style="height: 80px;">
              <p  class="name">{{query.name}}</p>
              <img
                class="qr-code"
                :class="{ hasRemark: hasRemark }"
                :src="qrCode"
                style="transform-origin: top center;transform: scaleY(0.8) scaleX(.8); "
              />
            </div>
            <div flex="cross:center" class="input-item input-item-row" >
              <div class="fontSize-50">{{query.sex}}</div>
              <div class="fontSize-50" >{{query.age}}</div>
              <div class="fontSize-50-1" style="padding-left: 90px;">{{query.deptName}}</div>
              <div class="fontSize-50-1">{{query.bedLabel + '床'}}</div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:30px">
              <div style="display:flex " >
                <span  class="label">住院号:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 23px;width:109px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.inpNo"
                />
              </div>
              <div style="display: flex;">
                <span  class="label">护理等级:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 23px;width: 186px;"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.nursingClass"
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:30px">
              <div style="display:flex " >
                <span  class="label">护士长:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 22px;width:110px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.dutyNurse"
                />
              </div>
              <div style="display: flex;">
                <span  class="label">饮食:</span>
                <input
                  type="text"
                  style="border:none"
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:30px">
              <div style="display:flex " >
                <span  class="label">主管医生:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 22px;width:85px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.doctorInCharge"
                />
              </div>
              <div style="display: flex;">
                <span  class="label">安全警示:</span>
                <input
                  type="text"
                 style="border:none"
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:30px">
              <div style="display:flex " >
                <span  class="label">主管护士:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 22px;width:85px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.dutyNurse"
                />
              </div>
              <div style="display: flex;">
                <span  class="label">防走失、放烫伤、防跌倒/坠床</span>
              </div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:30px">
              <div style="display:flex " >
                <span  class="label">过敏史:</span>
                <input
                 style="border:none ;width: 110px;" type="text"/>
              </div>
              <div style="display: flex;">
                <span  class="label">防压疮、防VTE、防脱骨、防误吸</span>
              </div>
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
    font-family: 'SimHei', 'Microsoft Yahei','黑体' !important;
    font-weight: bold;
  }
  input {
    border: none;
    outline: none;
    width: 0;
  }
  .bottom-line {

  }
}

.bed-card-warpper {
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  background: #fff;
  display: inline-block;
  font-size: 16px;

  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei','黑体' !important;
    font-weight: bold;
  }
}

.bed-card-con {
  margin: 20px;
  width: 525px;
  height: 277px;
  box-sizing: border-box;
  position: relative;
  .bed-card-con-top{
    height: 150px;
  }
  .name{
    line-height: 40px;
    white-space: nowrap;
    height: 40px;
    width: 100px;
    text-align: center;
    font-size: 35px;
    z-index: 10;
  }
  .qr-code {
    position: absolute;
    top: -10px;
    right: 140px;
    height: 122px;
    width: 125px;

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
    font-size: 25px;
    font-weight: bold;
    line-height: 50px;
  }
  .fontSize-50-1{
    line-height: 30px;
  }
}
.bedNum{
  position: absolute;
  top: 0;
  right: 10px;
  min-width: 100px;
  font-size: 40px;
  text-align: right;
  height: 50px;
  line-height: 40px;
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
      line-height: 35px;
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
      right: 45px !important;
      top: 55% !important;
      margin-top: -72px;
      height: 112px;
      width: 112px;
    }
    .qr-code-num {
    position: absolute;
    top: 93px;
    left: 335px;
    width: 96px;
    text-align: end;
    z-index: 2;
    font-size: 16px;

    &.hasRemark {
      top: 78px;
      left: 0px;
      width: 84px;
      font-size: 14px;
    }
  }
  .qr-code-num_hsName {
    font-size:14px;
    position: absolute;
    left:350px;
    top:110px;
    z-index :2;
  }
  }
}
.wrist {
  padding: 20px 0px;
  font-size: 22px;
  line-height: 35px;
  font-weight: bold;
  height：100px

  .wrist-line1{
    width: calc(100% - 100px);
    // display: flex;
    justify-content: space-between;
  }

  .wrist-line2 {
    width: calc(100% - 100px);
    display: flex;
    justify-content: space-between;
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
    margin-top: -64px;
    height: 100px;
    width: 100px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }
   .qr-code-num {
    position: absolute;
    top: 93px;
    left: 440px;
    width: 96px;
    text-align: end;
    z-index: 2;
    font-size: 16px;

    &.hasRemark {
      top: 78px;
      left: 0px;
      width: 84px;
      font-size: 14px;
    }
  }
  .qr-code-num_hsName {
    font-size:14px;
    position: absolute;
    left:455px;
    top:110px;
    z-index :2;
  }
  input {
    font-size: 22px;
    line-height: 26px;
  }
}

[noWidth] {
  width: 0;
}

.bottom-line {
  border: 0;
  text-align: left;
  padding-left: 5px;
  outline: none;
  font-size: 24px;
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
  height: 30px;
  padding-right: 12px;
  font-size: 22px;
  font-weight: bold;
  position: relative;
  z-index: 2;

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
// import { HOSPITAL_NAME } from "config/prod.env";
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
      let qr_png_value = "w" + this.query.patientId;
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
      this.qrCodeNum = this.query.patientId;
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
      let printRef, css;
        console.log('this.printMode:' ,this.printMode);
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
            case "wrist-children":
            printRef = this.$refs.printCon4;
            css = `
            .bed-card-warpper {
                box-shadow: none !important;
                width:560px!important;
                // transform: rotate(-90deg) translateY(65%) translateX(-67%) scale(0.8);
                transform: rotate(-90deg) translateY(30%) translateX(-97%) scale(0.8);
                transform-origin: 0 0;
              }
            `;
            break;
          default:
            printRef = this.$refs.printCon;
            css = `
              .bed-card-warpper{
                box-shadow: none !important;
              }
              .bed-card-con {
                width:600px !important;
                height:300px !important;
                border: 1px solid #000 !important;
                box-sizing: border-box !important;
                box-shadow: none !important;
                margin-top: 20px;
                font-size: 28px !important;
                line-height: 20px !important;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                color-adjust: exact;
              }
              .bedNum{
                  position: absolute;
                  top: 0 !important;
                  right: 10px !important;
                  min-width: 100px !important;
                  font-size: 35px !important;
                  text-align: right !important;
                  height: 100px !important;
                  line-height: 32px !important;
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
              .name {
                padding: 10px 0 20px !important;
                font-size: 35px !important;
              }
              .input-item pre {
                font-size: 28px !important;
                width: 137px !important;
                line-height: 34px !important;
              }
            .input-item2 pre {
                font-size: 32px !important;
                width: 475px !important;
                line-height: 45px !important;
                border-bottom: 2px solid #000 !important;
              }
              .qr-code {
                position: absolute;
                top: -6px !important;
                right: 140px !important;
                height: 130px !important;
                width: 150px !important;
                transform-origin:top center !important;
                transform:scaleY(.77) scaleX(.8) !important;
              }
              .input-item .label  input {
                font-size: 28px !important;
                width: 300px !important;
                line-height: 20px !important;
              }
              .input-item{
              font-size:24px !important;
              height:30px !important;
              }
              `;
              break
        }
      this.$nextTick(() => {

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
