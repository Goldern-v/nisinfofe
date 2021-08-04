import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

const tmList = ['已破', '未破'];
const ysxzList = ['清', 'Ⅰ°', 'Ⅱ°', 'Ⅲ°', '血性羊水'];
const gsqdList = ['弱', '中', '强'];
const xlgdList = ['S-3', 'S-2', 'S-1', 'S=0', 'S+1', 'S+2'];
const ydlxList = ['少量', '多量'];
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
    key: "contractionOne", //孕周
    value: "",
    event: keyf1,
    name: "孕周",
    textarea: {
      width: 50
    }
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 50
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 60
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 60
    }
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
    next: "mmHg",
    textarea: {
      width: 60
    }
  },
  {
    key: "preInputOne", //胎方位
    value: "",
    event: keyf1,
    name: "胎方位",
    textarea: {
      width: 60
    }
  },
  {
    key: "preInputTwo", //胎心音
    value: "",
    event: keyf1,
    name: "胎心音",
    next: "次/分",
    textarea: {
      width: 60
    },
  },
  {
    key: "uterineOne", //强度
    value: "",
    event: keyf1,
    name: "强度",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: gsqdList
    },
  },
  {
    key: "uterineTwo", //持续
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    textarea: {
      width: 43
    }
  },
  {
    key: "uterineThree", // 间歇
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    textarea: {
      width: 43
    },
  },
  {
    key: "uterineFour", // 扩张
    value: "",
    event: keyf1,
    name: "扩张",
    next: "cm",
    textarea: {
      width: 43
    },
  },
  {
    key: "uterineFive", //评分
    value: "",
    event: keyf1,
    name: "评分",
    textarea: {
      width: 43
    },
  },
  {
    key: "preFieldOne", //先露高低
    value: "",
    event: keyf1,
    name: "先露高低",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: xlgdList
    },
  },
  {
    key: "preFieldTwo", //胎膜
    value: "",
    event: keyf1,
    name: "胎膜",
    autoComplete: {
      data: tmList
    },
    textarea: {
      width: 50
    }
  },
  {
    key: "preFieldThree", //羊水性质
    value: "",
    event: keyf1,
    name: "羊水性质",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: ysxzList
    },
  },
  {
    key: "preFieldFour", //胎动
    value: "",
    event: keyf1,
    name: "胎动",
    next: "次/h",
    textarea: {
      width: 50
    }
  },
  {
    key: "preFieldFive", //排尿情况
    value: "",
    event: keyf1,
    name: "排尿情况",
    textarea: {
      width: 50
    },
  },
  {
    key: "preFieldSix", //破膜时间
    value: "",
    event: keyf1,
    name: "破膜时间",
    textarea: {
      width: 50,
    },
  },
  {
    key: "preFieldSeven", //临产时间
    value: "",
    event: keyf1,
    name: "临产时间",
    textarea: {
      width: 50,
    },
  },
  {
    key: "preFieldEight", //胎儿娩出时间
    value: "",
    event: keyf1,
    name: "胎儿娩出时间",
    textarea: {
      width: 50,
    },
  },
  {
    key: "preFieldNice", //缩宫素浓度
    value: "",
    event: keyf1,
    name: "缩宫素浓度",
    next: "U/500ml",
    textarea: {
      width: 75,
    },
  },
  {
    key: "preFieldTen", //滴数
    value: "",
    event: keyf1,
    name: "滴数",
    next: "滴/分",
    textarea: {
      width: 60,
      maxLength: 4
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
    value: true
  }
];
