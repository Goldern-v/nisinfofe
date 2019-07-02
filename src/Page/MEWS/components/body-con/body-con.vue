<template>
  <div v-loading="isLoading">
    <span v-if="currDataObj.iconTextRgb">
      <div class="head-con" flex="cross:center">
        <span>当前评分：</span>
        <div class="status-btn" :style="{background: currDataObj.iconTextRgb}">{{currDataObj.score}}分-{{currDataObj.iconText}}</div>
        <span style="margin-left: 10px" v-if="scoreList">( {{scoreList}} )</span>
      </div>
      <div class="body-con" flex="main:justify cross:stretch">
        <baseBox flex-box="3" title="程序化监护方案">
          <leftBoxItem></leftBoxItem>
        </baseBox>
        <div style="width: 10px"></div>
        <baseBox flex-box="2" title="MEWS 相关参数">
          <rightBoxItem></rightBoxItem>
        </baseBox>
      </div>
    </span>
    <span v-else>
      <div class="null-img">
        <img src="../../images/分组.png" alt="">
        <aside>请选择左侧预警患者~</aside>
      </div>
    </span>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
*
  font-size 14px
  color #333
.status-btn
  width 109px
  height 37px
  background rgba(230, 44, 44, 1)
  display flex
  align-items center
  justify-content center
  font-size 16px
  color #fff
.head-con
  margin-bottom 15px
.body-con
  height calc(100vh - 192px)
  position relative
.null-img
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  margin auto
  width 200px;
  height 240px;
  aside
    color: #ccc; 
    font-size 16px
    margin-top 10px
    text-align center
    // font-weight bold
</style>
<script>
import baseBox from "./base/base-box.vue";
import leftBoxItem from "./left-box-item.vue";
import rightBoxItem from "./right-box-item.vue";
import currDataObj from "../store/index";
export default {
  data() {
    return {
      currDataObj
    };
  },
  computed: {
    scoreList() {
      return (this.currDataObj.instanceVitalDtos || [])
        .map(item => `${item.signName}${item.signScore}分`)
        .join("，");
    },
    isLoading() {
      // return !this.currDataObj.patientId;
      return false;
    }
  },
  components: {
    baseBox,
    leftBoxItem,
    rightBoxItem
  }
};
</script>
