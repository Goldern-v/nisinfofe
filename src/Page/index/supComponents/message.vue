<template>
  <div>
    <div class="main">
      <el-row type="flex" align="middle" class="header">
          <i class="iconfont icon-tongzhi-"></i>
          重要通知
      </el-row>
      <div class="message-con" :style="{height: scrollHeight}" ref="scrollCon">
        <img src="../img/无通知@2x.png" alt="" class="null-bg" v-show="data.list.length == 0">
        <div ref="container">
          <div ref="content">
            <msg-item v-for="item in data.list" :key="item.id" :data="item" :user="data.userMap[item.sender]"></msg-item>
           <!-- <el-button type="primary" class="read-more-btn">查看更多</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .main
    padding 0
    background #fff
  .header
    height 40px;
    background #fff
    border-left: 1px solid #EFEFEF;
    border-bottom: 1px solid #EFEFEF;
    padding-left 20px
    font-size: 13px;
    color: #5F656A;
    i
      color  #B4B4B4;
      margin-right 5px;
    .title
      font-size: 16px;
      color: #687179;
    .eait
      font-size: 13px;
      color: #687179;
  .message-con
    padding 20px;   
    overflow auto 
    margin-bottom -20px
    position relative
  .null-bg
    width 114px
    position absolute
    top -40px
    left 0
    right 0
    bottom 0
    margin auto  
.read-more-btn
  display block
  margin 20px auto    
</style>
<script>
import {noticePage} from '@/api/index'
import {inbox} from '@/api/inBox'
import msgItem from './msg-item'
  export default {
    data() {
      return {
        scrObj: '',
        scrollHeight: 0,
        data: {
          list: [],
          userMap: {}
        },
        page: {
					"totalCount": 20,
					"pageIndex": 1,
					"pageSize": 10,
					totalPage: 1
				},
      }
    },
    created() {
      // notice().then(res => {
      //   this.data.list = res.data.data.list
      //   this.data.userMap = res.data.data.userMap
      // })
    },
    mounted() {
      this.scrollHeight = `${Math.max(this.wih, document.body.offsetHeight) - 130}px`
      this.scrollInit()
    },
    computed: {
       wih() {
        return this.$store.state.common.wih
      }
    },
    methods: {
      getData(pageIndex, pageSize) {
        return inbox(pageIndex, pageSize)
      },
      scrollInit() {
        this.scrObj = new Scrollload({
          container: this.$refs.container,
          content: this.$refs.content,
          window: this.$refs.scrollCon,
          noMoreDataHtml: '',
          loadMore: (sl) => {
            if (this.page.pageIndex > this.page.totalPage) {
              sl.noMoreData()
              return
            }
            this.getData(this.page.pageIndex, this.page.pageSize).then(res => {
                this.data.list = [...this.data.list, ...res.data.data.list]
                this.page.totalPage = res.data.data.totalPage
                this.page.totalCount = res.data.data.totalCount
                this.page.pageIndex++
                  sl.unLock()
              })
              .catch(err => {
                sl.throwException()
              })
          },
        })
      },
      refresh() {
        this.list = []
        this.$nextTick(() => {
          this.page.pageIndex = 1
          this.page.totalPage = 1
          this.scrObj.refreshData()
        })
      },
    },
    watch: {
      wih() {
         this.scrollHeight = `${Math.max(this.wih, document.body.offsetHeight) - 130}px`
      }
    },
    components: {
      msgItem
    }
  }
</script>
