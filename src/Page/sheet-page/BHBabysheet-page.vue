<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageLoading"
    element-loading-text="正在保存"
  >
    <div class="head-con" flex>
      <div class="dept-select-con"></div>
      <div class="tool-con" flex-box="1">
        <sheetTool ref="sheetTool"></sheetTool>
      </div>
    </div>
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="left-part">
        <!-- <patientList
          :data="data.bedList"
          :isSelectPatient="isSelectPatient"
          v-loading="patientListLoading"
        ></patientList>-->

        <patientList
          :toName="'Baby_sheetPage'"
          :callFunction="isSelectPatient"
        />
      </div>
      <div
        class="right-part"
        :style="{ marginLeft: openLeft ? '200px' : '0' }"
        :class="{ wxHighLightBg: HOSPITAL_ID == 'weixian' }"
        v-loading="tableLoading"
      >
        <div
          class="sheetTable-contain"
          ref="scrollCon"
          @scroll="(e) => onScroll(e)"
        >
          <div ref="sheetTableContain">
            <component
              v-bind:is="sheetTable"
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
              :isFirst="index === 0"
              :scrollY="scrollY"
              :isInPatientDetails="false"
              :bedAndDeptChange="bedAndDeptChange"
              :listData="listData"
            ></component>
            <!-- <sheetTable
              v-else
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
            ></sheetTable>-->
          </div>
          <!-- <div
            class="babyChat"
            v-show="showBabyChat"
            @click="moveContext"
            @mouseup="noMove"
           > -->
          <moveContext
            :id="'temperatureChart'"
            :titlex="'婴儿记录单'"
            class="babyChat"
          >
            <temperatureBHRY
              class="contain-center"
              :queryTem="patientInfo"
            ></temperatureBHRY>
          </moveContext>
          <!-- </div> -->
          <div
            v-show="sheetModel.length == 0"
            class="null-btn"
            flex="cross:center main:center"
            @click="addSheetPage"
          >
            <i class="el-icon-plus"></i>
            {{ "创建婴儿护理记录单" }}
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModel.length"></delPageModal>
    <HjModal ref="HjModal"></HjModal>
    <HdModal ref="HdModal"></HdModal>
    <GuizhouModal ref="GuizhouModal"></GuizhouModal>
    <signModal ref="signModal" title="需要该行签名者确认"></signModal>
    <signModal ref="signModal2" title="签名者确认"></signModal>
    <specialModal ref="specialModal"></specialModal>
    <specialModal2 ref="specialModal2"></specialModal2>
    <setPageModal ref="setPageModal"></setPageModal>
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <evalModel ref="evalModel"></evalModel>
    <syncToIsbarModal ref="syncToIsbarModal"></syncToIsbarModal>
    <!-- 电子病例弹窗 -->
    <doctorEmr v-if="HOSPITAL_ID === 'huadu'" />
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../assets/css/style.styl';

.contain {
  margin: 0;
  background: #fff;
  border: 1px solid #CBD5DD;
  border-radius: 2px;

  &.fullpage {
    position: fixed !important;
    z-index: 10000;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: 0;
  }

  .head-con {
    height: 41px;
  }

  .body-con {
    position: relative;

    .left-part {
      width: 199px;
      position: absolute;
      left: 0;
      top: -40px;
      bottom: 0;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
}

.babyChat {
  position: absolute;
  right: 0;
  top: 15px;
  width: 90%;
  height: 113%;
  z-index: 999;
  box-shadow: -2px 0 7px -1px black; // 左边阴影;
  background-color: white;
}

.dept-select-con {
  box-sizing: border-box;
  width: 199px;
  height: 41px;
  background: #F7FAFA;
  border-right: 1px solid #CBD5DD;
  border-bottom: 1px solid #EAEEF1;
  border-radius: 2px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  >>>.el-input__inner {
    width: 172px;
    height: 28px;
    border: 1px solid #C2CBD2;
    border-radius: 4px;
    font-size: 12px;
  }
}

.sheetTable-contain {
  height: 100%;
  background: #DFDFDF;
  overflow: auto;
  padding: 15px 5px 15px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  position: relative;
  scrollBar(7px, 14px);
}

.null-btn {
  position: absolute;
  top: 0px;
  bottom: 150px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 17px;
  color: #687179;
  width: 195px;
  height: 50px;
  background: #FFFFFF;
  border: 1px solid #ADB4BA;
  box-shadow: 0 1px 2px 0 rgba(200, 200, 200, 0.5);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  i {
    margin-right: 4px;
  }
}
</style>
<style lang="stylus">
#sheet_body_con {
  .wxHighLightBg {
    .sheet-excel-container {
      .sheet-table {
        .body-con {
          &:focus, &:hover {
            background: #FEF8B1;
          }
        }
      }
    }
  }
}
</style>

<script>
import sheetTool from "./components/sheet-tool/sheet-tool.vue";
import doctorEmr from "@/components/doctorEmr";
import temperatureBHRY from "../../Page/temperature-chart/new-singleTemperature-chart-beihairenyi/components/temperatureBHRYNewBorn.vue";
// import patientList from "@/components/patient-list/patient-list.vue";
import patientList from "@/components/patient-list/patient-list-babyTemperature.vue";
// import patientList from "@/components/patient-list/patient-list-router-link.vue";
import sheetTable from "./components/sheetTable/sheetTable.vue";
import moveContext from "../temperature-chart/commonCompen/removableBox.vue";
// import sheetTableNeonatology from "./components/sheetTable-neonatology/sheetTable";
// import sheeTableBurn_plastic from "./components/sheeTable-burn_plastic/sheetTable";
// import sheetTablePost_partum from "./components/sheetTable-post_partum/sheetTable";
// import sheetTablePost_hemodialysis from "./components/sheetTable-hemodialysis/sheetTable";
// import sheetTable_oxytocin from "./components/sheetTable-oxytocin/sheetTable";
// import sheetTableDressing_count from "./components/sheetTable-dressing_count/sheetTable";
// import sheetTableMaternal_newborn_lc from "./components/sheetTable-maternal_newborn_lc/sheetTable";
// import sheetTable_picc_maintenance_hd from "./components/sheetTable-picc_maintenance_hd/sheetTable";
// import sheetTable_intervention_cure_hd from "./components/sheetTable-intervention_cure_hd/sheetTable";
// import sheetTable_hemodialysis_CRRT_hd from "./components/sheetTable-hemodialysis_CRRT_hd/sheetTable";
// import sheetTable_intervention_cure from "./components/sheetTable-intervention_cure/sheetTable";
// import sheetTable_intersurgerycure_qzx from "./components/sheetTable-intersurgerycure_qzx/sheetTable";
// import sheetTable_mild_hypothermia_hd from "./components/sheetTable-mild_hypothermia_hd/sheetTable";
// import sheetTable_neonatology_picc from "./components/sheetTable-neonatology_picc/sheetTable";
// import sheetTable_newborn_qzx from "./components/sheetTable-newborn_qzx/sheetTable";
// import sheetTable_internal_eval_lcey from "./components/sheetTable-internal_eval_lcey/sheetTable";
// import sheetTable_surgical_eval2_lcey from "./components/sheetTable-surgical_eval2_lcey/sheetTable";
// import sheetTable_intervention_cure_lcey from "./components/sheetTable-intervention_cure_lcey/sheetTable";
// import sheetTable_picu_hemodialysis_jm from "./components/sheetTable-picu_hemodialysis_jm/sheetTable";
// import sheetTable_waiting_birth_gzry from "./components/sheetTable-waiting_birth_gzry/sheetTable";
// import sheetTable_newborn_care_gzry from "./components/sheetTable-newborn_care_gzry/sheetTable";
// import sheetTable_catheterplacement_jm from "./components/sheetTable-catheterplacement_jm/sheetTable";
// import sheetTable_picc_custody_jm from "./components/sheetTable-picc_custody_jm/sheetTable";
// import sheetTable_nicu_custody_jm from "./components/sheetTable-nicu_custody_jm/sheetTable";
// import sheetTable_oxytocin_hl from "./components/sheetTable-oxytocin_hl/sheetTable";
// import sheetTable_emergency_rescue from "./components/sheetTable-emergency_rescue/sheetTable";
// import sheetTable_dressing_count_hl from "./components/sheetTable-dressing_count_hl/sheetTable";
import common from "@/common/mixin/common.mixin.js";
import evalModel from "./components/modal/eval-model/eval-model.vue";
import { typeList } from "@/api/lesion";
import sheetModel, {
  addSheetPage,
  delSheetPage,
  initSheetPage,
  cleanData,
} from "./sheet.js";
import { patients } from "@/api/lesion";
import decode from "./components/render/decode.js";
import {
  saveBody,
  showBody,
  showTitle,
  delPage,
  markList,
  splitRecordBlock,
} from "@/api/sheet.js";
import sheetInfo from "./components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "./components/modal/del-page.vue";
import $ from "jquery";
import moment from "moment";
import HjModal from "./components/modal/hj-modal.vue";
import HdModal from "./components/modal/hd-modal.vue";
import GuizhouModal from "./components/modal/guizhou-modal.vue";
import signModal from "@/components/modal/sign.vue";
import specialModal from "@/Page/sheet-page/components/modal/special-modal.vue";
import specialModal2 from "@/Page/sheet-page/components/modal/special-modal2.vue";
import setPageModal from "@/Page/sheet-page/components/modal/setPage-modal.vue";
import pizhuModal from "@/Page/sheet-page/components/modal/pizhu-modal.vue";
import syncToIsbarModal from "@/Page/sheet-page/components/modal/sync-toIsbar-modal.vue";
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import { decodeRelObj } from "./components/utils/relObj";
import { sheetScrollBotton } from "./components/utils/scrollBottom";
import { blockSave, getNurseExchageInfo } from "./api/index";
export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      pageLoading: false,
      tableLoading: false,
      bus: bus(this),
      sheetModel,
      sheetInfo,
      scrollTop: 0,
      typeList: [], // 科室类型
      scrollY: 0,
      queryTem: {},
      bedAndDeptChange: {},
      listData: [],
    };
  },
  computed: {
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 104 + "px";
      }
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    showBabyChat() {
      return this.$store.state.temperature.showBabyChat;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    openLeft() {
      return this.$store.state.sheet.openSheetLeft;
    },
    filterSheetModel() {
      // 根据页码处理后的页面
      let showSheetPage = (i) => {
        let startPage = this.sheetInfo.startPage;
        let endPage = this.sheetInfo.endPage;
        let index = i + this.sheetInfo.sheetStartPage;
        if (startPage && endPage) {
          if (index >= Number(startPage) && index <= Number(endPage)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      };
      let mapSheetModel = this.sheetModel.map((item, index, arr) => {
        item.bodyModel.map((tr, x) => {
          if (!tr.hasOwnProperty("isRead")) {
            tr.isRead = this.isRead(tr);
            tr.map((td, y) => {
              td.isDisabed = this.isDisabed(tr, td, x, y, item.bodyModel);
            });
          }
        });
        let obj = {
          index,
          data: item,
          length: arr.length,
        };
        return obj;
      });

      let resultModel = mapSheetModel.filter((item) => {
        return showSheetPage(item.index);
      });
      return resultModel;
    },
    sheetTable() {
      // if (sheetInfo.sheetType == "neonatology") {
      //   return sheetTableNeonatology;
      //   //  return sheetTablePost_partum;
      // } else if (sheetInfo.sheetType == "post_partum") {
      //   return sheetTablePost_partum;
      // } else if (sheetInfo.sheetType == "blood_purification") {
      //   return sheetTablePost_hemodialysis;
      // } else if (sheetInfo.sheetType == "oxytocin") {
      //   return sheetTable_oxytocin;
      // } else if (sheetInfo.sheetType == "dressing_count") {
      //   return sheetTableDressing_count;
      // } else if (sheetInfo.sheetType == "maternal_newborn_lc") {
      //   return sheetTableMaternal_newborn_lc;
      // } else if (sheetInfo.sheetType == "picc_maintenance_hd") {
      //   return sheetTable_picc_maintenance_hd;
      // } else if (sheetInfo.sheetType == "intervention_cure_hd") {
      //   return sheetTable_intervention_cure_hd;
      // } else if (sheetInfo.sheetType == "hemodialysis_CRRT_hd") {
      //   return sheetTable_hemodialysis_CRRT_hd;
      // } else if (sheetInfo.sheetType == "intervention_cure") {
      //   return sheetTable_intervention_cure;
      // } else if (sheetInfo.sheetType == "mild_hypothermia_hd") {
      //   return sheetTable_mild_hypothermia_hd;
      // } else if (sheetInfo.sheetType == "neonatology_picc") {
      //   return sheetTable_neonatology_picc;
      // } else if (sheetInfo.sheetType == "newborn_qzx") {
      //   return sheetTable_newborn_qzx;
      // }
      // // else if (sheetInfo.sheetType == "internal_eval_lcey") {
      // //   return sheetTable_internal_eval_lcey;
      // // }
      // else if (sheetInfo.sheetType == "surgical_eval2_lcey") {
      //   return sheetTable_surgical_eval2_lcey;
      // } else if (sheetInfo.sheetType == "intervention_cure_lcey") {
      //   return sheetTable_intervention_cure_lcey;
      // } else if (sheetInfo.sheetType == "picu_hemodialysis_jm") {
      //   return sheetTable_picu_hemodialysis_jm;
      // } else if (sheetInfo.sheetType == "waiting_birth_gzry") {
      //   return sheetTable_waiting_birth_gzry;
      // } else if (sheetInfo.sheetType == "newborn_care_gzry") {
      //   return sheetTable_newborn_care_gzry;
      // } else if (sheetInfo.sheetType == "catheterplacement_jm") {
      //   return sheetTable_catheterplacement_jm;
      // } else if (sheetInfo.sheetType == "picc_custody_jm") {
      //   return sheetTable_picc_custody_jm;
      // } else if (sheetInfo.sheetType == "nicu_custody_jm") {
      //   return sheetTable_nicu_custody_jm;
      // } else if (sheetInfo.sheetType == "rescue_hl") {
      //   return sheetTable_emergency_rescue;
      // } else if (sheetInfo.sheetType == "oxytocin_hl") {
      //   return sheetTable_oxytocin_hl;
      // } else if (sheetInfo.sheetType == "dressing_count_hl") {
      //   return sheetTable_dressing_count_hl;
      // } else if (sheetInfo.sheetType == "intersurgerycure_qzx") {
      //   return sheetTable_intersurgerycure_qzx;
      // } else {
      return sheetTable;
      // }
    },
  },
  methods: {
    isFirst(tr, x, y, bodyModel) {
      let recordDate = tr.find((item) => item.key == "recordDate").value;
      let recordSource = tr.find((item) => item.key == "recordSource").value;
      let flag = false;
      if (recordDate && recordSource) {
        let dateIndex = bodyModel[0].findIndex((e) => e.key == "recordDate");
        let sourceIndex = bodyModel[0].findIndex(
          (e) => e.key == "recordSource"
        );
        let index = bodyModel.findIndex((item) => {
          return (
            item[dateIndex].value == recordDate &&
            item[sourceIndex].value == recordSource
          );
        });
        flag = index == x;
      }
      return flag;
    },
    isDisabed(tr, td, x, y, bodyModel) {
      // canModify false可以修改，true禁止修改
      if (
        this.HOSPITAL_ID == "huadu" &&
        sheetInfo.sheetType === "body_temperature_Hd" &&
        td && this.listData[x])
      {
        return !this.listData[x].canModify;
      }
      if (td && td.key == "recordYear") {
        if (!tr.find((item) => item.key == "recordMonth").value) {
          td.value = "";
        }
        return true;
      }
      // 护理记录单特殊情况记录输入多行,签名后,其他项目不能在编辑
      if (
        this.HOSPITAL_ID == "huadu" &&
        tr.find((item) => item.key == "status").value === "1"
      ) {
        let flag =
          tr.find((item) => item.key == "status").value === "1" && // 是否已签名
          this.listData &&
          this.listData[x] &&
          !this.listData[x].canModify; // 是否有权限
        //td存在才判断
        if (td) {
          flag =
            !this.isFirst(tr, x, y, bodyModel) &&
            (td.key === "recordMonth" || td.key === "recordHour"); // 已签名的recordMonth和recordHour单元格，并且不是第一行(最高等级)
        }
        return flag;
      }
      if (
        this.HOSPITAL_ID != "weixian" ||
        (td && td.key == "description") ||
        tr.find((item) => item.key == "recordSource").value == 5
      ) {
        return false;
      }
      if (
        tr.find((item) => item.key == "description").value &&
        !tr.find((item) => item.key == "recordHour").value &&
        !tr.find((item) => item.key == "recordMonth").value
      ) {
        return true;
      } else {
        return false;
      }
    },
    isRead(tr) {
      if (
        this.HOSPITAL_ID == "huadu" &&
        sheetInfo.sheetType === "body_temperature_Hd"
      ) {
        return false;
      }
      let status = tr.find((item) => item.key == "status").value;
      let empNo = tr.find((item) => item.key == "empNo").value;
      if (status == 1) {
        if (empNo == this.empNo || this.isAuditor) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    isSelectPatient(item) {
      this.$store.commit("upPatientInfo", item);
      this.bus.$emit("refreshImg");
    },

    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });
          sheetInfo.bedList = this.data.bedList;
          this.patientListLoading = false;
          sheetInfo.isSave = true;
        });
      }
    },
    addSheetPage() {
      if (
        this.HOSPITAL_ID === "beihairenyi" &&
        this.$route.path.includes("Baby_sheetPage")
      ) {
        let recordCode = (() => {
          switch (this.HOSPITAL_ID) {
            case "beihairenyi":
              return "infant_bh";
            default:
              break;
          }
        })();
        blockSave(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode,
          recordCode
        ).then((res) => {
          this.bus.$emit("getBlockList");
          this.$message.success("创建成功");
        });
      } else {
        this.bus.$emit("openNewSheetModal");
      }
    },
    getSheetData(isBottom) {
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 300);
        return;
      }
      this.tableLoading = true;
      $(".red-border").removeClass("red-border");
      //  cleanData()
      return Promise.all([
        showTitle(this.patientInfo.patientId, this.patientInfo.visitId),
        showBody(this.patientInfo.patientId, this.patientInfo.visitId),
        markList(this.patientInfo.patientId, this.patientInfo.visitId),
      ]).then((res) => {
        let titleData = res[0].data.data;
        let bodyData = res[1].data.data;
        let markData = res[2].data.data.list || [];
        this.listData = bodyData.list;
        /* 显示转科转床的信息 */

        if (this.HOSPITAL_ID === "huadu") {
          this.bedAndDeptChange = {
            bedLabelChange: bodyData.bedLabel,
            deptNameChange: bodyData.deptName,
          };
        }
        // this.sheetModel = []
        this.$nextTick(() => {
          // this.sheetModel = sheetModel
          initSheetPage(titleData, bodyData, markData);
          sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
          this.getHomePage(isBottom);

          this.tableLoading = false;

          let timeNum = 5;
          function toBottom() {
            timeNum--;
            setTimeout(() => {
              this.sheetInfo.isSave = true;
              if (
                isBottom &&
                this.$refs.scrollCon.scrollHeight >
                  this.$refs.scrollCon.offsetHeight
              ) {
                // this.$refs.scrollCon.scrollTop =
                //   this.$refs.scrollCon.scrollHeight -
                //   this.$refs.scrollCon.offsetHeight -
                //   190;
                sheetScrollBotton.call(this, 0);
                timeNum > 0 && toBottom.call(this);
              } else {
                timeNum > 0 && toBottom.call(this);
              }
            }, 200);
          }
          this.$nextTick(() => {
            if (!this.patientInfo.recordId) {
              toBottom.call(this);
            }
          });
        });
      });
    },
    breforeQuit(next) {
      // if (!sheetInfo.isSave) {
      //   window.app
      //     .$confirm("记录单还未保存，离开将会丢失数据", "提示", {
      //       confirmButtonText: "离开",
      //       cancelButtonText: "取消",
      //       type: "warning",
      //     })
      //     .then((res) => {
      //       next();
      //     });
      // } else {
      next();
      // }
    },
    getHomePage(isFirst) {
      getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
        (res) => {
          this.sheetInfo.sheetStartPage =
            (res.data.data && res.data.data.indexNo) || 1;
          this.sheetInfo.sheetMaxPage =
            (res.data.data && res.data.data.maxIndexNo) || 1;
          isFirst && this.bus.$emit("initSheetPageSize");
        }
      );
    },
    onScroll(e) {
      if (sheetInfo.sheetType && sheetInfo.sheetType.indexOf("_wx") > -1) {
      } else {
        this.scrollY = parseInt(e.target.scrollTop);
      }
    },
  },
  created() {
    // 初始化
    cleanData();
    // 下拉
    if (this.deptCode) {
      this.getDate();
    }
    this.bus.$on("addSheetPage", () => {
      if (!this.sheetInfo.selectBlock.id) {
        return this.$notify.info({
          title: "提示",
          message: "请先创建护理记录单",
        });
      }
      addSheetPage(() => {
        this.$nextTick(() => {
          this.bus.$emit("initSheetPageSize");
          this.$nextTick(() => {
            // $(this.$refs.scrollCon).animate({
            //   scrollTop:
            //     this.$refs.scrollCon.scrollHeight -
            //     this.$refs.scrollCon.offsetHeight -
            //     ($(".contant").height() - 560)
            // });
            sheetScrollBotton.call(this);
          });
        });
      });
    });
    this.bus.$on("delSheetPage", () => {
      this.$refs.delPageModal.open(async (checkList) => {
        for (let item of checkList.sort((a, b) => {
          return b - a;
        })) {
          await delPage(
            this.patientInfo.patientId,
            this.patientInfo.visitId,
            item - 1
          );
          delSheetPage(item - 1);
        }
        this.$notify.success({
          title: "提示",
          message: "删除成功",
        });
      });
    });
    this.bus.$on(
      "saveSheetPage",
      (isInitSheetPageSize = true, ayncVisitedData) => {
        let save = () => {
          // 审核签名（头部保存按钮auditorMap传空对象，不去修改审核签名数据，避免跨窗口审核签名丢失）
          if (isInitSheetPageSize == "noSaveSign") {
            sheetInfo.auditorMap = {};
          }
          isInitSheetPageSize =
            isInitSheetPageSize == "noSaveSign" ? false : isInitSheetPageSize;

          this.pageLoading = true;
          this.scrollTop = this.$refs.scrollCon.scrollTop;
          saveBody(
            this.patientInfo.patientId,
            this.patientInfo.visitId,
            decode(ayncVisitedData)
          )
            .then((res) => {
              this.$notify.success({
                title: "提示",
                message: "保存成功",
                duration: 1000,
              });
              this.getSheetData().then((res) => {
                isInitSheetPageSize &&
                  setTimeout(() => {
                    this.bus.$emit("initSheetPageSize");
                  }, 100);
                this.$nextTick(() => {
                  this.$refs.scrollCon.scrollTop = this.scrollTop;
                  $(".red-border").removeClass("red-border");
                });
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                  $(".red-border").removeClass("red-border");
                }, 100);
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                  $(".red-border").removeClass("red-border");
                }, 200);
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                  $(".red-border").removeClass("red-border");
                }, 300);
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                  $(".red-border").removeClass("red-border");
                }, 400);
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                }, 500);
                $(".red-border").removeClass("red-border");
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                  $(".red-border").removeClass("red-border");
                }, 600);
                setTimeout(() => {
                  if (this.$refs.scrollCon.scrollTop == 0) {
                    this.$refs.scrollCon.scrollTop = this.scrollTop;
                  }
                  $(".red-border").removeClass("red-border");
                }, 1000);
              });
              this.pageLoading = false;
            })
            .catch(() => {
              this.pageLoading = false;
            });
        };

        let reverseList = [...decode().list].reverse();
        /** 最后的时间 */
        let lastRecordHour = (
          reverseList.find((item) => item.recordDate && item.recordHour) || {}
        ).recordHour;
        /** 所有新增的时间 */
        let newRecordHours = reverseList
          .filter(
            (item) => item.recordHour && !item.recordMonth && !item.recordDate
          )
          .map((item) => item.recordHour);
        /** 新增记录是否存在比原有记录更前 */
        let isBefore = newRecordHours.some(
          (item) =>
            moment("2019-9-20 " + item).unix() <
            moment("2019-9-20 " + lastRecordHour).unix()
        );
        if (isBefore) {
          if (this.HOSPITAL_ID == "huadu") {
            save();
          } else {
            this.$confirm(
              "新增记录比原有记录时间更前, 请确定日期, 是否确认保存?",
              "提示",
              {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
              }
            ).then((res) => {
              save();
            });
          }
        } else {
          save();
        }
      }
    );
    this.bus.$on("refreshSheetPage", (isFirst) => {
      this.getSheetData(isFirst);
    });
    this.bus.$on("toSheetPrintPage", (newWid) => {
      if ($(".sign-text").length) {
        // 判断是否存在标记
        if ($(".mark-mark-mark").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".mark-mark-mark").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              150,
          });
          return this.$message.warning("打印前必须去除所有标记");
        }
        // 判断是否存在未签名
        if ($(".noSignRow").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".noSignRow").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              150,
          });
          return this.$message.warning("存在未签名的记录，请全部签名后再打印");
        }
        if ($(".multiSign").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".multiSign").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              150,
          });
          return this.$message.warning("记录存在多个签名，或者忘记填写时间");
        }
      }
      if ($(".isNoSign") && $(".isNoSign").length) {
        $(".signTd").eq(0).addClass("red-border");
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".isNoSign").eq(0).offset().top +
            this.$refs.scrollCon.scrollTop -
            150,
        });
        return this.$message.warning("存在未签名的记录，请全部签名后再打印");
      }

      // window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();

      // 对存储空间不够做处理
      try {
        window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
      } catch (err) {
        // 可能要预留下来的 暂时不移除
        let keys = [
          "selectDeptValue",
          "rememberAccount",
          "ppp",
          "user",
          "adminNurse",
        ];
        for (let key in localStorage) {
          if (!keys.includes(key)) {
            localStorage.removeItem(key);
          }
        }
        window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
      }

      // let printUrl = "";
      // if (process.env.NODE_ENV === "production") {
      //   this.$message.info("正在准备打印，请勿重复操作");
      // printUrl = "/crNursing/print/sheetPage?toPrint=true";
      //   /** 打印 */
      //   const iframe = document.createElement("iframe");
      //   iframe.style.display = "block";
      //   iframe.style.height = "0";
      //   iframe.style.width = "0";
      //   iframe.style.overflow = "hidden";
      //   iframe.src = printUrl;
      //   document.body.appendChild(iframe);
      //   const iframeWindow = iframe.contentWindow;
      //   setTimeout(() => {
      //     document.body.removeChild(iframe);
      //   }, 20000);
      // } else {
      //   this.$router.push(`/print/sheetPage`);
      // }
      if (
        process.env.HOSPITAL_ID == "fuyou" ||
        process.env.HOSPITAL_ID == "quzhou" ||
        process.env.HOSPITAL_ID == "huadu"
      ) {
        this.$router.push(`/print/sheetPage`);
      } else {
        if (process.env.NODE_ENV === "production") {
          newWid.location.href = "/crNursing/print/sheetPage";
        } else {
          this.$router.push(`/print/sheetPage`);
        }
      }
    });
    this.bus.$on("openHJModal", () => {
      this.$refs.HjModal.open();
    });
    this.bus.$on("openHDModal", () => {
      this.$refs.HdModal.open();
    });
    this.bus.$on("openGuizhouModal", () => {
      this.$refs.GuizhouModal.open();
    });
    this.bus.$on("openSetPageModal", () => {
      this.$refs.setPageModal.open();
    });
    this.bus.$on("openPizhuModal", (tr, td) => {
      this.$refs.pizhuModal.open(tr, td);
    });
    this.bus.$on("openEvalModel", (tr, td) => {
      this.$refs.evalModel.open();
    });
    this.bus.$on("refrehSheetStartPage", () => {
      this.getHomePage();
    });
    this.bus.$on("setSheetTableLoading", (state = false) => {
      this.tableLoading = state;
    });
    this.bus.$on("splitSheet", (tr, td) => {
      this.$refs.signModal2.open((password, empNo) => {
        let recordDate = tr.find((item) => item.key == "recordDate").value;
        recordDate = recordDate
          ? moment(recordDate).format("YYYY-MM-DD HH:mm")
          : recordDate;
        splitRecordBlock(empNo, password, recordDate).then((res) => {
          this.bus.$emit("getBlockList");
          this.$message.success("创建成功");
          this.bus.$emit("setSheetTableLoading", true);
        });
      });
    });
    this.bus.$on("syncDecription", (tr, td) => {
      this.$refs.syncToIsbarModal.open(tr, td, sheetModel);
    });
  },
  mounted() {},
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
        this.breforeQuit(() => {
          cleanData();
          this.getDate();
        });
      }
    },
    patientInfo(val) {
      this.$store.commit("upPatientInfo", val);
      this.bus.$emit("refreshImg");
    },
    sheetModel: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (this.HOSPITAL_ID == "guizhou") {
        } else {
          if (this.patientInfo.name) {
            sheetInfo.isSave = false;
          }
        }
      },
    },
  },
  // beforeRouteLeave: (to, from, next) => {
  //   if (!sheetInfo.isSave) {
  //     window.app
  //       .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
  //         confirmButtonText: "离开",
  //         cancelButtonText: "取消",
  //         type: "warning",
  //       })
  //       .then((res) => {
  //         next();
  //       });
  //   } else {
  //     next();
  //   }
  // },
  components: {
    sheetTool,
    patientList,
    sheetTable,
    delPageModal,
    HjModal,
    HdModal,
    GuizhouModal,
    signModal,
    specialModal,
    specialModal2,
    setPageModal,
    pizhuModal,
    syncToIsbarModal,
    // sheetTableNeonatology,
    // sheetTablePost_partum,
    evalModel,
    // sheetTablePost_hemodialysis,
    // sheetTable_oxytocin,
    // sheetTableDressing_count,
    // sheetTableMaternal_newborn_lc,
    // sheetTable_picc_maintenance_hd,
    // sheetTable_intervention_cure_hd,
    // sheetTable_hemodialysis_CRRT_hd,
    // sheetTable_intervention_cure,
    // sheetTable_intersurgerycure_qzx,
    // sheetTable_mild_hypothermia_hd,
    // sheetTable_neonatology_picc,
    // sheetTable_newborn_qzx,
    // // sheetTable_internal_eval_lcey,
    // sheetTable_surgical_eval2_lcey,
    // sheetTable_intervention_cure_lcey,
    // sheetTable_picu_hemodialysis_jm,
    // sheetTable_waiting_birth_gzry,
    // sheetTable_newborn_care_gzry,
    // sheetTable_catheterplacement_jm,
    // sheetTable_picc_custody_jm,
    // sheetTable_nicu_custody_jm,
    doctorEmr,
    temperatureBHRY,
    moveContext,
    // sheetTable_oxytocin_hl,
    // sheetTable_emergency_rescue,
    // sheetTable_dressing_count_hl,
  },
};
</script>
