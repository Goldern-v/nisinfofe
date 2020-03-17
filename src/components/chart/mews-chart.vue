<template>
  <div>
    <chart
      :options="option"
      style="width: 100%; height: 400px;"
      auto-resize
      ref="chart"
    ></chart>
  </div>
</template>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 16px;
  color: #000;
  margin-bottom: 5px;
}
.info {
  text-align: center;
  span + span {
    margin-left: 20px;
    font-size: 14px;
    color: #333;
  }
}
</style>
<script>
import moment from "moment";
export default {
  props: {
    data: Array
  },
  data() {
    return {};
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            return `${params[0].data[0]}<br/>
            体温得分: ${params[0].data[2] || "暂无"}<br/>
            收缩压得分: ${params[0].data[3] || "暂无"}<br/>
            脉搏得分: ${params[0].data[4] || "暂无"}<br/>
            心率得分: ${params[0].data[5] || "暂无"}<br/>
            呼吸得分: ${params[0].data[6] || "暂无"}<br/>
            意识得分: ${params[0].data[7] || "暂无"}<br/>
            MEWS总得分: ${params[0].data[1] || "暂无"}
            `;
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "time",
          boundaryGap: false,
          axisLabel: {
            formatter: function(value, index) {
              return moment(value).format("MM-DD");
            }
          },
          minInterval: 3600 * 24 * 1000,
          maxInterval: 3600 * 24 * 1000
        },
        yAxis: {
          name: "MEWS总得分",
          min: 0,
          max: 10,
          type: "value",
          boundaryGap: [0, "100%"]
        },
        dataZoom: [
          //   {
          //     type: "inside",
          //     start: 0,
          //     end: 80
          //   },
          {
            start: 100 - 100 * (20 / this.data.length),
            end: 100,
            minValueSpan: 3600 * 24 * 1000 * 1,
            maxValueSpan: 3600 * 24 * 1000 * 20,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            type: "line",
            // name: "MEWS总分",
            data: this.data,
            lineStyle: {
              normal: {
                width: 2, //连线粗细
                color: "#909BA3" //连线颜色
              }
            },
            // symbol: "circle'", //图标形状
            symbolSize: 8, //图标尺寸
            itemStyle: {
              normal: {
                color: item => {
                  if (!item.data) return;
                  /** 高危 */
                  if (
                    item.data[1] >= 4 ||
                    item.data.slice(2, 9).find(o => o >= 3)
                  ) {
                    return "#FF211C";
                  } else if (
                    item.data[1] < 4 ||
                    item.data.slice(2, 9).find(o => o >= 2)
                  ) {
                    /** 预警 */
                    return "#FFB148";
                  } else {
                    return "#BFBFBF";
                  }
                  return "red";
                },
                borderType: "solid",
                borderWidth: 2
              }
            }
          }
        ],

        markLine: {
          silent: true,
          data: [
            {
              yAxis: 0
            },
            {
              yAxis: 3
            },
            {
              yAxis: 5
            },
            {
              yAxis: 10
            }
          ]
        }
      };
    }
  },
  methods: {},
  mounted() {
    // this.data = [
    //   ["2019/08/11 00:00:00", 1],
    //   ["2019/08/12 00:00:00", 2],
    //   ["2019/08/12 12:00:00", 2],
    //   ["2019/08/12 13:00:00", 2],
    //   ["2019/08/13 00:00:00", 3],
    //   ["2019/08/14 00:00:00", 4],
    //   ["2019/08/15 00:00:00", 7],
    //   ["2019/08/16 00:00:00", 8],
    //   ["2019/08/17 00:00:00", 9],
    //   ["2019/08/18 00:00:00", 10],
    //   ["2019/08/19 00:00:00", 11],
    //   ["2019/08/20 00:00:00", 12],
    //   ["2019/08/21 00:00:00", 13],
    //   ["2019/08/22 00:00:00", 14]
    // ];
  },
  components: {}
};
</script>
