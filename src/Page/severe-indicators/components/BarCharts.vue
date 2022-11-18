<template>
  <chart
    :options="chartOption"
    style="width: 100%; height: 600px;"
    auto-resize
    ref="chart"
  ></chart>
</template>
<script>
import moment from 'moment'
const colors = ['#d94572', '#03b696', '#ffdf25']
export default {
  props: {
    chartData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    months() {
      return [
        moment(this.$route.query.month).format('YYYY年MM月'),
        moment(this.$route.query.month).subtract(1, 'months').format('YYYY年MM月'),
        moment(this.$route.query.month).subtract(1, 'years').format('YYYY年MM月'),
      ]
    },
    chartOption() {
      return {
        tooltip: {
          show: false
        },
        legend: {
          data: this.months
        },
        grid: {
          bottom: '50%'
        },
        color: colors,
        xAxis: {
          name: '质量指标',
          axisLabel: {
            rotate: 45,
          },
          data: this.chartData.map(v => v.itemName),
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLabel: {
            formatter: (value) => {
              return `${value}%`
            }
          }
        },
        series: [
          {
            name: this.months[0],
            type: "bar",
            data: this.chartData.map(v => v.ratio || v.ratio === 0 ? v.ratio * 100 : v.ratio),
          },
          {
            name: this.months[1],
            type: "bar",
            data: this.chartData.map(
              v => v.lastMonthRatio || v.lastMonthRatio === 0 ? v.lastMonthRatio * 100: v.lastMonthRatio
            ),
          },
          {
            name: this.months[2],
            type: "bar",
            data: this.chartData.map(
              v => v.lastYearRatio || v.lastYearRatio === 0 ? v.lastYearRatio * 100 : v.lastYearRatio
            ),
          },
        ],
      }
    }
  },
  methods: {

  },
};
</script>
<style lang='scss' scoped></style>
