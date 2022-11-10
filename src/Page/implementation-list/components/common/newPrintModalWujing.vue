<template>
  <div :style="{
      width: `${isLargeType ? '8' : '10'}cm`,
      height: `${isLargeType ? '4.8' : '5.8'}cm`,
    }">
    <!-- <div
      v-if="newModalSize == '6*8'"
      class="new-print-modal"
      style="width: 8cm; height: 5.7cm"
    >
      <div
        class="new-modal-top"
      >
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
            <div style="min-width: 50px">
              {{ currentBottle.repeatIndicator | repeatIndicatorFilter }}
            </div>
          </div>
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
          <div style="width: 20%">频次途径</div>
          <div style="flex: 1">{{ currentBottle.frequency }}</div>
        </div>
      </div>
    </div> -->

    <div
      v-if="newModalSize == '5*8'"
      class="new-print-modal"
      style="width: 8cm; height: 4.8cm"
    >
      <div class="new-modal-top">
        <div class="new-modal-top-left">
          <div class="new-modal-top-left-first">
            <div>
              床号:{{ currentBottle.bedLabel ? currentBottle.bedLabel + "床" : "" }}
            </div>
            <div>姓名:{{ currentBottle.name }}({{currentBottle.sex || ""}})</div>
          </div>

          <div class="new-modal-top-left-second">
            <div style="text-indent: 5px"> 频率:{{ currentBottle.frequency }}</div>
            <div>途径:{{ currentBottle.administration }}</div>
            <!-- <div>{{ currentBottle.age }}</div> -->
          </div>
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
          >
          <span>
            {{ item }}
          </span>
            <span>
              {{ currentBottle.dosageDosageUnits[index] }}
            </span>
          </div>
        </div>
        <div>
          医生说明: {{freqDetail}}
        </div>
        <div class="new-modal-bottom-second">
          <div class="tip-repeat">{{ currentBottle.repeatIndicator | repeatIndicatorFilter(true) }}</div>
          <div class="line">打印人:{{empName}}&nbsp;{{ currentBottle.executeDate.substr(0, 16) }} &nbsp;<span>[{{currentBottle.orderNo}}]</span></div>
          <div class="line line--writable">
            <span>
              执行者:
            </span>
            <span>核对者:</span>
          </div>
        </div>
      </div>
    </div>

    <div
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
            <div>{{ item }}</div>
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
<style lang='scss' scoped>
.new-print-modal {
  page-break-after: always;
  >>> * {
    font-size: 12px;
  }
  * {
    font-family: SimHei !important;
  }
  .new-modal-top {
    display: flex;
    font-weight: 800;
    height: 50px;
    div {
      font-size: 14px;
    }
    .new-modal-top-left {
      /* width: calc(100% - 50px); */
      height: 50px;
      .new-modal-top-left-first {
        display: flex;
        justify-content: center;
        padding-top: 6px;
        height: 28px;
        // background-color: #000;
        border-bottom: 1px solid #000;
        white-space: nowrap;
        & > div {
          text-align: center;
          line-height: 28px;
          font-size: 19px;
          font-weight: 900;
        }
        div + div {
          margin-left: 5px;
        }
      }
      .new-modal-top-left-second {
        height: 16px;
        line-height: 16px;
        display: flex;
        white-space: nowrap;
        div {
          flex: 1;
        }
      }
    }
    .new-modal-top-right {
      width: 50px;
      .new-modal-top-right-top {
        box-sizing: border-box;
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
      }
    }
  }
  .new-modal-bottom {
    display: flex;
    flex-direction: column;
    font-weight: 800;
    width: 100%;
    height: calc(100% - 50px);
    box-sizing: border-box;
    line-height: 16px;
    .new-modal-bottom-first {
      overflow: hidden;
      height: calc(100% - 50px);
      font-size: 14px;
      div {
        display: flex;
        justify-content: space-between;
        line-height: 16px;

        span {
          text-align: left;
        }
        span:first-child {
          flex: 1
        }
        span:nth-child(2) {
          width: 50px;
        }
      }
    }
    .new-modal-bottom-second {
      position: relative;
      width: 100%;
      border-top: 1px solid #000;
      .tip-repeat {
        border: 1px solid #000;
        top: 1px;
        left: 1px;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        line-height: 28px;
        font-size: 22px;
        text-align: center;
        position: absolute;
      }
      .line {
        box-sizing: border-box;
        padding-left: 33px;
        width: 100%;
      }
      .line--writable {
        display: flex;
        >span {
          flex:1;
        }
      }
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
import commonMixin from '@/common/mixin/common.mixin';
var qr = require("qr-image");
const DRUG_TYPES = {
  1: "普通",
  2: "高危",
  3: "自备",
};
export default {
  mixins: [commonMixin],
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
      var qr_png = qr.imageSync(qr_png_value, { type: "png", margin: 1 });
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
    // 医生说明
    freqDetail() {
      return (
        this.itemObj && this.itemObj.map((item) => item.freqDetail).join("\n")
      );
    },
    isLargeType() {
      return this.newModalSize == "5*8";
    },
  },
  filters: {
    repeatIndicatorFilter(val, isFirst = false) {
      let obj = {
        0: "临时",
        1: "长期",
      };
      let text = obj[val] || ''
      return isFirst ? text[0] : text;
    },
    executeDateFilter(val) {
      return moment(val).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>
