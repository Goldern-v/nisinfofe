/*
贵州省人医-新生儿患者护记单
 */
<template>
  <div>
    <div
      class="contant sheetTable-newborn_care_gzry"
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
            姓名： {{ patientInfo.patientName }}
          </span>
          <span>
            性别：{{ patientInfo.sex }}
          </span>
          <span>
            科室：{{ patientInfo.realDeptName }}
          </span>
          <span>
            床号：
            <div :class="['bottom-line-input']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
              {{ patientInfo.bedLabel }}
            </div>
          </span>
          <span>
            住院号：{{ patientInfo.patientId }}
          </span>
          <span>
            日龄：
            <input
              class="bottom-line-input"
              :data-value="sheetInfo.relObj.dayAge"
              v-model="sheetInfo.relObj.dayAge"
            />
          </span>
          <span>
            出生胎龄：
            <input
              class="bottom-line-input"
              :style="{width:'80px'}"
              :data-value="sheetInfo.relObj.gestationalAge"
              v-model="sheetInfo.relObj.gestationalAge"
            />
          </span>
        </div>
        <!--  -->
        <div class="info-con between" >
          <span>诊断：
            <span class="bottom-line" @click="updateZd(sheetInfo.relObj[`${index}_zd`])">
              {{sheetInfo.relObj[`${index}_zd`]}}
            </span>
            <!-- <input
              class="bottom-line-input full-width"
              :data-value="sheetInfo.relObj[`${index}_zd`]"
               v-model="sheetInfo.relObj[`${index}_zd`]"
            /> -->
          </span>
          <!--
              :data-value="sheetInfo.relObj.zd"
              v-model="sheetInfo.relObj.zd"
           -->
          <!-- <span>护理等级：
            <span class="boxRadio">
              <label>
                <input
                  type="radio"
                  value="重症监护"
                  v-model="sheetInfo.relObj.nursingGrade"
                  :ischecked="sheetInfo.relObj.nursingGrade == '重症监护'"
                >重症监护
              </label>
              <label>
                <input
                  type="radio"
                  value="特级"
                  v-model="sheetInfo.relObj.nursingGrade"
                  :ischecked="sheetInfo.relObj.nursingGrade == '特级'"
                >特级
              </label>
              <label>
                <input
                  type="radio"
                  value="Ⅰ级"
                  v-model="sheetInfo.relObj.nursingGrade"
                  :ischecked="sheetInfo.relObj.nursingGrade == 'Ⅰ级'"
                >Ⅰ级
              </label>
              <label>
                <input
                  type="radio"
                  value="Ⅱ级"
                  v-model="sheetInfo.relObj.nursingGrade"
                  :ischecked="sheetInfo.relObj.nursingGrade == 'Ⅱ级'"
                >Ⅱ级
              </label>
            </span>
          </span> -->
        </div>
        <excel
          :data="data"
          :index="index"
          :length="length"
          :scrollY="scrollY"
          :hasFiexHeader="true"
          :isInPatientDetails="isInPatientDetails"
          @onModalChange="(e,tr,x,y,index)=>$emit('onModalChange',e,tr,x,y,index)"
        >
        </excel>
      </div>
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheetTable-newborn_care_gzry {
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
  .between {
    display: flex;
    justify-content: space-between;
    .full-width {
      text-align: left;
      width: 500px;
    }
  }
  .bottom-line-input {
    display: inline-block;
    border: 0;
    width: 50px;
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 2px;
    height: 24px;
    position: relative;
    outline: none;
    text-align: center;
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
      // margin-right: 4px;
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
    .bottom-line {
     display: inline-block;
     border-bottom: 1px solid black;
     margin-bottom: 2px;
     height: 24px;
     width:1000px;
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
import bedRecordModal from "../modal/bedRecord-modal";

export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    isFirst: Boolean /** 首页 */,
    scrollY: Number,
    bedAndDeptChange: Object,
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
    updateZd(textZd){
      window.openSetTextModal(
        (text) => {
          sheetInfo.relObj[`${this.index}_zd`]=text
          // 当前页之后的页码，都要同步。 
          for (let i= 1; i < this.length-this.index; i++) {
              const nextIndex=i+this.index
              console.log(nextIndex)
              sheetInfo.relObj[`${nextIndex}_zd`]=text
          }   
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        textZd,
        `修改诊断`
      );
    },
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
      // if(this.HOSPITAL_ID == "fuyou"){
      //   let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
      //   if (controlReadOnly) {
      //     return true
      //   }
      // }

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
  mounted() {
    // 初始化诊断如果没有值取后端返回的默认诊断
    // this.sheetInfo.relObj.zd =
    // this.sheetInfo.relObj.zd ? this.sheetInfo.relObj.zd : this.patientInfo.diagnosis;
    if(this.index==0){
      // 初始化(第一页)诊断如果没有值取后端返回的默认诊断
      let beforeZd=this.sheetInfo.relObj.zd?this.sheetInfo.relObj.zd: this.patientInfo.diagnosis
      this.sheetInfo.relObj[`${this.index}_zd`]=
      this.sheetInfo.relObj[`${this.index}_zd`] ? this.sheetInfo.relObj[`${this.index}_zd`]: beforeZd;
    }else{
      let  beforeZd=""
      if(this.patientInfo.diagnosis){
        beforeZd=this.patientInfo.diagnosis
      }
      if(this.sheetInfo.relObj.zd){
        beforeZd=this.sheetInfo.relObj.zd
      }
      if(!!this.sheetInfo.relObj[`${this.index-1}_zd`]){
        beforeZd=this.sheetInfo.relObj[`${this.index-1}_zd`]
      }
      this.sheetInfo.relObj[`${this.index}_zd`]=
      this.sheetInfo.relObj[`${this.index}_zd`] ? this.sheetInfo.relObj[`${this.index}_zd`]:beforeZd
    }
  },
  watch:{
    // 切换页数1~10,2~20就侦听index变化
    index(newval,oldval){
       if(newval==0){
         let beforeZd=this.sheetInfo.relObj.zd?this.sheetInfo.relObj.zd: this.patientInfo.diagnosis
         this.sheetInfo.relObj[`${newval}_zd`]=
         this.sheetInfo.relObj[`${newval}_zd`] ? this.sheetInfo.relObj[`${newval}_zd`]:beforeZd
       }else{
        let beforeZd=""
        if(this.patientInfo.diagnosis){
           beforeZd=this.patientInfo.diagnosis
        }
        if(this.sheetInfo.relObj.zd){
           beforeZd=this.sheetInfo.relObj.zd
        }
        if(!!this.sheetInfo.relObj[`${newval-1}_zd`]){
           beforeZd=this.sheetInfo.relObj[`${newval-1}_zd`]
        }
         this.sheetInfo.relObj[`${newval}_zd`]=
         this.sheetInfo.relObj[`${newval}_zd`] ?this.sheetInfo.relObj[`${newval}_zd`]: beforeZd
       }
    }
  },
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel,
    bedRecordModal
  }
};
</script>
