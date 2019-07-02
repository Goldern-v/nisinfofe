<template>
  <div class="null-bg">
    <div style="height: 10px;"></div>
    <img src="./images/null.png" alt>
    <p>
      <slot></slot>
    </p>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
 .null-bg
    img
      display block
      width 140px
      height 140px
      margin 110px auto 0
    p
      font-size: 14px;
      color: #687179;
      text-align center
      margin-top 22px
</style>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "数据为空"
    }
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  components: {}
};
</script>
