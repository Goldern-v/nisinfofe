/*
  江门妇幼-儿科护理记录单
*/
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
let ysList = ['清醒', '嗜睡', '昏睡', '浅昏迷', '深昏迷', '谵妄'];
const yesOrNo = ['有', '无'];
const check = ['√', '停止'];
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
  },
  {
    key: "temperature", //体温
    name: "体温",
    next: "℃",
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    name: "脉搏",
    next: "次/分",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    name: "呼吸",
    next: "次/分",
    event: keyf1,
    textarea: {
      width: 40
    }
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
      width: 60
    }
  },
  {
    key: "fieldOne", //血氧饱和度
    value: "",
    name: "血氧饱和度",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "consciousness", //意识
    value: "",
    name: "意识",
    event: keyf1,
    autoComplete: {
      data: ysList
    },
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
    },
  },
  {
    key: "fieldTwo", // 入量静脉（ml）
    value: "",
    name: "静脉",
    next: "ml",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldThree", // 口服（ml）
    value: "",
    name: "口服",
    next: "ml",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldFour", // 大便
    value: "",
    event: keyf1,
    name: '大便',
    next: 'g',
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldFive", // 尿（ml）
    value: "",
    name: "尿",
    next: "ml",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldSix", // 颜色性状
    value: "",
    name: "颜色性状",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldSeven", // 咽痛
    value: "",
    name: "咽痛",
    event: keyf1,
    autoComplete: { data: yesOrNo },
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldEight", //睡眠打鼾
    value: "",
    name: "睡眠打鼾",
    next: "",
    event: keyf1,
    autoComplete: { data: yesOrNo },
    textarea: {
      width: 50
    }
  },
  {
    key: "fieldNine", // 低流量吸氧
    value: "",
    name: "低流量吸氧",
    event: keyf1,
    autoComplete: { data: check },
    textarea: {
      width: 50
    }
  },
  {
    key: "fieldTen", //心电监护
    value: "",
    name: "心电监护",
    event: keyf1,
    autoComplete: { data: check },
    textarea: {
      width: 50
    }
  },
  {
    key: "fieldFourteen", // 咽部伤口渗血
    value: "",
    name: "咽部伤口渗血",
    event: keyf1,
    autoComplete: { data: ['无', '有'] },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldEleven", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldTwelve", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 40
    }
  },
  {
    key: "fieldThirteen", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 40
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
      width: "200px",
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
      width: 200
    }
    // oninput: next
  },
  {
    key: "sign",
    value: ""
  },
  // {
  //   key: "sign2",
  //   value: ""
  // },
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
