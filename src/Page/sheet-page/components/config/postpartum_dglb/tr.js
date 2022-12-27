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
import info from "../sheetInfo";

const zgssList = ['软', '硬', '中'];
const gdgdList = ['U+1', 'U+2', 'U+3', 'U=0', 'U-1', 'U-2', 'U-3', 'U-4'];
const rfqkList = ['(-)', '硬'];
const mrqkList = ['少', '中等', '多'];
const xtlist = ['+', '-']
const skqkList = ['红肿', '渗液', '水肿', '(-)', '会阴(-)'];
const 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
const zdjnList = ['✓'];
const 入量名称 = ['输液', '口服', '输血', '肌注', '静注', '鼻饲', '静脉泵入', '灌肠', '饮水'];
const 出量颜色 = ['黄色', '鲜红色', '暗红色', '墨绿色', '浓茶色','淡红色','茶褐色'];
const 出量名称 = ['呕吐物', '伤口引流', '腋窝引流', '胸壁引流', '胸腔引流', '腹腔引流', '心包积液', '胸腔引流液', '大便', '尿', '腹水', '脑积液', '痰液', '血液', '胃管', '尿管', '盆腔引流管', '肝下引流管','温氏孔引流管', '脾窝引流管', '伤口皮下引流管', 'T管', '隔下引流管', '人工肛', '胃造痰', '空肠造痰', '肛管引流管','杜氏窝引流管', '左肾造痰', '右肾造痰', '膀胱造痰', '左肾周引流', '右肾周引流', '耻骨后引流', '左输尿管导管引流', '右输尿管导管引流', '左肾窝引流', '右肾窝引流', '会阴部引流', '左输尿管造口支架管', '右输尿管造口支架管', '阴道出血', '术中出血', '止血球囊引流', '腹透液', '分娩时出血'];
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
    name: "体温",
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
    name: "脉搏",
    next: "次/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 30
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
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
    name: "血压",
    next: "mmHg",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
    },
  },
  {
    key: "expand2", //血压
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
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    autoComplete: {
      data: 意识
    },
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
  },

  {
    key: "fieldThree", //阴道出血mL
    value: "",
    event: keyf1,
    name: "阴道出血",
    next: "mL",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 35
    },
  },
  {
    key: "fieldSix", //子宫收缩
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: zgssList
    },
  },
  {
    key: "fieldSeven", //宫底高度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: gdgdList
    },
  },
  {
    key: "fieldEight", //乳房情况
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: rfqkList
    },
  },
  {
    key: "fieldNine", //泌乳情况
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: mrqkList
    },
  },

  {
    key: "fieldEleven", //指导挤奶
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: zdjnList
    },
  },
  {
    key: "dressing", //腹部切口敷料
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 48
    },
    autoComplete: {
      data: ['干洁', '渗液']
    },
  },
  {
    key: "perineal", //会阴伤口
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 48
    },
    autoComplete: {
      data: ['（—）', '红肿', '水肿']
    },
  },
  {
    key: "exhaust", //肛门排气/肠鸣音<br /> (次/分)
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 48
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
    autoComplete: {
      data: 入量名称
    },
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
    autoComplete: {
      data: 出量名称
    },
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
    key: "fieldFour", //出量颜色
    value: "",
    event: keyf1,
    name: "出量颜色",
    autoComplete: {
      data: 出量颜色
    },
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "fieldTwelve", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "armValue", //空白
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
  },
  {
    key: "expand", //空白
    value: "",
    name: "膝反射",
    autoComplete: {
      data: xtlist
    },
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

export function getListData() {
  let list = [,
    "花都:神经外科护理记录单:出量名称"
  ];
  multiDictInfo(list).then(res => {
    setList(出量名称, list[0], data);
  });
}

getListData();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 */
function setList(list, key, data) {
  list.splice(0, list.length);
  for (let item of data[key]) {
    list.push(item.name);
  }
}
