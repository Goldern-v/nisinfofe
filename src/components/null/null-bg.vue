<template>
  <div class="null-bg">
    <div style="height: 10px;"></div>
    <img src="../../common/images/card/默认图.png" alt="">
    <p>{{text}}</p>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
 .null-bg
    img
      display block
      width 217px
      height 217px
      margin 110px auto 0
    p
      font-size: 18px;
      color: #B3BEC6;
      text-align center
      margin-top 32px
</style>
<script>
  export default {
    props:{
      text: {
        type: String,
        default: '数据为空'
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
