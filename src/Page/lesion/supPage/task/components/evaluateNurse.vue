<template>
	<section class="card" :style="{height: style.height}">
		<div class="card_title">
			<h4 class="card_title-desc">今日任务-评估护理</h4>
		</div>
		<div class="card_progress">
			<el-progress class="card_progress-bar" :text-inside="true" :stroke-width="13" :percentage="totalCount != 0?finishCount/totalCount * 100:0" :show-text="false"></el-progress>
			<aside class="card_progress-desc">
				<span class="card_progress-desc_green">{{finishCount}}</span>&nbsp;/
				<span>{{totalCount}}</span>
			</aside>
		</div>
		<div class="card_wrap" :style="{height: style.heightScroll}" ref="scrollCon">
			<div class="card_noitem" v-show="data.list.length == 0">
				<img :src="require('@/common/images/task/nondata.png')" alt="">
				<span>暂无护理评估信息～</span>
			</div>
			<div ref="container" v-show="data.list.length">
               <ul ref="content"> 
				   <li v-for="item in data.list" :key="item.id">
					   <evaluateItem :data="item"></evaluateItem>
				   </li>
			  </ul>
			</div>
			<!-- 动态生成 -->
		</div>
	</section>
</template>

<script>
	import {
		deptForm
	} from '@/api/task'
	import evaluateItem from './item/evaluate-item.vue'
	export default {
		props: {
			taskType: String
		},
		data() {
			return {
				scrObj: '',
				style: {
					height: `${window.innerHeight - 212}px`,
					heightScroll: `${window.innerHeight - 280}px`,
				},
				page: {
					"totalCount": 20,
					"pageIndex": 1,
					"pageSize": 10,
					totalPage: 1
				},
				finishCount: 0,
				totalCount: 0,
				data: {
					list: []
				},
			}
		},
		computed: {
			wardCode() {
				return this.$store.state.lesion.deptCode
			}
		},
		methods: {
			getData() {
				return deptForm(this.wardCode, this.taskType, this.page.pageIndex, this.page.pageSize)
			},
			scrollInit() {
				if(this.scrObj) return
				this.scrObj = new Scrollload({
					container: this.$refs.container,
					content: this.$refs.content,
					window: this.$refs.scrollCon,
					noMoreDataHtml: '',
					loadMore: (sl) => {
						if (this.page.pageIndex > this.page.totalPage) {
							sl.noMoreData()
							return
						}
						this.getData().then(res => {
								this.data.list = res.data.data.page.list
								this.page.totalPage = res.data.data.page.totalPage
								this.page.pageIndex++
									sl.unLock()
							})
							.catch(err => {
								sl.throwException()
							})
					},
				})
			},
			refresh() {
				this.page.pageIndex = 1
				this.page.totalPage = 1
				this.list = []
				this.$nextTick(() => {
					this.scrObj.refreshData()
				})
			},
		},
		created() {

		},
		mounted() {
			this.scrollInit()
		},
		watch: {
			taskType() {
				this.scrollInit()
				this.refresh()
			},
			wardCode() {
				this.scrollInit()
				this.refresh()
			},
		},
		components: {
			evaluateItem
		}
	}
</script>

<style lang="scss" scoped>
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
		}
		&_progress {
			height: 30px;
			background: #f7fafa;
			padding: 0 4%;
			border-bottom: 1px solid #EAEEF1;
			&-bar {
				width: 81%;
				float: left;
				.el-progress-bar__innerText {
					display: none;
				}
			}
			&-desc {
				text-align: right;
				float: right;
				font-size: 13px;
				color: #2c2f00;
				letter-spacing: 0;
				line-height: 16px;
				&_green {
					color: #14C4A5;
				}
			}
		}
		&_wrap {
			padding: 20px;
			overflow-y: scroll;
			box-sizing: border-box;
			position: relative;
			.nodone {
				background: #fff;
				.card_item-tip {
					color: #4BB08D;
				}
			}
			.done {
				background: #F2F2F2;
				.card_item-desc {
					margin-left: 35px;
				}
			}
			.warn {
				color: #E72C2C;
			}
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
</style>
