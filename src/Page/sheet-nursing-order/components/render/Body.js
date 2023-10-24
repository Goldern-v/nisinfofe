import generalTr from "../config/general/tr.js";
import generalTrHzly from "../config/general/tr_hzly.js";

import sheetInfo from '../config/sheetInfo/index'
import {matchMark} from './Mark.js'
export default function Body(data = []) {
  let rowNum = sheetInfo.rowNum;
  let bodyModel = []
  for(let i = 0; i < Math.max(data.length, rowNum); i++) {
    bodyModel[i] = Tr(data[i])
  }
  return bodyModel
}

let obj = {hzly: generalTrHzly, default: generalTr}

function Tr(data = {}) {
    let schema = obj[process.env.HOSPITAL_ID]
    if (data && data.length>0) {
      console.log("Body_Tr", data);
    }

    let mergetTr = []
    for(let index = 0; index< schema.length; index ++) {
      let keys = Object.keys(schema[index])
      let obj = {}
      for(let item of keys) {
        if( item != 'value') {
          obj[item] = schema[index][item]
        }
      }
      obj.value = data[schema[index].key] || ''
      obj.markObj = matchMark(data.id, schema[index].key)

      mergetTr.push(obj)
    }
    // console.log("==渲染生产mergetTr:",mergetTr)
    mergetTr.push({
      hidden: true,
      key: 'markObj',
      value: matchMark(data.id, 'all'),
    })
    // formTitle
    mergetTr.push({
      hidden: true,
      key: 'formTitle',
      value: sheetInfo.formTitle,
    })

    mergetTr.push({
      hidden: true,
      key: 'orderContentCode',
      value: sheetInfo.orderContentCode,
    })
  // console.log('mergetTr', mergetTr)
  return mergetTr
}

export const nullRow = () => {
  let schema = obj[process.env.HOSPITAL_ID];
  return Tr(schema)
}

export {Tr}
