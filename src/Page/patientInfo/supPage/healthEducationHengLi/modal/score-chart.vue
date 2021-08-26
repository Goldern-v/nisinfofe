<template>
  <div>
    <sweet-modal ref="modal" size="big" title="评分曲线">
       <chart v-if="isChart" :options.sync="polar" auto-resize ref="pie" style="width: 100%; height: 300px"></chart>
       <div v-show="!isChart">数据格式不支持图表查看</div>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
</style>

<script>
  import {
    testResultsForChart
  } from '@/api/patientInfo'
  import axios from '@/api/axios'
  import qs from 'qs'
  import { apiPath } from '@/api/apiConfig'
  export default {
    data() {
      return {
        data: {
          date: [],
          value: []
        },
        line: {
          min: 0,
          max: 0,
        },
        isChart: false,
        xAxis: {},
        yAxis: {},
        series: []
      }
    },
    watch: {
      chartData() {
        this.render()
      }
    },
    methods: {
      open(url) {
        this.isChart = true
        this.$refs.modal.open()
        this.render(url)
      },
      close() {
        this.$refs.modal.close()
      },
      render(url) {
        axios.get(url).then(res => {
          this.xAxis = res.data.data.xAxis
          this.yAxis = res.data.data.yAxis
          if(this.yAxis.type == 'category') {
            this.series = res.data.data.series.map(item => {
              return this.$_.indexOf(this.yAxis.data, item)
            })
          } else if(this.yAxis.type == 'value') {
            this.series = res.data.data.series
          }
          if(res.data.data.series.length == 0) {
            this.$message({
              message: '暂无有效的评估记录',
              showClose: true,
              type: 'warning'
            }) 
          }
        })
    },
    },
    mounted() {
    },
    computed: {
      polar() {
        return {
          grid: {
            top: 50,
            bottom: 20,
            left: 60,
            right: 70
          },
          tooltip: {
            trigger: 'axis',
            formatter: (params) => {
              let value = this.yAxis.type == 'category'? this.yAxis.data[params[0].value]: params[0].value
              let date = params[0].axisValue
              return `<div>${date}</div><div><span style="color:#87CEFA;font-size:12px">●</span> ${value}</div>`
            }
          },
          xAxis: this.xAxis,
          yAxis: Object.assign({}, {splitLine: {show: true}}, this.yAxis),
          toolbox: {
            left: 'center',
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          series: {
            type: 'line',
            data: this.series,
            symbol: 'rect', //图标形状
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
            },
          }
        }
    }
    },
    components: {}
  }
</script>
