<template>
<div class="statistical-pressure">
  <search-con
    :formData="formData"
    :deptList="deptList"
    datetype="datetime"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
    <template>
      <div class="search-con__ctx__item">
        评分：
        <input-num-range :value="[formData.c, formData.d]" @change="(e) => handleIptNum(e,['c', 'd'])"/>
      </div>
    </template>
  </search-con>
  <div class="statistical-pressure__content default-content" v-loading="loading">
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
        c: 0,
        d: 0,
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
          key: 'index-0',
					title: '日期时间',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'index5',
					title: 'VTE评分',
          align: 'center',
					minWidth: 100,
				},
        {
					key: 'index6',
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
    InputNumRange
  }
};
</script>
