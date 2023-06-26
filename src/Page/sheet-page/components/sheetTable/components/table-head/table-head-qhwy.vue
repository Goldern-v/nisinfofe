<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <template v-if="sheetInfo.sheetType == 'neonatal_care_qhwy'">
      <div class="info-con" flex="main:justify" >
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
      </div>
      <div class="info-con" flex="main:justify" >
        <span>
          出生时间：
          <div class="bottom-line" style="min-width: 70px">
            {{ patientInfo.birthday }}
          </div>
        </span>
        <span>
          分娩方式
          <input
            type="checkbox"
            value="sc"
            :ischecked="sheetInfo.relObj['sc']"
            v-model="checkedsc"
          />顺产
        </span>
        <span>
          手术（
           <input
          type="checkbox"
          value="pgc"
          :ischecked="sheetInfo.relObj['pgc']"
          v-model="checkedpgc"
        />剖宫产
        <input
          type="checkbox"
          value="cq"
          :ischecked="sheetInfo.relObj['cq']"
          v-model="checkedcq"
        />产钳
        <input
          type="checkbox"
          value="tzc"
          :ischecked="sheetInfo.relObj['tzc']"
          v-model="checkedtzc"
        />臀助产
        <input
          type="checkbox"
          value="ttxy"
          :ischecked="sheetInfo.relObj['ttxy']"
          v-model="checkedttxy"
        />胎头吸引）
        </span>
      </div>
    </template>
    <div class="info-con" flex="main:justify" v-else>
      <span >
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
        年龄：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span>
        性别：
        <div class="bottom-line" style="min-width: 50px">
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
     <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType !== 'neonatal_care_qhwy'">
        <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
          诊断：
          <div
            class="bottom-line"
            style="min-width: 750px;max-width: 620px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >
            {{ diagnosis }}
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
      'checkedcq':{
        get(){
          return this.sheetInfo.relObj[`cq`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`cq`] = nVal ? "true" : "false"
        }
      },
      'checkedtzc':{
        get(){
          return this.sheetInfo.relObj[`tzc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`tzc`] = nVal ? "true" : "false"
        }
      },
      'checkedttxy':{
        get(){
          return this.sheetInfo.relObj[`ttxy`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`ttxy`] = nVal ? "true" : "false"
        }
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
