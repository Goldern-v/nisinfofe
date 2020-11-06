import data from "../../sheet.js";
import sheetInfo from "../config/sheetInfo/index.js";
import { renderRelObj } from "../utils/relObj";
function decode() {
  let allData = [];
  for (let pageIndex = 0; pageIndex < data.length; pageIndex++) {
    let bodyModel = data[pageIndex].bodyModel;
    let result = [];
    for (let index in bodyModel) {
      if (bodyModel.hasOwnProperty(index)) {
        let tr = {};
        for (let option of bodyModel[index]) {
          tr[option.key] = option.value;
        }
        tr.pageIndex = pageIndex;
        result[index] = tr;
      }
    }
    allData = [...allData, ...result];
  }

  // 血液净化护理单
  if (
    sheetInfo.sheetType == "blood_purification" &&
    window.getRelObj &&
    window.getRelObj.constructor == Function
  ) {
    sheetInfo.relObj = window.getRelObj() || sheetInfo.relObj;
  }

  // 审核签名数据
  let auditorMapData = {};
  if (
    process.env.HOSPITAL_ID == "lingcheng" ||
    process.env.HOSPITAL_ID == "huadu" ||
    process.env.HOSPITAL_ID == "wujing" 
  ) {
    auditorMapData.auditorMap = sheetInfo.auditorMap;
  }

  return {
    list: allData,
    relObj: renderRelObj(sheetInfo.relObj),
    ...auditorMapData
  };
}

export default decode;
