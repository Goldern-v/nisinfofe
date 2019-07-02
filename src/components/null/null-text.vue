<template>
  <div class="null-bg" flex="cross:center main:center">
    <span>{{text}}</span>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
 .null-bg
   height 100%
   width 100%
   color: #5e7382;
   font-size 14px
</style>
<script>
  export default {
    props:{
      text: {
        type: String,
        default: '暂无数据'
      }
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
