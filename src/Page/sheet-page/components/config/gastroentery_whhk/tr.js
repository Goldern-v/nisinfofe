
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
  { key: 'consciousness', event: keyf1, value: '', next: '', name: '意识', textarea: { width: 30 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'temperature', event: keyf1, value: '', next: '°C', name: '体温',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'pulse', event: keyf1, value: '', next: '次/分', name: '脉搏', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'breath', event: keyf1, value: '', next: '次/分', name: '呼吸', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'bloodPressure', event: keyf1, value: '', next: 'mmHg', name: '血压', textarea: { width: 40 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'spo2', event: keyf1, value: '', next: '%', name: '血氧饱和度',textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'oxygen', event: keyf1, value: '', next: 'L/min', name: '吸氧', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4), autoComplete1:{data:["好","一般","稍差","差"]} },
  { key: 'heartRate', event: keyf1, value: '', next: '次/分', name: '心率', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 4) },
  { key: 'foodSize', event: keyf1, value: 'ml', next: '', name: '入量项目', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6)},
  { key: 'residual', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) },
  { key: 'discharge', event: keyf1, value: '', next: '', name: '出量项目', textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6), autoComplete1:{data:["大便","小便","采血量", "引流液","痰液量"]} },
  { key: 'dischargeSize', event: keyf1, value: '', next: 'ml', name: '量', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6), autoComplete1:{data:["1次"]} },
  { key: 'outputColor', event: keyf1, value: '', next: '', name: '颜色', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) , autoComplete1:{data:["响亮","一般","弱",'稍弱', '声嘶', '插管']}},
  { key: 'outputTraits', event: keyf1, value: '', next: '', name: '状态', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) , autoComplete1:{data:["好","一般","稍慢", '慢', '差']}},
  { key: 'skin', event: keyf1, value: '', next: '', name: '皮肤情况', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6),autoComplete1:{data:["红润","发灰","苍白","花斑" , '轻黄' , '中黄' , '重黄']} },
  { key: 'recumbentPosition', event: keyf1, value: '', next: '', name: '卧位', textarea: { width: 35 }, change: (e, td) => limitChange(e, td, 6) ,autoComplete1:{data:["清醒","睡眠","烦躁", '激惹', '嗜睡', '昏迷']}},

  { key: 'intravenous1', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) ,autoComplet1e:{data:["头部","左手","右手", "左足","右足", "拔针","正常","渗液", "肿胀","渗血"]}},
  { key: 'intravenous2', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete1:{data:["开始","暂停","结束", "未完"]}},
  { key: 'pipeCare1', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplet1e:{data:["开始","暂停","结束", "∨"]} },
  { key: 'pipeCare2', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , autoComplete1:{data:["S","RL","LL", "P"]} },
  { key: 'pipeCare3', event: keyf1, value: '',textarea: { width: 45 }, change: (e, td) => limitChange(e, td, 6) , },
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

export function getListData4() {
  // listItem("入量名称", info.sheetType).then(res => {
  //   ruList.splice(0, ruList.length);
  //   for (let item of res.data.data) {
  //     ruList.push(item.name);
  //   }
  // });
  // listItem("出量名称", info.sheetType).then(res => {
  //   chuList.splice(0, chuList.length);
  //   for (let item of res.data.data) {
  //     chuList.push(item.name);
  //   }
  //   chuList.push("阴道出血");
  // });
  let list = ["意识"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
  });
}

getListData4();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
