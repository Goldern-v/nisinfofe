<template>
  <div class="patient-flow-statistics">
    <search-con @search="search" :isEdit="isEdit"/>
    <div class="patient-flow-statistics__content" :style="{height: wih - 110 + 'px'}">
      <div class="content__left">
        <chart
        :options="lineOption"
        style="width: 100%; height: 100%;"
        auto-resize
        ref="lineChart"/>
      </div>
      <div class="content__right">
        <chart
        :options="pieOption"
        style="width: 100%; height: 100%;"
        auto-resize
        ref="pieChart"/>
      </div>
      <div class="content__bottom" v-if="isEdit">
        <chart
        :options="barOption"
        style="width: 100%; height: 100%;"
        auto-resize
        ref="barChart"/>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.patient-flow-statistics {
  position: relative;
  .search-con {
    position: relative;
    z-index: 3
    box-shadow: 0 10px 13px -3px rgba(0,0,0,.34);
  }
}
.patient-flow-statistics__content {
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  overflow-y: auto;

  .content__left {
    min-width: 900px;
    width: 64%;
    height: 360px;
  }
  .content__right {
    min-width: 500px;
    width: 36%;
    height: 360px;

  }
  .content__bottom {
    width: 100%;
    height: 400px;
  }

}
</style>
<script>
import searchCon from "./components/search-con.vue"
const allowRoleList = ['QCR0001', 'QCR0003', 'QCR0004', 'SYS0001']
import commonMixin from '@/common/mixin/common.mixin.js';
import moment from 'moment';

const commonTitle = {
  left: 'center',
  textStyle: {
    fontSize: 15,
    fontWeight: 'normal'
  },
  padding: [40, 0, 20, 0]
};

export default {
  mixins: [commonMixin],
  data() {
    return {
      formData: {},
      isEdit: false,
      lineData: [
        [3, 1],
        [3, 2],
        [3, 3],
        [3, 4],
        [3, 5],
      ],
      pieData: [
        {
          name: '转科',
          value: 12,
        },
        {
          name: '分娩',
          value: 12
        },
        {
          name: '介入',
          value: 12
        },
        {
          name: '手术',
          value: 12
        },
      ],
      barData: [
        [13, 1],
        [31, 2],
        [4, 3],
        [3, 4],
        [3, 5],
        [3, 6],
        [3, 7],
        [3, 8],
        [3, 9],
        [3, 10],
        [6, 11],
        [3, 12],
        [12, 13],
        [3, 14],
        [3, 15],
        [3, 16],
      ]
    }
  },
  computed: {
    lineOption() {
      return {
        title: {
          text: '《全院/科室流转人数统计》',
          ...commonTitle
        },
        grid: {
          top: 80
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}人",
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        xAxis: {
          name: '月份',
          type: 'category',
          boundaryGap: false,
          data: this.lineData.map(v => v[1])
        },
        yAxis: {
          name: '人数',
          type: 'value',
          minInterval: 1
        },
        series: [
          {
            name: 'line',
            type: 'line',
            data: this.lineData.map(v => v[0]),
            lineStyle: {
              normal: {
                width: 2, //连线粗细
                color: "#4984eb" //连线颜色
              }
            },
            itemStyle: {
              normal:{
                color:'#fff',//拐点颜色
                borderColor:'#4984eb',//拐点边框颜色
                borderWidth:3//拐点边框大小
              },
              emphasis: {
                color: '#fff'//hover拐点颜色定义
              }
            },
          }
        ],
        animationDuration: 2000
      }
    },
    pieOption() {
      return {
        title: {
          text: '《各类型流转统计》',
          ...commonTitle,
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: true,
          orient: 'horizontal',
          left: 'center',
          top: '80',
          padding: [0, 0, 30, 0],
          data: this.pieData.map(v => v.name)
        },
        series: [
          {
            name: '各类型流转统计',
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            color: ['#c72a29', '#e99e42', '#ffff54', '#71c140'],
            center: ['50%', '60%'],
            itemStyle: {
              normal: {
                label : {
                  show : false
                },
                labelLine : {
                  show : false
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    barOption() {
      return {
        title: {
          text: '《各科室流转患者统计》',
          ...commonTitle
        },
        grid: {
          top: 80
        },
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}人",
          axisPointer: {
            type: 'shadow',
            // shadowStyle: {
            //   type: 'dashed'
            // }
          }
        },
        xAxis: {
          name: '科室',
          type: 'category',
          data: this.barData.map(v => v[1])
        },
        yAxis: {
          name: '人数',
          type: 'value',
          minInterval: 1
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            startValue: 0,
            endValue: 9,
            height: '20'
          },
          {
            type: 'inside',
            show: true,
            startValue: 0,
            endValue: 9,
            zoomLock: true,
            // moveOnMouseMove: true,
            // preventDefaultMouseMove: false,
            // zoomOnMouseWheel: false,
        }],
        series: [
          {
            type: 'bar',
            barWidth: 64,
            data: this.barData.map(v => v[0]),
            itemStyle: {
              normal: {
                color: function (params) {
                  const colorList = ['#e13c39', '#eb913a', '#fbed61', '#abd746', '#73c240', '#5abfc0', '#448ef7', '#6a32c8']
                  return colorList[params.dataIndex % colorList.length]
                }
              }
            }
          },
        ]
      }
    }
  },
  methods: {
    search(data) {
			console.log('test-搜索', data)
			this.formData = data
		},
    getEditStatus() {
      const user = JSON.parse(localStorage.user)
      if (user) {
        const index = user.roleManageCodeList.findIndex(v => allowRoleList.indexOf(v) > -1)
        if (index > -1) {
          this.isEdit = true
          return
        }
      }
      this.isEdit = false
    }
  },
  mounted() {
    this.getEditStatus()
  },
  components: {
    searchCon
  }
}
</script>
