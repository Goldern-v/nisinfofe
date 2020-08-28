<template>
  <div class="modal-con">
    <sweet-modal ref="newRecord" size="small" title="同步至交班志" class="modal-record padding-0">
      <div flex="cross:center" class="group">
        <span>日&nbsp;&nbsp;期：</span>
        <p>{{recordDate}}</p>
      </div>
      <div flex="cross:center" class="group">
        <span>选择科室：</span>
        <el-select
          filterable
          v-model="this_deptCode"
          placeholder="选择科室"
          class="type-select"
          @change="changeDept"
        >
          <el-option
            v-for="item in allDeptList"
            :key="item.deptCode"
            :label="item.deptName"
            :value="item.deptCode"
          ></el-option>
        </el-select>
      </div>
      <div flex class="group">
        <span>特殊记录：</span>
        <p>{{doc}}</p>
      </div>
      <div slot="button">
        <el-button class="modal-btn" @click="newRecordClose">关闭</el-button>
        <el-button class="modal-btn" type="primary" @click="syncDecriptionTolsbar">同步</el-button>
      </div>
    </sweet-modal>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.modal-con {
  >>>.sweet-content {
    padding: 30px 20px 0 30px !important;

    .group {
      padding-bottom: 10px;

      &:last-of-type {
        padding-bottom: 0;

        p {
          text-indent: 2em;
        }
      }

      > span {
        padding-right: 10px;
      }

      p {
        flex: 1;
      }
    }
  }
}
</style>

<script>
import commonMixin from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
import { listDepartment } from "@/Page/shift-work/apis/index.js";
import th from "../config/joint/th.js";
import { syncToIsbar } from "@/api/sheet.js";
import moment from "moment";
export default {
  mixins: [commonMixin],
  data() {
    return {
      templates: [],
      allDeptList: [],
      this_deptCode: "",
      pageLoading: true,
      bus: bus(this),
      doc: "",
      recordDate: "",
    };
  },
  computed: {
    patientInfo() {
      return this.$store.state.sheet.patientInfo;
    },
  },
  methods: {
    open(tr, td, sheetModel) {
      this.$refs.newRecord.open();
      // 数组重组
      let allList = [];
      // 当前行的index
      let currIndex = 0;
      // 拼接的记录
      let record = [];
      // 最后行的id 即最大的id
      let maxId = 0;
      // 当前的类型做唯一标识
      let curr_recordSource = tr.find((item) => item.key == "recordSource")
        .value;
      let curr_recordDate = tr.find((item) => item.key == "recordDate").value;
      if (curr_recordDate) {
        for (let i = 0; i < sheetModel.length; i++) {
          allList = allList.concat(sheetModel[i].bodyModel);
        }
        for (let i = 0; i < allList.length; i++) {
          maxId = Math.max(
            maxId,
            allList[i].find((item) => item.key == "id").value
          );
          if (
            allList[i].find((item) => item.key == "recordDate").value ==
              curr_recordDate &&
            allList[i].find((item) => item.key == "recordSource").value ==
              curr_recordSource
          ) {
            record.push(allList[i]);
          }
        }
      } else {
        record.push(tr);
      }
      // 特殊记录组合
      this.doc = "";
      for (let i = 0; i < record.length; i++) {
        this.doc +=
          record[i].find((item) => item.key == "description").value || "";
      }
      this.recordDate = curr_recordDate;
    },
    newRecordClose() {
      this.$refs.newRecord.close();
    },
    changeDept() {},
    getDeptList() {
      if (!this.deptCode) {
        return;
      }
      listDepartment(this.deptCode).then((res) => {
        this.allDeptList = res.data.data || [];
        let hasDeptCode = this.allDeptList.find((item) => {
          return item.deptCode == this.this_deptCode;
        });
        if (!hasDeptCode && this.allDeptList[0]) {
          this.this_deptCode = this.allDeptList[0].deptCode;
        }
      });
    },
    syncDecriptionData() {
      let data = {
        deptCode: this.this_deptCode,
        visitId: this.patientInfo.visitId,
        patientId: this.patientInfo.patientId,
        recordDate: this.recordDate
          ? moment(this.recordDate).format("YYYY-MM-DD")
          : "",
        bedLabel: this.patientInfo.bedLabel,
        desc: this.doc,
      };
      syncToIsbar(data).then((res) => {
        this.$message.success(res.data.desc);
        this.newRecordClose();
      });
    },
    syncDecriptionTolsbar() {
      this.syncDecriptionData();
    },
  },
  created() {
    if (this.deptCode) this.this_deptCode = this.deptCode;
    this.getDeptList();
  },
  mounted() {},
  watch: {
    deptCode() {
      this.deptCode && (this.this_deptCode = this.deptCode);
      this.getDeptList();
    },
  },
  components: {},
};
</script>
