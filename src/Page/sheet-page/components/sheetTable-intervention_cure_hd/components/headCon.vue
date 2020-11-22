<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <div class="info-con">
      <span>
        姓名：
        <div
          class="bottom-line"
          style="min-width: 60px"
          @click="
            updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)
          "
        >
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        性别：
        <div
          class="bottom-line"
          style="min-width: 30px"
          @click="updateTetxInfo('sex', '性别', patientInfo.sex)"
        >
          {{ patientInfo.sex }}
        </div>
      </span>
      <span>
        年龄：
        <div
          class="bottom-line"
          style="min-width: 50px"
          @click="updateTetxInfo('age', '年龄', patientInfo.age)"
        >
          {{ patientInfo.age }}
        </div>
      </span>
      <span>
        科室：
        <div
          class="bottom-line"
          style="min-width: 50px"
          @click="updateTetxInfo('deptName', '科室', patientInfo.deptName)"
        >
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span
        @click="updateTetxInfo('patientId', '住院号', patientInfo.patientId)"
      >
        住院号：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.patientId }}
        </div>
      </span>
    </div>
  </div>
</template>
<script>
import bus from "vue-happy-bus";
import sheetInfo from "../../config/sheetInfo";
import commom from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../api/index";
export default {
  data() {
    return {
      bus: bus(this),
      sheetInfo
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
    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    }
  }
};
</script>
<style lang="stylus" scoped>
.header-con {
  text-align: center;
  border-bottom: 1px solid #000;

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
    margin-right: 0px;
    font-size: 14px;
    color: #000;
  }

  .info-con {
    margin: 8px 0;
    text-align: left;
  }
}
</style>