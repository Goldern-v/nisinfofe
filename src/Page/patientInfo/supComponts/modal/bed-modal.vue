<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="isZhzxy ? 770 : 600"
      title="编辑床头卡"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <bed-modal-baby-ctx-dglb
        :formData.sync="formData"
        :isPrint="isPrint"
        v-loading="modalLoading"
        ref="printCon"
        v-if="isDglb && printMode === 'baby'"
      />
      <bed-modal-ctx-dglb
        :qrCode="qrCode"
        :guominshi.sync="guominshi"
        :formData.sync="formData"
        v-loading="modalLoading"
        ref="printCon"
        v-else-if="isDglb"
      />
      <div
        class="bed-card-wrapper"
        :class="{ 'wrapper--zhzxy': isZhzxy }"
        v-loading="modalLoading"
        ref="printCon"
        v-else
      >
        <div
          class="bed-card-con"
          flex
          :class="{ remarkCon: formData.remarkPrint }"
        >
          <img
            class="qr-code"
            :style="{opacity:HOSPITAL_ID == 'zhzxy'?'0':'1'}"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
          <div
            class="qr-code-num"
            :class="{ hasRemark: hasRemark, zhzxyStyle: isZhzxy }"
            :style="
              HOSPITAL_ID == 'liaocheng'
                ? 'width: 110px'
                : HOSPITAL_ID == 'hengli'
                ? 'line-height: 13px;'
                : ''
            "
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
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                nowidth
                style="font-size: 42px; padding-left: 0px; font-weight: 900"
                flex-box="1"
                class="bottom-line"
                :value="query.name"
              />
              <input
                type="text"
                nowidth
                style="
                  font-size: 30px;
                  padding-left: 0px;
                  width: 31%;
                  height: 100%;
                  box-sizing: border-box;
                "
                class="bottom-line"
                :value="query.sex + ' ' + query.age"
              />
            </div>
            <div
              class="title-name"
              flex="cross:center"
              style="height: 43px"
              v-else
            >
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px"
                flex-box="1"
                class="bottom-line"
                :value="query.name + ' ' + query.sex + ' ' + query.age"
              />
            </div>
            <div flex="cross:center" class="input-item title-bed">
              <!-- <span class="label">住院号:</span> -->
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                class="bottom-line title-bed__1"
                :value="query.bedLabel + '床'"
              />
              <input
                type="text"
                flex-box="1"
                nowidth
                class="bottom-line title-bed__2"
                :value="moment(query.admissionDate).format('YYYY-MM-DD')"
              />
            </div>

            <div
              :class="{ zhzxyItem: isZhzxy }"
              flex="cross:center"
              class="input-item"
            >
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
                  :style="{
                    'font-size':  isWhhk? '19px':'24px',
                    'text-align': isZhzxy ? 'center' : '',
                  }"
                  v-model="formData.diet"
                  @focus="
                    onFocusToAutoComplete($event, {
                      autoComplete: ysList,
                      obj: formData,
                      key: 'diet',
                    })
                  "
                  @blur="onBlurToAutoComplete"
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item input-item_whhk" v-if="['whhk'].includes(HOSPITAL_ID)"  >
              <span class="label">病情等级:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('重')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('重')
                      ? require('./images/重汉口.png')
                      : require('./images/重.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('危')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('危')
                      ? require('./images/危选.png')
                      : require('./images/危.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('普')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('普')
                      ? require('./images/普汉口.png')
                      : require('./images/普.png')
                  "
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item" v-else>
              <span class="label">病情等级:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
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
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('危')"
                  :class="{ active: formData.registCare.includes('危') }"
                  :src="
                    formData.registCare.includes('危')
                      ? require('./images/危选.png')
                      : require('./images/危.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
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

            <div flex="cross:center" class="input-item input-item_whhk" v-if="['whhk'].includes(HOSPITAL_ID)"  >
              <span class="label">护理级别:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('特')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('特')
                      ? require('./images/特选.png')
                      : require('./images/特.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('一')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('一')
                      ? require('./images/一汉口.png')
                      : require('./images/一.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('二')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('二')
                      ? require('./images/二汉口.png')
                      : require('./images/二.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('三')"
                  :class="{ active: true }"
                  :src="
                    formData.registCare.includes('三')
                      ? require('./images/三汉口.png')
                      : require('./images/三.png')
                  "
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item" v-else>
              <span class="label">护理级别:</span>
              <div nowidth flex-box="1" flex="main:left cross:center">
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('特')"
                  :class="{ active: formData.registCare.includes('特') }"
                  :src="
                    formData.registCare.includes('特')
                      ? require('./images/特选.png')
                      : require('./images/特.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('一')"
                  :class="{ active: formData.registCare.includes('一') }"
                  :src="
                    formData.registCare.includes('一')
                      ? require('./images/一选.png')
                      : require('./images/一.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
                  @click="selectRegistCare('二')"
                  :class="{ active: formData.registCare.includes('二') }"
                  :src="
                    formData.registCare.includes('二')
                      ? require('./images/二选.png')
                      : require('./images/二.png')
                  "
                />
                <img
                  style="max-width: 100%;
                  max-height: 100%;
                  image-resolution: 300dpi;"
                  class="dj-box printCare"
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
            <div class="title-sign">
              <div
                :style="{ width: isZhzxy ? '50%' : '' }"
                :class="{ zhzxyItem: isZhzxy }"
                flex="cross:center"
                class="input-item"
              >
                <span class="label" >主管医生:</span>
                <!-- <el-autocomplete v-model="formData.mainDoctors"
                                 :fetch-suggestions="querySearchAsyncDoc"
                                 class="auto-input"
                                 flex-box="1"
                                 disabled
                ></el-autocomplete>-->
                <input
                  type="text"
                  nowidth
                  :style="{
                    'font-size': '18px',
                    'text-align': isZhzxy ? 'center' : '',
                  }"
                  flex-box="1"
                  class="bottom-line"
                  v-model="formData.mainDoctors"
                />
                <span class="label" v-if="['whhk'].includes(HOSPITAL_ID)">科主任:</span>
                <input
                v-if="['whhk'].includes(HOSPITAL_ID)"
                  type="text"
                  nowidth
                  :style="{
                    'font-size': '18px',
                    'text-align': isZhzxy ? 'center' : '',
                  }"
                  flex-box="1"
                  class="bottom-line"
                  v-model="formData.aField2"
                />
              </div>
              <div
                :style="{ width: isZhzxy ? '50%' : '' }"
                :class="{ zhzxyItem: isZhzxy }"
                flex="cross:center"
                class="input-item"
              >
                <span class="label">责任护士:</span>
                <input
                  type="text"
                  nowidth
                  flex-box="1"
                  class="bottom-line"
                  :style="{
                    'font-size': '18px',
                    'text-align': isZhzxy ? 'center' : '',
                  }"
                  v-model="formData.dutyNurses"
                />
                <span class="label" v-if="['whhk'].includes(HOSPITAL_ID)">护士长:</span>
                <input
                v-if="['whhk'].includes(HOSPITAL_ID)"
                  type="text"
                  nowidth
                  flex-box="1"
                  class="bottom-line"
                  :style="{
                    'font-size': '18px',
                    'text-align': isZhzxy ? 'center' : '',
                  }"
                  v-model="formData.aField3"
                />
              </div>

            </div>
            <div
              v-if="isZhzxy"
              :class="{ zhzxyItem: isZhzxy }"
              flex="cross:center"
              class="input-item"
            >
              <span class="label">过敏史:</span>
              <input
                type="text"
                nowidth
                flex-box="1"
                class="bottom-line"
                :style="{
                  'font-size': '24px',
                  'text-align': isZhzxy ? 'center' : '',
                }"
                v-model="guominshi"
              />
            </div>
            <div
              flex="cross:top"
              class="input-item"
              style="height: 58px; margin-top: 4px"
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

          <div
            v-if="!isZhzxy"
            :class="{ 'is-xiegang': HOSPITAL_ID == 'xiegang' }"
            style="width: 131px"
          >
            <div class="tip">温馨提示</div>
            <div style="height: 2px"></div>
            <div
              v-if="!['whhk'].includes(HOSPITAL_ID)"
              :class="{ aliCenter: ['lyxrm', 'stmz'].includes(HOSPITAL_ID) }"
            >
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
            <div
              v-if="['whhk'].includes(HOSPITAL_ID)"
              :class="{ aliCenter: ['lyxrm', 'stmz'].includes(HOSPITAL_ID) }"
            >
              <div
                class="tip-item-con"
                flex="cross:center main:justify"
                v-for="item in whhktipList"
                :key="item.label"
              >
                <img :src="item.img" alt />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div>
          <div v-else class="zhzxyChose" style="width: 131px">
            <div class="tip">温馨提示</div>
            <div
              v-for="(item, index) in wenxintishi"
              :key="index + 'sss'"
              class="zhzxyChoseItem"
              flex-box="1"
              flex="main:justify cross:center"
              @click="
                onFocusToAutoComplete2($event, {
                  autoComplete: item.option,
                  obj: formData,
                  key: item.code,
                })
              "
            >
              <div class="zhzxyChoseItem-label">{{ item.label }}</div>
              <div class="zhzxyChoseItem-box">{{ formData[item.code] }}</div>
              <!-- <input
                  type="text"
                  flex-box="1"
                  class="bottom-line"
                  :style="{'font-size': '24px','text-align':['zhzxy'].includes(HOSPITAL_ID)?'center':''}"
                  v-model="formData.diet"
                  @blur="onBlurToAutoComplete"
                /> -->
            </div>
          </div>
        </div>
      </div>
      <div slot="button">
        <span
          style="position: absolute; left: 10px; padding-top: 4px"
          v-if="!['hj', 'whhk'].includes(HOSPITAL_ID)"
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

.bed-card-wrapper {
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
    width: 120px;
    text-align: center;
    z-index: 2;
    font-size: 16px;

    &.zhzxyStyle {
      font-size: 20px;
      min-width: 100px;
    }

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

.zhzxyChose {
  .zhzxyChoseItem {
    min-height: 70px;
    border: 1px solid rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    border-bottom: 0;

    &:last-of-type {
      border-bottom: 1px solid rgb(0, 0, 0);
    }

    .zhzxyChoseItem-label {
      font-size: 20px;
      border-bottom: 1px solid;
      width: 100%;
    }

    .zhzxyChoseItem-box {
      width: 100%;
      min-height: 45px;
    }
  }
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
  width: 350px;

  &.zhzxyItem {
    font-size: 20px;
  }

  .input-item-left {
    display: inline-block;

    width 75px {
      .input-item-left-label {
        margin-right: 2px;
      }
    }
  }
}
.input-item_whhk{
  height: 50px;
  img{
    width: 50px;
    height: 50px
  }
}

.title-bed {
  .title-bed__1 {
    width: 94px;
    font-size: 24px;
    padding-left: 5px;
    line-height: 24px;
  }

  .title-bed__2 {
    width: 0px;
    font-size: 24px;
    padding-left: 2px;
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
  margin-bottom: 12px;
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

.is-xiegang {
  position: absolute;
  top: 59px;
  right: 10px;
  z-index: 100;
  background: #fff;
}

.bed-card-wrapper.wrapper--zhzxy {
  .bed-card-con {
    width: 182mm !important;
    height: 113mm !important;

    .qr-code {
      top: 0px;
      left: 0px;
      height: 98px;
      width: 98px;

      &.hasRemark {
        width: 90px;
        height: 90px;
      }
    }

    .qr-code-num {
      top: 87px;
      height: 22px;
    }

    .title-name {
      height: 68px !important;

      input {
        font-weight: 500;
        font-size: 46px !important;
        text-shadow: 1px 0px #000, -1px 0px #000, 0px 1px #000, 0px -1px #000;
      }
    }

    .title-bed {
      .title-bed__1, .title-bed__2 {
        font-size: 28px;
      }
    }

    .input-item {
      width: auto;
    }

    .title-sign {
      display: flex;
    }

    input {
      background: transparent;
    }
  }
}
</style>

<script>
import { getEntity, saveBed } from "./api/index.js";
import print from "./tool/print";
var qr = require("qr-image");
import moment from "moment";
import { textOver } from "@/utils/text-over";
import { multiDictInfo } from "@/api/common";
import bedModalCtxDglb from "./bed-modal-ctx-dglb.vue";
import bedModalBabyCtxDglb from "./bed-modal-baby-ctx-dglb.vue";
import { hisMatch } from "@/utils/tool.js";

export default {
  data() {
    return {
      moment,
      qrCode: "" /** 二维码 */,
      qrCodeNum: "" /** 二维码 */,
      tipList: [
        // {
        //   label: "小心跌倒",
        //   img: require("./images/Group 6.png")
        // },
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png"),
        },
        // {
        //   label: "防止压疮",
        //   img: require("./images/Group 9.png")
        // },
        {
          label: "防止偷盗",
          img: require("./images/Group 10.png"),
        },
      ],
      whhktipList: [
        {
          label: "小心跌倒",
          img: require("./images/Group 6.png"),
        },
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png"),
        },
        {
          label: "防止压疮",
          img: require("./images/Group 9.png"),
        },
        {
          label: "防止偷盗",
          img: require("./images/Group 10.png"),
        },
      ],
      modalLoading: false,
      formData: {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        remarkPrint: true,
        aField2:"",//科主任
        aField3:""//护士长
      },
      ysList: [],
      wenxintishi: [
        {
          label: "挂牌类",
          code: "aField1",
          option: [
            "高危药物卡",
            "膀胱冲洗卡",
            "输液卡",
            "吸氧卡",
            "胃管滴注卡（肠内营养）",
            "鼻饲卡",
            "接触隔离卡",
            "胃肠减压",
            "留置24小时尿标本",
          ],
        },
        {
          label: "防类",
          code: "aField2",
          option: [
            "防脱管",
            "防返流",
            "防臀红",
            "防压疮",
            "防跌倒",
            "防VAP",
            "防外渗",
            "防窒息",
            "防坠床",
            "防烫伤",
          ],
        },
        {
          label: "隔离类",
          code: "aField3",
          option: [
            "飞沫隔离",
            "空气隔离",
            "接触隔离",
            "虫媒隔离",
            "保护性隔离",
            "MDRO",
          ],
        },
        {
          label: "其他",
          code: "aField4",
          option: [
            "药物过敏",
            "监测血糖",
            "绝对卧床",
            "机械通气",
            "血液制品未出库",
            "留陪人",
            "记出入量",
          ],
        },
      ],
      /**打印类型
       * 默认床头卡
       * baby 新生儿
       */
      printMode: '',
      isPrint: false,
      isZhzxy: ["zhzxy"].includes(this.HOSPITAL_ID),
      isDglb: ["dglb"].includes(this.HOSPITAL_ID),
      isWhhk: ["whhk"].includes(this.HOSPITAL_ID),
    };
  },
  computed: {
    guominshi: {
      get() {
        if (this.formData.aField5) return this.formData.aField5;
        else {
          const arr = [this.formData.allergy1, this.formData.allergy2];
          return arr.join("");
        }
      },
      set(val) {
        console.log(val, "val");
        this.formData.aField5 = val;
      },
    },
    query() {
      return this.$route.query;
    },
    hasRemark() {
      return this.formData.remarkPrint;
    },
  },
  methods: {
    init() {
      this.formData = {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        aField2:"",//科主任
        aField3:""//护士长
      };
      getEntity(this.query.patientId, this.query.visitId).then((res) => {
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
          aField2:resData.aField2,//科主任
          aField3:resData.aField3//护士长
        };
        if (this.isZhzxy) {
          this.formData = {
            ...this.formData,
            aField1: resData.aField1,
            aField2: resData.aField2,
            aField3: resData.aField3,
            aField4: resData.aField4,
            aField5: resData.aField5,
            allergy1: resData.allergy1,
            allergy2: resData.allergy2,
          };
        }
        else if (this.isDglb) {
          this.formData = {
            ...this.formData,
            aField5: resData.aField5,
            weight: resData.weight
          };
        }
        this.modalLoading = false;
        if (
          ["lyxrm", "stmz"].includes(this.HOSPITAL_ID) &&
          JSON.parse(localStorage.user) &&
          JSON.parse(localStorage.user).post != "护长"
        ) {
          if (resData.isPrint == 1) {
            this.$message({
              type: "warning",
              message: "该患者已打印床头卡",
            });
            return;
          } else {
            this.isOpen();
          }
        }
      });
      multiDictInfo(["床头卡饮食"]).then((res) => {
        this.ysList = res.data.data.床头卡饮食.map((item) => item.name);
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
    open(printMode = '') {
      this.printMode = printMode
      this.init();
      if (
        (["lyxrm", "stmz"].includes(this.HOSPITAL_ID) &&
          JSON.parse(localStorage.user) &&
          JSON.parse(localStorage.user).post == "护长") ||
        !["lyxrm", "stmz"].includes(this.HOSPITAL_ID)
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
          case "nfyksdyy":
          qr_png_value = this.query.inpNo.substring(0,this.query.inpNo.lastIndexOf("_"));
          break;
        case "hengli":
          qr_png_value = this.query.expand1;
          break;
        case "foshanrenyi":
          qr_png_value = "1001|" + this.query.patientId;
          break;
        case "nanfangzhongxiyi":
          qr_png_value = this.query.patientId + "|" + this.query.visitId;
          break;
        case "lyxrm":
        case "stmz":
          qr_png_value = "P" + this.query.patientId;
          break;
        case "gdtj":
          qr_png_value ='P' + this.query.patientId +"|"+ this.query.visitId;
          break;
        case "whhk":
          qr_png_value = "P" + this.query.inpNo;
          break;
        case "xiegang":
          qr_png_value = this.query.inpNo + '|' + this.query.visitId;
          break;
        case "zhzxy":
          qr_png_value =
            "ZY" + this.query.patientId + "||" + this.query.visitId;
          break;
        case "lyyz":
          qr_png_value =
            "P" + "|" + this.query.patientId + "|" + this.query.visitId;
          break;
        case "qhwy":
          qr_png_value =this.query.inpNo;
          break;
        default:
          qr_png_value = this.query.patientId;
          break;

      }
      var qr_png = qr.imageSync(qr_png_value, {
        type: "png",
        margin: this.isZhzxy ? 2 : 4,
      });
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
      let showqrCodeNum = "";
      if (["zhzxy",'gdtj'].includes(this.HOSPITAL_ID)) {
        showqrCodeNum = this.query.patientId;
      }
      if (['whhk'].includes(this.HOSPITAL_ID)) {
        showqrCodeNum = this.query.inpNo;
      }
      this.qrCodeNum = ["zhzxy",'gdtj','whhk'].includes(this.HOSPITAL_ID)
        ? showqrCodeNum
        : qr_png_value;
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
      data.aField2 = this.formData.aField2; //科主任
      data.aField3 = this.formData.aField3;//护士长
      data.remark = this.formData.remark.slice(0, 24);
      if (this.isZhzxy) {
        data.aField1 = this.formData.aField1;
        data.aField2 = this.formData.aField2;
        data.aField3 = this.formData.aField3;
        data.aField4 = this.formData.aField4;
        data.aField5 = this.formData.aField5;
      }
      if (this.isDglb) {
        data.aField5 = this.formData.aField5;
      }
      saveBed(data).then((res) => {
        this.$message.success("保存成功");
        this.close();
      });
    },
    onPrint() {
      const printCare = document.querySelectorAll(".printCare");
      let arr = [];
      for (let i = 0; i < printCare.length; i++) {
        arr = printCare[i].className.split(" ");
        if (!arr.includes("active")) printCare[i].style.display = "none";
      }
      this.isPrint = true
      this.$nextTick(() => {
        this.post();
        const ref = hisMatch({
          map: {
            dglb: this.$refs.printCon.$el,
            other: this.$refs.printCon,
          },
        });
        print(
          ref,
          (el) => {
            if (this.isZhzxy) {
              el.style.marginTop = "17mm";
              el.style.marginLeft = "0mm";
            } else if (this.isDglb && this.printMode === 'baby') {
              el.style.marginLeft = "10mm";
              el.style.marginTop = "10mm";
              const els = el.querySelectorAll('.bed-modal-ctx')
              for (let i = 0; i < els.length; i++) {
                i > 0 && (els[i].style.marginTop = "20px");
                els[i].style.borderColor = '#000'
              }
            } else if (this.isDglb) {
              el.style.position = "relative";
              el.style.width = "150mm";
              el.style.height = "215mm";
              el.style.padding = "15px";
              el.style.boxSizing = "border-box";
              el.style.border = "2px solid #000";
              el.style.marginLeft = "50mm";
            } else if (this.isWhhk) {
              el.style.boxSizing = "border-box";
              el.style.margin="0"
              el.style.transform="translate(0px, 10mm) scale(1, 1.18)"
            }else {
              el.style.marginLeft = "194mm";
            }
          },
          this.isZhzxy ? "v" : ""
        );

        for (let i = 0; i < printCare.length; i++) {
          printCare[i].style.display = "block";
        }
        this.isPrint = false
      });
    },
    querySearchAsyncDoc(queryString, cb) {
      cb([]);
    },
    querySearchAsyncNur(queryString, cb) {
      cb([]);
    },

    onFocusToAutoComplete(e, bind) {
      function offset(ele) {
        let { top, left } = ele.getBoundingClientRect();
        return {
          left: left,
          top: top,
        };
      }
      let { autoComplete, obj, key } = bind;
      let xy = offset(e.target);

      console.log(xy, autoComplete, obj, key, "autoComplete, obj, key");

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`,
          },
          data: autoComplete,
          callback: function (data) {
            if (data) {
              if (obj[key]) {
                obj[key] += "," + data;
              } else {
                obj[key] += data;
              }
            }
          },
          id: `bedModal`,
        });
      });
    },
    onFocusToAutoComplete2(e, bind) {
      function offset(ele) {
        let { top, left } = ele.getBoundingClientRect();
        return {
          left: left,
          top: top,
        };
      }
      let { autoComplete, obj, key } = bind;
      let xy = offset(e.target);

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`,
          },
          data: autoComplete,
          callback: function (data) {
            console.log(data, "data", obj[key]);
            if (data) {
              if (obj[key]) {
                if (obj[key].indexOf(",") < 0) {
                  if (obj[key] == data) obj[key] = "";
                  else obj[key] += "," + data;
                } else {
                  let oldVal = obj[key];
                  let oldValArr = oldVal.split(",");
                  let idx = oldValArr.indexOf(data);
                  if (idx >= 0) oldValArr.splice(idx, 1);
                  else oldValArr.push(data);
                  obj[key] = oldValArr.filter((str) => str).join(",");
                }
              } else {
                obj[key] += data;
              }
            }
          },
          id: `bedModal`,
        });
      });
    },
    onBlurToAutoComplete(e, bind) {
      setTimeout(() => {
        window.closeAutoComplete(`bedModal`);
      }, 400);
    },
  },
  mounted() {},
  components: {
    bedModalCtxDglb,
    bedModalBabyCtxDglb
  },
};
</script>
