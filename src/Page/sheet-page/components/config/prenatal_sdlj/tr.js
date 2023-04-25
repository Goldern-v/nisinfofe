
/**
  顺德龙江 - 产前待产记录单
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

import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time,
  click_date_time,
  event_date_time
} from "../keyEvent/date";
const xj = ['已', '未', '部分']
const qd = ['无', '偶有', '不规则', '弱', '中', '强']
const tm = ['已', '未']
const ys = ['清', 'I°混浊', 'II°混浊', 'III°混浊']
const armValue6 =[{name:'A-分娩球',value:"A"},{name:'B-自由体位待产',value:'B'},{name:"C-分娩操",value:"C"},{name:"D-豆袋热敷",value:"D"},{name:"E-导乐分娩",value:"E"},{name:"F-分娩镇痛仪",value:'F'},{name:"G-其他",value:"G"}]
const armValue7 =[{name:"H-空虚",value:"H"},{name:"I-轻度充盈",value:"I"},{name:"J-中度充盈",value:'J'},{name:"K-重度充盈",value:"K"}]
const 入量名称 = ['输液', '口服', '输血', '肌注', '静注', '鼻饲', '静脉泵入', '灌肠', '饮水'];
const 出量颜色 = ['黄色', '鲜红色', '暗红色', '墨绿色', '浓茶色','淡红色','茶褐色'];
const 出量名称 = ['呕吐物', '伤口引流', '腋窝引流', '胸壁引流', '胸腔引流', '腹腔引流', '心包积液', '胸腔引流液', '大便', '尿', '腹水', '脑积液', '痰液', '血液', '胃管', '尿管', '盆腔引流管', '肝下引流管','温氏孔引流管', '脾窝引流管', '伤口皮下引流管', 'T管', '隔下引流管', '人工肛', '胃造痰', '空肠造痰', '肛管引流管','杜氏窝引流管', '左肾造痰', '右肾造痰', '膀胱造痰', '左肾周引流', '右肾周引流', '耻骨后引流', '左输尿管导管引流', '右输尿管导管引流', '左肾窝引流', '右肾窝引流', '会阴部引流', '左输尿管造口支架管', '右输尿管造口支架管', '阴道出血', '术中出血', '止血球囊引流', '腹透液', '分娩时出血'];
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: '',textarea: { width: 40 },},
  { key: "recordHour", event: event_time, value: '',textarea: { width: 40 },},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 5) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 5) },
  { key: 'oxygen', event: keyf1, value: '', next: 'L/min', name: '吸氧', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 5) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'position', event: keyf1, value: '', next: '', name: '胎位', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'cardiac', event: keyf1, value: '', next: '次/min', name: '胎心', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'cohesion', event: keyf1, value: '', next: '', name: '衔接', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: xj }, },
  { key: 'intensity', event: keyf1, value: '', next: '', name: '强度', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: qd }, },
  { key: 'continuous', event: keyf1, value: '', next: 's', name: '持续', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'intermittent', event: keyf1, value: '', next: 'min', name: '间歇', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'dilation', event: keyf1, value: '', next: 'cm', name: '宫颈扩张', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'presentation', event: keyf1, value: '', next: 'cm', name: '先露高低', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'membranes', event: keyf1, value: '', next: '', name: '胎膜', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: tm }, },
  { key: 'amniotic', event: keyf1, value: '', next: '', name: '羊水性状', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: ys } },
  {
    key: "food", // 入量内容
    value: "",
    event: keyf1,
    name: "入量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62
    },
    autoComplete: {
      data: 入量名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "foodSize", // 入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "discharge", //出量内容
    value: "",
    event: keyf1,
    name: "出量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62
    },
    autoComplete: {
      data: 出量名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "fieldFour", //出量颜色
    value: "",
    event: keyf1,
    name: "出量颜色",
    autoComplete: {
      data: 出量颜色
    },
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    style: {
      textAlign: "left",
    }
  },
  // { key: 'bleeding', event: keyf1, value: '', next: 'ml', name: '阴道流血', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'quickening', event: keyf1, value: '', next: '次/h', name: '胎动次数', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'armValue5', event: event_date_time, value: '', next: '',click: click_date_time, name: "", textarea: { width: 40 } },
  { key: 'armValue6', event: keyf1, value: '', next: '', name: '非药物阵痛方法', splice: true, textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) , autoComplete: { data: armValue6 },},
  { key: 'armValue7', event: keyf1, value: '', next: '', name: '膀胱充盈度', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) , autoComplete: { data: armValue7 },},
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  // { key: 'armValue2', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  // { key: 'armValue3', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  // { key: 'armValue4', event: keyf1, value: '', next: '', name: '', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
    textarea: { width: 150 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  { key: "audit", value: "" },//审核签名
  { hidden:true, key:'id', value:''},
  { hidden:true, key:'signerName', value:''},
  { hidden:true, key:'signerName2', value:''},
  { hidden:true, key:'status', value:''},
  { hidden:true, key:'recordSource', value:''},
  { hidden:true, key:'recordYear', value:''},
  { hidden:true, key:'dataHash', value:''},
  { hidden:true, key:'recordDate', value:''},
  { hidden:true, key:'monthHour', value:''},
  { hidden:false, key:'signerNo', value:''},//单签
  { hidden:true, key:'signerNo2', value:''},//双签
  { hidden:true, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}

]
