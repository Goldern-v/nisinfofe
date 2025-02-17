
/** 
  佛山杏坛 - 护理记录单（眼耳鼻咽喉科）
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
let tyList = ['通畅','堵塞','夹管','干洁','渗液','渗血','肿胀','无','轻度','中度','重度','间有','减轻','加重','持续','止血海棉','膨胀海棉','明胶海棉','油纱','下降','模糊','较前清晰','清晰','黑影飘动','变形','视野缩小','复视']
let ysList = ['清醒','嗜睡','模糊','昏睡','昏迷','谵妄','麻醉未醒']
let tkfsList = ['灵敏','迟钝','消失']
let bgList = ['赵贤龙','吴莉','陈俊泳','钟冠忠','冯丽君','王超','黄世勇']


export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 3) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2/血糖', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', autoComplete: { data: ysList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeLeft', event: keyf1, value: '', next: '', name: '瞳孔大小左', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilSizeRight', event: keyf1, value: '', next: '', name: '瞳孔大小右', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilReflectionLeft', event: keyf1, value: '', next: '', name: '瞳孔反射左', autoComplete: { data: tkfsList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pupilReflectionRight', event: keyf1, value: '', next: '', name: '瞳孔反射右', autoComplete: { data: tkfsList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容,', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue2', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue3', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue4', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue5', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue6', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue7', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue8', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue9', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue10', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue11', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue12', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'armValue13', event: keyf1, value: '', next: '', name: '', autoComplete: { data: tyList }, textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reportDoctor', event: keyf1, value: '', next: '', name: '报告医生', autoComplete: { data: bgList }, textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'continueObserve', event: keyf1, value: '', next: '', name: '遵医嘱继续观察', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
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
  { hidden:false, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}
  
]
