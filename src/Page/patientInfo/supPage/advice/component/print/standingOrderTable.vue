<template>
  <div>
    <print-header />
    <el-table
      :data="tableData"
      stripe
      :show-header="true"
      style="width: 100%"
      border
      class="advice-table"
    >
      <el-table-column label="开始医嘱" min-width="200px" align="center">
        <el-table-column label="日期" min-width="50px" align="center">
          <template slot-scope="scope">
            <span
              :class="type(scope.row.orderStatusName)"
              v-show="showDate(scope)"
              >{{ scope.row.startDate | formatDate('MM-DD') }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="时间" min-width="50px" align="center">
          <template slot-scope="scope">
            <span
              :class="type(scope.row.orderStatusName)"
              v-show="showDate(scope, undefined, 'time')"
              >{{ scope.row.startDate | formatDate }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="医嘱"
          min-width="340px"
          prop="orderText"
          align="center"
        >
          <template slot-scope="scope">
            <div
              class="orderText"
              :class="type(scope.row.orderStatusName)"
              style="text-align: left; padding-left: 10px"
            >
              <span :class="type(scope.row.orderStatusName)">{{
                scope.row.orderText
              }} <i v-if="scope.row.freqDetail">({{scope.row.freqDetail}})</i> </span>
              <span
                :class="[
                  type(scope.row.orderStatusName),
                ]" style="margin-right: 15px;"
                >{{scope.row.specialSymbols}}{{ scope.row.dosage }}{{ scope.row.dosageUnits }}</span
              >
              <span
                :class="type(scope.row.orderStatusName)"
                >{{ scope.row.rowType === 1 ? scope.row.administration : '' }}</span
              >
              <span
              :class="type(scope.row.orderStatusName)"
              >{{scope.row.skinResult}}</span>
              <span
                :class="type(scope.row.orderStatusName)"
                >{{ scope.row.frequency }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="医生"
          min-width="60px"
          prop="doctor"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <span
              :class="type(scope.row.orderStatusName)"
              v-show="Number(scope.row.orderSubNo) <= 1&&!scope.row.doctorNo"
              >{{ scope.row.doctor }}</span
            > -->
            <div v-show="Number(scope.row.orderSubNo) <= 1">
              {{scope.row.doctorNo || scope.row.doctor}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="护士"
          min-width="60px"
          prop="nurse"
          align="center"
          >
          <template slot-scope="scope">
            <div v-show="Number(scope.row.orderSubNo) <= 1">
              {{scope.row.nurseEmpNo || scope.row.nurse}}
              </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="停止医嘱" min-width="200px" align="center">
        <el-table-column label="日期" min-width="60px" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="showDate(scope, 'stopDate')"
            >{{ scope.row.stopDate | formatDate('MM-DD') }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="时间" min-width="50px" align="center">
        <template slot-scope="scope">
          <span
            :class="type(scope.row.orderStatusName)"
            v-show="showDate(scope, 'stopDate', 'time')"
            >{{ scope.row.stopDate | formatDate }}</span
          >
          </template>
        </el-table-column>
        <el-table-column
          label="医生"
          min-width="60px"
          prop="stopDoctor"
          align="center"
        >
          <template slot-scope="scope">
            <!-- <span
              :class="type(scope.row.orderStatusName)"
              v-show="Number(scope.row.orderSubNo) <= 1 && !scope.row.stopDoctorEmpNo"
              >{{ scope.row.stopDoctor }}
            </span> -->
            <div v-show="Number(scope.row.orderSubNo) <= 1">
              {{scope.row.stopDoctorEmpNo || scope.row.stopDoctor}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="护士"
          min-width="60px"
          prop="stopNurse"
          align="center"
        >
          <template slot-scope="scope">
            <div v-show="Number(scope.row.orderSubNo) <= 1">
              {{scope.row.stopNurseEmpNo || scope.row.stopNurse }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
>>>.el-table {
  .cell {
    padding: 0 !important;
  }

  thead {
    .cell {
      padding: 0 !important;
    }
  }
  td {
    height:  30px !important;
    vertical-align: top;
  }

  th,td {
    font-size: 16px;
  }

  img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }

  .img {
    height: 30px;
  }

  .orderText {
    display: flex;

    span {
      margin-right: 8px;
      min-width: 40px;

      &:first-of-type {
        flex: 1;
      }

      &:nth-of-type(3) {
        width: 70px;
      }

      &:last-of-type {
        margin-right: 0;
      }
      i {
        font-style: normal;
      }
    }

    // .rowType1, .rowType2, .rowType3 {
    //   position: relative;

    //   &::before, &::after {
    //     position: absolute;
    //     content: '';
    //     right: -10px;
    //   }

    //   &::before {
    //     width: 8px;
    //     border-top: 2px solid #000;
    //     top: 12px;
    //   }

    //   &::after {
    //     height: 8px;
    //     border-right: 2px solid #000;
    //   }
    // }

    // .rowType1 {
    //   &::after {
    //     top: 12px;
    //   }
    // }

    // .rowType2 {
    //   &::after {
    //     top: 4px;
    //   }
    // }
    // .rowType3 {
    //   &::after {
    //     top: 8px;
    //   }
    // }
  }
}
</style>


<script>
import PrintHeader from './print-header.vue'
import common from "@/common/mixin/common.mixin.js";
import moment from "moment";
export default {
  props: {
    tableData: Array,
  },
  mixins: [common],
  data() {
    return {};
  },
  computed: {
    wih() {
      return this.$store.state.common.wih;
    },
    query() {
      return this.$route.query;
    },
  },
  mounted() {},
  methods: {
    height() {
      let height = this.wih - 200;
      return height.toString();
    },
    type(state) {
      if (state === "执行") {
        return "color-zhixing";
      }
      if (state === "停止") {
        return "color-tingzhi";
      }
      if (state === "新开") {
        return "color-xinkai";
      }
      if (state === "提交") {
        return "color-tijiao";
      }
      if (state === "作废") {
        return "color-zuofei";
      }
      return "1234566666";
    },
    Number(val) {
      return Number(val);
    },
    /**判断是否与上一个数据时间相同 */
    showDate(obj, key='startDate', type = 'date') {
      const { row, $index } = obj
      if ($index - 1 < 0) return true
      if (type == 'date')
        return this.Number(row.orderSubNo) <= 1 && (row[key].substr(0, 10) != this.tableData[$index - 1][key].substr(0, 10))
      return this.Number(row.orderSubNo) <= 1 && (row[key] != this.tableData[$index - 1][key])
    }
  },
  components: {
   PrintHeader,
  },
  filters: {
    formatDate(val, formatText = 'HH:mm') {
      return val ? moment(val).format(formatText) : "";
    },
  },
  watch: {
    tableData() {
      this.tableData.map((item, index) => {
        if (Number(item.orderSubNo) > 1 && !item["rowType"]) {
          item["rowType"] = 2;
          this.tableData[index - 1]["rowType"] =
            this.tableData[index - 1] && this.tableData[index - 1]["rowType"]
              ? this.tableData[index - 1]["rowType"]
              : 1;
        }
      });
    },
  },
};
</script>
