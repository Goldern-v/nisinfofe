import {
  listItem
} from "../../../api/recordDesc";
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1,
  calValueChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";

let xslList = ['好', '一般', '弱'];
let qbList = [];
let clmcList = [];
let rlmcList = [];
let ylfsList = [];
let xtxzList = [];
let xtlList = [];
let fyList = [];
let ksList = [];
const zdjnList = ['✓'];

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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "pulse", //脉搏/心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  // {
  //   key: "bloodPressure", //血压
  //   value: "",
  //   event: function (e, td) {
  //     if (e.keyCode == 32) {
  //       e.target.value += "/";
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   },
  //   name: "血压",
  //   next: "mmHg"
  // },
  {
    key: "fieldSix", //反应-正常
    value: "",
    event: keyf1,
    name: "反应正常",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldSeven", //反应-激怒
    value: "",
    event: keyf1,
    name: "反应激怒",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldEight", //反应-迟钝
    value: "",
    event: keyf1,
    name: "反应迟钝",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldNine", //吸吮力-强
    value: "",
    event: keyf1,
    name: "吸吮力强",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldTen", //吸吮力-弱
    value: "",
    event: keyf1,
    name: "吸吮力弱",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldTwelve", //脐部-无渗血
    value: "",
    event: keyf1,
    name: "脐部无渗血",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldEleven", //脐部-渗血
    value: "",
    event: keyf1,
    name: "脐部渗血",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldNineteen", //臀部-干洁
    value: "",
    event: keyf1,
    name: "臀部干洁",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldTwenty", //臀部-臀红
    value: "",
    event: keyf1,
    name: "臀部臀红",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldThirteen", //大便次
    value: "",
    event: keyf1,
    name: "大便次",
  },
  {
    key: "fieldFourteen", //小便次
    value: "",
    event: keyf1,
    name: "小便次",
  },
  {
    key: "fieldOne", //肤色发绀
    value: "",
    event: keyf1,
    name: "肤色正常",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldTwo", //肤色发绀
    value: "",
    event: keyf1,
    name: "肤色发绀",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldThree", //肤色黄染
    value: "",
    event: keyf1,
    name: "肤色黄染",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldFour", // 母乳喂养
    value: "",
    event: keyf1,
    name: "母乳喂养",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldFifteen", // 人工喂养
    value: "",
    event: keyf1,
    name: "人工喂养",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldSixteen", // 混合喂养
    value: "",
    event: keyf1,
    name: "混合喂养",
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fieldSeventeen", //标题1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldEighteen", //标题2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
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
      width: "260px",
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
  let list = [
    "花都:新生儿科护理记录单:脐部",
    "花都:新生儿科护理记录单:出量名称",
    "花都:新生儿科护理记录单:入量名称",
    "花都:新生儿科护理记录单:氧疗方式",
    "花都:新生儿科护理记录单:吸痰性状",
    "花都:新生儿科护理记录单:吸痰量",
    "花都:新生儿科护理记录单:反应",
    "花都:新生儿科护理记录单:哭声"
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(qbList, list[0], data);
    setList(clmcList, list[1], data);
    setList(rlmcList, list[2], data);
    setList(ylfsList, list[3], data);
    setList(xtxzList, list[4], data);
    setList(xtlList, list[5], data);
    setList(fyList, list[6], data);
    setList(ksList, list[7], data);
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
