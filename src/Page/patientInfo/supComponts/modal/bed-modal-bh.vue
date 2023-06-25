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
        class="bed-card-warpper"
        v-loading="modalLoading"
        ref="printCon"
        v-if="printMode == 'h'"
      >
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
          <div class="qr-code-num" :class="{ hasRemark: hasRemark }">
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
                style="width: 75px;font-size: 30px; padding-left: 5px;"
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
                  class="dj-box"
                  @click="selectRegistCare('重')"
                  :class="{ active: formData.registCare.includes('重') }"
                  :src="
                    formData.registCare.includes('重')
                      ? require('./images/重选.png')
                      : require('./images/重.png')
                  "
                />
                <img
                  class="dj-box"
                  @click="selectRegistCare('危')"
                  :class="{ active: formData.registCare.includes('危') }"
                  :src="
                    formData.registCare.includes('危')
                      ? require('./images/危选.png')
                      : require('./images/危.png')
                  "
                />
                <img
                  class="dj-box"
                  @click="selectRegistCare('普')"
                  :class="{ active: formData.registCare.includes('普') }"
                  :src="
                    formData.registCare.includes('普')
                      ? require('./images/普选.png')
                      : require('./images/普.png')
                  "
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">护理级别:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                  class="dj-box"
                  @click="selectRegistCare('特')"
                  :class="{ active: formData.registCare.includes('特') }"
                  :src="
                    formData.registCare.includes('特')
                      ? require('./images/特选.png')
                      : require('./images/特.png')
                  "
                />
                <img
                  class="dj-box"
                  @click="selectRegistCare('一')"
                  :class="{ active: formData.registCare.includes('一') }"
                  :src="
                    formData.registCare.includes('一')
                      ? require('./images/一选.png')
                      : require('./images/一.png')
                  "
                />
                <img
                  class="dj-box"
                  @click="selectRegistCare('二')"
                  :class="{ active: formData.registCare.includes('二') }"
                  :src="
                    formData.registCare.includes('二')
                      ? require('./images/二选.png')
                      : require('./images/二.png')
                  "
                />
                <img
                  class="dj-box"
                  @click="selectRegistCare('三')"
                  :class="{ active: formData.registCare.includes('三') }"
                  :src="
                    formData.registCare.includes('三')
                      ? require('./images/三选.png')
                      : require('./images/三.png')
                  "
                />
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
            <!-- <div
              flex="cross:top"
              class="input-item"
              style="height: 58px;margin-top: 4px"
              v-if="formData.remarkPrint"
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
            </div> -->
          </div>
          <div style="width: 131px">
            <div class="tip">温馨提示</div>
            <div style="height: 2px"></div>
            <div>
              <div
                class="tip-item-con"
                flex="cross:center main:justify"
                v-for="item in tipList"
                :key="item.label"
              >
                <img :src="item.img" alt />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bed-card-warpper bed-card-vertical"
        ref="printCon2"
        v-show="printMode == 'v'"
      >
        <div class="bed-card-vert-con newVert-con">
          <div
              flex="cross:center"
              class="input-item"
              style="height: 43px"
            >
              <span class="label">姓名:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 30px;"
                flex-box="3"
                disabled
                class="bottom-line"
                :value="query.name"
              />
              <span class="label">性别:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 28px;"
                flex-box="1"
                disabled
                class="bottom-line"
                :value="query.sex"
              />
              <span class="label">年龄:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 27px;text-align:center;"
                flex-box="2"
                disabled
                class="bottom-line"
                :value="query.age"
              />
          </div>
          <div flex="cross:center" class="input-item">
              <span class="label">床号:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                style="width: 55px;font-size: 28px;"
                flex-box="1"
                disabled
                class="bottom-line"
                :value="query.bedLabel + '床'"
              />
              <span class="label">入院日期:</span>
              <input
                type="text"
                flex-box="4"
                disabled
                style="width: 0px;font-size: 27px; padding-left: 2px;"
                nowidth
                class="bottom-line"
                :value="moment(query.admissionDate).format('YYYY-MM-DD')"
              />
          </div>
          <div flex="cross:center" class="input-item">
              <span class="label">主管医生:</span>
              <input
                type="text"
                style="font-size: 26px;width:150px;"
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
                class="bottom-line"
                style="font-size: 26px;width:150px;"
                v-model="formData.dutyNurses"
              />
          </div>
          <!-- <svg id="barcode"></svg> -->
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
        </div>
      </div>
      <div
        class="bed-card-warpper wrist-strap-print"
        ref="printCon3"
        v-show="printMode.includes('wrist')"
      >
        <div class="bed-card-vert-con wrist-newVert-con">
          <div class="top">
            <span>科室：{{ query.deptName }}</span>
          </div>
          <div>
            <span >姓名：{{ query.name }}</span>
            <span >性别：{{ query.sex }}</span>
            <span >年龄：{{ query.age }}</span>
            

            <!-- <div>
              <span>入院日期：{{ query.admissionDate | ymdhm }}</span>
            </div>
            <div class="allergy">
              <p>
                过敏信息：
                <span v-if="allergy1">{{ allergy1 }};</span>
                <span v-if="drugGms">{{ drugGms }};</span>
                <span v-if="allergy2">{{ allergy2 }}</span>
                <span v-else>无</span>
              </p>
            </div> -->
            <!-- <svg id="barcode"></svg> -->
          </div>
          <!-- <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          /> -->
          <div>
            <span >床号：{{ query.bedLabel }}</span>
            <span>住院号：{{ query.inpNo }}</span>
          </div>
          <div>
              
              <!-- <span class="bhzd">诊断:{{query.remark}}</span> -->
              <span>入院日期：{{ query.admissionDate | ymdhm }}</span>
        </div>
        <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
        </div>
      </div>
      <div slot="button">
        <span
          style="position: absolute; left: 10px; padding-top: 4px"
        >
          <!-- <span>显示诊断</span>
          <el-switch
            on-text="是"
            off-text="否"
            v-model="formData.remarkPrint"
          ></el-switch> -->
        </span>

        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button
          class="modal-btn"
          type="primary"
          @click="post"
          v-if="printMode == 'h'"
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
//床头卡打印宽高方法 w为打印宽度（厘米为单位），h为打印高度（厘米为单位）
vertCon(w=10.6,h=5.8){
  width:((500/10.6)*w)px;
  height:((250/5.8)*h)px;
}
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

.bed-card-vertical {
  // display: none;
  .bed-card-vert-con {
    margin: 5px;
    width: 500px;
    height: 250px;
    padding:5px 3px 0 3px !important;
    box-sizing: border-box;
    position: relative;
    border: 3px solid #000;
    text-align: left;
    .input-item{
      margin-bottom:20px;
    }
    .qr-code {
      position: absolute;
      right:10%;
      top: 75%;
      margin-top: -56px;
      height: 112px;
      width: 112px;
    }
  //   span {
  //     font-size: 16px;
  //     line-height: 24px;
  //   }
  //   p {
  //     font-size: 20px;
  //     line-height: 28px;
  //     padding-bottom: 10px;
  //     &:last-of-type {
  //       padding-bottom: 5px;
  //     }
  //   }
  //   svg {
  //     width: 100%;
  //     // height: 70px !important;
  //   }
  // }
  }
  .newVert-con{
    // width: 452.83px;
    // height: 237.1px;
    //引入样式方法vertCon
    vertCon(9.6,5.5);
  }
}

.wrist-strap-print {
   .bed-card-vert-con {
      margin: 20px;
      width: 119px;
      height: 498px;
      // padding: 35px 8px 5px !important;
      box-sizing: border-box;
      position: relative;
      border: 3px solid #000;
      text-align: left;
      width: 500px;
      height: auto;
      // padding: 5px 0 0 0 !important;
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
        font-size: 16px;
        line-height: 22px;
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
      right: -19px;
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
  .wrist-newVert-con{
    // vertCon(7.5,2);
    width: 353.7px !important;
    height: 86.2px !important;
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
import {
  getEntity,
  saveOrUpdate,
  findByKeyword,
  findByKeywordNur,
  saveBed
} from "./api/index.js";
import print from "./tool/print";
import printing from "printing";
var qr = require("qr-image");
var JsBarcode = require("jsbarcode");
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
        remarkPrint: true
      },
      ysList: [],
      printMode: "h", //打印模式
      title: "编辑床头卡",
      allergy1: "",
      allergy2: "",
      drugGms: ""
    };
  },
  computed: {
    query() {
      console.log(this.$route.query);
      return this.$route.query;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    }
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
        this.allergy1 = resData.allergy1;
        this.allergy2 = resData.allergy2;
        this.drugGms = resData.drugGms;
        this.modalLoading = false;
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
    open(printMode = "h") {
      this.init();
      this.printMode = printMode;
      if (this.printMode.includes("wrist")) {
        this.title = "腕带打印";
        // JsBarcode("#barcode", this.query.patientId, {
        //   lineColor: "#000",
        //   width: 4,
        //   height: 50,
        //   fontSize: 50
        // });
      } else if (this.printMode == "v") {
        this.title = "打印床头卡";
        // JsBarcode("#barcode", this.query.patientId + "|" + this.query.visitId, {
        //   displayValue:false,
        //   lineColor: "#000",
        //   margin:0,
        //   width:3,
        //   height: 60,
        //   fontSize: 55,
        //   textMargin:0
        // });
      } else {
        this.title = "编辑床头卡";
      }
      let qr_png_value = (['beihairenyi'].includes(this.HOSPITAL_ID)?"P":"") +this.query.patientId + "|" + this.query.visitId;
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
      this.qrCode = base64;
      this.qrCodeNum = this.query.patientId;
      this.$refs.modal.open();
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
        if (this.printMode.includes("wrist")) {
          let cssStyle = this.printMode =="wrist-children"?`
          .bed-card-warpper {
            box-shadow: none !important;
            transform: scale(0.8) rotate(90deg) translateY(-140%) translateX(45%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
            margin: 10px 20px 10px 10px!important;
          }
          @page {
            margin: 0;
          }
          `: `
          .bed-card-warpper {
            box-shadow: none !important;
            transform: scale(1) rotate(90deg) translateY(-140%) translateX(40%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
            margin: 10px 20px 10px 10px!important;
          }
          @page {
            margin: 0;
          }
          `
          printing(this.$refs.printCon3, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: cssStyle
          });
        } else if (this.printMode == "v") {
          // printing(this.$refs.printCon2, {
          //   direction: "horizontal",
          //   injectGlobalCss: true,
          //   scanStyles: false,
          //   css: `
          // .bed-card-warpper {
          //   box-shadow: none !important;
          // }
          // .bed-card-vert-con {
          //   margin: 20px 10px 0px 10px!important;
          // }
          // @page {
          //   margin: 0;
          // }
          // `
          // });
          print(this.$refs.printCon2,(el)=>{
            el.children[0].style.transform='scaleY(1.1) translateY(11%) translateX(2%)'
          });
        } else {
          print(this.$refs.printCon);
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
  filters: {
    ymdhm(val) {
      return val ? moment(val).format("YYYY-MM-DD") : "";
    }
  },
  mounted() {},
  components: {}
};
</script>
