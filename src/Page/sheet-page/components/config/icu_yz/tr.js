import {
    listItem
  } from "../../../api/recordDesc";
  import {
    multiDictInfo
  } from "../../../api/index";
  import {
    keyf1
  } from "../keyEvent/f1.js";
  import {
    event_date,
    event_time,
    click_date,
    click_time
  } from "../keyEvent/date";
  import info from "../sheetInfo";
  let 神志 = [];
  let 出量项目 = [];
  let 入量项目 = [];
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
    key: "consciousness", //神志
    value: "",
    event: keyf1,
    autoComplete: {
      data: 神志
    },
    name: '意识'
  },
  {
    key: "temperature", //体温
    value: "",
    event: keyf1,
    name: '体温',
    next: '℃'
  },
  {
    key: "pulse", //心率
    value: "",
    event: keyf1,
    name: '心率',
    next: '次/分'
  },
  {
    key: "bloodPressure", //血压
    value: "",
    event: function (e, td) {
      if (e.keyCode == 32) {
        e.target.value += "/";
        e.preventDefault();
      }
      keyf1(e, td);
    },
    name: '血压脉搏',
    next: 'mmHg'
  },
  {
    key: "breath", //呼吸
    value: "",
    event: keyf1,
    name: '呼吸',
    next: '次/分'
  },
  {
    key: "spo2", //SPO2
    value: "",
    event: keyf1,
    name: 'SPO2'
  },
  {
    key: "oxygenWay", //SPO2
    value: "",
    event: keyf1,
    name: '氧疗鼻导管'
  },
  {
    key: "fieldSix", //SPO2
    value: "",
    event: keyf1,
    name: '氧疗面罩'
  },
  {
    key: "fieldSeven", //SPO2
    value: "",
    event: keyf1,
    name: '氧疗自定义'
  },
  {
    key: "food", //项目（入）
    value: "",
    event: keyf1,
    autoComplete: {
      data: 入量项目
    },
    textarea: {
      width: 110
    },
    name: '入量:项目'
  },
  {
    key: "foodSize", //入量
    value: "",
    event: keyf1,
    name: '入量:入量',
    statBottomLine: true
  },
  {
    key: "discharge", //项目（出）
    value: "",
    event: keyf1,
    autoComplete: {
      data: 出量项目
    },
    textarea: {
      width: 110
    },
    name: '出量:项目'
  },
  {
    key: "dischargeSize", //出量
    value: "",
    event: keyf1,
    name: '出量:出量',
    statBottomLine: true
  },
  {
    key: "fieldEight", //出量
    value: "",
    event: keyf1,
    name: '颜色形状',
    statBottomLine: true
  },
  // {
  //   key: "fieldNine", //SPO2
  //   value: "",
  //   event: keyf1,
  //   name: '自定义1'
  // },
  {
    key: "fieldTen", //SPO2
    value: "",
    event: keyf1,
    name: '自定义2'
  },
  {
    key: "expand2", //SPO2
    value: "",
    event: keyf1,
    name: '自定义3'
  },
  {
    key: "description", //护理记录
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
    key: "sign", //签名
    value: ""
  },
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
  
  export function getListData4() {
    let list = ["陵城神志", "陵城出量", '陵城入量'];
    multiDictInfo(list, info.sheetType).then(res => {
      let data = res.data.data;
      setList(神志, "陵城神志", data);
      setList(出量项目, "陵城出量", data);
      setList(入量项目, '陵城入量', data);
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
  