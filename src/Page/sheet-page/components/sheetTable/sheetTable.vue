<template>
  <div>
    <div
      class="contant sheet-page-container"
      :style="data.titleModel.style"
      :class="{ readOnly }"
    >
      <img
        src="../../images/仅供查阅.jpg"
        class="readOnly-img no-print"
        v-if="readOnly"
        alt
      />
      <component
        v-bind:is="tableHead"
        :patientInfo="patientInfo"
        :index="index"
        :bedAndDeptChange="bedAndDeptChange"
      ></component>
      <excel
        :patientInfo="patientInfo"
        :data="data"
        :index="index"
        :length="length"
        :scrollY="scrollY"
        :scrollX="scrollX"
        :hasFiexHeader="true"
        :isInPatientDetails="isInPatientDetails"
        :listData="listData"
        :specialLis="specialLis"
        @onModalChange="(e,tr,x,y,index)=>$emit('onModalChange',e,tr,x,y,index)"
        :sheetTagsHeight="sheetTagsHeight"
        :evalTagHeight="evalTagHeight"
      ></excel>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.sheet-page-container {
  & {
    border-radius: 2px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: border-box;
    width: 1100px; // 关键
    margin: 0 auto 20px;
    box-sizing: content-box;
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
      font-size: 13px;
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

  .bottom-line {
    display: inline-block;
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 2px;
  }

  .bottom-line-input {
    display: inline-block;
    border: 0;
    width: 30px;
    border-bottom: 1px solid #000;
    padding: 2px 0 2px 2px;
    height: 24px;
    position: relative;
    outline: none;
    text-align: center;
    // top -2px
  }
}
</style>
<script>
import excel from "./components/excel/excel.vue";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import $ from "jquery";
import common from "@/common/mixin/common.mixin";
import tableHead from "./components/table-head/table-head";
import tableHeadPrenata from "./components/table-head/table-head-prenatal";
import tableHeadDiagnosis from "./components/table-head/table-head-diagnosis";
import tableHeadWx from "./components/table-head/table-head-wx";
import tableHeadGzry from "./components/table-head/table-head-gzry";
import tableHeadLc from "./components/table-head/table-head-lc";
import tableHeadLinyi from "./components/table-head/table-head-linyi";
import tableHeadTbhldLc from "./components/table-head/table-head-tbhld-lc";
import tableHeadWj from "./components/table-head/table-head-wj";
import tableHeadSdlj from "./components/table-head/table-head-sdlj";
import tableHeadHd from "./components/table-head/table-head-hd";
import tableHeadFuyou from "./components/table-head/table-head-fuyou";
import tableHeadFoSanXingTan from "./components/table-head/table-head-foshanxingtan.vue";
import tableHeadGuangDoTonJiang from "./components/table-head/table-head-guangdotonjiang.vue";
import tableHeadXieGang from "./components/table-head/table-head-xiegang";
import tableHeadNanFangZhongXiYi from "./components/table-head/table-head-nanfangzhongxiyi";
import tableHeadBeiHaiRenYi from "./components/table-head/table-head-beihairenyi";
import tableHeadFoShanRenYi from "./components/table-head/table-head-foshanrenyi";
import tableHeadNfykdxsdyy from "./components/table-head/table-head-nfykdxsdyy";
import tableHeadHengLi from "./components/table-head/table-head-hengli";
import tableHeadShanNan from "./components/table-head/table-head-shannan";
import tableHeadQz from "./components/table-head/table-head-qz";
import tableHeadWhFk from "./components/table-head/table-head-whfk"
import tableHeadLcey from "./components/table-head/table-head-lcey"
import tableHeadWhYx from "./components/table-head/table-head-whyx.vue"
import tableHeadQhWy from "./components/table-head/table-head-qhwy.vue"
import tableHead925 from "./components/table-head/table-head-925.vue"
import tableHeadLyyz from "./components/table-head/table-head-lyyz.vue"
import tableHeadYtll from "./components/table-head/table-head-ytll.vue"
import tableHeadZhzxy from "./components/table-head/table-head-zhzxy.vue"
import tableHeadWeihai from './components/table-head/table-head-weihai.vue'
import tableHeadDglb from "./components/table-head/table-head-dglb.vue"
import tableHeadWhhk from './components/table-head/table-head-whhk.vue'
import tableHeadZjhj from './components/table-head/table-head-zjhj.vue'
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    scrollY: Number,
    scrollX: Number,
    isInPatientDetails: Boolean,
    bedAndDeptChange: Object,
    listData: Array,
    specialLis: Array,
    sheetTagsHeight: Number,
    evalTagHeight: Number,
  },
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      //开启后端控制readOnly的医院
      readOnlyList: [
        "fuyou",
        "zhzxy"
      ]
    };
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
      if (sheetInfo.sheetType === "obstetrics") return false;

      if(this.readOnlyList.includes(this.HOSPITAL_ID)){
        let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
        if (controlReadOnly) {
          return true
        }
      } else {
        return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
      }
    },
    tableHead() {
      /** 产科 */
      if (sheetInfo.sheetType === "prenatal") {
        return tableHeadPrenata;
      } else if (sheetInfo.sheetType === "special") {
        return tableHeadTbhldLc;
      } else if (this.HOSPITAL_ID == "weixian") {
        return tableHeadWx;
      } else if (this.HOSPITAL_ID == "lingcheng") {
        return tableHeadLc;
      } else if (['lyxrm', 'stmz'].includes(this.HOSPITAL_ID)) {
        return tableHeadLinyi;
      } else if (this.HOSPITAL_ID == "wujing") {
        return tableHeadWj;
      } else if (this.HOSPITAL_ID == "huadu") {
        return tableHeadHd;
      } else if (this.HOSPITAL_ID == "fuyou") {
        return tableHeadFuyou;
      } else if (this.HOSPITAL_ID == "xiegang") {
        return tableHeadXieGang;
      } else if (this.HOSPITAL_ID == "nanfangzhongxiyi") {
        return tableHeadNanFangZhongXiYi;
      } else if (this.HOSPITAL_ID == "beihairenyi") {
        return tableHeadBeiHaiRenYi;
      } else if (this.HOSPITAL_ID == "foshanrenyi") {
        return tableHeadFoShanRenYi;
      } else if (this.HOSPITAL_ID == "nfyksdyy") {
        return tableHeadNfykdxsdyy;
      } else if (this.HOSPITAL_ID == "hengli") {
        return tableHeadHengLi;
      } else if (this.HOSPITAL_ID == "guizhou") {
        return tableHeadGzry;
      }else if (this.HOSPITAL_ID == "925") {
        return tableHead925;
      }else if (this.HOSPITAL_ID == "shannan") {
        return tableHeadShanNan;
      } else if (this.HOSPITAL_ID == "quzhou") {
        return tableHeadQz;
      } else if (this.HOSPITAL_ID == "fsxt") {
        return tableHeadFoSanXingTan;
      } else if (this.HOSPITAL_ID == "whfk") {
        return tableHeadWhFk;
      } else if (this.HOSPITAL_ID == "sdlj") {
        return tableHeadSdlj;
      }else if (this.HOSPITAL_ID == "liaocheng") {
        return tableHeadLcey;
      } else if (this.HOSPITAL_ID == "whyx") {
        return tableHeadWhYx;
      } else if (this.HOSPITAL_ID == "gdtj") {
        return tableHeadGuangDoTonJiang;
      }else if(this.HOSPITAL_ID == "qhwy"){
        return tableHeadQhWy;
      }else if(this.HOSPITAL_ID == "lyyz"){
        return tableHeadLyyz;
      }else if(this.HOSPITAL_ID == "ytll"){
        return tableHeadYtll;
      }else if(this.HOSPITAL_ID == "zhzxy"){
        return tableHeadZhzxy;
      } else if (this.HOSPITAL_ID == 'whsl') {
        return tableHeadWeihai
      } else if (this.HOSPITAL_ID == 'dglb') {
        return tableHeadDglb
      } else if (this.HOSPITAL_ID == 'whhk') {
        return tableHeadWhhk
      }else if (this.HOSPITAL_ID == 'zjhj') {
        return tableHeadZjhj
      } else {
        return tableHead;
      }
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
