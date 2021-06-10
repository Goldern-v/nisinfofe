<template>
  <div class="right-con">
    <el-button size="mini" @click="addTab(editableTabsValue)">
      + 新建记录
    </el-button>
    <el-date-picker
      size="mini"
      v-model="selectDate"
      type="date"
      style="width:110px;"
      placeholder="选择日期"
      @change="selectTemRec"
    >
    </el-date-picker>
    <el-button size="mini" @click="syncInAndOutHospital((type = '0'))">
      同步入院
    </el-button>
    <el-button size="mini" @click="syncInAndOutHospital((type = '1'))">
      同步出院
    </el-button>
    <null-bg v-show="!(tabsData && vitalSignData)"></null-bg>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      tab-position="right"
      closable
      @tab-remove="removeRecord"
    >
      <!-- 获取该患者的前二十条体温单记录，label -->
      <el-tab-pane
        v-for="(item, key) in vitalSignData"
        :key="key"
        :label="key"
        :name="key"
      >
        <div class="fixedList">
          <div
            :class="
              !(
                index.includes('自定义') ||
                index.includes('腋温') ||
                index.includes('注释') ||
                index.includes('体温复测')
              )
                ? 'row'
                : 'rowItem_noShow'
            "
            v-for="(j, index) in multiDictList"
            :key="index"
          >
            <span class="preText">{{ index }}</span>
            <input type="text" v-model="item.vitalSignList[j].vitalValue" />
          </div>
        </div>
        <div class="fieldList">
          <div>
            <span>自定义项目：</span>
          </div>
          <div class="row" v-for="(i, index) in fieldList" :key="index">
            <span
              class="preText"
              style="color:blue"
              @click="updateTextInfo(i.vitalCode, i.fieldCn, i.fieldCn)"
              >{{ i.fieldCn }}</span
            >
            <input
              type="text"
              v-model="item.vitalSignList[i.vitalCode].vitalValue"
            />
          </div>
        </div>
        <div class="fieldList">
          <div class="row">
            <span class="preText">体温复测</span>
            <input
              type="text"
              v-if="multiDictList['体温复测']"
              v-model="item.vitalSignList[multiDictList['体温复测']].vitalValue"
            />
          </div>
        </div>
        <div class="row" v-if="multiDictList['表顶注释']">
          <span class="preText">表顶注释</span>
          <el-select
            size="mini"
            v-model="item.vitalSignList[multiDictList['表顶注释']].expand1"
          >
            <el-option
              v-for="(item, index) in topContextList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-date-picker
            size="mini"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="item.vitalSignList[multiDictList['表顶注释']].expand2"
            type="datetime"
            placeholder="选择日期时间"
            style="margin:3px 0px 0px 55px;width:170px;"
            @change="formatTopExpandDate"
          >
          </el-date-picker>
        </div>
        <div class="row" v-if="multiDictList['表底注释']">
          <span class="preText">表底注释</span>
          <el-select
            size="mini"
            v-model="item.vitalSignList[multiDictList['表底注释']].expand1"
          >
            <el-option
              v-for="(item, index) in bottomContextList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-date-picker
            size="mini"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="item.vitalSignList[multiDictList['表底注释']].expand2"
            type="datetime"
            placeholder="选择日期时间"
            style="margin:3px 0px 0px 55px;width:170px;"
            @change="formatBtmExpandDate"
          >
          </el-date-picker>
        </div>
        <div>
          <el-button
            type="primary"
            class="save-btn"
            @click="saveVitalSign(item.vitalSignList, key)"
            >保存</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
    <sweet-modal :modalWidth="300" ref="modal" title="选择时间">
      <div style="margin:10px;">
        <span class="filterItem date">
          <span class="type-label">日期:</span>
          <el-date-picker
            size="mini"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="entryTime"
            type="datetime"
            placeholder="选择日期时间"
            style="width:170px;"
            @change="formatEntryDate"
          />
        </span>
        <div class="times" v-if="HOSPITAL_ID === 'liaocheng'">
          <label
            :for="`time${item.id}`"
            v-for="item in timesOdd"
            :key="item.id"
          >
            <input
              type="radio"
              name="time"
              v-model="entryTime"
              :id="`time${item.id}`"
              :value="item.value"
            />
            {{ item.value }}
          </label>
        </div>
      </div>
      <div slot="button">
        <el-button class="modal-btn" type="primary" @click="close"
          >确定</el-button
        >
      </div>
    </sweet-modal>
  </div>
</template>
<script>
import bus from "vue-happy-bus";
import moment from "moment";
import nullBg from "../../../../components/null/null-bg";
import {
  getVitalSignList,
  getmultiDict,
  getfieldList,
  savefieldTitle,
  autoVitalSigns,
  saveAll,
  deleteRecord
} from "../../api/api";
export default {
  props: { patientInfo: Object },
  data() {
    return {
      bus: bus(this),
      editableTabsValue: "2",
      selectDate: "",
      query: {
        recordDate: moment(new Date(this.patientInfo.admissionDate)).format(
          "YYYY-MM-DD"
        )
      },
      recordDate: "",
      vitalSignData: [], // 体温单列表
      tabsData: [], // 日期列表
      vitalSignObj: {}, // 单个体征对象
      vitalSignList: [], // 固定项目列表
      fieldList: {}, // 自定义项目列表
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2,
      topContextList: [
        "",
        "入院",
        "转入",
        "手术",
        "分娩",
        "出院",
        "出生",
        "手术入院",
        "死亡"
      ],
      entryDate: moment(new Date()).format("YYYY-MM-DD"), //录入日期
      entryTime: "07", //录入时间
      timesOdd: [
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
      ],
      bottomContextList: ["", "不升"],
      topExpandDate: "",
      bottomExpandDate: ""
    };
  },
  mounted() {
    // this.getList();
    this.getVitalList();
    this.bus.$on("refreshVitalSignList", () => {
      this.getList();
    });
  },
  created() {},
  computed: {
    entryDateTime() {
      return this.entryDate + "  " + this.entryTime + ":00:00";
    }
  },
  methods: {
    init() {
      let obj = {};
      /* 根据字典项构造一个对象(键为生命体征的中文名，值为对应的对象)：{"体温":{}} */
      for (let key in this.multiDictList) {
        obj[this.multiDictList[key]] = {
          bedLabel: "",
          classCode: "",
          createDateTime: "",
          expand1: "",
          expand2: "",
          expand3: "",
          id: {
            patientId: "",
            recordDate: "",
            visitId: "",
            vitalSigns: "",
            wardCode: ""
          },
          nurse: "",
          patientId: this.patientInfo.patientId,
          recordDate: "",
          source: "",
          units: "",
          visitId: this.patientInfo.visitId,
          vitalCode: this.multiDictList[key],
          vitalSigns: key,
          vitalValue: "",
          wardCode: this.patientInfo.wardCode
        };
      }
      this.vitalSignObj = { ...obj };
    },
    async getList() {
      /* 初始化 */
      this.tabsData = [];
      this.vitalSignData = [];
      /* 定义 */
      let obj = {};
      let data = {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: this.selectDate
          ? this.selectDate
          : this.patientInfo.admissionDate.slice(0, 10),
        wardCode: this.patientInfo.wardCode
      };
      /* 获取体温单列表接口 */
      await getVitalSignList(data).then(res => {
        res.data.data.map((item, index) => {
          this.init();
          /* 如果该患者没有体温单记录则返回 */
          if (!item.recordDate) return;
          /* 对返回的vitalSignList数组遍历获取每个元素对象值，赋值给上面构造好的vitalSignObj对象 */
          item.vitalSignList.map((v, idx) => {
            this.vitalSignObj[v.vitalCode] = v;
          });
          /* 再构造最外一层对象：以obj={"item.recordDate":{vitalSignList:{"体温":{}} }} */
          obj[item.recordDate] = {
            recordDate: item.recordDate,
            vitalSignList: this.vitalSignObj
          };
          /* 用于标签栏遍历时间数组 */
          this.tabsData.push(item.recordDate);
        });
        /* 通过扩展运算符把每次遍历结果都加到vitalSignData对象里 */
        this.vitalSignData = { ...obj };
      });
      /* 获取固定列表的接口 */
      await getfieldList({
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        wardCode: this.patientInfo.wardCode
      }).then(res => {
        res.data.data.list.map(item => {
          this.fieldList[item.vitalCode] = item;
        });
      });
    },
    /* 日期搜索功能 */
    selectTemRec(val) {
      this.selectDate = val;
      this.query.recordDate = this.selectDate;
      console.log(this.query.recordDate);
      this.getList();
    },
    /* 获取字典表，整理某一行的同步信息 */
    getVitalList() {
      let wardCode = this.patientInfo.wardCode;
      getmultiDict(wardCode).then(res => {
        let data = [];
        let obj = [];
        res.data.data.map((item, index) => {
          data[item.vitalSign] = item.vitalCode;
          if (item.vitalSign.includes("自定义")) {
            obj[item.vitalCode] = {
              fieldCn: item.vitalSign,
              patientId: this.patientInfo.patientId,
              visitId: this.patientInfo.visitId,
              vitalCode: item.vitalCode,
              wardCode: this.patientInfo.wardCode
            };
            this.fieldList = { ...obj };
          }
        });
        this.multiDictList = { ...data };
      });
    },
    /* 新建记录，打开弹窗 */
    addTab(targetName) {
      this.$refs.modal.open();
    },
    /* 关闭弹窗 */
    async close() {
      let newTabName = ++this.tabIndex + "";
      let newRecordDate = this.entryDateTime;
      this.init();
      this.tabsData.push(newRecordDate);
      this.vitalSignData[newRecordDate] = {
        recordDate: newRecordDate,
        vitalSignList: this.vitalSignObj
      };
      this.editableTabsValue = newTabName;
      this.$refs.modal.close();
    },
    /* 删除记录 */
    async removeRecord(targetName) {
      let tabs = this.tabsData;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab === targetName) {
            deleteRecord({
              patientId: this.patientInfo.patientId,
              recordDate: tab,
              visitId: this.patientInfo.visitId,
              wardCode: this.patientInfo.wardCode
            }).then(res => {
              this.getList();
              this.bus.$emit("refreshImg");
            });
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab;
            }
            this.editableTabsValue = activeName;
          }
        });
      }
    },
    /* 同步入院、同步出院 */
    syncInAndOutHospital(type) {
      autoVitalSigns({
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        type: type
      }).then(res => {
        this.$message.success("同步成功");
      });
    },
    /* 修改自定义标题，弹出弹窗并保存 */
    updateTextInfo(key, label, autotext) {
      window.openSetTextModal(
        text => {
          let data = {
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId,
            wardCode: this.patientInfo.wardCode,
            vitalCode: key,
            fieldCn: text
          };
          savefieldTitle(data).then(res => {
            this.$message.success(`修改${label}成功`);
          });
          this.getList();
        },
        autotext,
        `修改${label}`
      );
    },
    async saveVitalSign(value, key) {
      let obj = Object.values(value);
      obj.map(item => {
        item.recordDate = key;
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
        recordDate: key,
        vitalSignList: obj
      };
      await saveAll(data).then(res => {
        this.$message.success("保存成功");
      });
      this.getList();
      this.bus.$emit("refreshImg");
    },
    formatEntryDate(val) {
      this.entryDate = moment(new Date(val)).format("YYYY-MM-DD");
    },
    formatTopExpandDate(val) {
      this.topExpandDate = val;
    },
    formatBtmExpandDate(val) {
      this.bottomExpandDate = val;
    }
  },
  components: { nullBg }
};
</script>

<style lang="stylus" scoped>
.right-con {
  width: 100%;
  background: #fff;
  font-size: 12px;
  .rowItem_noShow{
    display :none;
  }
  .row {
    display: inline-block;
    padding: 3px;

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
  // .fixedList {
  //   .row {
  //     &:last-child {
  //       position: relative;
  //       left: -47px;
  //     }
  //   }
  // }
}
.el-tabs {
  display: flex;
  /deep/ .el-tabs__header {
    /* overflow-y: auto; */
    border: 1px solid #eee !important;
    height: 100%;
  }
  /deep/ .el-tabs__item {
    height: 34px;
    border: 1px solid #eee !important;
    font-size: 12px;
    &.is-active {
      background: #f1f1f5;
      color: #000;
    }
  }
  /deep/ .el-tabs__nav {
    width: 100%;
    height: 600px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  /deep/ .el-tabs__content {
    overflow: auto;
    height: 590px;
    position: relative;
  }
  .save-btn {
    position: absolute;
    left: 30%;
    margin-top: 10px;
    width: 100px;
  }
}
</style>
