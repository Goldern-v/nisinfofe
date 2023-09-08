<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <!-- test -->
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode" />
      </ElSelect>
      <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()">添加患者</Button>
      <Button
        :disabled="isEmpty || allSigned || !$refs.table || !$refs.table.selectedRow"
        @click="onRowRemove"
      >删除行</Button>
      <Button :disabled="isEmpty || allSigned || !modified" @click="onSave(true)">保存</Button>
      <Button :disabled="isEmpty" @click="beforePrint">打印预览</Button>
      <Button @click="onCopy">复制</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographNameA" @click="onRemove">删除交班志</Button>
      <Button :disabled="isEmpty" @click="onToggleFullPage">{{getFullPage() ? '关闭全屏' : '全屏'}}</Button>
    </div>
    <div class="container" ref="container">
      <Placeholder
        v-if="isEmpty"
        icon="el-icon-plus"
        @click="onCreateModalOpen($route.params.code)"
      >创建交班志</Placeholder>
      <div class="paper" v-else>
        <div ref="printable" data-print-style="height: auto;">
          <div class="head shift-paper">
            <!-- <img :src="hospitalLogo" alt="logo" class="logo"> -->
            <h1 class="title">{{deptName}}</h1>
            <h2 class="sub-title">ISBAR护理交班单</h2>
            <div class="details">
              <span>
                总人数：
                <b>{{record.allTotal || 0}}</b>人，
              </span>
              <span>
                入院：
                <b>{{record.goHospitalTotal || 0}}</b>人，
              </span>
              <span>
                出院：
                <b>{{record.outHospitalTotal || 0}}</b>人，
              </span>
              <!-- <span>
                新收：
                <b>{{record.inHospitalTotal || 0}}</b>人，
              </span> -->
              <span>
                病重：
                <b>{{record.seriousTotal || 0}}</b>人，
              </span>
              <span>
               一级：
                <b>{{record.yiHospitalTotal || 0}}</b>人，
              </span>
              <span>
                交班日期：
                <b>{{record.changeShiftDate}}</b>
              </span>
            </div>
          </div>
          <ExcelTable
            v-if="!isPrint"
            :isPrint="isPrint"
            ref="table"
            class="table"
            :fixedTh="fixedTh"
            data-print-style="height: auto;"
            :columns="columns"
            :editable="!allSigned"
            :get-context-menu="getContextMenu"
            v-model="patients"
            @dblclick="onDblClickRow"
            @input-change="onTableInputChange"
            @input-keydown="onTableInputKeydown"
          >
            <tr class="empty-row" v-if="!patients.length">
              <td colspan="9" style="padding: 0">
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
          <ExcelTable
            v-else
            :isPrint="isPrint"
            ref="table"
            class="table"
            :fixedTh="fixedTh"
            data-print-style="height: auto;"
            :columns="columns"
            :editable="!allSigned"
            :get-context-menu="getContextMenu"
            v-model="printList"
            @dblclick="onDblClickRow"
            @input-change="onTableInputChange"
            @input-keydown="onTableInputKeydown"
          >
            <tr class="empty-row" v-if="!patients.length">
              <td colspan="9" style="padding: 0">
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
            <div data-print-style="width: auto">
              <span>A班签名：</span>
              <span data-print-style="display: none">
                <!-- <template v-if="record.autographNameA">{{record.autographNameA}}</template> -->
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
            <div data-print-style="width: auto">
              <span>P班签名：</span>
              <span data-print-style="display: none">
                <!-- <template v-if="record.autographNameP">{{record.autographNameP}}</template> -->
                <button
                  v-if="record.autographNameP"
                  @click="onDelSignModalOpen('P',record.autographEmpNoP)"
                >{{record.autographNameP}}</button>
                <button v-else :disabled="isEmpty" @click="onSignModalOpen('P')">点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.autographNameP"
                :src="`/crNursing/api/file/signImage/${record.autographEmpNoP}?${token}`"
                :alt="record.autographNameP"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
            </div>
            <div data-print-style="width: auto">
              <span>N班签名：</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.autographNameN"
                  @click="onDelSignModalOpen('N', record.autographEmpNoN)"
                >{{record.autographNameN}}</button>
                <button
                  v-else
                  :disabled="isEmpty"
                  @click="onSignModalOpen('N', record.autographEmpNoN)"
                >点击签名</button>
              </span>
              <FallibleImage
                class="img"
                v-if="record.autographNameN"
                :src="`/crNursing/api/file/signImage/${record.autographEmpNoN}?${token}`"
                :alt="record.autographNameN"
                data-print-style="display: inline-block; width: 52px; height: auto;"
              />
              <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
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
    <SelectPatientModal
      v-if="isSelectPatient"
      :dialogVisible="isSelectPatient"
      @setIsSelectPatient="setIsSelectPatient"
      :treeData="patients"
      @setPrintList="setPrintList"
    />
    <div id="print-table-content" style="display:none"></div>
  </div>
</template>

<script>
import common from "@/common/mixin/common.mixin";
import SelectPatientModal from "@/Page/shift-work-fy/components/selectPatientModal.vue"
import FallibleImage from "@/components/FallibleImage/FallibleImage.vue";
import { pick } from "lodash";
import print from "printing";

import * as apis from "./apis";
import formatter from "./print-formatter";
import Button from "@/Page/shift-work/components/button";
import ExcelTable from "./components/table";
import Placeholder from "@/Page/shift-work/components/placeholder";
import PatientModal from "./components/patient-modal";
import PatientsModal from "@/Page/shift-work/components/patients-modal";
import PatientPanel from "@/Page/shift-work/components/patient-panel";
import SpecialCaseModal from "@/Page/shift-work/components/special-case-modal";
import SpecialCasePanel from "@/Page/shift-work/components/special-case-panel";
import SignModal from "@/Page/shift-work/components/sign-modal";
import $ from "jquery";
const defaultPatient = {
  name: "",
  bedLabel: "",
  age: "",
  patientStatus: "",
  diagnosis: "",
  symptom: "",
  background: "",
  checkInspection: "",
  cure: "",
  diet: "",
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

      this.$refs.table.selectRow(-1);
    }

    next();
  },
  data() {
    return {
      isSelectPatient:false,
      loading: false,
      modified: false,
      depts: [],
      record: {},
      patients: [],
      copiedRow: null,
      columns: [
        {
          label: "Introduction：介绍",
          columns: [
            {
              label: "床号",
              prop: "bedLabel",
              editable: true,
              align: "center",
              width: "35",
              printWidth:"35",
            },
            {
              label: "姓名",
              prop: "name",
              editable: true,
              width: "53",
              printWidth:"53",
              // render: row => {
              //   const status = row.patientStatus
              //     ? `(${row.patientStatus})`
              //     : "";
              //   return [row.name + status, row.sex, row.age]
              //     .filter(Boolean)
              //     .join("，<br>");
              // }
            },
             {
              label: "年龄",
              prop: "age",
              editable: true,
              align: "center",
              width: "35",
              printWidth:"35",
            },
            {
              label: "诊断",
              prop: "diagnosis",
              editable: true,
              width: "80",
              printWidth:"50",
            },
          ],
          printWidth:"200",
        },
        {
          label: "Situation：状态",
          columns: [
            {
              label: "症状",
              prop: "symptom",
              editable: true,
              width: "165",
              printWidth:"350",
            }
          ],
          printWidth:"370",
        },
        {
          label: "Background:背景",
          columns: [
            {
              label: "既往史，过敏史，<br>特殊病史",
              prop: "background",
              editable: true,
              width: "70",
              printWidth:"70",
            }
          ],
          printWidth:"90",
        },
        {
          label: "Assessment:评估",
          columns: [
            {
              label: "检验检查，<br>主要问题",
              prop: "checkInspection",
              editable: true,
              width: "110",
              printWidth:"380",
            }
          ],
          printWidth:"400",
        },
        {
          label: "Recommendation：<br>建议",
          columns: [
            {
              label: "治疗、护理",
              prop: "cure",
              editable: true,
              width: "60",
              printWidth:"60",
            },
            {
              label: "隔离",
              prop: "diet",
              editable: true,
              width: "40",
              printWidth:"40",
            }
          ],
          printWidth:"120",
        }
      ],
      fixedTh: false,
      printList:[],
      isPrint:false
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
    setPrintList(payload){
      this.isPrint = true
      this.printList = payload
      this.isSelectPatient = false
      this.$nextTick(async ()=>{
        await this.onPrint()
        this.isPrint = false
      })
    },
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
        const { changeShiftTime: record, changeShiftPatients: patients } = data;
        record.specialCase = record.specialCase || "";
        this.record = record;
        this.patients = patients;
        this.modified = false;

        if (patients.length < 11) {
          this.patients = this.patients.concat(
            Array.from({ length: 11 - patients.length }).map(() => ({
              ...defaultPatient
            }))
          );
        }
      } catch (error) {
        this.$router.replace({ name: "shiftWorks" });
      }
      this.loading = false;
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
              "symptom",
              "background",
              "cure",
              "diet",
              "checkInspection",
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
              selectedRow["symptom"] = data["symptom"];
              selectedRow["background"] = data["background"];
              selectedRow["checkInspection"] = data["checkInspection"];
              selectedRow["proposal"] = data["proposal"];
              selectedRow["cure"] = data["cure"]
              selectedRow["diet"] = data["diet"]
              // await this.onSave();
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

        menus = menus.concat(others);
      }

      return menus;
    },
    onContextMenu(e, copyContent) {
      const pasteContent = sessionStorage.getItem("shift-work-copy-content");
      const { selectionStart, selectionEnd } = window.event.srcElement;

      const data = [
        {
          name: "复制格",
          icon: "fuzhizhenghang",
          disable: !copyContent,
          click: () => {
            sessionStorage.setItem("shift-work-copy-content", copyContent);
          }
        }
      ];

      if (!this.allSigned) {
        data.push({
          name: "粘贴内容",
          icon: "niantiezhenghang",
          disable: !pasteContent,
          click: () => {
            const original = this.record.specialSituation || "";
            const prefix = original.substring(0, selectionStart);
            const suffix = original.substring(selectionEnd);

            this.record.specialSituation = prefix + pasteContent + suffix;
            this.onSave();
          }
        });
      }

      const style = {
        top: `${Math.min(
          e.clientY - 15,
          window.innerHeight - data.length * 36 - 12
        )}px`,
        left: `${Math.min(e.clientX + 15, window.innerWidth - 180)}px`
      };

      window.openContextMenu({ data, style });
    },
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
        await apis.removeShiftRecordRow(selectedRow.id);
      }
      this.$refs.table.removeRow();
    },
    onDblClickRow({ row, rowIndex, col }) {
      // if (this.allSigned) {
      //   return
      // }

      const tabMap = {
        diagnosis: "1",
        symptom: "2",
        background: "3",
        checkInspection: "4",
        cure: "5",
        diet: "5"
      };
      const tab = tabMap[col.prop] || "1";
      this.$refs.patientModal.open(
        tab,
        { ...row },
        col.prop,
        !!this.record.autographNameN
      );
    },
    onPatientsModalShow(d) {
      const id = this.$route.params.id;
      const deptCode = this.$route.params.code;
      const date = d || this.record.changeShiftDate;

      const selectedKeys = this.patients
        .filter(p => p.patientId && p.visitId)
        .map(p => p.patientId + "//" + p.visitId);

      this.$refs.patientsModal.open({ deptCode, date, id, selectedKeys });
    },
    onPatientsModalConfirm(patients) {
      for (let p of patients) {
        this.$refs.table.addRow(p);
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
      // 妇幼要求带C的床位排在最后
      function sortCallBack(item1,item2){
        let a = item1.bedLabel
        let b = item2.bedLabel
        if(!a.includes('C') && !b.includes('C')){
            return Number(a) - Number(b)
        }else if(a.includes('C') && b.includes('C')){
            let v1 = Number(a.split('C')[1])
            let v2 = Number(b.split('C')[1])
            return v1 - v2
        }else if(a.includes('C')){
            return 1
        }else if(b.includes('C')){
            return -1
        }
      }
      const deptCode = this.deptCode;
      const changeShiftTime = this.record;
      const changeShiftPatients = this.patients
        .filter(p => p.name || p.id)
        .sort(sortCallBack)
        .map((p, i) => ({ ...p, sortValue: i + 1 }));

      await apis.updateShiftRecord({
        changeShiftTime,
        changeShiftPatients,
        deptCode
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

      // if (type === "P" && !this.record.autographNameA) {
      //   return this.$message.warning("需要A班先签名");
      // }

      // if (type === "N" && !this.record.autographNameP) {
      //   return this.$message.warning("需要P班先签名");
      // }

      // this.$refs.signModal.open({
      //   callback: async ({ username, password }) => {
      //     await apis.signShiftRecord(this.record.id, type, username, password);

      //     this.load();
      //     this.$refs.signModal.close();
      //     this.$message.success("签名成功");

      //     if (type === "N") {
      //       this.reloadSideList();
      //     }
      //   }
      // });

      window.openSignModal(async (password, username) => {
        await apis.signShiftRecord(this.record.id, type, username, password);

        this.load();
        this.$refs.signModal.close();
        this.$message.success("签名成功");

        if (type === "N") {
          this.reloadSideList();
        }
      },undefined,undefined,undefined,undefined,process.env.HOSPITAL_ID == 'fuyou' ? this.record : undefined,undefined,undefined,undefined,undefined,undefined,'changeShfit');
    },
    onDelSignModalOpen(type, sourceEmpNo) {
      // this.$refs.signModal.open({
      //   title: "取消签名确认",
      //   callback: async ({ username, password }) => {
      //     await apis.delSignShiftRecord(
      //       this.record.id,
      //       username,
      //       password,
      //       type,
      //       sourceEmpNo
      //     );

      //     this.load();
      //     this.$refs.signModal.close();
      //     this.$message.success("已取消签名");
      //     this.reloadSideList();
      //   }
      // });

      window.openSignModal(async (password, username) => {
        await apis.delSignShiftRecord(
          this.record.id,
          username,
          password,
          type,
          sourceEmpNo
        );

        this.load();
        this.$refs.signModal.close();
        this.$message.success("已取消签名");
        this.reloadSideList();
      },undefined,undefined,undefined,undefined,process.env.HOSPITAL_ID == 'fuyou' ? this.record : undefined,'cancel',undefined,undefined,undefined,undefined,'changeShfit');
    },
    async onRemove() {
      // this.$refs.signModal.open({
      //   callback: async ({ username, password }) => {
      //     await apis.removeShiftRecord(this.record.id, username, password);

      //     const code = this.$route.params.code;

      //     this.$message.success("删除成功");
      //     this.$refs.signModal.close();
      //     this.modified = false;
      //     this.record = null;
      //     this.patients = [];
      //     this.$router.push({ path: `/shiftWork/${code}` });
      //     this.reloadSideList();
      //   }
      // });
      window.openSignModal(async (password, username) => {
        await apis.removeShiftRecord(this.record.id, username, password);

        const code = this.$route.params.code;

        this.$message.success("删除成功");
        this.$refs.signModal.close();
        this.modified = false;
        this.record = null;
        this.patients = [];
        this.$router.push({ path: `/shiftWork/${code}` });
        this.reloadSideList();
      },undefined,undefined,undefined,undefined,process.env.HOSPITAL_ID == 'fuyou' ? this.record : undefined,undefined,undefined,undefined,undefined,undefined,'changeShfit');
    },
    setIsSelectPatient(flag){
      this.isSelectPatient = flag
    },
    beforePrint(){
      this.setIsSelectPatient(true)
    },
    async onPrint() {
      this.loading = true;
      this.fixedTh = false;
      this.$nextTick(async () => {
        let printNode = this.$refs.printable.cloneNode(true)
        // let printTableContent = document.getElementById("print-table-content")
        // printTableContent.appendChild(printNode)
        let tableConent = printNode.querySelectorAll('tbody')[0]
        tableConent.innerHTML = ''
        let trs = this.$refs.printable.querySelectorAll('tbody')[0].querySelectorAll('tr')
        let pageHeight = 0;
        Array.prototype.forEach.call(trs,(tr,trIdx)=>{
          if(pageHeight + tr.offsetHeight>580){
            let childrens = [tr.cloneNode(true),tr.cloneNode(true)]
            // let rowsNum = Math.ceil((pageHeight + tr.offsetHeight) / 700)
            let rowsNum = 2
            let tds = tr.querySelectorAll('td')
            let tdStr = Array.prototype.map.call(tds,(td)=>td.innerText)
            let tdStrClone = [JSON.parse(JSON.stringify(tdStr)),JSON.parse(JSON.stringify(tdStr))]
            let tdStrLength = tdStr.map(str=>str.length)
            let maxLength = Math.ceil(Math.max(...tdStrLength) / 2)
            tdStr.map((str,index)=>{
              if(tdStrLength[index]>maxLength){
                tdStrClone[0][index] = str.slice(0,maxLength)
                tdStrClone[1][index] = str.slice(maxLength,tdStrLength[index])
                childrens[0].querySelectorAll('td')[index].innerText = tdStrClone[0][index]
                childrens[1].querySelectorAll('td')[index].innerText = tdStrClone[1][index]
              }else{
                childrens[1].querySelectorAll('td')[index].innerText = ''
              }
            })
            childrens[0].id = 'no-border-bottom'
            tableConent.appendChild(childrens[0])
            childrens[1].id = 'no-border-top'
            tableConent.appendChild(childrens[1])
            pageHeight = tr.offsetHeight % 580
          }else{
            tableConent.appendChild(tr.cloneNode(true))
            pageHeight += tr.offsetHeight
          }
        })
        await print(this.$refs.printable, {
          beforePrint: (win)=>formatter(win,printNode),
          direction: "horizontal",
          injectGlobalCss: true,
          scanStyles: false,
          css: `
            @page:first{
              margin-top:0;
            }
            .fixedTh {
              display: none !important;
              height: auto;
            }
            pre {
              white-space: pre-wrap;
            }
            #no-border-top td{
              border-top:none!important;
            }
            #no-border-bottom td{
              border-bottom:none!important;
            }
            table{
              border-bottom:1px solid #000;
            }
          `
        });
      });
      this.loading = false;
    },
    async onCopy() {
      // let isData = false;
      // this.patients.forEach(item => {
      //   for (const key in item) {
      //     if (item[key]) isData = true;
      //   }
      // })
      if (!(this.allSigned || !this.modified)) {
        this.$confirm('有未保存数据，是否覆盖?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          let { data } = await apis.copyShift(this.record.id)
          if (data.code === '200') {
            this.load()
            this.$message({
              type: 'success',
              message: '复制成功!'
            });
          } else {
            this.$message({
              type: 'error',
              message: `${data.desc}!`
            });
          }
        })
      } else {
        let { data } = await apis.copyShift(this.record.id)
        if (data.code === '200') {
          this.load()
          this.$message({
            type: 'success',
            message: '复制成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: `${data.desc}!`
          });
        }
      }
    },
    onTableInputChange({ prop, row }) {
      this.modified = true;

      if (prop == "bedLabel") {
        this.patients[row].name = "";
        this.patients[row].age = "";
        this.patients[row].sex = "";
        this.patients[row].diagnosis = "";
        this.patients[row].patientStatus = "";
      }
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
            this.patients[row].sex = data.sex;
            this.patients[row].diagnosis = data.diagnosis;
            this.patients[row].symptom = data.complaint || "";
            this.patients[row].patientStatus = data.patientStatus;
            this.patients[row].patientId = data.patientId || "";
            this.patients[row].visitId = data.visitId || "";
            this.patients[row].proposal = data.advice || "";
            this.patients[row].checkInspection = data.evaluate || "";

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
    SelectPatientModal,
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
  display: flex;
  justify-content: space-between;
  line-height: 25px;

  div {
    font-size: 0;
    white-space: nowrap;
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

