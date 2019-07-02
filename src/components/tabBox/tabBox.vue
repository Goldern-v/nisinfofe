<template>
  <div class="select-box"
       flex="cross:stretch">
    <div class="select-item"
         v-for="item in list"
         :key="item.key"
         flex="cross:center main:center"
         flex-box="1">
      <el-radio class="radio"
                v-model="radio"
                :label="item.value"
                size="small">{{item.key}}</el-radio>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.select-box
  height 30px
  background #FFFFFF
  border 1px solid #C2CBD2
  border-radius 2px
  .select-item
    width 0
    color #333333
    width 74px
    border-right 1px solid #C2CBD2
    &:last-child
      border 0
    >>>.el-radio__inner
      width 14px
      height 14px  
    >>>.el-radio__label
      font-size 13px  
</style>
<script>
export default {
  props: {
    list: Array,
    selectedTab: String
  },
  data() {
    return {
      radio: ''
    }
  },
  created() {
    this.radio = this.selectedTab
  },
  watch: {
    radio() {
      this.$emit('changeTab', this.radio)
    }
  },
  components: {}
}
</script>
