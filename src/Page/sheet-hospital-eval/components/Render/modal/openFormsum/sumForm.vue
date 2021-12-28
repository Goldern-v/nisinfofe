<template>
  <div>
    <!-- Table -->
    <!-- <el-button type="text" @click="dialogTableVisible = true">打开嵌套表格的 Dialog</el-button> -->

    <el-dialog title="数字评定量表" :visible.sync="dialogVisible" width="80%" append-to-body @close="handleClose" :modal="false">
      <!-- 第一页 -->
      <div class="page">
        <!-- 表体 -->
        <table class="table-face">
          <tr>
            <td>
              <div>
                <div style="text-indent: 10px">
                  {{ "数字评定量表" }}
                </div>
                <div class="scored-area">
                  <div
                    v-for="score in scoredSelectList"
                    :key="score"
                    class="scored-item"
                    @click="handleClick(score)"
                  >
                    <div class="line"></div>
                    <div
                      :class="{
                        'score-item': true,
                        active: scoreList === score,
                      }"
                    >
                      {{ score }}
                    </div>
                    <div class="desc-item"></div>
                  </div>
                </div>
              </div>
              <div style="text-align: center">总分：{{ scoreList }}</div>
            </td>
          </tr>
        </table>
      </div>
      <div class="colse">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handleSucceed" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogTable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scoredSelectList: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
      ],
      scoreList: "",
      dialogVisible: false,
    };
  },
  watch: {
    dialogTable(val) {
      this.dialogVisible = val;
    },
  },
  methods: {
    handleClick(key) {
      this.scoreList = key;
    },
    handleSucceed() {
      this.$emit("scoreListSum", this.scoreList);
      this.handleClose();
    },
    handleClose() {
      this.$emit("changetableSum", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 0 0 15px;
  color: #000;
  background: #fff;
  display: flex;
  flex-direction: column;
  .table-face {
    tr {
      td {
        border: 1px solid #000;
        margin: 0;
        padding: 0 2px;
        font-size: 14px;
        line-height: 28px;
        height: 28px;
        text-align: left;
        .scored-area {
          margin: 0 auto;
          margin-top: 5px;
          display: flex;
          .scored-item {
            position: relative;
            width: 30px;
            padding-bottom: 20px;
            text-align: center;
            line-height: 12px;
            cursor: pointer;
            .score-item {
              text-align: center;
              line-height: 12px;
              position: relative;
              cursor: pointer;
              &.active {
                &::after {
                  content: "√";
                  width: 20px;
                  font-weight: bold;
                  position: absolute;
                  top: 7px;
                  color: blue;
                  left: 50%;
                  transform: translateX(-50%);
                }
              }
            }
            cursor: pointer;
            .line {
              height: 12px;
              width: 100%;
              position: relative;
              &::after {
                content: "";
                border-top: 1px solid #000;
                width: 100%;
                position: absolute;
                right: 0;
                top: 50%;
              }
              &::before {
                content: "";
                border-left: 1px solid #000;
                height: 100%;
                position: absolute;
                right: 50%;
                top: 0;
              }
            }

            &:first-of-type {
              .line {
                &::after {
                  width: 50%;
                }
              }
            }
            &:last-of-type {
              .line {
                &::after {
                  width: 50%;
                  right: auto;
                  left: 0;
                }
              }
            }
            .desc-item {
              width: max-content;
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
}
.colse {
  margin: 0 auto;
  width: 160px;
  display: flex;
  justify-content: space-between;
}
/deep/ .el-dialog{
  z-index: 15000!important;
}
</style>
