/*
东莞谢岗 - 护理记录单
*/
import {
  multiDictInfo
} from "../../../api/index";
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
    key: "recordDate", //年份
    value: "",
    hidden:true
  },
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
    // click: click_time
  },
  {
    key: "temperature", //T
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "体温",
    next: "℃",
    textarea: {
      width: 35
    },
  },
  {
    key: "pulse", //P/HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 35
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 6),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "血压",
    next: "mmHg",
    textarea: {
      width: 50
    },
  },
  {
    key: "saO2", //SaO₂(%)
    value: "",
    event: keyf1,
    name: "SaO₂",
    next: "%",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "pupilSizeLeft", //瞳孔大小
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "瞳孔大小",
    next: "mm",
    textarea: {
      width: 35
    },
  },
  {
    key: "pupilReflexLeft", //对光反射
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "对光反射",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: ['+/+','+/-','+/±','-/+','-/-','-/±','±/+']
    },
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: {
      data: ['补液','食物','水','奶','其他']
    },
    textarea: {
      width: 65,
    }
  },
  {
    key: "foodSize", //入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量",
    next: "ml/g",
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 10),
    autoComplete: {
      data: ['阴道出血','术中出血','大便','心包','引流量','痰','呕吐物','其他','腹腔','胸液','胃管','胆管','腋下引流量','胸壁引流量','切口引流量','腹腔引流管','甲状腺窝引流管','颈前引流管','盆腔引流管','切口引流管','文氏引流管','胆囊床引流管','胆囊窝引流管','胆总管','T管','无形逝水量']
    },
    textarea: {
      width: 65,
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量",
    next: "ml/g",
    textarea: {
      width: 30
    },
  },
  {
    key: "feedingMode", //喂养方式
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "喂养方式",
    autoComplete: {
      data: ['自吮','鼻饲','口饲']
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "feedingType", //喂养种类
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "喂养种类",
    autoComplete: {
      data: ['母乳','奶','水','糖水','禁食']
    },
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
    autoComplete: {
      data: ['好','激惹','差']
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "cry", //哭声
    value: "",
    name: "哭声",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: {
      data: ['响','微弱']
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "sucking", //吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: {
      data: ['好','一般','差']
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "skin", //皮肤颜色
    value: "",
    name: "皮肤颜色",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: {
      data: ['红润','潮红','黄染','青紫','苍白','正常','微绀']
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "umbilical", //脐部情况
    value: "",
    name: "脐部情况",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: {
      data: ['脱痂','未脱痂','干洁','渗液','渗血','脐瘘','脐疝']
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "inhalation", //吸氧方式
    value: "",
    name: "吸氧方式",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: {
      data: ['鼻导管','头罩','箱内','机械通气','鼻塞CPAP']
    },
    textarea: {
      width: 35
    },
  },
  {
    key: "boxTemperature", //箱温
    value: "",
    name: "箱温",
    next: "℃",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "turnOver", //翻身
    value: "",
    name: "翻身",
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
  {
    key: "audit",
    value: ""
  },
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
    value: true,
  },
];

