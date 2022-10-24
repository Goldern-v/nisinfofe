<template>
  <div>
    <div class="tool-contain" flex="cross:center">
    <template  v-if="HOSPITAL_ID == 'whfk'">
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="createSheet"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">新建记录单</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="openStaticModal"
        v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
      >
        <div class="text-con">出入量统计</div>
      </div>
      <div
        v-if="showSetCreatePage()"
        class="item-box"
        flex="cross:center main:center"
        @click="setPage"
        style="width: 110px"
      >
        <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="toPrint"
        v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">打印预览</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="toPdfPrint"
        v-show="isDev && isShow()"
      >
        <div class="text-con">批量打印</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="delSheet"
      >
        <div class="text-con">删除整单</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="emit('addSheetPage')"
      >
        <div class="text-con">添加新页</div>
      </div>
       <div
        class="item-box"
        flex="cross:center main:center"
        @click="toSave"
      >
        <div class="text-con" flex="cross:center">保存</div>
      </div>
    </template>
    <template v-else-if="HOSPITAL_ID == 'huadu'">
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="emit('addSheetPage')"
        v-if="!isLock"
      >
        <div class="text-con">添加新页</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="toSave"
        v-if="!isLock"
      >
        <div class="text-con" flex="cross:center">保存</div>
      </div>
      <template  v-if="!isLock">
        <div
        class="item-box"
        flex="cross:center main:center"
        @click="openStaticModal"
        v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
         >
          <div class="text-con">出入量统计</div>
        </div>
      </template>
      <template  v-if="!isLock">
        <div
        v-if="showSetCreatePage()"
        class="item-box"
        flex="cross:center main:center"
        @click="setPage"
        style="width: 110px"
         >
        <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
      </div>
      </template>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="toPrint"
        v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">打印预览</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="toPdfPrint"
        v-show="isDev && isShow()"
      >
        <div class="text-con">批量打印</div>
      </div>
      <template  v-if="!isLock">
        <div
        v-if="!isDeputy"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="delSheet"
        >
          <div class="text-con">删除整单</div>
       </div>
      </template>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="createSheet"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">新建记录单</div>
      </div>
    </template>
    <template v-else>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="emit('addSheetPage')"
      >
        <div class="text-con">添加新页</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="toSave"
      >
        <div class="text-con" flex="cross:center">保存</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="openStaticModal"
        v-if="showCrl && !isDeputy && !isSingleTem_LCEY && !isSingleTem_GZRY"
      >
        <div class="text-con">出入量统计</div>
      </div>
      <div
        v-if="showSetCreatePage()"
        class="item-box"
        flex="cross:center main:center"
        @click="setPage"
        style="width: 100px"
      >
        <div class="text-con">设置起始页({{ sheetInfo.sheetStartPage }})</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="toPrint"
        v-if="
          (!['guizhou', '925'].includes(HOSPITAL_ID) && !isDeputy && isShow()) ||
          ['guizhou', '925'].includes(HOSPITAL_ID)
        "
      >
        <div class="text-con">打印预览</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="toPdfPrint"
        v-show="isDev && isShow()"
      >
        <div class="text-con">批量打印</div>
      </div>
      <div
        v-if="!isDeputy"
        class="item-box"
        flex="cross:center main:center"
        @click.stop="delSheet"
      >
        <div class="text-con">删除整单</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="createSheet"
        v-if="!isSingleTem && !isDeputy && isShow()"
      >
        <div class="text-con">新建记录单</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="openSelectTmp"
        v-if="!isSingleTem && !isDeputy && isShow() && showSetAsTemplate()"
      >
        <div class="text-con">设为模板</div>
      </div>
    </template>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click="openStaticModal"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID) && isDeputy"
      >
        <div class="text-con">出入量统计</div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="syncVisitWithData"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID)"
      >
        <div class="text-con">同步护理巡视</div>
      </div>
       <!-- 针对主副页切换，必须等到数据回来了才有显示 -->
      <div
        :class="[hisDocPreview('main') ? 'right-btn' : 'item-box']"
        :id="[hisDocPreview('main') ? 'is-deputy-btn' : '']"
        style="background: antiquewhite"
        flex="cross:center main:center"
        @click.stop="backMainForm"
        v-if="isDeputy && isLoad"
      >
        <div class="text-con">
          {{['guizhou', '925'].includes(HOSPITAL_ID)  ? "护理记录单" : "切换主页" }}
        </div>
      </div>
      <div
        :class="[hisDocPreview('deputy') ? 'right-btn' : 'item-box']"
        :id="[hisDocPreview('deputy') ? 'is-deputy-btn' : '']"
        style="background: antiquewhite"
        flex="cross:center main:center"
        @click.stop="addDeputyForm"
        v-if="sheetInfo.selectBlock && sheetInfo.selectBlock.additionalCode"
      >
        <div class="text-con">
          {{ ['guizhou', '925'].includes(HOSPITAL_ID) ? "出入量记录单" : "切换副页" }}
        </div>
      </div>
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="openChart"
        v-if="
          (HOSPITAL_ID === 'huadu' ||
            HOSPITAL_ID === 'liaocheng' ||
            HOSPITAL_ID === 'wujing') &&
          this.$route.path.includes('singleTemperatureChart')
        "
      >
        <div class="text-con">体温曲线</div>
      </div>
      <!--北海的婴儿录入体温曲线-->
      <div
        class="item-box"
        flex="cross:center main:center"
        @click.stop="openBabyChat()"
        v-if="
          HOSPITAL_ID === 'beihairenyi' &&
          this.$route.path.includes('Baby_sheetPage')
        "
      >
        <div class="text-con">体温曲线</div>
      </div>
      <div flex-box="1"></div>
      <el-select
        v-if=" HOSPITAL_ID == 'whfk' "
        v-model="printRecordValue"
        value-key="id"
        size="small"
        placeholder=""
        class="select-con whfk-select-con"
        @visible-change="getPrintRecordData()"
      >
        <div class="sheetSelect-con-sheet sheetSelect-con-sheet-print">
          <div class="head-con" flex="cross:stretch" >
            <div class="col-1">打印人</div>
            <div class="col-2" style="border-right:none">打印时间</div>

          </div>
          <el-option
            v-for="item in printRecord"
            :key="item.id"
            :label="item.printName+' '+item.printTime"
            :value="item"
          >
            <div class="list-con list-con-print" flex="cross:stretch" v-if="!item.nodData">
              <div class="col-1" :title="item.printName">
                {{ item.printName }}
              </div>
              <div class="col-2" :title="item.printTime" style="border-right:none">
                {{ item.printTime }}
              </div>
            </div>
            <div v-if="item.nodData" style="text-align: center;width: 562px;height: 100px;padding-top: 50px;background:#fff;background: rgb(255, 255, 255);color: #000">
                暂无打印记录
              </div>
          </el-option>
        </div>
      </el-select>
      <el-select
        v-if="!isDeputy && HOSPITAL_ID == 'whfk'"
        v-model="sheetInfo.selectBlock"
        @change="changeSelectBlock"
        value-key="id"
        placeholder="请选择护理记录单"
        class="select-con whfk-select-con"
      >
        <div class="sheetSelect-con-sheet">
          <div class="head-con" flex="cross:stretch">
            <div class="col-1">记录单标题</div>
            <div class="col-2">科室</div>
            <div class="col-3">开始时间</div>
            <div class="col-4">页码</div>
          </div>
          <el-option
            v-for="item in sheetBlockList"
            :key="item.id"
            :label="blockLabel(item, sheetBlockList.length)"
            :value="item"
          >
            <div class="list-con" flex="cross:stretch">
              <div class="col-1" :title="item.recordName">
                {{ item.recordName }}
              </div>
              <div class="col-2" :title="item.deptName">
                {{ item.deptName }}
              </div>
              <div class="col-3" :title="item.createTime">
                {{ item.createTime }}
              </div>
              <div class="col-4" :title="item.completeName">
                {{ item.pageIndex }} - {{ item.endPageIndex }}
              </div>
              <!-- <div class="col-3" :title="item.completeName">{{item.completeName}}</div> -->
            </div>
          </el-option>
        </div>
      </el-select>
      <div class="select-box" style="position:relative">
        <el-select
          v-if="!isDeputy  && HOSPITAL_ID != 'whfk'"
          v-model="sheetInfo.selectBlock"
          @change="changeSelectBlock"
          @visible-change="(val)=>changesCrollOptionFlag(val,1)"
          value-key="id"
          :placeholder="['foshanrenyi'].includes(HOSPITAL_ID)?'':'请选择护理记录单'"
          class="select-con otherType"
        >
          <div class="sheetSelect-con-sheet">
            <div class="head-con" flex="cross:stretch">
              <div class="col-1">记录单标题</div>
              <div class="col-2">科室</div>
              <div class="col-3">开始时间</div>
              <div class="col-4">页码</div>
            </div>
            <el-option
              v-for="item in sheetBlockList"
              :key="item.id"
              :label="blockLabel(item, sheetBlockList.length)"
              :value="item"
            >
              <div class="list-con" flex="cross:stretch">
                <div class="col-1" :title="item.recordName">
                  {{ item.recordName }}
                </div>
                <div class="col-2" :title="item.deptName">
                  {{ item.deptName }}
                </div>
                <div class="col-3" :title="item.createTime">
                  {{ item.createTime }}
                </div>
                <div class="col-4" :title="item.completeName">
                  {{ item.pageIndex }} - {{ item.endPageIndex }}
                </div>
                <!-- <div class="col-3" :title="item.completeName">{{item.completeName}}</div> -->
              </div>
            </el-option>
          </div>
        </el-select>
        <div class="float-text"
        v-if="['foshanrenyi'].includes(HOSPITAL_ID)"
        @click="scrollOption" v-html="selectText"></div>
      </div>
      <!-- <span class="label">页码范围:</span> -->
      <!-- 江门妇幼第三方地址提供需要页码选择显示 -->
      <div
        class="item-box"
        :style="{width:'85px',display: ['fuyou'].includes(HOSPITAL_ID) ? 'flex !important' : ''}"
        flex="cross:center main:center"
        v-if="!isDeputy || ['guizhou', 'huadu', '925','fuyou'].includes(HOSPITAL_ID)"
      >
        <el-autocomplete
          class="pegeSelect"
          icon="caret-bottom"
          placeholder="请输入页码"
          v-model="pageArea"
          :fetch-suggestions="querySearch"
        ></el-autocomplete>
      </div>
      <div
        class="item-box"
        style="width: 85px"
        flex="cross:center main:center"
        v-if="!isDeputy && ['huadu','wujing', 'beihairenyi'].includes(HOSPITAL_ID)"
      >
        <input
          class="pegeSelect"
          style="outline: none; border: none"
          placeholder="请输入页码"
          v-model="pageNum"
          @keydown="pageNumKeyDown"
        />
      </div>
      <div
        class="item-box"
        style="width: 30px"
        flex="cross:center main:center"
        @click="openEMR"
        v-if='HOSPITAL_ID == "beihairenyi"'
      >
        <div class="text-con">
          电子病历
        </div>
      </div>
      <div style="width: 5px"></div>
      <div
        class="right-btn"
        flex="cross:center main:center"
        @click="openRltbModal"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID)  && isDeputy"
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          入量同步
        </div>
      </div>
      <div
        class="right-btn"
        flex="cross:center main:center"
        @click="openRltbModal"
        v-if="showRltbN"
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          入量同步
        </div>
      </div>
      <div class="line" v-if="!isSingleTem_LCEY && !isDeputy"></div>
      <div style="width: 5px"></div>
      <template  v-if="!isLock">
        <template v-if=" HOSPITAL_ID == 'wujing'">
           <!-- 分页获取评估同步 -->
          <div
          class="right-btn"
          flex="cross:center main:center"
          @click="emit('openEvalModelPaging')"
        >
          <div class="text-con">
            <img src="./images/评估.png" alt />
            评估同步
          </div>
        </div>
        </template>
        <template v-else>
          <div
            class="right-btn"
            flex="cross:center main:center"
            @click="emit('openEvalModel')"
            v-if="!isSingleTem_LCEY && !isDeputy && HOSPITAL_ID != 'foshanrenyi'"
          >
          <div class="text-con">
            <img src="./images/评估.png" alt />
            评估同步
          </div>
          </div>
        </template>
      </template>
      <div class="line" v-if="!isSingleTem_LCEY && !isDeputy"></div>
      <template  v-if="!isLock">
        <div
          class="right-btn"
          flex="cross:center main:center"
          @click.stop="openTztbModal"
          v-if="!isSingleTem_LCEY && !isDeputy"
         >
          <div class="text-con">
            <img src="./images/体征.png" alt />
            体征同步
          </div>
        </div>
      </template>
      <div
        class="line"
        v-if="HOSPITAL_ID == 'wujing' || HOSPITAL_ID == 'quzhou'"
      ></div>
      <div
        class="line"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID) && sheetInfo.sheetType === 'common_gzry'"
      ></div>
      <div style="width: 5px"></div>
      <div
        class="right-btn"
        flex="cross:center main:center"
        @click.stop="openZxdtbModal"
        v-if="
          HOSPITAL_ID == 'wujing' ||
          HOSPITAL_ID == 'quzhou' ||
          HOSPITAL_ID == 'weixian' ||
          HOSPITAL_ID == 'liaocheng'||
          HOSPITAL_ID == 'whfk' ||
          HOSPITAL_ID == 'whhk' ||
          HOSPITAL_ID == 'gdtj' ||
          HOSPITAL_ID == 'lyxrm'
        "
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          执行单同步
        </div>
      </div>
      <div
        class="right-btn"
        flex="cross:center main:center"
        @click.stop="openZxdtbModal"
        v-if="['guizhou', '925'].includes(HOSPITAL_ID) && sheetInfo.sheetType === 'common_gzry'"
      >
        <div class="text-con">
          <img src="./images/评估.png" alt />
          输血同步
        </div>
      </div>
      <div style="width: 5px"></div>
    </div>
    <patientInfo
      v-if="
        patientInfo.patientId &&
        !$route.path.includes('temperature') &&
        !$route.path.includes('Baby_sheetPage') &&
        !['huadu'].includes(HOSPITAL_ID)
      "
    ></patientInfo>
    <!-- <demonstarationLevca v-if="HOSPITAL_ID == 'hj' && patientInfo.patientId &&
        !$route.path.includes('temperature') &&
        !$route.path.includes('Baby_sheetPage') "></demonstarationLevca> -->
    <newFormModal ref="newFormModal"></newFormModal>
    <setTitleModal ref="setTitleModal"></setTitleModal>
    <tztbModal ref="tztbModal"></tztbModal>
    <rltbModal ref="rltbModal" :blockId="blockId"></rltbModal>
    <selectPageModal ref="tmpModal" @setAsTemplate="setAsTemplate"></selectPageModal>
    <zxdtbModal
      ref="zxdtbModal"
      :blockId="blockId"
      :title="titleName"
      :modalWidth="modalWidth"
    ></zxdtbModal>
    <patientInfoModal ref="patientInfoModal"></patientInfoModal>
    <rltb-nfzxy-modal v-if="showRltbN" ref="rltbNfzxyModal" :blockId="blockId" />
    <!-- <sweet-modal
      ref="sheet"
      title="体温曲线"
      class="tempSweetModal"
      @close="closeModal"
    > -->
    <moveContext
      :id="'temperatureChart'"
      :titlex="'体温曲线'"
      class="babyChat"
      v-if="
        this.$route.path.includes('singleTemperatureChart') &&
        HOSPITAL_ID == 'huadu'
      "
    >
      <temperatureHD :queryTem="patientInfo"></temperatureHD>
    </moveContext>
    <!-- </sweet-modal> -->
  </div>
</template>

<script>
import bus from "vue-happy-bus";
import $ from "jquery";
import setPageModal from "../modal/setPage-modal.vue";
import sheetModel, { cleanData } from "../../sheet.js";
import sheetInfo from "../config/sheetInfo/index.js";
import { sign } from "@/api/sheet.js";
import { Tr } from "../render/Body.js";
import {
  blockList,
  blockDelete,
  // toPdfPrint,
  // blockSave,
  switchAdditionalBlock,
  setSheetTemplate,
  getPrintRecord
} from "../../api/index.js";
import commom from "@/common/mixin/common.mixin.js";
import newFormModal from "../modal/new-sheet-modal.vue";
import setTitleModal from "../modal/set-title-modal.vue";
import tztbModal from "../modal/tztb-modal.vue";
import zxdtbModal from "../modal/zxdtb-modal.vue";
import rltbModal from "../modal/rltb-modal.vue";
import RltbNfzxyModal from "../modal/rltb-nfzxy-modal.vue";
import patientInfoModal from "./modal/patient-info-modal";
import selectPageModal from './modal/selectPageModal.vue'
import dayjs from "dayjs";
// import lodopPrint from "./lodop/lodopPrint";
import patientInfo from "./patient-info";
import temperatureHD from "../../../patientInfo/supPage/temperature/temperature-huadu";
// 演示要使用的留痕追溯
import demonstarationLevca from "./demonstaration-levca.vue"
//体温曲线窗口
import moveContext from "@/Page/temperature-chart/commonCompen/removableBox.vue";
import { getPatientInfo } from "@/api/common.js";

export default {
  mixins: [commom],
  name: "sheetTool",
  props: {
    isNursingPreview: {//是否为调阅界面体温单调起的护记
      type:Boolean,
      default:false
    },
    isLock:{ //护记是否被锁定
      type:Boolean,
      default:false
    },
    isLoad:{//list接口数据是否回来了，回来就显示切换在主副页
      type:Boolean,
      default:false
    },
    // 动态表头数据
    sheetTitleData: {
      type: Object,
      default: {}
    },
    // 最大页数
    maxPage: {
      type: Number | String,
    }
  },
  data() {
    return {
      bus: bus(this),
      readOnlyList: [
        "fuyou","huadu"
      ],
      tool: "",
      showCurve: false,
      creator: "",
      user: JSON.parse(localStorage.user),
      selectList: [],
      pageArea: "",
      sheetModel,
      sheetInfo,
      sheetBlockList: [],
      queryTem: {},
      titleName: "",
      modalWidth: 720,
      pageNum: "",
      firstPage: 1,
      printRecord:[],
      babelFirst:true,
      scrollOptionFlag:false,
      scrollOptionNum:1,
      printRecordValue:''
    };
  },
  methods: {
    changesCrollOptionFlag(val,type){
      if(type==1){
        this.scrollOptionFlag = val?false:true
        this.scrollOptionNum = val?1:2
      }else this.scrollOptionFlag =!val
    },
    scrollOption(){
      this.changesCrollOptionFlag(this.scrollOptionFlag)
      console.log(this.scrollOptionFlag,this.scrollOptionNum,"this.scrollOptionFlag")
      let inputScroll = document.querySelector(".otherType .el-input__inner")
      this.scrollOptionFlag || this.scrollOptionNum==2 ? inputScroll.focus() : inputScroll.blur()
    },
    openEMR() {
      // patient_id  患者id  visit_id  住院次数
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      let url = `http://192.168.37.203:8086?hospital_no=498784278&patient_id=${this.patientInfo.patientId}&visit_id=${this.patientInfo.visitId}&FILE_VISIT_TYPE=2`
      window.open(url, '_blank');
    },
    getPrintRecordData(){
      const fromParams = {
          patientId:this.sheetInfo.selectBlock.patientId,
          visitId:this.sheetInfo.selectBlock.visitId,
          formId:this.sheetInfo.selectBlock.id,
          formType:'record',
          formCode:this.sheetInfo.selectBlock.recordCode,
          formName:this.sheetInfo.selectBlock.recordName,
      }
      if(!this.sheetInfo.selectBlock.patientId){
        return;
      }
      getPrintRecord(fromParams)
      .then(res => {
        this.printRecord = res.data.data&&res.data.data.length>0?res.data.data:[{printName:'',printTime:'',nodData:true}];
        this.printRecordValue = this.printRecord[0]? this.printRecord[0]['printName']+' '+this.printRecord[0]['printTime']:'';
      }, err => {

      });
    },
    pageNumKeyDown(e) {
      if (e.keyCode == 13) {
        let startPage = Number(this.pageNum);
        let endPage = Number(this.pageNum);
        let tempPage = startPage;
        // let currentPageArr = this.selectList.forEach((item) => {
        //   if (item.value) {
        //     let fromPage = item.value.split("-")[0];
        //     let toPage = item.value.split("-")[1];
        //     if (fromPage <= startPage) {
        //       tempPage = fromPage;
        //       endPage = toPage;
        //     }
        //   }
        // });
        let count = startPage - tempPage;
        let scrollTop = 0;
        if (count != 0) {
          scrollTop = 722 * count + 20 * count;
        }
        startPage = tempPage;
        this.pageArea = `${startPage}-${endPage}`;
        setTimeout(() => {
          $(this.$parent.$refs.scrollCon).animate({
            scrollTop: scrollTop,
          });
        });
      }
    },
    showSetCreatePage() {
      return !this.isDeputy || ['guizhou', '925'].includes(this.HOSPITAL_ID);
    },
    //是否显示
    isShow() {
      if (
        this.HOSPITAL_ID === "beihairenyi" &&
        this.$route.path.includes("Baby_sheetPage")
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 是否显示设为模板
    showSetAsTemplate() {
      if (this.HOSPITAL_ID === 'foshanrenyi') {
        return this.isRoleManage || this.isNewAdminOrNursingDepartment
      } else {
        return false
      }
    },
    /* 出入量统计弹框--花都区分 */
    openStaticModal() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      switch (process.env.HOSPITAL_ID) {
        case "huadu":
          this.bus.$emit("openHDModal");
          break;
        case "guizhou":
          this.bus.$emit("openGuizhouModal");
          break;
        default:
          this.bus.$emit("openHJModal");
          break;
      }
    },
    /* 打开体温曲线页面 */
    openChart() {
      this.queryTem = {
        admissionDate: this.sheetInfo.selectBlock.admissionDate,
        patientId: this.sheetInfo.selectBlock.patientId,
        visitId: this.sheetInfo.selectBlock.visitId,
      };
      this.$store.commit("newDialogVisible", true); //打开体温曲线
      this.bus.$emit("refreshImg"); //打开体温曲线

    },
    /* 打开婴儿的体温曲线页面 */
    openBabyChat() {
      this.$store.commit("showBabyChat", true);
      this.$store.commit("newDialogVisible", true);
    },

    emit(todo, value) {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (this.sheetInfo.sheetType != "body_temperature_Hd") {
        if (this.readOnly) {
          return this.$message.warning("你无权操作此护记，仅供查阅");
        }
      }
      this.bus.$emit(todo, value);
    },

    tofull() {
      this.$store.commit("upSheetPageFullpage", !this.fullpage);
    },
    toSave() {
      if (process.env.HOSPITAL_ID == "nanfangzhongxiyi") {
        this.bus.$emit('toSheetSaveNoSign')
      }else{
        this.bus.$emit('saveSheetPage', 'noSaveSign')
      }
    },
    toPrint() {
      // 正式环境打印会打开窗口,个别医院双签名打印设置为不打开新窗口（打开窗口样式有bug）
      // 不打开窗口，打印完返回会有Bug（下拉不显示和表头不能修改）,只能重新加载页面
      const fromParams = {
          patientId:this.sheetInfo.selectBlock.patientId,
          visitId:this.sheetInfo.selectBlock.visitId,
          formId:this.sheetInfo.selectBlock.id,
          formType:'record',
          formCode:this.sheetInfo.selectBlock.recordCode,
          formName:this.sheetInfo.selectBlock.recordName,
      }
      if(['liaocheng','huadu','foshanrenyi','xiegang'].includes(this.HOSPITAL_ID)){
         this.$store.commit('upPreRouter',location.href)
      }
      if (!this.sheetInfo.selectBlock.id)
        return this.$message.warning("还没有选择护理记录单");
      if (
        process.env.HOSPITAL_ID == "fuyou" ||
        process.env.HOSPITAL_ID == "quzhou" ||
        process.env.HOSPITAL_ID == "huadu" ||
        process.env.HOSPITAL_ID === "foshanrenyi"||
        process.env.HOSPITAL_ID == "liaocheng"||
        process.env.HOSPITAL_ID == "xiegang"
      ) {
        this.bus.$emit("toSheetPrintPage");
      } else {
        if (process.env.NODE_ENV == "production") {
        let newWid;
        if( this.HOSPITAL_ID === 'whfk'){
          newWid = window.open();
          return this.bus.$emit("toSheetPrintPagewhfk", {newWid,fromParams});
        }else{
          if (!$(".sign-text").length) {
            newWid = window.open();
            return this.bus.$emit("toSheetPrintPage", newWid);
          }
          if (
            $(".mark-mark-mark").length == 0 &&
            $(".noSignRow").length == 0 &&
            $(".multiSign").length == 0
          ) {
            newWid = window.open();
          }
          this.bus.$emit("toSheetPrintPage",newWid);
        }

        } else {

          this.bus.$emit("toSheetPrintPage");
        }
      }
    },
    toAllPrint() {
      let pageIndex = 0;
      let pageLength = this.selectList.length;
      let htmlArr = [];
      function getHtml() {
        this.pageArea = this.selectList[pageIndex].value;
        this.$nextTick(() => {
          $(".sheet-page-container").each((index, el) => {
            let htmlText = el.outerHTML;
            htmlArr.push(htmlText);
          });
          pageIndex++;
          if (pageIndex < pageLength) {
            getHtml.call(this);
          } else {
            lodopPrint(htmlArr);
          }
        });
      }

      getHtml.call(this);
    },
    setPage() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (!this.sheetInfo.selectBlock.id) {
        return this.$message.warning("还没有选择护理记录单");
      }
      this.bus.$emit("openSetPageModal");
    },
    initSelectList() {
      let length = this.sheetModel.length + this.sheetInfo.sheetStartPage;
      let pagelist = [];
      let rest_num = this.sheetInfo.sheetStartPage % 10;
      let num = Math.ceil(Math.max(length / 10, 1));
      for (let i = 0; i <= num; i++) {
        if (i * 10 + rest_num >= length) {
          pagelist.push(length);
          break;
        }
        if ((i + 1) * 10 >= this.sheetInfo.sheetStartPage) {
          pagelist.push(i * 10 + rest_num);
        }
      }
      pagelist[0] = this.sheetInfo.sheetStartPage;
      pagelist[pagelist.length - 1] = length;
      this.selectList = [];
      for (let i = 0; i < pagelist.length; i++) {
        if (i == pagelist.length - 1) {
        } else if (i == pagelist.length - 2) {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1] - 1}`,
          });
        } else if (pagelist[i] <= pagelist[i + 1] - 1) {
          this.selectList.push({
            value: `${pagelist[i]}-${pagelist[i + 1] - 1}`,
          });
        }
      }
      /* 刷新block分页信息 */
      if (
        this.patientInfo.patientId &&
        this.patientInfo.visitId &&
        this.deptCode
      ) {
        blockList(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode
        ).then((res) => {
          this.sheetBlockList.forEach((item) => {
            try {
              let currObj = res.data.data.list.find((obj) => obj.id == item.id);
              item.pageIndex = currObj.pageIndex;
              item.endPageIndex = currObj.endPageIndex;
            } catch (error) {}
          });
        });
      }
    },
    querySearch(queryString, cb) {
      this.initSelectList();
      cb(this.selectList);
    },
    getPrev(index, bodyModel, val) {
      if (index < 0) return "";
      let tr = bodyModel[index];
      let value = tr.find((item) => {
        return item.key == val;
      }).value;
      if (value) {
        return value;
      } else {
        return this.getPrev(index - 1, bodyModel, val);
      }
    },
    getAllListAndCurrIndex(trArr) {
      let allList = [];
      let currIndex = 0;
      for (let i = 0; i < sheetModel.length; i++) {
        allList = allList.concat(sheetModel[i].bodyModel);
      }
      currIndex = allList.indexOf(trArr);
      return [allList, currIndex];
    },
    toMoreSign() {
      if (this.sheetInfo.selectRow.length) {
        window.openSignModal((password, empNo, signDate, dsvsRandom) => {
          let list = [];
          for (let trArr of this.sheetInfo.selectRow) {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            list.push(
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                recordHour: this.getPrev(currIndex, allList, "recordHour"),
                recordYear: this.getPrev(currIndex, allList, "recordYear"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              })
            );
          }
          let data = {
            empNo,
            password,
            list,
            dsvsRandom,
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              for (let i = 0; i < res.data.data.length; i++) {
                let trArrClone = Tr(res.data.data[i]);
                let trArr = sheetInfo.selectRow[i];
                if (
                  trArr.find((item) => {
                    return item.key == "recordMonth";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordMonth";
                  }).value = "";
                }
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
                  }).value = "";
                }
                trArr.splice(0, trArr.length);
                for (let i = 0; i < trArrClone.length; i++) {
                  trArr.push(trArrClone[i]);
                }
              }
              this.sheetInfo.selectRow.splice(
                0,
                this.sheetInfo.selectRow.length
              );
              this.$notify.success({
                title: "提示",
                message: "批量签名成功",
              });
              this.bus.$emit("saveSheetPage");
            }
          );
        });
      } else {
        this.$alert("请按下 ctrl 键并单击选择需要签名的行", "批量签名提示", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      }
    },
    toMoreAduit() {
      if (this.sheetInfo.selectRow.length) {
        window.openSignModal((password, empNo) => {
          let list = [];
          for (let trArr of this.sheetInfo.selectRow) {
            let trObj = {};
            for (let i = 0; i < trArr.length; i++) {
              trObj[trArr[i].key] = trArr[i].value;
            }
            let [allList, currIndex] = this.getAllListAndCurrIndex(trArr);
            list.push(
              Object.assign({}, trObj, {
                recordMonth: this.getPrev(currIndex, allList, "recordMonth"),
                recordHour: this.getPrev(currIndex, allList, "recordHour"),
                recordYear: this.getPrev(currIndex, allList, "recordYear"),
                patientId: this.patientInfo.patientId,
                visitId: this.patientInfo.visitId,
                pageIndex: this.index,
              })
            );
          }
          let data = {
            empNo,
            password,
            list,
            audit: true,
          };
          sign(this.patientInfo.patientId, this.patientInfo.visitId, data).then(
            (res) => {
              for (let i = 0; i < res.data.data.length; i++) {
                let trArrClone = Tr(res.data.data[i]);
                let trArr = sheetInfo.selectRow[i];
                if (
                  trArr.find((item) => {
                    return item.key == "recordMonth";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordMonth";
                  }).value = "";
                }
                if (
                  trArr.find((item) => {
                    return item.key == "recordHour";
                  }).value == ""
                ) {
                  trArrClone.find((item) => {
                    return item.key == "recordHour";
                  }).value = "";
                }
                trArr.splice(0, trArr.length);
                for (let i = 0; i < trArrClone.length; i++) {
                  trArr.push(trArrClone[i]);
                }
              }
              this.sheetInfo.selectRow.splice(
                0,
                this.sheetInfo.selectRow.length
              );
              this.$notify.success({
                title: "提示",
                message: "批量审核成功",
              });
              this.bus.$emit("saveSheetPage");
            }
          );
        });
      } else {
        this.$alert("请按下 ctrl 键并单击选择需要签名的行", "批量签名提示", {
          confirmButtonText: "确定",
          callback: (action) => {},
        });
      }
    },
    async getBlockList() {
      if (this.$route.path.includes("nursingPreview") || this.$route.path.includes("nursingTemperature")) {
        let { data } = await getPatientInfo(
          this.$route.query.patientId,
          this.$route.query.visitId
        );
        this.$store.commit("upDeptCode", data.data.wardCode);
      }
      if (
        this.patientInfo.patientId &&
        this.patientInfo.visitId &&
        this.deptCode
      ) {

        blockList(
          this.patientInfo.patientId,
          this.patientInfo.visitId,
          this.deptCode
        ).then((res) => {
          this.bus.$emit("setSheetTableLoading", false);
          this.selectList = [];
          let list = res.data.data.list;
          if (
            this.$route.path.includes("singleTemperatureChart") ||
            this.$route.path.includes("temperature") ||
            this.$route.path.includes("Baby_sheetPage") ||
            (this.$route.path.includes("nursingPreview") && this.isNursingPreview)
          ) {
            this.sheetBlockList = list.filter((item) => {
              switch (this.HOSPITAL_ID) {
                case "huadu":
                  return item.recordCode === "body_temperature_Hd";
                case "fuyou":
                  return item.recordCode === "body_temperature_jm";
                case "hj":
                  return item.recordCode === "body_temperature_hj";
                case "beihairenyi":
                  return item.recordCode === "infant_bh";
                // case "hengli":
                //   return item.recordCode === "body_temperature_hl";
                case "beihairenyi":
                  return item.recordCode === "body_temperature_bhry";
                case "wujing":
                  return item.recordCode === "body_temperature_wj";
                default:
                  break;
              }
            });
          } else {
            this.sheetBlockList = list.filter((item) => {
              return (
                (item.recordCode != "body_temperature_Hd") &
                (item.recordCode != "body_temperature_hj") &
                (item.recordCode != "body_temperature_hl") &
                (item.recordCode != "body_temperature_wj")
              );
            });
          }
          this.sheetInfo.selectBlock =
            this.sheetBlockList[this.sheetBlockList.length - 1] || {};
            if(this.sheetBlockList.length==0){
              // 如果该病人没有护记，切换病人时需要清空分页
              this.pageArea=''
              this.bus.$emit('clearSheetModel')
            }
          if (this.patientInfo.blockId) {
            try {
              let index = this.sheetBlockList.findIndex(
                (item) => item.id == this.patientInfo.blockId
              );
              this.sheetInfo.selectBlock = this.sheetBlockList[index];
            } catch (e) {
              console.log(e);
            }
          }
          this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
          if( this.HOSPITAL_ID === 'whfk'&& this.sheetInfo.selectBlock.patientId){
            this.getPrintRecordData();
          }
          // this.bus.$emit('refreshSheetPage', true)
        });
      }
    },
    createSheet() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      this.$refs.newFormModal.open();
    },
    // 设为模板(打开选择弹框)
    openSelectTmp() {
      if (!this.patientInfo.patientId) {
        return this.$message.info("请选择一名患者");
      }
      if (this.sheetTitleData.FieldSetting && this.sheetTitleData.FieldSetting.length) {
        this.$refs.tmpModal.open(this.maxPage)
      } else {
        return this.$message.info("无自定义表头，无法设置为模板");
      }
    },
    // 设为模板
    async setAsTemplate(selectPage) {
      const list = this.sheetTitleData.FieldSetting.filter(
        item => item.pageIndex === selectPage
      ).map((item, index) => {
        const options = this.sheetTitleData.Options.filter(
          (op) => op.fieldEn === item.fieldEn && op.pageIndex === selectPage
        ).map((op) => op.options).join(',')
        return {
          recordCode: this.sheetInfo.sheetType,
          deptCode: this.deptCode,
          fieldEn: item.fieldEn,
          fieldCn: item.fieldCn,
          options
        }
      })
      const res = await setSheetTemplate(list)
      this.$refs.tmpModal.close()
      this.$message.success('设置成功')
    },
    createTemperature() {
      this.$refs.newFormModal.open();
    },
    delSheet() {
      if (!this.sheetInfo.selectBlock.id)
        return this.$message.warning("还没有选择护理记录单");
      this.$confirm("此操作将永久删除该护理记录单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        blockDelete(this.sheetInfo.selectBlock.id).then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 刷新
          this.getBlockList();
        });
      });
    },
    blockLabel(item, length) {
      if(['foshanrenyi'].includes(this.HOSPITAL_ID)) return ''
      //   if(!this.babelFirst) return
      //   const parent = document.querySelector('.otherType').childNodes[1];
      //   console.log(parent,"parent")
      //   const isDiv = parent.childNodes[1].nodeName;
      //   console.log(isDiv,"isDiv")
      //   let dom,dom1,dom2
      //   if (isDiv !== 'div') {
      //     dom = document.createElement('div');
      //     dom.className = 'adddiv';
      //     dom1 = document.createElement('span');
      //     dom1.className = 'addspan1';
      //     dom2 = document.createElement('span');
      //     dom2.className = 'addspan2';
      //     dom.appendChild(dom1)
      //     dom.appendChild(dom2)
      //     parent.insertBefore(dom, parent.childNodes[1]);
      //   }
      //   else {
      //     dom = parent.childNodes[1];
      //   }
      //   dom1.setAttribute('data-content1', `${item.deptName} ${dayjs(item.createTime).format(
      //     "MM-DD")}建 `);
      //   dom2.setAttribute('data-content2', `共${length}张`);
      //   // return `${item.deptName} ${dayjs(item.createTime).format(
      //   //   "MM-DD"
      //   // )}建
      //   // `;
      //   this.babelFirst = false
      // }else{
      return `${item.deptName} ${dayjs(item.createTime).format(
        "MM-DD"
      )}建 共${length}张
      `;
      // }
    },
    changeSelectBlock(item) {
      if (item) {
        localStorage.wardCode = item.deptCode;
      }
      this.sheetInfo.sheetType = this.sheetInfo.selectBlock.recordCode;
      this.blockId = item.id;
      cleanData();
      this.bus.$emit("refreshSheetPage", true);//会导致数据渲染两次，和sheetpage里的监听冲突，所以屏蔽
    },
    /** pdf打印 */
    toPdfPrint() {
      if (sheetInfo.selectBlock.id) {

        if( this.HOSPITAL_ID === 'whfk'){
          // const params = {
          //   patientId:sheetInfo.selectBlock.patientId,
          //   visitId:sheetInfo.selectBlock.visitId,
          //   formId:sheetInfo.selectBlock.id,
          //   formType:'record',
          //   formCode:sheetInfo.selectBlock.recordCode,
          //   formName:sheetInfo.selectBlock.recordName,
          // }
          window.open(
            `/crNursing/toPdfPrint?blockId=${sheetInfo.selectBlock.id}&patientId=${sheetInfo.selectBlock.patientId}&visitId=${sheetInfo.selectBlock.visitId}&formId=${sheetInfo.selectBlock.id}&formType=${'record'}&formCode=${sheetInfo.selectBlock.recordCode}&formName=${sheetInfo.selectBlock.recordName}`
          )
          }else{
            window.open(
              `/crNursing/toPdfPrint?blockId=${sheetInfo.selectBlock.id}`
            );
        }
      } else {
        this.$message.warning("没有可以打印的护理记录单");
      }
    },
    openTztbModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      this.$refs.tztbModal.open();
    },
    openZxdtbModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      if (this.HOSPITAL_ID == "wujing"|| this.HOSPITAL_ID == "gdtj") {
        this.modalWidth = 850;
      }
      if (['guizhou', '925'].includes(this.HOSPITAL_ID)) {
        this.titleName = "输血同步";
      } else {
        this.titleName = "执行单同步";
      }

      this.$refs.zxdtbModal.open();
    },
    openRltbModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }

      if (['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)) {
        this.$refs.rltbNfzxyModal.open()
        return
      }
      this.$refs.rltbModal.open();
    },
    /* 切换主页 */
    async backMainForm() {
      const id = this.sheetInfo.selectBlock.id;
      const { data } = await switchAdditionalBlock(id);
      this.sheetInfo.selectBlock = data.data;
      this.changeSelectBlock(false);
    },
    /* 切换副页 */
    async addDeputyForm() {
      const id = this.sheetInfo.selectBlock.id;
      const { data } = await switchAdditionalBlock(id);
      this.sheetInfo.selectBlock = data.data;
      this.changeSelectBlock(false);
    },
    // 同步护理巡视
    syncVisitWithData() {
      this.$refs.patientInfoModal.open();
    },
    hisDocPreview(type) {
      switch (type) {
        case "deputy":
          return (
            ['guizhou', '925'].includes(this.HOSPITAL_ID) &&
            !this.isDeputy &&
            this.$route.path.includes("nursingPreview")
          );
        case "main":
          return (
            ['guizhou', '925'].includes(this.HOSPITAL_ID) &&
            this.isDeputy &&
            this.$route.path.includes("nursingPreview")
          );
        default:
          return false;
      }
    },
  },
  computed: {
    blockId: {
      get() {
        return this.sheetInfo.selectBlock.id;
      },
      set() {},
    },

    fullpage() {
      return this.$store.state.sheet.fullpage;
    },
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
    patientId() {
      return this.$store.state.sheet.patientInfo.patientId;
    },
    showCrl() {
      switch (this.sheetInfo.sheetType) {
        // case "trauma_orthopedics":
        // case "orthopedics":
        //   return false;
        default:
          return true;
      }
    },
    /** 只读模式 */
    readOnly() {
      if(this.readOnlyList.includes(this.HOSPITAL_ID)){
        let controlReadOnly = this.sheetInfo.masterInfo.readOnly //后端控制readOnly为true只能查阅，不能修改
        if (controlReadOnly) {
          return true
        }
      } else {
        return !this.userDeptList
        .map(item => item.code)
        .includes(this.sheetInfo.selectBlock.deptCode);
      }
    },
    /* 监听路由是否是单个体温单 */
    isSingleTem() {
      return this.$route.path.includes("singleTemperatureChart");
    },
    /* 聊城二院体温单屏蔽三个功能：“出入量统计”、"评估同步"、“体征同步” */
    isSingleTem_LCEY() {
      return (
        this.HOSPITAL_ID === "liaocheng" &&
        this.$route.path.includes("singleTemperatureChart")
      );
    },
    /* 贵州人医“出入量统计”移入出入量记录单 */
    isSingleTem_GZRY() {
      return ['guizhou'].includes(this.HOSPITAL_ID);
    },
    /* 是否是副页 */
    isDeputy() {
      return (
        this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.additionalBlock
      );
    },
    /* 监听体温单曲线 */
    temperatureChart() {
      switch (this.HOSPITAL_ID) {
        case "huadu":
          return temperatureHD;
        default:
          break;
      }
    },
    // 显示入量同步
    showRltbN() {
      return ['nanfangzhongxiyi'].includes(this.HOSPITAL_ID)
    },
    // 选择表单下拉框的输入框所显示的文字
    selectText() {
      if (this.sheetInfo.selectBlock && this.sheetInfo.selectBlock.deptName) {
        const item = this.sheetInfo.selectBlock
        return `<span>${item.deptName} ${dayjs(item.createTime).format(
          "MM-DD")}建 </span><span style="color:red">共${this.sheetBlockList.length}张</span>`
      }
      return ''
    }
  },
  created() {
    this.bus.$on("initSheetPageSize", () => {
      let old_list_length = this.selectList.length;
      let old_list_index = this.selectList.findIndex(
        (item) => item.value == this.pageArea
      );
      this.initSelectList();
      let new_list_length = this.selectList.length;
      // 判断是否存在recodeId
      // 获取被标记的页数
      try {
        let index;
        if (this.patientInfo.recordId) {
          for (let i = 0; i < this.sheetModel.length; i++) {
            for (let j = 0; j < this.sheetModel[i].bodyModel.length; j++) {
              if (
                this.patientInfo.recordId ==
                this.sheetModel[i].bodyModel[j].find((item) => item.key == "id")
                  .value
              ) {
                index = i + this.sheetInfo.sheetStartPage;
              }
            }
          }
          for (let i = 0; i < this.selectList.length; i++) {
            let page = this.selectList[i].value.split("-");
            let startPage = Number(page[0]);
            let endPage = Number(page[1]);
            if (index >= startPage && index <= endPage) {
              this.pageArea = this.selectList[i].value || "";
              let todo = () => {
                if(!this.patientInfo.recordId) return
                $(this.$parent.$refs.scrollCon).animate({
                  scrollTop:
                    $(`[recordId='${this.patientInfo.recordId}']`)
                      .eq(0)
                      .offset().top +
                    this.$parent.$refs.scrollCon.scrollTop -
                    250,
                });
                $(`[recordId='${this.patientInfo.recordId}']`)
                  .eq(0)
                  .addClass("red-border");
              };
              this.$nextTick(() => {
                setTimeout(() => {
                  todo();
                }, 0);
                setTimeout(() => {
                  todo();
                }, 100);
                setTimeout(() => {
                  todo();
                  this.patientInfo.blockId = "";
                  this.patientInfo.recordId = "";
                }, 300);
              });
            }
          }
        } else {
          // 页码定位
          if (new_list_length != old_list_length) {
            this.pageArea =
              this.selectList[this.selectList.length - 1].value || "";
          } else {
            if (old_list_index != undefined) {
              this.pageArea = this.selectList[old_list_index].value || "";
            } else {
              this.pageArea =
                this.selectList[this.selectList.length - 1].value || "";
            }
          }
        }
      } catch (error) {}
    });
    this.bus.$on("toSheetMoreSign", () => {
      this.toMoreSign();
    });
    this.bus.$on("toSheetMoreAudit", () => {
      this.toMoreAduit();
    });
    this.bus.$on("getBlockList", () => {
      this.getBlockList();
    });

    document.onkeydown = (e) => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = true;
      }
    };
    document.onkeyup = (e) => {
      if (e.keyCode == 91 || e.keyCode == 17) {
        this.sheetInfo.downControl = false;
      }
    };
  },
  mounted() {
    if( this.HOSPITAL_ID === 'whfk' && this.sheetInfo.selectBlock.patientId){
      this.getPrintRecordData();
    }
    document.querySelector("#sheet_body_con").addEventListener("click", () => {
      if (!this.sheetInfo.downControl) {
        this.sheetInfo.selectRow.splice(0, this.sheetInfo.selectRow.length);
      }
    });
    this.bus.$emit("sheetToolLoaded");
  },
  watch: {
    "sheetInfo.selectBlock":{
      handler(val) {
        console.log(val,"sheetInfo.selectBlock")
      },

    },
    //更换选择患者，更新vuex的患者信息，重新在eventbug队列调用事件
    patientInfo(val) {
      if (this.$route.path.includes("singleTemperatureChart")) {
        this.$store.commit("upPatientInfo", val);
        this.bus.$emit("refreshImg");
        this.bus.$emit("refreshVitalSignList");
      }
    },
    pageArea() {
      let page = this.pageArea.split("-");
      let startPage = page[0];
      let endPage = page[1];
      let maxPage = {
        'wujing':30,
        'default':20
      }
      if (startPage && endPage) {
        if (
          Number(endPage) - Number(startPage) >= 0 &&
          Number(endPage) - Number(startPage) <= (maxPage[this.HOSPITAL_ID] || maxPage.default)
        ) {
          this.sheetInfo.startPage = startPage;
          this.sheetInfo.endPage = endPage;
        }
      }
    },
    "sheetInfo.startPage"() {
      $(this.$parent.$refs.scrollCon).animate({
        scrollTop: 0,
      });
    },
    patientId: {
      // deep: true,
      handler() {
        if (this.patientInfo.patientId) {
          // console.log(111);
          this.$parent.breforeQuit(() => {
            this.getBlockList();
            this.bus.$emit("setSheetTableLoading", true);
            // 初始化页面区间列表
            this.selectList = [];
          });
        }
      },
    },

    $route(to, from) {
      if (to.name != from.name) {
        this.getBlockList();
      }
    },
    pageNum(value) {
      let temPage = parseInt(Number(value) / 10);
      let count = parseInt(Number(value) % 10);
      if (temPage && count) {
        this.firstPage = temPage * 10 + 1;
      } else if (temPage == 0 && Number(value) == 0) {
        this.firstPage = 1;
      } else if (temPage && !count) {
        this.firstPage = (temPage - 1) * 10 + 1;
      }
    },
  },
  components: {
    setPageModal,
    newFormModal,
    setTitleModal,
    tztbModal,
    zxdtbModal,
    rltbModal,
    moveContext,
    patientInfoModal,
    patientInfo,
    temperatureHD,
    RltbNfzxyModal,
    demonstarationLevca,
    selectPageModal,
  },
};
</script>

<style
  lang="stylus"
  rel="stylesheet/stylus"
  type="text/stylus"
  src="./tool.styl"
  scoped
></style>

<style lang="stylus" scoped>
.pegeSelect {
  >>> .el-input__inner {
    width: 85px;
    border: 0 !important;
    font-size: 12px;
    color: #333333;
  }
}

.label {
  font-size: 12px;
  color: #333;
}
</style>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.select-box {
  // /deep/ .adddiv {
  //   position: absolute;
  //   top: 7px;
  //   left:10px;
  //   .font{
  //     font-weight:700;
  //   }
  //   .addspan1{
  //     font-size: 14px;
  //     &::before {
  //       content: attr(data-content1);
  //     }
  //   }
  //   .addspan2{
  //     font-size: 15px;
  //     &::before {
  //       content: attr(data-content2);
  //       color:red;
  //     }
  //   }
  // }
  .float-text {
    position: absolute;
    z-index: 10;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    cursor: pointer;
    padding-left: 2px;
    font-size: 14px;
  }
}
.sheetSelect-con-sheet {
  background: #FFFFFF;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  width: 562px !important;
  left: auto !important;
  right: 120px;

  .el-select-dropdown__list, .el-select-dropdown__item {
    padding: 0;
    height: auto;
  }

  .el-select-dropdown__wrap {
    max-height: 500px;
  }

 .head-con {
   height: 37px;
   background: #F7FAFA;
   border-bottom: 1px solid #EAEEF1;
   font-size: 13px;
   color: #333333;
   font-weight: bold;
 }

  .col-1, .col-2, .col-3, .col-4 {
    display: flex;
    align-items: center;
  }

  .col-1 {
    width: 192px;
    padding: 0 24px;
    border-right: 1px solid #EAEEF1;
  }

  .col-2 {
    width: 126px;
    padding: 0 16px;
    border-right: 1px solid #EAEEF1;
  }

  .col-3 {
    width: 133px;
    padding: 0 14px;
    border-right: 1px solid #EAEEF1;
  }

  .col-4 {
    width: 80px;
    padding: 0 14px;
  }

  .list-con {
    font-size: 13px;
    color: #333333;
    height: 37px;
    border-bottom: 1px solid #EAEEF1;
  }

  .el-select-dropdown__item.selected {
    background: #fff;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 9px;
      height: 20px;
      width: 4px;
      background: #4bb08d;
    }
  }

  .el-select-dropdown__item.hover {
    background: #fff;
  }

  .el-select-dropdown__item:hover {
    background: #E5F1F0;
  }
}
.whfk-select-con {
  width: 80px;
  margin-right:10px;
}
>>>.whfk-select-con .el-input__inner {
  width: 85px !important;
}
.sheetSelect-con-sheet-print .el-select-dropdown__item.selected:after {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  height: 20px;
  width: 4px;
  background: #fff;
}
.red-border {
  border: 2px solid red !important;
}

.tempSweetModal {
  /deep/ .sweet-modal {
    width: 90% !important;
    overflow: hidden !important;
  }

  /deep/ .sweet-content {
    background: #dfdfdf;
    max-height: 105vh !important;
  }
}

#is-deputy-btn {
  background: none !important;
  pointer-events: auto !important;
}

.babyChat {
  position: absolute;
  right: 0;
  top: 15px;
  width: 85%;
  height: 100%;
  z-index: 999;
  box-shadow: -2px 0 7px -1px black; // 左边阴影;
  background-color: white;
}
</style>
