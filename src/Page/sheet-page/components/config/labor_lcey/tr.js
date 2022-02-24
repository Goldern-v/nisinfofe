// 产程记录单
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
      event: event_time
    },
    {
      key: "bloodPressure", // 血压
      value: "",
      event: keyf1,
      name:"血压",
      next:"mmHg",
      textarea: {
        width: 80
      },
    },
    {
      key: "contractions", // 宫缩
      value: "",
      event: keyf1,
      name:"宫缩",
      next:"",
      autoComplete: {
        data: ['规律', '20-30s|3-4min','20-30s|5-6min', '20-30s|7-8min','不规律']
      },
      textarea: {
        width: 100
      },
    },
    {
      key: "position", // 胎位
      value: "",
      event: keyf1,
      name:"胎位",
      next:"",
      autoComplete: {
        data: ['枕左前', '枕右前','枕左横', '枕右横','枕左后','枕左后']
      },
      textarea: {
        width: 70
      },
    },
    {
      key: "cardiac", // 胎心
      value: "",
      event: keyf1,
      name:"胎心",
      next:"",
      textarea: {
        width: 70
      },
    },
    {
      key: "presentation", // 先露
      value: "",
      event: keyf1,
      name:"先露",
      next:"",
      autoComplete: {
        data: ['头', '臀','肩']
      },
      textarea: {
        width: 70
      },
    },
    {
      key: "seat", // 先露位置
      value: "",
      event: keyf1,
      name:"先露位置",
      next:"",
      autoComplete: {
        data: ['浮', '-3','-2','-1','0', '1','2','3',]
      },
      textarea: {
        width: 70
      },
    },
    {
      key: "hardness", // 宫颈硬度
      value: "",
      event: keyf1,
      name:"宫颈硬度",
      next:"",
      autoComplete: {
        data: ['软', '中','硬']
      },
      textarea: {
        width: 70
      },
    },
    {
      key: "dilation", // 宫颈扩张
      value: "",
      event: keyf1,
      name:"宫颈扩张",
      next:"",
      textarea: {
        width: 70
      },
    },
    {
      key: "membranes", // 胎膜
      value: "",
      event: keyf1,
      name:"胎膜",
      next:"",
      autoComplete: {
        data: ['未破', '已破']
      },
      textarea: {
        width: 70
      },
    },
    {
      key: "vagina", // 检查阴道
      value: "",
      event: keyf1,
      name:"检查阴道",
      next:"",
      textarea: {
        width: 70
      },
    },
    {
      key: "description", //护理措施
      value: "",
      style: {
        textAlign: "left",
        position: "absolute",
        top: "1px",
        bottom: "1px",
        left: "1px",
        width: "240px",
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
      value: false
    }
  ];
  