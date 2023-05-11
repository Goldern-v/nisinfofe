<template>
  <div class="right-mouse-modal" v-if="HOSPITAL_ID=='huadu'">
    <div class="item" @click="toPrint('wrist')">批量打印腕带</div>
    <div class="item" @click="toPrint('v')">批量打印床头卡1</div>
    <div class="item" @click="toPrint('h')">批量打印床头卡2</div>
    <div class="item" @click="cancelPrints">取消</div>
  </div>
<!--  寮步 -->
  <div class="right-mouse-modal" v-else-if="HOSPITAL_ID=='dglb'">
    <div class="item" @click="toPrint('aldult')">批量打印床头卡</div>
    <div class="item" @click="toPrint('bady')">批量打印新生儿床头卡</div>
    <div class="item" @click="toPrint('wrist')">批量打印腕带</div>
    <div class="item" @click="toPrint('wrist-children')">批量打印儿童腕带</div>
    <div class="item" @click="cancelPrints">取消</div>
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
      width: 140px;
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
    },

    cancelPrints(){
      this.$emit("cancelPrints")
    }
},
components: {}
};
</script>
