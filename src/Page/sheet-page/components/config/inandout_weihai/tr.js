import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
// le event = ''

let xzList = ['棕黄粘稠', '墨绿粘稠', '淡黄澄清', '淡红血性', '鲜红血性', '暗红血性', '白色浑浊', '草绿浑浊']
// let chulian = ['颈前引流量', '胸壁引流量', '腋窝引流量', '左胸壁引流量', '左腋窝引流量', '右胸壁引流量', '右腋窝引流量', '尿量', '切口引流量', '心包积液']
let chulian = ['小便', '造口', '出汗量', '呕吐', '痰量', '胃肠减压引流', '左上腹引流', '左下腹引流', '左中腹引流', '右上腹引流',
  '右下腹引流','右中腹引流','左盆引流','右盆引流','左胸引流','右胸引流',
  '皮下引流','肛管引流','负压引流','肛壁引流','脾窝引流','肝上引流',
  '肝下引流','文氏孔引流','左肾造瘘引流','右肾造瘘引流','胆囊引流',
  '髓前引流','T管引流','膈下引流','十二指肠旁沟引流','十二指肠旁沟引流','股腹后引流'
]
const food = ['静滴','静推','肌注皮下','肠内营养','鼻饲','胃造瘘入','水','米油','鸡蛋清','米粥','烂面条','片汤','疙瘩汤']

// le i = ''
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
  {
    key: "food", //入量-项目
    value: "",
    event: keyf1,
    // name: "入量项目"
    autoComplete: {
      data: food
    },
  },
  {
    key: "foodSize", //入量-量（ml）
    value: "",
    event: keyf1,
    name: "入量",
    next: 'ml'
  },
  {
    key: "discharge", //出量 - 项目
    value: "",
    event: keyf1,
    autoComplete: {
      data: chulian
    },
    textarea: {
      width: 150
    },
  },
  {
    key: "dischargeSize", //出量 - 量（ml）
    value: "",
    event: keyf1,
    name: "出量",
    next: 'ml'
  },
  {
    key: "character", // 出量 - 性状
    value: "",
    event: keyf1,
    autoComplete: {
      data: xzList
    },
    name: "性状"
  },
  // {
  //   key: "fieldEighteen", //标题2
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     minWidth: 60
  //   }
  // },
  // {
  //   key: "fieldNineteen", //标题3
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     minWidth: 60
  //   }
  // },
  {
    key: "description", //护理记录
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
