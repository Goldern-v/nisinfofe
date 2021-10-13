<template>
  <div>
    <div class="contain">
      <div class="print-btn tool-btn" @click="onPrint()">打印</div>
      <!-- <div class="print-btn tool-btn" @click="typeIn()">录入</div> -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage = 1">
          首周
        </button>
        <button :disabled="currentPage === 1" @click="currentPage--">
          上一周
        </button>
        <span class="page">第{{ currentPage }}页/共{{ pageTotal }}页</span>
        <button :disabled="currentPage === pageTotal" @click="currentPage++">
          下一周
        </button>
        <button
          :disabled="currentPage === pageTotal"
          @click="currentPage = pageTotal"
        >
          尾周
        </button>
      </div>
      <div class="tem-con" :style="contentHeight">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id="printID"
          v-if="filePath"
          :src="filePath"
          frameborder="0"
          ref="pdfCon"
          class="lcIframe"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import nullBg from "../../../../components/null/null-bg";
import {
  getNurseExchangeInfo,
  getNurseExchangeInfoByTime,
} from "../../../sheet-page/api/index";
import moment from "moment";
import bus from "vue-happy-bus";
export default {
  props: {
    queryTem: Object,
  },
  data() {
    return {
      bus: bus(this),
      date: "",
      filePath: "",
      contentHeight: { height: "" },
      currentPage: 1,
      pageTotal: 1,
      open: false,
      isSave: false,
      visibled: false,
      intranetUrl:
        // "http://192.168.20.70:8080/#/" /* 医院正式环境内网 导致跨域 */,
        "http://192.168.19.162:9091/temperature/#/" /* 医院正式环境内网 导致跨域 */,
      // "http://192.168.20.70:8081/#/" /* 医院正式环境内网 */,
      outNetUrl:
        "http://218.14.180.38:9091/temperature/#/" /* 医院正式环境外网：想要看iframe的效果，测试的时候可以把本地的地址都改成外网测试 */,
    };
  },
  methods: {
    onPrint() {
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "printing" },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
    },
    getImg() {
      let date = new Date(this.queryTem.admissionDate).Format("yyyy-MM-dd");
      let patientId = this.queryTem.patientId;
      let visitId = this.queryTem.visitId;
      /* 单独处理体温单，嵌套iframe */
      const tempUrl = `${this.intranetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 内网 */
      // const tempUrl = `${this.intranetUrl}?PatientId=0000944876&VisitId=2&StartTime=2021-05-13&showInnerPage=1`;/* 内网 */
      // const tempUrl = `${this.outNetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 外网 */
      this.filePath = "";
      setTimeout(() => {
        this.filePath = tempUrl;
      }, 0);
    },
    getHeight() {
      this.contentHeight.height = window.innerHeight - 110 + "px";
    },
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "pageTotal":
            this.pageTotal = e.data.value;
            this.currentPage = e.data.value;
            break;
          case "getNurseExchangeInfo":/* 转科转床接口*/
          // const params = {
          //   patientId: this.$route.query.patientId,
          //   visitId: this.$route.query.visitId
          // };
          // // 发请求
          // getNurseExchangeInfo(params.patientId, params.visitId).then(res => {
          //   const value = {
          //     adtLog: res.data.data.adtLog,
          //     bedExchangeLog: res.data.data.bedExchangeLog
          //   };
          //   this.$refs.pdfCon.contentWindow.postMessage(
          //     { type: "nurseExchangeInfo", value },
          //     "*"
          //   );
          // });
          const params = {
            patientId: this.$route.query.patientId,
            startLogDateTime: e.data.value.startLogDateTime,
            endLogDateTime: e.data.value.endLogDateTime,
            visitId: this.$route.query.visitId
          };
          getNurseExchangeInfoByTime(params).then(res => {
            console.log('请求数据',res)
            const value = {
              adtLog: res.data.data.adtLog,
              bedExchangeLog: res.data.data.bedExchangeLog
            };
            this.$refs.pdfCon.contentWindow.postMessage(
              { type: "nurseExchangeInfo", value },
              "*"
            );
          });
          break;
          default:
            break;
        }
      }
    },
    closeModal() {
      /* 关闭弹窗时清除弹窗 */
      this.visibled = false;
      if (this.isSave) {
        setTimeout(() => {
          this.currentPage = 1;
          this.getImg();
        }, 1000);
      }
    },
    
  },
  watch: {
    currentPage(value) {
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
    },
  },
  mounted() {
    this.bus.$on("saveSheetPage", (data) => {
      if (data === "noSaveSign" || data === true) {
        this.isSave = true;
      }
    });
    this.bus.$on("sheetToolLoaded", () => {
      this.bus.$emit("getBlockList");
    });
    this.bus.$on("refreshImg", () => {
      this.getImg();
    });
  },
  created() {
    // this.getImg();
    window.addEventListener("resize", this.getHeight);
    window.addEventListener("message", this.messageHandle, false);
    this.getHeight();
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
  },
  beforeDestroy() {
    window.removeEventListener("message", this.messageHandle, false);
  },
  components: {
    nullBg,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 15px 20px 0;

  .tem-con {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0px;
    margin: 10px auto;
    background: #fff;

    .lcIframe {
      transform: scale(0.95);
      width: 100%;
      height: 100%;
    }
  }
}

.pagination {
  display: inline;
  position: relative;
  left: 20%;
  font-weight: normal;
}

.page {
  margin: 0 10px;
}

button {
  cursor: pointer;
}

button[disabled=disabled] {
  cursor: not-allowed;
}

.tool-btn {
  width: 82px;
  height: 32px;
  background: #FFFFFF;
  border: 1px solid #C2CBD2;
  border-radius: 4px;
  // display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  margin: 0 5px;

  &:hover {
    color: #4BB08D;
    border-color: #4BB08D;
    cursor: pointer;
  }

  &.disable {
    color: #b5b5b5;
    border-color: #b5b5b5;
    cursor: not-allowed;
  }
}

.print-btn {
  position: relative;
  left: 5%;
  top: 0;
  display: inline-flex !important;
}
</style>
