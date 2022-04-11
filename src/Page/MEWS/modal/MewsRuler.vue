<template>
  <sweet-modal ref="mewsRuler" :modalWidth="1160" title="MEWS评分规则" class="tets">
    <div class="img-context">
      <img :src="imgUrl" class="mewsImg" />
    </div>
  </sweet-modal>
</template>
<style lang="scss" scoped>
.img-context {
  overflow: hidden;
  margin: -90px 0px 0px -80px;
  height: 590px;
}
</style>
<script>
export default {
  data() {
    return {
      imgUrl: require("../images/早期预警MEWS评分表（已优化）.png"),
    };
  },
  methods: {
    open() {
      this.$refs.mewsRuler.open();
    },
  },
};
</script>

