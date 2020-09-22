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
    key: "fieldOne", //箱温/床温
    value: "",
    event: keyf1,
    name: "箱温/床温",
    next: "℃"
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃"
  },
  {
    key: "pulse", //脉搏/心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "血压",
    next: "mmHg"
  },
  {
    key: "spo2", //血氧饱和度(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },
  {
    key: "fieldTwo", //体位
    value: "",
    event: keyf1,
    name: "体位"
  },
  {
    key: "fieldThree", //吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力"
  },
  {
    key: "fieldFour", //脐部
    value: "",
    event: keyf1,
    name: "脐部"
  },
  {
    key: "fieldFive", //经皮胆红素
    value: "",
    event: keyf1,
    name: "经皮胆红素",
    next: "Umol/L"
  },
  {
    key: "fieldNine", //胃管深度
    value: "",
    event: keyf1,
    name: "胃管深度",
    next: "cm"
  },
  {
    key: "oralType", // 口服种类
    value: "",
    event: keyf1,
    name: "口服种类",
  },
  {
    key: "oralWayAmount", //口服方式/量ml
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldTen", // 静脉入液量
    value: "",
    event: keyf1,
    name: "静脉入液量",
    next: "ml"
  },
  {
    key: "fieldEleven", //尿量
    value: "",
    event: keyf1,
    name: "尿量",
    next: "ml"
  },
  {
    key: "fieldTwelve", //大便情况/量
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldThirteen", // 呕吐物性质/量ml
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldFourteen", // 氧疗方式
    value: "",
    event: keyf1,
    name: "氧疗方式",
  },
  {
    key: "fieldFiveteen", // 氧疗流量L/分
    value: "",
    event: keyf1,
    name: "氧疗流量",
    next: "L/分"
  },
  {
    key: "fieldSixteen", // 氧疗浓度
    value: "",
    event: keyf1,
    name: "氧疗浓度",
    next: "%"
  },
  {
    key: "fieldSeventeen", // 吸痰性状/量口腔
    value: "",
    name: "吸痰性状/量口腔",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldEighteen", // 吸痰性状/量气管插管
    value: "",
    name: "吸痰性状/量气管插管",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldNineteen", // 篮光治疗/呻吟
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    },
    name: "篮光治疗/呻吟"
  },
  {
    key: "fieldSix", //标题1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldSeven", //标题2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldEight", //标题3
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
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
