<template>
  <div v-loading="pageLoading">
    <chart v-if="isChart" :options="polar1" auto-resize ref="pie" style="width: 100%; height: 300px"></chart>
    <!-- <div v-show="!isChart">数据格式不支持图表查看</div> -->
    <chart v-if="!isChart" :options="polar2" auto-resize ref="pie2" style="width: 100%; height: 300px"></chart>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>

<script>
  import {
    testResultsForChart
  } from "@/api/patientInfo";
  export default {
    data() {
      return {
        data: {
          date: [],
          value: []
        },
        line: {
          min: 0,
          max: 0
        },
        pageLoading: true,
        yValueMap: {},
        isChart: true
      };
    },
    methods: {
      init() {
        this.isChart = true;
        this.pageLoading = true;
        this.data = {
          date: [],
          value: []
        };
        this.line = {
          min: 0,
          max: 0
        };
        this.yValueMap = {};
      },
      open(chartData) {
        console.log(chartData,999)
        this.render(chartData);
      },
      render(chartData) {
        //   this.$refs.pie.showLoading({
        //   text: '正在加载...',
        //   color: '#4BB08D',
        //   textColor: '#333',
        //   maskColor: 'rgba(255, 255, 255, 0.8)',
        //   zlevel: 10
        // })
        testResultsForChart(chartData.testNo, chartData.itemName).then(res => {
          let date = [];
          let value = [];
          this.pageLoading = false;
          for (let item of res.data.data.axisList) {
            // item.x = 'q'
            date.push(item.x);
            value.push(item.y);
          }
          this.data = {
            date,
            value
          };
          this.line.min = res.data.data.rangeMin || 0;
          this.line.max = res.data.data.rangeMax || 0;
          if (res.data.data.type == "value") {
            this.isChart = true;
          } else {
            this.yValueMap = res.data.data.yValueMap;
            this.isChart = false;
          }
        });
      }
    },
    mounted() {
      // this.render()
    },
    computed: {
      polar1() {
        return {
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            data: this.data.date,
            axisLine: {onZero: false},
            axisLabel: {
              formatter: (value, index) => {
                return new Date(value).Format('MM-dd').toString()
              }
            }
          },
          yAxis: {
            splitLine: {
              show: false
            },
             axisLine: {onZero: false},
            max: value => {
              return (Math.max(value.max, 0) * 1.2).toFixed(2);
            },
            min: value => {
              return (Math.min(value.min, this.line.min) * 0.6).toFixed(2);
            }
          },
          dataZoom: [
        {
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'empty',
            // zoomLock: true,
            // startValue: 0,
            // endValue: 0,
            minValueSpan: 0,
            maxValueSpan: 5,
            showDetail: false,
            showDataShadow: false,
            backgroundColor: '#f5f5f5',
            fillerColor: '#ddd',
            borderWidth: 0,
            borderColor: '#fff',
            handleIcon: '1111',
            handleStyle: {
              borderColor: '#fff',
            },
            bottom: 10,
        },
        {
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty',
            zoomLock: true,
            minValueSpan: 0,
            maxValueSpan: 5,
        },
        // {
        //     type: 'inside',
        //     yAxisIndex: 0,
        //     filterMode: 'empty'
        // }
        // {
        //     id: 'dataZoomY',
        //     type: 'slider',
        //     yAxisIndex: [0],
        //     filterMode: 'empty'
        // }
    ],
          series: {
            type: "line",
            data: this.data.value,
            symbol: "rect", //图标形状
            symbolSize: 8, //图标尺寸
            itemStyle: {
              normal: {
                color: "#87CEFA" //图标颜色
              }
            },
            lineStyle: {
              normal: {
                width: 2, //连线粗细
                color: "#87CEFA" //连线颜色
              }
            }
          }
        };
      },
      polar2() {
        return {
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            data: this.data.date
          },
          yAxis: {
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: (value, index) => {
                return this.yValueMap[value] || "";
              }
            }
          },
          toolbox: {
            left: "center",
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              restore: {},
              saveAsImage: {}
            }
          },
          series: {
            type: "line",
            data: this.data.value,
            symbol: "rect", //图标形状
            symbolSize: 8, //图标尺寸
            itemStyle: {
              normal: {
                color: "#87CEFA" //图标颜色
              }
            },
            lineStyle: {
              normal: {
                width: 2, //连线粗细
                color: "#87CEFA" //连线颜色
              }
            }
          }
        };
      }
    },
    components: {}
  };
</script>
