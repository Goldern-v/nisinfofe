<template>
  <div class="nursingDoc">{{ errorMsg }}</div>
</template>

<script>
// 跳转的路由最后一个输入框会自动填充账号，可以在最后一个输入框加上一个隐藏的输入框
import { login } from "@/api/login";
import { checkLogin,getPatient } from "./api/";
import Cookies from "js-cookie";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      errorMsg: "" //登录失败原因
    };
  },
  mounted() {
    this.initDoc();
  },
  methods: {
    //初始化方法
    async initDoc(){
        // 医生查看病人评估单&记录单（陵城） 查看病人病历、检查、检验（厚街合理用药）
      let url = {}
      if(this.HOSPITAL_ID == 'fuyou'){//江门妇幼解密
        let decodelUrl = this.UrlDecode(this.$route.query.param)
        url = JSON.parse(decodelUrl);
      }else{
        url = this.$route.query;
      }
      var token =
        (window.app && window.app.$getCookie("NURSING_USER").split("##")[1]) ||
        url.token;
      if (!token) {
        // this.HOSPITAL_ID == 'fuyou' ? this.toLogin2() : this.toLogin();
        await this.toLogin2()
      }else {
        await this.getPage(url);
        // let type,
        //   patientId = url.patientId,
        //   visitId = url.visitId || "all";
        // let isError=false;
        // if((!url.patientId || !url.visitId) && url.expand1){
        //       const newData= await this.getPatientIdAndVisitId(url.expand1);
        //       (newData.res) && ({patientId,visitId}=newData.res);
        //       (!newData.res) && (isError=true);
        //       console.log(newData)
        //        console.log("ssssnewData")
        // }
        // if(isError) return false;
        // //return false
        // switch (url.viewType) {
        //   case "nursingPreview":
        //     {
        //       type = "nursingPreview";
        //     }
        //     break;
        //   case "doc":
        //     {
        //       type = "record";
        //     }
        //     break;
        //   case "record":
        //     {
        //       type = "sheet";
        //     }
        //     break;
        //   case "doctorEmr":
        //     {
        //       type = "doctorEmr";
        //     }
        //     break;
        //   case "inspect":
        //     {
        //       type = "inspect";
        //     }
        //     break;
        //   case "test":
        //     {
        //       type = "test";
        //     }
        //     break;
        //   case "temperature":
        //     {
        //       type = "temperature";
        //     }
        //     break;
        //   default: {
        //     type = "record";
        //   }
        // }

        // if (type == "nursingPreview") {
        //   this.$router.push(`/nursingPreview?patientId=${patientId}&visitId=${visitId}&nursingPreviewIsShow=1`);
        // } else {
        //   this.$router.push(
        //     `/showPatientDetails/${type}?patientId=` +
        //       patientId +
        //       "&visitId=" +
        //       visitId
        //   );
        // }
      }
    },
    //UrlDecode解码
    UrlDecode(zipStr){
      var uzipStr = '';
      for (var i = 0; i < zipStr.length; i += 1) {
        var chr = zipStr.charAt(i);
        if (chr === '+') {
          uzipStr += ' ';
        } else if (chr === '%') {
          var asc = zipStr.substring(i + 1, i + 3);
          if (parseInt('0x' + asc) > 0x7f) {
            uzipStr += decodeURI('%' + asc.toString() + zipStr.substring(i+3, i+9).toString());
            i += 8;
          }else{
            uzipStr += this.AsciiToString(parseInt('0x' + asc));
            i += 2;
          }
        }else{
          uzipStr += chr;
        }
      }
      return uzipStr;
    },
    StringToAscii(str){
      return str.charCodeAt(0).toString(16);
    },
    AsciiToString(asccode){
      return String.fromCharCode(asccode);
    },

    // 医生查看病人评估单&记录单（陵城） 查看病人病历、检查、检验（厚街合理用药）
    toLogin() {
      console.log(this.isDev);
      let account = "admin",
        password =
          this.isDev || window.location.host == "192.168.1.54:9867"
            ? "Ad123456+"
            : "ad123456";

      if (this.HOSPITAL_ID == "hj") {
        password =
          this.isDev || window.location.host == "192.168.1.54:9866"
            ? "Ad123456+"
            : "Bcy@21qw";
      }
      login(account, password)
        .then(res => {
          // 存下token 和用户信息 Auth-Token-Nursing
          let user = res.data.data.user;
          user.token = res.data.data.authToken;
          window.app.authToken = res.data.data.authToken;
          localStorage["user"] = JSON.stringify(res.data.data.user);
          Cookies.remove("NURSING_USER");
          Cookies.set(
            "NURSING_USER",
            `${res.data.data.user.id}##${res.data.data.authToken}`,
            {
              path: "/"
            }
          );
          let url = this.$route.query;
          this.formatRoute(url)
        })
        .catch(err => {
          if (err.data) {
            this.errorMsg = err.data.desc;
          }
        });
    },
    // 妇幼医生查看病人评估单&记录单（和南医三那个项目的方式一样，通过Url获取相关登录参数，无须写死账号）
    // toLogin2() {
    async toLogin2() {
      let url = {}
      if(this.HOSPITAL_ID == 'fuyou'){//江门妇幼解密
        let decodelUrl = this.UrlDecode(this.$route.query.param)
        url = JSON.parse(decodelUrl);
      }else{
        url = this.$route.query;
      }
      let data = {
        userName: url.userName,
        nonce: url.nonce,
        timestamp: url.timestamp,
        sign: url.sign
      };
      let isLogin=true; //是否登录成功
      await checkLogin(data)//登录
        .then(res => {
          // 存下token 和用户信息 Auth-Token-Nursing
          if (res.data.data) {
            let user = res.data.data.user;
            user.token = res.data.data.authToken;
            localStorage["user"] = JSON.stringify(res.data.data.user);
            localStorage["adminNurse"] = res.data.data.adminNurse;
            Cookies.remove("NURSING_USER");
            Cookies.set(
              "NURSING_USER",
              `${res.data.data.user.id}##${res.data.data.authToken}`,
              {
                path: "/"
              }
            );
            // 清除科室记录
            this.$store.commit("upDeptCode", "");
            localStorage.selectDeptValue = "";
            this.$store.commit("upDeptName", "");
          } else {
            this.errorMsg = res.data.desc;
            isLogin=false;
          }
        })
        .catch(err => {
          this.errorMsg = err.data.desc;
          isLogin=false;
          console.dir(err);
        });
        //跳转页面
        (isLogin) && (await this.getPage(url));
    },
    //跳转路由
    async getPage(url){
      let patientId = url.patientId,
        visitId = url.visitId || "all";
      let isError=false;
      if((!url.patientId || !url.visitId) && url.expand1){
        const newData= await this.getPatientIdAndVisitId(url.expand1);
        (newData.res) && ({patientId,visitId}=newData.res);
        (!newData.res) && (isError=true);
        console.log(newData)
        // console.log("ssssnewData")
      }
      if(isError) return false;
        this.formatRoute(url)
    },
    //获取patientId visitId
    async getPatientIdAndVisitId(expand1){
      let params={
        res:null,//数据集合
        error:null,//错误提示
      };
     await getPatient(expand1).then(res=>{
        console.log(res)
        if(res.data.code==200){
          params.res=res.data.data.id;
        }else {
           try {
             params.error=res.data.desc;
             this.errorMsg = res.data.desc;
           } catch (error) {
             params.error=error
             this.errorMsg = error;
           }
        }
      }).catch(error=>{
        console.log(error)
          params.error=error;
          this.errorMsg = error;
      });
      return params
    },
    /** 选择路由地址，修改参数 */
    formatRoute(url) {
      let type,
        patientId = url.patientId,
        visitId = url.visitId || "all";
      switch (url.viewType) {
        case "nursingPreview":
          {
            type = "nursingPreview";
          }
          break;
        case "doc":
          {
            type = "record";
          }
          break;
        case "record":
          {
            type = "sheet";
          }
          break;
        case "doctorEmr":
          {
            type = "doctorEmr";
          }
          break;
        case "inspect":
          {
            type = "inspect";
          }
          break;
        case "test":
          {
            type = "test";
          }
          break;
        case "temperature":
          {
            type = "temperature";
          }
          break;
        case "implementationList":
          type = "implementationList";
          break;
        default: {
          type = "record";
        }
      }
      let timeId = setTimeout(() => {
        clearTimeout(timeId);
        let src = ''
        if (type == "nursingPreview") {
          src = `/nursingPreview?patientId=${patientId}&visitId=${visitId}&nursingPreviewIsShow=1`
        } else if (type == "implementationList") {
          src = `/showPatientDetails/${type}?patientName=${url.patientName || ''}`
        } else {
          src = `/showPatientDetails/${type}?patientId=` +
              patientId +
              "&visitId=" +
              visitId
        }
        this.$router.push(src)
      }, 500);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.nursingDoc {
  font-size: 24px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%);
  -ms-transform: translate(-50%);
  -o-transform: translate(-50%);
  transform: translate(-50%);
}
</style>
