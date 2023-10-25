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
          <img
              class="qr-code"
              :class="{ hasRemark: hasRemark }"
              :src="qrCode"
          />
          <div
              class="qr-code-num"
              :class="{ hasRemark: hasRemark, }"
              :style="HOSPITAL_ID == 'liaocheng' ? 'width: 110px' : HOSPITAL_ID == 'hengli' ? 'line-height: 13px;' : ''"
          >
            {{ qrCodeNum }}
          </div>
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div
                flex="cross:center"
                class="input-item"
                style="height: 51px"
                v-if="HOSPITAL_ID == 'hj'"
            >
              <!-- <span class="label">患者姓名:</span> -->
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                  type="text"
                  nowidth
                  style="font-size: 42px;padding-left: 0px;font-weight: 900;"
                  flex-box="1"
                  class="bottom-line"
                  :value="query.name"
              />
              <input
                  type="text"
                  nowidth
                  style="font-size: 30px;padding-left: 0px;width:31%;height: 100%;box-sizing: border-box;"
                  class="bottom-line"
                  :value="query.sex + ' ' + query.age"
              />
            </div>
            <div
                flex="cross:center"
                class="input-item"
                style="height: 43px"
                v-else
            >
              <!-- <span class="label">患者姓名:</span> -->
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                  type="text"
                  nowidth
                  style="font-size: 32px;padding-left: 5px;"
                  flex-box="1"
                  class="bottom-line"
                  :value="query.name + ' ' + query.sex + ' ' + query.age"
              />
            </div>
            <div flex="cross:center" class="input-item">
              <!-- <span class="label">住院号:</span> -->
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                  type="text"
                  :style="{
                  width: '75px',
                  'font-size': query.bedLabel.length > 3 ? '24px' : '30px',
                  'padding-left': '5px',
                  'line-height': ' 34px'
                }"
                  class="bottom-line"
                  :value="query.bedLabel + '床'"
              />
              <input
                  type="text"
                  flex-box="1"
                  style="width: 0px;font-size: 30px; padding-left: 2px;"
                  nowidth
                  class="bottom-line"
                  :value="moment(query.admissionDate).format('YYYY-MM-DD')"
              />
            </div>
            <!-- <div flex="cross:center" class="input-item">
              <span class="label">饮食:</span>
              <div nowidth class="check-con" flex-box="1" flex="main:justify cross:center">
                <label>
                  <input
                    type="checkbox"
                    value="普食"
                    checked
                    class="checkBox"
                    v-model="formData.diet"
                  >普食
                </label>
                <label>
                  <input type="checkbox" value="半流" class="checkBox" v-model="formData.diet">半流
                </label>
                <label>
                  <input type="checkbox" value="流质" class="checkBox" v-model="formData.diet">流质
                </label>
                <label>
                  <input type="checkbox" value="糖尿病" class="checkBox" v-model="formData.diet">糖尿病
                </label>
              </div>
            </div>-->
            <div flex="cross:center" class="input-item">
              <span class="label">饮食:</span>
              <div
                  nowidth
                  class="check-con"
                  flex-box="1"
                  flex="main:justify cross:center"
              >
                <input
                    type="text"
                    nowidth
                    flex-box="1"
                    class="bottom-line"
                    style="font-size: 26px"
                    v-model="formData.diet"
                    @focus="
                    onFocusToAutoComplete($event, {
                      autoComplete: ysList,
                      obj: formData,
                      key: 'diet'
                    })
                  "
                    @blur="onBlurToAutoComplete"
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">病情等级:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                    class="dj-box printCare"
                    @click="selectRegistCare('重')"
                    :class="{ active: formData.registCare.includes('重') }"
                    :src="
                    formData.registCare.includes('重')
                      ? require('./images/重选.png')
                      : require('./images/重.png')
                  "
                />
                <img
                    class="dj-box  printCare"
                    @click="selectRegistCare('危')"
                    :class="{ active: formData.registCare.includes('危') }"
                    :src="
                    formData.registCare.includes('危')
                      ? require('./images/危选.png')
                      : require('./images/危.png')
                  "
                />
                <img
                    class="dj-box printCare"
                    @click="selectRegistCare('普')"
                    :class="{ active: formData.registCare.includes('普') }"
                    :src="
                    formData.registCare.includes('普')
                      ? require('./images/普选.png')
                      : require('./images/普.png')
                  "
                />
                <span class="illnessLevel"
                      style="background-color: #c824b3;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('重')">
                  {{ formData.registCare.includes('重') ? '病重' : '' }}
                </span>
                <span class="illnessLevel"
                      style="background-color: #e41616;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('危')">
                  {{ formData.registCare.includes('危') ? '病危' : '' }}
                </span>
                <span class="illnessLevel"
                      style="background-color: #6394e6;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('普')">
                  {{ formData.registCare.includes('普') ? '普通' : '' }}
                </span>
              </div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">护理级别:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                    class="dj-box printCare"
                    @click="selectRegistCare('特')"
                    :class="{ active: formData.registCare.includes('特') }"
                    :src="
                    formData.registCare.includes('特')
                      ? require('./images/特级厚街选.png')
                      : require('./images/特.png')
                  "
                />
                <img
                    class="dj-box printCare"
                    @click="selectRegistCare('一')"
                    :class="{ active: formData.registCare.includes('一') }"
                    :src="
                    formData.registCare.includes('一')
                      ? require('./images/一级护理厚街选.png')
                      : require('./images/一.png')
                  "
                />
                <img
                    class="dj-box printCare"
                    @click="selectRegistCare('二')"
                    :class="{ active: formData.registCare.includes('二') }"
                    :src="
                    formData.registCare.includes('二')
                      ? require('./images/二级护理选厚街选.png')
                      : require('./images/二.png')
                  "
                />
                <img
                    class="dj-box printCare"
                    @click="selectRegistCare('三')"
                    :class="{ active: formData.registCare.includes('三') }"
                    :src="
                    formData.registCare.includes('三')
                      ? require('./images/三级护理厚街选.png')
                      : require('./images/三.png')
                  "
                />
                <span class="nurseLevel"
                      style="background-color: #FF0000;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('特')">
                  {{ formData.registCare.includes('特') ? '特级护理' : '' }}
                </span>
                <span class="nurseLevel"
                      style="background-color: #F988F5;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('一')">
                  {{ formData.registCare.includes('一') ? '一级护理' : '' }}
                </span>
                <span class="nurseLevel"
                      style="background-color: #87CEEB;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('二')">
                  {{ formData.registCare.includes('二') ? '二级护理' : '' }}
                </span>
                <span class="nurseLevel"
                      style="background-color: #008000;display:none;margin-right:10px;padding-top:3px;padding-bottom:3px"
                      v-if="formData.registCare.includes('三')">
                  {{ formData.registCare.includes('三') ? '三级护理' : '' }}
                </span>
              </div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">主管医生:</span>
              <!-- <el-autocomplete v-model="formData.mainDoctors"
                               :fetch-suggestions="querySearchAsyncDoc"
                               class="auto-input"
                               flex-box="1"
                               disabled
              ></el-autocomplete>-->
              <input
                  type="text"
                  nowidth
                  style="font-size: 26px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="formData.mainDoctors"
              />
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">责任护士:</span>
              <!-- <el-autocomplete v-model="formData.dutyNurses"
                               :fetch-suggestions="querySearchAsyncNur"
                               class="auto-input"
                               flex-box="1"
                               disabled
              ></el-autocomplete>-->
              <input
                  type="text"
                  nowidth
                  flex-box="1"
                  class="bottom-line"
                  style="font-size: 26px"
                  v-model="formData.dutyNurses"
              />
            </div>
            <div
                flex="cross:top"
                class="input-item"
                style="height: 58px;margin-top: 4px"
                v-if="formData.remarkPrint && HOSPITAL_ID === 'hengli'"
            >
              <div class="input-item-left">
                <span class="input-item-left-label">诊断:</span>
              </div>

              <textarea
                  type="text"
                  nowidth
                  flex-box="1"
                  class="bottom-line remark"
                  :value="formData.remark"
                  :maxlength="35"
              ></textarea>
            </div>
          </div>
          <div style="width: 131px" :class="{'tip--hj': HOSPITAL_ID === 'hj'}">
            <div class="tip">温馨提示</div>
            <div style="height: 2px"></div>
            <div :class="{aliCenter:HOSPITAL_ID == 'lyxrm'}">
              <div
                  class="tip-item-con"
                  flex="cross:center main:justify;justify-content"
                  v-for="(item,index) in tipList"
                  :key="item.label"
                  :style="index==3?'margin-top:20px':''"
              >
                <img :src="item.img" alt style="flex:5"/>
                <span style="flex:9">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="button">
        <span
            style="position: absolute; left: 10px; padding-top: 4px"
            v-if="HOSPITAL_ID != 'hj'"
        >
          <span>显示诊断</span>
          <el-switch
              on-text="是"
              off-text="否"
              v-model="formData.remarkPrint"
          ></el-switch>
        </span>

        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post"
        >保存
        </el-button
        >
        <el-button class="modal-btn" type="info" @click="onPrint"
        >打印
        </el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal {
  >>> .sweet-content {
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
  width: 510px;
  height: 330px;
  padding: 5px 8px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  border: 1px solid #000;
  // height: 370px;

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

    width: 75px;
  }

  .input-item-left-label {
    margin-right: 2px;
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

.aliCenter {
  display: flex;
  flex-direction: column;
  height: 299px;

  .tip-item-con {
    margin-bottom: 0;

    &:first-of-type {
      margin: 35px 0 105px;
    }
  }
}

.tip-item-con {
  border: 1px solid #000;
  border-radius: 8px;
  width: 100%;
  height: 51px;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 17px;

  img {
    width: 46px;
  }
}

/* 右侧样式 */
/* 没有隔离的样式 */
.tip-allergy {
  border: 1px solid #000;
  border-radius: 8px;
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 12px;
  max-height: 102px

  img {
    width 46px
  }

  span {
    width 68px
    display: -webkit-box;
    text-align left
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}

/* 有隔离的样式 */
.hasGLtip-allergy {
  max-height: 66px

  span {
    -webkit-line-clamp: 3;
  }
}

.tip-quarantine {
  position absolute
  right: 10px;
  bottom: 10px;
}

label {
  cursor: pointer;
}

.auto-input {
  width: 0;

  >>> input {
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

/* 左侧样式 */
.illnessLevel {
  color white
}

.tip--hj {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  z-index: 3;
}
</style>

<script>
import {getEntity, saveBed} from "./api/index.js";
import print from "./tool/print";
import moment from "moment";
import {textOver} from "@/utils/text-over";
import {multiDictInfo} from "@/api/common";

var qr = require("qr-image");

export default {
  data() {
    return {
      moment,
      qrCode: "" /** 二维码 */,
      qrCodeNum: "" /** 二维码 */,
      // tipList: [
      //   {
      //     label: "小心烫伤",
      //     img: require("./images/Group 7.png")
      //   },
      //   // {
      //   //   label: "防止压疮",
      //   //   img: require("./images/Group 9.png")
      //   // },
      //   {
      //     label: "防止偷盗",
      //     img: require("./images/Group 10.png")
      //   },
      //   {
      //     label: "防止跌倒坠床",
      //     img: require("./images/Group 6.png")
      //   },
      //   // {
      //   //   label: "测试用的字测试用的字测试用的字测试用的字测试用的字",
      //   //   img: require("./images/allergy.png")
      //   // },
      //   // {
      //   //   label: "呼吸道隔离",
      //   //   img: require("./images/quarantine.png")
      //   // },
      // ],
      modalLoading: false,
      formData: {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: true,
      },
      ysList: []
    };
  },
  computed: {
    query() {
      return this.$route.query;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    },
    tipList(){
      if(!this.formData.drugGms){
        return [
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png")
        },
        {
          label: "防止偷盗",
          img: require("./images/Group 10.png")
        },
        {
          label: "防止跌倒坠床",
          img: require("./images/Group 6.png")
        },
        {
          label: this.formData.drugGms,
          img: require("./images/drugGms.png")
        }
        ]
      }else{
       return [
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png")
        },
        {
          label: "防止偷盗",
          img: require("./images/Group 10.png")
        },
        {
          label: "防止跌倒坠床",
          img: require("./images/Group 6.png")
        }
        ]
      }
      
    }
  },
  methods: {
    init() {
      this.formData = {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        drugGms: '',//过敏史
        glFlag: ''//隔离
      };
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
          remarkPrint: resData.remarkPrint,
          drugGms: resData.drugGms,
          glFlag: resData.glFlag
        };
        /* 这里操作右侧图标 */
        this.modalLoading = false;
        if (
            ['lyxrm'].includes(this.HOSPITAL_ID) &&
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
      // const printCare = document.querySelectorAll(".printCare")
      // console.log(printCare)
      if (
          (['lyxrm'].includes(this.HOSPITAL_ID) &&
              JSON.parse(localStorage.user) &&
              JSON.parse(localStorage.user).post == "护长") ||
          !['lyxrm'].includes(this.HOSPITAL_ID)
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
        case "foshanrenyi":
          qr_png_value = '1001|' + this.query.patientId;
          break;
        case "nanfangzhongxiyi":
          qr_png_value = this.query.patientId + '|' + this.query.visitId;
          break;
        case "lyxrm":
          qr_png_value = 'P' + this.query.patientId;
          break;
        default:
          qr_png_value = this.query.patientId;
          break;
      }
      var qr_png = qr.imageSync(qr_png_value, {type: "png"});

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
      // this.formData.registCare.includes('特')
      const printCare = document.querySelectorAll(".printCare")
      let illnessLevel = document.querySelectorAll(".illnessLevel")
      let nurseLevel = document.querySelectorAll(".nurseLevel")
      let arr = []
      for (let i = 0; i < printCare.length; i++) {
        arr = printCare[i].className.split(" ")
        printCare[i].style.display = "none"
      }
      // 病情等级显示
      for (let i = 0; i < illnessLevel.length; i++) {
        illnessLevel[i].style.display = "flex"
        illnessLevel[i].style.color = "#fff"
        console.log(illnessLevel[i])
      }
      // 护理级别显示
      for (let i = 0; i < nurseLevel.length; i++) {
        nurseLevel[i].style.display = "flex"
      }
      this.$nextTick(() => {
        this.post();
        print(this.$refs.printCon);
        for (let i = 0; i < printCare.length; i++) {
          printCare[i].style.display = "block"
        }
        // 病情等级隐藏
        for (let i = 0; i < illnessLevel.length; i++) {
          illnessLevel[i].style.display = "none"
        }
        // 护理级别隐藏
        for (let i = 0; i < nurseLevel.length; i++) {
          nurseLevel[i].style.display = "none"
        }
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
        let {top, left} = ele.getBoundingClientRect();
        return {
          left: left,
          top: top
        };
      }

      let {autoComplete, obj, key} = bind;
      let xy = offset(e.target);

      console.log(xy, autoComplete, obj, key, "autoComplete, obj, key");

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`
          },
          data: autoComplete,
          callback: function (data) {
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
  mounted() {
  },
  components: {}
};
</script>
