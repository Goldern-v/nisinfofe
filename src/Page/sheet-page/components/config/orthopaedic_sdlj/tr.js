
/**
  顺德龙江 - 护理记录单（骨科）
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
  click_time
} from "../keyEvent/date";
const twList = [{ name: 'A=抬高', value: 'A' }, { name: 'B=抬高制动', value: 'B' }, { name: 'C=外展中立位', value: 'C' }, { name: 'D=外展位', value: 'D' }]
const ysList = [{ name: 'A=红润', value: 'A' }, { name: 'B=黑色', value: 'B' }, { name: 'C=瘀紫色', value: 'C' }, { name: 'D=暗红', value: 'D' }, { name: 'E=苍白', value: 'E' }, { name: 'F=花斑', value: 'F' }, { name: 'G=粉红', value: 'G' }]
const pwList = [{ name: 'A=温暖', value: 'A' }, { name: 'B=低于健侧', value: 'B' }, { name: 'C=稍低于健侧', value: 'C' }, { name: 'D=冰凉', value: 'D' }, { name: 'E=高于健侧；', value: 'E' }]
const zzList = [{ name: 'A=无', value: 'A' }, { name: 'B=I度', value: 'B' }, { name: 'C=II度', value: 'C' }, { name: 'D=III度', value: 'D' }]
const gjList = [{ name: 'A=正常', value: 'A' }, { name: 'B=稍麻', value: 'B' }, { name: 'C=麻痹', value: 'C' }, { name: 'D=消失', value: 'D' }]
const hdList = [{ name: 'A=正常', value: 'A' }, { name: 'B=轻度受限', value: 'B' }, { name: 'C=中度受限', value: 'C' }, { name: 'D=重度受限', value: 'D' }, { name: 'E=障碍', value: 'E' }]
const fyList = [{ name: 'A=偏快＜1秒', value: 'A' }, { name: 'B=正常1~2秒', value: 'B' }, { name: 'C=偏慢＞2秒', value: 'C' }, { name: 'D=消失', value: 'D' }]
const bdList = [{ name: 'A=正常', value: 'A' }, { name: 'B=减弱', value: 'B' }, { name: 'C=无', value: 'C' }]
const flList = [{ name: 'A=干洁', value: 'A' }, { name: 'B=少量渗血/渗液', value: 'B' }, { name: 'C=中量渗血/渗液', value: 'C' }]
const sgList = [{ name: 'A=过紧', value: 'A' }, { name: 'B=过松', value: 'B' }, { name: 'C=合适', value: 'C' }]
const qyList = [{ name: 'A=过紧', value: 'A' }, { name: 'B=过松', value: 'B' }, { name: 'C=合适', value: 'C' }]
const gndlList = [{ name: 'A=踝泵运动', value: 'A' }, { name: 'B=股四头肌等长收缩运动', value: 'B' }, { name: 'C=直腿抬高运动', value: 'C' }, { name: 'D=抬臂运动', value: 'D' }, { name: 'E=膝关节屈曲运动', value: 'E' }, { name: 'F=坐位训练', value: 'F' }, { name: 'G=站立训练', value: 'G' }, { name: 'H=扶拐行走训练', value: 'H' }, { name: 'I=扶助；行架行走训练', value: 'I' }, { name: 'J=未固定关节运动', value: 'J' },]
const pfList = [{ name: 'A=完整', value: 'A' }, { name: 'B=发红', value: 'B' }, { name: 'C=水泡', value: 'C' }, { name: 'D=破损，渗液', value: 'D' }]
const csList = [{ name: 'A=防足下垂', value: 'A' }, { name: 'B=患肢保暖', value: 'B' }, { name: 'C=受压处皮肤垫软垫', value: 'C' }, { name: 'D=翻身、拍背，F=指导深呼吸及有效咳嗽等预防并发症', value: 'D' }, { name: 'E=针眼护理', value: 'E' }, { name: 'F=防压疮', value: 'F' }]
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenSatur', event: keyf1, value: '', next: '', name: '血氧饱和度%', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputContent', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 55 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'outputAmount', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputUrine', event: keyf1, value: '', next: '', name: '出量尿管', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputAmount2', event: keyf1, value: '', next: 'ml', name: '尿管出量', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputColor', event: keyf1, value: '', next: '', name: '尿颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  // { key: 'outputDrainage', event: keyf1, value: '', next: '', name: '伤口引流管', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputDrainage', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'outputAmount3', event: keyf1, value: '', next: 'ml', name: '引流管出量', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'outputColor2', event: keyf1, value: '', next: '', name: '伤口引流管颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'limbLength', event: keyf1, value: '', next: '', name: '患肢/健肢长度', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  // { key: 'healthyBody', event: keyf1, value: '', next: '', name: '健肢长度', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'position', event: keyf1, value: '', next: '', name: '体位', splice: ' ', autoComplete: { data: twList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'color', event: keyf1, value: '', next: '', name: '颜色',splice: ' ', autoComplete: { data: ysList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'temperature2', event: keyf1, value: '', next: '', name: '皮温', splice: ' ', autoComplete: { data: pwList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'swelling', event: keyf1, value: '', next: '', name: '肿胀', splice: ' ', autoComplete: { data: zzList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'feeling', event: keyf1, value: '', next: '', name: '感觉', splice: ' ', autoComplete: { data: gjList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'activity', event: keyf1, value: '', next: '', name: '活动', splice: ' ', autoComplete: { data: hdList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'capillary', event: keyf1, value: '', next: '', name: '毛细血管反应', splice: ' ', autoComplete: { data: fyList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'artery', event: keyf1, value: '', next: '', name: '动脉搏动', splice: ' ', autoComplete: { data: bdList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'dressing', event: keyf1, value: '', next: '', name: '伤口敷料', autoComplete: { data: flList },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'gypsum', event: keyf1, value: '', next: '', name: '石膏', autoComplete: { data: sgList },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'traction', event: keyf1, value: '', next: '', name: '牵引', autoComplete: { data: qyList },  textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'functional', event: keyf1, value: '', next: '', name: '功能锻炼', splice: ' ', autoComplete: { data: gndlList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'integrity', event: keyf1, value: '', next: '', name: '皮肤完整性', splice: ' ', autoComplete: { data: pfList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'measures', event: keyf1, value: '', next: '', name: '护理措施', splice: ' ', autoComplete: { data: csList },  textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'expand', event: keyf1, value: '', next: '', name: '', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'expand2', event: keyf1, value: '', next: '', name: '', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'expand3', event: keyf1, value: '', next: '', name: '', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
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
