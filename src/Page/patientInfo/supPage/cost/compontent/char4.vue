<template>
  <div>
    <el-row class="header-con" type="flex" justify="space-between" align="middle">
      <span class="title">费用药比</span>
      <div>
        <div class="show-chart" :class="{active: isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-feiyongduibi"></i>
        </div>
        <div class="show-table" :class="{active: !isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </el-row>
    <chart :options="polar" auto-resize ref="pie" v-if="isChart"></chart>
    <div class="table-con" v-if="!isChart">
      <el-table :data="tableData" border show-summary style="width: 100%" height="283" :summary-method="getSummaries">
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
    padding 0 14px
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
    getDrugFeePercent
  } from '@/api/patientInfo'
  export default {
    data() {
      return{ 
        value: 0,
        isChart: true,
        tableData: []
      }
    },
    computed: {
      polar() {
        return {
          tooltip: {
            formatter: "{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [{
            name: '费用药比',
            title : {
                show: false
            },
            center : ['50%', '55%'],
            radius: '90%',
            pointer: {
                width:5
            },
            splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.3, '#1DBEAA'],[1, '#EF6D5D']],
                    width: 10,
                    // shadowColor : '#fff', //默认透明
                    // shadowBlur: 10
                }
            },
            data: [{
              value: this.value,
              name: '费用药比'
            }]
          }]
        }
      }
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
                return prev
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
      getDrugFeePercent(this.$route.query.wardCode, this.$route.query.patientId, this.$route.query.visitId).then((res) => {
        this.value = res.data.data.percent
        let total = res.data.data.total
        let list = []
        for (let item of res.data.data.list) {
          list.push({
            feeClass: item.feeClass,
            costs: item.costs,
            percent: parseFloat((item.costs / parseFloat(total) * 100).toFixed(2))
          })
        }
        this.tableData = list
        if(this.$refs.pie) {
          this.$refs.pie.hideLoading()
        }
      })
    },
    components: {}
  }
</script>
