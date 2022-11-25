import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
// le event = ''

let xzList = ['棕黄粘稠', '墨绿粘稠', '淡黄澄清', '淡红血性', '鲜红血性', '暗红血性', '白色浑浊', '草绿浑浊']
// le i = ''
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
    key: "food", //入量-项目
    value: "",
    event: keyf1,
    // name: "入量项目"
  },
  {
    key: "foodSize", //入量-量（ml）
    value: "",
    event: keyf1,
    name: "入量",
    next: 'ml'
  },
  {
    key: "discharge", //出量 - 项目
    value: "",
    event: keyf1,
    textarea: {
      width: 150
    },
  },
  {
    key: "dischargeSize", //出量 - 量（ml）
    value: "",
    event: keyf1,
    name: "出量",
    next: 'ml'
  },
  {
    key: "character", // 出量 - 性状
    value: "",
    event: keyf1,
    autoComplete: {
      data: xzList
    },
    name: "性状"
  },
  // {
  //   key: "fieldEighteen", //标题2
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     minWidth: 60
  //   }
  // },
  // {
  //   key: "fieldNineteen", //标题3
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     minWidth: 60
  //   }
  // },
  // {
  //   key: "description", //护理记录
  //   value: "",
  //   style: {
  //     textAlign: "left",
  //     position: "absolute",
  //     top: "1px",
  //     bottom: "1px",
  //     left: "1px",
  //     minWidth: "598px",
  //     background: "transparent"
  //   },
  //   event: function (e, td) {
  //     console.log(e.keyCode);
  //     if (e.keyCode == 9) {
  //       td.value = "    " + td.value;
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  // },
  {
    key: "sign",
    value: "",
    style: {
      minWidth: '55px'
    }
  },
  // {
  //   key: "sign2",
  //   value: "",
  //   style: {
  //     minWidth: '55px'
  //   }
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
  // {
  //   hidden: true,
  //   key: "signerName2",
  //   value: ""
  // },
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
  // {
  //   hidden: true,
  //   key: "signerNo2",
  //   value: ""
  // },
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
