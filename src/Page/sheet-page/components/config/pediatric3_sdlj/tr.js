
/**
  佛山杏坛 - 护理记录单(产科新生儿科)
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

let measureList=[{name:"A预防窒息",value:"A"},{name:"B预防坠床",value:"B"},{name:"C预防烫伤",value:"C"},{name:"D指导外用药",value:"D"},{name:"E指导口药服用",value:"E"},{name:"F喂养护理",value:"F"},{name:"G其他",value:"G"},]
const pzwzList =['H-头面部','N-颈部','U-上肢','L-下肢','O-腋下','T-胸腹','B-背部','S-阴囊','C-肛周','W-全身']
const xzcdList =['S-散在','M-多发','I-密集','P-表面脓点皮肤未破损','B-表面破损','U-表面溃疡']
const clList=['L-左','R-右','T-头颅','F-顶额部']
const otwzList =['A白色','B黄色','C绿色','D咖啡色','E其他']
export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: ''},
  { key: "recordHour", event: event_time, value: ''},
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: '体温', textarea: { width: 27 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reactionExcellent', event: keyf1, value: '', next: '', name: '反应好', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'reactionIrritability', event: keyf1, value: '', next: '', name: '反应激惹', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'abdominalPoor', event: keyf1, value: '', next: '', name: '反应差', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'cryingLoud', event: keyf1, value: '', next: '', name: '哭声大', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'cryingWeak', event: keyf1, value: '', next: '', name: '哭声微弱', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suckinglExcellent', event: keyf1, value: '', next: '', name: '吮吸力好', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suckinglMediocre', event: keyf1, value: '', next: '', name: '吮吸力一般', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'suckinglWeak', event: keyf1, value: '', next: '', name: '吮吸力差', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'breastMilk', event: keyf1, value: '', next: '', name: '母乳', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'milkReplacer', event: keyf1, value: '', next: '', name: '代乳品', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'hybrid', event: keyf1, value: '', next: '', name: '混合', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'dryClean', event: keyf1, value: '', next: '', name: '干洁', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bleeding', event: keyf1, value: '', next: '', name: '渗血', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'drainage', event: keyf1, value: '', next: '', name: '渗液', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 2) },
  { key: 'bloodSugar', event: keyf1, value: '', next: '', name: 'SpO2', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'skinColor', event: keyf1, value: '', next: '', name: '皮肤颜色', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: {data:['红润','发绀','苍白','轻度黄染','中度黄染','重度黄染']}},
  { key: 'customItem1', event: keyf1, value: '', next: '', name: '皮肤弹性', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4),autoComplete: {data:['好','一般','差']} },
  { key: 'customItem2', event: keyf1, value: '', next: '', name: '皮疹位置', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) ,autoComplete: {data:pzwzList}},
  { key: 'extent', event: keyf1, value: '', next: '', name: '性质程度', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4),autoComplete: {data:xzcdList} },
  { key: 'position', event: keyf1, value: '', next: '', name: '产瘤、头部血肿位置', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4),autoComplete: {data:clList} },
  { key: 'vomit', event: keyf1, value: '', next: '', name: '呕吐物性质', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4),autoComplete: {data:otwzList} },
  { key: 'customItem3', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'customItem4', event: keyf1, value: '', next: '', name: '', textarea: { width: 80 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'nursingMeasures', event: keyf1, value: '', next: '', name: '护理措施', autoComplete: { data: measureList },splice:true, textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 3) },
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
