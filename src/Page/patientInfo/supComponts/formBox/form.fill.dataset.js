
// 回填 表单 侧边栏 UI 界面的 数据

//数据回填处理函数
export function fill(sourceData,targetData) {
  var pdata = sourceData.pageMap;
   // todo 之后修改成 map  reduce -- ECMAScript 3
    for (var item in pdata) {
      if (pdata.hasOwnProperty(item)) {
        if(pdata[item]!==null){
          let obj = findListObjByName(targetData, item)
          // console.log("^^^^^^fill", obj, typeof (obj), pdata, item, pdata[item], pdata[item].split(','),targetData)
          if(obj){
            if (obj.hasOwnProperty('results') && pdata[item].indexOf(",") > -1) {
              let results = pdata[item].split(",");
              obj.results = [];
              results.map(option => {
                obj.results.push(option);
              });
            }
            if(pdata[item]==="true"){
              obj.result = true
            }else{
              obj.result = pdata[item]
            }
          }
        }
      }
    }
}

function findListObjByName(targetData,name) {
  for (var tab in targetData.tabs) {
    if (targetData.tabs.hasOwnProperty(tab)) {
      for (var item in targetData.tabs[tab].items) {
        if (targetData.tabs[tab].items.hasOwnProperty(item)) {
          if (targetData.tabs[tab].items[item].name.toLowerCase()  === name.toLowerCase() ) {
            return targetData.tabs[tab].items[item]
          }
          for (var kid in targetData.tabs[tab].items[item].child) {
            if (targetData.tabs[tab].items[item].child[kid].name.toLowerCase()  === name.toLowerCase() ) {
              return targetData.tabs[tab].items[item].child[kid]
            }
          }
        }
      }
    }
  }
  return null
}

export default {
  fill:fill,
}
