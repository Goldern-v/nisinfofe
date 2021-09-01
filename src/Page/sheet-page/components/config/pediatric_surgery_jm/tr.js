import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
import { size } from "lodash";
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
  event: keyf1
},
{
  key: "pulse", //心率
  value: "",
  event: keyf1
},
{
  key: "breath", //呼吸
  value: "",
  event: keyf1
},
{
  key: "bloodPressure", // 血压
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
  key: "spo2", // 血氧饱和度
  value: "",
  event: keyf1
},
{
  key: "fieldOne", //  神志
  value: "",
  event: keyf1,
  textarea: {
    width: 48
  }
},
{
  key: "fieldFourteen", //  吸氧
  value: "",
  event: keyf1,
  textarea: {
    width: 48
  }
},
{
  key: "fieldFour", // 静脉（ml）
  value: "",
  event: keyf1,
},
{
  key: "fieldFive", // 进食（ml）
  value: "",
  event: keyf1
},
{
  key: "otherFood", // 入量自定义
  value: "",
  event: keyf1
},
{
  key: "urineVolume", // 尿量（ml）
  value: "",
  event: keyf1,
},
{
  key: "dischargeColor", // 尿量颜色
  value: "",
  event: keyf1
},
{
  key: "fieldSix", // 大便（g/性状）
  value: "",
  event: keyf1,

},
{
  key: "stoolNature", // 大便性质
  value: "",
  event: keyf1
},
{
  key: "fieldEight", //  呕吐（ml）
  value: "",
  event: keyf1
},
{
  key: "fieldOther", //  出量其他
  value: "",
  event: keyf1
},
{
  key: "fieldNature", //  出量性质
  value: "",
  event: keyf1
},
{
  key: "fieldTen", //  伤口敷料
  value: "",
  event: keyf1,
  splice: true,
  textarea: {
    width: 48
  },
  autoComplete: {
    data: ['干洁', '渗血', '陈旧性血迹']
  },

},
{
  key: "fieldNine", //  护理指导
  value: "",
  event: keyf1,
  splice: true,
  textarea: {
    width: 48
  },
  autoComplete: {
    data: ['1', '2', '3', '4', '5', '6', '7']
  },
},
{
  key: "healthEducation", // 健康教育
  value: "",
  event: keyf1,
  splice: true,
  textarea: {
    width: 48
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
