<template>
  <div
    :style="{
      width: `${isLargeType ? '8' : '10'}cm`,
      height: `${isLargeType ? '5.9' : '5.9'}cm`,
    }"
    class="new-print-modal"
		:class="{'new-print-modal--s': !isLargeType}"
  >
    <div class="new-modal-top">
      <div class="new-modal-top-right">
        <div class="new-modal-top-right-top">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>
      <div class="new-modal-top-left">
        <div class="new-modal-top-left-first">
          <div>{{ currentBottle.name }}</div>
          <div>
            {{ currentBottle.bedLabel ? currentBottle.bedLabel + "床" : "" }}
          </div>
        </div>
        <div class="new-modal-top-left-second">
          <div style="text-indent: 5px">{{ currentBottle.deptName }}</div>
          <div>{{ currentBottle.patientId || "" }}</div>
          <div>{{ currentBottle.sex || "" }}</div>
          <div>{{ currentBottle.age }}</div>
        </div>
        <div class="new-modal-top-left-second">
          <div style="text-indent: 5px">
            执行日期:{{ currentBottle.executeDate.substr(0, 16) }}
          </div>
          <div>
            {{ currentBottle.repeatIndicator | repeatIndicatorFilter }}
          </div>
        </div>
      </div>
    </div>
    <div class="new-modal-bottom">
        <div
          v-for="(item, index) in currentBottle.orderText"
          :key="index"
          style="text-indent: 5px"
        >
          {{ item }}
      </div>
    </div>
    <div class="new-modal-bottom-second">
      <div style="width: 20%">频次途径</div>
      <div style="flex: 1">{{ currentBottle.frequency }}</div>
    </div>
  </div>
</template>
<style lang='scss' scoped>
.new-print-modal {
  page-break-after: always;
	display: flex;
	flex-direction: column;
  >>> * {
    font-size: 12px;
  }
  .new-modal-top {
    display: flex;
    font-weight: 600;
    div {
      font-size: 13px;
    }
    > div:first-child {
      border-right: 1px solid #000;
    }
    .new-modal-top-left {
      box-sizing: border-box;
      width: calc(100% - 60px);
      .new-modal-top-left-first {
        display: flex;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
        & > div {
          text-align: center;
          line-height: 29px;
          font-size: 25px;
          font-weight: 900;
        }
        div + div {
          margin-left: 8px;
        }
      }
      .new-modal-top-left-second {
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #000;
        box-sizing: border-box;
        white-space: nowrap;
        &:last-child {
          border-bottom: 0;
        }
      }
    }
    .new-modal-top-right {
      width: 62px;

      .new-modal-top-right-top {
        box-sizing: border-box;
        overflow: hidden;
        img {
          width: 100%;
          height: 64px;
          object-fit: cover;
        }
      }
      .new-modal-top-right-bottom {
        line-height: 16px;
      }
    }
  }
  .new-modal-bottom {
    border-top: 1px solid #000;
    font-weight: 700;
    width: 100%;
    box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		flex: 1;
		overflow: hidden;
      div {
        line-height: 18px;
        font-size: 15px;
      }
  }
  .new-modal-bottom-second {
    width: 100%;
    display: flex;
    line-height: 21px;
    border-top: 1px solid #000;
    div:first-child {
      border-right: 1px solid #000;
    }
    div:nth-of-type(2n + 1) {
      text-align: center;
    }
    div:nth-of-type(2n) {
      text-indent: 5px;
    }
  }
  &.new-print-modal--s {
		>>> * {
			font-size: 18px;
			font-weight: 700;
			line-height: 21px;
		}
		.new-modal-top div {
      font-size: 18px;
			line-height: 21px;
    }
		.new-modal-top-left .new-modal-top-left-first  div{
			font-size: 29px;
			padding-top: 3px;
		}
		.new-modal-bottom div {
			font-size: 20px;
			line-height: 22px;
		}
  }
}
</style>
<script>
import { cloneDeep } from "lodash";
import moment from "moment";
var qr = require("qr-image");
const DRUG_TYPES = {
  1: "普通",
  2: "高危",
  3: "自备",
};
export default {
  props: {
    itemObj: { type: Array, default: () => [] },
    newModalSize: { type: String, default: "6*8" },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    currentBottle() {
      let cloneObj = cloneDeep(this.itemObj[0]);
      let orderText = [];
      let dosageDosageUnits = [];

      this.itemObj.map((item) => {
        orderText.push(item.orderText + (DRUG_TYPES[item.drugType] || ""));
        let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        dosageDosageUnits.push(content);
      });
      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png" });
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
    isLargeType() {
      return this.newModalSize == "6*8";
    },
  },
  filters: {
    repeatIndicatorFilter(val) {
      let obj = {
        0: "临时",
        1: "长期",
      };
      return obj[val];
    },
    executeDateFilter(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>
