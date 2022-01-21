<template>
<div class="statistical-operation">
  <search-con
    :formData="formData"
    :deptList="deptList"
    datetype="datetime"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
    <div class="search-con__ctx__item" v-if="formData.type != undefined">
        护理等级：
        <ElSelect style="width: 120px;" size="small" :value="formData.type" @input="handleQuery({lv: $event})" filterable>
          <ElOption v-for="val in nursingLvs" :key="val.key" :label="val.label" :value="val.key" />
      </ElSelect>
      </div>
  </search-con>
  <div class="statistical-operation__content default-content" v-loading="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 132"
      :columns="columns"/>
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

export default {
  mixins: [commonMixin, indexMixins],
  props: {},
  data() {
    return {
      formData: {
        beginTime: '',
        endTime: '',
        type: '',
        status: '',
        lv: ''
      },
      columns: [
        {
					key: 'index',
					title: '序号',
          align: 'center',
					minWidth: 70,
					render: (h, { index }) => {
						return <span>{index + 1}</span>
					}
				},
        {
					key: 'index0',
					title: '病区',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'index1',
					title: '患者姓名',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'index2',
					title: '性别',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'index3',
					title: '年龄',
          align: 'center',
					minWidth: 70,
				},
        {
					key: 'index4',
					title: '病案号',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'index5',
					title: '入院诊断',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'index6',
					title: '护理级别',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'index7',
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
    SearchCon
  }
};
</script>
