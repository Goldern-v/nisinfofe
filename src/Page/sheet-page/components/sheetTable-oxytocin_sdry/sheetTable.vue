<template>
  <div>
    <div class="contant sheetTable-oxytocin" :style="data.titleModel.style" :class="{readOnly}">
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <img src="../../images/仅供查阅.jpg" class="readOnly-img no-print" v-if="readOnly" alt />
      <div class="header-con">
        <div class="his-name">
      <img src='./images/hospital-name.png'
         height="60"
          width="300"/>

    </div>
    <div class="title">{{patientInfo.recordName}}</div>
        <div class="info-con">
     <span>
        科室:
        <div class="bottom-line" style="min-width: 266px">{{patientInfo.realDeptName}}</div>
      </span>
      <span>
        病区:
        <div class="bottom-line" style="min-width: 135px">{{patientInfo.deptName}}</div>
      </span>
      </div>
    <div class="info-con" >
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别:
        <div class="bottom-line" style="min-width: 35px">{{patientInfo.sex}}</div>
      </span>
      <!-- <span @click="updateNeonatology2Age" v-if="sheetInfo.sheetType == 'neonatology2'">
        年龄:
        <div class="bottom-line" style="min-width: 50px">{{neonatology2Age}}</div>
      </span> -->
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄:
        <div class="bottom-line" style="min-width: 40px">{{patientInfo.age}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号:
        <div class="bottom-line" style="min-width: 55px">{{patientInfo.bedLabel}}</div>
      </span>
      <span>
        住院号:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.inpNo}}</div>
      </span>
      <!-- <span>
        ID号:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientId}}</div>
      </span> -->
      <!-- <span v-if="sheetInfo.sheetType == 'neonatology2'">
        温箱编号:
        <input
          class="bottom-line"
          style="width: 30px"
          @focus="onFocusToAutoComplete($event)"
          @blur="onBlurToAutoComplete"
          v-model="relObj.wxNo"
        />
      </span>-->
      <!-- <span>
        入院日期:
        {{patientInfo.admissionDate | toymd}}
      </span> -->
     </div>
     <div class="info">
      <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断:
        <div  class="bottom-line" style="min-width: 163px">{{diagnosis}}</div>
      </span>
     </div>
      </div>
      <headCon v-if="isFirst"></headCon>
      <excel
        :data="data"
        :index="index"
        :length="length"
        :scrollY="scrollY"
        :hasFiexHeader="true"
        :isInPatientDetails="isInPatientDetails"
         @onModalChange="(e,tr,x,y,index)=>$emit('onModalChange',e,tr,x,y,index)"
      ></excel>
      <div class="bottomCon">
        <div class="showModal showModal2">
          催产素使用总量：
          <input
            v-if="sheetInfo.sheetType==='oxytocin_dglb'  "
            type="text"
            class="bottomInput bottom-line"
            :data-value="sheetInfo.relObj[index+'totalOxytocin'] "
            v-model="sheetInfo.relObj[index+'totalOxytocin']"
            @focus="onFocus($event,'totalOxytocin')"
            @blur="onBlur($event,'totalOxytocin')"
          />
          <input
            v-else
            type="text"
            class="bottomInput bottom-line"
            :data-value="sheetInfo.relObj[`totalOxytocin${suffix}`]"
            v-model="sheetInfo.relObj[`totalOxytocin${suffix}`]"
            @focus="onFocus($event,'totalOxytocin')"
            @blur="onBlur($event,'totalOxytocin')"
          />
          <ul v-if="showModal2 && totalOxytocin && totalOxytocin.length">
            <li
              v-for="item in totalOxytocin"
              :key="item"
              :class="{active: sheetInfo.relObj.totalOxytocin == item}"
              @click="selectedItem(item, 'totalOxytocin' + suffix)"
            >{{item}}</li>
          </ul>
        </div>
        <div class="showModal">
          分娩方式：
           <input
            v-if=" sheetInfo.sheetType==='oxytocin_dglb'||sheetInfo.sheetType==='oxytocin_sdry' "
            type="text"
            class="bottomInput bottom-line"
            :data-value="sheetInfo.relObj[index+'deliveryWay']"
            v-model="sheetInfo.relObj[index+'deliveryWay']"
            @change="updateDeliveryWay($event)"
          />
          <input
            v-else
            type="text"
            class="bottomInput bottom-line"
            :data-value="sheetInfo.relObj.deliveryWay"
            v-model="sheetInfo.relObj.deliveryWay"
            @focus="onFocus($event)"
            @blur="onBlur($event)"
          />
          <ul v-if="showModal && deliveryWay && deliveryWay.length">
            <li
              v-for="item in deliveryWay"
              :key="item"
              :class="{active: sheetInfo.relObj.deliveryWay == item}"
              @click="selectedItem(item)"
            >{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheetTable-oxytocin {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 800px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    position: relative;
  }

  .header-con {

    .his-name {
      font-size: 18px;
      padding: 0 0px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    .title {
      font-size: 21px;
      padding: 5px 0 5px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    span {
      margin-right: 4px;
      font-size: 14px;
      color: #000;
    }

    .info-con {
      margin: 8px 0;
      text-align: left;
    }
  }

  .add-btn {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .his-logo {
    position: absolute;
    left: 21px;
    top: 21px;
    height: 44px;
  }

  .diagnosis-con {
    max-width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.readOnly {
    pointer-events: none;
  }

  .readOnly-img {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .bottom-line {
    display: inline-block;
    // border-bottom 1px solid #000
    padding: 2px 0 2px 2px;
    // border-bottom: 1px solid #000 !important;
  }

  .bottomCon {
    position: relative;
    bottom: 55px;
    display: flex;
    justify-content: space-between;
    // transform translateY(-30px)
    // margin-top:-80px;
    width: 100%;
    font-size: 14px;

    .bottomInput {
      border: none;
      outline: none;
      font-size: 14px;
      width: 80px;
    }
  }

  .table-footer {
    margin-top: 60px !important;
  }

  .bottom-line-input {
    display: inline-block;
    border: 0;
    width: 30px;
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 2px;
    height: 12px;
    position: relative;
    outline: none;
    text-align: center;
  }

  .showModal {
    position: relative;

    .bottomInput {
      width: 200px;
    }

    ul {
      z-index: 1000;
      width: 120px;
      position: absolute;
      bottom: 27px;
      left: 80px;
      max-height: 280px;
      overflow: auto;
      background-color: #fff;
      border-radius: 2px;
      border: 1px solid #eee;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }

    li {
      list-style: none;
      line-height: 36px;
      padding: 0 10px;
      margin: 0;
      cursor: pointer;
      color: rgb(72, 106, 98);
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:hover, &.active {
        background-color: rgb(228, 241, 240);
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .showModal2 {
    ul {
      left: 120px;
    }
  }
}
</style>
<script>
// import excel from "./components/excel/excel.vue";
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import headCon from "./components/headCon/headCon";
import { updateSheetHeadInfo } from "../../api/index";
import { multiDictInfo } from "../../api/index";
import { getLastDetail } from "./api/index";
import { queryDianosisList } from "@/api/sheet.js";
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}

export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    isFirst: Boolean /** 首页 */,
    scrollY: Number,
    isInPatientDetails: Boolean
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      deliveryWay: [], //分娩方式
      showModal: false,
      totalOxytocin: [], //催产素总量
      showModal2: false
    };
  },
  methods: {
    updateTetxInfo(key, label, autoText) {
      window.openSetTextModal(
        text => {
          updateSheetHeadInfo({ [key]: text }).then(res => {
            this.patientInfo[key] = res.data.data[key];
            this.$message.success(`修改${label}成功`);
          });
        },
        autoText,
        `修改${label}`
      );
    },
    getData() {
      let list = ["分娩方式", "催产素总量"];
      multiDictInfo(list).then(res => {
        let data = res.data.data;
        setList(this.deliveryWay, "分娩方式", data);
        setList(this.totalOxytocin, "催产素总量", data);
      });
    },
    onFocus(e, type) {
      if (sheetInfo.model == "print") return;
      if (type == "totalOxytocin") {
        this.showModal2 = true;
      } else {
        this.showModal = true;
      }
    },
    onBlur(e, type) {
      if (sheetInfo.model == "print") return;

      if (type == "totalOxytocin") {
        let timeId = setTimeout(() => {
          clearTimeout(timeId);
          this.showModal2 = false;
        }, 400);
      } else {
        let timeId = setTimeout(() => {
          clearTimeout(timeId);
          this.showModal = false;
        }, 400);
      }
    },
    selectedItem(val, type) {
      if (type == "totalOxytocin" + this.suffix) {
        console.log('Total', val)
        sheetInfo.relObj[`totalOxytocin${this.suffix}`] = val;
        this.showModal2 = false;
      } else {
        sheetInfo.relObj.deliveryWay = val;
        this.showModal = false;
      }
    },
    // 获取最新一次评估单信息
    getDetail() {
      let data = {
        formCode: "form_borndept_first",
        patientId: this.$route.params.patientId,
        visitId: this.$route.params.visitId
      };
      getLastDetail(data).then(res => {
        if (res.data.data && res.data.data.pageMap) {
          let data = res.data.data.pageMap;
          // 孕
          let ycs_y = data.form_borndept_first_ycs_y || "";
          // 产
          let ycs_c = data.form_borndept_first_ycs_c || "";
          // 孕/产
          if (ycs_y || ycs_c) {
            this.$set(
              this.sheetInfo.relObj,
              "yyc_" + this.index,
              ycs_y + "/" + ycs_c
            );
          }
        }
      });
    },
    async setDiagnosis() {
      if (!this.sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`]) {
        try {
          const res = await queryDianosisList({
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId
          });
          const data = res.data.data || [];
          if (data.length) {
            this.$set(
              this.sheetInfo.relObj,
              `PageIndex_diagnosis_${this.index}`,
              data[0].diagnosisDesc
            );
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        text => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    },
    updateDeliveryWay(e) {
      this.sheetInfo.relObj[this.index+'deliveryWay'] = e.target.value;
    },
    isDeliveryWay(){

    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.masterInfo || {};
    },
    diagnosis() {
      return (
        (sheetInfo.relObj || {})[`PageIndex_diagnosis_${this.index}`] ||
        this.patientInfo.diagnosis
      );
    },
    suffix() {
      return this.index === 0 ? '' : this.index;
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    }
  },
  watch:{
    "patientInfo.patientId"() {
      this.setDiagnosis();
    }
  },
  created() {
    this.setDiagnosis();
  },
  update() {},
  mounted() {
    // 获取分娩方式
    this.getData();
    if (this.sheetInfo.relObj && !this.sheetInfo.relObj["yyc_" + this.index]) {
      this.getDetail();
    }
    if(this.sheetInfo.sheetType==='oxytocin_sdry'  &&this.index!=0){
      // 催产素使用总量
      if(!this.sheetInfo.relObj[`${this.index}totalOxytocin`]){
         this.sheetInfo.relObj[`${this.index}totalOxytocin`]= this.sheetInfo.relObj[`${this.index-1}totalOxytocin`]
      }
      // 分娩方式     sheetInfo.relObj[index+'deliveryWay']
      // if(!this.sheetInfo.relObj[`${this.index}deliveryWay`]){
      //    this.sheetInfo.relObj[`${this.index}deliveryWay`]= this.sheetInfo.relObj[`${this.index-1}deliveryWay`]
      // }
    }
    if(this.sheetInfo.relObj['deliveryWay']){
      this.sheetInfo.relObj[this.index+'deliveryWay'] =  this.sheetInfo.relObj['deliveryWay']
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    headCon
  }
};
</script>
