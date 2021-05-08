<template>
  <div>
    <div class="login-bg">
      <vue-particles
        color="#dedede"
        :moveSpeed="2"
        :particlesNumber="10"
        :particleOpacity="0.4"
        :particleSize="5"
        :lineOpacity="0.2"
        :hoverEffect="false"
        :clickEffect="false"
        :linesDistance="350"
        style="position: absolute; width: 100%; height: 100%"
      ></vue-particles>
      <div style="height: 25%"></div>
      <div class="login-warpper">
        <div class="login-img">
          <img src="../../common/images/login-img.png" alt />
          <span class="his-name">{{ HOSPITAL_NAME_SPACE }}</span>
          <span class="sys-version">「 v {{ $system.版本号 }} 」</span>
          <span class="sys-name">护理管理系统</span>
        </div>
        <img
          src="../../common/images/shaw.png"
          height="234"
          width="526"
          class="login-shaw"
        />
        <div class="login-con">
          <div>
            <div class="logo-con">
              <img :src="logoUrl" height="63" width="63" />
            </div>
            <h1 class="name" v-html="logoName"></h1>
          </div>
          <div class="input-con">
            <input type="text" placeholder="用户名" v-model="account" />
            <img src="../../common/images/account.png" height="14" width="14" />
          </div>
          <div class="input-con">
            <input
              type="password"
              style="border-top: 0"
              placeholder="密码"
              v-model="password"
            />
            <img
              src="../../common/images/password.png"
              height="14"
              width="14"
            />
          </div>
          <div class="remember-con">
            <el-checkbox v-model="remember">
              <span style="font-size: 13px; color: #687179">记住账号</span>
            </el-checkbox>
            <button
              style="background-color: #fff; float: right; border: 0"
              @click="toReset()"
            >
              重置密码
            </button>
          </div>
          <button v-touch-ripple class="login-btn" @click="login">
            {{ !ajax ? "登录系统" : "登录中..." }}
          </button>
        </div>
      </div>
      <p class="footer-text">
        <span>
          <a href="https://www.baichenyuan.cn" target="_blank">{{
            COMPANY_NAME || "百辰源(广州)科技有限公司"
          }}</a>
        </span>
        <span>
          版权所有 &copy; {{ new Date().getFullYear() }} All rights reseved.
        </span>
        <span>{{ ABOUT_INFO || "关于百辰源" }}</span>
        <span>|</span>
        <span>关于智慧护理</span>
        <span>|</span>
        <span>联系客服</span>
      </p>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.input-con {
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #aaa !important;
  }
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #aaa !important;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #aaa !important;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #aaa !important;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.input-con {
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #aaa !important;
  }
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #aaa !important;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #aaa !important;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #aaa !important;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.login-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('../../common/images/login-bg.png') repeat-y;
  background-size: 100% 1px;
}

.login-warpper {
  width: 838px;
  margin: 0 auto 0;
  position: relative;
}

.login-con {
  width: 300px;
  // height: 353px;
  min-height: 323px;
  padding-bottom: 30px;
  float: right;
  background: #FBFDFF;
  border-radius: 2px;
  position: relative;
  z-index: 2;
}

.logo-con {
  height: 63px;
  width: 63px;
  margin: 24px auto 19px;

  img {
    width: 100%;
    height: 100%;
  }
}

a {
  text-decoration: none;
  color: white;
}

.name {
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  letter-spacing: 0;
  text-align: center;
  margin-bottom: 24px;
}

.input-con {
  width: 260px;
  height: 37px;
  margin: 0 auto;
  position: relative;

  input {
    width: 260px;
    height: 37px;
    outline: none;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    padding-left: 30px;
    box-sizing: border-box;
    font-size: 13px;
  }

  img {
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
}

.remember-con {
  width: 260px;
  margin: 13px auto 26px;
}

.login-btn {
  width: 260px;
  height: 37px;
  margin: 0 auto;
  display: block;
  background: #4BB08D;
  border-radius: 2px;
  border: 0;
  color: #fff;
  font-size: 13px;
  font-weight: lighter;
  outline: none;
  cursor: pointer;

  &:hover {
    background: #5CC6A1;
  }
}

.login-img {
  width: 582px;
  height: 520px;
  position: absolute;
  margin-top: -66px;
  margin-left: -115px;

  img {
    width: 100%;
  }

  .his-name {
    position: absolute;
    color: #fff;
    top: 4px;
    font-size: 20px;
    letter-spacing: 1px;
    // font-family '微软雅黑' !important
    left: 146px;
  }

  .sys-name {
    position: absolute;
    color: #fff;
    top: 35px;
    right: 75px;
    font-size: 22px;
    letter-spacing: 2px;
    // font-family '微软雅黑' !important
  }

  .sys-version {
    position: absolute;
    font-size: 12px;
    color: #fff;
    top: 43px;
    left: 235px;
    // font-family '微软雅黑' !important
    opacity: 0.8;
    letter-spacing: 1px;
  }
}

.login-shaw {
  position: absolute;
  top: 119px;
  right: -130px;
}

.footer-text {
  font-size: 12px;
  color: #EEF8F3;
  letter-spacing: 0;
  text-align: center;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  width: 100%;
  font-family: sans-serif !important;

  span {
    font-family: sans-serif !important;
    margin: 0px 10px;
  }
}
</style>

<script>
import { login } from "@/api/login";
import Cookies from "js-cookie";
import EnterToTab from "@/plugin/tool/EnterToTab.js";
import md5 from "md5";
export default {
  data() {
    return {
      account: "",
      password: "",
      remember: true,
      ajax: false,
    };
  },
  methods: {
    login() {
      // console.log(md5(this.account, "this.account"));
      // return;
      if (!(this.account && this.password)) {
        //          如果空
        this.$message({
          showClose: true,
          message: "请填写账号和密码！",
          type: "warning",
        });
        return;
      }
      //        阻止重新登录
      if (this.ajax === true) return;
      this.ajax = true;
      login(this.account, this.password)
        .then((res) => {
          console.log(res);
          // 记住账号
          if (this.remember) {
            localStorage["rememberAccount"] = this.account;
          }
          this.ajax = false;
          // 存下token 和用户信息 Auth-Token-Nursing
          let user = res.data.data.user;
          user.token = res.data.data.authToken;
          window.app.authToken = res.data.data.authToken;
          localStorage["ppp"] = this.password;
          localStorage["user"] = JSON.stringify(res.data.data.user);
          localStorage["adminNurse"] = res.data.data.adminNurse;
          Cookies.remove("NURSING_USER");
          Cookies.set(
            "NURSING_USER",
            `${res.data.data.user.id}##${res.data.data.authToken}`,
            {
              path: "/",
            }
          );
          if (
            this.$store.state.common.relogin &&
            this.$store.state.common.relogin != "/login"
          ) {
            this.$router.push(this.$store.state.common.relogin);
          } else {
            this.$store.commit("upRelogin", false);
            this.$router.push("/index");
            if (this.HOSPITAL_ID == "weixian") {
              /** 验证证书 */
              window.openCaSignModal();
            }
          }
          // 清除科室记录
          this.$store.commit("upDeptCode", "");
          localStorage.selectDeptValue = "";
          this.$store.commit("upDeptName", "");
        })
        .catch((res) => {
          this.ajax = false;
          if (res.data.errorCode == 1000) {
            setTimeout(() => {
              this.$router.push("/resetPassword");
            }, 1000);
          } else if (res.data.desc == "员工号不存在") {
            let input = document.querySelectorAll(".input-con input")[0];
            input.focus();
            input.select();
          } else if (res.data.desc == "密码错误") {
            let input = document.querySelectorAll(".input-con input")[1];
            input.focus();
            input.select();
          }
        });
    },
    toReset() {
      setTimeout(() => {
        this.$router.push("/resetPassword");
      }, 1000);
    },
  },
  created() {
    if (localStorage["rememberAccount"]) {
      this.account = localStorage["rememberAccount"];
    }
  },
  mounted() {
    /**清除锁屏的本地存储相关 */
    if (localStorage.screenLock) localStorage.removeItem("screenLock");

    let elList = document.querySelectorAll(".input-con input");
    EnterToTab(
      elList,
      (el) => {
        el.focus();
        el.select();
      },
      this.login
    );
  },
  computed: {
    logoUrl() {
      let logoUrl = require("../../common/images/logo.png");
      switch (this.HOSPITAL_ID) {
        case "hj":
          logoUrl = require("../../common/images/login_logo_hj.png");
          break;
        case "zhongshanqi":
          logoUrl = require("../../common/images/logo_zhongshanqi.png");
          break;
      }
      return logoUrl;
    },
    logoName() {
      let logoName = "百辰源智慧护理信息系统";
      if (this.HOSPITAL_ID == "hj" || this.HOSPITAL_ID == "zhongshanqi") {
        logoName = `${this.HOSPITAL_NAME}<br />智慧护理信息系统`;
      } else if (
        this.HOSPITAL_ID == "guizhou" ||
        this.HOSPITAL_ID == "liaocheng" ||
        this.HOSPITAL_ID == "lingcheng"
      ) {
        logoName = "智慧护理信息系统";
      }
      return logoName;
    },
  },
  components: {},
};
</script>
