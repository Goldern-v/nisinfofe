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
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    },
    name: "血压"
  },
  {
    key: "cardiac", //胎心
    value: "",
    event: keyf1,
    name: "胎心",
  },
  {
    key: "position", //胎位
    value: "",
    event: keyf1,
    name: "胎位"
  },
  {
    key: "contractions", //宫缩
    value: "",
    event: keyf1,
    name: "宫缩"
  },
  {
    key: "presentation", //先露
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    },
    name: "先露"
  },
  {
    key: "seat", //先露位置
    value: "",
    event: keyf1,
    name: "先露位置"
  },
  {
    key: "hardness", //宫颈硬度
    value: "",
    event: keyf1,
    name: "宫颈硬度",
  },
  {
    key: "dilation", //宫颈扩张
    value: "",
    event: keyf1,
    name: "宫颈扩张"
  },
  {
    key: "membranes", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
  },
  {
    key: "anal", //肛查
    value: "",
    event: keyf1,
    name: "肛查"
  },
  {
    key: "vagina", //阴查
    value: "",
    event: keyf1,
    name: "阴查"
  },
  {
    key: "description", //附注
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
    textarea: { width: 150 },
    event: keyf1,
    name: "附注",
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
