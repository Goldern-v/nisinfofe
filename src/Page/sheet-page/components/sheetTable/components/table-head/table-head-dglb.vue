<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType == 'prenatal_dglb'">
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <!-- <span>
        性别：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.sex }}
        </div>
      </span> -->
      <!-- <span v-show="birthdayList.includes(sheetInfo.sheetType)">
        出生日期：
        <div class="bottom-line" style="min-width: 100px" >
          {{ patientInfo.relObj.detailBirthday ? patientInfo.relObj.detailBirthday : '' }}
        </div>
      </span> -->
      <!-- <span>
        年龄：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.age }}
        </div>
      </span> -->

      <!-- <span v-if="sheetInfo.sheetType!='mechanical_sdlj'">
        科室：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span> -->
       <!-- <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->
      <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span>
        孕次：
        <input
          style="width:40px; text-align: center"
          class="bottom-line"
          :data-value="sheetInfo.relObj['yc_']"
          v-model="sheetInfo.relObj['yc_']"
        />
      </span>
      <span>
        产次：
        <input
          style="width:40px; text-align: center"
          class="bottom-line"
          :data-value="sheetInfo.relObj['cc_']"
          v-model="sheetInfo.relObj['cc_']"
        />
      </span>
      <span>
        胎次：
        <input
          style="width:40px; text-align: center"
          class="bottom-line"
          :data-value="sheetInfo.relObj['tc_']"
          v-model="sheetInfo.relObj['tc_']"
        />
      </span>
      <span>
        孕周：
        <input
          style="width:40px; text-align: center"
          class="bottom-line"
          :data-value="sheetInfo.relObj['yz_']"
          v-model="sheetInfo.relObj['yz_']"
        />周
      </span>
      <span>
          预产期：
          <crDatePicker
            v-model="sheetInfo.relObj['contractionTime']"
            :width="140"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />
        </span>
      <!-- <span v-if="admissionDateList.includes(sheetInfo.sheetType)">
        入院日期：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.admissionDate | toymd}}
        </div>
      </span> -->
    </div>
    <div class="info-con" flex="main:justify" v-else>
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        性别：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.sex }}
        </div>
      </span>
      <!-- <span v-show="birthdayList.includes(sheetInfo.sheetType)">
        出生日期：
        <div class="bottom-line" style="min-width: 100px" >
          {{ patientInfo.relObj.detailBirthday ? patientInfo.relObj.detailBirthday : '' }}
        </div>
      </span> -->
      <span>
        年龄：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.age }}
        </div>
      </span>

      <span v-if="sheetInfo.sheetType!='mechanical_sdlj'">
        科室：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span>
       <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ patientInfo.bedLabel }}
        </div>
      </span>
      <!-- <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span v-if="admissionDateList.includes(sheetInfo.sheetType)">
        入院日期：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.admissionDate | toymd}}
        </div>
      </span>
    </div>
    <div class="info-con" v-if="diagnosisList.includes(sheetInfo.sheetType)">
      <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断：
        <div
          class="bottom-line"
          style="
            min-width: 800px;
            height: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo,getDeliveryInfo ,detailData} from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import bedRecordModal from "../../../modal/bedRecord-modal";
import { saveBody }  from  "@/api/sheet.js"
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
      //需要诊断的表单
      diagnosisList: [
        "postpartum_dglb", // 产后护理记录单
        'prenatal_dglb'
      ],
      // 需要出身日期的表单
      birthdayList:[
        // "pediatric3_sdlj", //护理记录单（产科新生儿护理记录单）
      ],
      //需要入院日期的表单
      admissionDateList: [
        "postpartum_dglb", // 产后护理记录单
        'prenatal_dglb',
        'baby_obs_dglb',
        'baby_dglb'
      ]
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
  },
  methods: {
    openBedRecordModal(){
      // if (this.readOnly) {
      //   return this.$message.warning("你无权操作此护记，仅供查阅");
      // }
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
  },
  filters: {
    toymd(val) {
      if(val){
        return moment(val).format("YYYY年MM月DD日");
      }
    },
  },
  watch: {},
  components: {
    bedRecordModal,
    crDatePicker
  },
  created(){
    if(!this.patientInfo.relObj.detailBirthday && this.birthdayList.includes(this.sheetInfo.sheetType))
      detailData(this.patientInfo.patientId).then(res=>{
       this.$set(this.patientInfo.relObj,'detailBirthday',res.data.data.birthday)
      })
    }
};
</script>

<style lang="scss" scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
  height: 12px;
  font-size: 13px;
}
.ml-1000 {
  margin-left: 850px;
}
.info-con_new{
  display: flex;
  justify-content: center;
}
</style>
