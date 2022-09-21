/*
东莞谢岗 - 产后护理记录单
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
let 入量名称 = ['补液', '食物', '水', '奶', '其他'];
let 出量名称 = ['阴道出血', '术中出血', '便', '心包', '引流量', '痰', '呕吐物', '其他', '腹腔', '胸液', '胃管', '胆管', '尿', '腋下引流量', '胸壁引流量', '切口引流量', '腹腔引流管', '甲状腺窝引流管', '颈前引流管', '盆腔引流管', '切口引流管', '文氏引流管', '胆囊床引流管', '胆囊窝引流管', '胆总管', 'T管', '无形逝水量'];
let 子宫收缩= ['硬', '软', '欠佳']
let 宫底高度= ['U+1', 'U+2',' U=0', 'U-1', 'U-2', 'U-3'] 
let 恶露= ['正常', '血性', '浆液']
let 质地= ['胀', '软', '硬结']
let 乳量= ['少', '中', '多', '无']
let 会阴= ['I°', '侧切', '(-)']
let 腹部= ['(-)']
let 尿管= ['通畅', '拔除', '脱落', '尿潴留']
let PCA泵= ['通畅', '拔除', '脱落']

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
      width: 45
    },
  },
  {
    key: "pulse", //P/HR
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "脉搏",
    next: "次/分",
    textarea: {
      width: 45
    },
  },
  {
    key: "breath", //R
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 45
    },
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "SPO2",
    next: "%",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "contractions", //子宫收缩
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "子宫收缩",
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 子宫收缩
    },
  },
  {
    key: "fundus", //宫底高度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "宫底高度",
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 宫底高度
    },
  },
  {
    key: "lochia", //恶露
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "恶露",
    next: "ml",
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 恶露
    },
  },
  {
    key: "texture", //质地
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "质地",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 质地
    },
  },
  {
    key: "volume", //乳量
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "乳量",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 乳量
    },
  },
  {
    key: "perineum", //会阴
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "会阴",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 会阴
    },
  },
  {
    key: "abdomen", //腹部
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "腹部",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 腹部
    },
  },
  {
    key: "pump", //pca泵
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "PCA泵",
    textarea: {
      width: 45
    },
    autoComplete: {
      data: PCA泵
    },
  },
  {
    key: "urinary", //尿管
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "尿管",
    textarea: {
      width: 45
    },
    autoComplete: {
      data: 尿管
    },
  },
  {
    key: "food", //入量名称
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75,
    },
    autoComplete: {
      data: 入量名称
    },
  },
  {
    key: "foodSize", //入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "入量",
    next: "ml",
    textarea: {
      width: 30
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 75,
    },
    autoComplete: {
      data: 出量名称
    }
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "出量",
    next: "ml",
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

