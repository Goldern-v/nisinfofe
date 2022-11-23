<template>
	<section class="card">
		<div class="card_title">
			<h4 class="card_title-desc">护理文书</h4>
			<span @click="openNewForm" style="padding: 10px">
				<i class="iconfont icon-guanbi card_title-add"></i>
			</span>
		</div>
		<div class="card_wrap" id="scrollbar" v-loading="pageLoading">
			<!-- 动态生成 -->
			<null-bg v-show="list.length == 0 && !pageLoading"></null-bg>
			<noteList v-for="item in list" :key="item.formCode" :data="item"></noteList>
		</div>
	</section>
</template>

<script>
	import {
		getNote
	} from '@/api/home-top'
	import noteList from './noteList.vue'
	import BusFactory from 'vue-happy-bus'
	import nullBg from '@/components/null/null-bg'
	export default {
		data() {
			return {
				bus: BusFactory(this),
				percent: 0,
				doneCount: 0,
				totalCount: 1,
				list: [],
				pageLoading: true
			}
		},
		methods: {
			sliceStr(str) {
				if (!str) return ''
				return str.slice(5);
			},
			renderNote() {
				let patientId = this.$route.query.patientId;
				let visitId = this.$route.query.visitId;
				(async() => {
					try {
						this.pageLoading = true
						let res = await getNote(patientId, visitId)
						this.list = res.data.data
					} catch (e) {} finally {
						this.pageLoading = false
					}
				})()
			},
			openNewForm() {
				window.openNewForm()
			},
			refresh() {
				this.renderNote();
			}
		},
		created() {
			this.renderNote();
			this.bus.$on('careNoteRefresh', () => {
				this.refresh()
			})
		},
		components: {
			nullBg, noteList
		}
	}
</script>

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
			height: 430px;
			overflow-y: auto;
			.nodone {
				background: #fff;
				.card_item-tip {
					color: #4BB08D;
					float: right;
				}
			}
			.done {
				background: #F2F2F2;
				.card_item-desc {
					margin-left: 35px;
				}
				.card_item-tip {
					color: #687179;
					font-size: 12px;
					;
				}
			}
			.warn {
				color: #E72C2C;
			}
			.card_item {
				margin-bottom: 10px; // height: 65px;
				border: 1px solid #E4E8EB;
				border-radius: 2px;
				padding: 11px 14px;
				box-sizing: border-box;
				cursor: pointer;
				&-title {
					font-size: 13px;
					color: #687179;
					display: inline-block;
				}
				&-tip {
					font-size: 13px;
				}
				&-desc {
					padding-top: 9px;
					font-size: 12px;
					color: #999999;
				}
				&-flag {
					width: 18px;
					height: 18px;
					display: inline-block;
					background: #FFF;
					border: 1px solid #CBD5DD;
					text-align: center;
					margin-right: 11px;
					i {
						line-height: 18px;
						font-size: 12px;
						color: #4BB08D;
					}
				}
			}
		}
	}
</style>





