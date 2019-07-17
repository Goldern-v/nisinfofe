<template>
  <div class="noCheckTest">
    <div class="left">
      <left></left>
    </div>
    <div class="right">
      <right></right>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.noCheckTest {
  display: flex;
  padding: 20px;

  .left, .right {
    flex: 1;
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
    return {};
  },
  mounted() {},
  created() {},
  methods: {},
  components: {
    left,
    right
  }
};
</script>
