<template>
  <div class="tableCon">
    <div class="sum">
      <div class="group">BiShop宫颈成熟度评分：</div>
      <div class="group">
        孕/产次：<input
          type="text"
          :data-value="sheetInfo.relObj.yuchangci"
          v-model="sheetInfo.relObj.yuchangci"
        />孕周：<input
          type="text"
          :data-value="sheetInfo.relObj.yunzhou"
          v-model="sheetInfo.relObj.yunzhou"
        />
      </div>
      <div class="group">
        累计评分共计：
        <input
          type="text"
          :data-value="sheetInfo.relObj.totalCervixGrade"
          v-model="sheetInfo.relObj.totalCervixGrade"
        />分
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th
            :colspan="item.colspan || 1"
            v-for="item in tableData.thead"
            :key="item.value"
          >
            {{ item.value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tr, trIndex) in tableData.tbody" :key="trIndex">
          <td
            v-for="(td, tdIndex) in tr"
            :key="tdIndex"
            :colspan="td.colspan"
            :class="td.class"
            :style="[td.style, td.isChecked && { cursor: 'pointer' }]"
            @click="td.isChecked && isChecked(tr, td, tdIndex)"
          >
            <div v-if="td.sign" class="sign-img-con">
              <label v-if="td.prev">{{ td.prev }}</label>
              <div
                class="sign-null-box"
                @click="sign2()"
                v-if="!sheetInfo.relObj.signerNo2"
              ></div>
              <div class="sign-in-box" v-else @click="sign2(true)">
                <div class="audit-img sign-img">
                  <img
                    class="in-print"
                    :src="
                      `/crNursing/api/file/signImage/${sheetInfo.relObj.signerNo2}?${token}`
                    "
                    alt
                  />
                </div>
              </div>
            </div>
            <div v-else>
              <label v-if="td.prev">{{ td.prev }}</label>
              <span>{{ td.value ? td.value : (td.score == sheetInfo.relObj[td.name] ? '√' : '') }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="info">
      <div class="group">
        催产素静脉点滴情况：
        <input
          type="text"
          :data-value="sheetInfo.relObj.oxytocinCondition"
          v-model="sheetInfo.relObj.oxytocinCondition"
        />
      </div>
      <div class="group">
        静滴催产素指症：
        <input
          type="text"
          :data-value="sheetInfo.relObj.oxytocinDropScore"
          v-model="sheetInfo.relObj.oxytocinDropScore"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { countData } from "./countData";
import sheetInfo from "../../../config/sheetInfo";
import commom from "@/common/mixin/common.mixin";
import bus from "vue-happy-bus";
import { getUser } from "../../../../api";
export default {
  mixins: [commom],
  data() {
    return {
      sheetInfo,
      bus: bus(this),
      tableData: countData
    };
  },
  methods: {
    // 勾选当前选项
    isChecked(tr, td, tdIndex) {
      if (!td.isChecked) {
        return;
      }
      // 累计评分
      const allGrade = [null, null, 0, null, 1, null, 2, null, 3];
      const currentGrade = +allGrade[tdIndex];
      this.sheetInfo.relObj.totalCervixGrade = +this.sheetInfo.relObj.totalCervixGrade || 0;
      if (!td.value) {
        tr.map((item, index) => {
          if (
            item.name == td.name &&
            item.value &&
            Number(allGrade[index]) != NaN
          ) {
            this.sheetInfo.relObj.totalCervixGrade -= Number(allGrade[index]);
            item.value = "";
          }
        });
        td.value = "√";
        this.sheetInfo.relObj[td.name] = currentGrade;
        this.sheetInfo.relObj.totalCervixGrade += currentGrade;
      } else {
        td.value = "";
        this.sheetInfo.relObj[td.name] = "";
        this.sheetInfo.relObj.totalCervixGrade -= currentGrade;
      }
    },
    sign2(isCancel) {
      let title = isCancel ? "取消签名" : "确认签名";
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          if (isCancel) {
            this.sheetInfo.relObj.signerNo2 = "";
            this.sheetInfo.relObj.signerName2 = "";
            this.bus.$emit("saveSheetPage");
            this.$notify.success({
              title: "提示",
              message: "取消签名成功"
            });
          } else {
            this.sheetInfo.relObj.signerNo2 = res.data.data.empNo;
            this.sheetInfo.relObj.signerName2 = res.data.data.empName;
            this.bus.$emit("saveSheetPage");
            this.$notify.success({
              title: "提示",
              message: "签名成功"
            });
          }
        });
      }, title);
    }
  },

  created() {},
  mounted() {
    const allGrade = [null, null, 0, null, 1, null, 2, null, 3];
    this.tableData.tbody.map(tr => {
      tr.map((td, tdIndex) => {
        if (td.name && this.sheetInfo.relObj[td.name] == allGrade[tdIndex]) {
          td.value = "√";
        } else if (td.isChecked) {
          td.value = "";
        }
      });
    });
  },
  computed: {
    isPrint() {
      return window.location.href.indexOf("print") > -1;
    },
    auditorNo() {
      console.log(this.sheetInfo.relObj["signerName2"], "dddddddddddd");
      return this.sheetInfo.relObj["signerName2"];
    }
  },
  watch: {},
  coponents: {}
};
</script>

<style lang="scss" scoped>
.tableCon {
  width: 800px;
  font-family: simsun, "Times New Roman", Georgia, Serif;
  font-size: 12px;
  .sum,
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    div {
      input {
        border-bottom: 1px solid #000;
      }
    }
    input {
      border: none;
      outline: none;
      font-size: 16px;
    }
  }
  .sum {
    div {
      input {
        width: 80px;
        text-align: center;
      }
    }
  }
  .info {
    padding: 10px 0 0 0;
    input {
      width: 200px;
      padding-left: 5px;
    }
  }
  table {
    width: 880px;
    th,
    td {
      border: 1px solid #000;
      min-width: 50px;
      padding: 8px 3px;
      text-align: center;
      &:first-of-type {
        text-align: left;
      }
      &.sign {
        span {
          display: inline-block;
          width: 80px;
          min-height: 24px;
          line-height: 24px;
          cursor: pointer;
          vertical-align: middle;
        }
      }
    }
  }
}
.sign-img-con {
  display: flex;
  align-items: center;
  height: 30px;
  .sign-null-box {
    cursor: pointer;
    margin: auto;
    height: 30px;
    width: 80px;
  }
  .sign-in-box {
    min-width: 52px;
    height: 30px;
    cursor: pointer;
    margin: auto;
    object-fit: cover;
    .audit-text {
      line-height: 30px;
    }
    .audit-img {
      height: 30px;
      object-fit: cover;
      padding-bottom: 2px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
