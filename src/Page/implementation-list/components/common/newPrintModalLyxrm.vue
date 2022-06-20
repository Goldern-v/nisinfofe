<template>
<!-- 6.7 -->
  <div
    :style="{
      width: `${newModalSize == '70*80' ? '7' : '14'}cm`,
      height: `${newModalSize == '70*80' ? '8' : '5.33'}cm`
    }"
  >
    <!-- 小瓶签一张纸需要打印3条数据数据间要留白 -->
    <div v-if="newModalSize == '3*7'" class="blank--small"></div>
    <div
      v-if="newModalSize == '70*80'"
      class="new-print-modal new-print-modal--large"
      style="width:7cm;height:8cm"
    >
      <div class="new-print-modal__title">
        <span>{{currentBottle.printFlag ? '补' : ''}}</span>
        <span class="center">{{ hospitalName }}</span>
        <span>{{ currentBottle.repeatIndicator | repeatIndicatorFilter }}</span>
      </div>
      <div class="new-print-modal__second">
        <div>
          姓名:
          <span>
            {{ currentBottle.name }}
          </span>
        </div>
        <div>
          床号:
          <span>
            {{ currentBottle.bedLabel }}
          </span>
        </div>
        <div>{{ `ID号: ${currentBottle.patientId || ""}` }}</div>
        <div>{{ `性别: ${currentBottle.sex || ""}` }}</div>
        <div>{{ `科室: ${currentBottle.deptName}` }}</div>
        <div>{{ `年龄: ${currentBottle.age}` }}</div>
      </div>

      <div class="new-print-modal__content">
        <div
          v-for="(item, index) in currentBottle.orderText"
          :key="index"
        >{{item}}</div>
      </div>

      <div class="new-print-modal__tip">
        <div>医生说明: {{freqDetail}}</div>
        <div class="warm-icon">
          <img v-for="v in currentBottle.tipIcons" :key="v" :src="warmUrl(v)">
        </div>
      </div>

      <div class="new-print-modal__b">
        <div class="new-print-modal__b__l">
          <span>
            途径: {{ currentBottle.administration }}
          </span>
          <span>
            频率: {{ `${currentBottle.frequency}${currentBottle.groupNo ? `(${currentBottle.groupNo})`: ''}` }}
          </span>
          <span>执行时间: {{ currentBottle.executeDate.substr(0, 16) }}</span>
          <span>配液者</span>
          <span>配置时间</span>
          <span>核对者</span>
        </div>
        <div class="qc-box">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>
    </div>

    <div
      v-else
      class="new-print-modal new-modal-small"
      style="height:5cm;width:14cm;display:flex"
    >
      <div class="new-modal-small-top">
        <div class="new-modal-small-top__left">

          <div>
            姓名:
            <span>
              {{ currentBottle.name }}
            </span>
          </div>
          <div>
            床号:
            <span>
              {{ currentBottle.bedLabel }}
            </span>
          </div>
          <div>
            途径: {{ currentBottle.administration }}
          </div>
          <div>
            频率: {{ `${currentBottle.frequency}${currentBottle.groupNo ? `(${currentBottle.groupNo})`: ''}` }}
          </div>
          <div>执行时间: {{ currentBottle.executeDate.substr(0, 16) }}</div>
        </div>
        <div class="new-modal-small-top__right">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>

      <div class="new-modal-small-content">
        <div
          v-for="(item, index) in currentBottle.orderText"
          :key="index"
        >{{item}}</div>
      </div>
    </div>
  </div>
</template>
// 临邑浏览器版本有部分为谷歌49，需要考虑兼容
<style lang="scss" scoped>
.new-print-modal {
  page-break-after: always;
  >>> * {
    /* font-size: 13px; */
    font-weight: 700;
  }
  .p-lr {
    padding: 0 8px;
  }
  .bb {
    border-bottom: 1px solid #000;
  }

  &.new-print-modal--large {
    display: flex;
    flex-direction: column;
    /* font-weight: 600; */
		height: 100%;
    font-size: 14px;
    line-height: 18px;
    @extend .p-lr;
  }
  .new-print-modal__title {
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    width: 100%;
    font-size: 18px;
    margin: 2px 0 4px;
  }

  .new-print-modal__second {
    display: flex;
    flex-wrap: wrap;
    @extend .bb;
    div {
      flex: 65%;
    }

    >div:nth-child(2n) {
      flex: 35%;
    }
    >div>span {
      font-size: 25px;
      font-weight: 800;
      white-space: nowrap;
    }
  }

  .qc-box {
    width: 54px;
    overflow: hidden;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .new-print-modal__content {
    flex: 1;
    div {
      white-space: pre-wrap;
      line-height: 20px;
      text-align: left;
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
    span:nth-child(n+3) {
      display: flex;
      &::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #000;
      }
    }
  }

  &.new-modal-small {
    display: flex;
    flex-direction: column;
		height: 100%;
    div,p,span {
      font-size: 19px;
      line-height: 24px;
    }
  }
  .new-modal-small-top {
    display: flex;
    @extend .bb;
    .new-modal-small-top__left {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      div {
        flex: 65%;
      }

      >div:nth-child(2n) {
        flex: 35%;
      }
      >div>span {
        font-size: 25px;
        font-weight: 800;
        white-space: nowrap;
      }
    }
    .new-modal-small-top__right {
      width: 60px;
      img {
        width: 100%;
      }
    }
  }
  .new-modal-small-content {
    flex: 1;
    div {
      white-space: pre-wrap;
      line-height: 20px;
      text-align: left;
      @extend .bb;
    }
  }

}
.blank--small {
  height: 0.3cm;
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
    return {};
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
      this.itemObj.map(item => {
        orderText.push(item.orderText);
        const val = ['2', '4'].find(v => v == item.printFlag)
        if (val) {
          tipIcons.push(val)
        }
        // let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        // dosageDosageUnits.push(content);
      });
      tipIcons.length>2 && (tipIcons = [...new Set(tipIcons)])

      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png" });
      let base64 = arrayBufferToBase64(qr_png);
      let qcSrc = base64;
      cloneObj = { ...cloneObj, orderText, qcSrc, tipIcons };
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
