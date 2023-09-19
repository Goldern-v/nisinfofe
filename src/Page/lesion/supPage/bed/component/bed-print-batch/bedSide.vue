<template>
  <div>
    <!-- 床头卡 -->
    <template v-if="category == 'bedside'">
      <template v-if="HOSPITAL_ID == 'sdhpwk'">
      <div class="bed-card-warpper"
        v-loading="modalLoading"
        ref="printCon"
        v-for="item in printData"
        :key="item.patientId">
        <div
          class="bed-card-con1"
          flex
          :class="{ remarkCon: formData.remarkPrint }"
        >
        <img class="qr-code" :style="{ opacity: '1' }" :src="item.qrCode" />
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div
              class="title-name"
              flex="cross:center"
              style="height: 43px"
            >
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 10px;margin-left: 20px;"
                flex-box="1"
                class="bottom-line"
                :value="item.name + ' ' + item.sex + ' ' + item.age"
              />
            </div>
            <div flex="cross:center" class="input-item title-bed">
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                class="bottom-line title-bed__1"
                :value="item.bedLabel + '床'"
              />
              <input
                type="text"
                flex-box="1"
                nowidth
                class="bottom-line title-bed__2"
                :value="moment(item.admissionDate).format('YYYY-MM-DD')"
              />
            </div>
            <div
              flex="cross:center"
              class="input-item"
            >
              <span class="label">住院号:</span>
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
                  :value="item.inpNo"
                />
              </div>
            </div>
            <div flex="cross:center" class="input-item input-item2">
              <span class="label">诊断:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px;"
                flex-box="1"
                class="bottom-line"
                v-model="item.diagnosis"
              />
            </div>
          </div>

          <div
            style="width: 131px"
          >
            <div class="tip">温馨提示</div>
            <div style="height: 2px"></div>
            <div
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
          </div>
        </div>
      </div>


      </template>
      <template v-else>
        <div
          class="bed-card-wrapper"
          style="display: inline-block;"
          v-loading="modalLoading"
          ref="printCon"
          v-for="item in printData"
          :key="item.patientId"
        >
          <div class="bed-card-con" flex>
            <img class="qr-code" :style="{ opacity: '1' }" :src="item.qrCode" />
            <div class="qr-code-num">
              {{ item.qrCodeNum }}
            </div>
            <div style="width: 0" flex-box="1" flex="dir:top main:justify">
              <div class="title-name" flex="cross:center" style="height: 43px">
                <span :style="`width:130px`"></span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 32px; padding-left: 5px"
                  flex-box="1"
                  class="bottom-line"
                  :value="item.name + ' ' + item.sex + ' ' + item.age"
                />
              </div>
              <div flex="cross:center" class="input-item title-bed">
                <!-- <span class="label">住院号:</span> -->
                <span :style="`width: 100px`"></span>
                <input
                  type="text"
                  class="bottom-line title-bed__1"
                  :value="item.bedLabel + '床'"
                />
                <input
                  type="text"
                  flex-box="1"
                  nowidth
                  class="bottom-line title-bed__2"
                  :value="moment(item.admissionDate).format('YYYY-MM-DD')"
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
                    v-model="item.diet"
                  />
                </div>
              </div>
              <div flex="cross:center" class="input-item">
                <span class="label">病情等级:</span>
                <div nowidth flex-box="1" flex="main:left cross:center">
                  <img
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('重', item)"
                    :class="{
                      active:
                        item.patientCondition &&
                        item.patientCondition.includes('重'),
                    }"
                    v-if="item.patientCondition.includes('重')"
                    :src="
                      item.patientCondition &&
                      item.patientCondition.includes('重')
                        ? require('./images/重选.png')
                        : require('./images/重.png')
                    "
                  />
                  <img
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('危', item)"
                    v-if="item.patientCondition.includes('危')"
                    :class="{
                      active:
                        item.patientCondition &&
                        item.patientCondition.includes('危'),
                    }"
                    :src="
                      item.patientCondition &&
                      item.patientCondition.includes('危')
                        ? require('./images/危选.png')
                        : require('./images/危.png')
                    "
                  />
                  <img
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('普', item)"
                    v-if="item.patientCondition.includes('普')"
                    :class="{
                      active:
                        item.patientCondition &&
                        item.patientCondition.includes('普'),
                    }"
                    :src="
                      item.patientCondition &&
                      item.patientCondition.includes('普')
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
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('特', item, true)"
                    v-if="item.nursingClass.includes('特')"
                    :class="{
                      active:
                        item.nursingClass && item.nursingClass.includes('特'),
                    }"
                    :src="
                      item.nursingClass && item.nursingClass.includes('特')
                        ? require('./images/特选.png')
                        : require('./images/特.png')
                    "
                  />
                  <img
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('一', item, true)"
                    v-if="item.nursingClass.includes('一')"
                    :class="{
                      active:
                        item.nursingClass && item.nursingClass.includes('一'),
                    }"
                    :src="
                      item.nursingClass && item.nursingClass.includes('一')
                        ? require('./images/一选.png')
                        : require('./images/一.png')
                    "
                  />
                  <img
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('二', item, true)"
                    v-if="item.nursingClass.includes('二')"
                    :class="{
                      active:
                        item.nursingClass && item.nursingClass.includes('二'),
                    }"
                    :src="
                      item.nursingClass && item.nursingClass.includes('二')
                        ? require('./images/二选.png')
                        : require('./images/二.png')
                    "
                  />
                  <img
                    style="
                      max-width: 100%;
                      max-height: 100%;
                      image-resolution: 300dpi;
                    "
                    class="dj-box printCare"
                    @click="selectRegistCare('三', item, true)"
                    v-if="item.nursingClass.includes('三')"
                    :class="{
                      active:
                        item.nursingClass && item.nursingClass.includes('三'),
                    }"
                    :src="
                      item.nursingClass && item.nursingClass.includes('三')
                        ? require('./images/三选.png')
                        : require('./images/三.png')
                    "
                  />
                </div>

              </div>
              <div class="title-sign">
                <div flex="cross:center" class="input-item">
                  <span class="label">主管医生:</span>
                  <input
                    type="text"
                    nowidth
                    :style="{
                      'font-size': '18px',
                    }"
                    flex-box="1"
                    class="bottom-line"
                    v-model="item.doctorInCharge"
                  />
                </div>
                <div flex="cross:center" class="input-item">
                  <span class="label">责任护士:</span>
                  <input
                    type="text"
                    nowidth
                    flex-box="1"
                    class="bottom-line"
                    :style="{
                      'font-size': '18px',
                    }"
                    v-model="item.dutyNurse"
                  />
                </div>
              </div>
            </div>

            <div style="width: 131px">
              <div class="tip">温馨提示</div>
              <div style="height: 2px"></div>
              <div>
                <div
                  class="tip-item-con"
                  flex="cross:center main:justify"
                  v-for="items in tipList"
                  :key="items.label"
                >
                  <img :src="items.img" alt />
                  <span>{{ items.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <!-- 床位卡 -->
    <template v-else>
      <div  ref="bedthNull"  class="display-list">
        <div
          class="bed-card-wrapper"
          v-for="item in printData"
          :key="item.bedLabel"
        >
          <div class="container">
            <div style="line-height: 28px; margin-top: 24px; font-size: 25px; text-align:center">
              床 位 卡
            </div>
            <div class="bed-card-cons" flex>
              <div style="flex: 1" flex-box="1" flex="dir:top main:justify">
                <img class="qr-code" :src="item.qrCode" />
              </div>
              <div>
                <div flex="cross:center;" class="title-bed">
                  <div>
                    <span style="font-size: 14px; line-height:20px;">病区：{{ item.wardName }}</span>
                  </div>
                  <div>
                    <span style="font-size: 18px; line-height:20px;">床号： {{item.bedLabel + '床'}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.display-list{
  display: flex;
  width: 100%;
  flex-wrap: wrap;

}
.bed-card-wrapper {
  background: #fff;
  // box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  // display: inline-block;
  font-size: 16px;

  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}
.bed-card-warpper {
  background: #fff;
  // box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  // display: inline-block;
  font-size: 16px;
  padding:5px ;
  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}


.container {
  margin: 20px;
  width: 300px;
  height: 200px;
  padding: 5px 8px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid #000;

  .bed-card-cons {
    display: flex;
    height: 158px;
    .qr-code {
      position: absolute;
      top: 33%;
      left: 6%;
      width: 40%;
      height: 60%;
    }

    .qr-code-num {
      position: absolute;
      top: 92px;
      left: 0px;
      width: 120px;
      text-align: center;
      z-index: 2;
      font-size: 16px;
    }

    .title-bed {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      height: 77%;

      .title-bed__1 {
        width: 80px;
        font-size: 18px;
        padding-left: 5px;
        line-height: 24px;
      }

      .title-bed__2 {
        width: 0px;
        font-size: 18px;
        padding-left: 2px;
      }
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
    top: 2px;
    left: 2px;
    height: 103px;
    width: 103px;
  }

  .qr-code-num {
    position: absolute;
    top: 92px;
    left: 0px;
    width: 120px;
    text-align: center;
    z-index: 2;
    font-size: 16px;
  }
}
.bed-card-con1 {
  margin: 20px;
  width: 14.3cm;
  height: 6cm;
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
    left: 5px;
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



    &.hasRemark {
      top: 78px;
      left: 0px;
      width: 84px;
      font-size: 14px;
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

  .input-item-left {
    display: inline-block;

    width 75px {
      .input-item-left-label {
        margin-right: 2px;
      }
    }
  }
}
.input-itemhp {
  height: 30px;
  // padding-right: 12px;
  font-size: 22px;
  font-weight: bold;
  position: relative;
  padding-left:10px;
  z-index: 2;
  &.inputItemHeight{
      line-height: 85px;
      font-size: 80px;
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
</style>

<script>
var qr = require("qr-image");
import moment from "moment";
import printing from "printing";

export default {
  props: {
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
      tipList: [
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png"),
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
      },
      ysList: [],
      /**打印类型
       * 默认床头卡
       * baby 新生儿
       */
      printMode: "",
      isPrint: false,
    };
  },
  computed: {
    item() {
      return {wardName: this.$store.state.lesion.deptName, wardCode: this.$store.state.lesion.deptCode};
    },
  },
  methods: {


    getqrCode(item) {
      // qr_png_value = this.item.inpNo.substring(0,this.item.inpNo.lastIndexOf("_"));

      let qr_png_value = item.inpNo.substring(0,item.inpNo.lastIndexOf("_"));
      var qr_png = qr.imageSync(
        this.category == "bedside"
          ? qr_png_value
          : `B_${this.item.wardCode}_${item.bedLabel}`,
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

    selectRegistCare(item, data, key = false) {
      if (key) {
        data.nursingClass = data.nursingClass.includes(item) ? "" : item;
      } else {
        data.patientCondition = data.patientCondition.includes(item)
          ? ""
          : item;
      }
    },
    onPrint() {
      this.$nextTick(() => {
          let styleSheet =  `
              .bed-card-wrapper{
                margin: 0 auto;
              }

              @page {
                margin: 0;
                background-color: #fff;
              }`
          ;
          printing(this.$refs.bedthNull, {
            direction: "horizontal",
            injectGlobalCss: true,
            scanStyles: false,
            css: styleSheet
          });

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
};
</script>
