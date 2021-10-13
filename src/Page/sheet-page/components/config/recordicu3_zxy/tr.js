/*
南方中西医 - 重症监护病房护理记录单(表三)
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
let 入量名称 = [];
let 出量名称 = [];
let 意识 = ['(-)', '(+)', '(++)', '(+++)', '(△)', '(√)',];

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
    key: "sputumSuction", //吸痰
    value: "",
    event: keyf1,
    name: "吸痰",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "atomization", //雾化吸
    value: "",
    event: keyf1,
    name: "雾化吸",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "oralCavity", //口腔护
    value: "",
    event: keyf1,
    name: "口腔护",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "perineal", //会阴抹
    value: "",
    event: keyf1,
    name: "会阴抹",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "bedWipe", //床上擦
    value: "",
    event: keyf1,
    name: "床上擦",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "washHair", //床上洗头
    value: "",
    event: keyf1,
    name: "床上洗头",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "gastrointestinalDecompression", //胃肠减压
    value: "",
    event: keyf1,
    name: "胃肠减压",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "enema", //灌肠
    value: "",
    event: keyf1,
    name: "灌肠",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "catheterization", //导尿
    value: "",
    event: keyf1,
    name: "导尿",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "bladderIrrigation", //膀胱冲洗
    value: "",
    event: keyf1,
    name: "膀胱冲洗",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "helpEat", //协助进食
    value: "",
    event: keyf1,
    name: "协助进食",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "nasalFeeding", //鼻饲
    value: "",
    event: keyf1,
    name: "鼻饲",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "hyperthermia", //热疗
    value: "",
    event: keyf1,
    name: "热疗",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "iceBag", //冰袋
    value: "",
    event: keyf1,
    name: "冰袋",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "iceCap", //冰帽
    value: "",
    event: keyf1,
    name: "冰帽",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "coolingMachine", //降温机
    value: "",
    event: keyf1,
    name: "降温机",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "cannula", // 气管切开套管
    value: "",
    event: keyf1,
    name: "气管切开套管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "intubation", // 气管插管
    value: "",
    event: keyf1,
    name: "气管插管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "ventilatorDuct", // 呼吸机管道
    value: "",
    event: keyf1,
    name: "呼吸机管道",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "arterialDuct", // 动脉管道
    value: "",
    event: keyf1,
    name: "动脉管道",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "venousDuct", // 静脉管道
    value: "",
    event: keyf1,
    name: "静脉管道",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "nasogastricTube", // 鼻胃管
    value: "",
    event: keyf1,
    name: "鼻胃管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "nasoIntestinalCanal", // 鼻肠管
    value: "",
    event: keyf1,
    name: "鼻肠管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "woundDressing", // 伤口换药
    value: "",
    event: keyf1,
    name: "伤口换药",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "sputumProperties", // 痰液性质
    value: "",
    event: keyf1,
    name: "痰液性质",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "sputumVolume", // 痰液量
    value: "",
    event: keyf1,
    name: "痰液量",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "gastricUnobstructed", // 胃液通畅
    value: "",
    event: keyf1,
    name: "胃液通畅",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "gastricNature", // 胃液性质
    value: "",
    event: keyf1,
    name: "胃液性质",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "unobstructedUrine", // 尿液通畅
    value: "",
    event: keyf1,
    name: "尿液通畅",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "urineNature", // 尿液性质
    value: "",
    event: keyf1,
    name: "尿液性质",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "fluidPatency", // 引流液通畅
    value: "",
    event: keyf1,
    name: "引流液通畅",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "fluidNature", // 引流液性质
    value: "",
    event: keyf1,
    name: "引流液性质",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "arterialCannula", // 动脉监测套管
    value: "",
    event: keyf1,
    name: "动脉监测套管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "venousCannula", // 静脉监测套管
    value: "",
    event: keyf1,
    name: "静脉监测套管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "feedingTube", // 喂养泵管
    value: "",
    event: keyf1,
    name: "喂养泵管",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "drainageBag", // 引流袋
    value: "",
    event: keyf1,
    name: "引流袋",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "waterSealedBottle", // 水封瓶
    value: "",
    event: keyf1,
    name: "水封瓶",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "positionLeft", // 体位左
    value: "",
    event: keyf1,
    name: "体位左",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "positionMiddle", // 体位中
    value: "",
    event: keyf1,
    name: "体位中",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "positionRight", // 体位右
    value: "",
    event: keyf1,
    name: "体位右",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "skinIntegrity", // 完整
    value: "",
    event: keyf1,
    name: "完整",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "abnormalSkin", // 异常
    value: "",
    event: keyf1,
    name: "异常",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "airBed", // 气垫床
    value: "",
    event: keyf1,
    name: "气垫床",
    change: (e, td) => limitChange(e, td, 2),
    textarea: {
      width: 20
    },
  },
  {
    key: "healthEducation", // 健康教育
    value: "",
    event: keyf1,
    name: "健康教育",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "tubeCondition", // 管道情况
    value: "",
    event: keyf1,
    name: "管道情况",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
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

