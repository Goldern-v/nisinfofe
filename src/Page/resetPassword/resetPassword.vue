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
          <span class="sys-name">智慧护理信息系统</span>
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
          <el-form :rules="rules" ref="ruleFormRef" label-width="100px">
            <el-form-item label="账号">
              <el-input
                v-model="empNo"
                placeholder="请输入原密码"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="oldPswd">
              <el-input
                v-model="oldPswd"
                placeholder="请输入原密码"
                type="password"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPswd">
              <el-input
                v-model="newPswd"
                placeholder="请输入新密码"
                id="newkey"
                type="password"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="重复新密码" prop="rePswd">
              <el-input
                v-model="rePswd"
                placeholder="请再次输入新密码"
                id="newkey1"
                type="password"
                size="mini"
              ></el-input>
            </el-form-item>
            <p
              class="password-security-level"
              v-if="HOSPITAL_ID === 'zhongshanqi'"
            >
              <span class="title">密码强度</span>
              <span class="progress-bar">
                <span
                  v-for="levelItem in securityLevelStatusList"
                  :key="levelItem.level"
                  :style="{
                    backgroundColor:
                      securityLevel >= levelItem.level
                        ? levelItem.statusColor
                        : '#ddd',
                  }"
                >
                </span>
              </span>
            </p>
          </el-form>
          <el-button class="reset-btn" @click="reset">重置密码</el-button>
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
.el-form {
  min-height: 156px;

  .el-form-item {
    margin-bottom: 0px;

    .el-input {
      width: 80%;
    }

    >>>.el-form-item__error {
      color: #ff4949;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 75% !important;
      left: 0;
    }
  }
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

.reset-btn {
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
    right: 25px;
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

.password-security-level {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: rgb(72, 106, 98);
  margin-bottom: 10px;

  .title {
    width: 100px;
    text-align: right;
    padding-right: 13px;
    display: inline-block;
    box-sizing: border-box;
  }

  .progress-bar {
    display: flex;
    flex: 1;
    align-items: center;
    padding-right: 40px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.3);
    }

    &>span {
      flex: 1;
      display: block;
      height: 8px;
      margin: 0 1px;
    }
  }
}
</style>

<script>
import { changePassword_hx } from "@/api/index.js";
export default {
  data() {
    {
      var validatePass2 = (rule, value, callback) => {
        if (value == "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.newPswd) {
          callback(new Error("两次密码不一致!"));
        } else {
          callback();
        }
      };
    }
    return {
      empNo: "",
      oldPswd: "",
      newPswd: "",
      rePswd: "",
      rules: {
        // oldPswd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // newPswd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        // rePswd: [{ required: true, validator: validatePass2, trigger: "blur" }]
      },
      securityLevelStatusList: [
        { level: 1, statusColor: "red" },
        { level: 2, statusColor: "darkorange" },
        { level: 3, statusColor: "green" },
      ],
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
    securityLevel() {
      let newPsw = this.newPswd.trim();
      let level = 0;

      if (newPsw.length >= 6) level++;
      else return level;

      if (/[A-Z]/.test(newPsw)) level++;
      if (/[^a-zA-Z0-9]/.test(newPsw)) level++;

      return level;
    },
  },
  methods: {
    reset() {
      changePassword_hx(
        this.empNo,
        this.oldPswd,
        this.newPswd,
        this.rePswd
      ).then((res) => {
        this.$message({
          showClose: true,
          message: res.data.desc,
        });
        setTimeout(() => {
          window.app.$router.push({
            path: "/login",
          });
        }, 100);
      });
    },
  },
};
</script>
