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
    // 医生查看病人评估单&记录单（陵城） 查看病人病历、检查、检验（厚街合理用药）
    let url = this.$route.query;
    var token =
      (window.app && window.app.$getCookie("NURSING_USER").split("##")[1]) ||
      url.token;
    if (!token) {
      this.toLogin();
    } else {
      let type,
        patientId = url.patientId,
        visitId = url.visitId || "all";
      switch (url.viewType) {
        case "doc":
          {
            type = "record";
          }
          break;
        case "record":
          {
            type = "sheet";
          }
          break;
        case "doctorEmr":
          {
            type = "doctorEmr";
          }
          break;
        case "inspect":
          {
            type = "inspect";
          }
          break;
        case "test":
          {
            type = "test";
          }
          break;
        default: {
          type = "record";
        }
      }
      this.$router.push(
        `/showPatientDetails/${type}?patientId=` +
          patientId +
          "&visitId=" +
          visitId
      );
    }
  },
  methods: {
    // 医生查看病人评估单&记录单（陵城） 查看病人病历、检查、检验（厚街合理用药）
    toLogin() {
      console.log(this.isDev);
      let account = "admin",
        password =
          this.isDev || window.location.host == "192.168.1.54:9867"
            ? "Ad123456+"
            : "ad123456";

      if (this.HOSPITAL_ID == "hj") {
        password =
          this.isDev || window.location.host == "192.168.1.54:9866"
            ? "Ad123456+"
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
          let type,
            patientId = url.patientId,
            visitId = url.visitId || "all";
          switch (url.viewType) {
            case "doc":
              {
                type = "record";
              }
              break;
            case "record":
              {
                type = "sheet";
              }
              break;
            case "doctorEmr":
              {
                type = "doctorEmr";
              }
              break;
            case "inspect":
              {
                type = "inspect";
              }
              break;
            case "test":
              {
                type = "test";
              }
              break;
            default: {
              type = "record";
            }
          }
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
