<template>
  <div>
    <el-row class="header-con" type="flex" justify="space-between" align="middle">
      <span class="title">费用饼图</span>
      <div>
        <div class="show-chart" :class="{active: isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-bingtu"></i>
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
      <el-table :data="tableData" border show-summary style="overflow-x: hidden" height="283" :summary-method="getSummaries">
        <el-table-column type="index" label=" " width="70">
        </el-table-column>
        <el-table-column prop="feeClass" min-width="180px" label="费用分类">
        </el-table-column>
        <el-table-column prop="costs" min-width="120px" sortable label="金额">
        </el-table-column>
        <el-table-column prop="percent" sortable label="占比">
          <template slot-scope="scope">
              <span>{{ scope.row.percent + '%'}}</span>
</template>
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

<style lang="stylus">
.show-chart, .show-table
  width 25px
  height 37px;
  line-height 37px
  float left
  text-align center
  cursor pointer
  i
    font-size 25px
    color #ABAEAE 
  &.active
    i   
      color #4BB08D
.table-con
  .el-table__body-wrapper
    overflow-x hidden      
</style>

<script>
  import {
    getFeePercent
  } from '@/api/patientInfo'
  export default {
    data() {
      return {
        data: [],
        isChart: true,
        list: [],
        tableData: [],
        nullData: false
      }
    },
    computed: {
      polar() {
        return {
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            left: 10,
            top: 10,
            data: this.data,
          },
          series: [{
            color: ['#CDDC39', '#F8AC59', '#EB505F', '#1A85C7', '#50E3C3', '#ED54BB', '#2196F3', '#79ADD6', '#4BB08D', '#607D8B'],
            type: 'pie',
            radius: ['50%', '70%'],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
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
      getFeePercent(this.$route.query.wardCode, this.$route.query.patientId, this.$route.query.visitId).then((res) => {
        let chart = []
        let list = []
        let total = res.data.data.total
        if(res.data.data.list.length == 0) {
          this.nullData = true
        }
        for (let item of res.data.data.list) {
          chart.push({
            name: item.feeClass,
            value: item.costs
          })
          list.push({
            feeClass: item.feeClass,
            costs: item.costs,
            percent: parseFloat((item.costs / parseFloat(total) * 100).toFixed(2))
          })
        }
        this.data = chart
        this.tableData = list
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
            sums[index] = '总价';
            return;
          }
          if (index === 1) {
            sums[index] = '';
            return;
          }
          if (index === 3) {
            sums[index] = '100%';
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
            sums[index] += '';
          } else {
            sums[index] = 'N/A';
          }
        });
        sums[2] = Number(sums[2]).toFixed(2).toString()
        return sums;
      }
    },
    components: {}
  }
</script>
