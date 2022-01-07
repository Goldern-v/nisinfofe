/*
江门妇幼-深静脉导管置入术后维护单
 */
<template>
  <div>
    <div
      class="contant sheetTable-catheterplacement_jm"
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
            科室：{{ patientInfo.realDeptName }}
          </span>
          <!-- <span>
            床号：{{ patientInfo.bedLabel }}
          </span> -->
          <span>
            床号：
            <span :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
              {{ patientInfo.bedLabel }}
            </span>
          </span>
          <span>
            姓名： {{ patientInfo.patientName }}
          </span>
          <span>
            住院号：{{ patientInfo.patientId }}
          </span>
          <span>
            性别：{{ patientInfo.sex }}
          </span>
          <span>
            年龄：{{ patientInfo.age }}
          </span>
          <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)"> 
            诊断：
            <div
              class="bottom-line1"
              style="
                display:inline-block;
                width: 200px;
                max-width: 200px;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ diagnosis }}
            </div>
          </span>
        </div>
        <div class="headerBoxTitle" style="margin-top: 20px;">
          <div class="boxTitle">静脉导管类型：</div>
          <div class="boxRadio">
            <div><input type="radio" value="PICC" v-model="sheetInfo.relObj.lx" :ischecked="sheetInfo.relObj.lx == 'PICC'">PICC</div>
            <div><input type="radio" value="输液港" v-model="sheetInfo.relObj.lx" :ischecked="sheetInfo.relObj.lx == '输液港'">输液港</div>
            <div><input type="radio" value="CVC" v-model="sheetInfo.relObj.lx" :ischecked="sheetInfo.relObj.lx == 'CVC'">CVC</div>
            <div><input type="radio" value="脐静脉" v-model="sheetInfo.relObj.lx" :ischecked="sheetInfo.relObj.lx == '脐静脉'">脐静脉</div>
            <div><input type="radio" value="其他导管" v-model="sheetInfo.relObj.lx" :ischecked="sheetInfo.relObj.lx == '其他导管'">其他导管</div>
          </div>
          <div class="boxTitle" style="margin-left: 50px;">置管部位：</div>
            <div class="boxRadio">
            <div><input type="radio" value="左颈内静脉" v-model="sheetInfo.relObj.bw" :ischecked="sheetInfo.relObj.bw == '左颈内静脉'">左颈内静脉</div>
            <div><input type="radio" value="右颈内静脉" v-model="sheetInfo.relObj.bw" :ischecked="sheetInfo.relObj.bw == '右颈内静脉'">右颈内静脉</div>
            <div><input type="radio" value="左贵要静脉" v-model="sheetInfo.relObj.bw" :ischecked="sheetInfo.relObj.bw == '左贵要静脉'">左贵要静脉</div>
            <div><input type="radio" value="右贵要静脉" v-model="sheetInfo.relObj.bw" :ischecked="sheetInfo.relObj.bw == '右贵要静脉'">右贵要静脉</div>
            <div><input type="radio" value="左肘正中静" v-model="sheetInfo.relObj.bw" :ischecked="sheetInfo.relObj.bw == '左肘正中静'">左肘正中静</div>
            <div><input type="radio" value="右肘正中静" v-model="sheetInfo.relObj.bw" :ischecked="sheetInfo.relObj.bw == '右肘正中静'">右肘正中静</div>
          </div>
          <div class="boxTitle" style="margin-left: 50px;">导管型号：</div>
           <div class="boxRadio">
            <div><input type="radio" value="1.9Fr" v-model="sheetInfo.relObj.xh" :ischecked="sheetInfo.relObj.xh == '1.9Fr'">1.9Fr</div>
            <div><input type="radio" value="3Fr" v-model="sheetInfo.relObj.xh" :ischecked="sheetInfo.relObj.xh == '3Fr'">3Fr</div>
            <div><input type="radio" value="4Fr" v-model="sheetInfo.relObj.xh" :ischecked="sheetInfo.relObj.xh == '4Fr'">4Fr</div>
            <div><input type="radio" value="5Fr" v-model="sheetInfo.relObj.xh" :ischecked="sheetInfo.relObj.xh == '5Fr'">5Fr</div>
          </div>
          <div class="boxTitle" style="margin-left: 50px;">导管尖端定位：</div>
            <input
              type="textarea"
              class="bottomInput"
              v-model="sheetInfo.relObj.dgjddw"
              :data-value="sheetInfo.relObj.dgjddw"
            />
        </div>
        <div class="headerBoxTitle" style="margin-top: 20px;">
          <div class="boxTitle2">
            <div class="boxTitle">当时插管的深度：</div>
            <input
              type="textarea"
              class="bottomInput"
              style="width: 30px;"
              v-model="sheetInfo.relObj.cgsd"
              :data-value="sheetInfo.relObj.cgsd"
            />cm
          </div>
          <div class="boxTitle2">
            <div class="boxTitle">导管外露的长度：</div>
            <input
              type="textarea"
              style="width: 30px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.wlcd"
              :data-value="sheetInfo.relObj.wlcd"
            />cm
          </div>
          <div class="boxTitle2">
            <div class="boxTitle">基础围（臂围/腿围/腹围）：</div>
            <input
              type="textarea"
              style="width: 30px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.jcw"
              :data-value="sheetInfo.relObj.jcw"
            />cm
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
        </excel>
      </div>
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.sheetTable-catheterplacement_jm {
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
  .boxRadio {
    display: flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-items: start;
  }
  .headerBoxTitle {
    display: flex;
    justify-content: center;
    align-items: start;
  }
  
  .boxTitle2 {
    width: 300px;
    display: flex;
    justify-content:center;
  }
  .bottomInput {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    outline: none;
  }
  .header-con {
    text-align: center;
    .bottom-line {
      border-top: 0;
      border-left: 0;
      border-right: 0;
      outline: none;
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
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
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
    },
    diagnosis() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_diagnosis_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] ||
        this.patientInfo.diagnosis
      );
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
    excel,
    bedRecordModal
  }
};
</script>
