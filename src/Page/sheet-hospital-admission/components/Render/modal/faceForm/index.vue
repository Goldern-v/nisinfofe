<template>
  <div>
    <el-dialog
      title="面部表情疼痛量表"
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <!-- 第一页 -->
      <div class="page">
        <!-- 表体 -->
        <table class="table-face">
          <tr>
            <td>
              <div>
                <div style="text-indent: 10px">
                  {{ "面部表情疼痛量表" }}
                </div>
                <div class="face-area">
                  <div
                    class="face-item"
                    v-for="(item, idx) in faceSelectList"
                    :key="item.name"
                    @click="handleClick(item.score)"
                  >
                    <img :src="require(`./image/${idx + 1}.png`)" alt />
                    <div
                      :class="{
                        'score-item': true,
                         active: scoreList === item.score,
                      }"
                    >
                      {{ item.score }}
                    </div>
                    <div class="desc-item">{{ item.name }}</div>
                  </div>
                </div>
                <div style="text-align: center">总分：{{ scoreList }}</div>
              </div>
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
    dialogTableFace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      faceSelectList: [
        { name: "无痛", score: "0" },
        { name: "轻微疼痛", score: "2" },
        { name: "轻度疼痛", score: "4" },
        { name: "中度疼痛", score: "6" },
        { name: "严重疼痛", score: "8" },
        { name: "剧烈疼痛", score: "10" },
      ],
      scoreList: "",
      dialogVisible: false,
    };
  },
  watch: {
    dialogTableFace(val) {
      this.dialogVisible = val;
    },
  },
  methods: {
    handleClick(key) {
      this.scoreList = key;
    },
    handleSucceed() {
      this.$emit("scoreListFace", this.scoreList);
      this.handleClose();
    },
    handleClose() {
      this.$emit("changetableFace", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 0 0 15px;
  color: #000;
  background: #fff;
  position: relative;
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
        .face-area {
          width: 100%;
          margin: 0 auto;
          display: flex;
          .face-item {
            flex: 1;
            cursor: pointer;
            text-align: center;
            img {
              width: 50%;
            }

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
                  top: 4px;
                  color: blue;
                  left: 50%;
                  transform: translateX(-50%);
                }
              }
            }
          }
          .desc-item {
            width: 80px;
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
/deep/ .el-dialog--small{
  width:70%
}
</style>
