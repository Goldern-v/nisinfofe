<template>
  <div>
    <div
      class="contant rescue-page-container"
      @click="upSheetPageIndex(index)"
      :class="{ active: sheetPageIndex == index }"
      :style="data.titleModel.style"
    >
      <div class="header-con">
        <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
        <h1 class="title">{{ patientInfo.recordName }}</h1>
        <div class="p" flex="main:justify">
          <span>
            姓名
            <div class="bottom-line" style="width: 60px;">
              {{ patientInfo.name }}
            </div>
          </span>
          <span>
            性别
            <div class="bottom-line" style="width: 60px;">
              {{ patientInfo.sex }}
            </div>
          </span>
          <span>
            年龄
            <div class="bottom-line" style="width: 60px;">
              {{ patientInfo.age }}
            </div>
            岁
          </span>
          <span>
            医疗卡号：
            <div class="bottom-line" style="width: 60px;">
              {{ patientInfo.inpNo }}
            </div>
          </span>

          <span>
            <masked-input
              type="text"
              class="bottom-line"
              style="width: 120px;"
              :showMask="false"
              v-model="relObj.rksj"
              :data-value="relObj.rksj"
              :mask="
                () => [
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  '年',
                  /\d/,
                  /\d/,
                  '月',
                  /\d/,
                  /\d/,
                  '日'
                ]
              "
              :guide="true"
              placeholderChar=" "
            ></masked-input>
          </span>
        </div>
      </div>
      <infoTable></infoTable>
      <excel
        :data="data"
        :index="index"
        :length="length"
        :scrollY="scrollY"
        :hasFiexHeader="true"
        :isInPatientDetails="isInPatientDetails"
        ><footerInfo slot="bottomCon"></footerInfo
      ></excel>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.rescue-page-container {
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

    div.p {
      margin: 16px 0 10px;
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
    cursor: pointer;
  }

  .bottom-line {
    display: inline-block;
    padding: 2px 0;
    border: 0;
    border-bottom: 1px solid #000;
    outline: none;
    text-align: center;
  }

  input.bottom-line {
    padding: 0 0 2px;
  }
}
</style>
<script>
import excel from "@/Page/sheet-page/components/sheetTable/components/excel/excel.vue";
import { mapState, mapMutations } from "vuex";
import bus from "vue-happy-bus";
import sheetInfo from "../config/sheetInfo/index.js";
import infoTable from "./components/infoTable/infoTable";
import footerInfo from "./components/footerInfo/footerInfo";
import moment from "moment";
export default {
  props: {
    data: Object,
    index: Number,
    length: Number,
    scrollY: Number,
    isInPatientDetails: Boolean
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      relObj: sheetInfo.relObj
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
  created() {
    if (!this.relObj.rksj) {
      this.relObj.rksj = moment().format("YYYY年MM月DD日HH时");
      // this.relObj = { ...this.relObj };
    }
  },
  mounted() {},
  components: {
    excel,
    infoTable,
    footerInfo
  }
};
</script>
