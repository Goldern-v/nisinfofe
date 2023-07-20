<template>
  <div class="all-temperature-chart">
    <div class="search-topbar">
      <span class="filterItem date">
        <span class="type-label">日期:</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="small"
          format="yyyy-MM-dd"
          placeholder="开始日期"
          v-model="query.entryDate"
          clearable
        />
      </span>
      <div class="times">
        <!-- <label :for="`time${item.id}`" v-for="item in timesOdd" :key="item.id">
          <input
            type="radio"
            name="time"
            v-model="query.entryTime"
            :id="`time${item.id}`"
            :value="item.value"
          />
          {{ item.value }}
        </label> -->
        <el-select v-model="query.entryTime" size="small" placeholder="请选择">
          <el-option
            v-for="item in timesOdd"
            :key="item.value"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-box">
        <el-input
          placeholder="床号/姓名"
          icon="search"
          v-model="searchWord"
        ></el-input>
      </div>
      <div style="margin: 0px 10px 0px 10px">
        <el-radio-group v-model="admitted" size="small">
          <el-radio-button label="所有患者"></el-radio-button>
          <el-radio-button label="危重患者"></el-radio-button>
          <el-radio-button label="三天超37.5"></el-radio-button>
          <el-radio-button label="入院七天"></el-radio-button>
          <el-radio-button label= "术后三天"></el-radio-button>
        </el-radio-group>
      </div>
      <el-button @click="debounceSave">保存</el-button>
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
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.temperature"
                :class="className"
                class="temperature"
                type="number"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="pulse"
            label="脉搏"
            align="center"
            min-width="70"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.pulse"
                class="pulse"
                :class="className"
                type="number"
                @mousewheel="
                  (e) => {
                    e.preventDefault();
                  }
                "
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="breath"
            label="呼吸"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.breath"
                :class="className"
                class="breath"
                type="number"
                @mousewheel="
                  (e) => {
                    e.preventDefault();
                  }
                "
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="bloodPressure"
            label="血压"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.bloodPressure"
                :class="className"
                class="bloodPressure"
                type="text"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="heartRate"
            label="心率"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.heartRate"
                :class="className"
                class="heartRate"
                type="number"
                @mousewheel="
                  (e) => {
                    e.preventDefault();
                  }
                "
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="spo2"
            label="spo2"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.spo2"
                :class="className"
                class="sp02"
                type="text"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column> -->
          <el-table-column
            prop="physicalCooling"
            label="物理降温"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.physicalCooling"
                :class="className"
                class="physicalCooling"
                type="text"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="height"
            label="身高"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.height"
                :class="className"
                class="height"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>

          <el-table-column
            prop="curWeight"
            label="体重"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.curWeight"
                :class="className"
                class="curWeight"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
           <el-table-column
            prop="stoolNum"
            label="大便次数"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-popover
                placement="right"
                width="100px"
                trigger="focus"
                v-if="totalDictInfo['大便次数']"
                :disabled="
                  !(
                    totalDictInfo['大便次数'].options &&
                    totalDictInfo['大便次数'].options.length > 0
                  )
                "
              >
                <div
                  class="selection-dict-item"
                  v-for="(option, index) in totalDictInfo['大便次数'].options"
                  :key="index"
                  @click.prevent="
                    () => {
                      scope.row.stoolNum = option;
                    }
                  "
                >
                  {{ option }}
                </div>
                <input
                  slot="reference"
                  v-model="scope.row.stoolNum"
                  :class="className"
                  class="stoolNum"
                  type="text"
                  @keydown="handleKeyDown"
                  @keyup="handleKeyUp"
                  @click="toRow"
                />
              </el-popover>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="foodSize"
            label="入量"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.foodSize"
                :class="className"
                class="foodSize"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column> -->
           <!-- <el-table-column
            prop="dischargeSize"
            label="出量"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.dischargeSize"
                :class="className"
                class="dischargeSize"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column> -->
          <el-table-column
            prop="painScore"
            label="疼痛"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.painScore"
                :class="className"
                class="painScore"
                type="text"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="painDrop"
            label="疼痛干预"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.painDrop"
                :class="className"
                class="painDrop"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>

          <!-- <el-table-column
            prop="dischargeSize"
            label="出量"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.dischargeSize"
                :class="className"
                class="dischargeSize"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="fieldThree"
            label="尿量"
            min-width="70"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.fieldThree"
                :class="className"
                class="fieldThree"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="all-temperature-chart-print" ref="printable">
        <el-table :data="tableData" border v-loading="pageLoadng">
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
            min-width="50"
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
            min-width="50"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.pulse"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="breath"
            label="呼吸"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.breath"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="bloodPressure"
            label="血压"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.bloodPressure"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="heartRate"
            label="心率"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.heartRate"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="spo2"
            label="spo2"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.spo2"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="physicalCooling"
            label="物理降温"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.physicalCooling"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="height"
            label="身高"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.height"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="curWeight"
            label="体重"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.curWeight"></el-input>
            </template>
          </el-table-column>

          <el-table-column
            prop="stoolNum"
            label="大便次数"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.stoolNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="foodSize"
            label="入量"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.foodSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="painScore"
            label="疼痛"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.painScore"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="painDrop"
            label="疼痛干预"
            min-width="50"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.painDrop"></el-input>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.all-temperature-chart-input {
  width: 100%;
  padding: 2px 5px;
  margin: 0;
  line-height: 20px;
  border: 1px solid #ccc;
  border-color: #ccc;
  border-radius: 2px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  font-size: 14px;

  &:focus {
    border-color: #4bb08d;
    background-color: #9adcc5;
  }
}

.el-table th > .cell {
  color: red;
  padding: 0;
}

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

.el-table th > .cell {
  padding: 0;
}

.el-table .cell, .el-table th > div {
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  text-overflow: ellipsis;
}

@page {
  margin: 0 10mm;
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import { getPatientsInfo, saveOverAllTemperture,getmultiDict } from "../api/api";
import moment from "moment";
import print from "printing";
import formatter from "../print-formatter";
import { _debounce } from "../save-formatter";
export default {
  mixins: [common],
  props: {},
  data() {
    return {
      isSelectedPatient: "",
      patientList: [],
      isSelectedNurs: "",
      handleKeyCode: [37, 38, 39, 40, 13],
      colClass: "",
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now() - 8.64e6;
      //   },
      // },
      nursingList: [],
      totalDictInfo: {},
      query: {
        wardCode: "", //科室编码
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
          switch (this.HOSPITAL_ID) {
            case "whsl":
              if (this.getHours() >= 0 && this.getHours() <= 4) {
                return "03";
              }
              if (this.getHours() > 4 && this.getHours() <= 8) {
                return "07";
              }
              if (this.getHours() > 8 && this.getHours() <= 12) {
                return "11";
              }
              if (this.getHours() > 12 && this.getHours() <= 16) {
                return "15";
              }
              if (this.getHours() > 16 && this.getHours() <= 20) {
                return "19";
              }
              if (this.getHours() > 20 && this.getHours() <= 23) {
                return "23";
              }
            default:
              return "08";
          }
        })(), //录入时间
      },

      timesOdd: [
        {
          id: 0,
          value: "00",
        },
        {
          id: 1,
          value: "01",
        },
        {
          id: 2,
          value: "02",
        },
        {
          id: 3,
          value: "03",
        },
        {
          id: 4,
          value: "04",
        },
        {
          id: 5,
          value: "05",
        },
        {
          id: 6,
          value: "06",
        },
        {
          id: 7,
          value: "07",
        },
        {
          id: 8,
          value: "08",
        },
        {
          id: 9,
          value: "09",
        },
        {
          id:10,
          value: "10",
        },
        {
          id:11,
          value: "11",
        },
        {
          id:12,
          value: "12",
        },
        {
          id:13,
          value: "13",
        },
        {
          id:14,
          value: "14",
        },
        {
          id:15,
          value: "15",
        },
        {
          id:16,
          value: "16",
        },
        {
          id:17,
          value: "17",
        },
        {
          id:18,
          value: "18",
        },
        {
          id:19,
          value: "19",
        },
        {
          id:20,
          value: "20",
        },
        {
          id:21,
          value: "21",
        },
        {
          id:22,
          value: "22",
        },
        {
          id:23,
          value: "23",
        }
      ],

      patientsInfoData: [],
      searchWord: "",
      admitted: "所有患者",
      pageLoadng: false,
    };
  },
  computed: {
    className() {
      return ["all-temperature-chart-input"].join(" ");
    },
    tableData: {
      get() {
         return this.patientsInfoData.filter((item) => {
              return this.admitted === "所有患者"
                ? (item.bedLabel.indexOf(this.searchWord) > -1 ||
                    item.name.indexOf(this.searchWord) > -1) &&
                    item.patientId
                : this.admitted === "危重患者"
                ? ((item.bedLabel.indexOf(this.searchWord) > -1 ||
                    item.name.indexOf(this.searchWord) > -1) &&
                    item.patientId &&
                    item.patientCondition === "病危") ||
                  item.patientCondition === "病重"
                :this.admitted === "三天超37.5"
                ?(item.bedLabel.indexOf(this.searchWord) > -1 ||
                    item.name.indexOf(this.searchWord) > -1) &&
                    item.temperatureFlag==1
                :this.admitted === "术后三天"
                ? (item.bedLabel.indexOf(this.searchWord) > -1 ||
                    item.name.indexOf(this.searchWord) > -1) &&
                    item.operationFlag==1
                : (item.bedLabel.indexOf(this.searchWord) > -1 ||
                    item.name.indexOf(this.searchWord) > -1) &&
                  item.patientId &&
                  moment(item.admissionDate.slice(0, 10)).isAfter(
                    moment().subtract(7, "days").format("YYYY-MM-DD")
                  )
            })
      },
      set(value) {
        // this.tableData = value;
      },
    },
  },
  mounted() {
    this.query.wardCode = this.deptCode;
    console.log('this.deptCode',this.deptCode)
     getmultiDict(this.deptCode).then((res) => {
      res.data.data.map((item, index) => {
        this.totalDictInfo[item.vitalSign] = {
          ...item,
          options: item.selectType ? item.selectType.split(",") : [],
        };
      });
    });
  },
  created() {},
  methods: {
    //保存防抖函数
    debounceSave: _debounce("saveAllTemperture", 500),
    getHours() {
      let date = new Date();
      let b = date.getHours();
      return b;
    },
    async getData() {
      if (!this.deptCode) {
        return;
      }
      await this.reset(); //重置数组
      let data = Object.assign({}, this.query);
      data.entryDate = data.entryDate
        ? moment(data.entryDate).format("YYYY/MM/DD ")
        : moment(new Date()).format("YYYY/MM/DD");
      this.pageLoadng = true;
      await getPatientsInfo(data).then((res) => {
        this.patientsInfoData = res.data.data;
         this.pageLoadng = false;
      });
    },

    reset() {
      this.patientList = [];
      this.patientsInfoData = [];
      this.heightTemperature = [];
      this.tableData = [];
    },
    saveAllTemperture() {
      this.pageLoadng = true;
      let data = {
        blockId: "",
        urinate: "", //小便次数
        arterialPressure: "", //有创动脉收缩压
        heigh: "",
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
        food: "",
        foodSize: "",
        id: "",
        physicalCooling: "",
        // spo2: "",
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
        stoolNum: "",
        fieldThree: "",
        height: "",
        painScore:"",
        painDrop:""
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
      saveOverAllTemperture(tempertureData).then((res) => {
        if (res.data.code === "200" && res.data.desc === "操作成功") {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
        this.getData();
      });
    },
    handleKeyDown(e) {
      if (this.handleKeyCode.includes(e.keyCode)) {
        this.colClass = e.target.className;
        console.log(e.keyCode);
        //回车保存
        if (e.keyCode === 13) {
          this.debounceSave();
        }
        if (e.keyCode === 37) {
          //处理左按键

          let inputEls = document.getElementsByClassName(
            "all-temperature-chart-input"
          );
          let currentIdx = 0;
          for (var i = 0; i < inputEls.length; ++i) {
            if (e.target === inputEls[i]) currentIdx = i;
          }
          let prevIdx = currentIdx - 1;
          inputEls[prevIdx] && inputEls[prevIdx].focus();
        } else if (e.keyCode === 39) {
          //处理右按键

          // if (e.target.selectionEnd === e.target.value.length) {
          // 如果光标在末尾，跳转后一个输入框
          let inputEls = document.getElementsByClassName(
            "all-temperature-chart-input"
          );
          let currentIdx = 0;
          for (var i = 0; i < inputEls.length; ++i) {
            if (e.target === inputEls[i]) currentIdx = i;
          }
          let nextIdx = currentIdx + 1;
          inputEls[nextIdx] && inputEls[nextIdx].focus();
          // }
        } else {
          //处理上下按键，跳转相同类名的输入框
          let inputEls = document.getElementsByClassName(e.target.className);
          let currentIdx = 0;

          for (var i = 0; i < inputEls.length; ++i) {
            if (e.target === inputEls[i]) currentIdx = i;
          }
          if (e.keyCode === 38) {
            e.preventDefault();
            currentIdx--;
          } else if (e.keyCode === 40) {
            e.preventDefault();
            currentIdx++;
          }
          inputEls[currentIdx] && inputEls[currentIdx].focus();
        }
      }
    },
    toRow(e) {
      let rowIndex = e.path[3].rowIndex;
      var trs = e.path[4].getElementsByTagName("tr");
      for (let i = 0; i < trs.length; i++) {
        if (rowIndex === i) {
          trs[i].style.backgroundColor = "green";
        } else {
          trs[i].style.backgroundColor = "";
        }
      }
    },
    handleKeyUp(e) {
      let rowIndex = e.path[3].rowIndex;
      var trs = e.path[4].getElementsByTagName("tr");
      for (let i = 0; i < trs.length; i++) {
        if (rowIndex === i) {
          trs[i].style.backgroundColor = "green";
        } else {
          trs[i].style.backgroundColor = "";
        }
      }
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
    // CustomInput,
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
