<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType === 'nursingrecords_zxy'">
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <div>
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
        <span>
          科室：
          <div class="bottom-line" style="min-width: 120px">
            {{ patientInfo.deptName }}
          </div>
        </span>
      </div>
      <div>
        <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span>
        入院日期：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.admissionDate | toyHm }}
        </div>
      </span>
      </div>
    </div>
    <div v-else-if="['brainobservation2_zxy',].includes(sheetInfo.sheetType)">
      <div class="info-con" flex="main:justify">
        <span>
          科室：
          <div class="bottom-line" style="min-width: 120px">
            {{ patientInfo.deptName }}
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
        <span>
          床号：
          <div class="bottom-line" style="min-width: 50px">
            {{ patientInfo.bedLabel }}
          </div>
        </span>
        <span>
          住院号：
          <div class="bottom-line" style="min-width: 80px">
            {{ patientInfo.inpNo }}
          </div>
        </span>
        <span>
          入院日期：
          <div class="bottom-line" style="min-width: 80px">
            {{ patientInfo.admissionDate | toyHm }}
          </div>
        </span>
      </div>
      <div class="info-con" flex="main:justify">
        <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
          诊断：
          <div
            class="bottom-line"
            style="min-width: 200px;max-width: 1000px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >
            {{ diagnosis }}
          </div>
        </span>
        
      </div>
    </div>
    <div v-else-if="['encephalopathy_zxy', 'brainobservation_zxy'].includes(sheetInfo.sheetType)">
      <div class="info-con" flex="main:justify">
        <span>
          科室：
          <div class="bottom-line" style="min-width: 120px">
            {{ patientInfo.deptName }}
          </div>
        </span>
        <span>
          住院号：
          <div class="bottom-line" style="min-width: 80px">
            {{ patientInfo.inpNo }}
          </div>
      </span>
      </div>
      <div class="info-con" flex="main:justify">
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
        <span>
          床号：
          <div class="bottom-line" style="min-width: 50px">
            {{ patientInfo.bedLabel }}
          </div>
        </span>
        <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
          诊断：
          <div
            class="bottom-line"
            style="min-width: 150px;max-width: 620px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >
            {{ diagnosis }}
          </div>
        </span>
        <span>
          入院日期：
          <div class="bottom-line" style="min-width: 80px">
            {{ patientInfo.admissionDate | toymd }}
          </div>
        </span>
      </div>
    </div>
    <div class="info-con" flex="main:justify" v-else>
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
      <span>
        科室：
        <div class="bottom-line" style="min-width: 120px">
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
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span>
        入院日期：
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
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    },
    updateDelivery(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_delivery_${this.index}`] = text;
          this.$message.success(`修改RICU天数成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.delivery,
        `修改RICU天数`
      );
    },
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY-MM-DD");
    },
    toyHm(val){
      return moment(val).format("YYYY-MM-DD HH:mm");
    }
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
