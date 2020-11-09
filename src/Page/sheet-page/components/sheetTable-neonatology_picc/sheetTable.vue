<template>
  <div>
    <div
      class="contant sheet-page-container-intervention_cure"
      :class="{ readOnly }"
    >
      <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />
      <div class="title">{{ patientInfo.recordName }}</div>

      <div
        class="container"
        style="border:1px solid #000;margin-bottom: -16px;"
      >
        <headCon></headCon>
      </div>
      <topCon
        ><excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
          slot="table"
        ></excel
        ><bottomCon slot="bottomCon" v-if="index == length - 1 ? true : false">
          <div class="table-footer">
            第 {{ index + sheetStartPage }} 页
          </div></bottomCon
        >
        <div class="table-footer" slot="bottomCon" v-else>
          第 {{ index + sheetStartPage }} 页
        </div></topCon
      >
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" >
.sheet-page-container-intervention_cure {
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

  &.readOnly {
    pointer-events: none;
  }

  .readOnly-img {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .info-con {
    margin-bottom: 5px;

    span {
      font-size: 12px;
    }

    .bottom-line-input {
      border: none;
      border-bottom: 1px solid #000;
      outline: none;
      padding-left: 5px;
      box-sizing: border-box;
      display: inline-block;
    }
  }

  td.title {
    text-align: center;
    background: #eee !important;
    vertical-align: middle;

    span {
      font-size: 14px;
    }
  }
}
</style>
<script>
import excel from "./components/excel/excel";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../../api/index";
import headCon from "./components/headCon";
import bottomCon from "./components/bottomCon";
import topCon from "./components/topCon";
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
      fhgd: ["无", "有"]
    };
  },
  computed: {
    patientInfo() {
      // return this.sheet.patientInfo
      return this.sheetInfo.selectBlock || {};
    },
    sheetStartPage() {
      return this.sheetInfo.sheetStartPage;
    },
    sheetMaxPage() {
      return this.sheetInfo.sheetMaxPage;
    },
    /** 只读模式 */
    readOnly() {
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    }
  },
  // watch:{
  //   isLast(){
  //     return this.
  //   }
  // },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日 HH时mm分") : "";
    }
  },
  watch: {},
  methods: {
    updateBirthDay() {
      window.openSetAuditDateModal(
        date => {
          updateSheetHeadInfo({ birthday: date }).then(res => {
            this.patientInfo.birthday = res.data.data.birthday;
            this.$message.success("修改出生日期成功");
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
    }
  },
  created() {},
  update() {},
  mounted() {
    console.log("length", this.sheetInfo.selectBlock);
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    headCon,
    bottomCon,
    topCon
  }
};
</script>
