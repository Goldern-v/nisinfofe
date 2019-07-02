<template>
  <div class="contain">
    <div class="box">
      <div class="head-con" flex="cross:center main:justify">
        <span class="head-title">护理诊断与计划</span>
        <span class="head-tool" @click="openNewDiagnosis">
          <i class="el-icon-plus"></i>
          新建
        </span>
      </div>
      <div class="body-con" :style="{height: boxHeight}" v-loading="pageLoading">
        <scrollCon @loadMore="getData" ref="scrollCon">
          <diagnosis-item v-for="item in list" :key="item.id" :data="item"></diagnosis-item>
          <nullBg text="暂无数据～" v-show="list.length == 0 && !pageLoading"></nullBg>
        </scrollCon>
      </div>
    </div>  
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
  .box
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px;
  .head-con
    height 32px
    background: #F7FAFA;
    border-bottom: 1px solid #EAEEF1;
    padding 0 12px 0 17px
    .head-title
      font-size: 13px;
      color: #333333;
      letter-spacing: 0.26px;
      font-weight bold
    .head-tool
      font-size: 13px;
      color: #687179;
      letter-spacing: 0.26px;  
      cursor pointer
      &:hover 
        color #000
      i 
        font-size 12px
  .body-con
    background #fff       
  // .item-box:last-child
  //   border-bottom 0  
</style>
<script>
import diagnosisItem from './components/diagnosis-item'
import nullBg from '../../../../components/null/null-bg'
import {patient} from '@/api/home'
import scrollCon from '@/components/scroll/scroll-con'
import BusFactory from 'vue-happy-bus'
  export default {
    data() {
      return {
        list: [],
        bus: BusFactory(this),
        page: {
          pageIndex: 0,
          pageSize: 10
        },
        pageLoading: true
      }
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      },
      boxHeight() {
        return this.wih - 185 + 'px'
      }
    },
    methods: {
      getData(sl) {
        patient(this.$route.query.patientId, this.$route.query.visitId,this.page.pageIndex + 1, this.page.pageSize)
          .then(res => {
            let totalPage = res.data.data.page.totalPage
            let pageIndex = res.data.data.page.pageIndex
            if(pageIndex > totalPage) {
              sl.noMoreData()
            } else {
              this.pageLoading = false
              this.page.pageIndex = pageIndex
              this.list = [...this.list, ...res.data.data.page.list]
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
      openNewDiagnosis() {
        window.openNewDiagnosis()
      },
      refresh() {
        this.pageLoading = false
        this.list = []
        this.page = {
          pageIndex: 0,
          pageSize: 10
        }
        this.$refs.scrollCon.refresh()
      }
    },
    mounted() {
      this.bus.$on('refreshCarePlan', this.refresh)
    },
    components: {
      diagnosisItem, nullBg, scrollCon
    }
  }
</script>
