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
      <div class="wrist-header">
        {{ HOSPITAL_NAME }}
      </div>
      <div class="wrist-line1">
        <span>{{ query.wardName }}</span>
        <span>{{ query.name }}</span>
        <span>{{ query.sex }}</span>
        <span>{{ query.age }}</span>
        <span>{{ query.bedLabel }}</span>
      </div>
      <div class="wrist-line2">
        <div>
          <span>手术名称：</span>
          <span>{{ operationName }}</span>
        </div>
        <div>
          <span>住院号：</span>
          <span>{{ query.inpNo }}</span>
        </div>
      </div>
      <div class="wrist-line2">
        <div>
          <span>诊断：</span>
          <span>{{ query.diagnosis }}</span>
        </div>
        <div>
          <span>过敏信息：</span>
          <input type="text" />
        </div>
      </div>
      <img class="qr-code" :class="{ hasRemark: hasRemark }" :src="qrCode" />
    </div>
    <div
      class="bed-card-wrapper bed-card-wrapper-h-small"
      v-loading="modalLoading"
      ref="printConHS"
      v-else-if="printMode === 'h-small'"
    >
      <div class="hs-content">

        <div class="hs-header">床头卡</div>
        <div class="hs-line1 flex-between">
          <span>科别：{{ query.deptName }}</span>
          <span>入院时间：{{ moment(query.admissionDate).format("YYYY-MM-DD") }}</span>
        </div>
        <div class="hs-line1 flex-between">
          <span>住院号：{{ query.inpNo }}</span>
          <span>床号：{{ query.bedLabel }}</span>
        </div>
        <div class="hs-line2 flex-between">
          <span>姓名：{{ query.name }}</span>
          <span>性别：{{ query.sex }}</span>
          <span>年龄：{{ query.age }}</span>
        </div>
        <div class="hs-line2">
          <span>诊断：</span>
          <input type="text" v-model="formData.remark" />
        </div>
        <div class="hs-line2">
          <span>过敏信息：</span>
          <input type="text" />
        </div>
        <div class="hs-line2 flex-between">
          <span class="label">主管医生：{{ formData.mainDoctors }}</span>
          <span class="label">责任护士：{{ formData.dutyNurses }}</span>
        </div>
        <img class="qr-code" :class="{ hasRemark: hasRemark }" :src="qrCode" />
      </div>
    </div>
    <div
      class="bed-card-wrapper bed-card-wrapper-h"
      v-loading="modalLoading"
      ref="printCon"
      v-else
    >
      <div class="header">
        {{ HOSPITAL_NAME }}
      </div>
      <div class="dept-name">
        {{ query.deptName }}
      </div>
      <div class="patient-name">{{ query.name }}</div>
      <img class="qr-code" :class="{ hasRemark: hasRemark }" :src="qrCode" />
      <div class="other-info">
        <span>{{ query.sex }}</span>
        <span>{{ query.age }}</span>
        <span>住院号：{{ query.inpNo }}</span>
      </div>
      <div class="diagnosis">
        <span>诊断：</span>
        <textarea class="diagnosis-content" v-model="formData.remark" rows="9" />
      </div>
      <div class="dn-title">
        <span>管床医生</span>
        <span>责任护士</span>
      </div>
      <div class="dn-box">
        <div class="input-item">
          <span class="label">姓名:</span>
          <input
            noWidth
            type="text"
            class="bottom-line"
            readonly
            v-model="formData.mainDoctors"
          />
        </div>
        <div class="input-item">
          <span class="label">姓名:</span>
          <input
            noWidth
            type="text"
            class="bottom-line"
            readonly
            v-model="formData.dutyNurses"
          />
        </div>
      </div>
      <div class="admission-date">
        <span>入院时间：</span>
        <span>
          {{ moment(query.admissionDate).format("YYYY-MM-DD") }}
        </span>
      </div>
    </div>
    <div slot="button">
      <!-- <span style="position: absolute; left: 10px; padding-top: 4px">
        <span>显示诊断</span>
        <el-switch
          on-text="是"
          off-text="否"
          v-model="formData.remarkPrint"
        ></el-switch>
      </span> -->

      <el-button class="modal-btn" @click="close">取消</el-button>
      <el-button class="modal-btn" @click="switchBed" v-if="printMode.includes('h')">切换</el-button>
      <!-- <el-button class="modal-btn" type="primary" @click="post">保存</el-button> -->
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
  }

  .dept-name {
    border-top: 5px solid #000;
    font-size: 36px;
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
      height: 234px;
      resize: none;
    }
  }

  .dn-title {
    display: flex;
    justify-content: space-around;
    border-top: 5px solid #000;
    height: 100px;
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
    top: 85px;
    right: 20px;
    height: 112px;
    width: 112px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }
}

.bed-card-wrapper-h-small {
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
  }
  .hs-line2 {
    width: calc(100% - 110px);
    display: flex;
    input {
      flex: 1;
      font-size: 20px;
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
        border-bottom: 1px solid #000;
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
      // tipList: [
      //   {
      //     label: "小心跌倒",
      //     img: require("./images/Group 6.png"),
      //   },
      //   {
      //     label: "小心烫伤",
      //     img: require("./images/Group 7.png"),
      //   },
      //   {
      //     label: "防止压疮",
      //     img: require("./images/Group 9.png"),
      //   },
      //   {
      //     label: "防止偷盗",
      //     img: require("./images/Group 10.png"),
      //   },
      // ],
      modalLoading: false,
      formData: {
        diet: "",
        // registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: true,
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
    hasRemark() {
      return this.formData.remarkPrint;
    },
    title() {
      switch (this.printMode) {
        case "wrist":
          return "床头卡打印";
        case "h":
          return "腕带打印";
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
      };
      getEntity(this.query.patientId, this.query.visitId).then((res) => {
        let resData = res.data.data;
        let diagnosis = textOver(this.query.diagnosis, 52);
        this.formData = {
          diet: resData.diet || "",
          // registCare: resData.registCare
          //   ? (resData.registCare || "").split(",")
          //   : this.getRegistCare(),
          mainDoctors: resData.mainDoctors || "",
          dutyNurses: resData.dutyNurses || "",
          remark: diagnosis,
          remarkPrint: resData.remarkPrint,
        };
        this.modalLoading = false;
        this.isOpen();
        // if (
        //   JSON.parse(localStorage.user) &&
        //   JSON.parse(localStorage.user).post != "护长"
        // ) {
        //   if (resData.isPrint == 1) {
        //     this.$message({
        //       type: "warning",
        //       message: "该患者已打印床头卡",
        //     });
        //     return;
        //   } else {
        //     this.isOpen();
        //   }
        // }
      });
      // multiDictInfo(["床头卡饮食"]).then((res) => {
      //   this.ysList = res.data.data.床头卡饮食.map((item) => item.name);
      // });
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
    // getRegistCare() {
    //   let data = [];
    //   if (this.query.nursingClass == "特级护理") {
    //     data.push("特");
    //   }
    //   if (this.query.nursingClass == "一级护理") {
    //     data.push("一");
    //   }
    //   if (this.query.nursingClass == "二级护理") {
    //     data.push("二");
    //   }
    //   if (this.query.nursingClass == "三级护理") {
    //     data.push("三");
    //   }
    //   if (this.query.patientCondition == "普通") {
    //     data.push("普");
    //   }
    //   if (this.query.patientCondition == "病危") {
    //     data.push("危");
    //   }
    //   if (this.query.patientCondition == "病重") {
    //     data.push("重");
    //   }
    //   return data;
    // },
    open(printMode = "h") {
      this.printMode = printMode;
      this.init();
      this.isOpen();
      // if (
      //   JSON.parse(localStorage.user) &&
      //   JSON.parse(localStorage.user).post == "护长"
      // ) {
      //   this.isOpen();
      // }
    },
    isOpen() {
      this.$refs.modal.open();
      let qr_png_value = this.query.patientId + "|" + this.query.visitId;
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
                transform: rotate(90deg) translateY(-120%) translateX(25%) scale(.8);
                // transform: scale(.8);
                transform-origin: 0 0;
              }
            `;
            break;
          case 'h-small':
            printRef = this.$refs.printConHS
            css = `
              .bed-card-wrapper {
                box-shadow: none !important;
              }`
            break
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
              .dept-name {
                font-size: 40px !important;
              }
              .patient-name {
                padding: 60px 0 70px !important;
                font-size: 70px !important;
              }
              .dn-title {
                line-height: 150px !important;
              }
              .dn-box {
                margin-bottom: 50px !important;
              }
              .input-item pre {
                font-size: 28px !important;
                line-height: 36px !important;
              }
              .input-item .label {
                font-size: 28px !important;
                line-height: 36px !important;
              }
              .diagnosis-content {
                display: block;
                width: 100%;
                white-space: pre-wrap;
                word-break: break-all;
                word-wrap: break-word;
                height: 252px;
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
