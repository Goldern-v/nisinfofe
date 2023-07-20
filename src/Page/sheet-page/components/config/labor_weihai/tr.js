import {
  keyf1, limitChange
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
const twList = ['LOA', 'LOT', 'LOP', 'ROA', 'ROT', 'LMA', 'RMA', 'LSA', 'RSA', 'LScA', 'RScA']
const xlList = ['头', '臀', '肩', '足']
const xlwzList = ['-3', '-2', '-1', '0', '+1', '+2', '+3']
const gjydList = ['软', '硬', '中']
const tmList = ['破', '未破']
const ysxzList = ['清', 'Ⅰ°', 'Ⅱ°', 'Ⅲ°', '血性']
export default [
  //日期
  { key: "recordMonth", value: "", event: event_date, click: click_date },
  //时间
  { key: "recordHour", value: "", event: event_time, click: click_time },
  // 血压
  {
    key: "bloodPressure", value: "", event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name:"血压",
    next:"mmHg",
    textarea: {
      width: 60
    }
  },
  {
    key: "lengthTime", //持续时间
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name:"持续时间",
    next: 's',
    textarea: {
      width: 45,
    },
  },
  {
    key: "intervalTime", //间隔时间
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name:"间隔时间",
    next: 'min',
    textarea: {
      width: 45,
    },
  },
  {
    key: "fetalPosition", //胎位
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete:{ data: twList },
    splice: '/',
    name:"胎位",
    textarea: {
      width: 90
    }
  },
  {
    key: "points", //胎心
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name:"胎心",
    next:"（次/分）",
    textarea: {
      width: 60
    }
  },
  {
    key: "position", // 先露
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete:{ data: xlList },
    name: "先露",
    textarea: {
      width: 60
    }
  },
  {
    key: "firstPosition", //先露位置
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "先露位置",
    autoComplete:{ data: xlwzList },
    textarea: {
      width: 60
    }
  },
  {
    key: "hardness", //宫颈硬度
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "宫颈硬度",
    autoComplete:{ data: gjydList },
    textarea: {
      width: 60
    }
  },
  {
    key: "receptivity", //宫颈容受
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "宫颈容受",
    next: "%",
    textarea: {
      width: 60
    }
  },
  {
    key: "expand", //宫颈扩张
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "宫颈扩张",
    next: "cm",
    textarea: {
      width: 60
    }
  },
  {
    key: "embryolemma", //胎膜
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: { data: tmList },
    name: "胎膜",
    textarea: {
      width: 60
    }
  },
  {
    key: "character", //羊水性状
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete: { data: ysxzList },
    name: "羊水性状",
    textarea: {
      width: 60
    }
  },
  {
    key: "vaginalExam", //阴道检查
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: "阴道检查",
    textarea: {
      width: 80
    }
  },
  {
    key: "description", // 其他处理
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "250px",
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
  },
  {
    key: "sign",
    value: "",
    style: {
      minWidth: '60px'
    }
  },
  // {
  //   key: "sign2",
  //   value: "",
  //   style: {
  //     minWidth: '55px'
  //   }
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
  // {
  //   hidden: true,
  //   key: "signerName2",
  //   value: ""
  // },
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
  // {
  //   hidden: true,
  //   key: "signerNo2",
  //   value: ""
  // },
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
