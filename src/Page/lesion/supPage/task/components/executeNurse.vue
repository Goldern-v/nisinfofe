<template>
	<section class="card" :style="{height: style.height}">
		<div class="card_title">
			<h4 class="card_title-desc">今日任务-护理执行</h4>
		</div>
		<div class="card_progress">
			<el-progress class="card_progress-bar blue" :text-inside="true" :stroke-width="13" :percentage="totalCount != 0?doneCount/totalCount * 100:0" :show-text="false">
			</el-progress>
			<aside class="card_progress-desc">
				<span class="card_progress-desc_green">{{doneCount}}</span>&nbsp;/
				<span>{{totalCount}}</span>
			</aside>
		</div>
		<div class="card_wrap progress-bar"  :style="{height: style.heightScroll}">
			<div class="card_noitem" v-if="list.length == 0">
				<img :src="require('@/common/images/task/nondata.png')" alt="" v-if="true">
				<span>暂无护理执行信息～</span>
			</div>
			<executeItem v-for="item of list" :key="item.id" :data="item"></executeItem>
		</div>
	</section>
</template>

<script>
import executeItem from './item/execute-item'
import {deptNursing} from '@/api/task'
	export default {
		props: {
			taskType: String
		},
		data() {
			return {
				style: {
					height: `${window.innerHeight - 212}px`,
					heightScroll: `${window.innerHeight - 280}px`,
				},
				doneCount: 0,
				totalCount: 0,
				list: [],
				calcPercent: {
					width: '22%'
				}
			}
		},
		computed: {
			wardCode() {
				return this.$store.state.lesion.deptCode
			}
		},
		methods: {
			getData() {
				if(!this.wardCode) return
				deptNursing(this.wardCode, this.taskType).then(res => {
					this.doneCount = res.data.data.doneCount
					this.totalCount = res.data.data.totalCount
					this.list = res.data.data.list
				})
			},
		},
		created() {
			this.getData()
		},
		watch: {
			taskType() {
				this.getData()
			},
			wardCode() {
				this.getData()
			},
		},
		components: {
			executeItem
		}
	}
</script>

<style lang="scss" scoped>
	.progress-bar {
		background: #fff;
		&__inner {
			display: inline-block;
			background: #E4F6FF;
			height: 100%;
			position: absolute;
			left: 0;
		}
	}
	.card {
		height: 667px;
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
			}
			&-desc {
				text-align: right;
				float: right;
				font-size: 13px;
				color: #2c2f00;
				letter-spacing: 0;
				line-height: 16px;
				&_green {
					color: #5191D1;
				}
			}
		}
		&_wrap {
			box-sizing: border-box;
			height: 600px;
			padding: 11px 4% 21px 4%;
			overflow-y: scroll;
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
</style>