<template>
  <div class="archive">
    <div class="toolbar">
      <div class="filterItem date">
        <span>出院时间:</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="query.dischargeDateBegin"
          :editable="HOSPITAL_ID === 'whhk' ? false : true"
          clearable
        />
        <span>-</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="结束日期"
          v-model="query.dischargeDateEnd"
          :editable="HOSPITAL_ID === 'whhk' ? false : true"
          clearable
        />
      </div>
      <div class="filterItem">
        <span class="type-label">状态:</span>
        <el-select
          v-model="isSelectedStatus"
          size="small"
          placeholder="全部"
          @change="selectedStatus"
        >
          <el-option value>全部</el-option>
          <el-option
            :key="item.id"
            v-for="item in statusList"
            :value="item.name"
            >{{ item.name }}</el-option
          >
        </el-select>
        <!--北海的查询条件-->

        <template v-if="['beihairenyi','whhk','foshanrenyi'].includes(this.HOSPITAL_ID)">
          <span class="type-label">姓名:</span>
          <el-input
            v-model="query.patientName"
            placeholder="请输入患者姓名"
            size="small"
            style="width:190px"
          />
          <span class="type-label">住院号:</span>
          <el-input
            v-model="query.inpNo"
            placeholder="请输入患者住院号"
            size="small"
            style="width:190px"
          />
        </template>
        <button @click.stop="search">查询</button>
        <button @click.stop="allArchive" v-if="!isSdyyHOS">批量归档</button>
        <button @click.stop="allturnPDF">批量转pdf</button>
      </div>
      <div
        class="filterItem"
        v-if="showAutoPrintInfo"
        style="text-align: right;"
      >
        <el-switch
          v-model="showAutoPrint"
          active-color="#4BB08D"
          inactive-color="#eee"
          on-text
          off-text
        ></el-switch>
        <span>自动归档</span>
      </div>
    </div>
    <div class="content-center">
      <el-table
        :data="patientArchiveList"
        style="width: 100%"
        border
        :height="wih - 170"
        v-loading="pageLoading"
        header-align="center"
        align="center"
        stripe
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="isSdyyHOS" type="selection" width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          header-align="center"
          type="index"
          min-width="60px"
          align="center"
        ></el-table-column>

        <el-table-column
          header-align="center"
          align="left"
          label="护理单元"
          prop="wardName"
          min-width="185px"
        ></el-table-column>

        <el-table-column
          prop="bedLabel"
          header-align="center"
          align="center"
          label="床号"
          min-width="80px"
        ></el-table-column>

        <el-table-column
          prop="patientName"
          header-align="center"
          align="center"
          label="姓名"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="inpNo"
          header-align="center"
          align="center"
          label="住院号"
          min-width="120px"
          v-if="HOSPITAL_ID != 'foshanrenyi'"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="病人ID"
          prop="patientId"
          min-width="120px"
        ></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          label="管床医生"
          prop="doctor"
          min-width="100px"
        ></el-table-column>
        <el-table-column
          prop="dischargeDate"
          header-align="center"
          align="left"
          label="出院日期"
          min-width="90px"
        ></el-table-column>

        <el-table-column
          prop="uploadTime"
          header-align="center"
          align="center"
          label="归档时间"
          min-width="140px"
        ></el-table-column>

        <el-table-column
          v-if="!isSdyyHOS"
          prop="applyName"
          header-align="center"
          align="center"
          label="申请人"
          min-width="80px"
        ></el-table-column>

        <el-table-column
          v-if="!isSdyyHOS"
          prop="applyTime"
          header-align="center"
          align="center"
          label="申请召回时间"
          min-width="140px"
        ></el-table-column>

        <el-table-column
          prop="printStatus"
          header-align="center"
          align="center"
          label="状态"
          min-width="150px"
        >
          <template slot-scope="scope">
            <div
              style="text-align: left;"
              :style="
                (scope.row.printStatus == 1 ||
                  scope.row.resultStatus == -1) && { color: 'red' }
              "
            >
              <span>{{ scope.row.statusDesc }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          header-align="center"
          align="center"
          label="操作"
          min-width="150px"
        >
          <template slot-scope="scope">
            <div class="justify">
              <!-- 打印生成pdf文件 -->
              <el-button
                type="text"
                @click="generateArchive(scope.row)"
                v-if="
                  scope.row.printStatus == 0 &&
                    scope.row.resultStatus != 1 &&
                    !isArchive
                "
                >转pdf</el-button
              >
              <el-button
                type="text"
                @click="generateArchive(scope.row)"
                v-if="
                  scope.row.printStatus != 0 &&
                    scope.row.printStatus != 1 &&
                    scope.row.uploadStatus != 1 &&
                    scope.row.uploadStatus != 2 &&
                    !isArchive
                "
                >重转pdf</el-button
              >
              <!-- 一键归档没有预览功能 -->
              <el-button
                type="text"
                class="viewFile"
                @click="previewArchive(scope.row)"
                v-if="scope.row.resultStatus == 1 && !isArchive"
                >预览</el-button
              >
              <el-button type="text" @click="openDetail(scope.row)">
                查看
              </el-button>
              <!-- 上传 -->
              <el-button
                type="text"
                @click="cancelArchive(scope.row)"
                v-if="scope.row.canCancelArchive"
                >取消归档</el-button
              >
              <el-button
                type="text"
                @click="uploadFileArchive(scope.row)"
                v-if="
                  (isArchive && scope.row.uploadStatus != 2) ||
                    (scope.row.resultStatus == 1 &&
                      scope.row.uploadStatus != 1 &&
                      scope.row.uploadStatus != 2)
                "
                >归档</el-button
              >
              <el-button
                type="text"
                v-if="
                  scope.row.recallApplyStatus == 1 &&
                    scope.row.canApplyAndCancel
                "
                @click="cancelRecall(scope.row)"
              >
                撤销申请
              </el-button>
              <el-button
                type="text"
                v-if="scope.row.canAudit"
                @click="audit(scope.row)"
              >
                审核
              </el-button>
              <el-button
                type="text"
                v-if="
                  !isSdyyHOS &&
                    scope.row.uploadStatus == 2 &&
                    (scope.row.recallApplyStatus == '' ||
                      scope.row.recallApplyStatus == '0') &&
                    scope.row.canApplyAndCancel
                "
                @click="applyForRecall(scope.row, scope.$index)"
              >
                申请召回
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :pageIndex="query.pageIndex"
      :size="query.pageSize"
      :total="total"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
    ></pagination>
    <sweet-modal
      ref="preview-modal"
      class="archive-preview-modal"
      :fullBtn="true"
      :modalWidth="800"
      :title="preview.title"
    >
      <div
        v-if="printDetailList.length > 0"
        class="archive-detail-modal"
        v-loading="pageLoading2"
      >
        <div
          class="arrow"
          :class="{ isFullMode: modalObj.infull }"
          v-if="printDetailList && printDetailList.length > 1"
        >
          <span
            class="el-icon-arrow-left"
            @click="preveFile"
            :style="!currentFileIndex && { opacity: 0.5 }"
          ></span>
          <span
            class="el-icon-arrow-right"
            @click="nextFile"
            :style="
              currentFileIndex == printDetailList.length - 1 && { opacity: 0.5 }
            "
          ></span>
        </div>
        <div v-if="preview.type == 'pdf'" :style="{ height: pdfHeight + 'px' }">
          <iframe
            width="100%"
            height="100%"
            :src="preview.url + '#toolbar=0'"
            ref="myIframe"
          />
        </div>
      </div>
      <div v-else>该患者暂无文书信息</div>
      <div slot="button" class="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button
          class="modal-btn"
          @click="print"
          v-if="printDetailList.length > 0"
          >打印</el-button
        >
      </div>
    </sweet-modal>
    <cancel-recall-modal
      ref="cancelRecallRef"
      :loading.sync="pageLoading"
      :item="curItem"
      @refresh="handleRefresh"
    />
    <apply-for-recall-modal
      ref="applyForRecallRef"
      :loading.sync="pageLoading"
      :item="curItem"
      @refresh="handleRefresh"
    />
    <audit-modal
      ref="audioRef"
      :loading.sync="pageLoading"
      :item="curItem"
      @refresh="handleRefresh"
    />
    <BatchArchiveModal ref="BatchArchiveRef" @batchPost="handleBatchPost" />
    <infomodal ref="infomodalRef" :getArchiveList="getArchiveList" />
  </div>
</template>

<script>
var moment = require("moment"); //使用时间插件
import {
  getArchiveList,
  uploadBatch,
  genDocBatch,
  generateArchive,
  previewArchive,
  uploadFileArchive,
  getConfig,
  canCancelArchive,
  getAchivePrintConfig,
  uploadBatchSelect,
  genDocBatchSelect
} from "./api/index";
import { TSNeverKeyword } from "babel-types";
import common from "@/common/mixin/common.mixin.js";
import nullText from "@/components/null/null-text.vue";
import mixin from "./mixins";
import pagination from "@/components/pagination/pagination.vue";
import CancelRecallModal from "./modal/cancel-recall-modal.vue";
import ApplyForRecallModal from "./modal/apply-for-recall-modal.vue";
import AuditModal from "./modal/audit-modal.vue";
import BatchArchiveModal from "./modal/batch-archive-modal.vue";
import infomodal from "./modal/info-1-modal.vue";

export default {
  mixins: [common, mixin],
  components: {
    nullText,
    pagination,
    CancelRecallModal,
    ApplyForRecallModal,
    AuditModal,
    BatchArchiveModal,
    infomodal
  },
  data() {
    return {
      pageLoading: false,
      pageLoading2: false,
      preview: {
        type: "",
        name: "",
        url: ""
      },
      table2: false,
      pdfHeight: window.innerHeight * 0.8,
      query: {
        pageSize: 20,
        pageIndex: 1,
        dischargeDateBegin: "", //出院开始时间
        dischargeDateEnd: "", //出院结束时间
        wardCode: "", //科室代码
        showStatus: "", //状态查找：-2=归档失败,-1=生成pdf失败,0=待生成pdf,1=待归档,2=已归档
        patientName: "", //患者姓名
        inpNo: "" //住院号
      },
      total: 0,
      patientArchiveList: [], //科室患者归档列表
      currentFileIndex: 0, //当前预览pdf索引
      printDetailList: "", //归档详情
      modalObj: {}, //modal对象
      isFlag: false,
      timeId: "",
      statusList: [
        { id: -2, name: "归档失败" },
        { id: -1, name: "生成pdf失败" },
        { id: 0, name: "待生成pdf" },
        { id: 1, name: "待归档" },
        { id: 2, name: "已归档" }
      ],
      isSelectedStatus: "", //选择状态
      isArchive: false, //是否直接一键归档
      showAutoPrintInfo: false, // 是否开启自动归档
      showAutoPrint: true, // 是否开启自动归档按钮
      curItem: null, // 选中行的数据,
      curIndex: -1,
      multipleSelection: [],
      isSdyyHOS: process.env.HOSPITAL_ID == "nfyksdyy"
    };
  },
  methods: {
    handleBatchPost(from) {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    close() {
      this.preview.title = "";
      this.$refs["preview-modal"].close();
    },
    print() {
      console.dir(this.$refs.myIframe);
      if (this.$refs.myIframe && this.$refs.myIframe.contentWindow) {
        this.$refs.myIframe.contentWindow.print();
      }
    },
    // 文件归档上传
    uploadFileArchive(item) {
      if (this.isSdyyHOS) {
        this.$refs.infomodalRef.open(item);
      } else {
        this.$confirm("是否归档?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let patientId =
            this.HOSPITAL_ID == "huadu" ? item.inpNo : item.patientId;
          let visitId = item.visitId;
          uploadFileArchive(patientId, visitId).then(rep => {
            this.$message({
              type: "success",
              message: "文件上传成功"
            });
            this.getArchiveList();
          });
        });
      }
    },
    tablesHeight() {
      try {
        let tableHeight = this.wih - 210;
        this.table2 =
          this.$refs.table2.clientHeight > tableHeight ? true : false;
      } catch (e) {}
    },
    handleSizeChange(newSize) {
      this.query.pageSize = newSize;
    },
    handleCurrentChange(newPage) {
      this.query.pageIndex = newPage;
      this.getArchiveList();
    },
    search() {
      this.query.pageIndex = 1;
      this.query.pageSize = 20;
      this.getArchiveList();
    },
    allArchive() {
      let params = {
        pageSize: "",
        pageIndex: "",
        dischargeDateBegin: moment(this.query.dischargeDateBegin).format(
          "YYYY-MM-DD"
        ),
        dischargeDateEnd: moment(this.query.dischargeDateEnd).format(
          "YYYY-MM-DD"
        ),
        wardCode: this.deptCode,
        showStatus: "",
        patientName: "",
        inpNo: ""
      };
      if (this.HOSPITAL_ID == "nfyksdyy") {
        if (!this.multipleSelection.length)
          return this.$message({
            type: "warning",
            message: "目前未选择患者，请选择患者！"
          });
        let list = [];
        this.multipleSelection.map(item => {
          list.push({ patientId: item.patientId, visitId: item.visitId });
        });
        params = { list, ...params };
        uploadBatchSelect(params).then(res => {
          this.$message({
            type: "success",
            message: "正在批量归档，请稍等"
          });
          this.getArchiveList();
        });
      } else {
        // this.$refs.BatchArchiveRef.dialogVisible = true;
        // this.$refs.BatchArchiveRef.title = '确认批量归档时间段';
        uploadBatch(params).then(res => {
          this.$message({
            type: "success",
            message: "正在批量归档，请稍等"
          });
          this.getArchiveList();
        });
      }
    },
    allturnPDF() {
      let params = {
        pageSize: "",
        pageIndex: "",
        dischargeDateBegin: moment(this.query.dischargeDateBegin).format(
          "YYYY-MM-DD"
        ),
        dischargeDateEnd: moment(this.query.dischargeDateEnd).format(
          "YYYY-MM-DD"
        ),
        wardCode: this.deptCode,
        showStatus: "",
        patientName: "",
        inpNo: ""
      };
      if (this.HOSPITAL_ID == "nfyksdyy") {
        if (!this.multipleSelection.length)
          return this.$message({
            type: "warning",
            message: "目前未选择患者，请选择患者！"
          });
        let list = [];
        this.multipleSelection.map(item => {
          list.push({ patientId: item.patientId, visitId: item.visitId });
        });
        params = { list, ...params };
        genDocBatchSelect(params).then(res => {
          this.$message({
            type: "success",
            message: "正在批量归档，请稍等"
          });
          this.getArchiveList();
        });
      } else {
        // this.$refs.BatchArchiveRef.dialogVisible = true;
        // this.$refs.BatchArchiveRef.title = '确认批量pdf时间段';
        genDocBatch(params).then(res => {
          this.$message({
            type: "success",
            message: "正在批量转pdf，请稍等"
          });
          this.getArchiveList();
        });
      }
    },
    //科室患者归档列表
    getArchiveList() {
      // printStatus 打印状态:0=未执行；1=执行中；2=打印结束
      // resultStatus 打印结果：-1=失败；0=未有结果；1=成功
      // uploadStatus 上传状态：-1=上传失败；0=未上传；1=上传中；2=上传成功
      // 转pdf按钮(打印生成pdf文件)： printStatus!=1 && resultStatus!=1
      // 预览按钮: resultStatus ==1
      // 归档按钮（上传）: item.resultStatus==1 && item.uploadStatus!=1 && item.uploadStatus!=2
      this.query.wardCode = this.deptCode;
      this.query.dischargeDateBegin = moment(
        this.query.dischargeDateBegin
      ).format("YYYY-MM-DD");
      this.query.dischargeDateEnd = moment(this.query.dischargeDateEnd).format(
        "YYYY-MM-DD"
      );
      this.pageLoading = true;
      if (this.isFlag) {
        return;
      }
      this.isFlag = true;
      clearTimeout(this.timeId);
      getArchiveList(this.query)
        .then(res => {
          this.isFlag = false;
          this.patientArchiveList = res.data.data.list;
          this.total = res.data.data.totalCount || 0;
          this.pageLoading = false;

          if (this.query.pageSize >= 100) {
            return;
          }
          let len = this.patientArchiveList.length,
            isFlag2 = false;
          for (let i = 0; i < len; i++) {
            if (isFlag2) {
              return;
            }
            // 如果还在打印中
            if (
              this.patientArchiveList[i].printStatus == 1 &&
              this.patientArchiveList[i].sysDate &&
              this.patientArchiveList[i].printTime
            ) {
              let min =
                (moment(this.patientArchiveList[i].sysDate) -
                  moment(this.patientArchiveList[i].printTime)) /
                1000 /
                60;
              if (min <= 20) {
                isFlag2 = true;
                clearTimeout(this.timeId);
                this.timeId = setTimeout(() => {
                  this.getArchiveList();
                  return;
                }, 10000);
              }
            }
          }
        })
        .catch(err => {
          this.isFlag = false;
          this.pageLoading = false;
        });
    },
    // 生成归档文件
    generateArchive(item) {
      generateArchive(item.patientId, item.visitId).then(rep => {
        this.$message({
          type: "success",
          message: "正在转pdf，请稍等"
        });
        this.getArchiveList();
      });
    },
    // 预览归档文件
    previewArchive(item) {
      this.currentFileIndex = 0;
      this.printDetailList = "";
      this.pageLoading2 = true;
      previewArchive(item.patientId, item.visitId)
        .then(res => {
          this.printDetailList = res.data.data.printDetailList;
          this.previewFile();
          this.pageLoading2 = false;
        })
        .catch(err => {
          this.pageLoading2 = false;
        });
    },

    previewFile() {
      if (this.printDetailList.length > 0) {
        this.preview = {
          title:
            this.printDetailList[this.currentFileIndex].formName +
            "(" +
            (this.currentFileIndex + 1) +
            "/" +
            this.printDetailList.length +
            ")",
          url: this.printDetailList[this.currentFileIndex].filePath,
          type: "pdf"
        };
        this.pdfHeight = window.innerHeight * 0.8;
        if (this.$refs["preview-modal"]) {
          this.modalObj = this.$refs["preview-modal"];
        }
      }
      this.$refs["preview-modal"].open();
    },
    // 上一个文件
    preveFile() {
      let infull = this.modalObj.infull;
      if (this.currentFileIndex > 0) {
        this.currentFileIndex--;
        this.previewFile();
      }
      this.modalObj.infull = infull;
    },
    // 下一个文件
    nextFile() {
      let infull = this.modalObj.infull;
      if (this.currentFileIndex < this.printDetailList.length - 1) {
        this.currentFileIndex++;
        this.previewFile();
      }
      this.modalObj.infull = infull;
    },
    // 获取当前时间前后N天日期
    getDateStr(addDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
      return y + "-" + m + "-" + d;
    },
    selectedStatus(val) {
      this.query.showStatus = "";
      for (let i = 0; i < this.statusList.length; i++) {
        if (this.statusList[i].name == val) {
          this.query.showStatus = this.statusList[i].id;
          return;
        }
      }
    },
    // 获取用户配置
    getUserConfig() {
      getConfig().then(res => {
        // printNotNeedToPdf true，不需要转pdf，直接一键归档
        this.isArchive = res.data.data.print.printNotNeedToPdf;
      });
    },
    // 归档：取消归档
    cancelArchive(item) {
      canCancelArchive(item.patientId, item.visitId).then(res => {
        this.$message.success(res.data.desc);
        this.getArchiveList();
      });
    },
    //  是否开启自动归档
    getPrintConfig() {
      getAchivePrintConfig().then(res => {
        let data = res.data.data || [],
          times = 0;
        data.map(item => {
          if (item.code == "archive.print.auto" && item.name == "true") {
            times++;
          } else if (
            item.code == "archive.print.auto.time.after.discharge" &&
            item.name == "7"
          ) {
            times++;
          }
        });
        this.showAutoPrintInfo = times == 2 ? true : false;
      });
    },
    // 跳转至电子病历
    openDetail(row) {
      const { patientId, visitId } = row;
      if (
        [
          "foshanrenyi",
          "lyxrm",
          "zjhj",
          "zhzxy",
          "whhk",
          "nfyksdyy",
          "stmz"
        ].includes(this.HOSPITAL_ID)
      ) {
        const { href } = this.$router.resolve({
          path: "/home",
          query: { patientId, visitId }
        });
        window.open(href, "_blank");
      } else {
        this.$router.push({
          path: "/home",
          query: {
            patientId,
            visitId
          }
        });
      }
    },
    // 撤销申请
    cancelRecall(row) {
      this.curItem = row;
      // this.curIndex = index
      this.$refs.cancelRecallRef.open();
    },
    // 审核
    audit(row) {
      this.curItem = row;
      // this.curIndex = index
      this.$refs.audioRef.open();
    },
    // 申请召回
    applyForRecall(row, index) {
      this.curItem = row;
      // this.curIndex = index
      this.$refs.applyForRecallRef.open();
    },
    handleRefresh(row) {
      this.getArchiveList();
      // this.$set(this.patientArchiveList, this.curIndex, row)
    }
  },
  mounted() {
    this.tablesHeight();
    if (!this.query.dischargeDateBegin) {
      this.query.dischargeDateBegin = this.getDateStr(-2);
    }
    this.query.dischargeDateEnd = this.query.dischargeDateEnd
      ? this.query.dischargeDateEnd
      : moment().format("YYYY-MM-DD");

    if (this.$refs["preview-modal"]) {
      this.modalObj = this.$refs["preview-modal"];
    }

    if (this.deptCode) {
      this.getArchiveList();
    }

    // 获取用户配置
    this.getUserConfig();
    // 是否开启自动归档
    this.getPrintConfig();
  },
  updated() {
    this.tablesHeight();
  },
  created() {},
  watch: {
    deptCode() {
      this.getArchiveList();
    },
    "query.dischargeDateBegin": {
      handler(newVal, oldVal) {
        if (["whhk"].includes(this.HOSPITAL_ID)) {
          if (
            moment(newVal).diff(moment(this.query.dischargeDateEnd), "days") > 0
          ) {
            this.query.dischargeDateBegin = oldVal;
            return this.$message({
              message: "开始时间不可大于结束时间",
              type: "warning"
            });
          }
        }
        this.search();
      }
    },
    "query.dischargeDateEnd": {
      handler(newVal, oldVal) {
        if (["whhk"].includes(this.HOSPITAL_ID)) {
          if (
            moment(newVal).diff(moment(this.query.dischargeDateBegin), "days") <
            0
          ) {
            this.query.dischargeDateEnd = oldVal;
            return this.$message({
              message: "开始时间不可大于结束时间",
              type: "warning"
            });
          }
        }
        this.search();
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.toolbar {
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0 18px;
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  border: 1px solid #CBD5DD;
  overflow: hidden;
  font-size: 14px;
  flex-wrap: wrap;

  .filterItem {
    margin-right: 20px;

    button {
      display: inline-block;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 30px;
      font-size: 12px;
      color: #333;
      background: #fff;
      border: 1px solid #cbd5dd;
      border-radius: 2px;
      box-sizing: border-box;
      outline: none;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }

    p {
      text-align: right;
    }
  }

  .filterItem:last-child {
    flex: 1;
    margin-right: 0;
  }
}

.arrow {
  .el-icon-arrow-left, .el-icon-arrow-right {
    font-size: 40px;
    position: fixed;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.4);
    padding: 10px;
    color: #c4bebe;
    border-radius: 4px;
    cursor: pointer;
    z-index: 10002;
  }

  .el-icon-arrow-left {
    left: -150px;
  }

  .el-icon-arrow-right {
    right: -150px;
  }
}

.content-center {
  width: 99%;
  margin: auto auto;
  margin-top: 10px;
  border: 1px solid #cbd5dd;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  .justify {
    span {
      font-size: 13px;
    }
  }

  >>>.el-button {
    // padding: 0px;
  }

  >>>.el-table {
    border: 0 !important;

    .el-button {
      font-size: 13px;
      padding: 0px;
    }

    td, th, tr {
      height: 40px;

      div {
        font-size: 13px;
        color: #333;
        padding-left: 0px;
        padding-right: 0px;
      }
    }
  }

  >>>.el-table::after, .el-table::before {
    background: #cbd5dd;
    display: none;
  }

  >>>.el-table th {
    text-align: center;
  }

  >>>.el-table__row td:first-child .cell, >>>.el-table__row td:last-child .cell {
    padding: 0 5px;
    text-align: center;
  }

  >>>.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background: rgb(255, 251, 186);
  }

  >>>.el-table__body tr.current-row td {
    background: rgb(255, 251, 186);
  }
}
</style>
<style lang="stylus">
.archive-preview-modal {
  .sweet-modal {
    overflow: visible;
  }

  .isFullMode {
    .el-icon-arrow-left {
      left: 150px;
    }

    .el-icon-arrow-right {
      right: 150px;
    }
  }
}
</style>
