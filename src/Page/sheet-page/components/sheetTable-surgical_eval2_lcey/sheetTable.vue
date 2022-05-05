<template>
  <div>
    <div
      class="contant sheetTable-internal_eval2_lcey"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />
      <div class="header-con">
        <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
        <div class="title">{{ patientInfo.recordName }}</div>
        <div class="info-con" flex="main:justify">
          <span>
            科别：
            <div class="bottom-line" style="min-width: 120px">
              {{ patientInfo.deptName }}
            </div>
          </span>
          <span>
            姓名：
            <div class="bottom-line" style="min-width: 60px">
              {{ patientInfo.patientName }}
            </div>
          </span>
          <span>
            性别：
            <div class="bottom-line" style="min-width: 30px">
              {{ patientInfo.sex }}
            </div>
          </span>
          <span>
            年龄：
            <div class="bottom-line" style="min-width: 30px">
              {{ patientInfo.age }}
            </div>
          </span>
          <span>
            床号：
            <div class="bottom-line" style="min-width: 30px">
              {{ patientInfo.bedLabel }}
            </div>
          </span>
          <span>
            病案号：
            <div class="bottom-line" style="min-width: 50px">
              {{ patientInfo.inpNo }}
            </div>
          </span>
          <span>
            诊断：
            <div class="bottom-line" style="min-width: 150px">
              {{ patientInfo.diagnosis }}
            </div>
          </span>
          <span>
            <div class="bottom-line" style="min-width: 50px">
              {{ patientInfo.admissionDate | toymd }}
            </div>
          </span>
        </div>
        <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
        >
          <bottomCon slot="bottonInput" :index="index" />
        </excel>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sheetTable-internal_eval2_lcey {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1320px !important; // 关键
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
    padding: 0px 0 2px 2px;
  }
}
</style>
<script>
import excel from "../../components/sheetTable/components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import bottomCon from "./bottomCon";
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
  methods: {},
  computed: {
    patientInfo() {
      return this.sheetInfo.masterInfo || {};
    },
    /** 只读模式 */
    readOnly() {
      // if(this.HOSPITAL_ID == "fuyou"){
      //   let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
      //   if (controlReadOnly) {
      //     return true
      //   }
      // }

      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    }
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  created() {},
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    bottomCon
  }
};
</script>
