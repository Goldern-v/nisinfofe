<template>
  <div class="contain" flex="cross:center main:center">
    {{data.bedLabel}}床-{{data.name}}
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  background: #F7FAFA;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  width 114px;
  height 30px;
  font-size: 13px;
  color: #333333;
  float left
  margin-bottom 10px
  margin-right 10px
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