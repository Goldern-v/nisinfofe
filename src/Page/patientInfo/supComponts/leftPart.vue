<template>
  <div>
    <div class="content" :style="{left: openLeft?'0':'-201px'}">
      <div
        style="height: 1px;background:#4BB08D;box-shadow: 0px 1px 5px rgba(0,0,0,.2);position: relative;z-index: 0"
      ></div>
      <div class="user-box">
        <div class="user-head">
          <img src="../../../common/images/card/默认头像.png" height="72" width="72" />
        </div>
        <p class="name">{{info.name}}</p>
        <p class="age">{{info.sex}} | {{info.age}}</p>
        <div class="list-box">
          <div class="list-li">ID：{{info.patientId}}</div>
          <div class="list-li">住院号：{{info.inpNo}}</div>
          <div class="list-li" v-if="HOSPITAL_ID == 'gy'">住院标识：{{info.visitId}}</div>
          <div class="list-li" v-else>住院次数：{{info.visitId}}</div>
        </div>
      </div>
      <div
        class="list2-box"
        :style="{height: `${wih-350}px`,overflow: overflow}"
        @mouseover="overflow='auto'"
        @mouseout="overflow='hidden'"
      >
        <div class="list2-li">护理单元：{{info.wardName}}</div>
        <div class="list2-li">床号：{{info.bedLabel}}</div>
        <div class="list2-li">病情：{{info.patientCondition}}</div>
        <div class="list2-li">护理：{{info.nursingClass}}</div>
        <div class="list2-li">费别：{{info.chargeType || '--'}}</div>
        <div class="line-boder"></div>
        <div class="list2-li">科室：{{info.deptName}}</div>
        <div class="list2-li">入院：{{info.admissionDate}}(第{{info.inpDay}}天)</div>
        <div class="list2-li">医生：{{info.doctorInCharge}}</div>
        <div class="list2-li over-text" :title="info.diagnosis">诊断：{{info.diagnosis}}</div>
        <div class="print-btn" flex="cross:center main:center" @click="openBedPrint">打印床头卡</div>
        <div class="print-btn" flex="cross:center main:center" @click="openPrintModal">
          归档打印
          <span>{{'（'+ archiveStatus +'）'}}</span>
          <!-- <span>{{'（'+ info.statusDesc +'）'}}</span> -->
        </div>
      </div>
      <div
        class="flag-con"
        :style="{top: flagTop}"
        flex="main:center cross:center"
        @click="toOpenLeft"
      >
        <i class="iconfont icon-yincang" v-show="openLeft" style="margin-left: -1px"></i>
        <i class="iconfont icon-xianshi" v-show="!openLeft" style="margin-left: -2px"></i>
      </div>
    </div>
    <bedModal ref="bedModal"></bedModal>
    <bedModalWx ref="bedModalWx"></bedModalWx>
    <printModal ref="printModal"></printModal>
    <archiveModal
      ref="archiveModal"
      :printArchiveMaster="printArchiveMaster"
      :getArchiveStatus="getArchiveStatus"
    ></archiveModal>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.content {
  width: 201px;
  padding-bottom: 10000px;
  margin-bottom: -10000px;
  box-sizing: border-box;
  margin-top: -2px;
  border-right: 1px solid #CBD5DD;
  background: #F8F8F8;
  z-index: 101;
  position: fixed;
  transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);

  .flag-con {
    width: 10px;
    height: 73px;
    position: absolute;
    right: -11px;
    top: 100px;
    background-image: url('../../../common/images/patient/隐藏框.png');
    cursor: pointer;

    &:hover {
      color: #5CC6A1;
    }

    i {
      font-size: 12px;
    }
  }
}

.user-box {
  overflow: hidden;
  width: 200px;
  height: 267px;
  background-image: url('../../../common/images/patient/患者背景.png');
  box-sizing: cover;
}

.user-head {
  width: 62px;
  height: 62px;
  margin: 22px auto;
  border-radius: 50%;
  border: 1px solid #FCFCFC;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.name {
  font-size: 18px;
  color: #FFFFFF;
  text-align: center;
  margin-top: 18px;
}

.age {
  margin-top: 9px;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  font-weight: lighter;
}

.list-box {
  margin: 18px 20px;

  .list-li {
    margin-bottom: 9px;
    font-size: 13px;
    color: #FFFFFF;
    font-weight: lighter;
  }
}

.list2-box {
  margin: 14px 10px 14px 20px;

  .list2-li {
    margin-bottom: 7px;
    font-size: 13px;
    color: #687179;
    line-height: 20px;
  }
}

.line-boder {
  border-top: 1px solid #E3E7EA;
  border-bottom: 1px solid #FFFFFF;
  margin-top: 10px;
  margin-bottom: 8px;
}

.print-btn {
  background-image: linear-gradient(-180deg, #FEFEFE 0%, #F2F2F2 100%);
  border: 1px solid #C2CBD2;
  border-radius: 2px;
  height: 32px;
  width: 160px;
  margin: 15px 0;
  font-size: 13px;
  color: #333333;
  letter-spacing: 0;
  cursor: pointer;

  &:hover {
    background: #fafafa;
    color: #000;
  }
}

.over-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
<script>
import bedModal from "./modal/bed-modal.vue";
import bedModalWx from "./modal/bed-modal_wx.vue";
import printModal from "./print-modal/print-modal";
import archiveModal from "./modal/archive-modal";
import { previewArchive } from "./modal/api/index";
export default {
  data() {
    return {
      overflow: "hidden",
      printDetailList: "", //归档详情
      archiveStatus: "",
      printArchiveMaster: {} //归档、转pdf状态对象
    };
  },
  computed: {
    info() {
      return this.$route.query;
    },
    openLeft() {
      return this.$store.state.common.openLeft;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    flagTop() {
      return `${this.wih * 0.4}px`;
    }
  },
  methods: {
    toOpenLeft() {
      this.$store.commit("upOpenLeft", !this.openLeft);
    },
    openBedPrint() {
      if (this.HOSPITAL_ID == "weixian") {
        this.$refs.bedModalWx.open();
      } else {
        this.$refs.bedModal.open();
      }
    },
    openPrintModal() {
      // let item = {
      //   patientId: this.info.patientId,
      //   visitId: this.info.visitId
      // };
      // console.log(item);
      // this.$refs.archiveModal.open(item);
      this.$refs.printModal.open();
    },
    // 获取归档打印详情
    getArchiveStatus() {
      previewArchive(this.info.patientId, this.info.visitId).then(res => {
        this.printDetailList = res.data.data.printDetailList;
        this.printArchiveMaster = res.data.data.printArchiveMaster;
        // this.previewFile();
        // if (
        //   this.printArchiveMaster.printStatus == 0 &&
        //   this.printArchiveMaster.resultStatus != 1
        // ) {
        //   this.archiveStatus = "转pdf";
        // } else if (
        //   this.printArchiveMaster.printStatus != 0 &&
        //   this.printArchiveMaster.printStatus != 1 &&
        //   this.printArchiveMaster.uploadStatus != 1 &&
        //   this.printArchiveMaster.uploadStatus != 2
        // ) {
        //   this.archiveStatus = "重转pdf";
        // } else if (this.printArchiveMaster.resultStatus == 1) {
        //   this.archiveStatus = "预览";
        // } else if (
        //   this.printArchiveMaster.resultStatus == 1 &&
        //   this.printArchiveMaster.uploadStatus != 1 &&
        //   this.printArchiveMaster.uploadStatus != 2
        // ) {
        //   this.archiveStatus = "归档";
        // }
      });
    }
  },
  created() {
    console.log("P:created");
    window.document.title = `${this.info.bedLabel}-${this.info.name}`;
  },
  mounted() {
    this.getArchiveStatus();
  },
  beforeDestroy() {
    window.document.title = "宸瑞智慧护理信息系统";
  },
  components: {
    bedModal,
    printModal,
    bedModalWx,
    archiveModal
  }
};
</script>
