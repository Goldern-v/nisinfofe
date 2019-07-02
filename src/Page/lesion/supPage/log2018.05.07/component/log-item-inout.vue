<template>
  <div class="contain" flex="cross:center main:center">
    {{data.bedLabelOld}}床-{{data.name}}
    <img src="../img/交换.png" alt="">
    {{data.bedLabelNew}}床
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  width 175px;
  height 30px;
  font-size: 13px;
  color: #333333;
  float left
  margin-bottom 10px
  margin-right 10px
  img
    width 16px
    margin 0 6px
</style>
<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
