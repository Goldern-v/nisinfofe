<template>
  <div>
    <div
      class="contant sheet-page-container-neonatology"
      :style="data.titleModel.style"
      :class="{readOnly}"
    >
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <img src="../../images/仅供查阅.jpg" class="readOnly-img no-print" v-if="readOnly" alt />
      <div class="header-con">
        <div class="his-name">{{HOSPITAL_NAME_SPACE}}</div>
        <div class="title">{{patientInfo.recordName}}</div>
        <div class="info-con" flex="main:justify">
          <span>
            姓名：
            <div
              class="bottom-line"
              style="min-width: 60px"
              @click="updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)"
            >{{patientInfo.patientName}}</div>
          </span>
          <span>
            性别：
            <div class="bottom-line" style="min-width: 30px">{{patientInfo.sex}}</div>
          </span>
          <span @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)">
            床号：
            <div class="bottom-line" style="min-width: 30px">{{patientInfo.bedLabel}}</div>
          </span>
          <span @click="updateBirthDay">
            出生日期：
            {{sheetInfo.relObj.birthday || patientInfo.birthday | toymd}}
          </span>
          <span>
            住院号：
            <div class="bottom-line" style="min-width: 50px">{{patientInfo.inpNo}}</div>
          </span>
        </div>
      </div>
      <headCon v-if="isFirst"></headCon>
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
.sheet-page-container-neonatology {
  & {
    border-radius: 2px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 700px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
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
      font-size: 21px;
      padding: 5px 0 5px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    span {
      margin-right: 4px;
      font-size: 14px;
      color: #000;
    }

    .info-con {
      margin: 8px 0;
      text-align: left;
    }
  }

  .add-btn {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .his-logo {
    position: absolute;
    left: 21px;
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
    // border-bottom 1px solid #000
    padding: 2px 0 2px 2px;
  }
}
</style>
<script>
import excel from "../../components/sheetTable/components/excel/excel";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import {data} from "./components/headCon/formatData";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import headCon from "./components/headCon/headCon";
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
      sheetInfo,
      patientInfo:{}
    };
  },
  watch:{
    "sheetInfo.masterInfo.patientId":{
      handler(val,oldVal){
        if(val !== oldVal){
          data.initEveryFormData(this.sheetInfo.masterInfo.relObj);
          this.patientInfo = this.sheetInfo.masterInfo || {}
          // this.$set(this,'patientInfo',val||{})
        } 
      },
      immediate: true,
      deep:true
    }
  },
  computed: {
    // patientInfo() {
    //   // return this.sheet.patientInfo
    //   // return this.sheetInfo.masterInfo || {};
    // },
    /** 只读模式 */
    readOnly() {
      if(this.HOSPITAL_ID == "fuyou"){
        let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
        if (controlReadOnly) {
          return true
        }
      } else {
        return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
      }
    }
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日 HH时mm分") : "";
    }
  },
  methods: {
    updateBirthDay() {
      window.openSetAuditDateModal(
        date => {
          updateSheetHeadInfo({ birthday: date }).then(res => {
            this.patientInfo.birthday = res.data.data.birthday;
            this.sheetInfo.relObj.birthday = res.data.data.birthday;
            this.sheetInfo.relObj = { ...this.sheetInfo.relObj };
            this.$message.success("修改出生日期成功");
          });
        },
        this.sheetInfo.relObj.birthday || this.patientInfo.birthday,
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
    }
  },
  created() {},
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    headCon
  }
};
</script>
