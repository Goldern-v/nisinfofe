import Title from "./components/render/Title";
import Body from "./components/render/Body";
import Body_Hj from "./components/render/Body_hj";
import Body_Hd from "./components/render/Body_hd";
import Title_Hj from "./components/render/Title_hj";
import Title_Hd from "./components/render/Title_hd";
import Mark from './components/render/Mark.js'
let Page = function(titleData, autoTitleData, bodyData, index) {
  console.log("当前页数据：Page:titleData, autoTitleData, bodyData, index:", titleData, autoTitleData, bodyData, index);
  if(process.env.HOSPITAL_ID === 'hj') {
    return {
      titleModel: Title_Hj(titleData, autoTitleData, index),
      bodyModel: Body_Hj(bodyData)
    }
  }else if (['huadu','dglb'].includes(process.env.HOSPITAL_ID)) {
    return {
      titleModel: Title_Hd(titleData, autoTitleData, index),
      bodyModel: Body_Hd(bodyData)
    }
  }else {
    return {
      titleModel: Title(titleData, autoTitleData, index),
      bodyModel: Body(bodyData)
    };
  }
  
  
};
let data = [];
export default data;

export function addNewNursingOrderSheetPage(callback) {
  // cleanData();
  data.push(Page());
  console.log("新建新护嘱单页面addNewNursingOrderSheetPage", data);
  callback && callback();
}

export function addNursingOrderSheetPage(callback) {
  data.push(Page());
  console.log("新加护嘱单页面addNursingOrderSheetPage",data);
  callback && callback();
}

export function delNursingOrderSheetPage(index, callback) {
  data.splice(index, 1);
  callback && callback();
}

export function cleanData() {
  data.splice(0, data.length)
  Mark.splice(0, Mark.length)
}

export function initNursingOrderSheetPage(titleData, bodyData, markData) {
  console.log("initNursingOrderSheetPage:cleanData:before", titleData, bodyData, markData);
  cleanData()
  let titleList = titleData.list||[];
  let bodyList = bodyData.list||[];
  let realSize = Math.max(...(bodyList.map(item => {
    return item.pageIndex || 0
  }))) 
  realSize = realSize === -Infinity ? 0 : realSize
  console.log('initNursingOrderSheetPage:realSize', realSize, bodyList)
  console.table(bodyList);
  try {
        // for (let i = 0; i < markData.length; i++) {
        //   Mark.push(markData[i]);
        // }
        for (let i = 0; i <= realSize; i++) {
          // console.log("realSize_loop",i);
          // data.push(Page(
          //     titleList.filter(item => {
          //       return item.pageIndex == i;
          //     }), titleList.filter(item => {
          //       return true;
          //     }), bodyList.filter(item => {
          //       return item.pageIndex == i;
          //     }), i));
          data.push(Page(titleList, titleList, bodyList, i));
          console.log("realSize_loop", i, data);
        }
      } catch (error) {
    console.log('initNursingOrderSheetPage:error',error)
  }
  console.log("data.length",data);
  if (data.length == 0) {
    data.push(Page())
  }
}