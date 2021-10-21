/*
东莞谢岗 - 护理记录单
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
let 意识 = [];

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
    key: "temperature", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "体温",
    next: "℃",
    textarea: {
      width: 27
    },
  },
  {
    key: "pulse", //P/HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "心率",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 6),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "血压",
    next: "mmHg",
    textarea: {
      width: 40
    },
  },
  {
    key: "saO2", //SaO₂(%)
    value: "",
    event: keyf1,
    name: "SaO₂",
    next: "%",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "pupilSizeLeft", //瞳孔大小
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "瞳孔大小",
    next: "mm",
    textarea: {
      width: 35
    },
  },
  {
    key: "pupilReflexLeft", //对光反射
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "对光反射",
    textarea: {
      width: 35
    },
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55,
    },
    autoComplete: {
      data: 入量名称
    },
  },
  {
    key: "foodSize", //入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量",
    next: "ml/g",
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55,
    },
    autoComplete: {
      data: 出量名称
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量",
    next: "ml/g",
    textarea: {
      width: 30
    },
  },
  {
    key: "feedingMode", //喂养方式
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "喂养方式",
    textarea: {
      width: 35
    },
  },
  {
    key: "feedingType", //喂养种类
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "喂养种类",
    textarea: {
      width: 35
    },
  },
  {
    key: "reaction", //反应
    value: "",
    name: "反应",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "cry", //哭声
    value: "",
    name: "哭声",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "sucking", //吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "skin", //皮肤颜色
    value: "",
    name: "皮肤颜色",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "umbilical", //脐部情况
    value: "",
    name: "脐部情况",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "inhalation", //吸氧方式
    value: "",
    name: "吸氧方式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "boxTemperature", //箱温
    value: "",
    name: "箱温",
    next: "℃",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "turnOver", //翻身
    value: "",
    name: "翻身",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
      width: "150px",
      background: "transparent",
    },
    textarea: {
      width: 150
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

