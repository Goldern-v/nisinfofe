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
    key: "fieldOne", //体重
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "体重",
    next: "Kg",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldTwo", //喂养方法
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "喂养方法",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldThree", // 早吸吮
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "早吸吮",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldFour", //早接触
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "早接触",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldFive", //吸吮力
    value: "",
    change: (e, td) => limitChange(e, td, 10),
    name: "吸吮力",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldSix", //呕吐
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    name: "呕吐",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldSeven", //皮肤颜色
    value: "",
    event: keyf1,
    name: "皮肤颜色",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldEight", //脐部情况
    value: "",
    event: keyf1,
    name: "脐部情况",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldNine", //大便次数
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "大便次数",
    textarea: {
      width: 60
    },
  },
  {
    key: "fieldTen", //小便次数
    value: "",
    event: keyf1,
    name: "小便次数",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 60,
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
      width: "300px",
      background: "transparent",
    },
    textarea: {
      width: 300
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
