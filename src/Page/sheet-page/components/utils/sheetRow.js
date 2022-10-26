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
  } else if (sheetInfo.sheetType == "oxytocin") {
    if (index === 0) {
      return 17;
    } else {
      return 28;
    }
  } else if (sheetInfo.sheetType == "com_lc") {
    return 22;
  } else if (sheetInfo.sheetType == "intervention_cure"||sheetInfo.sheetType == "icu_cpr_xg") {
    return 15;
  } else if (sheetInfo.sheetType == "Record_Children_Serious_Lc" || sheetInfo.sheetType == "ops_linyi" || sheetInfo.sheetType == "premiumcare_ytll") {
    return 26;
  } else if (sheetInfo.sheetType == "icu_qz" || sheetInfo.sheetType == "postpartum_wj" || sheetInfo.sheetType == "iabp_fs") {
    return 33;
  } else if (sheetInfo.sheetType == "icu_lc") {
    return 22;
  } else if (sheetInfo.sheetType == "special") {
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
  } else if (sheetInfo.sheetType == "critical_lc" || sheetInfo.sheetType == "critical_new_linyi" || sheetInfo.sheetType == 'critical_new_weihai' || sheetInfo.sheetType == "critical_new_lc" ||sheetInfo.sheetType === 'babyarea_fs') {
    return 20;
  } else if (sheetInfo.sheetType == "cardiology_lcey") {
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
  } else if (sheetInfo.sheetType === 'blood_circulation_hl' || sheetInfo.sheetType == "inout_ytll") {
    return 35
  } else if (sheetInfo.sheetType === 'intravenous_sdlj'|| sheetInfo.sheetType === 'criticaldisease_xt' || sheetInfo.sheetType === 'cardiovascular_xt' ) {
    return 20
  } else if ( sheetInfo.sheetType === 'access_fk'||sheetInfo.sheetType === 'cardiac_lcey') {
    return 28
  } else if (sheetInfo.sheetType === 'mechanical_sdlj'||sheetInfo.sheetType === 'custody_yz') {
    return 33
  } else if ( sheetInfo.sheetType === 'magnesium_lcey' || sheetInfo.sheetType == "seriousnursing_ytll") {
    return 24
  }else if ( sheetInfo.sheetType === 'record_children_serious2_lc'||sheetInfo.sheetType === sheetInfo.sheetType === 'generalnursing_tj') {
    return 19
  }else if (sheetInfo.sheetType === 'nursingrecords_zxy' || sheetInfo.sheetType === 'generalnursing_xt' || sheetInfo.sheetType === 'baby_yz'  ) {
    return 21
  }else if (sheetInfo.sheetType === 'neonate_sdlj') {
    return 18
  }else {
    return 17;
  }

}

