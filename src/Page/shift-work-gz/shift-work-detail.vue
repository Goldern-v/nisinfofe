<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode"/>
      </ElSelect>
      <span style="margin-right: -10px"></span>
      <Button :disabled="isEmpty || allSigned" @click="onSave(true)"
        >保存</Button>
      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographName" @click="onRemove">删除交班志</Button>
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
            <h1 class="title">{{deptName}}</h1>
            <h2 class="sub-title">交班记录卡</h2>
          </div>
          <ExcelTable
            :isPrintShiftWork='isPrintShiftWork'
            ref="excelTable"
            class="table"
            :data="record"
            v-if="record && record.changeShiftTimes.id"
            :editable="!allSigned"
            data-print-style="height: auto;"
            @save="onSave"
            @input-change="onTableInputChange"
            @input-keydown="onTableInputKeydown"
          ></ExcelTable>
          <div class="foot" v-if="record" data-print-style="padding-bottom: 25px">
            <div data-print-style="width: auto">
              <span>交班者：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.changeShiftTimes.autographName"
                  @click="onDelSignModalOpen()"
                >{{record.changeShiftTimes.autographName}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen()">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.changeShiftTimes.autographName"
                :src="`/crNursing/api/file/signImage/${record.changeShiftTimes.autographEmpNo}?${token}`"
                :alt="record.changeShiftTimes.autographName"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
            <div data-print-style="width: auto">
              <span>交班日期：</span><span class="date">{{record.changeShiftTimes.changeShiftDate | toYMD}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import PatientPanel from "./components/patient-panel";
import SpecialCaseModal from "./components/special-case-modal";
import SpecialCasePanel from "./components/special-case-panel";
import SignModal from "./components/sign-modal";
import bus from "vue-happy-bus";
import moment from "moment";

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
      bus: bus(this),
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
      patientSelectedList: [],
      isPrintShiftWork:false,
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
        record.autographName
      );
    }
  },
  watch: {
    deptCode(value, oldValue) {
      if (oldValue !== value) {
        console.log(2);
        this.loadDepts();
      }
    },
    "$route.params.id"() {
      this.load();
    },
    record(value1,value2){
      console.log('record',value1);
    },
    modified(value, oldValue) {
      if (value !== oldValue) {
        window.onbeforeunload = value ? () => true : null;
      }
    }
  },
  created(){
    this.bus.$on("updateTable", () => {
      this.load();
    });
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
        this.$router.push({ path: `/shiftWork2/${code}` });
      }
      this.reloadSideList();
    },
    onCodeChange(code) {
      this.$router.push({ path: `/shiftWork2/${code}` });
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
        this.modified = false;
      } catch (error) {
        console.log(error);
        this.$router.replace({ name: "shiftWorks2" });
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
        changeShiftPatients: this.record.changeShiftPatientLists,
        changeShiftContents: this.record.changeShiftContents
      };

      await apis.updateShiftRecord(obj);

      this.load();
      if (tip) {
        this.$message.success("修改成功");
      }
    },
    onSignModalOpen() {
      if (this.modified) {
        return this.$message.warning("请先保存后再签名");
      }

      this.$refs.signModal.open({
        callback: async ({ username, password }) => {
          await apis.signShiftRecord(
            this.record.changeShiftTimes.id,
            username,
            password
          );
          this.load();
          this.$refs.signModal.close();
          this.$message.success("签名成功");
        }
      });
    },
    onDelSignModalOpen() {
      this.$refs.signModal.open({
        title: "取消签名确认",
        callback: async ({ username, password }) => {
          await apis.delSignShiftRecord(
            this.record.changeShiftTimes.id,
            username,
            password
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
          this.$router.push({ path: `/shiftWork2/${code}` });
          this.reloadSideList();
        }
      });
    },
    onPrint() {
      this.isPrintShiftWork = true
      this.loading = true;
      // preview
      this.$nextTick(()=>{
      let element = this.$refs.printable
        setTimeout(()=>{
          print(this.$refs.printable, {
            // beforePrint: formatter,
            direction: "vertical",
            injectGlobalCss: true,
            scanStyles: false,
            css: `
              @page {
                size: portrait;
                margin:20px auto 20px;
              }
              .el-textarea__inner {
                border: 0;
              }
              pre {
                white-space: pre-wrap;
              }
            `
          });
          this.isPrintShiftWork = false
          this.loading = false;
        })
      })
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
    padding-bottom 10px
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
    .date
      display inline-block
      min-width 80px
.sign-select-item
  font-size 12px
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
