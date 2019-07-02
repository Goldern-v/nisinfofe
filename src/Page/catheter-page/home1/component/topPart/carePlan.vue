<template>
	<section class="card">
		<div class="card_title">
			<h4 class="card_title-desc">{{'护理诊断与护理计划'}}</h4>
			<span @click="openNewDiagnosis" style="padding: 5px; cursor:pointer">
					<i class="iconfont icon-guanbi card_title-add"></i>
				</span>
		</div>
		<!-- <div class="card_progress">
			<el-progress class="card_progress-bar blue" :text-inside="true" :stroke-width="13" :percentage="doneCount/totalCount*100 || 0" :show-text="false"></el-progress>
			<aside class="card_progress-desc">
				<span class="card_progress-desc_blue">{{doneCount}}</span>&nbsp;/
				<span>{{totalCount}}</span>
			</aside>
		</div> -->
		<div class="card_wrap" id="scrollbar" ref="scrollCon">
			<null-bg v-show="list.length == 0 && !pageLoading"></null-bg>
			<div ref="container">
				<ul ref="content">
					<li>
						<planList :data="item" v-for="item of list" :key="item.id"></planList>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	@mixin clear_fix() {
		*zoom: 1;
		&:after {
			content: "\200B";
			display: block;
			height: 0;
			clear: both;
		}
	}
	.card {
		background: #fff;
		border: 1px solid #cbd5dd;
		border-radius: 2px; // height: 300px;
		width: 32%;
		&_title {
			background: #f7fafa;
			height: 35px;
			padding: 0 4%;
			color: #333;
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
				font-size: 13px;
				line-height: 35px;
				background: transparent;
				border: none;
				transform: rotate(45deg);
				float: right;
				outline: none;
				cursor: pointer;
			}
		}
		&_progress {
			height: 30px;
			background: #f7fafa;
			padding: 0 4%;
			border-bottom: 1px solid #EAEEF1;
			&-bar {
				width: 81%;
				float: left;
			}
			&-desc {
				text-align: right;
				float: right;
				display: inline-block;
				font-size: 13px;
				color: #2c2f00;
				letter-spacing: 0;
				line-height: 16px;
				&_blue {
					color: #5191D1;
				}
			}
		}
		&_wrap {
			padding: 20px 20px 0;
			height: 450px;
			overflow-y: auto;
		}
	}
</style>

<style lang="scss">
	.blue .el-progress-bar__innerText {
		display: none;
	}
	.blue .el-progress-bar__inner {
		background-color: #5191D1;
	}
	.card_progress .el-progress-bar__outer {
		box-shadow: inset 0 1px 1px 0 rgba(164, 164, 164, 0.50);
		background: #E1E5E9;
	}
</style>




<script>
	import {
		patient
	} from '@/api/home-top'
	import planList from './planList.vue'
	import BusFactory from 'vue-happy-bus'
	import nullBg from '@/components/null/null-bg'
	export default {
		data() {
			return {
				bus: BusFactory(this),
				doneCount: 0,
				totalPage: 1,
				totalCount: 1,
				pageSize: 10,
				pageIndex: 1,
				list: [],
				scrObj: {},
				pageLoading: false
			}
		},
		watch: {
			// "finishCount" (val) {
			// 	this.calcPercentage();
			// },
			// "totalCount" (val) {
			// 	this.calcPercentage();
			// }
		},
		mounted() {
			this.scrollInit()
			// 刷新eventbus
			this.bus.$on('refreshCarePlan', () => {
				this.refresh()
			})
		},
		methods: {
			// calcPercentage() {
			// 	return this.percent = Math.round((this.finishCount / this.totalCount) * 100);
			// },
			scrollInit() {
				this.scrObj = new Scrollload({
					container: this.$refs.container,
					content: this.$refs.content,
					window: this.$refs.scrollCon,
					noMoreDataHtml: '',
					loadMore: (sl) => {
						if (this.pageIndex > this.totalPage) {
							sl.noMoreData()
							return
						}
						(async() => {
							try {
								this.pageLoading = true
								let res = await this.getData()
								this.list = [...res.data.data.page.list, ...this.list]
								this.doneCount = res.data.data.doneCount
								this.totalPage = res.data.data.page.totalPage
								this.totalCount = res.data.data.page.totalCount
								this.pageIndex++
								sl.unLock()
							} catch (e) {
								sl.throwException()
							} finally {
								this.pageLoading = false
							}
						})()
					},
				})
			},
			refresh() {
				this.pageIndex = 1
				this.list = []
				this.$nextTick(() => {
					this.scrObj.refreshData()
				})
			},
			getData() {
				let query = this.$route.query
				return patient(query.patientId, query.visitId, this.pageIndex, this.pageSize)
			},
			openNewDiagnosis() {
				window.openNewDiagnosis()
			}
		},
		created() {
			// this.calcPercentage();
		},
		components: {
			planList,
			nullBg
		}
	}
</script>
