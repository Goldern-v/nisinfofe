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
    name: "T",
    next: "℃",
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "HR",
    next: "次/分",
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "R",
    next: "次/分",
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name: "BP/ABP",
    next: "mmHg",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },
  {
    key: "cvp", //CVPcmH2O
    value: "",
    name: "CVP",
    next: "cmH2O",
    event: keyf1,
  },
  {
    key: "spo2", //SPO2
    value: "",
    name: "SPO2",
    next: "%",
    event: keyf1,
  },
  {
    key: "consciousness", //意识
    value: "",
    name: "意识",
    event: keyf1,
    autoComplete: {
      data: ["清醒", "嗜睡", "浅昏迷", "昏迷", "醒状昏迷", "睁眼昏迷"]
    },
  },
  {
    key: "pupilSizeLeft", // 瞳孔-左
    value: "",
    name: "瞳孔-左",
    next: "mm",
    event: keyf1,
    textarea: {
      width: 30
    },
    autoComplete: {
      data: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "散大", "眼疾", "椭圆", "白内障"]
    }
  },
  {
    key: "pupilSizeRight", // 瞳孔-右
    value: "",
    name: "瞳孔-右",
    next: "mm",
    event: keyf1,
    textarea: {
      width: 30
    },
    autoComplete: {
      data: ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "散大", "眼疾", "椭圆", "白内障"]
    }
  },
  {
    key: "pupilReflexLeft", // 瞳孔-对光反射左
    value: "",
    name: "对光反射左",
    event: keyf1,
    textarea: {
      width: 30
    },
    autoComplete: {
      data: ["灵敏", "迟钝", "消失", "眼疾", "椭圆", "白内障"]
    }
  },
  {
    key: "pupilReflexRight", // 瞳孔-对光反射右
    value: "",
    name: "对光反射右",
    event: keyf1,
    textarea: {
      width: 30
    },
    autoComplete: {
      data: ["灵敏", "迟钝", "消失", "眼疾", "椭圆", "白内障"]
    }
  },
  {
    key: "fieldOne", // 机械通气-呼吸模式
    value: "",
    name: "呼吸模式",
    event: keyf1,
    autoComplete: {
      data: ["SIMV", "PSV", "ASB", "IPPV", "BIPAP", "PC", "VC", "A/C"]
    }
  },
  {
    key: "fio2", // 机械通气-FiO2
    value: "",
    name: "FiO2",
    next: "%",
    event: keyf1
  },
  {
    key: "fieldTwo", // 机械通气-f
    value: "",
    name: "f",
    next: "次/分",
    event: keyf1
  },
  {
    key: "fieldThree", // 机械通气-插管深度
    value: "",
    name: "插管深度",
    next: "cm",
    event: keyf1
  },
  {
    key: "food", //入
    value: "",
    name: "入量名称",
    event: keyf1,
    textarea: {
      width: 68
    },
    autoComplete: {
      data: ["营养汤", "米汤", "果汁", "温开水", "糌粑", "稀饭", "馒头"]
    }
  },
  {
    key: "foodSize", //入量
    value: "",
    name: "入量",
    next: "ml",
    event: keyf1
  },
  {
    key: "discharge", //排出物
    value: "",
    name: "出量名称",
    event: keyf1,
    textarea: {
      width: 60
    },
  },
  {
    key: "dischargeSize", //排出物数量
    value: "",
    name: "出量",
    next: "ml",
    event: keyf1
  },
  {
    key: "fieldFour", //出量-颜色性状
    value: "",
    name: "颜色性状",
    event: keyf1
  },
  {
    key: "fieldFive", //静脉置管
    value: "",
    name: "静脉置管",
    event: keyf1,
  },
  {
    key: "fieldSix", //卧位
    value: "",
    name: "卧位",
    event: keyf1,
  },
  {
    key: "fieldSeven", //受压皮肤
    value: "",
    name: "受压皮肤",
    event: keyf1,
  },
  {
    key: "fieldNine", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "fieldEight", //护理措施
    value: "",
    name: "护理措施",
    event: keyf1,
    textarea: {
      width: 36
    },
    autoComplete: {
      data: ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"]
    }
  },
  {
    key: "description", //其他
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "360px",
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
