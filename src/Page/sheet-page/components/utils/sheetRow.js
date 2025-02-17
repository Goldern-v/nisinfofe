/** 设置护理记录单行数 */
import sheetInfo from "../config/sheetInfo";
export function getRowNum(index) {
  // console.log(index, "index", sheetInfo.sheetType);
  if (sheetInfo.sheetType == "neonatology") {
    if (index === 0) {
      return 15;
    } else {
      return 27;
    }
  } else if (
    sheetInfo.sheetType == "post_partum" ||
    sheetInfo.sheetType == "dressing_count"
  ) {
    if (index === 0) {
      return 21;
    } else {
      return 33;
    }
  } else if (sheetInfo.sheetType == "blood_purification") {
    return 11;
  } else if (sheetInfo.sheetType == "nicu_custody_hd") {
    return 23;
  } else if (sheetInfo.sheetType == "oxytocin_sdry") {
    if (index === 0) {
      return 17;
    } else {
      return 24;
    }
  } else if (["oxytocin","oxytocin_hzly"].includes(sheetInfo.sheetType)) {
    if (index === 0) {
      return 17;
    } else {
      return 28;
    }
  }else if (sheetInfo.sheetType == "com_lc") {
    return 22;
  } else if (sheetInfo.sheetType == "intervention_cure"||sheetInfo.sheetType == "icu_cpr_xg") {
    return 15;
  } else if (sheetInfo.sheetType == "Record_Children_Serious_Lc" || sheetInfo.sheetType == "ops_linyi" ) {
    return 26;
  } else if (sheetInfo.sheetType == "icu_qz" || sheetInfo.sheetType == "iabp_fs" || sheetInfo.sheetType == "labor_con_ytll"|| sheetInfo.sheetType == "labor_ytll") {
    return 33;
  } else if (sheetInfo.sheetType == "fetal_heart_weihai") {
    return 32;
  } else if (sheetInfo.sheetType == "icu_lc") {
    return 22;
  } else if (sheetInfo.sheetType == "special"|| sheetInfo.sheetType == "premiumcare_ytll") {
    return 23;
  } else if (sheetInfo.sheetType == "neonatology_picc") {
    return 9;
    // if((sheetInfo.sheetStartPage+index).toString() != sheetInfo.endPage){
    //   // console.log('111',sheetInfo.sheetStartPage +index,sheetInfo.endPage)
    //   return 15
    // }else{
    //   // console.log("222",sheetInfo.sheetStartPage +index,sheetInfo.endPage)
    //   return 9;
    // }
  } else if (
    sheetInfo.sheetType == "critical_lc" ||
    sheetInfo.sheetType == "critical_new_linyi" ||
    sheetInfo.sheetType == 'critical_new_weihai' ||
    sheetInfo.sheetType == 'baby2_weihai' ||
    sheetInfo.sheetType == 'critical_weihai' ||
    sheetInfo.sheetType == "critical_new_lc" ||
    sheetInfo.sheetType === 'babyarea_fs'||
    sheetInfo.sheetType == "icu_yz" ||
    sheetInfo.sheetType === 'intravenous_whhk' ||
    sheetInfo.sheetType === 'record_new_zzwy' ||
    sheetInfo.sheetType === 'pediatrics_new_zzwy' ||
    sheetInfo.sheetType === 'record_icu_zzwy' ||
    sheetInfo.sheetType === 'obstetrics_new_zzwy' ||
    sheetInfo.sheetType === 'gynecology_new_zzwy' ||
    sheetInfo.sheetType === 'baby_new_zzwy'
  ) {
    return 20;
  } else if (sheetInfo.sheetType == "cardiology_lcey" || sheetInfo.sheetType == "cardiology_tj") {
    return 15;
  } else if (sheetInfo.sheetType == "picu_hemodialysis_jm") {
    return 15;
  } else if (process.env.HOSPITAL_ID === 'hengli' && sheetInfo.sheetType !== 'oxytocin_hl' && sheetInfo.sheetType !== 'blood_circulation_hl') {
    /* 横沥所有普通护记都返回20行 */
    return 20;
  } else if (sheetInfo.sheetType === 'oxytocin_hl' || sheetInfo.sheetType === 'oxytocin_sdlj') {
    if (index === 0) {
      return 20;
    } else {
      return 30;
    }
  } else if (sheetInfo.sheetType === 'blood_circulation_hl' || sheetInfo.sheetType == "inout_ytll"|| sheetInfo.sheetType == "postpartum_wj") {
    return 35
  } else if (sheetInfo.sheetType === 'intravenous_sdlj'|| sheetInfo.sheetType === 'criticaldisease_xt' || sheetInfo.sheetType === 'cardiovascular_xt' ) {
    return 20
  } else if ( sheetInfo.sheetType === 'access_fk'||sheetInfo.sheetType === 'cardiac_lcey' || sheetInfo.sheetType == 'postpartum_yz' || sheetInfo.sheetType == 'general_item_weihai' || sheetInfo.sheetType === 'oxytocin_ytll') {
    return 28
  } else if (sheetInfo.sheetType === 'mechanical_sdlj'||sheetInfo.sheetType === 'custody_yz') {
    return 33
  } else if (sheetInfo.sheetType =='neonatal_care_qhwy'){
    return 30
  }else if ( sheetInfo.sheetType === 'magnesium_lcey') {
    return 24
  }else if (
    sheetInfo.sheetType === 'record_children_serious2_lc'||
    sheetInfo.sheetType === 'postpartum_dglb' ||
    sheetInfo.sheetType === 'postpartum_dgdl' ||
    sheetInfo.sheetType === 'neonatology_whhk' ||
    sheetInfo.sheetType === 'insulin_whhk'
  ) {
    return 19
  }else if (sheetInfo.sheetType === 'nursingrecords_zxy' || sheetInfo.sheetType === 'generalnursing_xt' || sheetInfo.sheetType === 'baby_yz' || sheetInfo.sheetType == "seriousnursing_ytll" || sheetInfo.sheetType === 'neonatalspecialty2_xt' || sheetInfo.sheetType == "neurosurgery_ytll" || sheetInfo.sheetType == "critical_ytll") {
    return 21
  }else if (
    sheetInfo.sheetType === 'neonate_sdlj' ||
    sheetInfo.sheetType === 'one_whhk' ||
    sheetInfo.sheetType === 'two_whhk' ||
    sheetInfo.sheetType === 'cbp_zjhj'
  ) {
    return 18
  } else if (sheetInfo.sheetType=='babymilk_ytll') {
    return 34
  } else if (
    sheetInfo.sheetType == "prenatal_ytll"
  ) {
    if (index === 0) {
      return 29;
    } else {
      return 34;
    }
  } else if (sheetInfo.sheetType == 'third_round_records' || sheetInfo.sheetType == 'follow_doctor_check_records') {
    return 27
  } else if (sheetInfo.sheetType == 'insulin_pump_sdry') {
    if (index === 0) {
      return 15;
    } else {
      return 22;
    }
  } else {
    return 17;
  }

}

