import {
  keyf1
} from "../keyEvent/f1.js";

import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
import info from "../sheetInfo";

let zdjnList = ['✓'];
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
    key: "arrange", //整理床单位
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "comb", //梳头
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "oralcare", //口腔护理
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "facialCleaning", //面部清洁
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "%",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "perinealCare", //会阴护理
    value: "",
    event: keyf1,
    name: "膀胱情况",
    next: "次/分",
    autoComplete: {
      data: zdjnList
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "foot_cleaning", //足部清洁
    value: "",
    event: keyf1,
    name: "指尖血糖",
    next: "mmol/L",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "assist", //协助进食
    value: "",
    event: keyf1,
    name: "阴道出血",
    next: "mL",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "cough", // 协助翻身
    value: "",
    event: keyf1,
    name: "入量内容",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "bedsideElevation", // 床头抬高
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "bedsore", //压疮预防
    value: "",
    event: keyf1,
    name: "出量内容",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "incontinence", //失禁护理
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "toilet", //床上使用便器
    value: "",
    event: keyf1,
    name: "出量颜色",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "indwelling", //留置导尿护理
    value: "",
    event: keyf1,
    name: "健康宣教",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "wipeBath", //床上温水擦浴
    value: "",
    event: keyf1,
    name: "健康宣教",
    textarea: {
      width: 43
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "functionalExercise", //功能锻炼
    value: "",
    event: keyf1,
    textarea: {
      width: 43,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "shampoo", //床上洗头
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "fingertoe", //趾甲护理
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
    
  },
  {
    key: "safetyManage", //患者安全
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "organIncision", //气管切开
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "trachealIntubation", //气管插管
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "ventilatorPipeline", //呼吸机管道
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "venousCatheter", //静脉导管
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "arterialCatheter", //动脉导管
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "nasogastric", //鼻胃管
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "drainage", //引流管
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "nasalFeeding", //鼻饲
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "elastic", //松紧约束
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "acralBlood", //肢端血运
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "urineBag", //尿袋
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "stomachTube", //胃管
    value: "",
    event: keyf1,
    textarea: {
      width: 40,
      maxLength: 4
    },
    autoComplete: {
      data: zdjnList
    },
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

