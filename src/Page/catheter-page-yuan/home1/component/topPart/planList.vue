<template>
  <div>
    <div class="card_item" :class="{card_item__noend: data.status == '2'}" @click="openDetailBox(data)" v-touch-ripple>
				<h4 class="card_item-title">P{{data.seqNo}}:{{data.diagName}}</h4>
				<aside class="card_item-tip type1" v-if="data.status == '1'">{{`执行中`}}</aside>
				<aside class="card_item-tip type2" v-if="data.status == '2'">{{data.evalType}}</aside>
				<div class="card_item-desc">
					{{data.beginTime}}&nbsp;&nbsp;<span>{{data.creatorName}}</span>
				</div>
			</div>
  </div>
</template>
<style lang="scss" scoped>
.card_item {
				margin-bottom: 10px;
				height: 65px;
				background: #fff;
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
					float: right; // display: inline-block;
					font-size: 13px;
					color: #4BB08D;
					&__end {
						color: #E72C2C;
					}
				}
				&-desc {
					padding-top: 9px;
					font-size: 12px;
					color: #999999;
					&_warn {
						color: #E72C2C;
					}
					&__end {
						margin-left: 35px;
					}
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
				&__end {
					background: #F2F2F2;
				}
			}
  .card_item__noend{
    background: #F2F2F2;
    border: 1px solid #E4E8EB;
    border-radius: 2px;
  }    
  .card_item-tip{
    font-size: 13px;
    &.type1{
      color: #FD943A;
    }
    &.type2{
      color: #4BB08D;
    }
    &.type3{
      color: #E72C2C;;
    }
  }
</style>
<script>
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
			openDetailBox(item) {
				window.openDiagnosisDetail(item)
			}
		},
    components: {}
  }
</script>
