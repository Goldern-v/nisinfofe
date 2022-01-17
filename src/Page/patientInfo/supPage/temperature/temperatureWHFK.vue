<template>
  <div class="new-singleTemperature-chart">
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <!-- <div class="head-con" flex>
        <div class="dept-select-con" v-show="openLeft"></div>
        <div class="tool-con" flex-box="1">
          <tool></tool>
        </div>
      </div> -->
      <!-- <div class="left-part">
        <patientList
          :data="data.bedList"
          v-loading="patientListLoading"
          :isSelectPatient="isSelectPatient"
        ></patientList>
      </div> -->
      <!-- <div class="right-part isRight" v-loading="tableLoading"> -->
      <div class="sheetTable-contain" v-if="patientInfo.visitId !== '0'">
        <temperatureWHFK
          class="contain-center"
          :queryTem="patientInfo"
        ></temperatureWHFK>
        <div
            class="flag-con"
            :style="{ top: flagTop }"
            flex="main:center cross:center"
            @click="openRight"
           >
            <i
              class="iconfont icon-yincang"
              v-show="rightSheet"
              style="margin-left: -1px"
            ></i>
            <i
              class="iconfont icon-xianshi"
              v-show="!rightSheet"
              style="margin-left: -2px"
            ></i>
          </div>
        <tabCon class="contain-right" :patientInfo="patientInfo" v-show="rightSheet"> </tabCon>
      </div>

    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.new-singleTemperature-chart {
  position: relative;
.flag-con {
      width: 10px;
      height: 73px;
      position: relative;
      z-index: 10;
      background-image: url('../../../../common/images/patient/隐藏框.png');
      cursor: pointer;
      transform: rotateY(180deg);

      &:hover {
        color: #5CC6A1;
      }

      i {
        font-size: 12px;
      }
    }
  .body-con {
    position: relative;

    .sheetTable-contain {
      display: flex;
      flex-direction: row;
      height: 100%;

      .contain-center {
        flex: 7;
      }

      .contain-right {
        flex: 3;
        border-left: 1px solid #eee;
        height: 100%;
        padding: 10px;
        // margin-top:10px;
      }
    }
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
import bus from "vue-happy-bus";
import { patients } from "@/api/lesion";
import patientList from "@/components/patient-list/patient-list.vue";
import print from "printing";
import formatter from "@/Page/temperature-chart/print-formatter";
import temperatureWHFK from "@/Page/temperature-chart/new-singleTemperature-chart-whfk/components/temperatureWHFK";
import tabCon from "@/Page/temperature-chart/new-singleTemperature-chart-whfk/components/tab-con";
export default {
  mixins: [common],
  props: {},
  data() {
    return {
      bus: bus(this),
      data: {
        bedList: [],
        isSave: false,
      },
      patientListLoading: true,
      tableLoading: false,
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    },
     flagTop() {
      return `${this.wih * 0.4}px`;
    },
    rightSheet() {
      return this.$store.state.temperature.rightPart;
    },
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 74 + "px";
      }
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
  },
  created() {
    this.getDate();
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }
  },
  mounted() {
    this.bus.$on("saveSheetPage", (data) => {
      if (data === "noSaveSign" || data === true) {
        this.isSave = true;
      }
    });
  },
  methods: {
    async getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        await patients(this.deptCode, {}).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
        this.bus.$emit("refreshImg");
        this.bus.$emit("refreshVitalSignList");
      }
    },
     openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
    },
  },
  components: { patientList, temperatureWHFK, tabCon },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    },
  },
};
</script>
