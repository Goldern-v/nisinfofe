<template>
  <div class="header-con">
    <div class="his-name">
      <img src="./images/hospital-name.png" height="60" width="300" />
    </div>
    <div class="title" style="font-size: 30px;">
      {{ patientInfo.recordName }}
    </div>
    <div
      v-if="
        sheetInfo.sheetType === 'contraction_inhibitor_sdry' ||
          sheetInfo.sheetType === 'magnesiumsulphate_sdry'
      "
    >
      <div class="info-con">
        <span @click="handleDeptNameChoose(0)">
          科室:
          <div class="bottom-line" style="min-width: 266px">
            <!-- {{ patientInfo.realDeptName }} -->
            {{
              newPatientInfo[
                `realDeptName_${index}_${sheetInfo.selectBlock.id}`
              ]
            }}
          </div>
        </span>
        <span @click="handleDeptNameChoose(1)">
          病区:
          <div class="bottom-line" style="min-width: 135px">
            <!-- {{ patientInfo.deptName }} -->
            {{
              newPatientInfo[`deptName_${index}_${sheetInfo.selectBlock.id}`]
            }}
          </div>
        </span>
      </div>
      <div class="info-con">
        <span
          @click="
            updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)
          "
        >
          姓名:
          <div class="bottom-line" style="min-width: 70px">
            {{ patientInfo.patientName }}
          </div>
        </span>
        <span @click="updateTetxInfo('sex', '性别', patientInfo.sex)">
          性别:
          <div class="bottom-line" style="min-width: 35px">
            {{ patientInfo.sex }}
          </div>
        </span>
        <!-- <span @click="updateNeonatology2Age" v-if="sheetInfo.sheetType == 'neonatology2'">
        年龄:
        <div class="bottom-line" style="min-width: 50px">{{neonatology2Age}}</div>
      </span> -->
        <span @click="updateTetxInfo('age', '年龄', patientInfo.age)">
          年龄:
          <div class="bottom-line" style="min-width: 40px">
            {{ patientInfo.age }}
          </div>
        </span>
        <span>
          床号：
          <div
            :class="['bottom-line', 'has-background']"
            :style="{ minWidth: '55px', paddingRight: '5px' }"
            @dblclick.stop="openBedRecordModal"
          >
            <!-- {{ patientInfo.bedLabel }} -->
            {{
              newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`]
            }}
          </div>
        </span>
        <span>
          住院号:
          <div class="bottom-line" style="min-width: 70px; padding-right: 5px;">
            {{ patientInfo.inpNo }}
          </div>
        </span>
        <!-- <span>
        诊断:
        <div  class="bottom-line" style="min-width: 163px">{{patientInfo.diagnosis}}</div>
      </span> -->
        <span
          @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)"
        >
          诊断：
          <div
            class="bottom-line"
            style="
            width: 163px;
            height: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
          >
            {{ diagnosis }}
          </div>
        </span>
      </div>
    </div>
    <div v-else>
      <div
        class="info-con"
        v-if="sheetInfo.sheetType !== 'postpartum2_sdry'"
        style="display: flex; justify-content: start; align-items: center;"
      >
        <span @click="handleDeptNameChoose(0)">
          科室:
          <div
            class="bottom-line"
            :style="{
              minWidth:
                sheetInfo.sheetType == 'prenatal_sdry' ? '373px' : '336px'
            }"
          >
            <!-- {{ patientInfo.realDeptName }} -->
            {{
              newPatientInfo[
                `realDeptName_${index}_${sheetInfo.selectBlock.id}`
              ]
            }}
          </div>
        </span>
        <span style="margin-left: 4px;" @click="handleDeptNameChoose(1)">
          病区:
          <div class="bottom-line" style="min-width: 135px">
            <!-- {{ patientInfo.deptName }} -->
            {{
              newPatientInfo[`deptName_${index}_${sheetInfo.selectBlock.id}`]
            }}
          </div>
        </span>
        <template v-if="sheetInfo.sheetType == 'prenatal_sdry'">
          <span>
            特殊情况:
            <input
              style="width: 200px;font-size:13px;text-align: left;"
              class="bottom-line"
              :data-value="sheetInfo.relObj.tsqk"
              v-model="sheetInfo.relObj.tsqk"
            />
          </span>
          <span>
            过敏史：
            <input
              style="width: 130px;font-size:13px;text-align: left;"
              class="bottom-line"
              :data-value="sheetInfo.relObj.guomishi"
              v-model="sheetInfo.relObj.guomishi"
            />
          </span>
          <span>
            &nbsp;&nbsp;破膜时间:
            <crDatePicker
              :data-value="sheetInfo.relObj.laborTime"
              v-model="sheetInfo.relObj.laborTime"
              :width="152"
              style="border:none;border-bottom:1px solid #000;height:22px"
            />
          </span>
        </template>
        <template v-if="sheetInfo.sheetType == 'postpartum_sdry'">
          <span style="margin-left: 17px;"> 特殊情况：</span>
          <customSelectCanRepeat
            :options="specialCases"
            @onSelect="val => setRelValue('specialCase', val)"
            multiple
          >
            <input
              type="text"
              :data-value="sheetInfo.relObj.specialCase"
              v-model="sheetInfo.relObj.specialCase"
              style="width:180px;"
            />
          </customSelectCanRepeat>
          <span style="margin-left: 30px;">
            过敏史：
            <input
              style="width: 130px;font-size:13px;text-align: left;"
              class="bottom-line"
              :data-value="sheetInfo.relObj.guomishi"
              v-model="sheetInfo.relObj.guomishi"
            />
          </span>
        </template>

        <template v-if="sheetInfo.sheetType == 'baby_sdry'">
          <span style="margin-left: 17px;"> 羊水情况：</span>
          <customSelectCanRepeat
            :options="specialCasesYangShuis"
            @onSelect="val => setRelValue('specialCasesYangShui', val)"
            multiple
          >
            <input
              :data-value="sheetInfo.relObj.specialCasesYangShui"
              v-model="sheetInfo.relObj.specialCasesYangShui"
              style="width:180px;"
            />
          </customSelectCanRepeat>
        </template>
      </div>
      <div
        class="info-con"
        style="display: flex; justify-content: start; align-items: center;"
      >
        <span
          @click="
            updateTetxInfo('patientName', '病人姓名', patientInfo.patientName)
          "
        >
          姓名:
          <div class="bottom-line" style="min-width: 65px">
            {{ patientInfo.patientName }}
          </div>
        </span>
        <span
          @click="updateTetxInfo('sex', '性别', patientInfo.sex)"
          v-if="
            !['postpartum2_sdry', 'baby_sdry'].includes(sheetInfo.sheetType)
          "
        >
          性别:
          <div class="bottom-line" style="min-width: 30px">
            {{ patientInfo.sex }}
          </div>
        </span>

        <span
          @click="updateTetxInfo('age', '年龄', patientInfo.age)"
          v-if="sheetInfo.sheetType !== 'baby_sdry'"
        >
          年龄:
          <div class="bottom-line" style="min-width: 50px">
            {{ patientInfo.age }}
          </div>
        </span>
        <span>
          床号:
          <div
            :class="['bottom-line', 'has-background']"
            :style="{
              minWidth: ['oxytocin_sdry', 'insulin_pump_sdry'].includes(
                sheetInfo.sheetType
              )
                ? '55px'
                : ['orthopaedic_sdry'].includes(sheetInfo.sheetType)
                ? '45px'
                : '60px',
              paddingRight: '5px'
            }"
            @dblclick.stop="openBedRecordModal"
          >
            <!-- {{ patientInfo.bedLabel }} -->
            {{
              newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`]
            }}
          </div>
        </span>
        <span>
          住院号:
          <div class="bottom-line" style="min-width: 80px; padding-right: 5px;">
            {{ patientInfo.inpNo }}
          </div>
        </span>

        <span
          @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)"
          v-if="!diagnosisList.includes(sheetInfo.sheetType)"
        >
          诊断:
          <div
            class="bottom-line"
            style="
              width: 239px;
              height: 11px;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ diagnosis }}
          </div>
        </span>

         <!-- 产后护理记录单分娩方式 -->
        <template v-if="sheetInfo.sheetType == 'postpartum_sdry'">
          <span
            style="margin-left:60px;"
          >
            分娩时间:
            <input
              :data-value="sheetInfo.relObj.laborTime"
              v-model="sheetInfo.relObj.laborTime"
              @click="handleLaborTime($event)"
              style="border:none;border-bottom:1px solid #000;height:22px;width:192px;"
            />
          </span>
          <span style="margin-left: 25px"> 分娩方式:</span>
          <customSelectCanRepeat
            :options="parturitions"
            @onSelect="val => setRelValue('parturition', val)"
          >
            <input
              type="text"
              :data-value="sheetInfo.relObj.parturition"
              v-model="sheetInfo.relObj.parturition"
              style="width:160px;"
            />
          </customSelectCanRepeat>
        </template>
        <template v-if="sheetInfo.sheetType == 'postpartum2_sdry'">
          <!-- 顺德人医产后产房观察记录单 -->
          <span>
            分娩时间:
            <crDatePicker
              :data-value="sheetInfo.relObj.laborTime"
              v-model="sheetInfo.relObj.laborTime"
              :width="152"
              style="border:none;border-bottom:1px solid #000;height:22px"
            />
          </span>
          <span>
            胎盘娩出时间:
            <crDatePicker
              :data-value="sheetInfo.relObj.placentaTime"
              v-model="sheetInfo.relObj.placentaTime"
              :width="152"
              style="border:none;border-bottom:1px solid #000;height:22px"
            />
          </span>
          <span> 会阴情况:</span>
          <customSelectCanRepeat
            :options="perineums"
            @onSelect="val => setRelValue(`${index}perineums`, val)"
          >
            <input
              :data-value="sheetInfo.relObj[`${index}perineums`]"
              v-model="sheetInfo.relObj[`${index}perineums`]"
              style="width:100px;"
            />
          </customSelectCanRepeat>
        </template>

        <template v-if="sheetInfo.sheetType == 'prenatal_sdry'">
          <span>
            孕产史:孕
            <input
              style="width: 20px;font-size:13px;text-align: center;"
              class="bottom-line"
              :data-value="sheetInfo.relObj['pregnantTimes']"
              v-model="sheetInfo.relObj['pregnantTimes']"
            />产
            <input
              style="width: 20px;font-size:13px;text-align: center;"
              class="bottom-line"
              :data-value="sheetInfo.relObj['parity']"
              v-model="sheetInfo.relObj['parity']"
            />
            孕
            <input
              style="width: 35px;font-size:13px;text-align: center;"
              class="bottom-line"
              :data-value="sheetInfo.relObj[`${index}pregnantWeeks`]"
              v-model="sheetInfo.relObj[`${index}pregnantWeeks`]"
            />
            周
          </span>
          <span>&nbsp;&nbsp;引产(</span>
          <input
            style="width: 20px;font-size:13px;text-align: center;"
            class="bottom-line"
            :data-value="sheetInfo.relObj.yc"
            v-model="sheetInfo.relObj.yc"
          />
          <span> 周)/ 分娩方式:</span>
          <customSelectCanRepeat
            :options="options"
            @onSelect="val => setRelValue(`${index}options`, val)"
          >
            <input
              :data-value="sheetInfo.relObj[`${index}options`]"
              v-model="sheetInfo.relObj[`${index}options`]"
              style="width:160px;"
            />
          </customSelectCanRepeat>
        </template>

        <!-- 顺德人医产后产房表头处理 -->
        <template
          v-if="
            sheetInfo.sheetType == 'postpartum2_sdry' ||
              sheetInfo.sheetType == 'baby_sdry'
          "
        >
          <span
            :style="{
               minWidth: sheetInfo.sheetType === 'baby_sdry' && '50px',  marginLeft: sheetInfo.sheetType == 'baby_sdry' ? '35px' : ''
            }"
          >
            分娩方式：</span
          >
          <customSelectCanRepeat
            :options="options"
            @onSelect="val => setRelValue('option', val)"
          >
            <input
              :data-value="sheetInfo.relObj.option"
              v-model="sheetInfo.relObj.option"
              style="width:160px;"
            />
          </customSelectCanRepeat>
        </template>


      </div>
    </div>
    <bedRecordModal
      v-if="bedShow"
      @closeBedshow="closeBedshow"
      ref="bedRecordModal"
    ></bedRecordModal>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo, getDeliveryInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import crDatePicker from "@/components/cr-date-picker/cr-date-pickerV2.vue";
import customSelectCanRepeat from "@/components/customSelectCanRepeat/CustomSelectCanRepeat.vue";
import bedRecordModal from "../../../modal/bedRecord-modal";
import { saveBody, queryDianosisList } from "@/api/sheet.js";
import { update } from "@/Page/sheet-hospital-admission/components/Render/api/template";

export default {
  props: {
    patientInfo: Object,
    index: Number,
    bedAndDeptChange: Object
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      bedShow: false,
      hulicuoshis: [
        {
          value: "防跌倒",
          name: "防跌倒"
        },
        {
          value: "防血栓",
          name: "防血栓"
        },
        {
          value: "其他",
          name: "其他"
        }
      ],
      options: [
        {
          value: "顺产",
          name: "顺产"
        },
        {
          value: "吸引产",
          name: "吸引产"
        },
        {
          value: "剖宫产",
          name: "剖宫产"
        },
        {
          value: "钳产",
          name: "钳产"
        },
        {
          value: "臀助产",
          name: "臀助产"
        },
        {
          value: "臀牵引",
          name: "臀牵引"
        }
      ],
      // 顺德产后护理记录单分娩方式下拉选项
      parturitions: [
        {
          value: "顺产",
          name: "顺产"
        },
        {
          value: "剖宫产",
          name: "剖宫产"
        },
        {
          value: "钳产",
          name: "钳产"
        },
        {
          value: "负压产",
          name: "负压产"
        },
        {
          value: "院外分娩",
          name: "院外分娩"
        },
        {
          value: "臀牵引",
          name: "臀牵引"
        }
      ],
      perineums: [
        {
          value: "侧剪",
          name: "侧剪"
        },
        {
          value: "直剪",
          name: "直剪"
        },
        {
          value: "破裂Ⅰ",
          name: "破裂Ⅰ"
        },
        {
          value: "破裂Ⅱ",
          name: "破裂Ⅱ"
        },
        {
          value: "破裂Ⅲ",
          name: "破裂Ⅲ"
        },
        {
          value: "完整",
          name: "完整"
        }
      ],
      specialCases: [
        { name: "GDM", value: "GDM" },
        { name: "GBS(+)", value: "GBS(+)" },
        { name: "心脏病", value: "心脏病" },
        { name: "甲亢", value: "甲亢" },
        { name: "甲减", value: "甲减" },
        { name: "ICP", value: "ICP" },
        { name: "高血压", value: "高血压" },
        { name: "子痫前期", value: "子痫前期" },
        { name: "双胎", value: "双胎" },
        { name: "部分性前置胎盘", value: "部分性前置胎盘" },
        { name: "边缘性前置胎盘", value: "边缘性前置胎盘" },
        { name: "中央性前置胎盘", value: "中央性前置胎盘" },
        { name: "胎盘早剥", value: "胎盘早剥" },
        { name: "IVF-ET术后", value: "IVF-ET术后" },
        { name: "HIV", value: "HIV" },
        { name: "梅毒", value: "梅毒" },
        { name: "丙肝", value: "丙肝" },
        { name: "乙肝", value: "乙肝" },
        { name: "子宫切除术", value: "子宫切除术" },
        { name: "贫血", value: "贫血" },
        { name: "血小板减少", value: "血小板减少" },
        { name: "其他", value: "其他" }
      ],
      specialCasesYangShuis: [
        { name: "清", value: "清" },
        { name: "I°", value: "I°" },
        { name: "II°", value: "II°" },
        { name: "III°", value: "III°" },
        { name: "血性", value: "血性" }
      ],
      //不需要入院日期的表单
      admissionDateList: ["blood_tj", "generalnursing_tj"],
      //不需要诊断的表单postpartum_sdry  baby_sdry    prenatal_sdry
      diagnosisList: [
        "prenatal_sdry",
        "postpartum_sdry",
        "baby_sdry",
        "postpartum2_sdry"
      ]
      // 不需要显示科室的表单
      // realDeptNameList:[
      //   postpartum2_sdry
      // ],
    };
  },
  mounted() {},
  computed: {
    ...{
      checkedbzc: {
        get() {
          return this.sheetInfo.relObj[`bzc`] === "true";
        },
        set(nVal) {
          this.sheetInfo.relObj[`bzc`] = nVal ? "true" : "false";
        }
      },
      newPatientInfo() {
        /*  每页独立床号功能 */
        let beforeBed = this.patientInfo.bedLabel;
        let nowBed = this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`];
        if (
          this.index != 0 &&
          this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index - 1}`]
        ) {
          // 除了第一页，其他页数。先拿bedLabel，如果上一页也有床位那就拿就拿上一页的
          beforeBed = this.sheetInfo.relObj[
            `PageIndex_bedLabel_${this.index - 1}`
          ];
        }

        let beforerealDept = this.patientInfo.realDeptName;
        let newrealDept = this.sheetInfo.relObj[
          `PageIndex_realDeptName_${this.index}`
        ];
        if (
          this.index != 0 &&
          this.sheetInfo.relObj[`PageIndex_realDeptName_${this.index - 1}`]
        ) {
          // 除了第一页，其他页数。先拿bedLabel，如果上一页也有床位那就拿就拿上一页的
          beforerealDept = this.sheetInfo.relObj[
            `PageIndex_realDeptName_${this.index - 1}`
          ];
        }

        let beforeDeptName = this.patientInfo.deptName;
        let newDeptName = this.sheetInfo.relObj[
          `PageIndex_deptName_${this.index}`
        ];
        if (
          this.index != 0 &&
          this.sheetInfo.relObj[`PageIndex_deptName_${this.index - 1}`]
        ) {
          // 除了第一页，其他页数。先拿bedLabel，如果上一页也有床位那就拿就拿上一页的
          beforeDeptName = this.sheetInfo.relObj[
            `PageIndex_deptName_${this.index - 1}`
          ];
        }
        return {
          ...this.patientInfo,
          [`bedLabel_${this.index}_${this.sheetInfo.selectBlock.id}`]: nowBed
            ? nowBed
            : beforeBed,
          [`realDeptName_${this.index}_${this.sheetInfo.selectBlock.id}`]: newrealDept
            ? newrealDept
            : beforerealDept,
          [`deptName_${this.index}_${this.sheetInfo.selectBlock.id}`]: newDeptName
            ? newDeptName
            : beforeDeptName
        };
      }
    },
    diagnosis() {
      /** 最接近的index */
      // let realIndex = 0;
      // let keys = Object.keys(sheetInfo.relObj || {});
      // for (let i = 0; i < keys.length; i++) {
      //   let [base, keyIndex] = keys[i].split("PageIndex_diagnosis_");
      //   if (keyIndex !== undefined) {
      //     if (this.index >= keyIndex) {
      //       if (this.index - keyIndex <= this.index - realIndex) {
      //         realIndex = keyIndex;
      //       }
      //     }
      //   }
      // }
      // return (
      //   (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] ||
      //   this.patientInfo.diagnosis
      // );
      return (
        (sheetInfo.relObj || {})[`PageIndex_diagnosis_${this.index}`] ||
        this.patientInfo.diagnosis
      );
    },
    childbirth() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_childbirth_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_childbirth_${realIndex}`] ||
        this.patientInfo.childbirth
      );
    },
    birthday() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_birthday_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (sheetInfo.relObj || {})[`PageIndex_birthday_${realIndex}`];
    },
    laborTime() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("laborTime");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`laborTime`] ||
        (this.patientInfo.laborTime == undefined
          ? "/"
          : this.patientInfo.laborTime)
      );
    },
    deliveryTime() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("deliveryTime");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`deliveryTime`] ||
        (this.patientInfo.deliveryTime == undefined
          ? "/"
          : this.patientInfo.deliveryTime)
      );
    },
    // 产后产房观察记录单胎盘娩出时间
    placentaTime() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("placentaTime");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`placentaTime`] ||
        (this.patientInfo.placentaTime == undefined
          ? "/"
          : this.patientInfo.placentaTime)
      );
    }
  },
  methods: {
    // 转科弹窗
    handleDeptNameChoose(istype) {
      this.bus.$emit("openMajorCheckbox", true, istype, this.index);
    },
    // 点击获取当前时间
    handleLaborTime(e) {
      if (!e.target.value) {
        e.target.value = moment().format("YYYY-MM-DD HH:mm");
      }
    },
    closeBedshow() {
      this.bedShow = false;
    },
    updateTetxInfo(key, label, autoText) {
      window.openSetTextModal(
        text => {
          updateSheetHeadInfo({ [key]: text }).then(res => {
            this.patientInfo[key] = res.data.data[key];
            this.$message.success(`修改${label}成功`);
          });
        },
        autoText,
        `修改${label}`
      );
    },
    // 修改时间方法
    updateTime(key, label, autoText) {
      window.openSetAuditDateModal(
        text => {
          updateSheetHeadInfo({ [key]: text }).then(res => {
            this.patientInfo[key] = res.data.data[key];
            this.$message.success(`修改${label}成功`);
          });
        },
        autoText,
        `修改${label}`
      );
    },
    setRelValue(code, val) {
      this.$set(this.sheetInfo.relObj, code, val);
    },
    openBedRecordModal() {
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      //修改床号同步都每一页
      this.bedShow = true;
      setTimeout(() => {
        this.$refs.bedRecordModal.open("", this.index);
      }, 0);
    },
    updateBirthDay() {
      window.openSetAuditDateModal(
        text => {
          sheetInfo.relObj[`PageIndex_birthday_${this.index}`] = text;
          this.$message.success(`修改出生日期成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.birthday,
        "修改出生日期"
      );
    },
    updateChildbirth() {
      window.openSetAuditDateModal(
        text => {
          sheetInfo.relObj[`PageIndex_childbirth_${this.index}`] = text;
          this.$message.success(`修改分娩时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.childbirth,
        `修改分娩时间`
      );
    },
    updateLaborTime() {
      window.openSetAuditDateModal(
        text => {
          sheetInfo.relObj[`laborTime`] = text;
          this.$message.success(`修改产程开始时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.laborTime,
        `修改产程开始时间`
      );
    },
    updatePlacentaTime() {
      window.openSetAuditDateModal(
        text => {
          sheetInfo.relObj[`placentaTime`] = text;
          this.$message.success(`修改胎盘娩出开始时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.placentaTime,
        `修改胎盘娩出开始时间`
      );
    },
    updateDeliveryTime() {
      window.openSetAuditDateModal(
        text => {
          sheetInfo.relObj[`deliveryTime`] = text;
          this.$message.success(`修改胎儿娩出时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.deliveryTime,
        `修改胎儿娩出时间`
      );
    },
    updateDiagnosis(key, label, autoText) {
      window.openSetTextModal(
        text => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    },
    async setDiagnosis() {
      if (!this.sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`]) {
        try {
          const res = await queryDianosisList({
            patientId: this.patientInfo.patientId,
            visitId: this.patientInfo.visitId
          });
          const data = res.data.data || [];
          if (data.length) {
            this.$set(
              this.sheetInfo.relObj,
              `PageIndex_diagnosis_${this.index}`,
              data[0].diagnosisDesc
            );
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    }
  },
  filters: {
    toymd(val) {
      if (val) {
        return moment(val).format("YYYY年MM月DD日");
      }
    },
    YMDHM(val) {
      if (val) {
        return moment(val).format("YYYY年MM月DD日HH时mm分");
      }
    }
  },
  components: {
    bedRecordModal,
    crDatePicker,
    customSelectCanRepeat
  },
  async created() {
    if (!this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`]) {
      this.sheetInfo.relObj[
        `PageIndex_bedLabel_${this.index}`
      ] = this.patientInfo.bedLabel;
    }
    // if (!this.sheetInfo.relObj[`PageIndex_realDeptName_${this.index}`]) {
    //   this.sheetInfo.relObj[`PageIndex_realDeptName_${this.index}`] = this.patientInfo.realDeptName
    // }
    // if (!this.sheetInfo.relObj[`PageIndex_deptName_${this.index}`]) {
    //   this.sheetInfo.relObj[`PageIndex_deptName_${this.index}`] = this.patientInfo.deptName
    // }
    if (this.index != 0) {
      this.sheetInfo.relObj[`${this.index}pregnantWeeks`] = this.sheetInfo
        .relObj[`${this.index}pregnantWeeks`]
        ? this.sheetInfo.relObj[`${this.index}pregnantWeeks`]
        : this.sheetInfo.relObj[`${this.index - 1}pregnantWeeks`];
    }
    this.setDiagnosis();
  },
  watch: {
    "patientInfo.patientId"() {
      this.setDiagnosis();
    }
  }
};
</script>

<style lang="scss" scoped>
input.bottom-line {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: none;
  height: 12px;
}
.sheet-page-container .header-con span {
  margin-right: -2px;
  font-size: 16px;
  color: #000;
}
.ml-1000 {
  margin-left: 850px;
}
.info-con_new {
  display: flex;
  justify-content: center;
}
.boxLine {
  height: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 14px;
}
.bottom-line {
  border-bottom: none;
}
.bottom-hava-line {
  border-bottom: 1px solid #000;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  border: 1px solid #000;
  border-radius: 0px;
  outline: none;
  margin: 0 5px;
  cursor: pointer;
}

input[type="checkbox"]:checked {
  font-size: 10;
  position: relative;
}

input[type="checkbox"]:checked:before {
  content: "";
  width: 8px;
  transform: rotate(45deg);
  position: absolute;
  top: 7px;
  left: -2px;
  border-top: 2px solid blue;
}

input[type="checkbox"]:checked:after {
  content: "";
  width: 14px;
  transform: rotate(-50deg) translateY(-50%) translateX(50%);
  position: absolute;
  border-top: 2px solid blue;
  top: 10px;
  left: -2px;
}
input {
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  text-align: center;
}
</style>
