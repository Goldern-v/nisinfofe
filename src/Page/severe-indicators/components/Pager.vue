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
          <td :class="{ 'red-border': item[`numerator_wrong`] }">
            <input
              v-model="item.numerator"
              @focus="getOldValue(item, 'numerator')"
              @change="editItem(item, 'numerator', 'denominator')"
            />
          </td>
          <td :class="{ 'red-border': item[`denominator_wrong`] }">
            <input
              v-model="item.denominator"
              @focus="getOldValue(item, 'denominator')"
              @change="editItem(item, 'denominator', 'numerator')"
            />
          </td>
          <td>{{ item.ratio | rateFormat }}</td>
          <td>{{ item.lastMonthRatio | rateFormat }}</td>
          <!-- 环比 -->
          <td>
            <div class="td-item">
              <span class="arrow-green" v-if="showDownArrow(item.ratio, item.lastMonthRatio)">↓</span>
              <span class="arrow-red" v-if="showUpArrow(item.ratio, item.lastMonthRatio)">↑</span>
              <span>{{ item.m2m | compareFormat }}</span>
            </div>
          </td>
          <td>{{ item.lastYearRatio | rateFormat }}</td>
          <!-- 同比 -->
          <td>
            <div class="td-item">
              <span class="arrow-green" v-if="showDownArrow(item.ratio, item.lastYearRatio)">↓</span>
              <span class="arrow-red" v-if="showUpArrow(item.ratio, item.lastYearRatio)">↑</span>
              <span>{{ item.y2y | compareFormat }}</span>
            </div>
          </td>
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
  filters: {
    rateFormat(val) {
      return isNaN(val) || !val ? val : `${(val * 100).toFixed(1)}%`
    },
    compareFormat(val) {
      return val === 0 ? '持平' : (val ? `${(val * 100).toFixed(1)}%` : val)
    }
  },
  computed: {
    monthList() {
      let monthText = this.$route.query.month || ''
      if (!monthText) {
        const arr = (this.tableData[0] || { summaryCode : '' }).summaryCode.split('-')
        arr.shift()
        monthText = arr.join('-')
      }
      return [
        moment(monthText).format('YYYY年MM月'),
        moment(monthText).subtract(1, 'months').format('YYYY年MM月'),
        moment(monthText).subtract(1, 'years').format('YYYY年MM月'),
      ]
    }
  },
  methods: {
    // 显示上箭头
    showUpArrow(r1, r2) {
      return (r1 || r1 === 0) && (r2 || r2 === 0) && r1 > r2
    },
    // 显示下箭头
    showDownArrow(r1, r2) {
      return (r1 || r1 === 0) && (r2 || r2 === 0) && r1 < r2
    },
    // 获取原始值
    getOldValue(row, key) {
      if (!row[`old_${key}`] && row[`old_${key}`] === undefined) {
        this.$set(row, `old_${key}`, row[key])
      }
    },
    // 编辑
    editItem(row, key, otherKey) {
      this.$set(row, `${key}_wrong`, isNaN(+row[key]))
      if (isNaN(+row[key]) || isNaN(row[otherKey])) {
        return this.$message.warning("请输入合法数字");
      }
      const data = {
        itemCode: row.itemCode,
        old_numerator: row.old_numerator,
        old_denominator: row.old_denominator,
        numerator: row.numerator ? +row.numerator : row.numerator,
        denominator: row.denominator ? +row.denominator : row.denominator,
        [key]: row[key] ? +row[key] : row[key]
      }
      this.$emit('onEditData', data)
    }
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
          .td-item {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .arrow-green {
              color: green;
              font-size: 22px;
            }
            .arrow-red {
              color: red;
              font-size: 22px;
            }
          }
          input {
            height: 20px;
            width: 100%;
            padding: 1px;
            box-sizing: border-box;
            margin: 0;
            border: 0;
            outline: none;
            text-align: center;
          }
          &.red-border {
            border: 2px solid red;
          }
        }
      }
    }
    .pager-charts {
      margin-top: 24px;
    }
  }
</style>
