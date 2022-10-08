<template>
  <div class="header-con">
    <div class="his-name" style="font-size:26px;margin-bottom:10px">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title" style="font-size:0px" v-if="sheetInfo.sheetType=='nurse_jew' || sheetInfo.sheetType== 'danger_nurse_jew'">
      <div class="nurse_title" style="border-bottom: 1px solid #000;padding:0 5px">{{ "" | filtertitle(nurseLevel)}}</div>
      <div class="nurse_title">患者护理记录单</div>
    </div>
    <!-- <div class="title" style="font-size:0px" v-else-if="sheetInfo.sheetType=='danger_nurse_jew'">
      <div class="nurse_title" style="border-bottom: 1px solid #000;padding:0 5px">危重</div>
      <div class="nurse_title">患者护理记录单</div>
    </div> -->
    <div class="title" style="font-size:30px" v-else>{{ patientInfo.recordName }}</div>
    <div class="info-con" flex="main:justify">
      <span>
        科别：
        <div class="bottom-line" style="min-width: 70px">
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
        ID：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.patientId }}
        </div>
      </span>
      <span @click="updateNurseLevel()">
        护理级别：
        <div class="bottom-line" style="min-width: 80px">
           {{nurseLevel}}
        </div>
      </span>
    </div>
    <!-- 诊断 -->
    <!-- <div class="info-con" flex="main:justify">
      <span style="position: relative;" @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)"
      >
        <span style="position: relative;top:-5px;">诊断：</span>
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
    </div> -->
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>

<script>
import moment from "moment";
import { info } from "@/api/patientInfo";
import sheetInfo from "../../../config/sheetInfo";
// import { listItem } from "@/api/common.js";
// import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import bedRecordModal from "../../../modal/bedRecord-modal";

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
    query() {
      console.log(this.$route.query ,"created")
      return this.$route.query || {}
    },
    nurseLevel(){
      console.log("sheetInfo.relObj ",sheetInfo.relObj,'this.query',this.query['nursingClass'])
      return (sheetInfo.relObj || {})['nurseLevel'] || this.query['nursingClass'] || ''
    }
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
    updateNurseLevel(){
       window.openSetTextModal(
        (text) => {
          sheetInfo.relObj['nurseLevel'] = text;
          this.$message.success(`修改护理等级成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.nurseLevel,
        `修改护理等级`
      );
    }
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY年MM月DD日");
    },
    filtertitle(val,nurseLevel){
      return (nurseLevel.indexOf("特级")>-1 || nurseLevel.indexOf("一级")>-1)?"危重":"一般"
    }
  },
  created() {
    if(sheetInfo.sheetType=='nurse_jew' || sheetInfo.sheetType== 'danger_nurse_jew' && !sheetInfo.relObj['nurseLevel']){
      info(this.patientInfo.patientId,this.patientInfo.visitId).then(res=>{
        this.$set(sheetInfo.relObj,'  ',res.data.data.nursingClass)
      })
    }
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }
  },
  watch: {},
  components: {
    bedRecordModal
  },
};
</script>

<style lang="scss" scoped>
.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
  height: 16px;
  text-align: center;
}
.ml-1000 {
  margin-left: 1000px;
}
.nurse_title{
  display: inline-block;
  font-size: 30px;
}
.nurse_boder{
  // border-bottom: 1px solid black;
  // background-color: pink;
}
</style>
