import Title from "./components/render/Title";
import Body from "./components/render/Body";
import Mark from "./components/render/Mark.js";
import sheetInfo from "./components/config/sheetInfo";
import {
  saveTitleOptions,
  findListByBlockId
} from "@/api/sheet.js";

let autoTitleDataDisk = [];
// let autoOptionsData = [];

// 为了添加新页的时候把上一页的自定义标题（或者下拉选择拷贝到新添加页）
let autoOptions_next = []
let titleList_next = []
/**
 * 自定义标题数据缓存数据
 * @param {*} param0
 * autoOptionsData: 自定义选项
 * @returns
 */
let Page = function({titleData = [], autoTitleData = [], bodyData = [], index = '', autoOptionsData = []}) {
  console.log(autoTitleData, 77777)
  return {
    titleModel: Title(titleData, autoTitleData, index),
    bodyModel: Body(bodyData, index, autoOptionsData)
  };
};
let data = [];
export default data;

export async function addSheetPage(callback) {
  let Options = []
  let fieldSetting = []
  if (['foshanrenyi','fsxt'].includes(process.env.HOSPITAL_ID)) {
    let formatCustomObj = {}
    autoOptions_next.reduce((total, cur) => {
      if (!cur.fieldEn) return total
      if (cur.pageIndex == data.length - 1) {
        if (total[cur.fieldEn]) {
          total[cur.fieldEn].push(cur)
        } else {
          total[cur.fieldEn] = [cur]
        }
        return total
      } else { return total }
    }, formatCustomObj)
    let list = []
    Object.keys(formatCustomObj).map(item => {
      if (!item) return
      let title = titleList_next.filter(v => v.fieldEn === item)
      let options = formatCustomObj[item].map(v => v.options)
      list.push({fieldEn: formatCustomObj[item][0].fieldEn, id: formatCustomObj[item][0].id, pageIndex: data.length, fieldCn: title[0].fieldCn, option: options})
    })
    let params = {
      // pageIndex: this.index,
      // columnName: item.key,
      // id,
      // title,
      // list1: list,
      list,
      recordCode: sheetInfo.sheetType,
    };
    await saveTitleOptions(params)
    let http = await findListByBlockId()
    if (http.data.code === '200') {
      Options = http.data.data.Options.filter(v => v.pageIndex === data.length)
      autoOptions_next = Options
      fieldSetting = http.data.data.FieldSetting || []
    }
  }
  data.push(
    Page(
      {
        titleData: [],
        // autoTitleData: autoTitleDataDisk.map(item => {
        //   item.pageIndex = data.length;
        //   return item;
        // }),
        autoTitleData: fieldSetting,
        bodyData: [],
        index: data.length,
        autoOptionsData: Options
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
  // autoOptionsData = []
  autoOptions_next = []
  titleList_next = []
}

export async function initSheetPage(titleData, bodyData, markData) {
  // console.log('bodyData', bodyData)
  cleanData();
  let titleList = [];
  let bodyList = [];
  let customOptions = []
  sheetInfo.masterInfo = bodyData;// 主表信息
  try {
    if (['foshanrenyi','fsxt'].includes(process.env.HOSPITAL_ID)) {
      titleList = titleData.FieldSetting
      customOptions = titleData.Options
      titleList_next = titleData.FieldSetting
      autoOptions_next = titleData.Options
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
  // autoOptionsData = [...customOptions]
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
        // 这里设置每页的自定义下拉
        autoOptionsData: customOptions.filter(v => v.pageIndex === i)
      })
    );
  }
  // console.log('datazzzzzz', data)
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
