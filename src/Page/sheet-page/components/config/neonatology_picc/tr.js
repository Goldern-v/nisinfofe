import { listItem } from "@/api/record";
import { keyf1 } from "../keyEvent/f1.js";
import { multiDictInfo } from "../../../api/index";
import { event_date, event_time, click_date } from "../keyEvent/date";
import info from '../sheetInfo'

let list = ["√","无"];
export default [
  {
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
    key: "fieldOne1", //穿刺点及周围(正常)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldOne2", //穿刺点及周围(出血与渗液)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldOne3", //穿刺点及周围(局部温度高、触痛、条索状)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldOne4", //穿刺点及周围(红肿、硬结)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldOne5", //穿刺点及周围(瘀斑)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldOne6", //穿刺点及周围(皮疹)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldTwo1", //敷料松脱(有)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldTwo2", //敷料松脱(无)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldThree1", //臂围/腿围左（cm）
    value: "",
    event: keyf1
  },
  {
    key: "fieldThree2", //臂围/腿围右（cm）
    value: "",
    event: keyf1
  },
  {
    key: "fieldFour", //导管外露长度（cm）
    value: "",
    event: keyf1
  },
  {
    key: "fieldFive1", //异常情况(寒战/发热)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldFive2", //异常情况(肢体血栓形成)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldFive3", //异常情况(导管堵塞)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldSix", //肝素/生理盐水封管
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldSeven", //脉冲式冲管
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldEight1", //更换敷料(纱布)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldEight2", //更换敷料(透明敷贴)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldNine1", //更换接头(肝素帽)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldNine2", //更换接头(无针正压接头)
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldTen", //穿刺外接无损伤碟翼针
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldEleven", //加压包扎
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldTwelve", //穿刺点上方热敷
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldThirteen", //使用皮肤保护剂
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  {
    key: "fieldFourteen", //使用药物复通（注明药名剂量）
    value: "",
    event: keyf1,
    autoComplete: {
      data:list
    },
  },
  // {
  //   key: "description", //特殊情况记录
  //   value: "",
  //   style: {
  //     textAlign: "left",
  //     position: "absolute",
  //     top: "1px",
  //     bottom: "1px",
  //     left: "1px",
  //     width: "180px",
  //     background: "transparent"
  //   },
  //   event: function (e, td) {
  //     if (e.keyCode == 9) {
  //       td.value = "    " + td.value;
  //       e.preventDefault();
  //     }
  //     keyf1(e, td);
  //   }
  //   // oninput: next
  // },
  {
    key: "sign",
    value: ""
  },
  {
    key: "audit",
    value: ""
  },
  {
    hidden: true,
    key: "id",
    value: ""
  },
  {
    hidden: false,
    key: "signerNo",
    value: ""
  },
  {
    hidden: true,
    key: "signerName",
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

