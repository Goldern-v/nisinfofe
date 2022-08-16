<template>
  <sweet-modal ref="modalName" :modalWidth="900" title="MEWS评分曲线">
    <div class="title" v-if="HOSPITAL_ID=='sdlj'">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title" v-else>{{ HOSPITAL_NAME }}</div>
    <div class="info">
      <span>患者：{{ patientInfo.name }}</span>
      <span>性别：{{ patientInfo.sex }}</span>
      <span>年龄：{{ patientInfo.age }}</span>
      <span>科室：{{ patientInfo.deptName }}</span>
      <span>床号：{{ patientInfo.bedLabel }}</span>
      <span>ID号：{{ patientInfo.patientId }}</span>
    </div>
    <div class="chart-con">
      <mewsChart v-if="showChart" :data="chartData"></mewsChart>
    </div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
      <el-button
        class="modal-btn"
        type="primary"
        @click="$refs.modalName.close()"
        >确认</el-button
      >
    </div>
  </sweet-modal>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 18px;
  color: #000;
  margin-bottom: 5px;
  font-weight: bold;
}
.info {
  text-align: center;
  span + span {
    margin-left: 40px;
    font-size: 13px;
    color: #333;
  }
}
</style>
<script>
import mewsChart from "@/components/chart/mews-chart";
import { getMewsItemScoreList } from "../api/api.js";
import currDataObj from "../components/store/index";
import common from "@/common/mixin/common.mixin.js";
import { getPatientInfo } from "@/api/common.js";
export default {
  props: {},
  mixins: [common],
  data() {
    return {
      showChart: true,
      chartData: [],
      patientInfo: {}
    };
  },
  methods: {
    open() {
      this.$refs.modalName.open();
      this.showChart = false;
      this.patientInfo = {};

      getPatientInfo(currDataObj.patientId, currDataObj.visitId).then(res => {
        this.patientInfo = res.data.data;
      });
      getMewsItemScoreList(currDataObj.patientId, currDataObj.visitId).then(
        res => {
          this.chartData = res.data.data.list.map(item => [
            item.evalDate,
            item.mewsScore,
            item.temperatureScore,
            item.systolicPressureScore,
            item.pulseScore,
            item.heartRateScore,
            item.breathScore,
            item.consciousnessScore
          ]);
          this.showChart = true;
        }
      );
    },
    post() {}
  },
  components: {
    mewsChart
  }
};
</script>
