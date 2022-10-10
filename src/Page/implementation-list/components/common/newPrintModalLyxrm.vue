<template>
<!-- 6.7 -->
  <div
    :style="{
      width: `${newModalSize == '70*80' || newModalSize == '7*7' ? '7' : '14'}cm`,
      height: `${newModalSize == '70*80' ? '8' : newModalSize == '7*7' ? '7' : '5.3'}cm`
    }"
  >
    <!-- 小瓶签一张纸需要打印3条数据数据间要留白 -->
    <div v-if="newModalSize == '3*7'" class="blank--small"></div>
    <div
      v-if="['70*80','7*7'].includes(newModalSize)"
      class="new-print-modal new-print-modal--large"
      :style="{width: '7cm',height: `${newModalSize == '7*7' ? 7 : 8}cm`}"
    >
      <div class="new-print-modal__title">
        <span>{{currentBottle.printFlag ? '补' : ''}}</span>
        <span class="center">{{ hospitalName }}</span>
        <span>{{ currentBottle.repeatIndicator | repeatIndicatorFilter }}</span>
      </div>
      <div class="new-print-modal__second">
        <div class="flex">
          <div>
            姓名:<span>{{ currentBottle.name }}</span>
          </div>
          <div>
            床号:<span>{{ currentBottle.bedLabel }}</span>
          </div>
        </div>
        <div class="flex">
          <div v-if="this.HOSPITAL_ID === 'zhzxy'">{{ `住院号:${currentBottle.inpNo || ""}` }}</div>
          <div v-else>{{ `ID号:${currentBottle.patientId || ""}` }}</div>
          <div>{{ `性别:${currentBottle.sex || ""}` }}</div>
        </div>
        <div class="flex">
          <div>{{ `科室:${currentBottle.deptName}` }}</div>
          <div>{{ `年龄:${currentBottle.age}` }}</div>
        </div>
      </div>

      <div class="new-print-modal__content" :class="{is925}">
        <div
          v-for="(item, index) in currentBottle.orderText"
          :key="index"
        >{{item}}
          <span>{{currentBottle.dosageDosageUnits[index]}}</span>
        </div>
      </div>

      <div class="new-print-modal__tip">
        <div>医生说明:{{freqDetail}}</div>
        <div class="warm-icon">
          <img v-for="v in currentBottle.tipIcons" :key="v" :src="warmUrl(v)">
        </div>
      </div>

      <div class="new-print-modal__b">
        <div class="new-print-modal__b__l">
          <span>
            途径:{{ currentBottle.administration }}
          </span>
          <span>
            频率:{{ `${currentBottle.frequency}${currentBottle.groupNo ? `(${currentBottle.groupNo})`: ''}` }}
          </span>
          <span>执行时间:{{ currentBottle.executeDate.substr(0, 16) }}</span>
          <span v-if="!is925">配液者</span>
          <span v-if="!is925">配置时间</span>
          <span v-if="!is925">核对者</span>
        </div>
        <div class="qc-box">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>
    </div>

    <div
      v-else
      class="new-print-modal new-modal-small"
      style="height:5cm;width:14cm;"
    >
    <!-- display:flex -->
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
            <div>
              途径: {{ currentBottle.administration }}
            </div>
            <div>
              频率: {{ `${currentBottle.frequency}${currentBottle.groupNo ? `(${currentBottle.groupNo})`: ''}` }}
            </div>
          </div>
          <div>
            执行时间: {{currentBottle.executeDate.substr(0, 16)}}
          </div>
        </div>
        <div class="new-modal-small-top__right">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>

      <div class="new-modal-small-content">
        <div
          v-for="(item, index) in currentBottle.orderText"
          :key="index"
        >
          <span>{{item}}</span>
          <span>{{itemObj[index].freqDetail}}</span>
          <span>{{currentBottle.dosageDosageUnits[index]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
// 临邑浏览器版本有部分为谷歌49，需要考虑兼容
<style lang="scss" scoped>
.p-lr {
  padding: 0 8px;
}
.bb {
  border-bottom: 1px solid #000;
}
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
    font-size: 14px;
    line-height: 18px;
    @extend .p-lr;
    box-sizing: border-box;
  }
  .new-print-modal__title {
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    width: 100%;
    font-size: 18px;
    margin: 2px 0 4px;
    flex-shrink: 0;
  }

  .new-print-modal__second {
    /* display: flex;
    flex-wrap: wrap;
    flex-shrink: 0;
    align-items: flex-end; */
    height: 65px;
    @extend .bb;
    .flex {
      display: flex;
      height: 18px;
      div {
        flex: 3;
        white-space: nowrap;
      }
      div:last-child {
        flex: 2;
      }
      >div>span {
        font-size: 24px;
        line-height: 24px;
        display: inline-block;
        font-weight: 900;
        white-space: nowrap;
      }
      &:first-child {
        height: 28px;
      }
    }
    div {
      flex: 62%;
      text-indent: 3px;
    }

    /* >div:nth-child(2n) {
      flex: 38%;
      text-indent: 0px;
    }
    >div:nth-child(-n + 2) {
      line-height: 24px;
    } */
    >div:nth-child(2)>span {
      font-size: 22px;
      font-weight: 900;
      /* text-shadow: 1px 0px #000,-1px 0px #000,0px 1px #000,0px -1px #000,; */
    }
    /* >div>span {
      font-size: 24px;
      line-height: 24px;
      display: inline-block;
      font-weight: 900;
      white-space: nowrap;
    } */
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
  .new-print-modal__content {
    flex: 1;
    div {
      /* white-space: pre-wrap; */
      display: flex;
      justify-content: space-between;
      padding: 0px 4px;
      line-height: 20px;
      text-align: left;
    }
    &.is925 {
      * {
        font-size: 16px;
      }
    }
  }
  .new-print-modal__tip {
    display: flex;
    justify-content: space-between;
    @extend .bb;
  }
  .warm-icon{
    img {
      width: 20px;
      height: 20px;
    }
    img + img {
      margin-left: 4px;
    }
  }
  .new-print-modal__b {
    display: flex;
    padding-bottom: 6px;
  }
  .new-print-modal__b__l {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    span {
      width: 100%;
    }
    span:nth-child(1),span:nth-child(2),span:nth-child(4),span:nth-child(5) {
      width: 50%;
    }
    span:nth-child(n+4) {
      display: flex;
      &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #000;
      }
    }
  }

  &.new-modal-small {
    /* display: flex; */
    /* flex-direction: column; */
		height: 100%;
    box-sizing: border-box;
    font-weight: 500;
    padding-left: 8px;
    div,p,span {
      font-size: 22px;
      line-height: 25px;
    }
  }
  .new-modal-small-top {
    /* display: flex; */
    border: 1px solid #000;
    height: 98px;
    box-sizing: border-box;
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
      .flex:first-child{
        line-height: 25px;
        height: 42px;
        >div>span {
          font-weight: 700;
          font-size: 38px;
          line-height: 42px;
          text-shadow: 1px 0px #000,-1px 0px #000,0px 1px #000,0px -1px #000,;
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
      padding: 0px 2px;
      text-align: left;
      border: 1px solid #000;
      border-top: none;
    }
  }

}
.blank--small {
  height: 0.2cm;
}
</style>
<script>
import { cloneDeep } from "lodash";
import moment from "moment";
import { getBytesLength } from "@/utils/tool";
var qr = require("qr-image");
const DRUG_TYPE = {
  1: "普通",
  2: "高危",
  3: "自备",
  4: "避光",
};
const arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return "data:image/png;base64," + window.btoa(binary);
}

export default {
  props: {
    itemObj: { type: Array, default: () => [] },
    newModalSize: { type: String, default: "6*8" }
  },
  data() {
    return {
      is925: this.HOSPITAL_ID === '925'
    };
  },
  methods: {
    // 返回避光或者重症图片路径
    warmUrl(type) {
      let url = ""
      switch(type + ''){
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
  watch: {},
  computed: {
    currentBottle() {
      let cloneObj = cloneDeep(this.itemObj[0]);
      let orderText = [];
      // 提示图标
      let tipIcons = []
      let dosageDosageUnits = []
      this.itemObj.map(item => {
        orderText.push(item.orderText);
        const val = ['2', '4'].find(v => v == item.printFlag)
        if (val) {
          tipIcons.push(val)
        }
        let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        dosageDosageUnits.push(content);
      });
      tipIcons.length>2 && (tipIcons = [...new Set(tipIcons)])

      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png",margin: 0 });
      let base64 = arrayBufferToBase64(qr_png);
      let qcSrc = base64;
      cloneObj = { ...cloneObj, orderText, qcSrc, tipIcons, dosageDosageUnits };
      return cloneObj;
    },
		hospitalName() {
			if (this.HOSPITAL_ID === 'sdlj') {
				return '广东医科大学附属第三医院'
			}
			return this.HOSPITAL_NAME
		},

    // 医生说明
    freqDetail() {
      return this.itemObj && this.itemObj.map(item => item.freqDetail).join('\n')
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
