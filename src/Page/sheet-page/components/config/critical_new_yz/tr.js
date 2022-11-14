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
      name:"意识",
      autoComplete: {
        data: ['清醒', '嗜睡', '昏睡', '模糊', '谵妄', '浅昏迷', '昏迷', '深昏迷','冬眠状态','麻醉未醒','镇静状态']
      },
      textarea: {
        width: 54
      },
    },
    {
      key: "pupilLeft", //左(mm)
      value: "",
      event: keyf1,
      name:"瞳孔左",
      next:"mm",
      textarea: {
        width: 30
      },
    },
    {
      key: "pupilRight", //右(mm)
      value: "",
      event: keyf1,
      name:"瞳孔右",
      next:"mm",
      textarea: {
        width: 30
      },
    },
    {
      key: "pupilReflect", //光反射
      value: "",
      event: keyf1,
      name:"光反射",
      autoComplete: {
        data: ['++','+','-']
      },
    },
    {
      key: "temperature", //体温
      value: "",
      event: keyf1,
      name:"T",
      next:" ℃",
      textarea: {
        width: 32
      },
    },
    {
      key: "pulse", //   心率/脉搏
      value: "",
      event: keyf1,
      name:"HR/PR",
      next:"次/分",
      textarea: {
        width: 35
      },
    },
    {
      key: "breath", //呼吸
      value: "",
      event: keyf1,
      name:"R",
      next:"次/分",
      textarea: {
        width: 35
      },
    },
    {
      key: "bloodPressure", //血压
      value: "",
      event: keyf1,
      name:"BP",
      next:"mmHg",
      textarea: {
        width: 55
      },
    },
    {
      key: "spo2", //SPO2
      value: "",
      event: keyf1,
      name:"SPO2",
      next:"%",
      textarea: {
        width: 35
      },
    },
    {
      key: "oxygenWay", 
      value: "",
      event: keyf1,
      name:"鼻导管",
      textarea: {
        width: 50
      },
    },
    {
      key: "fieldSix", //氧疗L/min
      value: "",
      event: keyf1,
      name:"氧疗面罩",
      textarea: {
        width: 40
      },
    },
    {
      key: "fieldSeven", // 自定义标题
      value: "",
      event: keyf1,
      textarea: {
        width: 40
      },
    },
    {
      key: "food", //入量
      value: "",
      event: keyf1,
      name:"入量",
      textarea: {
        width: 70
      },
    },
    {
      key: "foodSize", // 量(ml)
      value: "",
      event: keyf1,
      name:"入量（量）",
      next:"(ml)",
      textarea: {
        width: 35
      },
    },
    {
      key: "discharge", // 出量
      value: "",
      event: keyf1,
      name:"出量",
      autoComplete: {
        data: ['尿', '大便', '痰液', '呕吐物', '引流量', '其他']
      },
      textarea: {
        width: 70
      },
    },
    {
      key: "dischargeSize", // 量(ml)
      value: "",
      event: keyf1,
      name:"出量（量）",
      next:"(ml)",
      textarea: {
        width: 35
      },
    },
    {
      key: "fieldEight",
      value: "",
      event: keyf1,
      name:"颜色形状",
      next:"",
      textarea: {
        width: 45
      },
    },
    {
      key: "customTitle", // 自定义标题
      value: "",
      event: keyf1,
      textarea: {
        width: 45
      },
    },
    {
      key: "fieldNine", // 自定义标题
      value: "",
      event: keyf1,
      textarea: {
        width: 45
      },
    },
    // {
    //   key: "fieldTen", // 自定义标题
    //   value: "",
    //   event: keyf1,
    //   textarea: {
    //     width: 45
    //   },
    // },
    {
      key: "description", //病情观察及护理措施
      value: "",
      style: {
        textAlign: "left",
        position: "absolute",
        top: "1px",
        bottom: "1px",
        left: "1px",
        width: "245px",
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
    },
    // {
    //   key: "sign2",
    //   value: "",
    // },
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
      value: true
    }
  ];
  