<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{sheetInfo.relObj}} -->
    <div class="info-con">
      <span>
        科室：
        <div class="bottom-line" style="min-width: 120px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        年龄：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span>
        性别：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.sex }}
        </div>
      </span>

      <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 60px">
          {{ patientInfo.patientId }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'clinical_sn'">
        体重：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.weight }}
        </div>
        kg</span
      >
      <span>
        入院日期：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.admissionDate | toymd }}
        </div>
      </span>
      <span>
        诊断：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.diagnosis }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'maternity_sn'">
        术后诊断：
        <input
          class="bottom-line"
          style="width: 180px"
          v-model="relObj.shzd"
          :data-value="relObj.shzd"
        />
      </span>
      <span v-if="sheetInfo.sheetType === 'postpartum_sn'">
        产后观察记录：产后2小时总出血
        <input
          class="bottom-line"
          style="width: 50px"
          v-model="relObj.ch2hzcx"
          :data-value="relObj.ch2hzcx"
        />ml
      </span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      sheetInfo,
      relObj: sheetInfo.relObj
    };
  },
  mounted() {},
  methods: {},
  filters: {
    toymd(val) {
      return moment(val).format("YYYY年MM月DD日");
    }
  },
  created() {
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }
  },
  watch: {},
  components: {}
};
</script>

<style lang="scss" scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
}
</style>
