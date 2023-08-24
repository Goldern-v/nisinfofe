<template>
  <div class="item-box" flex="cross:center" :class="{disabled: disable}" v-touch-ripple @click="toDetails">
    <img src="../../../../../common/images/record/诊断单.png" alt="" class="item-icon" v-if="!disable">
    <img src="../../../../../common/images/record/已停止诊断.png" alt="" class="item-icon" v-else>
    <div class="text-con">
      <div class="title">{{title}}
      </div>
      <div class="aside">{{data.beginTime}}&nbsp;&nbsp;{{data.creatorName}}</div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.item-box
  height 90px
  border-bottom 1px solid #EAEEF1
  padding 0 20px
  &:hover
    background: #FAFAFA;
    cursor pointer
  .item-icon
    width 56px
  .text-con
    margin 0 15px
    .title
      font-size: 18px;
      color: #333333;
      margin-bottom 8px
    .aside
      font-size: 13px;
      color: #687179;
      letter-spacing: 0.26px;
.disabled .title
  color: #687179 !important
</style>
<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
      }
    },
    computed: {
      disable() {
        return this.data.status == 2
      },
      title() {
        let label = this.disable? 'O' : 'P'
        return `${label}${this.data.seqNo}:${this.data.diagName}` + (this.disable?'(已停止)': '')
      }
    },
    methods: {
      toDetails() {
        this.$router.push({path: `/diganosisDetails/${this.data.id}`, query: this.$route.query})
      }
    },
    components: {}
  }
</script>
