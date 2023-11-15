
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
    // 患者
    {
      key: "temperature", //体温
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td, 4),
      name: "体温",
      textarea: {
        width: 35
      },
       next: "℃"
    },
    {
      key: "bloodPressure", //血压
      value: "",
      textarea: {
        width: 50
      },
      event: function (e, td) {
        if (e.keyCode == 32) {
          e.target.value += "/";
          e.preventDefault();
        }
        keyf1(e, td);
      },
      change: (e, td) => limitChange(e, td, 6),
      name: "血压",
      next: "mmHg"
    },
    {
      key: "heartRate", //心率
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 35
      },
      name: "心率",
      next: "次/分"
    },
    {
      key: "breath", //呼吸
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 35
      },
      name: "心率",
      next: "次/分"
    },
    {
      key: "spo2", //spo2
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 35
      },
      name: "血氧饱和度",
      next: "%"
    },
    // 机器参数
    {
      key: "bloodFlow", //血流量
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "血流量",
      next: "ml/min"
    },
    {
      key: "arterialPressure", //动脉压
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "动脉压",
      next: "mmHg"
    },
    {
      key: "venousPressure", //静脉压
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "静脉压",
      next: "mmHg"
    },
    {
      key: "beforeFilter", //滤前压
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "滤前压",
      next: "mmHg"
    },
    {
      key: "transmembrane", //跨膜压
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "跨膜压",
      next: "mmHg"
    },
    {
      key: "dialysateSpeed", //透析液流速
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "透析液流速",
      next: "ml/h"
    },
    {
      key: "plasmaSpeed", //血浆分离流速
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,8),
      textarea: {
        width: 60
      },
      name: "血浆分离流速",
      next: "ml/h"
    },
    {
      key: "ultrafiltration", //超滤量(ml)
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,6),
      textarea: {
        width: 50
      },
      name: "超滤量(ml)",
      next: "ml"
    },
    {
      key: "machineTemperature", //机温
      value: "",
      event: keyf1,
      change: (e, td) => limitChange(e, td,4),
      textarea: {
        width: 35
      },
      name: "机温",
      next: "℃"
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
        width: "420px",
        background: "transparent"
      },
      textarea: {
        width: 420
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
  

  
