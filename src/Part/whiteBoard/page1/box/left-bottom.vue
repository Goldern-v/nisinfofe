<template>
  <div class="contain">
    <BoxScroll icon="❤️" title="责任护士" ref="bodyCon">
      <vue-seamless-scroll class="list-contain" :data="[1,2]">
        <div flex="" class="item" v-for="(item, key) in data" :key="key">
          <div class="name">{{key}}</div>
          <div style="width: 0" flex-box="1">
            <numItem :num="option.bedLabel" v-for="option in item" :key="option.bedLabel"></numItem>
          </div>
        </div>
      </vue-seamless-scroll>
    </BoxScroll>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl'
.name
  font-size: tovw(15)
  margin-right tovw(15)
  width tovw(60)
  color: #333333;
  margin-top tovw(10)
.item
  border-bottom: 1px solid #EAEEF1;
  padding tovw(15) tovw(22) tovw(6)
  overflow hidden
  min-height tovw(40)
.list-contain
   overflow hidden
   height: 100%;
.list-contain .item:last-child
  border 0
</style>

<script>
  import BoxScroll from "../../components/box-scroll.vue";
  import numItem from '../../components/num-item'
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        classOption: {
 
        }
      }
    },
    methods: {
    },
    watch: {

    },
    components: {
      BoxScroll,
      numItem
    }
  };
</script>
