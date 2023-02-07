<template>
  <div class="content-page">
    <table>
      <colgroup>
        <col width="105px" />
        <col width="60px" />
        <col width="105px" />
        <col width="60px" />
        <col width="105px" />
        <col width="60px" />
        <col width="60px" />
        <col width="105px" />
      </colgroup>
      <thead>
        <tr>
          <th colspan="8" class="thead-title">{{ "dafdf" }}医嘱查对登记表</th>
        </tr>
        <tr>
          <th rowspan="2" class="date-line">日期</th>
          <th colspan="4">
            白班医嘱查对<br />（医嘱内容及用药、处置等执行情况）
          </th>
          <th colspan="3">
            夜班医嘱查对<br />（医嘱内容及用药、处置等执行情况）
          </th>
        </tr>
        <tr>
          <th>主班</th>
          <th>责任班</th>
          <th>护士长</th>
          <th>夜班</th>
          <th>夜班</th>
          <th>次日主班</th>
          <th>次日护士长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sheetData" :key="index + 'diff'">
          <td>
            <input type="text" @click="handelDate(item)" v-model="item.date" />
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(4, item.mainClass)"
            ></textarea>
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(8, item.mainClass)"
            ></textarea>
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(4, item.mainClass)"
            ></textarea>
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(8, item.mainClass)"
            ></textarea>
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(4, item.mainClass)"
            ></textarea>
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(4, item.mainClass)"
            ></textarea>
          </td>
          <td>
            <textarea
              v-model="item.mainClass"
              :rows="getRows(8, item.mainClass)"
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.content-page {
  width: 780px;
  height: 1100px;
  margin: 20px auto;
  padding: 30px 50px;
  background-color: #fff;
  box-shadow: 0 5px 9px 0 rgba($color: #5e5d5d, $alpha: 0.5);

  table {
    width: 100%;
    text-align: center;
    color: #484848;
    thead {
      position: sticky;
      tr {
        th {
          font-size: 14px;
          border: 1px solid #000000;
          border-collapse: collapse;
          line-height: 26px;
          vertical-align: middle;
        }
        .thead-title {
          font-size: 22px;
          line-height: 32px;
        }
        .date-line {
          vertical-align: middle;
        }
      }
    }
    tbody {
      tr {
        td {
          font-size: 14px;
          border: 1px solid #000000;
          border-collapse: collapse;
          height: 65px;
          vertical-align: middle;
          input {
            width: 100%;
            border: none;
            outline: none;
            resize: none;
            text-align: center;
            background-color: transparent;
            font-size: 14px;
            color: #00f;
          }
          textarea {
            width: 100%;
            border: none;
            outline: none;
            resize: none;
            text-align: center;
            background-color: transparent;
            font-size: 14px;
            overflow: hidden;
          }
        }
      }
      tr:nth-child(even) {
        background: #f4f4f4;
      }
    }
  }
}
</style>
<script>
import moment from "moment";
export default {
  props: {},
  data() {
    return {
      sheetData: Array.from({ length: 14 }, () => {
        return { date: "", mainClass: "" };
      })
    };
  },
  methods: {
    handelDate(item) {
      if (!item.date) {
        item.date = moment().format("YYYY年MM月DD日");
      }
    },
    getRows(num, data) {
      let fontLen = 0;
      for (let i = 0; i < data.length; i++) {
        let han = /[a-zA-Z0-9_]/;
        if (!han.test(data[i])) {
          fontLen += 1;
        } else {
          fontLen += 0.5;
        }
      }
      if (fontLen >= num) {
        return Math.ceil(fontLen / num) <= 3 ? Math.ceil(fontLen / num) : 3;
      } else {
        return 1;
      }
    }
  },
  components: {}
};
</script>
