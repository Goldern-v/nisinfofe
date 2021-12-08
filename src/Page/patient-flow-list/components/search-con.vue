<template>
	<div class="search-con">
		<span style="font-size: 18px;line-height: 31px;font-weight:bold;">患者转科</span>
		<div class="search-con__patient-type">
			<el-radio-group v-model="formData.transferType">
				<el-radio label="out">转出患者</el-radio>
				<el-radio label="in">转入患者</el-radio>
			</el-radio-group>
		</div>
		<span class="label" style="margin-left: 0">流转类型:</span>
		<ElSelect style="width: 120px;margin-right: 15px;" size="small" v-model="formData.type">
			<ElOption v-for="val in flowTypeList" :key="val.key" :label="val.label" :value="val.key" />
		</ElSelect>
		<span class="label" style="margin-left: 0">流转时间:</span>
		<el-date-picker
			type="daterange"
			format="yyyy-MM-dd"
			value-format="yyyy-MM-dd"
			placeholder="选择流转时间"
			size="small"
			v-model="formData.date"
			@change="onChangeDate"
			style="width:210px;margin-right:10px;"/>
		 <span class="label" style="margin-left: 0">流转状态:</span>
		<ElSelect style="width: 120px;margin-right: 15px;" size="small" v-model="formData.transferStatus">
			<ElOption v-for="val in flowStatusList" :key="val.key" :label="val.label" :value="val.key" />
		</ElSelect>

		<el-input
			size="small"
			style="width: 150px;margin-right: 15px;"
			placeholder="输入患者Id进行搜索"
			v-model="formData.keyWord"
		></el-input>
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
		padding-left: 15px;
	}

  .label {
    font-size: 13px;
    margin-left: 15px;
    margin-right: 5px;
  }
}
</style>

<script>
import moment from "moment";
import { FLOW_STATUS, FLOW_TYPE, searchKeyByCode } from "../enums";
export default {
	props: {},
	data() {
		return {
			formData: {
				transferType: 'out',
				type: searchKeyByCode(FLOW_TYPE, 'changeF'),
				date: [],
				transferStatus: '',
				keyWord: ''
			},
			flowTypeList: FLOW_TYPE,
			flowStatusList: FLOW_STATUS
		};
	},
	watch: {
		'formData.type': {
			handler() {
				this.search()
			},
		},
		'formData.transferType': {
			handler() {
				this.search()
			},
		},
		'formData.transferStatus': {
			handler() {
				this.search()
			},
		},
	},
	methods: {
		search() {
			this.$emit('search', this.formData)
		},
		onChangeDate(val) {
			this.formData.date = val && val.split(' - ') || ''
			this.search()
		}
	},
	mounted() {
		this.formData.date = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]

		this.search()
	},
	components: {}
};
</script>
