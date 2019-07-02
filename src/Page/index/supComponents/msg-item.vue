<template>
  <div class="message-box" @click="$router.push(`/mailDetails/${data.id}`)">
    <div class="title">
      {{data.title}}
    </div>
    <div class="info" flex="main:justify">
      <span class="name">{{data.senderName}}</span>
      <span class="time">
        <i class="el-icon-time"></i>
          {{data.sendTime}}
      </span>
    </div>
    <img class="no-read-icon" src="./images/未读消息状态.png" v-show="data.readState == 0"/>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.message-box
    border-radius: 2px;
    margin-bottom 20px;
    padding-bottom 10px
    border-bottom: 1px solid #EAEAEA;
    position relative
    cursor pointer
    &:hover
     .title
       color #333
    .title
      font-size: 14px;
      color: #666;
      margin-bottom 10px;
      margin-right 30px
      font-weight bold
      line-height 20px
    .info
      margin 24px 0 11px;
      .name
        font-size: 13px;
        color: #4BB08D;
        margin-right 16px
      .time
        font-size: 13px;
        color: #CBD5DD;
    .article
      font-size: 13px;
      color: #687179;
      letter-spacing: 0;
      line-height: 20px;
    .no-read-icon
      position absolute 
      right 0
      top -6px  
</style>

<script>
  export default {
    props: {
      data: Object,
      user: Object,
    },
    data() {
      return {
        msg: 'hello vue'
      }
    },
    components: {}
  }
</script>
