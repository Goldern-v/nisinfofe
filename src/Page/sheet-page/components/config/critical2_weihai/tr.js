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
let taitou = ['','√']

const colors = [
  {value:"",label:""},
  {value:"淡黄色",label:"淡黄色"},
  {value:"深黄色",label:"深黄色"},
  {value:"褐色",label:"褐色"},
  {value:"黄绿色",label:"黄绿色"},
  {value:"墨绿色",label:"墨绿色"},
  {value:"咖啡色",label:"咖啡色"},
  {value:"黑色",label:"黑色"},
  {value:"淡红色血性",label:"淡红色血性"},
  {value:"暗红色血性",label:"暗红色血性"},
  {value:"新鲜血性",label:"新鲜血性"},
  {value:"陶土血性",label:"陶土血性"},
  {value:"澄清无色",label:"澄清无色"},
]
let outProject = [
  [{discharge:"尿",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"呕吐",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"大便",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"渗液",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"恶露",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"超滤量",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"透析量",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胃肠减压",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"腹腔引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"盆腔引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"隔下引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"负压引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"骶前引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"腹膜后引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"脑室引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"肛周引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"硬膜下引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"头部引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"颈前引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"腋窝引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"皮下引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"颈部引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"切口引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胸腔闭式引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胸腔引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"心包引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胸壁引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"心包胸骨后引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"纵隔引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胸骨后引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胆管引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"鼻胆管引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"肝脓肿引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"胰管引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"吻合口引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"左肾造痿引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"右肾造痿引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"膀胱造痿引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"输尿管支架管引流",unClear:true},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
  [{discharge:"",defaultInput:true,type:"textarea"},{dischargeSize:"",type:"input",needTarget:true},{outputColor:"",type:"select",option:colors}],
]
let outChoseItem = {
  th:[
    {title:"项目",colwidth:"30%"},
    {title:"量（ml）",colwidth:"30%"},
    {title:"颜色",colwidth:"40%"}
  ],
  dischargeType:"",
  outProject,
  maxLength:4,
  tableNum:5,
  sheetypeCode:['discharge','dischargeSize','outputColor']
}

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
    key: "heartrate", //心率
    value: "",
    event: keyf1,
    name:"心率"
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name:"脉搏"
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
    name: "瞳孔对光反应右1",
    autoComplete: {
      data: tongkongX
    },
  },
  {
    key: "pupilReflexRight2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "瞳孔对光反应右2",
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
    outChoseItem
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
    outChoseItem
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
    outChoseItem
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
