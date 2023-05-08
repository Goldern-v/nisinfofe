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
  let result = [];
  let prevRecord = [];
  let lastRecord = [];
  let isChangePreRecord = [];
  let isChangeLastRecord = [];
  for (let pageIndex = 0; pageIndex < data.length; pageIndex++) {
    let bodyModel = data[pageIndex].bodyModel;
    /**
     * 在sheet.js里面通过接口拿到上下页码的补充数据 存在sheetInfo里面
     * 如果是第一页的页码存在跨页数据 则把 supplementLastList（上页数据的跨页数据补上）、
     * 如果是最后一页的页码存在跨页数据  则把supplementNextList（下一页的跨页数据给补上）
    */
    if (pageIndex === 0) {
      bodyModel = [...data[pageIndex].supplementLastList, ...bodyModel]
    }
    if (pageIndex === data.length - 1) {
      bodyModel = [ ...bodyModel ,...data[pageIndex].supplementNextList,]
    }
    let firstRecordDate = ''
    for (let index in bodyModel) {
      // 一定要做这个优化速度需求，被逼无奈，轻喷
      // isChange意思是当前行的修改，splitSava：是否全部页的数据一起传参，
      // changeArr: 修改的每行中的recordDate的数据会添加进去。
      if (bodyModel.hasOwnProperty(index) && (!process.env.splitSave || bodyModel[index].isChange || (bodyModel[index][recordDateIndex] && bodyModel[index][recordDateIndex].value && changeArr.includes(bodyModel[index][recordDateIndex].value)))) {
        let tr = {};
        const recordDate = bodyModel[index].find((item)=>item.key == "recordDate");
        const recordYear = bodyModel[index].find(item => item.key == "recordYear").value
        let itemRecordYear = recordYear ? recordYear : moment().format("YYYY");
        const month = bodyModel[index].find(item => item.key == "recordMonth").value
        const hour = bodyModel[index].find(item => item.key == "recordHour").value
        const ischangeMonth = month ? month : moment(recordDate.value).format('MM-DD')
        const ischangeHour = hour ? hour : moment(recordDate.value).format('HH:mm')

        for (let option of bodyModel[index]) {
          tr[option.key] = option.value;
        }
        // 当前行直接修改，想要保存和上一行时间一样保存
        if(recordDate && recordDate.value) {
          tr[`recordDate`] = recordDate.value
        }else{
          if (itemRecordYear && month && hour) {
            firstRecordDate = itemRecordYear + "-" + month + " " + hour
          }
          if (firstRecordDate) {
            bodyModel[index].find(item => item.key == "recordDate").value = firstRecordDate
          } else {
            if(month && hour){
              bodyModel[index].find(item => item.key == "recordDate").value =`${itemRecordYear}-${month} ${hour}`
            }else{
              let i = index
              if(i==0){
                bodyModel[index].find(item => item.key == "recordDate").value = `${itemRecordYear}-${moment().format("MM-DD")} ${hour}`
              }else{
                while(i--) {
                  const lastRecordMonth = bodyModel[i].find(item => item.key == "recordMonth").value
                  if (lastRecordMonth) {
                    if(bodyModel[index].find(item => item.key == "recordHour").value){
                      bodyModel[index].find(item => item.key == "recordMonth").value = lastRecordMonth
                      bodyModel[index].find(item => item.key == "recordDate").value = `${itemRecordYear}-${lastRecordMonth} ${hour}`
                    }
                    break;
                  }
                }
              }

            }
          }
        }
        tr.pageIndex = pageIndex;
        result.push(tr)
        // 当前行数修改后，当前页相同时间，当前修改行之前相同时间于当前行数时间一同发起请求。
        for (let i = 0; i < index; i++) {
          const changeDate = bodyModel[i].find(item => item.key === 'recordDate').value;
          const [changeMonth, changeHour] = [moment(changeDate).format('MM-DD'), moment(changeDate).format('HH:mm')]
          if (changeDate && changeMonth === ischangeMonth && changeHour === ischangeHour && !bodyModel[i].isChange && !bodyModel[i].isChange &&  !(bodyModel[i][recordDateIndex] && bodyModel[i][recordDateIndex].value && changeArr.includes(bodyModel[i][recordDateIndex].value))) {
            let setTr = {}
            for (const option of bodyModel[i]) {
              setTr[option.key] = option.value;
            }
            isChangePreRecord.push(setTr);
          }
          // isChangePreRecord = simplifySet(i,bodyModel,ischangeMonth,ischangeHour,isChangePreRecord)
        }
        //  // 当前行数修改后，当前页相同时间，当前修改行之后相同时间于当前行数时间一同发起请求。
        for (let i = +index + 1; i < bodyModel.length; i++) {
          const changeDate = bodyModel[i].find(item => item.key === 'recordDate').value;
          const [changeMonth, changeHour] = [moment(changeDate).format('MM-DD'), moment(changeDate).format('HH:mm')]
          // console.log(i, changeDate,changeMonth === ischangeMonth , changeHour === ischangeHour,!bodyModel[i].isChange)
          if (changeDate && changeMonth === ischangeMonth && changeHour === ischangeHour && !bodyModel[i].isChange &&  !(bodyModel[i][recordDateIndex] && bodyModel[i][recordDateIndex].value && changeArr.includes(bodyModel[i][recordDateIndex].value))) {
            let setTr = {}
            for (const option of bodyModel[i]) {
              setTr[option.key] = option.value;
            }
            isChangeLastRecord.push(setTr);
          }
          // isChangeLastRecord = simplifySet(i,bodyModel,ischangeMonth,ischangeHour,isChangeLastRecord)
        }
        // 当前行数修改后，当前页的前一页相同时间，当前修改行之后相同时间于当前行数时间一同发起请求。
        for (let i = 0; i < pageIndex; i++) {
          const prevPage = data[i].bodyModel;
          for (let prevIndex = 0; prevIndex < prevPage.length; prevIndex++) {
            const changeDate = prevPage[prevIndex].find(item => item.key === 'recordDate').value;
            const [changeMonth, changeHour] = [moment(changeDate).format('MM-DD'), moment(changeDate).format('HH:mm')]
            if (changeDate && changeMonth === ischangeMonth && changeHour === ischangeHour ) {
              let setTr = {}
              for (const option of prevPage[prevIndex]) {
                setTr[option.key] = option.value;
              }
              prevRecord.push(setTr);
            }
          }
        }
        // 当前行数修改后，当前页的后一页相同时间，当前修改行之后相同时间于当前行数时间一同发起请求。
        for (let i = pageIndex + 1; i < data.length; i++) {
          const lastPage = data[i].bodyModel;
          for (let lastIndex = 0; lastIndex < lastPage.length; lastIndex++) {
            const changeDate = lastPage[lastIndex].find(item => item.key === 'recordDate').value;
            const [changeMonth, changeHour] = [moment(changeDate).format('MM-DD'), moment(changeDate).format('HH:mm')]
            if (changeDate && changeMonth === ischangeMonth && changeHour === ischangeHour ) {
              let setTr = {}
              for (const option of lastPage[lastIndex]) {
                setTr[option.key] = option.value;
              }
              lastRecord.push(setTr);
            }
          }
        }
      }
    }

  }
  // if(['925'].includes(process.env.HOSPITAL_ID)){
  //   allData = [...allData, ...prevRecord, ...isChangePreRecord, ...result, ...isChangeLastRecord, ...lastRecord];
  // }else{
    allData = [...allData, ...result];
  // }

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
    process.env.HOSPITAL_ID == "nfyksdyy"||
    process.env.HOSPITAL_ID == "dglb"
  ) {
    auditorMapData.auditorMap = sheetInfo.auditorMap;
  }
  //第一条记录  录入数据没有日期的情况
    let firstRecord = allData[0]
    if(firstRecord && (!firstRecord.recordMonth || !firstRecord.recordHour)){
      let [month,hour] = firstRecord.recordDate ? firstRecord.recordDate.split(' ') : moment().format('YYYY-MM-DD HH:ss').split(' ')
      month = month && moment(month).format('MM-DD')
      !firstRecord.recordMonth && (firstRecord.recordMonth = month)
      !firstRecord.recordHour && (firstRecord.recordHour = hour)
    }
  return {
    list: allData,
    relObj: renderRelObj(sheetInfo.relObj),
    ...auditorMapData
  };
}
/**
 * 当前页，同一时间添加发送：
 @param index 当前页条数
 @param bodyModel 当前页对象
 @param month 当前行修改月日时间
 @param hour 当前行修改时分时间
 @param setRecord 接收数组
*/
function simplifySet(index,bodyModel, month, hour, setRecord) {
    const changeDate = bodyModel[index].find(item => item.key === 'recordDate').value;
    const [changeMonth, changeHour] = [moment(changeDate).format('MM-DD'), moment(changeDate).format('HH:mm')]
    if (changeDate && changeMonth === month && changeHour === hour && !(bodyModel[index].isChange)) {
      let setTr = {}
      for (const option of bodyModel[index]) {
        setTr[option.key] = option.value;
      }
      setRecord.push(setTr);
    }
    return setRecord
}
function simplifyPrev(index,bodyModel, month, hour, setRecord,) {
    const changeDate = bodyModel[index].find(item => item.key === 'recordDate').value;
    const [changeMonth, changeHour] = [moment(changeDate).format('MM-DD'), moment(changeDate).format('HH:mm')]
    if (changeDate && changeMonth === month && changeHour === hour ) {
      let setTr = {}
      for (const option of bodyModel[index]) {
        setTr[option.key] = option.value;
      }
      setRecord.push(setTr);
    }
    return setRecord
}


export default decode;
