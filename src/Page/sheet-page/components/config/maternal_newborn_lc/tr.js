import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };

let fyList = [];
let ksList = [];
let xslList = [];
let jzlList = [];
let fsList = [];
let twList = [];
let wyfsList = [];
let wyzlList = [];
let wxbhList = [];
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
    key: "preFieldOne", //宫缩 无
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "宫缩：无"
  },
  {
    key: "preFieldTwo", //宫缩 规律
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "宫缩:规律"
  },
  {
    key: "preFieldThree", //宫缩 不规律
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "宫缩:不规律"
  },
  {
    key: "preFieldFour", //胎心
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "胎心",
    next: "次/分"
  },
  {
    key: "preFieldFive", //破水 未破
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "破水:未破"
  },
  {
    key: "preFieldSix", //破水 已破
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "破水:已破"
  },
  {
    key: "postFieldOne", //宫缩 （产后）
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "宫缩"
  },
  {
    key: "postFieldTwo", //宫底高度
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "宫底高度"
  },
  {
    key: "postFieldThree", //阴道流血
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "阴道流血"
  },
  {
    key: "postFieldFour", //刀口渗血
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "刀口渗血"
  },
  {
    key: "postFieldFive", //乳房情况
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "乳房情况"
  },
  {
    key: "postFieldSix", //泌乳情况
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "泌乳情况"
  },
  {
    key: "postPeeOne", //小便：通畅
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "小便：通畅"
  },
  {
    key: "postPeeTwo", //小便：困难
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "小便：困难"
  },
  {
    key: "postPeeThree", //小便：导尿
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "小便：导尿"
  },
  {
    key: "postSkinOne", //皮肤：正常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "皮肤：正常"
  },
  {
    key: "postSkinTwo", //皮肤：异常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "皮肤：异常"
  },
  {
    key: "newbornCryOne", //哭声：正常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "哭声：正常"
  },
  {
    key: "newbornCryTwo", //哭声：异常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "哭声：异常"
  },
  {
    key: "newbornBreatheOne", //呼吸：平稳
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "呼吸：平稳"
  },
  {
    key: "newbornBreatheTwo", //呼吸：异常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "呼吸：异常"
  },
  {
    key: "newbornFieldOne", //脐带：干燥
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "脐带：干燥"
  },
  {
    key: "newbornFieldTwo", //脐带：渗出
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "脐带：渗出"
  },
  {
    key: "newbornFieldThree", //吃奶：好
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "吃奶：好"
  },
  {
    key: "newbornFieldFour", //吃奶：差
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "吃奶：差"
  },
  {
    key: "newBornSkinOne", //皮肤：正常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "皮肤：正常"
  },
  {
    key: "newbornSkinTwo", //皮肤：异常
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "皮肤：异常"
  },
  {
    key: "newbornSleep", //睡眠
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "睡眠"
  },
  {
    key: "newbornFieldFive", //体温
    value: "",
    event: keyf1,
    textarea: {
      width: 30
    },
    name: "体温"
  },
  {
    key: "newbornPee", //小便
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "小便"
  },
  {
    key: "newbornPoop", //大便
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "大便"
  },
  {
    key: "newbornFieldSix", //侧卧位
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "侧卧位"
  },
  {
    key: "newbornFieldSeven", //呕吐
    value: "",
    event: keyf1,
    textarea: {
      width: 25
    },
    name: "呕吐"
  },
  {
    key: "description", //护理记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "360px",
      background: "transparent"
    },
    event: function(e, td) {
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
  {
    hidden: true,
    key: "audit",
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
  //   chuList.push("阴道出血");
  // });
  let list = ["陵城反应", "陵城哭声", "陵城肌张力", "陵城吸吮力"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(fyList, list[0], data);
    setList(ksList, list[1], data);
    setList(jzlList, list[2], data);
    setList(xslList, list[3], data);
  });
}

// getListData();
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
