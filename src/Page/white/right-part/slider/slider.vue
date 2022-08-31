<template>
  <div class="slide-con">
    <div class="title">{{data.name}}（{{data.num}}）</div>
    <div class="slider-con" flex="cross:center">
      <div class="line-con" flex-box="1">
        <div class="color-line" :style="{width: data.percentage, background: color}"></div>
      </div>
      <div class="num">{{data.percentage}}</div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.slide-con
  margin-bottom 15px
.title
  font-size: 13px;
  color: #687179;
  margin-bottom 6px
.num
  font-size: 13px;
  color: #333333;
  text-align right
  width 50px
.line-con
  width 259px
  height 10px
  background: #EBEEF5;
  border-radius: 11px;
  position relative
.color-line
  position absolute
  background: #23B7E5;
  border-radius: 10px 0 0 10px;
  width 20%
  top 0
  left 0
  bottom 0
</style>
<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    computed: {
      color() {
        switch(this.data.name) {
          case '病人总数' : return '#23B7E5'
          case '特级护理' : return '#FF0000'
          case '一级护理' : return '#FFC0CB'
          case '二级护理' : return '#0000FF'
          case '三级护理' : return ' #008000'
        }
      }
    },
    components: {}
  }
</script>

