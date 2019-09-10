<template>
  <div class="box-contain">
    <div class="head-con" flex="cross:center main:justify">
      <span class="title" flex="cross:center">
        <img :src="icon" alt class="icon">
        <span v-html="title"></span>
      </span>
      <span class="head-tool" flex="cross:center">
        <label v-if="optionTitle">{{optionTitle}}:</label>
        <slot name="head-tool"></slot>
        <slot name="head-con"></slot>
      </span>
    </div>
    <div class="body-con">
      <slot name="body-con"></slot>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box-contain
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 4px;
  .head-con
    height 40px
    background: #F7FAFA
    padding 0 14px 0 20px
    border-bottom: 1px solid #EAEEF1;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .title
      font-size: 13px;
      color: #333333;
      line-height 16px
      font-weight bold
.head-tool
  >>>span
    height 21px
    line-height 22px
    font-size: 12px;
    color: #333333;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px;
    padding 0 8px
    display block
    cursor pointer
    &:hover
      background #fafafa
  label
    font-size 13px
    margin-right 10px
    font-weight bold
.icon
  height 21px
  margin-right 2px
</style>
<script>
export default {
  props: {
    title: String,
    icon: String,
    optionTitle: String
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  components: {}
};
</script>
