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
    <el-tabs v-model="editableTabsValue" type="card" tab-position="right">
      <!-- 获取该患者的前二十条体温单记录，label -->
      <el-tab-pane
        v-for="(item, key) in vitalSignData"
        :key="key"
        :label="key"
        :name="key"
      >
        <div style="margin:10px;"><span>日期:</span>{{ key }}</div>
        <div class="fixedList">
          <div class="row" v-for="(j, index) in multiDictList" :key="index">
            <span
              class="preText"
              v-if="
                !(
                  index.includes('自定义') ||
                  index.includes('注释') ||
                  index.includes('体温复测')
                )
              "
              >{{ index }}</span
            >
            <input
              type="text"
              v-if="
                !(
                  index.includes('自定义') ||
                  index.includes('注释') ||
                  index.includes('体温复测')
                )
              "
              v-model="item.vitalSignList[j].vitalValue"
            />
          </div>
        </div>
        <!-- <div class="fixedList">
          <div class="row">
            <div class="preText">体温</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['体温']].vitalValue"
            />
            <div class="preText">脉搏</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['脉搏']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">腋温</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['腋温']].vitalValue"
            />
            <div class="preText">口温</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['腋温']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">肛温</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['肛温']].vitalValue"
            />
            <div class="preText">呼吸</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['呼吸']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">血压</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['血压']].vitalValue"
            />
            <div class="preText">大便次数</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['大便次数']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">疼痛</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['疼痛']].vitalValue"
            />
            <div class="preText">心率</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['心率']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">物理降温</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['物理降温']].vitalValue"
            />
            <div class="preText">疼痛干预</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['疼痛干预']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">呼吸机R</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['呼吸机R']].vitalValue"
            />
            <div class="preText">身高</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['身高']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">体重</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['体重']].vitalValue"
            />
            <div class="preText">总出量</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['总出量']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">总入量</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['入量']].vitalValue"
            />
            <div class="preText">尿量</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['尿量']].vitalValue"
            />
          </div>
          <div class="row">
            <div class="preText">大便量</div>
            <input
              type="text"
              v-model="item.vitalSignList[multiDictList['大便量']].vitalValue"
            />
          </div>
        </div> -->
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
            v-model="item.vitalSignList[multiDictList['表顶注释']].vitalValue"
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
            v-model="item.vitalSignList[multiDictList['表顶注释']].expand1"
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
            v-model="item.vitalSignList[multiDictList['表底注释']].vitalValue"
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
            v-model="item.vitalSignList[multiDictList['表底注释']].expand1"
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
  saveAll
} from "../../api/api";
export default {
  props: { patientInfo: Object },
  data() {
    return {
      bus: bus(this),
      editableTabsValue: "2",
      setDate: "",
      query: {
        patientId: this.patientInfo.patientId,
        visitId: this.patientInfo.visitId,
        recordDate: moment(new Date(this.patientInfo.admissionDate)).format(
          "YYYY-MM-DD"
        ),
        wardCode: this.patientInfo.wardCode
      },
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
    selectDate: {
      get: function() {
        this.setDate = moment(new Date(this.patientInfo.admissionDate)).format(
          "YYYY-MM-DD"
        );
        return this.setDate;
      },
      set: function(v) {
        this.setDate = v;
      }
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
        recordDate: moment(new Date(this.patientInfo.admissionDate)).format(
          "YYYY-MM-DD"
        ),
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
    selectTemRec(val) {
      this.selectDate = val;
      this.query.recordDate = this.selectDate;
      console.log(this.query);
      this.getList();
    },
    /* 获取字典表，整理某一行的同步信息 */
    getVitalList() {
      let patientInfo = this.$store.state.sheet.patientInfo;
      getmultiDict(patientInfo.wardCode).then(res => {
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
    /* 新建记录 */
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      let newRecordDate = moment(new Date()).format("YYYY-MM-DD  HH:mm:ss");
      this.init();
      this.vitalSignData[newRecordDate] = {
        vitalSignList: this.vitalSignObj
      };
      this.tabsData.push(newRecordDate);
      this.editableTabsValue = newTabName;
    },
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
            item.expand1 = this.topExpandDate;
            break;
          case "表底注释":
            item.expand1 = this.bottomExpandDate;
          default:
            break;
        }
      });
      await saveAll({ vitalSignList: obj }).then(res => {
        this.$message.success("保存成功");
      });
      await this.bus.$emit("refreshImg");
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
  .fixedList {
    .row {
      &:last-child {
        position: relative;
        left: -47px;
      }
    }
  }
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
