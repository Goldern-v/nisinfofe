<template>
<div class="statistical-operation">
  <search-con
    :deptList="deptList"
    :loading.sync="loading"
    :formData="formData"
    datetype="datetime"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
    <div class="search-con__ctx__item" v-if="formData.nursingClass != undefined">
        护理等级：
        <ElSelect style="width: 120px;" size="small" :value="formData.nursingClass" @input="handleQuery({nursingClass: $event})" filterable>
          <ElOption v-for="val in nursingLvs" :key="val.key" :label="val.label" :value="val.key" />
      </ElSelect>
      </div>
  </search-con>
  <div class="statistical-operation__content default-content" v-loading.sync="loading">
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
.statistical-operation {
  .statistical-operation__content {
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
import indexMixins from '../mixins/index.mixins'
import { NURSING_LEVEL } from '../enums';
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
        nursingClass: '',
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
					minWidth: 100,
				},
        {
          key: 'bedNo',
          title: '床号',
          align: 'center',
          width: 70,
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
					key: 'diagnosis',
					title: '入院诊断',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'nursingClass',
					title: '护理级别',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'condition',
					title: '病危/病重',
          align: 'center',
					minWidth: 100,
				},
      ],
      nursingLvs: NURSING_LEVEL
    };
  },
  methods: {

  },
  components: {
    SearchCon,
    Pagination,
  }
};
</script>
