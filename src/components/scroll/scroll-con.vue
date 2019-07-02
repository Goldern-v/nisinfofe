<template>
  <div ref="scrollCon" class="scroll-con">
    <div ref="container" style="height:100%">
        <div ref="content" style="height:100%"> 
				  <slot></slot>
			  </div>
			</div>
	</div>		
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.scroll-con
	height 100%
	overflow auto
</style>
<script>
  export default {
    props: {
			loadFun: Function,
			noMoreData: {
				type: Boolean,
				default: false
			},
    },
    data() {
      return {
				scrObj: '',
      }
    },
    mounted() {
      this.scrollInit()
    },
    methods: {
			scrollInit() {
				if(this.scrObj) return
				this.scrObj = new Scrollload({
					container: this.$refs.container,
					content: this.$refs.content,
					window: this.$refs.scrollCon,
					noMoreDataHtml: '',
					loadMore: (sl) => {
						if (this.noMoreData) {
							sl.noMoreData()
							return
						}
						// this.getData().then(res => {
						// 		this.data.list = res.data.data.page.list
						// 		this.page.totalPage = res.data.data.page.totalPage
						// 		this.page.pageIndex++
						// 			sl.unLock()
						// 	})
						// 	.catch(err => {
						// 		sl.throwException()
						// 	})
							this.$emit('loadMore', sl)
					},
				})
			},
			refresh() {
				this.$nextTick(() => {
					this.scrObj.refreshData()
				})
			},
		},
    components: {}
  }
</script>
