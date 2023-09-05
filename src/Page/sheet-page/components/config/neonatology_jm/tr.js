import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
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
  key: "temperature", //体温
  value: "",
  event: keyf1,
  name: "体温",
  next: "℃"
},
{
  key: "breath", //心率
  value: "",
  event: keyf1,
  name: "HR",
  next: "次/分"
},
{
  key: "pulse", //呼吸
  value: "",
  event: keyf1,
  name: "R",
  next: "次/分"
},
{
  key: "spo2", //SPO₂
  value: "",
  event: keyf1,
  name: "SPO₂",
  next: "%"
},
{
  key: "fieldOne", //肤色-红润
  value: "",
  event: keyf1,
  name: "肤色",
  autoComplete: {
    data: ['红润','潮红' ,'黄染','青紫','苍白','√']
  }
},
// {
//   key: "fieldTwo", // 肤色-发绀
//   value: "",
//   event: keyf1,
//   name: "发绀",
// },
// {
//   key: "fieldThree", //肤色-黄染
//   value: "",
//   event: keyf1,
//   name: "黄染"
// },
{
  key: "fieldFour", // 皮测黄疸值
  value: "",
  event: keyf1,
  name: "皮测黄疸值",
  textarea:{
    width:70
  }
},
{
  key: "fieldSix", //反应-良好
  value: "",
  event: keyf1,
  name: "反应",
  autoComplete: {
    data: ['好','激惹','差','√']
  }
},
// {
//   key: "fieldSeven", // 反应-激惹
//   value: "",
//   event: keyf1,
//   name: "激惹"
// },
// {
//   key: "fieldEight", // 反应-迟钝
//   value: "",
//   event: keyf1,
//   name: "迟钝",
// },
{
  key: "fieldNine", // 吸吮力
  value: "",
  event: keyf1,
  name: "吸吮力",
  autoComplete: {
    data: ['强','弱']
  }
},
// {
//   key: "fieldTen", // 吸吮力-弱
//   value: "",
//   event: keyf1,
//   name: "弱"
// },
{
  key: "fieldEleven", // 脐部-渗血
  value: "",
  event: keyf1,
  name: "脐部",
  autoComplete: {
    data: ['干洁','渗液','渗血']
  }
},
// {
//   key: "fieldTwelve", // 脐部-无渗血
//   value: "",
//   event: keyf1,
//   name: "无渗血"
// },
{
  key: "fieldThirteen", //大便
  value: "",
  event: keyf1,
  name: "大便",
  autoComplete: {
    data: ['√']
  },
  textarea:{
    width:40
  }
},
{
  key: "fieldFourteen", //小便
  value: "",
  event: keyf1,
  name: "小便",
  autoComplete: {
    data: ['√']
  },
  textarea:{
    width:40
  }
},
{
  key: "fieldFifteen", //血糖
  value: "",
  event: keyf1,
  name: "血糖"
},
{
  key: "fieldSixteen", //喂养方式
  value: "",
  event: keyf1,
  name: "喂养方式",
  textarea:{
    width:52
  }
},
{
  key: "fieldSeventeen", //早开奶
  value: "",
  event: keyf1,
  autoComplete: {
    data: ['√']
  },
  textarea:{
    width:40
  }
},
{
  key: "fieldEighteen", //自定义1
  value: "",
  event: keyf1,
  textarea:{
    width:50
  }
},
{
  key: "fieldTwelve", //自定义2
  value: "",
  event: keyf1,
  textarea:{
    width:50
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
  // oninput: next
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
