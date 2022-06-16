<template>
<!-- 6.7 -->
  <div
    :style="{
      width: `${newModalSize == '70*80' ? '7' : '14'}cm`,
      height: `${newModalSize == '70*80' ? '8' : '7.99'}cm`
    }"
  >
    <!-- 小瓶签一张纸需要打印2条数据数据间要留白 -->
    <div v-if="newModalSize == '3*7'" class="blank--small"></div>
    <div
      v-if="newModalSize == '70*80'"
      class="new-print-modal new-print-modal--large"
      style="width:7cm;height:8cm"
    >
      <div class="new-print-modal__title">
        <span :class="{center:currentBottle.deptName.length<=6}">{{ hospitalName }}</span>
        <span>{{ currentBottle.deptName }}</span>
      </div>
      <div class="new-print-modal__second">
        <div class="new-print-modal__text">
          <div>{{ currentBottle.name }}</div>
          <div>
            {{ currentBottle.bedLabel ? currentBottle.bedLabel + "床" : "" }}
          </div>
          <span>{{ currentBottle.sex || "" }}</span>
          <span>{{ currentBottle.age }}</span>
          <span>{{ currentBottle.patientId || "" }}</span>
          <span>{{ currentBottle.repeatIndicator | repeatIndicatorFilter }}</span>
        </div>

        <div class="qc-box">
            <img :src="currentBottle.qcSrc || ''" />
          </div>
      </div>
      <div class="new-print-modal__content">
        <div class="new-print-modal__content__left">
          <div v-if="isSevere" class="content__left__severe"></div>
          <div
            :class="{ 'left-item--normal': !isSmallItem }"
            v-for="(item, index) in currentBottle.orderText"
            :key="index"
          >
            {{ item }}
          </div>
          <div v-if="isBiguang || isSevere" class="content__left_warm">
            <img :src="WarmUrl">
          </div>
        </div>
        <div class="new-print-modal__content__right">
          <p class="text--large">
            <span>
              {{ `${currentBottle.frequency}${groupNo ? `(${groupNo})`: ''}` }}
            </span>
          </p>
          <span>{{ currentBottle.executeDate.substr(0, 16) }}</span>
          <span class="text--large">{{ currentBottle.executeType }}</span>
        </div>
      </div>
      <div class="new-print-modal_bott">
        <div class="modal_bott_top">
          <span>配液者</span><span></span>
          <span>配置时间</span><span></span>
        </div>
        <div class="modal_bott_bottom">
          <span>核对者</span><span></span>
        </div>

      </div>
    </div>

    <div
      v-else
      class="new-print-modal new-modal-small"
      style="height:6cm;width:14cm;display:flex"
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
            style="line-height:20px;text-indent:5px;display:flex"
          >
            <div>{{ item }}{{ currentBottle.dosageDosageUnits[index] }}</div>
          </div>
        </div>
      </div>
      <div class="new-modal-small-right">
        <div class="new-modal-small-right-top">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
        <div class="new-modal-small-right-bottom">
          <div style="text-align:center;">{{ currentBottle.frequency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
// 临邑浏览器版本有部分为谷歌49，需要考虑兼容
<style lang="scss" scoped>
.new-print-modal {
  page-break-after: always;
  >>> * {
    font-size: 13px;
    font-weight: 700;
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
    span:first-child {
      &.center{
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
      font-size: 18px;
      text-align: center;
    }
  }
  .new-print-modal__second {
    display: flex;
    @extend .bb;
  }
  .new-print-modal__text {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    @extend .p-lr-5;
    span, div {
      width: 50%;
    }
    span {
      line-height: 15px;
      min-height: 15px;
    }
    > div {
      font-size: 25px;
      font-weight: 900;
      white-space: nowrap;
    }
  }
  .qc-box {
    width: 54px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .new-print-modal__content {
    flex: 1;
    display: flex;
    position: relative;
    /* min-height: 220px; */

    .content__left_warm{
      text-align: center;
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
        img {
            width: 40px;
            height: 40px;
      }
    }
    .new-print-modal__content__left {
      position: relative;
      flex: 1;
      font-weight: 700;
      line-height: 13px;
			padding-left: 15px;
     /* padding-bottom: 50px; */
      .left-item--normal {
				line-height: 16px;
        font-size: 15px;
      }
      .content__left__severe {
        position: absolute;
        left: calc(50% - 50px);
        top: 10px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 2px solid #000;
      }
    }
    .new-print-modal__content__right {
      position: absolute;
      right: 0;
      bottom: 0;
			display: flex;
      flex-direction: column;
      text-align: right;
			padding-bottom: 2px;
      line-height: 16px;
      div {
				padding-top: 1px;
        width: 100%;
        /* flex: 1; */
				margin-bottom: 8px;
      }
      .text--large {
        font-size: 17px;
				font-weight: 700;
      }
      >span:last-of-type{
        min-width: 72px;
      }
      p.text--large {
        white-space: nowrap;
        position: relative;
        height: 16px;
      }
    }
  }
  .new-print-modal_bott{
    border-top:1px solid #000;
    padding: 8px 15px;
    font-size: 15px;

    .modal_bott_top{
      display: flex;
      margin-bottom: 10px;
      span:nth-of-type(2n+1){
        margin-right: 10px;
      }
      span:nth-of-type(2){
        margin-right: 10px;
      }
      span:nth-of-type(2n){
        position: relative;
        top: 15px;
        width: 50px;
        border-top:1px solid #000;
      }
      span:nth-of-type(4){
        width: 80px;
      }
    }
    .modal_bott_bottom{
      display: flex;
      span:nth-of-type(1){
        margin-right: 10px;
      }
      span:nth-of-type(2){
        position: relative;
        top: 15px;
        width: 50px;
        border-top:1px solid #000;
      }
    }
  }
  &.new-modal-small {
    div,p,span {

      font-size: 17px;
      line-height: 24px;
    }
  }
  .new-modal-small-left {
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
.blank--small {
  height: 1.4cm;
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
  3: "自备",
  4: "避光"
};
export default {
  props: {
    itemObj: { type: Array, default: () => [] },
    newModalSize: { type: String, default: "6*8" }
  },
  data() {
    return {};
  },
  methods: {
  },
  watch: {},
  computed: {
    currentBottle() {
      let cloneObj = cloneDeep(this.itemObj[0]);
      let orderText = [];
      let dosageDosageUnits = [];
      this.itemObj.map(item => {
        orderText.push(item.orderText + (DRUG_TYPES[item.drugType] || ""));
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
			if (this.HOSPITAL_ID === 'sdlj') {
				return '广东医科大学附属第三医院'
			}
			return this.HOSPITAL_NAME
		},
    // 组号
    groupNo() {
      return this.itemObj[0] && this.itemObj[0].groupNo || ''
    },
    // 是否重症
    isSevere() {
      // return this.itemObj[0] && this.itemObj[0].drugType == 2
      return this.itemObj && this.itemObj.find(item => item.drugType == 2)
    },
    // 是否避光
    isBiguang() {
      return this.itemObj && this.itemObj.find(item => item.drugType == 4)
      // return this.itemObj[0] && this.itemObj[0].drugType == 4
    },
    // 返回避光或者重症图片路径
    WarmUrl() {
      let url = ""
      switch(this.itemObj[0].drugType){
        case "2":
          url = require("../../../../common/images/card/gaowei.png");
          break;
        case "4":
          url = require("../../../../common/images/card/biguang.png");
          break;
      }
      return url
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
