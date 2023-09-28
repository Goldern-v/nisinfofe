<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="isZhzxy ? 770 : 700"
      title="编辑床头卡"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div
        class="bed-card-wrapper"
        v-loading="modalLoading"
        ref="printCon"
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
          <div style="width: 0" flex-box="1" >
            <div
              class="title-name title-bed"
              flex="cross:center"
              style="height: 100px"
            >
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                nowidth
                style="font-size: 90px; padding-left: 5px"
                flex-box="1"
                class="bottom-line title-bed__3"
                :value="query.name + ' '"
              />
              <input
                type="text"
                nowidth
                style="font-size: 32px; padding-left: 5px"
                flex-box="1"
                class="bottom-line"
                :value=" query.sex + ' ' + query.age"
              />
            </div>
            <div flex="cross:center" class="input-item title-bed">
              <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
              <input
                type="text"
                class="bottom-line title-bed__1"
                :value="query.bedLabel + '床'"
              />
              <input
                type="text"
                flex-box="1"
                 style="font-size: 26px"
                nowidth
                class="bottom-line title-bed__2"
                :value="moment(query.admissionDate).format('YYYY-MM-DD HH:mm:ss')"
              />
            </div>
            <div flex="cross:center" class="input-item input-item2">
              <span class="label">住院号:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px;"
                flex-box="1"
                class="bottom-line"
                v-model="query.inpNo"
              />
            </div>
            <div flex="cross:center" class="input-item input-item2">
              <span class="label">诊断:</span>
              <input
                type="text"
                nowidth
                style="font-size: 26px;"
                flex-box="1"
                class="bottom-line"
                v-model="query.diagnosis"
              />
            </div>
          </div>

          <!-- <div
            style="width: 140px"
          >
            <div class="tip">温馨提示</div>
            <div style="height: 2px"></div>
            <div
            >
              <div
                class="tip-item-con"
                v-for="item in tipList"
                :key="item.label"
              >
                <img :src="item.img" alt />
                <span>{{ item.label }}</span>
              </div>
            </div>
          </div> -->
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
  width: 15.3cm;
  height: 7cm;
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
  width: 560px;

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
    font-size: 25px;
    padding-left: 5px;
    line-height: 24px;
  }

  .title-bed__2 {
    width: 0px;
    font-size: 24px;
    padding-left: 2px;
  }
    .title-bed__3 {
    width: 94px;
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
        remark: "",
        remarkPrint: true,

      },
      ysList: [],
      /**打印类型
       * 默认床头卡
       * baby 新生儿
       */
      printMode: '',
      isPrint: false,
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
      });
      multiDictInfo(["床头卡饮食"]).then((res) => {
        this.ysList = res.data.data.床头卡饮食.map((item) => item.name);
      });
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
        case "dglb":
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
