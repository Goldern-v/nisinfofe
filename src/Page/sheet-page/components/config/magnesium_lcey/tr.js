// 硫酸镁静滴观察记录单
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
    },
    {
      key: "concentration", // 浓度
      value: "",
      event: keyf1,
      name:"浓度",
      next:"%",
      textarea: {
        width: 60
      },
    },
    {
      key: "drips", // 滴速
      value: "",
      event: keyf1,
      name:"滴速",
      next:"滴/分",
      textarea: {
        width: 60
      },
    },
    {
      key: "tendon", // 膝腱反射
      value: "",
      event: keyf1,
      name:"膝腱反射",
      next:"",
      autoComplete: {
            data: ['正常', '减弱','消失']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "muscleTension", // 肌张力
      value: "",
      event: keyf1,
      name:"肌张力",
      next:"",
      autoComplete: {
            data: ['正常', '减弱','高']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "symptom", // 自觉症状
      value: "",
      event: keyf1,
      name:"自觉症状",
      next:"",
      autoComplete: {
            data: ['有', '无']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "contractions", // 宫缩
      value: "",
      event: keyf1,
      name:"宫缩",
      next:"",
      autoComplete: {
            data: ['无', '不规律','规律']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "breath", // 呼吸
      value: "",
      event: keyf1,
      name:"呼吸",
      next:"次/分",
      textarea: {
        width: 60
      },
    },
    {
      key: "urine", // 尿量
      value: "",
      event: keyf1,
      name:"尿量",
      next:"ml/h",
      textarea: {
        width: 60
      },
    },
    {
      key: "cardiac", // 胎心
      value: "",
      event: keyf1,
      name:"胎心",
      next:"次/分",
      textarea: {
        width: 60
      },
    },
    {
      key: "description", //护理措施
      value: "",
      hidden:true,
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
  