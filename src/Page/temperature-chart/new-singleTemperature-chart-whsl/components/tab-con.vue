<template>
  <div class="right-con">
    <div class="row-top">
      <div class="column-right">
        <ElDatePicker
          id="date-picker"
          type="date"
          size="mini"
          style="width: 110px; height: 32px"
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
              size="mini"
              @blur="changeDate"
            @change="changeVal"
          @focus="getSelectionStart"
          @keydown.native="getSelectionStartInput"
            :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '23:00',
            }"
            class="new-time-select"
            placeholder="选择时间"
          >
          </el-time-select>
        </div>
          <el-button
          v-if="patientInfo.patientId"
          :disabled="isDisable()"
          class="save-btn-top"
          :type="isUpdate ? 'warning' : 'primary'"
          @click="saveVitalSign(vitalSignObj)"
          >{{ isUpdate ? "更新" : "保存" }}
          </el-button
        >
        <!-- <div class="times">
          <el-radio-group v-model="query.entryTime" @change="changeEntryTime">
            <el-radio
              size="mini"
              v-for="item in timesOdd1"
              :key="item.id"
              :label="item.value"
            ></el-radio>
          </el-radio-group>
        </div> -->
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
              @contextmenu.stop.prevent="
                (e) => rightMouseDown(e, item.recordDate, item.recordPerson)
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
          <div class="record-item" v-else>
            <span style="color: red"> 此次更新的录入记录: </span>
            <div
              :class="['recordList','active'].join(' ')"
              style="margin: 0px"
              :key="tabIndex"
              @contextmenu.stop.prevent="
                (e) => rightMouseDown()
              "
            >
            {{
                `${updateData.entryDate.slice(
                  5,
                  15
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
              <div v-if="!isBaby">
              <el-collapse-item name="biometric">
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
                      @input="()=>{
                        handlePopRefresh(vitalSignObj[j])
                        validFormFc(vitalSignObj[j], i + 1)
                      }"
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
              <div
                class="context-box"
                v-if="Object.keys(otherMultiDictList).length&& !isBaby"
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
                          }
                        "
                        @input="()=>{
                        handlePopRefresh(vitalSignObj[j])
                        validFormFc(vitalSignObj[j], i + 100)
                      }"
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
            <div
              class="context-box_first"
              v-if="Object.keys(babyMultiDictList).length && isBaby"
            >
              <el-collapse-item name="otherBiometric">
                <template slot="title">
                  <span class="title"> 婴儿体征 </span>
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
                  class="otherPathological"
                  v-for="(j, index, i) in babyMultiDictList"
                  :key="index"
                >
                  <div class="rowItemText">
                    <!--新生儿的大便次数 叫做粪便-->
                    <span>{{ index == "尿量" ? "小便次数" : index }}</span>
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
                      @input="
                        () => {
                          validFormFc(vitalSignObj[j], i + 100);
                          handlePopRefresh(vitalSignObj[j]);
                        }
                      "
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
            <!-- <div class="context-box" v-if="Object.keys(fieldList).length">
              <el-collapse-item name="fieldList">
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
                        >{{ i.fieldCn==='自定义1'?'其他':i.fieldCn }}</span
                      >
                    </div>

                    <input
                      :id="h + 1000"
                      class="fieldClass"
                      @keydown.enter.prevent="changeNext"
                      :title="vitalSignObj[i.vitalCode].vitalValue"
                      @mousewheel="
                        (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }
                      "
                      v-model="vitalSignObj[i.vitalCode].vitalValue"
                    />
                  </div>
                </div>
                <div class="bottom-box clear"></div>
              </el-collapse-item>
            </div> -->
            <div class="context-box">
              <el-collapse-item name="notes">
                <template slot="title">
                  <span class="title"> 注释 </span>
                  <i class="header-icon el-icon-info"></i>
                </template>
                <div class="rowBox" v-if="multiDictList['表顶注释']">
                  <span class="preText">表顶注释</span>
                  <el-select
                  clearable
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
                  <!-- <el-time-picker
                    size="mini"
                    :readonly="isDisable()"
                    v-model="timeVal"
                    placeholder="选择表顶时间"
                    style="width: 100%"
                    @change="formatTopExpandDate"
                  >
                  </el-time-picker> -->
                </div>
                <div
                  class="rowBox"
                  v-if="multiDictList['表底注释']"
                  style="margin-left: 10%"
                >
                  <span class="preText">表底注释</span>
                  <el-select
                  clearable
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
                </div>
                <div class="bottom-box clear"></div>
              </el-collapse-item>
            </div>
          </el-collapse>
          <!-- <div class="save"> -->
            <!-- <el-button
              :disabled="isDisable()"
              class="save-btn"
              :type="isUpdate ? 'warning' : 'primary'"
              @click="saveVitalSign(vitalSignObj)"
              >保存</el-button
            > -->
            <div class="clear" style="height: 30px"></div>
            <!--占位符-->
          <!-- </div> -->
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
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: moment().format("HH:mm")+':00', //录入时间
      },
       dateInp: moment().format("HH:mm"),
      updateData: {
        entryDate: "", //更新录入日期
        entryTime: "", //更新时间
        updatePerson: "", //原来的记录人
      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      activeNames: ["biometric", "otherBiometric","notes",'fieldList'],
      multiDictList: {}, //全部的字典信息，生成保存的数组用
      baseMultiDictList: {}, //基本体征信息
      otherMultiDictList: {}, //其他体征信息
      babyMultiDictList: {}, //新生儿体征信息
      contentHeight: { height: "" }, //页面高度
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
      bottomIndex: [],
      checkItem: [
        "体温",
        "脉搏",
        "心率",
        "口温",
        "肛温",
        "物理降温",
      ],
      timesOdd1: [
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
      bottomContextList: [""],
      topExpandDate: "",
      bottomExpandDate: "",
      centerExpandDate: "",
      totalDictInfo: {},
       timeStrFormat: "",
      isUpdate:false,
    };
  },
  async mounted() {
    await this.getVitalList();
    this.bus.$on("getDataFromPage", (dateTime) => {
      this.query.entryDate=dateTime.slice(0,10)
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
    // 首次录入体温单，时间显示入院时间
    this.bus.$on("neverWrite", (value) => {
      if (!value) {
        const admissionDate = this.patientInfo.admissionDate;
        this.query.entryDate = moment(admissionDate).format("YYYY-MM-DD");
        this.query.entryTime = moment(admissionDate).format("HH:mm");
      }
    });
  },
  computed: {
    isBaby(){
      return this.patientInfo.patientId &&this.patientInfo.patientId.includes('_')
    }
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
      //切换患者重新获得时间
      this.timeVal = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes()
      );
      this.isUpdate = false;
    },
  },
  methods: {
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
    handleChange(val) {
      // console.log(val);
    },
      formatDate(date){
      return  moment(new Date(date)).format("YYYY-MM-DD")
    },
    getHeight() {
      this.contentHeight.height = window.innerHeight - 110 + "px";
    },
    setValid(trage, val) {
      switch (trage) {
        case "体温":
        case "肛温":
        case "口温":
        case "物理降温":
          let o = {
            体温: {
              value: val,
              reg: [33, 42],
              errorMsg: "体温请填入30~42之间的数值",
            },
          };
          return o;
        case "脉搏":
          case "心率":
          let y = {
            脉搏: {
              value: val,
              reg: [0, 180],
            },
          };
          return y;
        default:
          break;
      }
    },
    validFormFc(vitalSignObj, index) {
      let val = vitalSignObj.vitalValue;
      if (
        val !== "" &&
        this.checkItem.includes(vitalSignObj.vitalSigns)
      ) {

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
            //每次初始化数据 改变原本错误数据的红色输入框
       let list = document.getElementsByTagName('input')
      for(let i = 0;i<list.length;i++){
        list[i].style.outline = ""
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
      this.timeStrFormat = temp.slice(18, 20);
      this.dateInp = value.slice(12, 17);
      // 北海在记录单那边同步数据,时间直接取点击的
      if (this.isUpdate) {
        this.updateData.entryDate = value.slice(0, 10);
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
      if( this.query.entryTime.replace(/:00/g,'').length==5){
        this.query.entryTime = this.query.entryTime.replace(/:00/g,'') + ":00";
      }else  if( this.query.entryTime.replace(/:00/g,'').length==2){
        this.query.entryTime = this.query.entryTime.replace(/:00/g,'') + ":00:00";
      }
      let data = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        dateStr: this.query.entryDate
          ? moment(new Date(this.query.entryDate)).format("YYYY-MM-DD")
          : moment(new Date(this.patientInfo.admissionDate)).format(
              "YYYY-MM-DD"
            ),
        timeStr: this.query.entryTime ,
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
        let baseDic = [];
        let otherDic = [];
        const babyDic = []
        let data = [];
        let obj = [];
        const babyType = [
          "01",
          "aurigo",
          "funicle",
          "breast",
          "milk",
          "033",
          "3",
        ]; //婴儿显示项目
        if (this.isBaby) {
          res.data.data.map((list) => {
            if (babyType.includes(list.vitalCode))
              babyDic[list.vitalSign] = list.vitalCode;
            this.totalDictInfo[list.vitalSign] = {
              ...list,
              options: list.selectType ? list.selectType.split(",") : [],
            };
            data[list.vitalSign] = list.vitalCode;
          });
        } else {
        res.data.data.map((item, index) => {
          this.totalDictInfo[item.vitalSign] = {
            ...item,
            options: item.selectType ? item.selectType.split(",") : [],
          };
          //跟PDA护理事件共用一个字典表  PDA会保存这些字典 所以这里要区分一下
          if(!['转入','死亡','手术','分娩','出生','请假','外出','出院'].includes(item.vitalSign)){
          data[item.vitalSign] = item.vitalCode;
          }
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
      }
        this.multiDictList = { ...data };
        this.baseMultiDictList = { ...baseDic };
        this.otherMultiDictList = { ...otherDic };
        this.babyMultiDictList = {...babyDic}
        this.init();
      });
    },
    //右键更新记录
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
              this.updateData.entryTime = dateTime.slice(12,20);
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
                this.query.entryTime ,
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
    show(e) {
      if (e.keyCode == 13) {
        this.changeDate(this.$refs.timeSelect);
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
    /* 录入体温单 */
    async saveVitalSign(value) {
      let obj = Object.values(value);
      let saveFlagArr = [];
      if( this.query.entryTime.replace(/:00/g,'').length==5){
        this.query.entryTime = this.query.entryTime.replace(/:00/g,'') + ":00";
      }else  if( this.query.entryTime.replace(/:00/g,'').length==2){
        this.query.entryTime = this.query.entryTime.replace(/:00/g,'') + ":00:00";
      }
      obj.map((item) => {
        item.recordDate =
          moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
          "  " +
          this.query.entryTime ;
        switch (item.vitalSigns) {
          case "表顶注释":
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
        this.$confirm("存在数值错误,请耐心检查!,点击确定保存", "提示", {
          showCancelButton:true,
          cancelButtonText: '取消',
            type: "error",
          }).then(async()=>{
            //不做保存限制  改为保存提醒
            if (this.isUpdate) await this.removeRecord();
        await saveAll(data).then((res) => {
          if(this.isUpdate){
          this.$message.success("更新成功,双击记录返回录入界面！");

          }else{
          this.$message.success("保存成功");
          }
        });
        await this.getList();
        this.bus.$emit("refreshImg");
        setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
        }, 1000);
          })
      }else{
         //不做保存限制 验证通过直接保存
        if (this.isUpdate) await this.removeRecord();
        await saveAll(data).then((res) => {
          if(this.isUpdate){
          this.$message.success("更新成功,双击记录返回录入界面！");

          }else{
          this.$message.success("保存成功");
          }
        });
        await this.getList();
        this.bus.$emit("refreshImg");
        setTimeout(() => {
        this.bus.$emit("dateChangePage", this.query.entryDate);
      }, 1000);
      }
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
    margin-top: 5px;
    display: inline-block;
    height: 54px;
    width:100%;
    overflow: auto;
  }

  .row-top {
    background-color: #fff;
    height: 54px;

    .column-left {
      margin: 10px 45px 0px 0px;
      flex-direction: column;
    }
  }

  .row-bottom {
    height: 100%;

    .showRecord {
      height: 100%;
      display:flex;

      .record-list {
        height: 100%;
        background-color: #fff;
        border-radius: 0px 7px 7px 0px;
        margin: 5px 3px 0px 0px;
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
      margin-left:5px;
      height:28px;
    }
  }

  .times {
    display: inline-block;
    margin: 00px 0px 0px 3px;

    .el-radio {
      margin-left: 5px !important;
    }

    .new-time-select {
      height: 28px;
      width: 100px;
      display: inline-block;

      >>>.el-input__inner {
        height: 28px !important;
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
    over-flow:hidden;

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
  .save-btn-top {
    position: relative;
    margin-top: 10px;
    left:10px;
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
  >>>.el-radio__inner {
    height: 16px !important;
    width: 16px !important;
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
