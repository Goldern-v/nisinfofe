<template>
  <div>
    <div :class="'contant'" ref="iframeLoading">
      <iframe
        :style="{height: iframeHeight + 'px'}"
        frameborder="0"
        class="assessment-iframe"
        ref="iframe"
      ></iframe>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contant
  border-radius: 2px;
  position relative
  background: #FFFFFF;
  box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.50);
  padding 20px 0px
  box-sizing border-box
  width 760px
  margin 0 auto
  .assessment-iframe
    width 100%
    min-height 600px
    overflow hidden

.contant-landscape
  border-radius: 2px;
  position relative
  background: #FFFFFF;
  box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.50);
  padding 20px 20px
  box-sizing border-box
  width 1110px
  // min-width 1110px
  margin 0 auto
  .assessment-iframe
    width 100%
    overflow hidden
    min-height 600px

</style>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      iframeHeight: 0
    };
  },
  created() {},

  watch: {},
  components: {}
};
</script>
