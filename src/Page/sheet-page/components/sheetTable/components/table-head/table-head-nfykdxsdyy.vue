<template>
  <div class="header-con">
    <div class="his-name">
      <img src='./images/hospital-name.png'
         height="60"
          width="300"/>

    </div>
    <div class="title">{{patientInfo.recordName}}</div>
    <!-- {{sheetInfo.relObj}} -->
    <div v-if="sheetInfo.sheetType === 'contraction_inhibitor_sdry'||sheetInfo.sheetType === 'magnesiumsulphate_sdry'">
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
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
      <span>
        住院号:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.inpNo}}</div>
      </span>
      <!-- <span>
        诊断:
        <div  class="bottom-line" style="min-width: 163px">{{patientInfo.diagnosis}}</div>
      </span> -->
      <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断：
        <div
          class="bottom-line"
          style="
            width: 163px;
            height: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
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
    </div>
  <div v-else>
    <div class="info-con">
     <span>
        科室:
        <div class="bottom-line" style="min-width: 400px">{{patientInfo.realDeptName}}</div>
      </span>
      <span>
        病区:
        <div class="bottom-line" style="min-width: 135px">{{patientInfo.deptName}}</div>
      </span>
      </div>
    <div class="info-con" >
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名:
        <div class="bottom-line" style="min-width: 65px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别:
        <div class="bottom-line" style="min-width: 30px">{{patientInfo.sex}}</div>
      </span>
      <!-- <span @click="updateNeonatology2Age" v-if="sheetInfo.sheetType == 'neonatology2'">
        年龄:
        <div class="bottom-line" style="min-width: 50px">{{neonatology2Age}}</div>
      </span> -->
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄:
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号:
        <div class="bottom-line" style="min-width: 90px">{{patientInfo.bedLabel}}</div>
      </span>
      <span>
        住院号:
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <!-- <span>
        诊断:
        <div  class="bottom-line" style="min-width: 480px">{{patientInfo.diagnosis}}</div>
      </span> -->
      <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断：
        <div
          class="bottom-line"
          style="
            width: 480px;
            height: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
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
  </div>
    <!-- <span>入院日期:{{$route.query.admissionDate}}</span> -->
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo,getDeliveryInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import bedRecordModal from "../../../modal/bedRecord-modal";
import { saveBody }  from  "@/api/sheet.js"
export default {
  props: {
    patientInfo: Object,
    index: Number,
    bedAndDeptChange: Object,
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      //不需要入院日期的表单
      admissionDateList: [
        'blood_tj',
        'generalnursing_tj'
      ],
      //不需要诊断的表单
      diagnosisList: [
        'postpartum2_tj',
        'prenataldelivery2_tj',
        'pediatric3_tj',
        'baby_tj',
        'blood_tj'
      ],
    };
  },
  mounted() {},
  computed: {
    ...{


      'checkedbzc':{
        get(){
          return this.sheetInfo.relObj[`bzc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`bzc`] = nVal ? "true" : "false"
        },
      },
      newPatientInfo() {
        /*  每页独立床号功能 */
        let beforeBed = this.patientInfo.bedLabel
        let nowBed = this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`]
        if (this.index != 0 && this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index - 1}`]) {
          // 除了第一页，其他页数。先拿bedLabel，如果上一页也有床位那就拿就拿上一页的
          beforeBed = this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index - 1}`]
        }
        return {
          ...this.patientInfo,
          [`bedLabel_${this.index}_${this.sheetInfo.selectBlock.id}`]: nowBed ? nowBed : beforeBed,
        }
      }
    },
    diagnosis() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_diagnosis_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] ||
        this.patientInfo.diagnosis
      );
    },
    childbirth() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_childbirth_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_childbirth_${realIndex}`] ||
        this.patientInfo.childbirth
      );
    },
    birthday() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_birthday_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_birthday_${realIndex}`]
      );
    },
    laborTime() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("laborTime");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`laborTime`] ||
        (this.patientInfo.laborTime == undefined ? '/' : this.patientInfo.laborTime )
      );
    },
    deliveryTime() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("deliveryTime");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`deliveryTime`] ||
        (this.patientInfo.deliveryTime == undefined ?'/':this.patientInfo.deliveryTime)
      );
    },
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
    // 修改时间方法
    updateTime(key, label, autoText) {
      window.openSetAuditDateModal(
        (text) => {
          updateSheetHeadInfo({ [key]: text }).then(res => {
            this.patientInfo[key] = res.data.data[key];
            this.$message.success(`修改${label}成功`);
          });
        },
        autoText,
        `修改${label}`
      );
    },
    openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      // 把当前页护记的页码存入,用于每一页床号的自定义
      this.$refs.bedRecordModal.open('',this.index);
    },
    updateBirthDay() {
      window.openSetAuditDateModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_birthday_${this.index}`] = text;
          this.$message.success(`修改出生日期成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.birthday,
        "修改出生日期"
      );
    },
    updateChildbirth() {
      window.openSetAuditDateModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_childbirth_${this.index}`] = text;
          this.$message.success(`修改分娩时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.childbirth,
        `修改分娩时间`
      );
    },
    updateLaborTime() {
      window.openSetAuditDateModal(
        (text) => {
          sheetInfo.relObj[`laborTime`] = text;
          this.$message.success(`修改产程开始时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.laborTime,
        `修改产程开始时间`
      );
    },
    updateDeliveryTime() {
      window.openSetAuditDateModal(
        (text) => {
          sheetInfo.relObj[`deliveryTime`] = text;
          this.$message.success(`修改胎儿娩出时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.deliveryTime,
        `修改胎儿娩出时间`
      );
    },
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    },
  },
  filters: {
    toymd(val) {
      if(val){
        return moment(val).format("YYYY年MM月DD日");
      }
    },
    YMDHM(val) {
      if(val){
        console.log(moment(val).format())
        return moment(val).format("YYYY年MM月DD日HH时mm分");
      }
    }

  },
  components: {
    bedRecordModal,
  },
  created(){
    if(this.index!=0){
      this.sheetInfo.relObj[`${this.index}pregnantWeeks`] = this.sheetInfo.relObj[`${this.index}pregnantWeeks`]?this.sheetInfo.relObj[`${this.index}pregnantWeeks`]: this.sheetInfo.relObj[`${this.index-1}pregnantWeeks`]
    }
  }
};
</script>

<style lang="scss" scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
  height: 12px;
}
.ml-1000 {
  margin-left: 850px;
}
.info-con_new{
  display: flex;
  justify-content: center;
}
.boxLine {
  height: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size:14px;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  border: 1px solid #000;
  border-radius: 0px;
  outline: none;
  margin: 0 5px;
  cursor: pointer;
}

input[type='checkbox']:checked {
  font-size: 10;
  position: relative;
}

input[type='checkbox']:checked:before {
  content: '';
  width: 8px;
  transform: rotate(45deg);
  position: absolute;
  top: 7px;
  left: -2px;
  border-top: 2px solid blue;
}

input[type='checkbox']:checked:after {
  content: '';
  width: 14px;
  transform: rotate(-50deg) translateY(-50%) translateX(50%);
  position: absolute;
  border-top: 2px solid blue;
  top: 10px;
  left: -2px;
}
input {
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  text-align: center;
}
</style>
