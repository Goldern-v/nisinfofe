import sheetInfo from "../config/sheetInfo/index";
import { matchMark } from "./Mark.js";
import { getRowNum } from "../utils/sheetRow";
export default function Body(data = [], index) {
  let rowNum = getRowNum(index);
  let bodyModel = [];
  for (let i = 0; i < Math.max(data.length, rowNum); i++) {
    bodyModel[i] = Tr(data[i]);
  }
  return bodyModel;
}

function Tr(data = {}) {
  let schema = switechSheetType(sheetInfo.sheetType);
  let mergetTr = [];
  for (let index = 0; index < schema.length; index++) {
    let keys = Object.keys(schema[index]);
    let obj = {};
    for (let item of keys) {
      if (item != "value") {
        obj[item] = schema[index][item];
      }
    }
    obj.value = data[schema[index].key] || "";
    obj.markObj = matchMark(data.id, schema[index].key);
    mergetTr.push(obj);
  }
  mergetTr.push({
    hidden: true,
    key: "markObj",
    value: matchMark(data.id, "all")
  });
  /** 年份分割 */
  mergetTr.push({
    hidden: true,
    key: "yearBreak",
    value: data.yearBreak
  });
  return mergetTr;
}

export const nullRow = () => {
  let schema = switechSheetType(sheetInfo.sheetType);
  return Tr(schema);
};

export { Tr };

// 区分科室
function switechSheetType(type) {
  let schema;
  switch (type) {
    case "neurology":
      {
        // 神经内科
        schema = require("../config/neurology/tr.js").default;
      }
      break;
    case "obstetrics":
      {
        // 产科
        schema = require("../config/obstetrics/tr.js").default;
      }
      break;
    case "neurosurgery":
      {
        // 神经外科
        schema = require("../config/neurology/tr.js").default;
      }
      break;
    case "burn_plastic":
      {
        // 烧伤整形科护理
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "general_surgery":
      {
        // 普外科
        schema = require("../config/general_surgery/tr.js").default;
      }
      break;
    case "pediatrics":
      {
        // 儿内科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "gynecology":
      {
        // 妇科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "infectious_diseases":
      {
        // 感染科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "orthopedics":
      {
        // 骨科
        schema = require("../config/orthopedics/tr.js").default;
      }
      break;
    case "micro_surgery":
      {
        // 显微手足科
        schema = require("../config/orthopedics/tr.js").default;
      }
      break;
    case "respiration":
      {
        // 呼吸科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "emergency":
      {
        // 急诊科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "urology":
      {
        // 泌尿科
        schema = require("../config/urology/tr.js").default;
      }
      break;
    case "endocrinology":
      {
        // 内分泌科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "burn":
      {
        // 烧伤科
        schema = require("../config/burn/tr.js").default;
      }
      break;
    case "ear_nose_throat":
      {
        // 耳喉鼻科
        schema = require("../config/default/tr.js").default;
      }
      break;
    case "medicine_cardiovascular":
      {
        // 心血管内科
        schema = require("../config/medicine_cardiovascular/tr.js").default;
      }
      break;
    case "neonatology":
      {
        // 产科 里的 新生儿科
        schema = require("../config/neonatology/tr.js").default;
      }
      break;
    case "neonatology2":
      {
        // 新生儿科 里的 新生儿科
        schema = require("../config/neonatology2/tr.js").default;
      }
      break;
    case "hemodialysis":
      {
        // 血透室
        schema = require("../config/default/tr.js").default;
      }
      break;
    // case "tumor_hemodialysis":
    //   {
    //     // 肿瘤血液科
    //     schema = require("../config/tumor_hemodialysis/tr.js").default;
    //   }
    //   break;
    case "trauma_orthopedics":
      {
        // 创骨科
        schema = require("../config/trauma_orthopedics/tr.js").default;
      }
      break;
    case "joint":
      {
        // 关节骨科
        schema = require("../config/joint/tr.js").default;
      }
      break;
    case "spinal_orthopedics":
      {
        // 脊柱骨科
        schema = require("../config/spinal_orthopedics/tr.js").default;
      }
      break;
    case "gastroenterology":
      {
        // 消化内科
        schema = require("../config/gastroenterology/tr.js").default;
      }
      break;
    case "prenatal":
      {
        // 产前
        schema = require("../config/prenatal/tr.js").default;
      }
      break;
    case "post_partum":
      {
        // 产后观察
        schema = require("../config/post_partum/tr.js").default;
      }
      break;
    case "blood_purification":
      {
        // 血透
        schema = require("../config/blood_purification/tr.js").default;
      }
      break;
    case "oxytocin":
      {
        // 催产素静脉点滴观察
        schema = require("../config/oxytocin/tr.js").default;
      }
      break;
    case "dressing_count":
      {
        // 经阴道接生器械敷料清点
        schema = require("../config/dressing_count/tr.js").default;
      }
      break;
    case "neurology_wx":
      {
        // 威县-神经内科
        schema = require("../config/neurology_wx/tr.js").default;
      }
      break;
    case "unified_wx":
      {
        // 威县-统一护理记录单
        schema = require("../config/unified_wx/tr.js").default;
      }
      break;
    case "intensive_care_wx":
      {
        // 威县-脑外科重症监护单 
        schema = require("../config/intensive_care_wx/tr.js").default;
      }
      break;
    case "ccu_wx":
      {
        // 威县-CCU监护单（心血管内科）
        schema = require("../config/ccu_wx/tr.js").default;
      }
      break;
    default: {
      schema = require("../config/default/tr.js").default;
    }
  }
  return schema;
}
