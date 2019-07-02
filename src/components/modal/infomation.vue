<template>
  <!-- 修改信息 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :title="title1 || title"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
  >
    <span v-show="showUserName">
      <p for class="name-title">姓名</p>
      <div action class="sign-input" ref="usernameInput">
        <el-input size="small" type="text" placeholder="姓名" v-model="username"></el-input>
      </div>
    </span>
    <span v-show="showUserName">
      <p for class="name-title">性别</p>
      <div action class="sign-input" ref="usersexInput">
        <el-input size="small" type="text" placeholder="性别" v-model="usersex"></el-input>
      </div>
    </span>
    <span v-show="showUserName">
      <p for class="name-title">年龄</p>
      <div action class="sign-input" ref="userageInput">
        <el-input size="small" type="text" placeholder="年龄" v-model="userage"></el-input>
      </div>
    </span>
    <!-- <p for class="name-title">{{label}}</p>
    <div ref="passwordInput">
      <el-input size="small" type="password" :placeholder="placeholder" v-model="password"></el-input>
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
     <!-- </div>
    </span> -->
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="$refs.modalName.close()">取消</el-button>
      <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="post">确认</el-button>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.name-title
  font-size 14px;
  margin 5px 0 10px
  font-weight bold
.el-date-editor.el-input
  width 100%
>>>.el-picker-panel .el-date-picker .has-time .picker-dropdown
      z-index 20003!important
>>>.picker-dropdown
      z-index 20003!important
</style>

<script>
import dayjs from "dayjs";
import bus from 'vue-happy-bus'
import {updateFormHead} from '@/api/updateFormHead.js'
export default {
  props: {
    title: {
      type: String,
      default: "修改信息"
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
      username:"",
      bus: bus(this),
      usersex:"",  
      userage:"",  
      password: "",
      headData:{},
      signDate: dayjs().format("YYYY-MM-DD HH:mm") || "",
      callback: "",
      title1: "",
      wid:null,
      showDate: false
    };
  },
  methods: {
    open(params,callback, title, showDate = false) {
      console.log(params.queryInfo.id,this.$refs,"localStorage.user")
      Object.assign(this.headData,params)
      this.username = params.queryInfo? params.queryInfo.name: ""
      this.usersex = params.queryInfo? params.queryInfo.sex: ""
      this.userage = params.queryInfo? params.queryInfo.age: ""
      this.wid = params.wid||null
      // console.log(this.username,"this.username",this.usersex,"this.usersex",this.userage ,"this.userage ")
        // (this.callback = callback);
      this.showDate = showDate;
      // this.password = "";
      this.signDate = dayjs().format("YYYY-MM-DD HH:mm") || ""; //改
      this.$refs.modalName.open();
      this.$nextTick(() => {
        // if(showDate){
        //   let dateInput = this.$refs.dateInput.querySelector("input");
        // }
        let usernameInput = this.$refs.usernameInput.querySelector("input");
        let usersexInput = this.$refs.usersexInput.querySelector("input");
        let userageInput = this.$refs.userageInput.querySelector("input");
        usernameInput.focus();
        // usersexInput.focus();
        // userageInput.focus();
        usernameInput.select();
        // usersexInput.select();
        // userageInput.select();
        usernameInput.onkeydown = e => {
          if (e.keyCode == 13) {
            e.preventDefault();
            usersexInput.focus();
          }
        };
        usersexInput.onkeydown = e => {
          if (e.keyCode == 13) {
             e.preventDefault();
            userageInput.focus();
            return this.post();
          }
        };
        userageInput.onkeydown = e => {
          if (e.keyCode == 13) {
            return this.post();
          }
        };
      });
      return null;
    },
    post() {
      // if (this.password == "") {
      //   return this.$message({
      //     message: "请输入密码",
      //     type: "warning",
      //     showClose: true
      //   });
      // }
      console.log(this.usersex,this.username,this.userage,"+++++",this.headData)
      let data={
        id:this.headData.queryInfo.id,
        name:this.username,
        sex:this.usersex,
        age:this.userage,
      }
       updateFormHead(
           data
          ).then(res => {
            console.log(res,"res")
            this.bus.$emit('updatehead',data)
            //  this.bus.$emit('refreshTree')
             parent.app.bus.$emit('assessmentRefresh')
            return this.$message({
              message: "修改成功",
              showClose: true
            });
          
          });
      this.$refs.modalName.close();
      // if (this.signDate) {
      //   return this.callback(this.username, this.usersex, this.userage);
      // } else {
      //   return this.callback(this.username, this.usersex, this.userage);
      // }
    }
  },
  components: {}
};
</script>
