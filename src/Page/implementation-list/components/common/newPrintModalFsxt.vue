<template>
  <div
    :style="{
      width: `${newModalSize.split('*')[1] == '8' ? '8' : '10'}cm`,
      height: `${newModalSize == '6*8' ? '5.9' : '5.7'}cm`
    }"
  >
    <div
      v-if="newModalSize == '6*8'"
      class="new-print-modal new-print-modal--large"
      style="width:8cm;height:5.9cm"
    >
      <div class="new-print-modal__title">
        <span>{{ currentBottle.deptName }}</span>
        <span class="bigger">
          {{ currentBottle.bedLabel ? currentBottle.bedLabel + "床" : "" }}
        </span>
        <span style="font-size: 8px;">
          {{currentBottle.administration}}
        </span>
      </div>
      <div class="new-print-modal__text">
        <span class="bigger">{{ currentBottle.name }}</span>
        <span>{{ currentBottle.age }}</span>
        <span>{{ currentBottle.executeDate.substr(0, 16) }}</span>
      </div>
      <div class="new-print-modal__qc">
        <img :src="currentBottle.qcSrc || ''" />
      </div>

      <table class="new-print-modal__content" height="16">
        <colgroup>
          <col width="66%" />
          <col />
          <col width="30"/>
          <col />
        </colgroup>
        <tr>
          <td><span>药品名称规格</span></td>
          <td><span>频率</span></td>
          <td><span>数量</span></td>
          <td><span>嘱托</span></td>
        </tr>
          <tr
            :class="{ 'left-item--normal': !isSmallItem }"
            v-for="(item, index) in this.itemObj"
            :key="index"
          >
          <td><span>{{ item.orderText }}&nbsp; {{ item.dosage + item.dosageUnits }}</span></td>
          <td><span>{{ item.frequency }}</span></td>
          <td><span>{{ item.expand3 }}</span></td>
          <td><span>{{ item.freqDetail }}</span></td>
          </tr>

      </table>
    </div>

    <div
      v-else
      class="new-print-modal"
      style="height:6cm;width:10cm;display:flex"
    >
      <div class="new-modal-small-left">
        <div class="new-modal-small-left-first">
          <div style="text-indent:5px">{{ currentBottle.bedLabel }}</div>
          <div>{{ currentBottle.name }}</div>
          <div>{{ currentBottle.patientId }}</div>
        </div>
        <div class="new-modal-small-left-second">
          <div style="text-indent:5px">
            {{ currentBottle.executeDate | executeDateFilter }}
          </div>
          <div style="min-width:50px;">
            {{ currentBottle.repeatIndicator | repeatIndicatorFilter }}
          </div>
        </div>
        <div class="new-modal-small-left-third">
          <div
            v-for="(item, index) in currentBottle.orderText"
            :key="index"
            style="line-height:16px;text-indent:5px;display:flex"
          >
            <div>{{ item }}</div>
            <div>{{ currentBottle.dosageDosageUnits[index] }}</div>
          </div>
        </div>
      </div>
      <div class="new-modal-small-right">
        <div class="new-modal-small-right-top">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
        <div class="new-modal-small-right-bottom">
          <div>{{ currentBottle.frequency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.new-print-modal {
  page-break-after: always;
  * {
      font-family: 'SimHei' !important;
    }
  >>> * {
    font-size: 12px;
    color: #000;
  }
  .p-lr-5 {
    padding: 0 5px;
  }
  .bb {
    border-bottom: 1px solid #000;
  }
  .same-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 70px);
    height: 30px;
  }
  &.new-print-modal--large {
    position: relative;
    display: flex;
    flex-direction: column;
    /* font-weight: 600; */
		height: 100%;
  }
  .new-print-modal__title {
    @extend .same-top;
    @extend .bb;
    font-size: 16px;
    padding-top: 10px;
    /* height: 32px; */
    .bigger {
      font-size: 18px;
      font-weight: 900;
    }
  }
  .new-print-modal__text {
    @extend .same-top;
    span {
      font-size: 16px;
    }
    .bigger {
      font-size: 18px;
      font-weight: 900;
    }
  }
  .new-print-modal__content {
    /* flex: 1; */
    td {
      border: 1px solid #000;
    }
    tr:nth-child(n + 1) {
      font-size: 13px;
    }
    tr td:nth-child(n + 1) {
      text-align: center;
    }
    span {
      // font-weight: 900;
      line-height: 14px;
    }
  }
  .new-print-modal__qc {
    position: absolute;
    top: 0;
    right: 0;
    width: 70px;
    img {
      width: 100%;
      height: auto;
    }
  }

  .new-modal-small-left {
    >>> * {
      font-size: 16px;
      line-height: 24px;
    }
    flex: 2;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #000;
    .new-modal-small-left-first {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      // background-color: #000;
      border-bottom: 1px solid #000;
    }
    .new-modal-small-left-second {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
    }
  }
  .new-modal-small-right {
    >>> * {
      font-size: 16px;
      line-height: 24px;
    }
    flex: 1;
    box-sizing: border-box;
    border: 1px solid #000;
    border-left: none;
    height: 100%;
    .new-modal-small-right-top {
      padding: 2%;
      box-sizing: border-box;
      img {
        width: 96%;
      }
    }
  }
}
</style>
<script>
import { cloneDeep } from "lodash";
import moment from "moment";
import { getBytesLength } from "@/utils/tool";
var qr = require("qr-image");
const DRUG_TYPES = {
  1: "普通",
  2: "高危",
  3: "自备"
};
export default {
  props: {
    itemObj: { type: Array, default: () => [] },
    newModalSize: { type: String, default: "6*8" }
  },
  data() {
    return {};
  },
  methods: {},
  watch: {},
  computed: {
    currentBottle() {
      let cloneObj = cloneDeep(this.itemObj[0]);
      let orderText = [];
      let dosageDosageUnits = [];

      this.itemObj.map(item => {
        orderText.push(item.orderText);
        let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        dosageDosageUnits.push(content);
      });
      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png", margin: 2 });
      // var qr_png = qr.imageSync(this.query.patientId, { type: "png" });
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
      let qcSrc = base64;
      cloneObj = { ...cloneObj, orderText, dosageDosageUnits, qcSrc };
      return cloneObj;
    },
		/**
		 * 药品信息是否显示为小号
		 */
    // isSmallItem() {
		// 	if (this.currentBottle.orderText.length <= 3) return false;
    //   let max = 9;
    //   this.currentBottle.orderText.map(v => {
    //     if (getBytesLength(v) > 27) max -= 2;
    //     else max -= 1;
    //   });
    //   return max < 0;
    // },
		// hospitalName() {
    //   switch(this.HOSPITAL_ID) {
    //     case 'sdlj':
    //       return '广东医科大学附属第三医院'
    //     case 'fsxt':
    //       return '杏坛医院'
    //     default:
    //       return this.HOSPITAL_NAME
    //   }
		// },
    // 组号
    // groupNo() {
    //   return this.itemObj[0] && this.itemObj[0].groupNo || ''
    // },
    // // 是否重症
    // isSevere() {
    //   return this.itemObj && this.itemObj.find(item => item.drugType == 2)
    // },
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
