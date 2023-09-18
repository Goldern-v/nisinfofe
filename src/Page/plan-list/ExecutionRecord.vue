<template>
  <div class="execution-record" v-loading="loading">
    <div class="execution-record__toolbar">
      <div class="toolbar-left">
        <div class="toolbar-item">
          <span>计划日期：</span>
          <el-date-picker
            @change="dateRangeChange"
            v-model="dateRange"
            size="small"
            type="daterange"
            align="center"
            placeholder="选择日期范围"
          ></el-date-picker>
        </div>
        <div class="toolbar-item">
          <span>执行状态：</span>
          <el-select
            size="small"
            v-model="status"
            placeholder="请选择执行状态"
            style="width: 100px"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="toolbar-item">
          <el-input
            size="small"
            placeholder="计划名称"
            icon="search"
            v-model="planName"
            :on-icon-click="() => {}"
          ></el-input>
        </div>
      </div>
      <div class="toolbar-right">
        <el-button size="small" type="primary" @click="onLoadData">查询</el-button>
        <el-button size="small" type="primary" @click="onExecute">执行</el-button>
        <el-button size="small" @click="toPlanList">护理计划</el-button>
      </div>
    </div>
    <div class="execution-record__table">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :height="wih - 158"
        @selection-change="onSelectionChange"
      >
        <el-table-column
          type="selection"
          align="center"
          width="50"
          :selectable="isSelectable"
        ></el-table-column>

        <!-- <el-table-column
          prop="planCode"
          label="计划号"
          align="center"
          min-width="70"
        ></el-table-column> -->

        <el-table-column
          prop="planName"
          label="计划名称"
          align="center"
          min-width="100"
        ></el-table-column>

        <el-table-column
          prop="content"
          label="执行内容"
          min-width="200"
          header-align="center"
        ></el-table-column>

        <el-table-column
          prop="status"
          label="执行状态"
          align="center"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.status | formatStatus }}
          </template>
        </el-table-column>

        <el-table-column
          prop="expectedExecuteTime"
          label="计划执行日期"
          align="center"
          min-width="90"
        >
          <template slot-scope="scope">
            {{ scope.row.status | formatDate }}
          </template>
        </el-table-column>

        <el-table-column
          prop="executorName"
          label="执行人"
          align="center"
          min-width="80"
        ></el-table-column>

        <el-table-column
          prop="executeTime"
          label="执行时间"
          align="center"
          min-width="120"
        ></el-table-column>

        <el-table-column
          prop="expand"
          label="备注"
          header-align="center"
          min-width="200"
        ></el-table-column>

        <el-table-column
          label="操作"
          min-width="70"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              :disabled="!isSelectable(scope.row)"
              @click="onExecuteOne(scope.row)"
            >执行
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <ExecuteModal
      ref="executeModalRef"
      @onSignConfirm="executeAfterSign"
    ></ExecuteModal>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin.js";
import { getDiagPlanDetails, executeDiagPlan } from '@/Page/patientInfo/supPage/diagnosis/api';
import moment from 'moment';
import ExecuteModal from './components/ExecuteModal.vue';
const statusMap = {
  '1': '未执行',
  '3': '已执行',
  '4': '停止'
}
export default {
  mixins: [common],
  components: { ExecuteModal },
  data() {
    return {
      loading: false,
      dateRange: this.setDateRange(),
      status: '',
      planName: '',
      statusList: [
        { name: '全部', value: '' },
        { name: '未执行', value: '1' },
        { name: '已执行', value: '2' },
      ],
      tableData: [],
      selectedRows: [],
    }
  },
  mounted() {
    this.onLoadData();
  },
  filters: {
    formatStatus(value) {
      return statusMap[value];
    },
    formatDate(value, format = 'YYYY-MM-DD') {
      if (value) {
        return moment(value).format(format);
      }
      return value;
    }
  },
  computed: {

  },
  methods: {
    async onLoadData() {
      this.loading = true;
      try {
        const [beginTime, endTime] = [
          moment(this.dateRange[0]).format('YYYY-MM-DD'),
          moment(this.dateRange[1]).format('YYYY-MM-DD')
        ];
        const params = {
          patientId: this.$route.query.patientId,
          visitId: this.$route.query.visitId,
          beginTime,
          endTime,
          status: this.status,
          name: this.planName,
        }
        const res = await getDiagPlanDetails(params);
        if (res.data.data) {
          this.tableData = res.data.data || [];
        }
      } catch(error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    openExecuteModal() {
      this.$refs.executeModalRef.open();
    },
    onExecuteOne(row) {
      this.selectedRows = [row];
      this.openExecuteModal();
    },
    async onExecute() {
      if (!this.selectedRows.length) {
        return this.$message.warning('未选中执行记录');
      }
      this.openExecuteModal();
    },
    async executeAfterSign(data) {
      this.loading = true;
      try {
        const params = {
          list: this.selectedRows,
          ...data,
        };
        await executeDiagPlan(params);
        this.$message.success('执行成功');
        this.onLoadData();
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
    isSelectable(row, index) {
      return row && row.status === '1';
    },
    toPlanList() {
      this.$emit('toPlanList');
    },
    setDateRange() {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 3600 * 1000 * 24);
      return [today, tomorrow];
    },
    dateRangeChange(value) {
      this.onLoadData();
      // console.log('setDateRange', value);
    },
    onSelectionChange(value) {
      this.selectedRows = value;
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.execution-record {
  background: rgba(255, 255, 255, 1);
  margin: 0px 10px;
  padding: 15px;
  height: calc(100% - 30px);
  .execution-record__toolbar {
    @include flex-box;
    justify-content: space-between;
    margin-bottom: 8px;
    .toolbar-left, .toolbar-right {
      @include flex-box;
    }
    .toolbar-left {
      justify-content: flex-start;
    }
    .toolbar-right {
      justify-content: flex-end;
    }
    .toolbar-item {
      @include flex-box;
      font-size: 14px;
    }
    .toolbar-item:not(:last-of-type) {
      margin-right: 16px;
    }
  }
  .execution-record__table {
    height: calc(100% - 38px);
  }
}
/deep/.el-input {
  .el-icon-search {
    left: 0!important;
    right: unset;
  }
  .el-icon-search+.el-input__inner {
    padding-left: 35px!important;
    padding-right: 10px!important;
  }
}
/deep/.el-table .cell, .el-table th > div {
  padding: 0px 6px;
  font-size: 13px;
  line-height: 24px;
}
/deep/.el-table td, .el-table th {
  height: 34px!important;
}
</style>
