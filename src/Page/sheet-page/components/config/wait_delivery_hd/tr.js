import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";

let tmList = [];
let twList = [];
let gscxjxList = [];
let xlgdList = [];
let gjgList = [];
let ysxzList = [];
let gjkzList = [];
let gsqdList = [];

export default [
  {
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time
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
    name: "血压",
    next: "mmHg"
  },
  {
    key: "fieldOne", //胎位
    value: "",
    event: keyf1,
    name: "胎位",
  },
  {
    key: "fieldTwo", //胎心部位
    value: "",
    event: keyf1,
    name: "胎心部位",
  },
  {
    key: "fieldThree", //胎心心率
    value: "",
    event: keyf1,
    name: "胎心心率",
    next: "次/min"
  },
  {
    key: "fieldFour", //衔接
    value: "",
    event: keyf1,
    name: "衔接",
  },
  {
    key: "fieldFive", //宫缩间歇
    value: "",
    event: keyf1,
    name: "宫缩间歇",
    next: "min",
  },
  {
    key: "fieldSix", //宫缩持续
    value: "",
    event: keyf1,
    name: "宫缩持续",
    next: "s",
  },
  {
    key: "fieldSeven", // 宫缩缩力
    value: "",
    event: keyf1,
    name: "宫缩缩力"
  },
  {
    key: "fieldEight", // 宫颈开张
    value: "",
    event: keyf1,
    name: "宫颈开张",
    next: "cm"
  },
  {
    key: "fieldNine", //宫颈均势
    value: "",
    event: keyf1,
    name: "宫颈均势",
  },
  {
    key: "fieldTen", //宫颈质
    value: "",
    event: keyf1,
    name: "宫颈质"
  },
  {
    key: "fieldEleven", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低"
  },
  {
    key: "fieldTwelve", //矢状缝
    value: "",
    event: keyf1,
    name: "矢状缝"
  },
  {
    key: "fieldThirteen", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜"
  },
  {
    key: "fieldFourteen", //羊水性状
    value: "",
    event: keyf1,
    name: "羊水性状"
  },
  {
    key: "fieldFifteen", //检查方式
    value: "",
    event: keyf1,
    name: "检查方式"
  },
  {
    key: "fieldSixteen", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    }
  },
  {
    key: "fieldSeventeen", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 32
    }
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
      width: "180px",
      background: "transparent"
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
    // oninput: next
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
    "胎膜",
    "胎位",
    "宫缩持续/间歇",
    "先露高低",
    "宫颈管",
    "羊水性状",
    "宫颈扩张",
    "宫缩强度"
  ];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(tmList, list[0], data);
    setList(twList, list[1], data);
    setList(gscxjxList, list[2], data);
    setList(xlgdList, list[3], data);
    setList(gjgList, list[4], data);
    setList(ysxzList, list[5], data);
    setList(gjkzList, list[6], data);
    setList(gsqdList, list[7], data);
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
