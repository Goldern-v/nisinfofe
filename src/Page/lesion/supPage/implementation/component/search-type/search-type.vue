<template>
  <div class="select-box" flex="cross:stretch">
    <div class="select-item" flex="cross:center main:center" flex-box="1">
      <el-radio class="radio" v-model="type" label="输液" size="small">输液</el-radio>
    </div>
    <div class="select-item" flex="cross:center main:center" flex-box="1" style="border-left:1px solid #C2CBD2;border-right:1px solid #C2CBD2">
      <el-radio class="radio" v-model="type" label="口服" size="small">口服</el-radio>
    </div>
    <div class="select-item" flex="cross:center main:center" flex-box="1">
      <el-radio class="radio" v-model="type" label="肌注" size="small">肌注</el-radio>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.select-box
  width 210px
  height 28px
  background: #FFFFFF; 
  border: 1px solid #C2CBD2;
  border-radius: 2px;
  margin-right 15px  
.select-item
  width 0  
  >>>.el-radio__label
    font-size: 12px;
    color: #687179;
  >>>.el-radio__inner  
    width 14px
    height 14px
</style>

<script>
  export default {
    data() {
      return {
        type: '输液'
      }
    },
    watch:{
      type() {
        this.$emit('changeType')
      }
    },
    components: {}
  }
</script>
