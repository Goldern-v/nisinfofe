<template>
  <div class="excel">
    <table v-for="(table,tableIndex) in dataModel" :key="tableIndex">
      <tr v-for="(row,rowIndex) in table" :key="rowIndex">
        <td
          v-for="(col,colIndex) in row"
          :key="colIndex"
          :colspan="col.colspan || 1"
          :rowspan="col.rowspan"
          :class="col.class"
          :style="col.style"
        >
          <span v-if="col.prev">{{col.prev}}</span>
          <span v-if="col.type=='text'" :style="col.eleStyle">{{col.value}}</span>
          <span v-if="col.type=='html'" :style="col.eleStyle" v-html="col.value"></span>
          <span v-if="col.type=='sign'" :style="col.eleStyle" @click="openSignModal(col)">
            <span class="sign-img" v-if="formData[col.setKey]">
              <img :src="`/crNursing/api/file/signImage/${formData[col.setKey]}?${token}`" alt />
            </span>
            <span>{{formData[col.setKey2] || col.value}}</span>
          </span>
          <input
            type="text"
            :style="col.eleStyle"
            v-model="formData[col.setKey]"
            :data-value="formData[col.setKey]"
            v-if="col.type=='input'"
          />
          <span v-if="col.next">{{col.next}}</span>

          <div v-if="col.type=='inputGroup'">
            <span
              v-for="(child,childIndex) in col.children"
              :key="childIndex"
              :class="col.eleClass"
              style="font-size: 0;"
            >
              <span v-if="child.prev">{{child.prev}}</span>
              <span v-if="child.type=='text'" :style="child.style">{{child.value}}</span>
              <input
                type="text"
                :style="child.style"
                v-model="otherFormData[child.setKey]"
                :data-value="otherFormData[child.setKey]"
                v-if="child.type=='input'"
                @keyup="updateFormData(col)"
              />
              <span v-if="child.next">{{child.next}}</span>
            </span>
          </div>
          <div class="containTable" v-if="col.type=='table'">
            <Excel
              :dataModel="[col.table.tbody]"
              :formData.sync="formData"
              :otherFormData.sync="otherFormData"
              :saveForm="saveForm"
            ></Excel>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import common from "@/common/mixin/common.mixin.js";
import { getUser } from "../api/api";
// import { excel } from "./excel";
export default {
  name: "Excel",
  props: {
    dataModel: Array,
    formData: Object,
    otherFormData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    saveForm: Function
  },
  data() {
    return {};
  },
  mixins: [common],
  mounted() {},
  methods: {
    // 签名
    openSignModal(item) {
      window.openSignModal((password, empNo) => {
        getUser(password, empNo).then(res => {
          this.formData[item.setKey] = res.data.data.empNo;
          this.formData[item.setKey2] = res.data.data.empName;
          item.value = res.data.data.empName;
          this.$notify.success({
            title: "提示",
            message: "签名成功"
          });
          this.saveForm();
        });
      });
    },
    updateFormData(item) {
      let key = item.setKey,
        str = "",
        arr = item.children;
      key = key.slice(0, key.length);
      let val1 = this.otherFormData[arr[0].setKey];
      let val2 = this.otherFormData[arr[1].setKey];
      let val3 = this.otherFormData[arr[2].setKey];

      if (item.format == "YYYY-MM-DD") {
        str = val1 + "-" + val2 + "-" + val3;
      } else if (item.format == "YYYY-MM-DD HH:mm") {
        let val4 = this.otherFormData[arr[3].setKey];
        let val5 = this.otherFormData[arr[4].setKey];
        val4 = val4 < 10 ? "0" + val4 : val4;
        val5 = val4 < 10 ? "0" + val5 : val5;
        str = val1 + "-" + val2 + "-" + val3 + " " + val4 + ":" + val5;
      } else {
        this.formData[arr[0].setKey] = val1;
        this.formData[arr[1].setKey] = val2;
        this.formData[arr[2].setKey] = val3;
        str = val1 + "省（区、市）" + val2 + "市" + val3 + "县（区）";
      }
      this.formData[key] = str;
    }
  }
};
</script>
<style lang='scss' scoped>
.excel {
  table {
    width: 100%;
    th,
    td {
      font-size: 13px;
      border-top: 1px solid #000;
      border-right: 1px solid #000;
      border-left: 1px solid #000;
      height: 36px;
      vertical-align: middle;
      overflow: hidden;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      &.label {
        background-color: #f4f2f5;
        padding-left: 15px;
      }
      > div {
        span {
          span,
          input {
            font-size: 13px;
          }
        }
      }
      > div,
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      input {
        padding-left: 5px;
      }
    }
    tr {
      &:last-of-type {
        td {
          border-bottom: 1px solid #000;
        }
      }
    }

    input {
      border: none;
      outline: none;

      &:focus {
        background-color: #fef8b1;
      }
    }
    .title {
      font-size: 16px;
      text-align: center;
      font-weight: bold;
      height: 34px;
    }
  }
  .sign-img {
    display: none;
  }
  .containTable {
    padding-left: 0;
    height: 100%;
    vertical-align: middle;
    table {
      height: 100%;
    }
    td {
      border: none !important;
      border-right: 1px solid #000 !important;

      &:last-of-type {
        border-right: none !important;
      }
    }
  }
  .fillDate {
    > div {
      padding-top: 11px;
    }
  }
}
</style>