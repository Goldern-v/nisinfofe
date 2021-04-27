<template>
  <div>
    <div
      class="contant catheter-page-container"
      @click="upSheetPageIndex(index)"
      :class="{active: sheetPageIndex == index}"
      :style="data.titleModel.style"
    >
      <div class="header-con">
        <h1>{{patientInfo.codeName}}</h1>
        <p flex="main:justify">
          <span>病人姓名：{{patientInfo.name}}</span>
          <span>科室：{{patientInfo.wardName}}</span>
          <span>床号：{{patientInfo.bedLabel}}</span>
          <span>住院号：{{patientInfo.inpNo}}</span>
          <span>入院日期：{{patientInfo.admissionDate | toymd}}</span>
          <!-- <span>性别：{{patientInfo.sex}}</span> -->
          <!-- <span>年龄：{{patientInfo.age}}</span> -->
          <!-- <span class="diagnosis-con" :title="patientInfo.diagnosis" @click="openSetDiagsModal(patientInfo)">诊断：<span class="sheet-diagnosis">{{patientInfo.diagnosis}}</span></span> -->
          <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
        </p>
      </div>
      <infoTable :pageNo="index" ></infoTable>
      <excel :data="data" :index="index" :length="length"></excel>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.catheter-page-container {
  & {
    border-radius: 2px;
    position: relative;
    background: #FFFFFF;
    box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
    padding: 20px 20px;
    box-sizing: content-box;
    width: 1040px;
    margin: 0 auto 20px;

    &.active {
      // background red
    }
  }

  .header-con {
    text-align: center;

    h1 {
      font-size: 22px;
      color: #000;
      padding-top: 15px;
      padding-bottom: 10px;
      margin: 0;
    }

    span {
      margin-right: 4px;
      font-size: 13px;
      color: #000;
    }

    p {
      margin: 16px 0 13px;
      text-align: left;
    }
  }

  .add-btn {
    position: absolute;
    top: 60px;
    right: 20px;
  }

  .diagnosis-con {
    max-width: 340px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
<script>
import excel from "./components/excel/excel.vue";
import { mapState, mapMutations } from "vuex";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import infoTable from "./components/infoTable/infoTable";
export default {
  props: {
    data: Object,
    index: Number,
    length: Number
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo
    };
  },
  computed: {
    patientInfo() {
      // return this.sheet.patientInfo
      return this.sheetInfo.selectBlock || {};
    },
    sheetPageIndex() {
      return this.sheet.sheetPageIndex;
    },
    title() {
      switch (sheetInfo.sheetType) {
        case "jointnew":
          {
            return "护理记录单（关节外科）";
          }
          break;
        case "gynecologynew":
          {
            return "护理记录单（妇科）";
          }
          break;
        case "endocrinologynew":
          {
            return "护理记录单（内分泌科）";
          }
          break;
        case "neurology":
          {
            return "护理记录单（神经内科）";
          }
          break;
        default:
          break;
      }
    },
    ...mapState(["sheet"])
  },
  methods: {
    openSetDiagsModal(patientInfo) {
      this.bus.$emit("openSetDiagsModal", patientInfo);
    },
    ...mapMutations(["upSheetPageIndex"])
  },
  filters: {
    toymd(val) {
      return new Date(val).Format("yyyy-MM-dd");
    }
  },
  created() {},
  mounted() {
    console.log(this.data, "this.data");
  },
  components: {
    excel,
    infoTable
  }
};
</script>
