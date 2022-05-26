<template>
  <div class="right-con">
    <div class="row-top">
      <div class="column-right">
        <el-date-picker
          class="date-picker"
          id="date-picker"
          type="date"
          size="mini"
          style="width: 130px; height: 28px"
          format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="query.entryDate"
        />
        <div class="times" @keydown.stop="(e) => show(e)">
          <el-time-select
            v-model="dateInp"
            format="HH:mm"
            ref="timeSelect"
            @blur="changeDate"
            @change="changeVal"
            :picker-options="{
              start: '03:00',
              step: '04:00',
              end: '23:00',
            }"
            class="new-time-select"
            placeholder="选择时间"
          >
          </el-time-select>
        </div>
        <div class="save-btn-top" v-if="patientInfo.patientId">
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
    <div class="row-bottom">
      <null-bg v-if="!patientInfo.patientId"></null-bg>
      <div v-else class="showRecord">
        <div class="record-list" :style="{ width: `${35}%` }">
          <div class="record-item">
            <div
              :class="
                [
                  'recordList',
                  item.recordDate.match(
                    `${formatDate(query.entryDate)}  ${dateInp}`
                  )
                    ? 'active'
                    : '',
                ].join(' ')
              "
              style="margin: 0px"
              v-for="(item, tabIndex) in tabsData"
              :key="tabIndex"
              @contextmenu.stop.prevent="
                (e) => rightMouseDown(e, item.recordDate, tabIndex)
              "
              @click="changeQuery(item.recordDate)"
            >
              {{ item.recordDate.slice(5, 17) }}
              {{ item.recordPerson }}
              <i
                @click="removeRecord(item.recordDate, tabIndex)"
                class="el-icon-delete"
              ></i>
            </div>
          </div>
        </div>
        <div class="inputter-region" :style="contentHeight">
          <el-collapse v-model="activeNames">
            <div style="border-radius: 7px; overflow: hidden">
              <el-collapse-item name="biometric">
                <template slot="title">
                  <span class="title"> 体征信息 </span>
                  <!-- <i class="header-icon el-icon-info"></i> -->
                </template>
                <div
                  :class="
                    index.includes('自定义') ||
                    index.includes('注释') ||
                    index.includes('体温复测') ||
                    [
                      '小便次数',
                      '脐带',
                      '皮肤',
                      '班次',
                      '人工次数',
                      '母乳次数',
                      '呕吐',
                    ].includes(index)
                      ? 'rowItem_noShow'
                      : (i - 1) % 2 === 0
                      ? 'rowBoxRight'
                      : 'rowBox'
                  "
                  v-for="(j, index, i) in baseMultiDictList"
                  :key="index"
                >
                  <div class="rowItemText">
                    <span>{{ index }}</span>
                  </div>
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
                      @keydown.enter="changeNext"
                      type="text"
                      :title="vitalSignObj[j].vitalValue"
                      @mousewheel="
                        (e) => {
                          e.preventDefault();
                        }
                      "
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
                              () =>
                                (vitalSignObj[j].vitalValue =
                                  vitalSignObj[j].vitalValue + option)
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
                <div class="bottom-box clear"></div>
              </el-collapse-item>
              <div
                class="context-box"
                v-if="Object.keys(otherMultiDictList).length"
              >
                <el-collapse-item name="otherBiometric">
                  <template slot="title">
                    <span class="title"> 其他信息 </span>
                    <i class="header-icon el-icon-info"></i>
                  </template>
                  <div
                    :class="
                      index.includes('自定义') ||
                      index.includes('注释') ||
                      index.includes('体温复测') ||
                      [
                        '小便次数',
                        '脐带',
                        '皮肤',
                        '班次',
                        '人工次数',
                        '母乳次数',
                        '呕吐',
                      ].includes(index)
                        ? 'rowItem_noShow'
                        : (i - 1) % 2 === 0
                        ? 'rowBoxRight'
                        : 'rowBox'
                    "
                    v-for="(j, index, i) in otherMultiDictList"
                    :key="index"
                  >
                    <div class="rowItemText">
                      <span>{{ index }}</span>
                    </div>
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
                        @keydown.enter="changeNext"
                        type="text"
                        :title="vitalSignObj[j].vitalValue"
                        @input="handlePopRefresh(vitalSignObj[j])"
                        @mousewheel="
                          (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        "
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
                                () =>
                                  (vitalSignObj[j].vitalValue =
                                    vitalSignObj[j].vitalValue + option)
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
                  <div class="bottom-box clear"></div>
                </el-collapse-item>
              </div>
            </div>
            <div class="context-box">
              <el-collapse-item
                name="fieldList"
                v-if="Object.keys(fieldList).length"
              >
                <template slot="title">
                  <span class="title"> 自定义项目 </span>
                  <i class="header-icon el-icon-info"></i>
                </template>
                <div class="fieldList">
                  <div
                    :class="(h - 1) % 2 === 0 ? 'rowBoxRight' : 'rowBox'"
                    v-for="(i, index, h) in fieldList"
                    :key="index"
                  >
                    <div>
                      <span
                        class="preText"
                        style="color: blue"
                        @click="
                          updateTextInfo(
                            i.vitalCode,
                            i.fieldCn,
                            i.fieldCn,
                            index
                          )
                        "
                        >{{ i.fieldCn }}</span
                      >
                    </div>

                    <input
                      :id="h + 100"
                      type="text"
                      class="fieldClass"
                      @keydown.enter="changeNext"
                      :title="vitalSignObj[i.vitalCode].vitalValue"
                      @input="handlePopRefresh(vitalSignObj[i.vitalCode])"
                      @click="
                        () => (vitalSignObj[i.vitalCode].popVisible = true)
                      "
                      @blur="
                        () => (vitalSignObj[i.vitalCode].popVisible = false)
                      "
                      v-model="vitalSignObj[i.vitalCode].vitalValue"
                    />
                  </div>
                </div>
                <div class="bottom-box clear"></div>
              </el-collapse-item>
            </div>
            <div class="context-box">
              <el-collapse-item name="notes">
                <template slot="title">
                  <span class="title"> 注释 </span>
                  <i class="header-icon el-icon-info"></i>
                </template>
                <div class="rowBox" v-if="multiDictList['表顶注释']">
                  <span class="preText">表顶注释</span>
                  <el-select
                    :disabled="isDisable()"
                    size="mini"
                    v-model="vitalSignObj[multiDictList['表顶注释']].expand1"
                    clearable
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
                </div>
                <!-- <div class="rowBoxRight" v-if="multiDictList['表顶注释']">
                   <span class="preText">表顶时间</span>
                     <el-time-picker
                    size="mini"
                    :readonly="isDisable()"
                    v-model="timeVal"
                    placeholder="选择表顶时间"
                    style="width: 100%"
                    @change="formatTopExpandDate"
                  >
                  </el-time-picker>
                </div> -->
                <!--目前武警是没有用的中间注释的--->
                <div class="rowBoxRight" v-if="multiDictList['中间注释']">
                  <span class="preText">中间注释</span>
                  <el-select
                    :disabled="isDisable()"
                    size="mini"
                    v-model="vitalSignObj[multiDictList['中间注释']].expand1"
                    clearable
                  >
                    <el-option
                      v-for="(item, bottomIndex) in getFilterSelections(
                        totalDictInfo['中间注释'].options,
                        vitalSignObj[multiDictList['中间注释']].vitalValue
                      )"
                      :key="bottomIndex"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div
                  class="rowBox"
                  style="height: 67px"
                  v-if="multiDictList['表底注释']"
                >
                  <span class="preText">表底注释</span>
                  <el-select
                    size="mini"
                    :disabled="isDisable()"
                    v-model="vitalSignObj[multiDictList['表底注释']].expand1"
                    clearable
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
                </div>
                <div class="bottom-box clear"></div>
              </el-collapse-item>
            </div>
          </el-collapse>
          <div class="save">
            <el-button
              :disabled="isDisable()"
              type="primary"
              class="save-btn"
              @click="saveVitalSign(vitalSignObj)"
              >保存</el-button
            >
            <div class="clear" style="height: 30px"></div>
            <!--占位符-->
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
  getmultiDict,
  getVitalSignListByDate,
  getfieldList,
  savefieldTitle,
  autoVitalSigns,
  saveAll,
  deleteRecord,
  getViSigsByReDate,
} from "../../api/api";
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

    let entryTime = "02";

    return {
      bus: bus(this),
      editableTabsValue: "2",
      timeVal: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ),
      nowTimeVal: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      ),
      dateInp: moment().format("HH:mm"),
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: moment().format("HH:mm") + ":00", //录入时间
      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      activeNames: ["biometric", "otherBiometric", "notes", "fieldList"],
      multiDictList: {}, //全部的字典信息，生成保存的数组用
      baseMultiDictList: {}, //基本体征信息
      otherMultiDictList: {}, //其他体征信息
      contentHeight: { height: "" }, //页面高度
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
      bottomIndex: [],
      bottomContextList: [""],
      topExpandDate: "",
      bottomExpandDate: "",
      centerExpandDate: "",
      totalDictInfo: {},
      timeStrFormat: "",
    };
  },
  async mounted() {
    await this.getVitalList();
    this.bus.$on("syncInAndOutHospital", (type) => {
      this.syncInAndOutHospital(type);
    });
    this.bus.$on("getDataFromPage", (dateTime) => {
      this.query.entryDate = dateTime.slice(0, 10);
      this.query.entryTime = dateTime.slice(11, 16) + ":00";
      this.dateInp = dateTime.slice(11, 16);
    });
  },

  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
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
    patientInfo() {
      //切换患者重新获得时间
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
    formatDate(date) {
      return moment(new Date(date)).format("YYYY-MM-DD");
    },
    show(e) {
      if (e.keyCode == 13) {
        this.changeDate(this.$refs.timeSelect);
      }
    },
    //时间组件失去焦点
    changeDate(val) {
      let numberVal = val.$el.children[1].value;
      // if(!moment(numberVal,"HH:mm",true).isValid()) {
      //     this.$message.error("请输入正确时间数值，例如23:25, 2325");
      //     return false;
      // }
      if (
        (numberVal.indexOf(":") == -1 && numberVal.length == 4) ||
        (numberVal.indexOf(":") != -1 && numberVal.length == 5)
      ) {
        let time =
          numberVal.indexOf(":") == -1
            ? `${numberVal.substring(0, 2)}:${numberVal.substring(2, 4)}`
            : `${numberVal.substring(0, 2)}:${numberVal.substring(3, 5)}`;
        // if(!moment(numberVal,"HH:mm",true).isValid()) {
        //   this.$message.error("请输入正确时间数值，例如23:25, 2325");
        //   return false;
        // }
        let [hours, min] = time.split(":");
        if (0 <= hours && hours <= 24 && 0 <= min && min <= 59) {
          this.query.entryTime = time + ":00";
          this.dateInp = time;
        } else {
          this.$message.error("请输入正确时间数值，例如23:25, 2325");
        }
      } else {
        this.query.entryTime = val.$el.children[1].value;
      }
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

 getHeight() {
      this.contentHeight.height = window.innerHeight - (this.$route.path.includes('nursingPreview')?40:100) + "px";
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
          /* 时间数组 */
          this.tabsData.push({
            recordDate: item.recordDate,
            recordPerson: item.vitalSignList[0].nurseName,
          });
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
          this.query.entryTime,
      }).then((res) => {
        res.data.data.list.map((item) => {
          if (this.vitalSignObj[item.vitalCode])
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

    /* 联动修改查询的日期和时间 */
    changeQuery(value) {
      let temp = value;
      this.query.entryDate = temp.slice(0, 10);
      this.query.entryTime = value.slice(12, 20);
      this.dateInp = value.slice(12, 17);
      this.timeStrFormat = temp.slice(18, 20);
    },
    // 下拉选项触发查询
    async changeVal(newVal, oldVal) {
      //操作时间
      await this.formatTimeFun(newVal);
      this.timeStrFormat = "";
    },
    formatTimeFun(newVal) {
      if (newVal.split(":").length == 2) {
        if (this.timeStrFormat === "00" || this.timeStrFormat === "") {
          this.query.entryTime = newVal + ":00";
        } else {
          this.query.entryTime = newVal + `:${this.timeStrFormat}`;
        }
      }
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
        timeStr: this.query.entryTime,
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
              if (v.expand1 === "入院") {
                this.vitalSignObj[v.vitalCode].expand1 = "入院|";
              }
              if (v.expand1 === "出院") {
                this.vitalSignObj[v.vitalCode].expand1 = "出院|";
              }
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
        let baseDic = [];
        let otherDic = [];
        let data = [];
        let obj = [];
        res.data.data.filter((item) => {
          return item.wardCode === "*";
        });
        res.data.data.map((item, index) => {
          this.totalDictInfo[item.vitalSign] = {
            ...item,
            options: item.selectType ? item.selectType.split(",") : [],
          };
          data[item.vitalSign] = item.vitalCode;
          switch (item.signType) {
            case "base":
              baseDic[item.vitalSign] = item.vitalCode;
              break;
            case "other":
              otherDic[item.vitalSign] = item.vitalCode;
              break;
            default:
              break;
          }
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
        this.baseMultiDictList = { ...baseDic };
        this.otherMultiDictList = { ...otherDic };
        this.init();
      });
    },
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
            setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 500);
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
        this.getList();
        this.$message.success("同步成功");
        await this.bus.$emit("refreshImg");
         setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 500);
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
              recordDate:
                moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
                "  " +
                this.query.entryTime,
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
          this.query.entryTime;
        switch (item.vitalSigns) {
          case "表顶注释":
            item.expand2 = item.expand2 =
              moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
              " " +
              this.topExpandDate;
            break;
          case "中间注释":
            item.expand2 =
              moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
              " " +
              this.query.entryTime;
            break;
          case "表底注释":
            item.expand2 = this.bottomExpandDate;
            break;
          default:
            break;
        }
      });
      let data = {
        dateStr: moment(new Date(this.query.entryDate)).format("YYYY-MM-DD"),
        timeStr: this.query.entryTime,
        vitalSignList: obj,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
      };
      await saveAll(data).then((res) => {
        this.$message.success("保存成功");
      });
      this.getList();
      this.bus.$emit("refreshImg");
       setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 500);
    },
    formatTopExpandDate(val) {
      this.topExpandDate = val;
    },
    formatBtmExpandDate(val) {
      this.bottomExpandDate = val;
    },
    formatCenterExpandDate(val) {
      this.centerExpandDate = val;
    },
    //设置体温单是否可编辑
  },
  components: { nullBg },
};
</script>

<style lang="stylus" scoped>
.right-con {
  width: 100%;
  font-size: 12px;
  display: flex;
  flex-direction: column;

  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  .column-right {
    margin-left: 3%;
    display: inline-block;
    height: 50px;
    width: 100%;
    overflow: auto;
  }

  .save-btn-top {
    width: 50px;
    display: inline-block;
  }

  .row-top {
    background-color: #fff;
    height: 47px;

    .column-left {
      margin: 10px 45px 0px 0px;
      flex-direction: column;
    }
  }

  .row-bottom {
    height: 100%;

    .showRecord {
      height: 100%;

      .record-list {
        height: 100%;
        background-color: #fff;
        border-radius: 0px 7px 7px 0px;
        margin: 5px 3px 0px 0px;
        float: left;
        overflow: auto;
      }
      .record-list::-webkit-scrollbar{
    display: none;
          }

      >div {
        .recordList {
          line-height: 30px;
          border: 1px solid #eee;
          padding: 0 6px;
          text-align: center;
          font-size: 12px;

          &.active {
            color: rgb(68, 158, 127);
          }
        }
      }
    }

    .null-bg {
      background-color: #fff;
      height: 1000px;
      margin-top: 5px;
    }

    .inputter-region {
      width: 63%;
      float: left;
      border-radius: 5px 0px 0px 5px;
      margin: 5px 0px 0px 3px;
      overflow: scroll;
      overflow-x: hidden;
      overflow-y: auto;

      .title {
        color: black;
        font-weight: bold;
        font-size: 16px;
        position: relative;
        left: -14%;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      }

      >>>.el-collapse-item__header i {
        position: relative;
        left: 90%;
      }
    }
  }

  #date-picker {
    >>>input {
      pointer-events: auto !important;
    }

    >>>.el-input__inner {
      border-radius: 6px;
      margin-left: 5px;
      height: 28px;
    }
  }

  .times {
    display: inline-block;
    margin: 10px 0px 0px 3px;

    .el-radio {
      margin-left: 5px !important;
    }

    .new-time-select {
      height: 29px;
      width: 100px;
      display: inline-block;

      >>>.el-input__inner {
        height: 32px !important;
        display: inline-block;
        width: 100px;
        border-radius: 6px;
      }
    }
  }

  .rowItem_noShow {
    display: none;
  }

  .rowBox {
    width: 45%;
    float: left;


    input {
      width: 95%;
      font-size: 15px;
      border: none;
      outline: 0px;
      border-bottom: 1px solid rgb(214, 214, 214);
    }

    .el-select {
      width: 85px;
    }
  }

  .el-collapse-item__header__arrow {
    position: relative !important;
    left: 80% !important;
  }

  .el-collapse {
    border: none !important;
  }

  .rowBoxRight {
    width: 45%;
    float: left;
    margin-left: 10%;
    over-flow:hidden;

    input {
      width: 95%;
      font-size: 16px;
      border: none;
      outline: 0px;
      border-bottom: 1px solid rgb(214, 214, 214);
    }

    .el-select {
      width: 85px;
    }
  }

  .fieldList {
    border-radius: 7px 0px 0px 7px;
  }

  .save-btn {
    position: relative;
    left: 30%;
    margin-top: 10px;
    width: 100px;
  }

  .inputter-region::-webkit-scrollbar {
    display: none;
  }

  .showRecord::-webkit-scrollbar {
    display: none;
  }

  .inputter-region::-webkit-scrollbar {
    display: none;
  }

  .context-box {
    margin-top: 7px;
    border-radius: 7px !important;
    overflow: hidden;
  }

  .bottom-box {
    width: 100%;
    height: 10px;
  }

  .clear {
    clear: both;
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
