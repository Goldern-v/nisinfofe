<template>
  <div class="header-con">
    <div class="his-name">{{HOSPITAL_NAME_SPACE}}</div>
    <div class="title">{{patientInfo.recordName}}</div>
    <div class="info-con" flex="main:justify">
      <span>
        科室：
        <div class="bottom-line" style="min-width: 120px">{{patientInfo.deptName}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
      <span @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)">
        姓名：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.patientName}}</div>
      </span>
      <span>
        性别：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.sex}}</div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.age}}</div>
      </span>
      <span>
        诊断：
        <div class="bottom-line" style="min-width: 200px">{{patientInfo.diagnosis}}</div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        入院时间：
        {{patientInfo.admissionDate | toymd}}
      </span>
    </div>
    <!-- <span class="diagnosis-con" :title="patientInfo.diagnosis">诊断：{{patientInfo.diagnosis}}</span> -->
    <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo } from "../../../../api/index";
export default {
  props: {
    patientInfo: Object
  },
  data() {
    return {};
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
  components: {}
};
</script>

<style lang='scss' scoped>
</style>
