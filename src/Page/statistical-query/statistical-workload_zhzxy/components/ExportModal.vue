<template>
  <el-dialog
    title="请勾选期望显示在列表上的项目（勾选到的项目方可会导出）"
    :visible.sync="show"
    width="50%"
    @before-close="close"
  >
    <div class="export-item-list">
      <el-checkbox-group v-model="exportList" v-if="exportItemList.length">
        <el-checkbox
          v-for="(item, index) in exportItemList"
          :key="item + index"
          :label="item + index"
        >{{ item }}
        </el-checkbox>
      </el-checkbox-group>
      <div v-else class="empty">暂无数据</div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">返 回</el-button>
      <el-button type="primary">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      showExportModal: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        exportList: [],
      }
    },
    computed: {
      show: {
        get() {
          return this.showExportModal
        },
        set(val) {
          this.$emit("update:showExportModal", val)
        }
      },
      exportItemList() {
        return new Array(60).fill('刮痧治疗')
      }
    },
    methods: {
      close() {
        this.$emit("update:showExportModal", false)
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .el-dialog {
    .el-dialog__body {
      height: 360px;
      overflow: auto;
      .export-item-list {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-checkbox-group {
          height: 100%;
        }
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  /deep/ .el-checkbox  {
    min-width: 25%;
    &+ .el-checkbox {
      margin: 8px 0;
    }
  }
</style>
