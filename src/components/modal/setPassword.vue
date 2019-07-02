<template>
    <!-- 签名确认 -->
    <sweet-modal ref="modalName" size="small" :title="title" :overlay-theme="overlayTheme">
      <p for="" class="name-title" style="margin-top: 0">请输入当前密码</p>
      <div action="" @keyup.13="post">
        <el-input size="small" type="password" placeholder="请输入当前密码" v-model="oldPswd"></el-input>
      </div>
      <p for="" class="name-title">请输入新密码</p>
      <div action="" @keyup.13="post">
        <el-input size="small" type="password" placeholder="请输入新密码" v-model="newPswd"></el-input>
      </div>
      <p for="" class="name-title">请重复新密码</p>
      <div action="" @keyup.13="post">
        <el-input size="small" type="password" placeholder="请重复新密码" v-model="rePswd"></el-input>
      </div>
      <div style="height: 20px"></div>
      <div slot="button">
        <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
      </div>
    </sweet-modal>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 15px 0 10px  
  font-weight bold
</style>
<script>
import {changePassword} from '@/api/index.js'
  export default {
    props: {
      title: {
        type: String,
        default: '修改密码'
      },
      'overlayTheme': {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        oldPswd: '',
        newPswd: '',
        rePswd: ''
      }
    },
    methods: {
      open() {
        this.password = ''
        this.$refs.modalName.open()
      },
      post() {
        changePassword(this.oldPswd, this.newPswd, this.rePswd).then(res => {
          this.$message({
            showClose: true,
            message: res.data.desc
          })
          this.$refs.modalName.close()
          setTimeout(() => {
            this.$router.push('/login')
          }, 1000)
        })
      }
    },
    components: {}
  }
</script>
