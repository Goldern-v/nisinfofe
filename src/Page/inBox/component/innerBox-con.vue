<template lang="pug">
  .table-con
    .head-con(flex="main:justify cross:center")
      .left-part 
        //- .white-btn(v-touch-ripple="" @click="delSelect") 删除
        //- .white-btn(v-touch-ripple="" @click="readSelect") 标记为已读
        span(@click="delSelect")
          whiteButton(text="删除")
        span(@click="readSelect")  
          whiteButton(text="标记为已读")
      .right-part
        span {{page.pageIndex}}/{{page.totalPage}}页
        span(@click="prePage" :class="{useLess: page.pageIndex <= 1}") 上一页
        span(@click="nextPage" :class="{useLess: page.pageIndex >= page.totalPage}") 下一页
        span
          input(type="text" v-model="pageInput" @keyup.enter="gotoPage")
        span(@click="gotoPage") 跳转
    tItem(t3="状态" t4="发件人" t5="主题" t6="时间" :isHead="true" :data="{}")  
    //- span {{todayList}}
    //- span {{yesterdayList}}
    //- span {{pasList}}
    .tbody(v-show="data.list.length")
      timeLine(date="今天" :num="todayList.length" v-show="todayList.length")
      tItem(v-for="item in todayList" :key="item.id" :data="item" :t2="item.type" :t3="item.readState == '1'? '已读': '未读'" :t4="item.senderName" :t5="item.title" :t6="item.sendTime" :isHead="false") 
      timeLine(date="昨天" :num="yesterdayList.length" v-show="yesterdayList.length")
      tItem(v-for="item in yesterdayList" :key="item.id" :data="item" :t2="item.type" :t3="item.readState == '1'? '已读': '未读'" :t4="item.senderName" :t5="item.title" :t6="item.sendTime" :isHead="false")  
      timeLine(date="更早" :num="pastList.length" v-show="pastList.length")
      tItem(v-for="item in pastList" :key="item.id" :data="item" :t2="item.type" :t3="item.readState == '1'? '已读': '未读'" :t4="item.senderName" :t5="item.title" :t6="item.sendTime" :isHead="false")  
    .tbody-non(v-show="data.list.length == 0" flex="main:center cross:center") 没有邮件
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.table-con
  background: #E6ECED;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  .head-con
    height 50px
    padding 0 16px
    background: #F8F8F8;
    border-bottom 1px solid #CBD5DD
    .right-part
      span 
        margin-right 12px
        font-size: 12px;
        color: #687179;  
        cursor pointer
        user-select: none
        &.useLess
          color #999 !important
          cursor: not-allowed;
        input 
          width 25px;
          height 16px;
          background: #FFFFFF;
          border: 1px solid #CBD5DD;
          border-radius: 2px;
          outline none
          text-align center
        &:hover
          color #333          
  .tbody
    background #fff    
    .th-con:last-child
      border-bottom 0         
  .tbody-non
    font-size: 13px;
    color: #454545;       
    background #E6ECED
    height 90px
</style>

<script>
  import tItem from './t-item'
  import timeLine from './time-line'
  import {mapState, mapMutations} from 'vuex'
  import {inbox, del, read} from '@/api/inBox'
  import whiteButton from '../../../components/button/white-button.vue'
  export default {
    data() {
      return {
        pageInput: '',
        data: {
          list: []
        },
        page: {
          pageIndex: 1,
          pageSize: 10,
          totalPage: 1,
          totalCount: 0
        },
      }
    },
    created() {
      this.getData()
    },
    computed: {
      todayList() {
        return this.data.list.filter(item => {
          if (new Date(item.sendTime).toDateString() == new Date().toDateString()) {
            return true
          }
        })
      },
      yesterdayList() {
        return this.data.list.filter(item => {
          if (new Date(new Date(item.sendTime).getTime() - 1000 * 60 * 60 * 24).toDateString() == new Date().toDateString()) {
            return true
          }
        })
      },
      pastList() {
        return this.data.list.filter(item => {
          if ((new Date(new Date(item.sendTime).getTime() - 1000 * 60 * 60 * 24)).toDateString() != new Date().toDateString() && new Date(item.sendTime).toDateString() != new Date().toDateString()) {
            return true
          }
        })
      },
      ...mapState([
        'inBox'
      ])
    },
    methods: {
      getData() {
        inbox(this.page.pageIndex, this.page.pageSize).then(res => {
          this.data.list = res.data.data.list
          this.page.totalPage = res.data.data.totalPage
          this.page.totalCount = res.data.data.totalCount
        })
        this.$store.dispatch('getMailUnread')
      },
      prePage() {
        if (this.page.pageIndex <= 1) return
        this.page.pageIndex--
          this.getData()
      },
      nextPage() {
        if (this.page.pageIndex >= this.page.totalPage) return
        this.page.pageIndex++
          this.getData()
      },
      gotoPage() {
        let req = /^[0-9]*$/
        if (req.test(this.pageInput)) {
          if (parseInt(this.pageInput) > this.page.totalPage) {
            this.$message({
              showClose: true,
              message: '页码不能超出最大页数',
              type: 'warning'
            })
          } else{
            this.page.pageIndex = this.pageInput
            this.getData()
          }
        } else {
          this.$message({
            showClose: true,
            message: '请输入正确的数字',
            type: 'warning'
          })
        }
      },
      delSelect() {
        let idList = this.inBox.selectList.join(',')
        if(idList == '') {
          return this.$message({
            showClose: true,
            message: '请至少选择其中一项',
            type: 'warning'
          })
        }
        del(idList).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        })
      },
      readSelect() {
        let idList = this.inBox.selectList.join(',')
        if(idList == '') {
          return this.$message({
            showClose: true,
            message: '请至少选择其中一项',
            type: 'warning'
          })
        }
        read(idList).then(res => {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success'
          })
          this.getData()
        })
      },
      // ...mapMutations([
      //   'inBox'
      // ])
    },
    watch: {
      page: {
        handler() {
        this.$emit('allTotal', this.page.totalCount)
        },
        deep: true
      },
    },
    components: {
      tItem,
      timeLine,
      whiteButton
    }
  }
</script>
