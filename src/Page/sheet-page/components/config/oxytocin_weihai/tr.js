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
let ysList = [],ruList = [];
export default [{
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
      width: 75
    },
    name: "血压"
  },
  {
    key: "fieldOne", //
    value: "",
    event: keyf1,
    name: "浓度",
    next: "%"
  },
  {
    key: "fieldTwo", //
    value: "",
    event: keyf1,
    name: "滴数",
    next: "d/min"
  },
  {
    key: "fieldThree", //氧疗（L/min)-鼻导管
    value: "",
    event: keyf1,
    name: "总量",
    next: "ml"
  },
  {
    key: "fieldFour",
    value: "",
    event: keyf1,
    name: "宫缩",
    next: "持续/间隔"
  },
  {
    key: "fieldFive",
    value: "",
    event: keyf1,
    name: "胎心",
    next: '次/分'
  },
  {
    key: "fieldSix",
    value: "",
    event: keyf1,
    name: "先露",
    next: "下降",
  },
  {
    key: "fieldSeven",
    value: "",
    event: keyf1,
    name: "宫口",
    next: "cm"
  },
  {
    key: "fieldNine",
    value: "",
    event: keyf1,
    name: "胎膜",
  },
  // {
  //   key: "fieldEight",
  //   value: "",
  //   event: keyf1,
  //   name: "其他"
  // },
  {
    key: "description", //特殊情况记录
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "250px", background: "transparent" },
    textarea: { width: 250 },
    event: function (e, td) {if (e.keyCode == 9) { td.value = "    " + td.value; e.preventDefault()} keyf1(e, td) }
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
export function getListData() {
  let list = ["意识",`${info.sheetType}入量名称`];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
    setList(ruList, `${info.sheetType}入量名称`, data);
  });
}

getListData();
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
