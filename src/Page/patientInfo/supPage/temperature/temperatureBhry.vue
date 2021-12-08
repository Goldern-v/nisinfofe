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
        <temperatureBHRY
          class="contain-center"
          :queryTem="patientInfo"
        ></temperatureBHRY>
        <tabCon class="contain-right" :patientInfo="patientInfo"> </tabCon>
      </div>
      <div class="sheetTable-contain" v-if="patientInfo.visitId === '0'">
        <temperatureBHRYNewBorn
          class="contain-center"
          :queryTem="patientInfo"
        ></temperatureBHRYNewBorn>
        <tabCon class="contain-right" :patientInfo="patientInfo"> </tabCon>
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
import temperatureBHRY from "@/Page/temperature-chart/new-singleTemperature-chart-beihairenyi/components/temperatureBHRY";
import temperatureBHRYNewBorn from "@/Page/temperature-chart/new-singleTemperature-chart-beihairenyi/components/temperatureBHRYNewBorn.vue";
import tabCon from "@/Page/temperature-chart/new-singleTemperature-chart-beihairenyi/components/tab-con";
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
  },
  components: { patientList, temperatureBHRY, tabCon, temperatureBHRYNewBorn },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
      }
    },
  },
};
</script>
