<template>
  <button class="button" :disabled="disabled" @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      disabled: Boolean
    },
    data: () => ({}),
    methods: {
      onClick (e) {
        try {
          // console.log(e,this.$emit);
          this.$emit('click', e)
        } catch (error) {
          console.log('button:error',error)
        }
      }
    }
  }
</script>

<style lang="stylus"  rel="stylesheet/stylus" type="text/stylus" scoped>
  .button
    display inline-block
    align-items center
    justify-content center
    width 100px
    height 30px
    font-size 12px
    color #333
    background #fff
    border 1px solid #cbd5dd
    border-radius 2px
    box-sizing border-box
    outline none
    cursor pointer

    &:hover
      font-weight bold

    & + &
      margin-left 10px

    &[disabled]
      cursor default
      opacity 0.5
      &:hover
        font-weight normal
</style>
