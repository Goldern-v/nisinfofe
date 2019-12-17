import {
  listItem
} from "../../../api/recordDesc";
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
import info from "../sheetInfo";
let ysList = [];
let chuList = [];
let ruList = [];
export default [{
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
    key: "temperature", //医嘱奶量
    value: "",
    event: keyf1
  },
  {
    key: "foodSize", //母乳
    value: "",
    event: keyf1
  },
  {
    key: "dischargeSize", //配方
    value: "",
    event: keyf1
  },
  {
    key: "breath", //尿量
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeLeft", // 呕吐量
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeRight", // 大便次
    value: "",
    event: keyf1
  },
  {
    key: "pupilSizeRight3", // 体重
    value: "",
    event: keyf1
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
