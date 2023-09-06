
/**
  临邑 - 新生儿监护室监护记录
*/

/**
 * @description: 开发注意事项:
    1、textarea: { width:32 }, change: (e, td) => limitChange(e, td, 6) 的意思是宽度设置32，字数限制6个。
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
  { key: 'nameMethod', event: keyf1, value: '', next: '', name: '注射药名及用法',textarea: { width: 180 }, change: (e, td) => limitChange(e, td, 30) },
  { key: 'input0', event: keyf1, value: '', next: 'ml', name: '注射药物量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'input1', event: keyf1, value: '', next: '', name: '实入', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'cumulative1', event: keyf1, value: '', next: '', name: '累计', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'input2', event: keyf1, value: '', next: '', name: '实入', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'cumulative2', event: keyf1, value: '', next: '', name: '累计', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'input3', event: keyf1, value: '', next: '', name: '实入', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'cumulative3', event: keyf1, value: '', next: '', name: '累计', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'input4', event: keyf1, value: '', next: '', name: '实入', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'cumulative4', event: keyf1, value: '', next: '', name: '累计', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'intravenousInput', event: keyf1, value: '', next: '', name: '静脉液体累计入量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'input5', event: keyf1, value: '', next: '', name: '奶入量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'species', event: keyf1, value: '', next: '', name: '奶种类', autoComplete:{data:['①','②','③','④']}, textarea: { width: 32 } },
  { key: 'administration', event: keyf1, value: '', next: '', name: '口服药', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'inputMethod', event: keyf1, value: '', next: '', name: '喂入方式',textarea: { width: 32 },  autoComplete:{data:['①','②','③']} },
  { key: 'tractInput', event: keyf1, value: '', next: '', name: '胃肠道累计入量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'sumInput', event: keyf1, value: '', next: '', name: '总入量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'urine', event: keyf1, value: '', next: '', name: '尿液', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'bowels', event: keyf1, value: '', next: '', name: '大便', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'vomiting', event: keyf1, value: '', next: '', name: '呕吐', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'drainage', event: keyf1, value: '', next: '', name: '引流', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'sputum', event: keyf1, value: '', next: '', name: '痰液', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'sumOutput', event: keyf1, value: '', next: '', name: '总出量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'box', event: keyf1, value: '', next: '', name: '箱内或辐射台温度', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'temperature', event: keyf1, value: '', next: '℃', name: 'T', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'pulse', event: keyf1, value: '', next: '℃', name: '脉搏/心率', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: 'R', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'spo2', event: keyf1, value: '', next: '℃', name: '血氧饱和度', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'traffic', event: keyf1, value: '', next: '℃', name: '流量', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'spoMethod', event: keyf1, value: '', next: '', name: '方式',textarea: { width: 40 },autoComplete:{data:['①鼻导管','②面罩','③机械通气']} },
  { key: 'model', event: keyf1, value: '', next: '℃', name: '呼吸机模式', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'respiratorBreath', event: keyf1, value: '', next: '℃', name: '呼吸机呼吸频率', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breathVT', event: keyf1, value: '', next: '℃', name: '呼吸机VT', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breathVi', event: keyf1, value: '', next: '℃', name: '呼吸机Ti', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breathMV', event: keyf1, value: '', next: '℃', name: '呼吸机MV', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breathPEEP', event: keyf1, value: '', next: '℃', name: '呼吸机PEEP', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breathPIP', event: keyf1, value: '', next: '℃', name: '呼吸机PIP', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  { key: 'breathSPO', event: keyf1, value: '', next: '℃', name: '呼吸机氧浓度', textarea: { width: 32 }, change: (e, td) => limitChange(e, td, 4),  },
  // ['①左侧卧位','②右侧卧位','③平卧位','④俯卧位']
  { key: 'overRecords', event: keyf1, value: '', next: '', name: '翻身记录',textarea: { width: 27 },  autoComplete:{data:[{name:'①左侧卧位',value:'①'},{name:'②右侧卧位',value:'②'},{name:'③平卧位',value:'③'},{name:'④俯卧位',value:'④'}]} },
  // ['①' , '②', '③', '④',  '⑤' , '⑥', '⑦' ,'⑧']
  { key: 'nursingMeasures', event: keyf1, value: '', next: '℃', name: '护理措施', textarea: { width: 55 },  autoComplete:{data:[{name:'①脐部护理',value:'①'},{name:'②口腔护理',value:'②'},{name:'③臀部护理',value:'③'},{name:'④眼部护理',value:'④'},{name:'⑤擦浴式洗澡',value:'⑤'},{name:'⑥沐浴',value:'⑥'},{name:'⑦吸痰',value:'⑦'},{name:'⑧雾化吸入',value:'⑧'}]}, splice: true,  },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "135", background: "transparent" },
    // textarea: { width: 135 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  // { hidden:true, key: "audit", value: "" },//审核签名
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
  { hidden:true, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}

]
