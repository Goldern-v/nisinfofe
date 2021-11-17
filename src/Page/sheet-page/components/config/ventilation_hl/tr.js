// 横沥-ICU机械通气护理单
import {
    multiDictInfo
  } from "../../../api/index";
  import {
    keyf1
  } from "../keyEvent/f1.js";
  import {
    event_date,
    event_time,
    click_date
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
    }, {
      key: "ventilationMode", //通气模式
      value: "",
      event: keyf1,
      name: "通气模式",
      textarea: {
        width: 80
      }
    }, {
      key: "concentration", //氧浓度%
      value: "",
      event: keyf1,
      name: "氧浓度",
      textarea: {
        width: 60
      }
    }, {
      key: "pressure", //压力支持
      value: "",
      event: keyf1,
      name: "压力支持",
      textarea: {
        width: 60
      }
    }, {
      key: "peep", //PEEP
      value: "",
      event: keyf1,
      name: "PEEP",
      textarea: {
        width: 60
      }
    }, {
      key: "inhale", //吸气压力
      value: "",
      event: keyf1,
      name: "吸气压力",
      textarea: {
        width: 60
      }
    }, {
      key: "velocity", //峰流速
      value: "",
      event: keyf1,
      name: "峰流速",
      textarea: {
        width: 60
      }
    }, {
      key: "detonate", //触发灵敏度
      value: "",
      event: keyf1,
      name: "触发灵敏度",
      textarea: {
        width: 60
      }
    },
    {
      key: "expiratory", //呼气灵敏度
      value: "",
      event: keyf1,
      name: "呼气灵敏度",
      textarea: {
        width: 60
      }
    },{
      key: "pressureRise", //压力上升时间
      value: "",
      event: keyf1,
      name: "压力上升时间",
      textarea: {
        width: 60
      }
    },{
      key: "tidalSetting", //潮气量设置参数
      value: "",
      event: keyf1,
      name: "潮气量设置参数",
      textarea: {
        width: 40
      }
    }, {
      key: "tidalActual", //潮气量实际参数
      value: "",
      event: keyf1,
      name: "潮气量实际参数",
      textarea: {
        width: 40
      }
    }, {
      key: "respiratorySetting", //呼吸频率设置参数
      value: "",
      event: keyf1,
      name: "呼吸频率设置参数",
      textarea: {
        width: 40
      }
    }, {
      key: "respiratoryActual", //呼吸频率实际参数
      value: "",
      event: keyf1,
      name: "呼吸频率实际参数",
      textarea: {
        width: 40
      }
    },{
      key: "volume", //分钟通气量
      value: "",
      event: keyf1,
      name: "分钟通气量",
      textarea: {
        width: 60
      }
    },{
      key: "airwayPressure", //平均气道压
      value: "",
      event: keyf1,
      name: "平均气道压",
      textarea: {
        width: 60
      }
    },{
      key: "peakPressure", //峰压
      value: "",
      event: keyf1,
      name: "峰压",
      textarea: {
        width: 60
      }
    },
    {
      key: "sign", //护士签名
      style: {
        minWidth: '72px',
        maxWidth: '72px',
      },
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
  
  export function getListData4() {
    let list = [
      "宫缩",
      "宫缩强度",
      "胎方位",
      "胎心",
      "宫口扩张",
      "先露高低"
    ];
    multiDictInfo(list).then(res => {
      let data = res.data.data;
      setList(宫缩, "宫缩", data);
      setList(宫缩强度, "宫缩强度", data);
      setList(胎方位, "胎方位", data);
      setList(胎心, "胎心", data);
      setList(宫口扩张, "宫口扩张", data);
      setList(先露高低, "先露高低", data);
    });
  }
  
  getListData4();
  /**
   *
   * @param {*} list 原数组
   * @param {*} key 对应的key
   * @param {*} data 数据源
   */
  function setList(list, key, data) {
    list.splice(0, list.length);
    for (let item of data[key]) {
      list.push(item.name);
    }
  }
  