import sheetInfo from "../config/sheetInfo/index";
import {
  matchMark
} from "./Mark.js";
import {
  getRowNum
} from "../utils/sheetRow";
// const EMPTY_FLAG = 'empty'
const EMPTY_FLAG = ''
/**
 *  返回表格数据
 * @param {*} data
 * @param {*} index
 * @param {*} customList 自定义标题的选项
 * @returns
 */
export default function Body(data = [], index, customList = []) {
  let rowNum = getRowNum(index);
  let bodyModel = [];
    // 重新设置自定义选项
    let formatCustomObj = {}
    if(['foshanrenyi','fsxt', 'gdtj'].includes(process.env.HOSPITAL_ID) && customList.length > 0) {
      customList.reduce((total, cur) => {
        if (!cur.fieldEn) return total
        if (total[cur.fieldEn]) {
          total[cur.fieldEn].push(cur)
        } else {
          total[cur.fieldEn] = [cur]
        }
        return total
      }, formatCustomObj)
      Object.keys(formatCustomObj).map(v => {
        let item = formatCustomObj[v]
        // 纯标题 返回一个字符串
        if (item[0] && item[0].id === null) {
          formatCustomObj[v] = EMPTY_FLAG
          return
        }
        formatCustomObj[v] = item.sort((a,b) => Number(a.indexNo) - Number(b.indexNo)).map(v => v.options)
      })
    }
  for (let i = 0; i < Math.max(data.length, rowNum); i++) {
    bodyModel[i] = Tr(data[i],i,formatCustomObj);
  }
  return bodyModel;
}
import moment from "moment";
const nowYear=moment().year()

function Tr(data = {}, i, formatCustomObj= {}) {
  let schema = switchSheetType(sheetInfo.sheetType);
  let customColumn = switchNodeTime(sheetInfo.sheetType)
  let mergeTr = [];
  for (let index = 0; index < schema.length; index++) {
    let keys = Object.keys(schema[index]);
    let obj = {};
    for (let item of keys) {
      if (item != "value") {
        obj[item] = schema[index][item];
      }
    }
    obj.value = data[schema[index].key] || "";
    if(obj.key=="nodeTime"){
      obj.value = customColumn[i] || data[schema[index].key] || "";
    }
    // 对自定义选项做修改
    if (formatCustomObj[obj.key]) {
      // 纯标题删除默认选项
      if (formatCustomObj[obj.key] == EMPTY_FLAG && obj.autoComplete) {
        delete obj.autoComplete
      } else {
        obj.autoComplete = {
          data: formatCustomObj[obj.key]
        }
      }
    }
    if(process.env.HOSPITAL_ID == 'wujing'){
      mergeTr.barCodeIdentification = data.barCodeIdentification
      mergeTr.identificationUsage = data.identificationUsage
    }
    obj.markObj = matchMark(data.id, schema[index].key);
    mergeTr.push(obj);
  }
  mergeTr.push({
    hidden: true,
    key: "markObj",
    value: matchMark(data.id, "all")
  });
  /** 年份分割 */
  mergeTr.push({
    hidden: true,
    key: "yearBreak",
    value: data.yearBreak==nowYear?`${data.yearBreak}-`:data.yearBreak
  });
  return mergeTr;
}

export const nullRow = () => {
  let schema = switchSheetType(sheetInfo.sheetType);
  let customColumn = switchNodeTime(sheetInfo.sheetType)
  return Tr(schema);
};

export {
  Tr
};

/**区分科室 */
function switchSheetType(type) {
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
      // 陵城区-儿童重症医学科护理记录单【PICU】
      schema = require("../config/picu_lc/tr.js").default;
    }
      break;
    case "record_children_serious2_lc": {
      // 陵城区-儿童重症医学科护理记录单【PICU】新
      schema = require("../config/record_children_serious2_lc/tr.js").default;
    }
      break;
    case "critical2_lc": {
      //  陵城区-病重（病危）患者护理记录（新生儿）
        schema = require("../config/critical2_lc/tr.js").default;
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
    case "newunified_wx": {
      // 威县- 新统一护理记录单
      schema = require("../config/newunified_wx/tr.js").default;
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
    case "eicu_care_wx": {
      // 威县-重症护理记录单II（EICU）
      schema = require("../config/eicu_care_wx/tr.js").default;
    }
      break;
    case "caseamount_wx": {
        // 威县-新生儿科重症监护出入量记录单
        schema = require("../config/caseamount_wx/tr.js").default;
      }
      break;
    case "newbornintensive_wx": {
        // 威县-新生儿科重症监护记录单
        schema = require("../config/newbornintensive_wx/tr.js").default;
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
    case "critical_new_lc": {
      // 陵城-病重（病危）患者护理记录单
      schema = require("../config/critical_new_lc/tr.js").default;
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
    case "nursing_dglb": {
      // 东莞寮步-护理记录单
      schema = require("../config/nursing_dglb/tr.js").default;
    }
      break;
    case "postpartum_dglb": {
      // 东莞寮步-产后护理记录单
      schema = require("../config/postpartum_dglb/tr.js").default;
    }
      break;
    case "prenatal_dglb": {
      // 东莞寮步- 产前待产记录单
      schema = require("../config/prenatal_dglb/tr.js").default;
    }
      break;
    case "baby_dglb": {
      // 东莞寮步-护理记录单（新生儿科）
      schema = require("../config/baby_dglb/tr.js").default;
    }
      break;
    case "baby_obs_dglb": {
      // 东莞寮步-新生儿护理记录单(产科专用)
      schema = require("../config/baby_obs_dglb/tr.js").default;
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
    case "nicu_custody_hd": {
      // 花都-NICU监护单
      schema = require("../config/nicu_custody_hd/tr.js").default;
    }
      break;
    case "transshipment_hd": {
      // 花都-方舱医院护理记录单
      schema = require("../config/transshipment_hd/tr.js").default;
    }
      break;
    case "intervention_cure": {
      // 厚街-介入治疗术护理记录单
      schema = require("../config/intervention_cure/tr.js").default;
    }
      break;
    case "common_wj": {
      // 武警-护理记录单
      schema = require("../config/common_wj/tr.js").default;
    }
      break;
    case "postpartum_nurse_wj": {
      // 武警-产科护理记录单
      schema = require("../config/postpartum_nurse_wj/tr.js").default;
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
    case "catheterplacement_jm": {
      // 江门妇幼 - 深静脉导管置入术后维护单
      schema = require("../config/catheterplacement_jm/tr.js").default;
    }
    break;
    case "picc_custody_jm": {
      // 江门妇幼 - PICU监护单
      schema = require("../config/picc_custody_jm/tr.js").default;
    }
      break;
    case "nicu_custody_jm": {
      // 江门妇幼 - NICU监护单
      schema = require("../config/nicu_custody_jm/tr.js").default;
    }
      break;
    case "aerate_param_jm": {
      // 江门妇幼 - 氧疗及机械通气参数记录单
      schema = require("../config/aerate_param_jm/tr.js").default;
    }
      break;
    case "change_shift_jm": {
      // 江门妇幼 - 交班记录单
      schema = require("../config/change_shift_jm/tr.js").default;
    }
      break;
    case "postpartumnursing_jm": {
      // 江门妇幼 - 产后护理记录单
      schema = require("../config/postpartumnursing_jm/tr.js").default;
    }
      break;
    case "antenatalwaiting_jm": {
      // 江门妇幼 - 产前待产记录单
      schema = require("../config/antenatalwaiting_jm/tr.js").default;
    }
      break;
    case "obstetricnursing_jm": {
      // 江门妇幼 - 产科护理记录单
      schema = require("../config/obstetricnursing_jm/tr.js").default;
    }
      break;
    case "breastkenursing_jm": {
      // 江门妇幼 - 乳腺科护理记录单
      schema = require("../config/breastkenursing_jm/tr.js").default;
    }
      break;
    case "entdepartment_jm": {
      // 江门妇幼 - 耳鼻喉科护理记录单
      schema = require("../config/entdepartment_jm/tr.js").default;
    }
      break;
    case "gynaecology_jm": {
      // 江门妇幼 - 妇科护理记录单
      schema = require("../config/gynaecology_jm/tr.js").default;
    }
      break;
    case "generalsurgery_jm": {
      // 江门妇幼 - 普外科护理记录单
      schema = require("../config/generalsurgery_jm/tr.js").default;
    }
      break;
    case "safemetachysis_jm": {
      // 江门妇幼 - 输血护理记录单
      schema = require("../config/safemetachysis_jm/tr.js").default;
    }
      break;
    case "body_temperature_hj": {
      // 聊城二院 - 体温单
      schema = require("../config/body_temperature_hj/tr.js").default;
    }
      break;
      // case "body_temperature_hl": {
      //   // 横沥 - 体温单
      //   schema = require("../config/body_temperature_hl/tr.js").default;
      // }
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
      // 暂时先用
    case "critical_new_lcey": {
      // 聊城二院 - 病重（病危）患者护理记录单（带瞳孔）(新)
      schema = require("../config/critical_new_lcey/tr").default;
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
    case "cardiology_lcey": {
      // 聊城二院 - 心内科介入患者观察记录单
      schema = require("../config/cardiology_lcey/tr").default;
    }
      break;
    case "access_lcey": {
      // 聊城二院 - 出入量记录单
      schema = require("../config/access_lcey/tr").default;
    }
      break;
    case "maternal_lcey": {
      // 聊城二院 - 产妇产后观察记录单
      schema = require("../config/maternal_lcey/tr").default;
    }
      break;
    case "magnesium_lcey": {
      // 聊城二院 - 硫酸镁静滴观察记录单
      schema = require("../config/magnesium_lcey/tr").default;
    }
      break;
    case "cardiac_lcey": {
      // 聊城二院 - 胎心记录单
      schema = require("../config/cardiac_lcey/tr").default;
    }
      break;
    case "labor_lcey": {
      // 聊城二院 - 产程记录单
      schema = require("../config/labor_lcey/tr").default;
    }
      break;
    case "internal_eval_linyi": {
      // 临邑人医 - 一般患者护理评估记录单
      schema = require("../config/internal_eval_linyi/tr.js").default;
    }
      break;
    case "babymonitor_linyi": {
      // 临邑人医 - 一般患者护理评估记录单
      schema = require("../config/babymonitor_linyi/tr.js").default;
    }
      break;
    case "critical_linyi": {
      // 临邑人医 - 病重（病危）患者护理记录单
      schema = require("../config/critical_linyi/tr").default;
    }
      break;
    case "critical_new_linyi": {
      // 临邑人医 - 病重（病危）患者护理记录单（新）
      schema = require("../config/critical_new_linyi/tr.js").default;
    }
      break;
    case "ops_linyi": {
      // 临邑人医 - 围手术期患者护理记录
      schema = require("../config/ops_linyi/tr").default;
    }
      break;
    case "baby_lcey": {
      // 聊城二院 - 新生儿监护记录单
      schema = require("../config/baby_lcey/tr").default;
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
    // 贵州人医
    case "common_gzry": {
      // 贵州人医-护理记录单
      schema = require("../config/common_gzry/tr.js").default;
    }
      break;
    case "access_gzry": {
      // 贵州人医-出入量护理记录单
      schema = require("../config/access_gzry/tr.js").default;
    }
      break;
    case "vitalsigns_gzry": {
      // 贵州人医-生命体征监测及观察记录
      schema = require("../config/vitalsigns_gzry/tr.js").default;
    }
      break;
    case "basicpipeline_gzry": {
      // 贵州人医-基础护理及管道护理护理记录单
      schema = require("../config/basicpipeline_gzry/tr.js").default;
    }
      break;
    case "neonatus_gzry": {
      // 贵州人医-新生儿护理记录单
      schema = require("../config/neonatus_gzry/tr.js").default;
    }
      break;
    case "waiting_birth_gzry": {
      // 贵州人医-产程记录单
      schema = require("../config/waiting_birth_gzry/tr.js").default;
    }
      break;
    case "newborn_care_gzry": {
      // 贵州人医-新生儿患者护理记录单
      schema = require("../config/newborn_care_gzry/tr.js").default;
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
    case "dressing_count_hl": {
      // 横沥-经阴道接生器械敷料清点
      schema = require("../config/dressing_count_hl/tr.js").default;
    }
      break;
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
    case "aerate_param_hl": {
      // 横沥 - 儿科机械通气护理单
      schema = require("../config/aerate_param_hl/tr").default;
    }
      break;
    case "ventilation_hl": {
        // 横沥-ICU机械通气护理单
        schema = require("../config/ventilation_hl/tr.js").default;
    }
    break;
    case "blood_circulation_hl": {
      // 横沥 - 手外科术后血运观察表
      schema = require("../config/blood_circulation_hl/tr.js").default;
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
    case "icu_qz": {
      // 曲周县 - 重症护理记录单
      schema = require("../config/icu_qz/tr.js").default;
    }
      break;
    case "intersurgerycure_qzx": {
      // 曲周县 - 介入手术治疗护理记录单
      schema = require("../config/intersurgerycure_qzx/tr.js").default;
    }
      break;
    case "newborn_qzx": {
      // 曲周县 - 新生儿护理记录单
      schema = require("../config/newborn_qzx/tr.js").default;
    }
      break;
    case "newborn_intensive_qz": {
      // 曲周县 - 新生儿重症护理记录单
      schema = require("../config/newborn_intensive_qz/tr.js").default;
    }
      break;
    case "ecgmonitoring_bh": {
      // 北海市 - 心电监护观察记录
      schema = require("../config/ecgmonitoring_bh/tr.js").default;
    }
      break;
    case "bloodpulse2_bh": {
      // 北海市 - 血压脉搏呼吸记录
      schema = require("../config/bloodpulse2_bh/tr.js").default;
    }
      break;
    case "bloodpulse_bh": {
      // 北海市 - 血压脉搏呼吸记录（产科）
      schema = require("../config/bloodpulse_bh/tr.js").default;
    }
      break;
    case "respiratory_bh": {
      // 北海市 - 呼吸内科危重记录单
      schema = require("../config/respiratory_bh/tr.js").default;
    }
      break;
    case "generalcare_bh": {
      // 北海市 - 一般患者护理记录
      schema = require("../config/generalcare_bh/tr.js").default;
    }
      break;
    case "criticallycare_bh": {
      // 北海市 - 病重（危）患者护理记录
      schema = require("../config/criticallycare_bh/tr.js").default;
    }
      break;
    case "criticalobstetric_bh": {
      // 北海市 - 产科病重（危）患者护理记录
      schema = require("../config/criticalobstetric_bh/tr.js").default;
    }
      break;
    case "neurosurgery_bh": {
      // 北海市 - 神经外科危重护理记录
      schema = require("../config/neurosurgery_bh/tr.js").default;
    }
      break;
    case "prenatalcheck_bh": {
      // 北海市 - 产前检查治疗记录表
      schema = require("../config/prenatalcheck_bh/tr.js").default;
    }
      break;
    case "access_bh": {
      // 北海市 - 出入量记录单
      schema = require("../config/access_bh/tr.js").default;
    }
      break;
    case "infant_bh": {
      // 北海市 - 婴儿记录表
      schema = require("../config/infant_bh/tr.js").default;
    }
      break;
    case "neurology_bh": {
      // 北海市 - 神经内科危重护理单
      schema = require("../config/neurology_bh/tr.js").default;
    }
      break;
    case "diabetes_bh": {
      // 北海市 - 糖尿病治疗观察表
      schema = require("../config/diabetes_bh/tr.js").default;
    }
      break;
    case "revivemonitoring_bh": {
      // 北海市 - 心胸外科术后复苏监测记录表
      schema = require("../config/revivemonitoring_bh/tr.js").default;
    }
      break;
    case "orthopaedic_bh": {
      // 北海市 - 骨科危重患者护理记录
      schema = require("../config/orthopaedic_bh/tr.js").default;
    }
      break;
    case "surgery_bh": {
      // 北海市 - 普外危重患者护理记录
      schema = require("../config/surgery_bh/tr.js").default;
    }
      break;
    case "transplant_bh": {
      // 北海市 - 肢体与组织移植血液循环观察记录单
      schema = require("../config/transplant_bh/tr.js").default;
    }
      break;
    case "ophthalmology_bh": {
      // 北海市 - 眼科护理记录单
      schema = require("../config/ophthalmology_bh/tr.js").default;
    }
    break;
    case "labor_bh": {
      // 北海市 - 产程观察记录
      schema = require("../config/labor_bh/tr.js").default;
    }
      break;
    case "emergency_bh": {
      // 北海市 - 急诊CRRT治疗记录单
      schema = require("../config/emergency_bh/tr.js").default;
    }
      break;
    case "observation_bh": {
      // 北海市 - 急诊ICU病情观察表
      schema = require("../config/observation_bh/tr.js").default;
    }
      break;
    case "department_bh": {
      // 北海市 - 急诊科重症监护室(EICU)CRRT 治疗记录单
      schema = require("../config/department_bh/tr.js").default;
    }
      break;
    case "seriously_bh": {
      // 北海市 - 心胸外科病重（危）患者护理记录
      schema = require("../config/seriously_bh/tr.js").default;
    }
      break;
    case "monitoring_bh": {
      // 北海市 - 心胸外科心电监护观察记录
      schema = require("../config/monitoring_bh/tr.js").default;
    }
      break;
    case "nursingrecords_zxy": {
      // 南方中西医 - 护理记录单
      schema = require("../config/nursingrecords_zxy/tr.js").default;
    }
      break;
    case "emergencynursing_zxy": {
      // 南方中西医 - 急诊留观护理单
      schema = require("../config/emergencynursing_zxy/tr.js").default;
    }
      break;
    case "encephalopathy_zxy": {
      // 南方中西医 - 脑病科观察记录
      schema = require("../config/encephalopathy_zxy/tr.js").default;
    }
      break;
    case "brainobservation_zxy": {
      // 南方中西医 - 脑科观察记录
      schema = require("../config/brainobservation_zxy/tr.js").default;
    }
      break;
    case "recordicu1_zxy": {
      // 南方中西医 - 重症监护病房护理记录单(表一)
      schema = require("../config/recordicu1_zxy/tr.js").default;
    }
      break;
    case "recordicu2_zxy": {
      // 南方中西医 - 重症监护病房护理记录单(表二)
      schema = require("../config/recordicu2_zxy/tr.js").default;
    }
      break;
    case "recordicu3_zxy": {
      // 南方中西医 - 重症监护病房护理记录单(表三)
      schema = require("../config/recordicu3_zxy/tr.js").default;
    }
      break;
    case "waiting_birth_wj": {
      // 武警 - 待产护理记录单
      schema = require("../config/waiting_birth_wj/tr.js").default;
    }
      break;
    case "postpartum_wj": {
      // 武警 - 产后(产房)观察记录单
      schema = require("../config/postpartum_wj/tr.js").default;
    }
      break;
    case "common_xg": {
      // 东莞谢岗 - 护理记录单
      schema = require("../config/common_xg/tr.js").default;
    }
      break;
    case "neonatology_xg": {
      // 东莞谢岗 - 新生儿护理记录单
      schema = require("../config/neonatology_xg/tr.js").default;
    }
      break;
    case "postpartum_xg": {
      // 东莞谢岗 - 产后护理记录单
      schema = require("../config/postpartum_xg/tr.js").default;
    }
      break;
    case "prenatal_xg": {
      // 东莞谢岗 - 产前待产记录单
      schema = require("../config/prenatal_xg/tr.js").default;
    }
      break;
    case "icu_cpr_xg": {
      // 东莞谢岗 - ICU心肺复苏单
      schema = require("../config/icu_cpr_xg/tr.js").default;
    }
      break;
    case "peritoneal_xg": {
      // 东莞谢岗 - 腹膜透析记录单
      schema = require("../config/peritoneal_xg/tr.js").default;
    }
      break;
    case "contraction_inhibitor_xg": {
      // 东莞谢岗 - 宫缩抑制剂静脉滴注观察记录单
      schema = require("../config/contraction_inhibitor_xg/tr.js").default;
    }
      break;
    case "magnesium_sulphate_xg": {
      // 东莞谢岗 - 硫酸镁注射液静脉滴注观察记录单
      schema = require("../config/magnesium_sulphate_xg/tr.js").default;
    }
      break;
    case "oxytocin_xg": {
      // 东莞谢岗 - 催产素静脉点滴观察单
      schema = require("../config/oxytocin_xg/tr.js").default;
    }
      break;
    case "internal_xg": {
        // 东莞谢岗 - 护理记录单(内科)
      schema = require("../config/internal_xg/tr.js").default;
    }
      break;
    case "cardiology_fs": {
      // 佛山市一 - 心内科通用护理记录单
      schema = require("../config/cardiology_fs/tr.js").default;
    }
      break;
    case "iabp_fs": {
      // 佛山市一 - IABP护理记录单
      schema = require("../config/iabp_fs/tr.js").default;
    }
      break;
    case "orthopaedic_fs": {
      // 佛山市一 - 护理记录单(骨科通用护理单)
      schema = require("../config/orthopaedic_fs/tr.js").default;
    }
      break;
    case "cervicalspine_fs": {
      // 佛山市一 - 护理记录单(颈椎病保守治疗)
      schema = require("../config/cervicalspine_fs/tr.js").default;
    }
      break;
    case "cervicalspondylosis_fs": {
      // 佛山市一 - 护理记录单(颈椎病手术治疗)
      schema = require("../config/cervicalspondylosis_fs/tr.js").default;
    }
      break;
    case "cervicalfracture_fs": {
      // 佛山市一 - 护理记录单(颈椎骨折手术治疗)
      schema = require("../config/cervicalfracture_fs/tr.js").default;
    }
      break;
    case "burndepartment_fs": {
      // 佛山市一 - 护理记录单(烧伤科)
      schema = require("../config/burndepartment_fs/tr.js").default;
    }
      break;
    case "articulatio_fs": {
      // 佛山市一 - 护理记录单(髋关节置换术后)
      schema = require("../config/articulatio_fs/tr.js").default;
    }
      break;
    case "genus_fs": {
      // 佛山市一 - 护理记录单(膝关节置换术)
      schema = require("../config/genus_fs/tr.js").default;
    }
      break;
    case "handsfeet_fs": {
      // 佛山市一 - 护理记录单(手足科)
      schema = require("../config/handsfeet_fs/tr.js").default;
    }
      break;
    case "generalnursing_fs": {
      // 佛山市一 - 护理记录单(通用护理记录单)
      schema = require("../config/generalnursing_fs/tr.js").default;
    }
      break;
    case "upperdisorders_fs": {
      // 佛山市一 - 护理记录单(上肢疾患保守治疗)
      schema = require("../config/upperdisorders_fs/tr.js").default;
    }
      break;
    case "upperfractures_fs": {
      // 佛山市一 - 护理记录单(上肢骨折术后)
      schema = require("../config/upperfractures_fs/tr.js").default;
    }
      break;
    case "lowerdisorders_fs": {
      // 佛山市一 - 护理记录单(下肢疾患保守治疗)
      schema = require("../config/lowerdisorders_fs/tr.js").default;
    }
      break;
    case "lowerfracture_fs": {
      // 佛山市一 - 护理记录单(下肢骨折术后)
      schema = require("../config/lowerfracture_fs/tr.js").default;
    }
      break;
    case "resection_fs": {
      // 佛山市一 - 护理记录单(肿物切除术)
      schema = require("../config/resection_fs/tr.js").default;
    }
      break;
    case "upperremoved_fs": {
      // 佛山市一 - 护理记录单(上肢内固定物拆除)
      schema = require("../config/upperremoved_fs/tr.js").default;
    }
      break;
    case "lowerremoved_fs": {
      // 佛山市一 - 护理记录单(下肢内固定物拆除)
      schema = require("../config/lowerremoved_fs/tr.js").default;
    }
      break;
    case "osteoporotic_fs": {
      // 佛山市一 - 护理记录单(骨质疏松保守与手术治疗)
      schema = require("../config/osteoporotic_fs/tr.js").default;
    }
      break;
    case "hipdisorders_fs": {
      // 佛山市一 - 护理记录单(髋部疾患保守治疗)
      schema = require("../config/hipdisorders_fs/tr.js").default;
    }
      break;
    case "criticallyill_fs": {
      // 佛山市一 - 护理记录单(危重患者护理记录单)
      schema = require("../config/criticallyill_fs/tr.js").default;
    }
      break;
    case "kneedisease_fs": {
      // 佛山市一 - 护理记录单(膝关节疾患)
      schema = require("../config/kneedisease_fs/tr.js").default;
    }
      break;
    case "kneearthroscopy_fs": {
      // 佛山市一 - 护理记录单(膝关节镜术护理记录单)
      schema = require("../config/kneearthroscopy_fs/tr.js").default;
    }
      break;
    case "thoracicdisease_fs": {
      // 佛山市一 - 护理记录单(胸椎疾病保守治疗)
      schema = require("../config/thoracicdisease_fs/tr.js").default;
    }
      break;
    case "thoracicvertebrae_fs": {
      // 佛山市一 - 护理记录单(胸椎疾病手术治疗)
      schema = require("../config/thoracicvertebrae_fs/tr.js").default;
    }
      break;
    case "lumbardisease_fs": {
      // 佛山市一 - 护理记录单(腰椎疾病保守治疗)
      schema = require("../config/lumbardisease_fs/tr.js").default;
    }
      break;
    case "operationlumbar_fs": {
      // 佛山市一 - 护理记录单(腰椎疾病手术治疗)
      schema = require("../config/operationlumbar_fs/tr.js").default;
    }
      break;
    case "prenatal_fs": {
      // 佛山市一 - 产前待产记录单
      schema = require("../config/prenatal_fs/tr.js").default;
    }
      break;
    case "general_fs": {
      // 佛山市一 - 护理记录单(新生儿科通用)
      schema = require("../config/general_fs/tr.js").default;
    }
        break;
    case "eyegeneral_fs": {
      // 佛山市一 - 护理记录单(眼科通用)
      schema = require("../config/eyegeneral_fs/tr.js").default;
    }
      break;
    case "pupilgeneral_fs": {
      // 佛山市一 - 护理记录单(儿科二区带瞳孔通用)
      schema = require("../config/pupilgeneral_fs/tr.js").default;
    }
      break;
    case "pediatric_fs": {
      // 佛山市一 - 护理记录单(儿科通用)
      schema = require("../config/pediatric_fs/tr.js").default;
    }
      break;
    case "areageneral_fs": {
        // 佛山市一 - 护理记录单(儿科二区通用)
      schema = require("../config/areageneral_fs/tr.js").default;
    }
    case "ultrasound_fs": {
        // 佛山市一 - 护理记录单(超声消融治疗护理巡视记录单)
      schema = require("../config/ultrasound_fs/tr.js").default;
    }
      break;
    case "hydrochloricacid_fs": {
      // 佛山市一 - 盐酸利托君(安宝)观察记录单
      schema = require("../config/hydrochloricacid_fs/tr.js").default;
    }
      break;
    case "magnesiumsulf_fs": {
      // 佛山市一 - 硫酸镁注射静脉滴注观察记录
      schema = require("../config/magnesiumsulf_fs/tr.js").default;
    }
      break;
    case "laborobservation_fs": {
      // 佛山市一 - 产程观察记录单(含静滴催产素记录单)
      schema = require("../config/laborobservation_fs/tr.js").default;
    }
      break;
    case "postpartum_fs": {
      // 佛山市一 - 产程观察记录单(含静滴催产素记录单)
      schema = require("../config/postpartum_fs/tr.js").default;
    }
      break;
    case "babyarea_fs": {
      // 佛山市一 - 爱婴区新生儿护理记录
      schema = require("../config/babyarea_fs/tr.js").default;
    }
      break;
    case "NICU_fs": {
      // 佛山市一 - 新生儿NICU护理记录单
      schema = require("../config/NICU_fs/tr.js").default;
    }
      break;
    case "nonsurgicalcare_fk": {
      // 武汉肺科 - 非手术科室护理记录单
      schema = require("../config/nonsurgicalcare_fk/tr.js").default;
    }
      break;
    case "access_fk": {
        // 武汉肺科 - 出入液量记录单
      schema = require("../config/access_fk/tr.js").default;
    }
      break;
    case "operating_fk": {
        // 武汉肺科 - 手术科室记录单
      schema = require("../config/operating_fk/tr.js").default;
    }
      break;
    case "neonate_sdlj": {
      // 顺德龙江 - 新生儿护理记录单
      schema = require("../config/neonate_sdlj/tr.js").default;
    }
    break;
    case "pediatric3_sdlj": {
      // 顺德龙江 - 产科新生儿护理记录单
      schema = require("../config/pediatric3_sdlj/tr.js").default;
    }
    break;
    case "craniocerebral_sdlj": {
      // 顺德龙江 - 护理记录单（颅脑外科）
      schema = require("../config/craniocerebral_sdlj/tr.js").default;
    }
    break;
    case "ordinary_sdlj": {
      // 顺德龙江 - 护理普通记录单
      schema = require("../config/ordinary_sdlj/tr.js").default;
    }
    break;
    case "intravenous_sdlj": {
      // 顺德龙江 - 硫酸镁、安宝静脉点滴观察记录表
      schema = require("../config/intravenous_sdlj/tr.js").default;
    }
    break;
    case "nursing_sdlj": {
      // 顺德龙江 - 产科护理记录单
      schema = require("../config/nursing_sdlj/tr.js").default;
    }
    break;
    case "nursing_zhzxy": {
      // 珠海中西医 - 护理记录单
      schema = require("../config/nursing_zhzxy/tr.js").default;
    }
    break;
    case "wait_delivery_zhzxy": {
      // 珠海中西医 - 候产记录单
      schema = require("../config/wait_delivery_zhzxy/tr.js").default;
    }
    break;
    case "prenatal_sdlj": {
      // 顺德龙江 - 产前待产记录单
      schema = require("../config/prenatal_sdlj/tr.js").default;
    }
    break;
    case "postpartum_sdlj": {
      // 顺德龙江 - 产后护理记录单
      schema = require("../config/postpartum_sdlj/tr.js").default;
    }
    break;
    case "dreathe_sdlj": {
      // 顺德龙江 - 呼吸专科护理记录单
      schema = require("../config/dreathe_sdlj/tr.js").default;
    }
    break;
    case "urology_sdlj": {
      // 顺德龙江 - 护理记录单（泌尿外科）
      schema = require("../config/urology_sdlj/tr.js").default;
    }
    break;
    case "mechanical_sdlj": {
      // 顺德龙江 - 机械通气监护记录单（儿科）
      schema = require("../config/mechanical_sdlj/tr.js").default;
    }
    break;
    case "orthopaedic_sdlj": {
      // 顺德龙江 - 护理记录单（骨科）
      schema = require("../config/orthopaedic_sdlj/tr.js").default;
    }
    break;
    case "pediatrics_sdlj": {
      // 顺德龙江 - 护理记录单（儿科）
      schema = require("../config/pediatrics_sdlj/tr.js").default;
    }
    break;
    case "microsurgical_sdlj": {
      // 顺德龙江 - 护理记录单（显微外科）
      schema = require("../config/microsurgical_sdlj/tr.js").default;
    }
    break;
    case "neurology_sdlj": {
      // 顺德龙江 - 护理记录单（神经内科）
      schema = require("../config/neurology_sdlj/tr.js").default;
    }
    break;
    case "intervent_sdlj": {
      // 顺德龙江 - 护理记录单（综合介入科）
      schema = require("../config/intervent_sdlj/tr.js").default;
    }
    break;
    case "mild_hypothermia_sdlj": {
      // 顺德龙江-亚低温治疗护理记录表
      schema = require("../config/mild_hypothermia_sdlj/tr.js").default;
    }
      break;
    case "oxytocin_sdlj": {
      // 顺德龙江-催产素静脉点滴观察单
      schema = require("../config/oxytocin_sdlj/tr.js").default;
    }
      break;
    case "cardiovascular_xt": {
      // 佛山杏坛 - 护理记录单（心血管呼吸专科）
      schema = require("../config/cardiovascular_xt/tr.js").default;
    }
      break;
    case "criticaldisease_xt": {
      // 佛山杏坛 - 危重症护理记录单
      schema = require("../config/criticaldisease_xt/tr.js").default;
    }
      break;
    case "pentagram2_xt": {
      // 佛山杏坛 - 护理记录单（眼耳鼻咽喉科）
      schema = require("../config/pentagram2_xt/tr.js").default;
    }
      break;
    case "prenataldelivery2_xt": {
      // 佛山杏坛 - 护理记录单(产前待产记录)
      schema = require("../config/prenataldelivery2_xt/tr.js").default;
    }
      break;
    case "postpartum2_xt": {
      // 佛山杏坛 - 护理记录单(产后)
      schema = require("../config/postpartum2_xt/tr.js").default;
    }
      break;
    case "gynaecology2_xt": {
      // 佛山杏坛 - 护理记录单(妇科专科)
      schema = require("../config/jkjld/tr.js").default;
    }
      break
    case "pediatric3_xt": {
      // 佛山杏坛 - 护理记录单(产科新生儿科)
      schema = require("../config/pediatric3_xt/tr.js").default;
    }
      break
    case "paediatrician2_xt": {
      // 佛山杏坛 - 护理记录单(儿科)
      schema = require("../config/paediatrician2_xt/tr.js").default;
    }
      break
    case "neonatalspecialty2_xt": {
      // 佛山杏坛 - 护理记录单(新生儿专科)
      schema = require("../config/neonatalspecialty2_xt/tr.js").default;
    }
      break
    case "gastroenterology_xt": {
      // 佛山杏坛 - 护理记录单(消化专科)
      schema = require("../config/gastroenterology_xt/tr.js").default;
    }
      break
    case "care3_xt": {
      // 佛山杏坛 - 护理记录单(内三科通用单)
      schema = require("../config/care3_xt/tr.js").default;
    }
      break
    case "care2_xt": {
      // 佛山杏坛 - 外一护理记录单
      schema = require("../config/care2_xt/tr.js").default;
    }
      break
    case "general2_xt": {
      // 佛山杏坛 - 护理记录单
      schema = require("../config/general2_xt/tr.js").default;
    }
      break
    case "fracture_xt": {
      // 佛山杏坛 - 护理记录单（骨折）
      schema = require("../config/fracture_xt/tr.js").default;
    }
    break;
    case "spine_xt": {
      // 佛山杏坛 - 护理记录单（脊柱）
      schema = require("../config/spine_xt/tr.js").default;
    }
    break;
    case "craniocerebral_xt": {
      // 佛山杏坛 - 护理记录单（颅脑）
      schema = require("../config/craniocerebral_xt/tr.js").default;
    }
    break;
    case "general_xt": {
      // 佛山杏坛 - 护理记录单（通用）
      schema = require("../config/general_xt/tr.js").default;
    }
    break;
    case "ipacu_fs": {
      // 佛山市一 - 麻醉科IPACU
      schema = require("../config/ipacu_fs/tr.js").default;
    }
    break;
    case "generalnursing_xt": {
      // 佛山杏坛 - 护理记录单（全院通用）
      schema = require("../config/generalnursing_xt/tr.js").default;
    }
    break;
    case "bloodCircul_xt": {
      // 佛山杏坛 -血运观察护理单（外四科）
      schema = require("../config/bloodCircul_xt/tr.js").default;
    }
    break;
    case "emergency_treat_yx": {
      // 武汉亚心 - 急诊留观记录单
      schema = require("../config/emergency_treat_yx/tr.js").default;
    }
    break;
    case "neonatology_yx": {
      // 武汉亚心 - 新生儿科护理记录单
      schema = require("../config/neonatology_yx/tr.js").default;
    }
    break;
    case "icu_yx": {
      // 武汉亚心 - ICU护理记录单
      schema = require("../config/icu_yx/tr.js").default;
    }
    break;
    case "common_yx": {
      // 武汉亚心 - 护理记录单
      schema = require("../config/common_yx/tr.js").default;
    }
    break;
    case "test_common": {
      // 护理记录单（测试用）
      schema = require("../config/general_xt/tr.js").default;
    }
    break;
    case "prenataldelivery2_tj": {
     // 广东同江 - 产前护理记录
      schema = require("../config/prenataldelivery2_tj/tr.js").default;
    }
      break;
    case "postpartum2_tj": {
      // 广东同江 - 产后护理记录单
      schema = require("../config/postpartum2_tj/tr.js").default;
    }
      break;
    case "pediatric3_tj": {
      // 广东同江 - 产科新生儿护理记录单
      schema = require("../config/pediatric3_tj/tr.js").default;
    }
      break;
    case "generalnursing_tj": {
      // 广东同江 - 护理记录单（全院通用）
        schema = require("../config/generalnursing_tj/tr.js").default;
      }
      break;
    case "baby_tj": {
      // 广东同江 - 新生儿护理记录单
      schema = require("../config/baby_tj/tr.js").default;
    }
      break;
    case "magnesiumsulphate_tj": {
      // 广东同江 - 硫酸镁注射液静脉滴注观察记录单
        schema = require("../config/magnesiumsulphate_tj/tr.js").default;
      }
      break;
    case "blood_tj": {
      // 广东同江 - 血运观察单
        schema = require("../config/blood_tj/tr.js").default;
      }
      break;
    case "surgical_qhwy": {
        // 青海五院 - 外科护理记录单
        schema = require("../config/surgical_qhwy/tr.js").default;
      }
      break;
    case "ophthalmology_qhwy": {
        // 青海五院 - 眼科护理记录单
      schema = require("../config/ophthalmology_qhwy/tr.js").default;
    }
      break;
    case "seriousnursing_qhwy": {
        // 青海五院 - 病重（病危）患者护理记录单（二）
      schema = require("../config/seriouslynursing_qhwy/tr.js").default;
    }
      break;
    case "entnursing_qhwy": {
        // 青海五院 - 耳鼻喉科护理记录单
      schema = require("../config/entnursing_qhwy/tr.js").default;
    }
      break;
    case "obstetrics_qhwy": {
        // 青海五院 - 产科护理记录单
      schema = require("../config/obstetrics_qhwy/tr.js").default;
    }
      break;
    case "orthopedics_qhwy": {
        // 青海五院 - 骨科护理记录单
      schema = require("../config/orthopedics_qhwy/tr.js").default;
    }
      break;
    case "chemotherapy_qhwy": {
        // 青海五院 - 化疗观察记录单
      schema = require("../config/chemotherapy_qhwy/tr.js").default;
    }
      break;
    case "neurosurgery_qhwy": {
        // 青海五院 - 神经外科护理记录单
      schema = require("../config/neurosurgery_qhwy/tr.js").default;
    }
      break;
    case "nurse_jew": {
        // 925医院 - 一般患者护理记录单
      schema = require("../config/nurse_jew/tr.js").default;
    }
    break;
    case "danger_nurse_jew": {
      // 925医院 - 危重患者护理记录单
    schema = require("../config/danger_nurse_jew/tr.js").default;
  }
    break;
    case "internal_eval_weihai": {
      // 威海市立 - 一般患者护理记录单
      schema = require("../config/internal_eval_weihai/tr.js").default;
    }
    break;
    case "baby_weihai": {
      // 威海市立 - 一般患者护理记录单
      schema = require("../config/baby_weihai/tr.js").default;
    }
    break;
    case "critical_new_weihai": {
      // 威海市立 - 病重（病危）患者护理记录单（新）
      schema = require("../config/critical_new_weihai/tr.js").default;
    }
    break;
    case "oxytocin_weihai": {
      // 威海市立 -静脉点滴催产素引产观察表
      schema = require("../config/oxytocin_weihai/tr.js").default
    }
    break;
    case "post_partum_weihai": {
      // 威海市立 - 产后（产房）观察记录单
      schema = require("../config/post_partum_weihai/tr.js").default;
    }
    break;
    case "labor_weihai": {
      // 威海市立 - 产程记录
      schema = require("../config/labor_weihai/tr.js").default;
    }
    break;
    case "inandout_weihai": {
      // 威海市立 - 出入量记录表
      schema = require("../config/inandout_weihai/tr.js").default;
    }
    break;
    case "critical_mahui_weihai": {
      // 危重症护理监护单2-麻恢
      schema = require("../config/critical_mahui_weihai/tr.js").default;
    }
    break;
    case "critical_weihai": {
      // 危重症护理监护单2
      schema = require("../config/critical_weihai/tr.js").default;
    }
    break;
    case "baby_yz": {
      // 临沂沂州 - 新生儿护理记录单
      schema = require("../config/baby_yz/tr.js").default;
    }
      break;
    case "custody_yz": {
        // 临沂沂州 - 监护记录单
        schema = require("../config/custody_yz/tr.js").default;
    }
      break;
    case "internal_eval_yz": {
        //  临沂沂州 - 一般患者护理评估记录单
        schema = require("../config/internal_eval_yz/tr.js").default;
      }
      break;
    case "critical_new_yz": {
        // 临沂沂州- 病重（病危）患者护理记录单（带瞳孔)
        schema = require("../config/critical_new_yz/tr.js").default;
      }
      break;
    case "icu_yz": {
        // 临沂沂州--内科重症医学科
        schema = require("../config/icu_yz/tr.js").default;
    }
        break;
    case "inout_ytll": {
      // 烟台玲珑 - 出入量记录单
      schema = require("../config/inout_ytll/tr.js").default;
    }
      break;
    case "seriousnursing_ytll": {
      // 烟台玲珑-病重（病危）患者评估与护理记录单
      schema = require("../config/seriousnursing_ytll/tr.js").default;
    }
      break;
    case "premiumcare_ytll": {
      // 烟台玲珑 - 病重（危）/特级护理患者评估与护理记录单
      schema = require("../config/premiumcare_ytll/tr.js").default;
    }
      break;
    case "labor_ytll": {
      // 烟台玲珑 - 产程记录单
      schema = require("../config/labor_ytll/tr.js").default;
    }
      break;
    case "labor_con_ytll": {
      // 烟台玲珑-产程记录单(续页)
      schema = require("../config/labor_con_ytll/tr.js").default;
    }
      break;
    case "babymilk_ytll": {
      // 烟台玲珑 - 新生儿加奶记录表
      schema = require("../config/babymilk_ytll/tr.js").default;
    }
      break;
    case "prenatal_ytll": {
      // 烟台玲珑 - 住院待产护理记录
      schema = require("../config/prenatal_ytll/tr.js").default;
    }
      break;
    case "one_whhk": {
      // 武汉汉口 - 护理记录单（一）
      schema = require("../config/one_whhk/tr.js").default;
    }
      break;
    default: {
      schema = require("../config/default/tr.js").default;
    }
      break;
    case "pediatrics_zzwy": {
      // 漳州五院 - 护理记录单（儿科）
      schema = require("../config/pediatrics_zzwy/tr.js").default;
    }
      break;
  }
  return schema;
}
// le y = ''

function switchNodeTime(type){
  let customColumn;
  switch (type) {
    case "cardiology_lcey": {
      let obj = require("../config/cardiology_lcey/noodTime").default;
      customColumn = obj.nodeTime
    }
    break;
  }
  return customColumn
}
