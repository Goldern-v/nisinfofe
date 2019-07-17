<template>
  <div flex class="box-con">
    <div class="key-con" :style="keyStyle">
      <span v-html="redtext(dataKey)"></span>
    </div>
    <div class="value-con" flex-box="1">
      <slot name="value-con"></slot>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box-con
  border-bottom: 1px solid #EAEEF1
  min-height 37px
.key-con
  border-right 1px solid #EAEEF1
  font-size: 13px;
  line-height 21px
  color: #333333;
  font-weight bold
  padding 8px 5px
  width 0
.value-con
  font-size: 13px;
  color: #333333
  line-height 22px
  padding 8px
  width 0
</style>
<script>
export default {
  props: {
    keyStyle: Object,
    dataKey: String
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  methods: {
    redtext(val) {
      return (
        val &&
        val
          .replace("Mews预警", '<span style="color: red">Mews预警</span>')
          .replace("病重病危", '<span style="color: red">病重病危</span>')
          .replace("记24小时", '<span style="color: red">记24小时</span>')
      );
    }
  },
  components: {}
};
</script>
