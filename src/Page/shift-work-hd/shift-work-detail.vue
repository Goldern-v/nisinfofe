<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode"/>
      </ElSelect>
      <span style="margin-right: -10px"></span>
      <!-- <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()">自动生成数据</Button> -->
      <!-- <Button @click="onSave(true)">保存</Button> -->
      <el-dropdown size="small" @command="onSignModalOpen">
        <Button>交班签名</Button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :disabled="!!record.changeShiftTimes.autographNameA" command="A">
            <span class="sign-select-item">A班交班签名</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="!!record.changeShiftTimes.autographMeetNameA" command="A接">
            <span class="sign-select-item">A班接班签名</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="!!record.changeShiftTimes.autographNameP" command="P">
            <span class="sign-select-item">P班交班签名</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="!!record.changeShiftTimes.autographMeetNameP" command="P接">
            <span class="sign-select-item">P班接班签名</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="!!record.changeShiftTimes.autographNameN" command="N">
            <span class="sign-select-item">N班交班签名</span>
          </el-dropdown-item>
          <el-dropdown-item :disabled="!!record.changeShiftTimes.autographMeetNameN" command="N接">
            <span class="sign-select-item">N班接班签名</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographNameA" @click="onRemove">删除交班志</Button>
      <Button :disabled="isEmpty" @click="onToggleFullPage">{{getFullPage() ? '关闭全屏' : '全屏'}}</Button>
    </div>
    <div class="container">
      <Placeholder
        v-if="isEmpty"
        icon="el-icon-plus"
        @click="onCreateModalOpen($route.params.code)"
      >创建交班志</Placeholder>
      <div class="paper" v-else>
        <div ref="printable" data-print-style="height: auto;" style="width: 860px;">
          <div class="head shift-paper">
            <!-- <img :src="hospitalLogo" alt="logo" class="logo"> -->
            <h1 class="title">{{deptName}}</h1>
            <h2 class="sub-title">交班记录卡</h2>
            <div class="details" v-if="record.changeShiftTimes">
              <span>
                交班日期：
                <span>{{record.changeShiftTimes.changeShiftDate | toYMD}}</span>
                <span>{{record.changeShiftTimes.changeShiftDate | toWeek}}</span>
              </span>
            </div>
          </div>
          <ExcelTable
            ref="excelTable"
            class="table"
            :data="record"
            v-if="record && record.changeShiftTimes.id"
            data-print-style="height: auto;"
            @save="onSave"
          ></ExcelTable>
          <div class="foot" v-if="record" data-print-style="padding-bottom: 25px">
            <div data-print-style="width: auto">
              <span>A班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.changeShiftTimes.autographNameA"
                  @click="onDelSignModalOpen('A', record.changeShiftTimes.autographEmpNoA)"
                >{{record.changeShiftTimes.autographNameA}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('A')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographNameA"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographEmpNoA}?${token}`"
                :alt="record.changeShiftTimes.autographNameA"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
              <span>/</span>
              <span data-print-style="display: none">
                 <button
                  v-if="record.changeShiftTimes.autographMeetNameA"
                  @click="onDelSignModalOpen('A接', record.changeShiftTimes.autographMeetEmpNoA)"
                >{{record.changeShiftTimes.autographMeetNameA}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('A接')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographMeetNameA"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographMeetEmpNoA}?${token}`"
                :alt="record.changeShiftTimes.autographMeetNameA"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
            <div data-print-style="width: auto">
              <span>P班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.changeShiftTimes.autographNameP"
                  @click="onDelSignModalOpen('P', record.changeShiftTimes.autographEmpNoP)"
                >{{record.changeShiftTimes.autographNameP}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('P')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographNameP"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographEmpNoP}?${token}`"
                :alt="record.changeShiftTimes.autographNameP"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
              <span>/</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.changeShiftTimes.autographMeetNameP"
                  @click="onDelSignModalOpen('P接', record.changeShiftTimes.autographMeetEmpNoP)"
                >{{record.changeShiftTimes.autographMeetNameP}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('P接')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographMeetNameP"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographMeetEmpNoP}?${token}`"
                :alt="record.changeShiftTimes.autographMeetNameP"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
            <div data-print-style="width: auto">
              <span>N班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.changeShiftTimes.autographNameN"
                  @click="onDelSignModalOpen('N', record.changeShiftTimes.autographEmpNoN)"
                >{{record.changeShiftTimes.autographNameN}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('N')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographNameN"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographEmpNoN}?${token}`"
                :alt="record.changeShiftTimes.autographNameN"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
              <span>/</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.changeShiftTimes.autographMeetNameN"
                  @click="onDelSignModalOpen('N接', record.changeShiftTimes.autographMeetEmpNoN)"
                >{{record.changeShiftTimes.autographMeetNameN}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('N接')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographMeetNameN"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographMeetEmpNoN}?${token}`"
                :alt="record.changeShiftTimes.autographMeetNameN"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <PatientsModal ref="patientsModal" @confirm="onPatientsModalConfirm"/> -->
    <!-- <PatientModal
      ref="patientModal"
      :date="record ? record.changeShiftDate : ''"
      @confirm="onPatientModalConfirm"
      @panel-open="onPatientPanelOpen"
      @panel-close="onPatientPanelClose"
      @tab-change="onPatientModalTabChange"
    />-->
    <PatientPanel
      ref="patientPanel"
      @tab-change="onPatientPanelTabChange"
      @apply-template="onPatientPanelApply"
    />
    <SpecialCasePanel ref="specialCasePanel" @apply-template="onSpecialCasePanelApply"/>
    <SignModal ref="signModal"/>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import FallibleImage from "@/components/FallibleImage/FallibleImage.vue";
import { pick } from "lodash";
import print from "printing";

import * as apis from "./apis";
import formatter from "./print-formatter";
import Button from "./components/button";
import ExcelTable from "./components/excelTable";
import Placeholder from "./components/placeholder";
import PatientModal from "./components/patient-modal";
// import PatientsModal from "./components/patients-modal";
import PatientPanel from "./components/patient-panel";
import SpecialCaseModal from "./components/special-case-modal";
import SpecialCasePanel from "./components/special-case-panel";
import SignModal from "./components/sign-modal";
import moment from "moment";
const defaultPatient = {
  name: "",
  bedLabel: "",
  age: "",
  patientStatus: "",
  diagnosis: "",
  mainComplaint: "",
  background: "",
  assessmentSituation: "",
  proposal: ""
};

const arrowKeyValues = {
  // 13: 1, // ENTER
  37: -1, // ←
  38: -6, // ↑
  39: 1, // →
  40: 6 // ↓
};

export default {
  mixins: [common],
  inject: [
    "getFullPage",
    "reloadSideList",
    "onCreateModalOpen",
    "onToggleFullPage"
  ],
  async beforeRouteLeave(to, from, next) {
    if (this.modified) {
      await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning"
      });
    }
    this.$refs.specialCasePanel.close();
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    if (this.modified && from.params.id && from.params.id !== to.params.id) {
      await this.$confirm("交班志还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning"
      });
    }

    next();
  },
  data() {
    return {
      loading: false,
      modified: false,
      depts: [],
      record: {
        changeShiftTimes: {},
        changeShiftPatientLists: []
      },
      recordCopy: {},
      patients: [],
      copiedRow: null,
      /** 病人列表 选中的病人 */
      patientSelectedList: []
    };
  },
  computed: {
    deptName() {
      const code = this.$route.params.code;
      const dept = this.depts.find(d => d.deptCode === code);

      return (dept && dept.deptName) || "";
    },
    isEmpty() {
      return !this.$route.params.id || !this.record;
    },
    allSigned() {
      const record = this.record;
      return !!(
        record &&
        record.autographNameA &&
        record.autographNameP &&
        record.autographNameN
      );
    }
  },
  watch: {
    deptCode(value, oldValue) {
      if (oldValue !== value) {
        this.loadDepts();
      }
    },
    "$route.params.id"() {
      this.load();
    },
    modified(value, oldValue) {
      if (value !== oldValue) {
        window.onbeforeunload = value ? () => true : null;
      }
    }
  },
  mounted() {
    if (this.deptCode) {
      this.loadDepts();
    }
  },
  methods: {
    async loadDepts() {
      const parentCode = this.deptCode;
      const res1 = await apis.listDepartment(parentCode);
      const {
        data: { data: depts }
      } = res1;

      this.depts = depts;

      const code = depts[0] && depts[0].deptCode;
      const params = this.$route.params;

      if (!params.code) {
        this.$router.push({ path: `/shiftWork/${code}` });
      }
      this.reloadSideList();
    },
    onCodeChange(code) {
      this.$router.push({ path: `/shiftWork/${code}` });
    },
    async load() {
      const id = this.$route.params.id;
      if (!id) return;

      this.loading = true;
      try {
        const {
          data: { data }
        } = await apis.getShiftRecord(id);

        this.record = {
          changeShiftTimes: {},
          changeShiftPatientLists: []
        };
        this.$nextTick(() => {
          this.record = data;
        });
      } catch (error) {
        console.log(error);
        // this.$router.replace({ name: "shiftWorks" });
      }
      this.loading = false;
    },
    toHTML(source) {
      return (source || "").replace(/\n/g, "<br>");
    },
    onPatientsModalShow(d) {
      const id = this.$route.params.id;
      const deptCode = this.$route.params.code;
      const date = d || this.record.changeShiftDate;

      const patientSelectedList = this.patientSelectedList;

      this.$refs.patientsModal.open({
        deptCode,
        date,
        id,
        patientSelectedList
      });
    },
    onPatientsModalConfirm(patients, newPatientList) {
      // for (let p of patients) {
      //   this.$refs.table.addRow(p);
      // }
      /** 获取新选病人并赋值 */
      // let newPatientList = patients.filter(item => {
      //   return !this.patientSelectedList.find(item1 => {
      //     return (
      //       item.patientId === item1.patientId && item.visitId === item1.visitId
      //     );
      //   });
      // });
      if (newPatientList.length > 0) {
        this.modified = true;
      }
      this.$refs.excelTable.addPatient(newPatientList);
      this.patientSelectedList = patients;
      this.$refs.patientsModal.close();
    },
    onPatientModalShow() {
      this.$refs.table.selectRow(-1);
      this.$refs.patientModal.open();
    },
    onPatientModalConfirm(data) {
      const selectedRow = this.$refs.table.selectedRow;
      const isExisted = this.patients.find(
        p =>
          p.name && p.patientId === data.patientId && p.visitId === data.visitId
      );

      if (isExisted && isExisted !== selectedRow) {
        return this.$message.error("已存在该患者");
      }

      if (selectedRow) {
        this.$refs.table.updateRow(data);
      } else {
        this.$refs.table.addRow(data);
      }
      this.onSave(true);
      this.$refs.patientModal.close();
      // this.modified = true
    },
    onPatientModalTabChange(tab) {
      if (this.$refs.patientPanel) {
        this.$refs.patientPanel.changeTab(tab);
      }
    },
    onPatientPanelOpen() {
      this.$refs.patientPanel.open();
    },
    onPatientPanelClose() {
      this.$refs.patientPanel.close();
    },
    onPatientPanelTabChange(tab) {
      this.$refs.patientModal.changeTab(tab);
    },
    onPatientPanelApply({ tab, item }) {
      this.$refs.patientModal.applyTemplate(tab, item);
    },
    onSpecialCasePanelOpen() {
      this.$refs.specialCasePanel.open();
    },
    onSpecialCasePanelClose() {
      this.$refs.specialCasePanel.close();
    },
    onSpecialCasePanelApply(item) {
      this.record.specialSituation =
        (this.record.specialSituation || "") + item.content;
      this.modified = true;
    },
    async onSave(tip = true) {
      // let changeShiftTime = this.record;

      // const changeShiftPatients = this.patientSelectedList.filter(
      //   p => p.name || p.id
      // );
      let obj = {
        changeShiftTime: this.record.changeShiftTimes,
        changeShiftPatients: this.record.changeShiftPatientLists
      };

      await apis.updateShiftRecord(obj);

      this.load();
      if (tip) {
        this.$message.success("修改成功");
      }
    },
    onSignModalOpen(type) {
      if (this.modified) {
        return this.$message.warning("请先保存后再签名");
      }

      // if (type === "P" && !this.record.autographNameA) {
      //   return this.$message.warning("需要A班先签名");
      // }

      // if (type === "N" && !this.record.autographNameP) {
      //   return this.$message.warning("需要P班先签名");
      // }

      this.$refs.signModal.open({
        callback: async ({ username, password }) => {
          await apis.signShiftRecord(
            this.record.changeShiftTimes.id,
            type,
            username,
            password
          );
          this.load();
          this.$refs.signModal.close();
          this.$message.success("签名成功");

          if (type === "N") {
            this.reloadSideList();
          }
        }
      });
    },
    onDelSignModalOpen(autographNameType,sourceEmpNo) {
      this.$refs.signModal.open({
        title: "取消签名确认",
        callback: async ({ username, password }) => {
          await apis.delSignShiftRecord(
            this.record.changeShiftTimes.id,
            username,
            password,
            autographNameType,
            sourceEmpNo
          );

          this.load();
          this.$refs.signModal.close();
          this.$message.success("已取消签名");
          this.reloadSideList();
        }
      });
    },
    async onRemove() {
      this.$refs.signModal.open({
        callback: async ({ username, password }) => {
          await apis.removeShiftRecord(
            this.record.changeShiftTimes.id,
            username,
            password
          );

          const code = this.$route.params.code;

          this.$message.success("删除成功");
          this.$refs.signModal.close();
          this.modified = false;
          this.record = null;
          this.patients = [];
          this.$router.push({ path: `/shiftWork/${code}` });
          this.reloadSideList();
        }
      });
    },
    async onPrint() {
      this.loading = true;
      // preview
      await print(this.$refs.printable, {
        beforePrint: formatter,
        direction: "vertical",
        injectGlobalCss: true,
        scanStyles: false,
        css: `
          @page {
            size: portrait;
          }
          .el-textarea__inner {
            border: 0;
          }
          pre {
            white-space: pre-wrap;
          }
        `
      });
      this.loading = false;
    },
    onTableInputChange() {
      this.modified = true;
    },
    async onTableInputKeydown({ event, value, prop, row }) {
      if (event.keyCode === 13 && prop === "bedLabel") {
        event.preventDefault();

        if (value) {
          const date = this.record.changeShiftDate;
          const params = this.$route.params;
          const {
            data: { data }
          } = await apis.getPatient(params.code, value, date);

          if (data) {
            const isExisted = this.patients.find(
              p =>
                p.name &&
                p.patientId === data.patientId &&
                p.visitId === data.visitId
            );
            if (isExisted) return this.$message.error("已存在该患者");

            this.patients[row].name = data.name;
            this.patients[row].age = data.age;
            this.patients[row].diagnosis = data.diagnosis;
            this.patients[row].mainComplaint = data.complaint || "";
            this.patients[row].patientStatus = data.patientStatus;
            this.patients[row].patientId = data.patientId || "";
            this.patients[row].visitId = data.visitId || "";
            this.patients[row].proposal = data.advice || "";
            this.patients[row].assessmentSituation = data.evaluate || "";

            if (data.background !== "," && data.background !== "，") {
              this.patients[row].background += data.background;
            }
          } else {
            return this.$message.error("找不到该患者");
          }
        }
      }

      if (arrowKeyValues[event.keyCode] !== undefined) {
        const val = arrowKeyValues[event.keyCode];
        const target = event.target;

        const textareas = Array.prototype.slice.call(
          this.$refs.table.$refs.table.querySelectorAll("textarea"),
          0,
          -1
        );

        const index = textareas.indexOf(target);
        const toIndex = index + val;

        if (index < 0 || !textareas[toIndex]) return;

        textareas[toIndex].focus();
      }
    }
  },
  components: {
    FallibleImage,
    Button,
    ExcelTable,
    Placeholder,
    // PatientModal,
    // PatientsModal,
    PatientPanel,
    SpecialCaseModal,
    SpecialCasePanel,
    SignModal
  },
  filters: {
    toYMD(val) {
      try {
        return moment(val).format("YYYY年MM月DD日");
      } catch (error) {
        return "";
      }
    },
    toWeek(val) {
      try {
        return moment(val).format("dddd");
      } catch (error) {
        return "";
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
  .shift-work-detail
    display flex
    flex-direction column
    height 100%

  .toolbar
    display flex
    align-items center
    height 41px
    padding 0 18px
    background-image linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%)
    border 1px solid #CBD5DD
    overflow hidden
    font-size: 14px;

    .el-select
      margin-left: 8px;
      margin-right: 10px;

    .empty
      flex 1

  .container
    padding 15px 0
    flex 1
    min-height 0
    background #dfdfdf
    overflow auto

  .paper
    margin 0 auto 20px
    padding 20px
    width 900px
    min-height 700px
    border-radius 2px
    background #fff
    box-shadow 0 5px 10px 0 rgba(0, 0, 0, 0.5)
    box-sizing border-box

  .head
    position relative
    // padding 15px 0 10px

  .logo
    position absolute
    left 0
    top 0
    height 44px

  .title
    font-size 22px
    text-align center

  .sub-title
    margin-top 10px
    text-align center

  .details
    margin-top 10px
    margin-bottom 10px
    display flex
    justify-content space-between
    font-size 13px

  .table
    margin-top 5px

    >>>pre
      white-space: pre-wrap;

  .normal-row
    background white !important

  .row-title
    height 32px
    font-size 13px
    font-weight bold

  .row-action
    float right
    color rgb(40, 79, 194)
    cursor pointer

  .special-case-title
    padding: 10px;

  .special-case
    width 100%
    padding 8px 8px
    display block
    border none
    outline none
    box-sizing border-box
    line-height 1.4em
    font-size 13px
    min-height 100px !important

  .foot
    margin-top: 8px
    display flex
    justify-content space-between
    line-height 25px

    div
      font-size 0
      white-space nowrap

    img, span
      vertical-align middle
      font-size 13px

    .img
      display none
      width 52px
      max-height 25px

    button
      padding 0
      border none
      outline none
      background none
      color rgb(40, 79, 194)
      cursor pointer
.sign-select-item
  font-size 12px
</style>
<style lang="stylus">
@media print {
  .shift-paper {
    padding-top: 40px !important;
    .logo {
      top: 30px !important;
    }
    .textarea {
      border: 0 !important;
    }
  }
}
@page {
  margin: 0 10mm;
}
</style>

