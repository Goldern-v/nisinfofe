<template>
  <div class="header-con">
    <div class="his-name" style="display: flex; justify-content: space-between;">
      <!-- {{ HOSPITAL_NAME_SPACE }} -->
      <div> <img src="./images/whyx_logo.png" alt="" height="45" width="300" /></div>
      <div style="font-weight: 900;">{{selectCode}}</div>
    </div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
     <div class="info-con" flex="main:justify" >
      <span>
        科别：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.patientName }}
        </div>
      </span>
       <span >
        性别：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.sex }}
        </div>
      </span>
       <span v-if="sheetInfo.sheetType=='common_yx'||sheetInfo.sheetType=='icu_yx'">
        年龄：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span>
        出生日期：
        <div @click="updateBirthDay" class="bottom-line" style="min-width: 120px;height: 12px;">
          {{ patientInfo.birthday | toymd }}
        </div>
      </span>
      <span >
        入院日期：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.admissionDate | toymd}}
        </div>
      </span>
      <span>
        病案号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
    </div>
    <!-- <div class="info-con" flex="main:justify" >
      <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断：
        <div
          class="bottom-line"
          style="
            width: 1000px;
            height: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
    </div> -->
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
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
    };
  },
  mounted() {},
  computed: {
    ...{
      'checkedsc':{
        get(){
          return this.sheetInfo.relObj[`sc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`sc`] = nVal ? "true" : "false"
        }
      },
      'checkedpgc':{
        get(){
          return this.sheetInfo.relObj[`pgc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`pgc`] = nVal ? "true" : "false"
        }
      },
      'checkedfyc':{
        get(){
          return this.sheetInfo.relObj[`fyc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`fyc`] = nVal ? "true" : "false"
        }
      },
      'checkedqc':{
        get(){
          return this.sheetInfo.relObj[`qc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`qc`] = nVal ? "true" : "false"
        }
      },
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
        this.patientInfo.laborTime
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
        this.patientInfo.deliveryTime
      );
    },
    selectCode(){
      switch (sheetInfo.sheetType) {
        case 'common_yx':
          return 'QR-1600-043B';
        case 'neonatology_yx' :
          return 'QR-1600-096A';
          // default:
          // retrun "";
      }
    }
  },
  methods: {
    openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      this.$refs.bedRecordModal.open();
    },
    updateBirthDay() {
      window.openSetAuditDateModal(
        date => {
          updateSheetHeadInfo({ birthday: date }).then(res => {
            this.patientInfo.birthday = res.data.data.birthday;
            this.$message.success("修改出生日期成功");
          });
        },
        this.patientInfo.birthday,
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
        return moment(val).format("YYYY年MM月DD日HH时mm分");
      }
    }
  },
  watch: {},
  components: {
    bedRecordModal,
  },
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
  height: 18px;
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
</style>
