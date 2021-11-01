<template>
  <div>
    <div class="contain">
     <el-button-group>
    <el-button type="primary"  @click="onPrint()" >打印当周</el-button>
    <el-button type="primary"  @click="printAll()">批量打印</el-button>
    </el-button-group> 
   
    
      <!-- <div class="print-btn tool-btn" @click="onToggle()">录入</div> -->
      <div class="pagination" v-show="!isPrintAll">
        <button :disabled="currentPage === 1" @click="toPre">上一页</button>
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
          下一页
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
         :class="HOSPITAL_ID === 'huadu' ? 'hdIframe' : ''"
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
          :class="HOSPITAL_ID === 'huadu' ? 'hdIframe' : ''"
        ></iframe>
      </div>
      <sweet-modal
        ref="sheet"
        title="体温录入"
        class="modal-con"
        @close="closeModal"
      >
        <single-temperature-chart
          v-if="visibled"
          class="sheet-con"
        ></single-temperature-chart>
      </sweet-modal>
    </div>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 15px 20px 0;

  .tem-con {
    margin: 10px auto;
    width: 90%;
    height: 100%;
    background: #fff;

    .hdIframe {
      transform: scale(0.9);
      width: 100%;
      height: 100%;
    }
  }
.dropDownBox{
width: 100px;
height: 50px
position: absolute;
left: 100px;
background-color red;

}
  .modal-con {
    /deep/ .isFixed {
      top: 90px !important;

      .body-con {
        display: none;
      }
    }

    /deep/ .sweet-modal {
      left: 10% !important;
      top: 10% !important;
      transform: scale(1) translate(calc(0%), 0) !important;
    }

    /deep/ .signModal {
      width: 100% !important;

      .sweet-modal {
        position: absolute;
        left: 34% !important;
        top: 10% !important;
      }
    }
  }

  .fixed-icon {
    position: fixed;
    right: 0;
    top: 140px;
    background: #ffffff;
    width: 50px;
    height: 42px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 100px 0px 0px 100px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0.1s;

    &.open {
      right: 230px;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
}

.pageInput {
  width: 50px;
  border: 0px;
}

.pagination {
  display: inline;
  position: relative;
  left: 35%;
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

<script>
import nullBg from "../../../../components/null/null-bg";
import {
  getNurseExchangeInfo,
  getNurseExchangeInfoByTime,
} from "../../../sheet-page/api/index";
import moment from "moment";
import bus from "vue-happy-bus";
import singleTemperatureChart from "./singleTemperatureChart";
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
      toCurrentPage: 1,
      open: false,
      isPrintAll:false,//是否批量打印
      printAllPath:"",
      patientId:"",
      visitId:"",
      isSave: false,
      visibled: false,
      intranetUrl:
        "http://120.238.239.27:9091/temperature/#/" /* 医院正式环境内网 导致跨域 */,
      // "http://10.10.10.75:9091/temperature/#/" /* 医院正式环境内网 */,
     printAllUrl: "http://120.238.239.27:9091/temperature/#/printAll" /* 医院正式环境批量打印内网 */,
    };
  },
  methods: {
   onPrint() {        setTimeout(()=>{
this.$refs.pdfCon.contentWindow.postMessage(
        { type: "printing" },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
      },1500)
    },
    printAll(){
      this.isPrintAll=true  //隐藏页码控制区域
        setTimeout(()=>{
this.$refs.pdfConAll.contentWindow.postMessage(
        { type: "printingAll" },
        this.printAllUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
      },1500)
    },
      
    getImg() {
      let date = this.$route.query.admissionDate
        ? new Date(this.$route.query.admissionDate).Format("yyyy-MM-dd")
        : new Date(this.queryTem.admissionDate).Format("yyyy-MM-dd");
      let patientId = this.$route.query.patientId || this.queryTem.patientId;
      let visitId = this.$route.query.visitId || this.queryTem.visitId;
      this.date=date;
      this.patientId=patientId;
      this.visitId=visitId;
     /* 单独处理体温单，嵌套iframe */
      const tempUrl = `${this.intranetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 内网 */
      const tempAllUrl = `${this.printAllUrl}?PatientId=${this.patientId}&VisitId=${this.visitId}&StartTime=${this.date}`;/* 内网 */
      // const tempUrl = `${this.outNetUrl}?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`; /* 外网 */
      this.filePath = "";
      setTimeout(() => {
        this.filePath = tempUrl;
        this.printAllPath=tempAllUrl
      }, 0);
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
    // typeIn() {
    //   const { patientId, visitId } = this.$route.query;
    //   this.$router.push(
    //     `/singleTemperatureChart/${this.$route.query.patientId}/${this.$route.query.visitId}`
    //   );
    // },
    getHeight() {
      this.contentHeight.height = window.innerHeight - 130 + "px";
    },
    messageHandle(e) {
      if (e && e.data) {
        switch (e.data.type) {
          case "dblclick":
            this.onToggle();
            break;
          case "pageTotal":
            this.pageTotal = e.data.value;
             this.currentPage = e.data.value;
            break;
          case "getNurseExchangeInfo":
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
    onToggle() {
      if (this.$route.path.includes("singleTemperatureChart")) {
        return;
      } else {
        this.visibled = true;
        this.$nextTick(() => {
          this.$refs.sheet.open();
        });
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
      this.isPrintAll=false
    },
    currentPage(value) {
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
          this.intranetUrl
      );
      this.toCurrentPage = value;
    },
  },
  mounted() {
    this.toCurrentPage = this.currentPage;
    this.bus.$on("saveSheetPage", (data) => {
      if (data === "noSaveSign" || data === true) {
        this.isSave = true;
      }
    });
    this.bus.$on("sheetToolLoaded", () => {
      this.bus.$emit("getBlockList");
    });
  },
  created() {
    this.getImg();
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
    singleTemperatureChart,
  },
};
</script>
