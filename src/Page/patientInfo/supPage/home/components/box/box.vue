<template>
  <div class="box">
    <div class="head-con" flex="cross:center">
      <span v-if="title">{{title}}</span>
      <span flex-box="1"></span>
      <span v-if="aside" class="aside">{{aside}}</span>
    </div>
    <slot name="body"></slot>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box {
  border-top: 4px solid #E7EAEC;
  background: #fff;

  .head-con {
    height: 46px;
    border-bottom: 1px solid #E7EAEC;
    font-size: 14px;
    color: #687179;
    padding: 0 15px;
    font-weight: bold;

    .aside {
      font-size: 12px;
    }
  }
}
</style>
<script>
export default {
  props: ["title", "aside"],
  data() {
    return {
      msg: "hello vue"
    };
  },
  created() {},
  components: {}
};
</script>
