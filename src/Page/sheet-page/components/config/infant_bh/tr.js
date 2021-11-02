/*
北海人一-婴儿记录表
*/
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

  let topNoteList=["转科","出院","死亡"]
  let umbilicalList=["干燥","渗血","红肿"]
  let skinList=['黄染','尿布疹','正常']
  let vomitList=["有","无"]
  let shiftList=["日",'中','晚']
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
      key: "temperature", //体温
      value: "",
      event: keyf1,
      name: "体温",
      textarea: {
        width: 50
      },
    },
    {
      key: "topNote", //表顶注释
      value: "",
      event: keyf1,
      name: "表顶注释",
      textarea: {
        width: 60
      },
      autoComplete: {
        data: topNoteList
      },
    },
    {
      key: "shift", //班次
      value: "",
      name: "班次",
      event: keyf1,
      textarea: {
        width: 40
      },
      autoComplete: {
        data: shiftList
      },
    },
    {
      key: "weight", //体重
      value: "",
      name: "体重",
      event: keyf1,
      textarea: {
        width: 40
      },
    },
    {
      key: "urinations", //小便次数
      value: "",
      name: "小便次数",
      event: keyf1,
    },
    {
      key: "stools", //大便次数
      value: "",
      name: "大便次数",
      event: keyf1,
    },
    {
      key: "milkFrequency", //母乳次数
      value: "",
      name: "母乳次数",
      event: keyf1,
    },
    {
      key: "artificialFrequency", //人工次数
      value: "",
      name: "人工次数",
      event: keyf1,
    },
    {
      key: "vomit", //呕吐
      value: "",
      name: "呕吐",
      event: keyf1,
      textarea: {
        width: 50
      },
      autoComplete: {
        data: vomitList
      },
    },
    {
      key: "skin", //皮肤
      value: "",
      name: "皮肤",
      event: keyf1,
      textarea: {
        width: 100
      },
      splice: true||",",
      autoComplete: {
        data: skinList
    }
    },
    {
      key: "umbilical", //脐带
      value: "",
      name: "脐带",
      event: keyf1,
      textarea: {
        width: 100
      },
      splice: true||",",
      autoComplete: {
        data: umbilicalList
      },
    },
    {
      key: "sign",//签名
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
      value: true,
    },
  ];
  
  