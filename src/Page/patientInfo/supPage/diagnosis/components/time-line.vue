<template>
  <div class="time-box">
    <div class="item-con" v-show="data.creatorName">
      <div class="time">{{data.beginTime}}</div>
      <div class="status">由{{data.creatorName}}创建计划</div>
      <div class="ball"></div>
    </div>
    <div class="item-con" v-for="(item, index) in list" :key="item.id" v-show="index == 0 ">
      <div class="time">{{item.beginTime}}</div>
      <div class="status">{{item.executorName?`由${item.executorName}执行`:'未执行'}}</div>
      <div class="ball"></div>
    </div>
    <div class="dashed-line"></div>
    <div class="item-con" v-for="(item, index) in list" :key="item.id" v-show="index == list.length - 1 && index != 0">
      <div class="time">{{item.beginTime}}</div>
      <div class="status">{{item.executorName?`由${item.executorName}执行`:'未执行'}}</div>
      <div class="ball"></div>
    </div>
   <div class="item-con" v-show="data.status == 2">
      <div class="time">{{data.endTime}}</div>
      <div class="status">由{{data.operatorName}}停止计划</div>
      <div class="ball" style="background: #4BB08D"></div>
    </div>
    <div class="grey-line"></div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.time-box
  margin-left 38px
  margin-top 16px
  position relative
  .grey-line
    background #D8D8D8;
    width 2px
    position absolute
    left -24px
    top 3px
    bottom 35px
  .dashed-line
    width 2px
    background #fff
    height 80px
    position relative
    left -24px
    top -18px
    z-index 10
    &:after
      border-left 2px dashed #D8D8D8;
      position absolute
      height 100%
      left 0
      content ''
  .item-con
    margin-bottom 22px
    position relative
    padding-top 1px
    &:first-child
      .ball
        &:after
          content ''
          width 8px
          height 8px
          left 0
          right 0
          bottom 0
          top 0
          position absolute
          margin auto
          background #fff;
          border-radius 50%      
    .time
      font-size: 13px;
      color: #687179;
      letter-spacing: 0.26px;
      margin-top 4px
    .status
      font-size: 13px;
      color: #687179;
      letter-spacing: 0.26px;  
      margin-top 5px
    .ball
      position absolute
      width 20px
      height 20px
      background: #D8D8D8;
      border-radius 50%  
      left -33px
      top 0
      z-index 2
</style>
<script>
import {patientDiag} from '@/api/home'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        list: []
      }
    },
    created(){
      patientDiag(this.$route.params.id).then(res => {
        this.list = res.data.data
      })
    },
    components: {}
  }
</script>
