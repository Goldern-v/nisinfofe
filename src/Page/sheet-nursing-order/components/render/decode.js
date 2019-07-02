import data from "../../sheet.js";

function decode() {
  let allData = [];
  for (let pageIndex = 0; pageIndex< data.length; pageIndex ++) {
    let bodyModel = data[pageIndex].bodyModel;
    let result = [];
    for (let index in bodyModel) {
      if(bodyModel.hasOwnProperty(index)) {
        let tr = {};
         for (let option of bodyModel[index]) {
         tr[option.key] = option.value;
      }
      tr.pageIndex = pageIndex
      result[index] = tr;
     }
    }
    allData = [...allData, ...result];
  }
  return {
    list: allData
  };
}

export default decode;
