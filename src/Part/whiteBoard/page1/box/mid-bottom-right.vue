<template>
  <div class="contain">
    <BoxScroll icon="📝" title="留言板">
      <vue-seamless-scroll class="scroll-con" :data="data || []">
      <div class="ly-con">
        {{data && data.msg}}
      </div>
      </vue-seamless-scroll>
    </BoxScroll>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl'
.ly-con
  padding tovw(11) tovw(18)
  font-size: tovw(15);
  color: #333333;
  letter-spacing: 0;
  line-height: tovw(29)
.scroll-con
  overflow hidden
  height 100%  
</style>

<script>
import BoxScroll from "../../components/box-scroll.vue";
export default {
  props: {
    data: Object
  },
  data() {
    return {
      msg: "hello vue"
    };
  },
  components: {
    BoxScroll,
  }
};
</script>
