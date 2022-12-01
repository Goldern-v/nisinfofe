<template>
  <div class="new-singleTemperature-chart">
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight}"
    >
      <div class="sheetTable-contain" v-if="patientInfo.visitId !== '0'">
        <temperatureNew
          class="contain-center"
          :queryTem="patientInfo"
        ></temperatureNew>
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
  >>>.body-con {
    position: relative;
    overflow hidden;
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
        overflow hidden;
      }
    }
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import temperatureNew from "@/Page/temperature-chart/new-singleTemperature-chart-ytll/components/temperatureNew";
import tabCon from "@/Page/temperature-chart/new-singleTemperature-chart-lyyz/components/tab-con";
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
        return this.wih - 114 + "px";
      }
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
  },
  created() {

  },
  mounted() {
    this.bus.$on("saveSheetPage", (data) => {
      if (data === "noSaveSign" || data === true) {
        this.isSave = true;
      }
    });
     if (this.deptCode) {
      this.getData();
    }
  },
  methods: {
    getData() {
        this.bus.$emit("refreshImg");
        this.bus.$emit("refreshVitalSignList");
    },
     openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
    },
  },
  components: { temperatureNew, tabCon },
  watch: {
    deptCode(val) {
      if (val) {
        this.getData();
      }
    },
  },
};
</script>
