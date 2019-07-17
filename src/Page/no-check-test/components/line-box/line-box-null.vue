<template>
<div>
  <div flex="" class="box-con" v-for="(item, index) in num" :key="index">
    <div class="key-con" :style="keyStyle">
      <span></span>
    </div>
    <div class="value-con" flex-box="1">
    </div>
  </div>
 </div> 
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box-con
  border-bottom: 1px solid #EAEEF1
  min-height 37px
.key-con
  border-right 1px solid #EAEEF1
  font-size: 13px;
  color: #333333;
  font-weight bold
  padding 12px 5px
.value-con
  font-size: 13px;
  color: #333333
  padding 12px 15px
</style>
<script>
  export default {
    props: {
      keyStyle: Object,
      num: Number
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
