<template>
  <transition name="el-zoom-in-left">
    <div class="side-panel" v-show="visible">
      <div class="header">
        <slot name="title"></slot>
        <div class="close-btn">
          <i class="el-icon-close" @click="close"></i>
        </div>
      </div>
      <div class="container">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data: () => ({
      visible: false
    }),
    methods: {
      open () {
        this.visible = true
      },
      close () {
        this.visible = false
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .side-panel
    position fixed
    top 0
    right 0
    z-index 10002
    display flex
    flex-direction column
    height 100%
    width 360px
    background white
    box-shadow 0 0 20px rgba(0,0,0,.4)

    .header
      position relative
      padding 0 20px
      height 46px
      line-height 46px
      background #f7fafa
      border-bottom 1px solid #eaeef1

      .close-btn
        position absolute
        top 0
        right 20px
        font-size 12px
        cursor pointer

    .container
      flex 1
      min-height 0
</style>
