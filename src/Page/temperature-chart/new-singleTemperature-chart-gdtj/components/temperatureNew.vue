<template>
  <div>
    <div class="contain">
      <!-- <div class="print-btn tool-btn" @click="typeIn()">录入</div> -->
      <div  class="contain_top">
        <div>
          <el-button-group>
        <el-button type="primary" @click="onPrint()">打印当周</el-button>
        <el-button type="primary" @click="printAll()">批量打印</el-button>
      </el-button-group>
        </div>
        <div v-show="!isPrintAll">
          <button :disabled="currentPage === 1" @click="toPre">首周</button>
        <button :disabled="currentPage === 1" @click="currentPage--">
          上一周
        </button>
        <span class="page"
          >第<input
            type="number"
            min="1"
            v-model.number="toCurrentPage"
            class="pageInput"
            @keyup.enter="toPage()"
          />页/共{{ pageTotal }}页</span
        >
        <button :disabled="currentPage === pageTotal" @click="toNext">
          下一周
        </button>
        <button
          :disabled="currentPage === pageTotal"
          @click="currentPage = pageTotal"
        >
          尾周
        </button>
        </div>
      </div>
      <div class="tem-con" :style="contentHeight" v-if="!isPrintAll">
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
      <div class="tem-con" :style="contentHeight" v-if="isPrintAll">
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
  getNurseExchangeInfo,
  getNurseExchangeInfoByTime,
  getNurseExchangeInfoBatch,
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
      toCurrentPage: 1,
      pageTotal: 1,
      printAllPath: "",
      patientId: "",
      visitId: "",
      open: false,
      isSave: false,
      visibled: false,
      isPrintAll: false, //是否打印所有
      intranetUrl: `${this.getUrl()}/temperature/#/`,
      printAllUrl:`${this.getUrl()}/temperature/#/printAll`
    };
  },
  methods: {
    getUrl() {
        return this.$store.state.temperature.isMobile||localStorage.getItem('isMobile')=="true"?'http://218.204.204.90:9095':'http://192.168.10.98:9091'

    },
    onPrint() {
      this.isPrintAll = false;
      setTimeout(() => {
        this.$refs.pdfCon.contentWindow.postMessage(
          { type: "printing" },
          this.intranetUrl /* 内网 */
        );
      }, 1500);
    },
           //将体温单上的时间传过来，再监听到录入组件，获取录入记录
    getDataFromPage(dateTime){
      this.bus.$emit('getDataFromPage',dateTime)
    },
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
    toNext() {
      if (this.currentPage === this.pageTotal) return;
      this.currentPage++;
      this.toCurrentPage = this.currentPage;
    },
    toPre() {
      if (this.currentPage === 1) return;
      this.currentPage--;
      this.toCurrentPage = this.currentPage;
    },
    toPage() {
      if (
        this.toCurrentPage === "" ||
        this.toCurrentPage <= 0 ||
        typeof this.toCurrentPage != "number"
      ) {
        this.currentPage = 1;
        this.toCurrentPage = 1;
      } else {
        if (this.toCurrentPage >= this.pageTotal) {
          this.currentPage = this.pageTotal;
          this.toCurrentPage = this.pageTotal;
        }
      }

      this.currentPage = this.toCurrentPage;
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
      this.contentHeight.height = window.innerHeight - 100 + "px";
    },
    openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
      let changeFlag = this.rightSheet
      this.$refs.pdfCon.contentWindow.postMessage(
                  { type: "rightSheetChange", value:changeFlag },
                  "*"
                );

    },
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "pageTotal":
            this.pageTotal = e.data.value;
            this.currentPage = e.data.value;
            break;
          case "dblclick" /* 双击查阅体温单子 */:
            this.openRight();
            break;
              case "currentPage":
            this.currentPage = e.data.value;
            break;
            case "clickDateTime":
            this.getDataFromPage(e.data.value)
            break;
          case "getNurseExchangeInfoAll":
            const paramsAll = {
              patientId: this.$route.query.patientId,
              startLogDateTime: e.data.value.startLogDateTime,
              endLogDateTime: e.data.value.endLogDateTime,
              visitId: this.$route.query.visitId,
            };
            getNurseExchangeInfoBatch(paramsAll).then((res) => {
              let value = res.data.data.exchangeInfos;
              if (value.length !== 0) {
                this.$refs.pdfConAll.contentWindow.postMessage(
                  { type: "nurseExchangeInfoAll", value },
                  "*"
                );
              }
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
      this.totoCurrentPage = value;
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
        this.bus.$on('dateChangePage',(value)=>{
      value=moment(value).format("YYYY-MM-DD")
        this.$refs.pdfCon.contentWindow.postMessage(
        { type: "dateChangePage", value },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
    })
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    rightSheet() {
      return this.$store.state.temperature.rightPart;
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
  margin: 10px 10px 0 10px;

  .tem-con {
    width: 101%;
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

.paginationRight {
  display: inline;
  position: relative;
  left: 30%;
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

.pageInput {
  width: 30px;
  border: 0px;
}
.contain_top {
  display: flex;
    align-items: baseline;
    justify-content: space-evenly;
}

.print-btn {
  position: relative;
  left: 5%;
  top: 0;
  display: inline-flex !important;
}
</style>
