<template>
  <div class="num-contain" flex="main:center cross:center">
    {{num}}
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../style/wb.styl'
.num-contain
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  float left
  font-size: tovw(13);
  color: #333333;
  width tovw(50)
  height tovw(35)
  margin 0 tovw(8) tovw(9) 0
</style>
<script>
  export default {
    props: {
      num: String
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
