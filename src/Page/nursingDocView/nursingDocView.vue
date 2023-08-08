<template>
  <div>
    <div class="content NursingPreview">
      <div class="left-part">
        <treeNursingDocView ref="treeNursingDocView"></treeNursingDocView>
      </div>
      <div class="right-part">
        <component :is="otherComponent" v-if="otherComponent"></component>
        <rightPart v-show="!otherComponent"></rightPart>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.right-part {
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
}

>>>.body {
  height: calc(100vh - 20px) !important;
}
>>>.assessmentv2-iframe{
  height: calc(100vh - 20px) !important;
}

>>>.form-contain {
  height: calc(100vh - 21px) !important;
}

// >>>.new-btn, >>>.null-btn, >>>.tool-bar, >>>.fixed-icon, >>>.table-fixed-th {
//   display: none !important;
// }
>>>.null-btn{
  display: none !important;
}

>>>.tool-contain {
  .item-box {
    display: none !important;
  }
  .select-con + .item-box {
     display: flex !important;
  }

  .item-box.page-select {
    display: flex !important;
  }
  // .right-btn {
  //   pointer-events: none !important;
  // }
}

.NursingPreview {
  overflow hidden;
  .right-part {
    >>> #sheet_body_con {
      height: calc(100vh - 0px) !important;
    }
    // >>> .sheetTable-contain {
    //     input {
    //       pointer-events: none !important;
    //     }
    //   }
  }
}

.content {
  .left-part {
    float: left;
    width: 240px;
    background: #FFFFFF;
    border: 1px solid #CBD5DD;
    border-radius: 2px 2px 0 2px;
    height: 100vh !important;
  }

  .right-part {
    margin-left: 240px;
    overflow: auto;
    height: 100vh !important;
  }
}
</style>

<script>
import { login } from "@/api/login";
import { checkLogin, getPatient } from "./api/";
import Cookies from "js-cookie";
import common from "@/common/mixin/common.mixin";
import treeNursingDocView from "@/Page/patientInfo/supPage/record/component/treeNursingDocView.vue"; //树
import temperature from "@/Page/patientInfo/supPage/temperature/temperature"; //体温单
import temperatureHD from "@/Page/patientInfo/supPage/temperature/temperature-huadu";
import temperatureLCEY from "@/Page/patientInfo/supPage/temperature/temperature-liaocheng";
import temperatureGuizhou from "@/Page/patientInfo/supPage/temperature/temperature-guizhou";
import temperatureJmfy from "@/Page/patientInfo/supPage/temperature/temperature-fuyou";
import temperatureDghl from "@/Page/patientInfo/supPage/temperature/temperature-hengli";
import temperatureBhry from "@/Page/patientInfo/supPage/temperature/temperature-beihairenyi";
import temperatureWuJing from "@/Page/patientInfo/supPage/temperature/temperature-wujing";
import temperatureWHFK from "@/Page/patientInfo/supPage/temperature/temperature-whfk";
import temperatureFSXT from "@/Page/patientInfo/supPage/temperature/temperature-fsxt";
import temperatureSDLJ from "@/Page/patientInfo/supPage/temperature/temperature-sdlj";
import temperatureLYXRM from "@/Page/patientInfo/supPage/temperature/temperature-lyxrm";
import temperatureWHHK from "@/Page/patientInfo/supPage/temperature/temperature-whhk";
import temperatureLYYZ from "@/Page/patientInfo/supPage/temperature/temperature-lyyz";
import temperatureWHSL from "@/Page/patientInfo/supPage/temperature/temperature-whsl";
import temperatureNFZXY from "@/Page/patientInfo/supPage/temperature/temperature-nanfangzhongxiyi";
import temperatureFSSY from "@/Page/patientInfo/supPage/temperature/temperature-foshanrenyi";
import temperatureDGXG from "@/Page/patientInfo/supPage/temperature/temperature-xiegang.vue";
import temperatureGDTJ from "@/Page/patientInfo/supPage/temperature/temperature-gdtj.vue";
import temperatureZHZXY from "@/Page/patientInfo/supPage/temperature/temperature-zhzxy.vue";
import temperatureYTLL from "@/Page/patientInfo/supPage/temperature/temperature-linlong.vue";
import sheet from "@/Page/patientInfo/supPage/sheet/sheet.vue"; //护理记录单
import bloodSugar from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar.vue"; //血糖
import bloodSugarBhry from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_bhry.vue"; //血糖
import bloodSugarZhzxy from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_zhzxy.vue"; //血糖
import bloodSugarNfyksdyy from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_nfyksdyy.vue"; //血糖
import bloodSugarGdtj from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_gdtj"; // 广东同江
import bloodSugarFsxt from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_fsxt.vue"; //血糖
import bloodSugarZjhj from "@/Page/patientInfo/supPage/blood-sugar/blood-sugar_zjhj.vue"; //血糖
import bloodSugarSdlj from "@/Page/patientInfo/supPage/blood-sugar-sdlj/blood-sugar-sdlj.vue"; //血糖
import bloodOxygen from "@/Page/patientInfo/supPage/oxygen-sugar/oxygen-sugar"; // 血氧
import rightPart from "@/Page/patientInfo/supPage/record/component/right-part/right-part.vue";
import { getPatientInfo } from "@/api/common.js";
import { getPatientForm } from "@/Page/patientInfo/supPage/blood-sugar-sdlj/api/index.js"; //获取患者存在表单id

import bus from "vue-happy-bus";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      otherComponent: null,
      isBloodSugarSdlj: false, //顺德龙江血糖单类型
      gotoUrl: ""
    };
  },
  created() {
    this.gotoUrl = window.location.href;
    this.initDoc();
    // 获取患者信息
  },
  methods: {
    getPatientForm() {
      getPatientForm(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then(res => {
        let data = res.data.data || {};
        if (data.hisPatSugarList) {
          // 接口儿童单子特有的字段 hisPatSugarList
          // '儿童'
          this.isBloodSugarSdlj = false;
        } else {
          // '成人'
          this.isBloodSugarSdlj = true;
        }
      });
    },
    // 获取各医院的血糖单
    getBloodSugar() {
      switch (process.env.HOSPITAL_ID) {
        case "beihairenyi":
          return bloodSugarBhry;
        case "fsxt":
          return bloodSugarFsxt;
        case "zjhj":
          return bloodSugarZjhj;
        case "zhzxy":
          return bloodSugarZhzxy;
        case "gdtj":
          return bloodSugarGdtj;
          case "nfyksdyy":
          return bloodSugarNfyksdyy;
        case "sdlj":
          if (this.isBloodSugarSdlj) {
            return bloodSugarSdlj;
          } else {
            return bloodSugar;
          }

        default:
          return bloodSugar;
      }
    },
    // 获取各医院的体温单
    getTemplate() {
      switch (process.env.HOSPITAL_ID) {
        case "huadu":
          return temperatureHD;
        case "liaocheng":
          return temperatureLCEY;
        case "guizhou":
          return temperatureGuizhou;
        case "fuyou":
          return temperatureJmfy;
        case "hengli":
          return temperatureDghl;
        case "wujing":
          return temperatureWuJing;
        case "beihairenyi":
          return temperatureBhry;
        case "whfk":
          return temperatureWHFK;
        case "lyxrm":
        case "stmz":
          return temperatureLYXRM;
        case "sdlj":
          return temperatureSDLJ;
        case "fsxt":
          return temperatureFSXT;
        case "nanfangzhongxiyi":
          return temperatureNFZXY;
          case "whhk":
          return temperaturewhhk;
        case "foshanrenyi":
          return temperatureFSSY;
        case "xiegang":
        case "qhwy":
          return temperatureDGXG;
        case "whsl":
          return temperatureWHSL;
        case "lyyz":
          return temperatureLYYZ;
        case "gdtj":
          return temperatureGDTJ;
        case "zhzxy":
          return temperatureZHZXY;
        case "ytll":
          return temperatureYTLL;
        default:
          return temperature;
      }
    },
    // 获取患者信息
    getPatientInfo() {
      getPatientInfo(
        this.$route.query.patientId,
        this.$route.query.visitId
      ).then(res => {
        let data = res.data.data || {};
        let patientInfo = this.$store.state.sheet.patientInfo;
        //let patientInfo = res.data.data ;
        //优化访问crNursing/nursingPreview无数据问题问题（由于无admissionDate造成）
        patientInfo.admissionDate = data.admissionDate;
        patientInfo.wardCode = data.wardCode;
        this.$store.commit("upPatientInfo", patientInfo);
      });
    },
    //初始化方法
    async initDoc() {
      // 医生查看病人评估单&记录单（陵城） 查看病人病历、检查、检验（厚街合理用药）
      let url = {};
      if (this.HOSPITAL_ID == "fuyou") {
        //江门妇幼解密
        let decodelUrl = this.UrlDecode(this.$route.query.param);
        url = JSON.parse(decodelUrl);
      } else {
        url = this.$route.query;
      }
      var token =
        (window.app && window.app.$getCookie("NURSING_USER").split("##")[1]) ||
        url.token;
      if (!token) {
        await this.toLogin2();
      } else {
        // await this.getPage(url);
        this.getPatientInfo();
        //判断顺德龙江血糖单类型
        this.getPatientForm();
        this.$store.commit("closeFullPageRecord");
        this.bus.$on("openOtherForm", data => {
          this.otherComponent =
            data.component == "temperature"
              ? this.getTemplate()
              : data.component == "bloodSugar"
              ? this.getBloodSugar()
              : data.component;
        });
        this.bus.$on("openAssessmentBox", data => {
          this.otherComponent = null;
        });
      }
    },
    //UrlDecode解码
    UrlDecode(zipStr) {
      console.log(zipStr);
      var uzipStr = "";
      for (var i = 0; i < zipStr.length; i += 1) {
        var chr = zipStr.charAt(i);
        if (chr === "+") {
          uzipStr += " ";
        } else if (chr === "%") {
          var asc = zipStr.substring(i + 1, i + 3);
          if (parseInt("0x" + asc) > 0x7f) {
            uzipStr += decodeURI(
              "%" + asc.toString() + zipStr.substring(i + 3, i + 9).toString()
            );
            i += 8;
          } else {
            uzipStr += this.AsciiToString(parseInt("0x" + asc));
            i += 2;
          }
        } else {
          uzipStr += chr;
        }
      }
      return uzipStr;
    },
    StringToAscii(str) {
      return str.charCodeAt(0).toString(16);
    },
    AsciiToString(asccode) {
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
          this.formatRoute(url);
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
      let url = {};
      if (this.HOSPITAL_ID == "fuyou") {
        //江门妇幼解密
        let decodelUrl = this.UrlDecode(this.$route.query.param);
        url = JSON.parse(decodelUrl);
      } else {
        url = this.$route.query;
      }
      let data = {
        userName: url.userName,
        nonce: url.nonce,
        timestamp: url.timestamp,
        sign: url.sign
      };
      console.log("data :>> ", data);
      let isLogin = true; //是否登录成功
      await checkLogin(data) //登录
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
            isLogin = false;
          }
        })
        .catch(err => {
          this.errorMsg = err.data.desc;
          isLogin = false;
          console.dir(err);
        });
      //跳转页面
      isLogin && (await this.getPage(url));
    },
    //跳转路由
    async getPage(url) {
      let newUrl = url;
      let patientId = url.patientId,
        visitId = url.visitId || "all";
      let isError = false;
      if ((!url.patientId || !url.visitId) && url.expand1) {
        const newData = await this.getPatientIdAndVisitId(url.expand1);
        // (newData.res) && ({patientId,visitId}=newData.res);
        if (newData.res) {
          newUrl.patientId = newData.res.patientId;
          newUrl.visitId = newData.res.visitId;
          console.log("newUrl", newUrl);
        }
        !newData.res && (isError = true);
        console.log("newData", newData);
        // console.log("ssssnewData")
      }
      if (isError) return false;
      console.log("url", newUrl);
      this.formatRoute(newUrl);
    },
    //获取patientId visitId
    async getPatientIdAndVisitId(expand1) {
      let params = {
        res: null, //数据集合
        error: null //错误提示
      };
      await getPatient(expand1)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            params.res = res.data.data.id;
          } else {
            try {
              params.error = res.data.desc;
              this.errorMsg = res.data.desc;
            } catch (error) {
              params.error = error;
              this.errorMsg = error;
            }
          }
        })
        .catch(error => {
          console.log(error);
          params.error = error;
          this.errorMsg = error;
        });
      return params;
    },
    /** 选择路由地址，修改参数 */
    formatRoute(url) {
      let type,
        patientId = url.patientId,
        visitId = url.visitId || "all";
      console.log(patientId, visitId);

      let timeId = setTimeout(() => {
        const src = this.gotoUrl.split("crNursing")[1];
        this.$router.push(src);
      }, 500);
    }
  },
  components: {
    treeNursingDocView,
    rightPart,
    sheet,
    bloodSugar,
    bloodSugarBhry,
    bloodSugarFsxt,
    bloodSugarZjhj,
    bloodSugarGdtj,
    bloodSugarSdlj,
    bloodSugarZhzxy,
    bloodOxygen,
    temperature,
    temperatureHD,
    temperatureLCEY,
    temperatureGuizhou,
    temperatureJmfy,
    temperatureDghl,
    temperatureWuJing,
    temperatureBhry,
    temperatureWHFK,
    temperatureLYXRM,
    temperatureLYYZ,
    temperatureWHHK,
    temperatureSDLJ,
    temperatureFSXT,
    temperatureNFZXY,
    temperatureFSSY,
    temperatureDGXG,
    temperatureWHSL,
    temperatureGDTJ,
    temperatureZHZXY,
    temperatureYTLL
  }
};
</script>
