<template>
  <div>
    <div
      class="contant"
      v-if="showSheetPage"
      @click="upSheetPageIndex(index)"
      :class="{active: sheetPageIndex == index}"
    >
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/南医三院骨研院骨科医院logo.png" />-->
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/厚街医徽.png" />-->
      <!-- <img class="his-logo"
      src="../../../../common/images/his-logo/山西孝义logo.png" />-->
      <div
        style="
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        "
      >{{ HOSPITAL_NAME_SPACE }}</div>
      <div class="header-con">
        <h1>{{sheetInfo.formTitle||"护嘱单"}}</h1>
        <p flex="main:justify">
          <span>姓名：{{patientInfo.name}}</span>
          <span>性别：{{patientInfo.sex}}</span>
          <span>年龄：{{patientInfo.age}}</span>
          <span>科室：{{patientInfo.deptName}}</span>
          <span>入院日期：{{patientInfo.admissionDate | toymd}}</span>
          <span>床号：{{patientInfo.bedLabel}}</span>
          <!-- <span class="diagnosis-con" :title="patientInfo.diagnosis">诊断：{{patientInfo.diagnosis}}</span> -->
          <span>住院号：{{patientInfo.inpNo}}</span>
          <!-- <span>入院日期：{{$route.query.admissionDate}}</span> -->
        </p>
      </div>
      <excel :data="data" :index="index" :length="length"></excel>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contant {
  //border-radius: 2px;
  position: relative;
  background: #FFFFFF;
  // box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.5);
  padding: 20px 20px;
  box-sizing: border-box;
  width: 700px; //关键
  margin: 0 auto 20px;

  &.active {
    // background red
  }
}

.header-con {
  text-align: center;
  width:100%
  h1 {
    font-size: 22px;
    color: #000;
    padding-top: 10px;
    margin 0
  }

  span {
    margin-right: 4px;
    font-size: 13px;
    color: #000;
  }

  p {
    margin: 10px 0 13px;
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
.diagnosis-con
  max-width 340px
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
</style>
<script>
import excel from "./components/excel/excel.vue";
import { mapState, mapMutations } from "vuex";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
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
      return this.sheet.patientInfo;
      // return this.sheetInfo.selectBlock || {}
    },
    sheetPageIndex() {
      return this.sheet.sheetPageIndex;
    },
    title() {
      switch (sheetInfo.sheetType) {
        case "jointnew":
          {
            return "护嘱单（关节外科）";
          }
          break;
        case "gynecologynew":
          {
            return "护嘱单（妇科）";
          }
          break;
        case "endocrinologynew":
          {
            return "护嘱单（内分泌科）";
          }
          break;
        case "neurology":
          {
            return "护嘱单（神经内科）";
          }
          break;
        default:
          return "护嘱单-";
          break;
      }
    },
    showSheetPage() {
      let startPage = this.sheetInfo.startPage;
      let endPage = this.sheetInfo.endPage;
      let index = this.index + this.sheetInfo.sheetStartPage;
      if (startPage && endPage) {
        if (index >= Number(startPage) && index <= Number(endPage)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    ...mapState(["sheet"])
  },
  methods: {
    ...mapMutations(["upSheetPageIndex"])
  },
  filters: {
    toymd(val) {
      return new Date(val).Format("yyyy-MM-dd");
    }
  },
  created() {},
  destroyed() {} /* fix vue-happy-bus bug */,
  components: {
    excel
  }
};
</script>
