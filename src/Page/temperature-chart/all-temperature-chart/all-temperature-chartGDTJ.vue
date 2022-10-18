<template>
  <div class="all-temperature-chart">
    <div class="search-topbar">
      <span class="filterItem date">
        <span class="type-label">日期:</span>
        <ElDatePicker class="date-picker" type="date" size="small" format="yyyy-MM-dd" placeholder="开始日期"
          v-model="query.entryDate" clearable />
      </span>
      <div class="times">
        <label :for="`time${item.id}`" v-for="item in timesquZhou" :key="item.id">
          <input type="radio" name="time" v-model="query.entryTime" :id="`time${item.id}`" :value="item.value" />
          {{ item.value }}
        </label>
      </div>
      <div class="search-box">
        <el-input placeholder="床号/姓名/多选用空格隔开" icon="search" v-model="searchWord"></el-input>
      </div>
      <div style="margin: 0px 10px 0px 10px">
        <el-checkbox-group v-model="admitted" size="small">
          <el-checkbox-button v-for="option in checkOptions" :label="option" :key="option">{{ option }}
          </el-checkbox-button>
        </el-checkbox-group>
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
                    shitOption.length > 0
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
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="foodSize"
            label="总入量"
            min-width="80"
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
          </el-table-column>
          <el-table-column
            prop="dischargeSize"
            label="总出量"
            min-width="80"
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
                type="text"
                @keyup="handleKeyUp"
                @keydown="handleKeyDown"
                @click="toRow"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column
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
            min-width="80"
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
            prop="temperature"
            label="体温"
            min-width="80"
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
            min-width="100"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.pulse"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="breath"
            label="呼吸"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.breath"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="bloodPressure"
            label="血压"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.bloodPressure"></el-input>
            </template>
          </el-table-column>

          <el-table-column
            prop="stoolNum"
            label="大便次数"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.stoolNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="heartRate"
            label="心率"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.heartRate"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="fieldThree"
            label="尿量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.fieldThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="foodSize"
            label="总入量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.foodSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="dischargeSize"
            label="总出量"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.dischargeSize"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="curWeight"
            label="体重"
            min-width="80"
            align="center"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.curWeight"></el-input>
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
  box-sizing: border-box;
  text-overflow: ellipsis;
}

@page {
  margin: 8mm 5mm 8mm 5mm;
  .all-temperature-chart-print {
    transform: scaleX(0.8)
  }
}
</style>
<style lang="scss">
.custom-temp-dict-select {
  background: #fff !important;
  color: #000 !important;
  border: 1px solid #ddd;

  .container {
    min-width: 100px;
    min-height: 26px;
    max-height: 100px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .null-item {
    line-height: 24px;
    text-align: center;
  }
}
</style>

<script>
import common from "@/common/mixin/common.mixin.js";
import { getPatientsInfo, saveOverAllTemperture } from "../api/api";
import moment from "moment";
import print from "printing";
import formatter from "../print-formatter";
import CustomInput from "./components/CustomInput.vue";
import { listItem } from "@/api/common.js";
import { _debounce } from "../save-formatter";

export default {
  mixins: [common],
  props: {},
  data() {
    return {
      gridData: [
        {
          value: "1",
        },
        {
          value: "E",
        },
        {
          value: "1/E",
        },
        {
          value: "0/E",
        },
        {
          value: "1/2E",
        },
        {
          value: "*",
        },
        {
          value: "☆",
        },
      ],
      levelColor: null, //等级颜色
      levelColorHis: ["wujing"], //显示护理等级及颜色医院his列表
      checkOptions: [
        "当天入院",
        "入院三天",
        "转  科",
        "手术三天",
        "危重患者",
        "体温37.5",
        "高温38.5",
        "周体重",
      ],
      shitOption: [
        "灌肠",
        "失禁",
        "人工肛门",
        "腹泻",
        "※",
        "☆",
        "*",
        "E",
        "1/E",
        "2/E",
        "0/E",
        "1 2/E",
        "*/E",
        "☆/E",
        "3/2E"
      ],
      admitted: [],
      isSelectedPatient: "",
      patientList: [],
      isSelectedNurs: "",
      handleKeyCode: [37, 38, 39, 40, 13],
      colClass: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      nursingList: [],
      query: {
        wardCode: "", //科室编码
        entryDate:
          this.HOSPITAL_ID === "guizhou"
            ? moment(new Date()).format("YYYY-MM-DD")
            : moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
          switch (this.HOSPITAL_ID) {
            case "gdtj":
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
      patientsInfoData: [],
      searchWord: "",
      pageLoadng: true,
    };
  },
  computed: {
    className() {
      return ["all-temperature-chart-input"].join(" ");
    },
    tableData: {
      get() {
        let data = []
        if (this.searchWord.includes(" ")) {
          let searchWordArray = this.searchWord.split(' ').filter((s) => s !== '')
          searchWordArray.forEach((x) => {
            let reg = new RegExp(x, "i"); //忽略大小写
            this.patientsInfoData.forEach((obj) => {
              if (obj.patientId && (obj.bedLabel.match(reg) || obj.name.match(reg))) {
                data.push(obj)
              }
            })
          })
        } else {
          let searchWord = new RegExp(this.searchWord, 'i')
          data = this.patientsInfoData.filter((item) => {
            return (
              (item.bedLabel.match(searchWord) ||
                item.name.match(searchWord)) &&
              item.patientId
            );

          });
        }
        const filterArray = [
          { key: "危重患者", arr: 'data1' },
          { key: "周体重", arr: 'data2' },
          { key: "体温37.5", arr: 'data3' },
          { key: "高温38.5", arr: 'data4' },
          { key: "入院三天", arr: 'data5' },
          { key: "当天入院", arr: 'data6' },
          { key: "转  科", arr: 'data7' },
          { key: "手术三天", arr: 'data8' },
        ]
        const PatientArray = []
        if (this.admitted.length != 0) {
          let obj = { data1: [], data2: [], data3: [], data4: [], data5: [], data6: [], data7: [], data8: [] }
          obj.data1 = data.filter((item) => {
            return (item.patient_condition == 1);
          });
          obj.data2 = data.filter((item) => {
            return (
              item.no_weight_flag == 1
            );
          });
          obj.data3 = data.filter((item) => {
            return (
              item.temperature_flag == 1
            );
          });
          obj.data4 = data.filter((item) => {
            return (
              item.high_fever_flag == 1
            );
          });
          obj.data5 = data.filter((item) => {
            return (
              moment(item.admissionDate.slice(0, 10)).isAfter(
                moment().subtract(3, "days").format("YYYY-MM-DD")
              )
            );
          });
          obj.data6 = data.filter((item) => {
            return (
              item.admissionDate.slice(0, 10) ==
              moment().format("YYYY-MM-DD")

            );
          });
          obj.data7 = data.filter((item) => {
            return (
              item.transfer_flag == 1
            );
          });
          obj.data8 = data.filter((item) => {
            return (
              item.operation_flag == 1
            );
          });

          for (let k of filterArray) {
            if (this.admitted.includes(k.key)) {
              PatientArray.push(obj[k.arr])
            }
          }
          data = PatientArray.reduce((a, b) => {
            return [...Array.from(new Set([...a, ...b]))]
          })

        }
        //因为输入框有条件重叠 预防有条件重叠去重
        return Array.from(new Set([...data]));
      },
      set(value) {
        // this.tableData = value;
      },
    },
    tableData2: {
      get() {
        let data = []
        if (this.searchWord.includes(" ")) {
          let searchWordArray = this.searchWord.split(' ').filter((s) => s !== '')
          searchWordArray.forEach((x) => {
            let reg = new RegExp(x, "i"); //忽略大小写
            this.patientsInfoData.forEach((obj) => {
              if (obj.patientId && (obj.bedLabel.match(reg) || obj.name.match(reg))) {
                data.push(obj)
              }
            })
          })
        } else {
          let searchWord = new RegExp(this.searchWord, 'i')
          data = this.patientsInfoData.filter((item) => {
            return (
              (item.bedLabel.match(searchWord) ||
                item.name.match(searchWord)) &&
              item.patientId
            );

          });
        }
        var reg = /[a-zA-Z]+/;  //[a-zA-Z]表示匹配字母，g表示全局匹配
        if (this.HOSPITAL_ID == 'fsxt') data.sort((a, b) => Number(a.bedLabel.replace(reg, '')) - Number(b.bedLabel.replace(reg, '')));
        return Array.from(new Set([...data]))
      },
      set(value) {
        // this.tableData = value;
      },
    },
  },
  mounted() {
    this.query.wardCode = this.deptCode;
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
            color: "white",
          };
        default:
          return {
            backgroundColor: this.getBaColor(row),
            color: "white",
          };
      }
    },
    //获取对应护理等级背景颜色
    getBaColor(row) {
      if (this.levelColor && row && row.nursingClass) {
        return this.levelColor.find((item) => item.code == row.nursingClass)
          ? this.levelColor.find((item) => item.code == row.nursingClass).name
          : null;
      } else {
        return "";
      }
    },
    handlePatientChange() { },
    selectedNurs() { },
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

      getPatientsInfo(data).then(async (res) => {
        this.patientsInfoData = res.data.data;
        this.pageLoadng = false;
        try {
          const {
            data: { data: levelColor },
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
      if (e.keyCode === 13) {
        this.debounceSave();
      } else {
        return;
      }
    },
    //保存防抖函数
    debounceSave: _debounce("saveAllTemperture", 500),
    saveAllTemperture() {
      this.pageLoadng = true;
      let data = {
        blockId: "",
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
        height: "",
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
      let rowIndex = e.target.className.includes("stoolNum")
        ? e.path[4].rowIndex
        : e.path[3].rowIndex;
      let tableElement = e.target.className.includes("stoolNum")
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
      let rowIndex = e.target.className.includes("stoolNum")
        ? e.path[4].rowIndex
        : e.path[3].rowIndex;
      let tableElement = e.target.className.includes("stoolNum")
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
          size:'a4',
          css: `
        tr {
          page-break-inside: avoid;
        }
        td {
          page-break-inside: avoid;
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
        if (["liaocheng"].includes(this.HOSPITAL_ID)) {
          let input = document.getElementsByTagName("input");
          for (let i = 0; i < input.length; i++) {
            input[i].style.border = "";
          }
        }
      },
      deep: true,
    },
  },
};
</script>
