<template>
  <div class="mid-top-contain">
    <Box icon="🛏️" title="病区动态">
      <div flex="cross:stretch" class="item-con" v-for="(item,key) in data" :key="key">
        <div class="key-con" flex="main:center cross:center">{{key}}（{{item.length}}）</div>
        <div class="value-con" flex-box="1">
          <numItem :num="option.bedLabel" v-for="option in item" :key="option.bedLabel"></numItem>
        </div>
      </div>
    </Box>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl'
.item-con
  border-bottom 1px solid #EAEEF1;
  min-height tovw(58)
.key-con
  border-right 1px solid #EAEEF1; 
  font-size: tovw(15);
  width tovw(158)
  color: #333333
.value-con
  width 0
  padding tovw(15) tovw(20) tovw(6)
  overflow hidden
.mid-top-contain .item-con:last-child
  border 0
</style>

<script>
import Box from "../../components/box.vue";
import showList from '../components/showList'
import numItem from '../../components/num-item'
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
    Box, showList, numItem
  }
};
</script>
