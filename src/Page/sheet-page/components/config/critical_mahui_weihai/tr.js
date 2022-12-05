// 胎心记录单
import { keyf1 } from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

const zdjnList = ["✓"];
export default [
  {
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
    key: "oralCare",
    value: "",
    event: keyf1,
    name: "口腔护理/会阴护理",
    next: "",
    textarea: {
      width: 32
    },
    autoComplete: {
      data: zdjnList
    }
  },
  {
    key: "rollOver",
    value: "",
    event: keyf1,
    name: "翻身/扣背",
    next: "",
    textarea: {
      width: 32
    },
    autoComplete: {
      data: zdjnList
    }
  },
  {
    key: "skinCare",
    value: "",
    event: keyf1,
    name: "皮肤护理",
    next: "",
    textarea: {
      width: 32
    },
    autoComplete: {
      data: zdjnList
    }
  },
  {
    key: "sputum",
    value: "",
    event: keyf1,
    name: "吸痰",
    next: "",
    textarea: {
      width: 32
    },
    autoComplete: {
      data: zdjnList
    }
  },
  {
    key: "sputumColor",
    value: "",
    event: keyf1,
    name: "颜色",
    next: "",
    autoComplete: {
      data: ["血色", "白色", "黄色", "绿色"]
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "sputumCharacter",
    value: "",
    event: keyf1,
    name: "性状",
    next: "",
    autoComplete: {
      data: ["粘稠", "稀薄"]
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "sputumNum",
    value: "",
    event: keyf1,
    name: "量",
    next: "",
    autoComplete: {
      data: ["少量", "中量", "大量"]
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "arteriovenousName",
    value: "",
    event: keyf1,
    name: "动静脉置管名称",
    next: "",
    textarea: {
      width: 32
    }
  },
  {
    key: "arteriovenousExtent",
    value: "",
    event: keyf1,
    name: "动静脉置管长度",
    next: "",
    textarea: {
      width: 32
    }
  },
  {
    key: "arteriovenousCare",
    value: "",
    event: keyf1,
    name: "动静脉置管护理/通畅",
    next: "",
    autoComplete: {
      data: zdjnList
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "drainageTubeName",
    value: "",
    event: keyf1,
    name: "引流管名称",
    next: "",
    textarea: {
      width: 32
    }
  },
  {
    key: "drainageTubeColor",
    value: "",
    event: keyf1,
    name: "引流管颜色",
    next: "",
    autoComplete: {
      data: [
        "鲜红色",
        "暗红色",
        "淡红色",
        "淡黄色",
        "深黄色",
        "黄绿色",
        "黄褐色",
        "黑色",
        "无色"
      ]
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "drainageTubeCare",
    value: "",
    event: keyf1,
    name: "引流管护理/通畅",
    next: "",
    autoComplete: {
      data: zdjnList
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "urineColor",
    value: "",
    event: keyf1,
    name: "尿液颜色",
    next: "",
    autoComplete: {
      data: [
        "鲜红色",
        "暗红色",
        "淡红色",
        "淡黄色",
        "深黄色",
        "黄绿色",
        "黄褐色",
        "黑色",
        "无色"
      ]
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "urineCare",
    value: "",
    event: keyf1,
    name: "尿管护理/通畅",
    next: "",
    autoComplete: {
      data: zdjnList
    },
    textarea: {
      width: 32
    }
  },
  {
    key: "medication",
    value: "",
    event: keyf1,
    name: "用药情况",
    next: ""
  },

  {
    key: "description", //备注
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "240px",
      background: "transparent"
    },
    event: function(e, td) {
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
    value: false
  }
];
