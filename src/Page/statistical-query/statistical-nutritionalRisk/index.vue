<template>
<div class="statistical-temperature">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    :deptMultiple="deptMultiple"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
  </search-con>
  <div class="statistical-temperature__content default-content" v-loading.sync="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 182"
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
@import '../index.scss';
.statistical-temperature {
  .statistical-temperature__content {
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
      deptMultiple:true,
      formData: {
        beginTime: '',
        endTime: '',
        wardCodeList: [''],
        bloodMin: 0,
        bloodMax: 10,
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
					key: 'wardName',
					title: '病区',
          align: 'center',
					minWidth: 180,
				},
        {
					key: 'sunSum2',
					title: '总例数',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'sunCount2',
					title: '总次数',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'sunSum',
					title: '阳性例数',
          align: 'center',
					width: 70,
				},
        {
					key: 'sunSum2',
					title: '阳性次数',
          align: 'center',
					width: 70,
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
