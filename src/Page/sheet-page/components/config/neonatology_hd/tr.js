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
  click_date
} from "../keyEvent/date";

let xslList = ['好', '一般', '弱'];
let qbList = [];
let clmcList = [];
let rlmcList = [];
let ylfsList = [];
let xtxzList = [];
let xtlList = ["+","++","+++"];
let fyList = [];
let ksList = [];
let twList = ['左侧','右侧','平卧','俯卧'];
let ysList = ['黄绿色','黄色','淡黄色','墨绿色','暗红色','鲜红色','淡红色','茶褐色'];
let lgzlList = ['开始','继续','结束','√'];



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
    event: event_time
  },
  {
    key: "fieldOne", //箱温/床温
    value: "",
    event: keyf1,
    name: "箱温/床温",
    next: "℃",
    textarea: {
      width: 27
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    textarea: {
      width: 38
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "heartRate", //脉搏/心率
    value: "",
    event: keyf1,
    name: "心率",
    next: "次/分",
    textarea: {
      width: 30
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
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
    textarea: {
      width: 50
    },
    change: (e, td) => limitChange(e, td, 4),
    name: "血压",
    next: "mmHg"
  },
  {
    key: "spo2", //血氧饱和度(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldTwo", //体位
    value: "",
    event: keyf1,
    name: "体位",
    autoComplete: {
      data: twList
    },
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldThree", //吸吮力
    value: "",
    event: keyf1,
    name: "吸吮力",
    autoComplete: {
      data: xslList
    },
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldFour", //脐部
    value: "",
    event: keyf1,
    name: "脐部",
    autoComplete: {
      data: qbList
    },
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldFive", //经皮胆红素
    value: "",
    event: keyf1,
    name: "经皮胆红素",
    next: "Umol/L",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "fieldNine", //胃管深度
    value: "",
    event: keyf1,
    name: "胃管深度",
    next: "cm",
    textarea: {
      width: 25
    },
    change: (e, td) => limitChange(e, td, 3),
  },
  {
    key: "food", //食物, 入量
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62,
    },
    autoComplete: {
      data: rlmcList
    },
    style: {
      textAlign: "left",
    },
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    name: "入量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 35
    },
  },
  {
    key: "discharge", //排出物
    value: "",
    event: keyf1,
    name: "出量名称",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 62,
    },
    autoComplete: {
      data: clmcList
    },
    style: {
      textAlign: "left",
    },
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    name: "出量大小",
    next: "ml",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 35
    },
  },
  {
    key: "dischargeColor", //排出物颜色
    value: "",
    event: keyf1,
    name: "出量颜色",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    style: {
      textAlign: "left",
    },
    autoComplete: {
      data: ysList
    }
  },
  {
    key: "fieldFourteen", // 氧疗方式
    value: "",
    event: keyf1,
    name: "氧疗方式",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 55
    },
    autoComplete: {
      data: ylfsList
    },
  },
  {
    key: "fieldFiveteen", // 氧疗流量L/分
    value: "",
    event: keyf1,
    name: "氧疗流量",
    next: "L/分",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "fieldSixteen", // 氧疗浓度
    value: "",
    event: keyf1,
    name: "氧疗浓度",
    next: "%",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
  },
  {
    key: "fieldSeventeenLeft", // 吸痰口腔性状
    value: "",
    name: "吸痰口腔性状",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    autoComplete: {
      data: xtxzList
    },
  },
  {
    key: "fieldSeventeenRight", //  吸痰口腔痰量
    value: "",
    name: "吸痰口腔痰量",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    autoComplete: {
      data: xtlList
    },
  },
  {
    key: "fieldEighteenLeft", // 吸痰气管插管性状
    value: "",
    name: "吸痰气管插管性状",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    autoComplete: {
      data: xtxzList
    },
  },
  {
    key: "fieldEighteenRight", //  吸痰气管插管痰量
    value: "",
    name: "吸痰气管插管痰量",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    autoComplete: {
      data: xtlList
    },
  },
  {
    key: "fieldNineteen", // 篮光治疗
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 25
    },
    autoComplete: {
      data: lgzlList
    },
    name: "篮光治疗"
  },
  {
    key: "fieldSix", //标题1
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: fyList
    },
  },
  {
    key: "fieldSeven", //标题2
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    },
    autoComplete: {
      data: ksList
    },
  },
  {
    key: "fieldEight", //标题3
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
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
    }
  },
  {
    key: "sign",
    value: ""
  },
  {
    key: "sign2",
    value: ""
  },
  // {
  //   key: "audit",
  //   value: ""
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

export function getListData() {
  let list = [
    "花都:新生儿科护理记录单:脐部",
    "花都:新生儿科护理记录单:出量名称",
    "花都:新生儿科护理记录单:入量名称",
    "花都:新生儿科护理记录单:氧疗方式",
    "花都:新生儿科护理记录单:吸痰性状",
    "花都:新生儿科护理记录单:吸痰量",
    "花都:新生儿科护理记录单:反应",
    "花都:新生儿科护理记录单:哭声",
  ];

  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(qbList, list[0], data);
    setList(clmcList, list[1], data);
    setList(rlmcList, list[2], data);
    setList(ylfsList, list[3], data);
    setList(xtxzList, list[4], data);
    setList(fyList, list[6], data);
    setList(ksList, list[7], data);
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
