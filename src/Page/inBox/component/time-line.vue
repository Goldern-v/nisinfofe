<template lang="pug">
.time-con(flex="cross:center")
  .span {{date}}
  .aside （{{num}}封）
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.time-con
  height 38px
  background #fff
  border-bottom: 1px solid #EAEEF1;
  padding-left 16px
  .span
    font-size: 16px;
    color: #166046;
  .aside
    font-size: 13px;
    color: #166046;
    letter-spacing: 0;
    line-height: 22px;
</style>

<script>
  export default {
    props:['date', 'num'],
    data() {
      return {
        checked: "hello vue"
      };
    },
    components: {}
  };
</script>
