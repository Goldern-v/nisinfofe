import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let chuList = [];
let ruList = [];
let skfl = [];
let hzzz = [];
let hzys = [];
let hzpw = [];
let hzgj = [];

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
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function(e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    name: "伤口敷料",
    autoComplete: {
      data: skfl
    }
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    name: "患肢皮温",
    autoComplete: {
      data: hzpw
    }
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    name: "患肢颜色",
    autoComplete: {
      data: hzys
    }
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    name: "患肢感觉",
    autoComplete: {
      data: hzgj
    }
  },
  {
    key: "fieldFive", //标题5
    value: "",
    event: keyf1,
    name: "患肢肿胀",
    autoComplete: {
      data: hzzz
    }
  },
  {
    key: "fieldSix", //标题8
    value: "",
    event: keyf1,
    name: "体位"
  },
  {
    key: "fieldSeven", //标题6
    value: "",
    event: keyf1
  },
  {
    key: "fieldEight", //标题7
    value: "",
    event: keyf1
  },
  {
    key: "fieldNine", //标题9
    value: "",
    event: keyf1
  },
  {
    key: "fieldTen", //标题10
    value: "",
    event: keyf1
  },
  {
    key: "fieldEleven", //标题11
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwelve", //标题12
    value: "",
    event: keyf1
  },
  {
    key: "fieldThirteen", //标题13
    value: "",
    event: keyf1
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
  let list = ["伤口敷料", "患肢肿胀", "患肢颜色", "患肢皮温", "患肢感觉"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(skfl, "伤口敷料", data);
    setList(hzzz, "患肢肿胀", data);
    setList(hzys, "患肢颜色", data);
    setList(hzpw, "患肢皮温", data);
    setList(hzgj, "患肢感觉", data);
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
