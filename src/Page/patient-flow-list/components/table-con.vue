<template>
	<el-table
		:data="data"
    border
    style="width: 100%"
		:height="wih - 140">
		<el-table-column
			v-for="(val, i) in columns"
			:key="i"
			:prop="val.prop"
			:label="val.label"
			:width="val.width"
			:fixed="val.fixed !== undefined ? val.fixed : ''">
			<template v-if="val.render" slot-scope="scope">
				<div v-html="val.render(scope)"></div>
			</template>
		</el-table-column>
	</el-table>
</template>
<style lang='scss' scoped></style>
<script>
import commonMixin from '@/common/mixin/common.mixin';
export default {
	mixins: [
		commonMixin
	],
	props: {
		data: {
			type: Array,
			default: () => ([])
		},
		columns: {
			type: Array,
			default: () => ([])
		}
	},
	data() {
	return {};
	},
	methods: {
	},
	components: {}
};
</script>
