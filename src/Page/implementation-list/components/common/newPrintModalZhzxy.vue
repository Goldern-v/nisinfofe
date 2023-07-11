<template>
  <div
    v-if="['70*80', '7*7', '7*5', '8*7'].includes(newModalSize) && HOSPITAL_ID != 'whhk'"
    class="new-print-modal new-print-modal--large"
    :class="{ size3: isSize3 }"
    :style="sizeStyle"
  >
    <div class="new-print-modal__title">
      <span>{{ currentBottle.printFlag ? "补" : "" }}</span>
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
        <div>{{ `住院号:${currentBottle.patientId || ""}` }}</div>
        <div>{{ `性别:${currentBottle.sex || ""}` }}</div>
      </div>
      <div class="flex" :style="'7*5' === newModalSize ? 'font-size: 12px' : ''">
        <div>{{ `科室:${currentBottle.deptName}` }}</div>
        <div>{{ `${'7*5' === newModalSize ? '' : '年龄:'}${currentBottle.age}` }}</div>
      </div>
    </div>

    <div class="new-print-modal__content">
      <div v-for="(item, index) in currentBottle.orderText" :key="index">
        {{ item }}
        <span>{{ currentBottle.dosageDosageUnits[index] }}</span>
      </div>
    </div>

    <div class="new-print-modal__tip">
      <div>医生说明:{{ freqDetail }}</div>
      <div class="warm-icon">
        <img v-for="v in currentBottle.tipIcons" :key="v" :src="warmUrl(v)" />
      </div>
    </div>

    <div class="new-print-modal__b">
      <div class="new-print-modal__b__l">
        <div style="width:100px;">
          <span> 途径:{{ currentBottle.administration }} </span>
          <span>执行时间:</span>
          <div>{{ currentBottle.executeDate.substr(0, 16) }}</div>
        </div>
        <div class="qc-box">
          <img :src="currentBottle.qcSrc || ''" />
        </div>
      </div>
        <span>
          频率:{{
            `${currentBottle.frequency}${
              currentBottle.groupNo ? `(${currentBottle.groupNo})` : ""
            }`
          }}
        </span>
    </div>
  </div>

<!-- 区别汉口医院 -->
  <div
    v-else-if="['8*7'].includes(newModalSize) && HOSPITAL_ID == 'whhk' "
    class="new-print-modal new-print-modal--large"
    :class="{ size3: isSize3 }"
    :style="sizeStyle"
  >
    <div class="new-print-modal__title">
      <span>{{ currentBottle.printFlag ? "补" : "" }}</span>
      <span class="center">{{ hospitalName }}</span>
      <span>{{ currentBottle.repeatIndicator | repeatIndicatorFilter }}</span>
    </div>
    <div class="new-print-modal__second_whhk">
      <div class="flex">
        <div>
          姓名:<span>{{ currentBottle.name }}</span>
        </div>
        <div >
              <img :src="currentBottle.qcSrc || ''" />
        </div>
          <div>{{ `性别:${currentBottle.sex || ""}` }}</div>
      </div>
      <div class="flex">
        <div style="margin-top: -5px;">床号:<span>{{ currentBottle.bedLabel }}</span></div>
        <div style="padding-left: 110px;">{{ `${'7*5' === newModalSize ? '' : '年龄:'}${currentBottle.age}` }}</div>
      </div>
      <div class="flex" >
        <div>{{ `住院号:${currentBottle.patientId || ""}` }}</div>
        <div>{{ `${currentBottle.deptName}` }}</div>
      </div>
    </div>

    <div class="new-print-modal__content_whhk">
      <div class="flex" >
        <div style="width: 66%; text-align: center;">药品名称</div>
        <div style="width: 10%;">规格</div>
        <div style="width: 10%;">数量</div>
        <div style="width: 10%;">剂量</div>
      </div>
      <div v-for="(item, index) in this.itemObj"
            :key="index" :class="'table-cell'"  style="line-height: 1.2;">
        <span style="width: 66%;white-space: pre-wrap;" :class="'table-cell-span'">{{ item.orderText }}</span>
        <span style="width: 10%;" :class="'table-cell-span1'">{{ item.expand2 }}</span>
        <span style="width: 10%; text-align: center;" >{{ item.expand3 }}</span>
        <span style="width: 10%;" :class="'table-cell-span3'">{{ currentBottle.dosageDosageUnits[index] }}</span>
      </div>
    </div>
    <div class="new-print-modal__tip">
      <div>医生说明:{{ freqDetail }}</div>
      <div class="warm-icon">
        <img v-for="v in currentBottle.tipIcons" :key="v" :src="warmUrl(v)" />
      </div>
    </div>

      <div class="new-print-modal__tip ">
        <div >
          <!-- <span> {{ frequency1 }} </span> -->
          <!-- 途径 -->
          <span style="font-weight: 900;">{{currentBottle.frequency2}}</span>
          <!-- 频次 -->
          <span style="font-weight: 900; padding-left: 10px;">{{currentBottle.frequency1}}</span>
          <span style="padding-left: 10px;">{{ currentBottle.executeDate.substr(0, 16) }}</span>
        </div>
      </div>

    <div class="new-print-modal__tip_whhk">
      <span>配药人：</span>
      <span style="margin-left: 100px;">配药时间：</span>
    </div>
  </div>





  <div v-else class="new-print-modal new-modal-small" :style="sizeStyle">
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
</template>
// 临邑浏览器版本有部分为谷歌49，需要考虑兼容
<style lang="scss" scoped>
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
    padding: 0 5px;
    box-sizing: border-box;
    &.size3 {
      transform: rotate(90deg) translate(-50%, -50%);
      top: 50%;
      left: 50%;
      position: absolute;
      transform-origin: top left;
      line-height: 14px;
      font-size: 13px;
      .new-print-modal__title {
        min-height: 14px;
        span {
          font-size: 13px;
          line-height: 14px;
        }
      }
      .new-print-modal__second {
        height: 56px;
        .flex {
          height: 15px;
          &:first-child {
            height: 26px;
          }
        }
      }
      // 区别汉口
      .new-print-modal__second_whhk {
        height: 56px;
        .flex {
          height: 15px;
          &:first-child {
            height: 26px;
          }
        }
      }
      .new-print-modal__content div {
        line-height: 14px;
      }
      .new-print-modal__tip {
        min-height: 14px;
      }
      .warm-icon {
        img {
          width: 14px;
          height: 14px;
        }
      }
      .new-print-modal__b__l {
        span {
          font-size: 12px;
          // font-weight: 600;
        }
      }
      .qc-box {
        width: 49px;
      }
    }
  }
  .new-print-modal__title {
    display: flex;
    justify-content: space-between;
    min-height: 20px;
    width: 100%;
    font-size: 18px;
    margin: 2px 0 2px;
    flex-shrink: 0;
  }

  .new-print-modal__second {
    height: 63px;
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
      > div > span {
        font-size: 24px;
        line-height: 24px;
        display: inline-block;
        font-weight: 900;
        white-space: nowrap;
      }
      &:first-child {
        height: 26px;
      }
    }
    div {
      flex: 62%;
      text-indent: 3px;
    }

    > div:nth-child(2) > span {
      font-size: 22px;
      font-weight: 900;
    }
  }

  // 区别汉口
  .new-print-modal__second_whhk{
        height: 63px;
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
      > div > span {
        font-size: 24px;
        line-height: 24px;
        display: inline-block;
        font-weight: 900;
        white-space: nowrap;
      }
      &:first-child {
        height: 26px;
      }
      img {
      width: 40%;
      height: auto;
      object-fit: cover;
      padding-left: 10px;
    }
    }
    div {
      flex: 62%;
      text-indent: 3px;
    }

    > div:nth-child(2) > span {
      font-size: 22px;
      font-weight: 900;
    }
  }
  .qc-box {
    width: 50px;
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
      display: flex;
      justify-content: space-between;
      line-height: 18px;
      text-align: left;
    }
    span {
      white-space: nowrap;
    }
  }
  //汉口
    .new-print-modal__content_whhk {
    flex: 1;
    div {
      display: flex;
      justify-content: space-between;
      line-height: 12px;
      text-align: left;
    }
    span {
      white-space: nowrap;
    }
  }
  .new-print-modal__tip {
    display: flex;
    justify-content: space-between;
    min-height: 18px;
    overflow: hidden;
    @extend .bb;
  }
  //汉口
  .new-print-modal__tip_whhk {
    display: flex;
    // justify-content: space-between;
    min-height: 18px;
    overflow: hidden;

  }
  .warm-icon {
    img {
      width: 18px;
      height: 18px;
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
    justify-content: space-around;
    flex: 1;
    span {
      width: 100%;
    }
    span:nth-child(1),
    span:nth-child(2),
    span:nth-child(4),
    span:nth-child(5) {
      width: 50%;
    }
    span:nth-child(n + 4) {
      display: flex;
      &::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid #000;
      }
    }
  }

  &.new-modal-small {
    height: 100%;
    box-sizing: border-box;
    font-weight: 500;
    div,
    p,
    span {
      font-size: 18px;
      line-height: 22px;
    }
  }
  .new-modal-small-top {
    border: 1px solid #000;
    height: 80px;
    box-sizing: border-box;
    .new-modal-small-top__left {
      display: inline-block;
      width: calc(100% - 85px);
      overflow: hidden;
      .flex:first-child {
        line-height: 25px;
        height: 30px;
        > div > span {
          font-weight: 700;
          font-size: 24px;
          line-height: 30px;
          text-shadow: 1px 0px #000, -1px 0px #000, 0px 1px #000, 0px -1px #000;
          display: inline-block;
        }
      }
      .flex {
        display: flex;
        white-space: nowrap;
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
      width: 69px;
      padding: 2px 2px 0px 0px;
      img {
        width: 100%;
      }
    }
  }
  .new-modal-small-content {
    flex: 1;
    div {
      display: flex;
      justify-content: space-between;
      padding: 0px 2px;
      text-align: left;
      border: 1px solid #000;
      border-top: none;
    }
  }
}
</style>
<script>
import { cloneDeep } from "lodash";
import moment from "moment";
var qr = require("qr-image");

const arrayBufferToBase64 = (buffer) => {
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
    newModalSize: { type: String, default: "6*8" },
  },
  data() {
    return {
      isZhzxy: this.HOSPITAL_ID === "zhzxy",
    };
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
    },
  },
  watch: {},
  computed: {
    currentBottle() {
      let cloneObj = cloneDeep(this.itemObj[0]);
      let orderText = [];
      let frequency2 = '';//途径-汉口
      let frequency1 = '';//频次-汉口
      // 提示图标
      let tipIcons = [];
      let dosageDosageUnits = [];
      this.itemObj.map((item) => {
        orderText.push(item.orderText);
        const val = ["2", "4"].find((v) => v == item.printFlag);
        if (val) {
          tipIcons.push(val);
        }
        let content = `${item.dosage || ""}${item.dosageUnits || ""}`;
        dosageDosageUnits.push(content);
        // 频次
        frequency1 = this.itemObj[0].frequency.split(" ")[0]
        // 途径
        frequency2 = this.itemObj[0].frequency.split(" ")[1]
      });
      tipIcons.length > 2 && (tipIcons = [...new Set(tipIcons)]);

      let qr_png_value = this.itemObj[0].barCode;
      var qr_png = qr.imageSync(qr_png_value, { type: "png", margin: 0 });
      let base64 = arrayBufferToBase64(qr_png);
      let qcSrc = base64;
      cloneObj = { ...cloneObj, orderText, qcSrc, tipIcons, dosageDosageUnits,frequency2,frequency1 };
      return cloneObj;
    },
    hospitalName() {
      return this.HOSPITAL_NAME;
    },
    // 医生说明
    freqDetail() {
      return (
        this.itemObj && this.itemObj.map((item) => item.freqDetail).join("\n")
      );
    },
    // 宽高样式
    sizeStyle() {
      switch (this.newModalSize) {
        case "2*5":
          return { width: "100mm", height: "39mm" };
        case "7*5":
          return { width: "50mm", height: "69mm" };
        case '8*7':
          return { width: '8.1cm', height: '7cm'}
        default:
          // case '7*7':
          return { width: "70mm", height: "69mm" };
      }
    },
    isSize3() {
      return this.newModalSize === "7*5";
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
