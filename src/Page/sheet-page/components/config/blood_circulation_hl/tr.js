// 横沥 - 手外科术后血运观察表
import {
    listItem
  } from "../../../api/recordDesc";
  import {
    multiDictInfo
  } from "../../../api/index";
  import {
    keyf1,
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
    {
      key: "fingertips", //  指端/皮瓣正常
      value: "",
      event: keyf1,
      name: "指端/皮瓣正常",
    },
    {
      key: "fingertips1", //     指端/皮瓣暗紫
      value: "",
      event: keyf1,
      name: "指端/皮瓣暗紫"
    },
    {
      key: "fingertips2", //     指端/皮瓣苍白
      value: "",
      event: keyf1,
      name: "指端/皮瓣苍白"
    },
    {
      key: "skin",    //皮温正常
      value: "",
      event: keyf1,
      name: "皮温正常"
    },
    {
      key: "skin1", //皮温偏低
      value: "",
      event: keyf1,
      name: "皮温偏低"

    },
    {
      key: "capillary", //毛细血管充盈实验正常
      value: "",
      event: keyf1,
      name: "毛细血管充盈实验正常"
     
    },
    {
      key: "capillary1", //毛细血管充盈实验慢
      value: "",
      event: keyf1,
      name: "毛细血管充盈实验慢"
     
    },
    {
      key: "capillary2", //毛细血管充盈实验消失
      value: "",
      event: keyf1,
      name: "毛细血管充盈实验消失"
      
    },
    {
      key: "tension", //指端张力正常
      value: "",
      event: keyf1,
      name: "指端张力正常"
    
    },
    {
      key: "tension1", //指端张力慢
      value: "",
      event: keyf1,
      name: "指端张力慢"
      
    },
    {
      key: "tension2", //指端张力消失
      value: "",
      event: keyf1,
      name: "指端张力消失"
     
    },
    {
      key: "degree", //肿胀程度正常
      value: "",
      event: keyf1,
      name: "肿胀程度正常"
      
    },
    {
      key: "degree1", //肿胀程度轻度
      value: "",
      event: keyf1,
      name: "肿胀程度轻度",
    },
    {
      key: "degree2", //肿胀程度中度
      value: "",
      event: keyf1,
      name: "肿胀程度中度",
    },
    {
      key: "degree3", //肿胀程度重度
      value: "",
      event: keyf1,
      name: "肿胀程度重度"
      
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
  
 

  