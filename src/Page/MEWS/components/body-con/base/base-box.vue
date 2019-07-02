<template>
  <div class="base-box" flex="dir:top">
    <div class="head-con">{{title}}</div>
    <div class="body-con" flex-box="1">
      <slot></slot>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.base-box
  border-radius 0px 0px 2px 0px
  border 1px solid #cbd5dd;
  width 0
.head-con
  height 34px
  line-height 34px
  background rgba(244, 242, 245, 1)
  font-size 13px
  color #333
  padding-left 13px
  border-bottom 1px solid #cbd5dd;
  font-weight bold
.body-con
  padding 3px 13px 3px
  overflow auto
  position relative
</style>
<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  components: {}
};
</script>
