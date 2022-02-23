import { nursingUnit } from "@/api/lesion"
import { query, exportExc } from '../apis/index'
import moment from 'moment'

export default {
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
        wardCode: '',
        // status: 0,
      },
      pageIndex: 1,
      pageNum: 20,
      total: 0,
      loading: false,
      tableData: [],
      deptList: []
    }
  },
  async mounted() {
    this.formData.beginTime = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
      // 当天23点59分59秒的时间格式
    this.formData.endTime = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    await this.getDepList()
    this.handleQuery()
  },
  methods: {
    async getDepList() {
      try {
        if (this.deptList.length > 0) return
        this.$emit('update:loading', true)
        const res = await nursingUnit()
        this.deptList = res.data.data.deptList || []
          if (this.deptList.length > 0) {
            this.deptList = [
              {
                code: '',
                name: '全院'
              },
              ...this.deptList
            ]
          } else {
            this.deptList = []
          }
        this.$emit('update:loading', false)
      } catch (e) {
        this.$emit('update:loading', false)
      }
    },
    async handleExport() {
      if (this.loading) return
      if (!this.tableData || this.tableData.length === 0) {
        this.$message.warning('没有数据可导出')
        return
      }
      try {
        exportExc({
          list: this.tableData,
          themeName: this.$route.meta.title
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
        })

      } catch (e) {

      }
    },
    handleQuery(obj = {}) {
      this.formData = { ...this.formData, ...obj}
      this.getData()
    },
    async getData() {
      try {
        this.loading = true;
        let routeName = this.$route.name
        let formData = {
          ...this.formData,
          beginTime: this.formData.beginTime.split(' ')[0],
          endTime: this.formData.endTime.split(' ')[0],
          pageIndex: this.pageIndex,
          pageNum: this.pageNum,
        }
        const res = await query(formData, routeName)
        let {list, totalCount } = res.data.data
        this.tableData = list || []
        this.total = totalCount || 0

        this.loading = false
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

  }
}

