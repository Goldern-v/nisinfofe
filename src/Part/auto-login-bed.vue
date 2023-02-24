<template>
  <div>
    <div class="auto-contain" v-loading="loading" element-loading-text="正在前往患者界面"></div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.auto-contain {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<script>
import { autoLogin } from "@/api/login";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    let autoLogin_token = this.$route.query.autoLogin_token;
    let patientId = this.$route.query.patientId;
    let visitId = this.$route.query.visitId;
    const isLogin = !!(JSON.parse(localStorage.getItem('user')||'').empNo)
    if(!isLogin){
      autoLogin(autoLogin_token).then(res => {
      // 存下token 和用户信息 Auth-Token-Nursing
      let user = res.data.data.user;
      user.token = res.data.data.authToken;
      localStorage["user"] = JSON.stringify(res.data.data.user);
      Cookies.remove("NURSING_USER");
      Cookies.set(
        "NURSING_USER",
        `${res.data.data.user.id}##${res.data.data.authToken}`,
        {
          path: "/"
        }
      );
      this.$router.push(`/home?patientId=${patientId}&visitId=${visitId}`);
      // 清除科室记录
      this.$store.commit("upDeptCode", "");
      localStorage.selectDeptValue = "";
      this.$store.commit("upDeptName", "");
    }).catch(e => {
      this.$message.error("自动登录失败，请手动登录！");
      this.$router.replace('/login')
    });
    }else{
      if(!patientId)
      return this.$message.error("缺失患者ID入参");
      if(!visitId)
      return this.$message.error("缺失患者住院次数入参");
      this.$router.push(`/bed`);
    }
  },
  components: {}
};
</script>
