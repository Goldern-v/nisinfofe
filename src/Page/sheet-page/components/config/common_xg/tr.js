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
let 入量名称 = ['补液', '食物', '水', '奶', '其他'];
let 对光反射 = ['+/+', ' +/-', '+/±', '-/+', '-/-', '-/±', '±/+', '±/-', '±/±'];
let 出量名称 = ['阴道出血', '术中出血', '便', '心包', '引流量', '痰', '呕吐物', '其他', '腹腔', '胸液', '胃管', '胆管', '尿', '腋下引流量', '胸壁引流量', '切口引流量', '腹腔引流管', '甲状腺窝引流管', '颈前引流管', '盆腔引流管', '切口引流管', '文氏引流管', '胆囊床引流管', '胆囊窝引流管', '胆总管', 'T管', '无形逝水量'];
let 意识 = ['清醒', '嗜睡', '模糊', '昏睡', '浅昏迷', '中昏迷', '深昏迷', '谵妄'];

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
      width: 27
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
      width: 45
    },
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "SPO₂",
    next: "%",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "意识",
    autoComplete: {
      data: 意识
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "pupilSizeLeft", //瞳孔大小
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "瞳孔大小",
    next: "mm",
    textarea: {
      width: 40
    },
  },
  {
    key: "pupilReflexLeft", //对光反射
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "对光反射",
    textarea: {
      width: 40
    },
    autoComplete: {
      data: 对光反射
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
    next: "ml/g",
    textarea: {
      width: 35
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
    next: "ml/g",
    textarea: {
      width: 35
    },
  },
  {
    key: "healthEducation", //健康宣教
    value: "",
    name: "健康宣教",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 12),
    textarea: {
      width: 50
    },
  },
  {
    key: "affectedLimb", //患肢感觉/活动
    value: "",
    name: "患肢感觉/活动",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 65
    },
  },
  {
    key: "customItem1", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "customItem2", //标题2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "customItem3", //标题3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "customItem4", //标题4
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
    },
  },
  {
    key: "customItem5", //标题5
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 45
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

