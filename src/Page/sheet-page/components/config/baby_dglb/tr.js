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
    key: "fieldOne", //箱温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "箱温",
    next: "℃",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldTwo", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "T",
    next: "℃",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldThree", // HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "HR",
    next: "次/min",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldFour", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "R",
    next: "次/min",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldFive", //BP
    value: "",
    change: (e, td) => limitChange(e, td, 8),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "BP",
    next: "nmHg",
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldSix", //SPO2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "SPO2",
    next: '%',
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldSeven", //反应
    value: "",
    event: keyf1,
    name: "反应",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldEight", //哭声
    value: "",
    event: keyf1,
    name: "哭声",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldNine", //吸吮力
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "吸吮力",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldTen", //脐部情况
    value: "",
    event: keyf1,
    name: "脐部情况",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40,
    },
  },
  {
    key: "fieldEleven", //肛周情况
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "肛周情况",
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldTwelve", // 喂养方式
    value: "",
    event: keyf1,
    name: "喂养方式",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "fieldThirteen", //喂养种类
    value: "",
    event: keyf1,
    name: "喂养种类",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "food", // 内容
    value: "",
    event: keyf1,
    name: "内容",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "foodSize", // 量ml
    value: "",
    event: keyf1,
    name: "量",
    next: 'ml',
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "discharge", // 内容
    value: "",
    event: keyf1,
    name: "内容",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "dischargeSize", // 量ml
    value: "",
    event: keyf1,
    name: "量",
    next: 'ml',
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
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
