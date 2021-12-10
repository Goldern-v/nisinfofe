<template>
  <div class="right-con">
    <div class="row-top">
      <!-- <div class="column-left">
        <el-button size="mini" @click="syncInAndOutHospital((type = '0'))">
          同步入院
        </el-button>
        <el-button
          style="margin: 10px 0px"
          size="mini"
          @click="syncInAndOutHospital((type = '1'))"
        >
          同步出院
        </el-button>
      </div>-->
      <div class="column-right">
        <span style="padding-left: 5px">日期：</span>
        <ElDatePicker
          class="date-picker"
          type="date"
          size="mini"
          style="width: 110px"
          format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="query.entryDate"
          clearable
        />
        <div class="times">
          <el-radio-group v-model="query.entryTime" @change="changeEntryTime">
            <el-radio
              size="mini"
              v-for="item in timesOdd"
              :key="item.id"
              :label="item.value"
            ></el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="row-bottom">
      <null-bg v-if="!patientInfo.patientId"></null-bg>
      <div v-else class="showRecord">
        <div style="flex: 4; overflow-x: hidden; overflow-y: auto">
          <div
            :class="
              [
                'recordList',
                dateTime.match(`${query.entryDate}  ${query.entryTime}`)
                  ? 'active'
                  : '',
              ].join(' ')
            "
            style="margin: 0px"
            v-for="(dateTime, tabIndex) in tabsData"
            :key="tabIndex"
            @contextmenu.stop.prevent="
              (e) => rightMouseDown(e, dateTime, tabIndex)
            "
            @click="changeQuery(dateTime)"
          >
            {{ dateTime }}
            <i
              style="font-size: 10px"
              @click="removeRecord(dateTime, tabIndex)"
              class="el-icon-close"
            ></i>
          </div>
        </div>

        <div style="flex: 7" class="inputText">
          <div
            :class="
              !(
                index.includes('自定义') ||
                index.includes('腋温') ||
                index.includes('注释')
              )
                ? 'row'
                : 'rowItem_noShow'
            "
            v-for="(j, index) in multiDictList"
            :key="index"
          >
            <span class="preText">{{ index }}</span>
            <!-- <input  type=text v-model="vitalSignObj[j].vitalValue" /> -->
            <div style="display: inline-block">
              <el-tooltip
                placement="top"
                popper-class="custom-temp-dict-select"
                :disabled="
                  !(
                    totalDictInfo[index].options &&
                    totalDictInfo[index].options.length > 0
                  )
                "
                :visible-arrow="false"
                :manual="true"
                :value="vitalSignObj[j].popVisible"
              >
                <input
                  type="text"
                  :title="vitalSignObj[j].vitalValue"
                  @input="handlePopRefresh(vitalSignObj[j])"
                  @click="() => (vitalSignObj[j].popVisible = true)"
                  @blur="() => (vitalSignObj[j].popVisible = false)"
                  v-model="vitalSignObj[j].vitalValue"
                />
                <template v-slot:content>
                  <div
                    class="container"
                    @click.prevent="
                      () => {
                        vitalSignObj[j].popVisible = false;
                      }
                    "
                  >
                    <template
                      v-if="
                        totalDictInfo[index].options &&
                        getFilterSelections(
                          totalDictInfo[index].options,
                          vitalSignObj[j].vitalValue
                        ).length > 0
                      "
                    >
                      <div
                        :key="selectionDictIdx"
                        class="selection-dict-item"
                        v-for="(
                          option, selectionDictIdx
                        ) in getFilterSelections(
                          totalDictInfo[index].options,
                          vitalSignObj[j].vitalValue
                        )"
                        @click.prevent="
                          () => (vitalSignObj[j].vitalValue = option)
                        "
                      >
                        {{ option }}
                      </div>
                    </template>
                    <div v-else class="null-item">无匹配数据</div>
                  </div>
                </template>
              </el-tooltip>
            </div>
            <!-- <el-select v-if="index==='大便次数'" v-model="vitalSignObj[j].vitalValue" filterable allow-create default-first-option  size="mini" @focus="inputClicl($event)">
            <el-option v-for="item in selectValue" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
            </el-select> -->
            <!-- <select v-if="index==='大便次数'" type=text v-model="vitalSignObj[j].vitalValue" style="width:52.97px;height:19.73px">
            <option v-for="(item,i) in selectValue" :key="i" >{{item}}</option>
            </select> -->
            <!-- <input v-if="index==='大便次数'" v-model="vitalSignObj[j].vitalValue" style="width:52.97px;height:19.73px" type=text placeholder="大便次数自定义" /> -->
          </div>
          <div class="fieldList">
            <div style="margin: 10px 0px; font-weight: bold; font-size: 14px">
              <span>自定义项目：</span>
            </div>
            <div class="row" v-for="(i, index) in fieldList" :key="index">
              <span
                class="preText"
                style="color: blue"
                @click="
                  updateTextInfo(i.vitalCode, i.fieldCn, i.fieldCn, index)
                "
                >{{ i.fieldCn }}</span
              >
              <input
                type="text"
                v-model="vitalSignObj[i.vitalCode].vitalValue"
              />
            </div>
          </div>
          <!-- <div class="fieldList" v-if="multiDictList['体温复测']">
            <div class="row">
              <span class="preText">体温复测</span>
              <input
                type="text"
                v-model="vitalSignObj[multiDictList['体温复测']].vitalValue"
              />
            </div>
          </div> -->
          <div class="row" v-if="multiDictList['表顶注释']">
            <span class="preText">表顶注释</span>
            <el-select
              :disabled="isDisable()"
              size="mini"
              v-model="vitalSignObj[multiDictList['表顶注释']].expand1"
            >
              <el-option
                v-for="(item, topIndex) in getFilterSelections(
                  totalDictInfo['表顶注释'].options,
                  vitalSignObj[multiDictList['表顶注释']].vitalValue
                )"
                :key="topIndex"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-time-picker
              size="mini"
              :readonly="isDisable()"
              v-model="timeVal"
              placeholder="选择表顶时间"
              style="margin: 3px 0px 0px 55px; width: 125px"
              @change="formatTopExpandDate"
            >
            </el-time-picker>
          </div>
          <div class="row" v-if="multiDictList['表底注释']">
            <span class="preText">表底注释</span>
            <el-select
              size="mini"
              :disabled="isDisable()"
              v-model="vitalSignObj[multiDictList['表底注释']].expand1"
            >
              <el-option
                v-for="(item, bottomIndex) in getFilterSelections(
                  totalDictInfo['表底注释'].options,
                  vitalSignObj[multiDictList['表底注释']].vitalValue
                )"
                :key="bottomIndex"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <!-- <el-date-picker
              size="mini"
              :readonly="isDisable()"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="vitalSignObj[multiDictList['表底注释']].expand2"
              type="datetime"
              placeholder="选择日期时间"
              style="margin: 3px 0px 0px 55px; width: 170px"
              @change="formatBtmExpandDate"
            >
            </el-date-picker> -->
          </div>
          <div>
            <el-button
              :disabled="isDisable()"
              type="primary"
              class="save-btn"
              @click="saveVitalSign(vitalSignObj)"
              >保存</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bus from "vue-happy-bus";
import moment from "moment";
import nullBg from "../../../../components/null/null-bg";
import {
  // getVitalSignListBy10,
  getNowDateTimeList,
  getmultiDict,
  getfieldList,
  savefieldTitle,
  autoVitalSigns,
  saveAll,
  deleteRecord,
  getLastList,
  getViSigsByReDate,
} from "../../api/api";
import { mockData, recordList } from "../data/data";
export default {
  props: { patientInfo: Object },
  data() {
    // 初始化筛选时间
    let initTimeArea = {
      ["04"]: ["00:00", "04:59"],
      ["08"]: ["05:00", "08:59"],
      ["12"]: ["09:00", "12:59"],
      ["16"]: ["13:00", "16:59"],
      ["20"]: ["17:00", "20:59"],
      ["24"]: ["21:00", "23:59"],
    };

    let entryTime = "03";
    let currentSecond =
      new Date().getHours() * 60 + new Date().getMinutes() * 1;

    Object.keys(initTimeArea).forEach((time) => {
      let [start, end] = initTimeArea[time];

      let startSecond = start.split(":")[0] * 60 + start.split(":")[1] * 1;

      let endSecond = end.split(":")[0] * 60 + end.split(":")[1] * 1;
      if (currentSecond >= startSecond && currentSecond <= endSecond)
        entryTime = time;
    });

    return {
      mockData,
      recordList,
      // selectValue:[
      //   {lable:'☆',value:'☆'},
      //   {lable:'※',value:'※'},
      //   {lable:'0 /E',value:'0 /E'},
      //   {lable:'2 /E',value:'2 /E'},
      //   {lable:'1 0/E',value:'1 0/E'},
      //   {lable:'1 1/E',value:'1 1/E'},
      //   {lable:'1 2/E',value:'1 2/E'},
      //   {lable:'2 0/E',value:'2 0/E'},
      //   {lable:'2 1/E',value:'2 1/E'},
      //   {lable:'2 2/E',value:'2 2/E'},
      //   {lable:'2/2E',value:'2/2E'}
      //   ],
      bus: bus(this),
      editableTabsValue: "2",
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
          if (this.getHours() >= 0 && this.getHours() <= 4) {
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
          if (this.getHours() > 20 && this.getHours() <= 23) {
            return "23";
          }
          //录入时间
        })(), //录入时间
      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      multiDictList: {},
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      timeVal: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ),
      vitalSignList: [], // 固定项目列表

      // topContextList: [
      //   "",
      //   "入院",
      //   "转入",
      //   "手术",
      //   "分娩",
      //   "出院",
      //   "出生",
      //   "手术入院",
      //   "死亡",
      //   "转出"
      // ],
      timesOdd: [
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
      // bottomContextList: ['',"温水擦浴", "不升","特殊物理降温","辅助呼吸"],
      topExpandDate: "",
      bottomExpandDate: "",
      totalDictInfo: {},
    };
  },
  async mounted() {
    await this.getVitalList();
    this.bus.$on("refreshVitalSignList", () => {
      this.getList();
    });
  },
  created() {},
  computed: {
    // timeVal: {
    //   get: function () {
    //     let date = new Date();
    //     let hhh = new Date(
    //       date.getFullYear(),
    //       date.getMonth() + 1,
    //       date.getDate(),
    //       date.getHours(),
    //       date.getMinutes()
    //     );
    //     return hhh;
    //   },
    //   set: function (val) {
    //     this.timeVal = val;
    //   },
    // },
  },
  watch: {
    query: {
      handler(newName, oldName) {
        this.getList();
      },
      deep: true,
    },
    patientInfo() {
      this.timeVal = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      );
    },
  },
  methods: {
    init() {
      let obj = {};
      if (!this.multiDictList) return;
      /* 根据字典项构造一个对象(键为生命体征的中文名，值为对应的对象)：{"体温":{}} */
      for (let key in this.multiDictList) {
        obj[this.multiDictList[key]] = {
          // bedLabel: "",
          // classCode: "",
          // createDateTime: "",
          // expand1: "",
          // expand2: "",
          // expand3: "",
          // // id: {
          // //   patientId: "",
          // //   recordDate: "",
          // //   visitId: "",
          // //   vitalSigns: "",
          // //   wardCode: ""
          // // },
          // nurse: "",
          // patientId: this.patientInfo.patientId,
          // recordDate: "",
          // source: "",
          // units: "",
          // visitId: this.patientInfo.visitId,
          // vitalCode: this.multiDictList[key],
          // vitalSigns: key,
          // vitalValue: "",
          // wardCode: this.patientInfo.wardCode
          createDateTime: "",
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          recordDate: "",
          vitalSigns: key,
          wardCode: this.patientInfo.wardCode,
          vitalValue: "",
          units: "",
          vitalCode: this.multiDictList[key],
          classCode:
            (this.totalDictInfo[key] || { classCode: "" }).classCode || "",
          nurse: "",
          bedLabel: "",
          expand1: "",
          expand2: "",
          popVisible: false,
          expand3: "",
          source: "",
          customTitle: false,
        };
      }
      this.vitalSignObj = { ...obj };
    },
    getFilterSelections(orgin, filterStr) {
      if (!filterStr || !filterStr.trim()) return orgin;

      return orgin;
    },
    handlePopRefresh(target) {
      target.popVisible = false;

      setTimeout(() => (target.popVisible = true), 100);
    },
    async getList() {
      /* 初始化 */
      this.tabsData = [];
      /* 定义 */
      let obj = {};
      let data = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: this.query.entryDate
          ? moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")
          : moment(new Date(this.patientInfo.admissionDate)).format(
              "YYYY-MM-DD"
            ),
        wardCode: this.patientInfo.wardCode,
      };
      await this.getVitalList();
      /* 获取患者某个时间点的体征信息 */
      await getNowDateTimeList(data).then((res) => {
        res.data.data.map((item, index) => {
          /* 如果该患者没有体温单记录则返回 */
          if (!item.recordDate) return;
          /* 时间数组 */
          this.tabsData.push(item.recordDate);
        });
      });
      /* 获取患者某个时间点的体征信息--entryDate、entryTime变化就调查询接口 */
      await this.getViSigs();
      /* 获取固定列表的接口 */
      await getfieldList({
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        wardCode: this.patientInfo.wardCode,
      }).then((res) => {
        res.data.data.list.map((item) => {
          this.fieldList[item.vitalCode] = item;
        });
      });
    },
    /* 日期搜索功能 */
    selectTemRec(val) {
      this.query.entryDate = val;
    },
    isDisable() {
      if (
        this.$route.path.includes("newSingleTemperatureChart") ||
        this.$route.path.includes("temperature")
      ) {
        return false;
      } else {
        return true;
      }
    },
    getHours() {
      let date = new Date();
      let b = date.getHours();
      return b;
    },
    /* 选择固定时间点 */
    changeEntryTime(val) {
      this.query.entryTime = val;
    },
    /* 联动修改查询的日期和时间 */
    changeQuery(value) {
      let temp = value;
      this.query.entryDate = temp.slice(0, 10);
      this.query.entryTime = value.slice(12, 14);
    },
    /* 获取患者某个时间点的体征信息--entryDate、entryTime变化就调查询接口  */
    getViSigs() {
      let data = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        dateStr: this.query.entryDate
          ? moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")
          : moment(new Date(this.patientInfo.admissionDate)).format(
              "YYYY-MM-DD"
            ),
        timeStr: this.query.entryTime + ":00:00",
        wardCode: this.patientInfo.wardCode,
      };
      getViSigsByReDate(data).then((res) => {
        if (res.data.data.length > 0) {
          /* 如果该时间点有记录 */
          res.data.data.map((v, idx) => {
            this.vitalSignObj[v.vitalCode] = v;
            if (v.vitalSigns === "表顶注释") {
              this.timeVal = moment(
                this.vitalSignObj[v.vitalCode].expand2
              ).utc()._d;
            }
          });
        } else {
          this.init();
        }
      });
    },
    /* 获取字典表，整理某一行的同步信息 */
    async getVitalList() {
      let wardCode = this.patientInfo.wardCode;
      await getmultiDict(wardCode).then((res) => {
        // console.log('sss',res)
        let data = [];
        let obj = [];
        res.data.data.map((item, index) => {
          data[item.vitalSign] = item.vitalCode;
          this.totalDictInfo[item.vitalSign] = {
            ...item,
            options: item.selectType ? item.selectType.split(",") : [],
          };
          // console.log('options',Object.values(this.totalDictInfo)||[])
          if (item.vitalSign.includes("自定义")) {
            obj[item.vitalCode] = {
              fieldCn: item.vitalSign,
              patientId: this.patientInfo.patientId,
              visitId: this.patientInfo.visitId,
              vitalCode: item.vitalCode,
              wardCode: this.patientInfo.wardCode,
              classCode: item.classCode,
            };
            this.fieldList = { ...obj };
          }
        });

        this.multiDictList = { ...data };
        this.init();
      });
    },
    /* 获取字典表，整理某一行的同步信息 */
    // async getVitalList() {
    //   let wardCode = this.patientInfo.wardCode;
    //   await getmultiDict(wardCode).then((res) => {
    //     let data = [];
    //     let obj = [];
    //     res.data.data.map((item, index) => {
    //       data[item.vitalSign] = item.vitalCode;
    //       this.totalDictInfo[item.vitalSign] = { ...item };

    //       if (item.vitalSign.includes("自定义")) {
    //         obj[item.vitalCode] = {
    //           fieldCn: item.vitalSign,
    //           patientId: this.patientInfo.patientId,
    //           visitId: this.patientInfo.visitId,
    //           vitalCode: item.vitalCode,
    //           wardCode: this.patientInfo.wardCode,
    //           classCode: item.classCode,
    //         };
    //         this.fieldList = { ...obj };
    //       }
    //     });
    //     this.multiDictList = { ...data };
    //     this.init();
    //   });
    // },
    //右键删除记录
    rightMouseDown(e, dateTime, tabIndex) {
      if (!this.isDisable()) {
        this.removeRecord(dateTime, tabIndex);
      }
    },
    /* 删除记录 */
    async removeRecord(targetName, index) {
      if (!this.isDisable()) {
        await this.$confirm("是否确删除该记录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        }).then(() => {
          deleteRecord({
            patientId: this.patientInfo.patientId,
            recordDate: targetName,
            visitId: this.patientInfo.visitId,
            wardCode: this.patientInfo.wardCode,
          }).then((res) => {
            this.getList();
            this.bus.$emit("refreshImg");
          });
        });
      }
    },
    /* 同步入院、同步出院 */
    syncInAndOutHospital(type) {
      autoVitalSigns({
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        type: type,
      }).then(async (res) => {
        this.$message.success("同步成功");
        await this.bus.$emit("refreshImg");
      });
    },
    /* 修改自定义标题，弹出弹窗并保存 */
    updateTextInfo(key, label, autotext, index) {
      let checkValue = Object.values(this.fieldList) || [];
      let checkValueStr = checkValue.map((item) => item.fieldCn);
      if (!this.isDisable()) {
        //护理文书不允许修改
        window.openSetTextModalNew(
          (text) => {
            let data = {
              patientId: this.patientInfo.patientId,
              visitId: this.patientInfo.visitId,
              wardCode: this.patientInfo.wardCode,
              vitalCode: key,
              fieldCn: text,
            };
            if (checkValueStr.includes(text)) {
              this.$message.error(`修改${label}失败!已存在${text}项目`);
            } else {
              savefieldTitle(data).then((res) => {
                this.fieldList[index].fieldCn = text;
                this.$message.success(`修改${label}成功`);
              });
            }
            // this.getList();
          },

          autotext,
          `修改${label}`
        );
      }
    },
    /* 录入体温单 */
    async saveVitalSign(value) {
      let obj = Object.values(value);
      obj.map((item) => {
        item.recordDate =
          moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
          "  " +
          this.query.entryTime +
          ":00:00";
        switch (item.vitalSigns) {
          case "表顶注释":
            if (this.topExpandDate !== undefined) {
              item.expand2 = this.query.entryDate + " " + this.topExpandDate; //表顶用录入日期+选择的时间来显示
            } else {
              item.expand2 = this.query.entryDate + " " + this.query.entryTime; //存在用户把时间控件时间删除不选择的情况，表顶用录入日期+选择的时间来显示
            }
            break;
          case "表底注释":
            item.expand2 = this.bottomExpandDate;
          default:
            break;
        }
      });
      let data = {
        dateStr: moment(new Date(this.query.entryDate)).format("YYYY-MM-DD"),
        timeStr: this.query.entryTime + ":00:00",
        vitalSignList: obj,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
      };
      await saveAll(data).then((res) => {
        this.$message.success("保存成功");
      });
      this.getList();
      this.bus.$emit("refreshImg");
    },
    formatTopExpandDate(val) {
      this.topExpandDate = val;
    },
    formatBtmExpandDate(val) {
      this.bottomExpandDate = val;
    },
  },
  components: { nullBg },
};
</script>

<style lang="stylus" scoped>
.right-con {
  width: 100%;
  background: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  .row-top {
    display: flex;

    .column-left {
      margin: 0px 45px 0px 30px;
      display: flex;
      flex-direction: column;
    }
  }

  .row-bottom {
    overflow-y: scroll;

    .showRecord {
      display: flex;
      height: 100%;

      >div {
        overflow: auto;

        .recordList {
          width: 180px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #eee;
          padding: 0 6px;

          &.active {
            color: rgb(68, 158, 127);
          }
        }
      }
    }
  }

  .inputText {
    overflow: scroll;
    margin-left: 10px;
  }

  .rowItem_noShow {
    display: none;
  }

  .row {
    display: inline-block;
    padding: 3px 5px;

    .preText {
      display: inline-block;
      width: 50px;
    }

    input {
      width: 45px;
      font-size: 12px;
    }

    .el-select {
      width: 85px;
    }
  }

  .save-btn {
    position: relative;
    left: 30%;
    margin-top: 10px;
    width: 100px;
  }
}
</style>
