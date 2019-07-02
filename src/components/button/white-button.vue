<template lang="pug">
span.btn-con(:class="{disabled: disabled}")
  .white-btn(@click="click" flex="cross:center" v-touch-ripple="" :style="icon && {padding: '0 14px'}")
    span
      i.iconfont(:class="icon" v-if="icon" :style="iconSize && {fontSize: iconSize + 'px'}")
    span {{text}}
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.btn-con
  &.disabled
    cursor default
    opacity 0.5
.white-btn
      height 30px
      background: #FFFFFF;
      border: 1px solid #CBD5DD;
      box-shadow: 0 1px 2px 0 rgba(200,200,200,0.50);
      border-radius: 2px;
      text-align center
      font-size: 12px;
      color: #687179;
      padding 0 18px
      margin-right 8px
      cursor pointer
      user-select: none
      i
        color: #687179;
        margin-right 4px
        font-size 14px
      &:hover
        background #f8f8f8
.btn-con
  display inline-block
</style>
<script>
  export default {
    props: ['text','icon', 'iconSize', 'disabled'],
    data() {
      return {
        msg: 'hello vue'
      }
    },
    methods: {
      click() {
        if (this.disabled) return
        this.$emit('click')
      }
    },
    components: {}
  }
</script>
