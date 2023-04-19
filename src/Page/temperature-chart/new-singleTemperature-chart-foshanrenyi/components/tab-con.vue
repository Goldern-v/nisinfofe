<template>
  <div class="right-con" :style="contentHeight">
    <div class="row-top">
      <div class="column-right">
        <el-date-picker
          id="date-picker"
          type="date"
          arrow-control
          size="small"
          style="width: 120px"
          format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="query.entryDate"
          clearable
        />
        <div class="times" @keydown.stop="(e) => show(e)">
          <el-time-select
            v-model="dateInp"
            value-format="HH:mm"
            format="HH:mm"
            ref="timeSelect"
            @blur="changeDate"
            @change="changeVal"
          @focus="getSelectionStart"
          @keydown.native="getSelectionStartInput"
            :picker-options="{
              start: '02:00',
              step: '04:00',
              end: '22:00',
            }"
            class="new-time-select"
            placeholder="选择时间"
          >
          </el-time-select>
        </div>
        <div class="save-btn-top" v-if="patientInfo.patientId">
          <el-button
            :disabled="isDisable()"
            :type="isUpdate ? 'warning' : 'primary'"
            class="save-top"
            @click="saveVitalSign(vitalSignObj)"
            >{{ isUpdate ? "更新" : "保存" }}</el-button>
        </div>
      </div>
    </div>
    <div class="row-bottom">

      <null-bg v-if="!patientInfo.patientId"></null-bg>
      <div v-else class="showRecord">

        <div class="record-list" :style="{ width: `${35}%` }">
          <div class="record-item" v-if="!isUpdate">
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
              @dblclick="
                (e) => rightMouseDown(e, item.recordDate, item.recordPerson)
              "
              @click="changeQuery(item.recordDate)"
              slot="reference"
            >
              {{ item.recordDate.slice(5, 17) }}
              {{ item.recordPerson }}
              <i
                @click="removeRecord(item.recordDate, tabIndex)"
                class="el-icon-delete"
              ></i>
            </div>
          </div>
          <div class="record-item" v-else>
            <span style="color: red"> 此次更新的录入记录: </span>
            <div
              :class="['recordList', 'active'].join(' ')"
              style="margin: 0px"
              @dblclick="(e) => rightMouseDown()"
              slot="reference_2"
            >
              {{
                `${updateData.entryDate.slice(
                  5,
                  17
                )} ${updateData.entryTime.slice(0, 5)}`
              }}
              {{ updateData.updatePerson }}
              <i class="el-icon-edit"></i>
            </div>
          </div>
        </div>
        <div class="inputter-region" :style="contentHeight">
          <el-collapse v-model="activeNames" @change="handleChange">
            <div style="border-radius: 7px; overflow: hidden">
              <el-collapse-item name="biometric" >
                <template slot="title">
                  <span class="title"> 体征信息 </span>
                  <!-- <i class="header-icon el-icon-info"></i> -->
                </template>
                <div
                  :class="
                    index.includes('自定义') ||
                    index.includes('注释') ||
                    index.includes('体温复测')
                      ? 'rowItem_noShow'
                      : (i - 1) % 2 === 0
                      ? 'rowBoxRight'
                      : 'rowBox'
                  "
                  v-for="(j, index, i) in baseMultiDictList"
                  :key="index"
                  class="pathological"
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
                      @keydown.enter.prevent="changeNext"
                      :type="
                        totalDictInfo[index].inputType === '2'
                          ? 'number'
                          : 'text'
                      "
                      :title="vitalSignObj[j].vitalValue"
                      @mousewheel="
                        (e) => {
                          e.preventDefault();
                        }
                      "
                      @input="
                        () => {
                          handlePopRefresh(vitalSignObj[j]);
                          validFormFc(vitalSignObj[j], i + 1);
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
              <div
                class="context-box"
                v-if="Object.keys(this.otherMultiDictList).length"
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
                      index.includes('体温复测')
                        ? 'rowItem_noShow'
                        : (i - 1) % 2 === 0
                        ? 'rowBoxRight'
                        : 'rowBox'
                    "
                    v-for="(j, index, i) in otherMultiDictList"
                    :key="index"
                    class="otherPathological"
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
                        :id="i + 100"
                        @keydown.enter.prevent="changeNext"
                        :type="
                          totalDictInfo[index].inputType === '2'
                            ? 'number'
                            : 'text'
                        "
                        :title="vitalSignObj[j].vitalValue"
                        @mousewheel="
                          (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        "
                        @input="
                          () => {
                            handlePopRefresh(vitalSignObj[j]);
                            validFormFc(vitalSignObj[j], i + 100);
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
            <div class="context-box" v-if="Object.keys(fieldList).length">
              <el-collapse-item name="fieldList">
                <template slot="title">
                  <span class="title"> 自定义项目 </span>
                  <el-button
                    type="primary"
                    v-if="['foshanrenyi'].includes(HOSPITAL_ID)"
                    class="copy-btn"
                    @click.stop="copyLastBox"
                    >复制</el-button
                  >
                  <i class="header-icon el-icon-info"></i>
                </template>
                <div class="fieldList">
                  <div
                    :class="(h - 1) % 2 === 0 ? 'rowBoxRight' : 'rowBox'"
                    v-for="(i, index, h) in fieldList"
                    :key="index"
                  >
                    <div style="overflow:hidden;width:105px;height:23px;">
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
                      :id="h + 1000"
                      type="text"
                      class="fieldClass"
                      @keydown.enter.prevent="changeNext"
                      :title="vitalSignObj[i.vitalCode].vitalValue"
                      @input="
                        () => {
                          handlePopRefresh(vitalSignObj[j]);
                          validFormFc(vitalSignObj[j], h + 100);
                        }
                      "
                      @mousewheel="
                        (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      "
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
                    clearable
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
                </div>
                <!--目前武警是没有用的中间注释的--->
                <div class="rowBox" v-if="multiDictList['中间注释']">
                  <span class="preText">中间注释</span>
                  <el-select
                    :disabled="isDisable()"
                    size="mini"
                    clearable
                    v-model="vitalSignObj[multiDictList['中间注释']].expand1"
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
                  <el-date-picker
                    size="mini"
                    :readonly="isDisable()"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    v-model="vitalSignObj[multiDictList['表底注释']].expand2"
                    type="datetime"
                    placeholder="选择日期时间"
                    style="margin: 3px 0px 0px 55px; width: 170px"
                    @change="formatCenterExpandDate"
                  >
                  </el-date-picker>
                </div>
                <div
                  class="rowBox"
                  v-if="multiDictList['表底注释']"
                  style="margin-left: 10%"
                >
                  <span class="preText">表底注释</span>
                  <el-select
                    size="mini"
                    :disabled="isDisable()"
                    clearable
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
              >{{ isUpdate ? "更新" : "保存" }}</el-button
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
import { validForm } from "../../validForm/validForm";
import {
  getVitalSignListByDate,
  copySetting,
  getmultiDict,
  getfieldList,
  savefieldTitleNew,
  autoVitalSigns,
  saveAll,
  deleteRecord,
  getViSigsByReDate,
} from "../../api/api";
import mock_dic from '../components/dic_test.json'
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

    let entryTime = "02:00:00";
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
        entryTime: moment().format("HH:mm") + ":00", //录入时间
      },
      updateData: {
        entryDate: "", //更新录入日期
        entryTime: "", //更新时间
        updatePerson: "", //原来的记录人
      },
      recordDate: "",
      activeNames: ["biometric", "otherBiometric", "notes", "fieldList"],
      checkItem: [
        "腋温",
        "体温",
        "脉搏",
        "心率",
        "口温",
        "肛温",
        "疼痛评分",
        "疼痛干预",
        "物理降温",
      ],
      fieldList: {}, // 自定义项目列表
      multiDictList: {}, //全部的字典信息，生成保存的数组用
      baseMultiDictList: {}, //基本体征信息
      otherMultiDictList: {}, //其他体征信息
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
      bottomIndex: [],
      dateInp: moment().format("HH:mm"),
      bottomContextList: [""],
      contentHeight: { height: "" }, //页面高度
      topExpandDate: "",
      bottomExpandDate: "",
      centerExpandDate: "",
      totalDictInfo: {},
      isUpdate: false,
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
    //时间监听
    this.bus.$on("dateChangeEvent", (type) => {
      switch (type) {
        case 'pre':
          this.preDate()
          break;
        case 'next':
          this.nextDate()
        default:
          break;
      }
    });
  },
  computed: {
    isPain() {
      return this.$store.state.temperature.isPain;
    },
  },
  watch: {
    query: {
      handler(newName, oldName) {
        if (this.query.entryTime && this.query.entryDate && !this.isUpdate) {
        this.getList();
        this.bus.$emit("dateChangePage", this.query.entryDate);
        }
      },
      deep: true,
    },
    patientInfo() {
      this.isUpdate = false;
    },
  },
  methods: {
    copyLastBox(){
      copySetting(
        {visitId:  this.patientInfo.visitId,
        patientId:  this.patientInfo.patientId,
        wardCode: this.patientInfo.wardCode,
        recordDate: moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")}
      ).then(res=>{
        res.data.data.list.map((item) => {
          if (this.vitalSignObj[item.vitalCode])
          this.fieldList[item.vitalCode] = item;
        });
      })
    },
    handleChange(val) {
      // console.log(val);
    },
    formatDate(date) {
      return moment(new Date(date)).format("YYYY-MM-DD");
    },
    preDate() {
      this.query.entryDate = moment(
        new Date(this.query.entryDate).getTime() - 24 * 60 * 60 * 1000
      ).format("YYYY-MM-DD");
    },
    nextDate() {
      this.query.entryDate = moment(
        new Date(this.query.entryDate).getTime() + 24 * 60 * 60 * 1000
      ).format("YYYY-MM-DD");
    },
    getHeight() {
      this.contentHeight.height = window.innerHeight - 110 + "px";
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
        this.getList();
        setTimeout(() => {
          this.bus.$emit("dateChangePage", this.query.entryDate);
        }, 1000);
      });

      if (type === "0") {
        this.query.entryDate = this.patientInfo.admissionDate.slice(0, 10);
        this.dateInp = this.patientInfo.admissionDate.slice(11, 20);
      }
    },
    show(e) {
      if (e.keyCode == 13) {
        this.changeDate(this.$refs.timeSelect);
      }
    },
    setValid(trage, val) {
      switch (trage) {
        case "腋温":
        case "体温":
        case "肛温":
        case "口温":
        case "物理降温":
          let o = {
            体温: {
              value: val,
              reg: [32, 42],
              errorMsg: "体温请填入30~42之间的数值",
            },
          };
          return o;
        case "脉搏":
        case "心率":
          let y = {
            脉搏: {
              value: val,
              reg: [0, 220],
            },
          };
          return y;
        case "疼痛评分":
        case "疼痛干预":
          let g = {
            疼痛评分: {
              value: val,
              reg: [0, 10],
            },
          };
          return g;
        default:
          break;
      }
    },
    validFormFc(vitalSignObj, index) {
      let val = vitalSignObj.vitalValue;
      if (val !== "" && this.checkItem.includes(vitalSignObj.vitalSigns)) {
        //验证表单
        if (validForm.valid(this.setValid(vitalSignObj.vitalSigns, val))) {
          document.getElementById(index).style.outline = "";
          vitalSignObj.isCorrect = true;
        } else {
          document.getElementById(index).style.outline = "1px solid red";
          vitalSignObj.isCorrect = false;
        }
      } else {
        document.getElementById(index).style.outline = "";
        vitalSignObj.isCorrect = true;
      }
    },
    changeNext(e) {
      if (e.target.className === "el-tooltip") {
        let baseLength = document.getElementsByClassName("pathological").length;
        let otherLength =
          document.getElementsByClassName("otherPathological").length;
        this.otherDicListLength = otherLength;
        if (Number(e.target.id) < baseLength) {
          document.getElementById(Number(e.target.id) + 1).focus();
        } else if (Number(e.target.id) === baseLength) {
          document.getElementById("100").focus();
        } else if (
          Number(e.target.id) > baseLength &&
          Number(e.target.id) < otherLength + 100 - 1
        ) {
          document.getElementById(Number(e.target.id) + 1).focus();

        }
        if (Number(e.target.id) >= 100 + otherLength - 1) {

          document.getElementById("1000").focus();
        }
      } else {
        let inputListLength =
          document.getElementsByClassName("fieldClass").length;
        if (Number(e.target.id) < inputListLength + 1000 - 1) {
          document.getElementById(Number(e.target.id) + 1).focus();
        } else if (Number(e.target.id) === inputListLength + 1000 - 1) {
          document.getElementById("1").focus();
        }
      }
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
      let input = document.getElementsByTagName("input");
      for (let i = 0; i < input.length; i++) {
        input[i].style.outline = "";
      }
    },
    getSelectionStartInput(e) {
      if (e.target.value.length >= "2" && e.target.value.indexOf(":") == -1 && e.keyCode != 8) {
        setTimeout(() => {
          e.target.value = this.insert_flg(e.target.value, ":");
        }, 10);
      }
      const smallKeyCode = [96, 105]
      const numberKeyCode = [48, 57]
      //如果按的是数字，说明在录入时间 录完前面给他定位到后面
      if ((e.keyCode >= smallKeyCode[0] && e.keyCode <= smallKeyCode[1]) || (e.keyCode >= numberKeyCode[0] && e.keyCode <= numberKeyCode[1])) {
        if (e.target.value) {
          const input = e.target;
          setTimeout(() => {
            input.focus();
            if (input.selectionStart == 2) {
              input.setSelectionRange(3, 6);
            }
          });
          setTimeout(()=>{
      e.target.value = e.target.value.substring(0, 5);
      if(e.target.value.length==5)
      this.changeDate(this.$refs.timeSelect)
          }, 100)
        }
      }
    },
    insert_flg(str, flg) {
      str = str.replace(flg, "");
      str = str.replace(/(.{2})/, `$1${flg}`);
      return str;
    },
    //聚焦默认聚焦前两个字符串
    getSelectionStart(e) {
      const input = e.$el.children[1]
      setTimeout(() => {
        input.focus()
        if ((input.selectionStart == 0 && input.selectionEnd == 0) || (input.selectionStart == 5 && input.selectionEnd == 5))
          input.setSelectionRange(0, 2)
      })
    },
    //时间组件失去焦点
    changeDate(val) {
      let numberVal
      if (val.$el.children[1].value.includes('：') || val.$el.children[1].value.includes('；') || val.$el.children[1].value.includes(';')) {
        numberVal = val.$el.children[1].value.replace('：', ':').replace('；', ':').replace(';', ':');
        this.dateInp = numberVal
      } else {
        numberVal = val.$el.children[1].value
      }
      if (
        (numberVal.indexOf(":") == -1 && numberVal.length == 4) ||
        (numberVal.indexOf(":") != -1 && numberVal.length == 5)
      ) {
        let time =
          numberVal.indexOf(":") == -1
            ? `${numberVal.substring(0, 2)}:${numberVal.substring(2, 4)}`
            : `${numberVal.substring(0, 2)}:${numberVal.substring(3, 5)}`;
        let [hours, min] = time.split(":");
        if (0 <= hours && hours < 24 && 0 <= min && min <= 59) {
          this.query.entryTime = time + ":00";
          this.dateInp = time;
        } else {
          this.$message.error("请输入正确时间数值，例如23:25, 2325");
          val.$el.children[1].focus()
          if(hours >= 24){
            val.$el.children[1].setSelectionRange(0,2)
          }else{
            val.$el.children[1].setSelectionRange(3,6)
          }
        }
      } else if (numberVal.indexOf(":") != -1 && numberVal.length <= 4) {
        let [hours, min] = numberVal.split(":");
        if (hours < 10 && hours.toString().length < 2) hours = `0${hours}`
        if (min < 10 && min.toString().length < 2) min = `0${min}`
        this.query.entryTime = `${hours}:${min}:00`
        this.dateInp = `${hours}:${min}`;
      } else {
        this.query.entryTime = val.$el.children[1].value;
        this.dateInp = val.$el.children[1].value;;
      }
    },
    // 下拉选项触发查询
    changeVal(newVal, oldVal) {
      if (newVal && newVal.split(":").length == 2) {
        this.query.entryTime = newVal + ":00";
        this.dateInp = newVal;
      }
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
      this.query.entryTime = value.slice(12, 20);
      //this.query.entryTime = value.slice(12, 20);
      //赋值初始值
      this.dateInp = value.slice(12, 17);
       //更新模式，把日期+时间更新到updateData
      if (this.isUpdate) {
        this.updateData.entryDate = temp.slice(0, 10);
        this.updateData.entryTime = value.slice(12, 20);
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
        let baseDic = [];
        let otherDic = [];
        let data = [];
        let obj = [];
        res.data.data.map((item, index) => {
          this.totalDictInfo[item.vitalSign] = {
            ...item,
            options: item.selectType ? item.selectType.split(",") : [],
          };
          data[item.vitalSign] = item.vitalCode;
          switch (item.signType) {
            case "base":
            if(!["表顶注释","表底注释"].includes(item.vitalSign))
              baseDic[item.vitalSign] = item.vitalCode;
              break;
            case "other":
            if(!["表顶注释","表底注释"].includes(item.vitalSign))
              otherDic[item.vitalSign] = item.vitalCode;
              break;
            default:
              break;
          }
          if (item.vitalSign.includes("自定义")||item.signType=='custom') {
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
    async rightMouseDown(e, dateTime, recordPerson) {
      if (!this.isDisable()) {
        if (!this.isUpdate) {
          this.$confirm("进入更新此条记录,此记录会被替换", "更新记录", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.isUpdate = !this.isUpdate;
              this.updateData.entryDate = dateTime.slice(0, 10);
              this.updateData.entryTime = dateTime.slice(12, 20);
              this.updateData.updatePerson = recordPerson;
            })
            .catch(() => {});
        } else {
          this.isUpdate = !this.isUpdate;
        }
      }
    },
    /* 删除记录 */
    async removeRecord(targetName, index) {
      if (!this.isDisable()) {
        if (this.isUpdate) {
          deleteRecord({
            patientId: this.patientInfo.patientId,
            recordDate:
              moment(new Date(this.updateData.entryDate)).format("YYYY-MM-DD") +
              "  " +
              this.updateData.entryTime,
            visitId: this.patientInfo.visitId,
            wardCode: this.patientInfo.wardCode,
          }).then((res) => {
            this.bus.$emit("refreshImg");
            setTimeout(() => {
              this.bus.$emit("dateChangePage", this.query.entryDate);
            }, 1000);
          });
        } else {
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
              }, 1000);
            });
          });
        }
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
        setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 1000);
      });
    },
    /* 修改自定义标题，弹出弹窗并保存 */
    updateTextInfo(key, label, autotext, index) {
      let checkValue = Object.values(this.fieldList) || [];
      let checkValueStr = checkValue.map((item) => item.fieldCn);
      if (!this.isDisable()&& !this.isUpdate) {
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
            let voildStr = text.trim();
            if (checkValueStr.includes(text)) {
              this.$message.error(`修改${label}失败!已存在${text}项目`);
            } else  (
              voildStr == null ||
              voildStr == "" ||
              voildStr == undefined
            ); {
              // this.$message.error(`修改${label}失败!请输入自定义内容`);
              savefieldTitleNew(data).then((res) => {
                this.fieldList[index].fieldCn = text;
                this.$message.success(`修改${label}成功`);
              });
            }
            // else {
            //   savefieldTitleNew(data).then((res) => {
            //     this.fieldList[index].fieldCn = text;
            //     this.$message.success(`修改${label}成功`);
            //   });
            // }
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
      let recordDate =
        moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
        "  " +
        this.query.entryTime;
      let saveFlagArr = [];
      obj.map((item) => {
        item.recordDate = recordDate;
        switch (item.vitalSigns) {
          case "表顶注释":
            item.expand2 =
              moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
              " " +
              this.query.entryTime;
            break;

          default:
            break;
        }
        if (
          item.vitalValue !== "" &&
          this.checkItem.includes(item.vitalSigns)
        ) {
          if (
            !validForm.valid(this.setValid(item.vitalSigns, item.vitalValue))
          ) {
            saveFlagArr.push(false);
          }
        }
      });
      let data = {
        dateStr: moment(new Date(this.query.entryDate)).format("YYYY-MM-DD"),
        timeStr: this.query.entryTime,
        vitalSignList: obj,
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
      };
      if (saveFlagArr.includes(false)) {
        this.$message.error("存在数值错误,请耐心检查!");
      } else {
        if (this.isUpdate) await this.removeRecord();
        await saveAll(data).then((res) => {
          this.$message.success("保存成功");
        });
        this.getList();
        this.bus.$emit("refreshImg");
        setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 1000);
      }
    },
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
    display: flex;
    align-items:baseline;
    justify-content:flex-start;
    margin-left: 15px;
    height: 50px;
    width:100%;
    overflow: auto;
  }

  .row-top {
    background-color: #fff;
    height: 47px;
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

      .record-list::-webkit-scrollbar {
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
    >>>.el-collapse-item__header {
    height:33px !important;
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
      height: 33px;
    }
  }
  >>>.el-select .el-input .el-input__icon {
    color: #67ae8f;
  }
  .times {
    display: inline-block;
    width: 85px;
    margin: 7px 0px 0px 7px;

    .new-time-select {
      height: 29px;
      width: 85px;
      display: inline-block;

      >>>.el-input__inner {
        height: 32px !important;
        display: inline-block;
        width: 85px;
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
    height: 40px;

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
    height: 40px;
    margin-left: 10%;

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
  .copy-btn{
    transform: scale(.8);
    position: relative;
    right: 20px;
    top: -5px;
  }
  .save-btn {
    position: relative;
    left: 30%;
    margin-top: 10px;
    width: 100px;
  }
  .save-top {
    width: 70px;
    margin-left:5px;
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
