<template>
  <div class="screen-lock" v-show="screenLock">
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
    <div class="wrapper">
      <img src="../../common/images/login-img.png" class="login-img" alt />
      <img src="../../common/images/shaw.png" class="login-shaw" />
      <div class="operate-con">
        <div>
          <div class="logo-con">
            <img :src="logoUrl" height="63" width="63" />
          </div>
          <h1 class="name" v-html="logoName"></h1>
        </div>
        <div class="user-img">
          <img :src="userImg" alt="" />
        </div>
        <div class="user-name">{{ userName }}</div>
        <div class="input-con" style="margin-top: 10px">
          <input
            v-if="screenLock"
            type="password"
            autocomplete="new-password"
            placeholder="密码"
            v-model="password"
          />
          <img src="../../common/images/password.png" height="14" width="14" />
        </div>
        <button v-touch-ripple class="active-btn" @click="ckeckAndUnlock">
          解除锁定
        </button>
        <button v-touch-ripple class="active-btn quit" @click="quit">
          注销登录
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import common from "@/common/mixin/common.mixin.js";
import { logout } from "@/api/login";

/**
 * 锁定界面
 */
export default {
  name: "screenLock",
  mixins: [common],
  data() {
    return {
      lastBindingTimeset: 0, // 最后一次绑定时间戳
      lockBeforeMinute: 30, // 锁定间隔时长(分钟)
      bindingTimeSpace: 5000, // 重复绑定锁屏方法的时间间隔(毫秒)
      password: "", // 密码
    };
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
    userName() {
      let actived = this.screenLock;
      let empName = JSON.parse(localStorage.user || "{}").empName;

      if (empName && actived) return empName;

      return "";
    },
    userImg() {
      let actived = this.screenLock;
      let signature = JSON.parse(localStorage.user || "{}").icon;

      if (signature && actived)
        return `/crNursing/api/file/signImage/${signature}?${this.token}`;

      return "";
    },
    screenLock() {
      return this.$store.state.common.screenLock;
    },
  },
  mounted() {
    this.bindingActiveTimmer = this.bindingActiveTimmer.bind(this);

    window.addEventListener("mousemove", this.bindingActiveTimmer);
    window.addEventListener("click", this.bindingActiveTimmer);
    window.addEventListener("focus", this.bindingActiveTimmer);
    window.addEventListener("blur", this.bindingActiveTimmer);
  },
  beforeDestroy() {
    clearTimeout(this.activeTimmer);
    window.removeEventListener("mousemove", this.bindingActiveTimmer);
    window.removeEventListener("click", this.bindingActiveTimmer);
    window.removeEventListener("focus", this.bindingActiveTimmer);
    window.removeEventListener("blur", this.bindingActiveTimmer);
  },
  methods: {
    ckeckAndUnlock() {
      if (!this.password) {
        this.$message({
          showClose: true,
          message: "请输入当前用户密码！",
          type: "warning",
          customClass: "screen-lock-view-message",
        });
      } else if (this.password !== (localStorage.ppp || "")) {
        this.$message({
          showClose: true,
          message: "密码错误",
          type: "warning",
          customClass: "screen-lock-view-message",
        });
      } else {
        this.$store.commit("common/setScreenLock", false);
      }
    },
    bindingActiveTimmer() {
      // 重新绑定的间隔
      let currentTimeset = new Date().getTime();
      if (currentTimeset - this.lastBindingTimeset < this.bindingTimeSpace)
        return;

      this.lastBindingTimeset = currentTimeset;

      clearTimeout(this.activeTimmer);

      this.activeTimmer = setTimeout(() => {
        let user = JSON.parse(localStorage.user || "{}");
        if (!this.screenLock && user.empName) {
          this.$store.commit("common/setScreenLock", true);
        }
      }, this.lockBeforeMinute * 60 * 1000);
    },
    quit() {
      this.$store.commit("common/setScreenLock", false);

      logout(Cookies.get("NURSING_USER"));
      Cookies.remove("password");
      Cookies.remove("deptId");
      Cookies.remove("access");
      Cookies.remove("hasGreet");
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("NURSING_USER", { path: "/" });
      this.$router.push("/login");
      this.$store.commit("upDeptCode", "");
    },
  },
  watch: {
    screenLock(lockStatus) {
      if (lockStatus) {
      } else {
        this.password = "";
      }
    },
  },
};
</script>

<style lang="scss">
.screen-lock-view-message {
  z-index: 100000000001 !important;
}
.screen-lock {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100000000000;
  background: url("../../common/images/login-bg.png") repeat-y;
  background-size: 100% 1px;
  overflow: hidden;

  .wrapper {
    width: 838px;
    margin: 0 auto 0;
    margin-top: 108px;
    position: relative;
    .login-img {
      width: 582px;
      height: 520px;
      position: absolute;
      margin-top: -66px;
      margin-left: -115px;
    }
    .login-shaw {
      position: absolute;
      height: 234px;
      width: 526px;
      top: 208px;
      right: -130px;
    }
    .operate-con {
      width: 300px;
      // height: 353px;
      min-height: 323px;
      padding-bottom: 30px;
      float: right;
      background: #fbfdff;
      border-radius: 2px;
      position: relative;
      z-index: 2;
      .logo-con {
        height: 63px;
        width: 63px;
        margin: 24px auto 19px;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        font-size: 18px;
        color: #333333;
        line-height: 22px;
        letter-spacing: 0;
        text-align: center;
        margin-bottom: 24px;
      }

      .user-img {
        background: #eee;
        width: 60px;
        height: 60px;
        border-radius: 5px;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .user-name {
        margin-top: 10px;
        text-align: center;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        font-size: 16px;
        color: #999;
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
          background: #ffffff;
          border: 1px solid #cbd5dd;
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
    }
  }
  .active-btn {
    width: 260px;
    height: 37px;
    margin: 0 auto;
    margin-top: 10px;
    display: block;
    background-color: #4bb08d;
    border-radius: 2px;
    border: 0;
    color: #fff;
    font-size: 13px;
    font-weight: lighter;
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #5cc6a1;
    }

    &.quit {
      background-color: #bbb;
      &:hover {
        background-color: #ddd;
      }
    }
  }
}
</style>
