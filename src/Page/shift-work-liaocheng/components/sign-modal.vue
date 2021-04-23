<template>
  <SweetModal
    class="sign-modal"
    ref="modal"
    size="small"
    :title="title"
  >
    <ElForm>
      <ElFormItem label="输入用户名或者工号">
        <ElInput
          ref="username"
          size="small"
          placeholder="输入用户名或者工号"
          v-model="username"
          @keyup.native.enter="onPassowrdFocus"
        />
      </ElFormItem>
      <ElFormItem label="请输入登录密码">
        <ElInput
          ref="password"
          size="small"
          type="password"
          placeholder="请输入登录密码"
          v-model="password"
          @keyup.native.enter="onConfirm"
        />
      </ElFormItem>
    </ElForm>
    <ElButton slot="button" @click="onClose">取消</ElButton>
    <ElButton slot="button" type="primary" @click="onConfirm">确认</ElButton>
  </SweetModal>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        callback: null,
        username: '',
        password: '',
      }
    },
    methods: {
      open({title = '签名确认', callback}) {
        this.title = title
        this.callback = callback
        this.username = JSON.parse(localStorage.user).empNo
        this.password = ''

        this.$refs.modal.open()

        this.$nextTick(() => {
          this.$refs.username.$refs.input.focus()
          this.$refs.username.$refs.input.select()
        })
      },
      close () {
        this.$refs.modal.close()
      },
      onPassowrdFocus () {
        this.$refs.password.$refs.input.focus()
      },
      onClose () {
        this.close()
      },
      onConfirm () {
        let {username, password} = this

        username = username.trim()
        password = password.trim()

        if (!username) {
          return this.$message.error('请输入用户名或工号')
        }

        if (!password) {
          return this.$message.error('请输入密码')
        }

        if (this.callback) {
          this.callback({username, password})
        }

        this.$emit('confirm', {username, password})
      }
    },
    components: {}
  }
</script>

<style lang="stylus" scoped>
  .sign-modal
    >>> .el-form-item
      margin-bottom 5px

    >>> .el-form-item__label
      font-weight 700
</style>
