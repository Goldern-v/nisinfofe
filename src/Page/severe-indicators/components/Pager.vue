<template>
  <div class="pager-container">
    <table>
      <colgroup>
        <col width="30%"/>
        <col v-for="i in 7" :key="i + 'col'" width="10%"/>
      </colgroup>
      <thead>
        <tr>
          <th>ICU质控指标</th>
          <th>分子</th>
          <th>分母</th>
          <th>{{ monthList[0] }}</th>
          <th>{{ monthList[1] }}</th>
          <th>环比</th>
          <th>{{ monthList[2] }}</th>
          <th>同比</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index + item.summaryCode">
          <td>{{ item.itemName }}</td>
          <td>{{ item.numerator }}</td>
          <td>{{ item.denominator }}</td>
          <td>{{ item.ratio }}</td>
          <td>{{ item.lastMonthRatio }}</td>
          <td>{{ item.m2m }}</td>
          <td>{{ item.lastYearRatio }}</td>
          <td>{{ item.y2y }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pager-charts">
      <BarCharts :chartData="tableData"/>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import BarCharts from './BarCharts.vue'
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: { BarCharts },
  data() {
    return {

    }
  },
  computed: {
    monthList() {
      return [
        moment(this.$route.query.month).format('YYYY年MM月'),
        moment(this.$route.query.month).subtract(1, 'months').format('YYYY年MM月'),
        moment(this.$route.query.month).subtract(1, 'years').format('YYYY年MM月'),
      ]
    }
  },
  methods: {

  },
};
</script>
<style lang='scss' scoped>
  .pager-container {
    position: relative;
    margin: 0 auto 20px;
    padding: 12px 20px;
    width: 900px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    min-height: 100%;
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      tr {
        td, th {
          border: 1px solid #000;
          margin: 0;
          padding: 1px;
          line-height: 24px;
          height: 24px;
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    .pager-charts {
      margin-top: 24px;
    }
  }
</style>
