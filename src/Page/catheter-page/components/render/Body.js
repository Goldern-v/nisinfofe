import sheetInfo from '../config/sheetInfo/index'
import { matchMark } from './Mark.js'
export default function Body(data = []) {
  let rowNum = 20
  let bodyModel = []
  for (let i = 0; i < Math.max(data.length, rowNum); i++) {
    bodyModel[i] = Tr(data[i])
  }
  return bodyModel
}

function Tr(data = {}) {
  let schema = switechSheetType(sheetInfo.sheetType)
  let mergetTr = []
  for (let index = 0; index < schema.length; index++) {
    let keys = Object.keys(schema[index])
    let obj = {}
    for (let item of keys) {
      if (item != 'value') {
        obj[item] = schema[index][item]
      }
    }
    obj.value = data[schema[index].key] || ''
    obj.markObj = matchMark(data.id, schema[index].key)
    mergetTr.push(obj)
  }
  mergetTr.push({
    hidden: true,
    key: 'markObj',
    value: matchMark(data.id, 'all'),
  })
  /** 年份分割 */
  mergetTr.push({
    hidden: true,
    key: 'yearBreak',
    value: data.yearBreak,
  })
  return mergetTr
}

export const nullRow = () => {
  return Tr()
}

export { Tr }


// 区分科室
function switechSheetType(type) {
  let schema
  switch (type) {
    case 'catheter': {
      schema = require('../config/catheter/tr').default
    } break;
    // default: {
    //   schema = require('../config/default/tr.js').default
    // }
  }
  return schema
}






















// export const nullRow = () => {
//   let schema
//   switch (sheetInfo.sheetType) {
//     case 'jointnew': {
//       schema = jointTr
//     }break;
//     case 'gynecologynew': {
//       schema = gynecologyTr
//     }break;
//     case 'endocrinologynew': {
//       schema = endocrinologyTr
//     }break;
//     case 'neurology': {
//       schema = neurologyTr
//     }break;
//     default:
//       break;
//   }
//   return Tr(schema)
// }

// export {Tr}