
/**
  佛山市一 - 护理记录单(下肢内固定物拆除)
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

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time,  click: click_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'weight', event: keyf1, value: '', next: 'kg', name: '体重', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reaction', event: keyf1, value: '', next: '', name: '反应', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4), autoComplete:{data:["好","一般","稍差","差","无"]} },
  { key: 'cry', event: keyf1, value: '', next: '', name: '哭声',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4) , autoComplete:{data:["响亮","一般","弱","声嘶","插管","无"]} },
  { key: 'suckingForce', event: keyf1, value: '', next: '', name: '吸吮力', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4), autoComplete:{data:["好","一般","差","慢"]}  },
  { key: 'skinColor', event: keyf1, value: '', next: '', name: '皮肤颜色', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["红润","黄染","苍白"]}  },
  { key: 'umbilical', event: keyf1, value: '', next: '', name: '脐带情况', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4), autoComplete:{data:["干洁","渗血","渗液","血肿"]}  },
  { key: 'umbilicalCare', event: keyf1, value: '', next: '', name: '脐部护理', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["√"]} },
  { key: 'babyTouch', event: keyf1, value: '', next: '', name: '婴儿抚触', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 4), autoComplete:{data:["√"]} },
  { key: 'breastMilk', event: keyf1, value: '', next: '', name: '母乳', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["√"]} },
  { key: 'artificial', event: keyf1, value: '', next: 'ml', name: '人工', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'bathe', event: keyf1, value: '', next: '', name: '沐浴', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["√"]}},
  { key: 'title1', event: keyf1, value: '',textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'title2', event: keyf1, value: '',textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'title3', event: keyf1, value: '',textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'title4', event: keyf1, value: '',textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 6)},
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "220px", background: "transparent" },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  { hidden:true, key: "audit", value: "" },//审核签名
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
