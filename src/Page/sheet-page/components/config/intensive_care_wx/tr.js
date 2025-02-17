import { listItem } from "../../../api/recordDesc";
import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from "../sheetInfo";
// let info = {
//   sheetType: "neurology"
// };
let ysList = [];
let chuList = [];
let ruList = [];

let GCS = [];
let 心电图 = [];
let 吸痰 = [];
let 气垫 = [];
let 雾化吸入 = [];
let 约束带 = [];
let 皮肤 = [];
let 体位 = [];
let 基础护理 = [];
let 翻身拍背 = [];
let 物理降温 = [];
let 管路 = {};
let 理疗 = [];
let 健康指导 = {};

export default [
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
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: "体温",
    next: "℃",
    width: 34
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1,
    name: "脉搏",
    next: "次/分"
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分"
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
    next: "mmHg"
  },
  {
    key: "spo2", //spo2
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%"
  },

  {
    key: "field1", //疼痛部位
    value: "",
    event: keyf1,
    name: "疼痛部位"
  },
  {
    key: "field2", //疼痛性质
    value: "",
    event: keyf1,
    name: "疼痛性质"
  },
  {
    key: "field3", //疼痛评分
    value: "",
    event: keyf1,
    name: "疼痛评分"
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识"
  },
  {
    key: "field4", //吸氧 - 鼻 塞
    value: "",
    event: keyf1,
    name: "鼻 塞"
  },
  {
    key: "field5", //吸氧量 - 面罩
    value: "",
    event: keyf1,
    name: "面罩"
  },
  {
    key: "field6", //饮食性质
    value: "",
    event: keyf1,
    name: "饮食性质"
  },
  {
    key: "field7", //饮食量
    value: "",
    event: keyf1,
    name: "饮食量"
  },
  {
    key: "field8", //静脉补液
    value: "",
    event: keyf1,
    name: "静脉补液"
  },
  {
    key: "field9", //静脉其他
    value: "",
    event: keyf1,
    name: "静脉其他"
  },
  {
    key: "field10", //出量尿性质
    value: "",
    event: keyf1,
    name: "出量尿性质"
  },
  {
    key: "field11", //出量尿量
    value: "",
    event: keyf1,
    name: "出量尿量"
  },
  {
    key: "field12", //出量其他性质
    value: "",
    event: keyf1,
    name: "出量其他性质"
  },
  {
    key: "field13", //出量其他量
    value: "",
    event: keyf1,
    name: "出量其他量"
  },
  {
    key: "field14", //GCS
    value: "",
    event: keyf1,
    name: "GCS",
    autoComplete: {
      data: GCS
    },
    isWrap: true
  },
  {
    key: "pupilSizeLeft", //瞳孔直径左
    value: "",
    event: keyf1,
    name: "瞳孔（大小）  左",
  },
  {
    key: "pupilSizeRight", //瞳孔直径右
    value: "",
    event: keyf1,
    name: "右",
    isWrap: true
  },
  {
    key: "pupilReflexLeft", //瞳孔反射左
    value: "",
    event: keyf1,
    name: "瞳孔（反射） 左"
  },
  {
    key: "pupilReflexRight", //瞳孔反射右
    value: "",
    event: keyf1,
    name: "瞳孔（反射） 右"
  },
  {
    key: "field15", //肢体肌力左上
    value: "",
    event: keyf1,
    name: "肢体肌力左上"
  },
  {
    key: "field16", //肢体肌力左下
    value: "",
    event: keyf1,
    name: "肢体肌力左下"
  },
  {
    key: "field17", //肢体肌力右上
    value: "",
    event: keyf1,
    name: "肢体肌力右上"
  },
  {
    key: "field18", //肢体肌力右下
    value: "",
    event: keyf1,
    name: "肢体肌力右下"
  },
  {
    key: "field19", //吸痰
    value: "",
    event: keyf1,
    // isSelected: true,
    autoComplete: {
      data: 吸痰
    },
    name: "吸痰"
  },
  {
    key: "field20", //气垫
    value: "",
    event: keyf1,
    // isSelected: true,
    autoComplete: {
      data: 气垫
    },
    name: "气垫"
  },
  {
    key: "field21", //雾化吸入
    value: "",
    event: keyf1,
    // isSelected: true,
    autoComplete: {
      data: 雾化吸入
    },
    name: "雾化吸入"
  },
  {
    key: "field22", //约束带
    value: "",
    event: keyf1,
    // isSelected: true,
    autoComplete: {
      data: 约束带
    },
    name: "约束带"
  },
  {
    key: "field23", //心电图
    value: "",
    event: keyf1,
    autoComplete: {
      data: 心电图
    },
    name: "心电图"
  },
  {
    key: "field24", //皮肤
    value: "",
    event: keyf1,
    autoComplete: {
      data: 皮肤
    },
    name: "皮肤"
  },
  {
    key: "field25", //体位
    value: "",
    event: keyf1,
    autoComplete: {
      data: 体位
    },
    name: "体位"
  },
  {
    key: "field26", //基础护理	
    value: "",
    event: keyf1,
    autoComplete: {
      data: 基础护理
    },
    name: "基础护理"
  },
  {
    key: "field27", //翻身拍背
    value: "",
    event: keyf1,
    autoComplete: {
      data: 翻身拍背
    },
    name: "翻身拍背"
  },
  {
    key: "field28", //物理降温
    value: "",
    event: keyf1,
    autoComplete: {
      data: 物理降温
    },
    name: "物理降温"
  },
  {
    key: "field29", //管路
    value: "",
    event: keyf1,
    autoComplete: {
      data: 管路
    },
    name: "管路",
    width: 110
  },
  {
    key: "field30", //理疗
    value: "",
    event: keyf1,
    autoComplete: {
      data: 理疗
    },
    name: "理疗"
  },
  {
    key: "field31", //健康指导
    value: "",
    event: keyf1,
    autoComplete: {
      data: 健康指导
    },
    name: "健康指导",
    width: 135
  },
  {
    key: "field32", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field33", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field34", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field35", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field36", //标题5
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field37", //标题6
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
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
      width: "180px",
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
    // oninput: next
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

let filterKey = '威县' + ':';
let filterKey2 = '脑外科重症监护单' + ':';
let filterKey2Arr = ["心电图", "吸痰", "气垫", "雾化吸入", "约束带", "健康指导"]

export function getListData4() {
  let list = [
    "GCS",
    "心电图",
    "吸痰",
    "气垫",
    "雾化吸入",
    "约束带",
    "皮肤",
    "体位",
    "基础护理",
    "翻身拍背",
    "物理降温",
    "管路",
    "静脉管路",
    "理疗",
    "健康指导",
    "肺功能锻炼"
  ];

  list = list.map(key => {
    return filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(GCS, "GCS", data);
    setList(心电图, "心电图", data);
    setList(吸痰, "吸痰", data);
    setList(气垫, "气垫", data);
    setList(雾化吸入, "雾化吸入", data);
    setList(约束带, "约束带", data);
    setList(皮肤, "皮肤", data);
    setList(体位, "体位", data);
    setList(基础护理, "基础护理", data);
    setList(翻身拍背, "翻身拍背", data);
    setList(物理降温, "物理降温", data);
    setList(管路, "管路", data, true);
    setList(理疗, "理疗", data);
    setList(健康指导, "健康指导", data, true);
  });
}

getListData4();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 * @param {*} isChildOptions 当前选项是否有下拉子选项
 */
function setList(list, key, data, isChildOptions) {
  key = filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  if (isChildOptions) {
    let arr = [], obj = {};
    let childKeys = ['肺功能锻炼', '静脉管路'];
    for (let item of data[key]) {
      let childArr = '';
      if (childKeys.includes(item.name)) {
        childArr = data[filterKey + item.name];
        if (childArr && childArr.constructor == Array) {
          childArr = childArr.map(child => {
            return child.name;
          });
        }
      }
      obj = {
        key: item.name,
        children: childArr
      }
      arr.push(obj);
    }
    list['childOptions'] = true;
    list['option'] = arr;
  } else {
    list.splice(0, list.length);
    for (let item of data[key]) {
      list.push(item.name);
    }
  }
}

