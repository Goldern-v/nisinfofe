import Title from "./components/render/Title";
import Body from "./components/render/Body";
import Mark from "./components/render/Mark.js";
import sheetInfo from "./components/config/sheetInfo";

let autoTitleDataDisk = [];
/**
 * 自定义标题数据缓存数据
 * @param {*} param0
 * autoOptionsData: 自定义选项
 * @returns
 */
let Page = function({titleData = [], autoTitleData = [], bodyData = [], index = '', autoOptionsData = []}) {
  return {
    titleModel: Title(titleData, autoTitleData, index),
    bodyModel: Body(bodyData, index, autoOptionsData)
  };
};
let data = [];
export default data;

export function addSheetPage(callback) {
  data.push(
    Page(
      {
        titleData: [],
        autoTitleData: autoTitleDataDisk.map(item => {
          item.pageIndex = data.length;
          return item;
        }),
        bodyData: [],
        index: data.length
      }
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
  let customOptions = []
  sheetInfo.masterInfo = bodyData;// 主表信息
  try {
    if (['foshanrenyi','fsxt'].includes(process.env.HOSPITAL_ID)) {
      titleList = titleData.FieldSetting
      customOptions = titleData.Options
    } else {
      titleList = titleData.list;
    }
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
      Page({
        titleData: titleList.filter(item => {
          return item.pageIndex == i;
        }),
        autoTitleData: autoTitleDataDisk,
        bodyData: bodyList.filter(item => {
          return item.pageIndex == i;
        }),
        index: i,
        autoOptionsData: customOptions.filter(v => v.pageIndex == i)
      })
    );
  }
  if (data.length == 0) {
    data.push(Page({
      titleData: titleList.filter(item => {
        return item.pageIndex == 0;
      }),
      autoTitleData: autoTitleDataDisk,
      bodyData: bodyList.filter(item => {
        return item.pageIndex == 0;
      }),
      index: 0,
      autoOptionsData: customOptions.filter(v => v.pageIndex == 0)
    }));
  }
}
