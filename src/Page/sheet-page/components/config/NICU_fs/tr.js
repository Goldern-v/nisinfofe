
/**
  佛山市一 - 新生儿NICU护理记录单
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
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygenBlood', event: keyf1, value: '', next: '%', name: '血氧饱和度',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'customValue1', event: keyf1, value: '',textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 6) , },

  // { key: 'boxTemp', event: keyf1, value: '', next: '', name: '箱温℃/箱温℃（2选1）', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'meanPressure', event: keyf1, value: '', next: 'mmHg', name: '平均压', textarea: { width: 25 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'sugarBlood', event: keyf1, value: '', next: 'mmol/L', name: '血糖', textarea: { width: 20 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'reaction', event: keyf1, value: '', next: '', name: '反应', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4), autoComplete:{data:["一般","稍差","差"]} },
  { key: 'cry', event: keyf1, value: '', next: '', name: '哭声', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["响亮","一般","弱",'稍弱', '声嘶', '插管']}},
  { key: 'suck', event: keyf1, value: '', next: '', name: '吸吮力', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["好","一般","稍慢", '慢', '差']}},
  { key: 'skinColor', event: keyf1, value: '', next: '', name: '皮肤颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6),autoComplete:{data:["红润","发灰","苍白","花斑" , '黄染']} },
  { key: 'state', event: keyf1, value: '', next: '', name: '意识状态', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["清醒","睡眠","烦躁", '激惹', '昏睡', '昏迷']}},
  // { key: 'tripleRestri', event: keyf1, value: '', next: '', name: '三凹征/胸廓隆起//前囟(2选1)', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["∨/∨","平坦","凹陷", '饱满', '紧张']}},
  { key: 'customValue2', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:['√/√','√/无','无/√','无/无',"平坦","凹陷", '饱满', '紧张']}},
  { key: 'crts', event: keyf1, value: '', next: '', name: 'CRT(S)', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["1","2","3", "4","5"]}},
  // { key: 'expand', event: keyf1, value: '', next: '', name: '心电监护/肌张力（2选1）', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["齐","不齐","减弱", "增高","稍低","正常"]}},
  { key: 'customValue3', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["齐","不齐","减弱", "增高","稍低","正常"]}},

  { key: 'formula', event: keyf1, value: '', next: 'ml', name: '配方奶', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'food', event: keyf1, value: '', next: '', name: '名称', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6),  autoComplete:{data:["输液量","饲奶量","口服药"]}  },
  { key: 'foodSize', event: keyf1, value: 'ml', next: '', name: '入量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'residual', event: keyf1, value: '', next: 'ml', name: '胃管抽出残余奶', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) },

  { key: 'discharge', event: keyf1, value: '', next: '', name: '名称', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["大便","小便","采血量", "引流液","痰液量"]} },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '出量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'customValue4', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete:{data:["头部","左手","右手", "左足","右足", "拔针","正常"]}},
  { key: 'customValue5', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["开始","暂停","结束", "未完"]}},
  { key: 'customValue6', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["开始","暂停","结束", "∨"]} },
  { key: 'customValue7', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete:{data:["S","RL","LL", "P"]} },
  { key: 'customValue8', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
  { key: 'customValue9', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },

  // { key: 'needle', event: keyf1, value: '', next: '', name: '留置针部位', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["头部","左手","右手", "左足","右足", "拔针","正常"]}  },
  // { key: 'infusion', event: keyf1, value: '', next: '', name: '输液', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["开始","暂停","结束", "未完"]}  },
  // { key: 'Phototherapy', event: keyf1, value: '', next: '', name: '光疗', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["开始","暂停","结束", "∨"]}  },
  // { key: 'physical', event: keyf1, value: '', next: '', name: '体位(选项)', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6), autoComplete:{data:["S","RL","LL", "P"]}  },

  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "230px", background: "transparent" },
    textarea: { width: 1150 },
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
