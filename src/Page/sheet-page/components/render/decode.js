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
  return {
    list: allData,
    relObj: renderRelObj(sheetInfo.relObj)
  };
}

export default decode;
