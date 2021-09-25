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
let ksList = ['大','稍弱','弱','√'];
let fsList = ['红','微红','黄染','√'];
let qbList = ['干洁','无渗血','√'];
let twList = ['左','平','右','俯','√'];
let jzlList = ['正常','稍低','低下','√'];
export default [{
  key: "recordMonth", //日期
  value: "",
  event: event_date,
  click: click_date
},
{
  key: "recordHour", //时间
  value: "",
  event: event_time,
  click: click_time
},
{
  key: "fieldOne", //台箱温℃
  value: "",
  event: keyf1
},
{
  key: "fieldTwo", //台箱编号
  value: "",
  event: keyf1
},
{
  key: "temperature", //体温℃
  value: "",
  event: keyf1,
  textarea: {
    width: 25
  }
},
{
  key: "pulse", //心率 次/min
  value: "",
  event: keyf1,
},
{
  key: "breath", //呼吸 次/min
  value: "",
  event: keyf1,
},
{
  key: "bloodPressure", //血压(mmHg)
  value: "",
  event: function (e, td) {
    if (e.keyCode == 32) {
      e.target.value += "/";
      e.preventDefault();
    }
    keyf1(e, td);
  }
},
{
  key: "spo2", // spo2
  value: "",
  event: keyf1
},
{
  key: "fieldThree", // 反应
  value: "",
  event: keyf1,
  autoComplete: {
    data: fyList
  }
},
{
  key: "fieldFour", // 哭声
  value: "",
  event: keyf1,
  autoComplete: {
    data: ksList
  }
},
{
  key: "fieldSix", // 肤色
  value: "",
  event: keyf1,
  autoComplete: {
    data: fsList
  },
},
{
  key: "muscleTone", // 肌张力
  value: "",
  event: keyf1,
  autoComplete: {
    data: jzlList
  }
},
{
  key: "fieldSeven", // 脐部情况
  value: "",
  event: keyf1,
  autoComplete: {
    data: qbList
  }
},
{
  key: "fieldEight", // 体位
  value: "",
  event: keyf1,
  autoComplete: {
    data: twList
  }
},
{
  key: "fieldNine", // 皮测umol/L
  value: "",
  event: keyf1,
},
{
  key: "fieldTen", // 蓝光治疗
  value: "",
  event: keyf1,
  autoComplete: {
    data: select
  }
},
{
  key: "fieldEleven", //入量--静脉（ml）
  value: "",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "fieldTwelve", //入量--进食（ml）
  value: "",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "fieldThirteen", //出量--大便（g/性状）
  value: "",
  event: keyf1,
},
{
  key: "fieldFourteen", //出量--小便（ml）
  value: "",
  event: keyf1
},
{
  key: "fieldSeventeen", //标题1
  value: "",
  event: keyf1,
  textarea: {
    width: 52
  },
},
{
  key: "fieldFifteen", //用氧方式
  value: "",
  change: (e, td) => limitChange(e, td, 8),
  event: keyf1,
  textarea: {
    width: 50,
  },
},
{
  key: "fio2", //FiO2(%)
  value: "",
  event: keyf1,
},
{
  key: "fieldSixteen", //血糖mmol/L
  value: "",
  event: keyf1,
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
