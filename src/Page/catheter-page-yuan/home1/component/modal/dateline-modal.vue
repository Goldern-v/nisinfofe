<template>
  <div>
    <sweet-modal ref="modal" size="small" title="修改护理任务状态" :icon="icon">
      <p class="name-title">请输入登录密码</p>
      <el-input size="small" type="password" placeholder="请输入密码" v-model="password"></el-input>
      <p class="name-title" style="margin-top: 15px">添加备注</p>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remark">
      </el-input>
      <div slot="button">
        <el-button class="modal-btn" type="primary" @click="copmlete">完成任务</el-button>
        <el-button class="modal-btn" @click="del">取消任务</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 0px 0 5px  
</style>

<script>
  import {
    updateStatus
  } from '@/api/home-bottom'
  import busFactory from 'vue-happy-bus'
  export default {
    data() {
      return {
        bus: busFactory(this),
        icon: '',
        password: '',
        id: '',
        status: '',
        remark: '',
      }
    },
    methods: {
      init() {
        this.icon = ''
        this.password =''
        this.id = ''
        this.status = ''
        this.remark = ''
      },
      open(item) {
        this.init()
        this.id = item.id
        this.$refs.modal.open()
      },
      close() {
        this.$refs.modal.close()
      },
      post() {
        updateStatus(this.password, this.id, this.status, this.remark).then(res => {
          this.bus.$emit('dateLefteRefresh')
          this.close()
          this.$message({
            showClose: true,
            message: res.data.desc,
            type: 'success'
          })
        })
      },
      copmlete() {
        this.status = '1'
        this.post()
      },
      del() {
        this.status = '2'
        this.post()
      }
    },
    components: {}
  }
</script>
