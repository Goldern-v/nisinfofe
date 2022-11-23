<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="600"
      title="编辑床头卡"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div class="bed-card-wrapper" v-loading="modalLoading" ref="printCon" >
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
          >
            {{ qrCodeNum }}
          </div>
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
          <div
            flex="cross:center"
            style="height: 43px"

          >
            <!-- <span class="label">患者姓名:</span> -->
            <span :style="`width: ${hasRemark ? 85 : 100}px`"></span>
            <input
              type="text"
              nowidth
              style="font-size: 14px;padding-left: 5px;"
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
                  width: '94px',
                  'font-size':'14px',
                  'padding-left': '5px',
                  'line-height': ' 14px'
                }"
                class="bottom-line"
                :value="query.bedLabel + '床'"
              />
              <input
                type="text"
                flex-box="1"
                style="width: 0px;font-size: 14px; padding-left: 2px;"
                nowidth
                class="bottom-line"
                :value="moment(query.admissionDate).format('YYYY-MM-DD')"
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
                  :style="{'font-size': '14px'}"
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
                      ? require('./images/特选.png')
                      : require('./images/特.png')
                  "
                />
                <img
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
            <div>
              <div  flex="cross:center" class="input-item">
                <span class="label">主管医生:</span>
                <input
                  type="text"
                  nowidth
                  style="font-size:14px"
                  flex-box="1"
                  class="bottom-line"
                  v-model="formData.mainDoctors"
                />
              </div>
              <div flex="cross:center" class="input-item">
                <span class="label">责任护士:</span>
                <input
                  type="text"
                  nowidth
                  flex-box="1"
                  class="bottom-line"
                  style="font-size:14px;"
                  v-model="formData.dutyNurses"
                />
              </div>
            </div>
            <div v-if="['zhzxy'].includes(HOSPITAL_ID)"
            :class="{zhzxyItem:['zhzxy'].includes(HOSPITAL_ID)}"
            flex="cross:center" class="input-item">
              <span class="label">过敏史:</span>
              <input
                type="text"
                nowidth
                flex-box="1"
                class="bottom-line"
                :style="{'font-size': '14px','text-align':['zhzxy'].includes(HOSPITAL_ID)?'center':''}"
                v-model="guominshi"
              />
            </div>
          </div>

          <!-- <div style="width: 131px">
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
          </div> -->

        </div>
      </div>
      <div slot="button">
        <span
          style="position: absolute; left: 10px; padding-top: 4px"
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
  // width: 511px;
  // height: 335px;
  width: 6cm;
  height: 8cm;
  padding: 5px 8px;
  box-sizing: border-box;
  border-right: 5px solid #fff;
  position: relative;
  border: 1px solid #000;
  // height: 370px;

  // &.remarkCon
  .qr-code {
    position: absolute;
    top: 2px;
    left: 2px;
    height: 86px;
    width: 86px;
    &.hasRemark {
      width: 96px;
      height: 96px;
    }
  }

  .qr-code-num {
    position: absolute;
    top: 77px;
    left: 0px;
    width: 96px;
    text-align: center;
    z-index: 2;
    font-size: 12px;
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
.zhzxyChose{
  .zhzxyChoseItem{
    min-height: 70px;
    border: 1px solid rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    border-bottom: 0;
    &:last-of-type{
      border-bottom: 1px solid rgb(0, 0, 0);
    }
    .zhzxyChoseItem-label{
      border-bottom: 1px solid;
      width: 100%;
    }
    .zhzxyChoseItem-box{
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
  // width:350px
  font-size: 14px;
  &.zhzxyItem{
    font-size: 18px;
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
  width: 20px;
  height: 20px;
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
.aliCenter{
    display: flex;
    flex-direction: column;
    height: 299px;
    .tip-item-con{
      margin-bottom: 0;
      &:first-of-type{
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
        // {
        //   label: "小心跌倒",
        //   img: require("./images/Group 6.png")
        // },
        {
          label: "小心烫伤",
          img: require("./images/Group 7.png")
        },
        // {
        //   label: "防止压疮",
        //   img: require("./images/Group 9.png")
        // },
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
      wenxintishi:[
        {
          label:"挂牌类",
          code:"aField1",
          option:['高危药物卡','膀胱冲洗卡','输液卡','吸氧卡','胃管滴注卡（肠内营养）','鼻饲卡','接触隔离卡','胃肠减压','留置24小时尿标本'],
        },
        {
          label:"防类",
          code:"aField2",
          option:['防脱管','防返流','防臀红','防压疮','防跌倒','防VAP','防外渗','防窒息','防坠床','防烫伤'],
        },
        {
          label:"隔离类",
          code:"aField3",
          option:['飞沫隔离','空气隔离','接触隔离','虫媒隔离','保护性隔离','MDRO'],
        },
        {
          label:"其他",
          code:"aField4",
          option:['药物过敏','监测血糖','绝对卧床','机械通气','血液制品未出库','留陪人','记出入量'],
        },
      ]
    };
  },
  computed: {
    guominshi:{
      get(){
        if(this.formData.aField5) return this.formData.aField5
        else{
          const arr = [this.formData.allergy1,this.formData.allergy2]
          return arr.join("")
        }
      },
      set(val){
        this.formData.aField5=val
      }
    },
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
        if(['zhzxy'].includes(this.HOSPITAL_ID)){
            this.formData = {
              ...this.formData,
              aField1:resData.aField1,
              aField2:resData.aField2,
              aField3:resData.aField3,
              aField4:resData.aField4,
              aField5:resData.aField5,
              allergy1:resData.allergy1,
              allergy2:resData.allergy2,
          }
        }
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
      if (
        (['lyxrm', 'whhk'].includes(this.HOSPITAL_ID) &&
          JSON.parse(localStorage.user) &&
          JSON.parse(localStorage.user).post == "护长") ||
        !['lyxrm', 'whhk'].includes(this.HOSPITAL_ID)
      ) {
        this.isOpen();
      }
    },
    isOpen() {
      this.$refs.modal.open();
      let qr_png_value = 'P'+"|"+ this.query.patientId +"|"+ this.query.visitId;
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
      console.log('qr_png_value',qr_png_value);
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
      if(['zhzxy'].includes(this.HOSPITAL_ID)){
        data.aField1 = this.formData.aField1;
        data.aField2 = this.formData.aField2;
        data.aField3 = this.formData.aField3;
        data.aField4 = this.formData.aField4;
        data.aField5 = this.formData.aField5;
      }
      saveBed(data).then(res => {
        this.$message.success("保存成功");
        this.close();
      });
    },
    onPrint() {
      // this.formData.registCare.includes('特')
      const printCare = document.querySelectorAll(".printCare")
      let arr = []
      for(let i=0;i<printCare.length;i++){
        arr=  printCare[i].className.split(" ")
        if(!arr.includes("active"))
          printCare[i].style.display = "none"
      }
      this.$nextTick(() => {
        this.post();
        print(this.$refs.printCon, (el) => {
          // el.style.marginLeft = '194mm'
        });
        for(let i=0;i<printCare.length;i++){
          printCare[i].style.display = "block"
      }
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
          top: top
        };
      }
      let { autoComplete, obj, key } = bind;
      let xy = offset(e.target);

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`
          },
          data: autoComplete,
          callback: function(data) {
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
    onFocusToAutoComplete2(e, bind) {
      function offset(ele) {
        let { top, left } = ele.getBoundingClientRect();
        return {
          left: left,
          top: top
        };
      }
      let { autoComplete, obj, key } = bind;
      let xy = offset(e.target);

      setTimeout(() => {
        window.openAutoComplete({
          style: {
            top: `${xy.top + 40}px`,
            left: `${xy.left}px`
          },
          data: autoComplete,
          callback: function(data) {
            if (data) {
              if (obj[key]) {
                if(obj[key].indexOf(',')<0){
                  if(obj[key]==data) obj[key] = ""
                  else obj[key] += "," + data;
                }else{
                  let oldVal = obj[key];
                  let oldValArr = oldVal.split(',');
                  let idx = oldValArr.indexOf(data)
                  if (idx >= 0) oldValArr.splice(idx, 1);
                  else oldValArr.push(data);
                  obj[key] = oldValArr.filter(str => str).join(',');
                }
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
