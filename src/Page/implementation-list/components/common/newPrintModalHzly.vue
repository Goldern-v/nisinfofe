<template>
  <!-- 6.7 -->
  <div
    class="bottle-print-con"
    :style="{
      width: `${newModalSize == '5*6' ? '5.4' : '12.8'}cm`,
      height: `${newModalSize == '5*6' ? '6.2' : '3.3'}cm`
    }"
  >
    <!-- 小瓶签一张纸需要打印3条数据数据间要留白 -->
    <div
      v-if="newModalSize == '5*6'"
      class="new-print-modal new-print-modal--large"
      style="width:7.8cm;height:6.2cm;"
    >
      <div class="new-print-title">
        <div class="main-content">
          <div>
            床位：<span>{{ currentBottle.bedLabel }}</span>
          </div>
        </div>
        <div class="main-content">
           <div>
            <span>{{ currentBottle.name }}</span>
          </div>
        </div>
        <div>
           <div>{{ currentBottle.repeatIndicator == '1'? '长期' : '临时'  }}</div>
           <div>性别：{{ currentBottle.sex }}</div>
        </div>
      </div>
      <div class="new-print-modal__top">
        <div>科室：{{ currentBottle.deptName }}</div>
        <div>ID：{{ currentBottle.patientId || "" }}</div>
        <div>年龄{{ currentBottle.age }}</div>
      </div>
      <div class="new-print-modal__top">
        <div>
          途径：<span>{{ currentBottle.administration }}</span>
        </div>
        <div>执行时间：{{ currentBottle.executeDate.substr(0, 16) }}</div>
      </div>
      <table>
        <colgroup>
          <col />
          <col width="40px" />
          <col width="30px" />
        </colgroup>
        <tr>
          <td>药品名称</td>
          <td>用量</td>
          <td>频率</td>
        </tr>
        <tr class="reserved">
          <td style="text-align:left;">
            <div
              v-for="(item, index) in currentBottle.orderText"
              :key="index"
            >
              {{ item.orderText }}
              <div v-if="item.expand">{{ item.expand }}</div>
            </div>
          </td>
          <td>
            <div
              v-for="(item, index) in currentBottle.orderText"
              :key="index"
            >
              {{ currentBottle.dosageDosageUnits[index] }}
            </div>
          </td>
          <td>
            <div
              v-for="(item, index) in currentBottle.orderText"
              :key="index"
            >
              {{ itemObj[index].frequency }}
            </div>
          </td>
        </tr>
      </table>

      <div class="new-print-modal__tip2">
        <div>医生说明：{{ currentBottle.freqDetail }}</div>
        <div class="sign_tip">
          <div>核对者：<span class="shoushu"></span></div>
        </div>
        <div class="sign_tip">
          <div>配液者：<span class="shoushu"></span></div>
          <div>配置时间：<span class="shoushu"></span></div>
        </div>
        <div class="qc-box">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>
    </div>

    <div
      v-else
      class="new-print-modal new-modal-small"
      style="height:3cm;width:12.8cm;"
    >
      <div class="new-modal-small-top">
        <div class="new-modal-small-top__left">
          <div class="flex">
            <div>
              姓名: <span>{{ currentBottle.name }}</span>
            </div>
            <div>
              床号: <span>{{ currentBottle.bedLabel }}</span>
            </div>
          </div>
          <div class="flex">
            <div>途径: {{ currentBottle.administration }}</div>
            <div>
              频率:
              {{
                `${currentBottle.frequency}${
                  currentBottle.groupNo ? `(${currentBottle.groupNo})` : ""
                }`
              }}
            </div>
          </div>
          <div>执行时间: {{ currentBottle.executeDate.substr(0, 16) }}</div>
        </div>
        <div class="new-modal-small-top__right">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>

      <div class="new-modal-small-content">
        <div v-for="(item, index) in currentBottle.orderText" :key="index">
          <span>{{ item }}</span>
          <span>{{ itemObj[index].freqDetail }}</span>
          <span>{{ currentBottle.dosageDosageUnits[index] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.p-lr {
  padding: 0 8px;
}
.bb {
  border-bottom: 1px solid #000;
}
.bottle-print-con {
  .new-print-modal {
    * {
      font-family: SimHei !important;
    }

    &.new-print-modal--large {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      font-weight: 500;
      height: 100%;
      font-size: 12px;
      line-height: 18px;
      @extend .p-lr;
      box-sizing: border-box;
      margin-left: 0.5cm;
      padding-top: 5px;
      .new-print-title {
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        line-height: 14px;
        .main-content {
          display: flex;
          flex: 1;
          align-items: center;
          div>span{
            font-size: 16px;
            font-weight: 900;
          }
        }
      }
      .new-print-modal__top {
        display: flex;
        justify-content: space-between;
        align-content: center;
        font-size: 12px;
        line-height: 14px;
        > div {
          > span {
            font-weight: 900;
            font-size: 12px;
          }
        }
        .qc-box {
          width: 54px;
          overflow: hidden;
          padding: 1px 1px 0px 0px;
          img {
            width: 100%;
            height: auto;
            object-fit: cover;
          }
        }
        .new-print-modal__title_one {
          position: relative;
          margin: 0 12px;
          > div {
            font-size: 12px;
            &.administration {
              position: absolute;
              bottom: 0;
              left: 0;
              font-size: 12px;
            }
            > span {
              font-weight: bold;
            }
          }
        }
        .new-print-modal__title_second {
          > div {
            font-size: 12px;
            line-height: 14px;
          }
        }
      }
      .new-print-modal__middle {
        border-top: 1px solid #000;
        border-bottom: 1px solid #000;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        > div {
          border-left: 1px solid #000;
          font-size: 12px;
          text-align: center;
          &:first-of-type {
            flex: 1;
            border-left: none;
          }
          &:nth-of-type(2) {
            padding: 0 10px;
          }
          &:nth-of-type(3) {
            padding: 0 10px;
          }
        }
      }

      .new-print-modal__tip2 {
        position: relative;
        font-size: 12px;
        .sign_tip {
          display: flex;
          justify-content: flex-start;
          align-content: center;
          > div:first-of-type {
            width: 110px;
          }
          .shoushu {
              border-bottom: 1px solid #000;
              display: inline-block;
              width: 50px;
            }
        }
        .qc-box {
          position: absolute;
          top: 0;
          right: 0;
          width: 54px;
          overflow: hidden;
          padding: 1px 1px 0px 0px;
          img {
            width: 100%;
            height: auto;
            object-fit: cover;
          }
        }
      }
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
      tr {
        td {
          border: 1px solid #000;
          font-size: 12px;
          text-align: center;
        }
        :first-child {
          border-left: none;
        }
        :last-child {
          border-right: none;
        }
      }
      .reserved {
        td {
          height: 125px;
          font-size: 12px;
        }
      }
    }
    .new-print-modal__second {
      @extend .bb;
      .flex {
        display: flex;
        height: 18px;
        div {
          flex: 3;
        }
        div:last-child {
          flex: 2;
        }
        > div > span {
          font-size: 12px;
          line-height: 12px;
          display: inline-block;
          font-weight: 900;
          white-space: nowrap;
        }
        &:first-child {
          height: 16px;
        }
      }
      div {
        flex: 62%;
        text-indent: 3px;
      }
      > div:nth-child(2) > span {
        font-size: 16px;
        font-weight: 900;
      }
    }

    .qc-box {
      width: 54px;
      overflow: hidden;
      padding: 1px 1px 0px 0px;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
    &.new-modal-small {
      /* display: flex; */
      /* flex-direction: column; */
      height: 100%;
      box-sizing: border-box;
      font-weight: 500;
      // padding-left: 8px;
      div,
      p,
      span {
        font-size: 16px;
        line-height: 25px;
      }
    }
    .new-modal-small-top {
      /* display: flex; */
      border: 1px solid #000;
      height: 98px;
      box-sizing: border-box;
      display: flex;
      .new-modal-small-top__left {
        display: inline-block;
        width: calc(100% - 104px);
        /* flex: 1; */
        /* display: flex; */
        /* flex-wrap: wrap; */
        /* align-items: flex-end; */
        overflow: hidden;
        div {
          flex: 62%;
          height: 25px;
        }

        /* >div:nth-child(2n) {
          flex: 38%;
        }
        >div:last-child {
          flex: 100%;
          white-space: nowrap;
          height: 25px;
        } */
        /* >div:nth-child(-n + 2) {
          line-height: 25px;
          height: 42px;
        } */
        .flex:first-child {
          line-height: 25px;
          height: 42px;
          > div > span {
            font-weight: 700;
            font-size: 38px;
            line-height: 42px;
            text-shadow: 1px 0px #000, -1px 0px #000, 0px 1px #000,
              0px -1px #000;
            display: inline-block;
          }
        }
        .flex {
          display: flex;
          div {
            flex: 3;
          }
          div:last-child {
            flex: 2;
          }
        }
      }
      .new-modal-small-top__right {
        display: inline-block;
        width: 88px;
        padding: 2px 2px 0px 0px;
        img {
          width: 100%;
        }
      }
    }
    .new-modal-small-content {
      flex: 1;
      div {
        /* white-space: pre-wrap; */
        display: flex;
        justify-content: space-between;
        padding: 0px 10px 0 2px;
        text-align: left;
        border: 1px solid #000;
        border-top: none;
        font-size: 24px;
        span {
          font-size: 24px;
        }
      }
    }
  }
  .blank--small {
    height: 0.2cm;
  }
}
</style>
<script>
import { cloneDeep } from "lodash";
import moment from "moment";
var qr = require("qr-image");
const DRUG_TYPE = {
  1: "普通",
  2: "高危",
  3: "自备",
  4: "避光"
};
const arrayBufferToBase64 = buffer => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:image/png;base64," + window.btoa(binary);
};

export default {
  props: {
    itemObj: { type: Array, default: () => [] },
    newModalSize: { type: String, default: "5*6" }
  },
  data() {
    return {};
  },
  methods: {
    // 返回避光或者重症图片路径
    warmUrl(type) {
      let url = "";
      switch (type + "") {
        case "2":
          url = require("../../../../common/images/card/gaowei.png");
          break;
        case "4":
          url = require("../../../../common/images/card/biguang.png");
          break;
      }
      return url;
    }
  },
  watch: {},
  computed: {
    currentBottle() {
      let cloneObj = cloneDeep(this.itemObj[0]);
      let orderText = [];
      // 提示图标
      let tipIcons = [];
      let dosageDosageUnits = [];
      this.itemObj.map(item => {
        orderText.push({ orderText: item.orderText, expand: item.expand4 });
        const val = ["2", "4"].find(v => v == item.printFlag);
        if (val) {
          tipIcons.push(val);
        }
        let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        dosageDosageUnits.push(content);
      });
      tipIcons.length > 2 && (tipIcons = [...new Set(tipIcons)]);

      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png", margin: 0 });
      let base64 = arrayBufferToBase64(qr_png);
      let qcSrc = base64;
      cloneObj = { ...cloneObj, orderText, qcSrc, tipIcons, dosageDosageUnits };
      return cloneObj;
    },
    hospitalName() {
      return this.HOSPITAL_NAME;
    },

    // 医生说明
    freqDetail() {
      return (
        this.itemObj && this.itemObj.map(item => item.freqDetail).join("\n")
      );
    }
  },
  filters: {
    repeatIndicatorFilter(val) {
      let obj = {
        0: "临时",
        1: "长期"
      };
      return obj[val];
    },
    executeDateFilter(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    }
  }
};
</script>
