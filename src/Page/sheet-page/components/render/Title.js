import sheetInfo from "../config/sheetInfo/index";

export default function Title(
  data = [],
  autoData = [],
  index,
  type,
  bodyIndex
) {
  let Th;
  switch (sheetInfo.sheetType) {
    case "special": {
      // 陵城外一科 特别护理单
      Th = JSON.parse(
        JSON.stringify(require("../config/tbhld_lc/th").default)
      );
    }
    break;
  case "icu_lc": {
    // 内科重症医学科
    Th = JSON.parse(
      JSON.stringify(require("../config/nkzzyxk_lc/th").default)
    );
  }
  break;
  case "com_lc": {
    // 外科重症医学科
    Th = JSON.parse(
      JSON.stringify(require("../config/wkzzyxk_lc/th").default)
    );
  }
  break;
  case "newborn_lc": {
    //  陵城区新生儿科 里的 新生儿监护
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_lc/th").default)
    );
  }
  break;
  case "Record_Children_Serious_Lc": {
    // 陵城区-儿童重症医学科护理记录单【PICU】
    Th = JSON.parse(
      JSON.stringify(require("../config/picu_lc/th.js").default)
    );
  }
  break;
  case "record_children_serious2_lc": {
    // 陵城区-儿童重症医学科护理记录单【PICU】（新）
    Th = JSON.parse(
      JSON.stringify(require("../config/record_children_serious2_lc/th.js").default)
    );
  }
  break;
  case "neurology": {
    // 神经内科
    Th = JSON.parse(
      JSON.stringify(require("../config/neurology/th").default)
    );
  }
  break;
  case "critical_medicine_two_hj": {
    // 重症医学病区二区
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_medicine_two_hj/th").default)
    );
  }
  break;
  case "obstetrics": {
    // 产科
    Th = JSON.parse(
      JSON.stringify(require("../config/obstetrics/th").default)
    );
  }
  break;
  case "neurosurgery": {
    // 神经外科
    Th = JSON.parse(
      JSON.stringify(require("../config/neurosurgery/th").default)
    );
  }
  break;
  case "burn_plastic": {
    // 烧伤整形科护理
    Th = JSON.parse(
      JSON.stringify(require("../config/burn_plastic/th").default)
    );
  }
  break;
  case "general_surgery": {
    // 普外科
    Th = JSON.parse(
      JSON.stringify(require("../config/general_surgery/th").default)
    );
  }
  break;
  case "gynecology": {
    // 妇科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "infectious_diseases": {
    // 感染科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "orthopedics": {
    // 骨科
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopedics/th").default)
    );
  }
  break;
  case "micro_surgery": {
    // 显微手足科
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopedics/th").default)
    );
  }
  break;
  case "respiration": {
    // 呼吸科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "emergency": {
    // 急诊科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "urology": {
    // 泌尿科
    Th = JSON.parse(
      JSON.stringify(require("../config/urology/th").default)
    );
  }
  break;
  case "endocrinology": {
    // 内分泌科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "burn": {
    // 烧伤科
    Th = JSON.parse(JSON.stringify(require("../config/burn/th").default));
  }
  break;
  case "ear_nose_throat": {
    // 耳喉鼻科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "chinese_medicine": {
    // 中医科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "reha_medicin": {
    // 康复医学科
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  case "medicine_cardiovascular": {
    // 心血管内科
    Th = JSON.parse(
      JSON.stringify(
        require("../config/medicine_cardiovascular/th").default
      )
    );
  }
  break;
  case "neonatology": {
    // 产科 里的 新生儿科
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology/th").default)
    );
  }
  break;
  case "neonatology2": {
    // 新生儿科 里的 新生儿科
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology2/th").default)
    );
  }
  break;
  case "hemodialysis": {
    // 血透室
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  // case "tumor_hemodialysis":
  //   {
  //     // 肿瘤血液科
  //     Th = JSON.parse(
  //       JSON.stringify(require("../config/tumor_hemodialysis/th").default)
  //     );
  //   }
  //   break;
  case "trauma_orthopedics": {
    // 创骨科
    Th = JSON.parse(
      JSON.stringify(require("../config/trauma_orthopedics/th").default)
    );
  }
  break;
  case "joint": {
    // 关节骨科
    Th = JSON.parse(JSON.stringify(require("../config/joint/th").default));
  }
  break;
  case "spinal_orthopedics": {
    // 脊柱骨科
    Th = JSON.parse(
      JSON.stringify(require("../config/spinal_orthopedics/th").default)
    );
  }
  break;
  case "gastroenterology": {
    // 消化内科
    Th = JSON.parse(
      JSON.stringify(require("../config/gastroenterology/th").default)
    );
  }
  break;
  case "prenatal": {
    // 产前
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal/th").default)
    );
  }
  break;
  case "post_partum": {
    // 产后观察
    Th = JSON.parse(
      JSON.stringify(require("../config/post_partum/th").default)
    );
  }
  break;
  case "blood_purification": {
    // 血透
    Th = JSON.parse(
      JSON.stringify(require("../config/blood_purification/th").default)
    );
  }
  break;
  case "oxytocin": {
    // 催产素静脉点滴观察
    if (process.env.HOSPITAL_ID == 'wujing'){
      Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_wujing/th").default)
    )}else Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin/th").default)
    );
  }
  break;
  case "dressing_count": {
    // 经阴道接生器械敷料清点
    Th = JSON.parse(
      JSON.stringify(require("../config/dressing_count/th").default)
    );
  }
  break;
  case "thyroid_gland": {
    // 甲状腺乳腺科
    Th = JSON.parse(
      JSON.stringify(require("../config/thyroid_gland/th").default)
    );
  }
  break;
  case "vein_thrombolysis_hj": {
    // 静脉溶栓护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/jmrs/th").default)
    );
  }
  break;
  case "neurology_wx": {
    // 威县-神经内科
    Th = JSON.parse(
      JSON.stringify(require("../config/neurology_wx/th").default)
    );
  }
  break;
  case "unified_wx": {
    // 威县-统一护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/unified_wx/th").default)
    );
  }
  break;
  case "newunified_wx": {
    // 威县-统一护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/newunified_wx/th").default)
    );
  }
  break;
  case "intensive_care_wx": {
    // 威县-脑外科重症监护单
    Th = JSON.parse(
      JSON.stringify(require("../config/intensive_care_wx/th").default)
    );
  }
  break;
  case "ccu_wx": {
    // 威县-CCU监护单（心血管内科）
    Th = JSON.parse(JSON.stringify(require("../config/ccu_wx/th").default));
  }
  break;
  case "newborn_wx": {
    // 威县-产科新生儿
    Th = JSON.parse(
      JSON.stringify(require("../config/newborn_wx/th").default)
    );
  }
  break;
  case "eicu_care_wx": {
    // 威县-重症护理记录单II（EICU)
    Th = JSON.parse(
      JSON.stringify(require("../config/eicu_care_wx/th").default)
    );
  }
  break;
  case "caseamount_wx": {
    // 威县-新生儿科重症监护出入量记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/caseamount_wx/th.js").default)
    );
  }
  break;
  case "newbornintensive_wx": {
    // 威县-新生儿科重症监护记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/newbornintensive_wx/th.js").default)
    );
  }
  break;
  case "cpr": {
    // cpr心肺复苏单（心血管内科）
    Th = JSON.parse(JSON.stringify(require("../config/cpr/th").default));
  }
  break;
  case "maternal_newborn_lc": {
    // 陵城-孕产妇、新生儿护理观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/maternal_newborn_lc/th").default)
    );
  }
  break;
  case "critical_lc": {
    // 陵城-病重（病危）患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_lc/th").default)
    );
  }
  break;
  case "critical_new_lc": {
    // 陵城-病重（病危）患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_new_lc/th").default)
    );
  }
  break;
  case "critical2_lc": {
    // 陵城-病重（病危）患者护理记录（新生儿）
    Th = JSON.parse(
      JSON.stringify(require("../config/critical2_lc/th").default)
    );
  }
  break;
  case "stress_injury_hd": {
    // 花都-压力性损伤护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/stress_injury_hd/th").default)
    );
  }
  break;
  case "common_hd": {
    // 花都-护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_hd/th").default)
    );
  }
  break;
  case "nursing_dglb": {
    // 东莞寮步-护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nursing_dglb/th").default)
    );
  }
  break;
  case "postpartum_dglb": {
    // 东莞寮步-产后护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_dglb/th").default)
    );
  }
  break;
  case "prenatal_dglb": {
    // 东莞寮步-产前待产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_dglb/th").default)
    );
  }
  break;
    case "postpartum2_dglb": {
      // 东莞寮步-产后产房观察表
      Th = JSON.parse(
          JSON.stringify(require("../config/postpartum2_dglb/th").default)
      );
    }
      break;
  case "baby_dglb": {
    // 东莞寮步-护理记录单（新生儿科）
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_dglb/th").default)
    );
  }
  break;
  case "baby_obs_dglb": {
    // 东莞寮步-新生儿护理记录单(产科专用)
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_obs_dglb/th").default)
    );
  }
  break;
  case "picc_maintenance_hd": {
    // 花都-PICC维护记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/picc_maintenance_hd/th").default)
    );
  }
  break;
  case "body_temperature_Hd": {
    // 花都-体温记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/body_temperature_Hd/th").default)
    );
  }
  break;
  case "prenatal_hd": {
    // 花都-护理记录单（产前护理记录单）
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_hd/th").default)
    );
  }
  break;
  case "postpartum_hd": {
    // 花都-护理记录单（产后护理记录单）
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_hd/th").default)
    );
  }
  break;
  case "wait_delivery_hd": {
    // 花都-护理记录单（候产记录单）
    Th = JSON.parse(
      JSON.stringify(require("../config/wait_delivery_hd/th").default)
    );
  }
  break;
  case "neurosurgery_hd": {
    // 花都-护理记录单（神经外科）
    Th = JSON.parse(
      JSON.stringify(require("../config/neurosurgery_hd/th").default)
    );
  }
  break;
  case "neonatology_hd": {
    // 花都-护理记录单（新生儿科）
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_hd/th").default)
    );
  }
  break;
  case "neonatology2_hd": {
    // 花都-护理记录单（新生儿）
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology2_hd/th").default)
    );
  }
  break;
  case "contraction_inhibitor_hd": {
    // 花都-宫缩抑制剂静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/contraction_inhibitor_hd/th").default)
    );
  }
  break;
  case "magnesium_sulphate_hd": {
    // 花都-硫酸镁注射液静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesium_sulphate_hd/th").default)
    );
  }
  break;
  case "intervention_cure_hd": {
    // 花都-介入治疗护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/intervention_cure_hd/th").default)
    );
  }
  break;
  case "hemodialysis_CRRT_hd": {
    // 花都-血透室CRRT治疗记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/hemodialysis_CRRT_hd/th").default)
    );
  }
  break;
  case "mild_hypothermia_hd": {
    // 花都-新生儿亚低温治疗护理记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/mild_hypothermia_hd/th").default)
    );
  }
  break;
  case "additional_count_hd": {
    // 花都-通用护理记录单副单
    Th = JSON.parse(
      JSON.stringify(require("../config/additional_count_hd/th").default)
    );
  }
  break;
  case "additional_count2_hd": {
    // 花都-通用护理记录单副单2
    Th = JSON.parse(
      JSON.stringify(require("../config/additional_count2_hd/th").default)
    );
  }
  break;
  case "nicu_custody_hd": {
    // 花都-NICU监护单
    Th = JSON.parse(
      JSON.stringify(require("../config/nicu_custody_hd/th").default)
    );
  }
  break;
  case "transshipment_hd": {
    // 花都-方舱医院护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/transshipment_hd/th").default)
    );
  }
  break;
  case "transshipment_new_hd": {
    // 花都-方舱医院护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/transshipment_new_hd/th").default)
    );
  }
  break;
  case "intervention_cure": {
    // 厚街-介入治疗术护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/intervention_cure/th").default)
    );
  }
  break;
  case "internal_eval_hj": {
    // 厚街-护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/internal_eval_hj/th").default)
    );
  }
  break;
  case "common_wj": {
    // 武警-护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_wj/th").default)
    );
  }
  break;
  case "postpartum_nurse_wj": {
    // 武警-产科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_nurse_wj/th").default)
    );
  }
  break;
  case "generalcare_wj": {
    // 武警-一般患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/generalcare_wj/th").default)
    );
  }
  break;
  case "neonatology_picc": {
    // 新生儿科PICC导管维护护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_picc/th").default)
    );
  }
  break;
  case "pediatrics_jm": {
    // 江门妇幼 - 儿科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatrics_jm/th").default)
    );
  }
  break;
  case "tcm_pediatrics_jm": {
    // 江门妇幼 - 中医儿科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/tcm_pediatrics_jm/th").default)
    );
  }
  break;
  case "neonatal_care_jm": {
    // 江门妇幼 - 新生儿监护单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatal_care_jm/th.js").default)
    );
  }
  break;
  case "neonatology_jm": {
    // 江门妇幼 - 产科新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_jm/th.js").default)
    );
  }
  break;
  case "child_recovery_jm": {
    // 江门妇幼 - 儿童康复科记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/child_recovery_jm/th.js").default)
    );
  }
  break;
  case "pediatric_surgery_jm": {
    // 江门妇幼 - 小儿外科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatric_surgery_jm/th.js").default)
    );
  }
  break;
  case "picu_hemodialysis_jm": {
    // 江门妇幼 - PICU血液透析护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/picu_hemodialysis_jm/th.js").default)
    );
  }
  break;
  case "catheterplacement_jm": {
    // 江门妇幼 - 深静脉导管置入术后维护单
    Th = JSON.parse(
      JSON.stringify(require("../config/catheterplacement_jm/th.js").default)
    );
  }
  break;
  case "picc_custody_jm": {
    // 江门妇幼 - PICU监护单
    Th = JSON.parse(
      JSON.stringify(require("../config/picc_custody_jm/th.js").default)
    );
  }
  break;
  case "nicu_custody_jm": {
    // 江门妇幼 - NICU监护单
    Th = JSON.parse(
      JSON.stringify(require("../config/nicu_custody_jm/th.js").default)
    );
  }
  break;
  case "aerate_param_jm": {
    // 江门妇幼 - 氧疗及机械通气参数记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/aerate_param_jm/th.js").default)
    );
  }
  break;
  case "change_shift_jm": {
    // 江门妇幼 - 交班记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/change_shift_jm/th.js").default)
    );
  }
  break;
  case "postpartumnursing_jm": {
    // 江门妇幼 - 产后护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartumnursing_jm/th.js").default)
    );
  }
  break;
  case "antenatalwaiting_jm": {
    // 江门妇幼 - 产前待产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/antenatalwaiting_jm/th.js").default)
    );
  }
  break;
  case "obstetricnursing_jm": {
    // 江门妇幼 - 产科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/obstetricnursing_jm/th.js").default)
    );
  }
  break;
  case "breastkenursing_jm": {
    // 江门妇幼 - 乳腺科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/breastkenursing_jm/th.js").default)
    );
  }
  break;
  case "entdepartment_jm": {
    // 江门妇幼 - 耳鼻喉科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/entdepartment_jm/th.js").default)
    );
  }
  break;
  case "gynaecology_jm": {
    // 江门妇幼 - 妇科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/gynaecology_jm/th.js").default)
    );
  }
  break;
  case "generalsurgery_jm": {
    // 江门妇幼 - 普外科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/generalsurgery_jm/th.js").default)
    );
  }
  break;
  case "safemetachysis_jm": {
    // 江门妇幼 - 输血护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/safemetachysis_jm/th.js").default)
    );
  }
  break;
  case "ear_nose_jm": {
    // 江门妇幼 - 耳鼻喉科护理记录单(成人）
    Th = JSON.parse(
      JSON.stringify(require("../config/ear_nose_jm/th.js").default)
    );
  }
  break;
  case "internalCareRecord": {
    // 江门妇幼 - 内科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/internalCareRecord/th.js").default)
    );
  }
  break;
  case "body_temperature_hj": {
    // 聊城二院 - 体温单
    Th = JSON.parse(
      JSON.stringify(require("../config/body_temperature_hj/th.js").default)
    );
  }
  break;
  case "internal_eval_lcey": {
    // 聊城二院 - (内科)一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/internal_eval_lcey/th.js").default)
    );
  }
  break;
  case "surgical_eval_lcey": {
    // 聊城二院 - (外科)一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/surgical_eval_lcey/th").default)
    );
  }
  break;
  case "surgical_eval2_lcey": {
    // 聊城二院 - (胸心外科)一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/surgical_eval2_lcey/th").default)
    );
  }
  break;
  case "critical2_lcey": {
    // 聊城二院 - 病重（病危）患者护理记录单（不带瞳孔）
    Th = JSON.parse(
      JSON.stringify(require("../config/critical2_lcey/th").default)
    );
  }
  break;
  case "critical_lcey": {
    // 聊城二院 - 病重（病危）患者护理记录单（带瞳孔）
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_lcey/th").default)
    );
  }
  break;
  case "critical_new_lcey": {
    // 聊城二院 - 病重（病危）患者护理记录单（带瞳孔）(新)
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_new_lcey/th").default)
    );
  }
  break;
  case "peri_intervention_lcey": {
    // 聊城二院 - 围介入期护理观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/peri_intervention_lcey/th").default)
    );
  }
  break;
  case "cardiology_lcey": {
    // 聊城二院 - 心内科介入患者观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/cardiology_lcey/th").default)
    );
  }
  break;
  case "intervention_cure_lcey": {
    // 聊城二院 - 介入诊疗护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/intervention_cure_lcey/th").default)
    );
  }
  break;
  case "access_lcey": {
    // 聊城二院 - 出入量记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/access_lcey/th").default)
    );
  }
  break;
  case "maternal_lcey": {
    // 聊城二院 - 产妇产后观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/maternal_lcey/th").default)
    );
  }
  break;
  case "magnesium_lcey": {
    // 聊城二院 - 硫酸镁静滴观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesium_lcey/th").default)
    );
  }
  break;
  case "cardiac_lcey": {
    // 聊城二院 - 胎心记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/cardiac_lcey/th").default)
    );
  }
  break;
  case "labor_lcey": {
    // 聊城二院 - 产程记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/labor_lcey/th").default)
    );
  }
  break;
  case "internal_eval_linyi": {
    // 临邑人医 - 一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/internal_eval_linyi/th.js").default)
    );
  }
  break;
  case "fetal_heart_weihai": {
    // 临邑人医 - 一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/fetal_heart_weihai/th.js").default)
    );
  }
  break;
  case "babymonitor_linyi": {
    // 临邑人医 - 一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/babymonitor_linyi/th.js").default)
    );
  }
  break;
  case "critical_linyi": {
    // 临邑人医 - 病重（病危）患者护理记录单
    if (process.env.HOSPITAL_ID == 'whhk') Th = JSON.parse(
      JSON.stringify(require("../config/critical_whhk/th").default)
    );
    else Th = JSON.parse(
      JSON.stringify(require("../config/critical_linyi/th").default)
    );
  }
  break;
  case "critical_new_linyi": {
    // 临邑人医 - 病重（病危）患者护理记录单（新）
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_new_linyi/th").default)
    );
  }
  break;
  case "ops_linyi": {
    // 临邑人医 - 围手术期患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/ops_linyi/th").default)
    );
  }
  break;
  case "baby_lcey": {
    // 聊城二院 - 新生儿监护记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_lcey/th").default)
    );
  }
  break;
  case "common_zsqy": {
    // 中山七院-护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_zsqy/th").default)
    );
  }
  break;
  case "body_temperature_wj": {
    // 武警总队-体温单
    Th = JSON.parse(
      JSON.stringify(require("../config/body_temperature_wj/th").default)
    );
  }
  break;
  // 贵州人医
  case "common_gzry": {
    // 贵州人医-通用护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_gzry/th").default)
    );
  }
  break;
  case "access_gzry": {
    // 贵州人医-出入量护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/access_gzry/th").default)
    );
  }
  break;
  case "vitalsigns_gzry": {
    // 贵州人医-生命体征监测及观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/vitalsigns_gzry/th").default)
    );
  }
  break;
  case "basicpipeline_gzry": {
    // 贵州人医-基础护理及管道护理护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/basicpipeline_gzry/th").default)
    );
  }
  break;
  case "waiting_birth_gzry": {
    // 贵州人医-产程记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/waiting_birth_gzry/th").default)
    );
  }
  break;
  case "neonatus_gzry": {
    // 贵州人医-新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatus_gzry/th").default)
    );
  }
  break;
  case "newborn_care_gzry": {
    // 贵州人医-新生儿患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/newborn_care_gzry/th").default)
    )
  }
  break;
  case "common_hl": {
    // 横沥-护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_hl/th").default)
    );
  }
  break;
  case "rescue_hl": {
    // 横沥-急救抢救单
    Th = JSON.parse(
      JSON.stringify(require("../config/emergency_rescue/th").default)
    );
  }
  break;
  case "emergency_stay_hl": {
    // 横沥-留观护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/emergency_stay_hl/th").default)
    );
  }
  break;
  case "prenatal_hl": {
    // 横沥-产前待产
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_hl/th").default)
    );
  }
  break;
  case "oxytocin_hl": {
    // 横沥-催产素静脉点滴观察
    Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_hl/th").default)
    );
  }
  break;
  case "contraction_inhibitor_hl": {
    // 横沥-宫缩抑制剂静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/contraction_inhibitor_hl/th").default)
    );
  }
  break;
  case "dressing_count_hl": {
    // 横沥-经阴道接生器械敷料清点
    Th = JSON.parse(
      JSON.stringify(require("../config/dressing_count_hl/th").default)
    );
  }
  break;
  case "magnesium_sulphate_hl": {
    // 横沥-硫酸镁注射液静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesium_sulphate_hl/th").default)
    );
  }
  break;
  case "neonatology_hl": {
    // 横沥 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_hl/th").default)
    );
  }
  break;

  case "obstetrics_hl": {
    // 横沥 - 护理记录单(产科)
    Th = JSON.parse(
      JSON.stringify(require("../config/obstetrics_hl/th").default)
    );
  }
  break;
  case "gynecology_hl": {
    // 横沥 - 护理记录单(妇科)
    Th = JSON.parse(
      JSON.stringify(require("../config/gynecology_hl/th").default)
    );
  }
  break;
  case "blood_purify_hl": {
    // 横沥 - 持续性血液净化治疗记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/blood_purify_hl/th").default)
    );
  }
  break;
  case "aerate_param_hl": {
    // 横沥 - 儿科机械通气护理单
    Th = JSON.parse(
      JSON.stringify(require("../config/aerate_param_hl/th").default)
    );
  }
  break;
  case "ventilation_hl": {
    // 横沥-ICU机械通气护理单
    Th = JSON.parse(
      JSON.stringify(require("../config/ventilation_hl/th").default)
    );
  }
  break;
  case "blood_circulation_hl": {
    // 横沥 - 手外科术后血运观察表
    Th = JSON.parse(
      JSON.stringify(require("../config/blood_circulation_hl/th").default)
    );
  }
  break;
  case "icu_sn": {
    // 山南 - ICU护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/icu_sn/th").default)
    );
  }
  break;
  case "postpartum_sn": {
    // 山南 - 产后观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_sn/th").default)
    );
  }
  break;
  case "clinical_sn": {
    // 山南 - 临床护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/clinical_sn/th").default)
    );
  }
  break;
  case "common_sn": {
    // 山南 - 通用护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_sn/th").default)
    );
  }
  break;
  case "maternity_sn": {
    // 山南 - 妇产科通用护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/maternity_sn/th").default)
    );
  }
  break;
  case "icu_qz": {
    // 曲周县 - 重症护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/icu_qz/th").default)
    );
  }
  break;
  case "intersurgerycure_qzx": {
    // 曲周县 - 介入手术治疗护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/intersurgerycure_qzx/th").default)
    );
  }
  break;
  case "newborn_qzx": {
    // 曲周县 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/newborn_qzx/th").default)
    );
  }
  break;
  case "newborn_intensive_qz": {
    // 曲周县 - 新生儿重症护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/newborn_intensive_qz/th").default)
    );
  }
  break;
  case "ecgmonitoring_bh": {
    // 北海市 - 心电监护观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/ecgmonitoring_bh/th").default)
    );
  }
  break;
  case "bloodpulse2_bh": {
    // 北海市 - 血压脉搏呼吸记录
    Th = JSON.parse(
      JSON.stringify(require("../config/bloodpulse2_bh/th").default)
    );
  }
  break;
  case "bloodpulse_bh": {
    // 北海市 - 血压脉搏呼吸记录（产科）
    Th = JSON.parse(
      JSON.stringify(require("../config/bloodpulse_bh/th").default)
    );
  }
  break;
  case "generalcare_bh": {
    // 北海市 - 一般患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/generalcare_bh/th").default)
    );
  }
  break;
  case "criticallycare_bh": {
    // 北海市 - 病重（危）患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/criticallycare_bh/th").default)
    );
  }
  break;
  case "neurosurgery_bh": {
    // 北海市 - 神经外科危重护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/neurosurgery_bh/th").default)
    );
  }
  break;
  case "criticalobstetric_bh": {
    // 北海市 - 产科病重（危）患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/criticalobstetric_bh/th").default)
    );
  }
  break;
  case "respiratory_bh": {
    // 北海市 - 呼吸内科危重记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/respiratory_bh/th").default)
    );
  }
  break;
  case "prenatalcheck_bh": {
    // 北海市 - 产前检查治疗记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatalcheck_bh/th").default)
    );
  }
  break;
  case "access_bh": {
    // 北海市 - 出入量记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/access_bh/th").default)
    );
  }
  break;
  case "infant_bh": {
    // 北海市 - 婴儿记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/infant_bh/th").default)
    );
  }
  break;
  case "neurology_bh": {
    // 北海市 - 神经内科危重护理单
    Th = JSON.parse(
      JSON.stringify(require("../config/neurology_bh/th").default)
    );
  }
  break;
  case "diabetes_bh": {
    // 北海市 - 糖尿病治疗观察表
    Th = JSON.parse(
      JSON.stringify(require("../config/diabetes_bh/th").default)
    );
  }
  break;
  case "revivemonitoring_bh": {
    // 北海市 - 心胸外科术后复苏监测记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/revivemonitoring_bh/th").default)
    );
  }
  break;
  case "orthopaedic_bh": {
    // 北海市 - 骨科危重患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopaedic_bh/th").default)
    );
  }
  break;
  case "surgery_bh": {
    // 北海市 - 普外危重患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/surgery_bh/th").default)
    );
  }
  break;
  case "transplant_bh": {
    // 北海市 - 肢体与组织移植血液循环观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/transplant_bh/th").default)
    );
  }
  break;
  case "ophthalmology_bh": {
    // 北海市 - 眼科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/ophthalmology_bh/th").default)
    );
  }
  break;
  case "labor_bh": {
    // 北海市 - 产程观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/labor_bh/th").default)
    );
  }
  break;
  case "emergency_bh": {
    // 北海市 - 急诊CRRT治疗记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/emergency_bh/th").default)
    );
  }
  break;
  case "observation_bh": {
    // 北海市 - 急诊ICU病情观察表
    Th = JSON.parse(
      JSON.stringify(require("../config/observation_bh/th").default)
    );
  }
  break;
  case "seriously_bh": {
    // 北海市 - 心胸外科病重（危）患者护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/seriously_bh/th").default)
    );
  }
  break;
  case "department_bh": {
    // 北海市 - 急诊科重症监护室(EICU)CRRT 治疗记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/department_bh/th").default)
    );
  }
  break;
  case "monitoring_bh": {
    // 北海市 - 心胸外科心电监护观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/monitoring_bh/th").default)
    );
  }
  break;
  case "turning_over_bh": {
    // 北海市 - 预防压力性损伤翻身记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/turning_over_bh/th").default)
    );
  }
  break;
  case "nursingrecords_zxy": {
    //  南方中西医 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nursingrecords_zxy/th").default)
    );
  }
  break;
  case "emergencynursing_zxy": {
    //  南方中西医 - 急诊留观护理单
    Th = JSON.parse(
      JSON.stringify(require("../config/emergencynursing_zxy/th").default)
    );
  }
  break;
  case "encephalopathy_zxy": {
    //  南方中西医 - 脑病科观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/encephalopathy_zxy/th").default)
    );
  }
  break;
  case "brainobservation_zxy": {
    //  南方中西医 - 脑科观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/brainobservation_zxy/th").default)
    );
  }
  break;
  case "brainobservation2_zxy": {
    //  南方中西医 - 脑科观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/brainobservation2_zxy/th").default)
    );
  }
  break;
  case "recordicu1_zxy": {
    //  南方中西医 - 重症监护病房护理记录单(表一)
    Th = JSON.parse(
      JSON.stringify(require("../config/recordicu1_zxy/th").default)
    );
  }
  break;
  case "recordicu2_zxy": {
    //  南方中西医 - 重症监护病房护理记录单(表二)
    Th = JSON.parse(
      JSON.stringify(require("../config/recordicu2_zxy/th").default)
    );
  }
  break;
  case "recordicu3_zxy": {
    //  南方中西医 - 重症监护病房护理记录单(表三)
    Th = JSON.parse(
      JSON.stringify(require("../config/recordicu3_zxy/th").default)
    );
  }
  break;
  case "preventvap_zxy": {
    //  南方中西医 - 预防VAP评估单
    Th = JSON.parse(
      JSON.stringify(require("../config/preventvap_zxy/th").default)
    );
  }
  break;
  case "waiting_birth_wj": {
    // 武警 - 待产护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/waiting_birth_wj/th").default)
    );
  }
  break;
  case "postpartum_wj": {
    // 武警 - 产后(产房)观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_wj/th").default)
    );
  }
  break;
  case "common_xg": {
    // 东莞谢岗 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_xg/th").default)
    );
  }
  break;
  case "neonatology_xg": {
    // 东莞谢岗 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_xg/th").default)
    );
  }
  break;
  case "postpartum_xg": {
    // 东莞谢岗 - 产后护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_xg/th").default)
    );
  }
  break;
  case "prenatal_xg": {
    // 东莞谢岗 - 产前待产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_xg/th").default)
    );
  }
  break;
  case "icu_cpr_xg": {
    // 东莞谢岗 - ICU心肺复苏单
    Th = JSON.parse(
      JSON.stringify(require("../config/icu_cpr_xg/th").default)
    );
  }
  break;
  case "peritoneal_xg": {
    // 东莞谢岗 - 腹膜透析记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/peritoneal_xg/th").default)
    );
  }
  break;
  case "contraction_inhibitor_xg": {
    // 东莞谢岗 - 宫缩抑制剂静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/contraction_inhibitor_xg/th").default)
    );
  }
  break;
  case "magnesium_sulphate_xg": {
    // 东莞谢岗 - 硫酸镁注射液静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesium_sulphate_xg/th").default)
    );
  }
  break;
  case "oxytocin_xg": {
    // 东莞谢岗 - 催产素静脉点滴观察单
    Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_xg/th").default)
    );
  }
  break;
  case "internal_xg": {
    // 东莞谢岗 - 护理记录单(内科)
    Th = JSON.parse(
      JSON.stringify(require("../config/internal_xg/th").default)
    );
  }
  break;
  case "cardiology_fs": {
    // 佛山市一 - 心内科通用护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/cardiology_fs/th").default)
    );
  }
  break;
  case "iabp_fs": {
    // 佛山市一 - IABP护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/iabp_fs/th").default)
    );
  }
  break;
  case "orthopaedic_fs": {
    // 佛山市一 - 护理记录单(骨科通用护理单)
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopaedic_fs/th").default)
    );
  }
  break;
  case "cervicalspine_fs": {
    // 佛山市一 - 护理记录单(颈椎病保守治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/cervicalspine_fs/th").default)
    );
  }
  break;
  case "cervicalspondylosis_fs": {
    // 佛山市一 - 护理记录单(颈椎病手术治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/cervicalspondylosis_fs/th").default)
    );
  }
  break;
  case "cervicalfracture_fs": {
    // 佛山市一 - 护理记录单(颈椎骨折手术治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/cervicalfracture_fs/th").default)
    );
  }
  break;
  case "burndepartment_fs": {
    // 佛山市一 - 护理记录单(烧伤科)
    Th = JSON.parse(
      JSON.stringify(require("../config/burndepartment_fs/th").default)
    );
  }
  break;
  case "articulatio_fs": {
    // 佛山市一 - 护理记录单(髋关节置换术后)
    Th = JSON.parse(
      JSON.stringify(require("../config/articulatio_fs/th").default)
    );
  }
  break;
  case "genus_fs": {
    // 佛山市一 - 护理记录单(膝关节置换术)
    Th = JSON.parse(
      JSON.stringify(require("../config/genus_fs/th").default)
      );
  }
  break;
  case "handsfeet_fs": {
    // 佛山市一 - 护理记录单(手足科)
    Th = JSON.parse(
      JSON.stringify(require("../config/handsfeet_fs/th").default)
    );
  }
  break;
  case "generalnursing_fs": {
    // 佛山市一 - 护理记录单(通用护理记录单)
    Th = JSON.parse(
      JSON.stringify(require("../config/generalnursing_fs/th").default)
    );
  }
  break;

  case "upperdisorders_fs": {
    // 佛山市一 - 护理记录单(上肢疾患保守治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/upperdisorders_fs/th").default)
    );
  }
  break;
  case "upperfractures_fs": {
    // 佛山市一 - -护理记录单(上肢骨折术后)
    Th = JSON.parse(
      JSON.stringify(require("../config/upperfractures_fs/th").default)
    );
  }
  break;
  case "lowerdisorders_fs": {
    // 佛山市一 - -护理记录单(下肢疾患保守治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/lowerdisorders_fs/th").default)
    );
  }
  break;
  case "lowerfracture_fs": {
    // 佛山市一 - 护理记录单(下肢骨折术后)
    Th = JSON.parse(
      JSON.stringify(require("../config/lowerfracture_fs/th.js").default)
    );
  }
  break;
  case "resection_fs": {
    // 佛山市一 - 护理记录单(肿物切除术)
    Th = JSON.parse(
      JSON.stringify(require("../config/resection_fs/th.js").default)
    );
  }
  break;
  case "upperremoved_fs": {
    // 佛山市一 - 护理记录单(上肢内固定物拆除)
    Th = JSON.parse(
      JSON.stringify(require("../config/upperremoved_fs/th.js").default)
    );
  }
  break;
  case "lowerremoved_fs": {
    // 佛山市一 - 护理记录单(下肢内固定物拆除)
    Th = JSON.parse(
      JSON.stringify(require("../config/lowerremoved_fs/th.js").default)
      );
    }
  break;
  case "osteoporotic_fs": {
    // 佛山市一 - 护理记录单(骨质疏松保守与手术治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/osteoporotic_fs/th.js").default)
      );
    }
  break;
  case "hipdisorders_fs": {
    // 佛山市一 - 护理记录单(髋部疾患保守治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/hipdisorders_fs/th.js").default)
      );
    }
  break;
  case "criticallyill_fs": {
    // 佛山市一 - 护理记录单(危重患者护理记录单)
    Th = JSON.parse(
      JSON.stringify(require("../config/criticallyill_fs/th.js").default)
      );
    }
  break;
  case "postpartum_fs": {
    // 佛山市一 - 护理记录单(危重患者护理记录单)
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_fs/th.js").default)
      );
    }
  break;
  case "prenatal_fs": {
    // 佛山市一 - 产前待产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_fs/th.js").default)
      );
    }
  break;
  case "kneedisease_fs": {
    // 佛山市一 - 护理记录单(膝关节疾患)
    Th = JSON.parse(
      JSON.stringify(require("../config/kneedisease_fs/th.js").default)
    );
  }
  break;
  case "kneearthroscopy_fs": {
    // 佛山市一 - 护理记录单(膝关节镜术护理记录单)
    Th = JSON.parse(
      JSON.stringify(require("../config/kneearthroscopy_fs/th.js").default)
    );
  }
  break;
  case "thoracicdisease_fs": {
    // 佛山市一 - 护理记录单(胸椎疾病保守治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/thoracicdisease_fs/th").default)
    );
  }
  break;
  case "thoracicvertebrae_fs": {
    // 佛山市一 - 护理记录单(胸椎疾病手术治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/thoracicvertebrae_fs/th.js").default)
    );
  }
  break;
  case "lumbardisease_fs": {
    // 佛山市一 - 护理记录单(腰椎疾病保守治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/lumbardisease_fs/th.js").default)
    );
  }
  break;
  case "operationlumbar_fs": {
    // 佛山市一 - 护理记录单(腰椎疾病手术治疗)
    Th = JSON.parse(
      JSON.stringify(require("../config/operationlumbar_fs/th.js").default)
    );
  }
  break;
  case "general_fs": {
    // 佛山市一 - -护理记录单(新生儿科通用)
    Th = JSON.parse(
      JSON.stringify(require("../config/general_fs/th").default)
      );
    }
  break;
  case "eyegeneral_fs": {
    // 佛山市一 - -护理记录单(眼科通用)
    Th = JSON.parse(
      JSON.stringify(require("../config/eyegeneral_fs/th").default)
      );
    }
  break;
  case "pupilgeneral_fs": {
    // 佛山市一 - -护理记录单(儿科二区带瞳孔通用)
    Th = JSON.parse(
      JSON.stringify(require("../config/pupilgeneral_fs/th").default)
      );
    }
  break;
  case "areageneral_fs": {
    // 佛山市一 - -护理记录单(儿科二区通用)
    Th = JSON.parse(
      JSON.stringify(require("../config/areageneral_fs/th").default)
      );
    }
  break;
  case "pediatric_fs": {
    // 佛山市一 - -护理记录单(儿科通用)
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatric_fs/th").default)
      );
    }
  break;
  case "ultrasound_fs": {
    // 佛山市一 - -护理记录单(超声消融治疗护理巡视记录单)
    Th = JSON.parse(
      JSON.stringify(require("../config/ultrasound_fs/th").default)
      );
    }
  break;
  case "hydrochloricacid_fs": {
    // 佛山市一 - 盐酸利托君(安宝)观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/hydrochloricacid_fs/th").default)
    );
  }
  break;
  case "magnesiumsulf_fs": {
    // 佛山市一 - 硫酸镁注射静脉滴注观察记录
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesiumsulf_fs/th").default)
    );
  }
  break;
  case "laborobservation_fs": {
    // 佛山市一 - 产程观察记录单(含静滴催产素记录单)
    Th = JSON.parse(
      JSON.stringify(require("../config/laborobservation_fs/th").default)
    );
  }
  break;
  case "babyarea_fs": {
    // 佛山市一 - 爱婴区新生儿护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/babyarea_fs/th").default)
    );
  }
  break;
  case "NICU_fs": {
    // 佛山市一 - 新生儿NICU护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/NICU_fs/th").default)
    );
  }
  break;
  case "nonsurgicalcare_fk": {
    // 武汉肺科 - 非手术科室护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nonsurgicalcare_fk/th.js").default)
    );
  }
  break;
  case "access_fk": {
    // 武汉肺科 - 出入液量记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/access_fk/th.js").default)
    );
  }
  break;
  case "operating_fk": {
    // 武汉肺科 - 手术科室记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/operating_fk/th.js").default)
    );
  }
  break;
  case "neonate_sdlj": {
    // 顺德龙江 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonate_sdlj/th.js").default)
    );
  }
  break;
  case "craniocerebral_sdlj": {
    // 顺德龙江 - 护理记录单（颅脑外科）
    Th = JSON.parse(
      JSON.stringify(require("../config/craniocerebral_sdlj/th.js").default)
    );
  }
  break;
  case "ordinary_sdlj": {
    // 顺德龙江 - 护理普通记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/ordinary_sdlj/th.js").default)
    );
  }
  break;
  case "intravenous_sdlj": {
    // 顺德龙江 - 硫酸镁、安宝静脉点滴观察记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/intravenous_sdlj/th.js").default)
    );
  }
  break;
  case "nursing_sdlj": {
    // 顺德龙江 - 产科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nursing_sdlj/th.js").default)
    );
  }
  break;
  case "nursing_zhzxy": {
    // 珠海中西医 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nursing_zhzxy/th.js").default)
    );
  }
  break;
  case "wait_delivery_zhzxy": {
    // 珠海中西医 - 候产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/wait_delivery_zhzxy/th.js").default)
    );
  }
  break;
  case "pediatric3_sdlj": {
    // 顺德龙江 - 产科新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatric3_sdlj/th.js").default)
    );
  }
  break;
  case "postpartum_sdlj": {
    // 顺德龙江 - 产前待产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_sdlj/th.js").default)
    );
  }
  break;
  case "prenatal_sdlj": {
    // 顺德龙江 - 产前待产记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_sdlj/th.js").default)
    );
  }
  break;
  case "dreathe_sdlj": {
    // 顺德龙江 - 呼吸专科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/dreathe_sdlj/th.js").default)
    );
  }
  break;
  case "urology_sdlj": {
    // 顺德龙江 - 护理记录单（泌尿外科）
    Th = JSON.parse(
      JSON.stringify(require("../config/urology_sdlj/th.js").default)
    );
  }
  break;
  case "mechanical_sdlj": {
    // 顺德龙江 - 机械通气监护记录单（儿科）
    Th = JSON.parse(
      JSON.stringify(require("../config/mechanical_sdlj/th.js").default)
    );
  }
  break;
  case "orthopaedic_sdlj": {
    // 顺德龙江 - 护理记录单（骨科）
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopaedic_sdlj/th.js").default)
    );
  }
  break;
  case "orthopaedic_sdry": {
    // 顺德龙江 - 护理记录单（骨科）
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopaedic_sdry/th.js").default)
    );
  }
  break;
    case "postpartum2_sdry": {
      // 顺德人医 - 产后产房观察记录单
      Th = JSON.parse(
        JSON.stringify(require("../config/postpartum2_sdry/th.js").default)
      );
    }
      break;
  case "magnesiumsulphate_sdry": {
    // 顺德"硫酸镁注射液静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesiumsulphate_sdry/th.js").default)
    );
  }
  break;
  case "oxytocin_sdry": {
    // ,"催产素静脉点滴观察表",
    Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_sdry/th.js").default)
    );
  }
  break;
  case "insulin_pump_sdry": {
    // 顺德胰岛素泵观察记录表",
    Th = JSON.parse(
      JSON.stringify(require("../config/insulin_pump_sdry/th.js").default)
    );
  }
  break;
  case "contraction_inhibitor_sdry": {
    // 顺德,"宫缩抑制剂静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/contraction_inhibitor_sdry/th.js").default)
    );
  }
  break;
  case "pediatrics_sdlj": {
    // 顺德龙江 - 护理记录单（儿科）
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatrics_sdlj/th.js").default)
    );
  }
  break;
  case "microsurgical_sdlj": {
    // 顺德龙江 - 护理记录单（显微外科）
    Th = JSON.parse(
      JSON.stringify(require("../config/microsurgical_sdlj/th.js").default)
    );
  }
  break;
  case "cardiovascular_xt": {
    // 佛山杏坛 - 护理记录单(心血管呼吸专科)
    Th = JSON.parse(
      JSON.stringify(require("../config/cardiovascular_xt/th.js").default)
    );
  }
  break;
  case "neurology_sdlj": {
    // 顺德龙江 - 护理记录单（神经内科）
    Th = JSON.parse(
      JSON.stringify(require("../config/neurology_sdlj/th.js").default)
    );
  }
  break;
  case "intervent_sdlj": {
    // 顺德龙江 - 护理记录单（综合介入科）
    Th = JSON.parse(
      JSON.stringify(require("../config/intervent_sdlj/th.js").default)
    );
  }
  break;
  case "mild_hypothermia_sdlj": {
    // 顺德龙江-亚低温治疗护理记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/mild_hypothermia_sdlj/th").default)
    );
  }
  break;
  case "oxytocin_sdlj": {
    // 顺德龙江-催产素静脉点滴观察单
    Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_sdlj/th").default)
    );
  }
  break;
    case "oxytocinck_dglb": {
      // 东莞寮步-催产素静脉点滴观察单(产科)--新
      Th = JSON.parse(
          JSON.stringify(require("../config/oxytocinck_dglb/th").default)
      );
    }
  break;
  case "oxytocin_dglb": {
    // 东莞寮步-催产素静脉点滴观察单
    Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_dglb/th").default)
    );
  }
  break;
  case "criticaldisease_xt": {
    // 佛山杏坛 - 危重症护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/criticaldisease_xt/th.js").default)
    );
  }
  break;
  case "pentagram2_xt": {
    // 佛山杏坛 - 护理记录单（眼耳鼻咽喉科）
    Th = JSON.parse(
      JSON.stringify(require("../config/pentagram2_xt/th.js").default)
    );
  }
  break;
  case "prenataldelivery2_xt": {
    // 佛山杏坛 - 护理记录单(产前待产记录)
    Th = JSON.parse(
      JSON.stringify(require("../config/prenataldelivery2_xt/th.js").default)
    );
  }
  break;
  case "postpartum2_xt": {
    // 佛山杏坛 - 护理记录单(产后)
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum2_xt/th.js").default)
    );
  }
  break;
  case "gynaecology2_xt": {
    // 佛山杏坛 - 护理记录单(妇科专科)
    Th = JSON.parse(
      JSON.stringify(require("../config/gynaecology2_xt/th.js").default)
    );
  }
  break;
  case "pediatric3_xt": {
    // 佛山杏坛 - 护理记录单(产科新生儿科)
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatric3_xt/th.js").default)
    );
  }
  break;
  case "paediatrician2_xt": {
    // 佛山杏坛 - 护理记录单(儿科)
    Th = JSON.parse(
      JSON.stringify(require("../config/paediatrician2_xt/th.js").default)
    );
  }
  break;
  case "neonatalspecialty2_xt": {
    // 佛山杏坛 - 护理记录单(新生儿专科)
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatalspecialty2_xt/th.js").default)
    );
  }
  break;
  case "gastroenterology_xt": {
    // 佛山杏坛 - 护理记录单(消化专科)
    Th = JSON.parse(
      JSON.stringify(require("../config/gastroenterology_xt/th.js").default)
    );
  }
  break;
  case "care3_xt": {
    // 佛山杏坛 - 护理记录单(内三科通用单)
    Th = JSON.parse(
      JSON.stringify(require("../config/care3_xt/th.js").default)
    );
  }
  break;
  case "care2_xt": {
    // 佛山杏坛 - 外一护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/care2_xt/th.js").default)
    );
  }
  break;
  case "general2_xt": {
    // 佛山杏坛 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/general2_xt/th.js").default)
    );
  }
  break;
  case "fracture_xt": {
    // 佛山杏坛 - 护理记录单（骨折）
    Th = JSON.parse(
      JSON.stringify(require("../config/fracture_xt/th.js").default)
    );
  }
  break;
  case "spine_xt": {
    // 佛山杏坛 - 护理记录单（脊柱）
    Th = JSON.parse(
      JSON.stringify(require("../config/spine_xt/th.js").default)
    );
  }
  break;
  case "craniocerebral_xt": {
    // 佛山杏坛 - 护理记录单（颅脑）
    Th = JSON.parse(
      JSON.stringify(require("../config/craniocerebral_xt/th.js").default)
    );
  }
  break;
  case "ipacu_fs": {
    // 佛山市一 - 麻醉科IPACU
    Th = JSON.parse(
      JSON.stringify(require("../config/ipacu_fs/th.js").default)
    );
  }
  break;
  case "general_xt": {
    // 佛山杏坛 - 护理记录单（通用）
    Th = JSON.parse(
      JSON.stringify(require("../config/general_xt/th.js").default)
    );
  }
  break;
  case "generalnursing_xt": {
    // 佛山杏坛 - 护理记录单（全院通用）
    Th = JSON.parse(
      JSON.stringify(require("../config/generalnursing_xt/th.js").default)
    );
  }
  break;
  case "bloodCircul_xt": {
    // 佛山杏坛 -血运观察护理单（外四科）
    Th = JSON.parse(
      JSON.stringify(require("../config/bloodCircul_xt/th.js").default)
    );
  }
  break;
  case "emergency_treat_yx": {
    // 武汉亚心 - 急诊留观记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/emergency_treat_yx/th").default)
    );
  }
  break;
  case "neonatology_yx": {
    // 武汉亚心 - 新生儿科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_yx/th").default)
    );
  }
  break;
  case "icu_yx": {
    // 武汉亚心 - ICU护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/icu_yx/th").default)
    );
  }
  break;
  case "common_yx": {
    // 武汉亚心 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/common_yx/th").default)
    );
  }
  break;
  case "prenataldelivery2_tj": {
    // 广东同江 - 产前护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/prenataldelivery2_tj/th.js").default)
    );
  }
  break;
  case "prenatal_sdry": {
    // 顺德人医 - 产前护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_sdry/th.js").default)
    );
  }
  break;
    case "baby2_sdry": {
      // 顺德人医 - 护理记录单（儿科）
      Th = JSON.parse(
        JSON.stringify(require("../config/baby2_sdry/th.js").default)
      );
    }
      break;
  case "postpartum2_tj": {
    // 广东同江 - 产后护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum2_tj/th.js").default)
    );
  }
  break;
  case "pediatric3_tj": {
    // 广东同江 - 产科新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatric3_tj/th.js").default)
    );
  }
  break;
  case "generalnursing_tj": {
    // 广东同江 - 护理记录单（全院通用）
    Th = JSON.parse(
      JSON.stringify(require("../config/generalnursing_tj/th.js").default)
    );
  }
  break;
  case "baby_tj": {
    // 广东同江 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_tj/th").default)
    );
  }
  break;
  case "ecgmonitoring_tj": {
    // 广东同江 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/ecgmonitoring_tj/th").default)
    );
  }
  break;
  case "magnesiumsulphate_tj": {
    // 广东同江 - 硫酸镁注射液静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/magnesiumsulphate_tj/th.js").default)
    );
  }
  break;
  case "blood_tj": {
    // 广东同江 - 硫酸镁注射液静脉滴注观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/blood_tj/th.js").default)
    );
  }
  break;
  case "cardiology_tj": {
    // 广东同江 - 介入、导管治疗术后首次护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/cardiology_tj/th.js").default)
    );
  }
  break;
  case "cardiac_therapy_tj": {
    // 广东同江 - 心脏介入术中护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/cardiac_therapy_tj/th.js").default)
    );
  }
  break;
  case "surgical_qhwy": {
    // 青海五院 - 外科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/surgical_qhwy/th").default)
    );
  }
  break;
  case "nursing_qhwy": {
    // 青海五院 - 外科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nursing_qhwy/th").default)
    );
  }
  break;
  case "ophthalmology_qhwy": {
    // 青海五院 - 眼科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/ophthalmology_qhwy/th").default)
    );
  }
  break;
  case "seriousnursing_qhwy": {
    // 青海五院 - 病重（病危）患者护理记录单（二）
    Th = JSON.parse(
      JSON.stringify(require("../config/seriouslynursing_qhwy/th.js").default)
    );
  }
  break;
  case "entnursing_qhwy": {
    // 青海五院 - 耳鼻喉科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/entnursing_qhwy/th").default)
    );
  }
  break;
  case "obstetrics_qhwy": {
    // 青海五院 - 产科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/obstetrics_qhwy/th").default)
    );
  }
  break;
  case "orthopedics_qhwy": {
    // 青海五院 - 骨科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/orthopedics_qhwy/th").default)
    );
  }
  break;
  case "chemotherapy_qhwy": {
    // 青海五院 - 化疗观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/chemotherapy_qhwy/th").default)
    );
  }
  break;
  case "neurosurgery_qhwy": {
    // 青海五院 - 神经外科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neurosurgery_qhwy/th").default)
    );
  }
  break;
  case "neonatal_care_qhwy": {
    // 青海五院 - 肿瘤新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatal_care_qhwy/th").default)
    );
  }
  break;
  case "nurse_jew": {
    // 925医院 - 一般患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/nurse_jew/th").default)
    );
  }
  break;
  case "danger_nurse_jew": {
    // 925医院 - 危重患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/danger_nurse_jew/th").default)
    );
  }
  break;
  case "internal_eval_weihai": {
    // // 威海市立 - 一般患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/internal_eval_weihai/th.js").default)
    );
  }
  break;
  case "critical2_weihai": {
    // // 威海市立 - 重症医学科监护记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/critical2_weihai/th.js").default)
    );
  }
  break;
  case "baby_weihai": {
    // // 威海市立 - 新生儿科一般患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_weihai/th.js").default)
    );
  }
  break;
  case "baby_sdry": {
    // // 顺德人医 - 爱婴区新生儿科一般患者护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_sdry/th.js").default)
    );
  }
  break;
  case "postpartum_sdry": {
    // // 顺德人医 - 产后护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_sdry/th.js").default)
    );
  }
    break;
  case "critical_new_weihai": {
    // // 威海市立 - 病重（病危）患者护理记录单（新）
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_new_weihai/th.js").default)
    );
  }
    break;
    case "oxytocin_weihai": {
      // // 威海市立 -静脉点滴催产素引产观察表
      Th = JSON.parse(
          JSON.stringify(require("../config/oxytocin_weihai/th.js").default)
      );
    }
  break;
  case "post_partum_weihai": {
    // // 威海市立 - 产后（产房）观察记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/post_partum_weihai/th.js").default)
    );
  }
  break;
  case "labor_weihai": {
    // // 威海市立 - 产程记录
    Th = JSON.parse(
      JSON.stringify(require("../config/labor_weihai/th.js").default)
    );
  }
  break;
  case "inandout_weihai": {
    // // 威海市立 - 出入量记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/inandout_weihai/th.js").default)
    );
  }
  break;
  case "critical_mahui_weihai": {
    // 危重症护理监护单2-麻恢
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_mahui_weihai/th.js").default)
    );
  }
  break;
  case "critical_weihai": {
    // 危重症护理监护单2
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_weihai/th.js").default)
    );
  }
  break;
  case "general_item_weihai": {
    // 威海市立 - 护理一般项目监测记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/general_item_weihai/th.js").default)
    );
  }
  break;
  case "third_round_records": {
    // 威海市立--三级护理查房
    Th = JSON.parse(
      JSON.stringify(require("../config/third_round_records/th.js").default)
    );
  }
    break;
  case "follow_doctor_check_records": {
    // 威海市立--跟随医生查房
    Th = JSON.parse(
      JSON.stringify(require("../config/follow_doctor_check_records/th.js").default)
    );
  }
    break;
    case "critical_patient_weihai": {
      // 威海市立-- 危重患者护理记录单
      Th = JSON.parse(
          JSON.stringify(require("../config/critical_patient_weihai/th.js").default)
      );
    }
      break;
  case "extracardi_one_weihai": {
    // 威海市立--心外患者重症护理记录单Ⅰ
    Th = JSON.parse(
      JSON.stringify(require("../config/extracardi_one_weihai/th.js").default)
    );
  }
    break;
  case "extracardi_two_weihai": {
    // 威海市立--心外患者重症护理记录单Ⅱ
    Th = JSON.parse(
      JSON.stringify(require("../config/extracardi_two_weihai/th.js").default)
    );
  }
    break;
  case "extracardi_three_weihai": {
    // 威海市立--心外患者重症护理记录单Ⅲ
    Th = JSON.parse(
      JSON.stringify(require("../config/extracardi_three_weihai/th.js").default)
    );
  }
    break;
  case "baby_yz": {
    // 临沂沂州 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_yz/th").default)
    );
  }
  break;
  case "custody_yz": {
    // 临沂沂州 - 监护记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/custody_yz/th").default)
    );
  }
  break;
  case "internal_eval_yz": {
    // 临沂沂州 - 一般患者护理评估记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/internal_eval_yz/th.js").default)
    );
  }
  break;
  case "critical_new_yz": {
    // 临沂沂州 - 病重（病危）患者护理记录单（带瞳孔）(新)
    Th = JSON.parse(
      JSON.stringify(require("../config/critical_new_yz/th").default)
    );
  }
  break;
  case "icu_yz": {
    // 内科重症医学科
    Th = JSON.parse(
      JSON.stringify(require("../config/icu_yz/th").default)
    );
  }
  break;
  case "postpartum_yz": {
    // 产后术后观察表
    Th = JSON.parse(
      JSON.stringify(require("../config/postpartum_yz/th").default)
    );
  }
  break;
  case "inout_ytll": {
    // 烟台玲珑 - 出入量记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/inout_ytll/th").default)
    );
  }
  break;
  case "premiumcare_ytll": {
    // 烟台玲珑 - 病重（危）/特级护理患者评估与护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/premiumcare_ytll/th").default)
    );
  }
  break;
  case "seriousnursing_ytll": {
    // 烟台玲珑-病重（病危）患者评估与护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/seriousnursing_ytll/th").default)
    );
  }
  break;
  case "labor_ytll": {
    // 烟台玲珑-产程记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/labor_ytll/th").default)
    );
  }
  break;
  case "labor_con_ytll": {
    // 烟台玲珑-产程记录单(续页)
    Th = JSON.parse(
      JSON.stringify(require("../config/labor_con_ytll/th").default)
    );
  }
  break;
  case "test_common": {
    // 护理记录单（测试用）
    Th = JSON.parse(
      JSON.stringify(require("../config/general_xt/th.js").default)
    );
  }
  break;
  case "babymilk_ytll": {
    // 烟台玲珑 - 新生儿加奶记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/babymilk_ytll/th").default)
    );
  }
  break;
  case "prenatal_ytll": {
    // 烟台玲珑 - 住院待产护理记录
    Th = JSON.parse(
      JSON.stringify(require("../config/prenatal_ytll/th").default)
    );
  }
  break;
  case "oxytocin_ytll": {
    // 烟台玲珑-催产素引产及催产记录表
    Th = JSON.parse(
      JSON.stringify(require("../config/oxytocin_ytll/th").default)
    );
  }
  break;
  case "one_whhk": {
    // 武汉汉口 - 护理记录单（一）
    Th = JSON.parse(
      JSON.stringify(require("../config/one_whhk/th").default)
    );
  }
  break;
  case "pediatrics_new_zzwy": {
    // 漳州五院 - 护理记录单（儿科）
    Th = JSON.parse(
      JSON.stringify(require("../config/pediatrics_new_zzwy/th.js").default)
      );
    }
    break;
  case "record_icu_zzwy": {
    // 漳州五院 - 护理记录单（ICU）
    Th = JSON.parse(
      JSON.stringify(require("../config/record_icu_zzwy/th.js").default)
      );
    }
    break;
  case "obstetrics_new_zzwy": {
    // 漳州五院 - 护理记录单（产科）
    Th = JSON.parse(
      JSON.stringify(require("../config/obstetrics_new_zzwy/th.js").default)
      );
    }
    break;
  case "gynecology_new_zzwy": {
    // 漳州五院 - 护理记录单（妇科）
    Th = JSON.parse(
      JSON.stringify(require("../config/gynecology_new_zzwy/th.js").default)
      );
    }
    break;
  case "baby_new_zzwy": {
    // 漳州五院 - 护理记录单（新生儿）
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_new_zzwy/th.js").default)
      );
    }
    break;
  case "record_new_zzwy": {
    // 漳州五院 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/record_new_zzwy/th.js").default)
      );
    }
    break;
  case "intravenous_whhk": {
    // 武汉汉口 - 静脉治疗使用维护记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/intravenous_whhk/th").default)
    );
  }
  break;
  case "baby_whhk": {
    // 武汉汉口 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/baby_whhk/th").default)
    );
  }
  break;
  case "neonatology_whhk": {
    // 武汉汉口 - 新生儿科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_whhk/th").default)
    );
  }
  break;
  case "insulin_whhk": {
    // 武汉汉口 - 胰岛素泵护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/insulin_whhk/th").default)
    );
  }
  break;
  case "labor_whhk": {
    // 武汉汉口 - 产程检查记录
    Th = JSON.parse(
      JSON.stringify(require("../config/labor_whhk/th").default)
    );
  }
  break;
  case "obstetriccare_whhk": {
    // 武汉汉口 - 产科护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/obstetriccare_whhk/th").default)
    );
  }
  break;
  case "two_whhk": {
    // 武汉汉口 - 护理记录单（二）
    Th = JSON.parse(
      JSON.stringify(require("../config/two_whhk/th").default)
    );
  }
  break;
  case "record_common_zjhj": {
    // 湛江海军医院 - 护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/record_common_zjhj/th").default)
    );
  }
  break;
  case "neonatology_zjhj": {
    // 湛江海军医院 - 新生儿护理记录单
    Th = JSON.parse(
      JSON.stringify(require("../config/neonatology_zjhj/th").default)
    );
  }
  break;
  case "record_common_sdhp": {
    // 顺德和平外科 - 护理记录单（全院通用）
    Th = JSON.parse(
      JSON.stringify(require("../config/record_common_sdhp/th").default)
    );
  }
  break;
  default: {
    Th = JSON.parse(
      JSON.stringify(require("../config/default/th").default)
    );
  }
  break;
  }
  if (Th.th.title && Th.th.title.length) {
    for (let i = 0; i < Th.th.title.length; i++) {
      if (Th.th.title[i].canSet) {
        try {
          Th.th.title[i].name = data.find(item => {
            return item.fieldEn == Th.th.title[i].key;
          }).fieldCn;
        } catch (e) {
          try {
            let reverseArr = [];
            if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
              reverseArr = [...autoData];
            }
            Th.th.title[i].name = reverseArr.find(item => {
              return (
                item.fieldEn == Th.th.title[i].key && item.pageIndex === index
              );
            }).fieldCn;
          } catch (e) {}
        }
      }
    }
  }

  for (let i = 0; i < Th.th.top.length; i++) {
    if (Th.th.top[i].canSet) {
      try {
        Th.th.top[i].name = data.find(item => {
          return item.fieldEn == Th.th.top[i].key;
        }).fieldCn;
      } catch (e) {
        try {
          let reverseArr = [];
          if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
            reverseArr = [...autoData];
          }
          Th.th.top[i].name = reverseArr.find(item => {
            return item.fieldEn == Th.th.top[i].key && item.pageIndex === index;
          }).fieldCn;
        } catch (e) {}
      }
    }
  }
  for (let i = 0; i < Th.th.mid.length; i++) {
    if (Th.th.mid[i].canSet) {
      try {
        Th.th.mid[i].name = data.find(item => {
          return item.fieldEn == Th.th.mid[i].key;
        }).fieldCn;
      } catch (e) {
        try {
          let reverseArr = [];
          if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
            reverseArr = [...autoData];
          }
          Th.th.mid[i].name = reverseArr.find(item => {
            return item.fieldEn == Th.th.mid[i].key && item.pageIndex === index;
          }).fieldCn;
        } catch (e) {}
      }
    }
  }
  if (Th.th.bottom) {
    for (let i = 0; i < Th.th.bottom.length; i++) {
      if (Th.th.bottom[i].canSet) {
        try {
          Th.th.bottom[i].name = data.find(item => {
            return item.fieldEn == Th.th.bottom[i].key;
          }).fieldCn;
        } catch (e) {
          try {
            let reverseArr = [];
            if (sheetInfo.selectBlock.recordTitleCoyeType !== "no") {
              reverseArr = [...autoData];
            }
            Th.th.bottom[i].name = reverseArr.find(item => {
              return (
                item.fieldEn == Th.th.bottom[i].key && item.pageIndex === index
              );
            }).fieldCn;
          } catch (e) {}
        }
      }
    }
  }

  return Th;
}

// le y = ''
