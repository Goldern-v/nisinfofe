
/** 
  北海人医 -急诊ICU病情观察表
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置45，字数限制6个。
    2、autoComplete: { data: [] } 为下拉框内容，根据需要添加。
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
    { key: "recordHour", event: event_time,  value: ''},
    { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8)},
    { key: 'pupil', event: keyf1, value: '', next: '', name: '瞳孔', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8)},
    { key: 'gcse', event: keyf1, value: '', next: '', name: 'E', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6)},
    { key: 'gcsv', event: keyf1, value: '', next: '', name: 'V', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6)},
    { key: 'gcsm', event: keyf1, value: '', next: '', name: 'M', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6)},
    { key: 'outputName2', event: keyf1, value: '', next: '', name: '入量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8)},
    { key: 'outputAmount', event: keyf1, value: '', next: 'ml', name: '入量量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'outputName', event: keyf1, value: '', next: '', name: '出量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'outputQuantity', event: keyf1, value: '', next: 'ml', name: '出量量', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'outputColor', event: keyf1, value: '', next: '', name: '出量颜色', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8) },
    { key: 'outputCharacter', event: keyf1, value: '', next: '', name: '出量性状', textarea: { width: 50 }, change: (e, td) => limitChange(e, td, 8)},
    { key: 'skinCondition', event: keyf1, value: '', next: '', name: '皮肤情况', textarea: { width: 100 }, change: (e, td) => limitChange(e, td, 16),autoComplete: { data: ['完整','苍白','黄疸','潮红','紫绀','干燥','出血点','压力性损伤','破损','水肿','皮疹','疤痕','淤青'] },splice:true},
    { key: 'pipeline', event: keyf1, value: '', next: '', name: '管路情况', textarea: { width: 150 }, change: (e, td) => limitChange(e, td, 24),autoComplete: { data: ['无','导尿管','胃管','深静脉导管','浅静脉留置针','胸腔引流管','气切','气管插管','气切套管','脑室引流管','硬膜下引流管','硬膜外引流管'] },splice:true},
    { key: 'ventilation', event: keyf1, value: '', next: '', name: '通气模式', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 12),autoComplete: { data: ['鼻导管吸氧(L/min)','面罩吸氧(L/min)','机械辅助呼吸'] }},
    {
      key: "description", //特殊情况记录
      value: "",
      style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "180px", background: "transparent" },
      textarea: { width: 180 },
      event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
    },
    { key: "sign", value: "" },//单签
    // { key: "sign2", value: "" },//双签
    // { key: "audit", value: "" },//审核签名
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
  