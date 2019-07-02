<template>
  <div>
    <div class="card_item" v-touch-ripple :class="{active: clickIndex == data.id}">
					<span class="card_item-title">{{data.conGoal}}</span>
					<div class="card_item-date">{{data.planDate}}</div>
					<span class="card_item-tag" :class="{done: data.status == '完成', hold: data.status == '暂存', apply: data.status == '申请确认', wait: data.status == '等待确认'}">{{data.status}}</span>
			</div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.card_item {
				font-size: 13px;
				color: #687179;
				padding 11px 14px 11px 14px
        margin-bottom 10px
        border: 1px solid #E4E8EB;
        border-radius: 2px;  
				box-sizing: border-box;
				height: 65px;
				position: relative;
        cursor: pointer;
				&.active{
					background: #F2F2F2;
				}
				&-title {
					font-size: 13px;
					color: #687179;
          overflow hidden;
          white-space nowrap;
          text-overflow ellipsis;
          display block;
          padding-right 80px;
				}
				&-date {
					font-size: 12px;
					color: #999999;
					line-height: 36px;
				}
				&-tag {
					font-size: 12px;
					color: #fff;
					border-radius: 2px;
					padding: 2px 10px;
					height: 18px;
					line-height: 19px;
					position: absolute;
					right: 15px;
					top: 10px;
					&.done {
						// 完成
						background: #4BB08D;
					}
					&.hold {
						// 暂存
						background: #6CA8D7;
					}
					&.apply {
						// 申请确认
						background: #FD815A;
					}
					&.wait {
						// 等待确认
						background: #FD943A;
					}
				}
			}
</style>
<script>
  export default {
    props: {
      data: Object,
      clickIndex: Number
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
