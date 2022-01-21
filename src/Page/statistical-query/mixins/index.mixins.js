import { nursingUnit } from "@/api/lesion"

export default {
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
        type: '',
        status: '',
      },
      loading: false,
      tableData: [],
      deptList: []
    }
  },
  // async mounted() {
  //   try {
  //     const res = await nursingUnit()
  //     this.deptList = res.data.data.deptList || []
  //     console.log('test-res', res)
	// 			if (this.deptList.length > 0) {
	// 				this.deptList = [
	// 					{
	// 						code: '',
	// 						name: '全院'
	// 					},
	// 					...this.deptList
	// 				]
	// 			}
  //   } catch (err) {
  //     console.log('test-err', err)
  //   }
  // },
  methods: {
    handleExport() {

    },
    handleQuery(obj = {}) {
      this.formData = { ...this.formData, ...obj}
      this.getData()
    },
    getData() {
      console.log('test-this.$data', this.$data)
      this.loading = true;
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    // inputNumRange
    handleIptNum(arr = [], key= []) {
      let obj = {}
      key.map((v, i) => {
        obj[v] = arr[i]
      })
      this.formData = { ...this.formData, ...obj}
    }
  }
}
