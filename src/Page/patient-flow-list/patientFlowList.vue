<template>
		<div class="patient-flow-list">
			<search-con @search="search"/>
			<div class="patient-flow-list__content">
				<iview-table
				:row-class-name="rowClassName"
				:data="tableData"
				border
				:height="wih - 142"
				:columns="columns"></iview-table>
			</div>
		</div>
</template>

<style lang="stylus" scoped>
.patient-flow-list {
	.patient-flow-list__content {
		padding: 15px;
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
import common from "@/common/mixin/common.mixin.js";
import searchCon from "./components/search-con.vue";
import commonMixin from '@/common/mixin/common.mixin.js';
import { FLOW_STATUS, FLOW_TYPE, searchKeyByCode } from "./enums";

export default {
  mixins: [common, commonMixin],
  data() {
		return {
			tableData: [
				{
					val: 1
				}
			],
			formData: {},
		};
	},
	computed: {
		columns() {
			const isLaborF = this.formData.flowType === searchKeyByCode(FLOW_TYPE, 'laborF')
			return [
				{
					prop: 'val',
					title: '序号',
					width: 70
				},
				{
					prop: '',
					title: '床号',
					width: 70
				},
				{
					prop: '',
					title: '患者ID',
					width: 120
				},
				{
					prop: '',
					title: '患者姓名',
					width: 115
				},
				{
					prop: '',
					title: '流转类型',
					width: 110,

				},
				{
					prop: '',
					title: '方式',
					width: 70
				},
				{
					prop: '',
					title: '转出科室',
					width: 150
				},
				{
					prop: '',
					title: '转入科室',
					width: 150
				},
				{
					prop: '',
					title: '转出时间',
					width: 150
				},
				{
					prop: '',
					title: '转入时间',
					width: 150
				},
				{
					prop: '',
					title: isLaborF ? '病区负责护士' : '转出负责护士',
					width: 130
				},
				{
					prop: '',
					title: isLaborF ? '产房负责护士' : '转入负责护士',
					width: 130
				},
				{
					prop: '',
					title: '流转状态',
					width: 110,
					render: (h, { row }) => {
						const item = FLOW_STATUS.find(v => row.stauts === row.key)
						if (item) {
							return (
								<span style={{color: item.color}}>{item.label}</span>
							)
						}
						return ''
					}
				},
				{
					prop: 'operate',
					title: '操作',
					width: 95,
					fixed: 'right',
					render: (h, { row }) => {
						return (
							<el-button type="text" onClick={() => this.openMsg.call(this,row)}>查看</el-button>
						)
					}
				},
			]
		},
	},
	methods: {
		openMsg(row) {
			console.log('test-打开详情', row)
			this.$router.push({ name: 'patientFlowMsg'})
		},
		search(data) {
			console.log('test-搜索', data)
			this.formData = data
		},
		rowClassName(row, idx) {
      let rowIdx = idx + 1;
      if (rowIdx % 4 == 0 || rowIdx % 4 == 3) return "ivu-table-row-hover";

      return "";
    },
	},
	components: {
		searchCon,
	}
}
</script>
