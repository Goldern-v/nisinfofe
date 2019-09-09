<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :title="title1 || title"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
  >
    <div v-show="message && message.length>0" class="message-box">
      <span>{{message}}</span>
    </div>
    <span v-show="showUserName">
      <p for class="name-title">输入用户名或者工号</p>
      <div action class="sign-input" ref="userInput">
        <el-input
          size="small"
          type="text"
          placeholder="输入用户名或者工号"
          v-model="username"
          :readonly="HOSPITAL_ID == 'weixian_dev'"
        ></el-input>
      </div>
    </span>
    <div style="height: 5px"></div>
    <span v-if="HOSPITAL_ID != 'weixian_dev' || pw">
      <p for class="name-title">{{label}}</p>
      <div ref="passwordInput">
        <el-input size="small" type="password" :placeholder="placeholder" v-model="password"></el-input>
      </div>
    </span>

    <span v-else>
      <p for class="name-title">
        验证方式
        <span :style="{color: ca_isLogin ? 'green': 'red'}">
          {{ca_name || '无'}}证书
          {{ca_isLogin ? '已登录' : '未登录'}}
        </span>
      </p>
    </span>

    <div v-if="HOSPITAL_ID == 'weixian_dev'" style="margin-top: 5px">
      <span @click="openCaSignModal" class="loginCa" v-if="!ca_isLogin">登录证书</span>
      <span class="loginCa" v-if="!pw" @click="pw = true">密码验证</span>
      <span class="loginCa" v-else @click="pw = false">证书验证</span>
    </div>

    <span v-show="showDate">
      <p for class="name-title">输入签名时间</p>
      <div action class="sign-input" ref="dateInput">
        <el-date-picker
          popper-class="picker-dropdown"
          v-model="signDate"
          type="datetime"
          align="center"
          format="yyyy-MM-dd HH:mm"
          placeholder="输入签名时间"
        ></el-date-picker>
        <!-- <el-input size="small" type="text" placeholder="输入签名时间" v-model="signDate"></el-input> -->
      </div>
    </span>
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="post">确认</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title {
  font-size: 14px;
  margin: 5px 0 10px;
  font-weight: bold;
}

.el-date-editor.el-input {
  width: 100%;
}

>>>.el-picker-panel .el-date-picker .has-time .picker-dropdown {
  z-index: 20003 !important;
}

>>>.picker-dropdown {
  z-index: 20003 !important;
}

.message-box {
  outline: 1px dashed gray;
  margin: 0 0 10px 0px;
  padding: 5px;
  text-align: justify;
}

.loginCa {
  font-size: 13px;
  color: #4bb08d;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
}
</style>

<script>
import dayjs from "dayjs";
import bus from "vue-happy-bus";
import { verifyCaSign } from "@/api/ca-sign_wx.js";
export default {
  props: {
    title: {
      type: String,
      default: "签名确认"
    },
    label: {
      type: String,
      default: "请输入登录密码"
    },
    placeholder: {
      type: String,
      default: "请输入密码"
    },
    overlayTheme: {
      type: String,
      default: ""
    },
    showUserName: {
      type: Boolean,
      default: true
    },
    showMessage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      username:
        localStorage && localStorage.user
          ? JSON.parse(localStorage.user).empNo
          : "",
      password: "",
      signDate: dayjs().format("YYYY-MM-DD HH:mm") || "",
      callback: "",
      title1: "",
      message: "",
      showDate: false,
      bus: bus(this),
      ca_name: "",
      ca_isLogin: "",
      pw: false
    };
  },
  methods: {
    open(callback, title, showDate = false, message = "") {
      this.title1 = "";
      title && (this.title1 = title);
      (this.username =
        localStorage && localStorage.user
          ? JSON.parse(localStorage.user).empNo
          : ""),
        (this.callback = callback);
      this.showDate = showDate;
      // this.showMessage = showMessage;
      this.message = message;
      this.password = "";
      this.pw = false;

      this.ca_name = window.ca_name;
      this.ca_isLogin = window.ca_isLogin;

      this.signDate = dayjs().format("YYYY-MM-DD HH:mm") || ""; //改
      this.$refs.modalName.open();
      if (this.HOSPITAL_ID != "weixian_dev") {
        this.$nextTick(() => {
          // if(showDate){
          //   let dateInput = this.$refs.dateInput.querySelector("input");
          // }
          let userInput = this.$refs.userInput.querySelector("input");
          let passwordInput =
            this.$refs.passwordInput &&
            this.$refs.passwordInput.querySelector("input");
          userInput.focus();
          userInput.select();
          userInput.onkeydown = e => {
            if (e.keyCode == 13) {
              e.preventDefault();
              passwordInput.focus();
            }
          };
          passwordInput &&
            (passwordInput.onkeydown = e => {
              if (e.keyCode == 13) {
                return this.post();
              }
            });
        });
      }

      return null;
    },
    post() {
      if (this.HOSPITAL_ID == "weixian_dev") {
        if (this.pw) {
          if (this.password == "") {
            return this.$message({
              message: "请输入密码",
              type: "warning",
              showClose: true
            });
          }
          this.$refs.modalName.close();
          if (this.signDate) {
            return this.callback(this.password, this.username, this.signDate);
          } else {
            return this.callback(this.password, this.username);
          }
          parent.app.bus.$emit("assessmentRefresh");
        } else {
          verifyCaSign().then(random => {
            this.$refs.modalName.close();
            if (this.signDate) {
              return this.callback(
                // localStorage.ppp,
                random,
                this.username,
                this.signDate,
                random
              );
            } else {
              return this.callback(random, this.username);
            }
          });
        }
      } else {
        if (this.password == "") {
          return this.$message({
            message: "请输入密码",
            type: "warning",
            showClose: true
          });
        }
        this.$refs.modalName.close();
        if (this.signDate) {
          return this.callback(this.password, this.username, this.signDate);
        } else {
          return this.callback(this.password, this.username);
        }
        parent.app.bus.$emit("assessmentRefresh");
      }
    },
    openCaSignModal() {
      window.openCaSignModal();
      this.$refs.modalName.close();
    }
  },
  components: {}
};
</script>
