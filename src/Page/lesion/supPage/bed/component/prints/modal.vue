<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="600"
      :title="title"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div
        class="bed-card-warpper wrist-strap-print"
        ref="printCon3"
        v-show="printMode == 'allPrint'"
        v-for="(item,index) in list" :key="item.patientId"
      >
        <div class="bed-card-vert-con">
          <div class="top" style="position: relative;height:30px">
            <span style="position: absolute;">科室：{{ item.deptName }}</span>
            <span style="position: absolute;left: 270px;">床号：{{ item.bedLabel }}</span>
          </div>
          <div style="position: relative;height:30px">
            <span style="position: absolute;">姓名：{{ item.name }}</span>
            <span style="position: absolute;left: 160px;">性别：{{ item.sex }}</span>
            <span style="position: absolute;left: 270px;">年龄：{{ item.age }}</span>
          </div>
          <div>
              <span>住院号：{{ item.patientId }}</span>
              <span v-show="item.age.includes('天')||item.age.includes('月')||Number(item.age.split('岁')[0])<18">入院日期：{{ item.admissionDate | ymdhm }}</span>
        </div>
        <img
            class="qr-code"
            :src="qrCode[index]"
          />
        </div>
      </div>
      <div slot="button">
        <span
          style="position: absolute; left: 10px; padding-top: 4px"
        >
        </span>
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="info" @click="onPrint"
          >打印</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal {
  >>>.sweet-content {
    background: #dfdfdf;
    padding-bottom: 20px;
    text-align: center;
  }
}

.bed-card-warpper {
  background: #fff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  display: inline-block;
  font-size: 16px;
  margin-bottom 20px

  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}

.bed-card-vertical {
  // display: none;
  .bed-card-vert-con {
    margin: 5px;
    width: 96px;
    height: 360px;
    padding:5px 3px 0 3px !important;
    box-sizing: border-box;
    position: relative;
    border: 3px solid #000;
    text-align: left;
    span {
      font-size: 16px;
      line-height: 24px;
    }
    p {
      font-size: 20px;
      line-height: 28px;
      padding-bottom: 10px;
      &:last-of-type {
        padding-bottom: 5px;
      }
    }
    svg {
      width: 100%;
      // height: 70px !important;
    }
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
          // margin-left: 10px;
          // &:first-of-type {
          //   margin-left: 45px;
          // }
        }
     }

      >>>.allergy{
        width :80%;
        p{
          margin-left:45px;
        }
        span{
          margin-left:0px;
          font-size:15px !important;
        }
      }
     span {
        font-size: 20px;
        line-height: 24px;
        // margin-left: 45px;
        &.bhzd{
            display:inline-block;
            width:175px
            // /* 1. 文字显示不开，是否开启换行   nowrap：不换行*/
            // white-space: nowrap;
            // /* 2. 超出的隐藏 */
            // overflow: hidden;
            // /* 3. 文字溢出的时候，用省略号显示 */
            // text-overflow: ellipsis;
          }
     }
    .qr-code {
      position: absolute;
      right: 0;
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
}

.bed-card-con {
  margin: 20px;
  width: 511px;
  height: 335px;
  padding: 5px 8px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  border: 1px solid #000;
  height: 370px;

  // &.remarkCon
  .qr-code {
    position: absolute;
    top: -5px;
    left: -5px;
    height: 112px;
    width: 112px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }

  .qr-code-num {
    position: absolute;
    top: 92px;
    left: 0px;
    width: 96px;
    text-align: center;
    z-index: 2;
    font-size: 16px;

    &.hasRemark {
      top: 78px;
      left: 0px;
      width: 84px;
      font-size: 14px;
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

.remark {
  height: 60px;
  resize: none;
  overflow: hidden;
  border-bottom: 1px solid #000;
  margin-top: 1px;
  font-size: 22px;
  line-height: 30px;
  border: 0;
  padding: 0;
}

.input-item {
  height: 40px;
  padding-right: 12px;
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

.dj-box {
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-right: 12px;

  &.active {
    color: #fff;
    border: 0;
  }
}

.dj-box-1 {
  @extend .dj-box;

  &.active {
    background: #C824B3;
  }
}

.dj-box-2 {
  @extend .dj-box;

  &.active {
    background: #E41616;
  }
}

.dj-box-3 {
  @extend .dj-box;

  &.active {
    background: #FF703B;
  }
}

.dj-box-4 {
  @extend .dj-box;

  &.active {
    background: #6394E6;
  }
}

.dj-box-5 {
  @extend .dj-box;

  &.active {
    background: #46BC90;
  }
}

.tip {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  color: #000;
  // margin-top 15px
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
var JsBarcode = require("jsbarcode");
import moment from "moment";
export default {
  data() {
    return {
      moment,
      qrCode: [] /** 二维码 */,
      qrCodeNum: [] /** 二维码 */,
      modalLoading: false,
      ysList: [],
      printMode: "h", //打印模式
      title: "编辑床头卡",
      allergy1: "",
      allergy2: "",
      drugGms: "",
      list:[]
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    // hasRemark() {
    //   return this.formData.remarkPrint;
    // }
  },
  methods: {
    open(printMode = "h",list) {
      this.$refs.modal.open();
      this.printMode = printMode;
      this.list = list
      this.list.forEach(item=>{
        let qr_png_value = item.patientId + "|" + item.visitId;
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
        this.qrCode.push(base64) ;
        this.qrCodeNum.push(item.patientId);
        })
        this.title = "腕带打印";
    },
    close() {
      this.$refs.modal.close();
    },
    onPrint() {
      this.$nextTick(() => {
           printing(this.$refs.printCon3, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: `
          .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-120%) translateX(15%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
          }
          @page {
            margin: 0;
          }
          `
          });
      });
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
