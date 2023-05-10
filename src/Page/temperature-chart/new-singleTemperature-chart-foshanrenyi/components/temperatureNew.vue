<template>
  <div>
    <div class="contain">
      <el-button-group>
        <el-button type="primary" @click="onPrint()">打印当周</el-button>
        <el-button type="primary" @click="printAll()">批量打印</el-button>
        <el-button v-if="['foshanrenyi'].includes(HOSPITAL_ID)" type="primary" @click="openDetailChat()">曲线详情</el-button>
        <el-button v-else type="primary" @click="openSignList()">体征列表</el-button>
      </el-button-group>
      <!-- <div class="print-btn tool-btn" @click="typeIn()">录入</div> -->
      <div :class="rightSheet === true ? 'pagination' : 'paginationRight'" v-show="!isPrintAll">
        <button :disabled="currentPage === 1" @click="
          currentPage = 1;
        toCurrentPage = 1;
                    ">
          首周
        </button>
        <button :disabled="currentPage === 1" @click="toPre">上一周</button>
        <span class="page">第<input type="number" min="1" v-model.number="toCurrentPage" class="pageInput"
            @keyup.enter="toPage()" />页/共{{ pageTotal }}页</span>
        <button :disabled="currentPage === pageTotal" @click="toNext">
          下一周
        </button>
        <button :disabled="currentPage === pageTotal" @click="
          currentPage = pageTotal;
        toCurrentPage = pageTotal;
                    ">
          尾周
        </button>
        <button @click="() => { this.bus.$emit('dateChangeEvent', 'pre') }">
          上一日
        </button>
        <button @click="() => { this.bus.$emit('dateChangeEvent', 'next') }">
          下一日
        </button>
<!--        <el-button-group :style="rightButton()" v-if="['nfyksdyy'].includes(HOSPITAL_ID)">-->
<!--          <el-button size="small" type="primary" @click="syncInAndOutHospital((type = '0'))" :disabled="!isDisable">同步入院</el-button>-->
<!--          <el-button size="small" type="pxrimary" @click="syncInAndOutHospital((type = '1'))" :disabled="!isDisable">同步出院</el-button>-->
<!--        </el-button-group>-->
      </div>
      <moveContext :id="'detailChatBox'" :titlex="'曲详情线'" class="detailChatBox">
        <div class="button-context">
          <el-button type="primary" @click="changeDetailChatUrl((type = 1))" class="detail-button">体温</el-button>
          <el-button type="primary" @click="changeDetailChatUrl((type = 2))" class="detail-button">脉搏</el-button>
          <el-button type="primary" @click="changeDetailChatUrl((type = 3))" class="detail-button">心率</el-button>
        </div>
        <div>
          <null-bg v-show="!filePath" :image-size="100"></null-bg>
          <iframe id="detailChat" v-if="detailChatFlag && filePath" :src="detailChatUrl" frameborder="0" ref="detailChat"
            class="detailChat"></iframe>
        </div>
      </moveContext>
      <div class="tem-con" :style="contentHeight" v-if="!isPrintAll">
        <null-bg v-show="!filePath"></null-bg>
        <iframe id="temperatureChart" :src="filePath" v-if="!isPrintAll && filePath" frameborder="0" ref="pdfCon"
          class="lcIframe"></iframe>
      </div>
      <div class="tem-con" :style="contentHeight" v-if="isPrintAll">
        <null-bg v-show="!filePath"></null-bg>
        <iframe id="chartPrintAll" :src="printAllPath" v-if="isPrintAll && printAllPath" frameborder="0" ref="pdfConAll"
          class="lcIframe"></iframe>
      </div>
    </div>
    <VitalSignList
      ref="vitalSignRef"
      :patientInfo="patientInfo"
    />
  </div>
</template>

<script>
import nullBg from "../../../../components/null/null-bg";
import moveContext from "@/Page/temperature-chart/commonCompen/removableBox.vue";
import VitalSignList from "@/Page/temperature-chart/commonCompen/VitalSignList.vue";
import moment from "moment";
import bus from "vue-happy-bus";
export default {
  props: {
    queryTem: Object,
  },
  data() {
    //佛一跟顺德医院共用录入界面 ，判断ip地址
    const baseUrl = (() => {
      switch (process.env.HOSPITAL_ID) {
        case 'foshanrenyi':
          // return "http://localhost:8080"
          return "http://192.168.103.17:9091"
        case 'nfyksdyy':
          return "http://192.168.0.200:9091" // 医院内网
          // return "http://59.38.110.189:9092" // 医院外网
          // return "http://localhost:8080" // 本地
        default:
          break;
      }
    })()
    return {
      bus: bus(this),
      date: "",
      filePath: "",
      contentHeight: { height: "" },
      currentPage: 1,
      pageTotal: 1,
      open: false,
      patientId: "",
      visitId: "",
      showVitalSign: 1,
      isSave: false,
      detailChatFlag: true,
      toCurrentPage: 1,
      isPrintAll: false,
      visibled: false,
      printAllPath: "",
      queryDate: moment().format('YYYY-MM-DD'),
      intranetUrl:
        `${baseUrl}/temperature/#/` /* 医院正式环境内网 导致跨域 */,
      // `${baseUrl}/#/` /* 医院正式环境内网 导致跨域 */,
      printAllUrl:
        `${baseUrl}/temperature/#/printAll` /* 医院正式环境内网 */,
    };
  },
  methods: {
    openSignList() {
      const params = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        wardCode: this.patientInfo.wardCode,
        recordDate: this.queryDate
      }
      this.$refs.vitalSignRef.open(params);
    },
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
    rightButton() {
      return {
        position: "relative",
        left: this.rightSheet === false ? "10%" : "4%",
      };
    },
    syncInAndOutHospital(type) {
      this.bus.$emit("syncInAndOutHospital", type);
    },
    //将体温单上的时间传过来，再监听到录入组件，获取录入记录
    getDataFromPage(dateTime) {
      this.bus.$emit("getDataFromPage", dateTime);
    },
    async openDetailChat() {
      await this.$store.commit("newDialogVisible", true);
      let value = this.currentPage;
      if (this.$refs.detailChat.contentWindow && this.filePath) {
        this.$refs.detailChat.contentWindow.postMessage(
          { type: "currentPage", value },
          this.detailChatUrl /* 内网 */
          // this.outNetUrl /* 外网 */
        );
      }
    },
    changeDetailChatUrl(type) {
      this.detailChatFlag = false;
      this.showVitalSign = type;
      setTimeout(() => {
        this.detailChatFlag = true;
      }, 0);
      setTimeout(() => {
        if (this.$refs.detailChat.contentWindow) {
          let value = this.currentPage;
          this.$refs.detailChat.contentWindow.postMessage(
            { type: "currentPage", value },
            this.detailChatUrl /* 内网 */
          );
        }
      }, 300);
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
      this.filePath = "";
      setTimeout(() => {
        this.filePath = tempUrl;
        this.printAllPath = tempAllUrl;
      }, 0);
    },
    getHeight() {
      this.contentHeight.height =
        window.innerHeight -
        (this.$route.path.includes("nursingPreview") ? 40 : 100) +
        "px";
    },
    openRight() {
      this.$store.commit("showRightPart", !this.rightSheet);
      let changeFlag = this.rightSheet
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "rightSheetChange", value: changeFlag },
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
            this.getDataFromPage(e.data.value);
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
    currentPage(value) {
      this.toCurrentPage = value;
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
        this.intranetUrl /* 内网 */
      );
      if (this.$refs.detailChat.contentWindow) {
        let value = this.currentPage;
        this.$refs.detailChat.contentWindow.postMessage(
          { type: "currentPage", value },
          this.detailChatUrl /* 内网 */
          // this.outNetUrl /* 外网 */
        );
      }
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
    this.bus.$on("dateChangePage", (value) => {
      value = moment(value).format("YYYY-MM-DD");
      this.queryDate = value;
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "dateChangePage", value },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
    });
  },
  computed: {
    detailChatUrl() {
      let path = `${this.intranetUrl}detailed`;
      return `${path}?showVitalSign=${this.showVitalSign}`; /* 外网 */
    },
    rightSheet() {
      return this.$store.state.temperature.rightPart;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    authTokenNursing() {
      return JSON.parse(localStorage.getItem("user")).token; //获取登录token
    },
    isDisable(){
    return (
      this.$route.path.includes("newSingleTemperatureChart") ||
      this.$route.path.includes("temperature")
    )
    }
  },
  beforeDestroy() {
    window.removeEventListener("message", this.messageHandle, false);
  },
  components: {
    nullBg,
    moveContext,
    VitalSignList,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.detailChatBox {
  position: absolute;
  right: 10%;
  top: 15px;
  width: 1000px;
  height: 400px;
  z-index: 999;
  box-shadow: -2px 0 7px -1px black; // 左边阴影;
  background: #fff;
}
/deep/ .el-dialog {
  top: 50%!important;
  left: 50%;
  transform: translate(-50%, -50%);
}
/deep/ .el-dialog__footer {
  text-align: center !important;
  background: #f9fafa;
  border-top: 1px solid #ddd;
}
.detailChat {
  width: 100%;
  height: 400px;
}

.button-context {
  height: 50px;
  background: rgb(240, 240, 241);

  button {
    position: relative;
    top: 10px;
    width:78px;
  }
}

.detail-button {
  margin-left: 25px;
  width: 100px;
}

.contain {
  margin: 10px 10px 0;

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
    button {
      width:60px !important;
    }
  }
}

.pagination {
  display: inline;
  position: relative;
  font-weight: normal;
}

.paginationRight {
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
  width: 30px;
  border: 0px;
}

.print-btn {
  position: relative;
  left: 5%;
  top: 0;
  display: inline-flex !important;
}
.el-button {
  width:77px !important;
  }
</style>
