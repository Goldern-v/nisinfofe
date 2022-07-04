<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode"/>
      </ElSelect>
      <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()">添加患者</Button>
      <!--<Button
          :disabled="isEmpty || allSigned || !$refs.table || !$refs.table.selectedRow"
          @click="onRowRemove"
      >删除行
      </Button>-->
      <!--<Button :disabled="isEmpty || allSigned || !modified" @click="onSave(true)">保存</Button>-->
      <Button :disabled="isEmpty" @click="onSave(true)">保存</Button>
      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographNameA" @click="onRemove">删除登记表</Button>
      <Button :disabled="isEmpty" @click="onToggleFullPage">{{getFullPage() ? '关闭全屏' : '全屏'}}</Button>
    </div>
    <div class="container" ref="container">
      <Placeholder
          v-if="isEmpty"
          icon="el-icon-plus"
          @click="onCreateModalOpen($route.params.code)"
      >创建查房登记表
      </Placeholder>
      <div class="paper" v-else>
        <div ref="printable" data-print-style="height: auto;">
          <div class="head shift-paper">
            <!--<h1 class="title">{{deptName}}</h1>-->
            <h2 class="title">军区病人夜间查房登记表</h2>
          </div>
          <ExcelTable
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
            <tr>
              <td
                  colspan="2"
                  style="padding: 0;"
                  data-print-style="border-top: none;"
              >
                <div style="line-height: 22px; text-align: center; padding: 0 5px;">查房人员签名（22:00医护，24:00-6:00值班护士）</div>
              </td>
              <td v-if="signMap" v-for="item in signArr">
                <div
                    :key="item.key"
                    class="single-wrapper"
                    data-print-style="width: auto"
                    @click="onSignMapOpen(item.key, signMap[item.No])"
                >
                  <FallibleImage
                      class="img"
                      v-if="signMap[item.No]"
                      :src="`/crNursing/api/file/signImage/${signMap[item.No]}?${token}`"
                      :alt="signMap[item.No]"
                      data-print-style="display: inline-block; width: 52px; height: auto;"
                  />
                  <div
                      v-else
                      data-print-style="display: none"
                      :disabled="isEmpty"
                  >
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <!-- <td colspan="7"> -->
              <td colspan="9">
                <div class="table-remake">
                  <span style="width: 40px;">备注：</span>
                  <input v-model="record.remark" type="text">
                </div>
              </td>
            </tr>
          </ExcelTable>
        </div>
      </div>
    </div>
    <PatientsModal
        ref="patientsModal"
        :patients=patientsModel
        @confirm="onPatientsModalConfirm"
    />
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
    <SpecialCasePanel ref="specialCasePanel" @apply-template="onSpecialCasePanelApply"/>
    <SignModal ref="signModal"/>
  </div>
</template>

<script>
  import common from "@/common/mixin/common.mixin";
  import FallibleImage from "@/components/FallibleImage/FallibleImage.vue";
  import {pick} from "lodash";
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
        patientsModel: [],
        signMap: {},
        copiedRow: null,
        columns: [
          {
            label: "床号",
            rowspan: 2,
            columns: [
              {
                // label: "床号",
                prop: "bedNo",
                align: "center",
                width: "100"
              },
            ]
          },
          {
            label: "姓名",
            rowspan: 2,
            columns: [
              {
                // label: "姓名、性别、年龄",
                prop: "name",
                width: "100",
                render: row => {
                  const status = row.patientStatus
                    ? `(${row.patientStatus})`
                    : "";
                  return [row.name + status, row.sex, row.age]
                    .filter(Boolean)
                    .join("，<br>");
                }
              }
            ]
          },
          {
            label: "病房情况（安全危‘√’，其它为‘×’,并在备注栏详情描述早交班汇报，特殊情况当时上报科室领导）",
            columns: [
              {
                label: "粤康码",
                prop: "healthCode",
                editable: true,
                width: "100"
              },
              {
                label: "行程码",
                prop: "itineraryCode",
                editable: true,
                width: "100"
              },
              {
                label: "22:00",
                prop: "tenPm",
                editable: true,
                width: "100"
              },
              {
                label: "0:00",
                prop: "zeroAm",
                editable: true,
                width: "100"
              },
              {
                label: "02:00",
                prop: "twoAm",
                editable: true,
                width: "100"
              },
              {
                label: "04:00",
                prop: "fourAm",
                editable: true,
                width: "100"
              },
              {
                label: "06:00",
                prop: "sixAm",
                editable: true,
                width: "100"
              },
            ]
          }
        ],
        fixedTh: false,
        signArr: [
          {key: 'tenPm', No: 'tenPmNo'},
          {key: 'zeroAm', No: 'zeroAmNo'},
          {key: 'twoAm', No: 'twoAmNo'},
          {key: 'fourAm', No: 'fourAmNo'},
          {key: 'sixAm', No: 'sixAmNo'},
          {key: 'healthCode', No: 'healthCodeNo'},
          {key: 'itineraryCode', No: 'itineraryCodeNo'},
        ]
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
      },
      // 二维配置数组转一维
      realColumns() {
        let columns = [];
        for (const col of this.columns) {
          if (col.columns && col.columns.length) {
            columns = columns.concat(col.columns);
          } else {
            columns.push(col);
          }
        }
        return columns;
      },
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
    async mounted() {
      if (this.deptCode) {
        this.loadDepts();
      }
      if (this.deptCode) {
        const {data} = await apis.listPatients(this.deptCode)
        this.patientsModel = data.data.filter(item => {
          return item.name
        }).map(item => {
          return {
            bedNo: item.bedNo,
            name: item.name,
            patientId: item.patientId
          }
        })
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
      async loadDepts() {
        const parentCode = this.deptCode;
        const res1 = await apis.listDepartment(parentCode);
        const {
          data: {data: depts}
        } = res1;

        this.depts = depts;

        const code = depts[0] && depts[0].deptCode;
        const params = this.$route.params;

        if (!params.code) {
          this.$router.push({path: `/singleRound/${code}`});
        }
        this.reloadSideList();
      },
      onCodeChange(code) {
        this.$router.push({path: `/singleRound/${code}`});
      },
      async load() {
        const id = this.$route.params.id;
        if (!id) return;
        this.loading = true;
        try {
          const {data: {data}} = await apis.getShiftRecord(id);
          const {nightRoundsMaster: record, nightRoundsList: patients, signMap} = data;
          record.specialCase = record.specialCase || "";
          this.record = record;
          this.signMap = signMap
          this.patients = patients;
          this.modified = false;

          if (patients.length < 26) {
            this.patients = this.patients.concat(
              Array.from({length: 26 - patients.length}).map(() => ({
                ...defaultPatient
              }))
            );
          }
        } catch (error) {
          this.$router.replace({name: "singleRound"});
        }
        this.loading = false;
      },
      getContextMenu() {
        const {selectedRow, selectedCol} = this.$refs.table;
        const parseDisabled =
          selectedCol.prop === "bedLabel" || selectedCol.prop === "name";

        const copyContent =
          (selectedCol.prop && selectedRow[selectedCol.prop]) || "";
        const pasteContent = sessionStorage.getItem("shift-work-copy-content");
        const {selectionStart, selectionEnd} = window.event.srcElement;

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
                const {selectedRow, selectedCol} = this.$refs.table;
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
                  data: {data: remoteDate}
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
                this.$refs.table.addRowBefore({...defaultPatient});
              }
            },
            {
              name: "向下插入新行",
              icon: "xiangxiacharuyihang",
              click: () => {
                this.modified = true;
                this.$refs.table.addRowAfter({...defaultPatient});
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
        const {selectionStart, selectionEnd} = window.event.srcElement;

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

        window.openContextMenu({data, style});
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
      onDblClickRow({row, rowIndex, col}) {
        // if (this.allSigned) {
        //   return
        // }

        const tabMap = {
          background: "2",
          assessmentSituation: "3",
          proposal: "4"
        };
        const tab = tabMap[col.prop] || "1";
        this.$refs.patientModal.open(
          tab,
          {...row},
          col.prop,
          !!this.record.autographNameN
        );
      },
      onPatientsModalShow(d) {
        const id = this.$route.params.id;
        const deptCode = this.$route.params.code;
        const date = d || this.record.roundsDate;

        const selectedKeys = this.patients
          .filter(p => p.patientId)
          .map(p => p.patientId);

        this.$refs.patientsModal.open({deptCode, date, id, selectedKeys});
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
      onPatientPanelApply({tab, item}) {
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
        const deptCode = this.deptCode;
        const nightRoundsMaster = this.record;
        const nightRoundsList = this.patients
          .filter(p => p.name || p.id)
          .map((p, i) => ({...p, parentId: nightRoundsMaster.id}));

        await apis.updateShiftRecord({
          nightRoundsMaster,
          nightRoundsList,
          // deptCode
        });

        this.load();
        if (tip) {
          this.$message.success("保存成功");
        }
      },
      onSignMapOpen(type, value) {
        if (this.modified) {
          return this.$message.warning("请先保存后再签名");
        }
        window.openSignModal(async (password, username) => {
          const params = {
            id: this.record.id,
            signerType: type,
            empNo: username,
            password: password,
          }
          if (value) {
            await apis.cancelSignMap(params)
          } else {
            await apis.signMap(params);
          }
          this.load();
          this.$refs.signModal.close();
          this.$message.success(value ? '取消签名成功' : "签名成功");
        });
      },
      onSignModalOpen(type) {
        if (this.modified) {
          return this.$message.warning("请先保存后再签名");
        }

        window.openSignModal(async (password, username) => {
          await apis.signShiftRecord(this.record.id, type, username, password);

          this.load();
          this.$refs.signModal.close();
          this.$message.success("签名成功");

          if (type === "N") {
            this.reloadSideList();
          }
        });
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
          this.$router.push({path: `/singleRound/${code}`});
          this.reloadSideList();
        });
      },
      async onPrint() {
        this.loading = true;
        this.fixedTh = false;
        this.$nextTick(async () => {
          await print(this.$refs.printable, {
            beforePrint: (win) => formatter(win,this.realColumns.length | 9),
            direction: "vertical",
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
      onTableInputChange({prop, row}) {
        this.modified = true;

        if (prop == "bedLabel") {
          this.patients[row].name = "";
          this.patients[row].age = "";
          this.patients[row].sex = "";
          this.patients[row].diagnosis = "";
          this.patients[row].patientStatus = "";
        }
      },
      async onTableInputKeydown({event, value, prop, row}) {
        if (event.keyCode === 13 && prop === "bedLabel") {
          event.preventDefault();

          if (value) {
            const date = this.record.changeShiftDate;
            const params = this.$route.params;
            const {
              data: {data}
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
    width: 780px;
    min-height: 1080px;
    border-radius: 2px;
    background: #fff;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);
    box-sizing: border-box;

    .table-remake {
      display: flex;
      align-items: center;
      padding: 0 5px;

      input {
        border: none;
        outline: none;
        flex: 1;
        background: none;
      }
    }

    .single-wrapper {
      width 100%;
      height 100%;
      cursor pointer

      & > div {
        height 100%
        width 100%
        cursor: pointer;
      }
    }
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

    > span {
      flex: 1;
      white-space: nowrap;
    }
  }

  .table {
    margin-top: 5px;

    >>> pre {
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

    .table-remake {
      display: flex;
      align-items: center;
      padding: 0 5px;

      input {
        border: none;
        outline: none;
        flex: 1;
        background: none;
        text-align left
      }
    }

  }

  @page {
    size: A4 portrait;
    margin: 0 10mm;
  }
</style>

