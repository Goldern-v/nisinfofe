/*
花都-NICU监护单
 */
<template>
  <div>
    <div
      class="contant sheetTable-nicu_custody_hd"
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
        <div class="tableHeader">
          <div class="tableHeaderLeft">
            <div class="info-item">
              床号：
              <div class="info-item-msg has-background" @dblclick.stop="openBedRecordModal">{{ patientInfo.bedLabel }}</div>
            </div>
            <div class="info-item">
              姓名：
              <div class="info-item-msg">{{ patientInfo.patientName }}</div>
            </div>
            <div class="info-item">
              性别：
              <div class="info-item-msg">{{ patientInfo.sex }}</div>
            </div>
            <div class="info-item">
              年龄：
              <div class="info-item-msg">{{ patientInfo.age }}</div>
            </div>
            <div class="info-item">
              住院号：
              <div class="info-item-msg">{{ patientInfo.patientId }}</div>
            </div>
            <div class="info-item">
              入院日期：
              <div class="info-item-msg">{{ patientInfo.admissionDate | toymd }}</div>
            </div>
          </div>
          <div>
            <div class="his-name">广州市花都区人民医院</div>
            <div class="title">NICU监护单</div>
          </div> 
          <div class="tableHeaderRight1">
            <div class="box">
              <div class="box-item">
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 70px;"
                  v-model="sheetInfo.relObj['wg1' + index]"
                  :data-value="sheetInfo.relObj['wg1' + index]"
                />号胃管
              </div>
              <div class="box-item">
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 70px;"
                  v-model="sheetInfo.relObj['wg2' + index]"
                  :data-value="sheetInfo.relObj['wg2' + index]"
                />号尿管
              </div>
              <div class="box-item">PICC(1.9Fr)</div>
              <div class="box-item">脐静脉管</div>
              <div class="box-item">
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 105px;"
                  v-model="sheetInfo.relObj['g1' + index]"
                  :data-value="sheetInfo.relObj['g1' + index]"
                />
              </div>
              <div class="box-item">
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 105px;"
                  v-model="sheetInfo.relObj['g2' + index]"
                  :data-value="sheetInfo.relObj['g2' + index]"
                />
              </div>
            </div>
            <div class="box" style="width: 35%;">
              <div class="box-item">
                置管日期
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 90px;"
                  @click="(e)=>timePicker(e,'zgrq1' + index)"
                  v-model="sheetInfo.relObj['zgrq1' + index]"
                  :data-value="sheetInfo.relObj['zgrq1' + index]"
                />
              </div>
              <div class="box-item">
                置管日期
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 90px;"
                  @click="(e)=>timePicker(e,'zgrq2' + index)"
                  v-model="sheetInfo.relObj['zgrq2' + index]"
                  :data-value="sheetInfo.relObj['zgrq2' + index]"
                />
              </div>
              <div class="box-item">
                置管日期
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 90px;"
                  @click="(e)=>timePicker(e,'zgrq3' + index)"
                  v-model="sheetInfo.relObj['zgrq3' + index]"
                  :data-value="sheetInfo.relObj['zgrq3' + index]"
                />
              </div>
              <div class="box-item">
                置管日期
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 90px;"
                  @click="(e)=>timePicker(e,'zgrq4' + index)"
                  v-model="sheetInfo.relObj['zgrq4' + index]"
                  :data-value="sheetInfo.relObj['zgrq4' + index]"
                />
              </div>
              <div class="box-item">
                置管日期
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 90px;"
                  @click="(e)=>timePicker(e,'zgrq5' + index)"
                  v-model="sheetInfo.relObj['zgrq5' + index]"
                  :data-value="sheetInfo.relObj['zgrq5' + index]"
                />
              </div>
              <div class="box-item">
                置管日期
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 90px;"
                  @click="(e)=>timePicker(e,'zgrq6' + index)"
                  v-model="sheetInfo.relObj['zgrq6' + index]"
                  :data-value="sheetInfo.relObj['zgrq6' + index]"
                />
              </div>
            </div>
            <div class="box">
              <div class="box-item">
                插入深度
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 50px;"
                  v-model="sheetInfo.relObj['crsd' + index]"
                  :data-value="sheetInfo.relObj['crsd' + index]"
                />cm
              </div>
              <div class="box-item">
                插入深度
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 50px;"
                  v-model="sheetInfo.relObj['snzs' + index]"
                  :data-value="sheetInfo.relObj['snzs' + index]"
                />cm
              </div>
              <div class="box-item">
                外露长度
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 50px;"
                  v-model="sheetInfo.relObj['wlcd1' + index]"
                  :data-value="sheetInfo.relObj['wlcd1' + index]"
                />cm
              </div>
              <div class="box-item">
                插入深度
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 50px;"
                  v-model="sheetInfo.relObj['wlcd2' + index]"
                  :data-value="sheetInfo.relObj['wlcd2' + index]"
                />cm
              </div>
              <div class="box-item">
                插入深度
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 50px;"
                  v-model="sheetInfo.relObj['crsd1' + index]"
                  :data-value="sheetInfo.relObj['crsd1' + index]"
                />cm
              </div>
              <div class="box-item">
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 123px;"
                  v-model="sheetInfo.relObj['crsd2' + index]"
                  :data-value="sheetInfo.relObj['crsd2' + index]"
                />
              </div>
            </div>
          </div>
          <div class="tableHeaderRight2">
            <div class="box2">
              <div class="box-item">
                温箱放置区域：
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 200px;"
                  v-model="sheetInfo.relObj['wxfzqy' + index]"
                  :data-value="sheetInfo.relObj['wxfzqy' + index]"
                />
              </div>
            </div>
            <div class="box2">
              <div class="box-item">
                温箱箱号：
                <input
                  type="textarea"
                  class="bottomInput"
                  style="width: 120px;"
                  v-model="sheetInfo.relObj['wxxh' + index]"
                  :data-value="sheetInfo.relObj['wxxh' + index]"
                />
              </div>
            </div>
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

.sheetTable-nicu_custody_hd {
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
    .tableHeader {
      width: 100%;
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      font-size: 13px;
      .tableHeaderLeft {
        width: 300px;
        height: 100%;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .info-item {
          width: 90%;
          display: flex;
          margin-left: 20px;
          .info-item-msg{
            width: 65%;
            text-align: left;
            border-bottom: 1px solid #000;
          }
        }
      }
      .tableHeaderRight1 {
        width: 500px;
        height: 100%;
        border: 1px solid #000;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .box {
          width: 30%;
          height: 98%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .box-item {
            width: 100%;
            height: 30px;
            text-align: center;
            line-height: 30px;
            .bottomInput {
              border: none;
              outline: none;
              border-bottom: 1px solid #000;
              font-size: 14px;
              text-align: center;
            }
          }
        }
      }
      .tableHeaderRight2 {
        width: 250px;
        height: 100%;
        border: 1px solid #000;
        .box2{
          width: 95%;
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          .box-item {
            width: 100%;
            height: 30px;
            text-align: center;
            line-height: 30px;
            .bottomInput {
              border: none;
              outline: none;
              border-bottom: 1px solid #000;
              font-size: 14px;
              text-align: center;
            }
          }
        }
      }
    }
    .his-name {
      font-size: 36px;
      padding: 0 0px;
      text-align: center;
      font-weight: bold;
      font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    }

    .title {
      font-size: 36px;
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
  }

  .table-footer {
    margin-top: 40px !important;
  }
  .has-background {
    background:#f4f2f5;
    cursor: pointer;
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
      this.$refs.bedRecordModal.open();
    },
    timePicker(e,item){
      if (this.sheetInfo.relObj[item]) return
      e.currentTarget.value = moment().format("YYYY-MM-DD")
      this.sheetInfo.relObj[item] = moment().format("YYYY-MM-DD")
      console.log(this.sheetInfo.relObj);
    }
  },
  computed: {
    patientInfo() {
      return this.sheetInfo.masterInfo || {};
    },
    /** 只读模式 */
    readOnly() {
      if (
        this.HOSPITAL_ID == "huadu" 
      ) {
        return false;
      }
    },
  },
  filters: {
    toymd(val) {
      return val ? moment(val).format("YYYY年MM月DD日") : "";
    }
  },
  created() {
    
  },
  update() {},
  mounted() {
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    bedRecordModal,
    excel,
  }
};
</script>
