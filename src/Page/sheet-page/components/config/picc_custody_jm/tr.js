/*
江门妇幼-PICU监护单
 */
import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1, limitChange } from "../keyEvent/f1.js";
import { event_date, event_time, click_date, click_time } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let NBPList = ["NBP","ABP"];
let xzpList = ["悬浮红细胞","洗涤红细胞","血浆","冷沉淀"];
let twList = ["左","右","平","俯"];

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
    key: "boxTemperature", //台箱温度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "temperature", //体温
    value: "",
    name: "体温",
    next: "℃",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "pulse", //心率
    value: "",
    name: "心率",
    next: "次/分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    name: "呼吸",
    next: "次/分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "nbp", //NBP/ABP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: NBPList
    },
  },
  {
    key: "spo2", //Spo2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "cvp", //CVP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "consciousness", //神志
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "complexion", //肤色
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "posture", //体位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: twList
    },
  },
  {
    key: "customField", //  生命体征自定义
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "ventilationMode", //通气模式
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "fio2", //Fio2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "vte", //VTE
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "peep", //PEEP/PIP
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "pmean", //pmean
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "amplitude", //振幅
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 45
    },
  },
  {
    key: "oral", //A
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "antibiotics", //B
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "rehydration", //C
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "bloodProducts", //D
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
    autoComplete: {
      data: xzpList
    },
  },
  {
    key: "intCustomField1", //自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "intCustomField2", //自定义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "urinate", //尿/便
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "drainage", //引流量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  // {
  //   key: "balance", //平衡量
  //   value: "",
  //   event: keyf1,
  //   change: (e, td) => limitChange(e, td, 4),
  //   textarea: {
  //     width: 35
  //   },
  // },
  {
    key: "atomization", //雾化
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "sputumSuction", //吸痰
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "skinCare", //皮肤护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "oralCare", //口腔护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "perineumCare", //会阴护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "careCustomField", //护理自定义
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
