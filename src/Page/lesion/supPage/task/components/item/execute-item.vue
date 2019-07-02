<template>
	<div>
		<div class="card_item" @click="toDeatil" v-touch-ripple>
			<div class="progress-bar__inner" v-calcPercent="data.doneCount/data.totalCount * 100">
			</div>
			<span class="card_item-name">{{`${data.bedLabel}床 - ${data.patientName}`}}</span>
			<span class="card_item-tip">{{data.doneCount/data.totalCount * 100 + '%'}}</span>
		</div>
	</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.card_item {
				height: 65px;
				font-size: 13px;
				color: #687179;
				margin-top: 10px;
				border: 1px solid #E4E8EB;
				border-radius: 2px;
				line-height: 36px;
				padding: 0 15px;
				box-sizing: border-box;
				height: 40px;
				position: relative;
				cursor pointer;
				&-name {
					position: absolute;
					left: 15px;
				}
				&-tip {
					position: absolute;
					right: 15px;
					font-size: 13px;
				}
				span {
					vertical-align: middle;
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
</style>

<script>
	import {
		info
	} from '@/api/task'
	import qs from 'qs'
	export default {
		props: {
			data: Object
		},
		// 自定义指令
		directives: {
			calcPercent: {
				bind: function(el, bind) {
					el.style.width = `${bind.value}%`
				}
			}
		},
		data() {
			return {
				msg: 'hello vue'
			}
		},
		methods: {
			toDeatil() {
				function openwin(url) {
					var a = document.createElement("a"); //创建a对象
					a.setAttribute("href", url);
					a.setAttribute("target", "_blank");
					a.setAttribute("id", "camnpr");
					document.body.appendChild(a);
					a.click(); //执行当前对象
				}
				let data = this.data
				info(data.patientId, data.visitId).then(res => {
					// openwin(`/#/home?${qs.stringify(res.data.data)}`)
					for(let index in res.data.data) {
						if(res.data.data[index] == null) {
							res.data.data[index] = ''
						}
					}
					this.$router.push({path: '/home', query: res.data.data})
				})
			}
		},
		components: {}
	}
</script>
