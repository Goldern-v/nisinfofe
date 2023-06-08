import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let ysList = ['昏迷', '清醒', '嗜睡', '模糊','昏睡','未醒','镇静','麻醉未醒','昏迷镇静']
let xinlv = ['窦性', '房颤', '房扑', '逸搏', '停搏','室上速','室速','室颤','起搏','交界性']
let tongkongX = ['5','4.5','4','3.5','3','2.5','2','1.5','1']
let tongkongR = ['+','-','±']
let tongqi = ['SIMV','PCV ','VCV','PS/CPAP','PRVC','NIVPS','S/T','IPPV','CPAP','鼻导管']
let huxiyin = ['粗','清 ','低','痰鸣音','湿啰音','干啰音']
let wowei = ['平卧','左侧 ','右侧','头低足高']
let taitou = ['√']
// le i = ''
export default [
  {
    hidden: true,
    key: "recordDate",
    value: ""
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
    click: click_time
  },
  {
    key: "temperature", //体温-数值
    value: "",
    event: keyf1,
    name: "体温"
  },
  {
    key: "pulse", //脉搏/心率
    value: "",
    event: keyf1,
    name:"脉搏/心率"
  },
  {
    key: "heartRhythm", //呼吸 次/min
    value: "",
    event: keyf1,
    name: "心律",
    autoComplete: {
      data: xinlv
    },
  },
  {
    key: "breath", //呼吸 次/min
    value: "",
    event: keyf1,
    name: "呼吸 次/分"
  },
  {
    key: "bloodPressure", //血压(mmHg)
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    textarea: {
      minWidth: 48
    },
    style: {
      'line-height': '30px'
    },
    name: "血压(mmHg)"
  },
  {
    key: "spo2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "SPO2（%）"
  },
  {
    key: "cvp", // SPO2（%）
    value: "",
    event: keyf1,
    name: "CVP"
  },
  {
    key: "consciousness", // SPO2（%）
    value: "",
    event: keyf1,
    name: "意识",
    autoComplete: {
      data: ysList
    },
    textarea: {
      width: 25
    },
  },
  {
    key: "gcs", // SPO2（%）
    value: "",
    event: keyf1,
    name: "GCS",
    textarea: {
      width: 30
    },
  },
  {
    key: "pupilReflexLeft1", // SPO2（%）
    value: "",
    event: keyf1,
    name: "瞳孔对光反应左1",
    autoComplete: {
      data: tongkongX
    },
  },
  {
    key: "pupilReflexLeft2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "瞳孔对光反应左2",
    autoComplete: {
      data: tongkongR
    },
  },
  {
    key: "pupilReflexRight1", // SPO2（%）
    value: "",
    event: keyf1,
    name: "瞳孔对光反应左1",
    autoComplete: {
      data: tongkongX
    },
  },
  {
    key: "pupilReflexRight2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "瞳孔对光反应左2",
    autoComplete: {
      data: tongkongR
    },
  },
  {
    key: "food", // SPO2（%）
    value: "",
    event: keyf1,
    name: "入量",
    textarea: {
      width: 160
    },
    outFixedList:true,
    style:{"text-align":"left"}
  },
  {
    key: "foodSize", // SPO2（%）
    value: "",
    event: keyf1,
    name: "入量（单位ml）",
    textarea: {
      width: 40
    },
    statBottomLine:true,
    outFixedList:true,
  },
  {
    key: "discharge", // SPO2（%）
    value: "",
    event: keyf1,
    name: "排出物",
    textarea: {
      width: 50
    },
    style:{"text-align":"left"},
    outFixedList:true,
  },
  {
    key: "dischargeSize", // SPO2（%）
    value: "",
    event: keyf1,
    name: "排出物数量（单位ml）",
    textarea: {
      width: 40
    },
    statBottomLine:true,
    outFixedList:true,
  },
  {
    key: "outputColor", // SPO2（%）
    value: "",
    event: keyf1,
    name: "颜色",
    textarea: {
      width: 30
    },
    outFixedList:true,
  },
  {
    key: "breathWay", // SPO2（%）
    value: "",
    event: keyf1,
    name: "通气方式",
    autoComplete: {
      data: tongqi
    },
  },
  {
    key: "fio2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "FiO2"
  },
  {
    key: "vit", // SPO2（%）
    value: "",
    event: keyf1,
    name: "Vti/Vte(ml)"
  },
  {
    key: "peep", // SPO2（%）
    value: "",
    event: keyf1,
    name: "P+PEEP/Ppeak(cmH2O)"
  },
  {
    key: "depth", // SPO2（%）
    value: "",
    event: keyf1,
    name: "气管插管深度"
  },
  {
    key: "bagPressure", // SPO2（%）
    value: "",
    event: keyf1,
    name: "气囊压力"
  },
  {
    key: "breathVoice1", // SPO2（%）
    value: "",
    event: keyf1,
    name: "呼吸音左",
    autoComplete: {
      data: huxiyin
    },
  },
  {
    key: "breathVoice2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "呼吸音右",
    autoComplete: {
      data: huxiyin
    },
  },
  {
    key: "rass", // SPO2（%）
    value: "",
    event: keyf1,
    name: "RASS/NEWS"
  },
  {
    key: "cpot", // SPO2（%）
    value: "",
    event: keyf1,
    name: "CPOT/NRS"
  },
  {
    key: "braden", // SPO2（%）
    value: "",
    event: keyf1,
    name: "Braden/UEX"
  },
  {
    key: "caprini", // SPO2（%）
    value: "",
    event: keyf1,
    name: "Caprini"
  },
  {
    key: "raiseBedside", // SPO2（%）
    value: "",
    event: keyf1,
    name: "床头抬高",
    autoComplete: {
      data: taitou
    },
  },
  {
    key: "recumbentPosition", // SPO2（%）
    value: "",
    event: keyf1,
    name: "卧位",
    autoComplete: {
      data: wowei
    },
    textarea: {
      width: 25
    },
  },
  {
    key: "measures", // SPO2（%）
    value: "",
    event: keyf1,
    name: "护理措施",
    textarea: {
      width: 90
    },
    outFixedList:true,
  },
  {
    key: "description", //护理记录
    value: "",
    textarea: {
      width: 250
    },
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      minWidth: "120px",
      background: "transparent"
    },
    // event: function (e, td) {
    //   console.log(e.keyCode);
    //   if (e.keyCode == 9) {
    //     td.value = "    " + td.value;
    //     e.preventDefault();
    //   }
    //   keyf1(e, td);
    // }
  },
  {
    key: "sign",
    value: "",
    style: {
      minWidth: '55px'
    }
  },
  // {
  //   key: "sign2",
  //   value: "",
  //   style: {
  //     minWidth: '55px'
  //   }
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
  // {
  //   hidden: true,
  //   key: "signerName2",
  //   value: ""
  // },
  {
    hidden: true,
    key: "expand2",
    value: ""
  },
  {
    hidden: true,
    key: "expand",
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
    value: "",
    onlyTdredText:true
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
    key: "monthHour",
    value: ""
  },
  {
    hidden: false,
    key: "signerNo",
    value: ""
  },
  // {
  //   hidden: true,
  //   key: "signerNo2",
  //   value: ""
  // },
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
