<template>
  <div>
    <div
      class="contant sheetTable-cardiac_intervent"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
      <!-- <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly && sheetInfo.model != 'print'"
        alt
      /> -->
      <div class="header-con">
        <div class="his-name">
      <img src='./images/hospital-name.png'
         height="60"
          width="300"/>

    </div>
    <div class="title">{{patientInfo.recordName}}</div>
        <div class="info-con">
     <span>
        科室:
        <div class="bottom-line" style="min-width: 266px">{{patientInfo.realDeptName}}</div>
      </span>
      <span>
        病区:
        <div class="bottom-line" style="min-width: 135px">{{patientInfo.deptName}}</div>
      </span>
      </div>
    <div class="info-con" >
      <span @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)">
        姓名:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientName}}</div>
      </span>
      <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
        性别:
        <div class="bottom-line" style="min-width: 35px">{{patientInfo.sex}}</div>
      </span>
      <!-- <span @click="updateNeonatology2Age" v-if="sheetInfo.sheetType == 'neonatology2'">
        年龄:
        <div class="bottom-line" style="min-width: 50px">{{neonatology2Age}}</div>
      </span> -->
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
        年龄:
        <div class="bottom-line" style="min-width: 40px">{{patientInfo.age}}</div>
      </span>
      <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
        床号:
        <div class="bottom-line" style="min-width: 50px">{{patientInfo.bedLabel}}</div>
      </span>
      <span>
        住院号:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.inpNo}}</div>
      </span>
      <span>
        诊断:
        <div  class="bottom-line" style="min-width: 150px">{{patientInfo.diagnosis}}</div>
      </span>
      <!-- <span>
        ID号:
        <div class="bottom-line" style="min-width: 70px">{{patientInfo.patientId}}</div>
      </span> -->
      <!-- <span v-if="sheetInfo.sheetType == 'neonatology2'">
        温箱编号:
        <input
          class="bottom-line"
          style="width: 30px"
          @focus="onFocusToAutoComplete($event)"
          @blur="onBlurToAutoComplete"
          v-model="relObj.wxNo"
        />
      </span>-->
      <!-- <span>
        入院日期:
        {{patientInfo.admissionDate | toymd}}
      </span> -->
     </div>
      </div>
      <infoTable v-if="isFirst" :patientInfo='patientInfo'></infoTable>
      <excel
        :data="data"
        :index="index"
        :length="length"
        :scrollY="scrollY"
        :hasFiexHeader="true"
        :isInPatientDetails="isInPatientDetails"
      ></excel>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheetTable-cardiac_intervent {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 720px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    position: relative;
  }

  .header-con {
    .his-name {
      font-size: 18px;
      padding: 0 0px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    .title {
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
      font-size: 21px;
      color: #000;
      padding-top: 15px;
      padding-bottom: 10px;
      margin: 0;
    }

    span {
      margin-right: 4px;
      font-size: 13px;
      color: #000;
    }

    .info-con {
      padding-top: 15px;
      padding-bottom: 10px;
      text-align: left;
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
  }

  .add-btn {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .his-logo {
    position: absolute;
    left: 15px;
    top: 21px;
    height: 44px;
  }

  .diagnosis-con {
    max-width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.readOnly {
    pointer-events: none;
  }

  .readOnly-img {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .bottom-line {
    display: inline-block;
    border: 0;
    border-bottom: 1px solid #000;
    outline: none;
    padding: 2px 0 2px 2px;
    text-align: center;
  }

  .bottomCon {
    position: relative;
    bottom: 40px;
    // transform translateY(-30px)
    // margin-top:-80px;
    width: 100%;
    font-size: 14px;

    input[type='checkbox'] {
      position: relative;
    }

    input[type='checkbox'] {
      -webkit-appearance: none;
      vertical-align: text-top;
      width: 14px;
      height: 14px;
      border: 1px solid #000;
      border-radius: 0px;
      outline: none;
      margin: 1px 3px 0 0;
    }

    .isChecked {
      font-size: 10;
      position: relative;
    }

    .isChecked:before {
      content: '';
      width: 8px;
      transform: rotate(45deg);
      position: absolute;
      top: 7px;
      left: -2px;
      border-top: 2px solid #000;
    }

    .isChecked:after {
      content: '';
      width: 14px;
      transform: rotate(-50deg) translateY(-50%) translateX(50%);
      position: absolute;
      border-top: 1px solid #000;
      top: 10px;
      left: -2px;
    }

    .bottomInput {
      border: none;
      outline: none;
      border-bottom: 1px solid #000;
      font-size: 14px;
      width: 80px;
      text-align: center;
    }
  }

}
</style>
<script>
// import excel from "./components/excel/excel.vue";
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import infoTable from "./components/infoTable/infoTable";
import { updateSheetHeadInfo } from "../../api/index";
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    isFirst: Boolean /** 首页 */,
    scrollY: Number,
    isInPatientDetails: Boolean
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo
    };
  },
  methods: {
    updateBirthDay() {
      window.openSetAuditDateModal(
        date => {
          updateSheetHeadInfo({ birthday: date }).then(res => {
            this.patientInfo.birthday = res.data.data.birthday;
            this.$message.success("修改日期成功");
          });
        },
        this.patientInfo.birthday,
        "修改日期"
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
    }
  },
  computed: {
    patientInfo() {
      // return this.sheet.patientInfo
      return this.sheetInfo.masterInfo || {};
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    },
    relObj() {
      return sheetInfo.relObj;
    }
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  created() {
    if (!this.relObj.ssrq) {
      this.relObj.ssrq = moment().format("YYYY年MM月DD日");
      sheetInfo.relObj = { ...sheetInfo.relObj };
    }
  },
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    infoTable
  }
};
</script>
