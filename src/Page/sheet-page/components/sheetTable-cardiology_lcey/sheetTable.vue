/*
江门妇幼-PICU监护单
 */
<template>
  <div>
    <div
      class="contant sheetTable-cardiology_lcey"
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
            科别：{{ patientInfo.realDeptName }}
          </span>
          <span>
            床号：{{ patientInfo.bedLabel }}
          </span>
          <!-- <span>
            床号：
            <span :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
              {{ patientInfo.bedLabel }}
            </span>
          </span> -->
          <span>
            姓名： {{ patientInfo.patientName }}
          </span>
           <span>
            性别：{{ patientInfo.sex }}
          </span>
          <span>
            年龄：{{ patientInfo.age }}
          </span>
          <span>
            病案号：{{ patientInfo.age }}
          </span>
          <span>
            介入名称：{{ patientInfo.age }}
          </span>
          <span>
            介入时间：2021年11月12日 11:11:11
          </span>
          <!-- <span>
            住院号：{{ patientInfo.patientId }}
          </span>
          <span>
            入院日期：{{ patientInfo.admissionDate | toymd }}
          </span> -->
        </div>
          <div class="info-con" flex="main:justify">
            <div class="boxLine">
              <div class="boxTitle">穿刺部位：</div>
              <div class="boxRight">
                <input
                  type="textarea"
                  style="max-width:150px;"
                  class="bottomInput"
                  v-model="sheetInfo.relObj['ccbw' + index]"
                  :data-value="sheetInfo.relObj['ccbw' + index]"
                />
              </div>
            </div>
            <div class="boxLine">
              <div class="boxTitle">加压方式：</div>
              <div class="boxRight">
                <input
                  type="textarea"
                  style="max-width:150px;"
                  class="bottomInput"
                  v-model="sheetInfo.relObj['jyfs' + index]"
                  :data-value="sheetInfo.relObj['jyfs' + index]"
                />
              </div>
            </div>
            <div class="boxLine">
              <div class="boxTitle">局麻方式：</div>
              <div class="boxRight">
                <input
                  type="textarea"
                  style="max-width:150px;"
                  class="bottomInput"
                  v-model="sheetInfo.relObj['jmfs' + index]"
                  :data-value="sheetInfo.relObj['jmfs' + index]"
                />
              </div>
            </div>
            <div class="boxLine">
              <div class="boxTitle">解压开始时间：</div>
              <div class="boxRight">
                <input
                  type="textarea"
                  style="min-width:165px;"
                  class="bottomInput"
                  v-model="sheetInfo.relObj['ks' + index]"
                  :data-value="sheetInfo.relObj['ks' + index]"
                />
              </div>
            </div>
            <div class="boxLine">
              <div class="boxTitle">解压结束时间：</div>
              <div class="boxRight">
                <input
                  type="textarea"
                  style="min-width:165px;"
                  class="bottomInput"
                  v-model="sheetInfo.relObj['js' + index]"
                  :data-value="sheetInfo.relObj['js' + index]"
                />
              </div>
            </div>
        </div>
        <div class="mainBox">
          <div class="leftPart">
            <div class="top"></div>
            <div class="topPart"><div>返<br/>回<br/>病<br/>房<br/>后</div></div>
            <div class="bottomPart">介<br/>入<br/>后<br/>第<br/>1<br/>天</div>
            <div class="bottomPart">介<br/>入<br/>后<br/>第<br/>2<br/>天</div>
            <div class="bottomPart">介<br/>入<br/>后<br/>第<br/>3<br/>天</div>
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
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.sheetTable-cardiology_lcey {
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
  .boxLine {
    height: 25px;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size:14px;
  }
  textarea {
    border: none;
    resize: none;
    cursor: pointer;
    outline:none;
    overflow:hidden; 
    resize:none;
    width: 98%;
    height: 55px;
    font-size: 16px;
  }
  .boxRight {
    flex: 1;
  }
  input[type='checkbox'] {
    -webkit-appearance: none;
    vertical-align: text-top;
    width: 14px;
    height: 14px;
    border: 1px solid #000;
    border-radius: 0px;
    outline: none;
    margin: 0 5px;
    cursor: pointer;
  }

  input[type='checkbox']:checked {
    font-size: 10;
    position: relative;
  }

  input[type='checkbox']:checked:before {
    content: '';
    width: 8px;
    transform: rotate(45deg);
    position: absolute;
    top: 7px;
    left: -2px;
    border-top: 2px solid blue;
  }

  input[type='checkbox']:checked:after {
    content: '';
    width: 14px;
    transform: rotate(-50deg) translateY(-50%) translateX(50%);
    position: absolute;
    border-top: 2px solid blue;
    top: 10px;
    left: -2px;
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
          height: 20px;
          line-height: 20px;
        }
        .bottomInput {
          border: none;
          outline: none;
          font-size: 14px;
          height: 20px;
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
  .boxTitle {
    height: 20px;
    line-height: 20px;
  }
  .bottomInput {
    border: none;
    border-bottom 1px solid #000
    outline: none;
    font-size: 14px;
    height: 20px;
  }
  .mainBox{
    display: flex;
    .leftPart{
      width: 30px;
      height: 713px;
      margin-top: 15px;
      border: 1px solid #000;
      border-right: none;
      text-align: center;
      font-size: 14px;
      .top{
        border-bottom 1px solid #000
        height: 53px;
      }
      .topPart{
        border-bottom 1px solid #000
        height: 307px;
        div{
          width: 100%;
          height: 50%;
          padding-top: 100px;
        }
      }
      .bottomPart{
        border-bottom 1px solid #000
        height: 87px;
      }
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
      watchItem:{},
      bus: bus(this),
      sheetInfo,
      checked:"false",
      deliveryMode: [],
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
      return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
    },
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  update() {},
  mounted() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    bedRecordModal,
    excel,
  }
};
</script>
