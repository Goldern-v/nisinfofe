import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";

let ysList = ['正常', '弱', '易激惹']
let ysList2 = ['有力', '无力', '其他']
let ysList3 = ['正常', '增高', '低下']
let ysList4 = ['红润', '黄染', '红润黄染','青紫','苍白','红臀','皮疹','破损']
let ysList5 = ['均匀', '不均匀', '急促','呼吸暂停','三凹征（+)','周期性呼吸']
let ysList6 = ['四肢暖', '四肢冷']
let ysList7 = ['无', '鼻导管','面罩']
let ysList8 = ['禁食', '鼻饲','经口']
let ysList9 = ['淡黄色清', '深黄色清亮','其他']
let ysList10 = ['胎便', '黄软便','其他']
let ysList11 = ['胃管', '引流管','气管导管']
let ysList12 = ['清亮胃液', '淡黄色胃液','浅咖啡色胃内容物','深咖啡色胃内容物','含少量新鲜血液','残余奶']
// le i = ''
export default [{
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    click: click_time,
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
      width: 45
    },
    name: "血压(mmHg)"
  },
  {
    key: "spo2", // SPO2（%）
    value: "",
    event: keyf1,
    name: "SPO2（%）"
  },
  // {
  //   key: "fieldSeventeen", //标题1
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     minWidth: 48
  //   }
  // },
  // {
  //   key: "fieldOne", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList
  //   },
  //   style: {
  //     minWidth: '35px',
  //     maxWidth: '35px',
  //   },
  //   name: "反应"
  // },
  // {
  //   key: "fieldTwo", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList2
  //   },
  //   style: {
  //     minWidth: '25px',
  //     maxWidth: '25px',
  //   },
  //   name: "哭声"
  // },
  // {
  //   key: "fieldThree", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList3
  //   },
  //   style: {
  //     minWidth: '25px',
  //     maxWidth: '25px',
  //   },
  //   name: "肌张力"
  // },
  // {
  //   key: "fieldFour", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList4
  //   },
  //   style: {
  //     minWidth: '50px',
  //     maxWidth: '50px',
  //   },
  //   name: "皮肤"
  // },
  // {
  //   key: "fieldFive", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList5
  //   },
  //   name: "呼吸",
  //   textarea: {
  //     width: 45
  //   },
  // },

  // {
  //   key: "fieldSix", //意识
  //   value: "",
  //   event: keyf1,
  //   autoComplete: {
  //     data: ysList6
  //   },
  //   style: {
  //     minWidth: '40px',
  //     maxWidth: '40px',
  //   },
  //   name: "末梢"
  // },
  {
    key: "fieldSeven", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: ysList7
    },
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
    name: "方式"
  },
  {
    key: "fieldEight", //意识
    value: "",
    event: keyf1,
    name: "流量",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldNine", //意识
    value: "",
    event: keyf1,
    name: "痰色",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldTen", //意识
    value: "",
    event: keyf1,
    name: "量",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldEleven", //意识
    value: "",
    event: keyf1,
    name: "喂养方式",
    autoComplete: {
      data: ysList8
    },
    style: {
      minWidth: '25px',
      maxWidth: '25px',
    },
  },
  {
    key: "fieldTwelve", //意识
    value: "",
    event: keyf1,
    name: "胃管深度",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldThirteen", //意识
    value: "",
    event: keyf1,
    name: "母乳",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldFourteen", //意识
    value: "",
    event: keyf1,
    name: "水",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldFifteen", //意识
    value: "",
    event: keyf1,
    name: "呕吐",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldSixteen", //意识
    value: "",
    event: keyf1,
    name: "量",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldSeventeen", //意识
    value: "",
    event: keyf1,
    name: "颜色",
    autoComplete: {
      data: ysList9
    },
  },
  {
    key: "fieldEighteen", //意识
    value: "",
    event: keyf1,
    name: "量",
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldNineteen", //意识
    value: "",
    event: keyf1,
    name: "颜色",
    autoComplete: {
      data: ysList10
    },
    style: {
      minWidth: '40px',
      maxWidth: '40px',
    },
  },
  {
    key: "fieldTwenty", //意识
    value: "",
    event: keyf1,
    name: "管道名称",
    autoComplete: {
      data: ysList11
    },
  },
  {
    key: "fieldTwentyOne", //意识
    value: "",
    event: keyf1,
    name: "引流量"
  },
  {
    key: "fieldTwentyTwo", //意识
    value: "",
    event: keyf1,
    name: "颜色、性状",
    autoComplete: {
      data: ysList12
    },
    textarea: {
      width: 100,
    }
  },
  {
    key: "description", //护理记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      minWidth: "370px",
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
