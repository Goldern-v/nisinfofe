<template>
  <div class="header-con">
    <div class="his-name">{{ HOSPITAL_NAME_SPACE }}</div>
    <div class="title">{{ patientInfo.recordName }}</div>
    <!-- {{ sheetInfo.relObj }} -->
     <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType=='postpartum2_tj' || sheetInfo.sheetType=='prenataldelivery2_tj' || sheetInfo.sheetType=='pediatric3_tj'">
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span @click="updateTetxInfo('age', '年龄', patientInfo.age)" v-if="sheetInfo.sheetType=='pediatric3_tj'">
        年龄：
        <div class="bottom-line" style="min-width: 30px">{{patientInfo.age}}</div>
      </span>
      <span v-else>
        年龄：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.age }}
        </div>
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span>
        性别：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.sex }}
        </div>
      </span>
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          <!-- {{ patientInfo.bedLabel }} -->
          {{ newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`] }}
        </div>
      </span>
      <!-- <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType=='prenataldelivery2_tj'">
        过敏史：
        <input
          style="width: 150px;font-size:13px;"
          class="bottom-line"
          :data-value="sheetInfo.relObj['gms']"
          v-model="sheetInfo.relObj['gms']"
        />
      </span>
      <span v-if="sheetInfo.sheetType=='pediatric3_tj'">
        出生日期：
        <div @click="updateBirthDay" class="bottom-line" style="min-width: 150px;height: 12px;">
          {{ birthday | YMDHM }}
        </div>
      </span>
      <span v-if="sheetInfo.sheetType=='postpartum2_tj'">
        分娩时间：
        <div @click="updateChildbirth('childbirth', '分娩日期', patientInfo.childbirth)" class="bottom-line" style="min-width: 150px;height: 12px;">
          {{ childbirth | YMDHM }}
        </div>
      </span>
      <div class="boxLine"  v-if="sheetInfo.sheetType=='postpartum2_tj' || sheetInfo.sheetType=='pediatric3_tj' ">
        分娩方式：
        <input
          type="checkbox"
          value="sc"
          :ischecked="sheetInfo.relObj['sc']"
          v-model="checkedsc"
        />顺产
        <input
          type="checkbox"
          value="pgc"
          :ischecked="sheetInfo.relObj['pgc']"
          v-model="checkedpgc"
        />剖宫产
        <input
          type="checkbox"
          value="fyc"
          :ischecked="sheetInfo.relObj['fyc']"
          v-model="checkedfyc"
        />负压产
        <input
          type="checkbox"
          value="qc"
          :ischecked="sheetInfo.relObj['qc']"
          v-model="checkedqc"
        />钳产
        <input
          type="checkbox"
          value="bzc"
          :ischecked="sheetInfo.relObj['bzc']"
          v-model="checkedbzc"
        />臂助产
      </div>
      </div>
      <div class="info-con" flex="main:justify" v-else>
      <span>
        姓名：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.patientName }}
        </div>
      </span>
      <span
        v-if="[
          'magnesiumsulphate_tj',
        ].indexOf(sheetInfo.sheetType) === -1"
      >
        性别：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.sex }}
        </div>
      </span>
      <span>
        年龄：
        <div class="bottom-line" style="min-width: 30px">
          {{ patientInfo.age }}
        </div>
      </span>
        <!--孕/产： + 孕周：-->
        <span
        v-if="[
          'magnesiumsulphate_tj',
        ].indexOf(sheetInfo.sheetType) !== -1"
      >
        孕/产：
        <input
          style="width: 20px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj['pregnantOrBirth']"
          v-model="sheetInfo.relObj['pregnantOrBirth']"
        />
        孕周：
        <input
          style="width: 20px;font-size:13px;text-align: center;"
          class="bottom-line"
          :data-value="sheetInfo.relObj['pregnantWeeks']"
          v-model="sheetInfo.relObj['pregnantWeeks']"
        />
      </span>
      <span>
        科室：
        <div class="bottom-line" style="min-width: 100px">
          {{ patientInfo.deptName }}
        </div>
      </span>
      <span>
        床号：
        <div :class="['bottom-line','has-background']" :style="{minWidth:'55px'}"  @dblclick.stop="openBedRecordModal">
          <!-- {{ patientInfo.bedLabel }} -->
          {{ newPatientInfo[`bedLabel_${index}_${sheetInfo.selectBlock.id}`] }}
        </div>
      </span>
      <!-- <span>
        床号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.bedLabel }}
        </div>
      </span> -->
      <span>
        住院号：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.inpNo }}
        </div>
      </span>
      <span v-if="!admissionDateList.includes(sheetInfo.sheetType)">
        入院日期：
        <div class="bottom-line" style="min-width: 50px">
          {{ patientInfo.admissionDate | YMDHM}}
        </div>
      </span>
    </div>
     <div class="info-con" flex="main:justify" v-if="sheetInfo.sheetType=='prenataldelivery2_tj'">
      <span>
        孕产史：孕
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

    </div>
    <div class="info-con" flex="main:justify" v-if="!diagnosisList.includes(sheetInfo.sheetType)">
      <span @click="updateDiagnosis('diagnosis', '诊断', patientInfo.diagnosis)">
        诊断：
        <div
          class="bottom-line"
          style="
            width: 1000px;
            height: 11px;
            text-overflow: ellipsis;
            white-space: nowrap;
          "
        >
          {{ diagnosis }}
        </div>
      </span>
    </div>

    <div class="info-con" v-if="sheetInfo.sheetType === 'cardiology_tj'">
      <span>介入手术或造影名称：</span>
      <input
        v-model="sheetInfo.relObj.operation"
        style="border-bottom: 1px solid #000; width: 300px"
        :data-value="sheetInfo.relObj.operation"
      />&nbsp;
      <span>药物试验结果：</span>
      <input
        v-model="sheetInfo.relObj.Drugoutcome"
        :data-value="sheetInfo.relObj.Drugoutcome"
        style="border-bottom: 1px solid #000; width: 300px"
      />&nbsp;
    </div>
    <div class="info-con" v-if="sheetInfo.sheetType === 'cardiology_tj'">
      <span>穿刺血管:</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['donmai']"
        v-model="checkeddonmai"
      />
      <span>动脉</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['jingmai']"
        v-model="checkedjingmai"
      />
      <span>静脉</span> &nbsp;
      <span>部位/名称：</span>
      <input
        v-model="sheetInfo.relObj.toponym"
        :data-value="sheetInfo.relObj.toponym"
        style="border-bottom: 1px solid #000; width: 220px"
      />&nbsp;
      <span>体内留置管:</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['wu']"
        v-model="checkedwu"
      />
      <span>无</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['you']"
        v-model="checkedyou"
      />
      <span>有</span>&nbsp;
      <span>名称：</span>
      <input
        v-model="sheetInfo.relObj.nameA"
        :data-value="sheetInfo.relObj.nameA"
        style="border-bottom: 1px solid #000; width: 220px"
      />
    </div>
    <div class="info-con" v-if="sheetInfo.sheetType === 'cardiac_therapy_tj'">
      <span>入室情况：</span>
    </div>

    <div class="info-con" v-if="sheetInfo.sheetType === 'cardiac_therapy_tj'">
      <span>意识  :</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qingchu']"
        v-model="checkedqingchu"
      />
      <span>清楚</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['danmo']"
        v-model="checkeddanmo"
      />
      <span>淡漠</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['hunsui']"
        v-model="checkedhunsui"
      />
      <span>昏睡</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['hunmi']"
        v-model="checkedhunmi"
      />
      <span>昏迷</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['yixian']"
        v-model="checkedyixian"
      />
      <span>谵妄</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkedqita"
      />
      <span>其他</span>
      <input
        v-model="sheetInfo.relObj.toponym"
        :data-value="sheetInfo.relObj.toponym"
        style="border-bottom: 1px solid #000; width: 220px"
      />&nbsp;
    </div>

    <div class="info-con" v-if="sheetInfo.sheetType === 'cardiac_therapy_tj'">
      <span>主诉不适症状 :</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['wu']"
        v-model="checkedwu"
      />
      <span>无</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['you']"
        v-model="checkedyou"
      />
      <span>有</span>(
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['xiongtong']"
        v-model="checkedxiontong"
      />
      <span>胸痛 </span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['xingji']"
        v-model="checkedxingji"
      />
      <span>心悸</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['exin']"
        v-model="checkedexin"
      />
      <span>恶心</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['tuoyun']"
        v-model="checketouyun"
      />
      <span>头痛头晕 </span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>其他</span>
      <input
        v-model="sheetInfo.relObj.toponym"
        :data-value="sheetInfo.relObj.toponym"
        style="border-bottom: 1px solid #000; width: 220px"
      />)
    </div>
     <div class="info-con" v-if="sheetInfo.sheetType === 'cardiac_therapy_tj'">
      <span>肢体活动 :</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['wu']"
        v-model="checkedwu"
      />
      <span>正常</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['you']"
        v-model="checkedyou"
      />
      <span>左侧肢体活动障碍 </span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['xiongtong']"
        v-model="checkedxiontong"
      />
      <span>右侧肢体活动障碍</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['xingji']"
        v-model="checkedxingji"
      />
      <span>不能活动</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>其他</span>
      <input
        v-model="sheetInfo.relObj.toponym"
        :data-value="sheetInfo.relObj.toponym"
        style="border-bottom: 1px solid #000; width: 220px"
      />
    </div>
        <div class="info-con" v-if="sheetInfo.sheetType === 'cardiac_therapy_tj'">
      <span>实际操作项目:</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['wu']"
        v-model="checkedwu"
      />
      <span>冠状动脉造影 </span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['you']"
        v-model="checkedyou"
      />
      <span>PCI（平诊） </span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['xiongtong']"
        v-model="checkedxiontong"
      />
      <span>PCI（急诊）</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['xingji']"
        v-model="checkedxingji"
      />
      <span>临时起搏器术</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>永久起搏器术</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>IABP</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>起搏器更换</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>左室造影</span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>右室造影 </span>
      <input
        type="checkbox"
        :ischecked="sheetInfo.relObj['qita']"
        v-model="checkeqita"
      />
      <span>其它 </span>
      <input
        v-model="sheetInfo.relObj.toponym"
        :data-value="sheetInfo.relObj.toponym"
        style="border-bottom: 1px solid #000; width: 220px"
      />
    </div>
    <div class="info-con" v-if="sheetInfo.sheetType === 'blood_tj'">
      <span>观察部位：</span>
      <input
        v-model="sheetInfo.relObj.stationA"
        style="border-bottom: 1px solid #000; width: 100px"
      />&nbsp;
      <input
        v-model="sheetInfo.relObj.stationB"
        style="border-bottom: 1px solid #000; width: 100px"
      />&nbsp;
      <input
        v-model="sheetInfo.relObj.stationC"
        style="border-bottom: 1px solid #000; width: 100px"
      />&nbsp;
      <input
        v-model="sheetInfo.relObj.stationD"
        style="border-bottom: 1px solid #000; width: 100px"
      />&nbsp;
      <input
        v-model="sheetInfo.relObj.stationE"
        style="border-bottom: 1px solid #000; width: 100px"
      />
    </div>
    <bedRecordModal ref="bedRecordModal"></bedRecordModal>
  </div>
</template>

<script>
import moment from "moment";
import { updateSheetHeadInfo,getDeliveryInfo } from "../../../../api/index";
import sheetInfo from "../../../config/sheetInfo";
import { listItem } from "@/api/common.js";
import sheetData from "../../../../sheet.js";
import bus from "vue-happy-bus";
import bedRecordModal from "../../../modal/bedRecord-modal";
import { saveBody }  from  "@/api/sheet.js"
export default {
  props: {
    patientInfo: Object,
    index: Number,
    bedAndDeptChange: Object,
  },
  data() {
    return {
      bus: bus(this),
      sheetInfo,
      //不需要入院日期的表单
      admissionDateList: [
        'blood_tj'
      ],
      //不需要诊断的表单
      diagnosisList: [
        'postpartum2_tj',
        'prenataldelivery2_tj',
        'pediatric3_tj',
        'baby_tj',
        'blood_tj'
      ],
    };
  },
  mounted() {},
  computed: {
    ...{
      'checkedsc':{
        get(){
          return this.sheetInfo.relObj[`sc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`sc`] = nVal ? "true" : "false"
        }
      },
      'checkedpgc':{
        get(){
          return this.sheetInfo.relObj[`pgc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`pgc`] = nVal ? "true" : "false"
        }
      },
      'checkedfyc':{
        get(){
          return this.sheetInfo.relObj[`fyc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`fyc`] = nVal ? "true" : "false"
        }
      },
      'checkedqc':{
        get(){
          return this.sheetInfo.relObj[`qc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`qc`] = nVal ? "true" : "false"
        }
      },
      'checkedbzc':{
        get(){
          return this.sheetInfo.relObj[`bzc`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`bzc`] = nVal ? "true" : "false"
        },
      },
      newPatientInfo() {
        /*  每页独立床号功能 */
        let beforeBed = this.patientInfo.bedLabel
        let nowBed = this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index}`]
        if (this.index != 0 && this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index - 1}`]) {
          // 除了第一页，其他页数。先拿bedLabel，如果上一页也有床位那就拿就拿上一页的
          beforeBed = this.sheetInfo.relObj[`PageIndex_bedLabel_${this.index - 1}`]
        }
        return {
          ...this.patientInfo,
          [`bedLabel_${this.index}_${this.sheetInfo.selectBlock.id}`]: nowBed ? nowBed : beforeBed,
        }
      }
    },
    ...{
      'checkeddonmai':{
        get(){
          return this.sheetInfo.relObj[`donmai`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`donmai`] = nVal ? "true" : "false"
        },
      },
      'checkedjingmai':{
        get(){
          return this.sheetInfo.relObj[`jingmai`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`jingmai`] = nVal ? "true" : "false"
        },
      },
      'checkedyou':{
        get(){
          return this.sheetInfo.relObj[`you`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`you`] = nVal ? "true" : "false"
        },
      },
      'checkedwu':{
        get(){
          return this.sheetInfo.relObj[`wu`] === 'true'
        },
        set(nVal){
          this.sheetInfo.relObj[`wu`] = nVal ? "true" : "false"
        },
      }
    },
    diagnosis() {
      /** 最接近的index */
      let realIndex = 0;
      let keys = Object.keys(sheetInfo.relObj || {});
      for (let i = 0; i < keys.length; i++) {
        let [base, keyIndex] = keys[i].split("PageIndex_diagnosis_");
        if (keyIndex !== undefined) {
          if (this.index >= keyIndex) {
            if (this.index - keyIndex <= this.index - realIndex) {
              realIndex = keyIndex;
            }
          }
        }
      }
      return (
        (sheetInfo.relObj || {})[`PageIndex_diagnosis_${realIndex}`] ||
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
      return (
        (sheetInfo.relObj || {})[`PageIndex_birthday_${realIndex}`]
      );
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
        (this.patientInfo.laborTime == undefined ? '/' : this.patientInfo.laborTime )
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
        (this.patientInfo.deliveryTime == undefined ?'/':this.patientInfo.deliveryTime)
      );
    },
  },
  methods: {
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
    openBedRecordModal(){
      if (this.readOnly) {
        return this.$message.warning("你无权操作此护记，仅供查阅");
      }
      // 把当前页护记的页码存入,用于每一页床号的自定义
      this.$refs.bedRecordModal.open('',this.index);
    },
    updateBirthDay() {
      window.openSetAuditDateModal(
        (text) => {
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
        (text) => {
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
        (text) => {
          sheetInfo.relObj[`laborTime`] = text;
          this.$message.success(`修改产程开始时间成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.laborTime,
        `修改产程开始时间`
      );
    },
    updateDeliveryTime() {
      window.openSetAuditDateModal(
        (text) => {
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
        (text) => {
          sheetInfo.relObj[`PageIndex_diagnosis_${this.index}`] = text;
          this.$message.success(`修改诊断成功`);
          this.bus.$emit("saveSheetPage", false);
        },
        this.diagnosis,
        `修改诊断`
      );
    },
  },
  filters: {
    toymd(val) {
      if(val){
        return moment(val).format("YYYY年MM月DD日");
      }
    },
    YMDHM(val) {
      if(val){
        return moment(val).format("YYYY年MM月DD日HH时mm分");
      }
    }

  },
  components: {
    bedRecordModal,
  },
  created(){
    if(this.index!=0){
      this.sheetInfo.relObj[`${this.index}pregnantWeeks`] = this.sheetInfo.relObj[`${this.index}pregnantWeeks`]?this.sheetInfo.relObj[`${this.index}pregnantWeeks`]: this.sheetInfo.relObj[`${this.index-1}pregnantWeeks`]
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
.ml-1000 {
  margin-left: 850px;
}
.info-con_new{
  display: flex;
  justify-content: center;
}
.boxLine {
  height: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size:14px;
}
input[type='checkbox'] {
  -webkit-appearance: none;
  vertical-align: text-top;
  width: 14px;
  height: 14px;
  border: 1px solid #000;
  border-radius: 0px;
  outline: none;
  margin: 0 5px;
  cursor: pointer;
}

input[type='checkbox']:checked {
  font-size: 10;
  position: relative;
}

input[type='checkbox']:checked:before {
  content: '';
  width: 8px;
  transform: rotate(45deg);
  position: absolute;
  top: 7px;
  left: -2px;
  border-top: 2px solid blue;
}

input[type='checkbox']:checked:after {
  content: '';
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
