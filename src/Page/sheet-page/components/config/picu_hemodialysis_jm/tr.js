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
    key: "pulse", //脉搏/心率
    value: "",
    event: keyf1
  },
  {
    key: "temperature", // 体温
    value: "",
    event: keyf1
  },
  {
    key: "fieldOne", //血流速度ml/min
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwo", //透析液速度ml/h
    value: "",
    event: keyf1
  },
  {
    key: "fieldThree", //置换液速度ml/h
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", //脱水速度ml/h
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive", //抗凝剂速度ml/h
    value: "",
    event: keyf1
  },
  {
    key: "fieldSix", //血浆分离比（%）
    value: "",
    event: keyf1
  },
  {
    key: "fieldSeven", //ACT(sec)
    value: "",
    event: keyf1
  },
  {
    key: "fieldEight", //动脉压mmHg
    value: "",
    event: keyf1
  },
  {
    key: "fieldNine", //静脉压mmHg
    value: "",
    event: keyf1
  },
  {
    key: "fieldFifteen", // 跨膜压mmHg
    value: "",
    event: keyf1
  },
  {
    key: "fieldTen", // 透析液用量ml
    value: "",
    event: keyf1
  },
  {
    key: "fieldEleven", // 置换液量ml
    value: "",
    event: keyf1
  },
  {
    key: "fieldTwelve", // 总出水量ml
    value: "",
    event: keyf1
  },
  {
    key: "fieldThirteen", //病人脱水总量ml
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    }
  },
  {
    key: "fieldFourteen", //病人脱水累计总量ml
    value: "",
    event: keyf1,
    textarea: {
      width: 52
    }
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
