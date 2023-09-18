<template>
  <el-dialog
    title="护理计划执行"
    :visible.sync="modalVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @close="close"
  >
    <div class="execute-modal__wrapper">
      <div class="flex-item">
        <span>备注：</span>
        <el-input
          v-model="expand"
          placeholder="请输入内容"
          type="textarea"
          resize="none"
          :rows="5"
          :autosize="{ minRows: 5 }"
        ></el-input>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSign" size="small">签名确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      expand: '',
    }
  },
  computed: {

  },
  methods: {
    open() {
      this.modalVisible = true;
    },
    onSign() {
      window.openSignModal((password, empNo) => {
        this.close();
        this.$emit('onSignConfirm', { password, empNo, expand: this.expand });
      }, '签名确认');
    },
    close() {
      this.modalVisible = false;
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
    width: 40%;
    .el-dialog__header {
      text-align: center;
    }
    .el-dialog__footer {
      text-align: center;
    }
    .flex-item {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      .el-textarea {
        flex: 1;
      }
    }
  }
</style>



