<template>
	<div class="search-con">
		<span style="font-size: 18px;line-height: 31px;font-weight:bold;">患者转科统计</span>
		<div class="search-con__patient-type">
		</div>
		<span class="label">科室:</span>
		<ElSelect size="small" v-model="formData.deptCode" :disabled="!isEdit" filterable>
			<ElOption v-for="val in deptList" :key="val.deptCode" :label="val.deptName" :value="val.deptCode" />
		</ElSelect>

		<span class="label">流转类型:</span>
		<ElSelect size="small" v-model="formData.type">
			<ElOption v-for="val in flowTypeList" :key="val.key" :label="val.label" :value="val.key" />
		</ElSelect>

		<span class="label">流转状态:</span>
		<ElSelect size="small" v-model="formData.transferStatus">
			<ElOption v-for="val in flowStatusList" :key="val.key" :label="val.label" :value="val.key" />
		</ElSelect>

		<span class="label">流转时间:</span>
		<el-date-picker
			type="daterange"
			format="yyyy-MM-dd"
			value-format="yyyy-MM-dd"
			placeholder="选择流转时间"
			size="small"
			v-model="formData.date"
			@change="onChangeDate"
			style="width:210px;margin-right:10px;"/>
		<el-button size="small" type="primary" @click="search">查询</el-button>
	</div>
</template>
<style lang="stylus" scoped>
.search-con {
  height: 50px;
  display: flex;
  align-items: center;
	padding: 0 20px;
	background: #fff;
	.search-con__patient-type {
		flex: 1;
	}

  .label {
    font-size: 13px;
    margin-right: 5px;
  }
	>.el-select {
		width: 120px;
		margin-right: 15px;
	}
}
</style>

<script>
import moment from "moment";
import { filterBC, FLOW_STATUS, FLOW_TYPE, searchKeyByCode } from "../../patient-flow-list/enums";
import { getDeptList } from '@/api/patient-flow';

export default {
	props: {
		isEdit: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			formData: {
				type: '',
				date: [],
				transferStatus: '',
				deptCode: '',
			},
			deptList: [],
			// flowTypeList: FLOW_TYPE,
			flowStatusList: FLOW_STATUS
		};
	},
	computed: {
		flowTypeList() {
			switch(this.HOSPITAL_ID) {
				case 'hj':
					return filterBC(FLOW_TYPE, ['operationF'])
				default:
					return FLOW_TYPE
			}
		}
	},
	watch: {
		'formData.type': {
			handler() {
				this.search(5)
			},
			deep: true
		},
		'formData.transferStatus': {
			handler() {
				this.search(0)
			},
			deep: true
		},
		'formData.deptCode': {
			handler() {
				this.search(3)
			},
			deep: true
		},
	},
	methods: {
		search(flag=7) {
			this.$emit('search', {...this.formData, flag})
		},
		getDepList() {
			getDeptList().then(res => {
        this.deptList = res.data.data || []
				if (this.deptList.length > 0) {
					this.deptList = [
						{
							deptCode: '',
							deptName: '全部'
						},
						...this.deptList
					]
				}
				this.formData.deptCode = ''
				this.formData.title = '全部'
			})
		},
		onChangeDate(val) {
			this.formData.date = val && val.split(' - ') || ''
			this.search()
		}
	},
	mounted() {
		this.getDepList()
		this.formData.type = this.flowTypeList[0].key
		this.formData.date = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
	},
	components: {}
};
</script>
