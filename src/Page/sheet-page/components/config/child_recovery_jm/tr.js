/*
江门妇幼-儿童康复科护理记录单
*/
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date_year,
  event_time,
  click_date_year,
  click_time
} from "../keyEvent/date";
export default [{
  key: "recordMonth", //日期
  value: "",
  event: event_date_year,
  click: click_date_year
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
  key: "consciousness", // 精神
  value: "",
  name: "精神",
  event: keyf1,
  autoComplete: {
    data: ['好', '一般', '差']
  }
},
{
  key: "fieldOne", //胃纳
  value: "",
  name: "胃纳",
  event: keyf1,
  autoComplete: {
    data: ['好', '一般', '差']
  }
},
{
  key: "fieldTwo", // 咳痰
  value: "",
  name: "咳痰",
  event: keyf1,
  textarea: {
    width: 48
  },
  autoComplete: {
    data: ['无', '有']
  }
},
{
  key: "fieldThree", // 咳嗽
  value: "",
  name: "咳嗽",
  event: keyf1,
  textarea: {
    width: 36
  },
  autoComplete: {
    data: ['无', '有']
  }
},
{
  key: "fieldFour", // 入量静脉（ml）
  value: "",
  name: "静脉",
  next: "ml",
  event: keyf1
},
{
  key: "fieldFive", // 进食（ml）
  value: "",
  name: "进食",
  next: "ml",
  event: keyf1
},
{
  key: "fieldSix", // 大便（g/性状）
  value: "",
  name: "大便",
  next: "g/性状",
  event: keyf1
},
{
  key: "fieldSeven", // 小便（ml）
  value: "",
  name: "小便",
  next: "ml",
  event: keyf1,
},
{
  key: "fieldEight", // 呕吐（ml）
  value: "",
  name: "呕吐",
  next: "ml",
  event: keyf1
},
{
  key: "fieldNine", // 护理指导
  value: "",
  name: "护理指导",
  event: keyf1,
  splice: true,
  textarea: {
    width: 48
  },
  autoComplete: {
    data: ['①', '②', '③', '④', '⑤', '⑥']
  }
},
{
  key: "healthEducation", // 健康教育
  value: "",
  name: "健康教育",
  event: keyf1,
  splice: true,
  textarea: {
    width: 48
  },
  autoComplete: {
    data: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩', '11']
  }
},
{
  key: "fieldTen", // 留置针
  value: "",
  name: "留置针",
  event: keyf1,
  autoComplete: {
    data: ['无', '有']
  }
},
{
  key: "fieldEleven", //标题1
  value: "",
  event: keyf1,
  textarea: {
    width: 44
  }
},
{
  key: "fieldTwelve", //标题2
  value: "",
  event: keyf1,
  textarea: {
    width: 44
  }
},
{
  key: "fieldThirteen", //标题3
  value: "",
  event: keyf1,
  textarea: {
    width: 44
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
