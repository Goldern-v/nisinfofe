<template>
<div>
  <div class="list-box" flex="main:justify" :class="{noStart: state == '未开始'}">
    <div class="time">{{new Date(data.beginTime).Format('hh:mm')}}</div>
    <div flex-box="1" style="width: 0">{{data.title}}</div>
    <div class="tip" v-if="!done">{{state}}</div>
    <div class="tip" v-if="done">完成</div>
  </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
  .list-box
    font-size: 13px;
    color: #687179;
    padding 10px 13px
    border: 1px solid #E4E8EB;
    border-radius: 2px;
    margin-bottom 10px
    cursor pointer
    &.noStart
      background #f8f8f8
    .time
      width 80px
    .tip
      margin-left 10px 
</style>

<script>
  export default {
    props: {
      data: Object,
      done: Boolean
    },
    data() {
      return {}
    },
    computed: {
      state() {
        let beginTime = new Date(this.data.beginTime)
        let expectedEndTime = new Date(this.data.expectedEndTime)
        let now = new Date()
        if(beginTime > now ) {
          return '未开始'
        } else{
          if(!expectedEndTime || expectedEndTime > now) {
            return '未完成'
          } else {
            let overTime =  Math.round((now - expectedEndTime)/1000/60/60)
            if(overTime < 20) {
              return `超时${overTime}小时`
            } else {
              return `超时`
            }
          }

        }
      }
    }
  }
</script>
