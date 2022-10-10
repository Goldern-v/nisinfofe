<template>
  <!-- 签名确认 -->
  <sweet-modal
    ref="modal"
    size="small"
    title="证书登录"
    :overlay-theme="overlayTheme"
    style="z-index: 10002"
    @close="clearIntervalItem"
  >
    <figure class="ewm-box" v-if="ewmBaseData && ewmBaseData!==''">
      <img alt="" :src="'data:text/html;base64,'+ewmBaseData" class="ewm-icon" />
    </figure>
    <div class="info-box1" v-if="authoState==='1'">请在<span class="info-p1">{{timeDate}}S</span>内完成扫码</div>
    <div class="info-box2"  v-else-if="authoState==='2'">二维码已过期</div>
    <div style="height: 20px"></div>
    <div slot="button">
      <el-button class="modal-btn" @click.stop="close">暂不认证</el-button>
      <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getAuthorizeApi" v-if="authoState=='0'">ca认证</el-button>
      <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getAuthorizeApi" v-if="authoState=='2'">刷新二维码</el-button>
      <el-button class="modal-btn" type="primary" @dblclick.stop="post" @click.stop="getTrustUserInfoApi" v-if="authoState=='1'">授权认证</el-button>
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
  min-height:180px;
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
      commonTime:120,//默认倒数时间
      bus: bus(this),
    };
  },
  methods: {
    open(callback,isStart) {
      console.log("isStart",isStart)
      this.$refs.modal.open(null,JSON.parse(localStorage.user).empNo=="admin"?true:false);
      this.callback = callback;
      this.password = "";
      this.clearIntervalItem()
      this.bus.$emit("updateFuyouCaData");
      (isStart) && (this.getAuthorizeApi());//执行ca验证
    },
    close(fuyouIfclose = false) {
      console.log("test--1")
      if(fuyouIfclose ===true || JSON.parse(localStorage.user).empNo=="admin"){
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
      },2000)
    },
    //获取授权二维码 测试环境
    // getAuthorizeApi() {
    //   getAuthorize().then(res=>{
    //     console.log(res)
    //     if(res.status===200 && res.data){
    //       this.ewmBaseData=res.data.data.imgBase64;
    //       this.requestId=res.data.data.requestId;
    //       console.log(res.data.data.requestId)
    //       this.authoState='1'
    //       this.startSetIntervalItem();
    //       //启动轮询
    //       this.startRotationApi()
    //     }else {
    //       this.$message({
    //         type: "info",
    //         message: res.data.message
    //       });
    //     }
    //   }).catch(error=>{
    //      console.log(error)
    //      this.$message({
    //         type: "info",
    //         message: "请求失败"
    //       });
    //   })
    // },
    //获取授权二维码
    getAuthorizeApi() {
      getAuthorize().then(res=>{
        console.log(res)
        if(res.status===200 && res.data.code=='200' && res.data.data){
          this.ewmBaseData=res.data.data.imgBase64;
          this.requestId=res.data.data.requestId;
          // localStorage.setItem("fuyouRequestId",res.data.data.requestId)
          console.log(res.data.data.requestId)
          this.authoState='1'
          this.startSetIntervalItem();
          //启动轮询
          this.startRotationApi()
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
    //数字信息授权获取用户信息 测试环境
    // getTrustUserInfoApi(){
    //   getTrustUserInfo({requestId:this.requestId}).then(res=>{
    //       //授权成功
    //       console.log(res)
    //       //code
    //       if(res.data && res.data.status=='0'){
    //         this.$message({
    //           type: "success",
    //           message: res.data.message
    //         });
    //         //清除轮询定时器
    //         clearInterval(this.setIntervalApi)
    //         this.setIntervalApi=null;
    //         setTimeout(() => {
    //           clearInterval(this.setIntervalItem)
    //           this.setIntervalItem=null;
    //           this.authoState='0'
    //           this.close()
    //         }, 1000);
    //       }else {
    //         this.$message({
    //           type: "info",
    //           message: res.data.message
    //         });
    //       }
    //   }).catch(error=>{
    //      this.$message({
    //         type: "info",
    //         message: "请求失败"
    //       });
    //   })
    // },

    ////数字信息授权获取用户信息
    getTrustUserInfoApi(){
      getTrustUserInfo({requestId:this.requestId}).then(res=>{
          //授权成功
          console.log(res)
          //code
          if(res.data && res.data.data.status=='0'){
            if(res.data.data.data.employeeNumber!==localStorage.rememberAccount){
              this.$message({
                type: "error",
                message: "扫码失败，非当前登录账号！"
              });
            }else{
              this.$message({
                type: "success",
                message: res.data.data.message
              });
              //local保存
              let {data} = res.data.data
              console.log(data);
              window.localStorage.setItem("fuyouCaData",JSON.stringify(data));
              this.bus.$emit("updateFuyouCaData")
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
    //清除信息
    clearIntervalItem(){
      console.log("清除定时器")
      //清除定时器
      clearInterval(this.setIntervalItem)
      this.setIntervalItem=null;
      this.authoState='0';
      this.ewmBaseData=null;
      clearInterval(this.setIntervalApi)
      this.setIntervalApi=null;
    }
  },
  components: {},
  beforeDestroy(){
    this.clearIntervalItem()
  },
  deactivated(){
    this.clearIntervalItem()
  }

};
</script>
