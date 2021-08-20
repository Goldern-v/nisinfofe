// import jointTr from '../config/joint/tr.js'
// import gynecologyTr from '../config/gynecology/tr.js'
// import endocrinologyTr from '../config/endocrinology/tr.js'
// import neurologyTr from '../config/neurology/tr.js'

import generalTr from "../config/general/tr_hd";

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

function Tr(data = {}) {
    let schema = generalTr
    if (data && data.length>0) {
      console.log("Body_Tr", data);
    }
  
  // switch (sheetInfo.sheetType) {
  //   case 'jointnew': {
  //     schema = jointTr
  //   }break;
  //   case 'gynecologynew': {
  //     schema = gynecologyTr
  //   }break;
  //   case 'endocrinologynew': {
  //     schema = endocrinologyTr
  //   }break;
  //   case 'neurology': {
  //     schema = neurologyTr
  //   }break;
  //   default:
  //     break;
  // }

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
  let schema = generalTr;
  // switch (sheetInfo.sheetType) {
  //   case 'jointnew': {
  //     schema = jointTr
  //   }break;
  //   case 'gynecologynew': {
  //     schema = gynecologyTr
  //   }break;
  //   case 'endocrinologynew': {
  //     schema = endocrinologyTr
  //   }break;
  //   case 'neurology': {
  //     schema = neurologyTr
  //   }break;
  //   default:
  //     break;
  // }
  console.log("nullRow", schema);
  return Tr(schema)
}

export {Tr}