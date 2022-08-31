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
        <span>{{ hospitalName }}</span>
        <span>{{ currentBottle.deptName }}</span>
      </div>
      <div class="new-print-modal__text">
        <span>{{ currentBottle.sex || "" }}</span>
        <span>{{ currentBottle.age }}</span>
        <div>{{ currentBottle.name }}</div>
        <div>
          {{ currentBottle.bedLabel ? currentBottle.bedLabel + "床" : "" }}
        </div>
        <span>{{ currentBottle.patientId || "" }}</span>
        <span>{{ currentBottle.repeatIndicator | repeatIndicatorFilter }}</span>
      </div>
      <div class="new-print-modal__content">
        <div class="new-print-modal__content__left">
          <div v-if="isSevere" class="content__left__severe">G</div>
          <div
            :class="{ 'left-item--normal': !isSmallItem }"
            v-for="(item, index) in currentBottle.orderText"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="new-print-modal__content__right">
          <div>
            <img :src="currentBottle.qcSrc || ''" />
          </div>
          <p class="text--large absolute--small">
            <span>
              {{ `${currentBottle.frequency}${groupNo ? `(${groupNo})`: ''}` }}
            </span>
          </p>
          <div>
            <span>{{ currentBottle.executeDate.substr(0, 16) }}</span>
          </div>
          <span class="text--large">{{ currentBottle.executeType }}</span>
          <p :class="{marginRight:['sdlj'].includes(HOSPITAL_ID)}" class="absolute--small" v-if="currentBottle.administration">
            <span :class="{fontStyle:['sdlj'].includes(HOSPITAL_ID)}">{{ currentBottle.administration }}</span>
          </p>
        </div>
      </div>
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
  &.new-print-modal--large {
    display: flex;
    flex-direction: column;
    /* font-weight: 600; */
		height: 100%;
  }
  .new-print-modal__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 24px;
    @extend .p-lr-5;
    @extend .bb;
    padding-right: 10px;
    span:first-child {
      font-size: 16px;
      font-weight: 900;
      white-space: nowrap;
    }
  }
  .new-print-modal__text {
    display: grid;
    grid-template-columns: minmax(45px, 50px) minmax(30px, 50px) auto auto;
    grid-template-rows: auto;
    grid-gap: 0px 5px;
    align-items: center;
    @extend .p-lr-5;
    @extend .bb;
    span {
      line-height: 15px;
      min-height: 15px;
    }
    span:nth-child(2n) {
      text-align: right;
    }
    span:nth-child(2n - 1) {
      text-align: left;
    }
     span:nth-of-type(3) {
      min-width:72px;
      font-size: 13px;
      font-weight: 900;
    }
    > div {
      font-size: 25px;
      font-weight: 900;
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 4;
      grid-column-end: 5;
      white-space: nowrap;
    }
    div:first-of-type {
      grid-column-start: 3;
      grid-column-end: 4;
    }
  }
  .new-print-modal__content {
    flex: 1;
    display: flex;
    .new-print-modal__content__left {
      position: relative;
      flex: 1;
      font-weight: 900;
      line-height: 13px;
			padding-left: 10px;
      padding-top: 5px;
      .left-item--normal {
				line-height: 16px;
        font-size: 15px;
        font-weight: 900;
      }
      .content__left__severe {
        position: absolute;
        left: calc(50% - 50px);
        top: 10px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 6px solid #000;
        opacity: .4;
        font-size: 50px;
        font-weight: bolder;
        line-height: 100px;
        text-align: center;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      }
    }
    .new-print-modal__content__right {
			display: flex;
      flex-direction: column;
      width: 70px;
      text-align: right;
			@extend .p-lr-5;
			padding-bottom: 2px;
      line-height: 16px;
      font-weight: 900;
      div {
        &:first-of-type{
          padding-top: 1px;
          width: 100%;
          /* flex: 1; */
          margin-bottom: 8px;
        }
        &:last-of-type{
          position: relative;
          min-height: 32px;
          margin-right: 10px;
          span{
            position: absolute;
            left: -15px;
            top: 0;
          }
        }
      }
      img {
        width: 100%;
        height: auto;
      }
      .text--large {
        font-size: 17px;
				font-weight: 700;
      }
      .absolute {
        white-space: nowrap;
        position: relative;
        span {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      p.absolute--large {
        height: 16px;
        @extend .absolute;
      }
      p.absolute--small {
        height: 13px;
        @extend .absolute;
        &.marginRight{
          margin-right: 10px;
        }
        span{
          font-size: 17px;
          font-weight: 700;
        }
      }
      >span{
        margin-right: 10px;
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
        orderText.push(item.orderText + (['sdlj'].includes(this.HOSPITAL_ID) ? '' : (DRUG_TYPES[item.drugType] || "")));
        let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        dosageDosageUnits.push(content);
      });
      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png" });
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
    isSmallItem() {
			if (this.currentBottle.orderText.length <= 3) return false;
      let max = 9;
      this.currentBottle.orderText.map(v => {
        if (getBytesLength(v) > 27) max -= 2;
        else max -= 1;
      });
      return max < 0;
    },
		hospitalName() {
      switch(this.HOSPITAL_ID) {
        case 'sdlj':
          return '广东医科大学附属第三医院'
        case 'fsxt':
          return '杏坛医院'
        default:
          return this.HOSPITAL_NAME
      }
		},
    // 组号
    groupNo() {
      return this.itemObj[0] && this.itemObj[0].groupNo || ''
    },
    // 是否重症
    isSevere() {
      return this.itemObj && this.itemObj.find(item => item.drugType == 2)
    },
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
