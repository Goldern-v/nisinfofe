<template>
  <div class="nursingDoc">{{errorMsg}}</div>
</template>

<script>
import { login } from "@/api/login";
import Cookies from "js-cookie";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      errorMsg: "" //登录失败原因
    };
  },
  mounted() {
    let url = this.$route.query;
    var token =
      (window.app && window.app.$getCookie("NURSING_USER").split("##")[1]) ||
      url.token;
    if (!token) {
      this.toLogin();
    } else {
      let type = url.viewType == "doc" ? "record" : "sheet",
        patientId = url.patientId,
        visitId = url.visitId || "all";
      this.$router.push(
        `/showPatientDetails/${type}?patientId=` +
          patientId +
          "&visitId=" +
          visitId
      );
    }
  },
  methods: {
    toLogin() {
      console.log(this.isDev);
      let account = "admin",
        password =
          this.isDev || window.location.host == "120.25.105.45:9867"
            ? "123456"
            : "ad123456";

      if (this.HOSPITAL_ID == "hj") {
        password =
          this.isDev || window.location.host == "120.25.105.45:9866"
            ? "ad123456"
            : "Chenrui2019";
      }
      login(account, password)
        .then(res => {
          // 存下token 和用户信息 Auth-Token-Nursing
          let user = res.data.data.user;
          user.token = res.data.data.authToken;
          window.app.authToken = res.data.data.authToken;
          localStorage["user"] = JSON.stringify(res.data.data.user);
          Cookies.remove("NURSING_USER");
          Cookies.set(
            "NURSING_USER",
            `${res.data.data.user.id}##${res.data.data.authToken}`,
            {
              path: "/"
            }
          );
          let url = this.$route.query;
          let type = url.viewType == "doc" ? "record" : "sheet",
            patientId = url.patientId,
            visitId = url.visitId || "all";
          let timeId = setTimeout(() => {
            clearTimeout(timeId);
            this.$router.push(
              `/showPatientDetails/${type}?patientId=` +
                patientId +
                "&visitId=" +
                visitId
            );
          }, 500);
        })
        .catch(err => {
          if (err.data) {
            this.errorMsg = err.data.desc;
          }
        });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.nursingDoc {
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%);
  -ms-transform: translate(-50%);
  -o-transform: translate(-50%);
  transform: translate(-50%);
}
</style>
