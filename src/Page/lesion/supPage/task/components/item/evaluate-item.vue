<template>
	<div>
		<div class="card_item nodone" @click="toDeatil" v-touch-ripple>
			<span class="card_item-name">{{`${data.bedLabel}床-${data.patientName}`}}</span>&nbsp;
			<span class="card_item-form">{{`${data.title}`}}</span>&nbsp;
			<!-- <span class="card_item-desc">超过<span class="warn">{{`3`}}</span>小时</span> -->
		</div>
		<div class="card_item done" v-if="false">
			<img class="card_item-flag" :src="require('@/common/images/home/done.png')" alt="已完成">
			<span class="card_item-name">{{`3床-李娜`}}</span>&nbsp;
			<span class="card_item-form">{{`入院评估表`}}</span>&nbsp;
			<span class="card_item-tip warn">{{`（8分）极高危`}}</span>
		</div>
	</div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.card_item {
				font-size: 13px;
				color: #687179;
				margin-bottom: 10px;
				border: 1px solid #E4E8EB;
				border-radius: 2px;
				line-height: 36px;
				padding: 0 15px;
				box-sizing: border-box;
				height: 40px;
				cursor pointer
				&-tip {
					float: right;
					font-size: 13px;
				}
				&-flag {
					width: 18px;
					height: 18px;
					display: inline-block;
					margin-right: 0.5em;
					vertical-align: middle; // line-height: 38px;
					i {
						line-height: 18px;
						font-size: 12px;
						color: #4BB08D;
					}
				}
				span {
					vertical-align: middle;
				}
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
		data() {
			return {
				msg: 'hello vue'
			}
		},
		methods: {
			toDeatil() {
				// function openwin(url) {
				// 	var a = document.createElement("a"); //创建a对象
				// 	a.setAttribute("href", url);
				// 	a.setAttribute("target", "_blank");
				// 	a.setAttribute("id", "camnpr");
				// 	document.body.appendChild(a);
				// 	a.click(); //执行当前对象
				// }
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
