<template>
  <div style="position: relative">
    <el-row class="header-con" type="flex" justify="space-between" align="middle">
      <span class="title">费用情况</span>
      <div>
        <div class="show-chart" :class="{active: isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-feiyongqingkuang"></i>
        </div>
        <div class="show-table" :class="{active: !isChart}" @click="isChart = !isChart">
          <i class="iconfont icon-liebiao"></i>
        </div>
      </div>
    </el-row>
    <span v-if="isChart" @click="isChart = false">
      <el-row class="text-con" type="flex" justify="space-around" align="middle">
        <div class="text-item type-1">
          {{total | toMoney}}
          <div class="aside">当前费用合计</div>
        </div>
        <div class="text-item type-2">
          {{prePay | toMoney}}
          <div class="aside">
            预交金合计
            <!-- <img class="icon" src="../img/说明@2x.png" alt=""> -->
          </div>
        </div>
        <el-row class="text-item type-3">
          {{needPay | toMoney}}
          <div class="aside">预交金差额</div>
        </el-row>
      </el-row>
      <chart :options="polar" auto-resize ref="pie" v-if="isChart"></chart>
      <div class="tip">
        ⚠️&nbsp;请及时缴纳预交金！
      </div>
      </span>
    <div class="table-con" v-if="!isChart">
      <el-table :data="gridData" :summary-method="getSummaries" border show-summary height="283">
        <el-table-column width="70" type="index" label=" "></el-table-column>
        <el-table-column min-width="120px" property="transactDate" label="时间"></el-table-column>
        <el-table-column min-width="50px" property="payWay" label="支付方式"></el-table-column>
        <el-table-column min-width="50px" property="operator" label="操作员"></el-table-column>
        <el-table-column min-width="50px" property="money" label="金额"></el-table-column>
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
  .text-con
    height 100px
  .text-item
    text-align center
    font-size: 20px;
    cursor pointer
    .aside
      font-size: 13px;
      color: #333333;
      margin-top 15px
      position relative
      .icon
        width 15px
        height 15px
        display inline-block
        position relative
        top 2px
    &.type-1
      color: #559FF0;
    &.type-2
      color: #4BB08D;
    &.type-3
      color: #E72C2C;
  .tip
    font-size: 12px;
    color: #687179;
    text-align center
    position absolute
    bottom 0px
    width 100%
 .echarts {
  height: 160px;
   width 100%
   position relative
   top -20px
}
</style>

<script>
  import {
    getFeeDetail
  } from '@/api/patientInfo'
  import commomMixin from '../../../../../common/mixin/common.mixin'
  export default {
    mixins: [commomMixin],
    data() {
      return {
        prePay: '-',
        total: '-',
        needPay: '-',
        gridData: [],
        isChart: true
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
            sums[index] = '合计';
            return;
          }
          if (index === 1 || index === 2 || index === 3) {
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
            sums[index] += '';
          } else {
            sums[index] = 'N/A';
          }
        });
        return sums;
      }
    },
    computed: {
      polar() {
        return {
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: false // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: 50,
            right: 50,
            bottom: 15,
            top: 20,
            containLabel: true
          },
          xAxis: [{
            type: 'value',
            splitLine: {
              show: false
            },
          }],
          yAxis: [{
            type: 'category',
            axisTick: {
              show: false
            },
            data: ['']
          }],
          series: [{
              name: '预交金合计',
              type: 'bar',
              barWidth: 22,
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              itemStyle: {
                normal: {
                  color: '#4BB08D'
                },
              },
              data: [this.prePay]
            },
            {
              name: '当前费用合计',
              type: 'bar',
              stack: '总量',
              barWidth: 22,
              label: {
                normal: {
                  show: true,
                  position: this.prePay == 0 | (this.total / this.prePay < 0.1) ? 'left' : 'inside'
                }
              },
              itemStyle: {
                normal: {
                  color: '#559FF0'
                },
              },
              data: [this.total]
            },
            {
              name: '预交金差额',
              type: 'bar',
              stack: '总量',
              barWidth: 22,
              label: {
                normal: {
                  show: true,
                  position: this.prePay == 0 | (this.needPay / this.prePay < 0.1) ? 'left' : 'inside'
                }
              },
              itemStyle: {
                normal: {
                  color: '#EE5C4A'
                },
              },
              data: [this.needPay]
            }
          ]
        }
      },
    },
    mounted() {
      getFeeDetail(this.$route.query.wardCode, this.$route.query.patientId, this.$route.query.visitId).then((res) => {
        this.prePay = res.data.data.prePay
        this.total = res.data.data.total
        this.needPay = res.data.data.needPay
        this.gridData = res.data.data.list
      })
    },
    components: {}
  }
</script>
