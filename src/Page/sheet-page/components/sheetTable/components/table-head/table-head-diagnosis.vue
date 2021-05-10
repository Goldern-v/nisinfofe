<template>
  <div class="header-con">
    <div class="his-name">{{HOSPITAL_NAME_SPACE}}</div>
    <div class="title">{{patientInfo.recordName}}</div>
    <div class="info-con" flex="main:justify">
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 45px">{{patientInfo.bedLabel}}</div>
      </span>
      <span @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.patientName}}</div>
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
        住院号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        诊断：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.diagnosis}}</div>
      </span>
      <!-- <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断：
        <div
          class="bottom-line"
          style="min-width: 150px;max-width: 620px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
        >{{diagnosis}}</div>
      </span> -->
      
      <!-- <span>入院时间：{{patientInfo.admissionDate | toymd}}</span> -->
      <!-- {{index}} {{relObj}} -->
    </div>
    <!-- <span class="diagnosis-con" :title="patientInfo.diagnosis">诊断：{{patientInfo.diagnosis}}</span> -->
    <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import bus from "vue-happy-bus";
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      relObj: sheetInfo.relObj
    };
  },
  computed: {
    diagnosis() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(this.relObj || {});
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
        (this.relObj || {})[`PageIndex_diagnosis_${realIndex}`] ||
        this.patientInfo.diagnosis
      );
    }
  },
  methods: {
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
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        text => {
          this.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.sheetInfo.relObj = { ...this.relObj };
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    }
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  },
  components: {},
  created() {
    console.log(this.patientInfo, '1111111111')

  }
};
</script>

<style lang='scss' scoped>
.header-con {
  .info-con {
    > span {
      height: 23px;
      line-height: 23px;
      > div {
        height: 23px;
        vertical-align: bottom;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
  }
}
</style>
