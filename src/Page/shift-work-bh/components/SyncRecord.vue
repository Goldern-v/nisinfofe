<template>
  <el-dialog
    :visible.sync="syncModal"
    :close-on-click-modal="false"
    @close="close"
    :modal-append-to-body="false"
    modalClass="sync-record-modal"
    custom-class="sync-record-dialog"
    title="同步护理记录"
  >
    <div class="record-modal__wrapper">
      <div class="modal-body__header">
        <span>日期：</span>
        <el-date-picker
          v-model="queryInfo.recordDate"
          type="date"
          size="small"
          placeholder="选择日期"
        />
        <el-button @click="onInitData">查询</el-button>
      </div>
      <div class="modal-body__table">
        <el-table
          :data="tableData"
          ref="table"
          border
          highlight-current-row
          max-height="400"
          @selection-change="onSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            prop="RECORD_DATE"
            label="日期"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="DESCRIPTION"
            label="护理记录"
            min-width="275px"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <span class="footer-btn" slot="footer">
      <el-button @click="close" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="onSave">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment';
import { getRecordData } from '../apis'
export default {
  data() {
    return {
      syncModal: false,
      queryInfo: {
        patientId: '',
        visitId: '',
        recordDate: moment().format('YYYY-MM-DD'),
      },
      tableData: [],
      description: ''
    }
  },
  methods: {
    onSave() {
      this.$emit('on-select', this.description);
      this.close();
    },
    async onInitData() {
      const recordDate = moment(this.queryInfo.recordDate).format('YYYY-MM-DD');
      const { patientId, visitId } = this.queryInfo;
      try {
        const res = await getRecordData(patientId, visitId, recordDate);
        if (res.data.data && res.data.data.length) {
          this.tableData = res.data.data;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    open(data) {
      this.syncModal = true;
      if (data) {
        this.queryInfo.patientId = data.patientId;
        this.queryInfo.visitId = data.visitId;
        this.onInitData()
      }
    },
    close() {
      this.syncModal = false;
      this.tableData = [];
      this.queryInfo.recordDate = moment().format('YYYY-MM-DD');
    },
    onSelectionChange(value) {
      this.description = value.length ? value.reduce((pre, cur) => pre + cur.DESCRIPTION, '') : '';
    }
  }
}
</script>

<style lang="stylus" scoped>
  >>>.el-dialog {
    top: 50%!important;
    left: 50%;
    transform: translate(-50%, -50%)!important;
    .el-dialog__header {
      padding: 10px 15px;
      background: #f9fafa;
      border-bottom: 1px solid #ddd;
      .el-dialog__title {
        font-size: 14px;
      }
    }
    .el-dialog__body {
      padding: 15px 15px;
    }
    .el-dialog__footer {
      text-align: center!important;
    }
  }
  .record-modal__wrapper {
    overflow: auto;
    .modal-body__table {
      margin-top: 6px;
    }
  }
</style>
