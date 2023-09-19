<template>
  <div>
    <div class="contain">
      <div class="top_contain">
        <el-button-group>
        <el-button type="primary" @click="onPrint()">打印当周</el-button>
        <el-button type="primary" @click="printAll()">批量打印</el-button>
        <el-button v-if="['925'].includes(HOSPITAL_ID)" type="primary" @click="openSignList()">体征列表</el-button>
      </el-button-group>
      <div :class="rightSheet === true ? 'pagination' : 'paginationRight'">
        <button
          :disabled="currentPage === 1"
          @click="
            currentPage = 1;
            toCurrentPage = 1;
          "
        >
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
      <el-button-group>
          <el-button type="primary" @click="syncInAndOutHospital((type = '0'))"
            >同步入院</el-button
          >
          <el-button type="primary" @click="syncInAndOutHospital((type = '1'))"
            >同步出院</el-button
          >
        </el-button-group>
      </div>
      <div class="tem-con" :style="contentHeight" v-if="!isPrintAll">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id="temperatureChart"
          v-if="filePath&&!isPrintAll"
          :src="filePath"
          frameborder="0"
          ref="pdfCon"
          class="lcIframe"
        ></iframe>
      </div>
      <div class="tem-con" :style="contentHeight" v-if="isPrintAll">
        <null-bg v-show="!filePath"></null-bg>
        <iframe
          id="chartPrintAll"
          :src="printAllPath"
          frameborder="0"
          v-if="printAllPath&&isPrintAll"
          ref="pdfConAll"
          class="lcIframe"
        ></iframe>
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
import VitalSignList from "@/Page/temperature-chart/commonCompen/VitalSignList.vue";
import bus from "vue-happy-bus";
import moment from "moment";
export default {
  props: {
    queryTem: Object,
  },
  data() {
    //跟925医院共用录入界面 ，判断ip地址
    const baseUrl=(()=>{
  switch (process.env.HOSPITAL_ID) {
    case 'sdlj':
      return "http://192.168.168.82:9091"
    case '925':
      return "http://192.168.1.37:9091"
    case 'dglb':
      return "http://10.51.7.22:9091"
      // return "http://219.131.142.78:9094"
    default:
      break;
  }
 })()
    return {
      bus: bus(this),
      date: "",
      filePath: "",
      printAllPath:"",
      contentHeight: { height: "" },
      currentPage: 1,
      toCurrentPage: 1,
      pageTotal: 1,
      open: false,
      isSave: false,
      isPain: false,
      showTemp: true, //默认选择标准的体温单曲线
      visibled: false,
      isPrintAll: false, //是否打印所有
      queryDate: moment().format('YYYY-MM-DD'),
      intranetUrl:
        // "http://192.168.1.72:8080/#/" /* 医院正式环境内网 导致跨域 */,
      `${baseUrl}/temperature/#/` /* 医院正式环境内网 导致跨域 */,
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
          this.intranetUrl
          // this.outNetUrl /* 外网 */
        );
      }, 1500);
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
    //将体温单上的时间传过来，再监听到录入组件，获取录入记录
    getDataFromPage(dateTime) {
      this.bus.$emit("getDataFromPage", dateTime);
    },
        syncInAndOutHospital(type) {
      this.bus.$emit("syncInAndOutHospital", type);
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
       this.bus.$on('dateChangePage',(value)=>{
      value=moment(value).format("YYYY-MM-DD")
        this.$refs.pdfCon.contentWindow.postMessage(
        { type: "dateChangePage", value },
        this.intranetUrl /* 内网 */
        // this.outNetUrl /* 外网 */
      );
    })
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
    VitalSignList,
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
  .top_contain {
    display: flex;
    justify-content: space-between;
  }
}
.pageInput {
  width: 50px;
  border: 0px;
}
.pagination {
  display: inline;
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

.nomal {
  color: red;
  margin-right: 5px;
}
.painNomal {
  margin-left: 5px;
}
</style>
