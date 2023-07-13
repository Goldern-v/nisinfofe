import { nursingUnit } from "@/api/lesion"
import { query, exportExc } from '../apis/index'
import moment from 'moment'
import { WORKLOAD_BAR1 } from "../enums"
import { searchItem } from "@/utils/enums"

export default {
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
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
    if (!['statisticalNursingLv','statisticalNutritionalRisk'].includes(this.$route.name)) {
      this.formData.status = 1
    }
    await this.getDepList()
    if (this.$route.meta.title === '工作量统计') {
      this.handleQuery({ themeName: searchItem(WORKLOAD_BAR1, 'dept', 'code')['themeName']|| ''})
    } else {
      this.handleQuery()
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
              {
                code: '',
                name: '全院'
              },
              ...this.deptList
            ]
            if(!this.deptMultiple) this.formData.wardCode = res.data.data.defaultDept || ''
            else this.formData.wardCodeList = [res.data.data.defaultDept] || ['']
          }
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
    handleQuery(obj = {}) {
      this.formData = { ...this.formData, ...obj}
      this.getData()
    },
    async getData() {
      let beginTime = "",endTime = ""
      if(['statisticalNutritionalRisk'].includes(this.$route.name)){
        beginTime = this.formData.beginTime.split(' ')[0] + " 00:00"
        endTime = this.formData.endTime.split(' ')[0] + " 23:59"
      }else{
        beginTime = this.formData.beginTime.split(' ')[0]
        endTime = this.formData.endTime.split(' ')[0]
      }
      try {
        this.loading = true;
        let formData = {
          themeName: this.$route.meta.title,
          ...this.formData,
          beginTime,
          endTime,
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

