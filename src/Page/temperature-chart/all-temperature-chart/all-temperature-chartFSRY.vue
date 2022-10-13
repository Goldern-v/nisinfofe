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
        <label
          :for="`time${item.id}`"
          v-for="item in timesPoint"
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
      <div class="search-box">
        <el-input
          placeholder="床号/姓名"
          icon="search"
          v-model="searchWord"
        ></el-input>
      </div>
      <div class="filterButton">
        <span>时间筛选关</span>
        <el-switch v-model="query.startFiltering"> </el-switch>
        <span>时间筛选开</span>
      </div>
      <div style="margin: 0px 10px 0px 10px" v-if="!query.startFiltering">
        <el-radio-group v-model="admitted" size="small">
          <el-radio-button label="所有患者"></el-radio-button>
          <el-radio-button label="一周体重"></el-radio-button>
          <el-radio-button label="三天未大便"></el-radio-button>
        </el-radio-group>
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
            v-if="levelColorHis.includes(HOSPITAL_ID)"
            prop="nursingClass"
            label="护理等级"
            min-width="90"
            align="center"
          >
            <template slot-scope="scope">
              <div :style="rowStyle(scope.row)">
                {{ scope.row.nursingClass }}
              </div>
            </template>
          </el-table-column>
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
              <input
                v-model="scope.row.temperature"
                :class="className"
                class="temperature"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                type="text"
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
            min-width="80"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.pulse"
                class="pulse"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                :class="className"
                type="text"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="breath"
            label="呼吸"
            min-width=""
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.breath"
                :class="className"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                class="breath"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
              <!-- <input v-model="scope.row.breath" class="breath" /> -->
              <!-- <el-input v-model="scope.row.breath"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="bloodPressure"
            label="血压"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.bloodPressure"
                :class="className"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                class="bloodPressure"
                type="text"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"
                @click="toRow"
              />
              <!-- <input v-model="scope.row.bloodPressure" class="bloodPressure" /> -->
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
              <el-popover
                placement="right"
                width="100px"
                trigger="focus"
                :disabled="
                  !(
                    shitOption &&
                    shitOption.length > 0 &&
                    !isReadonly(scope.row.recordDate)
                  )
                "
              >
                <div
                  class="selection-dict-item"
                  v-for="(option, index) in shitOption"
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
                  :readonly="isReadonly(scope.row.recordDate)"
                  :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                  class="stoolNum"
                  type="text"
                  @keydown="handleKeyDown"
                  @keyup="handleKeyUp"
                  @click="toRow"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="heartRate"
            label="心率"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.heartRate"
                :class="className"
                class="heartRate"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
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
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.fieldThree"
                :class="className"
                class="fieldThree"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="foodSize"
            label="入量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.foodSize"
                :class="className"
                class="foodSize"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="dischargeSize"
            label="出量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.dischargeSize"
                :class="className"
                class="dischargeSize"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
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
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <input
                v-model="scope.row.curWeight"
                :class="className"
                class="curWeight"
                :readonly="isReadonly(scope.row.recordDate)"
                :placeholder="isReadonly(scope.row.recordDate) ? '只读' : ''"
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
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
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
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
            min-width="80"
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
            min-width="150"
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

.selection-dict-item {
  height: 24px;
  line-height: 24px;
  padding: 0 5px;

  &:hover {
    background: rgb(111, 192, 164) !important;
    color: #fff !important;
  }
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

  .filterButton {
    color: rgb(103, 174, 143);
    font-size: 16px;
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
import {
  getPatientsInfo,
  saveOverAllTemperture,
  getmultiDict
} from "../api/api";
import moment from "moment";
import print from "printing";
import formatter from "../print-formatter";
import CustomInput from "./components/CustomInput.vue";
import { listItem } from "@/api/common.js";

export default {
  mixins: [common],
  props: {},
  data() {
    return {
      levelColor: null, //等级颜色
      levelColorHis: ["wujing"], //显示护理等级及颜色医院his列表
      isSelectedPatient: "",
      patientList: [],
      isSelectedNurs: "",
      handleKeyCode: [37, 38, 39, 40, 13],
      colClass: "",
      totalDictInfo: {},
      shitOption: [
        "灌肠",
        "失禁",
        "人工肛门",
        "腹泻",
        "※",
        "☆",
        "E",
        "1/E",
        "2/E",
        "0/E",
        "1 2/E",
        "*/E",
        "☆/E",
        "3/2E"
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      nursingList: [],
      query: {
        wardCode: "", //科室编码
        startFiltering: false,
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
          switch (this.HOSPITAL_ID) {
            case "zhzxy":
              if (this.getHours() >= 1 && this.getHours() <= 3) {
                return "03";
              }
              if (this.getHours() > 3 && this.getHours() <= 7) {
                return "07";
              }
              if (this.getHours() > 7 && this.getHours() <=11 ) {
                return "11";
              }
              if (this.getHours() > 11 && this.getHours() <= 17) {
                return "15";
              }
              if (this.getHours() > 17 && this.getHours() <= 21) {
                return "19";
              }
              if (
                (this.getHours() > 21 && this.getHours() <= 23) ||
                this.getHours() === 0
              ) {
                return "23";
              }
            default:
            if (this.getHours() >= 0 && this.getHours() <= 4) {
                return "02";
              }
              if (this.getHours() > 4 && this.getHours() <= 8) {
                return "06";
              }
              if (this.getHours() > 8 && this.getHours() <= 12) {
                return "10";
              }
              if (this.getHours() > 12 && this.getHours() <= 16) {
                return "14";
              }
              if (this.getHours() > 16 && this.getHours() <= 20) {
                return "18";
              }
              if (this.getHours() > 20 && this.getHours() <= 23) {
                return "22";
              }
          }
        })(), //录入时间
      },
      timesPoint: (() => {
        switch (this.HOSPITAL_ID) {
          case "zhzxy":
            return [
              {
                id: 0,
                value: "03"
              },
              {
                id: 1,
                value: "07"
              },
              {
                id: 2,
                value: "11"
              },
              {
                id: 3,
                value: "15"
              },
              {
                id: 4,
                value: "19"
              },
              {
                id: 5,
                value: "23"
              }
            ];
            default:
            return [
              {
                id: 0,
                value: "02"
              },
              {
                id: 1,
                value: "06"
              },
              {
                id: 2,
                value: "10"
              },
              {
                id: 3,
                value: "14"
              },
              {
                id: 4,
                value: "18"
              },
              {
                id: 5,
                value: "22"
              }
            ];
        }
      })(),
      patientsInfoData: [],
      searchWord: "",
      pageLoadng: true,
      admitted: "所有患者"
    };
  },
  computed: {
    className() {
      return ["all-temperature-chart-input"].join(" ");
    },
    tableData: {
      get() {
        return this.patientsInfoData.filter(item => {
          return this.admitted === "所有患者"
            ? (item.bedLabel.indexOf(this.searchWord) > -1 ||
                item.name.indexOf(this.searchWord) > -1) &&
                item.patientId
            : this.admitted === "一周体重"
            ? (item.bedLabel.indexOf(this.searchWord) > -1 ||
                item.name.indexOf(this.searchWord) > -1) &&
              item.patientId &&
              item.noWeightFlag == 1
            : (item.bedLabel.indexOf(this.searchWord) > -1 ||
                item.name.indexOf(this.searchWord) > -1) &&
              item.patientId &&
              item.notDefecateFlag == 1;
        });
      },
      set(value) {}
    }
  },
  mounted() {
    this.query.wardCode = this.deptCode;
    getmultiDict(this.query.wardCode).then(res => {
      res.data.data.map((item, index) => {
        this.totalDictInfo[item.vitalSign] = {
          ...item,
          options: item.selectType ? item.selectType.split(",") : []
        };
      });
    });
  },
  created() {
    window.addEventListener("keydown", this.keydownSave, false);
  },
  methods: {
    //行样式
    rowStyle(row) {
      if (!this.levelColorHis.includes(this.HOSPITAL_ID)) {
        return {};
      }
      switch (this.HOSPITAL_ID) {
        case "wujing":
          return {
            backgroundColor: this.getBaColor(row),
            color: "white"
          };
        default:
          return {
            backgroundColor: this.getBaColor(row),
            color: "white"
          };
      }
    },
    //费整点的患者数据只允许查看不许修改
    isReadonly(recordDate) {
      recordDate = moment(recordDate).format("YYYY-MM-DD HH:mm:ss");
      return (
        recordDate !==
        `${moment(this.query.entryDate).format("YYYY-MM-DD")} ${
          this.query.entryTime
        }:00:00`
      );
    },
    //获取对应护理等级背景颜色
    getBaColor(row) {
      if (this.levelColor && row && row.nursingClass) {
        return this.levelColor.find(item => item.code == row.nursingClass)
          ? this.levelColor.find(item => item.code == row.nursingClass).name
          : null;
      } else {
        return "";
      }
    },
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
      this.reset(); //重置数组
      let data = Object.assign({}, this.query);
      data.entryDate = data.entryDate
        ? moment(data.entryDate).format("YYYY/MM/DD ")
        : moment(new Date()).format("YYYY/MM/DD");
      this.pageLoadng = true;
      data.startFiltering = data.startFiltering ? "1" : "0";
      getPatientsInfo(data).then(async res => {
        this.patientsInfoData = res.data.data;
        this.pageLoadng = false;
        try {
          const {
            data: { data: levelColor }
          } = await listItem("nursing_level");
          this.levelColor = levelColor;
        } catch (error) {
          console.log(error);
        }
      });
    },
    reset() {
      this.patientList = [];
      this.patientsInfoData = [];
      this.tableData = [];
    },
    keydownSave(e) {
      if (
        e.keyCode === 13 &&
        this.$route.path.includes("allTemperatureChart") &&
        !["guizhou"].includes(this.HOSPITAL_ID)
      ) {
        this.saveAllTemperture();
      } else {
        return;
      }
    },
    saveAllTemperture() {
      this.pageLoadng = true;
      let data = {
        blockId: "",
        amBp: "", //上午血压
        pmBp: "", //下午血压
        drainage: "", //引流量
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
        nursingEvent: "",
        height: ""
      };
      let list = this.tableData.map(item => {
        let obj = {};
        for (let key in data) {
          obj[key] = item[key] || data[key];
        }
        return obj;
      });

      let tempertureData = {
        ...this.query,
        list
      };
      tempertureData.entryDate = tempertureData.entryDate
        ? moment(tempertureData.entryDate).format("YYYY-MM-DD")
        : moment(new Date()).format("YYYY-MM-DD");
      saveOverAllTemperture(tempertureData).then(res => {
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
        let rowIndex = e.path[3].rowIndex;
        if (e.keyCode === 37) {
          //处理左按键
          if (e.target.selectionStart === 0) {
            // 如果光标在开头，跳转前一个输入框
            let inputEls = document.getElementsByClassName(
              "all-temperature-chart-input"
            );
            let currentIdx = 0;
            for (var i = 0; i < inputEls.length; ++i) {
              if (e.target === inputEls[i]) currentIdx = i;
            }
            let prevIdx = currentIdx - 1;
            inputEls[prevIdx] && inputEls[prevIdx].focus();
          }
        } else if (e.keyCode === 39) {
          //处理右按键
          if (e.target.selectionEnd === e.target.value.length) {
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
          }
        } else {
          //处理上下按键，跳转相同类名的输入框
          let inputEls = document.getElementsByClassName(e.target.className);
          let currentIdx = 0;

          for (var i = 0; i < inputEls.length; ++i) {
            if (e.target === inputEls[i]) currentIdx = i;
          }
          if (e.keyCode === 38) {
            currentIdx--;
          } else if (
            e.keyCode === 40 ||
            (e.keyCode === 13 && ["guizhou"].includes(this.HOSPITAL_ID))
            //当贵州的时候，回车不调用保存事件，执行跳转到下一个患者的聚集性事件
          ) {
            currentIdx++;
          }
          inputEls[currentIdx] && inputEls[currentIdx].focus();
        }
      }
    },
    toRow(e) {
      let rowIndex =
        e.target.className.includes("stoolNum") ||
        e.target.className.includes("nursingEvent")
          ? e.path[4].rowIndex
          : e.path[3].rowIndex;
      let tableElement =
        e.target.className.includes("stoolNum") ||
        e.target.className.includes("nursingEvent")
          ? e.path[5]
          : e.path[4];
      var trs = tableElement.getElementsByClassName("el-table__row");

      for (let i = 0; i < trs.length; i++) {
        if (rowIndex === i) {
          trs[i].style.backgroundColor = "green";
        } else {
          trs[i].style.backgroundColor = "";
        }
      }
    },
    handleKeyUp(e) {
      let rowIndex =
        e.target.className.includes("stoolNum") ||
        e.target.className.includes("nursingEvent")
          ? e.path[4].rowIndex
          : e.path[3].rowIndex;
      let tableElement =
        e.target.className.includes("stoolNum") ||
        e.target.className.includes("nursingEvent")
          ? e.path[5]
          : e.path[4];
      var trs = tableElement.getElementsByClassName("el-table__row");
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
        `
        });
      });
      this.pageLoadng = false;
    }
  },

  components: {
    CustomInput
  },
  watch: {
    deptCode(val) {
      if (val) {
        this.query.wardCode = val;
      }
    },
    query: {
      handler(val) {
        this.getData();
      },
      deep: true
    }
  }
};
</script>
