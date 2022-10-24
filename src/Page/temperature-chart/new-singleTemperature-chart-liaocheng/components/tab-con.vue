<template>
  <div class="right-con">
    <div class="row-top">
      <div class="column-left">
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
      </div>
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
        <div style="flex: 3">
          <div
            :class="
              [
                'recordList',
                dateTime.match(`${formatDate(query.entryDate)}  ${query.entryTime+':00:00'}`)
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
        <div style="flex: 7">
          <div
            :class="
              !(
                index.includes('自定义') ||
                index.includes('注释') ||
                index.includes('体温复测')
              )
                ? 'rowbox'
                : 'rowItem_noShow'
            "
            v-for="(j, index, i) in multiDictList"
            :key="index"
          >
            <span class="preText">{{ index }}</span>
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
                :id="i + 1"
                type="text"
                v-on:input="validFormFc(vitalSignObj[j], i + 1)"
                @keydown.enter.prevent="changeNext"
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
                      v-for="(option, selectionDictIdx) in getFilterSelections(
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
          <div class="fieldList">
            <div style="margin: 10px 0px; font-weight: bold; font-size: 14px">
              <span>自定义项目：</span>
            </div>
            <div class="row" v-for="(i, index, j) in fieldList" :key="index">
              <span
                class="preText"
                style="color: blue"
                @click="
                  updateTextInfo(i.vitalCode, i.fieldCn, i.fieldCn, index)
                "
                >{{ i.fieldCn }}</span
              >
              <!-- <el-tooltip
                placement="top"
                v-if="vitalSignObj[i.vitalCode]"
                popper-class="custom-temp-dict-select"
                :disabled="true"
                :visible-arrow="false"
                :manual="true"
                :value="vitalSignObj[i.vitalCode].popVisible"
              > -->
              <input
                :id="j + 100"
                class="fieldClass"
                @keydown.enter.prevent="changeNext"
                type="text"
                :title="vitalSignObj[i.vitalCode].vitalValue"
                @input="handlePopRefresh(vitalSignObj[i.vitalCode])"
                @click="() => (vitalSignObj[i.vitalCode].popVisible = true)"
                @blur="() => (vitalSignObj[i.vitalCode].popVisible = false)"
                v-model="vitalSignObj[i.vitalCode].vitalValue"
              />
              <!-- <template v-slot:content>
                  <div
                    class="container"
                    @click.prevent="
                      () => {
                        vitalSignObj[i.vitalCode].popVisible = false;
                      }
                    "
                  >
                    <template
                      v-if="
                        selectionMultiDict[i.fieldCn] &&
                        getFilterSelections(
                          selectionMultiDict[i.fieldCn],
                          vitalSignObj[i.vitalCode].vitalValue
                        ).length > 0
                      "
                    >
                      <div
                        :key="selectionDictIdx"
                        class="selection-dict-item"
                        v-for="(
                          selectionDict, selectionDictIdx
                        ) in getFilterSelections(
                          selectionMultiDict[i.fieldCn],
                          vitalSignObj[j].vitalValue
                        )"
                        @click.prevent="
                          () =>
                            (vitalSignObj[j].vitalValue = selectionDict.name)
                        "
                      >
                        {{ selectionDict.name }}
                      </div>
                    </template>
                    <div v-else class="null-item">无匹配数据</div>
                  </div>
                </template>
              </el-tooltip> -->
            </div>
          </div>
          <div class="fieldList" v-if="multiDictList['体温复测']">
            <div class="row">
              <span class="preText">体温复测</span>
              <input
                type="text"
                v-model="vitalSignObj[multiDictList['体温复测']].vitalValue"
              />
            </div>
          </div>
          <div class="row" v-if="multiDictList['表顶注释']">
            <span class="preText">表顶注释</span>
            <el-select
              size="mini"
              clearable
              @click.native="modifiValue"
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
              clearable
              v-model="vitalSignObj[multiDictList['表底注释']].expand1"
            >
              <!-- <el-option
                v-for="(item, bottomIndex) in bottomContextList"
                :key="bottomIndex"
                :label="item"
                :value="item"
              > -->
              <el-option
                v-for="(item, topIndex) in getFilterSelections(
                  totalDictInfo['表底注释'].options,
                  vitalSignObj[multiDictList['表底注释']].vitalValue
                )"
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
  // getVitalSignListBy10,
  getVitalSignListByDate,
  getmultiDict,
  getfieldList,
  savefieldTitle,
  autoVitalSigns,
  saveAll,
  deleteRecord,
  // getLastList,
  getViSigsByReDate,
} from "../../api/api";
import { validForm } from "../../validForm/validForm";

export default {
  props: { patientInfo: Object },
  data() {
    // 初始化筛选时间
    let initTimeArea = {
      ["03"]: ["00:00", "04:59"],
      ["07"]: ["05:00", "08:59"],
      ["11"]: ["09:00", "12:59"],
      ["15"]: ["13:00", "16:59"],
      ["19"]: ["17:00", "20:59"],
      ["23"]: ["21:00", "23:59"],
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
      bus: bus(this),
      editableTabsValue: "2",
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
          if (this.getHours() >= 0 && this.getHours() <= 5) {
            return "03";
          }
          if (this.getHours() > 5 && this.getHours() <= 9) {
            return "07";
          }
          if (this.getHours() > 9 && this.getHours() <= 13) {
            return "11";
          }
          if (this.getHours() > 13 && this.getHours() <= 17) {
            return "15";
          }
          if (this.getHours() > 17 && this.getHours() <= 21) {
            return "19";
          }
          if (this.getHours() > 21 && this.getHours() <= 23) {
            return "23";
          }
          //录入时间
        })(),
        recordStr:entryTime+':00:00', //录入时间,//记录时间，用来保存录入记录的时间

      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      multiDictList: {},
      topSelectData: "",
      isCorrect: false,
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      nomalTimeStr: [
        "03:00:00",
        "07:00:00",
        "11:00:00",
        "15:00:00",
        "19:00:00",
        "23:00:00",
      ], //存在出入院记录不是模糊时间点（03，07，09）这种，所以做一个标准时间去判断
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
      topExpandDate: "",
      bottomExpandDate: "",
      totalDictInfo: {},
    };
  },
  async mounted() {
    await this.getVitalList();
          this.bus.$on("getDataFromPage", (dateTime) => {
      this.query.entryDate=dateTime.slice(0,10)
        this.query.entryTime=dateTime.slice(11,13)
    });

  },
  created(){
     this.bus.$on("refreshVitalSignList", () => {
      this.getList();
    });
  },
  computed: {},
  watch: {
    query: {
      handler(newName, oldName) {
        if (this.query.entryTime && this.query.entryDate) {
        this.getList();
        this.bus.$emit("dateChangePage", this.query.entryDate);
        }
      },
      deep: true,
    },
  },
  methods: {
    changeEntryTime(value){
      this.query.entryTime = value;
      this.query.recordStr = value + ":00:00";
    },
    formatDate(date){
      return  moment(new Date(date)).format("YYYY-MM-DD")
    },
    changeNext(e) {
      if (e.target.className === "el-tooltip") {
        let inputListLength = document.getElementsByClassName("rowbox").length;
        if (Number(e.target.id) < inputListLength) {
          document.getElementById(Number(e.target.id) + 1).focus();
        } else if (Number(e.target.id) === inputListLength) {
          document.getElementById("100").focus();
        }
      } else {
        let inputListLength =
          document.getElementsByClassName("fieldClass").length;
        if (Number(e.target.id) < inputListLength + 100 - 1) {
          document.getElementById(Number(e.target.id) + 1).focus();
        } else if (Number(e.target.id) === inputListLength + 100 - 1) {
          document.getElementById("1").focus();
        }
      }
    },
    modifiValue(e) {
      let val = e.target.value;
    },
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
          isCorrect: true,
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
          expand3: "",
          source: "",
          customTitle: false,
          popVisible: false,
        };
      }
      this.vitalSignObj = { ...obj };
    },
    setValid(trage, val) {
      switch (trage) {
        case "体温":
          let o = {
            体温: {
              value: val,
              reg: [30, 50],
              errorMsg: "体温请填入30~50之间的数值",
            },
          };
          return o;
        case "心率":
          let h = {
            心率: {
              value: val,
              reg: [0, 300],
              errorMsg: "体温请填入0~300之间的数值",
            },
          };
          return h;
        case "血压":
          let x = {
            血压: {
              value: val,
              reg: [0, 300],
              errorMsg: "体温请填入0~300之间的数值",
            },
          };
          return x;
        case "脉搏":
          let y = {
            脉搏: {
              value: val,
              reg: [0, 300],
              errorMsg: "体温请填入0~300之间的数值",
            },
          };
          return y;
        case "呼吸":
          let g = {
            呼吸: {
              value: val,
              reg: [0, 120],
              errorMsg: "体温请填入0~120之间的数值或者R/r",
            },
          };
          return g;
        default:
          break;
      }
    },
    //validForm验证表单
    validFormFc(vitalSignObj, index) {
      let val = vitalSignObj.vitalValue;
      if (
        vitalSignObj.popVisible === true &&
        val !== "" &&
        ["体温", "脉搏", "心率", "呼吸"].includes(vitalSignObj.vitalSigns)
      ) {
        //验证表单
        if (validForm.valid(this.setValid(vitalSignObj.vitalSigns, val))) {
          document.getElementById(index).style.border = "";
          vitalSignObj.isCorrect = true;
        } else {
          document.getElementById(index).style.border = "thick solid red";
          vitalSignObj.isCorrect = false;
          // this.$message({
          //   message: this.setValid(vitalSignObj.vitalSigns)[vitalSignObj.vitalSigns].errorMsg,
          //   type: 'warning'
          // });
        }
      } else {
        document.getElementById(index).style.border = "";
        vitalSignObj.isCorrect = true;
      }
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
      await getVitalSignListByDate({
        visitId: data.visitId,
        patientId: data.patientId,
        wardCode: this.patientInfo.wardCode,
        recordDate: moment(new Date(this.query.entryDate)).format("YYYY-MM-DD"),
      }).then((res) => {
         this.tabsData = [];
        res.data.data.map((item, index) => {
          /* 如果该患者没有体温单记录则返回 */
          if (!item.recordDate) return;
          this.tabsData.push(item.recordDate);
          //记录数组去重
          this.tabsData = [...new Set(this.tabsData)];
          if (
            item.vitalSignList[0].id.recordDate ===
              item.vitalSignList[0].expand2 &&
            item.vitalSignList[0].vitalSign === "表顶注释"
          ) {
            //同步出入院插入一条表顶，会生成一个录入记录，这里用录入记录只存在一条表顶，录入时间=生成记录时间去除
            //返回的表顶值，先做数据切割然后才能对应option值
            item.vitalSignList[0].vitalValue = item.vitalSignList[0].expand1;
          }
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
          if (this.vitalSignObj[item.vitalCode])
            this.fieldList[item.vitalCode] = item;
        });
      });
      let input = document.getElementsByTagName("input");
      for (let i = 0; i < input.length; i++) {
        input[i].style.border = "";
      }
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

    /* 联动修改查询的日期和时间 */
    changeQuery(value) {
      let temp = value;
      this.query.recordStr = temp.slice(12, 20);
      this.query.entryDate = temp.slice(0, 10);
      this.query.entryTime = temp.slice(12, 14);
    },
    getFilterSelections(orgin, filterStr) {
      if (!filterStr || !filterStr.trim()) return orgin;

      return orgin;
    },
    handlePopRefresh(target) {
      target.popVisible = false;

      setTimeout(() => (target.popVisible = true), 100);
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
        timeStr: this.nomalTimeStr.includes(this.query.recordStr)
          ? this.query.entryTime + ":00:00"
          : this.query.recordStr,
        wardCode: this.patientInfo.wardCode,
      };
      getViSigsByReDate(data).then((res) => {
        if (res.data.data.length > 0) {
          /* 如果该时间点有记录 */
          res.data.data.map((v, idx) => {
            this.vitalSignObj[v.vitalCode] = {
              ...v,
              popVisible: false,
            };
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
          this.totalDictInfo[item.vitalSign] = {
            ...item,
            options: item.selectType ? item.selectType.split(",") : [],
          };

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
    //右键删除记录
    rightMouseDown(e, dateTime, tabIndex) {
      this.removeRecord(dateTime, tabIndex);
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
          setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 500);
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
    updateTextInfo(key, label, autotext, index) {
      let checkValue = Object.values(this.fieldList) || [];
      let checkValueStr = checkValue.map((item) => item.fieldCn);
      window.openSetTextModalNew(
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
      let voildStr=text.trim();
          if (checkValueStr.includes(text)) {
            this.$message.error(`修改${label}失败!已存在${text}项目`);
          } else if(voildStr == null || voildStr == '' || voildStr == undefined ){
             this.$message.error(`修改${label}失败!请输入自定义内容`);
          }else {
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
        timeStr: this.nomalTimeStr.includes(this.query.recordStr)
          ? this.query.entryTime + ":00:00"
          : this.query.recordStr,
        vitalSignList: obj,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
      };
      let flasg = [];
      for (let key in this.multiDictList) {
        flasg.push(this.vitalSignObj[this.multiDictList[key]].isCorrect);
        if (flasg.includes(false)) {
          this.isCorrect = false;
        } else {
          this.isCorrect = true;
        }
      }
      if (this.isCorrect === true) {
        await saveAll(data).then((res) => {
          this.$message.success("保存成功");
          this.getList();
          this.bus.$emit("refreshImg");
          setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 500);
        });
      } else {
        this.$message.error("存在数据错误！请检查");
      }
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
          width: 150px;
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

  .rowbox {
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
  .selection-dict-item {
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    &:hover {
      background: rgb(111, 192, 164) !important;
      color: #fff !important;
    }
  }
}
</style>
