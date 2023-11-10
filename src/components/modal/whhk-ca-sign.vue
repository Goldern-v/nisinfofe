<template>
  <!-- 登录的时候。ca和U盾签名确认。可以暂不认证 -->
  <sweet-modal
    ref="modal"
    size="small"
    title="登录验证"
    :overlay-theme="overlayTheme"
    style="z-index:999999"
    @close="clearIntervalItem"
  >
    <el-tabs v-model="activeName">
      <template v-if="['whhk'].includes(HOSPITAL_ID)">
      <el-tab-pane label="CA认证" name="first">
        <figure class="ewm-box">
          <!-- <img alt="" :src="'data:text/html;base64,'+ewmBaseData" class="ewm-icon" /> -->
          <div class="qrcode" ref="qrcodeContainer"></div>
        </figure>
        <div class="info-box1" v-if="authoState==='1'">请在CA移动端扫一扫登录</div>
        <div class="info-box2"  v-if="authoState==='2'">二维码已过期</div>
        <div style="height: 20px"></div>
        
      </el-tab-pane>
      <el-tab-pane label="U盾认证" name="second">
        <span>
          <p for class="name-title">账号</p>
          <div action class="sign-input" ref="userInput">
            <el-input size="small" type="text" placeholder="请输入账号" disabled v-model="username"></el-input>
          </div>
        </span>
        <div style="height: 5px"></div>
        <p for class="name-title">密码</p>
        <div ref="passwordInput">
          <el-input size="small" type="text" placeholder="请输入密码" v-model="password"></el-input>
        </div>
        <div style="color: rgb(131, 165, 158); font-size: 12px; margin-top: 6px;">请插入U盾获取账号</div>
        <div style="height: 20px"></div>
       
      </el-tab-pane>
      </template>
      <template v-else>
        <!-- 花都用武汉的接口，所以屏蔽usb登录 -->
        <el-tab-pane label="CA认证" name="first">
        <figure class="ewm-box">
          <div class="qrcode" ref="qrcodeContainer"></div>
        </figure>
        <div class="info-box1" v-if="authoState==='1'">请在CA移动端扫一扫登录</div>
        <div class="info-box2"  v-if="authoState==='2'">二维码已过期</div>
        <div style="height: 20px"></div>
         </el-tab-pane>
      </template>
      
    </el-tabs>
      <div slot="button">
        <div v-show="activeName=='first'">
          <el-button class="modal-btn" @click.stop="close">暂不认证</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getAuthorizeApi" v-if="authoState=='0'">确认</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getAuthorizeApi" v-if="authoState=='2'">刷新二维码</el-button>
        </div>
        <div v-show="activeName=='second'">
          <el-button class="modal-btn" @click.stop="close">暂不认证</el-button>
          <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="accountLogin">确认</el-button>
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
import QRCode from "qrcodejs2";
import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import {
  $_$WebSocketObj,
  SignedData,
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
      ukeyTimer:null,
	  signDataId:'',//签名数据id
	  userId:'',//用作后面扫码开启自动签接口中的入参
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

      
      (isStart) && (this.getAuthorizeApi(),this.getWebSocket());//执行ca验证
    },
    close(fuyouIfclose = false) {
      if(this.fuyouIfCanClose){
        fuyouIfclose = true
      }
      if(fuyouIfclose ===true){
        this.clearIntervalItem();
        this.$refs.modal.close()
        this.bus.$emit("updateFuyouCaData")
        window.openSignModal = window.commonSignModal
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

    getWebSocket(){
      if(!['huadu'].includes(this.HOSPITAL_ID)){
	     this.getCaStatus();
        this.ukeyTimer=setInterval(()=>{
           if (process.env.ENABLE_BLUETOOTH_SIGN) {
             // console.log('ENABLE_BLUETOOTH_SIGN',process.env.ENABLE_BLUETOOTH_SIGN)
            this.getCaStatus();
        }
      },1000*10)//10s
      }
    },

     getCaStatus() {
      // if(!['foshanrenyi'].includes(this.HOSPITAL_ID)){
		// console.log('111')
        $_$WebSocketObj.GetUserList((usrInfo) => {
		// "汉口医院测试一(测试)||998000100595880/5901202003005871&&&移动证书||MSSPDefaultContainer/msspDev000000000000000000&&&"
          this.strUserCertID = usrInfo.retVal.split('&&&')[0].split('||')[1]
            // .substring(usrInfo.retVal.indexOf("||") + 2, usrInfo.retVal.length)
            // .replace("&&&", "");
          this.username = usrInfo.retVal.substring(
            0,
            usrInfo.retVal.indexOf("||")
          );

          // SignedData(this.strUserCertID, "123213", (retValObj) => {
          //   this.ca_isLogin = !!retValObj.retVal;
          //   window.ca_isLogin = this.ca_isLogin;
          //   window.ca_name = this.username;
          // });
        });
      // }
     },

    /**U盾 证书认证 */
    accountLogin(){
      
      if(this.username=='' || this.password==''){
        this.$message({
            type: "warning",
            message: '请先输入账号或者口令'
          });
          return false
      }
      
      this.clearIntervalItem()//截断轮询
		// console.log(this.strUserCertID,)
       var ctx = { certID: this.strUserCertID, objForm: {}, action: "" };
        VerifyUserPIN(
          this.strUserCertID,
          this.password,
          retValObj => {
            if (retValObj.retVal) {
              	this.$message.success("登录成功");
              	this.callback && this.callback();
			         	this.$router.push("/");
             		this.close()
				        // 清除这个定时器websocket
			         	this.clearIntervalItem()
                // U盾登录触发
                window.openSignModal = window.openWhhkSignModal
			          window.localStorage.setItem("whhkCaOrUsbSignIn",true);
            } else {
              $loginVerifyPINCallBack(retValObj);
            }
          },
          ctx
        );


    },
    
    //获取授权二维码
    getAuthorizeApi() {
      axios.post(`${apiPath}manufactor/whhk/loginAddSignJob`,
      { "empNo": JSON.parse(localStorage.getItem("user")).empNo},
      {headers: {'Auth-Token-Nursing':window.app.authToken}}).then(res=>{
        // 清空二维码
        this.$refs.qrcodeContainer.innerHTML = ''
        let qrcode = new QRCode(this.$refs.qrcodeContainer, {
          width: 160,// 二维码的宽
          height: 160,// 二维码的高
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
        this.startRotationApi()
      }).catch(err=>{

      })
    },
    

    ////数字信息授权获取用户信息
    getTrustUserInfoApi(){
      getTrustUserInfo({signDataId:this.signDataId}).then(res=>{
          //授权成功
          // 状态（UNSIGN：待签，FINISH：已签，
		      //EXPIRE： 过期， REVOKE：签名任务被服务端撤销， REFUSE：签名任务被客户端拒绝）

          //   if(res.data && res.data.data.jobStatus=='0'){
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
                this.close(true)
              }, 5000);
            }else if(res.data.data.jobStatus=='FINISH'){
              // this.$message({
              //   type: "success",
              //   message: res.data.data.message
              // });
              this.$message.success("登入成功");
              // 就是成功
              if(['whhk'].includes(this.HOSPITAL_ID)){
                 this.$router.push("/");
              }
              this.close()
              if(['whhk'].includes(this.HOSPITAL_ID)){
                //CA登录触发,替换签名框
                window.openSignModal = window.openWhhkSignModal
                window.localStorage.setItem("whhkCaOrUsbSignIn",true);
              }
              if(['huadu'].includes(this.HOSPITAL_ID)){
                window.localStorage.setItem("huaduCaSignIn",true);
              }
              // 成功之后调一个函数，获取用户的签名照片--用于签名表单签名显示—漳州五院
              this.getSignPhoto()
              let data
              if(['whhk'].includes(this.HOSPITAL_ID)){
                 data = res.data.data
              }else{
                 data={"userName": JSON.parse(localStorage.getItem("user")).empNo}
              }
              // 现在data是空的
			        window.localStorage.setItem("fuyouCaData",JSON.stringify(data));
              this.bus.$emit("updateFuyouCaData")
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
    getSignPhoto(){
       // 发送接口告诉后端CA登录进入。后端把签名地址替换
      axios.get(`${apiPath}manufactor/whhk/queryImage/${JSON.parse(localStorage.getItem("user")).empNo}`).then(res=>{

      }).catch(err=>{

      })
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

      this.$refs.qrcodeContainer.innerHTML = ''//销毁二维码实例
      clearInterval(this.ukeyTimer)
      this.ukeyTimer=null


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
