<template>
<div class="statistical-pressure">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
    <template>
      <div class="search-con__ctx__item">
        评分：
        <input-num-range :value="[formData.fallDownScoreMin, formData.fallDownScoreMax]" @change="(e) => handleIptNum(e,['fallDownScoreMin', 'fallDownScoreMax'])"/>
      </div>
    </template>
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
        fallDownScoreMin: 0,
        fallDownScoreMax: 5,
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
					key: 'bedNo',
					title: '床号',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'name',
					title: '患者姓名',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'sex',
					title: '性别',
          align: 'center',
					width: 70,
				},
        {
					key: 'age',
					title: '年龄',
          align: 'center',
					width: 70,
				},
        {
					key: 'patientId',
					title: '病案号',
          align: 'center',
					minWidth: 100,
				},
        {
          key: 'evalDate',
					title: '日期时间',
          align: 'center',
					minWidth: 100,
          render: (h, { row }) => {
            return <span>{row.evalDate.split(' ')[0]}</span>
          }
				},
        {
					key: 'fallDown',
					title: '跌倒评分',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'evalDesc',
					title: '风险等级',
          align: 'center',
					minWidth: 100,
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
