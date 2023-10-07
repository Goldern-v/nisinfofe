/*
南方中西医 - 预防VAP评估单
*/
import {
  multiDictInfo
} from "../../../api/index";
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
let 入量名称 = [];
let 出量名称 = [];
let 意识 = ['(-)', '(+)', '(++)', '(+++)', '(△)', '(√)',];

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
    key: "usageDay", //呼吸机使用天数
    value: "",
    event: keyf1,
    name: "呼吸机使用天数",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100,
    },
  },
  {
    key: "bodyPosition", // 体位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    name: "体位",
    textarea: {
      width: 100
    },
  },
  {
    key: "breatheManage", // 呼吸道管理
    value: "",
    event: keyf1,
    name: "呼吸道管理",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 110,
    },
  },
  {
    key: "oralCare", // 口腔护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 16),
    name: "口腔护理",
    textarea: {
      width: 110
    },
  },
  {
    key: "attract", // 声门下吸引
    value: "",
    event: keyf1,
    name: "声门下吸引",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 110
    },
  },
  {
    key: "changePipe", // 更换呼吸机管路
    value: "",
    event: keyf1,
    name: "更换呼吸机管路",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
  },
  {
    key: "pourWater", // 倾倒冷凝水
    value: "",
    event: keyf1,
    name: "倾倒冷凝水",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
  },
  {
    key: "sign",
    value: "",
  },
  {
    hidden: false,
    key: "signerNo",
    value: ""
  },
  {
    key: "evaluation", // 撤机评估(医生)
    value: "",
    event: keyf1,
    name: "撤机评估",
    change: (e, td) => limitChange(e, td, 16),
    textarea: {
      width: 100
    },
  },
  {
    key: "signature", // 医生签名
    value: "",
    event: keyf1,
    name: "",
    textarea: {
      width: 70
    },
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
    hidden: true,
    key: "signerNo2",
    value: ""
  },
  {
    hidden: true,
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
    value: true,
  },
];

