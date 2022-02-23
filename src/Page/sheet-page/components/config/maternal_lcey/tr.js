// 产妇产后观察记录单
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
    // {
    //   key: "consciousness", //意识
    //   value: "",
    //   event: keyf1,
    //   name:"意识",
    //   autoComplete: {
    //     data: ['清醒', '嗜睡', '昏睡', '模糊', '谵妄', '浅昏迷', '昏迷', '深昏迷','冬眠状态','麻醉未醒','镇静状态']
    //   },
    //   textarea: {
    //     width: 54
    //   },
    // },
    {
      key: "bloodPressure", // 血压
      value: "",
      event: keyf1,
      name:"血压",
      next:"mmHg",
      textarea: {
        width: 60
      },
    },
    {
      key: "pulse", // 脉搏
      value: "",
      event: keyf1,
      name:"脉搏",
      next:"次/分",
      textarea: {
        width: 60
      },
    },
    {
      key: "vaginal", // 阴道出血量
      value: "",
      event: keyf1,
      name:"阴道出血量",
      next:"ml",
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
            data: ['硬', '软']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "fundus", // 宫底高度
      value: "",
      event: keyf1,
      name:"宫底高度",
      next:"",
      autoComplete: {
            data: ['平脐', '脐下一横指','脐下两横指','脐上两横指','脐上一横指']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "bladder", // 膀胱充盈情况
      value: "",
      event: keyf1,
      name:"膀胱充盈情况",
      next:"",
      autoComplete: {
            data: ['是', '否']
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
      key: "heart", // 心率
      value: "",
      event: keyf1,
      name:"心率",
      next:"次/分",
      textarea: {
        width: 60
      },
    },
    {
      key: "bloodSugar", // 血糖
      value: "",
      event: keyf1,
      name:"血糖",
      next:"mmol/L",
      textarea: {
        width: 60
      },
    },
    {
      key: "face", // 面色
      value: "",
      event: keyf1,
      name:"面色",
      next:"",
      autoComplete: {
        data: ['红润', '青紫','苍白','黄染']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "sucking", // 吸吮反射
      value: "",
      event: keyf1,
      name:"吸吮反射",
      next:"",
      autoComplete: {
        data: ['强', '弱','未吸吮']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "belly", // 脐部
      value: "",
      event: keyf1,
      name:"脐部",
      next:"",
      autoComplete: {
        data: ['无渗血', '水肿','干燥']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "excrement", // 大便次数
      value: "",
      event: keyf1,
      name:"大便次数",
      next:"",
      autoComplete: {
        data: ['0', '1','2','3','4','5','6']
      },
      textarea: {
        width: 60
      },
    },
    {
      key: "urinate", // 大便次数
      value: "",
      event: keyf1,
      name:"大便次数",
      next:"",
      autoComplete: {
        data: ['0', '1','2','3','4','5','6']
      },
      textarea: {
        width: 60
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
  