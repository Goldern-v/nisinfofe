<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode" />
      </ElSelect>
      <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()">添加患者</Button>
      <Button
        :disabled="isEmpty || allSigned || !$refs.table || !$refs.table.selectedRow"
        @click="onRowRemove"
      >删除行</Button>
      <Button :disabled="isEmpty || allSigned"  @click="onSave(true, false)">保存</Button>
      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || orSigned" @click="onRemove">删除交班志</Button>
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
            <h2 class="sub-title">护士交接班簿</h2>
            <div style="text-align: right;">交班日期：<b>{{record.changeShiftDate}}</b></div>
          </div>
          <ExcelTable
            ref="table"
            class="table"
            :fixedTh="fixedTh"
            data-print-style="height: auto;"
            :shiftWithWardcodes='shiftWithWardcodes'
            :get-context-menu="getContextMenu"
            v-model="patients"
            @dblclick="onDblClickRow"
            @input-change="onTableInputChange"
            @input-keydown="onTableInputKeydown"
          >
          </ExcelTable>
          <table class="foot">
            <colgroup>
              <col width="50px"/>
              <col width="80px"/>
              <col width="150px"/>
              <col v-for="(col, i) in 3" :key="i + 'col' + col" width="253px" />
            </colgroup>
            <tr>
              <td colspan="3" >
                <div data-print-style="width: auto">
                  <span>护士长：</span>
                  <span data-print-style="display: none">
                    <button
                      v-if="record.nurseSignatureName"
                      @click="onDelSignModalOpen('', record.nurseSignatureNo)"
                    >{{record.nurseSignatureName}}</button>
                    <button v-else :disabled="isEmpty" @click="onSignModalOpen('')">点击签名</button>
                  </span>
                  <FallibleImage
                    class="img"
                    v-if="record.nurseSignatureName"
                    :src="`/crNursing/api/file/signImage/${record.nurseSignatureNo}?${token}`"
                    :alt="record.nurseSignatureName"
                    data-print-style="display: inline-block; width: 52px; height: auto;"
                  />
                  <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
                </div>
              </td>
              <td>
                <div class="signItem">
                  <div data-print-style="width: auto">
                    <span>交班护士：</span>
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
                  <div data-print-style="width: auto">
                    <span>接班护士：</span>
                    <span data-print-style="display: none">
                      <button
                        v-if="record.autographNameA2"
                        @click="onDelSignModalOpen('A2', record.autographEmpNoA2)"
                      >{{record.autographNameA2}}</button>
                      <button v-else :disabled="isEmpty" @click="onSignModalOpen('A2')">点击签名</button>
                    </span>
                    <FallibleImage
                      class="img"
                      v-if="record.autographNameA2"
                      :src="`/crNursing/api/file/signImage/${record.autographEmpNoA2}?${token}`"
                      :alt="record.autographNameA2"
                      data-print-style="display: inline-block; width: 52px; height: auto;"
                    />
                    <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="signItem">
                  <div data-print-style="width: auto">
                    <span>交班护士：</span>
                    <span data-print-style="display: none">
                      <button
                        v-if="record.autographNameP"
                        @click="onDelSignModalOpen('P', record.autographEmpNoP)"
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
                    <span>接班护士：</span>
                    <span data-print-style="display: none">
                      <button
                        v-if="record.autographNameP2"
                        @click="onDelSignModalOpen('P2', record.autographEmpNoP2)"
                      >{{record.autographNameP2}}</button>
                      <button v-else :disabled="isEmpty" @click="onSignModalOpen('P2')">点击签名</button>
                    </span>
                    <FallibleImage
                      class="img"
                      v-if="record.autographNameP2"
                      :src="`/crNursing/api/file/signImage/${record.autographEmpNoP2}?${token}`"
                      :alt="record.autographNameP2"
                      data-print-style="display: inline-block; width: 52px; height: auto;"
                    />
                    <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="signItem">
                  <div data-print-style="width: auto">
                    <span>交班护士：</span>
                    <span data-print-style="display: none">
                      <button
                        v-if="record.autographNameN"
                        @click="onDelSignModalOpen('N', record.autographEmpNoA)"
                      >{{record.autographNameN}}</button>
                      <button v-else :disabled="isEmpty" @click="onSignModalOpen('N')">点击签名</button>
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
                  <div data-print-style="width: auto">
                    <span>接班护士：</span>
                    <span data-print-style="display: none">
                      <button
                        v-if="record.autographNameN2"
                        @click="onDelSignModalOpen('N2', record.autographEmpNoN2)"
                      >{{record.autographNameN2}}</button>
                      <button v-else :disabled="isEmpty" @click="onSignModalOpen('N2')">点击签名</button>
                    </span>
                    <FallibleImage
                      class="img"
                      v-if="record.autographNameN2"
                      :src="`/crNursing/api/file/signImage/${record.autographEmpNoN2}?${token}`"
                      :alt="record.autographNameN2"
                      data-print-style="display: inline-block; width: 52px; height: auto;"
                    />
                    <span v-else style="display: none;" data-print-style="display: inline-block;">未签名</span>
                  </div>
                </div>
              </td>
            </tr>
          </table>
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
import tr from '../sheet-page/components/config/tbhld_lc/tr';
const defaultPatient = {
  name: "",
  bedLabel: "",
  // age: "",
  // patientStatus: "",
  diagnosis: "",
  notea: '',
  notep: '',
  noten: '',
  // mainComplaint: "",
  // background: "",
  // assessmentSituation: "",
  // proposal: ""
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
      loading: false,
      modified: false,
      depts: [],
      record: {},
      patients: [],
      copiedRow: null,
      shiftWithWardcodes: {},
      fixedTh: false,
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
        record.autographNameN && 
        record.autographNameA2 &&
        record.autographNameP2 &&
        record.autographNameN2 &&
        record.nurseSignatureName
      );
    },
    orSigned() {
      const record = this.record;
      return !!(
        record.autographNameA ||
        record.autographNameP ||
        record.autographNameN || 
        record.autographNameA2 ||
        record.autographNameP2 ||
        record.autographNameN2 ||
        record.nurseSignatureName
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
      if ($(dom).scrollTop() >= 100) {
        this.fixedTh = true;
      } else {
        this.fixedTh = false;
      }
    });
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
    // 创建保存一次
    async getToSave(){
      await this.load()
      await this.onSave()
    },
    async load() {
      const id = this.$route.params.id;
      if (!id) return;

      this.loading = true;
      try {
        const {
          data: { data }
        } = await apis.getShiftRecord(id);

        const { changeShiftTimes: record, changeShiftPatients: patients,shiftWithWardcodesA,shiftWithWardcodesP,shiftWithWardcodesN } = data;
        record.specialCase = record.specialCase || "";
        this.record = {...record,...shiftWithWardcodesA[0]||{}};
        this.patients = patients;
        this.shiftWithWardcodes = {
          A: shiftWithWardcodesA[0] || {},
          P: shiftWithWardcodesP[0] || {},
          N: shiftWithWardcodesN[0] || {}
        }
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
    // 右击的事件操作屏蔽（俺们没有话语权 医院到时候要不要另一回事 方法保留不删）
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
              if (selectedRow && selectedRow.sortValue) {
                await apis.removeShiftRecordRow(this.record.id,selectedRow.sortValue);
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
      if (selectedRow && selectedRow.sortValue) {
        await apis.removeShiftRecordRow(this.record.id,selectedRow.sortValue);
      }
      this.$refs.table.removeRow();
    },
    async onDblClickRow({ row, rowIndex, col }) {
      // if (this.allSigned) {
      //   return
      // }
      // 双击弹窗的时候调接口 保证护士在页面停留很久的时候拿到的是最新的数据
      try {
        let { data }  = await apis.getShiftPatient({
          id: this.record.id,
          patientId: row.patientId,
          visitId: row.visitId,
        })
        const tabMap = {
          background: "2",
          assessmentSituation: "3",
          proposal: "4"
        };
        const tab = tabMap[col.prop] || "1";
        let apiRow = data.data[0]
        this.$refs.patientModal.open(
          tab,
          { ...apiRow },
          col.prop,
          !!this.allSigned
        );
      } catch (error) {
        this.$message.error((error && error.data.desc) || '系统报错，请联系管理员');
      }  
    },
    onPatientsModalShow(d) {
      const id = this.$route.params.id;
      const deptCode = this.$route.params.code;
      const date = d || this.record.changeShiftDate;

      let selectedKeys = this.patients
        .filter(p => p.patientId && p.visitId)
        .map(p => p.patientId + "//" + p.visitId);
      // console.log(d , this.record.changeShiftDate);
      if(d){
        selectedKeys = []
      }
      this.$refs.patientsModal.open({ deptCode, date, id, selectedKeys });
    },
    onPatientsModalConfirm(patients) {
      for (let p of patients) {
        this.$refs.table.addRow(p);
      }
      // 不能在页面编辑table只能双击进弹窗做填写（解决多人编辑的时候数据丢失的问题 医院不要锁表的功能）
      this.onSave();
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
      this.onSave(true, true, false);
      this.$refs.patientModal.close();
      // this.modified = true
    },
    onPatientModalTabChange(tab) {
      if (this.$refs.patientPanel) {
        this.$refs.patientPanel.changeTab(tab);
      }
    },
    async onPatientPanelOpen() {
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
    
    async onSave(tip, patients_status = true, shif_status = true) {
      const deptCode = this.deptCode;
      const changeShiftTime = this.record;
      const changeShiftPatients = this.patients
        .filter(p => p.name || p.id)
        .map((p, i) => ({ ...p, sortValue: i + 1 }));
      
      const { A, P, N } = this.shiftWithWardcodes
      try {
        if (!shif_status) {
          let patient = [this.$refs.table.selectedRow].filter(p => p.name || p.id).map((p, i) => ({ ...p, sortValue: i + 1 }));
          await apis.savePatient({
            changeShiftTimes: changeShiftTime,
            changeShiftPatients: patient
          })
        } else {
          await apis.updateShiftRecord({
            changeShiftTimes: changeShiftTime,
            changeShiftPatients: patients_status ? changeShiftPatients : [], // 不能在页面编辑table 保存页面的时候也不传患者信息（解决多人编辑的时候数据丢失的问题 医院不要锁表的功能）
            shiftWithWardcodesA: [A],
            shiftWithWardcodesP: [P],
            shiftWithWardcodesN: [N],
          });
        }
        if (tip) {
          this.$message.success("保存成功");
        }
      } catch (error) {
        this.$message.error((error && error.data.desc) || '系统报错，请联系管理员');
      }
      this.load();
      
    },
    onSignModalOpen(type) {
      if (this.modified) {
        return this.$message.warning("请先保存后再签名");
      }
      console.log(type, 666666)
      window.openSignModal(async (password, username) => {
        await apis.signShiftRecord(this.record.id, type, username, password);

        this.load();
        this.$refs.signModal.close();
        this.$message.success("签名成功");
        
        // if (type === "N") {
        //   this.reloadSideList();
        // }
      });
    },
    onDelSignModalOpen(type, sourceEmpNo) {
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
        // this.reloadSideList();
      });
    },
    async onRemove() {
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
          .details pre {
            display: inline-block;
            width: 30px;
            text-align: center;
          }
         `
        });
      });
      this.loading = false;
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
  flex-wrap: wrap;

  >span {
    flex: 1;
    white-space: nowrap;
  }
}


.top-detail {
  margin-top: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.top-detail,.details {
  input {
    width: 30px;
    border: none;
    outline: none;
    text-align: center;
    font-weight: bold;
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
  // margin-top: 8px;
  // display: flex;
  // justify-content: space-between;
  // line-height: 25px;
  .signItem {
    display: flex; 
    justify-content: space-around
  }
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
  tr {
    td {
      border: 1px solid #333;
      border-top: none;
      margin: 0;
      padding: 1px;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
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
.class-option {
  position: absolute;
  top: 0;
  right: 0;
}
@media print {
  .shift-paper {
    padding-top: 40px !important;
    .class-option {
      top: 40px;
      >>> .el-select {
         .el-input__inner {
            border: none;
          }
          i {
            display: none;
          }
      }
    }
  }
}

@page {
  margin: 0 10mm;
}
</style>