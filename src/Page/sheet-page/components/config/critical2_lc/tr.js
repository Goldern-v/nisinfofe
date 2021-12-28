/*
陵城-病重（病危）患者护理记录（新生儿）
*/
import {
    keyf1
  } from "../keyEvent/f1.js";
  import {
    event_date,
    event_time,
    click_date,
    click_time
  } from "../keyEvent/date";
  export default [{
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
    key: "consciousness", //意识
    value: "",
    event: keyf1,
    textarea:{
      width: 40
    }
  },
  {
    key: "temperature", //体温
    value: "",
    name: "体温",
    next: "℃",
    event: keyf1,
    textarea:{
      width: 32
    }
  },
  {
    key: "pulse", //心率
    value: "",
    name: "心率",
    next: "次/分",
    event: keyf1,
    textarea:{
      width: 32
    }
  },
  {
    key: "breath", //呼吸
    value: "",
    name: "呼吸",
    next: "次/分",
    event: keyf1,
    textarea:{
      width: 32
    }
  },
  {
    key: "bloodPressure", //血压
    value: "",
    name: "血压",
    event: keyf1,
    textarea:{
      width: 48
    }
  },
  {
    key: "spo2", //sop2
    value: "",
    name: "spo2",
    event: keyf1,
    textarea:{
      width: 32
    }
  },
  {
    key: "reaction", // 反应
    value: "",
    name: "反应",
    event: keyf1,
    textarea: {
      width: 48
    }
  },
  {
    key: "cry", // 哭声
    value: "",
    name: "哭声",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "muscleTension", // 肌张力
    value: "",
    name: "肌张力",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "sucking", // 吸吮力
    value: "",
    name: "吸吮力",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "nasal", // 氧疗鼻导管
    value: "",
    name: "鼻导管",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "mask", // 氧疗面罩
    value: "",
    name: "面罩",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "therapyCustomize", // 氧疗自定义
    value: "",
    name: "氧疗自定义",
    event: keyf1,
    textarea: {
      width: 36
    }
  },
  {
    key: "food", // 入量名称
    value: "",
    name: "入量名称",
    event: keyf1,
    textarea: {
      width: 46
    }
  },
  {
    key: "foodSize", // 入量ml
    value: "",
    name: "入量ml",
    event: keyf1,
    textarea: {
      width: 46
    },
   
  },
  {
    key: "discharge", // 出量名称
    value: "",
    name: "出量名称",
    event: keyf1,
    textarea: {
      width: 46
    },
  },
  {
    key: "dischargeSize", // 出量ml
    value: "",
    name: "出量ml",
    event: keyf1,
    textarea: {
      width: 46
    },
  },
  {
    key: "colorTraits", // 出量颜色形状
    value: "",
    name: "出量颜色形状",
    event: keyf1,
    textarea: {
      width: 46
    },
  },
  {
    key: "customTitle1", //标题1
    value: "",
    event: keyf1,
    textarea: {
      width: 46
    }
  },
  {
    key: "customTitle2", //标题2
    value: "",
    event: keyf1,
    textarea: {
      width: 46
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
      width: "300px",
      background: "transparent",
      fontSize: "12px"
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
  