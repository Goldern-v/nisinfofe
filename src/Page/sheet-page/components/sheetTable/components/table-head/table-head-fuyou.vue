<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <div class="info-con">
      <span>
        科室：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.realDeptName }}
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
      <span v-if="sheetInfo.sheetType === 'pediatric_surgery_jm'"
              @click="updateDiagnosis('diagnosis', '入院诊断', patientInfo.diagnosis)"
      >
        入院诊断：
        <div
          class="bottom-line"
          style="
            min-width: 400px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'neonatal_care_jm'">
        入院时间：
        <div class="bottom-line" style="min-width: 150px">
          {{ patientInfo.admissionDate }}
        </div>
      </span>
    </div>
    <div class="info-con">
      <span v-if="
              sheetInfo.sheetType === 'antenatalwaiting_jm' || 
              sheetInfo.sheetType === 'breastkenursing_jm' ||
              sheetInfo.sheetType === 'obstetricnursing_jm' ||
              sheetInfo.sheetType === 'entdepartment_jm' ||
              sheetInfo.sheetType === 'gynaecology_jm' ||
              sheetInfo.sheetType === 'generalsurgery_jm'
              "
              @click="updateDiagnosis('diagnosis', '入院诊断', patientInfo.diagnosis)"
      >
        入院诊断：
        <div
          class="bottom-line"
          style="
            min-width: 650px;
            min-height: 13px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
      <span
        v-if="sheetInfo.sheetType === 'postpartumnursing_jm'"
        @click="updateDelivery('delivery', '分娩方式', patientInfo.delivery)"
      >
        分娩方式：
        <div class="bottom-line" style="min-width: 80px">
          {{ delivery }}
        </div>
      </span>
      <span
        v-if="sheetInfo.sheetType === 'postpartumnursing_jm'"
        class="ml-1000"
      >
        分娩日期：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.admissionDate | toymd }}
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
import bus from "vue-happy-bus";

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
    delivery() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_delivery_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_delivery_${realIndex}`] ||
        this.patientInfo.delivery
      );
    },
  },
  methods: {
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改入院诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改入院诊断`
      );
    },
    updateDelivery(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_delivery_${this.index}`] = text;
          this.$message.success(`修改分娩方式成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.delivery,
        `修改分娩方式`
      );
    },
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY年MM月DD日 ");
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
