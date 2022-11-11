<template>
  <!-- <div
    :style="{
      width: `${newModalSize == '7*7' ? '7' : '1'}cm`,
      height: `${newModalSize == '7*7' ? '6.9' : '1'}cm`,
    }"
  > -->
    <div
      class="new-print-modal"
      style="width:7cm;height:6.99cm"
    >
      <div class="new-modal-top">
        <div class="new-modal-top-left">
          <div class="new-modal-top-left-first">
            <!-- <div>{{ currentBottle.name }}</div> -->
            <div>
              {{ currentBottle.bedLabel ? currentBottle.bedLabel + "床" : "" }}
            </div>
            <div>{{ currentBottle.name }}</div>
          </div>
          <div class="new-modal-top-left-second">
            <!-- <div style="text-indent: 5px">{{ currentBottle.deptName }}</div> -->
            <div>{{ currentBottle.patientId || "" }}</div>
            <!-- <div>{{ currentBottle.sex || "" }}</div> -->
            <!-- <div>{{ currentBottle.age }}</div> -->
          </div>
          <!-- <div class="new-modal-top-left-second">
            <div style="text-indent: 5px">
              频次途径:{{ currentBottle.frequency }}
            </div>
            <div>
              {{ currentBottle.repeatIndicator | repeatIndicatorFilter }}
            </div>
          </div> -->
        </div>
        <div class="new-modal-top-right">
          <div class="new-modal-top-right-top">
            <img :src="currentBottle.qcSrc || ''" />
          </div>
        </div>
      </div>
      <div class="new-modal-bottom">
        <div class="new-modal-bottom-first">
          <div
            v-for="(item, index) in currentBottle.orderText"
            :key="index"
            style="text-indent: 5px"
          >
            {{ item }}
          </div>
        </div>

        <div class="new-modal-bottom-second">
          <span>{{ currentBottle.frequency }} {{ currentBottle.repeatIndicator | repeatIndicatorFilter }}</span>
          <span>{{ currentBottle.executeDate.substr(0, 16) }}</span>
          <!-- <div style="width: 20%">频次途径</div> -->
          <!-- <div style="flex: 1">{{ currentBottle.frequency }}</div> -->
        </div>
      </div>
    </div>
    <!-- <div
      v-else
      class="new-print-modal"
      style="height: 5.8cm; width: 10cm; display: flex"
    >
      <div class="new-modal-small-left">
        <div class="new-modal-small-left-first">
          <div style="text-indent: 5px">{{ currentBottle.bedLabel }}</div>
          <div>{{ currentBottle.name }}</div>
          <div>{{ currentBottle.patientId }}</div>
        </div>
        <div class="new-modal-small-left-second">
          <div style="text-indent: 5px">
            {{ currentBottle.executeDate | executeDateFilter }}
          </div>
          <div style="min-width: 50px">
            {{ currentBottle.repeatIndicator | repeatIndicatorFilter }}
          </div>
        </div>
        <div class="new-modal-small-left-third">
          <div
            v-for="(item, index) in currentBottle.orderText"
            :key="index"
            style="text-indent: 5px; display: flex"
          >
            <div>
              {{ item }}
            </div>
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
    </div> -->
  <!-- </div> -->
</template>
<style lang='scss' scoped>
.new-print-modal {
  * {
    font-family: SimHei !important;
  }
  page-break-after: always;
  height: 100%;
  >>> * {
    font-size: 12px;
  }
  .new-modal-top {
    font-weight: 600;
    display: flex;
    overflow: hidden;
    div {
      font-size: 14px;
    }
    > div:first-child {
      border-right: 1px solid #000;
    }
    .new-modal-top-left {
      display: inline-block;
      box-sizing: border-box;
      width: calc(100% - 72px);
      .new-modal-top-left-first {
         display: flex;
        justify-content: center;
         box-sizing: border-box;
        // background-color: #000;
        border-bottom: 1px solid #000;
        & > div {
          white-space: nowrap;
          text-align: center;
          line-height: 40px;
          font-size: 26px;
          font-weight: 900;
        }
        div + div {
          margin-left: 8px;
        }
      }
      .new-modal-top-left-second {
        height: 24px;
        line-height: 24px;
        /* display: flex; */
        /* justify-content: space-between; */
        border-bottom: 1px solid #000;
        white-space: nowrap;
        &:last-child {
          border-bottom: 0;
        }
        div {
          display: inline-block;
        }
      }
    }
    .new-modal-top-right {
      width: 65px;
      display: inline-block;
      margin-bottom: 1px;
      margin-left: 1px;
      .new-modal-top-right-top {
        box-sizing: border-box;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: auto;
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
    height: calc(100% - 71px);
    box-sizing: border-box;
    .new-modal-bottom-first {
      line-height: 16px;
      overflow: hidden;
      height: calc(100% - 22px);
      div {
        line-height: 18px;
        font-size: 14px;
      }
    }
    .new-modal-bottom-second {
      width: 100%;
      font-size: 14px; 
      padding-right: 10px;
      display: flex; 
      // text-align: right;
      justify-content: space-between;
      line-height: 20px;
      border-top: 1px solid #000;
      /* div:first-child {
        border-right: 1px solid #000;
      }
      div:nth-of-type(2n + 1) {
        text-align: center;
      }
      div:nth-of-type(2n) {
        text-indent: 5px;
      } */
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
    .new-modal-small-left-third {
      line-height: 16px;
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
  watch: {
    itemObj(val) {
      console.log(val);
    },
  },
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
      var qr_png = qr.imageSync(qr_png_value, { type: "png", margin: 3 });
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
