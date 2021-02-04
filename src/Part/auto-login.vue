<template>
  <div>
    <div class="auto-contain" v-loading="loading" element-loading-text="正在自动登录"></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.auto-contain
  position absolute
  width 100%
  height 100%
</style>

<script>
  import {
    autoLogin
  } from '@/api/login'
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      this.$nextTick(() => {
        let token = this.$getCookie('NURSING_USER') || ''
      if(!token) {
         window.app.$message({
            showClose: true,
            message: '自动登录失败，请重新登录',
            type: 'warning'
        })
        this.$router.push('/login')
      }
      let userId = token.split('##')[0]
      let authToken = token.split('##')[1]
      autoLogin(userId, authToken).then((res) => {
        let user = res.data.data.user
        user.token = res.data.data.authToken
        localStorage['user'] = JSON.stringify(res.data.data.user)
        // this.$setCookie('NURSING_USER', `${res.data.data.user.id}##${res.data.data.authToken}`)
        Cookies.remove("NURSING_USER")
        Cookies.set('NURSING_USER', `${res.data.data.user.id}##${res.data.data.authToken}`, { path: '/' })
        // this.$setCookie('NURSING_USER', `${res.data.data.user.id}##${res.data.data.authToken}`)
        // this.$router.push('/index')
        this.$router.push('/templateShow')
      })
      .catch((e) => {
        // window.app.$message({
        //     showClose: true,
        //     message: '自动登录失败，请重新登录',
        //     type: 'warning'
        // })
        Cookies.remove("NURSING_USER")
        this.$store.commit('upRelogin', false)
        this.$router.push('/login')
      })
      })
    },
    components: {}
  }
</script>
