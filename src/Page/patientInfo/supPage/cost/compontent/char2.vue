<template>
  <div>
    <el-row class="header-con" type="flex" justify="space-between" align="middle">
      <span class="title">每日费用曲线</span>
      <div>
        <div class="show-chart" :class="{active: isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-quxian"></i>
        </div>
        <div class="show-table" :class="{active: !isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </el-row>
    <chart :options="polar" auto-resize ref="pie" v-if="isChart && !nullData"></chart>
    <div v-if="isChart && nullData">
      <img src="../img/数据默认.png" alt="" style="margin: 105px auto; display: block">
    </div>
    <div class="table-con" v-if="!isChart">
      <el-table :data="tableData" border show-summary style="width: 100%" height="283" :summary-method="getSummaries">
        <el-table-column type="index" label=" " width="70">
        </el-table-column>
        <el-table-column prop="billingDateTime" min-width="180px" sortable label="时间">
        </el-table-column>
        <el-table-column prop="costs" min-width="120px" sortable label="费用">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .header-con
    height 37px
    padding 0 8px 0 14px
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    .title
      font-size: 13px;
      color: #333333;
      font-weight bold
  .echarts {
    height: 280px;
    width 100%
}    
</style>

<script>
  import {
    getFeeByDay
  } from '@/api/patientInfo'
  export default {
    data() {
      return {
        isChart: true,
        tableData: '',
        data: {
          date: [],
          value: []
        },
        nullData: false
      }
    },
    computed: {
      polar() {
        return {
          // Make gradient line here
          // visualMap: [{
          //   // show: false,
          //   type: 'continuous',
          //   seriesIndex: 0,
          //   min: 0,
          //   max: 400
          // }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: this.data.date
          }],
          yAxis: [{
            splitLine: {
              show: false
            }
          }],
          grid: [{
            bottom: '15%'
          }],
          series: [{
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
            type: 'line',
            showSymbol: true,
            data: this.data.value
          }]
        };
      }
    },
    mounted() {
      if(this.$refs.pie) {
        this.$refs.pie.showLoading({
        text: '正在加载...',
        color: '#4BB08D',
        textColor: '#333',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 10
      })
      }
      this.nullData = false
      getFeeByDay(this.$route.query.patientId, this.$route.query.visitId).then((res) => {
        let date = []
        let value = []
        let tableData = []
        if(res.data.data.list.length == 0){
          this.nullData = true
        }
        for (let item of res.data.data.list) {
          date.push(item.billingDateTime)
          value.push(item.costs)
          tableData.push({
            billingDateTime: item.billingDateTime,
            costs: item.costs
          })
        }
        this.data = {
          date,
          value
        }
        this.tableData = tableData.reverse()
        if(this.$refs.pie){
          this.$refs.pie.hideLoading()
        }
      })
    },
    methods: {
      getSummaries(param) {
        const {
          columns,
          data
        } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '费用';
            return;
          }
          if (index === 1) {
            sums[index] = '';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = parseFloat(sums[index]).toFixed(2) + '';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      }
    },
    components: {}
  }
</script>
