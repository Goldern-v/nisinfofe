// import jointTh from '../config/joint/th.js'
// import gynecologyTh from '../config/gynecology/th'
// import endocrinologyTh from '../config/endocrinology/th.js'
// import neurologyTh from '../config/neurology/th.js'
import sheetInfo from '../config/sheetInfo/index'

import genaralTh from "../config/general/th_hd";

export default function Title(data = [], autoData = [], index) {
  let Th = JSON.parse(JSON.stringify(genaralTh))
  // let Th
  // switch (sheetInfo.sheetType) {
  //   case 'jointnew': {
  //     Th = JSON.parse(JSON.stringify(jointTh))
  //   }break;
  //   case 'gynecologynew': {
  //     Th = JSON.parse(JSON.stringify(gynecologyTh))
  //   }break;
  //   case 'endocrinologynew': {
  //     Th = JSON.parse(JSON.stringify(endocrinologyTh))
  //   }break;
  //   case 'neurology': {
  //     Th = JSON.parse(JSON.stringify(neurologyTh))
  //   }break;
  //   default:
  //     break;
  // }


  for(let i = 0; i < Th.th.top.length; i++ ) {
    if(Th.th.top[i].canSet) {
      try{
        Th.th.top[i].name = data.find(((item) => {
          return (item.fieldEn == Th.th.top[i].key)
        })).fieldCn
      } catch(e) {
        try {
          // let reverseArr = [...autoData]
          let reverseArr = []
          Th.th.top[i].name = reverseArr.find(((item) => {
            return (item.fieldEn == Th.th.top[i].key && item.pageIndex < index)
          })).fieldCn
        }
        catch(e) {}
      }
    }
  }
  return Th
}
