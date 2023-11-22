import {
  listItem
} from "../../../api/recordDesc";
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
  click_time,
  click_cancel
} from "../keyEvent/date";

let UC = ["无","不规则",`30"`, `35"`,`40"`,`45"`] // 宫缩持续
let uterine_neck = ['未开','1','2','3','4','5','6','7','8','9','10','1指尖','容1指','1指松'] // 宫颈扩张
let high_low = ['S-3','S-2','S-1','S=0','S+3','S+2','S+1'] // 先露高低
let non_drug = ['分娩球','自由体位待产','分娩操','水疗','豆袋热敷','按摩'] // 非药物减痛方法
let UC_pause = [`2'`,`2'-3'`,`3'-4'`,`4'-5'`,`5'-6'`] // 宫缩间歇

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
    click: click_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "T",
    next: "℃",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "P",
    next: "次/min",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "breath", //心率
    value: "",
    event: keyf1,
    name: "HR",
    next: "次/min",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldFour",//R
    value: "",
    event: keyf1,
    name: "R",
    next: "次/min",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "BP",
    next: "mmHg",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    autoComplete: {
      data: ['清醒','浅昏迷','深昏迷','模糊','嗜睡','昏睡','谵妄']
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldSeven", //SP02%
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "%",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "food", // 入量内容
    value: "",
    event: keyf1,
    name: "入量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: ['饮水','输液','静脉泵入','静注','口服','输血','肌注','鼻饲']
    },
  },
  {
    key: "foodSize", // 入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "discharge", //出量内容
    value: "",
    event: keyf1,
    name: "出量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 45
    },
    autoComplete: {
      data: ['盆腔引流','肝下引流','胃管','尿管','膈下引流','脾窝引流','腹腔引流','胸腔引流','尿量','肠造口','呕吐物','大便','伤口皮下引流球','胃造瘘管','空肠造瘘','肛管引流','温氏孔引流管','胸腔闭式引流管','肾造瘘管','膀胱造瘘','肾周引流','输尿管导','伤口引流']
    },
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 25
    },
  },
  {
    key: "fieldFive", //出量颜色
    value: "",
    event: keyf1,
    name: "出量颜色",
    // autoComplete: {
    //   data: 出量颜色
    // },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 25
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldNine",
    value: "",
    event: keyf1,
    name: "胎方位",
    next: "",
    autoComplete: {
      data: ['LOA','LOT','LOP','ROA','ROT','ROP','LMA','RMA','LSA','RSA','LScA','RScA','LScp','RScp','横位']
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },

  {
    key: "fieldTen",
    value: "",
    event: keyf1,
    name: "胎心",
    next: "次/min",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldOne",
    value: "",
    event: keyf1,
    name: "无",
    next: "",
    // change: (e, td) => limitChange(e, td, 4),
    // textarea: {
    //   width: 43
    // },
    style: {
      width: '20px'
    },
    click: click_cancel
  },
  {
    key: "fieldEleven",
    value: "",
    event: keyf1,
    name: "强度",
    next: "",
    autoComplete: {
      data: ['无','偶有','不规则','弱','中','强']
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldTwelve",
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    change: (e, td) => limitChange(e, td, 6),
    // textarea: {
    //   width: 30
    // },
    style:{width:40},
    autoComplete: {
      data: UC
    },
  },
  {
    key: "fieldThirteen",
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: UC_pause
    },
  },
  {
    key: "fieldFourteen",
    value: "",
    event: keyf1,
    name: "胎动",
    next: "次/h",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldFifteen",
    value: "",
    event: keyf1,
    name: "宫颈扩张",
    next: "cm",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: uterine_neck
    },
  },
  {
    key: "fieldSixteen",
    value: "",
    event: keyf1,
    name: "先露高低",
    next: "cm",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: high_low
    },
  },
  {
    key: "fieldSeventeen",
    value: "",
    event: keyf1,
    name: "胎膜",
    next: "",
    autoComplete: {
      data: ['已破','未破']
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  // {
  //   key: "fieldEighteen",
  //   value: "",
  //   event: keyf1,
  //   name: "宫颈疼痛评分",
  //   next: "",
  //   change: (e, td) => limitChange(e, td, 4),
  //   textarea: {
  //     width: 43
  //   },
  // },
  // {
  //   key: "fieldNineteen",
  //   value: "",
  //   event: keyf1,
  //   name: "非药物减痛方法",
  //   next: "",
  //   change: (e, td) => limitChange(e, td, 4),
  //   textarea: {
  //     width: 43
  //   },
  //   autoComplete: {
  //     data: non_drug
  //   },
  // },
  {
    key: "fieldTwenty",
    value: "",
    event: keyf1,
    name: "膀胱充盈度",
    next: "",
    autoComplete: {
      data: ['不充盈','充盈','空虚']
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldTwentyOne",
    value: "",
    event: keyf1,
    name: "膝反射",
    next: "",
    autoComplete: {
      data: ['+','-']
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 20
    },
  },
  {
    key: "fieldTwentyTwo", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "fieldTwentyThree", //标题2
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
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "148px",
      background: "transparent"
    },
    textarea: {
      width: 148
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    },
  },
  { key: "sign", value: "" },//单签
  // { key: "sign2", value: "" },//双签
  // { key: "audit", value: "" },//审核签名
  { hidden:true, key:'id', value:''},
  { hidden:true, key:'signerName', value:''},
  { hidden:true, key:'signerName2', value:''},
  { hidden:true, key:'status', value:''},
  { hidden:true, key:'recordSource', value:''},
  { hidden:true, key:'recordYear', value:''},
  { hidden:true, key:'dataHash', value:''},
  { hidden:true, key:'recordDate', value:''},
  { hidden:true, key:'monthHour', value:''},
  { hidden:false, key:'signerNo', value:''},//单签
  { hidden:true, key:'signerNo2', value:''},//双签
  { hidden:false, key:'auditorNo', value:''},//审核签名
  { hidden:true, key:'auditorName', value:''},
  { hidden:true, key:'empNo', value:''},
  { hidden:true, key:'multiSign', value:''}
];

