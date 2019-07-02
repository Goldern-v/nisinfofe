<template lang="pug">
  .contain
    .head-con(flex="cross:center")
      span(@click="$router.back()")
        whiteButton(text="返回")
      span(@click="del")
        whiteButton(text="删除")  
    .title-con    
      .title {{mail.title}}
      .name 发布人：
        span {{mail.senderName}}
      .time 时   间：{{mail.sendTime | toDate}}
    .body-con(:style="{minHeight: minHeight}")  
      .word-con
        .word-title {{mail.title}}
        pre.word-text {{mail.content}}
        .down-con(v-show="attachments.length")  
          .down-head(flex="cross:center")
            img(src="./images/附件.png")
            span 附件（{{attachments.length}}个）
          .down-list(flex="cross:center" v-for="item in attachments")  
            img(src="./images/文件图标.png", alt="")
            span(flex-box="1") {{item.name}}
            a(:href="downHref(item.id)" download="") 
              whiteButton(text="下载")      
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain
  margin 20px 20px 0
  background: #FFFFFF;
  border: 1px solid #CBD5DD;
  border-radius: 2px;
  .head-con
    background: #F8F8F8;
    height 50px;
    border-bottom 1px solid #CBD5DD;
    padding 0 16px;
  .title-con  
    background: #F7FAFA;
    padding 14px 16px  
    .title
      font-size: 16px;
      color: #454545;
      font-weight bold
    .name
      font-size: 13px;
      color: #687179;  
      margin-top 15px
      span 
        color #4BB08D
    .time
      margin-top 10px
      font-size: 13px;
      color: #687179;  
  .body-con  
    background: #FFFFFF;      
    min-height 500px
    overflow hidden
    .word-con
      margin 27px auto
      width 660px
      border: 1px solid #F1F1F1;
      padding 20px 30px 60px
      .word-title
        font-size: 22px;
        color: #454545;
        text-align center
      .word-text  
        font-size: 14px;
        color: #687179;
        line-height 25px
        white-space pre-wrap
        word-wrap break-word
        margin-top 20px
    .down-con
      background: #FFFFFF;
      border: 1px solid #E4EFFA;    
      margin-top 20px
      .down-head
        background: #F7FAFA;
        border-bottom: 1px solid #E4EFFA;  
        height 37px
        padding-left 17px
        font-size: 14px;
        color: #454545;
        img
          margin-right 10px
      .down-list 
        height 50px
        background #ffffff
        padding 0 23px    
        font-size: 14px;
        color: #454545;
        line-height 18px
        border-bottom: 1px solid #E0ECF9;
        &:last-child
          border-bottom 0
        img 
          margin-right 8px
</style>

<script>
  import whiteButton from '../../components/button/white-button'
  import {
    detail,
    del
  } from '@/api/inBox'
  import moment from 'moment'
  import { apiPath } from '@/api/apiConfig'
  export default {
    data() {
      return {
        mail: {},
        attachments: {}
      }
    },
    created() {
      let id = this.$route.params.id
      detail(id).then(res => {
        this.mail = res.data.data.mail
        this.attachments = res.data.data.attachments
      })
    },
    filters: {
      toDate(value) {
        return moment(value).format('LLLL')
      }
    },
    computed: {
      wih() {
        return this.$store.state.common.wih
      },
      minHeight() {
        return `${this.wih - 250}px`
      }
    },
    methods: {
      del() {
        this.$confirm('此操作将永久删除该邮件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.$route.params.id
          del(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$router.back()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      downHref(id) {
        let token = window.app.$getCookie('NURSING_USER').split('##')[1]
        return `${apiPath}file/download/${id}?App-Token-Nursing=51e827c9-d80e-40a1-a95a-1edc257596e7&Auth-Token-Nursing=${token}`
      }
    },
    components: {
      whiteButton
    }
  }
</script>
