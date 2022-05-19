<template>
  <div>
    <div class="contain">
      <!-- <div class="print-btn tool-btn" @click="onPrint()">打印</div> -->
      <!-- <div class="print-btn tool-btn" @click="typeIn()">录入</div> -->
      <!-- <el-dropdown >
       <div class="print-btn tool-btn" >打印</div>
      <el-dropdown-menu slot="dropdown">
       <el-dropdown-item> <el-button type="primary"  @click="onPrint()">打印当周</el-button></el-dropdown-item>
    <el-dropdown-item><el-button type="primary"  @click="printAll()">批量打印</el-button></el-dropdown-item>
       </el-dropdown-menu>
      </el-dropdown> -->
      <el-button-group>
        <el-button type="primary" @click="onPrint()">打印当周</el-button>
        <el-button type="primary" @click="printAll()">批量打印</el-button>
      </el-button-group>
      <div class="pagination" v-show="!isPrintAll">
        <button :disabled="currentPage === 1" @click="currentPage = 1;toCurrentPage=1">
          首周
        </button>
        <button :disabled="currentPage === 1" @click="toPre">
          上一周
        </button>
        <span class="page">第<input
            type="number"
            min="1"
            v-model.number="toCurrentPage"
            class="pageInput"
            @keyup.enter="toPage()"
          />页/共{{ pageTotal }}页</span>
        <button :disabled="currentPage === pageTotal" @click="toNext">
          下一周
        </button>
        <button
          :disabled="currentPage === pageTotal"
          @click="currentPage = pageTotal;toCurrentPage=pageTotal"
        >
          尾周
        </button>
      </div>
      <div class="tem-con" :style="contentHeight" v-if="!isPrintAll">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id="printID"
          v-if="filePath"
          :src="filePath"
          frameborder="0"
          ref="pdfCon"
          :class="HOSPITAL_ID === 'liaocheng' ? 'lcIframe' : ''"
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
          :class="HOSPITAL_ID === 'liaocheng' ? 'lcIframe' : ''"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import nullBg from "../../../../components/null/null-bg";
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
      patientId: "",
      visitId: "",
      toCurrentPage: 1,
      printAllPath: "",
      open: false,
      isSave: false,
      isPrintAll: false, //是否打印所有
      visibled: false,
      intranetUrl:
        // "http://192.168.1.75:8080/#/" /* 医院正式环境内网 导致跨域 */,
        "http://172.17.5.41:9091/temperature/#/" /* 医院正式环境内网 导致跨域 */,
      printAllUrl:
        "http://172.17.5.41:9091/temperature/#/printAll" /* 医院正式环境内网 */,
      outNetUrl:
        "http://120.224.211.7:9091/temperature/#/" /* 医院正式环境外网：想要看iframe的效果，测试的时候可以把本地的地址都改成外网测试 */,
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
          //将体温单上的时间传过来，再监听到录入组件，获取录入记录
    getDataFromPage(dateTime){
      this.bus.$emit('getDataFromPage',dateTime)
    },
    getImg() {
      let date = new Date(this.queryTem.admissionDate).Format("yyyy-MM-dd");
      let patientId = this.queryTem.patientId;
      let visitId = this.queryTem.visitId;
      this.date = date;
      this.patientId = patientId;
      this.visitId = visitId;
      /* 单独处理体温单，嵌套iframe */
      const tempUrl = `${this.intranetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 内网 */
      const tempAllUrl = `${this.printAllUrl}?PatientId=${this.patientId}&VisitId=${this.visitId}&StartTime=${this.date}`; /* 内网 */
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
            case "currentPage":
            this.currentPage = e.data.value;
            break;
             case "clickDateTime":
            this.getDataFromPage(e.data.value)
            break;
          // case "getNurseExchangeInfo":/* 转科转床接口，聊城二院取消，花都保留 */
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
          // const params = {
          //   patientId: this.$route.query.patientId,
          //   startLogDateTime: e.data.value.startLogDateTime,
          //   endLogDateTime: e.data.value.endLogDateTime,
          //   visitId: this.$route.query.visitId
          // };
          // getNurseExchangeInfoByTime(params).then(res => {
          //   const value = {
          //     adtLog: res.data.data.adtLog,
          //     bedExchangeLog: res.data.data.bedExchangeLog
          //   };
          //   this.$refs.pdfCon.contentWindow.postMessage(
          //     { type: "nurseExchangeInfo", value },
          //     "*"
          //   );
          // });
          // break;
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
    currentPage(value) {
      this.toCurrentPage=value
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
      this.bus.$on("getDataFromPage", (dateTime) => {
      this.query.entryDate=dateTime.slice(0,10)
        this.query.entryTime=dateTime.slice(11,13)
    });
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
    width: 102%;
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
.pageInput {
  width: 50px;
  border: 0px;
}
.print-btn {
  position: relative;
  left: 5%;
  top: 0;
  display: inline-flex !important;
}
</style>
