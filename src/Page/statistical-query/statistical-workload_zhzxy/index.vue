<template>
  <div class="statistical-workload">
    <search-con
      :deptList="deptList"
      :loading.sync="loading"
      :formData="formData"
      @handleExport="(obj) => handleExport()"
      @handleQuery="(obj) => handleQuery()"
    >
    </search-con>
    <select-bar
      :chineseOrWest="chineseOrWest"
      :tableOrChart="tableOrChart"
      @change="handleChangeSelect"
      :onSetting="handleExportSetting"
    />
    <div class="statistical-workload__content default-content" v-loading.sync="loading">
      <iview-table
        stripe
        :data="tableData"
        border
        :height="wih - 228"
        :columns="columns"
      />
      <pagination
        :pageIndex="pageIndex"
        :size="pageNum"
        :total="total"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      />
      <!-- <chart
        v-else
        :options="options"
        style="width: 100%; height: 100%;"
        auto-resize
        ref="chart"
      /> -->
    </div>
    <ExportModal
      :showExportModal.sync="showExport"
    ></ExportModal>
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
import { nursingUnit } from "@/api/lesion"
import commonMixin from '@/common/mixin/common.mixin';
import SearchCon from './components/search-con.vue'
import SelectBar from './components/select-bar.vue'
import { query, exportExc } from '../apis/index'
import Pagination from '@/components/pagination/pagination.vue'
import { chineseColumns } from './table.js'
import moment from 'moment';
import ExportModal from './components/ExportModal.vue';
export default {
  mixins: [commonMixin],
  props: {},
  components: { SearchCon, SelectBar, Pagination, ExportModal },
  data() {
    return {
      // 中/西医
      chineseOrWest: 'chinese',
      // 表格/图表
      tableOrChart: 'table',
      chineseColumns,
      formData: {
        beginTime: '',
        endTime: '',
        wardCode: '',
        dimension: '',
        nurse: '',
      },
      pageIndex: 1,
      pageNum: 20,
      total: 0,
      loading: false,
      tableData: [],
      deptList: [],
      showExport: false
    };
  },
  mounted() {
    this.formData.beginTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // 当天23点59分59秒的时间格式
    this.formData.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.getDepList()
    this.handleQuery()
  },
  methods: {
    async getDepList() {
      try {
        if (this.deptList.length > 0) return
        this.loading = true
        const res = await nursingUnit()
        this.deptList = res.data.data.deptList || []
        if (this.deptList.length > 0) {
          this.deptList = [
            { code: '', name: '全院' },
            ...this.deptList
          ]
          this.formData.wardCode = res.data.data.defaultDept || ''
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    handleChangeSelect(val) {
      console.log('handleChangeSelect', val)
    },
    handleQuery(obj = {}) {
      this.formData = { ...this.formData, ...obj}
      this.getData()
    },
    async getData() {
      try {
        this.loading = true;
        let formData = {
          themeName: this.$route.meta.title,
          ...this.formData,
          beginTime: this.formData.beginTime.split(' ')[0],
          endTime: this.formData.endTime.split(' ')[0],
          pageIndex: this.pageIndex,
          pageNum: this.pageNum,
        }
        const res = await query(formData)
        let {list, totalCount } = res.data.data
        this.tableData = list || []
        this.total = totalCount || 0

        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    handleExportSetting() {
      this.showExport = true
    },
    async handleExport() {
      if (this.loading) return
      try {
        this.loading = true
        exportExc({
          themeName: this.$route.meta.title,
          ...this.formData,
          beginTime: this.formData.beginTime.split(' ')[0],
          endTime: this.formData.endTime.split(' ')[0],
        }).then(res => {

          let fileName = res.headers["content-disposition"]
          ? decodeURIComponent(
            res.headers["content-disposition"].replace("attachment;filename=", "")
          ) : this.$route.meta.title + '.xls';
          let blob = new Blob([res.data], {
            type: res.data.type
          });
          let a = document.createElement('a')
          let href = window.URL.createObjectURL(blob) // 创建链接对象
          a.href = href
          a.download = fileName // 自定义文件名
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(href)
          document.body.removeChild(a) // 移除a元素
          this.loading = false
        })
      } catch (e) {
        this.loading = false
      }
    },

    // inputNumRange
    handleIptNum(arr = [], key= []) {
      let obj = {}
      key.map((v, i) => {
        obj[v] = arr[i]
      })
      this.formData = { ...this.formData, ...obj}
    },
    // 修改条数
    handleSizeChange(size) {
      this.pageNum = size
    },
    // 修改页数
    handleCurrentChange(newPage) {
      this.pageIndex = newPage;
      this.getData();
    },
  },
  computed: {
    isNurse() {
      return false
    },
    isChart() {
      return false
    },
    columns() {
      return [
        {
          key: 'index',
          title: '序号',
          align: 'center',
          width: 70,
          render: (h, { index }) => {
            return <span>{ (index + 1)  + ((this.pageIndex - 1) * this.pageNum) }</span>
          }
        },
        {
          key: 'name',
          title: '姓名',
          align: 'center',
          width: 80,
        },
        ...this.chineseColumns,
      ]

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
      let arr = [ ...this.chineseColumns]
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

  },
};
</script>
