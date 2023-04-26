<template>
  <div>
    <div class="contain" v-loading="pageLoading" :style="{minHeight: minHeight}">
      <!-- <div class="tool-con">
        <el-input class="input" size="small" placeholder="床号\姓名\ID号" icon="search" v-model="searchWord" :on-icon-click="search">
        </el-input>
      </div>-->
      <div class="tip-con" flex="cross:center">
        <span>今日已输液：</span>
        <div class="value">{{excuteToday.infusionTotal}}</div>
        <span>当前输液：</span>
        <div class="value">{{excuteToday.infusionNow}}</div>
      </div>
      <searchCon
        :warningValue="warningValue"
        @search="search"
        @openSettingModal="openSettingModal"
      >></searchCon>
      <div class="list-con">
        <!-- <template v-if="HOSPITAL_ID=='hengli'||HOSPITAL_ID=='wujing'"> -->
          <span @click="getDetail(item)" v-for="(item,index) in filterData" :key="index">
            <infuse-item :data="item"></infuse-item>
          </span>
          <!-- <span v-for="(item,index) in filterData" :key="index" v-else>
            <infuse-item :data="item"></infuse-item>
          </span> -->
        <null-bg v-show="filterData.length == 0" text="暂时没有输液数据～"></null-bg>
      </div>
    </div>
    <!-- <div class="right-con">
      <rightList></rightList>
    </div> -->
    <detailsModal ref="detailsModal"></detailsModal>
    <settingModal ref="settingModal"></settingModal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  // padding: 70px 258px 18px 18px;
  padding: 70px 18px 18px 18px;
  position: relative;

  .tip-con {
    position: absolute;
    top: -40px;
    left: 230px;
    z-index: 10;
    font-size: 12px;
    color: #333;

    .value {
      margin-right: 25px;
      background: #fff;
      height: 18px;
      line-height: 18px;
      padding: 0 4px;
      border: 1px solid #CBD5DD;
      border-radius: 2px;
    }
  }
}

.right-con {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 240px;
  background: #fff;
  border-left: 1px solid #D4DADE;
  z-index: 1000;
  top: 60px;
}
</style>
<style lang="stylus">
.infuse_notify {
  .el-notification__group.is-with-icon {
    margin-right: 14px;
    line-height: 16px;
  }

  .el-notification__title {
    font-size: 14px;
  }

  .el-notification__content {
    font-size: 12px;
    cursor: pointer;
  }
}
</style>

<script>
import infuseItem from "./component/infuse-item";
import nullBg from "../../../../components/null/null-bg.vue";
import searchCon from "./component/search-con/search-con.vue";
import rightList from "./component/right-list.vue";
import detailsModal from "./component/modal/details-modal.vue";
import settingModal from "./component/modal/setting-modal.vue";
import bus from "vue-happy-bus";
import {
  getExecute,
  detail,
  detailHl,
  saveWarningLog,
  getWarningValue
} from "@/api/infuse";
import dayjs from "dayjs";
import common from "@/common/mixin/common.mixin";
export default {
  mixins: [common],
  data() {
    return {
      bus: bus(this),
      searchWord: "",
      data: {
        list: []
      },
      timer: "",
      pageLoading: true,
      excuteToday: {
        infusionTotal: "",
        infusionNow: ""
      },
      warningValue: "",
      notifyBarcode: [],
      tipsNum: 0 //提示框的个数
    };
  },
  methods: {
    search(val) {
      this.searchWord = val;
    },
    openSettingModal() {
      this.$refs.settingModal.open(this.warningValue);
    },
    getInfuseList() {
      this.pageLoading = true;
      if (this.wardCode) {
        getExecute(this.wardCode,this.HOSPITAL_ID).then(res => {
          this.data.list = res.data.data.list;
          this.excuteToday = res.data.data.excuteToday;
          this.pageLoading = false;

          this.notifyBarcode = localStorage.getItem(
            "infuseNotifyBarcode" +
              dayjs(new Date()).format("YYYY-MM-DD") +
              this.wardCode +
              this.empNo
          )
            ? JSON.parse(
                localStorage.getItem(
                  "infuseNotifyBarcode" +
                    dayjs(new Date()).format("YYYY-MM-DD") +
                    this.wardCode +
                    this.empNo
                )
              )
            : [];
          this.tipsNum = 0;
          this.data.list.map((item, index) => {
            if (
              this.warningValue &&
              Number(item.restDosage) &&
              Number(item.restDosage) < this.warningValue &&
              !this.notifyBarcode.includes(item.barCode)
            ) {
              this.saveLog(item);
              this.notifyBarcode.push(item.barCode);
              this.$notify.info({
                title:
                  "【" +
                  item.bedLabel +
                  "床】输液剩余液量低于警戒值，请及时处理",
                message: "立即查看 >",
                duration: 5000 + 1000 * this.tipsNum,
                offset: 100 * this.tipsNum,
                customClass: "infuse_notify",
                onClick: () => {
                  this.$router.push("/infuse/alarmLog");
                }
              });
              this.tipsNum++;
              if (this.notifyBarcode && this.notifyBarcode.length > 0) {
                localStorage.setItem(
                  "infuseNotifyBarcode" +
                    dayjs(new Date()).format("YYYY-MM-DD") +
                    this.wardCode +
                    this.empNo,
                  JSON.stringify(this.notifyBarcode)
                );
              }
            }
          });
        });
      }
    },
    getDetail(data) {
      if(!['hengli','wujing'].includes(this.HOSPITAL_ID)) return
      this.pageLoading = true;
      let barCode = data.barCode;
      if(this.HOSPITAL_ID=='hengli'||this.HOSPITAL_ID=='wujing'){
        detailHl({barCode},this.HOSPITAL_ID).then(res => {
          this.$refs.detailsModal.open(res.data.data);
          this.pageLoading = false;
        });
      }else{
        detail(barCode).then(res => {
          this.$refs.detailsModal.open(res.data.data);
          this.pageLoading = false;
        });
      }
    },
    saveLog(item) {
      let obj = {
        patientId: item.patientId, //病人id
        visitId: item.visitId,
        name: item.patName, //病人姓名
        bedLabel: item.bedLabel, //床号
        barCode: item.barCode, //条形码
        dosage: item.dosage, //容量
        wardCode: this.wardCode //科室
      };
      saveWarningLog(obj).then(res => {});
    },
    getWarningValue() {
      this.pageLoading = true;
      if (this.wardCode) {
        getWarningValue(this.wardCode,this.HOSPITAL_ID).then(res => {
          if (res.data.data) {
            this.warningValue = res.data.data.value;
          }
          this.pageLoading = false;
        });
      }
    },
    refreInfuseList() {
      this.getWarningValue();
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.getInfuseList();
      }, 1000 * 2);
    }
  },
  watch: {
    wardCode() {
      this.warningValue = "";
      this.notifyBarcode = [];
      clearInterval(this.timer);
      this.getWarningValue();
      this.getInfuseList();
    },
  },
  created() {
    this.getWarningValue();
    this.getInfuseList();
    this.timer = setInterval(() => {
      this.getInfuseList();
    }, 1000 * 30);
    this.bus.$on("refreInfuseList", this.refreInfuseList);
  },
  computed: {
    wardCode() {
      return this.$store.state.lesion.deptCode;
    },
    wih() {
      return this.$store.state.common.wih;
    },
    minHeight() {
      return this.$store.state.common.wih - 98 + "px";
    },
    filterData() {
      if (this.searchWord) {
        return this.data.list.filter(item => {
          if (
            item.bedLabel.indexOf(this.searchWord) > -1 ||
            item.patName.indexOf(this.searchWord) > -1
          ) {
            return true;
          }
        });
      } else {
        return this.data.list;
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    infuseItem,
    nullBg,
    searchCon,
    rightList,
    detailsModal,
    settingModal
  }
};
</script>
