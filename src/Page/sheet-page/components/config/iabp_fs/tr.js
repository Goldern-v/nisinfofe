/** 
佛山市一 - IABP护理记录单
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
  { key: 'recordMonth', event: event_date, click: click_date, value: '', next: ''},
  { key: 'recordHour', event: event_time, value: '', next: ''},
  { key: 'assistRatio', event: keyf1, value: '', next: '', name: 'ASSISTRATIO', textarea: { width: 75 }, change: (e, td) => limitChange(e, td, 12) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'psp', event: keyf1, value: '', next: 'mmHg', name: 'PSP', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'pdp', event: keyf1, value: '', next: 'mmHg', name: 'PDP', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'edp', event: keyf1, value: '', next: 'mmHg', name: 'EDP', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
  { key: 'map', event: keyf1, value: '', next: 'mmHg', name: 'MAP', textarea: { width: 60 }, change: (e, td) => limitChange(e, td, 8) },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "350px",
      background: "transparent",
    },
    textarea: {
      width: 350
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
  { hidden:true, key:'multiSign', value:''},]
