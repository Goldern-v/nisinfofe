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

const check = ['√']
const dbxzList = ['胎便', '混合便', '母乳便', '人工喂养便']
export default [
  // {
  //   key: "recordDate", //年份
  //   value: "",
  //   hidden:true
  // },
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
    key: "temperature", // 体温℃
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "体温",
    next: "℃",
    textarea: {
      width: 35
    },
  },
  {
    key: "spo2", // 氧饱和度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "氧饱和度",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "pulse", // 心率
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "心率",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "feeding", // 母乳
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "母乳",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "feedingTwo", // 混合
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "混合",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "feedingThree", // 人工
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "人工",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "skin", // 正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "正常",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "skinTwo", // 黄疸
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "黄疸",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "skinThree", // 湿疹
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "湿疹",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "skinFour", // 红臀
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "红臀",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "bellyButton", // 正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "正常",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "bellyButtonTwo", // 发炎
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "发炎",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "bellyButtonThree", // 出血
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "出血",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "eye", // 正常
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "正常",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "eyeTwo", // 分泌物多
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: { data: check },
    name: "分泌物多",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "eyeThree", // 红肿
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: { data: check },
    name: "红肿",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "stools", // 大便次数
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "大便次数",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "stoolsType", // 大便性状
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: { data: dbxzList },
    name: "大便性状",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "urinate", // 小便
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "小便",
    next: "",
    textarea: {
      width: 35
    },
  },
  {
    key: "forehead", // 额
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "额",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "chest", // 胸
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "胸",
    next: "",
    textarea: {
      width: 40
    },
  },
  {
    key: "abdominal", // 腹
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "腹",
    next: "",
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
