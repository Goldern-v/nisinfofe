/*
江门妇幼-乳腺科护理记录单
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
let 功能锻炼 = ["A","B","C"];
let 中心静脉导管 = ["A","B"];
let 静脉化疗 = ['开始','持续','结束']
let 心电监护 = ['开始','持续','结束']
let 伤口疼痛 = ['无','轻度','重度']
let 伤口敷料 = ['干洁','少许','渗液']
export default [
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
  {
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
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 意识
    }
  },
  {
    key: "preInputOne", //静脉
    value: "",
    event: keyf1,
    name: "静脉",
    next: "ml",
    textarea: {
      width: 43
    },
  },
  {
    key: "preInputTwo", //口服
    value: "",
    event: keyf1,
    name: "口服",
    next: "ml",
    textarea: {
      width: 43
    }
  },
  {
    key: "preInputThree", // 血
    value: "",
    event: keyf1,
    name: "血",
    next: "ml",
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputOne", // 尿管
    value: "",
    event: keyf1,
    name: "尿管",
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputTwo", //胸壁
    value: "",
    event: keyf1,
    name: "胸壁",
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputThree", //腋窝
    value: "",
    event: keyf1,
    name: "腋窝",
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputFour", //出量自定义
    value: "",
    event: keyf1,
    name: "出量自定义",
    textarea: {
      width: 43
    },
  },
  {
    key: "measuresOne", //心电监护
    value: "",
    event: keyf1,
    name: "心电监护",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 心电监护
    }
  },
  {
    key: "measuresTwo", //中心静脉导管
    value: "",
    event: keyf1,
    name: "中心静脉导管",
    textarea: {
      width: 50
    },
    splice: true,
    autoComplete: {
      data: 中心静脉导管
    }
  },
  {
    key: "measuresThree", //伤口疼痛
    value: "",
    event: keyf1,
    name: "伤口疼痛",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 伤口疼痛
    }
  },
  {
    key: "measuresfour", //伤口敷料
    value: "",
    event: keyf1,
    name: "伤口敷料",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 伤口敷料
    }
  },
  {
    key: "measuresFive", //功能锻炼
    value: "",
    event: keyf1,
    name: "功能锻炼",
    textarea: {
      width: 50
    },
    splice: true,
    autoComplete: {
      data: 功能锻炼
    }
  },
  {
    key: "measuresFix", //静脉化疗
    value: "",
    event: keyf1,
    name: "静脉化疗",
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 静脉化疗
    }
  },
  {
    key: "measuresSeven", //标题1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
    },
  },
  {
    key: "measuresEight", //标题2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      width: 30
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
  {
    key: "sign2",
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
