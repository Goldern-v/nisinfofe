/*
东莞谢岗 - 产前待产记录单
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
      width: 45
    },
  },
  {
    key: "pulse", //P/HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "脉搏",
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
    key: "fetalPosition", //胎方位
    value: "",
    event: keyf1,
    name: "胎方位",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fetalHeart", //胎心
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "胎心",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "cohesion", //衔接
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "衔接",
    textarea: {
      width: 35
    },
  },
  {
    key: "noContractions", //宫缩无
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "宫缩无",
    textarea: {
      width: 35
    },
  },
  {
    key: "contractionsStrength", //宫缩强度
    value: "",
    name: "宫缩强度",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "contractionsContinued", //宫缩持续
    value: "",
    name: "宫缩持续",
    next: "S",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "contractionsIntermittent", //间歇
    value: "",
    name: "间歇",
    next: "min",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "cervicalDilation", //宫颈扩张
    value: "",
    name: "宫颈扩张",
    next: "cm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "reveal", //先露高低
    value: "",
    name: "先露高低",
    next: "cm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "ruptured", //胎膜破裂
    value: "",
    name: "胎膜破裂",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "amniotic", //羊水性状
    value: "",
    name: "羊水性状",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "checkType", //检查方式
    value: "",
    name: "检查方式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fetalMovement", //胎动情况
    value: "",
    name: "胎动情况",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "heartMonitoring", //胎心监护
    value: "",
    name: "胎心监护",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "barthe", //barthel评分
    value: "",
    name: "barthel评分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 50
    },
  },
  {
    key: "healthEducation", //健康宣教
    value: "",
    name: "健康宣教",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75
    },
  },
  {
    key: "customItem", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
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

