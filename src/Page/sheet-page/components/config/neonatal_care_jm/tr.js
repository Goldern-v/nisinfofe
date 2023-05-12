/*
  江门妇幼-新生儿监护单
*/
import {
  keyf1,
  limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let select = ['√'];
let fyList = ['好','一般','差','√'];
let ksList = ['大','稍弱','稍嘶哑','弱','√'];
let fsList = ['红','微红','黄染','唇周微绀','√'];
let qbList = ['干洁','渗液','无渗血','渗血','已脱','√'];
let twList = ['左','平','右','俯卧','√'];
let jzlList = ['正常','稍低','低下','√'];
export default [
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
  key: "recordMonth", //日期
  value: "",
  event: event_date,
  click: click_date
},
{
  key: "recordHour", //时间
  value: "",
  event: event_time,
  // click: click_time
},
{
  key: "fieldOne", //台箱温℃
  value: "",
  event: keyf1,
  name: "台箱温",
  next: "℃",
},
{
  key: "fieldTwo", //台箱编号
  value: "",
  event: keyf1,
  name: "台箱编号",
  next: "",
},
{
  key: "temperature", //体温℃
  value: "",
  name: "体温",
  next: "℃",
  event: keyf1,
  textarea: {
    width: 25
  }
},
{
  key: "pulse", //心率 次/min
  value: "",
  name: "心率",
  next: "次/分",
  event: keyf1,
},
{
  key: "breath", //呼吸 次/min
  value: "",
  name: "呼吸",
  next: "次/分",
  event: keyf1,
  change: (e, td) => limitChange(e, td, 4),
  textarea: {
    width: 60
  }
},
{
  key: "bloodPressure", //血压(mmHg)
  value: "",
  name: "血压",
  next: "mmHg",
  event: function (e, td) {
    if (e.keyCode == 32) {
      e.target.value += "/";
      e.preventDefault();
    }
    keyf1(e, td);
  },
   textarea: {
    width: 60
  }
},
{
  key: "spo2", // spo2
  value: "",
  name: "SPO2",
  next: "%",
  event: keyf1
},
{
  key: "fieldThree", // 反应
  value: "",
  name: "反应",
  next: "",
  event: keyf1,
  autoComplete: {
    data: fyList
  }
},
{
  key: "fieldFour", // 哭声
  value: "",
  name: "哭声",
  next: "",
  event: keyf1,
  autoComplete: {
    data: ksList
  }
},
{
  key: "fieldSix", // 肤色
  value: "",
  name: "肤色",
  next: "",
  event: keyf1,
  autoComplete: {
    data: fsList
  },
  textarea: {
    width: 25
  }
},
{
  key: "muscleTone", // 肌张力
  value: "",
  event: keyf1,
  name: "肌张力",
  next: "",
  autoComplete: {
    data: jzlList
  },
  change: (e, td) => limitChange(e, td, 10),
  textarea: {
    width: 60
  }
},
{
  key: "fieldSeven", // 脐部情况
  value: "",
  event: keyf1,
  name: "脐部情况",
  next: "",
  autoComplete: {
    data: qbList
  },
  textarea: {
    width: 35
  }
},
{
  key: "fieldEight", // 体位
  value: "",
  event: keyf1,
  name: "体位",
  next: "",
  autoComplete: {
    data: twList
  }
},
{
  key: "fieldNine", // 皮测umol/L
  value: "",
  name: "皮测",
  next: "umol/L",
  event: keyf1,
},
{
  key: "fieldTen", // 蓝光治疗
  value: "",
  name: "蓝光治疗",
  next: "",
  event: keyf1,
  autoComplete: {
    data: select
  }
},
{
  key: "fieldEleven", //入量--静脉（ml）
  value: "",
  name: "静脉",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "fieldTwelve", //入量--进食（ml）
  value: "",
  name: "进食",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "fieldThirteen", //出量--大便（g/性状）
  value: "",
  name: "大便",
  next: "g/性状",
  event: keyf1,
  autoComplete: {
    data: ["/胎粪","/黄便","/黄绿","/墨绿"]
  },
  textarea: {
    width: 40
  }
},
{
  key: "fieldFourteen", //出量--小便（ml）
  value: "",
  name: "小便",
  next: "ml",
  event: keyf1
},
{
  key: "fieldSeventeen", //标题1
  value: "",
  event: keyf1,
  textarea: {
    width: 50
  },
},
{
  key: "fieldFifteen", //用氧方式
  value: "",
  name: "用氧方式",
  next: "",
  change: (e, td) => limitChange(e, td, 8),
  event: keyf1,
  textarea: {
    width: 40,
  },
},
{
  key: "fio2", //FiO2(%)
  value: "",
  name: "FiO2",
  next: "%",
  event: keyf1,
},
{
  key: "fieldSixteen", //血糖mmol/L
  value: "",
  name: "血糖",
  next: "mmol/L",
  event: keyf1,
},
{
  key: "description", //特殊情况记录
  value: "",
  textarea: {
    width: 140
  },
  style: {
    textAlign: "left",
    position: "absolute",
    top: "1px",
    bottom: "1px",
    left: "1px",
    width: "145px",
    background: "transparent",
    fontSize: "14px"
  },
  event: function (e, td) {
    console.log(e.keyCode);
    if (e.keyCode == 9) {
      td.value = "    " + td.value;
      e.preventDefault();
    }
    keyf1(e, td);
  }
},
{
  key: "sign",
  value: ""
},
{
  key: "sign2",
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
