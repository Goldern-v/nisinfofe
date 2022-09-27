<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType === 'iabp_fs'||sheetInfo.sheetType === 'cardiology_fs'">
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
      <span v-if="sheetInfo.sheetType === 'cardiology_fs'">
        病区：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.realDeptName }}
        </div>
      </span>
      <!-- <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <!-- <span v-if="sheetInfo.sheetType === 'neonatal_care_jm'">
        入院日期：
        <div class="bottom-line" style="min-width: 150px">
          {{ patientInfo.admissionDate }}
        </div>
      </span> -->
    </div>
    <div class="info-con" flex="main:justify" v-else-if="sheetInfo.sheetType === 'hydrochloricacid_fs' || sheetInfo.sheetType === 'magnesiumsulf_fs' || sheetInfo.sheetType === 'laborobservation_fs'">
       <span>
        姓名：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        孕
        <input
          style="width: 20px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj['pregnantTimes']"
          v-model="sheetInfo.relObj['pregnantTimes']"
        />产
        <input
          style="width: 20px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj['parity']"
          v-model="sheetInfo.relObj['parity']"
        />
      </span>
      <span>
        孕周：
        <input
          style="width: 35px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj[`${index}pregnantWeeks`]"
          v-model="sheetInfo.relObj[`${index}pregnantWeeks`]"
        />
      </span>
       <span>
        年龄：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.realDeptName }}
        </div>
      </span>
  
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'laborobservation_fs'">
        第几次住院：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ patientInfo.visitId }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
    </div>

     <div class="info-con" flex="main:justify" v-else>
       <span>
        姓名：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ patientInfo.bedLabel }}
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
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span>
        病区：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <!-- <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->


      <!-- <span v-if="sheetInfo.sheetType === 'neonatal_care_jm'">
        入院日期：
        <div class="bottom-line" style="min-width: 150px">
          {{ patientInfo.admissionDate }}
        </div>
      </span> -->
    </div>
    <div class="info-con"  v-if="sheetInfo.sheetType == 'laborobservation_fs'">
      <span>
        临产时间：
          <crDatePicker
            :data-value="sheetInfo.relObj.laborTime"
            v-model="sheetInfo.relObj.laborTime"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />
      </span>
      <span>
        宫口全开时间：
          <crDatePicker
            :data-value="sheetInfo.relObj.laborTime"
            v-model="sheetInfo.relObj.laborTime"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />
      </span>
      <span>
        娩出时间：
          <crDatePicker
            :data-value="sheetInfo.relObj.deliveryTime1"
            v-model="sheetInfo.relObj.deliveryTime1"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />/
          <crDatePicker
            :data-value="sheetInfo.relObj.deliveryTime2"
            v-model="sheetInfo.relObj.deliveryTime2"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />/
          <crDatePicker
            :data-value="sheetInfo.relObj.deliveryTime3"
            v-model="sheetInfo.relObj.deliveryTime3"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />
      </span>

    </div>
    <div class="info-con info-con_select"  v-if="sheetInfo.sheetType == 'laborobservation_fs'">
      <span>
        娩出方式：
        <el-select v-model="sheetInfo.relObj.deliveryMOde" multiple placeholder="">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
  </el-select>
      </span>
    </div>
    <div class="info-con">
      <span v-if="sheetInfo.sheetType != 'iabp_fs' && sheetInfo.sheetType != 'hydrochloricacid_fs' && sheetInfo.sheetType != 'magnesiumsulf_fs' && sheetInfo.sheetType != 'laborobservation_fs'"
        @click="updateDiagnosis('diagnosis', '入院诊断', patientInfo.diagnosis)"
      >
        入院诊断：
        <div
          class="bottom-line"
          style="
            min-width: 1100px;
            min-height: 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>

    </div>
    <div class="info-con">
      <span v-if="sheetInfo.sheetType == 'ipacu_fs'"
        @click="updateDiagops('ops', '手术', patientInfo.relObj.ops)"
      >
        手术：
        <div
          class="bottom-line"
          style="
            min-width: 1100px;
            min-height: 13px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ sheetInfo.relObj[`PageIndex_diagops_${index}`] }}
        </div>
      </span>

    </div>
    <div class="info-con">
      <span v-if="sheetInfo.sheetType == 'ultrasound_fs'">
        <span>治疗日期：</span>
        <input v-model="sheetInfo.relObj.zlrq"/>
        <span>&nbsp;治疗时间：</span>
        <input v-model="sheetInfo.relObj.zlsj"/>
      </span>
    </div>
    <bedRecordModal v-if="!routePath.includes('print')" ref="bedRecordModal"></bedRecordModal>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import bedRecordModal from "../../../modal/bedRecord-modal";
import crDatePicker from '@/components/cr-date-picker/cr-date-pickerV2.vue';

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
      options: [{
          value: '顺产',
          label: '顺产'
        }, {
          value: '吸引产',
          label: '吸引产'
        }, {
          value: '剖宫产',
          label: '剖宫产'
        }, {
          value: '钳产',
          label: '钳产'
        }, {
          value: '臀助产',
          label: '臀助产'
        }, {
          value: '臀牵引',
          label: '臀牵引'
        }],
    };
  },
  mounted() {},
  computed: {
    routePath(){
      return window.location.href
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
    openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      this.$refs.bedRecordModal.open();
    },
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
    updateDiagops(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_diagops_${this.index}`] = text;
          this.$message.success(`修改手术成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.sheetInfo.relObj[`PageIndex_diagops_${this.index}`],
        `修改手术`
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
      if(val){
        return moment(val).format("YYYY年MM月DD日");
      }
    },
    toymdhs(val) {
      if(val){
        return moment(val).format("YYYY年MM月DD日 HH:mm");
      }
    },
  },
  created() {
    console.log();
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }
    // 江门市妇幼院新生儿监护单  需要修改日期，只要日期，不要时间
    if(sheetInfo.sheetType === 'neonatal_care_jm'){
      this.patientInfo.admissionDate=this.patientInfo.admissionDate.split(" ")[0]
    }
  },
  watch: {},
  components: {
    bedRecordModal,
    crDatePicker
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
input {
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  text-align: center;
}
.info-con_select /deep/.el-input__inner {
  border: none;
  border-bottom: 1px solid #000;
  width: 520px;
}
.info-con_select /deep/.el-input__icon{
  display: none;
}
.info-con_select /deep/.el-tag{
  background: #fff;
  border: none;
}
.info-con_select /deep/.el-tag__close{
  display: none;
}

</style>
