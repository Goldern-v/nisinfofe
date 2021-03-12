<template>
  <div>
    <div class="contain">
      <div class="print-btn tool-btn" @click="onPrint()">打印</div>
      <!-- <div class="print-btn tool-btn" @click="onToggle()">录入</div> -->
      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">
          上一页
        </button>
        <span class="page">第{{ currentPage }}页/共{{ pageTotal }}页</span>
        <button :disabled="currentPage === pageTotal" @click="currentPage++">
          下一页
        </button>
      </div>
      <div class="tem-con" :style="contentHeight">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id="myIframe"
          v-if="filePath"
          :src="filePath"
          frameborder="0"
          ref="pdfCon"
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
    .hdIframe{
      transform:scale(0.9);
      width: 100%;
      height: 100%;
    }
  }
  .modal-con{
    /deep/ .isFixed{
      top:90px !important;
      .body-con{
        display :none;
      }
    }
    /deep/ .sweet-modal{
      left:10% !important;
      top:10% !important;
      transform :scale(1) translate(calc(0%), 0) !important;
    }
    /deep/ .signModal{
      width:100% !important;
      .sweet-modal{
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
  left : 5%;
  top: 0;
  display: inline-flex !important ;
}
</style>

<script>
import nullBg from "../../../../components/null/null-bg";
import {
  getNurseExchangeInfo,
  getNurseExchangeInfoByTime
} from "../../../sheet-page/api/index";
import moment from "moment";
import bus from "vue-happy-bus";
import singleTemperatureChart from "./singleTemperatureChart";
export default {
  props: {
    admissionDate: String
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
      visibled: false
    };
  },
  methods: {
    onPrint() {
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "printing" },
        "http://120.238.239.27:9091/temperature/#/"
      );
    },
    getImg() {
      let date = this.$route.query.admissionDate
        ? new Date(this.$route.query.admissionDate).Format("yyyy-MM-dd")
        : this.admissionDate;
      let patientId = this.$route.query.patientId;
      let visitId = this.$route.query.visitId;
      /* 单独处理体温单，嵌套iframe */
      const tempUrl = `http://120.238.239.27:9091/temperature/#/?PatientId=${patientId}&VisitId=${visitId}&StartTime=${date}`;
      this.filePath = "";
      setTimeout(() => {
        this.filePath = tempUrl;
      }, 0);
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
              visitId: this.$route.query.visitId
            };
            getNurseExchangeInfoByTime(params).then(res => {
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
    }
  },
  watch: {
    // date() {
    //   this.getImg();
    // },
    currentPage(value) {
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
        "http://120.238.239.27:9091/temperature/#/"
      );
    }
  },
  mounted() {
    this.bus.$on("saveSheetPage", data => {
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
    }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.messageHandle, false);
  },
  components: {
    nullBg,
    singleTemperatureChart
  }
};
</script>
