<template>
  <el-dialog
    title="停止护理措施"
    :visible.sync="modalVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @close="close"
  >
    <div class="execute-modal__wrapper">
      <div class="flex-item">【护理措施】</div>
      <div class="flex-item nursing-plan">
        {{ nursingPlan.planMaster && nursingPlan.planMaster.measureName }}
      </div>
      <div class="flex-item">
        <span>停止时间：</span>
        <el-date-picker
          v-model="stopTime"
          type="date"
          placeholder="选择日期"
          size="small"
        ></el-date-picker>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSign" size="small">签名确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import moment from 'moment';
export default {
  data() {
    return {
      modalVisible: false,
      stopTime: '',
      nursingPlan: {},
    }
  },
  computed: {

  },
  methods: {
    open(data) {
      this.nursingPlan = data || {};
      this.modalVisible = true;
    },
    onSign() {
      if (!this.stopTime) {
        return this.$message.warning('停止时间不能为空');
      }
      window.openSignModal((password, empNo) => {
        const stopTime = moment(this.stopTime).format('YYYY-MM-DD');
        this.close();
        this.$emit('onAfterSign', { password, empNo, stopTime }, '停止');
      }, '签名确认');
    },
    close() {
      this.modalVisible = false;
      this.nursingPlan = {};
      this.stopTime = '';
    }
  },
  watch: {

  }
}
</script>

<style lang="stylus" scoped>
  >>>.el-dialog {
    top: 50%!important;
    left: 50%;
    transform: translate(-50%, -50%)!important;
    width: 30%;
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .flex-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 12px;
      .el-date-editor {
        flex: 1;
      }
    }
    .nursing-plan {
      color: red;
      margin-left: 2em;
    }
  }
</style>



