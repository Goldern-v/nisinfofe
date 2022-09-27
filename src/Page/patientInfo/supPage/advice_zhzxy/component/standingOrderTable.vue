<template>
  <div>
    <div class="header-con">
      <div class="title">南方医科大学第三附属医院</div>
      <div class="title">长期医嘱记录单</div>
      <div class="info-con" style="text-align: right">
        <span>
          病人ID：
          <div class="bottom-line" style="min-width: 70px; text-align: left">
            {{ query.patientId }}
          </div>
        </span>
      </div>
      <div class="info-con header-info" flex="main:justify">
        <span>
          姓名：
          <div class="bottom-line" style="min-width: 70px">
            {{ query.name }}
          </div>
        </span>
        <span>
          床号：
          <div class="bottom-line" style="min-width: 30px">
            {{ query.bedLabel }}
          </div>
        </span>
        <span>
          科室：
          <div class="bottom-line" style="min-width: 70px">
            {{ query.deptName }}
          </div>
        </span>
        <span>
          住院号：
          <div class="bottom-line" style="min-width: 70px">
            {{ query.inpNo }}
          </div>
        </span>
      </div>
    </div>
    <el-table
      :data="tableData"
      stripe
      :show-header="true"
      style="width: 100%"
      border
      class="advice-table"
    >
      <el-table-column label="开嘱" min-width="200px" align="center">
        <el-table-column label="起始时间" min-width="80px" align="center">
          <template slot-scope="scope">
            <span
              :class="type(scope.row.orderStatusName)"
              v-show="Number(scope.row.orderSubNo) <= 1"
              >{{ scope.row.startDate | formatDate }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="医生"
          min-width="60px"
          prop="doctor"
          align="center"
        >
          <template slot-scope="scope">
            <span
              :class="type(scope.row.orderStatusName)"
              v-show="Number(scope.row.orderSubNo) <= 1&&!scope.row.doctorNo"
              >{{ scope.row.doctor }}</span
            >
            <div class="img">
              <img
                v-show="
                  Number(scope.row.orderSubNo) <= 1 && scope.row.doctorNo
                "
                :src="`/crNursing/api/file/signImage/${scope.row.doctorNo}?${token}`"
                alt
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="护士"
          min-width="60px"
          prop="nurse"
          align="center"
          >>
          <template slot-scope="scope">
            <div class="img">
              <img
                v-show="
                  Number(scope.row.orderSubNo) <= 1 && scope.row.nurseEmpNo
                "
                :src="`/crNursing/api/file/signImage/${scope.row.nurseEmpNo}?${token}`"
                alt
              />
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="医嘱内容"
        min-width="350px"
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
                {
                  rowType1: scope.row.rowType == 1,
                  rowType2: scope.row.rowType == 2,
                },
              ]" style="margin-right: 15px;"
              >{{ scope.row.dosage }}{{ scope.row.dosageUnits }}</span
            >
            <span
              :class="type(scope.row.orderStatusName)"
              >{{ scope.row.administration }}</span
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
      <el-table-column label="停止医嘱" min-width="200px" align="center">
        <el-table-column
          label="停止时间"
          min-width="80px"
          prop="stopDate"
          align="center"
        >
          <template slot-scope="scope">
            <span
              :class="type(scope.row.orderStatusName)"
              v-show="Number(scope.row.orderSubNo) <= 1"
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
            <span
              :class="type(scope.row.orderStatusName)"
              v-show="Number(scope.row.orderSubNo) <= 1 && !scope.row.stopDoctorEmpNo"
              >{{ scope.row.stopDoctor }}
            </span>
            <div class="img">
              <img
                v-show="
                  Number(scope.row.orderSubNo) <= 1 && scope.row.stopDoctorEmpNo
                "
                :src="`/crNursing/api/file/signImage/${scope.row.stopDoctorEmpNo}?${token}`"
                alt
              />
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
            <div class="img">
              <img
                v-show="
                  Number(scope.row.orderSubNo) <= 1 && scope.row.stopNurseEmpNo
                "
                :src="`/crNursing/api/file/signImage/${scope.row.stopNurseEmpNo}?${token}`"
                alt
              />
            </div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.header-con {
  .title {
    font-size: 21px;
    text-align: center;
    font-weight: bold;
    font-family: simsun, 'Times New Roman', Georgia, Serif !important;
    padding: 10px 0 10px 10px;
  }

  span {
    margin-right: 4px;
    font-size: 14px;
    color: #000;
  }

  .header-info {
    padding-top: 15px;
    padding-bottom: 10px;
  }

  .info-con {
    text-align: left;

    .bottom-line {
      display: inline-block;
      // border-bottom 1px solid #000
      padding: 2px 0 2px 2px;
      border-bottom: 1px solid #000 !important;
    }

    .bottom-line-input {
      display: inline-block;
      border: 0;
      width: 30px;
      border-bottom: 1px solid #000;
      padding: 2px 0 2px 2px;
      height: 12px;
      position: relative;
      outline: none;
      text-align: center;
    }
  }
}

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
  }

  th,td {
    font-size: 16px;
  }

  img {
    width: 100%;
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

    .rowType1, .rowType2 {
      position: relative;

      &::before, &::after {
        position: absolute;
        content: '';
        right: -10px;
      }

      &::before {
        width: 8px;
        border-top: 2px solid #000;
        top: 12px;
      }

      &::after {
        height: 8px;
        border-right: 2px solid #000;
      }
    }

    .rowType1 {
      &::after {
        top: 12px;
      }
    }

    .rowType2 {
      &::after {
        top: 4px;
      }
    }
  }
}
</style>


<script>
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
  },
  components: {},
  filters: {
    formatDate(val) {
      return val ? moment(val).format("MM-DD HH:mm") : "";
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
