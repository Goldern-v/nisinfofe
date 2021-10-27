/*
  江门妇幼-小儿外科护理记录单
*/
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date_year,
  event_time,
  click_date_year,
  click_time
} from "../keyEvent/date";
import { size } from "lodash";
export default [
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
  key: "recordMonth", //日期
  value: "",
  event: event_date_year,
  click: click_date_year
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
  key: "bloodPressure", // 血压
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
  key: "spo2", // 血氧饱和度
  value: "",
  name: "SPO2",
  next: "%",
  event: keyf1
},
{
  key: "fieldOne", //  神志
  value: "",
  name: "神志",
  next: "",
  event: keyf1,
  textarea: {
    width: 40
  }
},
{
  key: "fieldFourteen", //  吸氧
  value: "",
  name: "吸氧",
  next: "",
  event: keyf1,
  textarea: {
    width: 40
  }
},
{
  key: "fieldFour", // 静脉（ml）
  value: "",
  name: "静脉",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 50
  }
},
{
  key: "fieldFive", // 进食（ml）
  value: "",
  name: "进食",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "otherFood", // 入量自定义
  value: "",
  event: keyf1,
  textarea: {
    width: 36
  }
},
{
  key: "urineVolume", // 尿量（ml）
  value: "",
  name: "尿量",
  next: "ml",
  event: keyf1,
},
{
  key: "dischargeColor", // 尿量颜色
  value: "",
  name: "尿量颜色",
  event: keyf1
},
{
  key: "fieldSix", // 大便（g/性状）
  value: "",
  name: "大便",
  next: "g/性状",
  event: keyf1,

},
{
  key: "stoolNature", // 大便性质
  value: "",
  name: "大便性质",
  next: "",
  event: keyf1
},
{
  key: "fieldEight", //  呕吐（ml）
  value: "",
  name: "呕吐",
  next: "ml",
  event: keyf1,
  textarea: {
    width: 32
  }
},
{
  key: "fieldOther", //  出量其他
  value: "",
  name: "其他",
  next: "",
  event: keyf1,
  textarea: {
    width: 32
  }
},
{
  key: "fieldNature", //  出量性质
  value: "",
  name: "性质",
  next: "",
  event: keyf1,
  textarea: {
    width: 32
  }
},
{
  key: "fieldTen", //  伤口敷料
  value: "",
  name: "伤口敷料",
  next: "",
  event: keyf1,
  splice: true,
  textarea: {
    width: 40
  },
  autoComplete: {
    data: ['干洁', '渗血', '陈旧性血迹']
  },

},
{
  key: "fieldNine", //  护理指导
  value: "",
  name: "护理指导",
  next: "",
  event: keyf1,
  splice: true,
  textarea: {
    width: 40
  },
  autoComplete: {
    data: ['1', '2', '3', '4', '5', '6', '7']
  },
},
{
  key: "healthEducation", // 健康教育
  value: "",
  name: "健康教育",
  next: "",
  event: keyf1,
  splice: true,
  textarea: {
    width: 40
  },
  autoComplete: {
    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
  },
},

{
  key: "fieldEleven", //标题1
  value: "",
  event: keyf1,
  textarea: {
    width: 38
  }
},
{
  key: "fieldTwelve", //标题2
  value: "",
  event: keyf1,
  textarea: {
    width: 38
  }
},
{
  key: "fieldThirteen", //标题3
  value: "",
  event: keyf1,
  textarea: {
    width: 38
  }
},
{
  key: "fieldFifteen", //标题4
  value: "",
  event: keyf1,
  textarea: {
    width: 38
  }
},
{
  key: "fieldSixteen", //标题5
  value: "",
  event: keyf1,
  textarea: {
    width: 38
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
  hidden: false,
  key: "auditorNo",
  value: ""
},
{
  hidden: true,
  key: "signerNo2",
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
