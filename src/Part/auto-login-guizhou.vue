<template>
  <div>
    <div
      class="auto-contain"
      v-loading="loading"
      element-loading-text="正在自动登录"
    ></div>
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
      loading: true,
    };
  },
  methods:{
    todo(res){
      // 存下token 和用户信息 Auth-Token-Nursing
      let user = res.data.data.user;
      user.token = res.data.data.authToken;
      localStorage["user"] = JSON.stringify(res.data.data.user);
      // localStorage.setItem("fuyouCaData",JSON.stringify(data));
      Cookies.remove("NURSING_USER");
      Cookies.set(
        "NURSING_USER",
        `${res.data.data.user.id}##${res.data.data.authToken}`,
        {
          path: "/",
        }
      );
      this.$router.push("/index");
      // 清除科室记录
      this.$store.commit("upDeptCode", "");
      localStorage.selectDeptValue = "";
      this.$store.commit("upDeptName", "");
    }
  },
  mounted() {
    let token = this.$route.query.token || this.$route.query.ticket;
    let v_url = this.$route.query.service;
    // let { appCode , appName , v_token } = this.$route.query
    console.log('this.$route.query',this.$route.query);
    let params = {}
    //新加参数
    let appCode = "YDHLXT";
    let appName = "护理信息系统";
    if(v_url) {
      params = {
        token: token,
        v_url: v_url || '',
      }
    }else {
      params = {
        token: "",
        appCode: appCode,
        appName: appName,
        v_token: token,
        tradeCode: "nursing_ssoLogin_2"
      }
    }
    autoLogin(params).then((res) => {
      if(res.data.code =='402'){
        this.$confirm(res.data.data.expireDesc, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.todo(res)
        })
        .catch(()=>{
          this.todo(res)
        })
      }else if(res.data.code==='403'){
        this.$confirm(res.data.desc, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$router.go(-1)
        })
        .catch(()=>{
          this.$router.go(-1)
        })
      }else this.todo(res)
    });
  },
  components: {},
};
</script>
