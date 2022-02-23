<template>
  <div :class="['header-con',sheetInfo.sheetType === 'common_wj'?'wujing-big-title':'']">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <template v-if="sheetInfo.sheetType=='magnesium_lcey'">
      <div class="info-con" flex="main:justify">
      <span>
        科别：
        <div class="bottom-line" style="min-width: 115px">{{patientInfo.deptName}}</div>
      </span>
       <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 45px">{{patientInfo.bedLabel}}</div>
      </span>
       <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 65px">{{patientInfo.patientName}}</div>
      </span>
       <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 45px">{{patientInfo.sex}}</div>
      </span>
       <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 45px">{{patientInfo.age}}</div>
      </span>
       <span>
        病案号：
        <div class="bottom-line" style="min-width: 75px">{{patientInfo.inpNo}}</div>
      </span>
      </div>
      <div class="info-con" flex="main:justify" >
        <span
          @click="updateRelObj('Parity', '胎次',Parity)"
        >
         胎次：
        <div class="bottom-line" style="min-width: 45px">{{ Parity }}</div>
        </span>
        <span
          @click="updateRelObj('gestationalWeek', '孕周',gestationalWeek)"
        >
          孕周：
          <div class="bottom-line" style="min-width: 75px">
            {{ gestationalWeek }}
          </div>
        </span>
      </div>
    </template>
      <template v-else-if="sheetInfo.sheetType=='maternal_lcey'||sheetInfo.sheetType=='cardiac_lcey'">
      <div class="info-con" flex="main:justify">
      <span>
        科别：
        <div class="bottom-line" style="min-width: 115px">{{patientInfo.deptName}}</div>
      </span>
       <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 45px">{{patientInfo.bedLabel}}</div>
      </span>
       <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 65px">{{patientInfo.patientName}}</div>
      </span>
       <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 45px">{{patientInfo.age}}</div>
      </span>
       <span>
        病案号：
        <div class="bottom-line" style="min-width: 75px">{{patientInfo.inpNo}}</div>
      </span>
      <template v-if="sheetInfo.sheetType=='maternal_lcey'">
         <span
          @click="updateRelObj('Parity', '胎次',Parity)"
        >
         胎次：
        <div class="bottom-line" style="min-width: 45px">{{ Parity }}</div>
        </span>
        <span
          @click="updateRelObj('deliveryTime', '分娩时间',deliveryTime)"
        >
         分娩时间：
        <div class="bottom-line" style="min-width: 100px">{{ deliveryTime }}</div>
        </span>
      </template>
      </div>
    </template>
    <template v-else>
      <div class="info-con" flex="main:justify">
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        病人姓名：
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.sex}}</div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)" >
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 120px">{{patientInfo.deptName}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
      <span>
        住院号/ID号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        入院日期：
        {{patientInfo.admissionDate | toymd}}
      </span>
    </div>
    </template>
    
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import bus from "vue-happy-bus";
import crDatePicker from '@/components/cr-date-picker/cr-date-pickerV2.vue';
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
    };
  },
  computed: {
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
      let result = (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] || this.patientInfo.diagnosis
      return result;
    },
    processedDiagnosis(){
      let strArr = this.diagnosis.split('')
      let arr = []
      let text = ''
      strArr.map(str=>{
        if(this.GetLength(text + str)>158){
          arr.push(text)
          text = str
        }else{
          text += str
        }
      })
      arr.push(text)
      text = ''
      return arr
    },
    Parity(){
      return   this.patientInfo.relObj.Parity? this.patientInfo.relObj.Parity:""
    },
    gestationalWeek(){
       return   this.patientInfo.relObj.gestationalWeek? this.patientInfo.relObj.gestationalWeek:""
    },
    deliveryTime(){
       return   this.patientInfo.relObj.deliveryTime? this.patientInfo.relObj.deliveryTime:""
    }
  },
  methods: {
    GetLength(str) {
      var realLength = 0,
        len = str.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    },
    updateBirthDay() {
      window.openSetAuditDateModal(
        date => {
          updateSheetHeadInfo({ birthday: date }).then(res => {
            this.patientInfo.birthday = res.data.data.birthday;
          });
        },
        this.patientInfo.birthday,
        "修改出生日期"
      );
    },
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
    updateRelObj(key, label, autoText) {
      window.openSetTextModal(
        text => {
          sheetInfo.relObj[key] = text;
          this.$message.success(`修改${label}成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        autoText,
        `修改${label}`
      );
    }
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  },
  destroyed() {},
  components: { crDatePicker }
};
</script>

<style lang='scss' scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
}
</style>
