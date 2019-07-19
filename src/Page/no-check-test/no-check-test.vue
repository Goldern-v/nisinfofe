<template>
  <div class="noCheckTest" ref="noCheckTest">
    <div class="left">
      <left :listContentH="listContentH"></left>
    </div>
    <div class="right">
      <right :listContentH="listContentH"></right>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.noCheckTest {
  display: flex;
  padding: 20px 20px 10px;

  .left, .right {
    flex: 1;
    overflow: auto;
  }

  .left {
    margin-right: 10px;
  }

  .right {
    margin-left: 10px;
  }
}
</style>
<script>
import left from "./components/left";
import right from "./components/right";
export default {
  data() {
    return {
      listContentH: 0 //列表内容高度
    };
  },
  mounted() {},
  created() {},
  mounted() {
    let self = this;
    self.$nextTick(function() {
      let pageH =
        document.documentElement.clientHeight == 0
          ? document.body.clientHeight
          : document.documentElement.clientHeight;
      self.listContentH =
        pageH - self.$refs["noCheckTest"].offsetTop - 77 - 30 || 0;
    });

    window.onresize = function() {
      self.$nextTick(function() {
        let pageH =
          document.documentElement.clientHeight == 0
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
        self.listContentH =
          pageH - self.$refs["noCheckTest"].offsetTop - 77 - 30 || 0;
      });
    };
  },
  methods: {},
  components: {
    left,
    right
  }
};
</script>
