import {
  listItem
} from "../../../api/recordDesc";
import {
  multiDictInfo
} from "../../../api/index";
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date
} from "../keyEvent/date";
import info from "../sheetInfo";
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time
  },
  {
    key: "fieldOne", //血流量
    value: "",
    event: keyf1,
    name: '血流量',
    next: 'ml/min'
  },
  {
    key: "fieldTwo", //超滤率
    value: "",
    event: keyf1,
    name: '超滤率',
    next: 'ml/h'
  },
  {
    key: "fieldThree", //置换液
    value: "",
    event: keyf1,
    name: '置换液',
    next: 'ml/h'
  },
  {
    key: "fieldFour", // 动脉压力
    value: "",
    event: keyf1,
    name: '动脉压力',
    next: 'mmHg'
  },
  {
    key: "fieldFive", // 静脉压力
    value: "",
    event: keyf1,
    name: '静脉压力',
    next: 'mmHg'
  },
  {
    key: "fieldSix", // 跨膜压
    value: "",
    event: keyf1,
    name: '跨膜压',
    next: 'mmHg'
  },
  {
    key: "fieldSeven", // 超滤量
    value: "",
    event: keyf1,
    name: '超滤量',
    next: 'ml'
  },
  {
    key: "fieldEight", //5%碳酸氢钠
    value: "",
    event: keyf1,
    name: '5%碳酸氢钠',
    next: 'ml'
  },
  {
    key: "fieldNine", //4%枸橼酸钠抗凝剂ml
    value: "",
    event: keyf1,
    name: '4%枸橼酸钠抗凝剂',
    next: 'ml'
  },
  {
    key: "fieldTen", //10%葡萄糖酸钙ml
    value: "",
    event: keyf1,
    name: '10%葡萄糖酸钙',
    next: 'ml'
  },
  {
    key: "fieldTwelve", //体内钙离子
    value: "",
    event: keyf1,
    name: '体内钙离子',
    next: 'mmol/L'
  },
  {
    key: "fieldEleven", //体外钙离子
    value: "",
    event: keyf1,
    name: '体外钙离子',
    next: 'mmol/L'
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
      width: "260px",
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
