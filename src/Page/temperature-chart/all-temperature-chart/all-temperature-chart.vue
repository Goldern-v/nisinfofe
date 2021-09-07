<template>
  <div class="all-temperature-chart">
    <div class="search-topbar">
      <span class="filterItem date">
        <span class="type-label">日期:</span>
        <ElDatePicker
          v-if="HOSPITAL_ID !== 'guizhou'"
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="query.entryDate"
          clearable
        />
        <ElDatePicker
          v-if="HOSPITAL_ID === 'guizhou'"
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="query.entryDate"
          clearable
        />
      </span>
      <div
        class="times"
        v-if="HOSPITAL_ID === 'huadu' || HOSPITAL_ID === 'fuyou'||HOSPITAL_ID === 'beihairenyi'"
      >
        <label :for="`time${item.id}`" v-for="item in timesEven" :key="item.id">
          <input
            type="radio"
            name="time"
            v-model="query.entryTime"
            :id="`time${item.id}`"
            :value="item.value"
          />
          {{ item.value }}
        </label>
      </div>
      <div class="times" v-if="HOSPITAL_ID === 'hengli'">
        <label
          :for="`time${item.id}`"
          v-for="item in timeshengli"
          :key="item.id"
        >
          <input
            type="radio"
            name="time"
            v-model="query.entryTime"
            :id="`time${item.id}`"
            :value="item.value"
          />
          {{ item.value }}
        </label>
      </div>
      <div class="times" v-if="HOSPITAL_ID === 'quzhou'">
        <label
          :for="`time${item.id}`"
          v-for="item in timesquZhou"
          :key="item.id"
        >
          <input
            type="radio"
            name="time"
            v-model="query.entryTime"
            :id="`time${item.id}`"
            :value="item.value"
          />
          {{ item.value }}
        </label>
      </div>
      <div
        class="times"
        v-if="HOSPITAL_ID === 'zhongshanqi' || HOSPITAL_ID === 'guizhou'"
      >
        <label
          :for="`time${item.id}`"
          v-for="item in timesEven2"
          :key="item.id"
        >
          <input
            type="radio"
            name="time"
            v-model="query.entryTime"
            :id="`time${item.id}`"
            :value="item.value"
          />
          {{ item.value }}
        </label>
      </div>
      <div class="times" v-if="HOSPITAL_ID === 'liaocheng'">
        <label :for="`time${item.id}`" v-for="item in timesOdd" :key="item.id">
          <input
            type="radio"
            name="time"
            v-model="query.entryTime"
            :id="`time${item.id}`"
            :value="item.value"
          />
          {{ item.value }}
        </label>
      </div>
      <div class="search-box">
        <el-input
          placeholder="床号/姓名"
          icon="search"
          v-model="searchWord"
        ></el-input>
      </div>

      <el-button @click="saveAllTemperture">保存</el-button>
      <el-button @click="onPrint">打印</el-button>
    </div>
    <div class="table-content">
      <div class="edit-table">
        <el-table
          :data="tableData"
          :height="wih - 112"
          border
          v-loading="pageLoadng"
          cell-mouse-enter
          
        >
          <el-table-column
            prop="bedLabel"
            label="床号"
            min-width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            min-width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            min-width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="admissionDate"
            label="入院日期"
            min-width="180"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.admissionDate.slice(0, -3) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="entryDay"
            label="周/日"
            min-width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="temperature"
            label="体温"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.temperature"></el-input> -->
              <custom-input
                v-model="scope.row.temperature"
                colClass="temperature"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="pulse"
            label="脉搏"
            align="center"
            min-width="80"
          >
            <template slot-scope="scope">
              <custom-input v-model="scope.row.pulse" colClass="pulse" />
              <!-- <el-input v-model="scope.row.pulse"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="breath"
            label="呼吸"
            min-width=""
            align="center"
          >
            <template slot-scope="scope">
              <custom-input v-model="scope.row.breath" colClass="breath" />
              <!-- <el-input v-model="scope.row.breath"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID !== 'quzhou'"
            prop="bloodPressure"
            label="血压"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.bloodPressure"
                colClass="bloodPressure"
              />
              <!-- <el-input v-model="scope.row.bloodPressure"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID === 'quzhou'"
            prop="amBp"
            label="上午血压"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.amBp"
                colClass="bloodPressure"
              />
              <!-- <el-input v-model="scope.row.bloodPressure"></el-input> -->
            </template>
          </el-table-column>
           <el-table-column
           v-if="HOSPITAL_ID === 'quzhou'"
            prop="pmBp"
            label="下午血压"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.pmBp"
                colClass="bloodPressure"
              />
              <!-- <el-input v-model="scope.row.bloodPressure"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="stoolNum"
            label="大便次数"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input v-model="scope.row.stoolNum" colClass="stoolNum" />
              <!-- <el-input v-model="scope.row.stoolNum"></el-input> -->
            </template>
          </el-table-column>
           <el-table-column
            v-if="HOSPITAL_ID !== 'quzhou'"
            prop="heartRate"
            label="心率"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.heartRate"
                colClass="heartRate"
              />
              <!-- <el-input v-model="scope.row.heartRate"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
           v-if="HOSPITAL_ID === 'quzhou'"
            prop="heartRate"
            label="短绌心率"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.heartRate"
                colClass="heartRate"
              />
              <!-- <el-input v-model="scope.row.heartRate"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
           v-if="HOSPITAL_ID !== 'quzhou'"
            prop="fieldThree"
            label="尿量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.fieldThree"
                colClass="fieldThree"
              />
              <!-- <el-input v-model="scope.row.fieldThree"></el-input> -->
            </template>
          </el-table-column>
           <el-table-column
            v-if="HOSPITAL_ID === 'quzhou'"
            prop="drainage"
            label="引流量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.drainage"
                colClass="fieldThree"
              />
              <!-- <el-input v-model="scope.row.fieldThree"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID !== 'quzhou'"
            prop="foodSize"
            label="入量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input v-model="scope.row.foodSize" colClass="foodSize" />
              <!-- <el-input v-model="scope.row.foodSize"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID === 'quzhou'"
            prop="foodSize"
            label="总入量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input v-model="scope.row.foodSize" colClass="foodSize" />
              <!-- <el-input v-model="scope.row.foodSize"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID !== 'quzhou'"
            prop="dischargeSize"
            label="出量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.dischargeSize"
                colClass="dischargeSize"
              />
              <!-- <el-input v-model="scope.row.dischargeSize"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID === 'quzhou'"
            prop="dischargeSize"
            label="总出量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.dischargeSize"
                colClass="dischargeSize"
              />
              <!-- <el-input v-model="scope.row.dischargeSize"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
          v-if="HOSPITAL_ID === 'quzhou'"
            prop="height"
            label="身高"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.height"
                colClass="curWeight"
              />
              <!-- <el-input v-model="scope.row.curWeight"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="curWeight"
            label="体重"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.curWeight"
                colClass="curWeight"
              />
              <!-- <el-input v-model="scope.row.curWeight"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            v-if="HOSPITAL_ID === 'guizhou'||HOSPITAL_ID === 'quzhou'"
            prop="nursingEvent"
            label="护理事件"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.nursingEvent"
                colClass="curWeight"
              />
              <!-- <el-input v-model="scope.row.curWeight"></el-input> -->
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="height"
            label="身高"
            min-width="60"
            align="center"
          > -->
          <!-- <template slot-scope="scope"> -->
          <!-- <custom-input v-model="scope.row.height" colClass="height" /> -->
          <!-- <el-input v-model="scope.row.height"></el-input> -->
          <!-- </template> -->
          <!-- </el-table-column> -->
          <el-table-column
            v-if="HOSPITAL_ID === 'liaocheng'"
            prop="painScore"
            label="疼痛"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <custom-input
                v-model="scope.row.painScore"
                colClass="painScore"
              />
              <!-- <el-input v-model="scope.row.painScore"></el-input> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="all-temperature-chart-print" ref="printable">
        <el-table :data="tableData" border v-loading="pageLoadng" >
          <el-table-column
            prop="bedLabel"
            label="床号"
            min-width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            min-width="100"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            min-width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="admissionDate"
            label="入院日期"
            min-width="180"
            align="center"
          >
            <template slot-scope="scope">
              <div>{{ scope.row.admissionDate.slice(0, -3) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="entryDay"
            label="周/日"
            min-width="60"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="temperature"
            label="体温"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.temperature"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="pulse"
            label="脉搏"
            align="center"
            min-width="60"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.pulse"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="breath"
            label="呼吸"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.breath"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="bloodPressure"
            label="血压"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.bloodPressure"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="heartRate"
            label="心率"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.heartRate"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="fieldThree"
            label="尿量"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.fieldThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="foodSize"
            label="入量"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.foodSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="dischargeSize"
            label="出量"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.dischargeSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="curWeight"
            label="体重"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.curWeight"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="height"
            label="身高"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.height"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="stoolNum"
            label="大便次数"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.stoolNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            v-if="HOSPITAL_ID === 'liaocheng'"
            prop="painScore"
            label="疼痛"
            min-width="60"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.painScore"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
.all-temperature-chart {
  position: relative;

  .search-topbar {
    font-size: 13px;
    height: 41px;
    background-image: linear-gradient(-180deg, #f8f8fa 0%, #ebecf0 100%);
    border-bottom: 1px solid #cbd5dd;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 10px;

    .type-label {
      vertical-align: middle;
    }

    .type-content {
      margin-right: 15px;

      input {
        height: 31px;
      }
    }

    .date {
      margin-right: 15px;
    }

    .search-box {
      width: 168px;
      margin-right: 10px;

      >>>&.el-input {
        margin-bottom: 5px;
      }

      >>>.el-input__inner {
        height: 30px;
        outline: none;
        padding-left: 10px;
        background: #fff;
        border-radius: 4px;
        font-size: 12px !important;
        color: #333;
      }
    }
  }

  .times {
    margin-right: 5px;
    display: flex;

    label {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;

      input {
        margin-top: 0;
      }
    }
  }

  .el-button {
    font-size: 12px;
  }

  >>>.el-table {
    border: 1px solid #cbd5dd;
    border-bottom: 0;

    td {
      height: 34px;
    }

    .el-input__inner {
      height: 100%;
    }
  }

  .all-temperature-chart-print {
    /* visibility: hidden; */
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 1040px;
  }
}
</style>
<style lang="stylus">
@media print {
  .all-temperature-chart-print {
    .page-box {
      padding-top: 40px !important;
      box-sizing: border-box;
    }

    .el-table th {
      height: 30px;

      .cell {
        font-size: 12px;
        font-weight: 400;
        color: #000;
        background: #fff;
      }
    }

    .el-table {
      border: none !important;

      &::before, &::after {
        height: 0;
      }

      table {
        width: 100% !important;
      }

      th {
        border: 1px solid #000 !important;
      }

      td {
        height: 34px;
        border-right: 1px solid #000 !important;
        border-bottom: 1px solid #000 !important;
        border-left: 1px solid #000 !important;
      }

      .el-input__inner {
        height: 24px;
        border-color: #000;
      }

      .cell {
        padding: 0 5px;
      }

      .el-table__header-wrapper, .el-table__body-wrapper {
        // margin-top: -1px;
        margin-left: 0;
      }

      .el-table__body-wrapper {
        height: auto !important;
      }
    }
  }
  
}

@page {
  margin: 0 10mm;
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import { getPatientsInfo, saveOverAllTemperture } from "../api/api";
import moment from "moment";
import print from "printing";
import formatter from "../print-formatter";
import CustomInput from "./components/CustomInput.vue";

export default {
  mixins: [common],
  props: {},
  data() {
    return {
      isSelectedPatient: "",
      patientList: [],
      isSelectedNurs: "",
      nursingList: [],
      query: {
        wardCode: "", //科室编码
        entryDate:
          this.HOSPITAL_ID === "guizhou"
            ? moment(new Date()).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
          switch (this.HOSPITAL_ID) {
            case "huadu":
              if (this.getHours() >= 1 && this.getHours() <= 4) {
                return "04";
              }
              if (this.getHours() > 4 && this.getHours() <= 8) {
                return "08";
              }
              if (this.getHours() > 8 && this.getHours() <= 12) {
                return "12";
              }
              if (this.getHours() > 12 && this.getHours() <= 16) {
                return "16";
              }
              if (this.getHours() > 16 && this.getHours() <= 20) {
                return "20";
              }
              if (
                (this.getHours() > 20 && this.getHours() <= 23) ||
                this.getHours() === 0
              ) {
                return "23";
              }
              case "beihairenyi":
              if (this.getHours() >= 1 && this.getHours() <= 4) {
                return "04";
              }
              if (this.getHours() > 4 && this.getHours() <= 8) {
                return "08";
              }
              if (this.getHours() > 8 && this.getHours() <= 12) {
                return "12";
              }
              if (this.getHours() > 12 && this.getHours() <= 16) {
                return "16";
              }
              if (this.getHours() > 16 && this.getHours() <= 20) {
                return "20";
              }
              if (
                (this.getHours() > 20 && this.getHours() <= 23) ||
                this.getHours() === 0
              ) {
                return "23";
              }
            case "fuyou":
              if (this.getHours() >= 1 && this.getHours() <= 4) {
                return "04";
              }
              if (this.getHours() > 4 && this.getHours() <= 8) {
                return "08";
              }
              if (this.getHours() > 8 && this.getHours() <= 12) {
                return "12";
              }
              if (this.getHours() > 12 && this.getHours() <= 16) {
                return "16";
              }
              if (this.getHours() > 16 && this.getHours() <= 20) {
                return "20";
              }
              if (
                (this.getHours() > 20 && this.getHours() <= 23) ||
                this.getHours() === 0
              ) {
                return "23";
              }
            case "quzhou":
              if (this.getHours() >= 0 && this.getHours() <= 2) {
                return "02";
              }
              if (this.getHours() > 2 && this.getHours() <= 6) {
                return "06";
              }
              if (this.getHours() > 6 && this.getHours() <= 10) {
                return "10";
              }
              if (this.getHours() > 10 && this.getHours() <= 14) {
                return "14";
              }
              if (this.getHours() > 14 && this.getHours() <= 18) {
                return "18";
              }
              if (this.getHours() > 18 && this.getHours() <= 23) {
                return "22";
              }
            case "hengli":
              if (this.getHours() >= 0 && this.getHours() <= 3) {
                return "03";
              }
              if (this.getHours() > 3 && this.getHours() <= 7) {
                return "07";
              }
              if (this.getHours() > 7 && this.getHours() <= 11) {
                return "11";
              }
              if (this.getHours() > 11 && this.getHours() <= 15) {
                return "15";
              }
              if (this.getHours() > 15 && this.getHours() <= 19) {
                return "19";
              }
              if (this.getHours() > 19 && this.getHours() <= 23) {
                return "23";
              }
            case "guizhou":
              if (this.getHours() >= 0 && this.getHours() <= 2) {
                return "02";
              }
              if (this.getHours() > 2 && this.getHours() <= 6) {
                return "06";
              }
              if (this.getHours() > 6 && this.getHours() <= 10) {
                return "10";
              }
              if (this.getHours() > 10 && this.getHours() <= 14) {
                return "14";
              }
              if (this.getHours() > 14 && this.getHours() <= 18) {
                return "18";
              }
              if (this.getHours() > 18 && this.getHours() <= 23) {
                return "22";
              }
            default:
              return "07";
          }
        })(), //录入时间
      },
      timesEven: [
        {
          id: 0,
          value: "04",
        },
        {
          id: 1,
          value: "08",
        },
        {
          id: 2,
          value: "12",
        },
        {
          id: 3,
          value: "16",
        },
        {
          id: 4,
          value: "20",
        },
        {
          id: 5,
          value: "23",
        },
      ],
      timesEven2: [
        {
          id: 0,
          value: "02",
        },
        {
          id: 1,
          value: "06",
        },
        {
          id: 2,
          value: "10",
        },
        {
          id: 3,
          value: "14",
        },
        {
          id: 4,
          value: "18",
        },
        {
          id: 5,
          value: "22",
        },
      ],
      timesquZhou: [
        {
          id: 0,
          value: "02",
        },
        {
          id: 1,
          value: "06",
        },
        {
          id: 2,
          value: "10",
        },
        {
          id: 3,
          value: "14",
        },
        {
          id: 4,
          value: "18",
        },
        {
          id: 5,
          value: "22",
        },
      ],
      timeshengli: [
        {
          id: 0,
          value: "03",
        },
        {
          id: 1,
          value: "07",
        },
        {
          id: 2,
          value: "11",
        },
        {
          id: 3,
          value: "15",
        },
        {
          id: 4,
          value: "19",
        },
        {
          id: 5,
          value: "23",
        },
      ],
      timesOdd: [
        {
          id: 0,
          value: "03",
        },
        {
          id: 1,
          value: "07",
        },
        {
          id: 2,
          value: "11",
        },
        {
          id: 3,
          value: "15",
        },
        {
          id: 4,
          value: "19",
        },
        {
          id: 5,
          value: "23",
        },
      ],
      patientsInfoData: [],
      searchWord: "",
      pageLoadng: true,
    };
  },
  computed: {
    tableData() {
      return this.patientsInfoData.filter((item) => {
        return (
          (item.bedLabel.indexOf(this.searchWord) > -1 ||
            item.name.indexOf(this.searchWord) > -1) &&
          item.patientId
        );
      });
    },
  },
  mounted() {
    this.query.wardCode = this.deptCode;
  },
  methods: {

    handlePatientChange() {},
    selectedNurs() {},
    getHours() {
      let date = new Date();
      let b = date.getHours();
      return b;
    },
    getData() {
      if (!this.deptCode) {
        return;
      }
      let data = Object.assign({}, this.query);
      if (this.HOSPITAL_ID === "guizhou") {
        data.entryDate = data.entryDate
          ? moment(data.entryDate).format("YYYY/MM/DD ")
          : moment(new Date()).format("YYYY/MM/DD ");
        this.pageLoadng = true;
      } else {
        data.entryDate = data.entryDate
          ? moment(data.entryDate).format("YYYY/MM/DD ")
          : moment(new Date()).format("YYYY/MM/DD");
        this.pageLoadng = true;
      }

      getPatientsInfo(data).then((res) => {
        this.patientsInfoData = res.data.data;
        this.pageLoadng = false;
      });
    },
    saveAllTemperture() {
      let data = {
        blockId: "",
        amBp:""	,//上午血压
        pmBp:""	,//下午血压
        drainage:"",	//引流量
        heigh:"",
        patientId: "",
        visitId: "",
        audit: "",
        auditorName: "",
        auditorNo: "",
        bloodPressure: "",
        breath: "",
        consciousness: "",
        dataHash: "",
        description: "",
        discharge: "",
        dischargeSize: "",
        empNo: "",
        fieldFive: "",
        fieldFour: "",
        fieldOne: "",
        fieldSix: "",
        fieldThree: "",
        fieldTwo: "",
        food: "",
        foodSize: "",
        id: "",
        monthHour: "",
        multiSign: "",
        pulse: "",
        pupilReflexLeft: "",
        pupilReflexRight: "",
        pupilSizeLeft: "",
        pupilSizeRight: "",
        recordDate: "",
        recordHour: "",
        recordMonth: "",
        recordYear: "",
        sign: "",
        signerName: "",
        signerNo: "",
        status: "0",
        temperature: "",
        curWeight: "",
        recordSource: 2,
        heartRate: "",
        painScore: "",
        stoolNum: "",
        nursingEvent:"",
        height:"",
      };
      let list = this.tableData.map((item) => {
        let obj = {};
        for (let key in data) {
          obj[key] = item[key] || data[key];
        }
        return obj;
      });

      let tempertureData = {
        ...this.query,
        list,
      };
      tempertureData.entryDate = tempertureData.entryDate
        ? moment(tempertureData.entryDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
        console.log(tempertureData)
      saveOverAllTemperture(tempertureData).then((res) => {
        this.getData();
      });
    },
    async onPrint() {
      this.pageLoadng = true;
      this.$nextTick(async () => {
        await print(this.$refs.printable, {
          beforePrint: formatter,
          direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
        .fixedTh {
          display: none !important;
          height: auto;
        }
        pre {
          white-space: pre-wrap;
        }
        table {
          width: 95% !important;
        }
        `,
        });
      });
      this.pageLoadng = false;
    },
  },
  components: {
    CustomInput,
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.query.wardCode = val;
      }
    },
    query: {
      handler(newName, oldName) {
        this.getData();
      },
      deep: true,
    },
  },
};
</script>
