<template>
  <div class="print-modal">
    <sweet-modal ref="modal" :modalWidth="1000" title="归档打印">
      <div v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          height="500"
        >
          <!-- <el-table-column align="center" type="selection" min-width="55px"></el-table-column> -->
          <el-table-column align="center" type="index" label="序号" width="60px"></el-table-column>
          <el-table-column prop="formName" label="护理文书" min-width="200px"></el-table-column>
          <el-table-column align="center" prop="dataUpdateTime" label="最后修改时间" min-width="120px"></el-table-column>
          <el-table-column align="center" prop="printUpdateTime" label="打印时间" min-width="120px"></el-table-column>
          <el-table-column align="center" prop="2" label="页码" min-width="70px">
            <template slot-scope="scope">
              <span v-if="scope.row.pageIndex">{{scope.row.pageIndex}} - {{scope.row.endPageIndex}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" width="120">
            <template slot-scope="scope">{{ scope.row['4'] }}</template>
          </el-table-column>
          <el-table-column align="center" prop="3" label="打印状态" min-width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.hadPrinted" style="color:#4bb08d">已打印</span>
              <span v-else>未打印</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini">打印</el-button> -->
              <span class="print-text" @click="toPrint(scope.row)">打印</span>
              <span class="print-text" @click="openPreviewModal(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <iframe :src="formPrintUrl" frameborder="0" class="printIframe" @load="load" ref="iframeRef"></iframe>
      <div slot="button">
        <el-button class="modal-btn" @click="close">取消</el-button>
        <el-button class="modal-btn" type="primary" @click="post">确定</el-button>
      </div>
    </sweet-modal>
    <previewModal ref="previewModal"></previewModal>
  </div>
</template>
<style lang='scss' scoped>
/deep/ .sweet-content {
  padding: 0 !important;
  .el-table .cell {
    padding-left: 6px;
    padding-right: 6px;
  }
  .print-text {
    color: #4bb08d;
    /* font-size: 12px; */
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
}
.printIframe {
  width: 0;
  height: 0;
  display: none;
  overflow: hidden;
}
</style>
<script>
import { printArchive, updatePrintStatus } from "../modal/api/index";
import { formUrl } from "@/common/pathConfig/index.js";
import qs from "qs";
import common from "@/common/mixin/common.mixin";
import previewModal from "./preview-modal";
import getFormUrl from "./getFormUrl";
export default {
  mixins: [common],
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      loading: false,
      formPrintUrl: ""
    };
  },
  methods: {
    open() {
      this.loading = true;
      printArchive(this.$route.query.patientId, this.$route.query.visitId).then(
        res => {
          this.loading = false;
          this.tableData = res.data.data;
        }
      );
      this.$refs.modal.open();
    },
    close() {
      this.$refs.modal.close();
    },
    post() {
      this.close();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toPrint(info) {
      if (info.typeName == "护理记录单") {
        this.printSheet(info);
      } else if (info.typeName == "评估类型") {
        this.printEval(info);
      } else if (info.formName == "护嘱单") {
        this.printEval(info);
      }
    },
    printSheet(info) {
      let {
        "App-Token-Nursing": appToken,
        "Auth-Token-Nursing": token
      } = qs.parse(this.token);
      let url = `/crNursing/sheet-print?id=${info.formId}&startPageIndex=${info.pageIndex}&endPageIndex=${info.endPageIndex}&appToken=${appToken}&token=${token}`;
      this.$message("正在准备打印中，请稍等");
      if (this.formPrintUrl == url) {
        setTimeout(() => {
          this.load();
        }, 5000);
      }
      this.formPrintUrl = url;
      this.updatePrintStatus(info);
    },
    printEval(info) {
      let query = this.$route.query;
      info.todo = "";
      info = Object.assign({}, info, info);
      info = Object.assign(info, info);
      let url = "";
      if (!info.nooForm) {
        info.nooForm = "0";
      }
      let queryObj = {
        id: info.formId || "",
        formCode: info.formCode,
        formType: info.formType,
        patientId: query.patientId,
        visitId: query.visitId,
        name: query.name,
        sex: query.sex,
        age: query.age,
        deptCode: query.deptCode,
        deptName: query.deptName,
        diagnosis: query.diagnosis,
        bedLabel: query.bedLabel,
        inpNo: query.inpNo,
        wardCode: query.wardCode,
        wardName: query.wardName,
        admissionDate: query.admissionDate,
        token: this.token,
        todo: info.todo,
        isPrint: true
        // title:info.title || ''
      };
      if (info.nooForm == "0") {
        info.pageUrl = info.pageUrl.replace(".html", "-打印.html");
      }

      if (info.nooForm == "1") {
        if (info.formName == "生长发育评估量表") {
          queryObj.formCode = "growth";
          url = `/crNursing/print/growth?${qs.stringify(queryObj)}`;
        } else {
          url = `${formUrl}/${info.pageUrl}?${qs.stringify(queryObj)}`;
        }
      } else {
        this.showSignSave = info.showSignSave || false;
        let formid = info.id;
        let http = this.isDev ? "" : "";

        url = `${http}${formUrl}/${info.pageUrl}?${qs.stringify(queryObj)}`;
      }
      this.$message("正在准备打印中，请稍等");
      if (this.formPrintUrl == url) {
        setTimeout(() => {
          this.load();
        }, 2000);
      }
      this.formPrintUrl = url;
      this.updatePrintStatus(info);
    },

    updatePrintStatus(info) {
      updatePrintStatus(info).then(res => {
        this.open();
      });
    },
    load() {
      let wid = this.$refs.iframeRef.contentWindow;
      if (this.formPrintUrl) {
        if (this.formPrintUrl.indexOf(formUrl) > -1) {
          setTimeout(() => {
            wid.print();
          }, 2000);
        } else if (this.formPrintUrl.indexOf("sheet-print") > -1) {
          setTimeout(() => {
            wid.print();
          }, 5000);
        } else {
          setTimeout(() => {
            wid.print();
          }, 2000);
        }
      }
    },
    openPreviewModal(formObj) {
      this.$refs.previewModal.open(getFormUrl(formObj));
    }
  },
  components: {
    previewModal
  }
};
</script>
