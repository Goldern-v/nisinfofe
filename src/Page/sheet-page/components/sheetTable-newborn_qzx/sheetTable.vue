/*
曲周-新生儿护理记录单
 */
<template>
  <div>
    <div
      class="contant sheetTable-newborn_qzx"
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
          <span>
            床号：{{ patientInfo.bedLabel }}
          </span>
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
            住院号：{{ patientInfo.patientId }}
          </span>
          <!-- <span>
            入院日期：{{ patientInfo.admissionDate | toymd }}
          </span> -->
        </div>
        <div class="info-con" flex="main:justify">
          <span>
            出院日期：
            <input
              type="textarea"
              style="width:100px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.cyrq"
              :data-value="sheetInfo.relObj.cyrq"
              @keyup="(e)=>inputChange(e)"
            />
          </span>
          <span>
            出院体重：
            <input
              type="textarea"
              style="width:100px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.cstz"
              :data-value="sheetInfo.relObj.cstz"
            />
          </span>
          <span>
            多或少于出生体重：
            <input
              type="textarea"
              style="width:100px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.dscstz"
              :data-value="sheetInfo.relObj.dscstz"
            />克
          </span>
          <span>
            预防接种：卡介苗接种日期:
            <input
              type="textarea"
              style="width:100px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.kjm"
              :data-value="sheetInfo.relObj.kjm"
              @keyup="(e)=>inputChange1(e)"
            />
          </span>
        </div>
        <div class="info-con" >
          <span style="margin-left:870px;">
            乙肝疫苗接种日期:
            <input
              type="textarea"
              style="width:100px;"
              class="bottomInput"
              v-model="sheetInfo.relObj.ygym"
              :data-value="sheetInfo.relObj.ygym"
              @keyup="(e)=>inputChange2(e)"
            />
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
        </excel>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

.sheetTable-newborn_qzx {
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
    width: 100%;
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
    margin-right: 5px; 
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
      font-size: 14px;
      color: #000;
    }

    .info-con {
      margin: 8px 0;
      text-align: left;
      .bottomInput {
        border: none;
        outline: none;
        border-bottom: 1px solid #000;
        font-size: 14px;
        width: 80px;
        text-align: center;
      }
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
import { updateSheetHeadInfo } from "../../api/index";
import watchAttr,{changeThis} from "./watchAttr"

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
    inputChange(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj.cyrq = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj.cyrq = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj.cyrq = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj.cyrq = val.substr(0, 10) + "日"
        }
      } 
    },
    inputChange1(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj.kjm = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj.kjm = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj.kjm = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj.kjm = val.substr(0, 10) + "日"
        }
      } 
    },
    inputChange2(e) {
      let val = e.currentTarget.value
      if(e.keyCode == 8) {
        this.sheetInfo.relObj.ygym = val
      }else{
        if(val.length == 4 ){
          this.sheetInfo.relObj.ygym = val.substr(0, 4) + "年"
        }else if(val.length == 7 ){
          this.sheetInfo.relObj.ygym = val.substr(0, 7) + "月"
        }else if(val.length == 10 ){
          this.sheetInfo.relObj.ygym = val.substr(0, 10) + "日"
        }
      } 
    },
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
    excel
  }
};
</script>
