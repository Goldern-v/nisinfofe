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
    key: "fieldOne", //一般情况
    value: "",
    event: keyf1,
    name: "一般情况",
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
    key: "fieldTwo", //位置
    value: "",
    event: keyf1,
    name: "位置"
  },
  {
    key: "fieldThree", //速率
    value: "",
    event: keyf1,
    name: "速率",
    next:'（次/分）'
  },
  {
    key: "fieldFour", //时限
    value: "",
    event: keyf1,
    name: "时限"
  },
  {
    key: "fieldFive", //间歇
    value: "",
    event: keyf1,
    name: "间歇",
    next:'（次/分）'
  },
  {
    key: "fieldSix", //强度
    value: "",
    event: keyf1,
    name: "强度"
  },
  {
    key: "fieldSeven", //检查方式
    value: "",
    event: keyf1,
    name: "检查方式",
  },
  {
    key: "fieldEight", //宫口
    value: "",
    event: keyf1,
    name: "宫口"
  },
  {
    key: "fieldNine", //先露位置
    value: "",
    event: keyf1,
    name: "先露位置"
  },
  {
    key: "fieldTen", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
  },

  {
    key: "description", //备注
    value: "",
    style: { textAlign: "left", position: "absolute", top: "1px", bottom: "1px", left: "1px", width: "150px", background: "transparent" },
    textarea: { width: 150 },
    event: keyf1,
    name: "备注",
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
