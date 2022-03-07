<template>
  <div>
    <div
      class="chart-con"
      :style="{height: wih - 110 + 'px'}"
      :class="{lc:HOSPITAL_ID == 'lingcheng' || HOSPITAL_ID == 'liaocheng'}"
    >
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
.chart-con {
  background: #fff;

  &.lc {
    padding-right: 134px;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";

export default {
  mixins: [common],
  props: {
    lineData: Array,
    sugarItem: Array
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
    // 血糖曲线图打点有问题（项目名称有误）的话改这里
    if (["lingcheng","liaocheng","foshanrenyi"].includes(this.HOSPITAL_ID)) { // 通过接口请求项目类型的医院
      this.types = this.sugarItem.map(item => {
        return item.vitalSign;
      });
    }
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
          bottom: this.HOSPITAL_ID == "lingcheng" ? "12%" : "8%",
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
                yAxis: Math.min.apply(Math, this.lineData.map(item => item.sugarValue)),
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
                yAxis:  Math.max.apply(Math, this.lineData.map(item => item.sugarValue)),
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
