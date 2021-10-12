<template>
  <div>
    <div class="content">
      <div class="left-part">
        <tree ref="tree" :filterObj="filterObj"></tree>
      </div>
      <div class="right-part">
        <rightPart :filterObj="filterObj"></rightPart>
      </div>
    </div>
  </div>
</template>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content
  margin 10px 15px 0
  margin-bottom 0
  .left-part
    float left
    width 260px
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 2px;
  .right-part
    margin-left 260px
</style>

<script>
import tree from "./component/tree";
import rightPart from "./component/right-part/right-part.vue";
export default {
  props: {
    filterObj: Object
  },
  data() {
    return {};
  },
  created() {
    console.log(this.filterObj);
    this.$store.commit("closeFullPageRecord");
  },
  components: {
    tree,
    rightPart
  },
  methods:{
    init(){},
  }
};
</script>
