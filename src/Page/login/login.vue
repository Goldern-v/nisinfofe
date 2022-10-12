<template>
  <div>
    <div class="login-bg" v-loading="loginLoading">
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
            <div class="toggle-login-type" v-if="HOSPITAL_ID == 'zhongshanqi'">
              <div class="img" @click="toggleLoginType">
                <img
                  src="../../common/images/login_pwd.png"
                  alt=""
                  v-show="!showPwdType"
                />
                <img
                  src="../../common/images/login_qrcode.png"
                  alt=""
                  v-show="showPwdType"
                />
              </div>
              <div class="qrcode" v-show="!showPwdType">
                <img src="../../common/images/qrcode_zsq.png" alt="" />
              </div>
            </div>
          <div>
            <div class="logo-con">
              <img :src="logoUrl" height="63" width="63" />
            </div>
            <h1 class="name" v-html="logoName"></h1>
          </div>
          <div :style="[{overflow:HOSPITAL_ID == 'nanfangzhongxiyi'?'hidden':''},translate300COM,translateTypeCOM]">
            <div class="nanfangCa-Box" v-if="HOSPITAL_ID == 'nanfangzhongxiyi'">
              <div class="nanfangCa-choseline"><div class="translateType"></div></div>
              <div class="nanfangCa-con" @click="(e)=>changeLoginType(false,e)">密码登录</div>
              <div class="nanfangCa-con" @click="(e)=>changeLoginType(true,e)">ca扫码登录</div>
            </div>
            <div class="tranSlate-300" :class="{'nanfangCa-loginBox':HOSPITAL_ID == 'nanfangzhongxiyi'}">
              <div :class="{'nanfangCa-Boxx':HOSPITAL_ID == 'nanfangzhongxiyi'}">
                <div class="input-con">
                  <input type="text" :disabled="caLoginFlag" placeholder="用户名" v-model="account" />
                  <img src="../../common/images/account.png" height="14" width="14" />
                </div>
                <div class="input-con">
                  <input
                    type="password"
                    style="border-top: 0"
                    :placeholder="caLoginFlag?'证书密码':'密码'"
                    v-model="password"
                  />
                  <img
                    src="../../common/images/password.png"
                    height="14"
                    width="14"
                  />
                </div>
                <div class="input-con" v-if="showVerification && !caLoginFlag">
                  <input
                    type="password"
                    style="border-top: 0; width: 170px"
                    placeholder="验证码，单击图片刷新"
                    v-model="verificationCode"
                  />
                  <img
                    src="../../common/images/verificationCode.png"
                    height="14"
                    width="14"
                  />
                  <div class="verificationImg">
                    <img
                      :src="verificationImg"
                      alt=""
                      @click="refreshImg"
                      style="cursor: pointer"
                    />
                  </div>
                </div>
                <div class="remember-con">
                  <el-checkbox v-model="remember" v-if="!caLoginFlag">
                    <span style="font-size: 13px; color: #687179">记住账号</span>
                  </el-checkbox>
                  <button
                    v-if="!caLoginFlag"
                    style="background-color: #fff; float: right; border: 0"
                    @click="toReset()"
                  >
                    重置密码
                  </button>
                </div>
                <button v-if="!caLoginFlag" v-touch-ripple class="login-btn" @click="login">
                  {{ !ajax ? "登录系统" : "登录中..." }}
                </button>
                <button v-if="caLoginFlag" v-touch-ripple class="login-btn" @click="login">
                  {{ !ajax ? "证书登录" : "登录中..." }}
                </button>
              </div>
              <div class="nanfangCa-Boxx" v-if="HOSPITAL_ID == 'nanfangzhongxiyi'">
                <img alt="" :src="'data:text/html;base64,'+qrCodeBase64"  />
              </div>
            </div>
          </div>
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
  .nanfangCa-loginBox{
    display:flex;
    width:600px;
    transition:all 0.4s;
    &.tranSlate-300{
      // transform: translateX(-300px);
      transform:var(--translate300);
    }
  }
  .nanfangCa-Boxx{
    width:50%;
    flex:1;
    min-height:302px;
    >img{
      width :100%;
      height:100%;
    }
  }
  .nanfangCa-Box{
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: space-between;
    position :relative;
    .nanfangCa-choseline{
      position :absolute;
      bottom :5px;
      width :100%;
      left :0;
      height:5px;
      background :#d0d6db;
      >div{
        height: 100%;
        width: 50%;
        background:#79c09e;
        &.translateType{
          transform:var(--translateType);
        }
      }
    }
    .nanfangCa-con{
      flex: 1;
      width: 50%;
      padding-bottom: 20px;
      cursor: pointer;
      position relative;
      
    }

  }

  .toggle-login-type {
    .img {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      z-index: 1001;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .qrcode {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1000;
      width: 100%;
      height: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 164px;
        height: 164px;
      }
    }
  }
}

.logo-con {
  height: 63px;
  // width: 63px;
  margin: 24px auto 19px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    -webkit-object-fit: contain;
    -moz-object-fit: contain;
    -ms-object-fit: contain;
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

  .verificationImg {
    width: 90px;
    height: 37px;
    position: absolute;
    top: 0;
    right: 0;

    img {
      width: 80px;
      height: 37px;
    }
  }
}

.remember-con {
  width: 260px;
  margin: 13px auto 26px;

  button {
    cursor: pointer;
  }
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
    left: 130px;
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
</style>

<script>
import { login, hisLogin } from "@/api/login";
import { GetUserList,caLoginBefore,caLoginLater,verifyUser,
  SOF_SignData,SOF_VerifySignedData,SOF_Login,SOF_ExportUserCert,
  genRandom,GetAllUkeyList,getRandomQrCode,getQrCodeStatus } from "@/api/caCardApi";
import Cookies from "js-cookie";
import EnterToTab from "@/plugin/tool/EnterToTab.js";
import md5 from "md5";
import { mapMutations } from "vuex";
const CryptoJS = require("crypto-js");
const SecretKey = "chenrui2020";

let logintimer = null;
let uselogin =null
let nanfanImgtimer= null
export default {
  data() {
    return {
      account: "",
      password: "",
      verificationCode: "", //验证码
      remember: true,
      ajax: false,
      showPwdType: true, //显示的登录方式，默认是密码
      loginLoading: false,
      checkCa:false, //判断是否已经插入了ukey
      strRandom:"",
      useCaList:['foshanrenyi'],
      UkeyObj:{}, //保存ukeys里面的信息
      caLoginFlag:false, //拿来区分是不是ukey登录，要区分checkCa
      showVerification: false, //展示验证码
      verificationImg: "", //验证码图片base64
      md5HisList: ["foshanrenyi","hengli",'sdlj'], //需要md5加密医院
      BeiHaiCaloginType:false, //false 密码登录 true ca扫码登录
      translate300:'translateX(0px)',
      translateType:"translateX(0)",
      qrCodeBase64:"",
      qrCodeIdentity:"",
      nanfangTime:0
    };
  },
  methods: {
    ...mapMutations("common", ["setUser"]),
    //刷新验证码图片
    refreshImg() {
      login(this.account, this.password, "", true).then((res) => {
        this.verificationImg = res.data.data;
      });
    },
    changeLoginType(typeFlag,e){
      if(typeFlag){
        this.translate300='translateX(-300px)' 
        this.translateType ="translateX(100%)"
      }else{
        this.translate300='translateX(0)'
        this.translateType ="translateX(0)"
      } 
      console.log(e,this.translate300,typeFlag,"this.translate300")
    },
    async login(type) {
      console.log("type",type)
      if (!(this.account && this.password)) {
        //          如果空
        this.$message({
          showClose: true,
          message: "请填写账号和密码！",
          type: "warning",
        });
        return;
      }
      if (this.showVerification && !this.verificationCode) {
        //          如果空
        this.$message({
          showClose: true,
          message: "请填写验证码！",
          type: "warning",
        });
        return;
      }
      //        阻止重新登录
      if (this.ajax === true) return;
      this.ajax = true;
      let password = this.password;
      this.md5HisList.includes(this.HOSPITAL_ID) &&
        this.password !== "Bcy@22qw" && 
        !this.caLoginFlag &&
        (password = md5(this.password));
      // login(this.account, this.password, this.verificationCode)
      // login前先执行his校验 by谢岗
        uselogin = login;
      if (this.HOSPITAL_ID == "xiegang") {
        uselogin = hisLogin;
        try {
          console.log('testOnly-1')
          const res = await hisLogin({
            empNo: this.account,
            password: password,
            code:  this.verificationCode
          })
          if(res.data.code==200) {
            // this.$message.error(res.data.desc)
            this.loginSucceed(res,type)
            this.ajax = false
          }else {
            this.$message.error(res.data.desc)
            this.ajax = false
            return
          }
          // if (!(res && res.status === 200 && res.data.indexOf('0')> -1)) {
          //   this.$message.error("请重新登录");

          // }
        } catch (e) {
          console.log('e',e);
          this.$message.error("请重新登录");
          this.ajax = false
          return
        }
      }
      //是否切换到了ca登录
      if(this.caLoginFlag){
        if(['foshanrenyi'].includes(this.HOSPITAL_ID)) uselogin=verifyUser
        console.log("logincaLoginFlag",this.UkeyObj)
        const strCertId = this.UkeyObj.substring(this.UkeyObj.indexOf("||")+2,this.UkeyObj.length).replace("&&&", "");
        const strPassword = password
        caLoginLater(strCertId,strPassword,this.strRandom).then(caLoginLaterRes=>{
          this.loginIn(caLoginLaterRes,type,true)
        },err=>{
            this.$message.error(err)
        })
      }else{
        let loginOBJ = {empNo:this.account,password, code:this.verificationCode}
        this.loginIn(loginOBJ,type)
      }
    },
    loginIn(loginOBJ,type,ifCA){
        uselogin(loginOBJ)
          .then((res) => {
            //登录后停止轮询
            clearInterval(logintimer);
            if(ifCA){
              localStorage["caUser"] = this.account;
            }
            // 记住账号
            if (this.remember) {
              localStorage["rememberAccount"] = this.account;
            }
            this.ajax = false;
            // let regexp = new RegExp("^(?![A-Za-z0-9]+$)(?![a-z0-9\\W]+$)(?![A-Za-z\\W]+$)(?![A-Z0-9\\W]+$)[a-zA-Z0-9\\W]{8,}$") 
            let regexp = new RegExp("^(?![A-Z]*$)(?![a-z]*$)(?![0-9]*$)(?![^a-zA-Z0-9]*$)\\S{8,}$")
            if (['sdlj','hengli'].includes(this.HOSPITAL_ID) && !regexp.test(this.password)) {
              this.$message({
                showClose: true,
                message: "当前登录密码强度较弱，请修改密码后登录!",
                type: "warning",
              });
              this.$router.push('/resetpassword')
              return
            }
            this.loginSucceed(res,type)
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
            } else if (res.data.errorCode == "301") {
              this.showVerification = true;
              this.verificationImg = res.data.data;
            } else if (res.data.errorCode == "403") {
              this.refreshImg();
            }
          });
    },
    loginSucceed(res,type) {
      clearInterval(nanfanImgtimer);
      // 存下token 和用户信息 Auth-Token-Nursing
      let user = res.data.data.user;
      user.token = res.data.data.authToken;
      window.app.authToken = res.data.data.authToken;
      localStorage["ppp"] = this.password;
      localStorage.setItem("user", JSON.stringify(res.data.data.user));
      this.setUser(res.data.data.user || {});
      localStorage["adminNurse"] = res.data.data.adminNurse;
      Cookies.remove("NURSING_USER");
      //清除江门妇幼ca
      localStorage.removeItem("fuyouCaData");
      Cookies.set(
        "NURSING_USER",
        `${res.data.data.user.id}##${res.data.data.authToken}`,
        {
          path: "/",
        }
      );
      this.loginLoading = false;
      if (
        this.$store.state.common.relogin &&
        this.$store.state.common.relogin != "/login"
      ) {
        this.$router.push(this.$store.state.common.relogin);
      } else if (
        user &&
        user.roleManageCodeList.length > 0 &&
        type == "loginReportedSystem"
      ) {
        this.$router.push("/badEvent");
      } else {
        this.$store.commit("common/upRelogin", false);
        this.$router.push("/index");
        if (["weixian"].includes(this.HOSPITAL_ID)) {
          /** 验证证书 */
          window.openCaSignModal();
        } else if (["fuyou"].includes(this.HOSPITAL_ID)) {
          window.openFuyouCaSignModal();
        } else if (["hj", "guizhou"].includes(this.HOSPITAL_ID)) {
          window.openHjCaSignModal();
        }
      }
      // 清除科室记录
      this.$store.commit("upDeptCode", "");
      localStorage.selectDeptValue = "";
      this.$store.commit("upDeptName", "");
    },
    toReset() {
      this.$router.push("/resetPassword");
    },
    // 切换登录方式（二维码只供展示，暂不做登录处理）
    toggleLoginType() {
      this.showPwdType = !this.showPwdType;
    },
    //对字符串进行加密
    compileStr(code) {
      return CryptoJS.AES.encrypt(code, SecretKey).toString();
    },
    //字符串进行解密
    uncompileStr(code) {
      return CryptoJS.AES.decrypt(code, SecretKey).toString(CryptoJS.enc.Utf8);
    },
  },
  created() {
    if (localStorage["rememberAccount"]) {
      this.account = localStorage["rememberAccount"];
    }
    if (this.HOSPITAL_ID == "guizhou" && this.$route.query.formatInfo) {
      this.loginLoading = true;
      try {
        let formatInfo = JSON.parse(
          this.uncompileStr(decodeURIComponent(this.$route.query.formatInfo))
        );

        if (
          !formatInfo.timeset ||
          new Date().getTime() - formatInfo.timeset > 300000
        ) {
          this.$router.replace("/login");
          this.$message.error("登录超时，已取消自动登录");
          return;
        }

        this.account = formatInfo.empNo || "admin";
        this.password = formatInfo.password;
        this.login("loginReportedSystem");
      } catch (e) {
        this.$router.replace("/login");
        this.$message.error("登录信息错误，已取消自动登录");
        console.error(e);
      }
    } 
    if(['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)){
        clearInterval(nanfanImgtimer);
        nanfanImgtimer = setInterval(() => {
          this.nanfangTime = ++this.nanfangTime
          getQrCodeStatus(this.qrCodeIdentity,"0").then(getQrCodeStatusRes=>{
            console.log(getQrCodeStatusRes,"getQrCodeStatusRes")
            if(getQrCodeStatusRes.data.data.user){
              localStorage.setItem("nanFangcaToken",getQrCodeStatusRes.data.data.caToken)
              localStorage.setItem("nanFangcaLogin",true)
              this.$message.success("CA扫码登陆成功")
              this.loginSucceed(getQrCodeStatusRes)
            }
          },()=>{
            console.log("111111111111")
          })
        },1000)
    }
    if(this.useCaList.includes(this.HOSPITAL_ID)){
      clearInterval(logintimer);
       logintimer = setInterval(() => {
          GetUserList().then(res=>{
              console.log("GetUserListres",res)
            if(res.data.length>0){
              this.UkeyObj = res.data
              this.checkCa = true
            }else{
              this.checkCa = false
            }
          })
      }, 1500);
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
    translate300COM(){
       return {
        "--translate300": this.translate300
      };
    },
    translateTypeCOM(){
       return {
        "--translateType": this.translateType
      };
    },
    logoUrl() {
      switch (this.HOSPITAL_ID) {
        case "hj":
          return require("../../common/images/login_logo_hj.png");
        case "zhongshanqi":
          return require("../../common/images/logo_zhongshanqi.png");
        case "quzhou":
          return require("../../common/images/logo_quzhou.png");
        case "huadu":
          return require("../../common/images/logo_huadu.png");
        case "guizhou":
          return require("../../common/images/logo_guizhou.png");
        case "nanfangzhongxiyi":
          return require("../../common/images/logo_nanfangzhongxiyi.png");
        case "xiegang":
          return require("../../common/images/logo_xiegang.png");
        case "whfk":
          return require("../../common/images/logo_whfk.png");
        case "liaocheng":
          return require("../../common/images/login_liaocheng.png");
        case "wujing":
          return require("../../common/images/logo_wujing.png");
        case "liaocheng":
          return require("../../common/images/logoBack.png");
        case "foshanrenyi":
          return require("../../common/images/foshan_logo.png");
        case "lyxrm":
          return require("../../common/images/lyxrm_logo.png");
        case "fsxt":
          return require("../../common/images/fsxt_logo.png");
        default:
          return require("../../common/images/logo.png");
      }
    },
    logoName() {
      let logoName = "百辰源智慧护理信息系统";
      if (
        this.HOSPITAL_ID == "hj" ||
        this.HOSPITAL_ID == "zhongshanqi" ||
        this.HOSPITAL_ID == "nanfangzhongxiyi" ||
        this.HOSPITAL_ID == "huadu" ||
        this.HOSPITAL_ID == "xiegang"
      ) {
        logoName = `${this.HOSPITAL_NAME}<br />智慧护理信息系统`;
      } else if (
        this.HOSPITAL_ID == "guizhou" ||
        this.HOSPITAL_ID == "liaocheng" ||
        this.HOSPITAL_ID == "lingcheng" ||
        this.HOSPITAL_ID == "wujing" ||
        this.HOSPITAL_ID == "foshanrenyi" ||
        this.HOSPITAL_ID == "fsxt"
      ) {
        logoName = "智慧护理信息系统";
      } else if (this.HOSPITAL_ID == "quzhou") {
        logoName = "宸瑞普惠智慧护理信息系统";
      }
      return logoName;
    },
  },
  components: {},
  watch: {
    checkCa:{
      handler(newVal, oldVal) {
        if(newVal){
          caLoginBefore().then(caLoginFunRes=>{
            console.log(caLoginFunRes,"caLoginFunRes")
            this.strRandom = caLoginFunRes
            this.caLoginFlag = true
            this.account = this.UkeyObj.split("||")[0]
            this.password = ""
            console.log(caLoginFunRes,"caLoginFunRes")
          },err=>{
            this.$message.error(err)
            clearInterval(logintimer);
          })
        }else{
          this.caLoginFlag = false
          this.account = ""
          this.password = ""
        }
        },
      immediate: true
    },
    nanfangTime:{
      handler(newVal) {
        if(newVal){
          console.log("nanfangTime",newVal)
          if(newVal==1 || newVal%120==0){
            getRandomQrCode().then(getRandomQrCodeRes=>{
              this.qrCodeBase64 = getRandomQrCodeRes.data.data.qrCodeBase64
              this.qrCodeIdentity = getRandomQrCodeRes.data.data.qrCodeIdentity
              console.log(getRandomQrCodeRes,"getRandomQrCodeRes")
            })
          }
        }
      },
      immediate: true
    },
    password() {
      if (this.HOSPITAL_ID == "zhongshanqi") {
        this.password = this.password.slice(0, 16);
      }
    },
  },
};
</script>
