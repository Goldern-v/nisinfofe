import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
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
  key: "temperature", //体温
  value: "",
  name: "体温",
  next: "℃",
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
  }
},
{
  key: "spo2", //SPO2
  value: "",
  name: "SPO2",
  next: "%",
  event: keyf1
},
{
  key: "diet", //饮食
  value: "",
  name: "饮食",
  next: "",
  event: keyf1
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
  event: keyf1
},
{
  key: "otherFood", // 入量自定义
  value: "",
  name: "入量自定义",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 32
  }
},
{
  key: "urineVolume", // 小便（ml）
  value: "",
  name: "尿量",
  next: "ml",
  event: keyf1,
},
{
  key: "dischargeColor", // 小便颜色
  value: "",
  name: "尿液颜色",
  next: "",
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
  key: "fieldFive", //舌象
  value: "",
  name: "舌象",
  next: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "fieldSix", //脉象
  value: "",
  name: "脉象",
  next: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "fieldSeven", //指纹
  value: "",
  name: "指纹",
  next: "",
  event: keyf1,
  textarea: {
    width: 36
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
