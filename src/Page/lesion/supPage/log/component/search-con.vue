<template>
  <div class="search-con" :data="data">
    <div class="search-top">
      <h4>{{allData.科室名字}}</h4>
      <aside>{{time}}</aside>
      <ul class="search-img">
        <li>
          <img src="../img/morning.png" alt="">
          <!-- <h4>汪程程</h4> -->
          <!-- <aside>白班医生</aside> -->
        </li>
        <li>
          <img src="../img/night.png" alt="">
          <!-- <h4>陆婉儿</h4> -->
          <!-- <aside>夜班医生</aside> -->
        </li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="s-item active" flex="cross:center">
      <i class="icon-chuangwei iconfont"></i>
      <span>总床位（{{data.bedTotal}}）</span>
    </div>
    <div class="s-item" flex="cross:center">
      <i class="icon-chuangwei iconfont"></i>
      <span>病人总数（{{data.patTotal}}）</span>
    </div>
    <div class="s-item" flex="cross:center">
      <i class="icon-chuangwei iconfont"></i>
      <span>空床（{{data.bedEmpty}}）</span>
    </div>
    <div class="s-item allow-select" flex="cross:center" @click="toWait">
      <i class="icon-chuangwei iconfont"></i>
      <span>等床（{{data.patientWait}}）</span>
    </div>
    <div class="line"></div>
    <div class="nurse-item" flex="cross:center" v-for="item in list" :key="item.name">
      <aside :class="item.type"></aside>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.search-con
  padding 16px 20px
  .search-top
    margin-top 10px
    h4
      font-size 16px
      color #333333
    aside
      margin 5px 0 20px
      font-size 13px
      color #6F6F6F
    .search-img li
      display inline-block
      vertical-align top
      h4 
        font-size 13px
        padding 3px 0;
      aside
        margin 2px 0 10px;
      &:first-child 
        margin-right 47px
  .s-item,.nurse-item
    height 34px
    padding-left 17px
    font-size 13px
    color #687179
    span
      margin-left 10px
  .s-item
    &:hover
      background #F7F7FA
      border-radius 3px
      cursor not-allowed
    &.active
      border-radius 3px
      font-weight bold
      color #333333
    &.allow-select:hover
      cursor pointer!important
    i
      color #687179
      font-size 12px
      line-height 14px
  .nurse-item aside
    display inline-block
    border-radius 2px
    width 11px
    height 11px
    &.type-1 
      background #FD815A
    &.type-2
      background #5EC199
    &.type-3
      background #A9BCB4
    &.type-4
      background #DB83D7
  .line 
    background #ECEEEF
    height 1px
    margin 10px 0
</style>
<script>
import moment from 'moment'
export default {
  props: {
    data: Object,
    allData: Object,
  },
  computed: {
    time() {
      let date = moment().format('YYYY年MM月DD')
      let week = moment().format('dddd') 
      return date + ' ' + week
    },
    list() {
      return [
        { name: "特级护理", type: "type-4" },
        { name: "一级护理", type: "type-1" },
        { name: "二级护理", type: "type-2" },
        { name: "三级护理", type: "type-3" }
      ];
    }
  },
  methods: {
    toWait() {
      this.$router.push('/wait-bed')
    }
  }
};
</script>
