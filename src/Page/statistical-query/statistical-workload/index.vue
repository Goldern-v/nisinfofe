<template>
<div class="statistical-workload">
  <search-con
    :loading.sync="loading"
    :formData="formData"

    @handleExport="handleExport"
    @handleQuery="handleQuery">
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
    <pagination
      v-if="!isChart"
      :pageIndex="pageIndex"
      :size="pageNum"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange" />
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
      // 图表数据
      chartData: Array.from(new Array(19), (j, k) => ({
        name: `项目计划${k}`,
        val: k+1
      })),
      rankList: RANK
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
            width: 70,
          }
        ],
        nurse: [
          {
            key: 'it0',
            title: '护士',
            align: 'center',
            width: 70,
          },
          {
            key: 'it2',
            title: '层级',
            align: 'center',
            width: 70,
          },
        ]
      }
      let other = [
        {
					key: 'i1',
					title: '静脉输液',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i2',
					title: '更换液体',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i3',
					title: '皮试',
          align: 'center',
					width: 90,
          sortable: true
				},
        {
					key: 'i4',
					title: '注射',
          align: 'center',
					width: 90,
          sortable: true
				},
        {
					key: 'i5',
					title: '雾化',
          align: 'center',
					width: 90,
          sortable: true
				},
        {
					key: 'i6',
					title: '标本',
          align: 'center',
					width: 90,
          sortable: true
				},
        {
					key: 'i7',
					title: '重症监护',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i8',
					title: '病危（重）',
          align: 'center',
					width: 130,
          sortable: true
				},
        {
					key: 'i9',
					title: '特级护理',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i10',
					title: '一级护理',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i11',
					title: '二级护理',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i12',
					title: '三级护理',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i13',
					title: '治疗',
          align: 'center',
					width: 90,
          sortable: true
				},
        {
					key: 'i14',
					title: '护理记录',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i15',
					title: '入院评估',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i16',
					title: '住院评估',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i17',
					title: '风险评估',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i18',
					title: '健康宣教',
          align: 'center',
					width: 120,
          sortable: true
				},
        {
					key: 'i19',
					title: '护理巡视',
          align: 'center',
					width: 120,
          sortable: true
				},
      ]
      let curItem = searchItem(WORKLOAD_BAR1, this.type1, 'key')

      return [firstItem, ...(curItem ? obj[curItem.code] || [] : []), ...other]

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
          data: this.chartData.map(v => v.name),
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
                  distance: -20,
                  color: '#fff',
                  position: 'top',
                },
              }
            }
          },
        ]
      }
    }
  },
  watch: {
    type1(v) {
      this.getData()
    },
    type2(v) {
      this.getData()
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
  },
  components: {
    SearchCon,
    SelectBar,
    Pagination,
  }
};
</script>
