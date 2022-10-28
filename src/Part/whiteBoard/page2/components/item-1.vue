<template>
  <div class="item">
    <div class="text">{{time}} {{data.title}}（{{doneCount}}/{{totalCount}}）</div>
    <div>
      <numItem :num="item.bedLabel" v-for="item in (data.list || [])" :key="item.bedLabel" style="background:#fff"></numItem>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../style/wb.styl'
.item
  background: #F2F2F2;
  border: 1px solid #E3E7EA;
  border-radius: 2px;
  padding tovw(11) tovw(13) tovw(5)
  margin-bottom tovw(20)
  overflow hidden
  .text
    font-size: tovw(13);
    color: #333333
    margin-bottom tovw(13)
</style>
<script>
import numItem from '../../components/num-item'
  export default {
    props: {
      data: Object,
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    computed: {
      time() {
        return new Date(this.data.time).Format('hh:mm') 
      },
      doneCount() {
        return this.data.list.filter(item => item.status == 1).length
      },
      totalCount() {
        return this.data.list.length
      }
    },
    components: {
      numItem
    }
  }
</script>
