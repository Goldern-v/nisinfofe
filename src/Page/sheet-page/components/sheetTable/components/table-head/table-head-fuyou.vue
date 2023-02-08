<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <div :class="{'info-con': true, 'info-con_new': sheetInfo.sheetType === 'pediatrics_jm'}" flex="main:justify">
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
        入院日期：
        <div class="bottom-line" style="min-width: 150px">
          {{ patientInfo.admissionDate }}
        </div>
      </span>
    </div>
    <div class="info-con" flex="main:justify">
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
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
      <span
        v-if="sheetInfo.sheetType === 'postpartumnursing_jm'"
      >
        分娩方式：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.relObj.delivery? patientInfo.relObj.delivery : ""}}
        </div>
      </span>
      <span
        v-if="sheetInfo.sheetType === 'postpartumnursing_jm'"
      >
        {{sheetInfo.sheetType == 'postpartumnursing_jm'?'分娩日期':'出生日期'}}：
        <div class="bottom-line" style="min-width: 95px">
          {{ patientInfo.relObj.deliveryDate ? patientInfo.relObj.deliveryDate : "" }} 
        </div>
      </span>
      <span
        v-if="sheetInfo.sheetType === 'neonatology_jm'"
      >
        {{sheetInfo.sheetType == 'postpartumnursing_jm'?'分娩日期':'出生日期'}}：
        <div class="bottom-line" style="min-width: 95px">
          {{ patientInfo.birthday ? patientInfo.birthday : "" }} 
        </div>
      </span>
      <span v-if="sheetInfo.sheetType === 'gynaecology_jm'">
        入科时间：
        <div 
        class="bottom-line" 
        style="
          min-width: 140px;
          min-height: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
          "
          >
          {{ patientInfo.admissionDate | toymdhs }}
        </div>
      </span>
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
    <setTextModalFuyou ref="modalName"></setTextModalFuyou>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo,getDeliveryInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import bedRecordModal from "../../../modal/bedRecord-modal";
import setTextModalFuyou  from "@/Page/sheet-page/components/sheetTable/components/table-components/set-text-modal-fuyou.vue"
import { saveBody }  from  "@/api/sheet.js"
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
  async created() {
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }
    // 江门市妇幼院新生儿监护单  需要修改日期，只要日期，不要时间
    if(sheetInfo.sheetType === 'neonatal_care_jm'){
      this.patientInfo.admissionDate=this.patientInfo.admissionDate.split(" ")[0]
    }
    // 江门妇幼产后护理记录单获取分娩时间分娩方式并且存到病人信息里
    if((sheetInfo.sheetType ==='postpartumnursing_jm'||sheetInfo.sheetType ==='neonatology_jm')){
        let paintID=this.patientInfo.patientId
        // 判断病人是否婴儿
        if(paintID.includes("_")){
          paintID=this.patientInfo.patientId.split("_")[0]
        }
        const res = await  getDeliveryInfo(paintID)
        if(res.data.data.length!=0){
           const dateOfBirth=res.data.data[0].DateOfBirth
           const date=dateOfBirth.split(" ")[0].split("/")
           const time=dateOfBirth.split(" ")[1].split(":")
           const deliveryDate=`${date[0]}-${date[1]}-${date[2]} ${time[0]}:${time[1]}`
           const delivery=res.data.data[0].TaiErMianChuFangShi||""
           if(this.patientInfo.relObj.delivery!=delivery||this.patientInfo.relObj.deliveryDate!=deliveryDate){
            await saveBody(
            this.patientInfo.patientId,
            this.patientInfo.visitId,
            {
              relObj:{
                'deliveryDate':deliveryDate,
                'delivery':delivery
              }
            }
            )
            this.$set(this.patientInfo.relObj,'deliveryDate',deliveryDate)
            this.$set(this.patientInfo.relObj,'delivery',delivery)
           }
        }
       
    }
  },
  watch: {},
  components: {
    bedRecordModal,
    setTextModalFuyou
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
</style>
