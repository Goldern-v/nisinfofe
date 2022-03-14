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
      </div> -->
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
        <div style="flex: 4">
          <div
            :class="
              [
                'recordList',
                dateTime.match(`${formatDate(query.entryDate)}  ${query.entryTime}`)
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
                @keydown.enter="changeNext"
                :type="['腋表','脉搏','心率','呼吸','口表','肛表','物理降温'].includes(index)?'number':'text'"
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
                        () => (vitalSignObj[j].vitalValue = vitalSignObj[j].vitalValue+option)
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
            <div class="row" v-for="(i, index, h) in fieldList" :key="index">
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
                :id="h + 100"
                type="text"
                class="fieldClass"
                @keydown.enter="changeNext"
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
            <el-date-picker
              size="mini"
              :readonly="isDisable()"
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
          <div class="row" v-if="multiDictList['中间注释']">
            <span class="preText">中间注释</span>
            <el-select
              :disabled="isDisable()"
              size="mini"
              v-model="vitalSignObj[multiDictList['中间注释']].vitalValue"
            >
             <el-option
                v-for="(item, Index) in getFilterSelections(
                  totalDictInfo['中间注释'].options,
                  vitalSignObj[multiDictList['中间注释']].vitalValue
                )"
                :key="Index"
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
              @change="formatCenterExpandDate"
            >
            </el-date-picker> -->
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
  getNowDateTimeList,
  getmultiDict,
  getVitalSignListByDate,
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
      ["04"]: ["00:00", "04:59"],
      ["08"]: ["05:00", "08:59"],
      ["12"]: ["09:00", "12:59"],
      ["16"]: ["13:00", "16:59"],
      ["20"]: ["17:00", "20:59"],
      ["24"]: ["21:00", "23:59"],
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
      mockData,
      recordList,
      bus: bus(this),
      editableTabsValue: "2",
      query: {
        entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
        entryTime: (() => {
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
          //录入时间
        })(), //录入时间
      },
      recordDate: "",
      fieldList: {}, // 自定义项目列表
      multiDictList: {},
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
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
      bottomContextList: [""],
      topExpandDate: "",
      bottomExpandDate: "",
      centerExpandDate: "",
      totalDictInfo: {},
      selectionMultiDict: selectionMultiDict,
    };
  },
  async mounted() {
    await this.getVitalList();
    this.bus.$on("refreshVitalSignList", () => {
      this.getList();
    });

  },

  created() {},
  computed: {},
  watch: {
    query: {
      handler(newName, oldName) {
        this.getList();
      },
      deep: true,
    },
    vitalSignObj:{
      handler(newVal){
        if(newVal[this.multiDictList['表顶注释']].expand1 == '入院|'){
          newVal[this.multiDictList['表顶注释']].expand2 = this.patientInfo.admissionDate;
        }
      },
      deep:true,
      immediate:true,
    },


  },
  methods: {
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
       formatDate(date){
      return  moment(new Date(date)).format("YYYY-MM-DD")
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
        this.query.entryTime + ":00:00",
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
    /* 选择固定时间点 */
    changeEntryTime(val) {
      this.query.entryTime = val;
    },
        changeEntryTime(value){
      this.query.entryTime = value;
      this.query.recordStr = value + ":00:00";
    },
    /* 联动修改查询的日期和时间 */
    changeQuery(value) {
      let temp = value;
      this.query.entryDate = temp.slice(0, 10);

      // 北海在记录单那边同步数据,时间直接取点击的
      if (this.$route.path.includes('newSingleTemperatureChart')||this.$route.path.includes('temperature')) {
       this.query.entryTime = temp.slice(12, 14);
      }else{
        this.query.entryTime = value.split("  ")[1];
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
        timeStr: this.query.entryTime + ":00:00",
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
               recordDate:
        moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
        "  " +
        this.query.entryTime + ":00:00",
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
            item.expand2 = this.topExpandDate;
            break;
          case "中间注释":
            item.expand2 =moment(new Date(this.query.entryDate)).format("YYYY-MM-DD") +
          " " +
          this.query.entryTime +
          ":00:00";
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
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

  .rowbox {
    display: inline-block;
    padding: 3px 5px;

    .preText {
      display: inline-block;
      width: 50px;
    }

    input {
      width: 48px;
      font-size: 12px;
    }

    .el-select {
      width: 85px;
    }
  }

  .row {
    display: inline-block;
    padding: 3px 15px;

    .preText {
      display: inline-block;
      width: 50px;
    }

    input {
      width: 48px;
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
