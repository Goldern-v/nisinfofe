<template>
  <div class="left-part">
    <div class="content" :style="{ left: openLeft ? '0' : '-201px' }">
      <div
        style="height: 1px;background:#4BB08D;box-shadow: 0px 1px 5px rgba(0,0,0,.2);position: relative;z-index: 0"
      ></div>
      <div class="user-box">
        <div class="user-head">
          <img
            src="../../../common/images/card/默认头像.png"
            height="72"
            width="72"
          />
        </div>
        <p class="name">{{ info.name }}</p>
        <p class="age">{{ info.sex }} | {{ info.age }}</p>
        <div class="list-box">
          <!-- <div class="list-li">ID：{{ info.patientId }}</div> -->
          <div class="list-li">住院号：{{ info.inpNo }}</div>
          <div class="list-li">住院次数：{{ info.visitId }}</div>
        </div>
      </div>
      <div
        class="list2-box"
        :style="{ height: `${wih - 350}px`, overflow: overflow }"
        @mouseover="overflow = 'auto'"
        @mouseout="overflow = 'hidden'"
      >
        <div class="box-content">
          <div class="list2-li">护理单元：{{ info.wardName }}</div>
          <div class="list2-li">床号：{{ info.bedLabel }}</div>
          <div class="list2-li">病情：{{ info.patientCondition }}</div>
          <div class="list2-li">护理：{{ info.nursingClass }}</div>
          <div class="list2-li">费别：{{ info.chargeType || "--" }}</div>
          <div class="line-boder"></div>
          <div class="list2-li">科室：{{ info.deptName }}</div>
          <div class="list2-li">
            入院：{{
            ['huadu','liaocheng'].includes(HOSPITAL_ID)
                ? info.admissionWardDateTime
                : info.admissionDate
            }}(第{{ info.inpDay }}天)
          </div>
          <div class="list2-li">医生：{{ info.doctorInCharge }}</div>
          <div class="list2-li over-text" :title="info.diagnosis">
            诊断：{{ info.diagnosis }}
          </div>
          <div
            class="print-btn"
            flex="cross:center main:center"
            @click="openBedPrint()"
            v-if="HOSPITAL_ID != 'beihairenyi' && HOSPITAL_ID != 'guizhou'"
          >
            打印床头卡
          </div>
          <div
            class="print-btn"
            flex="cross:center main:center"
            @click="openBedPrint('v')"
            v-if="HOSPITAL_ID == 'huadu'|| HOSPITAL_ID == 'beihairenyi'"
          >
            {{HOSPITAL_ID == 'beihairenyi'?'打印床头卡':'打印床头卡2'}}
          </div>
          <div
            class="print-btn"
            flex="cross:center main:center"
            @click="openWristPrint('wrist')"
            v-if="
              HOSPITAL_ID == 'huadu' ||
                HOSPITAL_ID == 'zhongshanqi' ||
                HOSPITAL_ID == 'liaocheng' ||
                HOSPITAL_ID == 'beihairenyi'
            "
          >
            {{HOSPITAL_ID=='beihairenyi'?'成人腕带打印':'腕带打印'}}
          </div>
          <div
            class="print-btn"
            flex="cross:center main:center"
            @click="openWristPrint('wrist-children')"
            v-if="HOSPITAL_ID == 'beihairenyi'"
          >
            儿童腕带打印
          </div>
          <div
            class="print-btn"
            flex="cross:center main:center"
            @click="openPrintModal"
            v-if="HOSPITAL_ID == 'weixian'"
          >
            <span>归档打印</span>
            <span v-if="printArchiveMaster.statusDesc">{{
              "（" + printArchiveMaster.statusDesc + "）"
            }}</span>
          </div>
          <!--  住院补登记  -->
          <template v-if="HOSPITAL_ID === 'hj' && info.registFlag === '1'">
            <div
              class="print-btn"
              flex="cross:center main:center"
              @click="openInpatientRegis"
            >
              住院补登记
            </div>
          </template>
        </div>
      </div>
      <div
        class="flag-con"
        :style="{ top: flagTop }"
        flex="main:center cross:center"
        @click="toOpenLeft"
      >
        <i
          class="iconfont icon-yincang"
          v-show="openLeft"
          style="margin-left: -1px"
        ></i>
        <i
          class="iconfont icon-xianshi"
          v-show="!openLeft"
          style="margin-left: -2px"
        ></i>
      </div>
    </div>
    <!-- 补登记表 弹窗 -->
    <InpatientRegis ref="inpatientRegis" @handleSave="handleInpatientSave" />
    <bedModal ref="bedModal"></bedModal>
    <bedModalWx ref="bedModalWx"></bedModalWx>
    <bedModalLc ref="bedModalLc"></bedModalLc>
    <bedModalHd ref="bedModalHd"></bedModalHd>
    <bedModalZsq ref="bedModalZsq"></bedModalZsq>
    <bedModalBh ref="bedModalBh"></bedModalBh>
    <bedModalQz ref="bedModalQz"></bedModalQz>
    <printModal ref="printModal"></printModal>
    <archiveModal
      ref="archiveModal"
      :printArchiveMaster="printArchiveMaster"
      :getArchiveStatus="getArchiveStatus"
      :printDetailList="printDetailList"
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

  .box-content {
    padding-bottom: 40px;
  }

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
import bedModalLc from "./modal/bed-modal_lc.vue";
import bedModalHd from "./modal/bed-modal-hd.vue";
import bedModalZsq from "./modal/bed-modal-zsq.vue";
import bedModalBh from "./modal/bed-modal-bh.vue";
import bedModalQz from "./modal/bed-modal-qz.vue";
import printModal from "./print-modal/print-modal";
import archiveModal from "./modal/archive-modal";
import { previewArchive } from "./modal/api/index";
import InpatientRegis from "@/components/Inpatient-registration/index";

export default {
  data() {
    return {
      overflow: "hidden",
      printDetailList: [], //归档详情
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
      this.$store.commit("common/upOpenLeft", !this.openLeft);
    },
    // 床头卡打印
    openBedPrint(printMode) {
      if (this.HOSPITAL_ID == "weixian") {
        this.$refs.bedModalWx.open();
      } else if (this.HOSPITAL_ID == "lingcheng") {
        this.$refs.bedModalLc.open();
      } else if (this.HOSPITAL_ID == "huadu") {
        this.$refs.bedModalHd.open(printMode);
      } else if (this.HOSPITAL_ID == "zhongshanqi") {
        this.$refs.bedModalZsq.open();
      }else if( this.HOSPITAL_ID == "beihairenyi"){
        this.$refs.bedModalBh.open(printMode);
      }else if( this.HOSPITAL_ID == "quzhou"){
        this.$refs.bedModalQz.open(printMode);
      } else {
        this.$refs.bedModal.open();
      }
    },
    // 腕带打印
    openWristPrint(printMode) {
      if (this.HOSPITAL_ID == "huadu" || this.HOSPITAL_ID == "liaocheng") {
        this.$refs.bedModalHd.open(printMode);
      } else if (this.HOSPITAL_ID == "zhongshanqi") {
        this.$refs.bedModalZsq.open(printMode);
      }else if( this.HOSPITAL_ID == "beihairenyi"){
        this.$refs.bedModalBh.open(printMode);
      }
    },
    // 住院补登记
    openInpatientRegis() {
      this.$refs.inpatientRegis.open(this.info);
    },
    handleInpatientSave() {
      this.$emit("handleInpatientSave");
    },
    openPrintModal() {
      if (this.printArchiveMaster.printStatus == 1) {
        this.$message({
          type: "warning",
          message: "转pdf中，请稍等"
        });
        return;
      }
      if (this.printArchiveMaster.uploadStatus == 1) {
        this.$message({
          type: "warning",
          message: "归档中，请稍等"
        });
        return;
      }
      let item = {
        patientId: this.info.patientId,
        visitId: this.info.visitId
      };
      this.$refs.archiveModal.open(item);
      // this.$refs.printModal.open();
    },
    // 获取归档打印详情
    getArchiveStatus() {
      previewArchive(this.info.patientId, this.info.visitId).then(res => {
        this.printDetailList = res.data.data.printDetailList;
        this.printArchiveMaster = res.data.data.printArchiveMasters || {};
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
  components: {
    bedModal,
    printModal,
    bedModalWx,
    bedModalLc,
    archiveModal,
    bedModalHd,
    InpatientRegis,
    bedModalZsq,
    bedModalBh,
    bedModalQz
  }
};
</script>
