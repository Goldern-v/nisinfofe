<template>
		<div class="patient-flow-list">
			<search-con @search="search"/>
			<div class="patient-flow-list__content">
				<iview-table
				stripe
				:data="tableData"
				border
				:height="wih - 142"
				:loading="loading"
				:columns="columns"/>
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
import searchCon from "./components/search-con.vue";
import commonMixin from '@/common/mixin/common.mixin.js';
import { EXTRA_FLOW_STATUS, FLOW_STATUS, FLOW_TYPE, searchItem, searchKeyByCode } from "./enums";
import { patientFlowList } from '@/api/patient-flow.js'

export default {
  mixins: [commonMixin],
  data() {
		return {
			tableData: [],
			formData: {},
			loading: false
		};
	},
	computed: {
		columns() {
			const isLaborF = this.formData.type === searchKeyByCode(FLOW_TYPE, 'laborF')
			return [
				{
					key: 'index',
					title: '序号',
					width: 70,
					render: (h, { index }) => {
						return <span>{index + 1}</span>
					}
				},
				{
					key: 'bedNo',
					title: '床号',
					minWidth: 70
				},
				{
					key: 'patientId',
					title: '患者ID',
					minWidth: 120
				},

				{
					key: 'name',
					title: '患者姓名',
					minWidth: 115
				},
				{
					key: 'type',
					title: '流转类型',
					minWidth: 110,
					render: (h, { row }) => {
						const item = searchItem(FLOW_TYPE, row.type, 'key')
						return item ? <span style={{color: item.color}}>{item.label}</span> : ''
					}

				},
				{
					key: 'transferType',
					title: '方式',
					minWidth: 70,
					render: (h, { row }) => {
						return <span>{row.transferType === 'in' ? '转入' : '转出'}</span>
					}
				},
				{
					key: 'transferFromName',
					title: '转出科室',
					minWidth: 190
				},
				{
					key: 'transferToName',
					title: '转入科室',
					minWidth: 190
				},
				{
					key: 'outDateTime',
					title: '转出时间',
					minWidth: 160
				},
				{
					key: 'inDateTime',
					title: '转入时间',
					minWidth: 160
				},
				{
					key: 'nurseOutName',
					title: isLaborF ? '病区负责护士' : '转出负责护士',
					minWidth: 130
				},
				{
					key: 'nurseInName',
					title: isLaborF ? '产房负责护士' : '转入负责护士',
					minWidth: 130,

				},
				{
					key: 'transferStatus',
					title: '流转状态',
					minWidth: 110,
					render: (h, { row }) => {
						const item = searchItem([...FLOW_STATUS, ...EXTRA_FLOW_STATUS], row.transferStatus, 'key')
						if (item) {
							return (
								<span style={{color: item.color}}>{item.label}</span>
							)
						}
						return ''
					}
				},
				{
					key: 'operate',
					title: '操作',
					minWidth: 95,
					fixed: 'right',
					render: (h, { row }) => {
						return (
							<el-button type="text" onClick={() => this.openMsg.call(this,row)}>查看</el-button>
						)
					}
				},
			]
		},
		deptCode() {
			return this.$store.state.lesion.deptCode || this.$route.query.wardCode
		}
	},
	watch: {
		deptCode(v) {
			this.search(this.formData)
		}
	},
	methods: {
		openMsg(row) {
			const { masterId, age } = row
			this.$router.push({ name: 'patientFlowMsg', query: { id: masterId, age }
			})
		},
		async search(data) {
			this.formData = data
			const { date, ...other } = data
			const params = {
				...other,
				startTime: date && date[0] || '',
				endTime: date && date[1] || '',
				deptCode: this.deptCode
			}
			this.loading = true
			const res = await patientFlowList(params)
			if (res.data && res.data.code === "200") {
				this.tableData = res.data.data || []
			}
			this.loading = false
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
