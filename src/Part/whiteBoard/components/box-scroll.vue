<template>
  <div class="box">
    <div class="head-con" flex="cross:center">
      <span class="icon">{{icon}}</span>
      <span class="title">{{title}}</span>
    </div>
    <div class="box-body">
        <slot></slot>
      </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl'
.box
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  height 100%
  padding-top tovw(37)
  box-sizing border-box
  position relative
  z-index 2
  .head-con
    height tovw(37)
    line-height tovw(37)
    background-image: linear-gradient(-180deg, #F4F4F4 0%, #DCDCDC 100%);
    padding-left tovw(17)
    position absolute
    top 0
    left 0;
    right 0
  .title
    font-size: tovw(18);
    color: #333333;  
    font-weight bold
    margin-left tovw(5)
    line-height tovw(22)
.box-body
  background #fff  
  height 100%
  padding tovw(10) 0
  box-sizing border-box
  // overflow auto
</style>
<script>
  export default {
    props: {
      icon: String,
      title: String
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
