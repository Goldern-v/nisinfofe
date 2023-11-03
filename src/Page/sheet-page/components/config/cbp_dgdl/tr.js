/*
江门妇幼-PICU血液透析护理记录单
 */
import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = ["清醒(√)","嗜睡(+)","朦胧(++)","浅昏迷(+++)","深昏迷(++++)","麻醉未醒(△)"];
let chuList = [];
let ruList = [];
let zthdList = [];
let isCheck=["","√"]
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
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "体温",
    next: "℃"
  },
  {
    key: "pulse", //脉搏/心率
    value: "",
    name: "心率",
    next: "次/分",
    event: keyf1
  },
  {
    key: "breath", // 呼吸
    value: "",
    name: "呼吸",
    next: "次/分",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name: "血压",
    next: "mmHg",
    event: keyf1
  },
  {
    key: "spo2", //SPO2
    value: "",
    name: "SPO2",
    next: "%",
    event: keyf1
  },
  {
    key: "anticoagulation", //抗凝速度
    value: "",
    name: "抗凝速度",
    next: "ml/h",
    event: keyf1
  },
  // {
  //   key: "fieldFour", //脱水速度ml/h
  //   value: "",
  //   name: "脱水速度",
  //   next: "ml/h",
  //   event: keyf1
  // },
  {
    key: "protamine", //抗凝剂速度ml/h
    value: "",
    name: "鱼精蛋白速度",
    next: "ml/h",
    event: keyf1
  },
  {
    key: "bloodFlow", //血流量）
    value: "",
    name: "血流量",
    next: "ml/min",
    event: keyf1
  },
  {
    key: "placement", //置入速度
    value: "",
    name: "置入速度",
    next: "ml/min",
    event: keyf1
  },
  {
    key: "dehydration", //脱水速度
    value: "",
    name: "脱水速度",
    next: "ml/h",
    event: keyf1
  },
  {
    key: "permeable", //透液速度
    value: "",
    name: "脱水速透液速度",
    next: "ml/h",
    event: keyf1
  },
  {
    key: "NaHCO3", //5%HaCO3
    value: "",
    name: "5%HaCO3",
    next: "ml/h",
    event: keyf1
  },
  {
    key: "arterialPressure", // 动脉压
    value: "",
    name: "动脉压",
    next: "mmHg",
    event: keyf1
  },
  {
    key: "transmembranePressure", //  跨模压
    value: "",
    name: " 跨模压",
    next: "mmHg",
    event: keyf1
  },
  {
    key: "venousPressure", //  静脉压
    value: "",
    name: " 静脉压",
    next: "mmHg",
    event: keyf1
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
    value: true
  }
];

export function getListData4() {
  let list = ["花都:新生儿亚低温治疗护理记录表:肢体活动左右"];
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(zthdList, "花都:新生儿亚低温治疗护理记录表:肢体活动左右", data);
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
