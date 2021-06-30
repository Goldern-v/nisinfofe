<template>
  <div class="info-con">
    <div class="info-box" flex="cross:center">
      <div
        class="user-head"
        flex="cross:center main:center"
        @click="openUploadHeadModal"
        :style="img && { backgroundImage: `url(${img})` }"
      >
        <span class="text" v-show="!img">求真像</span>
      </div>
      <div class="user-text" flex-box="1">
        <div class="name">
          {{ user.empName }}
          <span class="year">（{{ user.sex }}岁）</span>
        </div>
        <div class="work">{{ user.title }}</div>
        <div class="dept">{{ user.deptName }}</div>
      </div>
      <div style="margin-right: -8px" @click="$emit('quit')">
        <whiteButton text="注销登录"></whiteButton>
      </div>
    </div>
    <div class="line"></div>
    <div class="sign-title">签名图片</div>
    <div class="sign-con">
      <div>
        <img v-if="signature" :src="signature" alt @click="setSignImg" />
      </div>
      <div v-if="!signature">
        签名图片需要护理部审核，审核通过后将应用于护理记录单，护理评估的签名处。
        <span class="setting-sign" @click="setSignImg">立即设置</span>
      </div>
    </div>
    <!-- <div class="line"></div> -->
    <!-- empNo  admin -->
    <div class="admin-system-info" v-if="HOSPITAL_ID === 'weixian'">
      证书状态:
      <p>
        <label>{{ ca_name || "无证书" }}:</label>
        <span>{{ ca_isLogin ? "已登录" : "未登录" }}</span>
      </p>
      <div class="button-con">
        <el-button size="mini" @click="openCaSignModal">证书登录</el-button>
        <el-button size="mini" @click="logoutCaSign">证书退出</el-button>
      </div>
    </div>
    <div style="padding-bottom: 10px">
      <el-switch
        v-model="showScaleTip"
        active-color="#4BB08D"
        inactive-color="#eee"
        on-text
        off-text
        @change="toggleScaleTip"
      ></el-switch>
      <b>本次登录取消缩放提示</b>
    </div>
    <SysPasswordManage
      v-if="isAdminOrNursingDepartment && HOSPITAL_ID === 'zhongshanqi'"
    />
    <div class="admin-system-info" v-if="empNo === 'admin'">
      仅管理员可见:
      <p v-for="(info, i) in adminSystemInfo" :key="i">
        <label>{{ info.key }}:</label>
        <span>{{ info.value }}</span>
      </p>
      <!-- <p><label>最近打包时间:</label><span>{{lastBuildDate}}</span></p>
      <p><label>IP代理地址:</label><span>{{proxyIP}}</span></p>-->
    </div>
    <div class="footer-con" flex="cross:center">
      <span @click="$emit('setPassword')">修改密码</span
      >&nbsp;&nbsp;|&nbsp;&nbsp; <span>个人档案</span>&nbsp;&nbsp;|&nbsp;&nbsp;
      <span @click="clear">清除缓存</span>
    </div>
    <uploadImgModal ref="uploadImgModal"></uploadImgModal>
    <caSignModal ref="caSignModal"></caSignModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.info-con {
  padding: 10px 10px 0;

  .user-head {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-image: url('../../common/images/info/头像图.png');
    background-size: cover;
    margin-right: 20px;
    cursor: pointer;

    .text {
      font-size: 12px;
      color: #FFFFFF;
      font-weight: lighter;
    }
  }

  .user-text {
    .name {
      font-size: 14px;
      color: #333333;

      .year {
        font-size: 12px;
        color: #333333;
        font-weight: lighter;
      }
    }

    .work {
      font-size: 12px;
      color: #333333;
      margin-top: 10px;
    }

    .dept {
      font-size: 12px;
      color: #687179;
      margin-top: 4px;
    }
  }
}

.line {
  border-top: 1px solid #E7EAEC;
  margin-top: 20px;
  margin-bottom: 10px;
}

.sign-title {
  margin-bottom: 10px;
  font-size: 13px;
  color: #333333;
}

.sign-con {
  font-size: 13px;
  color: #999999;
  line-height: 20px;
  min-height: 87px;

  img {
    display: block;
    margin: 0 auto;
    cursor: pointer;
    max-width: 100%;
  }
}

.setting-sign {
  color: blue;
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
}

.footer-con {
  background: #F7F7F7;
  height: 35px;
  margin: 0 -20px -10px;
  border-top: 1px solid #E7EAEC;
  padding: 0 20px;
  font-size: 12px;
  color: #687179;
  font-weight: lighter;

  span {
    cursor: pointer;

    &:hover {
      font-weight: normal;
    }
  }
}

.admin-system-info {
  padding: 10px 0px;
  line-height: 1.5em;

  p {
    display: flex;
    justify-content: space-between;
  }

  span {
    color: blue;
    padding: 0 5px;
  }
}

.button-con {
  padding: 5px 0;

  >>> .el-button {
    padding: 4px 8px;
  }

  >>> .el-button + .el-button {
    margin-left: 5px;
  }
}
</style>
<script>
import moment from "moment";
import whiteButton from "../../components/button/white-button.vue";
import uploadImgModal from "./modal/uploadImg.vue";
const SysPasswordManage = () => import("./SysPasswordManage.vue");
import bus from "vue-happy-bus";
import { imageView } from "@/api/common.js";
import common from "@/common/mixin/common.mixin.js";
import caSignModal from "@/components/modal/ca-sign";
import { $_$WebSocketObj, SignedData, Logout } from "@/api/XTXSAB.js";
import { setInterval } from "timers";
let timer = null;
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      imageView,
      img: "",
      user: JSON.parse(localStorage.user),
      signature: "",
      ca_name: "",
      ca_isLogin: "",
      strUserCertID: "",
      showScaleTip: false,
    };
  },
  computed: {
    lastBuildDate() {
      return this.systemInfo && this.systemInfo["最近打包时间"]
        ? moment(this.systemInfo["最近打包时间"]).format("YYYY-MM-DD HH:mm:ss")
        : "";
    },
    lastBuilder() {
      return this.systemInfo && this.systemInfo["最近打包人员"]
        ? this.systemInfo["最近打包人员"]
        : "";
    },
    lastVersion() {
      return this.systemInfo && this.systemInfo["版本号"]
        ? this.systemInfo["版本号"]
        : "";
    },
    proxyIP() {
      return this.systemInfo && this.systemInfo["proxyTable"]
        ? this.systemInfo["proxyTable"]["/crNursing/api"].target
        : "";
    },
    adminSystemInfo() {
      return [
        { key: "医院名", value: this.hospitalName },
        { key: "版本号", value: this.lastVersion },
        { key: "最近打包时间", value: this.lastBuildDate },
        { key: "最近打包人员", value: this.lastBuilder },
        { key: "IP代理地址", value: this.proxyIP },
        {
          key: "屏幕宽高",
          value: `${window.screen.width}x${window.screen.height}`,
        },
        { key: "Platform", value: window.navigator.platform },
        { key: "总内存", value: `${window.navigator.deviceMemory || ""} GB` },
        {
          key: "Used内存",
          value: `${this.getFileSizeWithUnit(
            window.performance.memory.usedJSHeapSize
          )}`,
        },
        { key: "CPU总线程数", value: window.navigator.hardwareConcurrency },
        {
          key: "蓝牙签名功能激活",
          value: process.env.ENABLE_BLUETOOTH_SIGN || "false",
        },
      ];
    },
  },
  methods: {
    openUploadHeadModal() {
      this.$refs.uploadImgModal.open("userHead");
    },
    getFileSizeWithUnit(size) {
      let result = "";
      if (typeof size === "number") {
        let unit = [
          { name: " B", value: Math.pow(10, 0) },
          { name: " KB", value: Math.pow(10, 3) },
          { name: " MB", value: Math.pow(10, 6) },
          { name: " GB", value: Math.pow(10, 9) },
          { name: " TB", value: Math.pow(10, 12) },
        ];
        unit.filter((u, i) => {
          // console.log('size/u.value',i,size/u.value,u.name)
          let s = Math.floor(size / u.value);
          let n = (size / u.value).toFixed(2);
          if (s < 1000 && s > 0) {
            result = n + u.name;
            return u.name;
          }
        });
        // console.log('getFileSizeWithUnit',size,result)
        return result || size;
      }
      return size;
    },
    UserImgId() {
      return JSON.parse(localStorage.user).icon;
    },
    getUserImg() {
      this.$nextTick(() => {
        let icon = this.UserImgId();
        if (icon) {
          this.img = `/crNursing/api/file/imageView/${icon}?${this.token}`;
        } else {
          this.img = "";
        }
      });
    },
    SignImgId() {
      return JSON.parse(localStorage.user).empNo;
    },
    getSignImg() {
      this.$nextTick(() => {
        let signature = this.SignImgId();
        if (signature) {
          this.signature = `/crNursing/api/file/signImage/${signature}?${this.token}`;
        } else {
          this.signature = "";
        }
      });
    },
    setSignImg() {
      return;
      this.$refs.uploadImgModal.open("signImg");
    },
    clear() {
      for (let key in localStorage) {
        if (key.includes("firtPainFormID") || key.includes("patientInfo")) {
          localStorage.removeItem(key);
        }
      }
      location.reload(true);
    },
    openCaSignModal() {
      this.$refs.caSignModal.open(() => this.getCaStatus());
    },
    getCaStatus() {
      $_$WebSocketObj.GetUserList((usrInfo) => {
        this.strUserCertID = usrInfo.retVal
          .substring(usrInfo.retVal.indexOf("||") + 2, usrInfo.retVal.length)
          .replace("&&&", "");
        this.ca_name = usrInfo.retVal.substring(
          0,
          usrInfo.retVal.indexOf("||")
        );

        SignedData(this.strUserCertID, "123213", (retValObj) => {
          this.ca_isLogin = !!retValObj.retVal;
          window.ca_isLogin = this.ca_isLogin;
          window.ca_name = this.ca_name;
        });
      });
    },
    logoutCaSign() {
      this.$confirm("是否确认退出证书登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        Logout(this.strUserCertID, (retValObj) => {
          if (retValObj.retVal) {
            this.$message.success("退出证书登录成功");
            this.getCaStatus();
          }
        });
      });
    },
    // 本次登录取消页面缩放提示
    toggleScaleTip(type) {
      type
        ? localStorage.setItem("noShowScaleTip", true)
        : localStorage.removeItem("noShowScaleTip");
    },
  },
  created() {
    this.bus.$on("refreshUserImg", () => {
      this.getUserImg();
    });
    this.bus.$on("refreshSign", () => {
      this.getSignImg();
    });
    // let HOSPITAL_ENABLE_LIST = ["威县人民医院"]
    console.log(
      "process.env.ENABLE_BLUETOOTH_SIGN",
      process.env.ENABLE_BLUETOOTH_SIGN
    );
    clearInterval(timer);
    if (process.env.ENABLE_BLUETOOTH_SIGN) {
      this.getCaStatus();
      let timer = setInterval(() => {
        this.getCaStatus();
      }, 5000);
    }
  },
  mounted() {
    this.getUserImg();
    this.getSignImg();
    this.showScaleTip = localStorage.getItem("noShowScaleTip") ? true : false;
  },
  components: {
    SysPasswordManage,
    whiteButton,
    uploadImgModal,
    caSignModal,
  },
};
</script>
