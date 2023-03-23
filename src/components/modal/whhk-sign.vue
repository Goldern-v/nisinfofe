<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modalName"
    size="small"
    :title="title1 || title"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
    class="whhkSignModal"
    @close="close()"
  >
    <div v-show="message && message.length > 0" class="message-box">
      <span>{{ message }}</span>
    </div>
    <span v-show="showDate">
      <p for class="name-title">记录时间</p>
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
    <span v-show="showAduit">
      <p for class="name-title">审核时间</p>
      <div action class="sign-input" ref="dateInput">
        <el-date-picker
          popper-class="picker-dropdown"
          v-model="aduitDate"
          type="datetime"
          align="center"
          format="yyyy-MM-dd HH:mm"
          placeholder="输入审核时间"
        ></el-date-picker>
        <!-- <el-input size="small" type="text" placeholder="输入签名时间" v-model="signDate"></el-input> -->
      </div>
    </span>
    <div style="height: 5px"></div>
    <div v-if="whhkSignTye!=''">确定要{{title.indexOf('删除') > -1?'删除':''}}签名吗？</div>
    
    <div v-else>
      <el-tabs v-model="activeName">
      <el-tab-pane label="CA认证" name="first" style="text-align:center;">
        <figure class="ewm-box">
          <!-- <img alt="" :src="'data:text/html;base64,'+ewmBaseData" class="ewm-icon" /> -->
          <div class="qrcode" ref="qrcodeContainer"></div>
        </figure>
        <div class="info-box1" v-if="authoState==='1'">请在登录CA移动端扫一扫登录</div>
        <div class="info-box2"  v-if="authoState==='2'">二维码已过期</div>
        <div style="height: 20px"></div>
        
      </el-tab-pane>
      <el-tab-pane label="U盾认证" name="second">
        <span>
          <p for class="name-title">账号</p>
          <div action class="sign-input" ref="userInput">
            <el-input size="small" type="text" placeholder="请输入账号" disabled v-model="ca_name"></el-input>
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
      </el-tabs>
    </div>
    
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="close">取消</el-button>
      <el-button 
        class="modal-btn"
        type="primary"
        v-if="showSignBtn()"
        @dblclick.stop="post"
        @click.stop="post"
        :loading="btnLoading"
        >确认</el-button
      >
      <!-- <el-button
        v-if="hasCaSign()&&showSignBtn()"
        class="modal-btn"
        type="primary"
        @dblclick.stop="caPost"
        @click.stop="caPost"
        >签名确认</el-button
      > -->
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
import { GetUserList,verifyNewCaSign,nanfnagCaSign,zzwyVerifySign,zzwyVerifySignNoPw } from "@/api/caCardApi";
import dayjs from "dayjs";
import axios from "@/api/axios";
import { apiPath } from "@/api/apiConfig";
import QRCode from "qrcodejs2";
import bus from "vue-happy-bus";
import { getCaSignJmfy,verifyData,getTrustUserInfo } from "@/api/ca-sign_fuyou.js";
import {
  $_$WebSocketObj,
  SignedData,
  VerifyUserPIN,
  $loginVerifyPINCallBack
} from "@/api/XTXSAB.js";
import moment from "moment";
import md5 from "md5";

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
        localStorage.caUser ? localStorage.caUser:(localStorage && localStorage.user
          ? JSON.parse(localStorage.user).empNo
          : ""),
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
      dateTitle:"",
      aduitDate:'',
      showAduit:false,
      formData:null,//签名表单传过来的数据
      fuyouCaData:null,
      isCaSign:false,
      signType:0,
      userNum:0,
      isDoctor:false,
      aduitDateSheet:['internal_eval_lcey','critical_lcey','critical_new_lcey','critical2_lcey','internal_eval_linyi','critical_linyi', 'internal_eval_weihai','internal_eval_yz'],
      activeSheetType:"",
      // hasQrCaSignHos:['fuyou','hj'],
      hasQrCaSignHos:['whhk'],
      // caSignHasNoSignType:['hj'],
      caSignHasNoSignType:['hj','guizhou'],
      btnLoading:false,
      verifySignObj:{},
      SigndataObj:{},
      foshanshiyiIFca:false,


      activeName:'first',
      authoState:'0',
      timeDate:10,
      setIntervalItem:null,//定时器对象
      setIntervalApi:null,//轮训请求api对象
      setIntervalApiTime:10,
      commonTime:600,//默认倒数时间 10分钟=600秒
      signDataId:'',//签名数据id
	    userId:'',//用作后面扫码开启自动签接口中的入参
      whhkSignTye:'',
    };
  },
  methods: {
    showSignBtn(){
      if(this.activeName=='second' || this.whhkSignTye!=''){
        // if(['fuyou'].includes(this.HOSPITAL_ID)){
        return true
      }else{
        return false
      }
    },
    hasCaSign(){
      let flag = this.hasQrCaSignHos.includes(this.HOSPITAL_ID)&& this.fuyouCaData && this.fuyouCaData.userName
      // let flag = ['fuyou'].includes(this.HOSPITAL_ID)&& this.fuyouCaData && this.fuyouCaData.userName
    return !!flag
    },
    open(callback, title, showDate = false, isHengliNursingForm, message = "",formData,type,doctorTure,sheetType,SigndataObj,verifySignObj) {//formData为表单数据
      // console.log(callback, title, showDate, isHengliNursingForm, message,formData,type,doctorTure,sheetType,SigndataObj,verifySignObj,"open")
      this.clearIntervalItem()
      this.whhkSignTye = localStorage.getItem('whhkSignTye') || ''
      if(this.whhkSignTye==''){
        // 如果是删除，就不用二维码
        this.getAuthorizeApi()
      }
      
      // console.log(window.ca_name,window.ca_isLogin)
      
   this.btnLoading = false
    if(doctorTure){
      this.isDoctor = doctorTure
      this.isCaSign = false;
    }else{
      this.isDoctor =false;
      this.isCaSign = false;
    }
   
    if(type){
      let signType = {sign:'1',audit:'2'};
      this.signType = signType[type];
    };
    if(sheetType){
      if(this.aduitDateSheet.includes(sheetType)){
        this.showAduit=true
        this.activeSheetType=sheetType
        this.aduitDate=moment().format('yyyy-MM-DD HH:mm')
      }
    }
     (formData) && (this.formData=formData);//设置表单数据
      this.initFuyouCaData()
      this.signDate = dayjs().format("YYYY-MM-DD HH:mm") || ""; //改
      if(isHengliNursingForm && title!=='删除验证'){
        if(title==='签名确认' && this.HOSPITAL_ID == 'hengli'){
        showDate = true;
        this.showAduit = false;
        this.dateTitle = '记录时间';
        }else if(title==='审核签名确认' && this.HOSPITAL_ID == 'hengli'){
          showDate = false;
            this.showAduit = true;
          this.dateTitle = '审核时间'
        }else{
          showDate = false;
          this.showAduit = false;
        }
      }
      this.title1 = "";
      title && (this.title1 = title);
      // if(!['foshanrenyi'].includes(this.HOSPITAL_ID)){
        (this.username =
          localStorage && localStorage.user
            ? JSON.parse(localStorage.user).empNo
            : "")
        this.ca_name = window.ca_name;
        this.ca_isLogin = window.ca_isLogin;
      // }
        (this.callback = callback);
       
      this.showDate = showDate;
      // this.showMessage = showMessage;
      this.message = message;
      this.password = "";
      this.pw = false;



      this.$refs.modalName.open();
      // if (!['foshanrenyi','weixian'].includes(this.HOSPITAL_ID)) {
        this.$nextTick(() => {
          if(showDate){
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
      // }
      return null;
    },
    close() {
      this.caPassword = ''
      this.isDoctor =false
      this.showAduit=false
      this.activeSheetType=""
      this.formData = null
      this.$refs.modalName.close();
    },
    //清除信息
    clearIntervalItem(){
      // console.log("清除定时器")
      //清除定时器
      clearInterval(this.setIntervalItem)
      this.setIntervalItem=null;
      this.authoState='0';
      // this.ewmBaseData=null;
      clearInterval(this.setIntervalApi)
      this.setIntervalApi=null;
      this.signDataId = ''
      
      if(this.$refs.qrcodeContainer){
        this.$refs.qrcodeContainer.innerHTML = ''//销毁二维码实例
      } 
      


    },
    //获取授权二维码
    getAuthorizeApi() {
      // debugger
      this.clearIntervalItem()
      axios.post(`${apiPath}manufactor/whhk/startAutoSign`,
      { "empNo": JSON.parse(localStorage.getItem("user")).empNo}).then(res=>{
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
		  //启动轮询
          this.startRotationApi()

          // this.turnToSign()
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
                // this.close(true)
              }, 5000);
            }else if(res.data.data.jobStatus=='FINISH'){
              this.$message({
                type: "success",
                message: res.data.data.message
              });
              // 就是成功 开启自动签名
              this.turnToSign()

              // 成功之后调一个函数，获取用户的签名照片--用于签名表单签名显示—漳州五院
              // this.getSignPhoto()
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
          
          if(!localStorage.getItem('whhkSignTye')){
            localStorage.setItem('signDataId',this.signDataId)//这个很重要
            localStorage.setItem('whhkSignTye','qrcode')
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

    ukeyAutoSign(){
      let random = this.S4()
        SignedData(window.strUserCertID, random, resObj=>{
            // console.log(signValue)
            this.$refs.modalName.close();
            this.btnLoading = false
            if(!localStorage.getItem('whhkSignTye')) localStorage.setItem('whhkSignTye','ukey')
            this.clearIntervalItem()
            if (this.signDate) {
              return this.callback(
                localStorage.getItem('ppp'),
                // random,
                this.username,
                this.signDate,
                random,
              );
            } else {
              return this.callback(localStorage.getItem('ppp'), this.username);
            }
        })
    },


    setCloseCallback(closeCallback) {
      this.$refs.modalName.setCloseCallback(closeCallback);
    },
    S4(){
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    post() {
      this.btnLoading = true
      this.setCloseCallback(null);
      if(this.whhkSignTye!=''){
        // 就是第二次签名
        if(this.whhkSignTye=='qrcode'){
          this.turnToSign()
        }else{
          // ukey签名
          if(!window.ca_isLogin){
            this.btnLoading = false
            return this.$message({
                message: "未检测到U盾",
                type: "warning",
                showClose: true
              });
          }
          this.ukeyAutoSign()

        }
      }else{
        // 首次签名
      if(!window.ca_isLogin){
        return this.$message({
            message: "未检测到U盾",
            type: "warning",
            showClose: true
          });
      }
     if( this.password==''){
        this.$message({
            type: "warning",
            message: '请先输入密码'
          });
          return false
      }
      
       var ctx = { certID: window.strUserCertID, objForm: {}, action: "" };
      VerifyUserPIN(
          window.strUserCertID,
          this.password,retValObj=>{
            if (retValObj.retVal){
              // 验证登录成功
              this.ukeyAutoSign()
              
            }
          },ctx)
      }
    },

    openCaSignModal() {
      window.openCaSignModal();
      this.$refs.modalName.close();
    },
 
    //初始化江门妇幼签名数据
    initFuyouCaData(){
      //window.localStorage.setItem("fuyouCaData"
      this.fuyouCaData=window.localStorage.getItem("fuyouCaData")?JSON.parse(window.localStorage.getItem("fuyouCaData")):null;
    },
    //打开ca签名
    openFuyouCaSignModal(){
      window.openFuyouCaSignModal(true);
    },
    openHjCaSignModal(){
      window.openHjCaSignModal(true);
    }
  },
  watch:{
    isCaSign(val){
      this.pw = val;
    },
    userNum:{
      handler(newVal, oldVal) {
        if(this.foshanshiyiIFca){
          this.username =
          localStorage && localStorage.caUser
            ? localStorage.caUser
            : JSON.parse(localStorage.user).empNo
            this.ca_name = localStorage.caUser?localStorage.caUser:"";
            this.ca_isLogin = !!this.ca_name;
        }else{
          this.username = JSON.parse(localStorage.user).empNo
          this.ca_name = "";
          this.ca_isLogin = !!this.ca_name;
        }
        },
    },
  },
  computed:{
    nanfangCa:{
      get(){
        return localStorage["nanFangcaLogin"] || false
      }
    }
  },
  mounted(){
    //初始化江门妇幼签名数据
    this.initFuyouCaData();
  },
  beforeDestroy() {
    this.fuyouCaData = null
    this.caPassword = ''
    this.isDoctor = false
    this.close()
  },
  components: {}
};
</script>
