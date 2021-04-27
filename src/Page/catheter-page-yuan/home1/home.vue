<template>
	<section>
		<section class="content">
			<!-- 护理概览 -->
			<h1 class="part-title">护理概览</h1>
			<div class="top-part">
				<!-- 护理文书 -->
				<careNote></careNote>
				<!-- 护理诊断与护理计划 -->
				<carePlan></carePlan>
				<!-- 护理等级 -->
				<careLevel></careLevel>
			</div>
			<!-- 护理任务时间轴 -->
			<div class="time-line-con">
				<h1 class="part-title">护理任务时间轴</h1>
				<timeLine></timeLine>
			</div>
			<!-- 侧滑菜单 -->
			<!-- <button @click="open = !open"></button>
	    <slideCon :open="open"></slideCon> -->
		</section>
	</section>
</template>


<style lang="stylus" scoped>
.content {
  margin 20px 20px 20px
}
.part-title {
    font-size: 16px;
    color: #333;
    letter-spacing: 0.32px;
    border-left: 4px solid #4bb08d;
    padding-left: 10px;
    margin: 24px 0 20px;
    height: 18px;
    vertical-align: middle;
    font-weight: bold;
  }
  .top-part{
	  display: flex;
	  justify-content: space-between;
	}
</style>

<script>
	import careNote from "./component/topPart/careNote";
	import carePlan from "./component/topPart/carePlan";
	import timeLine from "./component/timeLine/timeLine";
	import careLevel from './component/topPart/careLevel'
	export default {
		components: {
			timeLine,
			careNote,
			carePlan,
			careLevel
		},
		data() {
			return {
				open: true
			};
		},
		created() {}
	};
</script>
