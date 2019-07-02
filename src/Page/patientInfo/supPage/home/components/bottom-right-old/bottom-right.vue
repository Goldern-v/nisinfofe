<template>
  <div class="scroll-con" :style="{height: boxHeight}">
    <scrollCon @loadMore="getData" ref="scrollCon">

    <div class="item-box" v-for="item in list" :key="item.id" @click="toDetails(item)" v-touch-ripple>
      <div class="title">
        {{title(item)}}
      </div>
      <div class="info" flex="main:justify cross:center">
        <span class="name">{{item.creatorName}}</span>
        <span class="time">{{item.beginTime}}</span>
      </div>
    </div>
    
    <nullText v-show="ajaxLoading && list.length == 0"></nullText>
    </scrollCon>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-box
  border-bottom: 1px solid #E7EAEC;
  padding 20px 14px
  cursor pointer
  &:hover
    background #fafafa
  .name
    font-size: 13px;
    color: #687179;
  .time
    font-size: 12px;
    color: #9AA0A4;  
  .title  
    font-size: 13px;
    color: #687179;
    margin-bottom 8px
.scroll-con
  overflow auto    
</style>
<script>
import {patient} from '@/api/home'
import scrollCon from '@/components/scroll/scroll-con'
import nullText from '../../../../../../components/null/null-text'
  export default {
    data() {
      return {
        list: [],
        page: {
          pageIndex: 0,
          pageSize: 10
        },
        ajaxLoading: false,
      }
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      },
      boxHeight() {
        return this.wih - 355 + 'px'
      },
    },
    methods: {
      getData(sl) {
        patient(this.$route.query.patientId, this.$route.query.visitId,this.page.pageIndex + 1, this.page.pageSize, '1')
          .then(res => {
            this.ajaxLoading = true
            let totalPage = res.data.data.page.totalPage
            let pageIndex = res.data.data.page.pageIndex
            if(pageIndex > totalPage) {
              sl.noMoreData()
            } else {
              this.page.pageIndex = pageIndex
              this.list = [...this.list, ...res.data.data.page.list]
              this.$parent.$parent.totalCount = res.data.data.page.totalCount
              if(pageIndex == totalPage) {
              sl.noMoreData()
            } else {
               sl.unLock()
            }
            }
          })
          .catch(() => {
            sl.throwException()
          }) 
      },
      title(data) {
        return `P${data.seqNo}:${data.diagName}` + (this.disable(data)?'(已停止)': '')
      },
       disable(data) {
        return data.status == 2
      },
       toDetails(item) {
        this.$router.push({path: `/diganosisDetails/${item.id}`, query: this.$route.query})
      }
    },
    components: {
      scrollCon, nullText
    }
  }
</script>
