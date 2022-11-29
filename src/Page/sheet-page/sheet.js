import Title from "./components/render/Title";
import Body from "./components/render/Body";
import sheetInfo  from "./components/config/sheetInfo";
import { getRowNum } from "./components/utils/sheetRow"
import {
  // saveTitleOptions,
  addNewPageTitleOptions,
  findListByBlockId
} from "@/api/sheet.js";
import Mark from "./components/render/Mark";
let autoTitleDataDisk = [];
//护记需要转换数据格式
let sheetData = []
let listData=[]
let startPage = 0
let endPage = 0
let sheetStartPage = 0
let addPage = []
// 为了添加新页的时候把上一页的自定义标题（或者下拉选择拷贝到新添加页）
// let autoOptions_next = []
// let titleList_next = []
/**
 * 自定义标题数据缓存数据
 * @param {*} param0
 * autoOptionsData: 自定义选项
 * index 为页码
 * @returns
 */
let Page = function({titleData = [], autoTitleData = [], bodyData = [], index = '', autoOptionsData = []}) {
  return {
    titleModel: Title(titleData, autoTitleData, index),
    bodyModel: Body(bodyData, index, autoOptionsData),
    index,
    blockId:sheetInfo.selectBlock.id
  };
};
let data = [];
export default data;

export async function addSheetPage(callback) {
  let Options = []
  let FieldTitle = []
  if (['foshanrenyi','fsxt', 'gdtj'].includes(process.env.HOSPITAL_ID)) {
    // let formatCustomObj = {}
    let params = {
      pageIndex: data.length,
      recordCode: sheetInfo.sheetType,
    };
    //自定义标题分页 需要传页码的开始页码和结束页码  减去护记的起始页码
    // await saveTitleOptions(params)
    await addNewPageTitleOptions(params)
    let http = await findListByBlockId( + startPage - sheetStartPage, + endPage - sheetStartPage)
    if (http.data.code === '200') {
      Options = http.data.data.Options.filter(v => v.pageIndex === + endPage - sheetStartPage)
      FieldTitle = http.data.data.FieldSetting.filter(v => v.pageIndex === (+ endPage - sheetStartPage))
      FieldTitle.map((Fieldlist)=>{
        Fieldlist.pageIndex  = Fieldlist.pageIndex +1
      })
    }
  }
  data.push(
    Page(
      {
        titleData: [],
        autoTitleData: ['foshanrenyi','fsxt', 'gdtj'].includes(process.env.HOSPITAL_ID) ? FieldTitle : autoTitleDataDisk.map(item => {
          item.pageIndex =  item.pageIndex + 1;
          return item;
        }),
        bodyData: [],
        index:+ endPage + 1 - sheetStartPage,
        autoOptionsData: Options,
        // fromAddPage: true
      }
    )
  );
  //每次拿页码，新增后，页码 +1
  endPage = + endPage + 1
  addPage.push(endPage)
  sheetInfo.addPage = addPage
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
    sheetData = [];
    listData = [];
    startPage = 0
    endPage = 0
    sheetStartPage = 0
    addPage = []
    //保存添加新页码的数组 ，初始化清空
    sheetInfo.addPage = []
  }
  let isFirst = function(tr, x, y, bodyModel) {
    let recordDate = tr.find(item => item.key == "recordDate").value;
    let recordSource = tr.find(item => item.key == "recordSource").value;
    let flag = false;
    if (recordDate && recordSource) {
      let dateIndex = bodyModel[0].findIndex(e => e.key == "recordDate");
      let sourceIndex = bodyModel[0].findIndex(e => e.key == "recordSource");
      let index = bodyModel.findIndex(item => {
        return (
          item[dateIndex].value == recordDate &&
          item[sourceIndex].value == recordSource
        );
      });
      flag = index == x;
    }
    return flag;
  };
  let isRead = function(tr, x, nowX, listData) {
    // nowX可以看上面注解，估计所有医院用x都有bug(无论有多少页数据，只能第一页的数据进行判断，返回isRead)。但是不敢动，医院反正有问题就可替换nowX
    if (
      process.env.HOSPITAL_ID == "huadu" &&
      sheetInfo.sheetType === "body_temperature_Hd"
    ) {
      return false;
    }
    if (
      (process.env.HOSPITAL_ID == "nanfangzhongxiyi" ||
        process.env.HOSPITAL_ID == "xiegang" ||
        process.env.HOSPITAL_ID == "sdlj") &&
      listData && listData[nowX] && !listData[nowX].canModify
    ) {
      return true;
    }
    if (listData && listData[x] && listData[x].canModify) {
      return false;
    }
    // 当审核完，就出现问题，下拉还是会出现。 用this.isDisabed解决
    // 这里主要是给弹窗做判断isRead
    if (
      process.env.HOSPITAL_ID === "foshanrenyi" &&
      listData &&
      listData[nowX] &&
      listData[nowX].status == 2 &&
      !listData[nowX].canModify
    ) {
      // 当审核完，status=2&&canModify=false,
      return true;
    }
  };
  // 签名是否可以点击（签名除同一记录的最后一个不锁定，其他锁定）
  let isDisabed = function(tr, td, x, y, bodyModel, nowX, sheetType) {
    // nowX可以看上面注解，估计所有医院用x都有bug(无论有多少页数据，只能第一页的数据进行判断，返回isDisabed)。但是不敢动，医院反正有问题就可替换nowX
    // canModify false可以修改，true禁止修改
    // 签名后不能修改，要取消修改才能修改
    if (sheetType == "common_xg" || ['beihairenyi'].includes(process.env.HOSPITAL_ID)) {
      if (td && listData[nowX]) {
        return !listData[nowX].canModify;
      }
    }

    // 临邑日期时间禁用符号，识别该行已经被占用
    if (['lyxrm', 'whhk'].includes(process.env.HOSPITAL_ID)) {
      if (listData[nowX]) {
        // 第一条记录
        const firstEqualIndex = listData.findIndex(
          item => listData[nowX] && item.recordDate == listData[nowX].recordDate
        );
        return (
          firstEqualIndex != -1 &&
          firstEqualIndex !== nowX &&
          (td.key == "recordMonth" || td.key == "recordHour")
        );
      } else {
        return false
      }
    }
    if (process.env.HOSPITAL_ID == "whfk") {
      if (td && listData[x]) {
        // 是否签名,签名了就不能编辑。需要取消签名
        if (tr.find(item => item.key == "status").value === "1") {
          return true;
        }
      }
    }
    // 佛医护记单除特殊情况以及同一记录的第一条其余填写保存后锁定
    if (process.env.HOSPITAL_ID === "foshanrenyi") {
      // 如果审核完，canModify = false 全部禁用
      if (
        listData[nowX] &&
        listData[nowX].status == 2 &&
        !listData[nowX].canModify
      ) {
        return true;
      } else {
        // 否则按照锁定规则
        const firstEqualIndex = listData.findIndex(
          item => listData[nowX] && item.recordDate == listData[nowX].recordDate
        );
        return (
          firstEqualIndex != -1 &&
          firstEqualIndex !== nowX &&
          td.key != "description"
        );
      }
    }
    // 如果审核完，canModify=false才禁用
    if (
      process.env.HOSPITAL_ID === "foshanrenyi" &&
      listData &&
      listData[nowX] &&
      listData[nowX].status == 2 &&
      !listData[nowX].canModify
    ) {
      return true;
    }
    if (
      process.env.HOSPITAL_ID === "gdtj" &&
      listData &&
      listData[nowX] &&
      listData[nowX].status == 1 &&
      !listData[nowX].canModify
    ) {
      return true;
    }
    if (
      process.env.HOSPITAL_ID == "huadu" &&
      sheetInfo.sheetType === "body_temperature_Hd" &&
      td &&
      listData[x]
    ) {
      return !listData[x].canModify;
    }

    if (
      (process.env.HOSPITAL_ID == "xiegang" && listData && listData[nowX]) ||
      (process.env.HOSPITAL_ID == "nanfangzhongxiyi" &&
        listData &&
        listData[nowX])||
      (process.env.HOSPITAL_ID == "sdlj" && listData && listData[nowX])||
      (process.env.HOSPITAL_ID == "qhwy" && listData && listData[nowX])
    ) {
      return !listData[nowX].canModify;
    }

    if (td && td.key == "recordYear") {
      if (!tr.find(item => item.key == "recordMonth").value) {
        td.value = "";
      }
      return true;
    }
    // 护理记录单特殊情况记录输入多行,签名后,其他项目不能在编辑
    if (
      process.env.HOSPITAL_ID == "huadu" &&
      tr.find(item => item.key == "status").value === "1"
    ) {
      let flag =
        tr.find(item => item.key == "status").value === "1" && // 是否已签名
        listData &&
        listData[x] &&
        !listData[x].canModify; // 是否有权限
      //td存在才判断
      if (td) {
        flag =
          !isFirst(tr, x, y, bodyModel) &&
          (td.key === "recordMonth" || td.key === "recordHour"); // 已签名的recordMonth和recordHour单元格，并且不是第一行(最高等级)
      }
      return flag;
    }
    if (
      ( process.env.HOSPITAL_ID == "gdtj" &&
       tr.find((item) => item.key == "status").value === "1")
       ||sheetInfo.sheetType === "generalnursing_tj"
       ||sheetInfo.sheetType === "prenataldelivery2_tj"
       ||sheetInfo.sheetType === "pediatric3_tj"
       ||sheetInfo.sheetType === "postpartum2_tj"
     ) {
      let flag =
      tr.find(item => item.key == "status").value === "1" && // 是否已签名
      listData &&
      listData[x] &&
      !listData[x].canModify&&(td.key === "recordMonth" || td.key === "recordHour");; // 是否有权限
      //td存在才判断
      return flag;
     }
    if (
      process.env.HOSPITAL_ID != "weixian" ||
      (td && td.key == "description") ||
      tr.find(item => item.key == "recordSource").value == 5
    ) {
      return false;
    }
    if (
      tr.find(item => item.key == "description").value &&
      !tr.find(item => item.key == "recordHour").value &&
      !tr.find(item => item.key == "recordMonth").value
    ) {
      return true;
    } else {
      return false;
    }
  };
    // 查找数组最后一个符号条件元素的下标
  let findLastIndex=function(array = [], callback, thisArg) {
      for (let i = array.length; i >= 0; i--) {
        const value = array[i]
        if (callback.call(thisArg, value, i, array)) {
          return i
        }
      }
      return -1
    }
    // 签名是否可以点击（签名除同一记录的最后一个不锁定，其他锁定）
  let setSignDiabled=function(td, nowX ,listData) {
      if (process.env.HOSPITAL_ID == 'foshanrenyi') {
        const lastIndex = findLastIndex(
          listData,
          item => item && listData[nowX] && item.recordDate == listData[nowX].recordDate
        )
        return lastIndex != -1 && nowX !== lastIndex
      } else {
        return false
      }
    }
export let initSheetPage=(titleData, bodyData, markData ,listDataList)=>{
  cleanData();
  startPage = sheetInfo.startPage
  endPage = sheetInfo.endPage
  sheetStartPage = sheetInfo.sheetStartPage
  let titleList = [];
  let bodyList = [];
  let customOptions = []
  sheetInfo.masterInfo = bodyData;// 主表信息
  listData=listDataList
  try {
    if (['foshanrenyi','fsxt', 'gdtj'].includes(process.env.HOSPITAL_ID)) {
      titleList = titleData.FieldSetting
      customOptions = titleData.Options
    } else {
      titleList = titleData.list;
    }
    //bodyList是后端传回来的接口数据
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
  let startSize = Math.min(
    ...bodyList.map(item => {
      return item.pageIndex || 0;
    })
  );
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
  for (let i = startSize; i <= realSize; i++) {
    data.push(
      Page({
        titleData: titleList.filter(item => {
          return item.pageIndex == i;
        }),
        autoTitleData: autoTitleDataDisk,
        bodyData: bodyList.filter(item => {
          return item.pageIndex == i;
        }),
        index:i,
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
  let forMatData = () => {
      sheetData = data.map((item, index, arr) => {
        let obj = {
          index:item.index,
          data: item,
          length: arr.length,
          blockId:item.blockId
        };
        return obj;
      });
      sheetData.map((item, index) => {
        // x为每页护记的行数
        item.data.bodyModel.map((tr, x) => {
          if (!tr.hasOwnProperty("isRead")) {
            // 如果传x永远都是当前护记的行数，不会叠加（列入0~16 17条数据的护记）。使用的时候是判断的是整个表格的数据(一页显示17条数据的护记  可能会有几百条数据，所以x需要计算)
            // 不计算 isRead  isDisabed  永远都是拿第一页数据进行比对，是否签名与审核，第2页之后的都是用第一页的数据比较
            let nowX = "";
            if (item.index == 0) {
              nowX = x;
            } else {
              nowX =
                getRowNum(item.index) -
                1 +
                getRowNum(item.index) * (item.index - 1) +
                x +
                1;
            }
            tr.isRead = isRead(tr, x, nowX, listData);
            tr.map((td, y) => {
              td.isDisabed = isDisabed(
                tr,
                td,
                x,
                y,
                item.data.bodyModel,
                nowX,
                sheetInfo.sheetType
              );
              td.signDisabled = setSignDiabled(td, nowX, listData);
            });
          }
        });
      });
    };
    //返回护记显示的数据
    export function getData() {
      forMatData();
      return sheetData;
    }
