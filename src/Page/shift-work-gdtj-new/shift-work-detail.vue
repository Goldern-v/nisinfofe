<template>
  <div class="shift-work-detail" v-loading="loading">
    <div class="toolbar">
      <!-- test -->
      <span>科室：</span>
      <ElSelect size="small" :value="$route.params.code" @input="onCodeChange">
        <ElOption v-for="d of depts" :key="d.deptCode" :label="d.deptName" :value="d.deptCode" />
      </ElSelect>
      <Button :disabled="isEmpty || allSigned" @click="onPatientsModalShow()"  v-if="!$store.state.shiftRecords.isLock">添加患者</Button>
      <Button
        :disabled="isEmpty || allSigned || !$refs.table || !$refs.table.selectedRow"
        @click="onRowRemove"
        v-if="!$store.state.shiftRecords.isLock"
      >删除行</Button>
      <!-- <Button :disabled="isEmpty || allSigned || !modified" @click="onSave(true)">保存</Button> -->
      <Button :disabled="isEmpty || allSigned"  @click="onSave3(true)" v-if="!$store.state.shiftRecords.isLock">保存</Button>
      <Button :disabled="isEmpty" @click="onPrint">打印预览</Button>
      <div class="empty"></div>
      <Button :disabled="isEmpty || !!record.autographNameA" @click="onRemove" v-if="!$store.state.shiftRecords.isLock">删除交班志</Button>
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
            <h2 class="sub-title">ISBAR交班记录卡</h2>
            <div class="details">
              <span>
                病区情况：原有：<b><input type="text" v-model="shiftWithWardcodes.original"/></b>人，
              </span>
              <span>
                新收：<b><input type="text" v-model="shiftWithWardcodes.patientNew" /></b>人，
              </span>
              <span>
                转入：<b><input type="text" v-model="shiftWithWardcodes.patientTransferIn" /></b>人，
              </span>
              <span>
                出院：<b><input type="text" v-model="shiftWithWardcodes.patientOut" /></b>人，
              </span>
              <span>
                转出：<b><input type="text" v-model="shiftWithWardcodes.patientTransferOut" /></b>人，
              </span>
              <span>
                现有：<b><input type="text" v-model="shiftWithWardcodes.allTotal" /></b>人，
              </span>
              <span>
                病危：<b><input type="text" v-model="shiftWithWardcodes.patientBw" /></b>人，
              </span>
              <span>
                病重：<b><input type="text" v-model="shiftWithWardcodes.patientBz" /></b>人，
              </span>
              <span>
                手术：<b><input type="text" v-model="shiftWithWardcodes.patientOpration" /></b>人
              </span>
              <span>
                交班日期：<b>{{record.changeShiftDate}}</b>
              </span>
            </div>
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
            <tr class="empty-row" v-if="!patients.length">
              <td colspan="7" style="padding: 0">
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
            <tr class="normal-row">
              <td colspan="7" class="special-case-title" data-print-style="border-bottom: none;">
                <span class="row-title">特殊情况交接：（包括特殊复查的各种结果：如MR、CT、检验异常值等以及当班未完成治疗护理、病房安全等）</span>
                <span
                  class="row-action"
                  v-if="!allSigned"
                  @click="onSpecialCasePanelOpen"
                  data-print-style="display: none;"
                >特殊情况模板</span>
              </td>
            </tr>
            <tr class="normal-row">
              <td
                colspan="7"
                style="padding: 0;"
                data-print-style="border-top: none;"
                @contextmenu.stop.prevent="onContextMenu($event, record.specialSituation)"
              >
                <label>
                  <el-input
                    autosize
                    type="textarea"
                    class="special-case"
                    :disabled="allSigned"
                    v-model="record.specialSituation"
                    @input="modified = true"
                  />
                </label>
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
              <span>/</span>
              <span data-print-style="display: none">
                <!-- <template v-if="record.autographNameA">{{record.autographNameA}}</template> -->
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
            <div data-print-style="width: auto" v-if="HOSPITAL_ID != 'weixian'">
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
              <span>/</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.autographNameP2"
                  @click="onDelSignModalOpen('P2',record.autographEmpNoP)"
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
              <span>/</span>
              <span data-print-style="display: none">
                <button
                  v-if="record.autographNameN2"
                  @click="onDelSignModalOpen('N2', record.autographEmpNoN2)"
                >{{record.autographNameN2}}</button>
                <button
                  v-else
                  :disabled="isEmpty"
                  @click="onSignModalOpen('N2', record.autographEmpNoN2)"
                >点击签名</button>
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
        </div>
      </div>
    </div>
    <PatientsModal ref="patientsModal" @confirm="onPatientsModalConfirm" @save="onSave"/>
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
      columns: [
        {
          label: "I（介绍）",
          columns: [
            {
              label: "床号",
              prop: "bedLabel",
              editable: true,
              align: "center",
              width: "35"
            },
            {
              label: "姓名、性别、年龄",
              prop: "name",
              width: "53",
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
          label: "S（现状）",
          columns: [
            {
              label: "主要诊断",
              prop: "diagnosis",
              editable: true,
              width: "80"
            },
            {
              label: "主诉及现存主要问题",
              prop: "mainComplaint",
              editable: true,
              width: "90"
            }
          ]
        },
        {
          label: "B（背景）",
          columns: [
            {
              label: "既往病史、治疗经过、护理评估情况、治疗效果跟踪",
              prop: "background",
              editable: true,
              width: "180"
            }
          ]
        },
        {
          label: "A（评估）",
          columns: [
            {
              label: "交班前最后一次护理评估情况",
              prop: "assessmentSituation",
              editable: true,
              width: "110"
            }
          ]
        },
        {
          label: "R（建议）",
          columns: [
            {
              label: "交给下一班需注意的",
              prop: "proposal",
              editable: true,
              width: "100"
            }
          ]
        }
      ],
      fixedTh: false,
      liaocFixedTh: false,
      currentClass: "白班",
      countDown:0 //交班报告倒计时
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
        this.liaocFixedTh = true;
      } else {
        this.fixedTh = false;
        this.liaocFixedTh = false;
      }
    });
  },
  methods: {
    async toUnLock(){
       // 判断是否超时了。超时就清空信息。不用发请求
        if(this.$store.state.shiftRecords.enterTime){
          if(!this.$store.state.shiftRecords.setupTime){
              let min=10
              const {data:{data}}=await apis.unLockTime()
              if(data!=='his_form_data_lock_timeout'){
              min=+data
              this.$store.commit("changeSetupTime",min)
             }
           }
          /* 进入的时间 乘以多少分钟 1分钟=60000  有效的锁定时间*/
          const enterTime=+this.$store.state.shiftRecords.enterTime + 60000 * this.$store.state.shiftRecords.setupTime
          const nowTime=Date.now()
          if(nowTime>enterTime){
            // ID号清空
            this.$store.commit("changeShiftRecordID",'')
            // 进入时间清空
            this.$store.commit("changeEnterTime",'')
            return
          }
        }
        // 有ID就解锁
        if(this.$store.state.shiftRecords.shiftRecordID){
          // 解锁
          const res= await apis.unLockShiftRecord(this.$store.state.shiftRecords.shiftRecordID)
          // 清空
          this.$store.commit("changeShiftRecordID",'')
          this.$store.commit("changeEnterTime",'')
        }
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
    onClassChange(currentClass){
      this.currentClass = currentClass;
      sessionStorage.setItem(this.$route.fullPath,this.currentClass);
      this.load();
    },
    async load() {
      const id = this.$route.params.id;
      if (!id) return;
      /* 每次加载数据都设为没有锁定 */
      this.$store.commit("changeLockState",false)
      // 有延时器就取消
      if(this.$store.state.shiftRecords.lockTimeId){
         clearTimeout(this.$store.state.shiftRecords.lockTimeId)
         this.$store.commit("changeLockTimeId",'')
      }
      // 有倒计时定时器就关闭
      if(this.$store.state.shiftRecords.countDownId){
        clearInterval(this.$store.state.shiftRecords.countDownId)
        this.$store.commit("changeCountDownId",'')
      }
      /* 发送请求，获取后台时间 */
      if(!this.$store.state.shiftRecords.setupTime){
          let min=10
          const {data:{data}}=await apis.unLockTime()
          if(data!=='his_form_data_lock_timeout'){
            min=+data
            this.$store.commit("changeSetupTime",min)
       }
      }
      /* 设置延时器 */
      let timeID=setTimeout(async()=>{
        this.$message.warning(`${this.$store.state.shiftRecords.setupTime}分钟交班报告没有进行编辑，页面将自动刷新`)
        await this.load()
      },this.$store.state.shiftRecords.setupTime * 60000)
      this.$store.commit("changeLockTimeId",timeID)
      this.loading = true;
      try {
        const {
          data
        } = await apis.getShiftRecord(id);
        /* 提示正在操作。然后操作按钮隐藏 */
        if(data.errorCode=='3001'){
           window.app && window.app.$message({
            showClose: true,
            message: `其他护士${data.desc}`,
            type: 'error',
            duration:5000
          })
          this.$store.commit("changeLockState",true)
          /* 如果切换其他加班日志，已经把锁定。那么之前自己有的交班日志，解锁 */
          await this.toUnLock()
        }else{
          if(!this.$store.state.shiftRecords.countDownId){
           // 右上角10分钟倒计时
          // 这里不是600000是因为上面延时器在请求之前设置的，发送请求需要时间
             this.countDown=this.$store.state.shiftRecords.setupTime * 60000 - 3000
             let countDownTimeId=setInterval(()=>{
               if(this.countDown==0){
                  clearInterval(this.$store.state.shiftRecords.countDownId)
                  this.$store.commit("changeCountDownId",'')
               }
              this.countDown=this.countDown-1000
            },1000)
            this.$store.commit("changeCountDownId",countDownTimeId)
          }

          // 没有锁定成功进入。把ID存入VUEX解锁用
          this.$store.commit("changeShiftRecordID",id)
          // 存入进入的时间
          this.$store.commit("changeEnterTime",Date.now())
        }
        const { changeShiftTimes: record, changeShiftPatients: patients,shiftWithWardcodes: shiftWithWardcodes } = data.data;
        record.specialCase = record.specialCase || "";
        this.record = record;
        this.patients = patients;
        this.shiftWithWardcodes = shiftWithWardcodes[0];
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
              this.onSaveAll();
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

              await this.onSaveAll();
            }
          },
          {
            name: "向上移动行",
            icon: "charuxinhang",
            click: async () => {
              // this.modified = true
              this.$refs.table.moveRowUp();
              await this.onSaveAll();
            }
          },
          {
            name: "向下移动行",
            icon: "xiangxiacharuyihang",
            click: async () => {
              // this.modified = true
              this.$refs.table.moveRowDown();
              await this.onSaveAll();
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
            this.onSaveAll();
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
    onDblClickRow({ row, rowIndex, col }) {
      // if (this.allSigned) {
      //   return
      // }
      console.log(row, rowIndex, col,'onDblClickRow')
      const tabMap = {
        background: "2",
        assessmentSituation: "3",
        proposal: "4"
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

      // if (selectedRow) {
      //   this.$refs.table.updateRow(data);
      // } else {
      //   this.$refs.table.addRow(data);
      // }
      this.onSave2(true);
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
    async onSaveAll(tip) {
      const deptCode = this.deptCode;
      const changeShiftTime = this.record;
      let changeShiftPatients = this.patients.filter(p => p.name || p.id).map((p, i) => ({ ...p, sortValue: i + 1 }));
      const shiftWithWardcodes = [this.shiftWithWardcodes]

      await apis.updateShiftRecord({
        changeShiftTimes: changeShiftTime,
        changeShiftPatients,
        shiftWithWardcodes
      });

      this.load();
      if (tip) {
        this.$message.success("保存成功");
      }
    },
    async onSave(tip,patients) {
      const deptCode = this.deptCode;
      const changeShiftTime = this.record;
      let changeShiftPatients = []
      if(['gdtj'].includes(this.HOSPITAL_ID)) changeShiftPatients = patients
      else changeShiftPatients = this.patients.filter(p => p.name || p.id).map((p, i) => ({ ...p, sortValue: i + 1 }));
      const shiftWithWardcodes = [this.shiftWithWardcodes]

      await apis.updateShiftRecord({
        changeShiftTimes: changeShiftTime,
        changeShiftPatients,
        shiftWithWardcodes
      });

      this.load();
      if (tip) {
        this.$message.success("保存成功");
      }
      if(['gdtj'].includes(this.HOSPITAL_ID)){
        this.$refs.patientsModal.close();
      }
    },
    async onSave3(tip,patients) {
      const deptCode = this.deptCode;
      const changeShiftTime = this.record;
      const shiftWithWardcodes = [this.shiftWithWardcodes]

      await apis.updateShiftRecord({
        changeShiftTimes: changeShiftTime,
        shiftWithWardcodes
      });

      this.load();
      if (tip) {
        this.$message.success("保存成功");
      }
    },
    async onSave2(tip,patients) {
      const deptCode = this.deptCode;
      const changeShiftTime = this.record;
      let changeShiftPatients = [this.$refs.table.selectedRow].filter(p => p.name || p.id).map((p, i) => ({ ...p, sortValue: i + 1 }));
      const shiftWithWardcodes = [this.shiftWithWardcodes]

      await apis.savePatient({
        changeShiftTimes: changeShiftTime,
        changeShiftPatients,
        shiftWithWardcodes
      });

      this.load();
      if (tip) {
        this.$message.success("保存成功");
      }
      if(['gdtj'].includes(this.HOSPITAL_ID)){
        this.$refs.patientsModal.close();
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
        const res=  await apis.removeShiftRecord(this.record.id, username, password);
        if(res.data.code==200 && res.data.desc=='操作成功'){
           await this.toUnLock()
           // 关闭定时器
           if(this.$store.state.shiftRecords.lockTimeId){
             clearTimeout(this.$store.state.shiftRecords.lockTimeId)
             this.$store.commit("changeLockTimeId",'')
           }
           // 关闭倒计时定时器
           if(this.$store.state.shiftRecords.countDownId){
             clearInterval(this.$store.state.shiftRecords.countDownId)
             this.$store.commit("changeCountDownId",'')
           }
        }
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
      this.liaocFixedTh = false;
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
          .liaocFixedTh {
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
  filters:{
    timeCountDown(val){
       return moment(val).format('mm:ss')
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

.liaocFixedTh{
  position fixed
  background-color:#fff
  top 103px
  width 1040px
  z-index 1
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
  align-items: center;
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
    width: 20px;
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
