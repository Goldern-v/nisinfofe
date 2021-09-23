/*
江门妇幼-妇科护理记录单
*/
import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let 意识 = ["清醒","嗜睡","昏睡","浅昏迷","深昏迷","谵妄"];
let 伤口敷料 = ["干洁","渗血","渗液"];
let 护理指导 = ["A","B","C"];
let 留置尿管 = ["留置畅通","定时夹闭尿管","拔除尿管"];
let 基础护理 = ["温水擦浴","酒精擦浴","口腔护理","会阴护理","翻身"];
let 留置镇痛泵 = ["A","B","C","D",];
let 吸氧 = ["低流量","中流量","高流量","持续","停止"];
let 特殊药物 = ["A","B","C","D",];

export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    click: click_time,
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 40
    }
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 58
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 58
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
      width: 58
    }
  },
  {
    key: "preFieldOne", //血氧饱和度
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    textarea: {
      width: 50
    }
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    autoComplete: {
      data: 意识
    },
    textarea: {
      width: 50
    }
  },
  {
    key: "preInputOne", //静脉
    value: "",
    event: keyf1,
    name: "强度",
    textarea: {
      width: 43
    },
  },
  {
    key: "preInputTwo", //口服
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    textarea: {
      width: 43
    }
  },
  {
    key: "preInputThree", // 血
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    textarea: {
      width: 43
    },
  },
  // {
  //   key: "postOutputOne", // 尿管
  //   value: "",
  //   event: keyf1,
  //   name: "宫口扩张",
  //   next: "cm",
  //   textarea: {
  //     width: 43
  //   },
  // },
  // {
  //   key: "postOutputTwo", //胸壁
  //   value: "",
  //   event: keyf1,
  //   name: "先露",
  //   textarea: {
  //     width: 43
  //   },
  // },
  // {
  //   key: "postOutputThree", //腋窝
  //   value: "",
  //   event: keyf1,
  //   name: "先露",
  //   textarea: {
  //     width: 43
  //   },
  // },
  {
    key: "postOutputOne", //自定义1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputTwo", //自定义2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputThree", //自定义3
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 43
    },
  },
  {
    key: "outputFieldFour", //自定义4
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 43
    },
  },
  {
    key: "measuresTwo", //留置尿管
    value: "",
    event: keyf1,
    name: "宫底高度",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 留置尿管
    }
  },
  {
    key: "measuresThree", //留置镇痛泵
    value: "",
    event: keyf1,
    name: "排尿情况",
    textarea: {
      width: 50
    },
    splice: true,
    autoComplete: {
      data: 留置镇痛泵
    }
  },
  {
    key: "measuresfour", //伤口敷料
    value: "",
    event: keyf1,
    name: "阴道流血",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 伤口敷料
    }
  },
  {
    key: "measuresFive", //腹痛情况
    value: "",
    event: keyf1,
    name: "健康教育",
    textarea: {
      width: 50
    }
  },
  {
    key: "measuresFix", //阴道流血
    value: "",
    event: keyf1,
    name: "基础护理",
    textarea: {
      width: 50
    },
  },
  {
    key: "measuresSeven", //特殊药物使用
    value: "",
    event: keyf1,
    name: "基础护理",
    textarea: {
      width: 50
    },
    splice: true,
    autoComplete: {
      data: 特殊药物
    }
  },
  // {
  //   key: "measuresEight", //功能锻炼
  //   value: "",
  //   event: keyf1,
  //   name: "基础护理",
  //   textarea: {
  //     width: 50
  //   },
  // },
  {
    key: "measuresEight", //标题1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      minWidth: "36px",
      maxWidth: "50px"
    },
  },
  {
    key: "measuresNine", //标题2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      minWidth: "36px",
      maxWidth: "50px"
    },
  },
  {
    key: "measuresTen", //标题3
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      minWidth: "36px",
      maxWidth: "50px"
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
    value: "",
    textarea: {
      width: 80
    },
  },
  {
    key: "sign2",
    value: "",
    textarea: {
      width: 80
    },
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
