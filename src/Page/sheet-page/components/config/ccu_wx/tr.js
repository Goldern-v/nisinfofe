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

let 心电图 = [];
let 体位 = [];
let 基础护理 = [];
let 翻身拍背 = [];
let 物理降温 = [];
let 管路 = {};
let 健康指导 = {};
let 穿刺部位 = [];
let 穿刺口 = [];
let 动脉搏动 = [];
let 皮肤胀力 = [];
let 皮温 = [];

export default [
  {
    key: "recordMonth", //日期
    value: "",
    event: event_date,
    click: click_date,
    width: 36
  },
  {
    key: "recordHour", //时间
    value: "",
    event: event_time,
    width: 36
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
    next: "次/分",
    width: 38
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: "呼吸",
    next: "次/分",
    width: 38
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
    width: 52
  },
  {
    key: "spo2", //spo2 
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    width: 31
  },

  {
    key: "field1", //疼痛部位
    value: "",
    event: keyf1,
    name: "疼痛部位",
    width: 65
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
    name: "意识",
    width: 50
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
    key: "field6", //饮食
    value: "",
    event: keyf1,
    name: "饮食"
  },
  {
    key: "field7", //静脉
    value: "",
    event: keyf1,
    name: "静脉"
  },
  {
    key: "field8", //出量尿
    value: "",
    event: keyf1,
    name: "尿"
  },
  {
    key: "field9",//出量其他
    value: "",
    event: keyf1,
    name: "出量其他"
  },
  {
    key: "field10", //心电图
    value: "",
    event: keyf1,
    name: "心电图",
    autoComplete: {
      data: 心电图
    },
    width: 52
  },
  {
    key: "field11", //体位
    value: "",
    event: keyf1,
    name: "体位",
    autoComplete: {
      data: 体位
    },
    width: 70
  },
  {
    key: "field12", //基础护理
    value: "",
    event: keyf1,
    name: "基础护理",
    autoComplete: {
      data: 基础护理
    },
    width: 52
  },
  {
    key: "field13", //翻身拍背
    value: "",
    event: keyf1,
    name: "翻身拍背",
    autoComplete: {
      data: 翻身拍背
    },
    width: 52
  },
  {
    key: "field14", //物理降温
    value: "",
    event: keyf1,
    name: "物理降温",
    autoComplete: {
      data: 物理降温
    },
    width: 52
  },
  {
    key: "field15", //管路
    value: "",
    event: keyf1,
    name: "管路",
    autoComplete: {
      data: 管路
    },
    width: 110
  },
  {
    key: "field16", //健康指导
    value: "",
    event: keyf1,
    name: "健康指导",
    autoComplete: {
      data: 健康指导
    },
    width: 125
  },
  {
    key: "field17", //穿刺部位
    value: "",
    event: keyf1,
    name: "穿刺部位",
    autoComplete: {
      data: 穿刺部位
    },
    width: 65
  },
  {
    key: "field18", //穿刺口
    value: "",
    event: keyf1,
    name: "穿刺口",
    autoComplete: {
      data: 穿刺口
    },
    width: 52
  },
  {
    key: "field19", //动脉搏动
    value: "",
    event: keyf1,
    name: "动脉搏动",
    autoComplete: {
      data: 动脉搏动
    },
    width: 20
  },
  {
    key: "field20", //皮肤胀力
    value: "",
    event: keyf1,
    name: "皮肤胀力",
    autoComplete: {
      data: 皮肤胀力
    },
    width: 20
  },
  {
    key: "field21", //皮温
    value: "",
    event: keyf1,
    name: "皮温",
    autoComplete: {
      data: 皮温
    },
    width: 20
  },
  {
    key: "field22", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field23", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field24", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field25", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field26", //标题5
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
let filterKey2 = 'CCU监护单' + ':';
let filterKey2Arr = ["心电图", "健康指导"];

export function getListData4() {
  let list = [
    "心电图",
    "体位",
    "基础护理",
    "翻身拍背",
    "物理降温",
    "管路",
    "静脉管路",
    "健康指导",
    "心脏康复",
    "穿刺部位",
    "穿刺口",
    "动脉搏动",
    "皮肤胀力",
    "皮温",
  ];

  list = list.map(key => {
    return filterKey2Arr.includes(key) ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(心电图, "心电图", data);
    setList(体位, "体位", data);
    setList(基础护理, "基础护理", data);
    setList(翻身拍背, "翻身拍背", data);
    setList(物理降温, "物理降温", data);
    setList(管路, "管路", data, true);
    setList(健康指导, "健康指导", data, true);
    setList(穿刺部位, "穿刺部位", data);
    setList(穿刺口, "穿刺口", data);
    setList(动脉搏动, "动脉搏动", data);
    setList(皮肤胀力, "皮肤胀力", data);
    setList(皮温, "皮温", data);
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
    let childKeys = ['静脉管路', '心脏康复'];
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
