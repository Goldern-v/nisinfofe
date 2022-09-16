<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <!-- test -->
      <span>科室：</span>
      <ElSelect size="small" :value="RDeptCode" @input="onCodeChange">
        <ElOption v-for="d of deptArr" :key="d.deptCode" :label="d.deptName" :value="d.deptCode" />
      </ElSelect>
      <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()">添加患者</Button>
      <Button
        :disabled="isEmpty || allSigned || !$refs.table || !$refs.table.selectedRow"
        @click="onRowRemove"
      >删除行</Button>
      <Button :disabled="isEmpty || allSigned || !modified" @click="onSave(true)">保存</Button>
      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographNameA" @click="onRemove">删除病房日报</Button>
      <Button :disabled="isEmpty" @click="onToggleFullPage">{{getFullPage() ? '关闭全屏' : '全屏'}}</Button>
    </div>
    <div class="container" ref="container">
      <Placeholder
        v-if="isEmpty"
        icon="el-icon-plus"
        @click="onCreateModalOpen($route.params.code)"
      >创建病房日报</Placeholder>
      <div class="paper" v-else>
        <div ref="printable" data-print-style="height: auto;">
          <div class="head shift-paper">
            <!-- <img :src="hospitalLogo" alt="logo" class="logo"> -->
            <h1 class="title">{{HOSPITAL_NAME}}</h1>
            <h2 class="sub-title">病室工作日志</h2>
            <div class="title-tip">
              <span>{{record.changeShiftDate}}</span>
              <span>科室：{{deptArr.find(v => v.deptCode === record.deptCode).deptName || ''}}</span>
            </div>
          </div>
          <ExcelTable
            ref="table"
            class="table"
            :fixedTh="fixedTh"
            data-print-style="height: auto;"
            :columns="columns"
            :editable="!allSigned"
            :shift="shift[0]"
            v-model="patients"
            @input-change="onTableInputChange"
            @input-keydown="onTableInputKeydown"
            @title-change="onTitleChange"
          >
            <tr class="empty-row" v-if="!patients.length">
              <td :colspan="maxCol" style="padding: 0">
                <Placeholder
                  black
                  size="small"
                  data-print-style="display: none;"
                  :show-add="!allSigned"
                  @click="onPatientModalShow()"
                >
                  <i class="el-icon-plus"></i> 添加患者记录
                </Placeholder>
              </td>
            </tr>
          </ExcelTable>
          <div class="foot" v-if="record" data-print-style="padding-bottom: 25px">
            <div class="foot-tip">
              {{footTexts[0]}}
            </div>
            <div>
              <span class="foot-tip">{{footTexts[1]}}</span>
              <span style="flex:1"></span>
              <div>
                <span>填表人：</span>
                <span data-print-style="display: none">
                  <button
                    v-if="record.autographNameA"
                    @click="onDelSignModalOpen('A', record.autographEmpNoA)"
                  >{{record.autographNameA}}</button>
                  <button v-else :disabled="isEmpty" @click="onSignModalOpen('A')">点击签名</button>
                </span>
                <FallibleImage
                  class="img"
                  v-if="record.autographNameA"
                  :src="`/crNursing/api/file/signImage/${record.autographEmpNoA}?${token}`"
                  :alt="record.autographNameA"
                  data-print-style="display: inline-block; width: 52px; height: auto;"
                />
                <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PatientsModal ref="patientsModal" @confirm="onPatientsModalConfirm" />
    <PatientModal
      ref="patientModal"
      :date="record ? record.changeShiftDate : ''"
      @confirm="onPatientModalConfirm"
      @panel-open="onPatientPanelOpen"
      @panel-close="onPatientPanelClose"
      @tab-change="onPatientModalTabChange"
    />
    <PatientPanel
      ref="patientPanel"
      @tab-change="onPatientPanelTabChange"
      @apply-template="onPatientPanelApply"
    />
    <SpecialCasePanel ref="specialCasePanel" @apply-template="onSpecialCasePanelApply" />
    <SignModal ref="signModal" />
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
import ExcelTable from "./components/table";
import Placeholder from "./components/placeholder";
import PatientModal from "./components/patient-modal";
import PatientsModal from "./components/patients-modal";
import PatientPanel from "./components/patient-panel";
import SpecialCaseModal from "./components/special-case-modal";
import SpecialCasePanel from "./components/special-case-panel";
import SignModal from "./components/sign-modal";
import $ from "jquery";
import { mapMutations, mapState } from 'vuex';
import { deepTraversalByLeaf } from '@/utils/tool';
const shiftTexts = [
  { key: 'patientOriginCount', prefix: '原有病人', suffix: '', },
  { key: 'patientNewCount', prefix: '人 + 新入院', suffix: '', },
  { key: 'transInCount', prefix: '人 + 转入', suffix: '', },
  { key: 'patientOutCount', prefix: '人 - 出院', suffix: '', },
  { key: 'transToCount', prefix: '人  - 转出', suffix: '', },
  { key: 'patientNowCount', prefix: '人 = 现有', suffix: '人', },
]
const shiftTexts1 = [
  { key: 'babyCount', prefix: '婴儿数', suffix: '', },
  { key: 'extraBedCount', prefix: '人               临时加床', suffix: '张', },
]
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
      await this.$confirm("病房日报还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning"
      });
    }
    this.$refs.specialCasePanel.close();
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    if (this.modified && from.params.date && from.params.date !== to.params.date) {
      await this.$confirm("病房日报还未保存，离开将会丢失数据", "提示", {
        confirmButtonText: "离开",
        cancelButtonText: "取消",
        type: "warning"
      });
      this.$refs.table.selectRow(-1);
    }
    next();
  },
  data() {
    return {
      loading: false,
      modified: false,
      deptArr: [],
      record: {},
      // 患者内容
      patients: [],
      // 病区动态内容
      shift: [],
      copiedRow: null,
      columns: [
        {
          label: "入院情况",
          columns: [
            {
              label: "病人姓名",
              prop: "name",
              editable: true,
              align: "center",
              width: "60",
              row: 2
            },
            {
              label: "床号",
              prop: "bedLabel",
              editable: true,
              align: "center",
              width: "60",
              row: 2
            },
            {
              label: "新入院",
              prop: "patientNew",
              editable: true,
              align: "center",
              width: "40",
              row: 2,
              type: 'checkbox',
            },
            {
              label: "何科转入",
              prop: "transFormDept",
              editable: true,
              align: "center",
              width: "60",
              row: 2
            },
            {
              label: "",
              prop: "expandContent1",
              editable: true,
              align: "center",
              width: "60",
              row: 2
            },
          ]
        },
        {
          label: "出院情况",
          columns: [
            {
              label: "住院号",
              prop: "inpNo",
              editable: true,
              align: "center",
              width: "60",
              row: 2,
            },
            {
              label: "病人姓名",
              prop: "name",
              editable: true,
              align: "center",
              width: "60",
              row: 2,
            },
            {
              label: "临床最后主要诊断",
              prop: "lastDiagnosis",
              editable: true,
              align: "center",
              width: "60",
              row: 2,
            },
            {
              label: "出院动态",
              columns: [
                {
                  label: "治愈",
                  prop: "cure",
                  editable: true,
                  align: "center",
                  width: "30",
                  row: 'checkbox',
                },
                {
                  label: "转好",
                  prop: "getBetter",
                  editable: true,
                  align: "center",
                  width: "30",
                  row: 'checkbox',
                },
                {
                  label: "未愈",
                  prop: "healed",
                  editable: true,
                  align: "center",
                  width: "30",
                  row: 'checkbox',
                },
                {
                  label: "死亡",
                  prop: "death",
                  editable: true,
                  align: "center",
                  width: "30",
                  row: 'checkbox',
                },
                {
                  label: "常产",
                  prop: "giveBirth",
                  editable: true,
                  align: "center",
                  width: "30",
                  row: 'checkbox',
                },
                {
                  label: "未产",
                  prop: "noBirth",
                  editable: true,
                  align: "center",
                  width: "30",
                  row: 'checkbox',
                },
                {
                  label: "计划生育",
                  prop: "familyPlanning",
                  editable: true,
                  align: "center",
                  width: "60",
                  row: 'checkbox',
                },
                {
                  label: "",
                  prop: "expandContent2",
                  editable: true,
                  align: "center",
                  width: "60",
                  row: 'checkbox',
                },
              ]
            },
            {
              label: "转往何科",
              prop: "transToDept",
              editable: true,
              width: "60",
              row: 2,
            },
            {
              label: "",
              prop: "expandContent3",
              editable: true,
              width: "90",
              row: 2,
            },
            {
              label: "住院天数",
              prop: "hospitalizationDays",
              editable: true,
              width: "60",
              row: 2,
            },
            {
              label: "出院床号",
              prop: "dischargeBedLabel",
              editable: true,
              width: "60",
              row: 2,
            }
          ]
        },
      ],
      fixedTh: false,
    };
  },
  computed: {
    ...mapState({
      RDeptCode: state => state.record.RDeptCode
    }),
    deptName() {
      const code = this.$route.params.code;
      const dept = this.deptArr.find(d => d.deptCode === code);

      return (dept && dept.deptName) || "";
    },
    isEmpty() {
      return !this.$route.params.date || !this.record;
    },
    allSigned() {
      const record = this.record;
      return !!(
        record &&
        record.autographNameA &&
        record.autographNameP &&
        record.autographNameN
      );
    },
    maxCol() {
      return deepTraversalByLeaf(this.columns).length || 1
    },
    footTexts() {
      if (this.shift[0]) {
        let i1 = shiftTexts.reduce((sum, cur) => {

          return sum += `${cur.prefix}${this.shift[0] ? this.shift[0][cur.key] : 0}${cur.suffix}`
        }, '')
        let i2 = shiftTexts1.reduce((sum, cur) => {
          return sum += `${cur.prefix}${this.shift[0] ? this.shift[0][cur.key] : 0}${cur.suffix}`
          }, '')
          return [i1, i2]
      }
      return ['', '']
    },
  },
  watch: {
    deptCode(value, oldValue) {
      if (oldValue !== value) {
        this.loadDeptArr();
      }
    },
    "$route.params.date"() {
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
      this.loadDeptArr();
    }
    let dom = this.$refs.container;
    $(dom).scroll(e => {
      if ($(dom).scrollTop() >= 117) {
        this.fixedTh = true;
      } else {
        this.fixedTh = false;
      }
    });
  },
  methods: {
    ...mapMutations(['upRDeptCode']),
    async loadDeptArr() {
      const parentCode = this.deptCode;
      const res1 = await apis.listDepartment(parentCode);
      const {
        data: { data: deptArr }
      } = res1;

      this.deptArr = deptArr;

      const code = deptArr[0] && deptArr[0].deptCode;
      // const params = this.$route.params;

      if (!this.RDeptCode) {
        this.upRDeptCode(code)
        this.$router.push({ path: `/wardReport` });
      }
      this.reloadSideList();
    },
    onCodeChange(code) {
      this.upRDeptCode(code)
      this.$router.push({ path: `/wardReport` });
    },
    async load() {
      const id = this.$route.params.date;
      if (!id) return;

      this.loading = true;
      try {
        const {
          data: { data }
        } = await apis.getWardDailyById(id);
        const { changeShiftTimes: record, shiftWithWardcodes: shift, changeShiftPatients: patients } = data;
        // record.specialCase = record.specialCase || "";
        this.record = record;
        this.patients = patients;
        this.shift = shift;
        this.modified = false;

        if (patients.length < 11) {
          this.patients = this.patients.concat(
            Array.from({ length: 11 - patients.length }).map(() => ({
              ...defaultPatient
            }))
          );
        }
      } catch (error) {
        this.$router.replace({ name: "wardReports" });
      }
      this.loading = false;
      console.log(this.patients);
    },
    getContextMenu() {
      const { selectedRow, selectedCol } = this.$refs.table;
      const parseDisabled =
        selectedCol.prop === "bedLabel" || selectedCol.prop === "name";

      const copyContent =
        (selectedCol.prop && selectedRow[selectedCol.prop]) || "";
      const pasteContent = sessionStorage.getItem("shift-work-copy-content");
      const { selectionStart, selectionEnd } = window.event.srcElement;

      const copyRow = selectedRow
        ? JSON.stringify(
            pick(selectedRow, [
              "bedLabel",
              "name",
              "age",
              "patientStatus",
              "diagnosis",
              "mainComplaint",
              "background",
              "assessmentSituation",
              "proposal"
            ])
          )
        : "";
      const pasteRow = sessionStorage.getItem("shift-work-copy-row");

      let menus = [
        {
          name: "复制格",
          icon: "fuzhizhenghang",
          disable: !copyContent,
          click: () => {
            sessionStorage.setItem("shift-work-copy-content", copyContent);
          }
        },
        {
          name: "复制行",
          icon: "fuzhizhenghang",
          disable: !copyRow,
          click: () => {
            sessionStorage.setItem("shift-work-copy-row", copyRow);
          }
        }
      ];

      if (!this.allSigned) {
        const others = [
          {
            name: "粘贴内容",
            icon: "niantiezhenghang",
            disable: !pasteContent || parseDisabled,
            click: () => {
              const { selectedRow, selectedCol } = this.$refs.table;
              const original = selectedRow[selectedCol.prop] || "";
              const prefix = original.substring(0, selectionStart);
              const suffix = original.substring(selectionEnd);

              selectedRow[selectedCol.prop] = prefix + pasteContent + suffix;
              this.onSave();
            }
          },
          {
            name: "粘贴行",
            icon: "niantiezhenghang",
            disable: !pasteRow,
            click: async () => {
              const data = JSON.parse(pasteRow);
              const isExisted = this.patients.find(
                p =>
                  p.name &&
                  p.patientId === data.patientId &&
                  p.visitId === data.visitId
              );

              if (isExisted && isExisted !== selectedRow) {
                return this.$message.error("已存在该患者");
              }

              const date = this.record.changeShiftDate;
              const params = this.$route.params;
              const {
                data: { data: remoteDate }
              } = await apis.getPatient(params.code, data.bedLabel, date);

              if (!remoteDate) {
                return this.$message.error("找不到该患者");
              }

              data["name"] = remoteDate["name"];
              data["age"] = remoteDate["age"];
              data["patientStatus"] = remoteDate["patientStatus"];


              selectedRow["bedLabel"] = data["bedLabel"];
              selectedRow["name"] = data["name"];
              selectedRow["age"] = data["age"];
              selectedRow["patientStatus"] = data["patientStatus"];
              selectedRow["diagnosis"] = data["diagnosis"];
              selectedRow["mainComplaint"] = data["mainComplaint"];
              selectedRow["background"] = data["background"];
              selectedRow["assessmentSituation"] = data["assessmentSituation"];
              selectedRow["proposal"] = data["proposal"];

              await this.onSave();
            }
          },
          {
            name: "向上移动行",
            icon: "charuxinhang",
            click: async () => {
              // this.modified = true
              this.$refs.table.moveRowUp();
              await this.onSave();
            }
          },
          {
            name: "向下移动行",
            icon: "xiangxiacharuyihang",
            click: async () => {
              // this.modified = true
              this.$refs.table.moveRowDown();
              await this.onSave();
            }
          },
          {
            name: "向上插入新行",
            icon: "charuxinhang",
            click: () => {
              this.modified = true;
              this.$refs.table.addRowBefore({ ...defaultPatient });
            }
          },
          {
            name: "向下插入新行",
            icon: "xiangxiacharuyihang",
            click: () => {
              this.modified = true;
              this.$refs.table.addRowAfter({ ...defaultPatient });
            }
          },
          {
            name: "删除行",
            icon: "shanchuzhenghang",
            click: async () => {
              await this.$confirm("你确定删除该行？", "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning"
              });
              // this.modified = true
              const selectedRow = this.$refs.table.selectedRow;
              if (selectedRow && selectedRow.id) {
                await apis.removeShiftRecordRow(selectedRow.id);
              }
              this.$refs.table.removeRow();
            }
          }
        ];

        const addOthers=[//新增操作类型
          {
            name: "移动至首行",
            icon: "xiangxiacharuyihang",
            click: async () => {
              // this.modified = true
              this.$refs.table.moveRowFirst();
              await this.onSave();
            }
          },
          {
            name: "移动至末行",
            icon: "charuxinhang",
            click: async () => {
              // this.modified = true
              this.$refs.table.moveRowLast();
              await this.onSave();
            }
          }
        ];
      }

      return menus;
    },
    // onContextMenu(e, copyContent) {
    //   const pasteContent = sessionStorage.getItem("shift-work-copy-content");
    //   const { selectionStart, selectionEnd } = window.event.srcElement;

    //   const data = [
    //     {
    //       name: "复制格",
    //       icon: "fuzhizhenghang",
    //       disable: !copyContent,
    //       click: () => {
    //         sessionStorage.setItem("shift-work-copy-content", copyContent);
    //       }
    //     }
    //   ];

    //   if (!this.allSigned) {
    //     data.push({
    //       name: "粘贴内容",
    //       icon: "niantiezhenghang",
    //       disable: !pasteContent,
    //       click: () => {
    //         const original = this.record.specialSituation || "";
    //         const prefix = original.substring(0, selectionStart);
    //         const suffix = original.substring(selectionEnd);

    //         this.record.specialSituation = prefix + pasteContent + suffix;
    //         this.onSave();
    //       }
    //     });
    //   }

    //   const style = {
    //     top: `${Math.min(
    //       e.clientY - 15,
    //       window.innerHeight - data.length * 36 - 12
    //     )}px`,
    //     left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`
    //   };

    //   window.openContextMenu({ data, style });
    // },
    toHTML(source) {
      return (source || "").replace(/\n/g, "<br>");
    },
    async onRowRemove() {
      await this.$confirm("你确定删除该行？", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      });
      // this.modified = true
      const selectedRow = this.$refs.table.selectedRow;
      if (selectedRow && selectedRow.id) {
        await apis.delWardDailyById({id: selectedRow.id, sortValue: selectedRow.sortValue});
      }
      this.$refs.table.removeRow();
    },
    // onDblClickRow({ row, rowIndex, col }) {
    //   const tabMap = {
    //     background: "2",
    //     assessmentSituation: "3",
    //     proposal: "4"
    //   };
    //   const tab = tabMap[col.prop] || "1";
    //   this.$refs.patientModal.open(
    //     tab,
    //     { ...row },
    //     col.prop,
    //     !!this.record.autographNameN
    //   );
    // },
    onPatientsModalShow(d) {
      const id = this.$route.params.date;
      const deptCode = this.RDeptCode;
      const date = d || this.record.changeShiftDate;
      const selectedKeys = this.patients
        .filter(p => p.patientId && p.visitId)
        .map(p => p.patientId + "//" + p.visitId);

      this.$refs.patientsModal.open({ deptCode, date, id, selectedKeys });
    },
    onPatientsModalConfirm(patients) {
      for (let p of patients) {
        let obj = {...p};
        obj["mainComplaint"] = obj.complaint || "";
        obj["proposal"] = obj.advice || "";
        obj["assessmentSituation"] = obj.evaluate || "";
        this.$refs.table.addRow(obj);
      }
      this.modified = true;
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
    async onSave(tip) {
      const shiftWithWardcodes = this.shift;
      const changeShiftTimes = this.record;
      const changeShiftPatients = this.patients
        .filter(p => p.name || p.id)
        .map((p, i) => ({ ...p, sortValue: i + 1 }));

      await apis.saveWardDaily({
        changeShiftTimes,
        changeShiftPatients,
        shiftWithWardcodes
      });

      this.load();
      if (tip) {
        this.$message.success("保存成功");
      }
    },
    onSignModalOpen(type) {
      if (this.modified) {
        return this.$message.warning("请先保存后再签名");
      }

      window.openSignModal(async (password, empNo) => {
        await apis.updateAutographName({id: this.record.id, autographNameType: type, empNo, password});

        this.load();
        this.$refs.signModal.close();
        this.$message.success("签名成功");

        if (type === "N") {
          this.reloadSideList();
        }
      });
    },
    onDelSignModalOpen(sign, sourceEmpNo) {
      window.openSignModal(async (password, empNo) => {
        await apis.delSignShiftRecord({
          id: this.record.id,
          empNo,
          password,
          sign,
          sourceEmpNo
        });

        this.load();
        this.$refs.signModal.close();
        this.$message.success("已取消签名");
        this.reloadSideList();
      });
    },
    async onRemove() {

      window.openSignModal(async (password, empNo) => {
        await apis.delWardDaily({ id: this.record.id, empNo, password});

        this.$message.success("删除成功");
        this.$refs.signModal.close();
        this.modified = false;
        this.record = null;
        this.patients = [];
        this.$router.push({ path: `/wardReport` });
        this.reloadSideList();
      });
    },
    async onPrint() {
      this.loading = true;
      this.fixedTh = false;
      this.$nextTick(async () => {
        await print(this.$refs.printable, {
          beforePrint: formatter,
          direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
        .fixedTh {
          display: none !important;
          height: auto;
        }
        pre {
          white-space: pre-wrap;
        }
        `
        });
      });
      this.loading = false;
    },
    onTableInputChange({ prop, row, value }) {
      this.modified = true;
      if (['patientNew','cure','getBetter','healed','death','giveBirth','noBirth','familyPlanning'].includes(prop)) {
        this.$set(this.patients[row], prop, value ? '' : '√')
      } else if (prop == "bedLabel") {
        this.patients[row].name = "";
        this.patients[row].age = "";
        this.patients[row].sex = "";
        this.patients[row].diagnosis = "";
        this.patients[row].patientStatus = "";
      }
    },
    async onTableInputKeydown({ event, value, prop, row }) {
      // if (event.keyCode === 13 && prop === "bedLabel") {
      //   event.preventDefault();

      //   if (value) {
      //     const date = this.record.changeShiftDate;
      //     const params = this.$route.params;
      //     const {
      //       data: { data }
      //     } = await apis.getPatient(params.code, value, date);

      //     if (data) {
      //       const isExisted = this.patients.find(
      //         p =>
      //           p.name &&
      //           p.patientId === data.patientId &&
      //           p.visitId === data.visitId
      //       );
      //       if (isExisted) return this.$message.error("已存在该患者");

      //       this.patients[row].name = data.name;
      //       this.patients[row].age = data.age;
      //       this.patients[row].sex = data.sex;
      //       this.patients[row].mainComplaint = data.complaint || "";
      //       this.patients[row].patientStatus = data.patientStatus;
      //       this.patients[row].patientId = data.patientId || "";
      //       this.patients[row].visitId = data.visitId || "";
      //       this.patients[row].proposal = data.advice || "";
      //       this.patients[row].assessmentSituation = data.evaluate || "";

      //       if (data.background !== "," && data.background !== "，") {
      //         this.patients[row].background += data.background;
      //       }
      //     } else {
      //       return this.$message.error("找不到该患者");
      //     }
      //   }
      // }

      if (arrowKeyValues[event.keyCode] !== undefined) {
        const val = arrowKeyValues[event.keyCode];
        const target = event.target;

        const textareaArr = Array.prototype.slice.call(
          this.$refs.table.$refs.table.querySelectorAll("textarea"),
          0,
          -1
        );

        const index = textareaArr.indexOf(target);
        const toIndex = index + val;

        if (index < 0 || !textareaArr[toIndex]) return;

        textareaArr[toIndex].focus();
      }
    },
    onTitleChange({value, key}) {
      this.modified = true
      this.shift[0][key] = value
    }
  },
  components: {
    FallibleImage,
    Button,
    ExcelTable,
    Placeholder,
    PatientModal,
    PatientsModal,
    PatientPanel,
    SpecialCaseModal,
    SpecialCasePanel,
    SignModal
  }
};
</script>

<style lang="stylus" scoped>
.shift-work-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.toolbar {
  display: flex;
  align-items: center;
  height: 41px;
  padding: 0 18px;
  background-image: linear-gradient(-180deg, #F8F8FA 0%, #EBECF0 100%);
  border: 1px solid #CBD5DD;
  overflow: hidden;
  font-size: 14px;

  .el-select {
    margin-left: 8px;
    margin-right: 10px;
  }

  .empty {
    flex: 1;
  }
}

.container {
  padding: 15px 0;
  flex: 1;
  min-height: 0;
  background: #dfdfdf;
  overflow: auto;
}

.paper {
  margin: 0 auto 20px;
  padding: 20px;
  width: 1080px;
  min-height: 700px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.head {
  position: relative;
  // padding 15px 0 10px
}

.logo {
  position: absolute;
  left: 0;
  top: 0;
  height: 44px;
}

.title {
  font-size: 22px;
  text-align: center;
}

.sub-title {
  margin-top: 10px;
  text-align: center;
}
.title-tip {
  display: flex;
  justify-content: space-between;
}

.details {
  margin-top: 15px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;

  >span {
    flex: 1;
    white-space: nowrap;
  }
}

.table {
  margin-top: 5px;

  >>>pre {
    white-space: pre-wrap;
  }
}

.normal-row {
  background: white !important;
}

.row-title {
  height: 32px;
  font-size: 13px;
  font-weight: bold;
}

.row-action {
  float: right;
  color: rgb(40, 79, 194);
  cursor: pointer;
}

.special-case-title {
  padding: 10px;
}

.special-case {
  width: 100%;
  padding: 8px 8px;
  display: block;
  border: none;
  outline: none;
  box-sizing: border-box;
  line-height: 1.4em;
  font-size: 13px;
  min-height: 100px !important;
}

.foot {
  margin-top: 8px;
  line-height: 25px;
  text-align: center;

  >div {
    font-size: 0;
    white-space: nowrap;
    display: flex;
  }

  img, span {
    vertical-align: middle;
    font-size: 13px;
  }

  .img {
    display: none;
    width: 52px;
    max-height: 25px;
  }

  button {
    padding: 0;
    border: none;
    outline: none;
    background: none;
    color: rgb(40, 79, 194);
    cursor: pointer;
  }
  .foot-tip {
    font-size: 13px;
    word-spacing: 15px;
    letter-spacing: 2px;
  }
}
</style>
<style lang="stylus">
@media print {
  .shift-paper {
    padding-top: 40px !important;
  }
}

@page {
  margin: 0 10mm;
}
</style>

