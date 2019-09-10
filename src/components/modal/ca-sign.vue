<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modal"
    size="small"
    title="证书登录"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
  >
    <span>
      <p for class="name-title">选择证书</p>
      <div action class="sign-input" ref="userInput">
        <el-input size="small" type="text" placeholder="选择证书" v-model="username" readonly></el-input>
      </div>
    </span>
    <div style="height: 5px"></div>
    <p for class="name-title">证书密码</p>

    <div ref="passwordInput">
      <el-input size="small" type="password" v-model="password"></el-input>
    </div>
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="close">取消</el-button>
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
</style>

<script>
import dayjs from "dayjs";
import bus from "vue-happy-bus";
import { verifyCaSign } from "@/api/ca-sign_wx.js";
import {
  $_$WebSocketObj,
  VerifyUserPIN,
  $loginVerifyPINCallBack
} from "@/api/XTXSAB.js";
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
      username: "",
      password: "",
      strUserCertID: "",
      callback: null
    };
  },
  methods: {
    open(callback) {
      this.$refs.modal.open();
      this.callback = callback;
      this.password = "";
      $_$WebSocketObj.GetUserList(usrInfo => {
        this.strUserCertID = usrInfo.retVal
          .substring(usrInfo.retVal.indexOf("||") + 2, usrInfo.retVal.length)
          .replace("&&&", "");
        let username = usrInfo.retVal.substring(
          0,
          usrInfo.retVal.indexOf("||")
        );
        if (username) {
          this.username = username;
        } else {
          this.$message.warning("没有检查到证书");
        }
      });
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      if (this.password == "") {
        return this.$message({
          message: "请输入密码",
          type: "warning",
          showClose: true
        });
      }
      var ctx = { certID: this.strUserCertID, objForm: {}, action: "" };
      VerifyUserPIN(
        this.strUserCertID,
        this.password,
        retValObj => {
          if (retValObj.retVal) {
            this.$message.success("登录成功");
            this.callback && this.callback();
            this.$refs.modal.close();
          } else {
            $loginVerifyPINCallBack(retValObj);
            // this.$message.error("验证失败");
          }
        },
        ctx
      );
    }
  },
  components: {}
};
</script>
