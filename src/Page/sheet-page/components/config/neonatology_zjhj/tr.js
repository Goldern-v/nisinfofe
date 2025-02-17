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

const foodList = ["液体","糖水","母乳","配方奶","温开水","口服药","其他"]
const dischargeList = ["尿","大便","痰","胃内容物","其他出量"]
const fyList = ["好","一般","差", "无", "其他"]
const ysxzList = ["淡黄色", "酱油色", "血尿", "胎粪", "黄色软便", "绿色软便", "黄色稀便", "绿色稀便", "白陶土样软便", "其他"]
const ksList = ["无","低弱","响亮","其他"]
const xslList = ["好","一般","差", "其他"]
const wyfsList = ["奶瓶喂养","母乳喂养","口饲","泵奶","其他"]
const wyzlList = ["母乳","配方奶","其他"]
const xyList = ["头罩","暖箱内","面罩","鼻导管","其他"]
const llList = ["1","2","3","4","5","6","7","8","9","10","其他"]
const pfysList = ["红润","发绀","苍白","黄染","花斑纹","其他"]
const qbqkList = ["脱痂","未脱痂","干洁","渗液","渗血","脐瘘","脐疝","其他"]
const xseList = ["√"]
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: 'HR', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: 'BP', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: 'SpO₂', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'food', event: keyf1, value: '', next: '', name: '入量内容', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 12), autoComplete: { data: foodList}, },
  { key: 'foodSize', event: keyf1, value: '', next: 'ml', name: '入量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量内容', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 12), autoComplete: { data: dischargeList} },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'colorTraits', event: keyf1, value: '', next: '', name: '颜色性状', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: ysxzList} },
  { key: 'react', event: keyf1, value: '', next: '', name: '反应', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: fyList} },
  { key: 'cry', event: keyf1, value: '', next: '', name: '哭声', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: ksList} },
  { key: 'suckingForce', event: keyf1, value: '', next: '', name: '吸吮力', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: xslList} },
  { key: 'feedingWay', event: keyf1, value: '', next: '', name: '喂养方式', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: wyfsList} },
  { key: 'feedingType', event: keyf1, value: '', next: '', name: '喂养种类', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: wyzlList} },
  { key: 'oxygenMethod', event: keyf1, value: '', next: '', name: '吸氧方式', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: xyList} },
  { key: 'oxygenFlow', event: keyf1, value: '', next: '', name: '吸氧流量', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 4), autoComplete: { data: llList} },
  { key: 'skinColor', event: keyf1, value: '', next: '', name: '皮肤颜色', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: pfysList} },
  { key: 'umbilicus', event: keyf1, value: '', next: '', name: '脐部情况', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: qbqkList} },
  { key: 'boxTemperature', event: keyf1, value: '', next: '', name: '箱温', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'weight', event: keyf1, value: '', next: '', name: '体重', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: '血糖', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'babyCare', event: keyf1, value: '', next: '', name: '新生儿护理', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8),autoComplete: { data: xseList}},
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '', textarea: { width: 38 }, change: (e, td) => limitChange(e, td, 8) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "180px", background: "transparent" },
    textarea: { width: 180 },
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
