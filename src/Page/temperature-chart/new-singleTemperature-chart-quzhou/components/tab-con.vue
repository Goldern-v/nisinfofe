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
          id="date-picker"
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
        <div style="flex: 4">
          <el-button
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
            @click="changeQuery(dateTime)"
          >
            {{ dateTime }}
            <i
              style="font-size: 10px"
              @click="removeRecord(dateTime, tabIndex)"
              class="el-icon-close"
            ></i>
          </el-button>
        </div>
        <div style="flex: 7">
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
            <input type="text" v-model="vitalSignObj[j].vitalValue" />
          </div>
          <div class="fieldList">
            <div style="margin: 10px 0px; font-weight: bold; font-size: 14px">
              <span>自定义项目：</span>
            </div>
            <div class="row" v-for="(i, index) in fieldList" :key="index">
              <span
                class="preText"
                style="color: blue"
                @click="updateTextInfo(i.vitalCode, i.fieldCn, i.fieldCn,index)"
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
              size="mini"
              v-model="vitalSignObj[multiDictList['表顶注释']].expand1"
            >
              <el-option
                v-for="(item, topIndex) in topContextList"
                :key="topIndex"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-date-picker
              size="mini"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="vitalSignObj[multiDictList['表顶注释']].expand2"
              type="datetime"
              placeholder="选择日期时间"
              style="margin: 3px 0px 0px 55px; width: 170px"
              @change="formatTopExpandDate"
            >
            </el-date-picker>
          </div>
          <div class="row" v-if="multiDictList['表底注释']">
            <span class="preText">表底注释</span>
            <el-select
              size="mini"
              v-model="vitalSignObj[multiDictList['表底注释']].expand1"
            >
              <el-option
                v-for="(item, bottomIndex) in bottomContextList"
                :key="bottomIndex"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
            <el-date-picker
              size="mini"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="vitalSignObj[multiDictList['表底注释']].expand2"
              type="datetime"
              placeholder="选择日期时间"
              style="margin: 3px 0px 0px 55px; width: 170px"
              @change="formatBtmExpandDate"
            >
            </el-date-picker>
          </div>
          <div>
            <el-button
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
  getVitalSignListBy10,
  getmultiDict,
  getfieldList,
  savefieldTitle,
  autoVitalSigns,
  saveAll,
  deleteRecord,
  getLastList,
  getViSigsByReDate,
} from "../../api/api";
export default {
  props: { patientInfo: Object },
  data() {
    // 初始化筛选时间
    let initTimeArea = {
      ["02"]: ["00:00", "02:59"],
      ["06"]: ["03:00", "06:59"],
      ["10"]: ["07:00", "10:59"],
      ["14"]: ["11:00", "14:59"],
      ["18"]: ["15:00", "18:59"],
      ["22"]: ["19:00", "23:59"],
    };

    let entryTime = "02";
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
      bus: bus(this),
      editableTabsValue: "2",
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (()=>{
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
         //录入时间
        })() //录入时间
      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      multiDictList: {},
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
      topContextList: [
        "",
        "入院",
        "转入",
        "手术",
        "分娩",
        "出院",
        "出生",
        "手术入院",
        "死亡",
      ],
      timesOdd: [
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
      bottomContextList: ["", "不升"],
      topExpandDate: "",
      bottomExpandDate: "",
      totalDictInfo: {},
    };
  },
  async mounted() {
    await this.getVitalList();

  },
  created() {
    this.bus.$on("refreshVitalSignList", () => {
      this.getList();
    });
  },
  computed: {},
  watch: {
    query: {
      handler(newName, oldName) {
        this.getList();
      },
      deep: true,
    },
  },
  methods: {
    init() {
      let obj = {};
      if (!this.multiDictList) return;
      /* 根据字典项构造一个对象(键为生命体征的中文名，值为对应的对象)：{"体温":{}} */
      for (let key in this.multiDictList) {
        obj[this.multiDictList[key]] = {
          createDateTime: "",
          patientId: this.patientInfo.patientId,
          visitId: this.patientInfo.visitId,
          recordDate: "",
          vitalSigns: key,
          wardCode: this.patientInfo.wardCode,
          vitalValue: "",
          units: this.totalDictInfo[key].unit,
          vitalCode: this.multiDictList[key],
          classCode:
            (this.totalDictInfo[key] || { classCode: "" }).classCode || "",
          nurse: "",
          bedLabel: "",
          expand1: "",
          expand2: "",
          expand3: "",
          source: "",
          customTitle: false,
        };
      }
      this.vitalSignObj = { ...obj };
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
      /* 获取患者某个时间点的体征信息 */
      await getVitalSignListBy10({
        visitId: data.visitId,
        patientId: data.patientId,
      }).then((res) => {
        this.tabsData = [];
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
         recordDate:
        moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
        "  " +
        this.query.entryTime + ":00:00"
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
        let data = [];
        let obj = [];
        res.data.data.map((item, index) => {
          data[item.vitalSign] = item.vitalCode;
          this.totalDictInfo[item.vitalSign] = { ...item };

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
    /* 删除记录 */
    async removeRecord(targetName, index) {
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
    updateTextInfo(key, label, autotext,index) {
      window.openSetTextModal(
        (text) => {
          let data = {
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId,
            wardCode: this.patientInfo.wardCode,
            vitalCode: key,
            fieldCn: text,
             recordDate:
        moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
        "  " +
        this.query.entryTime + ":00:00"
          };
          savefieldTitle(data).then((res) => {
             this.fieldList[index].fieldCn=text;
            this.$message.success(`修改${label}成功`);
          });
          // this.getList();
        },
        autotext,
        `修改${label}`
      );
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
            item.expand2 = this.topExpandDate;
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

  .rowItem_noShow {
    display: none;
  }

  .row {
    display: inline-block;
    padding: 3px 15px;

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
    #date-picker {
    >>>input {
      pointer-events: auto !important;
    }
     >>>.el-input__inner {
      border-radius: 6px;
      margin-left:5px;
      height:28px;
    }
  }
}
</style>
