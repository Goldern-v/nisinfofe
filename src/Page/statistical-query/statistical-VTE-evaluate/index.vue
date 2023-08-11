<template>
<div class="statistical-pressure">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    datetype="datetime"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
  </search-con>
  <div class="statistical-pressure__content default-content" v-loading.sync="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 132"
      :columns="columns"/>
    <pagination
      :pageIndex="pageIndex"
      :size="pageNum"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange" />
  </div>
</div>
</template>
<style lang='scss' scoped>
.statistical-pressure {
  .statistical-pressure__content {
    >>>.ivu-table {
      width: 100%;
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
  }
}
</style>
<script>
import commonMixin from '@/common/mixin/common.mixin';
import SearchCon from '../components/search-con.vue'
import InputNumRange from '../components/input-num-range.vue'
import indexMixins from '../mixins/index.mixins'
import Pagination from '@/components/pagination/pagination.vue'

export default {
  mixins: [commonMixin, indexMixins],
  props: {},
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
        wardCode: '',
        status: 0,
        scoreMin: 0,
        scoreMax: 5,
      },
      columns: [
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
          key: 'TOTAL',
          title: '总患者数量',
          align: 'center',
          minWidth: 70,
        },
        {
          key: 'EVALSUM',
          title: '评估数',
          align: 'center',
          minWidth: 70,
        },
        {
          key: 'PERCENTAGE',
          title: '评估率',
          align: 'center',
          minWidth: 70,
          render: (h, { row }) => {
            return <span>{(row.PERCENTAGE * 100).toFixed(2) + "%"}</span>
          }
        },
      ],
    };
  },
  methods: {
  },
  components: {
    SearchCon,
    InputNumRange,
    Pagination,
  }
};
</script>
