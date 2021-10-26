/*
  江门妇幼-儿科护理记录单
*/
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
  click: click_time
},
{
  key: "temperature", //体温
  name: "体温",
  next: "℃",
  value: "",
  event: keyf1
},
{
  key: "pulse", //心率
  value: "",
  name: "心率",
  next: "次/分",
  event: keyf1
},
{
  key: "breath", //呼吸
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
  event: function (e, td) {
    if (e.keyCode == 32) {
      e.target.value += "/";
      e.preventDefault();
    }
    keyf1(e, td);
  },
  textarea: {
    width: 30
  }
},
{
  key: "spo2", //SPO2
  value: "",
  name: "SPO2",
  next: "%",
  event: keyf1,
  textarea: {
    width: 30
  }
},
{
  key: "diet", //饮食
  value: "",
  name: "饮食",
  event: keyf1,
  textarea: {
    width: 30
  }
},
{
  key: "veinSize", // 入量静脉（ml）
  value: "",
  name: "静脉",
  next: "ml",
  event: keyf1
},
{
  key: "eatSize", // 进食（ml）
  value: "",
  name: "进食",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "otherFood", // 入量自定义
  value: "",
  event: keyf1,
  textarea: {
    width: 32
  }
},
{
  key: "urineVolume", // 小便（ml）
  value: "",
  name: "尿液",
  next: "ml",
  event: keyf1,
},
{
  key: "dischargeColor", // 小便颜色
  value: "",
  name: "尿液颜色",
  event: keyf1
},
{
  key: "stoolTimes", //大便（g/次）
  value: "",
  name: "大便",
  next: "g/次",
  event: keyf1
},
{
  key: "stoolNature", //大便性质
  value: "",
  name: "大便性质",
  next: "",
  event: keyf1,
},
{
  key: "vomit", //呕吐（ml）
  value: "",
  name: "呕吐",
  next: "ml",
  event: keyf1
},
{
  key: "otherDischarge", //出量自定义
  value: "",
  name: "出量自定义",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 32
  }
},
{
  key: "fieldOne", //标题1
  value: "",
  event: keyf1,
  textarea: {
    width: 48
  }
},
{
  key: "fieldTwo", //标题2
  value: "",
  event: keyf1,
  textarea: {
    width: 48
  }
},
{
  key: "fieldThree", //标题3
  value: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "fieldFour", //标题4
  value: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "fieldFive", //标题5
  value: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "fieldSix", //标题6
  value: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "description", //特殊情况记录
  value: "",
  splice: true,
  style: {
    textAlign: "left",
    position: "absolute",
    top: "1px",
    bottom: "1px",
    left: "1px",
    width: "160px",
    background: "transparent",
    fontSize: "12px"
  },
  event: function (e, td) {
    console.log(e.keyCode);
    if (e.keyCode == 9) {
      td.value = "    " + td.value;
      e.preventDefault();
    }
    keyf1(e, td);
  },
  textarea: {
    width: 160
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
