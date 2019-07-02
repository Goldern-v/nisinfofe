<template>
  <div>
    <sweet-modal ref="modal" :modalWidth="900" :title="title" :fullBtn="true" @isfull="isfull">
      <div class="form-con" v-loading="loading" :style="{height: modelHeight}">
        <chart
          v-if="showChart"
          :options="options"
          auto-resize
          :style="{width: '100%', height: '100%'}"
        ></chart>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="close">关闭</el-button>
      </div>
    </sweet-modal>
  </div>
</template>
<style lang='scss' scoped>
.label {
  font-size: 14px;
  color: #333333;
  width: 100px;
  text-align: right;
}
.input-item {
  width: 250px;
  margin-right: 30px;
  /* & /deep/ input {
    height: 30px;
  } */
}
.unit {
  margin-left: -25px;
  width: 25px;
}
.mask-input {
  height: 37px;
  background: #fff;
  border: 1px solid #c2cbd2;
  border-radius: 2px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid rgb(191, 217, 210);
  box-sizing: border-box;
  color: rgb(31, 61, 53);
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
<script>
import common from "@/common/mixin/common.mixin";
import { getFluidChart } from "../api";
import { model } from "../store";
import moment from "moment";
import { setTimeout } from "timers";
export default {
  mixins: [common],
  data() {
    return {
      title: "引流量曲线",
      loading: false,
      chartList: [],
      modelHeight: "calc(80vh - 130px)",
      showChart: false
    };
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
          formatter: params => {
            return `${params[0].name}<br>${params[0].marker}${
              params[0].seriesName
            }：${params[0].value}ml`;
          }
        },
        // legend: {
        //   data: "引流量总结",
        //   bottom: 0
        // },
        grid: {
          top: "20px",
          left: "20px",
          right: "20px",
          bottom: "30px",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chartList.map(d => d.x)
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true
          },
          axisLine: {
            onZero: false
          },
          axisLabel: {
            formatter: "{value} ml"
          },
          min: value => {
            return 0;
          }
        },
        series: [
          {
            name: "引流量总结",
            type: "line",
            symbol: "circle",
            symbolSize: 8,
            data: this.chartList.map(d => d.y),
            markLine: {
              silent: false
            }
          }
        ]
      };
    }
  },
  methods: {
    validate() {
      if (model.selectedBlock.status !== undefined) {
        return true;
      } else {
        this.$message.warning("请先选择管道");
        return false;
      }
    },
    async init() {
      this.loading = true;
      this.modelHeight = "calc(80vh - 130px)";
      let { patientId, visitId } = model.selectedPatient;
      let { orderNo, orderSubNo, startDate } = model.selectedBlock;
      let res = await getFluidChart(
        patientId,
        visitId,
        orderNo,
        orderSubNo,
        startDate
      );
      this.chartList = res.data.data.list.map(item => {
        return {
          x: item.recordDate,
          y: item.fluidSize
        };
      });
      this.loading = false;
    },
    open() {
      if (!this.validate()) return;
      this.showChart = false;
      this.init();
      this.$refs.modal.open();
      setTimeout(() => {
        this.showChart = true;
      }, 300);
    },
    close() {
      this.$refs.modal.close();
    },
    isfull(toogle) {
      this.modelHeight = toogle ? "calc(100vh - 130px)" : "calc(80vh - 130px)";
      this.showChart = false;
      setTimeout(() => {
        this.showChart = true;
      }, 0);
    }
  },
  components: {}
};
</script>
