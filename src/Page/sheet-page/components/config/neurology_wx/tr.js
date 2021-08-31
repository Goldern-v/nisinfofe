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
let 意识 = [];
let 呼吸音 = [];
let 瞳孔大小 = [];
let 瞳孔反射 = [];
let 疼痛性质 = [];
let 疼痛部位 = [];
let 疼痛评分 = [];
let 饮食性质 = [];
let 静脉性质 = [];
let 出量名称 = {};
let 临时项目 = [];
let 出量性质 = 出量名称;
let 静脉自定义项 = [];
let 肌力 = [];
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
    event: keyf1
  },
  {
    key: "pulse", //脉搏
    value: "",
    event: keyf1
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function(e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    }
  },

  {
    key: "field1", //疼痛部位
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    // autoComplete: {
    //   data: 疼痛部位
    // },
    name: "疼痛部位"
  },
  {
    key: "painNature", //疼痛性质
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 疼痛性质
    },
    name: "疼痛性质"
  },
  {
    key: "field2", //疼痛评分
    value: "",
    event: keyf1,
    autoComplete: {
      data: 疼痛评分
    },
    name: "疼痛评分"
  },
  {
    key: "field3", //血糖
    value: "",
    event: keyf1,
    name: "血糖"
  },
  {
    key: "spo2", //spo2
    value: "",
    event: keyf1
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    autoComplete: {
      data: 意识
    }
  },
  {
    key: "field4", //鼻塞
    value: "",
    event: keyf1,
    name: "鼻塞"
  },
  {
    key: "field5", //面罩
    value: "",
    event: keyf1,
    name: "面罩"
  },
  {
    key: "field6", //饮食性质
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 饮食性质
    },
    name: "饮食性质"
  },
  {
    key: "field7", //饮食量
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    name: "饮食量"
  },
  {
    key: "veinNature", //静脉性质
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 静脉性质
    },
    name: "静脉性质"
  },
  {
    key: "field8", //静脉量
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
  },
  {
    key: "discharge", //出量名称
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 出量名称
    },
    name: "出量名称",
    childKey: "出量性质"
  },
  {
    key: "field10", //出量性质
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    autoComplete: {
      data: 出量性质
    },
    name: "出量性质",
    parentKey: "出量名称"
  },
  {
    key: "field11", //出量
    value: "",
    event: keyf1,
    textarea: {
      width: 50
    },
    name: "出量"
  },
  {
    key: "pupilSizeLeft", //瞳孔直径左
    value: "",
    event: keyf1,
    autoComplete: {
      data: 瞳孔大小
    }
  },
  {
    key: "pupilSizeRight", //瞳孔直径右
    value: "",
    event: keyf1,
    autoComplete: {
      data: 瞳孔大小
    }
  },
  {
    key: "pupilReflexLeft", //瞳孔反射左
    value: "",
    event: keyf1,
    autoComplete: {
      data: 瞳孔反射
    }
  },
  {
    key: "pupilReflexRight", //瞳孔反射右
    value: "",
    event: keyf1,
    autoComplete: {
      data: 瞳孔反射
    }
  },
  {
    key: "field12", //肢体肌力左上
    value: "",
    event: keyf1,
    autoComplete: {
      data: 肌力
    },
    name: "肢体肌力左上"
  },
  {
    key: "field13", //肢体肌力左下
    value: "",
    event: keyf1,
    autoComplete: {
      data: 肌力
    },
    name: "肢体肌力左下"
  },
  {
    key: "field14", //肢体肌力右上
    value: "",
    event: keyf1,
    autoComplete: {
      data: 肌力
    },
    name: "肢体肌力右上"
  },
  {
    key: "field15", //肢体肌力右下
    value: "",
    event: keyf1,
    autoComplete: {
      data: 肌力
    },
    name: "肢体肌力右下"
  },
  {
    key: "field16", //肠鸣音
    value: "",
    event: keyf1,
    name: "肠鸣音"
  },
  {
    key: "field17", //呼吸音
    value: "",
    event: keyf1,
    autoComplete: {
      data: 呼吸音
    },
    name: "呼吸音"
  },

  {
    key: "field18", //标题1
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field19", //标题2
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field20", //标题3
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field21", //标题4
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field22", //标题5
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field23", //标题6
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field24", //标题7
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
    textarea: {
      width: 36
    }
  },
  {
    key: "field25", //标题8
    value: "",
    event: keyf1,
    autoComplete: {
      data: 临时项目
    },
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
    event: function(e, td) {
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
let filterKey2 = '神经内科护记' + ':';

export function getListData4() {
  // listItem("入量名称", info.sheetType).then(res => {
  //   ruList.splice(0, ruList.length);
  //   for (let item of res.data.data) {
  //     ruList.push(item.name);
  //   }
  // });
  // listItem("出量名称", info.sheetType).then(res => {
  //   chuList.splice(0, chuList.length);
  //   for (let item of res.data.data) {
  //     chuList.push(item.name);
  //   }
  //   chuList.push("阴道出血");
  // });
  let list = [
    "意识",
    "呼吸音",
    "瞳孔大小",
    "瞳孔反射",
    "疼痛部位",
    "疼痛评分",
    "饮食性质",
    "肌力",
    "静脉自定义项",
    "出量名称",
    "神内护记尿液性质",
    "神内护记呕吐物性质",
    "神内护记大便性质",
    "神内护记引流量性质",
    "神内护记疼痛性质",
    "神内护记静脉性质",
    "神内护记临时项目",
  ];
  
  list = list.map(key => {
    return key.includes('出量名称') ? filterKey2 + key : key;
  });
  multiDictInfo(list).then(res => {
    let data = res.data.data;
    console.log(data);
    setList(意识, "意识", data);
    setList(呼吸音, "呼吸音", data);
    setList(瞳孔大小, "瞳孔大小", data);
    setList(瞳孔反射, "瞳孔反射", data);
    setList(疼痛部位, "疼痛部位", data);
    setList(疼痛评分, "疼痛评分", data);
    setList(饮食性质, "饮食性质", data);
    setList(饮食性质, "饮食性质", data);
    setList(静脉性质, "神内护记静脉性质", data);
    setList(疼痛性质, "神内护记疼痛性质", data);
    setList(临时项目, "神内护记临时项目", data);
    setList(肌力, "肌力", data);
    setList(静脉自定义项, "静脉自定义项", data);
    setList(出量名称, "出量名称", data, true);
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
  key = key.includes('出量名称') ?  filterKey2 + key : key;
  if (isChildOptions2) {
    for (let item of data[key]) {
      let arr = data[ '神内护记' + item.name + '性质'];
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

