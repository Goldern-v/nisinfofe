<template>
  <div class="patient-info-slide">
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <div class="slide-con" v-show="show">
        <div class="head-con" flex="cross:center main:justify">
          <span class="title">患者资料</span>
          <!-- <span class="close-btn" @click="close">
            <i class="el-icon-close"></i>
          </span>-->
        </div>

        <div class="list-con">
          <div class="item-box">
            <img src="../images/检查报告@2x.png" alt class="label-icon" />
            <div class="label">检查报告</div>
            <el-button @click="openModal('inspectModal')">查看</el-button>
          </div>
          <div class="item-box">
            <img src="../images/检验报告@2x.png" alt class="label-icon" />
            <div class="label">检验报告</div>
            <el-button @click="openModal('testModal')">查看</el-button>
          </div>
          <div class="item-box">
            <img src="../images/医嘱@2x.png" alt class="label-icon" />
            <div class="label">患者医嘱</div>
            <el-button @click="openModal('adviceModal')">查看</el-button>
          </div>
          <div class="item-box" v-if="HOSPITAL_ID == 'foshanrenyi'">
            <div class="label-icon"></div>
            <div class="label">360视图</div>
            <el-button @click="openModal('360')">查看</el-button>
          </div>
          <div class="item-box" v-if="HOSPITAL_ID == 'lingcheng'">
            <img src="../images/检验报告@2x.png" alt class="label-icon" />
            <div class="label">病历</div>
            <el-button @click="openModal('doctorEmrModal')">查看</el-button>
          </div>
          <div class="item-box" v-if="HOSPITAL_ID == 'quzhou'">
            <img src="../images/检验报告@2x.png" alt class="label-icon" />
            <div class="label">患者病历</div>
            <el-button @click="openModal('doctorEmrModal')">查看</el-button>
          </div>
          <div class="item-box" v-for="(v, i) in extraList" :key="i">
            <img src="../images/检验报告@2x.png" alt class="label-icon" />
            <div class="label">{{ v.name }}</div>
            <el-button @click="openModal('iframeModal', {url: v.url})">查看</el-button>
          </div>
        </div>
        <inspectModal ref="inspectModal" v-if="show"></inspectModal>
        <testModal ref="testModal" v-if="show"></testModal>
        <adviceModal ref="adviceModal" v-if="show"></adviceModal>
        <doctorEmrModal ref="doctorEmrModal" v-if="show"></doctorEmrModal>
        <iframeModal ref="iframeModal" v-if="show" />
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
.do-box {
  .el-checkbox__label {
    font-size: 12px;
    color: #687179;
    white-space: normal;
  }

  textarea {
    font-size: 12px;
    color: #687179;
  }
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.no-do-bg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.slide-con {
  width: 230px;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  top: 101px;
  bottom: 0;
  right: 0;
  background: #fff;
  box-shadow: -3px 2px 5px 0px rgba(0, 0, 0, 0.08);
  z-index: 1;
  background: #fff;
}

.head-con {
  height: 38px;
  background: #F7FAFA;
  border-bottom: 1px solid #EAEEF1;
  padding: 0 10px 0 20px;

  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
  }

  .close-btn {
    font-size: 12px;
    padding: 10px 10px;
    cursor: pointer;
  }
}

.list-con {
  padding: 12px;

  .item-box {
    height: 45px;
    background: rgba(248, 248, 248, 1);
    border-radius: 3px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .label-icon {
      width: 16px;
      height: 16px;
      margin-left: 12px;
      margin-right: 11px;
    }

    .label {
      flex: 1;
      color: #6E767E;
      font-size: 13px;
    }

    >>>.el-button {
      border-radius: 3px;
      padding: 6px 12px;
      margin-right: 6px;
      font-size: 12px;

      &:hover {
        color: #fff;
        border-color: #4CB08D;
        background: #4CB08D;
      }
    }

    &:hover {
      .label {
        color: #333333;
        font-weight: bold;
      }
    }
  }
}
</style>

<script>
import bus from "vue-happy-bus";
import inspectModal from "./inspect-modal";
import testModal from "./test-modal";
import adviceModal from "./advice-modal";
import doctorEmrModal from "./doctor-emr-modal";
import iframeModal from "@/Page/sheet-page/components/sheet-tool/modal/iframe-modal.vue";
import md5 from "md5";
export default {
  data() {
    return {
      bus: bus(this),
      show: false,
    };
  },
  computed: {
    extraList() {
      switch(this.HOSPITAL_ID) {
        case 'huadu':
        case 'zhzxy':
        case 'whsl':
          return [
            {
              name: '360视图',
              url: this.url360()
            }
          ]
        default:
          return []
      }
    },
    selectPatient() {
      return this.$store.state.patient.currentPatient;
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
      this.$emit("onClose");
    },
    toggle() {
      this.show = !this.show;
    },
    openModal(name, feature) {
      if(name == '360'){
        window.open(`http://hz360.fsyyy.com:8081/cdr/personal/?patientId=${this.$route.query.patientId}&visitNumber=1&systemcode=HLXT&doctorcode=${JSON.parse(localStorage.user).empNo}&oporIp=IP`)
      }else this.$refs[name].open(feature);
    },
    url360() {
      const { patientId, deptCode, visitId } = this.selectPatient;
      const { inpNo = '' } = this.$route.query
      // const { patientId } = this.selectPatient;
      const { empNo, empName } = (JSON.parse(localStorage.user) || {})
      const huaduURL = `http://172.16.8.135:9092/?vid=${inpNo}&vidType=02&appId=360&security=123#/personInfo`;
      const zhzxyURL = `http://10.95.6.17:9016/index.html#appid=FFEC62BF-AFE5-49CA-8E64-8A5AE79D8DEF&ysdm=${empNo}&hzid=${patientId}&jzlb=3`;
      const whslURL = `http://10.108.1.33/hostPages-ui/caseHistoryBrowse/?_sys=INPD&_userId=${empNo}&sys=INPD&oldPatientId=&patientId=${patientId}&source=2&visitId=${visitId}&userData={"userCode":"${empNo}","orgCode":"${deptCode}","key":"${md5(empNo + "@wego2022")}"}&data={"patientId":"${patientId}","visitId":"${visitId}","PatientType":"2"}&isExternal=1`
      const url360Map = {
        'huadu': huaduURL,
        'zhzxy': zhzxyURL,
        'whsl': whslURL
      }
      return url360Map[this.HOSPITAL_ID];
    },
  },
  created() {},
  mounted() {},
  watch: {},
  components: {
    inspectModal,
    testModal,
    adviceModal,
    doctorEmrModal,
    iframeModal,
  }
};
</script>
