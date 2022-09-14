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

let 反应 = ['好','一般','差']
let 哭声 = ['大','一般','弱']
let 脐部 = ['红润','苍白','苍黄']
let 肌张力 = ['正常','稍高','稍低','高','低']
let 吸吮力 = ['好','一般','弱']
let 体位 = ['左侧','右侧','平卧','俯卧']
let 瞳孔 = ['1.5','2.0','2.5','3.0','3.5','4.0','4.5','5.0','+','±','-']
let 静脉 = ['输液','洗涤红细胞','悬浮红细胞','血浆','冷沉淀','PICC封管液']
let 进食 = ['配方奶鼻饲','配方奶自吮','母乳鼻饲','母乳自吮','口服药']
let 用氧方式 = ['鼻导管','头罩','温箱内','NCPAP(CPAP)','机械通气/CMV','机械通气/SIMV','机械通气/PRVC','机械通气/HFO']
let 气道 = ['WL','WT','YL','YWL','YT','YWT','B','BL','+','++','+++']
let 基础护理 = ['①','②','③','④','⑤','⑥','⑦']
let 名称=['输液','PICC冲管液','冷沉淀','新鲜血浆','悬浮红细胞','白蛋白','人免疫球蛋白','血小板','洗涤红细胞']
let 便颜色=['黄绿色','黄色','淡黄色','墨绿色','暗红色','鲜红色','淡红色','茶褐色']
let 口鼻腔=['WL','WT','YL','YWL','YT','YWT','B','BL','+','++','+++']

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
    key: "bloodPressure", //BP
    value: "",
    name: "BP",
    next: "mmHg",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 35
    },
  },

  {
    key: "afterSpo", //导管后Spo2
    value: "",
    name: "Spo2",
    next: "%",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
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
      data: 反应
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
      data: 哭声
    },
  },
  {
    key: "skin", //脐部
    value: "",
    name: "脐部",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 脐部
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
      data: 肌张力
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
    autoComplete: {
      data: 吸吮力
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
    autoComplete: {
      data: 体位
    },
  },
  {
    key: "pupilLeft", //瞳孔对光反射左
    value: "",
    name: "瞳孔（对光反射）左",
    next: "mm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    splice:'/',
    autoComplete: {
      data: 瞳孔
    },
  },
  {
    key: "pupilRight", //瞳孔对光反射右
    value: "",
    name: "瞳孔（对光反射）右",
    next: "mm",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    splice:'/',
    autoComplete: {
      data: 瞳孔
    },
  },
  {
    key: "inputName", //名称
    value: "",
    name: "名称",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 名称
    },
  },
  {
    key: "vein", //静脉
    value: "",
    name: "静脉",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 静脉
    },
  },
  {
    key: "eat", //进食
    value: "",
    name: "进食",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 进食
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
  },
  {
    key: "poopColor", //大便颜色
    value: "",
    name: "大便颜色",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 便颜色
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
    key: "peeColor", //小便颜色
    value: "",
    name: "小便颜色",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 便颜色
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
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
    autoComplete: {
      data: 用氧方式
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
    key: "airway", //气道
    value: "",
    name: "气道",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 60
    },
    splice:'/',
    autoComplete: {
      data: 气道
    },
  },
  {
    key: "nasal", //口鼻腔
    value: "",
    name: "口鼻腔",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 60
    },
    splice:'/',
    autoComplete: {
      data: 口鼻腔
    },
  },
  {
    key: "basicCare", //基础护理
    value: "",
    name: "基础护理",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 50
    },
    splice:'/',
    autoComplete: {
      data: 基础护理
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
