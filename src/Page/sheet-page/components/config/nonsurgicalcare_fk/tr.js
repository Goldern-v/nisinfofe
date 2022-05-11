 // 武汉肺科 - 非手术科室护理记录单
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
      width: 30
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
    event: keyf1,
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 50
    },
    name: "血压",
    next: "mmHg"
  },
  {
    key: "spo2", //spo2
    value: "",
    event: keyf1,
    name: "spo2",
    next:"%",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 30
    },
  },
  {
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    name: "意识",
    change: (e, td) => limitChange(e, td, 8),
    textarea: {
      width: 50
    },
    autoComplete: {
      data: ['A','B','C','D','E','F']
    }
  },
  {
    key: "pupilSizeLeft", //瞳孔左
    value: "",
    event: keyf1,
    name: "瞳孔左",
    next: "mm",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    }
  },
  {
    key: "pupilSizeRight", //瞳孔右
    value: "",
    event: keyf1,
    name: "瞳孔右",
    next: "mm",
    change: (e, td) => limitChange(e, td, 4),
    textarea: {
      width: 30
    }
  },
  {
    key: "pupilReflex", //瞳孔对光反射
    value: "",
    event: keyf1,
    name: "对光反射",
    change: (e, td) => limitChange(e, td, 4),
    autoComplete: {
      data: ['存在', '减弱', '消失']
    },
    textarea: {
      width: 30
    }
  },
  {
    key: "customItem1", // 自定义1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "customItem2", // 自定义2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "venousCatheter", //静脉置管
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: ['N']
    }
  },
  {
    key: "drainageTube1", //导管及置引流1
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: ['N']
    }
  },
  {
    key: "drainageTube2", //导管及置引流2
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: ['N']
    }
  },
  {
    key: "drainageTube3", //导管及置引流3
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "food", //入量项目
    value: "",
    event: keyf1,
    name:"入量项目",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "foodSize", //入量量
    value: "",
    event: keyf1,
    name:"入量量",
    next:"ml",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "discharge", //出量项目
    value: "",
    event: keyf1,
    name:"出量项目",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "outputColor", //出量颜色
    value: "",
    event: keyf1,
    name:"出量颜色",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "outputTraits", //出量性状
    value: "",
    event: keyf1,
    name:"出量性状",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "dischargeSize", //出量量
    value: "",
    event: keyf1,
    name:"出量量",
    next:"ml",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    }
  },
  {
    key: "compressedSkin", //受压皮肤
    value: "",
    event: keyf1,
    name:"受压皮肤",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: ['N','破溃']
    }
  },
  {
    key: "recumbentPosition", //卧位
    value: "",
    event: keyf1,
    name:"卧位",
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 40
    },
    autoComplete: {
      data: ['左','右','平']
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
    textarea: {
      width: 180
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

// export function getListData() {
//   let list = [
//     "胎膜",
//     "胎位",
//     "宫缩持续/间歇",
//     "先露高低",
//     "宫颈管",
//     "羊水性状",
//     "宫颈扩张",
//     "宫缩强度",
//     "花都:产前护理记录单:出量名称"
//   ];
//   multiDictInfo(list).then(res => {
//     let data = res.data.data;
//     // setList(tmList, list[0], data);
//     setList(twList, list[1], data);
//     setList(gscxjxList, list[2], data);
//     setList(xlgdList, list[3], data);
//     setList(gjgList, list[4], data);
//     setList(ysxzList, list[5], data);
//     setList(gjkzList, list[6], data);
//     setList(gsqdList, list[7], data);
//     // setList(入量名称, "入量名称", data);
//     setList(出量名称, list[8], data);
//   });
// }

// getListData();
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
