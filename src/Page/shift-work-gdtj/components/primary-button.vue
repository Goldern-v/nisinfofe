<template>
  <div
    class="primary-button"
    v-touch-ripple
    @click="this.onClick"
  >
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data: () => ({}),
    methods: {
      onClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .primary-button
    display block
    width 100%
    height 40px
    line-height 40px
    text-align center
    font-size 13px
    color white
    background #4BB08D
    cursor pointer
    user-select none
    &:hover
      background #5CC6A1
</style>
