<template>
<div class="statistical-workload">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    @handleExport="(obj) => handleExport({...obj,themeName: searchItem(workload_bar1, type1, 'code')['themeName']|| ''})"
    @handleQuery="(obj) => handleQuery({...obj,themeName: searchItem(workload_bar1, type1, 'code')['themeName']|| ''})">
    <template>
      <div class="search-con__ctx__item" v-show="isNurse">
        层级：
        <ElSelect style="width: 120px;" size="small" :value="formData.rank" @input="handleQuery({rank: $event})">
          <ElOption v-for="val in rankList" :key="val.key" :label="val.label" :value="val.key" />
        </ElSelect>
      </div>
      <div class="search-con__ctx__item" v-show="isNurse">
        护士姓名：
         <el-input size="small" placeholder="请输入护士姓名" v-model="formData.name"/>
      </div>
    </template>
    </search-con>
  <select-bar :val1="type1" :val2="type2" @change="handleChangeSelect"/>
  <div class="statistical-workload__content default-content" v-loading.sync="loading">
    <iview-table
      v-if="!isChart"
      stripe
      :data="tableData"
      border
      :height="wih - 178"
      :columns="columns"/>
    <!-- <pagination
      v-if="!isChart"
      :pageIndex="pageIndex"
      :size="pageNum"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange" /> -->
    <chart
      v-else
      :options="options"
      style="width: 100%; height: 100%;"
      auto-resize
      ref="chart"/>
  </div>
</div>
</template>
<style lang='scss' scoped>
.statistical-workload {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  .statistical-workload__content {
    flex: 1;
    >>>.ivu-table {
      width: 120%;
      box-sizing: border-box;
    }
		>>>.ivu-table th {
			text-align: center;
			background-color: #eef5f6;
			height: 40px;
		}
		>>>.ivu-table td .ivu-table-cell {
			text-align: center;
		}
    >>>.echarts {
      background: #fff !important;
    }
  }
}
</style>
<script>
import commonMixin from '@/common/mixin/common.mixin';
import SearchCon from '../components/search-con.vue'
import SelectBar from './components/select-bar.vue'
import { searchItem, searchKeyByCode } from '@/utils/enums.js';
import { RANK, WORKLOAD_BAR1, WORKLOAD_BAR2 } from '../enums';
import indexMixins from '../mixins/index.mixins'
import {otherColumns_foshanrenyi,otherColumns_925,otherColumns} from './table'

import Pagination from '@/components/pagination/pagination.vue'
export default {
  mixins: [commonMixin, indexMixins],
  props: {},
  data() {
    return {
      formData: {
        rank: '',
        name: ''
      },
      // 按病区统计/按护士统计
      type1: searchKeyByCode(WORKLOAD_BAR1, 'dept'),
      // 表格/图表
      type2: searchKeyByCode(WORKLOAD_BAR2, 'table'),
      rankList: RANK,
      workload_bar1: WORKLOAD_BAR1,
    };
  },
  computed: {
    isChart() {
      return this.type1 === searchKeyByCode(WORKLOAD_BAR1, 'dept') && this.type2 === searchKeyByCode(WORKLOAD_BAR2, 'chart')
    },
    isNurse() {
      return this.type1 === searchKeyByCode(WORKLOAD_BAR1, 'nurse')
    },
    columns() {
      let firstItem =
        {
          key: 'index',
          title: '序号',
          align: 'center',
          width: 70,
          fixed: 'left', // 滑动固定我就没有做医院限制了 （佛一提的这个优化）
          render: (h, { index }) => {
            return <span>{ (index + 1)  + ((this.pageIndex - 1) * this.pageNum) }</span>
          }
        }

      let obj = {
        dept: [
          {
            key: 'wardName',
            title: '病区',
            align: 'center',
            width: 150,
            fixed: 'left',
          },
          {
            key: 'bedNo',
            title: '床号',
            align: 'center',
            width: 70,
          },
        ],
        nurse: [
          {
            key: 'empName',
            title: '护士',
            align: 'center',
            width: 70,
            fixed: 'left',
          },
          {
            key: 'hierarchy',
            title: '层级',
            align: 'center',
            width: 70,
            fixed: 'left',
          },
        ]
      }

      let curItem = searchItem(WORKLOAD_BAR1, this.type1, 'key') 
      let ARR = (()=>{
        switch (this.HOSPITAL_ID){
          case "foshanrenyi":
           return otherColumns_foshanrenyi
          case "925":
            return otherColumns_925
          default:
            return otherColumns
        }
      })()
      return [firstItem, ...(curItem ? obj[curItem.code] || [] : []), ...ARR]

    },
    options() {
      let curItem = this.deptList.find(v => v.code === this.formData.wardCode)
      return {
        title: {
          text: (curItem ? curItem.name : '') + '工作量统计',
          subtext: `统计时间：${this.formData.beginTime}-${this.formData.endTime}`,
          left: 'center',
          textStyle: {
            fontSize: 15,
            fontWeight: 'normal'
          },
          padding: [20, 0, 20, 0],
          textStyle: {
            color: '#000',
            fontSize: 20,
            fontFamily: `simsun, "Times New Roman", Georgia, Serif`,
          },
          subtextStyle: {
            color: '#000',
            fontSize: 14,
            fontFamily: `simsun, "Times New Roman", Georgia, Serif`,
          },
        },
        grid: {
          top: 80
        },
        xAxis: {
          name: '',
          type: 'category',
          data: this.chartData.map(v => v.title),
          axisLabel: {
            rotate: 30,
          }
        },
        yAxis: {
          name: '',
          type: 'value',
          minInterval: 1
        },
        series: [
          {
            type: 'bar',
            barWidth: 28,
            data: this.chartData.map(v => v.val),
            itemStyle: {
              normal: {
                color: 'rgb(113, 186, 149)',
                label: {
                  show: true,
                  color: '#000',
                  position: 'top',
                },
              }
            }
          },
        ]
      }
    },
    // 图表数据
    chartData() {
      let arr = (()=>{
        switch (this.HOSPITAL_ID){
          case "foshanrenyi":
           return otherColumns_foshanrenyi
          case "925":
            return otherColumns_925
          default:
            return otherColumns
        }
      })()
      if (this.tableData.length > 0) {
        this.tableData.map(item => {
          arr.map(v => {
            v.val = Number(item[v.key]) + (v.val | 0)
          })
        })
        return arr
      }
      return []
    }
  },
  watch: {
    type1(v) {
      this.handleQuery({themeName: searchItem(WORKLOAD_BAR1, v, 'code')['themeName']|| ''})
    },
    type2(v) {
    },
  },
  mounted() {
    delete this.formData.status
  },
  methods: {
    handleChangeSelect(val) {
      let [v1, v2] = val
      this.type1 = v1
      this.type2 = v2
    },
    searchItem,
  },
  components: {
    SearchCon,
    SelectBar,
    Pagination,
  }
};
</script>
