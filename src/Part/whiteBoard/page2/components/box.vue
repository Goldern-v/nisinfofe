<template>
  <div class="box-contain"> 
    <div class="head-con">
      <div class="title">
        {{title}}
      </div>
      <div class="chart-con" flex="cross:center">
        <div class="chart" flex-box="1">
          <div class="num" :style="{width: `${percent}%`, background: bgColor}"></div>
        </div>
        <div class="text">
          {{doneCount || 0}}/{{totalCount || 0}}
        </div>
      </div>
    </div>
    <div class="box-body">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl'
.box-contain
  background: #FFFFFF;
  border-left: 1px solid #CBD5DD;
  border-bottom: 1px solid #CBD5DD;
  border-radius: 0 0 2px 2px;
  padding-top tovw(65)
  box-sizing border-box
  position relative
  z-index 2
  .head-con
    height tovw(65)
    background: #F7FAFA;
    border-bottom 1px solid #EAEEF1;
    padding tovw(15) tovw(27) 0 tovw(18)
    box-sizing border-box
    position absolute
    top 0
    width 100%
    .title
      font-size: tovw(14);
      font-weight bold
      color: #333333;
      margin-bottom tovw(8)
    .chart
      background: #E1E5E9;
      box-shadow: inset 0 1px 1px 0 rgba(163,163,163,0.50);
      border-radius: tovw(11)  
      height tovw(13)
      width 0
      position relative
      .num
        // background: #14C4A5;
        border-radius: 31px;
        position absolute
        left 0
        top 0
        bottom 0
    .text
      width tovw(60)
      margin-left tovw(24)  
      font-size: tovw(15);
      color: #333333
      text-align right 
  .box-body
    box-sizing border-box
    padding tovw(20) tovw(20) 0
    height 100%
    overflow auto
</style>
<script>
  export default {
    props: ["title","doneCount","totalCount","bgColor"],
    data() {
      return {
      }
    },
    computed: {
      percent() {
        return  (this.doneCount || 0) / (this.totalCount || 1) * 100
      }
    },
    components: {}
  }
</script>
