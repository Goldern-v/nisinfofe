<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="600"
      :title="title"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div class="bed-card-warpper" v-loading="modalLoading" ref="printCon" v-if="printMode == 'h'">
        <div class="bed-card-con" flex>
          <img class="qr-code" :class="{hasRemark: hasRemark}" :src="qrCode">
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div flex="cross:center" class="input-item" style="height: 50px;width:60%;">
              <span class="label" style="color:red">姓 名:</span>
              <input
                type="text"
                nowidth
                style="font-size: 40px;padding-left: 5px;"
                flex-box="1"
                class="bottom-line"
                :value="query.name"
              >
            </div>
            <div flex="cross:center" class="input-item" style="width:50%;">
              <span class="label" style="color:red">住院号:</span>
              <input
                type="text"
                style="width: 67px;font-size: 28px; padding-left: 5px;"
                flex-box="1"
                class="bottom-line"
                v-model="query.inpNo"
              >
            </div>
            <div flex="cross:center" class="input-item" style="height: 50px;width:75%;">
              <span class="label" style="color:red">性 别:</span>
              <input
                type="text"
                style="width: 67px;font-size: 28px;padding-left: 5px;"
                flex-box="1"
                class="bottom-line"
                :value="query.sex"
              >
              <span style="color:red">&nbsp;年龄:</span>
              <input
                type="text"
                flex-box="1"
                style="width: 48px;font-size: 28px; padding-left: 2px;"
                nowidth
                class="bottom-line"
                v-model="query.age">
            </div>

            <div flex="cross:center" class="input-item">
              <span class="label">主管医生:</span>

              <input
                type="text"
                nowidth
                style="font-size: 28px"
                flex-box="1"
                class="bottom-line"
                v-model="formData.mainDoctors"
              >
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">责任护士:</span>

              <input
                type="text"
                nowidth
                flex-box="1"
                class="bottom-line"
                style="font-size: 28px"
                v-model="formData.dutyNurses"
              >
            </div>

          </div>

        </div>
      </div>
      <div
        class="bed-card-warpper wrist-strap-print"
        ref="printCon2"
        v-show="printMode == 'wrist'"
      >
        <div class="bed-card-vert-con">

          <div class="qr-code-img">
            <img class="qr-code" :src="qrCode">
            <p>{{ query.inpNo + '|' + query.visitId }}</p>
          </div>
          <div class="info">
            <p>{{ query.name }}</p>
            <p>{{ query.sex }} {{ query.age }}</p>
            <p>{{ query.inpNo }}</p>
          </div>
          <div class="barcode-img">
            <p>{{query.deptName + ' '+query.bedLabel}}</p>
            <svg id="barcode"></svg>
          </div>
      </div>
      </div>
      <div slot="button">
        <span style="position: absolute; left: 10px; padding-top: 4px" v-if="printMode == 'h'">
          <span>显示诊断</span>
          <el-switch on-text="是" off-text="否" v-model="formData.remarkPrint" disabled></el-switch>
        </span>
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post" v-if="printMode == 'h'">保存</el-button>
        <el-button class="modal-btn" type="info" @click="onPrint">打印</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal
  >>>.sweet-content
    background #dfdfdf
    padding-bottom 20px
    text-align center
.bed-card-warpper
  background #fff
  box-shadow 0px 5px 10px 0 rgba(0, 0, 0, 0.5)
  display inline-block
  font-size 16px
  >>> *
    font-family 'SimHei','Microsoft Yahei' !important
    font-weight bold
.bed-card-con
  margin 5px
  width 496px
  height 310px
  padding 3px 6px
  box-sizing border-box
  border-right 5px solid #fff
  position relative
  .qr-code
    position absolute
    bottom: 0px;
    right: 0px;
    height 137px
    width 137px
    z-index 3
[nowidth]
  width 0
.bottom-line
  border 0
  border-bottom 1px solid #000
  text-align left
  padding-left 5px
  outline none
  font-size 28px
.remark
  height 60px
  resize none;
  overflow hidden
  margin-top: 1px
  font-size 18px
  line-height 30px;
  border 0
  padding 0
.input-item
  height 40px
  padding-right 12px
  font-size 28px
  font-weight bold
  position relative
  z-index 2
.itemLong{
  min-height:90px;
  .remark{
    min-height :90px;
  }
}
  &:nth-of-type(4){
    .bottom-line {
      display: inline-block;
      padding: 2px 0;
      border: 0;
      outline: none;
    }
  }
  &:nth-of-type(5){
    .bottom-line {
      display: inline-block;
      padding: 2px 0;
      border: 0;
      outline: none;
    }
  }
input[type='checkbox']
  -webkit-appearance none
  vertical-align middle
  width 20px
  height 20px
  border 1px solid #777
  border-radius 2px
  outline none
  margin-right 1px
  margin-top 0
input[type='checkbox']:checked
  position relative
input[type='checkbox']:checked:before
  content ''
  width 9px
  transform rotate(45deg)
  position absolute
  top 11px
  left 1px
  border-top 3px solid #000
input[type='checkbox']:checked:after
  content ''
  width 14px
  transform rotate(-50deg) translateY(-50%) translateX(50%)
  position absolute
  border-top 3px solid #000
  top 14px
  left 2px
.dj-box
  width 28px
  height 28px
  cursor pointer
  &.active
    color #fff
    border 0
.dj-box-1
  @extend .dj-box
  &.active
    background #C824B3
.dj-box-2
  @extend .dj-box
  &.active
    background #E41616
.dj-box-3
  @extend .dj-box
  &.active
    background #FF703B
.dj-box-4
  @extend .dj-box
  &.active
    background #6394E6
.dj-box-5
  @extend .dj-box
  &.active
    background #46BC90
.tip
  font-size 30px
  font-weight bold
  text-align center
  color #000
  margin-top 20px
  height 42px;
  line-height 42px;
.label
  margin-right 2px
  line-height 32px
  white-space nowrap
.tip-item-con
  border 1px solid #000
  border-radius 8px
  width 100%
  height 51px
  padding 0 10px 0 5px
  box-sizing border-box
  margin-bottom 8px
  font-size 16px
  img
    width 46px
label
  cursor pointer
.auto-input
  width 0
  >>>input
    @extend .bottom-line
    height 21px
    color #000
    border-radius 0
.check-con
  label
    font-size 17px

.wrist-strap-print {
  .bed-card-vert-con {
    margin: 20px;
    width: 119px;
    height: 498px;
    box-sizing: border-box;
    position: relative;
    text-align: left;
    width: 500px;
    height: auto;
    padding-left: 50px;
    border: none;
    height: 70px;
    display: flex;
    >div {
      margin-right: 15px;
    }
    .barcode-img {
      width: 150px;
      p {
        font-size: 13px;
        line-height: 14px;
      }
    }
    .info {
      p {
        font-size: 16px;
        line-height: 14px;
        text-align: center;
        padding-top: 12px;
        &:first-of-type {
          padding-top: 0;
        }
      }
    }

    .qr-code {
      height: 60px;
      width: 60px;
      margin-top: -8px;
      vertical-align: top;
    }
    .qr-code-img {
      p {
        font-size: 16px;
        line-height: 14px;
      }
    }
    svg {
      width: 100%;
      height: 70px !important;
      margin-top: -5px;
    }
  }
}
</style>

<script>
import {
  getEntity,
  saveOrUpdate,
  saveBed,
  findByKeyword,
  findByKeywordNur
} from "./api/index.js";
import print from "./tool/print";
import printing from "printing";
import { textOver } from "@/utils/text-over";
var qr = require("qr-image");
var JsBarcode = require('jsbarcode')
export default {
  data() {
    return {
      qrCode: "" /** 二维码 */,
      tipList: [
        {
          label: "小心跌倒",
          img: require("./images/Group 6.png")
        },
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png")
        },
        {
          label: "防止压疮",
          img: require("./images/Group 9.png")
        },
        {
          label: "防止偷盗",
          img: require("./images/Group 10.png")
        }
      ],
      modalLoading: false,
      formData: {
        diet: [],
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: false
      },
      textareaLen:"",
      printMode: "h", //打印模式
      title: "编辑床头卡",
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    },
    nameAge() {
      return `${this.query.name}  ${this.query.sex}`;
    }
  },
  watch: {
    nameAge: {
      handler(ndata, odata) {
        if (nameAge.length) {
          let signIndex = nameAge.indexOf(" ");
          this.query.name = nameAge.substring(0, signIndex);
          this.query.sex = substring(signIndex + 2);
        }
      },
      // immediate: true,
      deep: true
    }
  },
  methods: {
    init() {
      this.formData = {
        diet: [],
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: false
      };
      // this.modalLoading = true
      getEntity(this.query.patientId, this.query.visitId).then(res => {
        let resData = res.data.data;
        let diagnosis = textOver(this.query.diagnosis, 130);
        this.textareaLen = this.query.diagnosis.length
        this.formData = {
          diet: (resData.diet || "").split(","),
          registCare: this.getRegistCare(),
          mainDoctors: resData.mainDoctors || "",
          dutyNurses: resData.dutyNurses || "",
          remark: diagnosis,
          remarkPrint: resData.remarkPrint || !!resData.remark || false
        };
        this.modalLoading = false;
      });
    },
    getRegistCare() {
      let data = [];
      if (this.query.nursingClass == "特级护理") {
        data.push("特");
      }
      if (this.query.nursingClass == "一级护理") {
        data.push("一");
      }
      if (this.query.nursingClass == "二级护理") {
        data.push("二");
      }
      if (this.query.nursingClass == "三级护理") {
        data.push("三");
      }
      if (this.query.patientCondition == "普通") {
        data.push("普");
      }
      if (this.query.patientCondition == "病危") {
        data.push("危");
      }
      if (this.query.patientCondition == "病重") {
        data.push("重");
      }
      return data;
    },
    open(printMode = "h") {
      this.init();
      this.$refs.modal.open();
      this.printMode = printMode;
      this.title = this.printMode == 'h' ?"编辑床头卡":"腕带打印";
      const qrText = `${this.query.inpNo}|${this.query.visitId}`
      var qr_png = qr.imageSync(qrText, { type: "png" });
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
      this.qrCode = base64;
      console.log("qr_png", base64,this.query);
      if(this.printMode == 'wrist'){
        JsBarcode("#barcode", this.query.patientId, {
          lineColor: "#000",
          width: 4,
          height: 70,
          fontSize: 40,
          displayValue:true,//是否在条形码下方显示文字
          text:this.query.wardName,//覆盖显示的文本
          fontOptions: "bold",
          textAlign: "left",
        });
      }
    },
    close() {
      this.$refs.modal.close();
    },
    selectRegistCare(item) {
      if (this.formData.registCare.includes(item)) {
        this.formData.registCare.remove(item);
      } else {
        this.formData.registCare.push(item);
      }
    },
    post() {
      let data = {};
      data.patientId = this.query.patientId;
      data.visitId = this.query.visitId;
      data.name = this.nameAge;
      data.age = this.query.age;
      data.diet = this.formData.diet.join(",");
      // data.registCare = this.formData.registCare.join(",");
      data.mainDoctors = this.formData.mainDoctors;
      data.dutyNurses = this.formData.dutyNurses;
      data.remarkPrint = this.formData.remarkPrint;
      saveBed(data).then(res => {
        this.$message.success("保存成功");
        this.close();
      });
    },
    onPrint() {
      this.post();
       if (this.printMode == "wrist") {
        printing(this.$refs.printCon2, {
          injectGlobalCss: true,
          scanStyles: false,
          css: `
          .bed-card-warpper {
            box-shadow: none !important;
          }
          .bed-card-vert-con {
            margin: 15px 15px 0 15px !important;
          }
          @page {
            margin: 0 0 0 120mm;
          }
          `,
        });
      }else {
        print(this.$refs.printCon);
      }
    },
  },
  components: {}
};
</script>
