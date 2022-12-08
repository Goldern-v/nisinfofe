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
            :src="qrCode"
          />
          <div style="width: 0" flex-box="1" flex="dir:top main:justify">
            <div
              flex="cross:center"
              class="input-item"
              style="height: 43px"
            >
              <span class="label">科别:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{query.wardName}}</div>
            </div>
            <div
              flex="cross:center"
              class="input-item"
              :style="{overflow:query.name.length>7?'unset':'',minHeight:'43px'}"
            >
              <span class="label">床号:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0"
                flex-box="1"
                class="bottom-line"
              >{{query.bedLabel}}</div>
              <span class="label">姓名:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="3"
                class="bottom-line"
                :class="[query.name.length>7?'huadu-bigname':'']"
              >{{query.name}}</div>
            </div>
            <div flex="cross:center" class="input-item"> 
              <span class="label">性别:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{query.sex}}</div>
              <span class="label">年龄:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="3"
                class="bottom-line"
              >{{query.age}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">住院号:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{query.patientId}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">主管医生:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{mainDoctors}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">入院日期:</span>
              <div
                type="text"
                flex-box="1"
                style="width: 0px;font-size: 22px; padding-left: 2px;;margin-right:80px;border-bottom:0;"
                nowidth
                class="bottom-line"
              >{{moment(query.admissionDate).format('YYYY-MM-DD')}}</div>
            </div>
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
          <span><span style="display:inline-block;width:54px;">性别：</span><span style="font-size:20px;display:inline-block;width:30px;">{{ query.sex }}</span></span>
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
        :class="{'zhzxyStyle':['zhzxy'].includes(HOSPITAL_ID)}"
        ref="printCon3"
        v-show="printMode == 'wrist'"
      >
        <div class="bed-card-vert-con" >
          <div :class="{'huaduStyle':['huadu'].includes(HOSPITAL_ID)}">
            <div class="top">
              <span>科室：{{ query.wardName }}</span>
              <span v-if="!['zhzxy'].includes(HOSPITAL_ID)" :style="{'margin':'4px','margin-left':['zhzxy'].includes(HOSPITAL_ID)?'20px':''}">床位：{{ query.bedLabel }}</span>
            </div>
            <div>
              <div v-if="['fsxt'].includes(HOSPITAL_ID)">
                <span>住院号：{{ query.patientId }}</span>
                <span>{{ query.name }}</span>
                <span>{{ query.sex }}</span>
                <span>{{ query.age }}</span>
              </div>
              <div v-else-if="['gdtj'].includes(HOSPITAL_ID)">
                <span>{{ query.name }}</span>
                <span>住院号：{{ query.patientId }}</span>
                <span>{{ query.sex }}</span>
                <span>{{ query.age }}</span>
              </div>
              <div v-else>
                <span>{{ query.name }}</span>
                <span>{{ query.sex }}</span>
                <span>{{ query.age }}</span>
                <span>住院号：{{ query.patientId }}</span>
              </div>
              <div>
                <span>入院日期：{{ query.admissionDate | ymdhm }}</span>
              </div>

        <div flex="cross:center" class="input-item" style="width:73%;height:27px;" v-if="['gdtj'].includes(HOSPITAL_ID)">
                <span class="label" style="margin-right:0;">过敏信息：</span>
                <input
                  type="text"
                  nowidth
                  style="font-size: 20px;padding-left:0;"
                  flex-box="1"
                  class="bottom-line is_input_print"
          :maxlength="13"
                  v-model="allergy_gdtj"
                />
              </div>
        
        <!-- <div flex="cross:top"
                class="input-item"
          v-if="['gdtj'].includes(HOSPITAL_ID)" style="width:350px;height: 60px;">
                <span class="label">过敏信息：</span>
          <textarea
                  type="text"
                  nowidth
                  flex-box="1"
          placeholder="20个字以内"
                  class="bottom-line remark allergy-textarea is_hide_textarea"
                  v-model="allergy_gdtj"
                  :maxlength="20"
                ></textarea>
          <p class="bottom-line remark allergy-textarea print-page__ptext" flex-box="1" style="whiteSpace: pre-wrap;">{{allergy_gdtj}}</p>
              </div> -->
        <div class="allergy" :class="{whhkAllergy:['whhk'].includes(HOSPITAL_ID)}" v-else-if="!['zhzxy'].includes(HOSPITAL_ID)">
          <p :class="[allergy1||drugGms||allergy2?'gm':'']">
            过敏信息：
            <span v-if="allergy1">{{ allergy1 }};</span>
            <span v-if="drugGms">{{ drugGms }};</span>
            <span v-if="allergy2">{{ allergy2 }}</span>
            <span v-if="!(allergy1||drugGms||allergy2)">无</span>
          </p>
          <div flex="cross:center" class="input-item" v-if="['whhk'].includes(HOSPITAL_ID)">
            <span class="label" style="margin-right:0;">科室联系电话：</span>
            <input
              type="text"
              nowidth
              style="padding-left:0;"
              flex-box="1"
              class="bottom-line is_input_print"
              :maxlength="11"
              v-model="lianxiPhone_whhk"
            />
          </div>
        </div>
        
              <!-- <svg id="barcode"></svg> -->
            </div>
          </div>
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
        </div>
      </div>
        <div
        class="bed-card-warpper wrist-strap-print fsxt-wrist-children"
        :class="{'zhzxyStyle':['zhzxy'].includes(HOSPITAL_ID)}"
        ref="fsxtPrintCon"
        v-if="printMode == 'fsxt-wrist-children'"
      >
        <div class="bed-card-vert-con" >
          <div class="top">
            <span>科室：{{ query.wardName }}</span>
            <span v-if="!['zhzxy'].includes(HOSPITAL_ID)" :style="{'margin':'4px','margin-left':['zhzxy'].includes(HOSPITAL_ID)?'20px':''}">床位：{{ query.bedLabel }}</span>
          </div>
          <div>
            <div v-if="['fsxt'].includes(HOSPITAL_ID)">
              <span>住院号：{{ query.patientId }}</span>
              <span>{{ query.name }}</span>
              <span>{{ query.sex }}</span>
              <span>{{ query.age }}</span>
            </div>
            <div v-else-if="['gdtj'].includes(HOSPITAL_ID)">
              <span>{{ query.name }}</span>
              <span>住院号：{{ query.patientId }}</span>
              <span>{{ query.sex }}</span>
              <span>{{ query.age }}</span>
            </div>
            <div v-else>
              <span>{{ query.name }}</span>
              <span>{{ query.sex }}</span>
              <span>{{ query.age }}</span>
              <span>住院号：{{ query.patientId }}</span>
            </div>
            <div>
              <span>入院日期：{{ query.admissionDate | ymdhm }}</span>
            </div>

			<div flex="cross:center" class="input-item" style="width:73%;height:27px;" v-if="['gdtj'].includes(HOSPITAL_ID)">
              <span class="label" style="margin-right:0;">过敏信息：</span>
              <input
                type="text"
                nowidth
                style="font-size: 20px;padding-left:0;"
                flex-box="1"
                class="bottom-line is_input_print"
				:maxlength="13"
                v-model="allergy_gdtj"
              />
            </div>
			<div class="allergy" :class="{whhkAllergy:['whhk'].includes(HOSPITAL_ID)}" v-else-if="!['zhzxy'].includes(HOSPITAL_ID)">
				<p :class="[allergy1||drugGms||allergy2?'gm':'']">
					过敏信息：
					<span v-if="allergy1">{{ allergy1 }};</span>
					<span v-if="drugGms">{{ drugGms }};</span>
					<span v-if="allergy2">{{ allergy2 }}</span>
					<span v-if="!(allergy1||drugGms||allergy2)">无</span>
				</p>
        <div flex="cross:center" class="input-item" v-if="['whhk'].includes(HOSPITAL_ID)">
          <span class="label" style="margin-right:0;">科室联系电话：</span>
          <input
            type="text"
            nowidth
            style="padding-left:0;"
            flex-box="1"
            class="bottom-line is_input_print"
            :maxlength="11"
            v-model="lianxiPhone_whhk"
          />
        </div>
			</div>
      
             </div>
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode"
          />
        </div>
      </div>
      <div
        class="bed-card-warpper wrist-strap-print children-wrist"
        ref="printCon4"
        :class="{'zhzxyStyle':['zhzxy'].includes(HOSPITAL_ID)}"
        v-show="printMode == 'wrist-children'"
      >
        <div class="bed-card-vert-con">
          <div class="top">
            <span>科室：{{ query.wardName }}</span>
          </div>
          <div>
            <div>
              <span v-if="!['zhzxy'].includes(HOSPITAL_ID)">床位：{{ query.bedLabel }}</span>
              <span>住院号：{{ query.patientId}}</span>
            </div>
            <div>
              <span>{{ query.name }}</span>
              <span>{{ query.sex }}</span>
              <span>{{ query.age }}</span>
            </div>
          </div>
          <div>
            <div>
              <span>入院日期：{{ query.admissionDate | ymdhm }}</span>
            </div>
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
        <!-- <el-button
          class="modal-btn"
          type="primary"
          @click="post"
          v-if="printMode == 'h'"
          >保存</el-button
        > -->
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

.bed-card-warpper {
  background: #fff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  display: inline-block;
  font-size: 16px;
  &.zhzxyStyle{
      font-size: 20px;
    }
  
  .bed-card-con{
    width:9cm;
    height:5.7cm;
  }
  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
}
.huaduStyle{
  position:relative;
  left:-30px;
}
.bed-card-vertical {
  // display: none;
  
  .bed-card-vert-con {
    margin: 5px;
    width: 2.5cm;
    height: 360px;
    padding:5px 0 0 !important;
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
.print-page__ptext{
	display: none;
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
          margin-left: 10px;
          &:first-of-type {
            margin-left: 10px;
          }
        }
     }
      >>>.allergy{
        width :80%;
        &.whhkAllergy{
          width:100%;
          display:flex;
          align-items: center;
          >p{
            display: flex;
            align-items: center;
          }
          >.input-item{
            height: 25px;
            font-size: 20px;
            margin-left: 10px;
            >span{
              font-size: 16px;
            }
            >input{
              font-size: 16px;
              width: 100px;
            }
          }
        }
        p{
          height 25px;
          overflow hidden
          margin-left:10px;
          font-size: 20px;
        }
        span{
          margin-left:0px;
          font-size: 20px;
        }
        p.gm{
          span{
            color:red;
          }
        }
      }
     span {
        font-size: 20px;
        line-height: 24px;
        margin-left: 10px;
     }
    .qr-code {
      position: absolute;
      right: 25px;
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
   &.children-wrist{
      width:10cm;
      height:3cm;
      // border:1px solid #000;
      box-sizing:border-box;
      .bed-card-vert-con{
        transform:scale(0.8) translateX(-2.1cm) translateY(-0.7cm)
      }
      .qr-code{
        position: absolute;
        right: 75px !important;
        top: 55% !important;
        margin-top: -56px;
        height: 112px;
        width: 112px;
      }
  }
 
}
//  .fsxt-wrist-children{
//      width:7.2cm;
//      height:2.4cm;
//      font-size:14px;
//       .bed-card-vert-con{
//         transform:scale(0.8) translateX(-2.1cm) translateY(0cm)
//       }
//       .qr-code{
//         position: absolute;
//         right: 75px !important;
//         top: 56% !important;
//         margin-top: -56px;
//         height: 90px;
//         width: 90px;
//       }
//   }
.fsxt-wrist-children{
  width:10cm;
  height:3cm;
  // border:1px solid #000;
  box-sizing:border-box;
  .bed-card-vert-con{
    transform:scale(0.8) translateX(-1.1cm) translateY(-0.7cm)
  }
  .qr-code{
    position: absolute;
    right: 75px !important;
    top: 55% !important;
    margin-top: -56px;
    height: 112px;
    width: 112px;
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
    bottom: 10px;
    right: 10px;
    height: 100px;
    width: 100px;

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
  margin-top: 1px;
  font-size: 20px;
  border: 0;
  padding: 0;
}
  .allergy-textarea{
	overflow:hidden;
	width: 235px;
	padding-left 4px;
	border: 1px solid #ccc;
	box-sizing: border-box;
	height: 58px;
	border-radius:4px;
	line-height: 1.1;
    padding-top: 4px;
	font-size: 19px;
  }

.input-item {
  height: 40px;
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
.wrist-qrcode{
  width:55px;
  position:relative;
  top:-12px;
  left:13px;
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
      mainDoctors:'',
      ysList: [],
      printMode: "h", //打印模式
      title: "编辑床头卡",
      allergy1: "",
      allergy2: "",
      drugGms: "",
	  allergy_gdtj:"",//自定义过敏信息
    lianxiPhone_whhk:""
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
        this.lianxiPhone_whhk = resData.lianxiPhone_whhk
        this.mainDoctors = resData.mainDoctors
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
      let qr_png_value;
      switch(this.HOSPITAL_ID){
        case 'fsxt':
          qr_png_value = `1001|${this.query.patientId}|${this.query.visitId}|${this.query.name}`;
          break
        case "zhzxy":
          qr_png_value ='ZY' + this.query.patientId +"||"+ this.query.visitId;
          break;
        case "whhk":
          qr_png_value ='P' + this.query.inpNo;
          break;
        default:
          qr_png_value = this.query.patientId + "|" + this.query.visitId;
          break
      }
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
      if (this.printMode == "wrist") {
        this.title = "成人腕带打印";
        // JsBarcode("#barcode", this.query.patientId, {
        //   lineColor: "#000",
        //   width: 4,
        //   height: 50,
        //   fontSize: 50
        // });
      }else if (this.printMode == "wrist-children") {
        this.title = "儿童腕带打印";
        // JsBarcode("#barcode", this.query.patientId + "|" + this.query.visitId, {
        //   displayValue:false,
        //   lineColor: "#000",
        //   width: 4,
        //   height: 50,
        //   fontSize: 50
        // });
      } else if (this.printMode == "v") {
        this.title = "打印床头卡";
      }else if (this.printMode == "fsxt-wrist-children") {
        this.title = "新生儿腕带打印";
      } else {
        this.title = "编辑床头卡";
      }
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
      data.lianxiPhone_whhk = this.lianxiPhone_whhk;
      data.remark = this.formData.remark.slice(0, 24);
      console.log("data",data)
      saveBed(data).then(res => {
        this.$message.success("保存成功");
        this.close();
      });
    },
    onPrint() {
      this.$nextTick(() => {
        this.post();
        if (this.printMode == "wrist") {
          let styleSheet = {
            default:`
          .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-120%) translateX(25%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
          }
		  .is_input_print{
			font-size:20px !important;
		  }
		  .is_hide_textarea{
			display:none;
		  }
		  .print-page__ptext{
			display:block !important;
			border:none !important;
			padding:0 !important;
			height:auto !important;
		  }
          @page {
            margin: 0;
          }
          `,
            fsxt:`
            .bed-card-warpper {
              box-shadow: none !important;
              transform: rotate(90deg) translateY(-130%) translateX(15%);
              transform-origin: 0 0;
            }
            .bed-card-vert-con {
            }
            @page {
              margin: 0;
            }
            `
          }
          printing(this.$refs.printCon3, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: styleSheet[this.HOSPITAL_ID] || styleSheet.default
          });
        }else if (this.printMode == "fsxt-wrist-children") {
          let styleSheet = {
            default:`
          .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-120%) translateX(25%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
          }
		  .is_input_print{
			font-size:20px !important;
		  }
		  .is_hide_textarea{
			display:none;
		  }
		  .print-page__ptext{
			display:block !important;
			border:none !important;
			padding:0 !important;
			height:auto !important;
		  }
          @page {
            margin: 0;
          }
          `,
            fsxt:`
            .bed-card-warpper {
              box-shadow: none !important;
              transform: rotate(90deg) translateY(-120%) translateX(25%);
              transform-origin: 0 0;
            }
            .bed-card-vert-con {
            }
            @page {
              margin: 0;
            }
            `
          }
          printing(this.$refs.fsxtPrintCon, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: styleSheet[this.HOSPITAL_ID] || styleSheet.default
          });
        }else if (this.printMode == "wrist-children") {
          printing(this.$refs.printCon4, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: `
            .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-3.5cm) translateX(3cm);
            transform-origin: 0 0;
            }
            @page {
              margin: 0;
            }
          `
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
        } else {
          printing(this.$refs.printCon, {
            direction: "horizontal",
            injectGlobalCss: true,
            scanStyles: false,
            css: `
            .bed-card-warpper {
              box-shadow: none !important;
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
