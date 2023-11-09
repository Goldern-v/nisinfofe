/*
江门妇幼-PICU血液透析护理记录单
 */
<template>
  <div>
    <div
      class="contant sheetTable-picu_hemodialysis_jm"
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
          <!-- <span>
            床号：{{ patientInfo.bedLabel }}
          </span> -->
          <span>
            姓名： {{ patientInfo.patientName }}
          </span>
          <span>
            床号：
            <span :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
              {{ patientInfo.bedLabel }}
            </span>
          </span>
          <span>
            住院号：{{ patientInfo.inpNo }}
          </span>
          <span>
            年龄：{{ patientInfo.age }}
          </span>
          <span>
            性别：{{ patientInfo.sex }}
          </span>
          <span>
            体重： {{ patientInfo.weight }}
          </span>
          <span>
            入院日期：{{ patientInfo.admissionDate | toymd }}
          </span>
        </div>
        <table>
          <colgroup>
            <col v-for="i in 19" :key="i" width="5%"/>
          </colgroup>
          <tbody>
            <tr>
              <td colspan="4">
                <div class="boxTitle">取血通路：</div>
                <input
                  type="textarea"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.qxtl"
                  :data-value="sheetInfo.relObj.qxtl"
                />
              </td>
              <td colspan="3">机械型号：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.jxxh"
                  :data-value="sheetInfo.relObj.jxxh"
                />
              </td>
              <td colspan="3">导管型号：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.dgxh"
                  :data-value="sheetInfo.relObj.dgxh"
                />
              </td>
              <td colspan="4">血液抗凝：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.xykn"
                  :data-value="sheetInfo.relObj.xykn"
                />
              </td>
              <td colspan="5">血滤器/批号：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.xlq"
                  :data-value="sheetInfo.relObj.xlq"
                />
              </td>
            </tr>
            <tr>
              <td colspan="3">治疗 CVVHDF：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.cvvhdf"
                  :data-value="sheetInfo.relObj.cvvhdf"
                />
              </td>
              <td colspan="3">CVVHD：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.cvvhd"
                  :data-value="sheetInfo.relObj.cvvhd"
                />
              </td>
              <td colspan="3">TPE：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.tpe"
                  :data-value="sheetInfo.relObj.tpe"
                />
              </td>
              <td colspan="3">HP：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.hp"
                  :data-value="sheetInfo.relObj.hp"
                />
              </td>
              <td colspan="4">其他：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.qt"
                  :data-value="sheetInfo.relObj.qt"
                />
              </td>
              <td colspan="3">治疗次数：
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.zlcs"
                  :data-value="sheetInfo.relObj.zlcs"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
        ><div slot="bottomCon">
          <div  class="footer-data">
            <div class="bottom-line" style="flex: 1">
              <span>24小时总累积出入量：</span>
              <input
                class="bottomInput"
                type="text"
                v-model="sheetInfo.relObj.ywgms"
                :data-value="sheetInfo.relObj.ywgms"
              />
            </div>
            <div class="bottom-line" style="flex: 1" >
              <span>抗凝剂配制浓度：</span>
              <input
                class="bottomInput"
                type="text"
                v-model="sheetInfo.relObj.dgmsy"
                :data-value="sheetInfo.relObj.dgmsy"
              />
            </div>
          </div>
        </div>
        </excel>
      </div>
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheetTable-picu_hemodialysis_jm {
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
    table {
      width: 100%;
      text-align: left;
      margin-bottom: -16px;
      td {
        border: 1px solid #000;
        .boxTitle {
        }
        .bottomInput {
          border: none;
          outline: none;
          font-size: 14px;
          width: 95%;
          height: 30px;
        }
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
  .footer-data {
    display: flex;
    border: 1px solid #000;
    text-align: left;
    margin-top: 15px;
    padding: 2px;
    input {
      width: 70%;
      border: none;
      outline: none;
    }
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

  .table-footer {
    margin-top: 10px !important;
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
import bedRecordModal from "../modal/bedRecord-modal";

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
     openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      this.$refs.bedRecordModal.open();
    },
  },
  computed: {
    patientInfo() {
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
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  created() {},
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    bedRecordModal,
    excel
  }
};
</script>
