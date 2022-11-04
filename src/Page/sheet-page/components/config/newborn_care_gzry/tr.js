import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
let okList = ['√']
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
    event: event_time,
    click: click_time
  },
  {
    key: "temperature", //体温℃
    value: "",
    event: keyf1,
    name:'体温',
    textarea: {
      width: 31
    },
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1,
    name:'心率',
    textarea: {
      width: 31
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    }
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: keyf1,
    name:'血压',
    textarea: {
      width: 51
    }
  },
  {
    key: "spo2", //SPO2
    value: "",
    event: keyf1,
    name:'血氧饱和度',
    textarea: {
      width: 51
    }
  },
  {
    key: "thermostat", // 温箱/辐射台
    value: "",
    event: keyf1,
    textarea: {
      width: 91
    }
  },
  {
    key: "bloodSugar", // 血糖
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
  },
  {
    key: "reaction", // 反应
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['好', '差']
    },
  },
  {
    key: "cry", // 哭声
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['尖叫', '强', '弱', '呻吟']
    },
  },
  {
    key: "absorb", // 吸吮力
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['强', '中', '弱']
    },
  },
  {
    key: "complexion", // 面色
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['红润', '苍白', '青灰', '青紫', '黄染', '花斑']
    },
  },
  {
    key: "extremity", // 面色肢端
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['红润', '苍白', '青灰', '青紫', '黄染', '花斑']
    },
  },
  {
    key: "rhythm", //呼吸节律
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['规律', '不规律', '暂停']
    },
  },
  {
    key: "concave", // 二凹征
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['+', '-']
    },
  },
  {
    key: "bloating", // 腹胀
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['√', '-']
    },
  },
  {
    key: "vomit", // 呕吐
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['√', '-']
    },
  },
  {
    key: "convulsion", // 惊厥
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['√', '-']
    },
  },
  {
    key: "extremities", // 肢端温凉
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['√', '温', '凉']
    },
  },
  {
    key: "bathe", // 沐浴/擦澡
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['沐浴','擦澡']
    },
  },
  {
    key: "kyqtcare", // 口眼脐臀护理
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
    autoComplete: {
      data: ['√','口腔护理', '眼部护理', '脐部护理', '臀部护理']
    }
  },
  {
    key: "breastMilk", // 母乳
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    }
  },
  {
    key: "formulaMilk", //配方奶
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
  },
  {
    key: "stoolTraits", // 大便性状
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    }
  },
  {
    key: "urineTraits", // 小便性状
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    }
  },
  {
    key: "weight", // 体重kg
    value: "",
    event: keyf1,
    textarea: {
      width: 31
    },
  },
  {
    key: "description", //观察、措施及效果
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "300px",
      background: "transparent",
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
