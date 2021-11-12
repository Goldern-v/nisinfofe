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
              style="height:130px;box-sizing:border-box;"
            >
              <span class="label" style="font-size:32px;">床号:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px;outline:none;border:none"
                flex-box="1"
                class="bottom-line"
                :value="query.bedLabel + '床'"
              />
            </div>
            <div flex="cross:center" class="input-item" style="height:130px;box-sizing:border-box;">
              <span class="label" style="font-size:32px;">姓名:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px;outline:none;border:none"
                flex-box="1"
                class="bottom-line"
                :value="query.name"
              />
              <!-- <input
                type="text"
                flex-box="1"
                style="width: 0px;font-size: 32px; padding-left: 2px;"
                nowidth
                class="bottom-line"
                :value="moment(query.admissionDate).format('YYYY-MM-DD')"
              /> -->
            </div>
            <div flex="cross:center" class="input-item" style="height:130px;box-sizing:border-box;">
              <span class="label" style="font-size:32px;">性别:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px;outline:none;border:none"
                flex-box="1"
                class="bottom-line"
                :value="query.sex"
              />
            </div>
            <div flex="cross:center" class="input-item" style="height:130px;box-sizing:border-box;">
              <span class="label" style="font-size:32px;">住院号:</span>
              <!-- <span :style="`width: ${hasRemark ? 85 : 100}px`"></span> -->
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px;outline:none;border:none"
                flex-box="1"
                class="bottom-line"
                :value="query.inpNo"
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
            <!-- <div flex="cross:center" class="input-item">
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
            </div> -->
            <div flex="cross:center" class="input-item" style="height:130px;box-sizing:border-box;">
              <span class="label" style="font-size:32px;">主管医生:</span>
              <!-- <el-autocomplete v-model="formData.mainDoctors"
                               :fetch-suggestions="querySearchAsyncDoc"
                               class="auto-input"
                               flex-box="1"
                               disabled
              ></el-autocomplete>-->
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px;outline:none;border:none"
                flex-box="1"
                class="bottom-line"
                v-model="formData.mainDoctors"
              />
            </div>
            <div flex="cross:center" class="input-item" style="height:130px;box-sizing:border-box;">
              <span class="label" style="font-size:32px;">责任护士:</span>
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
                style="font-size: 32px; padding-left: 5px;outline:none;border:none"
                v-model="formData.dutyNurses"
              />
            </div>
          </div>
          <div style="width: 200px;">
            <div class="tip">温馨提示</div>
            <div>
              <div
                v-for="item in tipList"
                :key="item.label"
                class="tip-item-box"
              >
                <div class="tip-item-con"
                flex="cross:center main:justify">
                  <img :src="item.img" alt />
                  <span>{{ item.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bed-card-warpper bed-card-children"
        v-loading="modalLoading"
        ref="childrenPrint"
        v-if="printMode == 'children'"
      >
        <div
          class="bed-card-con"
          flex
          :class="{ remarkCon: formData.remarkPrint }"
        >
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <img
                class="qr-code"
                :class="{ hasRemark: hasRemark }"
                :src="qrCode"
              />
            <div
              flex="cross:center"
              class="input-item"
              style="height: 43px;padding-left:120px;"
            >
              <span class="label">姓名:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px;padding-left: 5px;"
                flex-box="3"
                class="bottom-line"
                :value="query.name"
              /></div>
              <div
              flex="cross:center"
              class="input-item"
              style="height: 43px;padding-left:120px;"
            >
              <span class="label">性别:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px;padding-left: 5px;"
                flex-box="1"
                class="bottom-line"
                :value="query.sex"
              />
              <span class="label">年龄:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px;padding-left: 5px;"
                flex-box="2"
                class="bottom-line"
                :value="query.age"
              />
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">床号:</span>
              <input
                type="text"
                flex-box="1"
                nowidth
                style="font-size: 26px; padding-left: 5px;"
                class="bottom-line"
                :value="query.bedLabel + '床'"
              />
              <span class="label">住院号:</span>
              <input
                type="text"
                nowidth
                flex-box="1"
                style="font-size: 26px;padding-left: 5px;"
                class="bottom-line"
                :value="query.inpNo"
              />
            </div>
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
              <span class="label">入院时间:</span>
              <input
                type="text"
                flex-box="1"
                style="width: 0px;font-size: 26px; padding-left: 2px;"
                nowidth
                class="bottom-line"
                :value="moment(query.admissionDate).format('YYYY-MM-DD')"
              />
            </div>
            <div flex="cross:center" class="input-item remark">
              <span class="input-item-left-label">诊断:</span>
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
        </div>
      </div>
      <div
        class="bed-card-warpper bed-card-children-tip"
        ref="childrenTip"
        v-show="printMode == 'children-tips'"
      >
        <div class="bed-card-ctip-con">
          <div class="children-row">
            <div>住院号：</div>
            <div>{{ query.inpNo }}</div>
          </div>
          <div class="children-row">
            <div>姓名：</div>
            <div>{{ query.name }}</div>
          </div>
          <div class="children-row">
            <div>床号：</div>
            <div>{{ query.bedLabel +"床"}}</div>
          </div>
        </div>
      </div>
      <div
        class="bed-card-warpper bed-card-vertical"
        ref="printCon2"
        v-show="printMode == 'v'"
      >
        <div class="bed-card-vert-con">
          <span>床号：</span>
          <p>{{ query.bedLabel + "床" }}</p>
          <span>姓名：</span>
          <p>{{ query.name }}</p>
          <span>性别：</span>
          <p>{{ query.sex }}</p>
          <span>年龄：</span>
          <p>{{ query.age }}</p>
          <span>住院号：</span>
          <p>{{ query.patientId }}</p>
          <img
            class="qr-code  wrist-qrcode"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
        </div>
      </div>
      <div
        class="bed-card-warpper wrist-strap-print"
        ref="printCon3"
        v-if="printMode.includes('wrist')"
      >
        <div class="bed-card-vert-con">
          <div class="title">东莞市横沥医院</div>
          <div class="top row-item">
            <div class="column-item">科室：{{ query.deptName }}</div>
            <div class="column-item">床位：{{ query.bedLabel }}</div>
          </div>
          <div>
            <div class="row-item">
              <div class="column-item">姓名：{{ query.name }}</div>
              <div class="column-item">性别：{{ query.sex }}</div>
              <!-- <span>{{ query.age }}</span> -->
            </div>
            <div class="row-item">
              <!-- <span>入院日期：{{ query.admissionDate | ymdhm }}</span> -->
              <div class="column-item">住院号：{{ query.patientId }}</div>
            </div>
            <!-- <div class="allergy">
              <p>
                过敏信息：
                <span v-if="allergy1">{{ allergy1 }};</span>
                <span v-if="drugGms">{{ drugGms }};</span>
                <span v-if="allergy2">{{ allergy2 }}</span>
                <span v-if="!(allergy1||drugGms||allergy2)">无</span>
              </p>
            </div> -->
            <!-- <svg id="barcode"></svg> -->
          </div>
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
        </div>
      </div>
      <div slot="button">
        <!-- <span
          style="position: absolute; left: 10px; padding-top: 4px"
          v-if="HOSPITAL_ID != 'hj' && printMode == 'h'"
        >
          <span>显示诊断</span>
          <el-switch
            on-text="是"
            off-text="否"
            v-model="formData.remarkPrint"
          ></el-switch>
        </span> -->

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
    width: 96px;
    height: 360px;
    padding:5px 3px 0 3px !important;
    box-sizing: border-box;
    position: relative;
    border: 3px solid #000;
    text-align: left;
    span {
      display:block;
      width:100%;
      text-align center;
      font-size: 16px;
      line-height: 24px;
    }
    p {
      text-align: center;
      font-size: 20px;
      line-height: 28px;
      padding-bottom: 10px;
      &.patientId{
        font-size: 16px;
      }
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
      box-sizing: border-box;
      position: relative;
      text-align: left;
      width: 500px;
      height: auto;
      padding: 5px 0 0 0 !important;
      border: none;
      .title{
        width:370px;
        text-align:center;
        margin-top: -10px;
        margin-bottom: 5px;
      }
     .top {
        span {
          margin-left: 10px;
          &:first-of-type {
            margin-left: 10px;
          }
        }
     }
      >>>.allergy{
        width :80%;
        p{
          margin-left:10px;
        }
        span{
          margin-left:0px;
          font-size:15px !important;
        }
      }
    .row-item{
      display:flex;
      justify-content:stretch;
      width:370px;
      margin-bottom:5px;

      .column-item{
        flex:1;
      }
    }
     span {
        font-size: 20px;
        line-height: 24px;
        margin-left: 10px;
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
  width: 14cm;
  height: 21cm;
  padding: 5px 8px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  border: 1px solid #000;
  .input-item{
    border-bottom:1px solid #000;
    border-right:1px solid #000;
  }
  .input-item:last-child{
    border-bottom:none;
  }
  .qr-code {
    position: absolute;
    bottom: 20px;
    right: 50px;
    height: 112px;
    width: 112px;

    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }

  .qr-code-num {
    position: absolute;
    bottom: 5px;
    left: 360px;
    min-width: 145px;
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
.bed-card-children-tip{
  width:7.25cm;
  height:3.75cm;
  font-size:32px;
  .bed-card-ctip-con{
    transform scale(0.6) translate(-7%,-41%)
    width:310px;
    padding:35px 0 0 0px;
    box-sizing border-box
    .children-row{
      display:flex;
      min-height:75px;
      justify-content space-between
      div{
        &:first-child{
          width:140px;
          text-align left
        }
        &:nth-child(2){
          width:150px;
          text-align left
        }
      }
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
  height: 130px;
  line-height: 130px;
  box-sizing:border-box;
  border-bottom:1px solid #000;
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
  height: 100px;
  padding: 0 5px 0 5px;
  box-sizing: border-box;
  margin: 15px 0 14px;
  font-size: 22px;
  color:red;
  img {
    width: 69px;
  }
}
.tip-item-box{
  padding:0 10px;
  border-bottom:1px solid #000;
  overflow:hidden;
  box-sizing: border-box;
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
.wrist-qrcode{
  width:55px;
  position:relative;
  top:-12px;
  left:13px;
}
.bed-card-children{
  .bed-card-con {
    width:11.75cm;
    height:10cm;
    >>>.input-item{
      margin-bottom:5px!important;
      border: none;
    }
    .remark{
      height:60px;
    }
    .qr-code {
      position: absolute;
      left:2%;
      top: 20%;
      margin-top: -56px;
      height: 112px;
      width: 112px;

      &.hasRemark {
        width: 96px;
        height: 96px;
      }
    }
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
      this.$refs.modal.open();
      this.printMode = printMode;
      let qr_png_value = this.query.expand1;
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
      this.qrCodeNum =this.query.expand1;
      if (this.printMode.includes("wrist")) {
        this.title = "腕带打印";
      } else if (this.printMode == "v") {
        this.title = "打印床头卡";
      }else if(this.printMode == "children"){
        this.title = "新生儿床头卡";
      }else if(this.printMode == "children-tips"){
        this.title = "新生儿标签";
      }
      else {
        this.title = "编辑床头卡";
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
          let cssStyle = this.printMode == "wrist"?`
          .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-140%) translateX(145%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
          }
          @page {
            margin: 0;
          }
          `:`
          .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-120%) translateX(75%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
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
          printing(this.$refs.printCon2, {
            injectGlobalCss: true,
            scanStyles: false,
            css: `
          .bed-card-warpper {
            box-shadow: none !important;
            transform:translateY(3%) translateX(12%);
          }
          @page {
            margin: 0;
          }
          `
          });
        }else if(this.printMode == "children"){
          print(this.$refs.childrenPrint);
        }else if(this.printMode=="children-tips"){
          print(this.$refs.childrenTip);
        } else {
          printing(this.$refs.printCon, {
            injectGlobalCss: true,
            scanStyles: false,
            css: `
          .bed-card-warpper {
            box-shadow: none !important;
            transform:translateY(3%) translateX(12%);
          }
          @page {
            margin: 0;
          }
          `
          });
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
