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
    click: click_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "T",
    next: "℃",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 35
    },
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "P",
    next: "次/min",
    change: (e, td) => limitChange(e, td, 3),
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
    change: (e, td) => limitChange(e, td, 3),
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
    change: (e, td) => limitChange(e, td, 3),
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    // autoComplete: {
    //   data: 意识
    // },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
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
      width: 43
    },
  },
  {
    key: "food", // 入量内容
    value: "",
    event: keyf1,
    name: "入量内容",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62
    },
    // autoComplete: {
    //   data: 入量名称
    // },
    style: {
      textAlign: "left",
    }
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
      width: 62
    },
    // autoComplete: {
    //   data: 出量名称
    // },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
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
    change: (e, td) => limitChange(e, td, 3),
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },

  {
    key: "fieldTen", 
    value: "",
    event: keyf1,
    name: "胎心",
    next: "次/min",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldOne", 
    value: "",
    event: keyf1,
    name: "无",
    next: "",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldTwelve", 
    value: "",
    event: keyf1,
    name: "持续",
    next: "s",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldThirteen", 
    value: "",
    event: keyf1,
    name: "间歇",
    next: "min",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldFourteen", 
    value: "",
    event: keyf1,
    name: "胎动",
    next: "次/h",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldFifteen", 
    value: "",
    event: keyf1,
    name: "宫颈扩张",
    next: "cm",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldSixteen", 
    value: "",
    event: keyf1,
    name: "先露高低",
    next: "cm",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
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
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldEighteen", 
    value: "",
    event: keyf1,
    name: "宫颈疼痛评分",
    next: "",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldNineteen", 
    value: "",
    event: keyf1,
    name: "非药物减痛方法",
    next: "",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "fieldTwenty", 
    value: "",
    event: keyf1,
    name: "膀胱充盈度",
    next: "",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
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
      width: 43
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
    key: "fieldTwentyThree", //标题1
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
      width: "150px",
      background: "transparent"
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

