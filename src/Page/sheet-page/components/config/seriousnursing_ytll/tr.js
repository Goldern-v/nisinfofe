import { multiDictInfo } from "../../../api/index";
import info from "../sheetInfo";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let ysList =['清醒','嗜睡','昏睡','浅昏迷','中昏迷','深昏迷','意识模糊','谵妄']
let yyzkList =['良好','一般','差']
let jtzcList =['良好','一般','差']
let zlycxList =['好','差']
let xlztList =['好','差','无法评估']


export default [
  { hidden: true,
    key: 'recordDate',
    value: ""
  },
  {
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    click: click_time
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    name: "意识"
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "pulse", //心率脉搏
    value: "",
    event: keyf1,
    name: "心率/脉搏",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    next: "mmHg",
    textarea: {
      width: 48
    },
    name: "血压"
  },
  {
    key: "spo2", //血氧饱和度
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },
  {
    key: "nasalCannula", //氧疗（L/min)-鼻导管
    value: "",
    event: keyf1,
    name: "氧疗（L/min)-鼻导管"
  },
  {
    key: "faceMask", //氧疗（L/min)-面罩
    value: "",
    event: keyf1,
    name: "氧疗（L/min)-面罩"
  },
  {
    key: "customize", //氧疗（L/min)-自定义
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
    name: "氧疗（L/min)-自定义"
  },
  {
    key: "food", //入量-名称
    value: "",
    event: keyf1,
    textarea: {
      width: 60
    },
    name: "入量名称"
  },
  {
    key: "foodway", //入量-途径
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    name: "入量途径"
  },
  {
    key: "foodSize", //入量-ml
    value: "",
    event: keyf1,
    name: "入量",
    next: "ml",
    statBottomLine: true
  },
  {
    key: "discharge", //出量-名称
    value: "",
    event: keyf1,
    textarea: {
      width: 60
    },
    name: "出量名称"
  },
  {
    key: "dischargeSize", //出量-ml
    value: "",
    event: keyf1,
    name: "出量",
    next: "ml",
    statBottomLine: true
  },
  {
    key: "colorProperties", //出量-颜色性状
    value: "",
    event: keyf1,
    name: "出量-颜色性状"
  },
  {
    key: "pain", //病情评估-疼痛
    value: "",
    event: keyf1,
    name: "病情评估-疼痛"
  },
  {
    key: "nutritional", //病情评估-营养状况
    value: "",
    event: keyf1,
    name: "病情评估-营养状况",
    autoComplete: {
      data: yyzkList
    },
  },
  {
    key: "familySupport", //病情评估-家庭支持
    value: "",
    event: keyf1,
    name: "病情评估-家庭支持",
    autoComplete: {
      data: jtzcList
    },
  },
  {
    key: "compliance", //病情评估-治疗依从性
    value: "",
    event: keyf1,
    name: "病情评估-治疗依从性",
    autoComplete: {
      data: zlycxList
    },
  },
  {
    key: "mentalState", //病情评估-心理状态
    value: "",
    event: keyf1,
    name: "病情评估-心理状态",
    autoComplete: {
      data: xlztList
    },
  },
  {
    key: "educationalNeeds", //病情评估-教育需求
    value: "",
    event: keyf1,
    name: "病情评估-教育需求"
  },
  {
    key: "description", //病情观察及护理措施
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "360px",
      background: "transparent",
      fontSize:"12px"
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
  {
    key: "sign",
    value: ""
  },
  // {
  //   key: "audit",
  //   value: ""
  // },
  {
    hidden: true,
    key: "id",
    value: ""
  },
  {
    hidden: true,
    key: "signerName",
    value: ""
  },
  {
    hidden: true,
    key: "status",
    value: ""
  },
  {
    hidden: true,
    key: "recordSource",
    value: ""
  },
  {
    hidden: true,
    key: "recordYear",
    value: ""
  },
  {
    hidden: true,
    key: "dataHash",
    value: ""
  },
  {
    hidden: true,
    key: "recordDate",
    value: ""
  },
  {
    hidden: true,
    key: "monthHour",
    value: ""
  },
  {
    hidden: false,
    key: "signerNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorNo",
    value: ""
  },
  {
    hidden: true,
    key: "auditorName",
    value: ""
  },
  {
    hidden: true,
    key: "empNo",
    value: ""
  },
  {
    hidden: true,
    key: "multiSign",
    value: false
  }
];
// export function getListData() {
//   let list = ["意识",`${info.sheetType}入量名称`];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(ysList, "意识", data);
//     setList(ruList, `${info.sheetType}入量名称`, data);
//   });
// }

// getListData();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
// function setList(list, key, data) {
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
