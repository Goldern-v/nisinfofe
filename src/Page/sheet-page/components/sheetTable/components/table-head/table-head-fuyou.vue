<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <div class="info-con">
      <span>
        病区：
        <div class="bottom-line" style="min-width: 70px">
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
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        性别：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.sex }}
        </div>
      </span>
      <span>
        年龄：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.age }}
        </div>
      </span>

      <!-- <span>
        科室：
        <div class="bottom-line" style="min-width: 120px">
          {{ patientInfo.deptName }}
        </div>
      </span> -->
      <!-- <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <!-- <span>
        入院日期：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.admissionDate | toymd }}
        </div>
      </span> -->
    </div>
    <div class="info-con">
      <span v-if="
              sheetInfo.sheetType === 'antenatalwaiting_jm' || 
              sheetInfo.sheetType === 'breastkenursing_jm' ||
              sheetInfo.sheetType === 'obstetricnursing_jm'
      ">
        入院诊断：
        <div class="bottom-line" style="min-width: 650px">
          {{ patientInfo.diagnosis }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'postpartumnursing_jm'">
        分娩方式：
        <input class="radio" type="radio" name="radios" :value="i" v-model="radio" />阴道产
        <input class="radio" type="radio" name="radios" :value="i" v-model="radio" />剖宫产
      </span>
      <span v-if="sheetInfo.sheetType === 'postpartumnursing_jm'" class="ml-1000">
        分娩日期：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.createTime | toymd }}
        </div>
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
    index: Number,
    bedAndDeptChange: Object,
  },
  data() {
    return {
      sheetInfo,
    };
  },
  mounted() {},
  methods: {},
  filters: {
    toymd(val) {
      return moment(val).format("YYYY年MM月DD日");
    },
  },
  created() {
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }
  },
  watch: {},
  components: {},
};
</script>

<style lang="scss" scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
}
.ml-1000 {
  margin-left: 1000px;
}
</style>
