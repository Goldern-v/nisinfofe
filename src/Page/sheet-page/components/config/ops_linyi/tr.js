import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let dglx = [{name: 'A氧气管', value: 'A'},{name: 'B导尿管', value: 'B'},{name: 'C胃管', value: 'C'},{name: 'D鼻肠管', value: 'D'},{name: 'E刀口引流管', value: 'E'},{name: 'F切口引流管', value: 'F'},{name: 'G VSD引流管', value: 'G'},{name: 'H腹腔引流管', value: 'H'},{name: 'I盆腔引流管', value: 'I'},{name: 'J肾床引流管', value: 'J'},{name: 'K膀胱冲洗引流管', value: 'K'},{name: 'L肾造瘘管', value: 'L'},{name: 'M肛门支管', value: 'M'},{name: 'N双J管', value: 'N'},{name: 'O骶前引流管', value: 'O'},{name: 'P腋下引流管', value: 'P'},{name: 'Q胸骨旁引流管', value: 'Q'},{name: 'R气管插管', value: 'R'},{name: 'S气管切开', value: 'S'},{name: 'T胸腔引流管', value: 'T'},{name: 'U脑室引流管', value: 'U'},{name: 'V血肿腔引流管', value: 'V'},{name: 'W硬膜外引流管', value: 'W'},{name: 'X硬膜下引流管', value: 'X'},{name: 'Y创腔引流管', value: 'Y'},{name: 'Z股动脉鞘管', value: 'Z'},{name: 'ZA胰岛素泵管', value: 'ZA'},{name: 'ZB胰管', value: 'ZB'},{name: 'ZC胆管鼻肠管', value: 'ZC'},{name: 'ZD VAC引流管', value: 'ZD'},{name: 'ZE心包引流管', value: 'ZE'},{name: 'ZF纵膈引流管', value: 'ZF'},{name: 'ZG T型管', value: 'ZG'},{name: 'ZH肝下引流管', value: 'ZH'},{name: 'ZI静脉置管', value: 'ZI'},{name: 'ZJ造瘘管', value: 'ZJ'}]
let dgqk = ['1.在位通畅', '2.滑脱', '3.堵塞']
let ys = ['1.淡黄', '2.淡红', '3.鲜红', '4.暗红', '5.浅褐', '6.咖啡', '7.墨绿']
let cl = ['1.更换', '2.夹管', '3.置管', '4.封管', '5.拔管', '6.更换引流袋', '7.更换敷贴']

export default [{
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
  // {
  //   key: "consciousness", //意识
  //   value: "",
  //   event: keyf1,
  //   name:"意识",
  //   autoComplete: {
  //     data: ['清醒', '嗜睡', '昏睡', '模糊', '谵妄', '浅昏迷', '昏迷', '深昏迷','冬眠状态','麻醉未醒','镇静状态']
  //   },
  //   textarea: {
  //     width: 40
  //   },
  // },
  // {
  //   key: "pupilLeft", //左(mm)
  //   value: "",
  //   event: keyf1,
  //   name:"左",
  //   next:"mm",
  //   textarea: {
  //     width: 32
  //   },
  // },
  // {
  //   key: "pupilRight", //右(mm)
  //   value: "",
  //   event: keyf1,
  //   name:"右",
  //   next:"mm",
  //   textarea: {
  //     width: 32
  //   },
  // },
  // {
  //   key: "pupilReflect", //光反射
  //   value: "",
  //   name:"对光反射",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ['++','+','-']
  //   },
  // },
  {
    key: "temperature", //体温
    value: "",
    name:"体温",
    next:"(°C)",
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    name:"脉搏",
    next:"（次/分）",
    event: keyf1,
  },
  {
    key: "heartRate", //心率
    value: "",
    name:"心率",
    next:"（次/分）",
    event: keyf1,
  },
  {
    key: "breath", //呼吸
    value: "",
    name:"呼吸",
    next:"（次/分）",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name:"血压",
    next:"mmHg",
    event: keyf1,
  },
  {
    key: "spo2", //SPO2
    value: "",
    name:"SPO₂",
    next:"(%)",
    event: keyf1,
  },
  {
    key: "pupil", //瞳孔直径
    value: "",
    name:"瞳孔直径",
    next:"(mm)",
    event: keyf1,
  },
  {
    key: "pupilResponce", //瞳孔反应
    value: "",
    name:"瞳孔反应",
    event: keyf1,
  },
  {
    key: "oxygen", //吸氧
    value: "",
    name:"吸氧",
    next:"(L/min)",
    event: keyf1,
  },
  {
    key: "diet", //饮食
    value: "",
    name:"饮食",
    event: keyf1,
  },
  {
    key: "preoperative", //术前准备
    value: "",
    name:"术前准备",
    event: keyf1,
  },
  {
    key: "healthEdu", //健康教育
    value: "",
    name:"健康教育",
    event: keyf1,
  },
  {
    key: "woundDress", //伤口辅料
    value: "",
    name:"伤口辅料",
    event: keyf1,
  },
  {
    key: "sleep", //睡眠
    value: "",
    name:"睡眠",
    event: keyf1,
  },
  {
    key: "skinPressure", //受压部位皮肤
    value: "",
    name:"受压部位皮肤",
    event: keyf1,
  },
  {
    key: "defecate", //大便
    value: "",
    name:"大便",
    event: keyf1,
  },
  {
    key: "conduitType", //导管类型
    value: "",
    name:"导管类型",
    event: keyf1,
    autoComplete: {
      data: dglx
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "drainage", //引流量
    value: "",
    name:"引流量",
    event: keyf1,
  },
  {
    key: "urine", //尿量
    value: "",
    name:"尿量",
    event: keyf1,
  },
  {
    key: "conduitCondition", //导管情况
    value: "",
    name:"导管情况",
    event: keyf1,
    autoComplete: {
      data: dgqk
    },
    textarea: {
      width: 65
    },
  },
  {
    key: "color", //颜色
    value: "",
    name:"颜色",
    event: keyf1,
    autoComplete: {
      data: ys
    },
    textarea: {
      width: 50
    },
  },
  {
    key: "handle", //处理
    value: "",
    name:"处理",
    event: keyf1,
    autoComplete: {
      data: cl
    },
    textarea: {
      width: 75
    },
  },
  {
    key: "description", //病情观察及护理措施
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
