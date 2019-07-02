<template>
	<section class="task">
		<div class="title">
			<span class="title-desc">任务类型：</span>
			<el-select v-model="taskType" placeholder="请选择" size="small" class="select">
				<el-option v-for="item in taskTypeList" :key="item.code" :label="item.name" :value="item.code">
				</el-option>
			</el-select>
			<!-- <i class="title-question iconfont icon-shuoming"></i> -->
		</div>
		<!-- 加载中进度条卡片 -->
		<!-- <div class="fullpage-mask">
			<div class="progress-card">
				<h4>{{`正在初始化信息，请稍后`}}</h4>
				<div class="loading-bar_outer loading-bar">
					<div class="loading-bar_inner loading-bar" v-loadEnd>
					</div>
				</div>
			</div>
		</div> -->
		<section class="content">
			<evaluateNurse :taskType="taskType"></evaluateNurse>
			<executeNurse :taskType="taskType"></executeNurse>
			<messageBoard :taskType="taskType"></messageBoard>
		</section>
	</section>
</template>

<script>
	import evaluateNurse from './components/evaluateNurse'
	import executeNurse from './components/executeNurse'
	import messageBoard from './components/messageBoard'
	import Scrollload from 'Scrollload'
	export default {
		directives: {
			loadEnd: {
				bind: function(el, bind) {
					el.style.width = '100%';				
				}
			}
		},
		data() {
			return {
				taskType: '0',
				taskTypeList: [{
						name: '我的任务',
						code: '1',
					},
					{
						name: '全区任务',
						code: '0',
					}
				]
			}
		},
		created() {
			this.taskType = this.$store.state.lesion.taskType
		},
		watch: {
			taskType() {
				this.$store.commit('upTaskType', this.taskType)
			}
		},
		components: {
			evaluateNurse,
			executeNurse,
			messageBoard
		}
	}
</script>

<style lang="scss" scoped>
	.task {
		margin: 0 20px;
	}
	.title {
		font-size: 12px;
		color: #687179;
		margin: 20px 0;
		&-question{
			margin-left: 1em;
			cursor: pointer;
		}
	}
	.select {
		width: 126px;
		background: #FFFFFF;
		border-radius: 4px;
		font-size: 12px;
		color: #333333;
	}
	.content {
		display: flex;
		justify-content: space-between;
	}  // 进度条
	.fullpage-mask {
		position: fixed;
		z-index: 200;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.progress-card {
		text-align: center;
		height: 114px;
		width: 344px;
		background: #FFFFFF;
		border: 1px solid #979797;
		box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.50);
		border-radius: 4px;
		font-size: 14px;
		color: #687179;
		h4 {
			margin-top: 30px;
		}
		.loading-bar {
			height: 12px;
			border-radius: 42px;
			&_outer {
				background: #E1E5E9;
				box-shadow: inset 0 1px 1px 0 rgba(164, 164, 164, 0.50);
				width: 290px;
				display: inline-block;
				margin-top: 25px;
				position: relative;
				overflow: hidden;
			}
			&_inner {
				position: absolute;
				left: 0;
				width: 100%; 
				// background-image: url('../../../../common/images/task/loading.png');
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAMCAYAAAAK/x/DAAAAAXNSR0IArs4c6QAAAS9JREFUOBGtVe1Kw0AQnMvFmDRGbRAELdY/Po3P5rv4SC1VEcSmFnsxzZe7gYolyTVHb/8cl92ZHZbJnnh8fqpBIYWDh+gKnuPy1Uq8qBWWW2XE5eyqy7rCfJOgQqNv9/mo82Z0AV+eGHH8CWJUWuZ4VV9GBLpiBwL3YQyXpj80WpUJjfgzMxuzrpnnSEzCS13JXq4liLNv6Qqq2O4VHnM5d31c+9Egik5B7KK5SlCQr2wFC4rc04N0nYIYlVdlY3J7FgfuwjH9xVIrqlcQozZFhvd0rSUwSfJqmZLJhRC9MK0gRn1k31jnP70EpomA1sAk6Df5QUHccEF+ysrCtHdv/dgLEHthZ36QoLKuMVNLVHTailtamiPptegGCWIUT2hBT4GtYBdNz+LmyfrP+QteO1Ge5Th+fAAAAABJRU5ErkJggg==);
				background-repeat: repeat-x;
				animation: loadPrecent 3s linear infinite, animatedBg 3s linear infinite;
			}
			@keyframes loadPrecent {
				0% {
					width: 2%;
				}
				40% {
					width: 80%;
				}
				100% {
					width: 100%;
				}
			}
			@keyframes animatedBg {
				from {
					background-position-x: 0;
				}
				to {
					background-position-x: 100%;
				}
			}
		}
	}
</style>

