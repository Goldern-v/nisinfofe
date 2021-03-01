<template>
  <div>
    <div
      class="contant sheetTable-common_nk_lcey"
      :style="data.titleModel.style"
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
      <div class="header-con">
        <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
        <div class="title">{{ patientInfo.recordName }}</div>
        <div class="info-con" flex="main:justify">
          <span>
            科室：
            <div class="bottom-line" style="min-width: 120px">
              {{ patientInfo.deptName }}
            </div>
          </span>
          <span>
            床号：
            <div
              class="bottom-line"
              style="min-width: 30px"
              @click="updateTetxInfo('bedLabel', '床号', patientInfo.bedLabel)"
            >
              {{ patientInfo.bedLabel }}
            </div>
          </span>
          <span>
            姓名：
            <div
              class="bottom-line"
              style="min-width: 60px"
              @click="
                updateTetxInfo(
                  'patientName',
                  '病人姓名',
                  patientInfo.patientName
                )
              "
            >
              {{ patientInfo.patientName }}
            </div>
          </span>
          <span>
            住院号：
            <div class="bottom-line" style="min-width: 50px">
              {{ patientInfo.patientId }}
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
          ><bottomCon slot="bottomCon" />
        </excel>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.sheetTable-common_nk_lcey {
  & {
    border-radius: 2px;
    // position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1100px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
    position: relative;
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

    .bottomInput {
      border: none;
      outline: none;
      font-size: 14px;
      width: 30px;
    }
  }

  .table-footer {
    margin-top: 40px !important;
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
import { updateSheetHeadInfo } from "../../api/index";
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
      sheetInfo,
      createTime:
        (sheetInfo.relObj && sheetInfo.relObj.createTime) ||
        sheetInfo.selectBlock.createTime
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
    },
    changeDate() {
      window.openSetAuditDateModal(
        date => {
          this.createTime = date;
          sheetInfo.relObj.createTime = date;
          this.$message.success("修改日期成功，保存护记后生效");
        },
        this.createTime,
        "修改日期"
      );
    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    },
    /** 只读模式 */
    readOnly() {
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
