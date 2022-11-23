<template>
  <div class="patient-info-slide">
    <div class="no-do-bg" v-show="show" @click="close"></div>
    <transition name="el-zoom-in-left">
      <!-- 护理记录单页面用原本样式。不是护理记录单页面就往上移30px -->
      <div :class="{'slide-con':true,'otherSlide-con':faultNurseRecordList}" v-show="show">
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
          <div class="item-box" v-if="['lingcheng','lyxrm','foshanrenyi'].includes(HOSPITAL_ID)">
            <img src="../images/检验报告@2x.png" alt class="label-icon" />
            <div class="label">病历</div>
            <el-button @click="openModal('doctorEmrModal')">查看</el-button>
          </div>
          <div class="item-box" v-if="['quzhou','whfk'].includes(HOSPITAL_ID)">
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

.otherSlide-con{
   top: 71px;
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
import iframeModal from "./iframe-modal";
import { mapState } from 'vuex';
import md5 from "md5";
export default {
  props:{
    // 解决不是护理记录单样式问题。
    faultNurseRecordList:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      bus: bus(this),
      show: false
    };
  },
  computed: {
    extraList() {
      switch(this.HOSPITAL_ID) {
        case 'lyxrm':
          return [
            {
              name: '全景病历',
              url: this.url360()
            }
          ]
        case 'xiegang':
          return [
            {
              name: '病历',
              url: this.urlRecord()
            }
          ]
        case 'whsl':
          return [
            {
              name: '360视图',
              url: this.whslViewUrl()
            }
          ]
        default:
          return []
      }
    },
     ...mapState({
      patient: (state) => state.patient.currentPatient
    }),
    empNo() {
      try {
        return JSON.parse(localStorage.user).empNo;
      } catch (error) { }
    },
    empName() {
      try {
        return JSON.parse(localStorage.user).empName;
      } catch (error) { }
    },
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
    openModal(name,feature) {
      this.$refs[name].open(feature);
    },
    url360() {
      const { patientId = '' } = this.$route.query
      return `http://192.168.4.206:8082/TJEMRProject/visitRecordList?authorityId=49486019-X&patId=${patientId}`
    },
    urlRecord() {
      let { patientId = '', visitId = '' } = (this.$route.query || {})
      if (patientId == '' || visitId == '') {
        let params = this.$route
        patientId = params.patientId || ''
        visitId = params.visitId || ''
      }
      return `http://10.45.0.184/EmrVieww/Index.aspx?hospital_no=45722882244190011A1001&patient_id=${patientId}&visit_id=${visitId}`
    },
    whslViewUrl(){
      const {patientId,deptCode} = this.patient;
       return `http://10.108.1.33/pdv-ui/medicalLeportList/?ViewType=3&patientId=${patientId}&userName=${this.empName}&Hash=${md5(patientId+this.empName+'wego2022')}&patientType=&userData={"userCode":"${this.empNo}","orgCode":"${deptCode}","key":"${md5(this.empNo+'@wego2022')}"}&isExternal=1`
    },
  },
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
