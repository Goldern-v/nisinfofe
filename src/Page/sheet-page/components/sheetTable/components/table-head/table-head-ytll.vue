<template>
  <div class="header-con">
    <div class="logo"><img src="@/common/images/ytll-logo/logo.png" /></div>
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
    <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType === 'seriousnursing_ytll'||sheetInfo.sheetType === 'premiumcare_ytll' || sheetInfo.sheetType === 'neurosurgery_ytll' || sheetInfo.sheetType === 'critical_ytll'">
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
      <span v-if="sheetInfo.sheetType == 'premiumcare_ytll' || sheetInfo.sheetType == 'neurosurgery_ytll'">
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
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          {{ newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`] }}
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
        <div class="bottom-line" style="min-width: 150px">
          {{ patientInfo.admissionDate }}
        </div>
      </span>
    </div>
    <div class="info-con" flex="main:justify" v-else-if="['labor_ytll','labor_con_ytll', 'oxytocin_ytll'].includes(sheetInfo.sheetType)">
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
      <span v-if="['oxytocin_ytll', 'labor_ytll'].includes(sheetInfo.sheetType)">
       胎次:
        <input type="text" v-model="sheetInfo.relObj.deliveryMOde" :data-value="sheetInfo.relObj.deliveryMOde" style="width:60px;">
      </span>
       <span v-if="['oxytocin_ytll', 'labor_ytll'].includes(sheetInfo.sheetType)">
        预产期：
          <crDatePicker
            :data-value="sheetInfo.relObj.laborTime"
            v-model="sheetInfo.relObj.laborTime"
            :width="140"
            :type="sheetInfo.sheetType === 'oxytocin_ytll' ? 'time' : 'date'"
            style="border:none;border-bottom:1px solid #000;height:22px"
          />
      </span>
      <span v-if="sheetInfo.sheetType == 'labor_con_ytll'">
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          <!-- {{ patientInfo.bedLabel }} -->
          {{ newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`] }}
        </div>
      </span>
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
    </div>
    <div class="info-con" flex="main:justify" v-else-if="['babymilk_ytll'].includes(sheetInfo.sheetType)">
       <span>
        妈妈姓名：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          <!-- {{ patientInfo.bedLabel }} -->
          {{ newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`] }}
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
        科别：
        <div class="bottom-line" style="min-width: 70px">
          {{ patientInfo.realDeptName }}
        </div>
      </span>
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          <!-- {{ patientInfo.bedLabel }} -->
          {{ newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`] }}
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
        住院号：
        <div class="bottom-line" style="min-width: 80px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
    </div>
    <div class="info-con">
      <span v-if="!['labor_ytll','inout_ytll','labor_con_ytll', 'babymilk_ytll', 'oxytocin_ytll'].includes(sheetInfo.sheetType)" @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        {{ sheetInfo.sheetType === 'critical_ytll' ? '主要诊断：' : '诊断：'}}
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
      <template v-if=" sheetInfo.sheetType === 'critical_ytll'">
      <el-checkbox-group v-model="checklist" @change="setRelValue" style="display:inline;">
        <el-checkbox label="转入"></el-checkbox>
        <el-checkbox label="新入"></el-checkbox>
        <el-checkbox label="手术"></el-checkbox>
        <el-checkbox label="病危"></el-checkbox>
        <el-checkbox label="病重"></el-checkbox>
      </el-checkbox-group>
      </template>

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
import customSelectCanRepeat from '@/components/customSelectCanRepeat/CustomSelectCanRepeat.vue'

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
          name: '顺产'
        }, {
          value: '吸引产',
          name: '吸引产'
        }, {
          value: '剖宫产',
          name: '剖宫产'
        }, {
          value: '钳产',
          name: '钳产'
        }, {
          value: '臀助产',
          name: '臀助产'
        }, {
          value: '臀牵引',
          name: '臀牵引'
        }],
      checklist: []
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
    newPatientInfo() {
      /*  每页独立床号功能 */
      let beforeBed = this.patientInfo.bedLabel
      let nowBed = this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`]
      let newBedId = this.sheetInfo.relObj[`bedLabel_${this.index}_${this.sheetInfo.selectBlock.id}`];
      if (
        this.index != 0 &&
        this.sheetInfo.relObj[`bedLabel_${this.index-1}_${this.sheetInfo.selectBlock.id}`]
      ) {
        // 除了第一页，其他页数。先拿bedLabel，如果上一页也有床位那就拿就拿上一页的
        beforeBed = this.sheetInfo.relObj[
          `bedLabel_${this.index-1}_${this.sheetInfo.selectBlock.id}`
        ];
      }

      /* 单独每一页选择 */
      let checkList = []
      let newChecklist = this.sheetInfo.relObj[`checkList_${this.index}_${this.sheetInfo.selectBlock.id}`]

      if (
        this.index != 0 &&
        this.sheetInfo.relObj[`checkList_${this.index-1}_${this.sheetInfo.selectBlock.id}`]
      ) {
        checkList = this.sheetInfo.relObj[
          `checkList_${this.index-1}_${this.sheetInfo.selectBlock.id}`
        ];
      }
      return {
        ...this.patientInfo,
          [`checkList_${this.index}_${this.sheetInfo.selectBlock.id}`]: newChecklist ? newChecklist : checkList,
          [`bedLabel_${this.index}_${this.sheetInfo.selectBlock.id}`]: newBedId ? newBedId : nowBed
            ? nowBed
            : beforeBed,
        // ...this.patientInfo,
        // [`bedLabel_${this.index}_${this.sheetInfo.selectBlock.id}`]: nowBed ? nowBed : beforeBed,
      }
    },
  },
  methods: {
    setRelValue(val) {
      this.$set(this.sheetInfo.relObj, [`checkList_${this.index}_${this.sheetInfo.selectBlock.id}`], val)
    },
    // 转床记录弹窗事件
    openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      // 把当前页护记的页码存入,用于每一页床号的自定义
      this.$refs.bedRecordModal.open('', this.index);
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
    if (!sheetInfo.relObj.age) {
      sheetInfo.relObj.age = this.patientInfo.age;
    }

    if (!this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`]) {
      this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`] = this.patientInfo.bedLabel
    }

    if (this.sheetInfo.relObj[`checkList_${this.index}_${this.sheetInfo.selectBlock.id}`]) {
      this.checklist = this.sheetInfo.relObj[`checkList_${this.index}_${this.sheetInfo.selectBlock.id}`]
    }
    // 江门市妇幼院新生儿监护单  需要修改日期，只要日期，不要时间
    if(sheetInfo.sheetType === 'neonatal_care_jm'){
      this.patientInfo.admissionDate=this.patientInfo.admissionDate.split(" ")[0]
    }
  },
  watch: {

  },
  components: {
    bedRecordModal,
    crDatePicker,
    customSelectCanRepeat
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
.logo {
  position: absolute;
  left: 0;
  top: 0;
  width: 180px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
  }
}

/deep/.el-checkbox + .el-checkbox{
  margin-left: 0;
}

</style>
