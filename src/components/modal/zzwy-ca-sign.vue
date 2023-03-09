<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modal"
    size="small"
    title="登录验证"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
    @close="clearIntervalItem"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="CA认证" name="first">
        <figure class="ewm-box" v-if="ewmBaseData && ewmBaseData!==''">
          <img alt="" :src="'data:text/html;base64,'+ewmBaseData" class="ewm-icon" />
        </figure>
        <!-- <div class="info-box1" v-if="authoState==='1'">请在<span class="info-p1">{{timeDate}}S</span>内完成扫码</div> -->
        <div class="info-box2"  v-if="authoState==='2'">二维码已过期</div>
        <div style="height: 20px"></div>
        
      </el-tab-pane>
      <el-tab-pane label="证书认证" name="second">
        <span>
          <p for class="name-title">证书账号</p>
          <div action class="sign-input" ref="userInput">
            <el-input size="small" type="text" placeholder="请输入账号" v-model="username"></el-input>
          </div>
        </span>
        <div style="height: 5px"></div>
        <p for class="name-title">证书口令</p>
        <div ref="passwordInput">
          <el-input size="small" type="text" placeholder="请输入口令" v-model="password"></el-input>
        </div>
        <div style="height: 20px"></div>
        <!-- <div slot="button">
          <el-button class="modal-btn" @click.stop="close">取消</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="post">确认</el-button>
        </div> -->
      </el-tab-pane>
      
    </el-tabs>
      <div slot="button">
        <div v-show="activeName=='first'">
          <el-button class="modal-btn" @click.stop="close">暂不认证</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getAuthorizeApi" v-if="authoState=='0'">CA认证</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getAuthorizeApi" v-if="authoState=='2'">刷新二维码</el-button>
          <!-- <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getTrustUserInfoApi" v-if="authoState=='1'">授权认证</el-button> -->
        </div>
        <div v-show="activeName=='second'">
          <el-button class="modal-btn" @click.stop="close">暂不认证</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="accountLogin">证书认证</el-button>
          <!-- <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="turnToIndex">刷新二维码</el-button> -->
          <!-- <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getTrustUserInfoApi" v-if="authoState=='1'">授权认证</el-button> -->
        </div>
      </div>
  </sweet-modal>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
// .name-title {
//   font-size: 14px;
//   margin: 5px 0 10px;
//   font-weight: bold;
// }

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
>>> .sweet-modal .sweet-content{
  min-height:264px;
}
>>> .el-tabs__nav-scroll{
  display: flex;
  justify-content: center;
}
.ewm-box{
  position:relative;
  margin:0 auto;
  padding:0;
  text-align: center;
}
.ewm-icon{
  width:160px;
  height:160px;
  object-fit:cover;
  -webkit-object-fit:cover;
}
.info-box1, .info-box2{
  position:relative;
  text-align:center;
}
.info-box2,.info-p1{
  color:red;
}
.info-p1{
  font-weight: bold;
}
</style>

<script>
import dayjs from "dayjs";
import bus from "vue-happy-bus";
import { verifyCaSign } from "@/api/ca-sign_wx.js";
import { getAuthorize,getTrustUserInfo } from "@/api/ca-sign_fuyou.js";
import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import {
  $_$WebSocketObj,
  VerifyUserPIN,
  $loginVerifyPINCallBack
} from "@/api/XTXSAB.js";
import resetPasswordVue from '@/Page/resetPassword/resetPassword.vue';
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
      callback: null,
      ewmBaseData:null,
      authoState:"0",//0：初始化，1：已获取二维码，2：二维码过期
      timeDate:10,
      setIntervalItem:null,//定时器对象
      requestId:null,//数字签字requestId
      setIntervalApi:null,//轮训请求api对象
      setIntervalApiTime:10,
      commonTime:600,//默认倒数时间 10分钟=600秒
      bus: bus(this),
      activeName:'first',
    };
  },
  methods: {
    open(callback,isStart) {
      localStorage.removeItem('zzwyHasCaSign')//移除用户签名过的痕迹
      this.$refs.modal.open(null,this.fuyouIfCanClose);
      this.callback = callback;
      this.password = "";
      this.username=""
      this.clearIntervalItem()
      this.bus.$emit("updateFuyouCaData");
      (isStart) && (this.getAuthorizeApi());//执行ca验证
    },
    close(fuyouIfclose = false) {
      if(this.fuyouIfCanClose){
        fuyouIfclose = true
      }
      if(fuyouIfclose ===true){
        this.clearIntervalItem();
        this.$refs.modal.close(fuyouIfclose)
        this.bus.$emit("updateFuyouCaData")
      }
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

    /**证书认证 */
    accountLogin(){
      
      if(this.username=='' || this.password==''){
        this.$message({
            type: "warning",
            message: '请先输入账号或者口令'
          });
          return false
      }
      
      this.clearIntervalItem()//截断轮询
      
      axios.post(`${apiPath}manufactor/zzwy/loginWithAccountInfo`,{
        account:this.username,
        password:this.password
      },{headers: {'Auth-Token-Nursing': window.app.authToken}}).then(res=>{
        if(res.data.data.resultCode=='0'){
          // 就是成功
          this.$router.push("/");
          this.close()
        }else{
          if(res.data.data.resultMsg=='UserIdCardNumNoExist'){
            this.$message({
              type: "error",
              message: '账号不存在'
            });
          }else if(res.data.data.resultMsg=='VerifyUserPasswordFaild'){
            this.$message({
              type: "error",
              message: '口令错误'
            });
          }else{
            this.$message({
              type: "error",
              message: res.data.data.resultMsg
            });
          }
        }
      }).catch(err=>{

      })
    },
    
    //获取授权二维码
    getAuthorizeApi() {
      getAuthorize().then(res=>{
        // console.log(res)
        if(res.status===200 && res.data.code=='200' && res.data.data.resultCode=='0'){
          this.ewmBaseData=res.data.data.qrCodeImg;
          this.requestId=res.data.data.qrCode;
          // localStorage.setItem("fuyouRequestId",res.data.data.requestId)
          // console.log(res.data.data)
          this.authoState='1'
          this.startSetIntervalItem();
          //启动轮询
          this.startRotationApi()
          // this.getTrustUserInfoApi()
        }else {
          this.$message({
            type: "info",
            message: res.data.errorCode
          });
        }
      }).catch(error=>{
         console.log(error)
         this.$message({
            type: "info",
            message: "请求失败"
          });
      })
    },
    

    ////数字信息授权获取用户信息
    getTrustUserInfoApi(){
      getTrustUserInfo({qrCode:this.requestId}).then(res=>{
          //授权成功

          // qrCodeStatus、二维码状态（等待扫码LoginQrCodeWaitScan、
          // 二维码过期LoginQrCodeExpire、二维码无效LoginQrCodeInvalid、
          // 已被扫码LoginQrCodeBeenScan）
          if(res.data && res.data.data.resultCode=='0'){
            if(res.data.data.qrCodeStatus=='LoginQrCodeExpire' || res.data.data.qrCodeStatus=='LoginQrCodeInvalid'){
              this.$message({
                type: "error",
                message: "扫码失败，二维码无效或者过期！"
              });
              this.authoState='2'
              //清除轮询定时器
              clearInterval(this.setIntervalApi)
              this.setIntervalApi=null;
              setTimeout(() => {
                clearInterval(this.setIntervalItem)
                this.setIntervalItem=null;
                this.authoState='0'
                this.close(true)
              }, 5000);
            }else if(res.data.data.qrCodeStatus=='LoginQrCodeBeenScan'){
              this.$message({
                type: "success",
                message: res.data.data.message
              });
              // 就是成功
              this.$router.push("/");
              this.close()
              // 成功之后调一个函数，获取用户的签名照片--用于签名表单签名显示—漳州五院
              this.getSignPhoto()
              //local保存
              let {data} = res.data.data
              // window.localStorage.setItem("fuyouCaData",JSON.stringify(data));
              // this.bus.$emit("updateFuyouCaData")
              //清除轮询定时器
              clearInterval(this.setIntervalApi)
              this.setIntervalApi=null;
              setTimeout(() => {
                clearInterval(this.setIntervalItem)
                this.setIntervalItem=null;
                this.authoState='0'
                this.close(true)
              }, 1000);
            }
          }
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
    getSignPhoto(){
      axios.get(`${apiPath}manufactor/zzwy/getSignPicture/${JSON.parse(localStorage.getItem("user")).empNo}`).then(res=>{

      }).catch(err=>{

      })
      // /api/manufactor/zzwy/getSignPicture/{empNo}
    },
    //清除信息
    clearIntervalItem(){
      // console.log("清除定时器")
      //清除定时器
      clearInterval(this.setIntervalItem)
      this.setIntervalItem=null;
      this.authoState='0';
      this.ewmBaseData=null;
      clearInterval(this.setIntervalApi)
      this.setIntervalApi=null;
    },

  },
  components: {},
  beforeDestroy(){
    this.clearIntervalItem()
  },
  deactivated(){
    this.password = ''
    this.username = ''
    this.clearIntervalItem()
  },
  computed:{
    fuyouIfCanClose(){
      return true
      // return JSON.parse(localStorage.user).empNo=="admin" || localStorage['fuyouUseCaSign']
    }
  }
};
</script>
