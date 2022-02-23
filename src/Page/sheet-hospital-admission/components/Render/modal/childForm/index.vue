<template>
  <div>
    <el-dialog title="儿童疼痛行为评估量表" :visible.sync="dialogVisible" :modal="false">
      <!-- 第一页 -->
      <div class="page">
        <table class="table-face">
          <colgroup>
            <col width="100px" />
            <col width="200px" />
            <col width="80px" />
            <col />
          </colgroup>
          <!-- 表头 -->
          <tr>
            <td style="font-weight: bold">指标</td>
            <td style="font-weight: bold" colspan="2">描述</td>
            <td style="font-weight: bold">分值</td>
          </tr>
          <!-- 表格主体 -->
          <template v-for="item in tableBodyConfig">
            <tr
              v-for="(oItem, oIndex) in item.itemOption"
              :key="item.item + oIndex"
            >
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
    dialogTableChild: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableBodyConfig: [
        {
          item: "面部表情",
          code: "I617501",
          itemOption: [
            { label: "微笑或无特殊表情", score: "0" },
            { label: "偶尔皱眉/面部扭曲/淡漠", score: "1" },
            { label: "下颌颤抖/紧咬", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "下肢活动",
          code: "I617502",
          itemOption: [
            { label: "放松", score: "0" },
            { label: "紧张/不安静", score: "1" },
            { label: "乱踢动", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "身体活动度",
          code: "I617503",
          itemOption: [
            { label: "静卧/活动自如", score: "0" },
            { label: "翻来覆去", score: "1" },
            { label: "屈曲/僵直/急扭", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "哭闹",
          code: "I617504",
          itemOption: [
            { label: "无", score: "0" },
            { label: "呻吟/哭泣/偶尔诉痛", score: "1" },
            { label: "持续哭/经常诉痛", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "可安慰性",
          code: "I617505",
          itemOption: [
            { label: "无需安慰", score: "0" },
            { label: "轻拍可安慰", score: "1" },
            { label: "难以安抚", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
      ],
      scoreList: "",
      editParams: {
        I617501: "",
        I617502: "",
        I617503: "",
        I617504: "",
        I617505: "",
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
    dialogTableChild(val) {
      this.dialogVisible = val;
    },
  },
  methods: {
    handleSucceed() {
      this.$emit("scoreListChild", this.scoreList);
      this.handleClose();
    },
    handleClose() {
      this.$emit("changetableChild", false);
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
          height: 40px;
          top: 40%;
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