<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :title="title"
    :overlay-theme="overlayTheme"
    :blocking="true"
  >
    <p for class="name-title">{{ title }}</p>
    <div ref="passwordInput">
      <el-date-picker
        :style="{width: '100%'}"
        v-model="date"
        type="datetime"
        size="small"
        format="yyyy-MM-dd HH:mm"
        placeholder="选择日期时间"
        v-if="['gdtj'].includes(HOSPITAL_ID)"
      ></el-date-picker>
      <cr-date-picker
        v-else
        :style="{ width: '100%' }"
        v-model="date"
      ></cr-date-picker>
    </div>
    <!-- <span v-show="showUserName">
      <p for class="name-title">输入用户名或者工号</p>
      <div action class="sign-input" ref="userInput">
        <el-input size="small" type="text" placeholder="输入用户名或者工号" v-model="username"></el-input>
      </div>
    </span>


    <p for class="name-title">{{label}}</p>
    <div ref="passwordInput">
      <el-input size="small" type="password" :placeholder="placeholder" v-model="password"></el-input>
    </div>-->
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click="$refs.modalName.close()"
        >取消</el-button
      >
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
</style>

<script>
import dayjs from "dayjs";
export default {
  props: {
    label: {
      type: String,
      default: "请输入登录密码",
    },
    placeholder: {
      type: String,
      default: "请输入密码",
    },
    overlayTheme: {
      type: String,
      default: "",
    },
    showUserName: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      username: JSON.parse(localStorage.user || "{}").empNo,
      password: "",
      callback: "",
      date: "",
      title: "",
    };
  },
  methods: {
    open(callback, date, title) {
      this.callback = callback;
      this.date = date || "";
      this.title = title || "修改审核时间";
      this.password = "";
      this.$refs.modalName.open();
      this.$nextTick(() => {
        // let userInput = this.$refs.userInput.querySelector("input");
        // let passwordInput = this.$refs.passwordInput.querySelector("input");
        // userInput.focus();
        // userInput.select();
        // userInput.onkeydown = e => {
        //   if (e.keyCode == 13) {
        //     e.preventDefault();
        //     passwordInput.focus();
        //   }
        // };
        // passwordInput.onkeydown = e => {
        //   if (e.keyCode == 13) {
        //     this.post();
        //   }
        // };
      });
    },
    post() {
      // if (this.password == "") {
      //   return this.$message({
      //     message: "请输入密码",
      //     type: "warning",
      //     showClose: true
      //   });
      // }
      this.$refs.modalName.close();
      let date = this.date ? dayjs(this.date).format("YYYY-MM-DD HH:mm") : "";
      this.callback(date);
    },
  },
  components: {},
};
</script>
