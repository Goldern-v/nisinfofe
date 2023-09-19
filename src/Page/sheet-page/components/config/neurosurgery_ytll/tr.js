/**
  烟台玲珑 - 出入量记录单
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置45，字数限制6个。
    2、（1）autoComplete: { data: [] } 为下拉框显示序号，根据需要添加。（2）autoComplete: { data: [{name:'',value:''}] } 为下拉框显示序号+内容，根据需要添加。
    3、splice: '' 为下拉框多选功能，搭配autoComplete使用, (''内容可自定义,splice: '/'为用“/”分隔)。
    4、name、next 为双击弹窗的内容，name为标题，next是单位。
    5、自定义项目，在th里要写 canSet: true , key: '' , key值为th对应tr的key值。
    6、{ key: "sign", value: "" } { hidden: false, key: 'signerNo', value: ''} 单签
        { key: "sign2", value: "" } { hidden: false, key: 'signerNo2', value: ''} 双签
        { key: "audit", value: "" } { hidden: false, key: 'auditorNo', value: ''} 审核签名
        当开启多个签名功能时，记得将hidden变为false，如果是true, 就会被隐藏,根据需要使用。
    7、多个签名时还需要在sheet-print-page.vue和excel.vue里配置打印样式。
*/

import { multiDictInfo } from "../../../api/index";
import { keyf1, limitChange } from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

export default [
  { hidden: true, key: "recordDate", value: "" },
  { key: "recordMonth", event: event_date, click: click_date, value: "" },
  { key: "recordHour", event: event_time, click: click_time, value: "" },
  {
    key: "food",
    event: keyf1,
    value: "",
    next: "",
    name: "入量名称",
    textarea: { width: 100 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "way",
    event: keyf1,
    value: "",
    next: "",
    name: "途径",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["静滴", "皮下", "静推", "肌注", "口入", "鼻饲", "泵入"]
    }
  },
  {
    key: "foodSize",
    event: keyf1,
    value: "",
    next: "ml",
    name: "实入量",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "discharge",
    event: keyf1,
    value: "",
    next: "",
    name: "出量名称",
    textarea: { width: 60 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["尿量", "痰量", "呕吐量", "引流量", "大便", "胃肠减压"]
    }
  },
  {
    key: "dischargeSize",
    event: keyf1,
    value: "",
    next: "ml",
    name: "出量",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "colorTraits",
    event: keyf1,
    value: "",
    next: "",
    name: "颜色性状",
    textarea: { width: 60 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "temperature",
    event: keyf1,
    value: "",
    next: "℃",
    name: "体温",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "pulse",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "心率/脉搏",
    textarea: { width: 48 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "breath",
    event: keyf1,
    value: "",
    next: "次/分",
    name: "呼吸",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "bloodPressure",
    event: keyf1,
    value: "",
    next: "mmHg",
    name: "血压",
    textarea: { width: 48 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "spo2",
    event: keyf1,
    value: "",
    next: "%",
    name: "血氧饱和度",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "heartRhythm",
    event: keyf1,
    value: "",
    next: "",
    name: "示波心律",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["窦性", "房颤"]
    }
  },
  {
    key: "nasalCannula",
    event: keyf1,
    value: "",
    next: "",
    name: "鼻导管",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "faceMask",
    event: keyf1,
    value: "",
    next: "",
    name: "面罩",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "customize",
    event: keyf1,
    value: "",
    next: "",
    name: "",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "consciousness",
    event: keyf1,
    value: "",
    next: "",
    name: "意识",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["清醒", "嗜睡", "意识模糊", "昏睡", "昏迷", "镇静", "麻醉未醒"]
    }
  },
  {
    key: "painScore",
    event: keyf1,
    value: "",
    next: "",
    name: "疼痛评分",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "skin",
    event: keyf1,
    value: "",
    next: "",
    name: "皮肤",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["完好", "异常"]
    }
  },
  {
    key: "sedationScore",
    event: keyf1,
    value: "",
    next: "",
    name: "镇静评分",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["+4", "+3", "+2", "+1", "0", "-1", "-2", "-3", "-4", "-5"]
    }
  },
  {
    key: "infusionType",
    event: keyf1,
    value: "",
    next: "",
    name: "类别",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["C", "IV", "PICC"]
    }
  },
  {
    key: "infusionPass",
    event: keyf1,
    value: "",
    next: "",
    name: "畅否",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["P", "C", "I", "HL"]
    }
  },
  {
    key: "pupilSizeLeft",
    event: keyf1,
    value: "",
    next: "",
    name: "左",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "散大", "无法观察"]
    }
  },
  {
    key: "pupilReflexLeft",
    event: keyf1,
    value: "",
    next: "",
    name: "左量",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["﹢", "±", "－"]
    }
  },
  {
    key: "pupilSizeRight",
    event: keyf1,
    value: "",
    next: "",
    name: "右",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["0.5", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "散大", "无法观察"]
    }
  },
  {
    key: "pupilReflexRight",
    event: keyf1,
    value: "",
    next: "",
    name: "右量",
    textarea: { width: 25 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["﹢", "±", "－"]
    }
  },
  {
    key: "gcs",
    event: keyf1,
    value: "",
    next: "",
    name: "GCS",
    textarea: { width: 40 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["EMV"]
    }
  },
  {
    key: "multiDrug",
    event: keyf1,
    value: "",
    next: "",
    name: "多重耐药",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["有", "无"]
    }
  },
  {
    key: "constraint",
    event: keyf1,
    value: "",
    next: "",
    name: "约束",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["是", "否"]
    }
  },
  {
    key: "recumbentPosition",
    event: keyf1,
    value: "",
    next: "",
    name: "卧位",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["HS", "HL", "HR", "P", "T", "S", "L", "R"]
    }
  },
  {
    key: "measures",
    event: keyf1,
    value: "",
    next: "",
    name: "护理措施",
    textarea: { width: 70 },
    change: (e, td) => limitChange(e, td, 12)
  },
  {
    key: "mentalState",
    event: keyf1,
    value: "",
    next: "",
    name: "心理状态",
    textarea: { width: 30 },
    change: (e, td) => limitChange(e, td, 12),
    autoComplete: {
      data: ["好", "差", "无法评估"]
    }
  },
  {
    key: "description", //病情观察及护理措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "150px",
      background: "transparent"
    },
    event: function(e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  { key: "sign", value: "" },
  // { key: "sign2", value: "" },
  // { key: "audit", value: "" },
  { hidden: true, key: "id", value: "" },
  { hidden: true, key: "signerName", value: "" },
  { hidden: true, key: "signerName2", value: "" },
  { hidden: true, key: "status", value: "" },
  { hidden: true, key: "recordSource", value: "" },
  { hidden: true, key: "recordYear", value: "" },
  { hidden: true, key: "dataHash", value: "" },
  { hidden: true, key: "recordDate", value: "" },
  { hidden: true, key: "monthHour", value: "" },
  { hidden: true, key: "signerNo", value: "" },
  { hidden: true, key: "signerNo2", value: "" },
  { hidden: true, key: "auditorNo", value: "" },
  { hidden: true, key: "auditorName", value: "" },
  { hidden: true, key: "empNo", value: "" },
  { hidden: true, key: "multiSign", value: "" }
];
