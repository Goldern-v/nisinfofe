<template>
  <div class="item">
    【{{data.bedLabel}}床】{{data.title}}  {{time}}
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl'
.item
  border: 1px solid #E3E7EA;
  border-radius: 2px;
  font-size: tovw(15)
  color: #333333;
  padding tovw(8)
  margin-bottom tovw(10)
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
      time() { 
        let t = Math.round((new Date(this.data.beginTime) - new Date())/1000/60/60)
        if( t < 0) {
          return '已超时'
        }
        else if( 0 < t < 1) {
          return '剩余小于一小时'
        } else {
          return new Date(this.data.beginTime).Format('hh:mm') + '开始'
        }
      }
    },
    components: {}
  }
</script>
