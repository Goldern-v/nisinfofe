<template>
<div class="statistical-workload">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    @handleExport="(obj) => handleExport({...obj,themeName: searchItem(INCREASE_SELECT, type1, 'code')['themeName']|| ''})"
    @handleQuery="(obj) => handleQuery({...obj,themeName: searchItem(INCREASE_SELECT, type1, 'code')['themeName']|| ''})">
    </search-con>
  <select-bar :val1="type1" @change="handleChangeSelect"/>
  <div class="statistical-workload__content default-content" v-loading.sync="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 178"
      :columns="columns"/>
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
import SearchCon from '../components/search-con.vue'
import SelectBar from './components/select-bar.vue'
import { searchItem, searchKeyByCode } from '@/utils/enums.js';
import { INCREASE_SELECT } from '../enums';
import indexMixins from '../mixins/index.mixins'
import {order_execution, patrol, specimen_collected, record_number, blood_workload} from './table'
export default {
  mixins: [commonMixin, indexMixins],
  props: {},
  data() {
    return {
      formData: {
        rank: '',
        name: ''
      },
      type1: searchKeyByCode(INCREASE_SELECT, 'order_execution'),
      INCREASE_SELECT: INCREASE_SELECT,
      deptList:[]
    };
  },
  computed: {
    columns() {
      let firstItem =
        {
          key: 'index',
          title: '序号',
          align: 'center',
          width: 70,
          // fixed: 'left', // 滑动固定我就没有做医院限制了 （佛一提的这个优化）
          render: (h, { index }) => {
            return <span>{ (index + 1)  + ((this.pageIndex - 1) * this.pageNum) }</span>
          }
        }
      let curItem = searchItem(INCREASE_SELECT, this.type1, 'key')
      let list = (()=>{
       switch (curItem.key){
          case "patrol":
           return patrol
          case "specimen_collected":
           return specimen_collected
          case "record_number":
           return record_number
          case "blood_workload":
            return blood_workload
          default:
            return order_execution
        }
      })()

      return [firstItem, ...list]

    },
  },
  watch: {
    type1(v) {
      this.handleQuery({themeName: searchItem(INCREASE_SELECT, v, 'code')['themeName']|| ''})
    },
  },
  mounted() {
    delete this.formData.status;
    this.getDepList()
  },
  methods: {
    handleChangeSelect(val) {
      this.type1 = val
    },
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
    searchItem,
  },
  components: {
    SearchCon,
    SelectBar,
  }
};
</script>
