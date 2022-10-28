<template>
  <div class="p3-contain">
    <div class="head-con" flex="cross:center main:justify">
      <span>
         <span class="icon">💉</span>
         <span>智慧输液</span>
      </span>
      <div class="tip-con" flex="cross:center">
        <span>今日已输液：</span>
        <div class="value">{{excuteToday.infusionTotal}}</div>
        <span>当前输液：</span>
        <div class="value">{{excuteToday.infusionNow}}</div>
      </div>
    </div>
    <div class="box-con">
      <vue-seamless-scroll class="scroll-con" :data="list">
       <infuseItem :data="item" type="vw" v-for="item in list" :key="item.bedLabel"></infuseItem>
      </vue-seamless-scroll>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl'
.p3-contain
  height 100%
  box-sizing border-box
  padding-top tovw(37)
  position relative
  margin-right tovw(20)
  .head-con
    position absolute
    top 0
    height tovw(37)
    width 100%;
    background-image: linear-gradient(-180deg, #F4F4F4 0%, #DCDCDC 100%);
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 0;
    font-size: tovw(18);
    color: #333333;
    padding-left tovw(18)
    box-sizing border-box
    font-weight bold
    .icon
      margin-right tovw(5)
    .tip-con
      font-size tovw(18)
      line-height tovw(20)
      color #333
      .value
        margin-right tovw(25)
        background #fff
        height tovw(20)
        line-height tovw(20)
        padding 0 tovw(4)
        border: 1px solid #CBD5DD;
        border-radius: 2px;
  .box-con
    height 100%      
    background #fff;
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    box-sizing border-box
    padding tovw(20)
.scroll-con
  overflow hidden
  height 100%    
</style>
<script>
import infuseItem from '@/Page/lesion/supPage/infuse/component/infuse-item.vue'
  import {
    getExecute
  } from '@/api/infuse'
  export default {
    data() {
      return {
        list: [],
        timer: '',
        excuteToday: {
          infusionTotal: '',
          infusionNow: ''
        },
      }
    },
     methods: {
      getData() {
        if (this.wardCode) {
          getExecute(this.wardCode).then(res => {
            this.list = res.data.data.list
            this.excuteToday = res.data.data.excuteToday
          })
        }
      }
    },
    computed: {
      wardCode() {
        return this.$store.state.lesion.deptCode
      }
    },
    watch: {
      wardCode() {
        this.getData()
      }
    },
    created() {
    this.getData()
     this.timer = setInterval(() => {
        this.getData()
      }, 1000 * 60)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
    components: {
      infuseItem
    }
  }
</script>
