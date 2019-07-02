
export const initialData = {
  sheetType: "",
  isSave: true,
  sheetStartPage: 1,
  sheetMaxPage: 1,
  startPage: 0,
  endPage: 0,
  downControl: false,
  selectRow: [],
  selectBlock: {},
  copyRow: "",
  formTitle: "护嘱单",
  orderContentCode : "",
  rowNum: 27 // render Body rowNum
}

export var resetSheetInfoData = function(sheetInfo){
  sheetInfo.sheetType = "",
  // sheetInfo.isSave = initialData.isSave,
  sheetInfo.sheetStartPage = 1,
  sheetInfo.sheetMaxPage = 1,
  sheetInfo.startPage = 0,
  sheetInfo.endPage = 0,
  sheetInfo.downControl = false,
  sheetInfo.selectRow = [],
  sheetInfo.selectBlock = {},
  sheetInfo.copyRow = "",
  sheetInfo.orderContentCode = sheetInfo.orderContentCode || "",
  sheetInfo.formTitle = sheetInfo.formTitle? sheetInfo.formTitle:initialData.formTitle,
  sheetInfo.rowNum = initialData.rowNum // render Body rowNum
}

export default {
  sheetType: "",
  isSave: true,
  sheetStartPage: 1,
  sheetMaxPage: 1,
  startPage: 0,
  endPage: 0,
  downControl: false,
  selectRow: [],
  selectBlock: {},
  copyRow: "",
  formTitle: "护嘱单",
  orderContentCode : "",
  rowNum: 27, // render Body rowNum,
};
