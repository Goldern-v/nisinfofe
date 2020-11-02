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
    key: "fieldTen", //呼吸
    value: "",
    name: "呼吸",
    event: keyf1,
    autoComplete: {
      data: ["平顺", "稍促"]
    },
    textarea: {
      width: 44
    }
  },
  {
    key: "fieldOne", //面色
    value: "",
    name: "面色",
    event: keyf1,
    autoComplete: {
      data: ["红润", "黄染"]
    },
    textarea: {
      width: 44
    }
  },
  {
    key: "fieldTwo", //吸吮
    value: "",
    name: "吸吮",
    event: keyf1,
    autoComplete: {
      data: ["好", "一般"]
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "fieldThree", //呕吐
    value: "",
    name: "呕吐",
    event: keyf1,
    autoComplete: {
      data: ["有", "无"]
    },
    textarea: {
      width: 45
    }
  },
  {
    key: "fieldFour", //脐部
    value: "",
    name: "脐部",
    event: keyf1,
    autoComplete: {
      data: ["干洁", "无渗血"]
    },
    textarea: {
      width: 45
    }
  },

  {
    key: "fieldFive", //大便次数
    value: "",
    name: "大便次数",
    event: keyf1,
    textarea: {
      width: 56
    }
  },
  {
    key: "fieldSix", //小便次数
    value: "",
    event: keyf1,
    name: "小便次数",
    textarea: {
      width: 45
    }
  },
  {
    key: "fieldSeven", //体重
    value: "",
    name: "体重",
    event: keyf1,
    textarea: {
      width: 45
    }
  },
  {
    key: "fieldEight", //标题一
    value: "",
    event: keyf1,
    textarea: {
      width: 56
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
