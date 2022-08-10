/** 
东莞谢岗 - 护理记录单(内科)

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
    { key: "recordDate", value: "", hidden:true },
    { key: "recordMonth", event: event_date, click: click_date, value: ''},
    { key: "recordHour", event: event_time, click: click_time, value: ''},

    { key: 'temperature', event: keyf1,value: '',name: '体温',next: '℃',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: 'pulse', event: keyf1,value: '',name: '脉搏/心率',next: '次/分',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},

    { key: 'breath', event: keyf1,value: '',name: '呼吸',next: '次/分',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},

    { key: 'bloodPressure', event: keyf1,value: '',name: '血压',next: 'mmHg',textarea:{ width:50},change: (e, td) => limitChange(e, td, 6)},

    { key: 'spo2', event: keyf1,value: '',name: 'SOP2',next: '%',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: 'consciousness', event: keyf1,value: '',name: '意识',next: '',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: 'pupilMm', event: keyf1,value: '',name: '大小',next: 'mm',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: 'pupilLight', event: keyf1,value: '',name: '对光反射',next: '',textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: "food", event: keyf1, value: '', next: '', name:'入量名称', textarea: { width:60 }, change: (e, td) => limitChange(e, td, 10)},
    { key: "foodSize", event: keyf1, value: '', next: 'ml/g', name:'入量量', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
    { key: "discharge", event: keyf1, value: '', next: '', name:'出量名称', textarea: { width:60 }, change: (e, td) => limitChange(e, td, 10)},
    { key: "dischargeSize", event: keyf1, value: '', next: 'ml/g', name:'出量量', textarea: { width:45 }, change: (e, td) => limitChange(e, td, 6)},
    { key: 'healthEdu', event: keyf1,value: '',name: '健康宣教',next: '',textarea:{ width:70},change: (e, td) => limitChange(e, td,10),
    autoComplete: { 
      data:
       [
        {name:'1.入院宣教',value:'1'},
        {name:'2.辅助检查目的及注意事项',value:'2'},
        {name:'3.吸氧目的及注意事项',value:'3'},
        {name:'4.心电监护目的及注意事项',value:'4'},
        {name:'5.术前宣教',value:'5'},
        {name:'6.术后宣教',value:'6'},
        {name:'7.饮食指导',value:'7'},
        {name:'8.防跌倒',value:'8'},
        {name:'9.出院宣教',value:'9'},
        {name:'10.用药指导',value:'10'},
        {name:'11.输血注意事项',value:'11'},
        {name:'12.特殊感染隔离注意事项',value:'12'},
       ] 
    } ,
    splice:true,
    },
    { key: "custom1", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: "custom2", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: "custom3", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: "custom4", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    { key: "custom5", event: keyf1, value: '', next: '', name:'', textarea:{ width:35},change: (e, td) => limitChange(e, td, 4)},
    {
      key: "description", //特殊情况记录
      value: "",
      style: {
        textAlign: "left",
        position: "absolute",
        top: "1px",
        bottom: "1px",
        left: "1px",
        width: "215px",
        background: "transparent",
      },
      textarea: {
        width: 215
      },
      event: function (e, td) {
        console.log(e.keyCode);
        if (e.keyCode == 9) {
          td.value = "    " + td.value;
          e.preventDefault();
        }
        keyf1(e, td);
      }
    },
    { key: "sign", value: "" },
    // { key: "sign2", value: "" },
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
    { hidden:true, key:'multiSign', value:''},]
  