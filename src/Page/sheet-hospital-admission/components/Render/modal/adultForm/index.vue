<template>
  <div>
    <el-dialog
      title="成人疼痛行为评估量表"
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <!-- 第一页 -->
      <div class="page">
        <!-- 表体 -->
        <table class="table-face">
          <colgroup>
            <col width="100px" />
            <col width="400px" />
            <col width="80px" />
            <col width="80px" />
          </colgroup>
          <!-- 表头 -->
          <tr>
            <td colspan="2">评估项目</td>
            <td>分数</td>
            <td>患者情况</td>
          </tr>
          <!-- 表格主体 -->
          <template v-for="item in tableBodyConfig">
            <tr v-for="(oItem, oIndex) in item.itemOption" :key="oItem.label">
              <!-- 第一列  只在第一行的时候显示 -->
              <td
                v-if="oIndex === 0"
                :rowspan="item.itemOption.length"
                style="padding: 5px"
              >
                {{ item.item }}
              </td>
              <td
                style="text-align: left; padding-left: 5px"
                @click="setItemData(item.code, oItem.score)"
              >
                <!-- <input style="width:15px;height:15px; vertical-align: middle;" type="radio"/> -->
                {{ oItem.label }}
              </td>
              <td @click="setItemData(item.code, oItem.score)">
                {{ oItem.score + "分" }}
              </td>
              <!-- <td>{{ oItem.label }}</td> -->

              <template v-if="oIndex === 0">
                <td :rowspan="item.itemOption.length">
                  <!-- {{ editParams[item.code] === oItem.score ? oItem.score : '' }} -->
                  <input
                    v-model="editParams[item.code]"
                    @click="
                      () => handleIptDefaultValue(item.code, item.defaultList)
                    "
                    class="align-center"
                  />
                </td>
              </template>
            </tr>
          </template>
          <!-- 表格尾部 -->
          <tr>
            <td colspan="3">评估得分</td>
            <td>{{ sum }}</td>
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
    dialogTableAdult: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableBodyConfig: [
        {
          item: "脸部肌肉/表情",
          code: "I617301",
          itemOption: [
            { label: "脸部肌肉放松", score: "0" },
            { label: "脸部肌肉紧张，皱眉，脸部肌肉扭曲", score: "1" },
            { label: "经常或一直皱眉，紧咬牙床", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "休息",
          code: "I617302",
          itemOption: [
            { label: "安静，表情安详，肢体活动正常", score: "0" },
            { label: "偶然有些休息不好，并改变体位", score: "1" },
            { label: "躁动不安，无法休息，频繁改变体位", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "肌紧张",
          code: "I617303",
          itemOption: [
            { label: "肌张力正常，肌肉放松", score: "0" },
            { label: "肌张力增加，手指或脚趾屈曲", score: "1" },
            { label: "肌肉僵硬", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "发声",
          code: "I617304",
          itemOption: [
            { label: "无异常发声", score: "0" },
            { label: "偶然发出呻吟声，哼声，哭泣或啜泣", score: "1" },
            {
              label: "频繁或持续地发出呻吟声，哼声，哭泣或者啜泣声",
              score: "2",
            },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "发声",
          code: "I617305",
          itemOption: [
            { label: "满足的，放松的", score: "0" },
            { label: "通过谈话或者分散注意力得到了安抚", score: "1" },
            { label: "很难通过抚摸或谈话得到安抚", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
      ],
      scoreList: "",
      editParams: {
        I617301: "",
        I617302: "",
        I617303: "",
        I617304: "",
        I617305: "",
      },
      dialogVisible: false,
    };
  },
  computed: {
    sum() {
      const list = this.tableBodyConfig.map((i) => i.code);
      return list.reduce((acc, cur) => {
        cur = isNaN(+this.editParams[cur]) ? 0 : +this.editParams[cur];
        return acc + cur;
      }, 0);
    },
  },
  watch: {
    sum(nVal) {
      this.scoreList = nVal;
    },
    dialogTableAdult(val) {
      this.dialogVisible = val;
    },
  },
  methods: {
    handleSucceed() {
      this.$emit("scoreListAdult", this.scoreList);
      this.handleClose();
    },
    handleClose() {
      this.$emit("changetableAdult", false);
    },
    handleIptDefaultValue(key, list = [], needCalc = false) {
      let oldVal = this.editParams[key];
      if (!oldVal && oldVal !== 0) {
        this.setItemData(key, list.length > 0 ? list[0] : "");
      } else {
        if (needCalc) oldVal = Number(oldVal);
        let idx = list.indexOf(oldVal);
        let nextIdx = 0;
        if (idx >= 0) {
          nextIdx = idx + 1;
          if (idx >= list.length - 1) nextIdx = -1;
          // console.log(nextIdx,'nextIdx')
          this.setItemData(key, list[nextIdx] || "");
          // console.log(list[nextIdx],'list[nextIdx]')
        }
      }
    },
    setItemData(key, val) {
      this.editParams[key] = val;
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
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;

    tr {
      td {
        border: 1px solid #000;
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 24px;

        &.svg-td {
          position: relative;

          span {
            position: absolute;
          }

          svg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;

            line {
              stroke: #000;
              stroke-width: 1;
            }
          }
        }

        .option-title {
          margin-left: 5px;
        }

        .option-wrapper {
          display: flex;
          flex-wrap: wrap;

          & > div {
            margin-left: 5px;
          }

          .option-item__select {
            color: blue;
            cursor: pointer;
          }
        }
      }
    }

    .option-item {
      color: blue;
      cursor: pointer;
    }
  }

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
        position: relative;
        input {
          position: absolute;
          width: 58px;
          height: 74px;
          padding: 2px 3px;
          box-sizing: border-box;
          margin: 0;
          border: 0;
          outline: none;
          color: blue;
          text-align: center;

          &.align-center {
            text-align: center;
          }

          &.select {
            font-weight: bold;
            cursor: pointer;
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
/deep/ .el-dialog--small {
  width: 70%;
}
</style>
