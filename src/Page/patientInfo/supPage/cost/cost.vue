<template>
  <div class="content">
    <div class="char-part left">
      <chart1></chart1>
    </div>
    <div class="char-part right">
      <chart2></chart2>
    </div>
    <div class="char-part left">
      <chart3></chart3>
    </div>
    <div class="char-part right">
      <chart4></chart4>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content
  margin 20px 20px 0
  .left
    float left
  .right
    float right   
  .char-part
    width 49%
    background #fff
    height 320px
    margin-bottom 20px  
    border: 1px solid #CBD5DD;
    border-radius: 2px;
</style>

<script>
  import chart1 from './compontent/char1.vue'
  import chart2 from './compontent/char2.vue'
  import chart3 from './compontent/char3.vue'
  import chart4 from './compontent/char4.vue'
  export default {
    data() {
      return {}
    },
    created() {},
    components: {
      chart1, chart2, chart3, chart4
    }
  }
</script>

