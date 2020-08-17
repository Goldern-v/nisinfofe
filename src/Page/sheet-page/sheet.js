import Title from "./components/render/Title";
import Body from "./components/render/Body";
import Mark from "./components/render/Mark.js";
import sheetInfo from "./components/config/sheetInfo";

// 自定义标题数据缓存数据
let autoTitleDataDisk = [];
let Page = function(titleData, autoTitleData, bodyData, index) {
  return {
    titleModel: Title(titleData, autoTitleData, index),
    bodyModel: Body(bodyData, index)
  };
};
let data = [];
export default data;

export function addSheetPage(callback) {
  data.push(
    Page(
      [],
      autoTitleDataDisk.map(item => {
        item.pageIndex = data.length;
        return item;
      }),
      [],
      data.length
    )
  );
  callback && callback();
}

export function delSheetPage(index, callback) {
  data.splice(index, 1);
  callback && callback();
}

export function cleanData() {
  data.splice(0, data.length);
  Mark.splice(0, Mark.length);
  autoTitleDataDisk = [];
}

export function initSheetPage(titleData, bodyData, markData) {
  cleanData();
  let titleList = [];
  let bodyList = [];
  try {
    titleList = titleData.list;
    bodyList = bodyData.list.map((item, index, arr) => {
      /** 上一条的年份 */
      let prevYear = arr[index - 1] && arr[index - 1].recordYear;
      let currYear = item.recordYear;
      if (prevYear && currYear && prevYear < currYear) {
        item.yearBreak = currYear;
      }
      return item;
    });
  } catch (e) {}
  autoTitleDataDisk = titleList.filter(item => {
    return true;
  });
  let realSize = Math.max(
    ...bodyList.map(item => {
      return item.pageIndex || 0;
    })
  );
  for (let i = 0; i < markData.length; i++) {
    Mark.push(markData[i]);
  }

  for (let key in sheetInfo.auditorMap) {
    if (sheetInfo.auditorMap.hasOwnProperty(key)) {
      sheetInfo.auditorMap[key] = "";
    }
  }
  sheetInfo.auditorMap = Object.assign({}, bodyData.auditorMap);

  for (let i = 0; i <= realSize; i++) {
    data.push(
      Page(
        titleList.filter(item => {
          return item.pageIndex == i;
        }),
        autoTitleDataDisk,
        bodyList.filter(item => {
          return item.pageIndex == i;
        }),
        i
      )
    );
  }
  if (data.length == 0) {
    data.push(Page([], [], [], 0));
  }
}
