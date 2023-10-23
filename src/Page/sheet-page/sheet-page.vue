<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageLoading"
    element-loading-text="正在保存"
  >
    <div class="left-part" :style="{ width: leftPartWidth }" >

      <patientList
        :width="leftPartWidth"
        :toName="
          toSingleTempArr.includes(HOSPITAL_ID) &&
          $route.path.includes('singleTemperatureChart')
            ? 'singleTemperatureChart'
            : 'sheetPage'
        "
        :callFunction="isSelectPatient"
        :collapse="!openLeft"
      />
    </div>

    <div
      class="body-con"
      id="sheet_body_con"
      :style="{ height: containHeight, width: `calc(100% - ${leftPartWidth})` }"
    >
      <div class="head-con">
      <!-- <div class="dept-select-con"></div> -->
        <div class="tool-con">
          <sheetTool
            ref="sheetTool"
            :isLock='isLock'
            :isLoad='isLoad'
            :sheetTitleData="sheetTitleData"
            :maxPage="Number(sheetInfo.endPage)"
            @mountSheetTag="onMountSheetTag"
            :sheetTagInfo="sheetTagInfo"
            @sheetDelete="onSheetClose"
          ></sheetTool>
        </div>
      </div>
        <!-- :style="{ marginLeft: openLeft ? '200px' : '0' }" -->
      <div
        class="right-part"
        :class="{ wxHighLightBg: HOSPITAL_ID == 'weixian' }"
        v-loading="tableLoading"
        element-loading-text="拼命加载中"
      >
        <SheetTags
          v-if="hasSheetTags"
          :tagsList="sheetTagsList"
          :currentTag="currentTag"
          @switchSheet="onSheetSwitch"
          @closeSheet="onSheetClose"
        />
        <div
          class="sheetTable-contain"
          ref="scrollCon"
              id="page"
          @scroll="(e) => onScroll(e)"
          :style="{ height: `calc(100% - ${sheetTagsHeight}px)` }"
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
              :scrollX="scrollX"
              :isInPatientDetails="false"
              :bedAndDeptChange="bedAndDeptChange"
              :listData="listData"
              :specialLis="specialList"
              @onModalChange="onModalChange"
              :sheetTagsHeight="sheetTagsHeight"
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
    <SDYYModal ref="SDYYModal"></SDYYModal>
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
    <doctorEmr v-if="['foshanrenyi','huadu','zhzxy','fsxt','dglb','nfyksdyy','whsl', 'whhk', 'ytll'].includes(HOSPITAL_ID)" />
    <changeMajorRadio
      v-if="HOSPITAL_ID != 'nfyksdyy'"
      :dialogTableVisibleTrue="dialogDeptNameVisible"
      :majorData="{
        patientId:  patientInfo.patientId,
        visitId: patientInfo.visitId,
        id: sheetInfo.selectBlock.id
      }"
      @TableVisible="(val) => dialogDeptNameVisible = val"
      @savedata="(val) => {val &&  getSheetData()}"
    ></changeMajorRadio>
    <changeMajorCheckbox
      v-else
      ref="changeMajorCheckbox"
      :majorData="{
        patientId:  patientInfo.patientId,
        visitId: patientInfo.visitId,
        id: sheetInfo.selectBlock.id
      }"
      @TableVisible="(val) => dialogDeptNameVisible = val"
      @savedata="(val) => {val &&  getSheetData()}"
    ></changeMajorCheckbox>
    <confirm-modal ref="confirmModal"></confirm-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
@import '../../assets/css/style.styl';

.contain {
  margin: 0;
  background: #fff;
  // border: 1px solid #CBD5DD;
  border-radius: 2px;
  display: flex;
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
  .left-part {
    height: calc(100vh - 60px);
    width: 199px;
    // position: absolute;
    // left: 0;
    // top: -40px;
    // bottom: 0;
    z-index: 5;
  }
  .body-con {
    position: relative;

    .right-part {
      // margin-left: 199px;
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
  // height: calc( 100% - 35px);
  height: 100%;
  background: #DFDFDF;
  overflow: auto;
  z-index: 3;
  padding: 15px 5px 15px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  position: relative;
  scrollBar(14px, 14px);
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
import sheetTable_oxytocinck_dglb from "./components/sheetTable_oxytocinck_dglb/sheetTable";
import sheetTable_insulin_pump_sdry from "./components/sheetTable-insulin_pump_sdry/sheetTable";
import sheetTable_oxytocin_sdry from "./components/sheetTable-oxytocin_sdry/sheetTable";
import sheetTable_oxytocin_hzly from "./components/sheetTable-oxytocin_hzly/sheetTable";
import sheetTable_oxytocin_dglb from "./components/sheetTable-oxytocin_dglb/sheetTable";
import sheetTable_emergency_rescue from "./components/sheetTable-emergency_rescue/sheetTable";
import sheetTable_dressing_count_hl from "./components/sheetTable-dressing_count_hl/sheetTable";
import sheetTable_prenatal_ytll from "./components/sheetTable-prenatal_ytll/sheetTable";
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
  showBodyByPage,
  showTitle,
  delPage,
  markList,
  splitRecordBlock,
  findListByBlockId,
  list
} from "@/api/sheet.js";
import { nanfnagCaSign} from "@/api/caCardApi";
import sheetInfo from "./components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "./components/modal/del-page.vue";
import $ from "jquery";
import moment from "moment";
import HjModal from "./components/modal/hj-modal.vue";
import HdModal from "./components/modal/hd-modal.vue";
import confirmModal from "@/components/confirm/index.vue";
import SDYYModal from "@/Page/sheet-page/components/modal/sdyy-modal.vue";
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
import { sheetScrollBottom } from "./components/utils/scrollBottom";
import { blockSave, getNurseExchageInfo } from "./api/index";
import {GetUserList,verifyNewCaSign} from '../../api/caCardApi'
import testSheet from './testSheet.json'
//解锁
import {unLock,unLockTime} from "@/Page/sheet-hospital-eval/api/index.js"
import changeMajorRadio from '@/Page/sheet-page/components/modal/changeMajorRadio.vue'
import changeMajorCheckbox from '@/Page/sheet-page/components/modal/changeMajorCheckbox.vue'
import SheetTags from './components/sheet-tags/index.vue';
import qs from 'qs'
import { saveModal } from "./components/sheet-tool/sheetPageModal.js"

export default {
  mixins: [common],
  data() {
    return {
      data: {
        bedList: [],
      },
      patientListLoading: false,
      dialogDeptNameVisible: false,
      pageLoading: false,
      tableLoading: false,
      bus: bus(this),
      sheetModelData:[],
      sheetInfo,
      scrollTop: 0,
      typeList: [], // 科室类型
      scrollY: 0,
      scrollX: 0,
      bedAndDeptChange: {},
      foshanshiyiIFca:false,//佛山key状态
      listData: [],
      specialList: [],
      toSingleTempArr: [
        "huadu",
        "liaocheng",
        "hengli",
        "quzhou",
        "hj",
        "wujing",
      ], // 患者列表点击前往体温单录入的医院
      lockHospitalList:[
        'huadu',
        'nfyksdyy'
      ], // 护记锁定功能医院（护士1占用了护记1，则护士2进入会报错和不让操作）
      isLock:false,
      isLoad:false,  //如果主页数据多接口就返回慢，在数据没回来之前切换了副页，副页的数据会被后回来的主页数据覆盖。
      sheetTitleData: {}, // 自定义表头数据
      sheetTagsList: [], // 标签数据
      currentTag: null, // 当前选中标签
      sheetTagInfo: null,
    };
  },
  mounted() {
    this.$nextTick(()=>{
      document.body.style.overflowY =  'hidden'
    })
  },
  computed: {
    leftPartWidth() {
      return this.openLeft ? '199px' : '0px';
    },
    // 显示标签
    hasSheetTags() {
      // return ['nfyksdyy', 'whsl'].includes(this.HOSPITAL_ID) && !!this.sheetTagsList.length;
      return !!this.sheetTagsList.length;
    },
    // 标签高度
    sheetTagsHeight() {
      return this.hasSheetTags ? 35 : 0;
    },
    containHeight() {
      if (this.fullpage) {
        return this.wih - 44 + "px";
      } else {
        return this.wih - 104 + "px";
      }
    },
    findBlockContextModal(){
      //判断是否是从主页通过任务提醒进来的模式
      return this.sheetInfo.findBlockContext.recordId
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
      let resultModel =this.sheetModelData
      return resultModel;
    },
    sheetTable() {
      let data ={
        "neonatology" : sheetTableNeonatology,
        "post_partum" : sheetTablePost_partum,
        "blood_purification" : sheetTablePost_hemodialysis,
        "oxytocin" : sheetTable_oxytocin,
        "dressing_count" : sheetTableDressing_count,
        "maternal_newborn_lc" : sheetTableMaternal_newborn_lc,
        "record_children_serious2_lc" : sheetTable_record_children_serious2_lc,
        "picc_maintenance_hd" : sheetTable_picc_maintenance_hd,
        "intervention_cure_hd" : sheetTable_intervention_cure_hd,
        "hemodialysis_CRRT_hd" : sheetTable_hemodialysis_CRRT_hd,
        "intervention_cure" : sheetTable_intervention_cure,
        "mild_hypothermia_hd" : sheetTable_mild_hypothermia_hd,
        "neonatology_picc" : sheetTable_neonatology_picc,
        "newborn_qzx" : sheetTable_newborn_qzx,
        "surgical_eval2_lcey" : sheetTable_surgical_eval2_lcey,
        "intervention_cure_lcey" : sheetTable_intervention_cure_lcey,
        "picu_hemodialysis_jm" : sheetTable_picu_hemodialysis_jm,
        "waiting_birth_gzry" : sheetTable_waiting_birth_gzry,
        "newborn_care_gzry" : sheetTable_newborn_care_gzry,
        "catheterplacement_jm" : sheetTable_catheterplacement_jm,
        "picc_custody_jm" : sheetTable_picc_custody_jm,
        "nicu_custody_hd" : sheetTable_nicu_custody_hd,
        "nicu_custody_jm" : sheetTable_nicu_custody_jm,
        "cardiology_lcey" : sheetTable_cardiology_lcey,
        "rescue_hl" : sheetTable_emergency_rescue,
        "oxytocin_hl" : sheetTable_oxytocin_hl,
        "oxytocin_sdlj" : sheetTable_oxytocin_sdlj,
        "oxytocinck_dglb" : sheetTable_oxytocinck_dglb,
        "oxytocin_sdry" : sheetTable_oxytocin_sdry,
        "oxytocin_hzly" : sheetTable_oxytocin_hzly,
        "insulin_pump_sdry" : sheetTable_insulin_pump_sdry,
        "oxytocin_dglb" : sheetTable_oxytocin_dglb,
        "dressing_count_hl" : sheetTable_dressing_count_hl,
        "intersurgerycure_qzx" : sheetTable_intersurgerycure_qzx,
        "prenatal_ytll" : sheetTable_prenatal_ytll,
      }
        if(data[sheetInfo.sheetType]){
          return data[sheetInfo.sheetType]
        }else{
          return sheetTable;
        }
    },
  },
  methods: {
    // 添加护记标签
    onMountSheetTag(sheet) {
      this.currentTag = sheet;
      const tagIndex = this.sheetTagsList.findIndex(tag => tag.id === sheet.id);
      if (tagIndex === -1) {
        this.sheetTagsList.push(sheet);
      }
    },
    // 标签切换护记
    onSheetSwitch(sheet) {
      if (sheet && sheet.id !== this.currentTag.id) {
        this.currentTag = sheet;
      }
      this.sheetTagInfo = sheet;
    },
    // 标签关闭护记
    onSheetClose(sheet) {
      const sheetIndex = this.sheetTagsList.findIndex(tag => tag.id === sheet.id);
      if (sheetIndex !== -1) {
        this.sheetTagsList.splice(sheetIndex, 1);
      }
      const lastTag = this.sheetTagsList[this.sheetTagsList.length - 1]
      // 重新打开
      this.onSheetSwitch(lastTag);
    },
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
    /**把计算页面滚动的复制出来方便其他模块调用*/
    /**这里如果调用  就回到当前修改的页码*/
    /**scrollValue页码定位的值，保存直接拿refscrollCon的scrollTop，其他需要传值进来(有些操作 在获取数据后页码生成滚动定位之前，所以用入参的方式)*/
    scrollFun(scrollValue){
      this.$nextTick(() => {
        //不传入参滚动值 默认选择refscrollCon的scrollTop
        this.$refs.scrollCon.scrollTop = scrollValue;
        $(".red-border").removeClass("red-border");
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
        }, 400);
        setTimeout(() => {
          if (this.$refs.scrollCon.scrollTop == 0) {
            this.$refs.scrollCon.scrollTop = this.scrollTop;
          }
          $(".red-border").removeClass("red-border");
        }, 600);
      });

    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then((res) => {
          this.data.bedList = res.data.data.filter((item) => {
            return item.patientId;
          });

          this.sheetInfo.bedList = this.data.bedList;
          this.patientListLoading = false;
          this.sheetInfo.isSave = true;
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
    getSheetData() {
      const {startPageIndex,endPageIndex} = this.$store.state.sheet.sheetPageArea
      if(startPageIndex == null||endPageIndex == null) return
      this.tableLoading = true;
      sheetInfo.isDone = false;
      if (['foshanrenyi', 'fsxt', 'gdtj', 'nfyksdyy','zjhj','hzly','sdhpwk'].includes(this.HOSPITAL_ID)) {
          this.bus.$emit("refreshTitleTemplate", this.getTemplateList);
        }
      if(["guizhou", 'huadu', '925', 'wujing'].includes(this.HOSPITAL_ID)){
        this.isLoad=false
      }
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        this.tableLoading = false;

        return;
      }
      $(".red-border").removeClass("red-border");
      //  cleanData()
      let fnArr = [
        showTitle(this.patientInfo.patientId, this.patientInfo.visitId,startPageIndex,endPageIndex),
        showBodyByPage(this.patientInfo.patientId, this.patientInfo.visitId,startPageIndex,endPageIndex),
        markList(this.patientInfo.patientId, this.patientInfo.visitId),
        list('全部',this.patientInfo.wardCode),
      ]
      // 佛山市一 获取自定义标题数据
      if (['foshanrenyi','fsxt', 'gdtj', 'nfyksdyy','zjhj','hzly','sdhpwk'].includes(this.HOSPITAL_ID)) {
        fnArr.shift()
        fnArr.unshift(findListByBlockId(startPageIndex,endPageIndex))
      }
      return Promise.all(fnArr).then((res) => {
        if(["guizhou", 'huadu', '925', 'wujing'].includes(this.HOSPITAL_ID)){
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



        // let bodyData = testSheet.data;
        let bodyData = res[1].data.data;
        sheetInfo.extraData = res[1].data.data.extraData
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
        sheetInfo.relObj = null;
        sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};

        // 获取到特殊情况列表内容
        let specialList = res[3].data.data.list;
        this.specialList = specialList.map(item=> item.content)
        this.$nextTick(async () => {
        await initSheetPage(titleData, bodyData, markData, this.listData);
      //加载表单
        this.sheetModelData= getData()
          if ((!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) && ["guizhou", '925'].includes(this.HOSPITAL_ID)) {
            return
          }
          let timeNum = 15;
          //页面初始化之后 从本地localStorage拿值 如果是有值 就滚动到当前值回到当前操作页面  如果没有 就滚动到底部
          //isDone 判断护记执行完所有操作后 加载完成标准
          this.tableLoading = false;
          sheetInfo.isDone = true;
          function toBottom() {
            timeNum--;
              //初始化护记数据都设置保存状态为已经保存，放这里运行是借用多次执行判断护记加载完成再设置
                this.sheetInfo.isSave = true;
                const sheetPageScrollValue = localStorage.getItem('sheetPageScrollValue')
                const isBottom = sheetPageScrollValue !== "null" ? false : true
                if (
                  this.$refs.scrollCon.scrollHeight >
                  this.$refs.scrollCon.offsetHeight
                ) {
                  if (isBottom) {
                    sheetScrollBottom.call(this, 0);
                    timeNum > 0 && toBottom.call(this);
                    localStorage.setItem('sheetPageScrollValue', null)
                  } else {
                    this.scrollFun(sheetPageScrollValue)
                  }
                }
          }
          setTimeout(() => {
            this.$nextTick(() => {
              if (!this.patientInfo.recordId) {
                toBottom.call(this);
              }
            });
          }, 300);
        });
      }).catch((err) => {
        this.pageLoading = false;
            });;
    },
    breforeQuit(next) {
      if (
        this.sheetInfo.selectBlock.id &&
        !this.sheetInfo.isSave &&
        !this.$route.path.includes("singleTemperatureChart")&&
        !this.findBlockContextModal
      ) {
        if(this.HOSPITAL_ID == 'nfyksdyy'){
          let config = {
            warmtlt : "请确认记录单已保存，如未保存离开将会丢失数据",
            buttonList : [
              {label:"取消",fun:()=>{this.$refs.confirmModal.close()}},
              {label:"离开",fun:()=>{
                this.bus.$emit("clearClickRow")
                this.$refs.confirmModal.close(),
                this.$refs.confirmModal.close(),
                next()
              }},
              {label:"保存并离开",type:"primary",fun:()=>{
                this.bus.$emit("clearClickRow")
                this.bus.$emit('saveSheetPage', 'noSaveSign')
                this.$refs.confirmModal.close(),
                next()
              }}
            ]
          }
          this.$refs.confirmModal.open(config)
        }else {
          window.app
          .$confirm("请确认记录单已保存，如未保存离开将会丢失数据", "提示", {
            confirmButtonText: "离开",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then((res) => {
            this.bus.$emit("clearClickRow")
            // this.HOSPITAL_ID == 'nfyksdyy' && this.bus.$emit('saveSheetPage', 'noSaveSign')
            next();
          });
        }
      } else {
        this.bus.$emit("clearClickRow")
        next();
      }
    },
    checkChange(cb,todo){
      let end = this.filterSheetModel.find(model=>{
        return model.data.bodyModel.find(tr=>{
          return tr.isChange
        })
      })
      if(!end){
        todo && todo()
      }else{
        this.$confirm("存在未保存数据，您是否要保存", "提示", {
            confirmButtonText: "保存",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then((res) => {
            cb && cb()
            todo && todo()
          });
      }
    },
    getHomePage(isFirst) {
      getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
        (res) => {
          this.sheetInfo.sheetStartPage =
            (res.data.data && res.data.data.indexNo) || 1;
          this.sheetInfo.sheetMaxPage =
            (res.data.data && res.data.data.maxIndexNo) || 1;
          isFirst && this.bus.$emit("initSheetPageSize",true);
        }
      );
    },
    saveBody(decodeAyncVisttedData){
      saveBody(
        this.patientInfo.patientId,
        this.patientInfo.visitId,
        decodeAyncVisttedData
      ).then(async (res) => {
          if(res.data.code == 200){
            this.bus.$emit('initSheetPageSize')
            let isdischarge = decodeAyncVisttedData.list.find(item => item.topComment == '出院|')
          if(this.sheetInfo.sheetType == 'body_temperature_Hd' && isdischarge){
            this.$nextTick(()=>{
              this.$confirm(
                `体温单出院时间已填写为：${isdischarge.recordYear}-${isdischarge.recordMonth} ${isdischarge.recordHour}，请及时完成应归档记录!`,
                {
                  confirmButtonText: "确定",
                  showCancelButton: false,
                  type: "warning",
                }
              ).then((res)=>{
                this.pageLoading = false;
                this.$notify.success({
                  title: "提示",
                  message: "保存成功",
                  duration: 1000,
                });
              }).catch(()=>{
                this.pageLoading = false;
                this.$notify.success({
                  title: "提示",
                  message: "保存成功",
                  duration: 1000,
                });
              })
            })
          }else{
            this.$nextTick(()=>{
              this.pageLoading = false;
              this.$notify.success({
              title: "提示",
              message: "保存成功",
              duration: 1000,
            });
            })
          }
          }
          if(['foshanrenyi'].includes(this.HOSPITAL_ID)){
            GetUserList().then(res=>{
              if (res.data.length == 0) {
                this.$message.warning('记录已保存未签名，请检查证书插口')
              }
            })
          }
        })
        .catch((err) => {
          this.pageLoading = false;
          // if (err.data.code == '300') {
          //   this.bus.$emit('initSheetPageSize')
          //   this.pageLoading = false;
          // }
        });
    },
    onScroll(e) {
      if (sheetInfo.sheetType && sheetInfo.sheetType.indexOf("_wx") > -1) {
      } else {
        this.scrollY = parseInt(e.target.scrollTop);
        this.scrollX = parseInt(e.target.scrollLeft)
        localStorage.setItem('sheetPageScrollValue',e.target.scrollTop>0?e.target.scrollTop:null)
      }
    },
    isSelectPatient(item) {
      this.$store.commit("upPatientInfo", item);
      this.$store.commit("upCurSheetPatient", item);
      this.bus.$emit("refreshImg");
    },
    onModalChange(e,tr,x,y,index){
      // 改变当前行状态,如果数据变化 就拿到当行的数据
      tr[`isChange`] = true
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
      if(preRow && (preRow[monthIndex].value || preRow[dateIndex].value || preRow[hourIndex].value) && !['nfyksdyy'].includes(this.HOSPITAL_ID)){
        monthValue = preRow[monthIndex].value || moment(preRow[dateIndex].value.split(' ')[0]).format('MM-DD')
        hourValue = preRow[hourIndex].value || preRow[dateIndex].value.split(' ')[1]
      } else {
        monthValue = moment().format('MM-DD')
        hourValue= moment().format('HH:mm')
      }
      if(!['nfyksdyy'].includes(this.HOSPITAL_ID)){
        ![0,1].includes(x) && !tr[monthIndex].value && (tr[monthIndex].value = monthValue)
        ![0,1].includes(x) && !tr[hourIndex].value && (tr[hourIndex].value = hourValue)
      }
    },
    //去除重复记录
    deduplication(arr){
      const newArr = arr
      let map = {}
      for (let i = newArr.length - 1; i >= 0; i--) {
        const key = newArr[i].recordDate
        if (map[`${key}`]) {
          arr.splice(i, 1)
        } else {
          map[`${key}`] = newArr[i].recordDate
        }
      }
      return newArr
    },
    deduplicationByKey(arr,item){
      const newArr = []
      let map = {}
      for (let i = 0; i < arr.length; i++) {
        if (!map[arr[i][item]]) {
          newArr.push(arr[i]);
            map[arr[i][item]] = true;
        };
      }
      return newArr
    },
    },
  created() {
    //页面生成 先检查是不是有CA
    if (['foshanrenyi'].includes(this.HOSPITAL_ID)) {
      GetUserList().then(res => {
        if (res.data.length == 0) {
          localStorage.removeItem("caUser");
          this.foshanshiyiIFca = false
        } else {
          if (res.data.split("&&&")[0].split("||")[0] != localStorage["caUser"]) {
            localStorage.removeItem("caUser");
            this.foshanshiyiIFca = false
          } else this.foshanshiyiIFca = true
        }
      })
    }
    // 初始化
    cleanData();
    this.bus.$on('clearSheetModel',()=>{
      this.sheetModelData=[]
    })
    // 针对贵州体温单如果选中病人，切换到护记。不显示病人护记问题
    if(["guizhou", '925','zhzxy', 'foshanrenyi','gdtj','zjhj'].includes(this.HOSPITAL_ID)){
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
        this.bus.$emit("initSheetPageSize",true);
        this.sheetModelData = getData()
        this.$nextTick(() => {
          /**添加页码重新赋值*/
            sheetScrollBottom.call(this);
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
    //eventBug监听，页码定位跳转的值和是否初始化
    this.bus.$on("scrollCurrentPage", (sheetPageScrollValue) => {
      let timer = setInterval(()=>{
        if(sheetPageScrollValue){
      this.scrollFun(sheetPageScrollValue)
          clearInterval(timer)
        }
      },200)
    });
    this.bus.$on(
      "saveSheetPage",
      async (isInitSheetPageSize = true, ayncVisitedData) => {
        if(this.HOSPITAL_ID == 'liaocheng' && this.sheetInfo.sheetType == 'access_lcey'){
          let data =  decode(ayncVisitedData)
          let isAccess = data.list.find((item=>{
            let reg = /^[0-9]+.?[0-9]*$/;
            return (item.intravenousVolume !== '' && !reg.test(item.intravenousVolume)) || (item.intake !== '' && !reg.test(item.intake))
          }))
          if(isAccess) return this.$message.error('入量填项输入应为数字！')
        }
        // inout_ytll 部分项目需填写数值
        if (this.sheetInfo.sheetType == 'inout_ytll') {
          let data =  decode(ayncVisitedData)
          let reg = /^[0-9]+.?[0-9]*$/
          const keys = ['actualInput', 'urine', 'stool', 'vomiting', 'drainage', 'otherOutput', 'totalOutput']
          const isAccess = data.list.find(item => {
            return keys.some(key => item[key] && !reg.test(item[key]))
          })
          if (isAccess) return this.$message.error('出入量项目输入应为数字！')
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
          const ayncVisitedDataList = decode(ayncVisitedData).list||[]
          let decodeAyncVisttedData=decode(ayncVisitedData)
          if(this.HOSPITAL_ID == 'zhzxy'){
            //医院要复制粘贴病例会有\n换行符。保存的时候去掉
            decodeAyncVisttedData.list=decodeAyncVisttedData.list.map(data=>{
              data.description=data.description.replace(/\n/gi, "");
              return data
            })
          }
          // console.log('执行保存接口,保存数据==============>>>>>>',ayncVisitedDataList)
          if(this.HOSPITAL_ID == 'wujing'){
            let trueRecordTimes = []
            //因为相同记录跨页日期时间会一样，这时候去判断记录会判断为同一条记录 ，所以要先根据记录日期去重
            const soleRecordList = this.deduplicationByKey(ayncVisitedDataList,'recordDate')
            soleRecordList.map(item=>{
              if(item.recordMonth!=='' && item.recordHour!==''){
                trueRecordTimes.push(`${item.recordMonth} ${item.recordHour}`)
              }
            })
            let newLen = new Set(trueRecordTimes).size
            // console.log('newLen',newLen,trueRecordTimes)
            if(trueRecordTimes.length>newLen){
              this.$notify.warning({
                title: "提示",
                message: "当前时间已存在记录，请检查并调整时间",
              });
              this.pageLoading = false;
              return false
            }
          }
          const user = JSON.parse(localStorage.getItem("user"))
          const qcAuthority = user.roleManageCodeList || []
            if (qcAuthority.includes('QCR0004') || qcAuthority.includes('FORM0001')) {
              decodeAyncVisttedData.list.map((list)=>{
                if(list.status&&list.status!=='0'){
                  list.auditorNo = user.empNo
                list.auditorName = user.empName
                }
              })
            }
          decodeAyncVisttedData.uShield = this.foshanshiyiIFca ? '1' : '0'
          const pageIndexs = this.$store.state.sheet.pageIndexs
          decodeAyncVisttedData.pageIndex = pageIndexs
          const nanFangcaLogin = localStorage["nanFangcaLogin"] || ""
          if([].includes(this.HOSPITAL_ID) && nanFangcaLogin){
            const nanFangcaToken = localStorage["nanFangcaToken"] || ""
            let userName = JSON.parse(localStorage.user).empNo
            let p7SignObj = decodeAyncVisttedData.list.length>0?(decodeAyncVisttedData.list[decodeAyncVisttedData.list.length-1]):{}
            let verifySignObj = {
              patientId:this.patientInfo.patientId,
              visitId:this.patientInfo.visitId,
              formName:"",
              formCode:"record",
              instanceId:this.sheetInfo.selectBlock.id,
              recordId:"",
              signData:JSON.stringify(p7SignObj),
            }
            nanfnagCaSign(userName,'',verifySignObj,nanFangcaToken,nanFangcaLogin).then(sdRes=>{
              this.saveBody(decodeAyncVisttedData)
            })
          }else this.saveBody(decodeAyncVisttedData)

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
    this.bus.$on('handleDeptNameChoose',(val)=>{
      this.dialogDeptNameVisible = val;
    })
    this.bus.$on('openMajorCheckbox',(val, deptType, index)=>{
      let data = {
        deptType,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        formId: this.sheetInfo.selectBlock.id
      }
      this.$refs.changeMajorCheckbox.majorData = data
      this.$refs.changeMajorCheckbox.dialogVisible = val
      this.$refs.changeMajorCheckbox.activeIndex = index
    })
    this.bus.$on("refreshSheetPage", () => {
      this.getSheetData()
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
    this.bus.$on("toSheetPrintPage", async (newWid) => {
      if ($(".sign-text").length) {
        // 判断是否存在标记
        if ($(".mark-mark-mark").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".mark-mark-mark").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              200,
          });
          return this.$message.warning("打印前必须去除所有标记");
        }
        // 判断是否存在未签名
        if ($(".noSignRow").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".noSignRow").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              200,
          });
          return this.$message.warning("存在未签名的记录，请全部签名后再打印");
        }
        if ($(".multiSign").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".multiSign").eq(0).addClass("red-border").offset().top +
              this.$refs.scrollCon.scrollTop -
              200,
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
            200,
        });
        return this.$message.warning("存在未签名的记录，请全部签名后再打印");
      }

      // 对存储空间不够做处理
      try {
        if(this.HOSPITAL_ID ==="whhk") await saveModal($(this.$refs.sheetTableContain).html())
        else window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
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
        if(this.HOSPITAL_ID ==="whhk") await saveModal($(this.$refs.sheetTableContain).html())
        else window.localStorage.sheetModel = $(this.$refs.sheetTableContain).html();
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
            newWid.location.href = `/crNursing/print/sheetPage?sheetType=${this.sheetInfo.sheetType}`;
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
    this.bus.$on("openSDYYModal", () => {
      this.$refs.SDYYModal.open();
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
    this.bus.$on("checkChange", (cb,todo)=>{
      this.checkChange(cb,todo)
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
    this.getSheetData()
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
      // this.$store.commit("upPatientInfo", val);
      this.sheetTagsList = [];
      this.currentTag = null;
    },
    deptCode(val) {
      if (val) {
        // this.getDate();
        this.breforeQuit(() => {
          cleanData();
          this.getDate();
        });
        // 切换科室，清空护记数据
        this.sheetModelData = [];
        this.sheetTagsList = [];
        this.currentTag = null;
        this.$store.commit("upPatientInfo", {});
        // 解锁
        this.destroyUnlock()
      }
    },
    sheetModelData: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        /*
        *监听护记的数据，除去不做提醒功能的医院
        *如果护记切换 新旧数据变化 ，如果护记blockId 相同 说明没有切换患者或者切换护记 这时候就是用户修改了数据 把
        *保存状态改为 isSave:false
        *否则是用户切换了患者，或者用户切换了护记 这时候的数据变化 ，不是用户修改的 所以保存状态为isSave:true
        */
        if (!["guizhou", 'huadu', '925'].includes(this.HOSPITAL_ID)) {
          if (this.patientInfo.patientId) {
            this.sheetInfo.isSave = true
            if (newValue.length && oldValue.length) {
              const newBlockId = newValue[0].blockId
              const oldBlockId = oldValue[0].blockId
              if (newBlockId == oldBlockId) {
                this.sheetInfo.isSave = false
              }
            }
          }
        }
      },
    },
    "$route.path"() {
      // 针对贵州切换出入量记录单数据不刷新，如果有问题可回撤 删除贵州 影响护理记录单打开
      if (['huadu'].includes(this.HOSPITAL_ID)) {
    this.sheetInfo.selectBlock = {}
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    /* 除了体温单模块和登出页面都触发解锁 */
    if (this.lockHospitalList.includes(this.HOSPITAL_ID) && from.fullPath.includes("sheetPage") && !to.fullPath.includes("login")) {
      this.destroyUnlock()
    }
    if (
      !this.sheetInfo.isSave &&
      !from.fullPath.includes("singleTemperatureChart") //去除体温单切换未保存提示
    ) {
      if(this.HOSPITAL_ID == 'nfyksdyy'){
        let config = {
          warmtlt : "护理记录单，离开将会丢失数据",
          buttonList : [
            {label:"取消",fun:()=>{this.$refs.confirmModal.close()}},
            {label:"离开",fun:()=>{
              this.sheetInfo.selectBlock = {}
              cleanData();
              this.$refs.confirmModal.close(),
              next()
            }},
            {label:"保存并离开",type:"primary",fun:()=>{
              this.bus.$emit('saveSheetPage', 'noSaveSign')
              this.sheetInfo.selectBlock = {}
              cleanData();
              this.$refs.confirmModal.close()
              next()
            }}
          ]
        }
        this.$refs.confirmModal.open(config)
      }else{
        window.app
          .$confirm("护理记录单，离开将会丢失数据", "提示", {
             confirmButtonText: "离开",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then((res) => {
            this.sheetInfo.selectBlock = {}
            cleanData();
            // this.HOSPITAL_ID == 'nfyksdyy' && this.bus.$emit('saveSheetPage', 'noSaveSign')
            next();
          });
      }
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
    SDYYModal,
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
    sheetTable_insulin_pump_sdry,
    sheetTable_oxytocin_sdry,
    sheetTable_oxytocin_hzly,
    sheetTable_oxytocin_dglb,
    sheetTable_emergency_rescue,
    sheetTable_dressing_count_hl,
    sheetTable_cardiology_lcey,
    sheetTable_prenatal_ytll,
    changeMajorRadio,
    changeMajorCheckbox,
    SheetTags,
    confirmModal
  },
};
</script>
