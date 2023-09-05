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
// let 护理操作项目 = [];
// let 护理操作结果 = [];
// let 护理问题 = [];
// let 护理类型 = [];
// let 安全护理 = [];
// let 导管护理 = [];
// let 气管护理 = [];
// let 心理护理 = [];
// let 饮食情况 = [];
let wether = ['是', '否'];
// 医院反应下拉会无反应。bug这边复现不了，可能是发请求拿数据是卡住。所以数据写死
// let 护理操作项目=[,'血糖监测','口腔护理','经鼻/口腔吸痰','雾化吸入','氧气吸入','导尿','口服给药','胃肠减压','静脉输液','静脉采血','留置胃管鼻饲','物理降温','心肺复苏术(CPR)','心电监测','除颤','静脉输血','静脉注射','肌内注射','皮内注射','皮下注射']
let 护理操作项目=[{name: '标本采集', code: '标本采集'},{name: '血糖监测', code: '血糖监测'},{name: '口腔护理', code: '口腔护理'},{name: '经鼻/口腔吸痰', code: '经鼻/口腔吸痰'},{name: '雾化吸入', code: '雾化吸入'},{name: '氧气吸入', code: '氧气吸入'},{name: '导尿', code: '导尿'},{name: '口服给药', code: '口服给药'},{name: '胃肠减压', code: '胃肠减压'},{name: '静脉输液', code: '静脉输液'},{name: '静脉采血', code: '静脉采血'},{name: '留置胃管鼻饲', code: '留置胃管鼻饲'},{name: '物理降温', code: '物理降温'},{name: '心肺复苏术(CPR)', code: '心肺复苏术(CPR)'},{name: '心电监测', code: '心电监测'},{name: '除颤', code: '除颤'},{name: '静脉输血', code: '静脉输血'},{name: '静脉注射', code: '静脉注射'},{name: '肌内注射', code: '肌内注射'},{name: '皮内注射', code: '皮内注射'},{name: '皮下注射', code: '皮下注射'}]
let 护理操作结果=['操作过程顺利','置管失败予重置']
let 护理问题 = ['知识缺乏','活动无耐力','有感染的危险','生活自理能力缺陷','清理呼吸道无效','便秘','有皮肤完整性受损的危险','疼痛','潜在的误吸','吞咽障碍','焦虑','恐惧','排尿异常','心输出量减低','体温过高','气体交换受损','组织灌注量改变','潜在的室息','潜在失用综合征','有受伤的危险','体液不足','有体液不足的危险','体液过多','尿潴留','口腔黏膜异常','体温过低','躯体移动障碍','睡眠型态紊乱','营养失调','功能性尿失禁','反射性尿失禁','压迫性尿失禁','紧迫性尿失禁','完全性尿失禁','舒适度改变','语言沟通障碍'];
let 护理类型 = ['基础护理','特殊护理','辨证护理','其他'];
let 安全护理 = ['勤巡视病房','加床档','约束四肢'];
let 导管护理 = ['留置尿管护理','留置胃管护理','盆腔引流管护理','腹腔引流管护理','胸腔闭式引流管护理','肾造瘘管护理','膀胱造瘘管护理','肾周引流管护理','输尿管导管护理','伤口引流管护理','无'];
let 气管护理 = ['翻身拍背','雾化吸入','吸痰','无'];
let 心理护理 = ['根据病人心理状况施行心理护理','家属心理支持'];
let 饮食情况 = ['良好','一般','较差','禁食'];
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
    click: click_date,
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    // click: click_time
  },
  {
    key: "nursingOperationItem", //护理操作项目
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 60),
    name: "护理操作项目",
    textarea: {
      width: 180
    },
    splice: true,
    style: {
      textAlign: "left",
    },
    autoComplete: {
      data: 护理操作项目
    },
  },
  {
    key: "nursingOperationResult", //护理操作结果
    value: "",
    event: keyf1,
    name: "护理操作结果",
    change: (e, td) => limitChange(e, td, 28),
    textarea: {
      width: 95
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 护理操作结果
    },
  },
  {
    key: "nursingProblem", //护理问题
    value: "",
    event: keyf1,
    name: "护理问题",
    change: (e, td) => limitChange(e, td, 48),
    textarea: {
      width: 150
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 护理问题
    },
  },
  {
    key: "nursingType", //护理类型
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    name: "护理类型",
    textarea: {
      width: 75
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 护理类型
    },
  },
  {
    key: "safeCare", //安全护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    name: "安全护理",
    textarea: {
      width: 75
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 安全护理
    },
  },
  {
    key: "catheterCare", //导管护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 32),
    name: "导管护理",
    textarea: {
      width: 105
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 导管护理
    },
  },
  {
    key: "skinCare", //皮肤护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "皮肤护理",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "trachealCare", //气管护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    name: "气管护理",
    textarea: {
      width: 75
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 气管护理
    },
  },
  {
    key: "bodyCare", //体位护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "体位护理",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "nutritionCare", //营养护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "营养护理",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "psychologyCare", //心理护理
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    name: "心理护理",
    textarea: {
      width: 75
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 心理护理
    },
  },
  {
    key: "diet", //饮食情况
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 24),
    name: "饮食情况",
    textarea: {
      width: 75
    },
    style: {
      textAlign: "left",
    },
    splice: true,
    autoComplete: {
      data: 饮食情况
    },
  },
  {
    key: "urinationTrouble", //排尿困难
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "排尿困难",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "isolation", //隔离
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "隔离",
    textarea: {
      width: 35
    },
    autoComplete: {
      data: wether
    },
  },
  {
    key: "bellySize", //腹围
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "腹围",
    textarea: {
      width: 35
    },
  },
  {
    hidden: true,
    key: "description", //特殊情况记录
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      // width: "180px",
      background: "transparent",
    },
    event: function (e, td) {
      console.log(e.keyCode);
      if (e.keyCode == 9) {
        td.value = "    " + td.value;
        e.preventDefault();
      }
      keyf1(e, td);
    }
    // oninput: next
  },
  {
    key: "sign",
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
    hidden: true,
    key: "signerNo",
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
    value: false
  }
];

// let filterKey = '花都' + ':';
// let filterKey2 = '通用护记副单' + ':';

// export function getListData4() {
//   let list = [
//     "护理操作项目",
//     "护理操作结果",
//     "护理问题",
//     "护理类型",
//     "安全护理",
//     "导管护理",
//     "气管护理",
//     "心理护理",
//     "饮食情况"
//   ];
//   list = list.map(key => {
//     return filterKey + filterKey2 + key;
//   });
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(护理操作项目, "护理操作项目", data);
//     setList(护理操作结果, "护理操作结果", data);
//     setList(护理问题, "护理问题", data);
//     setList(护理类型, "护理类型", data);
//     setList(安全护理, "安全护理", data);
//     setList(导管护理, "导管护理", data);
//     setList(气管护理, "气管护理", data);
//     setList(心理护理, "心理护理", data);
//     setList(饮食情况, "饮食情况", data);
//   });
// }

// getListData4();
// /**
//  *
//  * @param {*} list 原数组
//  * @param {*} key 对应的key
//  * @param {*} data 数据源
//  */
// function setList(list, key, data) {
//   key = filterKey + filterKey2 + key;
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
