<template>
	<section class="card"  v-loading="pageLoading">
		<section class="card-item">
			<h1 class="card-item_title">护理等级: {{$route.query.nursingClass}}</h1>
			<article class="card-item_content">
				<h3 class="card-item_content-title">【措施】</h3>
				<p v-for="(item,index) of list" :key="item.id" v-if="item.content">
					{{index+1}}、{{item.content}}
				</p>
				<h3 class="card-item_content-title">【护理数据】</h3>
				<p v-for="(item,index) of list" :key="item.id" v-if="item.title">
					{{index+1}}、{{item.title}} : {{item.timePoint}}
				</p>
			</article>
		</section>
	</section>
</template>


<script>
import {classJob} from '@/api/home-top'
	export default {
		data() {
			return {
				list: [],
				pageLoading: false
			}
		},
		created() {
			this.pageLoading = true
			classJob(this.$route.query.nursingClass).then(res => {
				this.list = res.data.data.list
				this.pageLoading = false
			})
			.catch((e) => {
				this.pageLoading = false
			})
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		height: 504px;
		overflow-y: scroll;
		background: #F7FAFA;
		border: 1px solid #CBD5DD;
		border-radius: 2px; // height: 300px;
		width: 32%;
		&-item {
			padding: 0 4%;
			color: #687179;
			&_title {
				display: inline;
				font-family: 'PingFangSC-Medium';
				font-size: 13px;
				font-weight: bold;
				color: #333;
				letter-spacing: 0;
				line-height: 36px;
			}
			&_content {
				background: #FFFFFF;
				border: 1px solid #E4E8EB;
				border-radius: 2px;
				font-size: 13px;
				padding: 11px 14px;
				line-height: 20px;
				// margin-top: 20px;
				p {
					margin: 5px 0;
					word-wrap: break-word;
				}
				&-title {
					margin-top: 20px;
					&:first-child{
						margin-top: 10px
					}
				}
			}
		}
	}
</style>
