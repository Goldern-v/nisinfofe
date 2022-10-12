
/**
  临沂沂州 - 新生儿护理记录单
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

let bcList = ['A', 'P', 'N']
let dbsList = ['0/黑', '1/黑', '2/黑', '3/黑', '0/绿', '1/绿', '2/绿', '3/绿', '0/黄', '1/黄', '2/黄', '3/黄']
let xbList = ['0', '1', '2', '3', '4']

export default [
  { hidden: true, key: 'recordDate', value: '' },
  { key: "recordMonth", event: event_date, click: click_date, value: '' },
  { key: "recordHour", event: event_time, click: click_time, value: '' },
  { key: 'classTime', event: keyf1, value: '', next: '', name: '班次', textarea: { width: 70 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: bcList } },
  { key: 'faceRed', event: keyf1, value: '', next: '', name: '红润', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'faceWhite', event: keyf1, value: '', next: '', name: '苍白', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'faceYellow', event: keyf1, value: '', next: '', name: '黄染', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reactionNormal', event: keyf1, value: '', next: '', name: '正常', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'reactionLate', event: keyf1, value: '', next: '', name: '迟钝', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'crylound', event: keyf1, value: '', next: '', name: '响亮', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'cryLow', event: keyf1, value: '', next: '', name: '低弱', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'suckStrong', event: keyf1, value: '', next: '', name: '强', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'suckWeak', event: keyf1, value: '', next: '', name: '弱', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'feedBreast', event: keyf1, value: '', next: '', name: '母乳', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'feedMilk', event: keyf1, value: '', next: '', name: '代乳品', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'umbilicalDry', event: keyf1, value: '', next: '', name: '干燥', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'umbilicalOoze', event: keyf1, value: '', next: '', name: '渗出', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'defecate', event: keyf1, value: '', next: '', name: '大便', textarea: { width: 70 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: dbsList } },
  { key: 'urine', event: keyf1, value: '', next: '', name: '小便', textarea: { width: 70 }, change: (e, td) => limitChange(e, td, 8), autoComplete: { data: xbList } },
  {
    key: "description", //病情观察及护理措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "300px",
      background: "transparent"
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
  { hidden:true, key:'multiSign', value:''},
]
