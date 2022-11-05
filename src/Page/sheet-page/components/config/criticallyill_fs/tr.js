
/**
  佛山市一 - 护理记录单(危重患者护理记录单)
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
let Output = ['大便','尿量','引流量','胃管','尿管','伤口引流管','胸腔引流管','腹腔管','鼻胆管','PTBD管','PTGD管','腹腔双套管','盆腔引流管','肛管','引流管']
let Input = ['输入液量','进食量']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time,  click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏/心率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率次/分', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SPO2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压',textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '神志', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'leftPupilDiameter', event: keyf1, value: '', next: 'mm', name: '直径(左)', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'rightPupilDiametern', event: keyf1, value: '', next: 'mm', name: '直径(右)', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'leftPupillaryReflex', event: keyf1, value: '', next: '', name: '对光反射(左)', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'rightPupillaryReflex', event: keyf1, value: '', next: '', name: '对光反射(右)', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量', autoComplete: { data: Input }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: '入量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量', autoComplete: { data: Output }, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6)  },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: '出量ml', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'character', event: keyf1, value: '', next: '', name: '颜色/性状', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'turnBack', event: keyf1, value: '', next: '', name: '翻身/拍背', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:['√/×','√/√','×/√']} },
  { key: 'theXygenRate', event: keyf1, value: '', next: 'L/min', name: '氧流量', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'armValue1', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["中","低","高","禁食","轻","中","重"]}},
  { key: 'armValue2', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["中","低","高","禁食","轻","中","重"]}},
  { key: 'armValue3', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["中","低","高","禁食","轻","中","重"]}},
  { key: 'armValue4', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["中","低","高","禁食","轻","中","重"]}},
  { key: 'armValue5', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["中","低","高","禁食","轻","中","重"]}},
  { key: 'armValue6', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["中","低","高","禁食","轻","中","重"]}},
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "163px", background: "transparent" },
    textarea: { width: 163 },
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
