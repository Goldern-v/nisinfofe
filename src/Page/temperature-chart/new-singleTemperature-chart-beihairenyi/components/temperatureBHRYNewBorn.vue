<template>
  <div>
    <div class="contain">
      <el-dropdown>
        <div class="print-btn tool-btn">打印</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="primary" @click="onPrint()"
              >打印当周</el-button
            ></el-dropdown-item
          >
          <el-dropdown-item
            ><el-button type="primary" @click="printAll()"
              >批量打印</el-button
            ></el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <!-- <div class="print-btn tool-btn" @click="typeIn()">录入</div> -->
      <div class="pagination" v-show="!isPrintAll">
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
      <div class="tem-con" :style="contentHeight" v-show="!isPrintAll">
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
      <div class="tem-con" :style="contentHeight" v-show="isPrintAll">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id="printID"
          v-if="filePath"
          :src="printAllPath"
          frameborder="0"
          ref="pdfConAll"
          class="lcIframe"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import nullBg from "../../../../components/null/null-bg";
import {
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
      printAllPath: "",
      patientId: "",
      visitId: "",
      open: false,
      isSave: false,
      visibled: false,
      isPrintAll: false, //是否打印所有
      intranetUrl:
        "http://192.167.199.191:9091/temperature/#/newBorn" /* 医院正式环境内网 导致跨域 */,
      // "http://localhost:8080/#/newBorn" /* 医院正式环境内网 */,
      printAllUrl:
        "http://192.167.199.191:9091/temperature/#/newBornPrintAll" /* 医院正式环境内网 */,
      outNetUrl:
        "http://http://219.159.198.37:9091/temperature/#/" /* 医院正式环境外网：想要看iframe的效果，测试的时候可以把本地的地址都改成外网测试 */,
    };
  },
  methods: {
    onPrint() {
      this.isPrintAll = false;
      setTimeout(() => {
        this.$refs.pdfCon.contentWindow.postMessage(
          { type: "printing" },
          this.intranetUrl /* 内网 */
          // this.outNetUrl /* 外网 */
        );
      }, 1500);
    },
    //关闭婴儿版本体温曲线
    // closeChat() {
    //   this.$store.commit("showBabyChat", false);
    // },
    printAll() {
      this.isPrintAll = true; //隐藏页码控制区域
      setTimeout(() => {
        this.$refs.pdfConAll.contentWindow.postMessage(
          { type: "printingAll" },
          this.printAllUrl /* 内网 */
          // this.outNetUrl /* 外网 */
        );
      }, 1500);
    },
    getImg() {
      let date = new Date(this.queryTem.admissionDate).Format("yyyy-MM-dd");
      let patientId = this.queryTem.patientId;
      let visitId = this.queryTem.visitId;
      let authTokenNursing = this.authTokenNursing;
      this.date = date;
      this.patientId = patientId;
      this.visitId = visitId;
      /* 单独处理体温单，嵌套iframe */
      const tempUrl = `${this.intranetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}&authTokenNursing=${authTokenNursing}`; /* 内网 */
      const tempAllUrl = `${this.printAllUrl}?PatientId=${this.patientId}&VisitId=${this.visitId}&StartTime=${this.date}&authTokenNursing=${authTokenNursing}`; /* 内网 */
      // const tempUrl = `${this.outNetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 外网 */
      this.filePath = "";
      setTimeout(() => {
        this.filePath = tempUrl;
        this.printAllPath = tempAllUrl;
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
          case "getNurseExchangeInfo" /* 转科转床接口，聊城二院取消，花都保留 */:
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
              visitId: this.$route.query.visitId,
            };
            getNurseExchangeInfoByTime(params).then((res) => {
              const value = {
                adtLog: res.data.data.adtLog,
                bedExchangeLog: res.data.data.bedExchangeLog,
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
    patientInfo() {
      this.isPrintAll = false;
    },
    authTokenNursing(val) {
      this.authTokenNursing = val;
    },
    currentPage(value) {
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
    },
  },
  mounted() {
    this.getImg(); //新生儿的体温曲线，打开就默认加载
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
    this.$nextTick(() => {
      this.postToken();
    });
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    window.addEventListener("message", this.messageHandle, false);
    this.getHeight();
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    authTokenNursing() {
      return JSON.parse(localStorage.getItem("user")).token; //获取登录token
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
