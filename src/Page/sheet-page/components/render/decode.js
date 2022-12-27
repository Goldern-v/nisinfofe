import data from "../../sheet.js";
import sheetInfo from "../config/sheetInfo/index.js";
import {
  renderRelObj
} from "../utils/relObj";
import moment from 'moment'
function decode(ayncVisitedData) {
  let changeArr = []
  let recordDateIndex = -1
  let recordMonthIndex = -1
  let recordHourIndex = -1
  data.map((page,pageIndex)=>{
    if(pageIndex == 0){
      recordDateIndex = page.bodyModel[0].findIndex(col=>col.key==='recordDate')
      recordMonthIndex = page.bodyModel[0].findIndex(col=>col.key==='recordMonth')
      recordHourIndex = page.bodyModel[0].findIndex(col=>col.key==='recordHour')
    }
    page.bodyModel.map(row=>{
      if(row.isChange){
        let recordDateValue = row[recordDateIndex].value && row[recordDateIndex].value
        !changeArr.includes(changeArr) && changeArr.push(recordDateValue)
      }
    })
  })

  let allData = [];
  for (let pageIndex = 0; pageIndex < data.length; pageIndex++) {
    let bodyModel = data[pageIndex].bodyModel;
    let result = [];
    let firstRecordDate = ''
    for (let index in bodyModel) {
      // 一定要做这个优化速度需求，被逼无奈，轻喷
      if (bodyModel.hasOwnProperty(index) && (!process.env.splitSave || bodyModel[index].isChange || (bodyModel[index][recordDateIndex] && bodyModel[index][recordDateIndex].value && changeArr.includes(bodyModel[index][recordDateIndex].value)))) {
        let tr = {};
        const recordDate = bodyModel[index].find((item)=>item.key == "recordDate");
        for (let option of bodyModel[index]) {
          tr[option.key] = option.value;
          if(recordDate && recordDate.value) {
            tr[`recordDate`] = recordDate.value
          }else{

            let itemRecordYear = bodyModel[index].find(
              item => item.key == "recordYear"
            ).value
              ? bodyModel[index].find(item => item.key == "recordYear").value
              : moment().format("YYYY");
            const month = bodyModel[index].find(item => item.key == "recordMonth").value
            const hour = bodyModel[index].find(item => item.key == "recordHour").value
            if (itemRecordYear && month && hour) {
              firstRecordDate = itemRecordYear + "-" + month + " " + hour
            }
            if (firstRecordDate) {
              bodyModel[index].find(item => item.key == "recordDate").value = firstRecordDate
            } else {
              bodyModel[index].find(item => item.key == "recordDate").value =
              itemRecordYear + "-" + month + " " + hour
            }
            //修改就保存  所以这里初始化签名数据  重新保存签名
          }
        }
        tr.pageIndex = pageIndex;
        result.push(tr)
      }
    }
    allData = [...allData, ...result];
  }

  // 贵州-同步护理巡视内容到特殊情况
  if (['guizhou', '925'].includes(process.env.HOSPITAL_ID) && ayncVisitedData) {
    let nullRowConfig = JSON.parse(JSON.stringify(data[0].bodyModel[0]))
    let nullRow = {}
    for (let option of nullRowConfig) {
      // tr[option.key] = option.value;
      nullRow[option.key] = ''
    }
    let rowObjData = { ...nullRow };
    for (let key in rowObjData) {
      if (key != 'pageIndex') {
        rowObjData[key] = '';
      }
    }
    rowObjData.recordMonth = ayncVisitedData.recordMonth;
    rowObjData.recordHour = ayncVisitedData.recordHour;
    let asyncData = []
    ayncVisitedData.list.map(description => {
      rowObjData.description = description;
      asyncData = [...asyncData, { ...rowObjData }]
    })
    if (allData[0] && !allData[0].recordMonth) {
      allData = [...asyncData, ...allData]
    } else {
      allData = [...allData, ...asyncData]
    }
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
    process.env.HOSPITAL_ID == "wujing" ||
    process.env.HOSPITAL_ID == "liaocheng" ||
    process.env.HOSPITAL_ID == "hengli" ||
    process.env.HOSPITAL_ID == "shannan" ||
    process.env.HOSPITAL_ID == "guizhou" ||
    process.env.HOSPITAL_ID == "fsxt" ||
    process.env.HOSPITAL_ID == "xiegang" ||
    process.env.HOSPITAL_ID == "lyxrm" ||
    process.env.HOSPITAL_ID == "gdtj" ||
    process.env.HOSPITAL_ID == "whhk" ||
    process.env.HOSPITAL_ID == "foshanrenyi" ||
    process.env.HOSPITAL_ID == "925"||
    process.env.HOSPITAL_ID == "stmz"||
    process.env.HOSPITAL_ID == "lyyz"||
    process.env.HOSPITAL_ID == "dglb"
  ) {
    auditorMapData.auditorMap = sheetInfo.auditorMap;
  }
  if(process.env.splitSave){
    let firstRecord = allData[0]
    if(firstRecord && (!firstRecord.recordMonth || !firstRecord.recordHour)){
      let [month,hour] = firstRecord.recordDate ? firstRecord.recordDate.split(' ') : moment().format('YYYY-MM-DD HH:ss').split(' ')
      month = month && moment(month).format('MM-DD')
      !firstRecord.recordMonth && (firstRecord.recordMonth = month)
      !firstRecord.recordHour && (firstRecord.recordHour = hour)
    }
  }

  return {
    list: allData,
    relObj: renderRelObj(sheetInfo.relObj),
    ...auditorMapData
  };
}

export default decode;
