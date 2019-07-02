<template>
  <div>
    <div class="chart-con" :style="{height: wih - 110 + 'px'}">
      <chart
        v-if="visible"
        :options="options"
        auto-resize
        :style="{width: '100%', height: wih - 130 + 'px'}"
      ></chart>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .chart-con
    background #fff
</style>

<script>
import common from "@/common/mixin/common.mixin.js";

export default {
  mixins: [common],
  props: {
    lineData: Array
  },
  data() {
    return {
      dates: [],
      types: [
        "空腹",
        "早餐后2H",
        "午餐后2H",
        "晚餐后2H",
        "午餐前",
        "晚餐前",
        "睡前"
      ],
      visible: false
    };
  },
  created() {
    const dates = {};

    this.lineData.forEach(item => {
      const date = item.recordDate.split(" ")[0];
      const type = item.sugarItem;
      const value = item.sugarValue;

      dates[date] = dates[date] || { date };
      dates[date][type] = value;
    });

    for (const key in dates) {
      this.dates.push(dates[key]);
    }

    setTimeout(() => {
      this.visible = true;
    }, 300);
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis"
          // formatter: (params) => {
          //   console.log(params)
          //   return 'xxx'
          // }
        },
        legend: {
          data: this.types,
          bottom: 0
        },
        grid: {
          left: "3%",
          right: "120px",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dates.map(d => d.date)
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
            formatter: "{value} mmol/L"
          },
          max: value => {
            return 16;
          },
          min: value => {
            return 0;
          }
        },
        series: this.types.map((type, i) => ({
          name: type,
          type: "line",
          symbol: "circle",
          symbolSize: 8,
          // connectNulls: true, // 连接断点
          data: this.dates.map(d => d[type]),
          markLine: i === 0 && {
            silent: false,
            data: [
              {
                yAxis: 3.9,
                label: {
                  normal: {
                    show: true,
                    formatter: "血糖最低值:{c}",
                    position: "end"
                  }
                },
                lineStyle: {
                  normal: {
                    width: 2,
                    color: "green"
                  }
                }
              },
              {
                yAxis: 9.4,
                label: {
                  normal: {
                    show: true,
                    formatter: "血糖最高值:{c}",
                    position: "end"
                  }
                },
                lineStyle: {
                  normal: {
                    width: 2,
                    color: "red"
                  }
                }
              }
            ]
          }
        }))
      };
    }
  }
};
</script>
