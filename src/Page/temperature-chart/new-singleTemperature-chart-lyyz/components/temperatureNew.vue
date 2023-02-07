<script src="../../../../../config/index.js"></script>
<template>
  <div>
    <div class="contain">
      <el-button-group>
        <el-button type="primary" @click="onPrint()">打印当周</el-button>
        <el-button type="primary" @click="printAll()">批量打印</el-button>
        <!-- <el-button type="primary" @click="openDetailChat()">曲线详情</el-button> -->
      </el-button-group>
      <!-- <div class="newBorn">
        <div @click="nomalModel()" class="nomal">默认体温单</div>
        /
        <div @click="changeModel()" class="painNomal">疼痛版本</div>
      </div> -->
      <div :class="rightSheet===true?'pagination':'paginationRight'">
        <button :disabled="currentPage === 1" @click="currentPage = 1;toCurrentPage=1">
          首周
        </button>
        <button :disabled="currentPage === 1" @click="currentPage--">
          上一周
        </button>
        <span class="page">第<input
          type="number"
          min="1"
          v-model.number="toCurrentPage"
          class="pageInput"
          @keyup.enter="toPage()"
        />页/共{{ pageTotal }}页</span>
        <button :disabled="currentPage === pageTotal"  @click="toNext">
          下一周
        </button>
        <button
          :disabled="currentPage === pageTotal"
          @click="currentPage = pageTotal"
        >
          尾周
        </button>
      </div>
      <moveContext
        :id="'detailChatBox'"
        :titlex="'曲详情线'"
        class="detailChatBox"
      >
        <div class="button-context">
          <el-button
            type="primary"
            @click="changeDetailChatUrl((type = 1))"
            class="detail-button"
          >体温</el-button
          >
          <el-button
            type="primary"
            @click="changeDetailChatUrl((type = 2))"
            class="detail-button"
          >脉搏</el-button
          >
          <el-button
            type="primary"
            @click="changeDetailChatUrl((type = 3))"
            class="detail-button"
          >心率</el-button
          >
        </div>
        <div>
          <null-bg v-show="!filePath" :image-size="100"></null-bg>
          <iframe
            id="detailChat"
            v-if="detailChatFlag && filePath"
            :src="detailChatUrl"
            frameborder="0"
            ref="detailChat"
            class="detailChat"
          ></iframe>
        </div>
      </moveContext>
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
import moveContext from "@/Page/temperature-chart/commonCompen/removableBox.vue";
import bus from "vue-happy-bus";
import moment from 'moment';


export default {
  props: {
    queryTem: Object,
  },
  data() {
    const baseUrl=(()=>{
      switch (process.env.HOSPITAL_ID) {
        case 'lyyz':
          return 'http://10.66.3.23:9091/temperature/'
        case 'whhk':
          return 'http://10.1.50.246:9091/temperature/'
        case 'zzwy':
          return 'http:192.168.61.130:9091/temperature/'
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
      toCurrentPage: 1,
      pageTotal: 1,
      open: false,
      patientId: "",
      visitId: "",
      showVitalSign: 1,
      isSave: false,
      isPain: false,
      detailChatFlag: true,
      showTemp: true, //默认选择标准的体温单曲线
      visibled: false,
      isPrintAll: false, //是否打印所有
      // intranetUrl:
      //   // "http://localhost:8080/#/" /* 本地自测环境 导致跨域 */,
      // "http://10.66.3.23:9091/temperature" /* 医院正式环境内网 导致跨域 */,
      // printAllUrl:
      //   "http://10.66.3.23:9091/temperature/printAll" /* 医院正式环境内网 */,
      intranetUrl:
      `${baseUrl}` /* 医院正式环境内网 导致跨域 */,
      printAllUrl:
        `${baseUrl}printAll` /* 医院正式环境内网 */,
    };
  },
  methods: {
    onPrint() {
      this.isPrintAll = false;
      setTimeout(() => {
        this.$refs.pdfCon.contentWindow.postMessage(
          { type: "printing" },this.intranetUrl
          // this.outNetUrl /* 外网 */
        );
      }, 1500);
    },
    //将体温单上的时间传过来，再监听到录入组件，获取录入记录
    getDataFromPage(dateTime){
      this.bus.$emit('getDataFromPage',dateTime)
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
    printAll() {
      this.isPrintAll = true; //隐藏页码控制区域
      setTimeout(() => {
        this.$refs.pdfConAll.contentWindow.postMessage(
          { type: "printingAll" },
          this.showTemp === true
            ? this.printAllUrl
            : this.withoutPainAll /* 内网 */
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
    //切换疼痛体温单
    changeModel() {
      this.showTemp = false;
      document.getElementsByClassName("painNomal")[0].style.color = "red";
      document.getElementsByClassName("nomal")[0].style.color = "black";
      this.$store.commit("changeModel", true);

      this.getImg();
    },
    // 切换普通体温单
    nomalModel() {
      this.showTemp = true;
      document.getElementsByClassName("nomal")[0].style.color = "red";
      document.getElementsByClassName("painNomal")[0].style.color = "";
      this.$store.commit("changeModel", false);

      this.getImg();
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
          case "dblclick":/* 双击查阅体温单子 */
            this.openRight();
            break;
          case "currentPage":
            this.currentPage = e.data.value;
            break;
          case "clickDateTime":
            this.getDataFromPage(e.data.value)
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
      this.toCurrentPage=value
      this.$refs.pdfCon.contentWindow.postMessage(
        { type: "currentPage", value },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
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
    detailChatUrl() {
      let path = `${this.intranetUrl}/detailed`;//正式服内网地址(http://10.66.3.23:9091/temperature/#/detailed)
      // let path = "http://localhost:8080/#/detailed";//个人测试地址
      return `${path}?showVitalSign=${this.showVitalSign}`; /* 外网 */
    },
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
    moveContext,
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
.pageInput {
  width: 50px;
  border: 0px;
}

.pagination {
  display: inline;
  position: relative;
  left: 13%;
  font-weight: normal;
}
.paginationRight{
  display: inline;
  position: relative;
  left: 23%;
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

.newBorn {
  position: relative;
  top: 2px;
  left: 55%;
  display: inline-flex !important;
}

.nomal {
  color: red;
  margin-right: 5px;
}

.painNomal {
  margin-left: 5px;
}

.print-btn {
  position: relative;
  left: 5%;
  top: 0;
  display: inline-flex !important;
}

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
  }
}

.detail-button {
  margin-left: 25px;
  width: 100px;
}

</style>
