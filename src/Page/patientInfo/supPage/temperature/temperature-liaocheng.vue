<template>
  <div class="new-singleTemperature-chart">
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="sheetTable-contain">
        <temperatureLCEY
          class="contain-center"
          :queryTem="patientInfo"
        ></temperatureLCEY>
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
        <tabCon
          class="contain-right"
          :patientInfo="patientInfo"
          v-show="rightSheet"
        >
        </tabCon>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.new-singleTemperature-chart {
  position: relative;

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

        // margin-top:10px;
      }
    }
  }
}

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
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import bus from "vue-happy-bus";
import temperatureLCEY from "@/Page/temperature-chart/new-singleTemperature-chart-liaocheng/components/temperatureLCEY";
import tabCon from "@/Page/temperature-chart/new-singleTemperature-chart-liaocheng/components/tab-con";
export default {
  mixins: [common],
  props: {},
  data() {
    return {
      bus: bus(this),
      data: {
        bedList: [],
      },
      patientListLoading: true,
      tableLoading: false,
    };
  },
  computed: {
    patientInfo() {
      return this.$route.query;
    },
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 114 + "px";
      }
    },
    rightSheet() {
      return this.$store.state.temperature.rightPart;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
  },
  created() {

  },
  mounted() {
     // 初始化
    if (this.deptCode) {
      this.getDate();
    }
  },
  methods: {
    //关闭录入界面
    openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
    },
    async getDate() {
      if (this.deptCode) {
        // this.patientListLoading = true;
        // await patients(this.deptCode, {}).then((res) => {
        //   this.data.bedList = res.data.data.filter((item) => {
        //     return item.patientId;
        //   });
        //   this.patientListLoading = false;
        // });
        this.bus.$emit("refreshImg");
        this.bus.$emit("refreshVitalSignList");
      }
    },
  },
  components: {  temperatureLCEY, tabCon },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    },
  },
};
</script>
