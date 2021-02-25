/** 获取护记的行数 */
import sheetInfo from "../config/sheetInfo";
export function getRowNum(index) {
  console.log(index, "index", sheetInfo.sheetType);
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
  } else if (sheetInfo.sheetType == "oxytocin") {
    if (index === 0) {
      return 17;
    } else {
      return 28;
    }
  } else if (sheetInfo.sheetType == "com_lc") {
    return 22;
  } else if (sheetInfo.sheetType == "intervention_cure") {
    return 15;
  } else if (sheetInfo.sheetType == "Record_Children_Serious_Lc") {
    return 28;
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
  } else {
    return 17;
  }
}
