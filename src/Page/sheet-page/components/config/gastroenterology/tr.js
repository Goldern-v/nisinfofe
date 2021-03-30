import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let chuList = [];
let ruList = [];
let list3 = [];
let list4 = [];
let list5 = [];
let list6 = [];
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
    key: "spo2", //spo2
    value: "",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldOne", //标题1
    value: "",
    event: keyf1,
    name: "恶心/呕吐",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldTwo", //标题2
    value: "",
    event: keyf1,
    name: "嗳气/反酸",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldThree", //标题3
    value: "",
    event: keyf1,
    name: "腹痛评分/腹胀",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldFour", //标题4
    value: "",
    event: keyf1,
    name: "头晕/乏力",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldFive", //标题5
    value: "",
    event: keyf1,
    name: "腹泻/皮肤黄染",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldSix", //标题6
    value: "",
    event: keyf1,
    name: "禁食",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldSeven", //标题7
    value: "",
    event: keyf1,
    name: "冷流质",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldEight", //标题8
    value: "",
    event: keyf1,
    name: "半流",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldNine", //标题9
    value: "",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldTen", //标题10
    value: "",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldThirteen",
    value: "",
    event: keyf1,
    name: "胃液/尿量",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldSeventeen", //标题1
    value: "",
    event: keyf1,
    name: "标题1",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldEighteen", //标题2
    value: "",
    event: keyf1,
    name: "标题2",
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldFourteen", //标题14
    value: "",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldFifteen", //标题15
    value: "",
    event: keyf1,
    textarea: {
      width: 29
    }
  },
  {
    key: "fieldSixteen", //标题15
    value: "",
    event: keyf1,
    textarea: {
      width: 29
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

export function getListData4() {
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

getListData4();
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
