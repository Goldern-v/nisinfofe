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

const zgssList = ['软','中','硬'];
const gdgdList = ['U+1', 'U+2', 'U+3', 'U=0', 'U-1', 'U-2', 'U-3', 'U-4'];
const rfqkList = ['空虚','充盈','不充盈'];
const mrqkList = ['无特殊','正常', '乳汁过多', '泌乳不足'];
const xtlist = ['+', '-']
const skqkList = ['红肿', '渗液', '水肿', '(-)', '会阴(-)'];
const 意识 = ['清醒', '浅昏迷', '深昏迷', '模糊', '嗜睡', '昏睡', '谵妄'];
const zdjnList = ['✓'];
const 入量名称 = ['输液', '口服', '输血', '肌注', '静注', '鼻饲', '静脉泵入', '灌肠', '饮水'];
const 出量颜色 = ['黄色', '鲜红色', '暗红色', '墨绿色', '浓茶色','淡红色','茶褐色'];
const 出量名称 = ['血','呕吐物', '伤口引流', '腋窝引流', '胸壁引流', '胸腔引流', '腹腔引流', '心包积液', '胸腔引流液', '大便', '尿', '腹水', '脑积液', '痰液', '血液', '胃管', '尿管', '盆腔引流管', '肝下引流管','温氏孔引流管', '脾窝引流管', '伤口皮下引流管', 'T管', '隔下引流管', '人工肛', '胃造痰', '空肠造痰', '肛管引流管','杜氏窝引流管', '左肾造痰', '右肾造痰', '膀胱造痰', '左肾周引流', '右肾周引流', '耻骨后引流', '左输尿管导管引流', '右输尿管导管引流', '左肾窝引流', '右肾窝引流', '会阴部引流', '左输尿管造口支架管', '右输尿管造口支架管', '阴道出血', '术中出血', '止血球囊引流', '腹透液', '分娩时出血'];

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
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分",
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
    name: "血压",
    next: "mmHg",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 43
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
    key: "spo2", //SPO2
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
    key: "uterineFloor", //宫底高度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 60
    },
    autoComplete: {
      data: gdgdList
    },
  },
  {
    key: "bladder", //膀胱情况
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 60
    },
    autoComplete: {
      data: rfqkList
    },
  },
  {
    key: "uterineShrink", //子宫收缩
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 60
    },
    autoComplete: {
      data: zgssList
    },
  },


  {
    key: "examination", //肛查
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
  },
  {
    key: "foodSize", // 入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 40
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
  },
  {
    key: "dischargeSize", //出量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 40
    },
  },
  // {
  //   key: "fieldFour", //出量颜色
  //   value: "",
  //   event: keyf1,
  //   name: "出量颜色",
  //   autoComplete: {
  //     data: 出量颜色
  //   },
  //   change: (e, td) => limitChange(e, td, 3),
  //   textarea: {
  //     width: 25
  //   },
  //   style: {
  //     textAlign: "left",
  //   }
  // },
  // {
  //   key: "fieldTwelve", //标题1
  //   value: "",
  //   event: keyf1,
  //   change: (e, td) => limitChange(e, td, 4),
  //   textarea: {
  //     width: 30
  //   },
  // },
  // {
  //   key: "armValue", // 标题2
  //   value: "",
  //   event: keyf1,
  //   change: (e, td) => limitChange(e, td, 4),
  //   textarea: {
  //     width: 30
  //   },
  // },

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
    '子宫收缩',
    '宫底高度',
    '膀胱情况',
    '肛查',
    '入量名称',
    '出量名称',
  ];
  multiDictInfo(list,'postpartum2_dglb').then(res => {
    setList(zgssList, '子宫收缩', data);
    setList(gdgdList, '宫底高度', data);
    setList(rfqkList, '膀胱情况', data);
    setList(mrqkList, '肛查', data);
    setList(入量名称, '入量名称', data);
    setList(出量名称, '出量名称', data);
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
