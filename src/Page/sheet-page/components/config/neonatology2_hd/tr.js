import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let chuList = [];
let ruList = [];
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "bodyWeight", //体重
    value: "",
    event: keyf1,
    name: "体重",
    next: "kg"
  },
  {
    key: "fieldOne", //指尖血糖mmol/L
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L"
  },
  {
    key: "fieldTwo", //哭声
    value: "",
    event: keyf1,
    name: "哭声",
  },
  {
    key: "fieldThree", //皮肤颜色
    value: "",
    event: keyf1,
    name: "皮肤颜色"
  },
  {
    key: "fieldFour", // 呕吐
    value: "",
    event: keyf1,
    name: "呕吐",
  },
  {
    key: "fieldFive", //吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力"
  },
  {
    key: "fieldSix", // 喂养自吮
    value: "",
    event: keyf1,
    name: "喂养自吮"
  },
  {
    key: "fieldSeven", //喂养母乳
    value: "",
    event: keyf1,
    name: "喂养母乳"
  },
  {
    key: "fieldEight", // 喂养人工
    value: "",
    event: keyf1,
    name: "喂养人工"
  },
  {
    key: "fieldNine", // 喂养奶量ml
    value: "",
    event: keyf1,
    name: "喂养奶量",
    next: "ml"
  },
  {
    key: "fieldTen", // 脐部情况干洁
    value: "",
    event: keyf1,
    name: "脐部情况干洁"
  },
  {
    key: "fieldEleven", // 脐部情况渗血
    value: "",
    event: keyf1,
    name: "脐部情况渗血"
  },
  {
    key: "fieldTwelve", // 脐部情况渗液
    value: "",
    event: keyf1,
    name: "脐部情况渗液"
  },
  {
    key: "fieldThirteen", //大便
    value: "",
    event: keyf1,
    textarea: {
      width: 68
    },
    name: "大便",
  },
  {
    key: "fieldFourteen", //小便
    value: "",
    event: keyf1,
    name: "小便"
  },
  {
    key: "fieldFifteen", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldSixteen", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 48
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
  listItem("入量名称", info.sheetType).then(res => {
    ruList.splice(0, ruList.length);
    for (let item of res.data.data) {
      ruList.push(item.name);
    }
  });
  listItem("出量名称", info.sheetType).then(res => {
    chuList.splice(0, chuList.length);
    for (let item of res.data.data) {
      chuList.push(item.name);
    }
  });
  let list = ["意识"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(ysList, "意识", data);
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
