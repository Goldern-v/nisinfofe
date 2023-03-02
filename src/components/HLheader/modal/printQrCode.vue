<template>
  <div>
    <sweet-modal
      ref="modal"
      :modalWidth="400"
      title="打印二维码"
      :enable-mobile-fullscreen="false"
      class="modal"
    >
      <div class="box-print" v-loading="modalLoading" ref="printCon">
        <div class="boxShadow">
          <div class="qrcode" ref="qrcodeContainer"></div>
        </div>
        <div class="box-foot">
          <span>{{ user.empName }}</span>
          <span>{{ user.deptName }}</span>
        </div>
      </div>
        <div class="box-btn">
          <el-button class="modal-btn" @click="close">取消</el-button>
          <el-button class="modal-btn" type="info" @click="onPrint">打印</el-button>
        </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.box-print {
  width: 3cm;
  height: 3cm;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  .boxShadow {
    display: flex;
    justify-content: center;
    .qrcode {
      display: inline-block;
      img {
        width: 2.8cm;
        height: 2.8cm;
        overflow: hidden;
      }
    }
  }
  .box-foot {
    width: 120%;
    margin: 0 auto;
    margin-left: -10px;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
  }
}
.box-btn {
  width: 150px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}


</style>

<script>

import moment from "moment";
import QRCode from "qrcodejs2"
import print from "../tool/printQrCode";
import md5 from "md5";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      modalLoading: false,
      user: JSON.parse(localStorage.user),
    };
  },
  props: {
    QRCodetext: {
      type: String,//类型限定
      default: '' //默认
    }
  },
  computed: {

  },
  methods: {
    init() {
      this.formData = {
        diet: "",
        registCare: [],
        mainDoctors: "",
        dutyNurses: "",
        remark: "",
        cmpx: "",//厘米传px
      };
    },
    open() {
      this.init();
      this.$refs.modal.open();
      function arrayBufferToBase64(buffer) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return "data:image/png;base64," + window.btoa(binary);
      }
    },
    close() {
      this.$refs.modal.close();
    },
    onPrint() {
      print(this.$refs.printCon);
      setTimeout(() => {
        this.$refs.modal.close();
      }, 10000)
    },
    getOneMmsPx (){
      let div = document.createElement("div");
      div.id = "cm";
      div.style.width = "2.8cm";
      document.querySelector("body").appendChild(div);
      // 原生方法获取浏览器对元素的计算值
      let mm1 = document.getElementById("cm").getBoundingClientRect();
      this.cmpx = mm1.width;
    },
    //二维码
    qrcode() {
      let titleObject = this.userName + " " + this.passWord;
      ['foshanrenyi','fsxt','','lyxrm','beihairenyi', 'whhk', 'stmz','qhwy'].includes(this.HOSPITAL_ID ) && (titleObject=this.getBase(JSON.stringify({user:this.userName,auth: this.passWord})));
      let qrcode = new QRCode(this.$refs.qrcodeContainer, {
        // width: this.cmpx,// 二维码的宽
        // height: this.cmpx,// 二维码的高
        width: 120,// 二维码的宽
        height: 120,// 二维码的高
        // text: this.userName + " " + this.passWord , // 二维码的内容
        text:titleObject,
        colorDark: '#000',// 二维码的颜色
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.H
      })
      qrcode._el.title = "";
    },
    getBase(str){
      //加密encodeURIcomponent
      const jiaMi = encodeURIComponent(str);
      return btoa(jiaMi);
    },
    //获取local里的用户名和密码
    loadComments() {
      let rememberAccount = ""
      if(['foshanrenyi'].includes(this.HOSPITAL_ID) && localStorage.getItem("caUser")){
        rememberAccount = localStorage.getItem("caUser");
      }else rememberAccount = localStorage.getItem("rememberAccount");
      let ppp = localStorage.getItem("ppp");
      this.userName = rememberAccount;
      this.passWord = ppp;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getOneMmsPx();
      this.qrcode()
    })
    this.loadComments();
  },
  components: {
    QRCode,
  }
};
</script>
