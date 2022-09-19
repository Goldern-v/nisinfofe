
/**
  佛山市一 - 硫酸镁注射静脉滴注观察记录
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

let gsList = ['30/3', '无', '偶有', '不规则']
let xfsList = ['+', '-', '减弱', '消失', '未测']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: '' },
  { key: "recordHour", event: event_time, click: click_time, value: '' },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率次/分', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'contractions', event: keyf1, value: '', next: '（s/min）', name: '宫缩', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: gsList } },
  { key: 'urineOutput', event: keyf1, value: '', next: '（ml）', name: '尿量', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'kneeReflex', event: keyf1, value: '', next: '', name: '膝反射', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: xfsList } },
  { key: 'dripSpeed', event: keyf1, value: '', next: '（ml/h）', name: '滴速', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 8) },
  {
    key: "description", //特殊情况
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "400px", background: "transparent" },
    textarea: { width: 400 },
    event: function (e, td) { if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault() } keyf1(e, td) }
  },
  { key: "sign", value: "" },
  // { key: "sign2", value: "" },
  // { key: "audit", value: "" },
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
