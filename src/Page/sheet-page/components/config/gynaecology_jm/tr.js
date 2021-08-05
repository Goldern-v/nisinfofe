import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
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
    event: event_time,
    click: click_time
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
  {
    key: "postOutputOne", // 尿管
    value: "",
    event: keyf1,
    name: "宫口扩张",
    next: "cm",
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputTwo", //胸壁
    value: "",
    event: keyf1,
    name: "先露",
    textarea: {
      width: 43
    },
  },
  {
    key: "postOutputThree", //腋窝
    value: "",
    event: keyf1,
    name: "先露",
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
  },
  {
    key: "measuresThree", //留置镇痛泵
    value: "",
    event: keyf1,
    name: "排尿情况",
    textarea: {
      width: 50
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
  },
  {
    key: "measuresEight", //功能锻炼
    value: "",
    event: keyf1,
    name: "基础护理",
    textarea: {
      width: 50
    },
  },
  {
    key: "measuresNine", //标题1
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
    key: "measuresTen", //标题2
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
