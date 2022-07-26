<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="600"
      title="编辑床头卡"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div class="bed-card-warpper" v-loading="modalLoading" ref="printCon">
        <div
          class="bed-card-con"
          flex
          :class="{ remarkCon: formData.remarkPrint }"
        >
          
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div flex="cross:center" class="qr-code-item" style="height:150px;">
              <p v-if="HOSPITAL_ID=='sdlj' && query.patientId.indexOf('$')>=0" style="line-height: 80px;" class="name">
                <span>{{nameYing}}</span><br>
                <span>{{nameAfter}}</span>
              </p>
              <p v-else class="name">{{query.name}}</p>
              <img
                class="qr-code"
                :class="{ hasRemark: hasRemark }"
                :src="qrCode"
              />
            </div>
            <div flex="cross:center" :class="{'input-item-nopadding':HOSPITAL_ID=='sdlj' && query.patientId.indexOf('$')>=0}" class="input-item input-item-row">
              <div>{{query.sex}}</div>
              <div v-if="HOSPITAL_ID!='sdlj'">{{query.age}}</div>
              <div v-else-if="HOSPITAL_ID=='sdlj' && query.age.indexOf('岁')>=0">{{query.age}}</div>
              <div>{{wardName}}</div>

            </div>
            <div v-if="HOSPITAL_ID=='sdlj' && query.patientId.indexOf('$')>=0" flex="cross:center" :class="{'input-item-nopadding':HOSPITAL_ID=='sdlj' && query.patientId.indexOf('$')>=0}" class="input-item">
              <div>身高:</div><div style="width: 120px;"></div>
              <div>体重:</div><div style="width: 120px;"></div>
            </div>
            <div flex="cross:center" class="input-item" style="width:auto;height:50px">
              <div style="display:flex">
                <span :class="{'label-nowidth':HOSPITAL_ID=='sdlj' && query.patientId.indexOf('$')>=0}" class="label">住院号:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 26px;width:200px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="query.patientId"
                />
              </div>
              <div class="bedNum">{{query.bedLabel + '床'}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">{{HOSPITAL_ID=='sdlj' && query.age.indexOf('岁')==-1?'出生时间:':'入院日期:'}}</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px"
                flex-box="1"
                class="bottom-line"
                :value="moment(query.admissionDate).format('YYYY-MM-DD HH:mm:ss')"
              />
            </div>
            <div v-if="HOSPITAL_ID!='sdlj'" flex="cross:center" class="input-item">
              <span class="label">主治医生:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px"
                flex-box="1"
                class="bottom-line"
                v-model="formData.mainDoctors"
              />
            </div>
          </div>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
          >保存</el-button
        >
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

  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}

.bed-card-con {
  margin: 20px;
  width: 511px;
  height: 335px;
  // padding: 5px 8px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  // border: 1px solid #000;
  height: 370px;

  .bed-card-con-top{
    height: 150px;
  }
  // &.remarkCon
  .name{
    line-height: 160px;
    white-space: nowrap;
    height: 160px;
    width: 360px;
    text-align: center;
    font-size: 88px;
    z-index: 10;
  }
  .qr-code {
    position: absolute;
    top: -25px;
    right: -25px;
    height: 200px;
    width: 200px;

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

.bedNum{
  position: absolute;
  top: 0;
  right: 10px;
  min-width: 100px;
  font-size: 50px;
  text-align: right;
  height: 50px;
  line-height: 50px;
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
.qr-code-item {
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

.input-item {
  height: 40px;
  width: 390px;
  padding-right: 12px;
  font-size: 30px;
  font-weight: bold;
  position: relative;
  margin-left: 10px;
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

.input-item-row {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  width: auto
  &.input-item-nopadding{
    padding:0;
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
  width: 130px;
  text-align: right;
  &.label-nowidth{
    width:auto;
  }
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
import {
  getEntity,
  saveOrUpdate,
  findByKeyword,
  findByKeywordNur,
  saveBed
} from "./api/index.js";
import print from "./tool/print";
var qr = require("qr-image");
import moment from "moment";
import { textOver } from "@/utils/text-over";
import { multiDictInfo } from "@/api/common";
export default {
  data() {
    return {
      moment,
      qrCode: "" /** 二维码 */,
      qrCodeNum: "" /** 二维码 */,
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
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: true,
        nameYing:"",
        nameAfter:""
      },
      ysList: []
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    wardName() {
      return this.$store.state.lesion.deptName;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    }
  },
  created(){
    console.log(this.$store.state);
  },
  methods: {
    init() {
      this.formData = {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: ""
      };
      console.log("this.query.",this.query)
      if(this.HOSPITAL_ID=="sdlj" && this.query.patientId.indexOf("$")>=0){
        const patientArr = this.query.name.split(")")
        this.nameYing = patientArr[0] + ")"
        this.nameAfter = patientArr[1]
      }
      getEntity(this.query.patientId, this.query.visitId).then(res => {
        let resData = res.data.data;
        let diagnosis = textOver(this.query.diagnosis, 52);
        this.formData = {
          diet: resData.diet || "",
          registCare: resData.registCare
            ? (resData.registCare || "").split(",")
            : this.getRegistCare(),
          mainDoctors: resData.mainDoctors || "",
          dutyNurses: resData.dutyNurses || "",
          remark: diagnosis,
          remarkPrint: resData.remarkPrint
        };
        this.modalLoading = false;
        if (
          this.HOSPITAL_ID == "liaocheng" &&
          JSON.parse(localStorage.user) &&
          JSON.parse(localStorage.user).post != "护长"
        ) {
          if (resData.isPrint == 1) {
            this.$message({
              type: "warning",
              message: "该患者已打印床头卡"
            });
            return;
          } else {
            this.isOpen();
          }
        }
      });
      multiDictInfo(["床头卡饮食"]).then(res => {
        this.ysList = res.data.data.床头卡饮食.map(item => item.name);
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
    open() {
      this.init();
      if (
        (this.HOSPITAL_ID == "liaocheng" &&
          JSON.parse(localStorage.user) &&
          JSON.parse(localStorage.user).post == "护长") ||
        this.HOSPITAL_ID != "liaocheng"
      ) {
        this.isOpen();
      }
    },
    isOpen() {
      this.$refs.modal.open();
      let qr_png_value = "";
      switch (this.HOSPITAL_ID) {
        case "liaocheng":
          qr_png_value = this.query.patientId + "|" + this.query.visitId;
          break;
        case "shannan":
          qr_png_value = this.query.inpNo;
          break;
        case "hengli":
          qr_png_value = this.query.expand1;
          break;
        case "sdlj":
          qr_png_value = "ZY" + this.query.patientId;
          break;
        default:
          qr_png_value = this.query.patientId;
          break;
      }
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
      this.qrCode = base64;
      this.qrCodeNum = qr_png_value;
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
      data.name = this.query.name;
      data.sex = this.query.sex;
      data.patientId = this.query.patientId;
      data.visitId = this.query.visitId;
      data.diet = this.formData.diet;
      data.registCare = this.formData.registCare.join(",");
      data.mainDoctors = this.formData.mainDoctors;
      data.dutyNurses = this.formData.dutyNurses;
      data.remarkPrint = this.formData.remarkPrint;
      data.remark = this.formData.remark.slice(0, 24);

      saveBed(data).then(res => {
        this.$message.success("保存成功");
        this.close();
      });
    },
    onPrint() {
      this.$nextTick(() => {
        this.post();
        print(this.$refs.printCon);
      });
    },
    querySearchAsyncDoc(queryString, cb) {
      // findByKeyword(queryString).then(res => {
      //   cb(res.data.data.map(item => {
      //     return {value: item}
      //   }));
      // })
      cb([]);
    },
    // handleSelectDoc(item) {
    //     console.log(item);
    //     return {
    //       value: item + 123
    //     }
    // },
    querySearchAsyncNur(queryString, cb) {
      // findByKeywordNur(queryString).then(res => {
      //   cb(res.data.data.map(item => {
      //     return {value: item}
      //   }));
      // })
      cb([]);
    },

    onFocusToAutoComplete(e, bind) {
      function offset(ele) {
        let { top, left } = ele.getBoundingClientRect();
        return {
          left: left,
          top: top
        };
      }
      let { autoComplete, obj, key } = bind;
      let xy = offset(e.target);

      console.log(xy, autoComplete, obj, key, "autoComplete, obj, key");

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`
          },
          data: autoComplete,
          callback: function(data) {
            console.log(data, "data");
            if (data) {
              if (obj[key]) {
                obj[key] += "," + data;
              } else {
                obj[key] += data;
              }
            }
          },
          id: `bedModal`
        });
      });
    },
    onBlurToAutoComplete(e, bind) {
      setTimeout(() => {
        window.closeAutoComplete(`bedModal`);
      }, 400);
    }
  },
  mounted() {},
  components: {}
};
</script>
