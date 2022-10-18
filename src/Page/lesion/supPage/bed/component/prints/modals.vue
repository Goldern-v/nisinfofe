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
        v-show="printMode == 'h'"
      >
        <div
          v-for="(item,index) in list"
          :key="item.patientId + '|' + item.visitId"
          class="bed-card-con"
          :class="[(index+1)%9==0?'nextpage':'',(index+1)%9==1||(index+1)%9==2||(index+1)%9==3?'firstpage':'']"
          flex
        >
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode[index]"
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
              >{{item.wardName}}</div>
            </div>
            <div
              flex="cross:center"
              class="input-item"
              :style="{overflow:item.name&&item.name.length>7?'unset':'',minHeight:'43px'}"
            >
              <span class="label">床号:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0"
                flex-box="1"
                class="bottom-line"
              >{{item.bedLabel}}</div>
              <span class="label">姓名:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="3"
                class="bottom-line"
                :class="[item.name&&item.name.length>7?'huadu-bigname':'']"
              >{{item.name}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">性别:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{item.sex}}</div>
              <span class="label">年龄:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="3"
                class="bottom-line"
              >{{item.age}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">住院号:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{item.patientId}}</div>
              </div>
            <div flex="cross:center" class="input-item">
              <span class="label">主管医生:</span>
              <div
                type="text"
                nowidth
                style="font-size: 22px;padding-left: 5px;border-bottom:0;"
                flex-box="1"
                class="bottom-line"
              >{{item.mainDoctors}}</div>
            </div>
            <div flex="cross:center" class="input-item">
              <span class="label">入院日期:</span>
              <div
                type="text"
                flex-box="1"
                style="width: 0px;font-size: 22px; padding-left: 2px;;margin-right:80px;border-bottom:0;"
                nowidth
                class="bottom-line"
              >{{moment(item.admissionDate).format('YYYY-MM-DD')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bed-card-warpper bed-card-vertical"
        ref="printCon2"
        v-show="printMode == 'v'"
      >
        <div
          class="bed-card-vert-con"
          v-for="(item,index) in list"
          :key="item.patientId"
          :class="[(index+1)%10==0?'nextpage':'',[1,2,3,4,5].includes((index+1)%10)?'firstpage':'']"
        >
          <span>床号：</span>
          <p>{{ item.bedLabel + "床" }}</p>
          <span>姓名：</span>
          <p>{{ item.name }}</p>
          <span><span style="display:inline-block;width:54px;">性别：</span><span style="font-size:20px;display:inline-block;width:30px;">{{ item.sex }}</span></span>
          <span>年龄：</span>
          <p>{{ item.age }}</p>
          <span>住院号：</span>
          <p class="patientId">{{ item.patientId }}</p>
          <img
            class="qr-code  wrist-qrcode"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode[index]"
          />
        </div>
      </div>
      <div
        class="bed-card-warpper wrist-strap-print"
        ref="printCon3"
        v-for="(item,index) in list"
        :key="item.patientId+item.visitId"
        v-show="printMode == 'wrist'"
      >
        <div class="bed-card-vert-con">
          <div class="top">
            <span>科室：{{ item.wardName }}</span>
            <span style="margin:4px;">床位：{{ item.bedLabel }}</span>
          </div>
          <div>
            <div>
              <span>{{ item.name }}</span>
              <span>{{ item.sex }}</span>
              <span>{{ item.age }}</span>
              <span>住院号：{{ item.patientId }}</span>
            </div>
            <div>
              <span>入院日期：{{ item.admissionDate | ymdhm }}</span>
            </div>
            <div class="allergy" :class="[item.allergy1||item.drugGms||item.allergy2?'gm':'']">
                过敏信息：
                <span v-if="item.allergy1">{{ item.allergy1 }};</span>
                <span v-if="item.drugGms">{{ item.drugGms }};</span>
                <span v-if="item.allergy2">{{ item.allergy2 }}</span>
                <span v-if="!(item.allergy1||item.drugGms||item.allergy2)">无</span>
            </div>
            <!-- <svg id="barcode"></svg> -->
          </div>
          <img
            class="qr-code"
            :class="{ hasRemark: hasRemark }"
            :src="qrCode[index]"
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
            v-model="remarkPrint"
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

.bed-card-warpper {
  background: #fff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  display: inline-block;
  font-size: 16px;
  .bed-card-con{
    width:9cm;
    height:5.7cm;
  }
  >>> * {
    font-family: 'SimHei', 'Microsoft Yahei' !important;
    font-weight: bold;
  }
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
    .qr-code {
      position: absolute;
      right: 22%;
      top: 100%;
      margin-top: -56px;
      height: 112px;
      width: 112px;

      &.hasRemark {
        width: 55px;
        height: 55px;
      }
    }
  }
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
          // margin-left: 10px;
          // &:first-of-type {
          //   margin-left: 45px;
          // }
        }
     }

      >>>.allergy{
        width :80%;
        font-size: 20px;
        height 25px;
        overflow hidden
        span{
          margin-left:0px;
          font-size:20px !important;
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
  margin-bottom 40px
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
    height: 125px;
    width: 125px;

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
  .nextpage{
    margin-bottom:281px;
  }
</style>

<script>
import {
  getEntity,
  saveBed
} from "@/Page/patientInfo/supComponts/modal/api/index.js";
import print from "./tool/print";
import printing from "printing";
var qr = require("qr-image");
// var JsBarcode = require("jsbarcode");
import moment from "moment";
import { textOver } from "@/utils/text-over";
import { multiDictInfo } from "@/api/common";
export default {
  data() {
    return {
      moment,
      qrCode: [] /** 二维码 */,
      qrCodeNum: [] /** 二维码 */,
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
      ysList: [],
      printMode: "h", //打印模式
      title: "编辑床头卡",
      list:[
        {
          formData: {
            diet: "",
            registCare: [],
            mainDoctors: "",
            dutyNurses: "",
            remark: "",
          },
          allergy1: "",
          allergy2: "",
          drugGms: "",
        }
      ],
      remarkPrint: true
    };
  },
  computed: {
    // query() {
    //   return this.$route.query;
    // },
    hasRemark() {
      return this.remarkPrint
    }
  },
  methods: {
     init() {
      this.list.map(async (item,index)=>{
        item.formData = {
          diet: "",
          registCare: [],
          mainDoctors: "",
          dutyNurses: "",
          remark: ""
        };
        await this.$set(this.list,index,item)
        let res = await getEntity(item.patientId, item.visitId);
        let resData = res.data.data
        let diagnosis = await textOver(item.diagnosis, 52);
        item.formData = {
          diet: resData.diet || "",
          registCare: resData.registCare
            ? (resData.registCare || "").split(",")
            : this.getRegistCare(item),
          mainDoctors: resData.mainDoctors || "",
          dutyNurses: resData.dutyNurses || "",
          remark: diagnosis,
          remarkPrint: resData.remarkPrint
        };
        item.mainDoctors = resData.mainDoctors || ""
        item.allergy1 = resData.allergy1;
        item.allergy2 = resData.allergy2;
        item.drugGms = resData.drugGms;
        this.modalLoading = false;
        await this.$set(this.list,index,item)
      });
      multiDictInfo(["床头卡饮食"]).then(res => {
        this.ysList = res.data.data.床头卡饮食.map(item => item.name);
      });
    },
    getRegistCare(item) {
      let data = [];
      if (item.nursingClass == "特级护理") {
        data.push("特");
      }
      if (item.nursingClass == "一级护理") {
        data.push("一");
      }
      if (item.nursingClass == "二级护理") {
        data.push("二");
      }
      if (item.nursingClass == "三级护理") {
        data.push("三");
      }
      if (item.patientCondition == "普通") {
        data.push("普");
      }
      if (item.patientCondition == "病危") {
        data.push("危");
      }
      if (item.patientCondition == "病重") {
        data.push("重");
      }
      return data;
    },
    open(printMode = "h",list) {
      this.list = list;
      this.init();
      this.printMode = printMode;
      this.list.forEach(async(item,index)=>{
        let qr_png_value = item.patientId + "|" + item.visitId;
        let qr_png = qr.imageSync(qr_png_value, { type: "png" });
        // var qr_png = qr.imageSync(this.query.patientId, { type: "png" });
        function arrayBufferToBase64(buffer) {
          let binary = "";
          let bytes = new Uint8Array(buffer);
          let len = bytes.byteLength;
          for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return "data:image/png;base64," + window.btoa(binary);
        }
        let base64 = arrayBufferToBase64(qr_png);
        await this.$set(this.qrCode,index,base64)
        await this.$set(this.qrCodeNum,index,item.patientId)
      })
      if (this.printMode == "wrist") {
        this.title = "腕带打印";
      } else if (this.printMode == "v") {
        this.title = "打印床头卡";
      } else {
        this.title = "编辑床头卡";
      }
      setTimeout(()=>{
        this.$refs.modal.open();
      },1)
    },
    close() {
      this.$refs.modal.close();
    },
    selectRegistCare(item,index) {
      if (this.list[index].formData.registCare.includes(item)) {
        this.list[index].formData.registCare.remove(item);
        this.$set(this.list,index,this.list[index])
      } else {
        this.list[index].formData.registCare.push(item);
        this.$set(this.list,index,this.list[index])
      }
    },
    post() {
      this.list.map(item=>{
        let data = {};
        data.name = item.name;
        data.sex = item.sex;
        data.patientId = item.patientId;
        data.visitId = item.visitId;
        data.diet = item.formData.diet;
        data.registCare = item.formData.registCare.join(",");
        data.mainDoctors = item.formData.mainDoctors;
        data.dutyNurses = item.formData.dutyNurses;
        data.remarkPrint = item.formData.remarkPrint;
        data.remark = item.formData.remark.slice(0, 24);

        saveBed(data).then(res => {
          this.$message.success("保存成功");
          this.close();
        });
      })
    },
    onPrint() {
      this.$nextTick(() => {
        this.post();
        if (this.printMode == "wrist") {
          printing(this.$refs.printCon3, {
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: `
          .bed-card-warpper {
            box-shadow: none !important;
            transform: rotate(90deg) translateY(-120%) translateX(15%);
            transform-origin: 0 0;
          }
          .bed-card-vert-con {
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
            transform:scaleX(1) scaleY(1) translateY(0%) translateX(20%);
            width:560px;
            display:flex!important;
            flex-wrap:wrap;
          }
          .bed-card-vert-con{
            margin:0px!important;
          }
          .bed-card-vert-con.nextpage{
            margin-bottom:100px!important;
          }
          .bed-card-vert-con.firstpage{
            margin-top:100px!important;
          }
          @page {
            margin: 100px 40px;
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
              transform:translate(50px,0);
              display:flex!important;
              flex-wrap:wrap;
              width:29cm;
            }
            .bed-card-con{
              margin:0!important;
            }
            .bed-card-con.firstpage{
              margin-top:105px!important;
            }
            .bed-card-con.nextpage{
              margin-bottom:105px!important;
            }
            .huadu-bigname{
              position:relative!important;
              top:15px!important;
            }
            @page {
              margin: 1px 30px 0;
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
      let { autoComplete, obj, key} = bind;
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
        this.list=JSON.parse(JSON.stringify(this.list))
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
