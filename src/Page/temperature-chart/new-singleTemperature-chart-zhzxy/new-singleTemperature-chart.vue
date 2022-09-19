<template>
  <div class="new-singleTemperature-chart">
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
    <div class="head-con" flex>
        <div class="dept-select-con" v-show="openLeft"></div>
        <div class="tool-con" flex-box="1">
        </div>
      </div>

      <div class="left-part" >
        <patientList
          :data="data.bedList"
          v-loading="patientListLoading"
          :isSelectPatient="isSelectPatient"
        ></patientList>
      </div>
      <div
        class="right-part"
        v-loading="tableLoading"
        :class="openLeft ? 'isLeft' : 'isRight'"
      >
        <div class="sheetTable-contain">
          <Temperature
            class="contain-center"
            :queryTem="patientInfo"
          ></Temperature>
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
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.new-singleTemperature-chart {
  position: relative;
  .body-con {
    position: relative;
    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: 0px;
      bottom: 0;
    }

    .right-part {
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);

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
          // padding: 10px;
          // margin-top:10px;
        }
      }
    }
    .isLeft {
      margin-left: 199px;
      }
  }
}

.flag-con {
  width: 10px;
  height: 73px;
  position: relative;
  z-index: 10;
  background-image: url('../../../common/images/patient/隐藏框.png');
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
import { patients } from "@/api/lesion";
import patientList from "@/components/patient-list/patient-list.vue";
import Temperature from "./components/temperatureNew.vue";
import tabCon from "./components/tab-con.vue";
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
    // 接收左侧患者栏子组件传来的是否左靠的值
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    rightSheet() {
      return this.$store.state.temperature.rightPart;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
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
    // 初始化
    if (this.deptCode) {
      this.getDate();
    }
  },
  mounted() {},
  methods: {
    //关闭录入界面
    openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        let config = process.env.hasFollow ? {showFollew:true} : null
        patients(this.deptCode,config).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          this.patientListLoading = false;
        });
      }
    },
    async isSelectPatient(item) {
      await this.$store.commit("upPatientInfo", item);
      this.bus.$emit("refreshImg");
      this.bus.$emit("refreshVitalSignList");
    },
  },
  components: { patientList, Temperature, tabCon },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    },
  },
};
</script>
