import { multiDictInfo } from "../../../api/index";
import { keyf1 } from "../keyEvent/f1.js";
import { event_date, event_time, click_date } from "../keyEvent/date";
let 静脉性质 = [];
let 饮食性质 = [];
let 出量名称 = {};
let 出量性质 = 出量名称;
let 意识 = [];
let 吸氧方式 = [];
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
    next: "℃"
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
    // autoComplete: {
    //   data: 疼痛部位
    // },
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
    // autoComplete: {
    //   data: 疼痛评分
    // },
    name: "疼痛评分"
  },
  {
    key: "field4", //入量静脉性质
    value: "",
    event: keyf1,
    autoComplete: {
      data: 静脉性质
    },
    name: "静脉性质"
  },
  {
    key: "field5", //静脉量
    value: "",
    event: keyf1,
    name: "静脉量",
    // autoComplete: {
    //   data: 静脉量
    // }
  },
  {
    key: "field6", //饮食性质
    value: "",
    event: keyf1,
    autoComplete: {
      data: 饮食性质
    },
    name: "饮食性质",
    width: 90
  },
  {
    key: "field7", //饮食量
    value: "",
    event: keyf1,
    name: "饮食量"
  },

  {
    key: "field8", //出量名称
    value: "",
    event: keyf1,
    autoComplete: {
      data: 出量名称
    },
    name: "出量名称",
    childKey: "出量性质"
  },
  {
    key: "field9", //出量性质
    value: "",
    event: keyf1,
    autoComplete: {
      data: 出量性质
    },
    name: "出量性质",
    parentKey: "出量名称"
  },
  {
    key: "field10", //出量量
    value: "",
    event: keyf1,
    name: "出量量"
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: 意识
    },
    name: "意识"
  },
  {
    key: "field11", //吸氧方式
    value: "",
    event: keyf1,
    name: "吸氧方式",
    autoComplete: {
      data: 吸氧方式
    }
  },
  {
    key: "field12", //吸氧量
    value: "",
    event: keyf1,
    name: "吸氧量"
  },
  {
    key: "field13", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field14", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field15", //标题3
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field16", //标题4
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field17", //标题5
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field18", //标题6
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field19", //标题7
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field20", //标题8
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field21", //标题9
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field22", //标题10
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "field23", //标题11
    value: "",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  // {
  //   key: "field24", //标题12
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 36
  //   }
  // },
  // {
  //   key: "field25", //标题13
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 36
  //   }
  // },
  // {
  //   key: "field26", //标题14
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 36
  //   }
  // },
  // {
  //   key: "field27", //标题15
  //   value: "",
  //   event: keyf1,
  //   textarea: {
  //     width: 36
  //   }
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
let filterKey2 = '统一护理记录单' + ':';

export function getListData4() {
  let list = [
    "意识",
    "饮食性质",
    "静脉性质",
    "出量名称",
    "尿液性质",
    "呕吐物性质",
    "引流量",
    "吸氧方式"
  ];
  list = list.map(key => {
    return key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    setList(意识, "意识", data);
    setList(静脉性质, "静脉性质", data);
    setList(饮食性质, "饮食性质", data);
    setList(出量名称, "出量名称", data, true);
    setList(吸氧方式, "吸氧方式", data);
  });
}

getListData4();
/**
 *
 * @param {*} list 原数组
 * @param {*} key 对应的key
 * @param {*} data 数据源
 * @param {*} isChildOptions2 是否有子下拉选项（依赖于前一个td选择）
 */
function setList(list, key, data, isChildOptions2) {
  key = key.includes('出量名称') ? filterKey + filterKey2 + key : filterKey + key;
  if (isChildOptions2) {
    for (let item of data[key]) {
      let arr = data[filterKey + item.name + '性质'];
      if (arr && arr.constructor == Array) {
        arr = arr.map(function (child, index) {
          return child.name;
        })
        list[item.name] = arr;
      } else {
        list[item.name] = '';
      }
    }
  } else {
    list.splice(0, list.length);
    for (let item of data[key]) {
      list.push(item.name);
    }
  }
}
