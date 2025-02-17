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
let NBPList = [];
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
      width: 30
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
    key: "cvp", //CVP
    value: "",
    name: "CVP",
    next: "mmHg",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "consciousness", //神志
    value: "",
    name: "神志",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
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
    key: "fieldSeventeen", //  生命体征自定义
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "ventilationMode", //通气模式
    value: "",
    name: "通气模式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "fio2", //Fio2
    value: "",
    name: "Fio2/Ti",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "vte", //VTE
    value: "",
    name: "VTE/呼吸频率",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "peep", //PEEP/PIP
    value: "",
    name: "PEEP/PIP",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "pmean", //pmean
    value: "",
    name: "Pmean",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "amplitude", //振幅
    value: "",
    name: "△P/振幅",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "oral", //A
    value: "",
    name: "口服类",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "antibiotics", //B
    value: "",
    name: "抗生素",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "rehydration", //C
    value: "",
    name: "补液",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "bloodProducts", //D
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
    key: "accumulated", //入量累计
    value: "",
    name: "入量累计",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "urinate", //尿/便
    value: "",
    name: "尿/便",
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
    key: "cumulative", //出量累计
    value: "",
    name: "出量累计",
    next: "ml",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "balance", //平衡量
    value: "",
    name: "平衡量",
    next: "ml",
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
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
    key: "careCustomField", //护理自定义
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
