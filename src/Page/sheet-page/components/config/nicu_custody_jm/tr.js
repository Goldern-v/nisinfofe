/*
江门妇幼-NICU监护单
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
      width: 25
    },
  },
  {
    key: "boxCode", //台箱编号
    value: "",
    name: "台/箱编号",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 25
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
      width: 30
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
      width: 30
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
      width: 30
    },
  },
  {
    key: "nbp", //NBP/ABP
    value: "",
    name: "NBP/ABP",
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
    key: "spo2", //Spo2
    value: "",
    name: "Spo2",
    next: "%",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "reaction", //反应
    value: "",
    name: "反应",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
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
      width: 30
    },
    autoComplete: {
      data: ksList
    },
  },
  {
    key: "complexion", //肤色
    value: "",
    name: "肤色",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "muscleTension", //肌张力
    value: "",
    name: "肌张力",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: jzlList
    },
  },
  {
    key: "skinSurvey", //皮测
    value: "",
    name: "皮测",
    next: "Umol/L",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 50
    },
  },
  {
    key: "bloodSugar", //血糖
    value: "",
    name: "血糖",
    next: "Umol/L",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 50
    },
  },
  {
    key: "suckingPower", //吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: xylList
    },
  },
  {
    key: "oralMedication", //奶口服液
    value: "",
    name: "奶/口服液",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: kfyList
    },
  },
  {
    key: "infusion", //输液
    value: "",
    name: "输液",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "intravenousNutrition", //静脉营养
    value: "",
    name: "静脉营养",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "bloodProducts", //血制品
    value: "",
    name: "血制品",
    next: "ml",
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
    key: "urineVolume", //尿量
    value: "",
    name: "尿量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "defecate", //大便
    value: "",
    name: "大便",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "drainage", //引流量
    value: "",
    name: "引流量",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "vomit", //呕吐
    value: "",
    name: "呕吐",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "intCustomField1", //自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "intCustomField2", //自定义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "phototherapy", //光疗
    value: "",
    name: "光疗",
    next: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "atomization", //雾化
    value: "",
    name: "雾化",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "sputumSuction", //吸痰
    value: "",
    name: "吸痰",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    splice: true,
    textarea: {
      width: 50
    },
    autoComplete: {
      data: xtList
    },
  },
  {
    key: "posture", //体位
    value: "",
    name: "体位",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: twList
    },
  },
  {
    key: "skinCare", //皮肤护理
    value: "",
    name: "皮肤护理",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: pfhlList
    },
  },
  {
    key: "oralCare", //口腔护理
    value: "",
    name: "口腔护理",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "perineumCare", //会阴护理
    value: "",
    name: "会阴护理",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "oralImmunity", //口腔免疫
    value: "",
    name: "口腔免疫",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "customField1", //自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "customField2", //自定义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "customField3", //自定义3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "description", //特殊情况记录
    value: "",
    hidden: true,
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "180px",
      background: "transparent",
      fontSize: "14px"
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
