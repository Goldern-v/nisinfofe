<template>
  <div>
    <div
      class="contant sheetTable-intervention_cure_lcey"
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
        <div class="headTable">
          <div>
            <span>
              科室：
              {{ patientInfo.deptName }}
            </span>
            <span>
              时间:
              <el-date-picker
                size="small"
                style="display:inline-block;border:0px;margin:2px"
                v-model="sheetInfo.relObj.dateTime"
                :data-value="sheetInfo.relObj.dateTime"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                class="editOrPirnt"
                placeholder="选择日期时间"
                @change="
                  formatChange(
                    'YYYY-MM-DD HH:mm:ss',
                    sheetInfo.relObj.dateTime,
                    'dateTime'
                  )
                "
              />
            </span>
            <span>
              住院号：
              {{ patientInfo.inpNo }}
            </span>
          </div>
          <div style="display:flex;justify-content:space-between">
            <span>
              姓名：
              {{ patientInfo.patientName }}
            </span>
            <span>
              性别：
              {{ patientInfo.sex }}
            </span>
            <span>
              年龄：
              {{ patientInfo.age }}
            </span>
            <span
              >体重：
              <div class="bottom-line" style="width:20px;position: relative;">
                <input
                  type="text"
                  class="bottomInput"
                  style="width:20px"
                  v-model="sheetInfo.relObj.weight"
                  :data-value="sheetInfo.relObj.weight"
                />
              </div>
              kg</span
            >
          </div>
          <div>
            <span
              >药物过敏史：
              <div class="bottom-line" style="width: 50%;position: relative;">
                <input
                  type="text"
                  style="width:50%"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.ywgms"
                  :data-value="sheetInfo.relObj.ywgms"
                /></div
            ></span>
            <span
              >碘过敏试验：
              <div
                class="bottom-line"
                style="min-width: 50px;position: relative;"
              >
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.dgmsy"
                  :data-value="sheetInfo.relObj.dgmsy"
                /></div
            ></span>
          </div>
          <div>
            <span
              >介入名称：
              <div class="bottom-line" style="width: 80%;position: relative;">
                <input
                  type="text"
                  style="width:80%"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.jrmc"
                  :data-value="sheetInfo.relObj.jrmc"
                /></div
            ></span>
          </div>
          <div>
            <span
              >麻醉方式：
              <div class="bottom-line" style="width: 30%;position: relative;">
                <input
                  type="text"
                  style="width:30%"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.mzmc"
                  :data-value="sheetInfo.relObj.mzmc"
                /></div
            ></span>
            <span
              >穿刺部位：
              <div class="bottom-line" style="width: 30%;position: relative;">
                <input
                  type="text"
                  style="width:30%"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.ccbw"
                  :data-value="sheetInfo.relObj.ccbw"
                /></div
            ></span>
          </div>
        </div>
        <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
        >
          <bottomTable
            class="bottomTable"
            style="margin:-16px 0 0 0"
            slot="bottomCon"
          >
          </bottomTable>
        </excel>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheetTable-intervention_cure_lcey {
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

  &.readOnly {
    pointer-events: none;
  }

  .readOnly-img {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .headTable,.bottomTable{
    border-collapse: collapse;
    width:100%;
    text-align :left;
    font-size :12px;
    margin-bottom: -16px;
    div{
      border : 1px solid #000;
      border-bottom :0px;
      line-height :23px;
      span{
        .bottom-line{
          display :inline-block
          border: none;
          // border-bottom: 1px solid #000
        }
        .bottomInput {
          border: none !important;
          outline: none !important;
        }
      }
    }
    div:last-child{
      border-bottom:1px solid #000
    }
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
import bottomTable from "./components/Table";
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
    formatChange(formatType, value, key) {
      this.sheetInfo.relObj[key] = moment(value).format(formatType);
    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.selectBlock || {};
    },
    /** 只读模式 */
    readOnly() {
      let controlReadOnly = this.sheetInfo.selectBlock.readOnly //后端控制readOnly为true只能查阅，不能修改
      if (controlReadOnly) {
        return controlReadOnly
      }

      // return !this.userDeptList
      //   .map(item => item.code)
      //   .includes(this.sheetInfo.selectBlock.deptCode);
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
    bottomTable
  }
};
</script>
