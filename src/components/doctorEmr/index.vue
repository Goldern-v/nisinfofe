<template>
  <div class="doctor-emr-wrapper" v-if="routeQuery.patientId">
    <div
      v-if="show && !['zhzxy', 'fsxt','dglb','whsl', 'whhk','ytll',].includes(HOSPITAL_ID)"
      v-loading="pageLoading"
      class="doctor-emr-content dragNode2"
    >
      <div class="content_title" v-drag="{ target: 'dragNode2' }">
        <div class="close-button" @click="close">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="iframeDom" style="height: 100%;">
        <iframe :src="fileUrl"></iframe>
      </div>
      <div class="se-resize" v-seResize="{ target: 'dragNode2' }"></div>
      <div class="e-resize" v-eResize="{ target: 'dragNode2' }"></div>
      <div class="s-resize" v-sResize="{ target: 'dragNode2' }"></div>
    </div>
    <template v-if="!['dglb','whhk','925'].includes(HOSPITAL_ID)">
      <el-tooltip class="item" effect="dark" content="患者资料" placement="left">
        <div class="fixed-icon" :class="{ open: open }" @click="onToggle">
          <img src="./images/患者资料@2x.png" alt v-if="HOSPITAL_ID != 'nfyksdyy'" />
          <span v-else>资料</span>
        </div>
      </el-tooltip>
    </template>
    <template v-if="!['zhzxy','dglb','whsl','925'].includes(HOSPITAL_ID)">
      <el-tooltip v-if="!show" effect="dark" content="电子病历" placement="left" :enterable="true">
        <div @click="onload" class="doctor-emr-icon">
          <img src="./img.png" v-if="HOSPITAL_ID != 'nfyksdyy'" alt/>
          <span v-else>病历</span>
        </div>
      </el-tooltip>
    </template>
    <template v-else>
      <el-tooltip effect="dark" content="电子病历" placement="left" :enterable="true">
        <div @click="onload" class="doctor-emr-icon">
          <img src="./img.png" alt/>
        </div>
      </el-tooltip>
    </template>
    <template v-if="HOSPITAL_ID == 'nfyksdyy'">
      <el-tooltip effect="dark" content="手麻" placement="left" :enterable="true">
        <div @click="onOpenNewWin('手麻')" class="doctor-feel-icon">
          <span>手麻</span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="重症" placement="left" :enterable="true">
        <div @click="onOpenNewWin('重症')" class="doctor-severe-icon">
          <span>重症</span>
        </div>
      </el-tooltip>
    </template>
        <template v-if="HOSPITAL_ID == '925'">
      <el-tooltip effect="dark" content="营养系统" placement="left" :enterable="true">
        <div @click="onOpenNourishment('营养系统')" class="doctor-feel-icon">
          <span style="font-size: 12px;">营养系统</span>
        </div>
      </el-tooltip>
    </template>
    <patientInfoSlide
      ref="patientInfoSlide"
      @onClose="onClose"
    ></patientInfoSlide>

    <!-- <div
         v-show="!show"
         @click="show = true"
         v-drag="{ target: 'dragNode2'}"
         class="doctor-emr-icon dragNode2"
     >
       电子病历
     </div>-->
     <doctorEmrModal ref="doctorEmrModal" ></doctorEmrModal>
  </div>
</template>

<script>
// import {getDoctorEmr} from "../../../../../doctorEmr/api";
import patientInfoSlide from "./modal/patient-info-slide";
import doctorEmrModal from "./modal/doctor-emr-modal";
import bus from 'vue-happy-bus'
import base from '@/utils/base64'

export default {
  directives: {
    // 添加窗口移动指令
    drag: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "move";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拖动目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX - dragNode.offsetLeft;
          const disY = ev.clientY - dragNode.offsetTop;
          // 顶部距离最小值(由于dragNode使用了transform，0.4是 translateY的值);
          const limitTop = dragNode.offsetHeight * 0.4;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const l = ev.clientX - disX;
              let t = ev.clientY - disY;
              if (t <= limitTop && ['nfyksdyy'].includes(process.env.HOSPITAL_ID)) {
                t = limitTop;
              }
              dragNode.style.left = l + "px";
              dragNode.style.top = t + "px";
            };
            document.onmouseup = (ev) => {
              document.onmousemove = null;
              document.onmouseup = null;
              iframeDom.style['pointer-events'] = 'auto'
            };
          }
        };
      },
    },
    // 右下方拉伸
    seResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "se-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              dragNode.style.width = oWidth + w + "px";
              dragNode.style.height = oHeight + h + "px";
              document.body.style.cursor = "se-resize";
            };
            document.onmouseup = (ev) => {
              iframeDom.style['pointer-events'] = 'auto'
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
    // 下方拉伸
    sResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "s-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              dragNode.style.height = oHeight + h + "px";
              document.body.style.cursor = "s-resize";
            };
            document.onmouseup = (ev) => {
              iframeDom.style['pointer-events'] = 'auto'
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
    // 右方拉伸
    eResize: {
      // 指令的定义
      inserted: (el, binding) => {
        el.style.cursor = "e-resize";
        // 防止选中文字
        el.onselectstart = () => {
          return false;
        };
        const oDiv = el;
        // 拉伸的目标组件
        const dragNodes = document.getElementsByClassName(binding.value.target);
        let dragNode = null;
        if (dragNodes.length > 0) {
          dragNode = dragNodes[0];
        } else {
          return;
        }
        oDiv.onmousedown = (ev) => {
          const disX = ev.clientX;
          const disY = ev.clientY;
          let oWidth = dragNode.offsetWidth;
          let oHeight = dragNode.offsetHeight;
          const [iframeDom] = document.getElementsByClassName("iframeDom");
          iframeDom.style['pointer-events'] = 'none'
          if (el.getBoundingClientRect().width !== window.innerWidth) {
            // 非“全屏”下才能拖动
            document.onmousemove = (ev) => {
              const w = ev.clientX - disX;
              const h = ev.clientY - disY;
              document.body.style.cursor = "e-resize";
              dragNode.style.width = oWidth + w + "px";
            };
            document.onmouseup = (ev) => {
              iframeDom.style['pointer-events'] = 'auto'
              document.onmousemove = null;
              document.onmouseup = null;
              document.body.style.cursor = "default";
            };
          }
        };
      },
    },
  },
  data() {
    return {
      fileUrl: "",
      pageLoading: false,
      show: false,
      patientId: "",
      open: false,
      visitId: "",
      bus: bus(this),
    };
  },
  computed: {
    routeQuery() {
      if(this.$route.query.patientId){
        return this.$route.query
      }else{
        return this.$route.params;
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
  },
  components: {
    patientInfoSlide,
    doctorEmrModal
  },
  watch: {
    routeQuery() {
      this.close();
      // 电子病历会触发当是顺德人医的就不触发刷新
      if((this.$route.path.includes('/formPage') && this.HOSPITAL_ID == 'nfyksdyy')|| !(this.$route.query.patientId && this.$route.query.visitId)) return
      if(this.HOSPITAL_ID == 'foshanrenyi') return
      this.bus.$emit('refreshTree')
    },
  },
  methods: {
    onToggle() {
      this.open = !this.open;

      if (!this.patientInfo.patientId) {
        this.$store.commit("upPatientInfo", this.$route.query);
      }
      if (this.open) {
        this.$route.query.patientId = this.patientInfo.patientId;
        this.$route.query.visitId = this.patientInfo.visitId;
        this.$refs.patientInfoSlide.open();
      } else {
        this.$refs.patientInfoSlide.close();
      }
    },
    onClose() {
      this.open = false;
    },
    close() {
      this.show = false;
    },
    async onload() {
      !['ytll'].includes(this.HOSPITAL_ID) && (this.show = true);
      if(['zhzxy','fsxt','dglb','whhk','ytll','925'].includes(this.HOSPITAL_ID)){
        this.openModal('doctorEmrModal')
      }else await this.getTreeData();
    },
    openModal(name,feature) {
      this.$refs[name].open(feature);
    },
    async getTreeData() {
      switch (this.HOSPITAL_ID) {
        case 'foshanrenyi':
        this.fileUrl = `http://192.168.99.72:8099/?hospital_no=45607379-3&patient_id=${this.$route.query.patientId}&visit_id=${this.$route.query.visitId}`
          break;
        case 'nfyksdyy':
        this.fileUrl = `http://192.168.8.174:8000/Content/GetSingleContentData?a=1&mdt=H&ordinal=HMedical&ids=${this.$route.query.inpNo}`
        break;
        default:
        this.fileUrl = `http://172.16.4.53/EmrView/Index.aspx?hospital_no=45539427X44011411A1001&patient_id=${this.$route.query.inpNo}`;
          break;
      }
    },
    onOpenNewWin(params){
      let newInpNo = this.$route.query.inpNo.split('_')[0];
      let selectUrl = {
        '手麻': `http://192.168.8.109/interface/patient/doc.html?admissionNum=${newInpNo}`,
        '重症': `http://192.168.5.131:8090/?look=1&&hisid=${newInpNo}&visitid=${this.$route.query.visitId}`
      }
      window.open(selectUrl[params])
    },
    onOpenNourishment(){
      let user = localStorage.getItem('user')
      // let ppp = localStorage.getItem('ppp')
      if (user) {
        user = JSON.parse(user)
      }
      const base64 = new base()
      const UseEmp = base64.encode(user.empNo)
      const UseEmN = base64.encode(user.empName)

      let newPid = this.$route.query.patientId
      let newVis = this.$route.query.visitId

      let newPidAndVis = newPid + newVis
      let fileUrl = `http://192.168.1.46:8003/LoginManager/MDTLoginPortal?id=${newPidAndVis}&un=${UseEmp}&name=${UseEmN}&departno=${this.$route.query.deptCode}&hc=qu3RLs24Ohb/ThJ41G4A0YTB151dtVGaUjivi28D2xQHHEQLg4ByrQ==`
      window.open(fileUrl)
    }

  },
};
</script>

<style lang="stylus" scoped>
.doctor-emr-wrapper {
  .doctor-emr-content {
    position: fixed;
    // top: 500px;
    // left: 100px;
    transform: translate(-50%, -40%);
    -webkit-transform: translate(-50%, -40%);
    -ms-transform: translate(-50%, -40%);
    -moz-transform: translate(-50%, -40%);
    position: fixed;
    top: 50%;
    left: 56%;
    z-index: 999;
    width: 1200px;
    height: 650px;
    background: #ffffff;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);

    .content_title {
      height: 20px;
      position: relative;
      cursor: move;

      .close-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        height: 20px;
        border: none;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        font-size: 10px;
        cursor: pointer;
      }
    }

    iframe {
      width: 100%;
      height: calc(100% - 20px);
    }
  }

  .fixed-icon {
    position: fixed;
    top: 140px;
    right: 0;
    width: 50px;
    height: 42px;
    z-index: 999;
    background: #ffffff;
    cursor: pointer;
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 100px 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 18px;
      height: 18px;
    }
  }

  .doctor-emr-icon {
    position: fixed;
    top: 200px;
    right: 0;
    width: 50px;
    height: 42px;
    z-index: 999;
    background: #ffffff;
    cursor: pointer;
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 100px 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 18px;
      height: 18px;
    }
  }
  .doctor-feel-icon {
    position: fixed;
    top: 260px;
    right: 0;
    width: 50px;
    height: 42px;
    z-index: 999;
    background: #ffffff;
    cursor: pointer;
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 100px 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .doctor-severe-icon {
    position: fixed;
    top: 320px;
    right: 0;
    width: 50px;
    height: 42px;
    z-index: 999;
    background: #ffffff;
    cursor: pointer;
    box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.05);
    border-radius: 100px 0 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .se-resize {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
  }

  .e-resize {
    position: absolute;
    bottom: 8px;
    top: 20px;
    right: 0;
    width: 10px;
    height: calc(100% - 28px);
  }

  .s-resize {
    position: absolute;
    bottom: 0;
    right: 8px;
    width: calc(100% - 8px);
    height: 10px;
  }
}
</style>
