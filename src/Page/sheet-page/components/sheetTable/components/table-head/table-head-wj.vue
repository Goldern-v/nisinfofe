<template>
  <div :class="['header-con',sheetInfo.sheetType === 'common_wj'?'wujing-big-title':'']">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <div v-if="sheetInfo.sheetType === 'waiting_birth_wj'">
      <div class="info-con" flex="main:justify" >
        <span
          @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)"
        >
          姓名：
          <div class="bottom-line" style="min-width: 80px">
            {{ patientInfo.patientName }}
          </div>
        </span>
        <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
          年龄：
          <div class="bottom-line" style="min-width: 45px">
            {{ patientInfo.age }}
          </div>
        </span>
        <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
          床号：
          <div class="bottom-line" style="min-width: 45px">
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
          孕次：
          <input
            class="bottom-line-input"
            :data-value="sheetInfo.relObj.parity"
            v-model="sheetInfo.relObj.parity"
          />
        </span>
        <span>
          产次：
          <input
            class="bottom-line-input"
            :data-value="sheetInfo.relObj.pregnantTimes"
            v-model="sheetInfo.relObj.pregnantTimes"
          />
        </span>
        <!-- <span>
          预产期： -->
          <!-- <input
            style="width: 140px"
            class="bottom-line-input"
            :data-value="sheetInfo.relObj.contractionTime"
            v-model="sheetInfo.relObj.contractionTime"
          /> -->
          <!-- <crDatePicker
            v-model="sheetInfo.relObj.contractionTime"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          /> -->
        <!-- </span> -->
      </div>
      <div class="info-con">
        <span
          @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)"
        >
          诊断：
          <div
            class="bottom-line"
            style="min-width: 800px;max-width: 620px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
          >
            {{ diagnosis }}
          </div>
        </span>
      </div>
    </div>
    <div class="info-con" flex="main:justify" v-else-if="sheetInfo.sheetType === 'postpartum_wj'">
      <span
        @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)"
      >
        姓名：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 45px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 45px">
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
        分娩日期：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.admissionDate | toymd }}
        </div>
      </span>
    </div>
    <div v-else>
      <div class="info-con" :class="{'big-header':sheetInfo.sheetType=='common_wj'}" flex="main:justify">
      <span
        @click="updateTetxInfo('patientName', '姓名', patientInfo.patientName)"
      >
        姓名：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别：
        <div class="bottom-line" style="min-width: 20px">
          {{ patientInfo.sex }}
        </div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span @click="handleDeptNameChoose">
        科室：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 40px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span>
        入院时间：
        <div class="bottom-line" style="min-width: 80px">
          <!-- {{ patientInfo.admissionDate | toymd }} -->
          {{ newPatientInfo[`admissionDate_${index}_${sheetInfo.selectBlock.id}`] | toymd }}
        </div>
      </span>
      <!-- {{index}} {{relObj}} -->
      </div>
      <div class="info-con" :class="{'big-header':sheetInfo.sheetType=='common_wj'}">
       <span
        @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)"
      >
        诊断：
        <div
          class="bottom-line"
          style="min-width: 1080px;max-width: 1080px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
            >
          {{ processedDiagnosis[0] }}
        </div>
        <div
          class="bottom-line"
          style="margin-left:53px;min-width: 1080px;max-width: 1080px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
           v-if="processedDiagnosis[1]"
        >
          {{ processedDiagnosis[1] }}
        </div>
        <div
          class="bottom-line"
          style="margin-left:53px;min-width: 1080px;max-width: 1080px;min-height:13px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
           v-if="processedDiagnosis[2]"
        >
          {{ processedDiagnosis[2] }}
        </div>
      </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo , getNurseAdtLog } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import bus from "vue-happy-bus";
import crDatePicker from '@/components/cr-date-picker/cr-date-pickerV2.vue';
export default {
  props: {
    patientInfo: Object,
    index: Number
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      ischangemajor:false,
    };
  },
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
      let result = (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] || this.patientInfo.diagnosis
      return result;
    },
    processedDiagnosis(){
      let strArr = this.diagnosis.split('')
      let arr = []
      let text = ''
      strArr.map(str=>{
       if(this.GetLength(text + str)>140){
          arr.push(text)
          text = str
        }else{
          text += str
        }
      })
      arr.push(text)
      text = ''
      return arr
    },
    newPatientInfo() {
      /*  每页独立入院时间功能 */
      this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index}`] = this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index}`] ? this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index}`] : this.patientInfo.admissionDate
      let admissionDate = this.patientInfo.admissionDate
      let nowadmissionDate = this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index}`]
      if(this.index != 0 && this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index - 1}`]){
        // 除了第一页，其他页数。先拿admissionDate，如果上一页也有时间那就拿就拿上一页的
        admissionDate = this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index-1}`]
      }
      return {
        ...this.patientInfo,
        [`admissionDate_${this.index}_${this.sheetInfo.selectBlock.id}`]: nowadmissionDate ? nowadmissionDate : admissionDate,
      }
    }
  },
  created(){
    /* 添加新页，转科后入院时间需要改变成转科时间*/
    this.bus.$on("initSheetPageSize", (istrue) => {
     this.ischangemajor = istrue;
    });

  },
  methods: {
    handleDeptNameChoose(){
      this.bus.$emit('handleDeptNameChoose',true)
    },
    GetLength(str) {
      var realLength = 0,
        len = str.length,
        charCode = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    },
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
    },
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        text => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    },
    /* 获取转科记录 */
    async getChangeMajor(){
      const {data:{data}} = await getNurseAdtLog(this.patientInfo.patientId, this.patientInfo.visitId)
      if (!this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index}`]) {
        this.sheetInfo.relObj[`PageIndex_admissionDate_${this.index}`] = data.length && data[data.length-1].inDateTime
      }
    }
  },
  filters: {
    toymd(val) {
      return moment(val).format("YYYY-MM-DD");
    }
  },
  watch:{
    ischangemajor(newValue){
      if(newValue) {
        this.getChangeMajor()
      }
    }
  },
  destroyed() {},
  components: { crDatePicker}
};
</script>

<style lang='scss' scoped>
.header-con {
  .info-con {
    margin: 0 0;
    > span {
      height: 23px;
      line-height: 23px;
      > div {
        height: 23px;
        vertical-align: bottom;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }
  }
}
.wujing-big-title{
  .title,.his-name{
    font-size: 29px;
  }
}
.big-header span{
  font-size: 15px!important;
}
.bottom-line-input {
  display: inline-block;
  border: 0;
  width: 50px;
  border-bottom: 1px solid #000;
  padding: 2px 0 2px 2px;
  height: 12px;
  position: relative;
  outline: none;
  text-align: center;
}
</style>
