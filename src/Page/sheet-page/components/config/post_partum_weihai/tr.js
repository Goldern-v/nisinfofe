import {
  keyf1
} from "../keyEvent/f1.js";
import {
  event_date,
  event_time,
  click_date,
  click_time
} from "../keyEvent/date";
const gsList = ['好', '良好', '一般']
const gdgdList = ['脐上二横指', '脐上一横指', '脐平', '脐下二横指', '脐下一横指']
const pgList = ['充盈', '不充盈']
export default [
  //日期
  { key: "recordMonth", value: "", event: event_date, click: click_date },
  //时间
  { key: "recordHour", value: "", event: event_time, click: click_time },
  // 血压
  {
    key: "bloodPressure", value: "", event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    name: '血压',
    textarea: {
      width: 80
    }
  },
  {
    key: "fieldTwo", //宫缩
    name: '宫缩',
    value: "",
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete:{ data: gsList },
    textarea: {
      width: 80,
    },
  },
  {
    key: "fieldThree", //出血量
    value: "",
    name: '出血量',
    next: 'ml',
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 80
    }
  },
  {
    key: "fieldFour", //宫底高度
    value: "",
    name: '宫底高度',
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete:{ data: gdgdList },
    textarea: {
      width: 80
    }
  },
  {
    key: "fieldFive", // 膀胱情况
    value: "",
    name: '膀胱情况',
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    autoComplete:{ data: pgList },
    textarea: {
      width: 80
    }
  },
  {
    key: "fieldSix", //阴道检查
    value: "",
    name: '阴道检查',
    event: keyf1,
    change: (e, td) => limitChange(e, td, 6),
    textarea: {
      width: 80
    }
  },
  {
    key: "description", // 备注
    value: "",
    style: {
      textAlign: "left",
      position: "absolute",
      top: "1px",
      bottom: "1px",
      left: "1px",
      width: "350px",
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
