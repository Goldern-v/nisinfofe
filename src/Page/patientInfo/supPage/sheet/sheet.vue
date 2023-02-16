<template>
  <div
    class="contain"
    :class="{ fullpage }"
    v-loading="pageLoading"
    element-loading-text="正在保存"
  >
    <div class="head-con" flex>
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
      <div class="right-part" v-loading="tableLoading"  element-loading-text="拼命加载中">
        <div class="sheetTable-contain" ref="scrollCon" @scroll="onScroll">
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
              :isInPatientDetails="true"
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
            创建护理文书
          </div>
        </div>
      </div>
    </div>
    <delPageModal ref="delPageModal" :index="sheetModelData.length"></delPageModal>
    <HjModal ref="HjModal"></HjModal>
    <HdModal ref="HdModal"></HdModal>
    <GuizhouModal ref="GuizhouModal"></GuizhouModal>
    <signModal ref="signModal" title="需要该行签名着确认"></signModal>
    <signModal ref="signModal2" title="签名者确认"></signModal>
    <setPageModal ref="setPageModal"></setPageModal>
    <specialModal ref="specialModal"></specialModal>
    <specialModal2 ref="specialModal2"></specialModal2>
    <pizhuModal ref="pizhuModal"></pizhuModal>
    <syncExamTestModal ref="syncExamTestModal"></syncExamTestModal>
    <evalModel ref="evalModel"></evalModel>
    <evalModelPaging ref="evalModelPaging"></evalModelPaging>
    <!-- 电子病例弹窗 -->
    <doctorEmr
      v-if="['foshanrenyi','huadu','zhzxy','dglb'].includes(HOSPITAL_ID) && !$route.path.includes('temperature')"
    />
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.contain {
  margin: 0;
  background: #fff;
  border: 1px solid #CBD5DD;
  border-top: 0;
  border-radius: 2px;
  overflow: hidden;

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

    .right-part {
      height: 100%;
      overflow: hidden;
    }
  }
}

.dept-select-con {
  box-sizing: border-box;
  width: 180px;
  height: 37px;
  background: #F7FAFA;
  border-right: 1px solid #CBD5DD;
  border-bottom: 1px solid #EAEEF1;
  border-radius: 2px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  >>> .el-input__inner {
    width: 152px;
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
  padding: 15px;
  box-sizing: border-box;
  margin: 0 auto 20px;
  position: relative;
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

/* * 特殊样式 */
>>> .fixed-icon {
  top: 130px !important;
}

>>> .patient-info-slide {
  .slide-con {
    top: 91px !important;
  }
}
</style>

<script>
import doctorEmr from "@/components/doctorEmr";
import sheetTool from "@/Page/sheet-page/components/sheet-tool/sheet-tool.vue";
import patientList from "@/components/patient-list/patient-list.vue";
import sheetTable from "@/Page/sheet-page/components/sheetTable/sheetTable.vue";
import sheetTableNeonatology from "@/Page/sheet-page/components/sheetTable-neonatology/sheetTable";
import sheetTablePost_partum from "@/Page/sheet-page/components/sheetTable-post_partum/sheetTable";
import sheetTablePost_hemodialysis from "@/Page/sheet-page/components/sheetTable-hemodialysis/sheetTable";
import sheetTable_oxytocin from "@/Page/sheet-page/components/sheetTable-oxytocin/sheetTable";
import sheetTableDressing_count from "@/Page/sheet-page/components/sheetTable-dressing_count/sheetTable";
import sheetTableMaternal_newborn_lc from "@/Page/sheet-page/components/sheetTable-maternal_newborn_lc/sheetTable";
import sheetTable_picc_maintenance_hd from "@/Page/sheet-page/components/sheetTable-picc_maintenance_hd/sheetTable";
import sheetTable_intervention_cure_hd from "@/Page/sheet-page/components/sheetTable-intervention_cure_hd/sheetTable";
import sheetTable_hemodialysis_CRRT_hd from "@/Page/sheet-page/components/sheetTable-hemodialysis_CRRT_hd/sheetTable";
import sheetTable_intervention_cure from "@/Page/sheet-page/components/sheetTable-intervention_cure/sheetTable";
import sheetTable_intersurgerycure_qzx from "@/Page/sheet-page/components/sheetTable-intersurgerycure_qzx/sheetTable";
import sheetTable_mild_hypothermia_hd from "@/Page/sheet-page/components/sheetTable-mild_hypothermia_hd/sheetTable";
import sheetTable_neonatology_picc from "@/Page/sheet-page/components/sheetTable-neonatology_picc/sheetTable";
import sheetTable_newborn_qzx from "@/Page/sheet-page/components/sheetTable-newborn_qzx/sheetTable";
import sheetTable_internal_eval_lcey from "@/Page/sheet-page/components/sheetTable-internal_eval_lcey/sheetTable";
import sheetTable_surgical_eval2_lcey from "@/Page/sheet-page/components/sheetTable-surgical_eval2_lcey/sheetTable";
import sheetTable_intervention_cure_lcey from "@/Page/sheet-page/components/sheetTable-intervention_cure_lcey/sheetTable";
import sheetTable_picu_hemodialysis_jm from "@/Page/sheet-page/components/sheetTable-picu_hemodialysis_jm/sheetTable";
import sheetTable_record_children_serious2_lc from "@/Page/sheet-page/components/sheetTable-record_children_serious2_lc/sheetTable";
import sheetTable_waiting_birth_gzry from "@/Page/sheet-page/components/sheetTable-waiting_birth_gzry/sheetTable";
import sheetTable_newborn_care_gzry from "@/Page/sheet-page/components/sheetTable-newborn_care_gzry/sheetTable";
import sheetTable_catheterplacement_jm from "@/Page/sheet-page/components/sheetTable-catheterplacement_jm/sheetTable";
import sheetTable_picc_custody_jm from "@/Page/sheet-page/components/sheetTable-picc_custody_jm/sheetTable";
import sheetTable_nicu_custody_hd from "@/Page/sheet-page/components/sheetTable-nicu_custody_hd/sheetTable";
import sheetTable_nicu_custody_jm from "@/Page/sheet-page/components/sheetTable-nicu_custody_jm/sheetTable";
import sheetTable_cardiology_lcey from "@/Page/sheet-page/components/sheetTable-cardiology_lcey/sheetTable";
import sheetTable_oxytocin_hl from "@/Page/sheet-page/components/sheetTable-oxytocin_hl/sheetTable";
import sheetTable_oxytocin_sdlj from "@/Page/sheet-page/components/sheetTable-oxytocin_sdlj/sheetTable";
import sheetTable_oxytocin_dglb from "@/Page/sheet-page/components/sheetTable-oxytocin_dglb/sheetTable";
import sheetTable_emergency_rescue from "@/Page/sheet-page/components/sheetTable-emergency_rescue/sheetTable";
import sheetTable_dressing_count_hl from "@/Page/sheet-page/components/sheetTable-dressing_count_hl/sheetTable";
import sheetTable_prenatal_ytll from "@/Page/sheet-page/components/sheetTable-prenatal_ytll/sheetTable";

import common from "@/common/mixin/common.mixin.js";
import { nursingUnit } from "@/api/lesion";
import sheetModel, {
  addSheetPage,
  delSheetPage,
  initSheetPage,
  getData,
  cleanData,
} from "@/Page/sheet-page/sheet.js";
import decode from "@/Page/sheet-page/components/render/decode.js";
import {
  saveBody,
  showBodyByPage,
  showTitle,
  delPage,
  markList,
  splitRecordBlock,
  findListByBlockId,
  saveAndSignApi
} from "@/api/sheet.js";
import sheetInfo from "@/Page/sheet-page/components/config/sheetInfo/index.js";
import bus from "vue-happy-bus";
import delPageModal from "@/Page/sheet-page/components/modal/del-page.vue";
import $ from "jquery";
import moment from "moment";
import HjModal from "@/Page/sheet-page/components/modal/hj-modal.vue";
import HdModal from "@/Page/sheet-page/components/modal/hd-modal.vue";
import GuizhouModal from "@/Page/sheet-page/components/modal/guizhou-modal.vue";
import signModal from "@/components/modal/sign.vue";
import specialModal from "@/Page/sheet-page/components/modal/special-modal.vue";
import specialModal2 from "@/Page/sheet-page/components/modal/special-modal2.vue";
import setPageModal from "@/Page/sheet-page/components/modal/setPage-modal.vue";
import pizhuModal from "@/Page/sheet-page/components/modal/pizhu-modal.vue";
import evalModel from "@/Page/sheet-page/components/modal/eval-model/eval-model.vue";
import evalModelPaging from "@/Page/sheet-page/components/modal/eval-model/eval-model-paging.vue"
import { getHomePage } from "@/Page/sheet-page/api/index.js";
import { decodeRelObj } from "@/Page/sheet-page/components/utils/relObj";
import { sheetScrollBottom } from "@/Page/sheet-page/components/utils/scrollBottom";
import { patients } from "@/api/lesion";
import syncExamTestModal from "@/Page/sheet-page/components/modal/sync-exam-test-modal.vue";
import {GetUserList,verifyNewCaSign} from '../../../../api/caCardApi'//护记CA签名的方法
export default {
  mixins: [common],
  data() {
    return {
      data: {
        deptValue: "",
        deptList: [],
        bedList: [],
      },
      patientListLoading: false,
      tableLoading: false,
      pageLoading: false,
      bus: bus(this),
      sheetModelData:[],
      sheetInfo,
      scrollTop: 0,
      scrollY: 0,
      scrollX: 0,
      bedAndDeptChange: {},
      foshanshiyiIFca:false,//佛山CA签名key的状态
      listData: [],
      lockHospitalList:[
        'huadu'
      ], // 护记锁定功能医院（护士1占用了护记1，则护士2进入会报错和不让操作）
      isLock:false,
      isLoad:false,
      sheetTitleData: {}, // 自定义表头数据
    };
  },
  computed: {
    containHeight() {
      if (this.fullpage) {
        return this.wih - 100 + "px";
      } else {
        return this.wih - 154 + "px";
      }
    },
    patientInfo() {
      return this.$route.query;
    },
    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    filterSheetModel() {
      let resultModel =this.sheetModelData
      return resultModel;
    },
    sheetTable() {
      if (sheetInfo.sheetType == "neonatology") {
        return sheetTableNeonatology;
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
      } else if (sheetInfo.sheetType == "internal_eval_lcey") {
        return sheetTable_internal_eval_lcey;
      } else if (sheetInfo.sheetType == "surgical_eval2_lcey") {
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
      } else if (sheetInfo.sheetType == "cardiology_lcey") {
        return sheetTable_cardiology_lcey;
      } else if (sheetInfo.sheetType == "nicu_custody_jm") {
        return sheetTable_nicu_custody_jm;
      } else if (sheetInfo.sheetType == "rescue_hl") {
        return sheetTable_emergency_rescue;
      } else if (sheetInfo.sheetType == "oxytocin_hl") {
        return sheetTable_oxytocin_hl;
      } else if (sheetInfo.sheetType == "oxytocin_sdlj") {
        return sheetTable_oxytocin_sdlj;
      } else if (sheetInfo.sheetType == "oxytocin_dglb") {
        return sheetTable_oxytocin_dglb;
      } else if (sheetInfo.sheetType == "dressing_count_hl") {
        return sheetTable_dressing_count_hl;
      } else if (sheetInfo.sheetType == "intersurgerycure_qzx") {
        return sheetTable_intersurgerycure_qzx;
      } else if (sheetInfo.sheetType == "prenatal_ytll") {
        return sheetTable_prenatal_ytll;
      } else {
        return sheetTable;
      }
    }
  },
  methods: {
    addSheetPage() {
      if (this.patientInfo.name) {
        this.bus.$emit("openNewSheetModal");
        this.sheetModelData= getData()
        // addSheetPage()
      } else {
        this.$notify.info({
          title: "提示",
          message: "请选择一名患者"
        });
      }
    },
    getSheetData(isBottom) {
      const {startPageIndex,endPageIndex} = this.$store.state.sheet.sheetPageArea
      if(startPageIndex == null||endPageIndex == null) return
      this.tableLoading = true;
      sheetInfo.isDone = false;
      if(this.HOSPITAL_ID=='guizhou'||this.HOSPITAL_ID=='huadu'){
        this.isLoad=false
      }
      if (!(this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.id)) {
        cleanData();
        this.tableLoading = false;
        setTimeout(() => {
          sheetInfo.isSave = true;
        }, 100);
        return;
      }
       let fnArr = [
        showTitle(this.patientInfo.patientId, this.patientInfo.visitId,startPageIndex,endPageIndex),
        showBodyByPage(this.patientInfo.patientId, this.patientInfo.visitId,startPageIndex,endPageIndex),
        markList(this.patientInfo.patientId, this.patientInfo.visitId),
      ]
      // 佛山市一 获取自定义标题数据
      if (['foshanrenyi','fsxt', 'gdtj', 'nfyksdyy'].includes(this.HOSPITAL_ID)) {
        fnArr.shift()
        fnArr.unshift(findListByBlockId(startPageIndex,endPageIndex))
      }
      $(".red-border").removeClass("red-border");
      return Promise.all(fnArr).then(res => {
        if(this.HOSPITAL_ID=='guizhou'||this.HOSPITAL_ID=='huadu'){
          this.isLoad=true
        }
        let titleData = res[0].data.data;
        this.sheetTitleData = res[0].data.data || {};
        /* 判断护记单是否被锁定 */
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
        sheetInfo.extraData = res[1].data.data.extraData
      console.log(`界面初始化完成,前端获取接口数据========>>>>>>护记数据:`,bodyData&&bodyData.list)
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

        if (this.HOSPITAL_ID === "huadu") {
          this.bedAndDeptChange = {
            bedLabelChange: bodyData.bedLabel,
            deptNameChange: bodyData.deptName
          };
        }
          sheetInfo.relObj = decodeRelObj(bodyData.relObj) || {};
        this.$nextTick(async() => {
        await initSheetPage(titleData, bodyData, markData,this.listData);
          this.sheetModelData = getData();
          this.tableLoading = false;
          //页面初始化之后 从本地localStorage拿值 如果是有值 就滚动到当前值回到当前操作页面  如果没有 就滚动到底部
          //isDone 判断护记执行完所有操作后 加载完成标准
          sheetInfo.isDone = true;
          let timeNum = 15;
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
      });
    },
    /**把计算页面滚动的复制出来方便其他模块调用*/
    /**这里如果调用  就回到当前修改的页码*/
    /**scrollValue页码定位的值，保存直接拿refscrollCon的scrollTop，
     * 其他需要传值进来(有些操作 在获取数据后页码生成滚动定位之前，所以用入参的方式)*/
    scrollFun(scrollValue){
      this.$nextTick(() => {
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
    breforeQuit(next) {
      if (
        !this.sheetInfo.isSave&&
        this.sheetInfo.selectBlock.id
      ) {
        window.app
          .$confirm("请确认记录单已保存，如未保存离开将会丢失数据", "提示", {
            confirmButtonText: "离开",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(res => {
            next();
          });
      } else {
        next();
      }
    },
    getHomePage(isFirst) {
      getHomePage(this.patientInfo.patientId, this.patientInfo.visitId).then(
        res => {
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
        localStorage.setItem('sheetPageScrollValue',e.target.scrollTop>0?e.target.scrollTop:null)
      }
    },
    getDate() {
      if (this.deptCode) {
        this.patientListLoading = true;
        patients(this.deptCode, {}).then(res => {
          let bedList = res.data.data.filter(item => {
            return item.patientId;
          });
    this.$store.commit("upPatientInfo", this.$route.query);
          sheetInfo.bedList = bedList;
          sheetInfo.isSave = true;
        });
      }
    },
    isFirst(tr, x, y, bodyModel) {
      let recordDate = tr.find((item) => item.key == "recordDate").value;
      let recordSource = tr.find((item) => item.key == "recordSource").value;
      let flag = false;
      if (recordDate && recordSource) {
        let dateIndex = bodyModel[0].findIndex(
          (e) => e.key == "recordDate"
        );
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
    //第三方浏览界面 是路由传的患者信息 所以一开始先清空界面VUEX的信息，再提交路由的
    this.getDate();
    this.$store.commit("upPatientInfo", {});
    setTimeout(() => {
      this.$store.commit("upPatientInfo", this.$route.query);
    }, 100);
    sheetInfo.isSave = true;
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
      this.$refs.delPageModal.open(async checkList => {
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
          message: "删除成功"
        });
      });
    });
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
    //eventBug监听，页码定位跳转的值和是否初始化
    this.bus.$on("scrollCurrentPage", (isInitSheetPageSize, sheetPageScrollValue) => {
      let timer = setInterval(() => {
        if (sheetPageScrollValue) {
          this.scrollFun(sheetPageScrollValue)
          clearInterval(timer)
        }
      }, 200)
    });
    this.bus.$on("saveSheetPage", (isInitSheetPageSize = true,ayncVisitedData) => {
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
        console.log('执行保存接口,保存数据==============>>>>>>',ayncVisitedDataList)
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
        saveBody(this.patientInfo.patientId, this.patientInfo.visitId, decodeAyncVisttedData)
          .then(res => {
            if (res.data.code == 200) {
              this.bus.$emit('initSheetPageSize')
                this.$nextTick(()=>{
                  this.pageLoading = false;
                  this.$notify.success({
                  title: "提示",
                  message: "保存成功",
                  duration: 1000,
                });
                })
            }
          })
          .catch(() => {
            this.pageLoading = false;
          });
      };

      let reverseList = [...decode().list].reverse();
      /** 最后的时间 */
      let lastRecordHour = (
        reverseList.find(item => item.recordDate && item.recordHour) || {}
      ).recordHour;
      /** 所有新增的时间 */
      let newRecordHours = reverseList
        .filter(
          item => item.recordHour && !item.recordMonth && !item.recordDate
        )
        .map(item => item.recordHour);
      /** 新增记录是否存在比原有记录更前 */
      let isBefore = newRecordHours.some(
        item =>
          moment("2019-9-20 " + item).unix() <
          moment("2019-9-20 " + lastRecordHour).unix()
      );
      if (isBefore) {
        this.$confirm(
          "新增记录比原有记录时间更前, 请确定日期, 是否确认保存?",
          "提示",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(res => {
          save();
        });
      } else {
        save();
      }
    });
    this.bus.$on("refreshSheetPage", isFirst => {
      this.getSheetData(isFirst);
    });
    this.bus.$on("toSheetPrintPage", newWid => {
      if ($(".sign-text").length) {
        // 判断是否存在标记
        if ($(".mark-mark-mark").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".mark-mark-mark")
                .eq(0)
                .addClass("red-border")
                .offset().top +
              this.$refs.scrollCon.scrollTop -
              150
          });
          return this.$message.warning("打印前必须去除所有标记");
        }
        // 判断是否存在未签名
        if ($(".noSignRow").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".noSignRow")
                .eq(0)
                .addClass("red-border")
                .offset().top +
              this.$refs.scrollCon.scrollTop -
              150
          });
          return this.$message.warning("存在未签名的记录，请全部签名后再打印");
        }
        // 判断是否存在多签名
        if ($(".multiSign").length) {
          $(this.$refs.scrollCon).animate({
            scrollTop:
              $(".multiSign")
                .eq(0)
                .addClass("red-border")
                .offset().top +
              this.$refs.scrollCon.scrollTop -
              150
          });
          return this.$message.warning("记录存在多个签名，或者忘记填写时间");
        }
      }

      if (
        $(".sheet-page-container-hemodialysis .isNoSign") &&
        $(".sheet-page-container-hemodialysis .isNoSign").length
      ) {
        $(".signTd")
          .eq(0)
          .addClass("red-border");
        $(this.$refs.scrollCon).animate({
          scrollTop:
            $(".sheet-page-container-hemodialysis .isNoSign")
              .eq(0)
              .offset().top +
            this.$refs.scrollCon.scrollTop -
            150
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
          "adminNurse"
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
      //   printUrl = "/crNursing/print/sheetPage?toPrint=true";
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
      if (process.env.HOSPITAL_ID == "fuyou"||
          process.env.HOSPITAL_ID == "quzhou" ||
          process.env.HOSPITAL_ID == "huadu"||
          process.env.HOSPITAL_ID == "xiegang"||
          process.env.HOSPITAL_ID == "liaocheng" ||
          process.env.HOSPITAL_ID == "foshanrenyi") {
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
    this.bus.$on("openEvalModel", (tr, td) => {
      this.$refs.evalModel.open();
    });
    this.bus.$on("openEvalModelPaging", (tr, td) => {
      this.$refs.evalModelPaging.open();
    });
    this.bus.$on("refrehSheetStartPage", () => {
      this.getHomePage();
    });
    this.bus.$on("openPizhuModal", (tr, td) => {
      this.$refs.pizhuModal.open(tr, td);
    });
    this.bus.$on("setSheetTableLoading", (state = false) => {
      this.tableLoading = state;
    });
    this.bus.$on("splitSheet", (tr, td) => {
      this.$refs.signModal2.open((password, empNo) => {
        let recordDate = tr.find(item => item.key == "recordDate").value;
        recordDate = recordDate
          ? moment(recordDate).format("YYYY-MM-DD HH:mm")
          : recordDate;
        splitRecordBlock(empNo, password, recordDate).then(res => {
          this.bus.$emit("getBlockList");
          this.$message.success("创建成功");
          this.bus.$emit("setSheetTableLoading", true);
        });
      });
    });
    this.bus.$on("syncImportExam", (tr, td) => {
      this.$refs.syncExamTestModal.open(tr, td, sheetModel);
    });
    this.bus.$on("ImportExamCallBack", (str) => {
      this.bus.$emit('saveSheetPage','noSaveSign')
    });
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.getDate();
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
    // 切换主页后在点击其他用户不会更新
    'sheetInfo.sheetType': {
      handler(val, prev) {
        if (val != prev) {
          this.bus.$emit('refreshSheetPage', true)
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    /* 除了体温单模块和登出页面都触发解锁 */
    if(this.lockHospitalList.includes(this.HOSPITAL_ID) && from.fullPath.includes("sheet") && !to.fullPath.includes("login")){
      this.destroyUnlock()
    }
    if (!sheetInfo.isSave) {
      window.app
        .$confirm("记录单还未保存，离开将会丢失数据", "提示", {
          confirmButtonText: "离开",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(res => {
          next();
        });
    } else {
      next();
    }
  },
  components: {
    doctorEmr,
    sheetTool,
    patientList,
    sheetTable,
    delPageModal,
    HjModal,
    HdModal,
    GuizhouModal,
    signModal,
    specialModal,
    syncExamTestModal,
    specialModal2,
    setPageModal,
    pizhuModal,
    sheetTableNeonatology,
    evalModel,
    evalModelPaging,
    sheetTablePost_partum,
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
    sheetTable_internal_eval_lcey,
    sheetTable_surgical_eval2_lcey,
    sheetTable_intervention_cure_lcey,
    sheetTable_picu_hemodialysis_jm,
    sheetTable_waiting_birth_gzry,
    sheetTable_newborn_care_gzry,
    sheetTable_catheterplacement_jm,
    sheetTable_picc_custody_jm,
    sheetTable_nicu_custody_hd,
    sheetTable_nicu_custody_jm,
    sheetTable_oxytocin_hl,
    sheetTable_oxytocin_sdlj,
    sheetTable_oxytocin_dglb,
    sheetTable_emergency_rescue,
    sheetTable_dressing_count_hl,
    sheetTable_cardiology_lcey,
    sheetTable_prenatal_ytll
  }
};
</script>
