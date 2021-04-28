<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :modalHeight="400"
    :title="title1 || title"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
  >
    <div class="sign-type">
      <el-radio-group v-model="signType">
        <el-radio v-model="signType" label="1" :class="{'is-disabled':signType!='1'}">护士签名</el-radio>
        <el-radio v-model="signType" label="2" :class="{'is-disabled':signType!='2'}">医生签名</el-radio>
      </el-radio-group>
    </div>
    <div class="content" v-if="signType==1">
      <span v-show="showUserName">
        <p for class="name-title">输入用户名或者工号</p>
        <div action class="sign-input" ref="userInput">
        <el-input
          size="small"
          type="text"
          placeholder="输入用户名或者工号"
          v-model="username"
        ></el-input>
      </div>
      </span>
      <p for class="name-title">{{ label }}</p>
      <div ref="passwordInput">
        <el-input size="small" type="password" :placeholder="placeholder" v-model="password"></el-input>
      </div>
    </div>
    <div class="content" v-else>
      <span v-show="showUserName">
        <p for class="name-title">输入医生签名</p>
        <div action class="sign-input" ref="userInput">
          <el-input size="small" type="text" placeholder="输入医生签名" v-model="doctorName"></el-input>
        </div>
      </span>
    </div>
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @click="post">确认</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title {
  font-size: 14px;
  margin: 5px 0 10px;
  font-weight: bold;
}

.sign-type {
  padding-bottom: 20px;

  >>>label {
    border: 1px solid #4bb08d;
    padding: 6px 15px 0 10px;
    border-radius: 3px;
    height: 32px;
    box-sizing: border-box;

    &.is-disabled {
      border-color: #ccc;
    }

    .el-radio__inner {
      box-sizing: border-box;
      height: 12px;
      width: 12px;
    }

    .el-radio__label {
      font-size: 12px;
    }

    .is-checked {
      + .el-radio__label {
        color: #4bb08d;
      }
    }
  }
}

.content {
  height: 127px;
}
</style>

<script>
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
    }
  },
  data() {
    return {
      username:
        localStorage && localStorage.user
          ? JSON.parse(localStorage.user).empNo
          : "",
      password: "",
      signDate: "",
      title1: "",
      message: "",
      showDate: false,
      callback: null,
      title1: "",
      canPost: true,
      signType: "1", //签名方式
      doctorName: "" //医生签名
    };
  },
  mounted() {
    if (sessionStorage.getItem("signType")) {
      this.signType = localStorage.getItem("signType") || "1";
    }
  },
  methods: {
    open(callback, empName, empNo, title, showDate = false, message = "") {
      if ((empName && !empNo) || this.signType == "2") {
        this.doctorName = empName;
        this.signType = "2";
      }
      this.title1 = "";
      title && (this.title1 = title);
      this.callback = callback;
      this.showDate = showDate;
      this.message = message;
      this.password = "";
      this.$refs.modalName.open();
      this.$nextTick(() => {
        let userInput = this.$refs.userInput.querySelector("input");
        let passwordInput = this.$refs.passwordInput
          ? this.$refs.passwordInput.querySelector("input")
          : "";
        userInput.focus();
        userInput.select();
        userInput.onkeydown = e => {
          if (e.keyCode == 13) {
            e.preventDefault();
            passwordInput.focus();
          }
        };
        if (passwordInput) {
          passwordInput.onkeydown = e => {
            if (e.keyCode == 13) {
              return this.post();
            }
          };
        }
      });
      return null;
    },
    setCloseCallback(closeCallback) {
      console.log("----setCloseCallback");
      this.$refs.modalName.setCloseCallback(closeCallback);
    },
    post() {
      if (!this.canPost) return;
      this.canPost = false;
      setTimeout(() => {
        this.canPost = true;
      }, 1000);
      this.setCloseCallback(null);
      if (this.password == "" && this.signType == 1) {
        return this.$message({
          message: "请输入密码",
          type: "warning",
          showClose: true
        });
      }
      let username = this.signType == 1 ? this.username : this.doctorName;
      this.$refs.modalName.close();
      return this.callback(
        this.password,
        username,
        "",
        this.signType
      );
    }
  },
  watch: {
    signType() {
      localStorage.setItem("signType", this.signType);
      if (this.signType == 1) {
        this.doctorName = "";
      }
    }
  },
  components: {}
};
</script>
