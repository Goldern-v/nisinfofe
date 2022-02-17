import { nursingUnit } from "@/api/lesion"
import { query } from '../apis/index'

export default {
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
        wardCode: '',
        status: 0,
      },
      pageIndex: 1,
      pageNum: 20,
      total: 0,
      loading: false,
      tableData: [],
      deptList: []
    }
  },
  methods: {
    handleExport() {

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
        let {list:list = [], totalCount: totalCount = 0 } = res.data.data
        this.tableData = list
        this.total = totalCount

        console.log('test-ers', res)
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

