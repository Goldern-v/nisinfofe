/*
东莞大朗-PICU血液透析护理记录单
 */
<template>
  <div>
    <div
      class="contant sheetTable-picu_hemodialysis_jm"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
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
            住院号：{{ patientInfo.patientId }}
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
            <col v-for="i in 18" :key="i" width="5%"/>
          </colgroup>
          <tbody>
            <tr>
              <td colspan="3">
                <div class="boxTitle" style="text-align: center;">CRRT机型号：
                </div>
              </td>
              <td colspan="3">
                <customSelectCanRepeat
                    :options="CRRTS"
                    @onSelect="val => setRelValue('CRRT', val)"
                  >
                  <input
                    type="text"
                    :data-value="sheetInfo.relObj.CRRT"
                    v-model="sheetInfo.relObj.CRRT"
                    class="bottomInput"
                  />
                </customSelectCanRepeat>
              </td>
              <td colspan="3" style="text-align: center;">CBP模式：
              </td>
              <td colspan="3">
                <customSelectCanRepeat
                    :options="CBPS"
                    @onSelect="val => setRelValue('CBP', val)"
                  >
                  <input
                    type="text"
                    :data-value="sheetInfo.relObj.CBP"
                    v-model="sheetInfo.relObj.CBP"
                    class="bottomInput"
                  />
                </customSelectCanRepeat>
              </td>
              <td colspan="3" style="text-align: center;">置换液置换方式：
              </td>
              <td colspan="3">
                前：（
                <input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.qian"
                  :data-value="sheetInfo.relObj.qian"
                  style="width: 11%;"
                />）
                后：（<input
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.hou"
                  :data-value="sheetInfo.relObj.hou"
                  style="width: 11%;"
                />）
              </td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: center;">导管部位：
              </td>
              <td colspan="3">
                <customSelectCanRepeat
                    :options="catheterSites"
                    @onSelect="val => setRelValue('catheterSite', val)"
                  >
                  <input
                    type="text"
                    :data-value="sheetInfo.relObj.catheterSite"
                    v-model="sheetInfo.relObj.catheterSite"
                    class="bottomInput"
                  />
                </customSelectCanRepeat>
              </td>
              <td colspan="3" style="text-align: center;">抗凝剂：
              </td>
              <td colspan="6">
                <customSelectCanRepeat
                    :options="anticoagulants"
                    @onSelect="val => setRelValue('anticoagulant', val)"
                  >
                  <input
                    type="text"
                    :data-value="sheetInfo.relObj.anticoagulant"
                    v-model="sheetInfo.relObj.anticoagulant"
                    class="bottomInput"
                  />
                </customSelectCanRepeat>
              </td>
              <td colspan="3">治疗时间：
                <input
                style="width: 45%;"
                  type="text"
                  class="bottomInput"
                  v-model="sheetInfo.relObj.zlsj"
                  :data-value="sheetInfo.relObj.zlsj"
                />h
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
        >
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
          width: 57%;
          height: 20px;
          text-align: center
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
      width: 100px;
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
import customSelectCanRepeat from "@/components/customSelectCanRepeat/CustomSelectCanRepeat.vue";
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
        sheetInfo.selectBlock.createTime,
      CBPS: [
        {
          value: "HP",
          name: "HP"
        },
        {
          value: "CVVH",
          name: "CVVH"
        },
        {
          value: "CVVHD",
          name: "CVVHD"
        },
        {
          value: "CVVHDF",
          name: "CVVHDF"
        },
        {
          value: "PE",
          name: "PE"
        },
        {
          value: "HP+CVVHDF",
          name: "HP+CVVHDF"
        }
      ],
      catheterSites:[
        {
          value: "右腹股沟",
          name: "右腹股沟"
        },
        {
          value: "左腹股沟",
          name: "左腹股沟"
        },
        {
          value: "右颈内",
          name: "右颈内"
        },
        {
          value: "左颈内",
          name: "左颈内"
        },
      ],
      CRRTS:[{
          value: "费森尤斯",
          name: "费森尤斯"
        },
        {
          value: "山外山",
          name: "山外山"
        },
      ],
      anticoagulants:[
        {
          value: "无肝素",
          name: "无肝素"
        },
        {
          value: "低分子肝素",
          name: "低分子肝素"
        },
        {
          value: "肝素",
          name: "肝素"
        },
      ],
    };
  },
  methods: {
       setRelValue(code, val) {
      this.$set(this.sheetInfo.relObj, code, val);
    },
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.masterInfo || {};
    },
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
    excel,
    customSelectCanRepeat
  }
};
</script>
