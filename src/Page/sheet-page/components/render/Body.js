import sheetInfo from "../config/sheetInfo/index";
import {
  matchMark
} from "./Mark.js";
import {
  getRowNum
} from "../utils/sheetRow";
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

export {
  Tr
};

// 区分科室
function switechSheetType(type) {
  let schema;
  switch (type) {
    case "special": {
      // 陵城外一科 特别护理单
      schema = require("../config/tbhld_lc/tr.js").default;
    }
    break;
  case "icu_lc": {
    // 内科重症医学科
    schema = require("../config/nkzzyxk_lc/tr.js").default;
  }
  break;
  case "com_lc": {
    // 外科重症医学科（全院通用护理记录单）
    schema = require("../config/wkzzyxk_lc/tr.js").default;
  }
  break;
  case "newborn_lc": {
    // 陵城区-新生儿科 里的 新生儿监护
    schema = require("../config/neonatology_lc/tr.js").default;
  }
  break;
  case "Record_Children_Serious_Lc": {
    // 陵城区-病重（病危）
    schema = require("../config/picu_lc/tr.js").default;
  }
  break;
  case "neurology": {
    // 神经内科
    schema = require("../config/neurology/tr.js").default;
  }
  break;
  case "obstetrics": {
    // 产科
    schema = require("../config/obstetrics/tr.js").default;
  }
  break;
  case "neurosurgery": {
    // 神经外科
    schema = require("../config/neurosurgery/tr.js").default;
  }
  break;
  case "burn_plastic": {
    // 烧伤整形科护理
    schema = require("../config/burn_plastic/tr.js").default;
  }
  break;
  case "general_surgery": {
    // 普外科
    schema = require("../config/general_surgery/tr.js").default;
  }
  break;
  case "pediatrics": {
    // 儿内科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "gynecology": {
    // 妇科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "infectious_diseases": {
    // 感染科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "orthopedics": {
    // 骨科
    schema = require("../config/orthopedics/tr.js").default;
  }
  break;
  case "micro_surgery": {
    // 显微手足科
    schema = require("../config/orthopedics/tr.js").default;
  }
  break;
  case "respiration": {
    // 呼吸科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "emergency": {
    // 急诊科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "urology": {
    // 泌尿科
    schema = require("../config/urology/tr.js").default;
  }
  break;
  case "endocrinology": {
    // 内分泌科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "burn": {
    // 烧伤科
    schema = require("../config/burn/tr.js").default;
  }
  break;
  case "ear_nose_throat": {
    // 耳喉鼻科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "chinese_medicine": {
    // 中医科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "reha_medicin": {
    // 康复医学科
    schema = require("../config/default/tr.js").default;
  }
  break;
  case "medicine_cardiovascular": {
    // 心血管内科
    schema = require("../config/medicine_cardiovascular/tr.js").default;
  }
  break;
  case "neonatology": {
    // 产科 里的 新生儿科
    schema = require("../config/neonatology/tr.js").default;
  }
  break;
  case "neonatology2": {
    // 新生儿科 里的 新生儿科
    schema = require("../config/neonatology2/tr.js").default;
  }
  break;
  case "hemodialysis": {
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
  case "trauma_orthopedics": {
    // 创骨科
    schema = require("../config/trauma_orthopedics/tr.js").default;
  }
  break;
  case "joint": {
    // 关节骨科
    schema = require("../config/joint/tr.js").default;
  }
  break;
  case "spinal_orthopedics": {
    // 脊柱骨科
    schema = require("../config/spinal_orthopedics/tr.js").default;
  }
  break;
  case "gastroenterology": {
    // 消化内科
    schema = require("../config/gastroenterology/tr.js").default;
  }
  break;
  case "prenatal": {
    // 产前
    schema = require("../config/prenatal/tr.js").default;
  }
  break;
  case "post_partum": {
    // 产后观察
    schema = require("../config/post_partum/tr.js").default;
  }
  break;
  case "blood_purification": {
    // 血透
    schema = require("../config/blood_purification/tr.js").default;
  }
  break;
  case "oxytocin": {
    // 催产素静脉点滴观察
    schema = require("../config/oxytocin/tr.js").default;
  }
  break;
  case "dressing_count": {
    // 经阴道接生器械敷料清点
    schema = require("../config/dressing_count/tr.js").default;
  }
  break;
  case "thyroid_gland": {
    // 甲状腺乳腺科
    schema = require("../config/thyroid_gland/tr.js").default;
  }
  break;
  case "vein_thrombolysis_hj": {
    // 静脉溶栓护理记录单
    schema = require("../config/jmrs/tr.js").default;
  }
  break;
  case "neurology_wx": {
    // 威县-神经内科
    schema = require("../config/neurology_wx/tr.js").default;
  }
  break;
  case "unified_wx": {
    // 威县-统一护理记录单
    schema = require("../config/unified_wx/tr.js").default;
  }
  break;
  case "intensive_care_wx": {
    // 威县-脑外科重症监护单
    schema = require("../config/intensive_care_wx/tr.js").default;
  }
  break;
  case "ccu_wx": {
    // 威县-CCU监护单（心血管内科）
    schema = require("../config/ccu_wx/tr.js").default;
  }
  break;
  case "newborn_wx": {
    // 威县-产科新生儿
    schema = require("../config/newborn_wx/tr.js").default;
  }
  break;
  case "cpr": {
    // cpr心肺复苏单（心血管内科）
    schema = require("../config/cpr/tr.js").default;
  }
  break;
  case "maternal_newborn_lc": {
    // 陵城-孕产妇、新生儿护理观察记录单
    schema = require("../config/maternal_newborn_lc/tr.js").default;
  }
  break;
  case "critical_lc": {
    // 陵城-病重（病危）患者护理记录单
    schema = require("../config/critical_lc/tr.js").default;
  }
  break;
  case "stress_injury_hd": {
    // 花都-压力性损伤护理记录单
    schema = require("../config/stress_injury_hd/tr.js").default;
  }
  break;
  case "common_hd": {
    // 花都-护理记录单
    schema = require("../config/common_hd/tr.js").default;
  }
  break;
  case "picc_maintenance_hd": {
    // 花都-PICC维护记录单
    schema = require("../config/picc_maintenance_hd/tr.js").default;
  }
  break;
  case "body_temperature_Hd": {
    // 花都-体温记录单
    schema = require("../config/body_temperature_Hd/tr.js").default;
  }
  break;
  case "prenatal_hd": {
    // 花都-护理记录单（产前护理记录单）
    schema = require("../config/prenatal_hd/tr.js").default;
  }
  break;
  case "postpartum_hd": {
    // 花都-护理记录单（产后护理记录单）
    schema = require("../config/postpartum_hd/tr.js").default;
  }
  break;
  case "wait_delivery_hd": {
    // 花都-护理记录单（候产记录单）
    schema = require("../config/wait_delivery_hd/tr.js").default;
  }
  break;
  case "neurosurgery_hd": {
    // 花都-护理记录单（神经外科）
    schema = require("../config/neurosurgery_hd/tr.js").default;
  }
  break;
  case "neonatology_hd": {
    // 花都-护理记录单（新生儿科）
    schema = require("../config/neonatology_hd/tr.js").default;
  }
  break;
  case "neonatology2_hd": {
    // 花都-护理记录单（新生儿）
    schema = require("../config/neonatology2_hd/tr.js").default;
  }
  break;
  case "contraction_inhibitor_hd": {
    // 花都-宫缩抑制剂静脉滴注观察记录单
    schema = require("../config/contraction_inhibitor_hd/tr.js").default;
  }
  break;
  case "magnesium_sulphate_hd": {
    // 花都-硫酸镁注射液静脉滴注观察记录单
    schema = require("../config/magnesium_sulphate_hd/tr.js").default;
  }
  break;
  case "intervention_cure_hd": {
    // 花都-介入治疗护理记录单
    schema = require("../config/intervention_cure_hd/tr.js").default;
  }
  break;
  case "hemodialysis_CRRT_hd": {
    // 花都-血透室CRRT治疗记录单
    schema = require("../config/hemodialysis_CRRT_hd/tr.js").default;
  }
  break;
  case "mild_hypothermia_hd": {
    // 花都-新生儿亚低温治疗护理记录表
    schema = require("../config/mild_hypothermia_hd/tr.js").default;
  }
  break;
  case "additional_count_hd": {
    // 花都-通用护理记录单副单
    schema = require("../config/additional_count_hd/tr.js").default;
  }
  break;
  case "additional_count2_hd": {
    // 花都-通用护理记录单副单2
    schema = require("../config/additional_count2_hd/tr.js").default;
  }
  break;
  case "intervention_cure": {
    // 厚街-介入治疗术护理记录单
    schema = require("../config/intervention_cure/tr.js").default;
  }
  break;
  case "common_wj": {
    // 武警广东省总队医院-护理记录单
    schema = require("../config/common_wj/tr.js").default;
  }
  break;
  case "neonatology_picc": {
    // 厚街-新生儿科PICC导管维护护理记录单
    schema = require("../config/neonatology_picc/tr.js").default;
  }
  break;
  case "pediatrics_jm": {
    // 江门妇幼 - 儿科护理记录单
    schema = require("../config/pediatrics_jm/tr.js").default;
  }
  break;
  case "tcm_pediatrics_jm": {
    // 江门妇幼 - 中医儿科护理记录单
    schema = require("../config/tcm_pediatrics_jm/tr.js").default;
  }
  break;
  case "neonatal_care_jm": {
    // 江门妇幼 - 新生儿监护单
    schema = require("../config/neonatal_care_jm/tr.js").default;
  }
  break;
  case "neonatology_jm": {
    // 江门妇幼 - 产科新生儿护理记录单
    schema = require("../config/neonatology_jm/tr.js").default;
  }
  break;
  case "child_recovery_jm": {
    // 江门妇幼 - 儿童康复科记录单
    schema = require("../config/child_recovery_jm/tr.js").default;
  }
  break;
  case "pediatric_surgery_jm": {
    // 江门妇幼 - 小儿外科护理记录单
    schema = require("../config/pediatric_surgery_jm/tr.js").default;
  }
  break;
  case "picu_hemodialysis_jm": {
    // 江门妇幼 - PICU血液透析护理记录单
    schema = require("../config/picu_hemodialysis_jm/tr.js").default;
  }
  break;
  case "body_temperature_hj": {
    // 聊城二院 - 体温单
    schema = require("../config/body_temperature_hj/tr.js").default;
  }
  break;
  case "internal_eval_lcey": {
    // 聊城二院 - (内科)一般患者护理评估记录单
    schema = require("../config/internal_eval_lcey/tr.js").default;
  }
  break;
  case "surgical_eval_lcey": {
    // 聊城二院 - (外科)一般患者护理评估记录单
    schema = require("../config/surgical_eval_lcey/tr").default;
  }
  break;
  case "surgical_eval2_lcey": {
    // 聊城二院 - (胸心外科)一般患者护理评估记录单
    schema = require("../config/surgical_eval2_lcey/tr").default;
  }
  break;
  case "critical2_lcey": {
    // 聊城二院 - 病重（病危）患者护理记录单（不带瞳孔）
    schema = require("../config/critical2_lcey/tr").default;
  }
  break;
  case "critical_lcey": {
    // 聊城二院 - 病重（病危）患者护理记录单（带瞳孔）
    schema = require("../config/critical_lcey/tr").default;
  }
  break;
  case "peri_intervention_lcey": {
    // 聊城二院 - 围介入期护理观察记录单
    schema = require("../config/peri_intervention_lcey/tr").default;
  }
  break;
  case "intervention_cure_lcey": {
    // 聊城二院 - 介入诊疗护理记录单
    schema = require("../config/intervention_cure_lcey/tr").default;
  }
  break;
  case "access_lcey": {
    // 聊城二院 - 出入量记录单
    schema = require("../config/access_lcey/tr").default;
  }
  break;
  case "body_temperature_wj": {
    // 武警总队 - 体温单
    schema = require("../config/body_temperature_wj/tr").default;
  }
  break;
  case "common_zsqy": {
    // 中山七院-护理记录单
    schema = require("../config/common_zsqy/tr.js").default;
  }
  break;
  case "common_gzry": {
    // 贵州人医-护理记录单
    schema = require("../config/common_gzry/tr.js").default;
  }
  break;
  case "common_hl": {
    // 横沥-护理记录单
    schema = require("../config/common_hl/tr.js").default;
  }
  break;
  case "rescue_hl": {
    // 横沥-急救抢救单
    schema = require("../config/emergency_rescue/tr.js").default;
  }
  break;
  case "emergency_stay_hl": {
    // 横沥-留观护理记录单
    schema = require("../config/emergency_stay_hl/tr.js").default;
  }
  break;
  case "prenatal_hl": {
    // 横沥-产前待产
    schema = require("../config/prenatal_hl/tr.js").default;
  }
  break;
  case "oxytocin_hl": {
    // 横沥-催产素静脉点滴观察
    schema = require("../config/oxytocin_hl/tr.js").default;
  }
  break;
  case "contraction_inhibitor_hl": {
    // 横沥-宫缩抑制剂静脉滴注观察记录单
    schema = require("../config/contraction_inhibitor_hl/tr.js").default;
  }
  break;
  // case "dressing_count_hl": {
  //   // 横沥-经阴道接生器械敷料清点
  //   schema = require("../config/dressing_count_hl/tr.js").default;
  // }
  // break;
  case "magnesium_sulphate_hl": {
    // 横沥-硫酸镁注射液静脉滴注观察记录单
    schema = require("../config/magnesium_sulphate_hl/tr.js").default;
  }
  break;
  case "neonatology_hl": {
    // 横沥 - 新生儿护理记录单
    schema = require("../config/neonatology_hl/tr.js").default;
  }
  break;
  case "obstetrics_hl": {
    // 横沥 - 护理记录单(产科)
    schema = require("../config/obstetrics_hl/tr.js").default;
  }
  break;
  case "gynecology_hl": {
    // 横沥 - 护理记录单(妇科)
    schema = require("../config/gynecology_hl/tr.js").default;
  }
  break;
  case "blood_purify_hl": {
    // 横沥 - 持续性血液净化治疗记录表
    schema = require("../config/blood_purify_hl/tr.js").default;
  }
  break;
  case "icu_sn": {
    // 山南 - ICU护理记录单
    schema = require("../config/icu_sn/tr.js").default;
  }
  break;
  case "postpartum_sn": {
    // 山南 - 产后观察记录单
    schema = require("../config/postpartum_sn/tr.js").default;
  }
  break;
  case "clinical_sn": {
    // 山南 - 临床护理记录单
    schema = require("../config/clinical_sn/tr.js").default;
  }
  break;
  case "common_sn": {
    // 山南 - 通用护理记录单
    schema = require("../config/common_sn/tr.js").default;
  }
  break;
  case "maternity_sn": {
    // 山南 - 妇产科通用护理记录单
    schema = require("../config/maternity_sn/tr.js").default;
  }
  break;
  default: {
    schema = require("../config/default/tr.js").default;
  }
  break;
  }
  return schema;
}
