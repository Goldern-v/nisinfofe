<template>
  <div>
    <div
      class="contant sheet-page-container-intervention_cure"
      :class="{ readOnly }"
    >
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />

      <headCon></headCon>
      <Table></Table>
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
.sheet-page-container-intervention_cure {
  & {
    border-radius: 2px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1200px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
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
    // padding: 2px 0 2px 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  .bottom-line {
    // margin: 0 4px;
    input {
      border-bottom: 1px solid #000 !important;
      text-align: center;
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

  .prev {
    vertical-align: middle;
  }

  .next {
    vertical-align: middle;
    margin-right: 5px;
  }
}
</style>
<script>
import excel from "../../components/sheetTable/components/excel/excel";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import moment from "moment";
import common from "@/common/mixin/common.mixin";
import { updateSheetHeadInfo } from "../../api/index";
import Table from "./components/Table";
import headCon from "./components/headCon";
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
  computed: {
    patientInfo() {
      // return this.sheet.patientInfo
      return this.sheetInfo.masterInfo || {};
    },
    /** 只读模式 */
    readOnly() {
      if(this.HOSPITAL_ID == "fuyou"){
        let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
        if (controlReadOnly) {
          return true
        }
      }else {
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
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    headCon,
    Table
  }
};
</script>
