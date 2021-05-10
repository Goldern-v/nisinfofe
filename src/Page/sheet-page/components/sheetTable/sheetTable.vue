<template>
  <div>
    <div
      class="contant sheet-page-container"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />
      <component
        v-bind:is="tableHead"
        :patientInfo="patientInfo"
        :index="index"
        :bedAndDeptChange="bedAndDeptChange"
      ></component>
      <excel
        :patientInfo="patientInfo"
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
.sheet-page-container {
  & {
    border-radius: 2px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1100px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
  }

  .header-con {
    text-align: center;

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
      font-size: 13px;
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
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 2px;
  }

  .bottom-line-input {
    display: inline-block;
    border: 0;
    width: 30px;
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 2px;
    height: 12px;
    position: relative;
    outline: none;
    text-align: center;
    // top -2px
  }
}
</style>
<script>
import excel from "./components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import common from "@/common/mixin/common.mixin";
import tableHead from "./components/table-head/table-head";
import tableHeadPrenata from "./components/table-head/table-head-prenatal";
import tableHeadDiagnosis from "./components/table-head/table-head-diagnosis";
import tableHeadWx from "./components/table-head/table-head-wx";
import tableHeadLc from "./components/table-head/table-head-lc";
import tableHeadTbhldLc from "./components/table-head/table-head-tbhld-lc";
import tableHeadWj from "./components/table-head/table-head-wj";
import tableHeadHd from "./components/table-head/table-head-hd";
import tableHeadFuyou from "./components/table-head/table-head-fuyou";
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    scrollY: Number,
    isInPatientDetails: Boolean,
    bedAndDeptChange: Object
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo
    };
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    },
    /** 只读模式 */
    readOnly() {
      if (sheetInfo.sheetType === "obstetrics") return false;
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    },
    tableHead() {
      /** 产科 */
      if (sheetInfo.sheetType === "prenatal") {
        return tableHeadPrenata;
      } else if (sheetInfo.sheetType === "special") {
        return tableHeadTbhldLc;
      } else if (this.HOSPITAL_ID == "weixian") {
        return tableHeadWx;
      } else if (this.HOSPITAL_ID == "lingcheng") {
        return tableHeadLc;
      } else if (this.HOSPITAL_ID == "wujing") {
        return tableHeadWj;
      } else if (this.HOSPITAL_ID == "huadu") {
        return tableHeadHd;
      } else if (this.HOSPITAL_ID == "fuyou") {
        if (sheetInfo.sheetType == "child_recovery_jm") {
          return tableHeadDiagnosis;
        }
        else {
          return tableHeadFuyou;
        }
      } else {
        return tableHead;
      }
    }
  },
  created() {},
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel
  }
};
</script>
