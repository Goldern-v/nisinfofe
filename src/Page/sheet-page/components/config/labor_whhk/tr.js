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
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
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
    key: "fieldOne", // 先露部位置
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "先露部位置",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldTwo", // 先露部高低
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "先露部高低",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldThree", // 宫口大小
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "宫口大小",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldFour", // 宫口硬度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "宫口硬度",
    next: "",
    textarea: {
      width: 50
    },
  },
  // {
  //   key: "fieldFive", // 胎心
  //   value: "",
  //   event: keyf1,
  //   change: (e, td) => limitChange(e, td, 8),
  //   name: "胎心",
  //   next: "次/分",
  //   textarea: {
  //     width: 50
  //   },
  // },
  {
    key: "fieldSix", // 阵缩
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "阵缩",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldSeven", // 胎位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "胎位",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "bloodPressure", // 血压
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "血压",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldEight", // 胎膜
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "胎膜",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "temperature", // T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "T",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "pulse", // P
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "P",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "breath", // R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "R",
    next: "",
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldFive", // 胎心
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "BP",
    next: "mmhg",
    textarea: {
      width: 50
    },
  },
  {
    key: "spo2", // SpO₂
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "SpO₂",
    next: "%",
    textarea: {
      width: 50
    },
  },
  {
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "200px",
      background: "transparent",
    },
    textarea: {
      width: 200
    },
    event: function (e, td) {
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
    key: "signerName2",
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
    key: "signerNo2",
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
    value: true,
  },
];

// export function getListData4() {
//   let list = [
//     "花都:通用护理记录单:入量名称",
//     "花都:通用护理记录单:出量名称",
//   ];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(入量名称, "花都:通用护理记录单:入量名称", data);
//     setList(出量名称, "花都:通用护理记录单:出量名称", data);
//   });
// }

// getListData4();
// /**
//  *
//  * @param {*} list 原数组
//  * @param {*} key 对应的key
//  * @param {*} data 数据源
//  */
// function setList(list, key, data) {
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
