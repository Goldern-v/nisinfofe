
/**
  广东同江 - 新生儿护理记录单
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

let ksList = ['响亮', '微弱']
let fyList = ['好', '激惹', '一般', '差']
let xslList = ['好', '一般', '差']
let twList = ['L', 'R', 'S']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: '' },
  { key: "recordHour", event: event_time, click: click_time, value: '' },
  { key: 'boxTemperature', event: keyf1, value: '', next: '℃', name: '箱温', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'babyHr', event: keyf1, value: '', next: '次/分', name: 'HR', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'Spo2', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'bloodSugar', event: keyf1, value: '', next: 'mmol/L', name: '血糖', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'skinBravery', event: keyf1, value: '', next: 'umol/l', name: '经皮胆红素测定', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'cry', event: keyf1, value: '', next: '', name: '哭声', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: ksList } },
  { key: 'reflct', event: keyf1, value: '', next: '', name: '反应', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: fyList } },
  { key: 'skin', event: keyf1, value: '', next: '', name: '肤色', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'muscleTension', event: keyf1, value: '', next: '', name: '吸吮力', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: xslList } },
  { key: 'position', event: keyf1, value: '', next: '', name: '体位', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6), autoComplete: { data: twList } },
  { key: 'bath', event: keyf1, value: '', next: '', name: '沐浴', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'food', event: keyf1, value: '', next: '', name: '名称', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'foodSize', event: keyf1, value: '', next: '', name: 'ml', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'inMethod', event: keyf1, value: '', next: '', name: '方式', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '名称', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'outColor', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'dischargeSize', event: keyf1, value: '', next: '', name: 'ml/g', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'fieldOne', event: keyf1, value: '', next: '', name: '自定义值1', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldTwo', event: keyf1, value: '', next: '', name: '自定义值2', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldThree', event: keyf1, value: '', next: '', name: '自定义值3', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldFour', event: keyf1, value: '', next: '', name: '自定义值4', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'fieldFive', event: keyf1, value: '', next: '', name: '自定义值5', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "100px", background: "transparent" },
    textarea: { width: 140 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },
  { key: "audit", value: "" },
  { hidden:true, key:'id', value:''},
  { hidden:true, key:'signerName', value:''},
  { hidden:true, key:'signerName2', value:''},
  { hidden:true, key:'status', value:''},
  { hidden:true, key:'recordSource', value:''},
  { hidden:true, key:'recordYear', value:''},
  { hidden:true, key:'dataHash', value:''},
  { hidden:true, key:'recordDate', value:''},
  { hidden:true, key:'monthHour', value:''},
  { hidden:false, key:'signerNo', value:''},
  { hidden:true, key:'signerNo2', value:''},
  { hidden:true, key:'auditorNo', value:''},
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''},
]
