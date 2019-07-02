<template lang="pug">
  .contain 
    .head-con
      span.title 收件箱
      span.aside （共{{total}}条，其中未读{{Unread}}条）|
      el-button(type='text' style="padding: 5px 10px" @click="$router.back()") 返回
    inBoxCon(ref="inBoxCon" @allTotal="allTotal")  
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain 
  margin 20px 20px 0
  .head-con
    margin-bottom 17px
    .title
      font-size: 16px;
      color: #687179;
    .aside 
      font-size: 13px;
      color: #2C2F00;  
      line-height 22px
</style>
<script>
import inBoxCon from './component/innerBox-con'
  export default {
    data() {
      return {
        total: 0
      }
    },
    computed: {
      Unread() {
        return this.$store.state.common.mailUnread
      }
    },
    methods: {
      allTotal(num) {
        this.total = num
      }
    },
    components: {
      inBoxCon
    }
  }
</script>
