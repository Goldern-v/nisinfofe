<template>
  <div>
    <el-dialog title="成人疼痛行为评估量表" :visible.sync="dialogVisible" :modal="false">
      <!-- 第一页 -->
      <div class="page">
        <table class="table-face">
          <colgroup>
            <col width="100px" />
            <col width="300px" />
            <col width="100px" />
            <col width="80px" />
            <col width="80px"/>
          </colgroup>
          <!-- 表头 -->
          <tr>
            <td style="font-weight: bold;">指标</td>
            <td style="font-weight: bold;" colspan="3">描述</td>
            <td style="font-weight: bold;">分值</td>
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
                {{oItem.labelTwo}}
              </td>
              <td @click="setItemData(item.code, oItem.score)">
                {{oItem.score + "分"}}
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
            <td colspan="4">评估得分</td>
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
    dialogTableSever: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableBodyConfig: [
        {
          item: "面部表情",
          code: "I617401",
          itemOption: [
            { label: "无肌肉紧张表现", labelTwo: "放松", score: "0" },
            { label: "皱眉，眼轮匝肌紧固", labelTwo: "紧张", score: "1" },
            {
              label: "皱眉，眼轮匝肌紧固，眼睑紧闭",
              labelTwo: "痛苦",
              score: "2",
            },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "身体运动",
          code: "I617402",
          itemOption: [
            { label: "完全无运动", labelTwo: "无运动", score: "0" },
            {
              label: "缓慢谨慎的运动，触摸或摩擦痛点，通过运动寻求关注",
              labelTwo: "保护性运动",
              score: "1",
            },
            {
              label: "拽管，试图坐起，捶打，不遵嘱，撞击床柱，试图下床",
              labelTwo: "烦躁不安",
              score: "2",
            },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "上肢肌张力",
          code: "I617403",
          itemOption: [
            { label: "对被动运动无抵抗", labelTwo: "放松", score: "0" },
            { label: "对被动运动有抵抗", labelTwo: "紧张，僵硬", score: "1" },
            {
              label: "对被动运动有抵抗并不能停止",
              labelTwo: "非常紧张，僵硬",
              score: "2",
            },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "机械通气的顺应性",
          code: "I617404",
          itemOption: [
            {
              label: "未报警，机械通气顺畅",
              labelTwo: "可耐受机械通气或移动",
              score: "0",
            },
            { label: "自主呼吸报警", labelTwo: "呛咳，但可耐受", score: "1" },
            {
              label: "与呼吸机不同步，抵抗呼吸机，频繁报警",
              labelTwo: "抵抗机械通气",
              score: "2",
            },
          ],
          defaultList: ["0", "1", "2"],
        },
        {
          item: "发声（拔管患者）",
          code: "I617405",
          itemOption: [
            {
              label: "言语正常或不发声",
              labelTwo: "言语正常或不发声",
              score: "0",
            },
            { label: "叹气呻吟", labelTwo: "叹气呻吟", score: "1" },
            { label: "喊叫，啜泣", labelTwo: "喊叫，啜泣", score: "2" },
          ],
          defaultList: ["0", "1", "2"],
        },
      ],
      scoreList: "",
      editParams: {
        I617401: "",
        I617402: "",
        I617403: "",
        I617404: "",
        I617405: "",
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
    dialogTableSever(val) {
      this.dialogVisible = val;
    },
  },
  methods: {
    handleSucceed() {
      this.$emit("scoreListSever", this.scoreList);
      this.handleClose();
    },
    handleClose() {
      this.$emit("changetableSever", false);
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
