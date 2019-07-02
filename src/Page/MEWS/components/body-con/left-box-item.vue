<template>
<div> 
  <div class="box" v-for="(item, index) in list" :key="index">
    <div class="title" flex="cross:center">
      <span class="key">{{item.title}}：</span>
      <span class="value">（{{item.reason}}）</span>
    </div>
    <div class="list-item" v-html="item.wardShipPlan"></div>
  </div>
  <div v-if="(list || []).length === 0" class="null-text">
    暂无监护方案
  </div>
</div>  
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box
  padding 15px 0 20px
  border-bottom 1px dashed rgba(204, 204, 204, 1)
.title
  margin-bottom 10px
  .key
    font-size 14px
    color #000
  .value
    font-size 13px
    color #687179
.list-item
  font-size 13px
  color #000
  line-height 18px
.null-text
  position absolute
  top 0
  right 0
  left 0
  bottom 0
  margin auto
  width 100px
  height 20px
  line-height 20px
</style>
<script>
import currDataObj from "../store/index";
export default {
  data() {
    return {
      currDataObj
    };
  },
  computed: {
    list() {
      return this.currDataObj.mewsInstancePlanDto;
    }
  },
  components: {}
};
</script>
