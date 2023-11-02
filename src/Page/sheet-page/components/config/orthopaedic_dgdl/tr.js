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
// let 入量名称 = [];
// let 出量名称 = [];

let 意识 = ['清醒', '浅昏迷', '深昏迷', '昏迷', '模糊', '嗜睡', '昏睡', '谵妄','镇静状态'];
let 出量颜色 = ['黄色', '鲜红色', '暗红色', '墨绿色', '浓茶色','淡红色','茶褐色','淡黄色','淡黄浑浊','淡红浑浊','浅茶色','乳白色','淡蓝色'];
// 医院反应下拉会无反应。bug这边复现不了，可能是发请求拿数据是卡住。所以数据写死
let 入量名称=['饮水','输液','静脉泵入','静注','口服','输血','肌注','鼻饲']
let 出量名称=['盆腔引流管','肝下引流管','胃管','尿管','膈下引流管','脾窝引流管','腹腔引流管','胸腔引流管','尿量','肠造口','呕吐物','大便','伤口皮下引流球','胃造瘘管','空肠造瘘管','肛管引流管','温氏孔引流管','胸腔闭式引流管','肾造瘘管','膀胱造瘘管','肾周引流管','输尿管导管','伤口引流管']
let 对光名称=['灵敏','消失','迟钝']
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
    // click: click_time
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    name: "T",
    next: "℃",
    textarea: {
      width: 40
    },
  },
  {
    key: "pulse", //脉搏心率
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "P/HR",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "R",
    next: "次/分",
    textarea: {
      width: 40
    },
  },
  {
    key: "bloodPressure", //血压
    value: "",
    change: (e, td) => limitChange(e, td, 5),
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: "BP",
    next: "mmHg",
    textarea: {
      width: 55
    },
  },
  {
    key: "spo2", //SPO₂(%)
    value: "",
    event: keyf1,
    name: "血氧饱和度",
    next: "%",
    change: (e, td) => limitChange(e, td, 3),
    textarea: {
      width: 40
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "意识",
    autoComplete: {
      data: 意识
    },
    textarea: {
      width: 40
    },
  },
  {
    key: "pupilSizeLeft",
    value: "",
    event: keyf1,
    name: "mm-左",
    change: (e, td) => limitChange(e, td, 8),
    style: {
      textAlign: "left",
    }
  },
  {
    key: "pupilSizeRight",
    value: "",
    event: keyf1,
    name: "mm-右",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 35
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "pupilReflexLEFT",
    value: "",
    event: keyf1,
    name: "对光反射-左",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 对光名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "pupilReflexRight",
    value: "",
    event: keyf1,
    name: "对光反射-右",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 35
    },
    autoComplete: {
      data: 对光名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "food", //食物, 入量
    value: "",
    event: keyf1,
    name: "入量名称",
    change: (e, td) => limitChange(e, td, 10),
    textarea: {
      width: 35,
    },
    autoComplete: {
      data: 入量名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "foodSize", //食物数量  入量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "入量大小",
    next: "ml",
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
      width: 35,
    },
    autoComplete: {
      data: 出量名称
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "dischargeSize", //排出物数量（单位ml）
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 3),
    name: "出量大小",
    next: "ml",
    textarea: {
      width: 35
    },
  },
  {
    key: "customTitle1", //标题1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle2", //标题2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle3", //标题3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle4", //标题4
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle5", //标题5
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle6", //标题6
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle7", //标题7
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
   {
     key: "customTitle8", //标题8
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle9", //标题9
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
    }
  },
  {
    key: "customTitle10", //标题10
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 37
    },
    style: {
      textAlign: "left",
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
      width: "155px",
      background: "transparent",
    },
    textarea: {
      width: 155
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
    value: true,
  },
];

// export function getListData4() {
//   let list = [
//     "花都:通用护理记录单:入量名称",
//     "花都:通用护理记录单:出量名称",
//   ];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     setList(入量名称, "花都:通用护理记录单:入量名称", data);
//     setList(出量名称, "花都:通用护理记录单:出量名称", data);
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
//   list.splice(0, list.length);
//   for (let item of data[key]) {
//     list.push(item.name);
//   }
// }
