<template>
  <div>
    <div class="contain">
      <!-- <el-dropdown > -->
      <div class="print-btn tool-btn" @click="onPrint()">打印</div>
      <div class="newBorn">
        <div @click="nomalModel()" class="nomal">默认体温单</div>
        /
        <div @click="changeModel()" class="newBornNomal">新生儿版本</div>
      </div>
      <div :class="rightSheet === true ? 'pagination' : 'paginationRight'">
        <button :disabled="currentPage === 1" @click="currentPage = 1;toCurrentPage = 1;">
          首周
        </button>
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
      <null-bg v-show="!filePath" class=""></null-bg>
      <div class="tem-con" :style="contentHeight" v-if="filePath">

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
      toCurrentPage: 1,
      pageTotal: 1,
      showTemp: true, //默认选择标准的体温单曲线
      open: false,
      isSave: false,
      visibled: false,
      intranetUrl:
        // "http://192.168.31.79:8081/#/" /* 医院正式环境内网 导致跨域 */,
        "http://ydhlpt.gzsrm.com:8588/temperature/#/" /* 医院正式环境内网 */,
      newBornUrl: "http://ydhlpt.gzsrm.com:8588/temperaturenew/#/",
      // printAllUrl:
      //   "http://192.168.8.158:8588/temperature/#/printAll" /* 医院正式环境内网批量打印 */,
    };
  },
  methods: {
    onPrint() {
      setTimeout(() => {
        this.$refs.pdfCon.contentWindow.postMessage(
          { type: "printing" },
          this.intranetUrl /* 内网 */
          // this.outNetUrl /* 外网 */
        );
      }, 1500);
    },
    // printAll() {
    //   setTimeout(() => {
    //     this.$refs.pdfConAll.contentWindow.postMessage(
    //       { type: "printingAll" },
    //       this.printAllUrl /* 内网 */
    //       // this.outNetUrl /* 外网 */
    //     );
    //   }, 1500);
    // },
    changeNewBorn() {
      if (this.showTemp === true) {
        this.showTemp = false;
      } else {
        this.showTemp = true;
      }
      this.getImg();
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
    //切换疼痛体温单
    changeModel() {
      this.showTemp = false;
      document.getElementsByClassName("newBornNomal")[0].style.color = "red";
      document.getElementsByClassName("nomal")[0].style.color = "black";
      this.$store.commit("changeModel", true);

      this.getImg();
    },
    // 切换普通体温单
    nomalModel() {
      this.showTemp = true;
      document.getElementsByClassName("nomal")[0].style.color = "red";
      document.getElementsByClassName("newBornNomal")[0].style.color = "";
      this.$store.commit("changeModel", false);

      this.getImg();
    },
          //将体温单上的时间传过来，再监听到录入组件，获取录入记录
    getDataFromPage(dateTime){
      this.bus.$emit('getDataFromPage',dateTime)
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
      // const tempUrl = `${this.intranetUrl}?PatientId=0000944876&VisitId=2&StartTime=2021-05-13&showInnerPage=1`;/* 内网 */
      if (this.showTemp === false) {
        const tempUrl = `${this.intranetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}&authTokenNursing=${authTokenNursing}`; /* 内网 */
        // const tempAllUrl = `${this.printAllUrl}?PatientId=${this.patientId}&VisitId=${this.visitId}&StartTime=${this.date}&authTokenNursing=${authTokenNursing}`; /* 内网 */
        this.filePath = "";
        setTimeout(() => {
          this.filePath = tempUrl;
          // this.printAllPath = tempAllUrl;
        }, 0);
      } //显示新生儿体温曲线的时候切换url路径
      else {
        const tempUrl = `${this.intranetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 内网 */
        this.filePath = "";
        setTimeout(() => {
          this.filePath = tempUrl;
        }, 0);
      }
      // const tempUrl = `${this.outNetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 外网 */
    },
    getHeight() {
      this.contentHeight.height = window.innerHeight - 110 + "px";
    },
    openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
    },
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "pageTotal":
            this.pageTotal = e.data.value;
            this.currentPage = e.data.value;
            break;
              case "currentPage":
            this.currentPage = e.data.value;
             console.log('信息系统事件watching',e.data.value)
            break;
          case "getNurseExchangeInfo" /* 转科转床接口，聊城二院取消，花都保留 */:
            const params = {
              patientId: this.$route.query.patientId,
              startLogDateTime: e.data.value.startLogDateTime,
              endLogDateTime: e.data.value.endLogDateTime,
              visitId: this.$route.query.visitId,
            };
            getNurseExchangeInfoByTime(params).then((res) => {
              const value = {
                adtLog: res.data.data.adtLog,
                adtLogWardName:res.data.data.adtLogWardName,
                bedExchangeLog: res.data.data.bedExchangeLog,
              };
              this.$refs.pdfCon.contentWindow.postMessage(
                { type: "nurseExchangeInfo", value },
                "*"
              );
            });
            break;
          case "dblclick" /* 双击查阅体温单子 */:
            this.openRight();
            break;
              case "clickDateTime":
            this.getDataFromPage(e.data.value)
            break;
          default:
            break;
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
      this.toCurrentPage = value;
      console.log('信息系统watching',value)
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
        this.showTemp === true ? this.intranetUrl : this.newBornUrl /* 内网 */
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
  margin: 10px 10px 0;

  .newBorn {
    position: relative;
    top: 2px;
    left: 60%;
    display: inline-flex !important;
    & > div {
      cursor: pointer;
    }
  }

  .nomal {
    color: red;
    margin-right: 5px;
  }
      .null-bg {
      background-color: #fff;
      height: 1000px;
      margin-top: 5px;
    }

  .newBornNomal {
    margin-left: 5px;
  }

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
  left: -5%;
  font-weight: normal;
}

.paginationRight {
  display: inline;
  position: relative;
  left: 10%;
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

.newBorn {
  position: relative;
  top: 2px;
  left: 75%;
  display: inline-flex !important;
}

.print-btn {
  position: relative;
  left: 5%;
  top: 0;
  display: inline-flex !important;
}
</style>
