/*
威县-新生儿科重症监护记录单
*/
import { multiDictInfo } from "../../../api/index";
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

  export default [  
  { 
    hidden: true, 
    key: 'recordDate', 
    value: '' 
    },
  { 
   key: "recordMonth", 
   event: event_date, 
   click: click_date, 
   value: ''
  },
  { 
   key: "recordHour", 
   event: event_time, 
   value: ''
  },
     {
      key: "temperature2", // 温度
      value: "",
      event: keyf1,
      name: "温度",
      next:"°C",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "humidity", // 湿度
      value: "",
      event: keyf1,
      name: "湿度",
      next:"%",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "temperature", // 体温
      value: "",
      event: keyf1,
      name: "体温",
      next:"°C",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "pulse", // 心率HR
      value: "",
      event: keyf1,
      name: "心率",
      next:"次／分",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "bloodPressure", // 血氧
      value: "",
      event: keyf1,
      name: "血氧",
      next:"%",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "breath", // 呼吸次／分
      value: "",
      event: keyf1,
      name: "呼吸",
      next:"次／分",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "tube", // 胃管cm
      value: "",
      event: keyf1,
      name: "胃管",
      next:"cm",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "airOfficerIntubation", // 气管插管cm
      value: "",
      event: keyf1,
      name: "气管插管",
      next:"cm",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "stuffyNose", // 鼻塞cpap
      value: "",
      event: keyf1,
      name: "鼻塞cpap",
      next:"cpap",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "airOfficerIntubation2", // 气管插管
      value: "",
      event: keyf1,
      name: "气管插管",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "nasalCatheter", // 鼻导管吸氧
      value: "",
      event: keyf1,
      name: "鼻导管吸氧",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "boxOxygen", // 箱内吸氧
      value: "",
      event: keyf1,
      name: "箱内吸氧",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "blue", // 蓝光
      value: "",
      event: keyf1,
      name: "蓝光",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "excessiveIntestinal", // 灌肠
      value: "",
      event: keyf1,
      name: "灌肠",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "medicineSleep", // 药眠
      value: "",
      event: keyf1,
      name: "药眠",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "primaryCare", // 基础护理
      value: "",
      event: keyf1,
      name: "基础护理",
      // change: (e, td) => limitChange(e, td, 6),
      autoComplete: {
        data: ['1','2','3','4','5']
      },
      splice:true,
      textarea: {
        width: 32
      },
     },
     {
      key: "skinColor", // 全身皮肤颜色
      value: "",
      event: keyf1,
      name: "全身皮肤颜色",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "skinConditions", // 全身皮肤状况
      value: "",
      event: keyf1,
      name: "全身皮肤状况",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7','8','9','10','11','12']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "atomization", // 雾化吸入
      value: "",
      event: keyf1,
      name: "雾化吸入",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "takeBack", // 拍背吸痰
      value: "",
      event: keyf1,
      name: "拍背吸痰",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "jaundice", // 经皮黄疸mg/dl
      value: "",
      event: keyf1,
      name: "经皮黄疸",
      next:"mg/dl",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "bloodSugar", //  血糖mmol/l
      value: "",
      event: keyf1,
      name: "血糖",
      next:"mmol/l",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "infusion", // 检查输液部位
      value: "",
      event: keyf1,
      name: "检查输液部位",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "fontanelle", // 前囟
      value: "",
      event: keyf1,
      name: "前囟",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "muscleTension", // 肌张力
      value: "",
      event: keyf1,
      name: "肌张力",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "suckingForce", // 吸吮力
      value: "",
      event: keyf1,
      name: "吸吮力",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "lungAuscultation", //  肺部听诊
      value: "",
      event: keyf1,
      name: " 肺部听诊",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "bowelSounds", // 肠鸣音次∕分
      value: "",
      event: keyf1,
      name: "肠鸣音",
      next:"次∕分",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
     {
      key: "crying", // 哭声
      value: "",
      event: keyf1,
      name: "哭声",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "threeConcave", // 三凹征
      value: "",
      event: keyf1,
      name: "三凹征",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "abdomen", // 腹部
      event: keyf1,
      name: "腹部",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "consciousness", // 意识状态
      event: keyf1,
      name: "意识状态",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "sputumNature", // 痰液性质
      event: keyf1,
      name: "痰液性质",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "sputumQuantity", // 痰液量
      event: keyf1,
      name: "痰液量",
      next:"ml",
      change: (e, td) => limitChange(e, td, 4),
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "vomitingNature", // 呕吐性质
      event: keyf1,
      name: "呕吐性质",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7','8','9','10']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "vomitingQuantity", // 呕吐量
      event: keyf1,
      name: "呕吐量",
      next:"ml",
      change: (e, td) => limitChange(e, td, 4),
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "drainageNature", // 呕胃内引流性质
      event: keyf1,
      name: "胃内引流性质",
      change: (e, td) => limitChange(e, td, 4),
      autoComplete: {
        data: ['1','2','3','4','5','6','7','8']
      },
      splice:true,
      textarea: {
      width: 32
      }
     },
     {
      key: "drainageQuantity", // 胃内引流量
      event: keyf1,
      name: "胃内引流量",
      next:"ml",
      change: (e, td) => limitChange(e, td, 4),
      textarea: {
      width: 32
      }
     },
    {
      hidden: true,
      key: "description", //特殊情况记录
      value: "",
      style: {
        textAlign: "left",
        position: "absolute",
        top: "1px",
        bottom: "1px",
        left: "1px",
        width: "240px",
        background: "transparent",
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
      value: true,
    },
  ];
  
