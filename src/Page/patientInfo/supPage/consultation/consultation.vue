<template>
	<section class="consultation">
		<newFormDialog ref="newFormDialog"></newFormDialog>
		<section class="card" :style="{height: height}">
			<div class="card_title">
				<h4 class="card_title-desc">护理会诊记录</h4>
				<button class="card_title-add" @click="$refs.newFormDialog.open()">
						<i class="iconfont icon-guanbi"></i>新建会诊
					</button>
			</div>
			<div class="card_wrap" :style="{height: scrollHeight}">
				<div class="card_noitem" v-if="!list.length">
					<img :src="require('@/common/images/task/nondata.png')" alt="" v-if="true">
					<span>暂无护理会诊记录～</span>
				</div>
				<!-- 动态生成 -->
				<span @click="toDetail(item)" v-for="item in list" :key="item.id"><listItem :data="item" :clickIndex="clickIndex"></listItem></span>
			</div>
		</section>
		<section class="form" :style="{height: height}" v-show="clickIndex">
			<consultationForm ref="consultationForm"></consultationForm>
		</section>
	</section>
</template>


<script>
	import newFormDialog from './components/newFormDialog'
	import consultationForm from './components/consultationForm'
	import {
		getPatientList
	} from '@/api/consultation'
	import listItem from './components/item/listItem.vue'
	import BusFactory from 'vue-happy-bus'
	export default {
		data() {
			return {
				formVisible: false,
				list: [],
				selectItem: {},
				clickIndex: 0,
				bus: BusFactory(this)
			}
		},
		computed: {
			wih() {
				return this.$store.state.common.wih
			},
			height() {
				return `${this.wih - 150}px`
			},
			scrollHeight() {
				return `${this.wih - 186}px`
			}
		},
		mounted() {},
		created() {
			this.getData().then((res) => {
				if (res[0]) {
					this.toDetail(res[0])
				}
			})
			// 刷新会诊列表
			this.bus.$on('consultationListRefresh', () => {
				this.getData()
			})
		},
		methods: {
			toDetail(item) {
				this.clickIndex = item.id
				this.$refs.consultationForm.open(item)
			},
			getData() {
				return getPatientList(this.$route.query.patientId, this.$route.query.visitId).then(res => {
					this.list = res.data.data
					return this.list
				})
			},
			aaa(item) {
				this.bus.$emit('aaa')
			},
		},
		components: {
			newFormDialog,
			consultationForm,
			listItem
		}
	}
</script>


<style lang="scss" scoped>
	.consultation {
		margin: 20px 20px; // display: flex;
		// justify-content: space-between;
	}
	.card {
		background: #fff;
		border: 1px solid #cbd5dd;
		border-radius: 2px; // height: 300px;
		width: 36%;
		float: left;
		&_title {
			overflow: hidden;
			background: #f7fafa;
			height: 35px;
			padding: 0 4%;
			color: #333;
			border-bottom: 1px solid #EAEEF1;
			&-desc {
				display: inline;
				font-family: 'PingFangSC-Medium';
				font-size: 13px;
				font-weight: bold;
				color: #333;
				letter-spacing: 0;
				line-height: 35px;
			}
			&-add {
				float: right;
				border: none;
				background: transparent;
				outline: none;
				cursor: pointer;
				font-size: 1px;
				color: #687179;
				i {
					display: inline-block;
					font-size: 12px;
					line-height: 35px;
					transform: rotate(45deg);
					margin-right: 4px;
				}
			}
		}
		&_wrap {
			padding: 20px;
			overflow-y: auto;
			box-sizing: border-box;
			position: relative;
			.card_noitem {
				width: 100%;
				height: 100%;
				img,
				span {
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0);
				}
				img {
					width: 140px;
					height: 140px;
					top: 180px;
				}
				span {
					top: 340px;
					display: inline-block;
					font-size: 13px;
					color: #CBD5DD;
				}
			}
		}
	}
	.form {
		float: right;
		width: 63%;
		background: #F7FAFA;
		border: 1px solid #CBD5DD;
		border-radius: 2px;
		padding: 20px;
		overflow: auto;
		box-sizing: border-box;
		position: relative;
	}
</style>