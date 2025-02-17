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

const twList = [];
const ysxzList = [];
const xlgdList = ["-5","-4","-3","-2","-1","0","+1","+2","+3","+4","+5"];

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
    click: click_time,
  },
  {
    key: "bloodPressure", //血压
    value: "",
    textarea: {
      width: 55
    },
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    change: (e, td) => limitChange(e, td, 6),
    name: "血压",
    next: "mmHg"
  },
  {
    key: "fieldOne", //胎位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    name: "胎位",
    splice: "/",
    autoComplete: {
      data: twList
    },
    textarea: {
      width: 68
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldThree", //胎心心率
    value: "",
    event: keyf1,
    name: "胎心心率",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldFive", //宫缩间歇
    value: "",
    event: keyf1,
    name: "宫缩间歇",
    next: "min",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldSix", //宫缩持续
    value: "",
    event: keyf1,
    name: "宫缩持续",
    next: "s",
    autoComplete: {
      data: ["无", "敏感", "不规则"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldSeven", // 宫缩缩力
    value: "",
    event: keyf1,
    name: "宫缩缩力",
    autoComplete: {
      data: ["强", "中", "中强", "中弱", "弱", "敏感", "不规则", "无"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldEight", // 宫颈开张
    value: "",
    event: keyf1,
    name: "宫颈开张",
    next: "cm",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldEleven", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    autoComplete: {
      data: xlgdList
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldThirteen", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
    autoComplete: {
      data: ["已破", "未破"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldFourteen", //羊水性状
    value: "",
    event: keyf1,
    name: "羊水性状",
    autoComplete: {
      data: ysxzList
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldTwenty", //量(ml)
    value: "",
    event: keyf1,
    name: "量(ml)",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldFifteen", //检查方式
    value: "",
    event: keyf1,
    name: "检查方式",
    autoComplete: {
      data: ["外", "阴", "肛"]
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 55
    },
  },
  {
    key: "fieldSixteen", //催产素浓度<br/>（U/500ml）
    value: "",
    name: "催产素浓度",
    next: "U/500ml",
    event: keyf1,
    textarea: {
      width: 65
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "fieldSeventeen", //滴数<br/>（滴/分）
    value: "",
    name: "滴数",
    next: "滴/分",
    event: keyf1,
    textarea: {
      width: 55
    },
    change: (e, td) => limitChange(e, td, 6),
  },
  {
    key: "heightFundus", //催产素浓度<br/>（U/500ml）
    value: "",
    name: "宫底高度",
    next: "",
    event: keyf1,
    textarea: {
      width: 45
    },
  },
  {
    key: "cervicalThickness", //催产素浓度<br/>（U/500ml）
    value: "",
    name: "宫颈厚度",
    next: "",
    event: keyf1,
    textarea: {
      width: 45
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
      width: "150px",
      background: "transparent"
    },
    textarea: {
      width: 150
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
  // {
  //   key: "sign2",
  //   value: ""
  // },
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
    hidden: false,
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
  // });
  let list = [
    "珠海中西医:侯产记录单:胎位",
    "珠海中西医:侯产记录单:羊水性状",
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(twList, list[0], data);
    setList(ysxzList, list[1], data);
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
