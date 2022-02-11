<template>
<div class="statistical-pulseHeartRate">
  <search-con
    :formData="formData"
    :deptList="deptList"
    @handleExport="handleExport"
    @handleQuery="handleQuery">
    <template>
      <!-- <div class="search-con__ctx__item">
        脉搏：
        <input-num-range :value="[formData.c, formData.d]" @change="(e) => handleIptNum(e,['c', 'd'])"/>
        次/分
      </div> -->
      <div class="search-con__ctx__item">
        心率：
        <input-num-range :value="[formData.a, formData.b]" @change="(e) => handleIptNum(e,['a', 'b'])"/>
        次/分
      </div>
      <div class="search-con__ctx__item main-color">
        <i class="icon iconfont">&#xe6bc;</i>注：心率查询时的范围包含所输入的区间值
      </div>
    </template>
  </search-con>
  <div class="statistical-pulseHeartRate__content default-content" v-loading="loading">
    <iview-table
      stripe
      :data="tableData"
      border
      :height="wih - 172"
      :columns="columns"/>
  </div>
</div>
</template>
<style lang='scss' scoped>
@import '../index.scss';
.statistical-pulseHeartRate {
  .statistical-pulseHeartRate__content {
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
        point: '',
        a: 0,
        b: 0,
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
					key: 'index5',
					title: '日期',
          align: 'center',
					minWidth: 110,
				},
        {
					key: 'index6',
					title: '时间点',
          align: 'center',
					minWidth: 70,
				},
        // {
				// 	key: 'index7',
				// 	title: '脉搏（次/分）',
        //   align: 'center',
				// 	minWidth: 100,
				// },
        {
					key: 'index8',
					title: '心率（次/分）',
          align: 'center',
					minWidth: 100,
					render: (h, { column }) => {
						return <span>{column || column == 0 ? column : '-'}</span>
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
  }
};
</script>
