<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :title="title1 || title"
    :overlay-theme="overlayTheme"
    style="z-index: 10004"
    class="signModal"
  >
    <div v-show="message && message.length > 0" class="message-box">
      <span>{{ message }}</span>
    </div>
    <span v-show="showDate">
      <p for class="name-title">记录时间</p>
      <div action class="sign-input" ref="dateInput">
        <template v-if="!['nfyksdyy'].includes(this.HOSPITAL_ID)">
           <el-date-picker
            popper-class="picker-dropdown"
            v-model="signDate"
            type="datetime"
            align="center"
            format="yyyy-MM-dd HH:mm"
            placeholder="输入签名时间"
          ></el-date-picker>
        </template>
        <template v-else>
         <el-input size="small" type="text" placeholder="输入签名时间" v-model="signDate"></el-input>
        </template>
      </div>
    </span>
    <span v-show="showAduit">
      <p for class="name-title">审核时间</p>
      <div action class="sign-input" ref="dateInput">
        <template v-if="!['nfyksdyy'].includes(this.HOSPITAL_ID)">
        <el-date-picker
          popper-class="picker-dropdown"
          v-model="aduitDate"
          type="datetime"
          align="center"
          format="yyyy-MM-dd HH:mm"
          placeholder="输入审核时间"
        ></el-date-picker>
        </template>
        <template v-else>
        <el-input size="small" type="text" placeholder="输入签名时间" v-model="aduitDate"></el-input>
        </template>
      </div>
    </span>
    <template v-if="!['huadu'].includes(HOSPITAL_ID)||(huaduCaSignIn ==false )">
      <span>
      <p for class="name-title">输入用户名或者工号</p>
      <div action class="sign-input" ref="userInput">
        <el-input
          size="small"
          type="text"
          :disabled="['nanfangzhongxiyi'].includes(HOSPITAL_ID) && nanfangCa"
          placeholder="输入用户名或者工号"
          v-model="username"
          :readonly="['foshanrenyi', 'weixian'].includes(HOSPITAL_ID)"
        ></el-input>
      </div>
    </span>
    <div style="height: 5px"></div>
    <span v-if="hasQrCaSignHos.includes(HOSPITAL_ID)" v-show="!pw">
      <p for class="name-title">{{ label }}</p>
      <div ref="passwordInput">
        <el-input
          size="small"
          type="password"
          :placeholder="placeholder"
          v-model="password"
        ></el-input>
      </div>
    </span>
    <span v-else-if="['nanfangzhongxiyi'].includes(HOSPITAL_ID) && nanfangCa"></span>
    <span v-else-if="!['foshanrenyi', 'weixian'].includes(HOSPITAL_ID) || pw">
      <p for class="name-title">{{ label }}</p>
      <div ref="passwordInput">
        <el-input
          size="small"
          type="text"
          :placeholder="placeholder"
          v-model="password"
          class="passwordInput"
        ></el-input>
      </div>
    </span>
    <span v-else>
      <p for class="name-title">
        验证方式
        <span :style="{ color: ca_isLogin ? 'green' : 'red' }">
          {{ ca_name || "无" }}证书
          {{ ca_isLogin ? "已登录" : "未登录" }}
        </span>
      </p>
    </span>
    </template>
    <template v-else>
      <div v-if="huaduSignTye!=''">确定要{{title.indexOf('删除') > -1?'删除':''}}签名吗？</div>
      <el-tabs v-model="activeName" v-else>
      <el-tab-pane label="签名认证" name="first" style="text-align:center;">
        <figure class="ewm-box" style="text-align:center;">
          <div class="qrcode" ref="qrcodeContainer"></div>
        </figure>
        <div class="info-box1" v-if="authoState==='1'">请在登录CA移动端扫一扫登录</div>
        <div class="info-box2"  v-if="authoState==='2'">二维码已过期</div>
        <div style="height: 20px"></div>
      </el-tab-pane>
      </el-tabs>
    </template>
    <div
      v-if="['huadu'].includes(HOSPITAL_ID) && (huaduCaSignIn ==false )"
      style="margin-top: 10px;color:#4bb08d;font-weight:bold;"
      class="loginCa"
      @click="openWhhkCaSign">
      CA登录验证
    </div>
    <div
      v-if="['foshanrenyi', 'weixian'].includes(HOSPITAL_ID)"
      style="margin-top: 5px"
    >
      <span @click="openCaSignModal" class="loginCa" v-if="!ca_isLogin"
        >登录证书</span
      >
      <span class="loginCa" v-if="!pw" @click="pw = true">密码验证</span>
      <span class="loginCa" v-else @click="pw = false">证书验证</span>
    </div>
    <span
      v-if="
        hasQrCaSignHos.includes(HOSPITAL_ID) &&
          formData &&
          HOSPITAL_ID != 'whsl'
      "
    >
      <!-- <span v-if="['fuyou'].includes(HOSPITAL_ID)&&formData"> -->
      <p class="name-title">
        验证方式
        <span
          :style="{
            color: fuyouCaData && fuyouCaData.userName ? 'green' : 'red'
          }"
        >
          {{ (fuyouCaData && fuyouCaData.userName) || "无" }}证书
          {{ fuyouCaData && fuyouCaData.userName ? "ca已登录" : "ca未登录" }}
        </span>
      </p>
    </span>
    <div style="margin-top: 5px">
      <span
        @click="
          () =>
            HOSPITAL_ID == 'fuyou'
              ? openFuyouCaSignModal()
              : openHjCaSignModal()
        "
        class="loginCa"
        v-if="
          hasQrCaSignHos.includes(HOSPITAL_ID) &&
            !fuyouCaData &&
            formData &&
            HOSPITAL_ID != 'whsl'
        "
        >ca登录</span
      >
      <span
        v-if="hasQrCaSignHos.includes(HOSPITAL_ID) && fuyouCaData && formData"
      >
        <!-- <span v-if="['fuyou'].includes(HOSPITAL_ID)&&fuyouCaData&&formData"> -->
        开启ca签名<el-switch v-model="isCaSign"></el-switch>
      </span>
    </div>

    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="close">取消</el-button>
      <template v-if="['huadu'].includes(HOSPITAL_ID)">
        <el-button
          v-if="huaduCaSignIn&&huaduSignTye"
          class="modal-btn"
          type="primary"
          @dblclick.stop="huaduCaPost"
          @click.stop="huaduCaPost"
          >ca签名确认</el-button
         >
        <el-button
           class="modal-btn"
           type="primary"
           v-if="!huaduCaSignIn"
          @dblclick.stop="post"
          @click.stop="post"
          :loading="btnLoading"
        >确认</el-button
        >
      </template>
      <template v-else>
         <el-button
        class="modal-btn"
        type="primary"
        v-if="!showSignBtn()"
        @dblclick.stop="post"
        @click.stop="post"
        :loading="btnLoading"
        >确认</el-button
        >
       <el-button
        v-if="hasCaSign()&&showSignBtn()"
        class="modal-btn"
        type="primary"
        @dblclick.stop="caPost"
        @click.stop="caPost"
        >ca签名确认</el-button
       >
      </template>
    </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.passwordInput {
  -webkit-text-security: disc;
}
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
.ewm-box{
  position:relative;
  margin:0 auto;
  padding:0;
  text-align: center;
}
.qrcode {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    display: inline-block;
    img {
      width: 132px;
      height: 132px;
      background-color: #fff;
      padding: 6px;
    }
  }
</style>

<script>
import {
  GetUserList,
  verifyNewCaSign,
  nanfnagCaSign,
  zzwyVerifySign,
  zzwyVerifySignNoPw
} from "@/api/caCardApi";
import dayjs from "dayjs";
import bus from "vue-happy-bus";
import { verifyCaSign } from "@/api/ca-sign_wx.js";
import { getCaSignJmfy, verifyData,getTrustUserInfo } from "@/api/ca-sign_fuyou.js";
import moment from "moment";
import md5 from "md5";
import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import QRCode from "qrcodejs2";

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
      username: localStorage.caUser
        ? localStorage.caUser
        : localStorage && localStorage.user
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
      pw: false,
      dateTitle: "",
      aduitDate: "",
      showAduit: false,
      formData: null, //签名表单传过来的数据
      fuyouCaData: null,
      isCaSign: false,
      signType: 0,
      userNum: 0,
      isDoctor: false,
      aduitDateSheet: [
        "internal_eval_lcey",
        "critical_lcey",
        "critical_new_lcey",
        "critical2_lcey",
        "internal_eval_linyi",
        "critical_linyi",
        "internal_eval_weihai",
        "internal_eval_yz"
      ],
      activeSheetType: "",
      hasQrCaSignHos: ["fuyou", "hj","hzly", "guizhou", "zhzxy", "whsl","haudu"],
      caSignHasNoSignType: ["hj","hzly", "guizhou"],
      btnLoading: false,
      verifySignObj: {},
      SigndataObj: {},
      foshanshiyiIFca: false,
      caPassword: "", //zzwy口令
      zzwyNoHasCaSign: true, //zzwy 这次登录是否有ca签过名,没有就是true
      fromType: 'eval', //江门妇幼，表单区分默认评估单，评估单（eval），护记（record），交班志（changeShfit），护理计划单（planForm）
      // 花都CA扫描
      huaduCaSignIn:false,
      authoState:"0",//0：初始化，1：已获取二维码，2：二维码过期
      huaduSignTye:'',
      setIntervalItem:null,//定时器对象
      setIntervalApi:null,//轮训请求api对象
      setIntervalApiTime:10,
      commonTime:600,//默认倒数时间 10分钟=600秒
      signDataId:'',//签名数据id
	    userId:'',//用作后面扫码开启自动签接口中的入参
      activeName:'first',
      btnLoading:false,
    };
  },
  methods: {
    openWhhkCaSign(){
      window.openWhhkCaSignModal(true);
      this.close()
    },
    ishuaduCaSignIn(){
      console.log('hjm', localStorage.getItem('huaduCaSignIn'))
    },
    showSignBtn() {
      if (this.hasQrCaSignHos.includes(this.HOSPITAL_ID)) {
        return this.isCaSign;
      } else {
        return false;
      }
    },
    hasCaSign() {
      let flag =
        this.hasQrCaSignHos.includes(this.HOSPITAL_ID) &&
        this.fuyouCaData &&
        this.fuyouCaData.userName;
      // let flag = ['fuyou'].includes(this.HOSPITAL_ID)&& this.fuyouCaData && this.fuyouCaData.userName
      return !!flag;
    },
    open(
      callback,
      title,
      showDate = false,
      isHengliNursingForm,
      message = "",
      formData,
      type,
      doctorTure,
      sheetType,
      SigndataObj,
      verifySignObj,
      fromType = 'evel',
      aduitObj={
        showAduit:false,
        aduitDate:''
      }
    ) {
      //formData为表单数据
      console.log(
        callback,
        title,
        showDate,
        isHengliNursingForm,
        message,
        formData,
        type,
        doctorTure,
        sheetType,
        SigndataObj,
        verifySignObj,
        fromType,
        "open"
      );
      // 花都
      this.huaduCaSignIn=localStorage.getItem("huaduCaSignIn")?true:false
      if(this.huaduCaSignIn){
        this.huaduSignTye=localStorage.getItem("huaduSignTye")?localStorage.getItem("huaduSignTye"):''
        this.clearIntervalItem()
        this.huaduSignTye = localStorage.getItem('huaduSignTye') || ''

        if(this.huaduSignTye==''){
          // 如果是删除，就不用二维码
          this.getAuthorizeApi()
        }
      }

      if (["foshanrenyi"].includes(this.HOSPITAL_ID)) {
        GetUserList().then(
          res => {
            if (res.data.length == 0) {
              localStorage.removeItem("caUser");
              this.foshanshiyiIFca = false;
            } else {
              if (
                res.data.split("&&&")[0].split("||")[0] !=
                localStorage["caUser"]
              ) {
                localStorage.removeItem("caUser");
                this.foshanshiyiIFca = false;
              } else this.foshanshiyiIFca = true;
            }
            this.userNum++;
          },
          () => {
            this.username = JSON.parse(localStorage.user).empNo;
            this.ca_name = "";
            this.ca_isLogin = !!this.ca_name;
          }
        );
      }
      this.btnLoading = false;
      if (doctorTure) {
        this.isDoctor = doctorTure;
        this.isCaSign = false;
      } else {
        this.isDoctor = false;
        this.isCaSign = false;
      }
      if (["zhzxy"].includes(this.HOSPITAL_ID)) {
        let strTitlt = this.title + title,
          flag = true,
          arrDelete = ["删除", "取消"];
        arrDelete.forEach(item => {
          if (strTitlt.indexOf(item) > -1) flag = false;
        });
        if (flag && this.fuyouCaData && this.fuyouCaData.userName) {
          // this.isDoctor =true
          this.isCaSign = true;
        }
      }
      if (type) {
        let signType = { sign: "1", audit: "2", cancel: "3" };
        this.signType = signType[type];
      }
      if (sheetType) {
        if (this.aduitDateSheet.includes(sheetType)) {
          this.showAduit = true;
          this.activeSheetType = sheetType;
          this.aduitDate = moment().format("yyyy-MM-DD HH:mm");
        }
      }
      formData && (this.formData = formData); //设置表单数据
      fromType && (this.fromType = fromType); //设置表单类型
      this.initFuyouCaData();
      if(showDate){
        this.signDate = dayjs().format("YYYY-MM-DD HH:mm") || ""; //
        this.aduitDate=''
      }
      if(aduitObj.showAduit){
        this.aduitDate= aduitObj.aduitDate ?aduitObj.aduitDate: dayjs().format("YYYY-MM-DD HH:mm")
        this.signDate=''
      }
      if (isHengliNursingForm && title !== "删除验证") {
        if (title === "签名确认" && this.HOSPITAL_ID == "hengli") {
          showDate = true;
          this.showAduit = false;
          this.dateTitle = "记录时间";
        } else if (title === "审核签名确认" && this.HOSPITAL_ID == "hengli") {
          showDate = false;
          this.showAduit = true;
          this.dateTitle = "审核时间";
        } else {
          showDate = false;
          this.showAduit = false;
        }
      }
      this.title1 = "";
      title && (this.title1 = title);
      if (!["foshanrenyi"].includes(this.HOSPITAL_ID)) {
        this.username =
          localStorage && localStorage.user
            ? JSON.parse(localStorage.user).empNo
            : "";
        this.ca_name = window.ca_name;
        this.ca_isLogin = window.ca_isLogin;
      }
      this.callback = callback;
      if (this.HOSPITAL_ID == "foshanrenyi") {
        this.verifySignObj = verifySignObj;
        this.SigndataObj = SigndataObj;
      } else if (["nanfangzhongxiyi", "zhzxy"].includes(this.HOSPITAL_ID)) {
        this.verifySignObj = verifySignObj;
      }
      this.pw = false;

      // 如果已经是ca签名的情况下 点开签名弹窗 默认开启ca签名
      if (["hj", "hzly"].includes(this.HOSPITAL_ID)) {
        if (this.fuyouCaData && this.fuyouCaData.userName) {
          this.isCaSign = true;
          this.pw = true;
        }
      }
      // 如果已经是ca签名的情况下 点开签名弹窗 默认开启ca签名
      if (["fuyou"].includes(this.HOSPITAL_ID)) {
        if (this.fuyouCaData && this.fuyouCaData.userName && !this.$route.path.includes('shiftWork')) {
          this.isCaSign = true;
          this.pw = true;
        }
      }

      this.showDate = showDate;
      this.showAduit = aduitObj.showAduit;
      // this.showMessage = showMessage;
      this.message = message;
      this.password = "";
      this.$refs.modalName.open();
      if (!["foshanrenyi", "weixian",'huadu'].includes(this.HOSPITAL_ID)) {
        this.$nextTick(() => {
          if (showDate) {
            let dateInput = this.$refs.dateInput.querySelector("input");
          }
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
    close() {
      this.caPassword = "";
      this.isDoctor = false;
      this.showAduit = false;
      this.activeSheetType = "";
      this.formData = null;
      if(['huadu'].includes(this.HOSPITAL_ID)){
        this.clearIntervalItem()
      }
      this.$refs.modalName.close();
    },
    setCloseCallback(closeCallback) {
      this.$refs.modalName.setCloseCallback(closeCallback);
    },
    post() {
      this.btnLoading = true;
      this.setCloseCallback(null);
      if (["foshanrenyi", "weixian"].includes(this.HOSPITAL_ID)) {
        if (this.pw) {
          if (this.password == "") {
            return this.$message({
              message: "请输入密码",
              type: "warning",
              showClose: true
            });
          }
          this.$refs.modalName.close();
          let requestPW =
            this.HOSPITAL_ID == "foshanrenyi" && this.password != "Bcy@22qw"
              ? md5(this.password)
              : this.password;
          if (this.signDate) {
            return this.callback(requestPW, this.username, this.signDate);
          } else {
            return this.callback(requestPW, this.username);
          }
          parent.app.bus.$emit("assessmentRefresh");
        } else {
          if (!["foshanrenyi"].includes(this.HOSPITAL_ID)) {
            verifyCaSign().then(res => {
              this.$refs.modalName.close();
              let { password, empNo } = res.data;
              let username =
                this.HOSPITAL_ID == "foshanrenyi" ? empNo : this.username;
              // let username = this.username
              let pwd =
                this.HOSPITAL_ID == "foshanrenyi" ? password : localStorage.ppp;
              // let pwd = localStorage.ppp
              if (this.signDate) {
                return this.callback(
                  pwd,
                  // random,
                  username,
                  this.signDate,
                  res.random
                );
              } else {
                return this.callback(pwd, username);
              }
            });
          } else {
            this.$refs.modalName.close();
            verifyNewCaSign(this.SigndataObj, this.verifySignObj).then(
              verifyNewCaSignRes => {
                const { password, empNo } = verifyNewCaSignRes;
                if (this.signDate) {
                  return this.callback(
                    password,
                    // random,
                    empNo,
                    this.signDate
                  );
                } else return this.callback(password, empNo);
              },
              err => {
                if (
                  err == "ca证书还未登录，请先登录！" ||
                  err == "请用密码验证！"
                )
                  return this.$message.error(err);
                this.username = JSON.parse(localStorage.user).empNo;
                if (this.signDate) {
                  return this.callback(
                    localStorage.ppp,
                    // random,
                    this.username,
                    this.signDate
                  );
                } else {
                  return this.callback(localStorage.ppp, this.username);
                }
              }
            );
          }
        }
      } else if (["zzwy"].includes(this.HOSPITAL_ID)) {
        this.turnToDealzzwy();
      } else {

        if (this.password == "" && !this.nanfangCa) {
          this.$message({
            message: "请输入密码",
            type: "warning",
            showClose: true
          });
          return (this.btnLoading = false);
        }
        if (["nanfangzhongxiyi"].includes(this.HOSPITAL_ID)) {
          const nanFangcaToken = localStorage["nanFangcaToken"] || "";
          const nanFangcaLogin = localStorage["nanFangcaLogin"] || "";
          nanfnagCaSign(
            this.username,
            this.password,
            this.verifySignObj,
            nanFangcaToken,
            nanFangcaLogin
          ).then(
            res1 => {
              this.$refs.modalName.close();
              let password = res1.data.data.password;
              if (this.isDoctor) {
                return this.callback(password, this.username);
              }
              // 执行这个逻辑
              // if(this.aduitDate!=''&&this.aduitDateSheet.includes(this.activeSheetType)){
              //     this.showAduit=false
              //     this.activeSheetType=""
              //     return this.callback(this.password, this.username, this.aduitDate);
              // }
              if (this.signDate) {
                return this.callback(password, this.username, this.signDate);
              } else {
                return this.callback(password, this.username);
              }
            },
            err => {
              this.$message.error(err);
            }
          );
        } else {
          this.$refs.modalName.close();
          if (this.aduitDate != "" && this.HOSPITAL_ID == "hengli") {
            return this.callback(
              this.password,
              this.username,
              (this.signDate = ""),
              this.aduitDate
            );
          }
          if (this.isDoctor) {
            return this.callback(this.password, this.username);
          }
          // 执行这个逻辑
          if (
            this.aduitDate != "" &&
            this.aduitDateSheet.includes(this.activeSheetType)
          ) {
            this.showAduit = false;
            this.activeSheetType = "";
            return this.callback(this.password, this.username, this.aduitDate);
          }
          if (this.signDate) {
            let requestPW =
              this.HOSPITAL_ID == "zhzxy" && this.password != "Bcy@23nr"
                ? md5(this.password)
                : this.password;
            return this.callback(requestPW, this.username, this.signDate);
          } if(this.aduitDate){
            let requestPW =
              this.HOSPITAL_ID == "zhzxy" && this.password != "Bcy@23nr"
                ? md5(this.password)
                : this.password;
            return this.callback(requestPW, this.username, this.aduitDate);
          }else {
            return this.callback(this.password, this.username);
          }
        }
      }
    },
    /**处理漳州五院的签名，登录首次签名需要口令，其它不需要口令 */
    turnToDealzzwy() {
      if (this.zzwyNoHasCaSign) {
        // 没有签过名,要口令
        if (this.caPassword == "") {
          this.$message({
            message: "请输入口令",
            type: "warning",
            showClose: true
          });
          return (this.btnLoading = false);
        }
        zzwyVerifySign({
          empNo: this.username,
          password: this.caPassword
        })
          .then(res => {
            // console.log(res.data.data.password)
            if (res.data.data.resultCode == "0") {
              localStorage.setItem("zzwyHasCaSign", "1");
              // 口令正确 保存数据
              this.$refs.modalName.close();
              if (this.signDate) {
                return this.callback(
                  res.data.data.password,
                  this.username,
                  this.signDate
                );
              } else {
                return this.callback(res.data.data.password, this.username);
              }
            } else {
              this.$message({
                message: "口令错误，请重试",
                type: "error",
                showClose: true
              });
            }
            this.btnLoading = false;
          })
          .catch(err => {
            this.btnLoading = false;
          });
      } else {
        // debugger
        // 不需要口令
        zzwyVerifySignNoPw({
          empNo: this.username
        })
          .then(res => {
            // console.log(res.data.data.password)
            if (res.data.data.resultCode == "0") {
              // 保存数据
              this.$refs.modalName.close();
              if (this.signDate) {
                return this.callback(
                  res.data.data.password,
                  this.username,
                  this.signDate
                );
              } else {
                return this.callback(res.data.data.password, this.username);
              }
            } else {
              this.$message({
                message: "数据错误",
                type: "error",
                showClose: true
              });
            }
            this.btnLoading = false;
          })
          .catch(err => {
            this.btnLoading = false;
          });
      }
    },
    openCaSignModal() {
      window.openCaSignModal();
      this.$refs.modalName.close();
    },
    //江门妇幼ca签名
    caPost() {
      if (!this.formData) return false;
      let parmas = {
        signType: this.signType,
        patientName: this.formData.patientName, //-- 患者名称
        patientSex: this.formData.sex, // -- 患者性别
        patientCardType: "QT", //-- 患者证件类型
        openId: this.fuyouCaData.openId, // -- 当前用户唯一标识
        patientAge: this.formData.age, //-- 患者年龄
        patientCard: "", // -- 患者证件号
        templateId: "hash", //-- 模板id
        formId: `${this.formData.id}`, // -- 表单ID
        subject: `${this.formData.formTitle}` // -- 表单名称
      };
      if (this.caSignHasNoSignType.includes(this.HOSPITAL_ID)) {
        parmas = {
          accessToken: sessionStorage.getItem("accessToken"),
          userId: this.fuyouCaData.userId,
          formId: `${this.formData.id}`,
          transactionId: this.fuyouCaData.transactionId,
          authKey: this.fuyouCaData.authKEY,
          fileName: `${this.formData.name}_${this.formData.code}`
        };
      }
      if (["fuyou"].includes(this.HOSPITAL_ID)) {
        parmas.type = this.fromType;
        if(this.fromType == 'record'){
          parmas.formId = `${this.formData.blockId}`;
          parmas.recordDate = this.formData.recordDate;
          parmas.recordCode = this.formData.recordCode;
          parmas.data = {...this.formData};
        }else if(this.fromType == 'planForm'){
          parmas.data = {...this.formData};
        }
      }
      if (["zhzxy"].includes(this.HOSPITAL_ID) && this.verifySignObj.openId) {
        parmas = this.verifySignObj;
      }
      if (["zhzxy"].includes(this.HOSPITAL_ID)) {
        parmas.formId = parmas.formId || moment().format("X");
      }
      getCaSignJmfy(parmas)
        .then(async res => {
          let aduitDate = ["zhzxy"].includes(this.HOSPITAL_ID)
            ? ""
            : "isCaSign";
          let pwd = "";
          if (["zhzxy"].includes(this.HOSPITAL_ID)) {
            pwd = res.data.data.password;
          }
          let username = "";
          if (this.caSignHasNoSignType.includes(this.HOSPITAL_ID)) {
            let fileCode = res.data.data.data.fileCode;
            aduitDate = ["hj","hzly"].includes(this.HOSPITAL_ID)
              ? dayjs().format("YYYY-MM-DD HH:mm")
              : "";
            let hjRes = await verifyData(
              sessionStorage.getItem("accessToken"),
              fileCode,
              parmas.userId
            );
            if (hjRes.data.code != 200)
              return this.$message({
                type: "error",
                message: hjRes.data.desc
              });
            pwd = hjRes.data.data.password;
            username = hjRes.data.data.empNo;
          }
          this.$message({
            type: "success",
            message: res.data.desc
          });
          this.close();
          return this.callback(
            pwd || localStorage.ppp,
            username || this.username,
            aduitDate
          );
        })
        .catch(error => {
          this.close();
        });
    },
    //初始化江门妇幼签名数据
    initFuyouCaData() {
      //window.localStorage.setItem("fuyouCaData"
      this.fuyouCaData = window.localStorage.getItem("fuyouCaData")
        ? JSON.parse(window.localStorage.getItem("fuyouCaData"))
        : null;
    },
    //打开ca签名
    openFuyouCaSignModal() {
      window.openFuyouCaSignModal(true);
    },
    openHjCaSignModal() {
      window.openHjCaSignModal(true);
    },
    //清除信息
    clearIntervalItem(){
      clearInterval(this.setIntervalItem)
      this.setIntervalItem=null;
      this.authoState='0';
      clearInterval(this.setIntervalApi)
      this.setIntervalApi=null;
      this.signDataId = ''
      if(this.$refs.qrcodeContainer){
        this.$refs.qrcodeContainer.innerHTML = ''//销毁二维码实例
      }
    },
    //获取授权二维码
    getAuthorizeApi() {
      this.clearIntervalItem()
      axios.post(`${apiPath}manufactor/whhk/startAutoSign`,
      { "empNo": JSON.parse(localStorage.getItem("user")).empNo}).then(res=>{
        console.log('res',res)
        let qrcode = new QRCode(this.$refs.qrcodeContainer, {
        width: 180,// 二维码的宽
        height: 180,// 二维码的高
        //text: this.userName + " " + this.passWord , // 二维码的内容
        text: res.data.data.qrCode , // 二维码的内容
        colorDark: '#000',// 二维码的颜色
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H,//容错级别
      })
	  	this.signDataId = res.data.data.signDataId

		  this.userId = res.data.data.userId
	  	this.authoState='1'
          this.startSetIntervalItem();
		  //启动轮询
      this.startRotationApi()
      }).catch(err=>{

      })
    },
    //启动倒数定时器
    startSetIntervalItem(){
      this.timeDate=this.commonTime;
      this.setIntervalItem=setInterval(()=>{
          if(this.timeDate>0){
              this.timeDate--
          }else {
            clearInterval(this.setIntervalItem)
            this.setIntervalItem=null;
            this.authoState='2'
          }
      },1000)
    },
   //启动轮询定时器
    startRotationApi(){
      clearInterval(this.setIntervalApi)
      this.setIntervalApi=null;
      this.setIntervalApiTime=this.commonTime;
      this.setIntervalApi=setInterval(()=>{
          if(this.setIntervalApiTime>0){
              this.getTrustUserInfoApi()
              this.setIntervalApiTime=this.setIntervalApiTime-2;
          }else {
            clearInterval(this.setIntervalApi)
            this.setIntervalApi=null;
          }
      },5000)
    },
    ////数字信息授权获取用户信息
    getTrustUserInfoApi(){
      getTrustUserInfo({signDataId:this.signDataId}).then(res=>{
          //授权成功
            if(res.data.data.jobStatus=='EXPIRE' || res.data.data.jobStatus=='REVOKE' || res.data.data.jobStatus=='REFUSE'){
              this.$message({
                type: "error",
                message: "扫码失败，二维码无效或者被客户端拒绝！"
              });
              this.authoState='2'
              //清除轮询定时器
              clearInterval(this.setIntervalApi)
              this.setIntervalApi=null;
              setTimeout(() => {
                clearInterval(this.setIntervalItem)
                this.setIntervalItem=null;
                this.authoState='0'
                // this.close(true)
              }, 5000);
            }else if(res.data.data.jobStatus=='FINISH'){
              this.$message({
                type: "success",
                message: 'CA签名认证成功'
              });
              // 就是成功 开启自动签名
              this.turnToSign()
              //清除轮询定时器
              clearInterval(this.setIntervalApi)
              this.setIntervalApi=null;
              setTimeout(() => {
                clearInterval(this.setIntervalItem)
                this.setIntervalItem=null;
                this.authoState='0'
                // this.close(true)
              }, 1000);
            }
        //   }
      }).catch(error=>{
        console.log(error);
        this.close(true)
        if(error.code!=200){
         this.$message({
            type: "info",
            message: error.data.desc
         });
         clearInterval(this.setIntervalApi)
         this.setIntervalApi=null;
        }
      })
    },
     /**扫码签名 */
    turnToSign(){
      axios.post(`${apiPath}manufactor/whhk/autoSign`,
      { "signToken":this.signDataId || localStorage.getItem('signDataId'),empNo:JSON.parse(localStorage.getItem("user")).empNo }).then(res=>{
        if(res.data.code=='200'){
          // 签名成功
          if(!localStorage.getItem('huaduSignTye')){
            this.huaduSignTye='qrcode'
            localStorage.setItem('signDataId',this.signDataId)//这个很重要
            localStorage.setItem('huaduSignTye','qrcode')
          }
          // 口令正确 保存数据
          this.$refs.modalName.close();
          this.close()
          this.clearIntervalItem()
            if (this.signDate) {
            return this.callback(
              res.data.data.password || 'Bcy@22qw',
              this.username,
              this.signDate,
            );
            } else {
            return this.callback(res.data.data.password || 'Bcy@22qw', this.username);
            }
        }
      }).catch(err=>{

      })
    },
    setCloseCallback(closeCallback) {
      this.$refs.modalName.setCloseCallback(closeCallback);
    },
    huaduCaPost() {
      this.btnLoading = true
      this.setCloseCallback(null);
      this.turnToSign()
    },
  },
  watch: {
    isCaSign(val) {
      this.pw = val;
    },
    userNum: {
      handler(newVal, oldVal) {
        if (this.foshanshiyiIFca) {
          this.username =
            localStorage && localStorage.caUser
              ? localStorage.caUser
              : JSON.parse(localStorage.user).empNo;
          this.ca_name = localStorage.caUser ? localStorage.caUser : "";
          this.ca_isLogin = !!this.ca_name;
        } else {
          this.username = JSON.parse(localStorage.user).empNo;
          this.ca_name = "";
          this.ca_isLogin = !!this.ca_name;
        }
      }
    }
  },
  computed: {
    nanfangCa: {
      get() {
        return localStorage["nanFangcaLogin"] || false;
      }
    }
  },
  mounted() {
    //初始化江门妇幼签名数据
    this.initFuyouCaData();
  },
  beforeDestroy() {
    this.fuyouCaData = null;
    this.caPassword = "";
    this.isDoctor = false;
  },
  components: {}
};
</script>
