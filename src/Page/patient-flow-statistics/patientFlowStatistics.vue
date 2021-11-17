<template>
  <div class="patient-flow-statistics">
    <search-con @search="search" :isEdit ="isEdit"/>
    <div class="patient-flow-statistics__content" :style="{height: wih - 110 + 'px'}">
      <div class="content__left">
        <chart
        :options="leftOption"
        style="width: 100%; height: 100px;"
        auto-resize
        ref="chart"/>
      </div>
      <div class="content__right"></div>
      <div class="content__bottom" v-if="isEdit">1</div>
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
    height: 400px;
  }
  .content__right {
    min-width: 500px;
    width: 36%;
    height: 400px;

  }
  .content_bottom {
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

export default {
  mixins: [commonMixin],
  data() {
    return {
      formData: {},
      isEdit: false,
      leftData: [
        {
          value: 20, name: '2021-01'
        },
        {
          value: 21, name: '2021-02'
        },
        {
          value: 22, name: '2021-03'
        },
        {
          value: 23, name: '2021-04'
        },
      ]
    }
  },
  computed: {
    leftOption() {
      return {
        title: {
          text: '《全院/科室流转人数统计》',
          left: 'center'
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        xAxis: {
          name: '月份',
          type: 'category',
          boundaryGap: false,

        },
        yAxis: {
          name: '人数',
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            type: 'line',
            data: this.leftData,
            center: ["50%", "60%"],
            lineStyle: {
              normal: {
                width: 2, //连线粗细
                color: "#909BA3" //连线颜色
              }
            },
            symbolSize: 8, //图标尺寸

          }
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
          console.log('test-index', this.isEdit)
          return
        }
      }
      this.isEdit = false
      console.log('test-index', this.isEdit)
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
