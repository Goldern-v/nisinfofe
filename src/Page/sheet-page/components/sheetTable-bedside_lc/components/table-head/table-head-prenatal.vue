<template>
  <div class="header-con">
    <div class="his-name">{{HOSPITAL_NAME_SPACE}}</div>
    <div class="title">{{patientInfo.recordName}}</div>
    <div class="info-con" flex="main:justify">
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        病人姓名：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.sex}}</div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span>
        孕/产次：
        <input
          class="bottom-line-input"
          :data-value="sheetInfo.relObj['yyc_' + index]"
          v-model="sheetInfo.relObj['yyc_' + index]"
        />
      </span>
      <span>
        孕周：
        <input
          class="bottom-line-input"
          :data-value="sheetInfo.relObj['yz_' + index]"
          v-model="sheetInfo.relObj['yz_' + index]"
        />
        周
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
    <!-- <span class="diagnosis-con" :title="patientInfo.diagnosis">诊断：{{patientInfo.diagnosis}}</span> -->
    <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
  </div>
</template>

<script>
import moment from "moment";
import sheetInfo from "../../../config/sheetInfo/index";
import $ from "jquery";
import { updateSheetHeadInfo } from "../../../../api/index";
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      sheetInfo
    };
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
    }
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY年MM月");
    }
  },
  created() {
    if (!this.sheetInfo.relObj["yyc_" + this.index] && this.index !== 0) {
      this.sheetInfo.relObj = {
        ...{
          ["yyc_" + this.index]: this.sheetInfo.relObj[
            "yyc_" + (this.index - 1)
          ]
        },
        ...this.sheetInfo.relObj
      };
    }
    if (!this.sheetInfo.relObj["yz_" + this.index] && this.index !== 0) {
      this.sheetInfo.relObj = {
        ...{
          ["yz_" + this.index]: this.sheetInfo.relObj["yz_" + (this.index - 1)]
        },
        ...this.sheetInfo.relObj
      };
    }
  },
  components: {}
};
</script>

<style lang='scss' scoped>
</style>
