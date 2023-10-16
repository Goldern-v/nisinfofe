<template>
  <div>
    <template v-if="['whhk'].includes(HOSPITAL_ID)">
       <div
         class="bed-card-warpper wrist-strap-print"
         ref="printCon3"
         v-show="isPrint"
         v-for="item in printData"
         :key="item.patientId"
       >
      <div class="bed-card-vert-con">
        <div>
          <div class="top">
            <span>科室：{{ item.wardName }}</span>
          </div>
          <div>
            <div>
              <span>姓名：{{ item.name }}</span>
              <span>性别：{{ item.sex }}</span>
              <span>年龄：{{ item.age }}</span>
       
            </div>
            <div>
              <span>床位：{{ item.bedLabel }}</span>
              <span>住院号：{{ item.patientId }}</span>
            </div>
           <div>
              <span>科室联系电话</span>
               <span style="width:100px">{{item.phone}}</span>
                <span>小心跌倒</span>
            </div>
          </div>
        </div>
        <img
          style="right: 40px;"
          class="qr-code"
          :class="{ hasRemark: hasRemark }"
          :src="item.qrCode"
        />
      </div>
    </div>
    </template>
    <template v-else>
      <div
      class="bed-card-warpper wrist-strap-print"
      ref="printCon3"
      v-show="isPrint"
      v-for="item in printData"
      :key="item.patientId"
    >
      <div class="bed-card-vert-con">
        <div>
          <div class="top">
            <span>科室：{{ item.wardName }}</span>
            <span
              :style="{
                margin: '4px'}"
              >床位：{{ item.bedLabel }}</span
            >
          </div>
          <div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.sex }}</span>
              <span>{{ item.age }}</span>
              <span>住院号：{{ item.patientId }}</span>
            </div>
            <div>
              <span>入院日期：{{ item.admissionDate | ymdhm }}</span>
            </div>

            <div
              class="allergy"
            >
              <p
                :class="[allergy1 || drugGms || allergy2 ? 'gm' : '']"
              >
                过敏信息：
                <span v-if="allergy1">{{ allergy1 }};</span>
                <span v-if="drugGms">{{ drugGms }};</span>
                <span v-if="allergy2">{{ allergy2 }}</span>
                <span v-if="!(allergy1 || drugGms || allergy2)">无</span>
              </p>
            </div>
          </div>
        </div>
        <img
          style="right: 50px;"
          class="qr-code"
          :class="{ hasRemark: hasRemark }"
          :src="item.qrCode"
        />
      </div>
    </div>
    </template>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.bed-card-warpper {
  background: #fff;
  display: inline-block;
  font-size: 16px;
  .bed-card-con {
    width: 9cm;
    height: 5.7cm;
  }

  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}
.wrist-strap-print {
  .bed-card-vert-con {
    margin: 20px;
    width: 119px;
    height: 498px;
    padding: 35px 8px 5px !important;
    box-sizing: border-box;
    position: relative;
    border: 3px solid #000;
    text-align: left;
    width: 500px;
    height: auto;
    padding: 5px 0 0 0 !important;
    border: none;

    .top {
      span {
        margin-left: 10px;

        &:first-of-type {
          margin-left: 10px;
        }
      }
    }

    >>>.allergy {
      width: 80%;

      &.whhkAllergy {
        width: 100%;
        display: flex;
        align-items: center;

        >p {
          display: flex;
          align-items: center;
        }

        >.input-item {
          height: 25px;
          font-size: 20px;
          margin-left: 10px;

          >span {
            font-size: 16px;
          }

          >input {
            font-size: 16px;
            width: 100px;
          }
        }
      }

      p {
        height: 25px;
        overflow: hidden;
        margin-left: 10px;
        font-size: 20px;
      }

      span {
        margin-left: 0px;
        font-size: 20px;
      }

      p.gm {
        span {
          color: red;
        }
      }
    }

    span {
      font-size: 20px;
      line-height: 24px;
      margin-left: 10px;
    }

    .qr-code {
      position: absolute;
      right: 25px;
      top: 50%;
      margin-top: -56px;
      height: 112px;
      width: 112px;

      &.hasRemark {
        width: 96px;
        height: 96px;
      }
    }

    svg {
      height: 60px !important;
      margin-left: 15px;
    }
  }

  &.children-wrist {
    width: 10cm;
    height: 3.3cm;
    box-sizing: border-box;

    .bed-card-vert-con {
      transform-origin: 0 0;
      transform: scale(0.82) translateX(-6px) translateY(-9px);
      width: 121%;
    }
    span {
      font-size: 21px;
    }

    .qr-code {
      position: absolute;
      right: 42px !important;
      top: 50% !important;
      margin-top: -56px;
      height: 112px;
      width: 112px;
      &.abs-img {
        top: 42% !important;
      }
    }
    .abs-text {
      position: absolute;
      right: 42px;
      top: 82%;
      display: block
      width: 112px;
      text-align: center
    }
  }
}

[nowidth] {
  width: 0;
}

.bottom-line {
  border: 0;
  border-bottom: 1px solid #000;
  text-align: left;
  padding-left: 5px;
  outline: none;
  font-size: 28px;
}




.input-item {
  height: 40px;
  font-size: 22px;
  font-weight: bold;
  position: relative;
  z-index: 2;

  .input-item-left {
    display: inline-block;

    width 75px {
      .input-item-left-label {
        margin-right: 2px;
      }
    }
  }
}

input[type='checkbox'] {
  -webkit-appearance: none;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  border: 1px solid #777;
  border-radius: 2px;
  outline: none;
  margin-right: 1px;
  margin-top: 0;
}

input[type='checkbox']:checked {
  position: relative;
}

input[type='checkbox']:checked:before {
  content: '';
  width: 9px;
  transform: rotate(45deg);
  position: absolute;
  top: 11px;
  left: 1px;
  border-top: 3px solid #000;
}

input[type='checkbox']:checked:after {
  content: '';
  width: 14px;
  transform: rotate(-50deg) translateY(-50%) translateX(50%);
  position: absolute;
  border-top: 3px solid #000;
  top: 14px;
  left: 2px;
}

.tip {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #000;
  height: 42px;
  line-height: 42px;
  margin-bottom: 15px;
}

.label {
  margin-right: 2px;
  line-height: 32px;
  white-space: nowrap;
}

.tip-item-con {
  border: 1px solid #000;
  border-radius: 8px;
  width: 100%;
  height: 51px;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  margin-bottom: 20px;
  font-size: 17px;

  img {
    width: 46px;
  }
}

label {
  cursor: pointer;
}

.auto-input {
  width: 0;

  >>>input {
    @extend .bottom-line;
    height: 21px;
    color: #000;
    border-radius: 0;
  }
}

.check-con {
  label {
    font-size: 17px;
  }
}

</style>

<script>
import printing from "printing";
var qr = require("qr-image");
import moment from "moment";
export default {
  props:{
    printData: {
      type: Array,
      default: () => {
        [];
      },
    },
    category: {
      type: String,
    },
  },
  data() {
    return {
      moment,
      qrCode: "" /** 二维码 */,
      qrCodeNum: "" /** 二维码 */,
      modalLoading: false,
      formData: {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: true
      },
      mainDoctors: "",
      ysList: [],
      printMode: "h", //打印模式
      title: "编辑床头卡",
      allergy1: "",
      allergy2: "",
      drugGms: "",
      allergy_gdtj: "", //自定义过敏信息
      lianxiPhone_whhk: "",
      aField1: "",
      phone: "",
      isPrint:false,
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    }
  },
  methods: {
     getqrCode(item) {
      let qr_png_value = item.inpNo;
      var qr_png = qr.imageSync( item.patientId + "|" + item.visitId,
        {
          type: "png",
          margin: 4,
        }
      );
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
      return { qrCode: base64, qrCodeNum: qr_png_value };
    },
    onPrint() {
      this.isPrint = true;
      this.$nextTick(() => {
          let styleSheet =  `
              .bed-card-warpper {
                box-shadow: none !important;
                transform: rotate(90deg) translateY(-120%) translateX(25%);
                transform-origin: 0 0;
              }
              .bed-card-vert-con {
              }
              .is_input_print{
              font-size:20px !important;
              }
              .is_hide_textarea{
              display:none;
              }
              .print-page__ptext{
              display:block !important;
              border:none !important;
              padding:0 !important;
              height:auto !important;
              }
              @page {
                margin: 0;
              }`
          ;
          printing(this.$refs.printCon3, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: styleSheet
          });
        this.isPrint = false
      });
    },
  },
  watch: {
    printData: {
      handler(newValue) {
        newValue.map((item) => {
          const { qrCode, qrCodeNum } = this.getqrCode(item);
          item.qrCode = qrCode;
          item.qrCodeNum = qrCodeNum;
        });
      },
      immediate: true,
    },
  },
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    }
  },
  mounted() {},
  components: {}
};
</script>
