<template>
  <div class="contain">
    <div class="left-part" :style="{left: openLeft?'0':'-201px'}">
      <patientList></patientList>
    </div>
    <div class="right-part" :style="{marginLeft: openLeft?'200px':'0'}">
      <div class="body-con">
        <bodyCon></bodyCon>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  position absolute
  top 60px
  left 0
  right 0
  bottom 0
  .left-part
    width 199px
    position absolute
    left 0
    top 0
    bottom 0
    background #fff
    transition all 0.4s cubic-bezier(0.55, 0, 0.1, 1)
  .right-part
    margin-left 199px
    height 100%
    overflow hidden
    transition all 0.4s cubic-bezier(0.55, 0, 0.1, 1)
    height 100%
    padding 15px
    box-sizing border-box
.body-con
  height 100%
  width 100%
  background #fff;   
  box-shadow: 0px 5px 10px 0 rgba(0,0,0,0.5)
  padding 25px
  box-sizing border-box
  position relative
</style>
<script>
import patientList from "./components/patient-list/patient-list.vue";
import bodyCon from "./components/body-con/body-con.vue";
import { initCurrDataObj } from "./components/store/index";
export default {
  data() {
    return {
      msg: "hello vue"
    };
  },
  computed: {
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    }
  },
  created() {
    initCurrDataObj();
  },
  components: {
    patientList,
    bodyCon
  }
};
</script>
