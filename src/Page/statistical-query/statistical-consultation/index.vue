<template>
  <div class="statistical-workload">
    <search-con
      :deptList="deptList"
      :loading.sync="loading"
      :formData="formData"
      @handleExport="(obj) => handleExport(obj)"
      @handleQuery="(obj) => handleQuery(obj)"
    >
    </search-con>
    <div class="statistical-workload__content default-content" v-loading.sync="loading">
      <iview-table
        stripe
        :data="tableData"
        border
        :height="wih - 180"
        :columns="columns"
      />
      <pagination
        :pageIndex="pageIndex"
        :size="pageNum"
        :total="total"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
      />
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
import { nursingUnit } from "@/api/lesion"
import commonMixin from '@/common/mixin/common.mixin';
import SearchCon from './components/search-con.vue'
import { queryConsultation, exportExc } from '../apis/index'
import Pagination from '@/components/pagination/pagination.vue'
import { tableColumns, mockData } from './table.js'
import moment from 'moment';
export default {
  mixins: [commonMixin],
  props: {},
  components: { SearchCon, Pagination },
  data() {
    return {
      tableColumns,
      formData: {
        beginTime: '',
        endTime: '',
        wardCode: '',
        empNo: '',
        themeName: '病区会诊统计',
        type: 1,
      },
      pageIndex: 1,
      pageNum: 20,
      total: 0,
      loading: false,
      tableData: [],
      deptList: []
    };
  },
  mounted() {
    this.formData.beginTime = moment().subtract(1, 'weeks').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    // 当天23点59分59秒的时间格式
    this.formData.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.getDepList()
    this.handleQuery()
  },
  computed: {
    defaultDept() {
      return window.localStorage.getItem('selectDeptValue');
    }
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

    },
    handleQuery(obj = {}) {
      console.log('obj', obj)
      this.formData = { ...this.formData, ...obj }
      this.getData()
    },
    async getData() {
      try {
        this.loading = true;
        if (!this.formData.wardCode) {
          this.formData.wardCode = window.localStorage.getItem('selectDeptValue');
        }
        const formData = {
          ...this.formData,
          themeName: this.formData.themeName,
          beginTime: this.formData.beginTime.split(' ')[0],
          endTime: this.formData.endTime.split(' ')[0],
          pageIndex: this.pageIndex,
          pageNum: this.pageNum,
        }
        const res = await queryConsultation(formData)
        const { list, totalCount } = res.data.data
        this.tableData = list || [];
        // this.tableData = mockData.list || []
        this.total = totalCount || 0

        this.loading = false
      } catch (e) {
        this.loading = false
      }
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
        ...this.tableColumns,
      ]

    },
  },
  watch: {

  },
};
</script>
