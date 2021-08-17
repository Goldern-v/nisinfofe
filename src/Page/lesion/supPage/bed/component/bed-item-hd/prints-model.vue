<template>
  <div class="right-mouse-modal">
    <div class="item" @click="toPrint('wrist')">腕带批量打印</div>
    <div class="item" @click="toPrint('h')">床头卡批量打印</div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-mouse-modal{
    cursor pointer;
    background-color #fdfdfd
    position: absolute;
    height 150px
    line-height: 30px;
    text-align center;
    z-index:999;
    border:1px solid #ccc;
    .item{
      width: 130px;
      height: 30px;
      border-bottom 1px solid #ccc
      font-size 14px
      font-family serif
      &:hover{
        background #0dbc79
        color white
      }
    }
}
</style>
<script>
export default {
props: {},
data() {
return {};
},
methods: {
    toPrint(printMode){
        this.$emit('toPrints',printMode)
    }
},
components: {}
};
</script>
