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
  } else if (sheetInfo.sheetType == "post_partum") {
    if (index === 0) {
      return 16;
    } else {
      return 28
    }
   } else {
    return 17;
  }

}
