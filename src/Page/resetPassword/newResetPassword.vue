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
      <div class="login-wrapper">
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
              <img :src="logoUrl" />
            </div>
            <h1 class="name" v-html="logoName"></h1>
          </div>
          <el-form
            :model="form"
            :rules="rules"
            ref="ruleFormRef"
            label-width="100px"
            :show-message="false"
          >
            <el-form-item label="账  号:" prop="empNo">
              <el-input
                v-model="form.empNo"
                placeholder="请输入账号"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="原 密 码:"
              prop="oldPswd"
              :show-message="false"
            >
              <el-input
                v-model="form.oldPswd"
                placeholder="请输入原密码"
                type="password"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="新 密 码:"
              prop="newPswd"
              :show-message="false"
            >
              <el-input
                v-model="form.newPswd"
                placeholder="请输入新密码"
                id="newKey"
                type="password"
                size="mini"
              ></el-input>
              <el-tooltip
                class="item"
                effect="dark"
                :content="reg.ruleMsg"
                placement="top-start"
              >
                <img
                  v-if="!isNewPsd"
                  src="@/common/images/password/psd.png"
                  alt
                  class="icon"
                />
                <img
                  v-else
                  src="@/common/images/password/psd_success.png"
                  alt
                  class="icon"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="重复新密码:" prop="rePswd">
              <el-input
                v-model="form.rePswd"
                placeholder="请再次输入新密码"
                id="newKey1"
                type="password"
                size="mini"
                :show-message="false"
              ></el-input>
              <el-tooltip
                class="item"
                effect="dark"
                :content="reg.ruleMsg"
                placement="top-start"
              >
                <img
                  v-if="!form.rePswd"
                  src="@/common/images/password/psd.png"
                  alt
                  class="icon"
                />
                <img
                  v-else-if="isRePsd"
                  src="@/common/images/password/psd_success.png"
                  alt
                  class="icon"
                />
                <img
                  v-else
                  src="@/common/images/password/repsd.png"
                  alt
                  class="icon"
                />
              </el-tooltip>
            </el-form-item>
            <p class="password-security-level" v-if="securityLevelVisible">
              <span class="title">密码强度</span>
              <span class="progress-bar">
                <span
                  v-for="levelItem in securityLevelStatusList"
                  :key="levelItem.level"
                  :style="{
                    backgroundColor:
                      securityLevel >= levelItem.level
                        ? levelItem.statusColor
                        : '#ddd'
                  }"
                >
                </span>
              </span>
            </p>
          </el-form>
          <div class="login" @click="$router.push('/login')">返回登陆</div>
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
    margin-bottom: 10px;

    .el-input {
      width: 80%;
      font-size: 14px;
    }

    >>>.el-input__inner {
      height: 34px !important;
      border-radius: 4px;
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

.login-wrapper {
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

  .icon {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
  }
}

.logo-con {
  // height: 63px;
  width: 100px;
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
  margin-bottom: 15px;
}

.login {
  margin: 10px;
  padding-right: 20px;
  font-size: 13px;
  text-align: right;
  cursor: pointer;
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
import { updatePassword, passwordRule } from "@/api/index.js";
import { getSysPasswordSet } from "@/api/common";

export default {
  data() {
    {
      var account = (rule, value, callback) => {
        if (value == "") {
          callback(new Error("请填写内容"));
        } else {
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        const patt = eval(`/${this.reg.rule}/`);
        const flag = this.reg.flag ? patt.test(value) : !this.reg.flag;
        if (value == "" || !flag) {
          callback(new Error("请输入新密码"));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value == "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.form.newPswd) {
          callback(new Error("两次密码不一致!"));
        } else {
          callback();
        }
      };
    }
    return {
      form: {
        empNo: "",
        oldPswd: "",
        newPswd: "",
        rePswd: ""
      },
      rules: {
        empNo: [{ validator: account, message: "请输入账号", trigger: "blur" }],
        oldPswd: [
          { validator: account, message: "请输入密码", trigger: "blur" }
        ],
        newPswd: [
          { validator: validatePass1, message: "请输入新密码", trigger: "blur" }
        ],
        rePswd: [{ validator: validatePass2, trigger: "blur" }]
      },
      securityLevelStatusList: [
        { level: 1, statusColor: "red" },
        { level: 2, statusColor: "darkorange" },
        { level: 3, statusColor: "orange" },
        { level: 4, statusColor: "yellow" },
        { level: 5, statusColor: "green" }
      ],
      securityLevelVisible: false,
      permit: {},
      isNewPsd: false,
      isRePsd: false,
      reg: {}
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
        this.HOSPITAL_ID == "lingcheng" ||
        this.HOSPITAL_ID == "wujing"
      ) {
        logoName = "智慧护理信息系统";
      }
      return logoName;
    },
    securityLevel() {
      let newPsw = this.newPswd.trim();
      let level = 0;

      if (/[0-9]/.test(newPsw)) level++;
      if (/[a-z]/.test(newPsw)) level++;
      if (/[A-Z]/.test(newPsw)) level++;
      if (/[^a-zA-Z0-9]/.test(newPsw)) level++;
      if (newPsw.length >= 8) level++;

      return level;
    }
  },
  watch: {
    form: {
      handler(newVal, oldVal) {
        // console.log(newVal);
        const patt = eval(`/${this.reg.rule}/`);
        if (newVal.newPswd) {
          const flag = this.reg.flag
            ? patt.test(newVal.newPswd)
            : !this.reg.flag;
          this.isNewPsd = flag;
          this.isRePsd = newVal.rePswd.trim() == newVal.newPswd.trim() && flag;
        }
        if (newVal.rePswd) {
          const flag = this.reg.flag
            ? patt.test(newVal.rePswd)
            : !this.reg.flag;
          this.isRePsd = newVal.rePswd.trim() == newVal.newPswd.trim() && flag;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getSecurityLevelSetting();
    if(['sdlj','hengli'].includes(this.HOSPITAL_ID)){
      this.reg = {
        flag: true,
        // rule: "^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z~!@#$%^&*._?]+$)(?![a-z0-9]+$)(?![a-z~!@#$%^&*._?]+$)(?![0-9~!@#$%^&*._?]+$)[a-zA-Z0-9~!@#$%^&*._?]{8,}$",
        // rule: "^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}$",
        rule:"^(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)\\S{8,}$",
        ruleMsg: "字母大写，字母小写，特殊字符，数字四组中两种以上的随机组合,且长度不能少于8位"
      }
    }else if(['beihairenyi'].includes(this.HOSPITAL_ID)){
      this.reg = {
        flag: true,
        rule:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[^]{8,}$",
        ruleMsg: "密码必须包含字母大写，字母小写，数字,且长度不能少于8位"
      }
    }else {
      this.getPasswordRule();
    }
  },
  methods: {
    getPasswordRule() {
      passwordRule().then((res) => {
        if (res.data.code == 200) {
          this.reg = res.data.data;
        }
      });
    },
    reset() {
      this.$refs["ruleFormRef"].validate((valid) => {
        if (!valid || !(this.isRePsd && this.isNewPsd)) return false;
        console.log(this.form);
        updatePassword(this.form).then((res) => {
          console.log(res)
          if (res.data.code == 200) {
            this.$message({
              message: res.data.desc
            });
            setTimeout(() => {
              this.$router.push({
                path: "/login"
              });
            }, 100);
          }
        });
      });
    },
    getSecurityLevelSetting() {
      if (this.HOSPITAL_ID === "zhongshanqi") {
        this.permit = {};

        getSysPasswordSet().then(
          (res) => {
            let params = res.data.data[0] || {};
            console.log(params);
            if (params.passwordVariety) {
              this.securityLevelVisible = true;
            } else {
              this.securityLevelVisible = false;
            }

            this.permit = params;
          },
          () => {}
        );
      }
    }
  }
};
</script>
