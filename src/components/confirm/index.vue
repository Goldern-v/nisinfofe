<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    size="420"
    :before-close="handleClose"
  >
    <div class="tlt-box">
      <i class="el-icon-warning"></i>
      <span class="warmtlt">{{ warmtlt }}</span>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-for="(btn, btnIn) in buttonList"
        :key="btnIn + 'btn'"
        @click="btn.fun"
        :type="btn.type"
        >{{ btn.label }}</el-button
      >
    </div>
  </el-dialog>
</template>
<style lang='scss' scoped>
/deep/ .el-dialog {
  width: 420px;
  .tlt-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .el-icon-warning {
      font-size: 36px;
      color: #f7ba2a;
    }
    .warmtlt {
      margin-left: 10px;
    }
  }
}
</style>
<script>
export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      buttonList: [],
      warmtlt: "",
    };
  },
  methods: {
    open(config) {
      this.buttonList = config.buttonList;
      this.warmtlt = config.warmtlt;
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    handleClose(done) {
      
    },
  },
  components: {},
};
</script>