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
        <sheetTool
          ref="sheetTool"
          :isLock='isLock'
          :isLoad='isLoad'
          :sheetTitleData="sheetTitleData"
          :maxPage="Number(sheetInfo.endPage)"
        ></sheetTool>
      </div>
    </div>
    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight }"
    >
      <div class="left-part">

        <patientList
          :toName="
            toSingleTempArr.includes(HOSPITAL_ID) &&
            $route.path.includes('singleTemperatureChart')
              ? 'singleTemperatureChart'
              : 'sheetPage'
          "
          :callFunction="isSelectPatient"
        />
      </div>
      <div
        class="right-part"
        :style="{ marginLeft: openLeft ? '200px' : '0' }"
        :class="{ wxHighLightBg: HOSPITAL_ID == 'weixian' }"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
      >
        <div
          class="sheetTable-contain"
          ref="scrollCon"
              id="page"

          @scroll="(e) => onScroll(e)"
        >
          <div ref="sheetTableContain" v-if="done">
            <component
              v-bind:is="sheetTable"
              v-for="(item, index) in filterSheetModel"
              :key="index"
              :data="item.data"
              :index="item.index"
              :length="item.length"
              :isFirst="index === 0"
              :scrollY="scrollY"
              :scrollX="scrollX"
              :isInPatientDetails="false"
              :bedAndDeptChange="bedAndDeptChange"
              :listData="listData"
              @onModalChange="onModalChange"
            ></component>
          </div>
          <div
            v-show="!sheetModelData.length"
            class="null-btn"
            flex="cross:center main:center"
            @click="addSheetPage"
          >
            <i class="el-icon-plus"></i>
            {{
              toSingleTempArr.includes(HOSPITAL_ID) &&
              $route.path.includes("singleTemperatureChart")
                ? "创建体温单"
                : "创建护理记录单"
            }}
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModelData.length"></delPageModal>
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
    <evalModelPaging ref="evalModelPaging"></evalModelPaging>
    <syncToIsbarModal ref="syncToIsbarModal"></syncToIsbarModal>
    <syncExamTestModal ref="syncExamTestModal"></syncExamTestModal>
    <syncExamAmountModal ref="syncExamAmountModal"></syncExamAmountModal>
    <!-- 电子病例弹窗 -->
    <doctorEmr v-if="['foshanrenyi','huadu'].includes(HOSPITAL_ID)" />
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
      z-index: 2;
    }

    .right-part {
      margin-left: 199px;
      height: 100%;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
    }
  }
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
import patientList from "@/components/patient-list/patient-list-router-link.vue";
import sheetTable from "./components/sheetTable/sheetTable.vue";
import sheetTableNeonatology from "./components/sheetTable-neonatology/sheetTable";
import sheetTablePost_partum from "./components/sheetTable-post_partum/sheetTable";
import sheetTablePost_hemodialysis from "./components/sheetTable-hemodialysis/sheetTable";
import sheetTable_oxytocin from "./components/sheetTable-oxytocin/sheetTable";
import sheetTableDressing_count from "./components/sheetTable-dressing_count/sheetTable";
import sheetTableMaternal_newborn_lc from "./components/sheetTable-maternal_newborn_lc/sheetTable";
import sheetTable_picc_maintenance_hd from "./components/sheetTable-picc_maintenance_hd/sheetTable";
import sheetTable_intervention_cure_hd from "./components/sheetTable-intervention_cure_hd/sheetTable";
import sheetTable_hemodialysis_CRRT_hd from "./components/sheetTable-hemodialysis_CRRT_hd/sheetTable";
import sheetTable_intervention_cure from "./components/sheetTable-intervention_cure/sheetTable";
import sheetTable_intersurgerycure_qzx from "./components/sheetTable-intersurgerycure_qzx/sheetTable";
import sheetTable_mild_hypothermia_hd from "./components/sheetTable-mild_hypothermia_hd/sheetTable";
import sheetTable_neonatology_picc from "./components/sheetTable-neonatology_picc/sheetTable";
import sheetTable_newborn_qzx from "./components/sheetTable-newborn_qzx/sheetTable";
// import sheetTable_internal_eval_lcey from "./components/sheetTable-internal_eval_lcey/sheetTable";
import sheetTable_surgical_eval2_lcey from "./components/sheetTable-surgical_eval2_lcey/sheetTable";
import sheetTable_intervention_cure_lcey from "./components/sheetTable-intervention_cure_lcey/sheetTable";
import sheetTable_picu_hemodialysis_jm from "./components/sheetTable-picu_hemodialysis_jm/sheetTable";
import sheetTable_record_children_serious2_lc from "./components/sheetTable-record_children_serious2_lc/sheetTable";
import sheetTable_waiting_birth_gzry from "./components/sheetTable-waiting_birth_gzry/sheetTable";
import sheetTable_newborn_care_gzry from "./components/sheetTable-newborn_care_gzry/sheetTable";
import sheetTable_catheterplacement_jm from "./components/sheetTable-catheterplacement_jm/sheetTable";
import sheetTable_picc_custody_jm from "./components/sheetTable-picc_custody_jm/sheetTable";
import sheetTable_nicu_custody_hd from "./components/sheetTable-nicu_custody_hd/sheetTable";
import sheetTable_nicu_custody_jm from "./components/sheetTable-nicu_custody_jm/sheetTable";
import sheetTable_cardiology_lcey from "./components/sheetTable-cardiology_lcey/sheetTable";
import sheetTable_oxytocin_hl from "./components/sheetTable-oxytocin_hl/sheetTable";
import sheetTable_oxytocin_sdlj from "./components/sheetTable-oxytocin_sdlj/sheetTable";
import sheetTable_emergency_rescue from "./components/sheetTable-emergency_rescue/sheetTable";
import sheetTable_dressing_count_hl from "./components/sheetTable-dressing_count_hl/sheetTable";
import common from "@/common/mixin/common.mixin.js";
import evalModel from "./components/modal/eval-model/eval-model.vue";
import evalModelPaging from "./components/modal/eval-model/eval-model-paging.vue"
import sheetModel, {
  addSheetPage,
  delSheetPage,
  initSheetPage,
  cleanData,
  getData,
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
  findListByBlockId,
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
import syncExamTestModal from "@/Page/sheet-page/components/modal/sync-exam-test-modal.vue";
import syncExamAmountModal from "@/Page/sheet-page/components/modal/async-exam-amount-modal";
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import { decodeRelObj } from "./components/utils/relObj";
import { sheetScrollBotton } from "./components/utils/scrollBottom";
import { blockSave, getNurseExchageInfo } from "./api/index";
//解锁
import {unLock,unLockTime} from "@/Page/sheet-hospital-eval/api/index.js"

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
      done:false,//控制表单加载的开关 等数据完成后打开  加载数据
      bus: bus(this),
      sheetModelData:[],
      sheetInfo,
      scrollTop: 0,
      typeList: [], // 科室类型
      scrollY: 0,
      scrollX: 0,
      bedAndDeptChange: {},
      listData: [],
      toSingleTempArr: [
        "huadu",
        "liaocheng",
        "hengli",
        "quzhou",
        "hj",
        "wujing",
      ], // 患者列表点击前往体温单录入的医院
      lockHospitalList:[
        'huadu'
      ], // 护记锁定功能医院（护士1占用了护记1，则护士2进入会报错和不让操作）
      isLock:false,
      isLoad:false,  //如果主页数据多接口就返回慢，在数据没回来之前切换了副页，副页的数据会被后回来的主页数据覆盖。
      sheetTitleData: {}, // 自定义表头数据
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
      let resultModel =this.sheetModelData.filter((item,index) => {
        return showSheetPage(index)
      });
      return resultModel;
    },
    sheetTable() {
      console.log("sheetInfo.sheetType",sheetInfo,sheetInfo.sheetType)
      if (sheetInfo.sheetType == "neonatology") {
        return sheetTableNeonatology;
        //  return sheetTablePost_partum;
      } else if (sheetInfo.sheetType == "post_partum") {
        return sheetTablePost_partum;
      } else if (sheetInfo.sheetType == "blood_purification") {
        return sheetTablePost_hemodialysis;
      } else if (sheetInfo.sheetType == "oxytocin") {
        return sheetTable_oxytocin;
      } else if (sheetInfo.sheetType == "dressing_count") {
        return sheetTableDressing_count;
      } else if (sheetInfo.sheetType == "maternal_newborn_lc") {
        return sheetTableMaternal_newborn_lc;
      } else if (sheetInfo.sheetType == "record_children_serious2_lc") {
        return sheetTable_record_children_serious2_lc;
      } else if (sheetInfo.sheetType == "picc_maintenance_hd") {
        return sheetTable_picc_maintenance_hd;
      } else if (sheetInfo.sheetType == "intervention_cure_hd") {
        return sheetTable_intervention_cure_hd;
      } else if (sheetInfo.sheetType == "hemodialysis_CRRT_hd") {
        return sheetTable_hemodialysis_CRRT_hd;
      } else if (sheetInfo.sheetType == "intervention_cure") {
        return sheetTable_intervention_cure;
      } else if (sheetInfo.sheetType == "mild_hypothermia_hd") {
        return sheetTable_mild_hypothermia_hd;
      } else if (sheetInfo.sheetType == "neonatology_picc") {
        return sheetTable_neonatology_picc;
      } else if (sheetInfo.sheetType == "newborn_qzx") {
        return sheetTable_newborn_qzx;
      }
      // else if (sheetInfo.sheetType == "internal_eval_lcey") {
      //   return sheetTable_internal_eval_lcey;
      // }
      else if (sheetInfo.sheetType == "surgical_eval2_lcey") {
        return sheetTable_surgical_eval2_lcey;
      } else if (sheetInfo.sheetType == "intervention_cure_lcey") {
        return sheetTable_intervention_cure_lcey;
      } else if (sheetInfo.sheetType == "picu_hemodialysis_jm") {
        return sheetTable_picu_hemodialysis_jm;
      } else if (sheetInfo.sheetType == "waiting_birth_gzry") {
        return sheetTable_waiting_birth_gzry;
      } else if (sheetInfo.sheetType == "newborn_care_gzry") {
        return sheetTable_newborn_care_gzry;
      } else if (sheetInfo.sheetType == "catheterplacement_jm") {
        return sheetTable_catheterplacement_jm;
      } else if (sheetInfo.sheetType == "picc_custody_jm") {
        return sheetTable_picc_custody_jm;
      } else if (sheetInfo.sheetType == "nicu_custody_hd") {
        return sheetTable_nicu_custody_hd;
      } else if (sheetInfo.sheetType == "nicu_custody_jm") {
        return sheetTable_nicu_custody_jm;
      } else if (sheetInfo.sheetType == "cardiology_lcey") {
        return sheetTable_cardiology_lcey;
      } else if (sheetInfo.sheetType == "rescue_hl") {
        return sheetTable_emergency_rescue;
      } else if (sheetInfo.sheetType == "oxytocin_hl") {
        return sheetTable_oxytocin_hl;
      } else if (sheetInfo.sheetType == "oxytocin_sdlj") {
        return sheetTable_oxytocin_sdlj;
      } else if (sheetInfo.sheetType == "dressing_count_hl") {
        return sheetTable_dressing_count_hl;
      } else if (sheetInfo.sheetType == "intersurgerycure_qzx") {
        return sheetTable_intersurgerycure_qzx;
      } else {
        return sheetTable;
      }
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
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (
        (this.HOSPITAL_ID === "huadu" ||
          this.HOSPITAL_ID === "hj" ||
          this.HOSPITAL_ID === "quzhou" ||
          this.HOSPITAL_ID === "hengli" ||
          this.HOSPITAL_ID === "wujing") &&
        this.$route.path.includes("singleTemperatureChart")
      ) {
        // let recordCode = "body_temperature_Hd";
        // let recordCode =
        //   this.HOSPITAL_ID === "huadu" || HOSPITAL_ID === "wujing"
        //     ? "body_temperature_Hd"
        //     : "body_temperature_lcey";
        let recordCode = (() => {
          switch (this.HOSPITAL_ID) {
            case "huadu":
              return "body_temperature_Hd";
            case "hj":
              return "body_temperature_hj";
            // case "liaocheng":
            //   return "body_temperature_lcey";
            case "wujing":
              return "body_temperature_wj";
            case "hengli":
              return "body_temperature_hl";
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
      //为了确保每次更新sheetInfo里的数据   先删除掉dom节点  然后重新加载
      this.done=false
      this.tableLoading = true;
      if(["guizhou", 'huadu', '925'].includes(this.HOSPITAL_ID)){
        this.isLoad=false
      }
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        this.tableLoading = false;
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 300);
        return;
      }

      $(".red-border").removeClass("red-border");
      //  cleanData()
      let fnArr = [
        showTitle(this.patientInfo.patientId, this.patientInfo.visitId),
        showBody(this.patientInfo.patientId, this.patientInfo.visitId),
        markList(this.patientInfo.patientId, this.patientInfo.visitId),
      ]
      // 佛山市一 获取自定义标题数据
      if (['foshanrenyi','fsxt', 'gdtj'].includes(this.HOSPITAL_ID)) {
        fnArr.shift()
        fnArr.unshift(findListByBlockId())
      }
      return Promise.all(fnArr).then((res) => {
        if(["guizhou", 'huadu', '925'].includes(this.HOSPITAL_ID)){
          this.isLoad=true
        }
        let titleData = res[0].data.data;
        this.sheetTitleData = res[0].data.data || {};
        /* 判断护记单是否被锁定。 */
        if(res[1].data.errorCode=='3001' && res[1].data.desc.indexOf('锁定')!=-1 && this.lockHospitalList.includes(this.HOSPITAL_ID)){
          localStorage.setItem('lockForm','')
          this.isLock=true
          window.app && window.app.$message({
            showClose: true,
            message: res[1].data.desc,
            type: 'error',
            duration:5000
          })
        }else{
          const formConfig={
            formId:this.sheetInfo.selectBlock.id,
            type:'record',
            initTime:Date.now()
          }
          this.isLock=false
          localStorage.setItem('lockForm',JSON.stringify(formConfig))
        }

        let bodyData = res[1].data.data;
        this.$store.commit('upMasterInfo',bodyData)
        if(this.HOSPITAL_ID=='wujing'){
          let barcodeArr = {}
          bodyData.list.map((tr,index)=>{
            if(tr.expand){
              barcodeArr[tr.expand] = barcodeArr[tr.expand] ? (barcodeArr[tr.expand] + 1) : 1
              if(barcodeArr[tr.expand] == 1 && ((bodyData.list[index + 1] && bodyData.list[index + 1].expand != tr.expand)||(!bodyData.list[index + 1]))){
                // 只有一行药品时不显示分组符号
                tr.barCodeIdentification = 'identification-only-one'
                tr.identificationUsage = tr.expand2
              }
              else if(barcodeArr[tr.expand] == 1){
                tr.barCodeIdentification = 'identification-first'
                tr.identificationUsage = tr.expand2
              }else if((bodyData.list[index + 1] && bodyData.list[index + 1].expand != tr.expand)||(!bodyData.list[index + 1])){
                tr.barCodeIdentification = 'identification-last'
              }else{
                tr.barCodeIdentification = 'identification-middle'
              }
            }
          })
        }
        let markData = res[2].data.data.list || [];
        this.listData = bodyData.list;
        /* 显示转科转床的信息 */

        if (this.HOSPITAL_ID === "huadu") {
          this.bedAndDeptChange = {
            bedLabelChange: bodyData.bedLabel,
            deptNameChange: bodyData.deptName,
          };
        }
        sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
        this.$nextTick(async () => {
      await initSheetPage(titleData, bodyData, markData, this.listData);
      //加载表单
        this.sheetModelData= getData()
          this.done=true
          this.tableLoading = false;
          if ((!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) && ["guizhou", '925'].includes(this.HOSPITAL_ID)) {
            return
          }
          this.getHomePage(isBottom);
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
      if (
        !sheetInfo.isSave &&
        !this.$route.path.includes("singleTemperatureChart")
      ) {
        window.app
          .$confirm("记录单还未保存，离开将会丢失数据", "提示", {
            confirmButtonText: "离开",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then((res) => {
            next();
          });
      } else {
        next();
      }
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
        this.scrollX = parseInt(e.target.scrollLeft)
      }
    },
    isSelectPatient(item) {
      this.$store.commit("upPatientInfo", item);
      this.bus.$emit("refreshImg");
    },
    onModalChange(e,tr,x,y,index){
      // 改变当前行状态
      tr.isChange = true
      // // 获取recordDate的下标
      let dateIndex = tr.findIndex(item=>item.key == "recordDate")
      // 如果当前行有recordDate(即是保存过)
      if(tr[dateIndex].value)return
      // // 判断修改的记录是否起始页
      let isStartPage =  index == 0 || y!=0
      // // 获取上条记录
      let preRow = isStartPage ? sheetModel[index].bodyModel[y - 1] : sheetModel[index - 1].bodyModel[sheetModel[index - 1].bodyModel.length - 1]
      let monthIndex = tr.findIndex(item=>item.key == "recordMonth")
      let hourIndex = tr.findIndex(item=>item.key == "recordHour")
      let monthValue = ''
      let hourValue = ''
      if(preRow && (preRow[monthIndex].value || preRow[dateIndex].value || preRow[hourIndex].value)){
        monthValue = preRow[monthIndex].value || moment(preRow[dateIndex].value.split(' ')[0]).format('MM-DD')
        hourValue = preRow[hourIndex].value || preRow[dateIndex].value.split(' ')[1]
      } else {
        monthValue = moment().format('MM-DD')
        hourValue= moment().format('HH:ss')
      }
      ![0,1].includes(x) && !tr[monthIndex].value && (tr[monthIndex].value = monthValue)
      ![0,1].includes(x) && !tr[hourIndex].value && (tr[hourIndex].value = hourValue)
    },
  },
  created() {
    // 初始化
    cleanData();
    this.bus.$on('clearSheetModel',()=>{
      this.sheetModelData=[]
    })
    // 针对贵州体温单如果选中病人，切换到护记。不显示病人护记问题
    if(["guizhou", '925','zhzxy'].includes(this.HOSPITAL_ID)){
      /* 不知道贵州切换副页的问题是不是这个影响的，以后有机会可以删除 侦听watch $route.path这个试试*/
      this.$store.commit("upPatientInfo", {});
    }
    // 这个貌似是个别表单用来拿婴儿的床号。不要注释
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
         /**添加页码重新赋值*/
         this.sheetModelData=getData()
          this.$nextTick(() => {
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
        if(this.HOSPITAL_ID == 'liaocheng' && this.sheetInfo.sheetType == 'access_lcey'){
          let data =  decode(ayncVisitedData)
          let isAccess = data.list.find((item=>{
            let reg = /^[0-9]+.?[0-9]*$/;
            return (item.intravenousVolume !== '' && !reg.test(item.intravenousVolume)) || (item.intake !== '' && !reg.test(item.intake))
          }))
          if(isAccess) return this.$message.error('入量填项输入应为数字！')
        }
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
            .catch((err) => {
              if (err.data.code == '300') {
                this.getSheetData()
              }
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
    //保存前做签名校验
    this.bus.$on("toSheetSaveNoSign", (newWid) => {
      let flag = true //控制保存开关
      let yearList = [] //所有日期时间数组
      let sameDay = "" // 同一天
      this.sheetModelData[0].data.bodyModel.map((row,rowIdx)=>{
        //处理所有日期时间数组
        if(row.find((item) => item.key == 'recordMonth').value != ""){
          sameDay = row.find((item) => item.key == 'recordMonth').value
        }
        if(row.find((item) => item.key == 'status').value != ''&& (row.find((item) => item.key == 'recordMonth').value || row.find((item) => item.key == 'recordHour').value) ){
          if(row.find((item) => item.key == 'recordMonth').value === ""){
            yearList.push(`${sameDay} ${row.find((item) => item.key == 'recordHour').value}`)
          }else{
            yearList.push(`${row.find((item) => item.key == 'recordMonth').value} ${row.find((item) => item.key == 'recordHour').value}`)
          }
        }
        //通过是否填写了时间来判定该行是否为有数据的一行
        let isChange = row.find((item) => item.key == 'recordHour').value
        if(isChange){
          //未签名状态status.value的值为空或0
          let noSignRow = row.find((item) => item.key == 'status').value === '0' || row.find((item) => item.key == 'status').value === ''
          if(noSignRow){
            let year = row.find((item) => item.key == 'recordMonth').value
            let time = row.find((item) => item.key == 'recordHour').value
            //如果是同一天的同一个时间不需要签名
            if(yearList.includes(`${year} ${time}`)){

            }else{
              $(`#row_${rowIdx}`).eq(0).addClass("red-border")
              flag = false
              return this.$message.warning("存在未签名的记录，请全部签名后再保存");
            }
          }
        }
      })
      if(flag){
        this.bus.$emit('saveSheetPage', 'noSaveSign')
      }
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
      if (
        process.env.HOSPITAL_ID == "fuyou" ||
        process.env.HOSPITAL_ID == "quzhou" ||
        process.env.HOSPITAL_ID == "huadu" ||
        process.env.HOSPITAL_ID == "foshanrenyi"||
        process.env.HOSPITAL_ID == "liaocheng"||
        process.env.HOSPITAL_ID == "xiegang"
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

    this.bus.$on("toSheetPrintPagewhfk", (obj) => {
      const newWid = obj.newWid,fromParams=obj.fromParams;
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

      // if (process.env.NODE_ENV === "production") {
        newWid.location.href = `/crNursing/print/sheetPage?&patientId=${fromParams.patientId}&visitId=${fromParams.visitId}&formId=${fromParams.formId}&formType=${'record'}&formCode=${fromParams.formCode}&formName=${fromParams.formName}`;
      // } else {
      //   this.$router.push(`/print/sheetPage`);
      // }
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
    this.bus.$on("openEvalModelPaging", (tr, td) => {
      this.$refs.evalModelPaging.open();
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
    this.bus.$on("syncImportExam", (tr, td) => {
      this.$refs.syncExamTestModal.open(tr, td, sheetModel);
    });
    this.bus.$on("syncImportAmountExam", (tr, td) => {
      this.$refs.syncExamAmountModal.open(tr, td, sheetModel);
    });
    this.bus.$on("ImportExamCallBack", (str) => {
      this.bus.$emit('saveSheetPage','noSaveSign')
    });
    // this.bus.$on("quitUnlockSheetPage",this.destroyUnlock)
  },
  watch: {
    patientInfo(val) {
      this.bus.$emit("refreshImg");
      this.$store.commit("upPatientInfo", val);
    },
    deptCode(val) {
      if (val) {
        // this.getDate();
        this.breforeQuit(() => {
          cleanData();房贷首付舒服的
          // this.getDate();d
        });
        // 解锁
        this.destroyUnlock()
      }
    },
    sheetModelData: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (["guizhou", 'huadu', '925'].includes(this.HOSPITAL_ID)) {
        } else {
          if (this.patientInfo.name) {
            sheetInfo.isSave = false;
          }
        }
      },
    },
    "$route.path"() {
      // 针对贵州切换出入量记录单数据不刷新，如果有问题可回撤
      if (["guizhou", 'huadu', '925'].includes(this.HOSPITAL_ID)) {
        this.sheetInfo.selectBlock = {};
      }
    },
    // 切换主页后在点击其他用户不会更新
    // 'sheetInfo.sheetType': {
    //   handler(val, prev) {
    //     if (val != prev) {
    //       this.bus.$emit('refreshSheetPage', true)
    //     }
    //   }
    // }
  },
  beforeRouteLeave (to, from, next) {
    /* 除了体温单模块和登出页面都触发解锁 */
    if(this.lockHospitalList.includes(this.HOSPITAL_ID) && from.fullPath.includes("sheetPage") && !to.fullPath.includes("login")){
       this.destroyUnlock()
    }
    if (
      !sheetInfo.isSave &&
      !from.fullPath.includes("singleTemperatureChart") //去除体温单切换未保存提示
    ) {
      window.app
        .$confirm("评估单还未保存，离开将会丢失数据", "提示", {
          confirmButtonText: "离开",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then((res) => {
          next();
        });
    } else {
      next();
    }
  },
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
    syncExamTestModal,
    syncExamAmountModal,
    sheetTableNeonatology,
    sheetTablePost_partum,
    evalModel,
    evalModelPaging,
    sheetTablePost_hemodialysis,
    sheetTable_oxytocin,
    sheetTableDressing_count,
    sheetTableMaternal_newborn_lc,
    sheetTable_picc_maintenance_hd,
    sheetTable_intervention_cure_hd,
    sheetTable_hemodialysis_CRRT_hd,
    sheetTable_intervention_cure,
    sheetTable_intersurgerycure_qzx,
    sheetTable_mild_hypothermia_hd,
    sheetTable_neonatology_picc,
    sheetTable_newborn_qzx,
    // sheetTable_internal_eval_lcey,
    sheetTable_surgical_eval2_lcey,
    sheetTable_intervention_cure_lcey,
    sheetTable_picu_hemodialysis_jm,
    sheetTable_waiting_birth_gzry,
    sheetTable_newborn_care_gzry,
    sheetTable_catheterplacement_jm,
    sheetTable_picc_custody_jm,
    sheetTable_nicu_custody_hd,
    sheetTable_nicu_custody_jm,
    doctorEmr,
    sheetTable_oxytocin_hl,
    sheetTable_oxytocin_sdlj,
    sheetTable_emergency_rescue,
    sheetTable_dressing_count_hl,
    sheetTable_cardiology_lcey,
  },
};
</script>
