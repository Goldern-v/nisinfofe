/*
花都-NICU监护单
 */
import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1, limitChange } from "../keyEvent/f1.js";
import { event_date, event_time, click_date, click_time } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let NBPList = [];
let xzpList = ["悬浮红细胞","洗涤红细胞","血浆","冷沉淀"];
let twList = ["左","右","平","俯"];
let kfyList = ["母乳","配方奶","早产奶","奶","口服药"];
let pfhlList = ["油浴","沐浴","床上浴"];
let xylList = ["差","一般","好"];
let fyList = ['好','差','一般'];
let ksList = ['好','稍弱','弱','嘶哑'];
let jzlList = ['稍低','低下','正常'];
let xtList = ['气道中','气道少','气道多','口腔少','口腔中','口腔多'];

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
  },
  {
    key: "boxTemperature", //台箱温度
    value: "",
    name: "台/箱温度",
    next: "℃",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
      width: 35
    },
  },
  {
    key: "heartRate", //心率
    value: "",
    name: "心率",
    next: "次/分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
      width: 35
    },
  },
  {
    key: "nbp", //NBP
    value: "",
    name: "NBP",
    next: "mmHg",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: NBPList
    },
  },
  {
    key: "abp", //ABP
    value: "",
    name: "ABP",
    next: "mmHg",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: NBPList
    },
  },
  {
    key: "beforeSpo", //导管前Spo2
    value: "",
    name: "导管前Spo2",
    next: "%",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "afterSpo", //导管后Spo2
    value: "",
    name: "导管后Spo2",
    next: "%",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "paco2", //PaCO2
    value: "",
    name: "PaCO2",
    next: "mmHg",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 5),
    textarea: {
      width: 40
    },
  },
  {
    key: "reaction", //反应
    value: "",
    name: "反应",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: fyList
    },
  },
  {
    key: "cry", //哭声
    value: "",
    name: "哭声",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: ksList
    },
  },
  {
    key: "skin", //肤色
    value: "",
    name: "肤色",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "tension", //肌张力
    value: "",
    name: "肌张力",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: jzlList
    },
  },
  {
    key: "sucking", //吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 35
    },
  },
  {
    key: "position", //体位
    value: "",
    name: "体位",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 35
    },
  },
  {
    key: "pupilLeft", //瞳孔左
    value: "",
    name: "瞳孔左",
    next: "mm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: xylList
    },
  },
  {
    key: "pupilRight", //瞳孔右
    value: "",
    name: "瞳孔右",
    next: "mm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: kfyList
    },
  },
  {
    key: "vein", //静脉
    value: "",
    name: "静脉",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "eat", //进食
    value: "",
    name: "进食",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "quantity", //量
    value: "",
    name: "入量量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: xzpList
    },
  },
  {
    key: "poop", //大便
    value: "",
    name: "大便",
    next: "g",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "pee", //小便
    value: "",
    name: "小便",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "exsanguinate", //抽血
    value: "",
    name: "抽血",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "drainage", //胃肠引流
    value: "",
    name: "胃肠引流",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "outPutCustomization1", //自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "oxygen", //方式
    value: "",
    name: "方式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "flow", //流量
    value: "",
    name: "流量",
    next: "L/分",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "concentration", //氧浓度
    value: "",
    name: "氧浓度",
    next: "%",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "intubation", //插管型号
    value: "",
    name: "插管型号",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    splice: true,
    textarea: {
      width: 35
    },
    autoComplete: {
      data: xtList
    },
  },
  {
    key: "depth", //插管深度
    value: "",
    name: "插管深度",
    next: "cm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: twList
    },
  },
  {
    key: "atomization", //雾化
    value: "",
    name: "雾化",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: pfhlList
    },
  },
  {
    key: "airway", //气道
    value: "",
    name: "气道",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "nasal", //口鼻腔
    value: "",
    name: "口鼻腔",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "basicCare", //基础护理
    value: "",
    name: "基础护理",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "trace", //微量血糖
    value: "",
    name: "微量血糖",
    next: "mmol/L",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "custom1", //自定义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
      width: "150px",
      background: "transparent",
    },
    textarea: {
      width: 150
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
