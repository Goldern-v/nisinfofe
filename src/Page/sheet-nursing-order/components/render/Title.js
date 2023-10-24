import genaralTh from "../config/general/th.js";
import genaralThHzly from "../config/general/th_hzly.js";


export default function Title(data = [], autoData = [], index) {
  let obj = {hzly: genaralThHzly, default: genaralTh}
  let Th =  JSON.parse(JSON.stringify(obj[process.env.HOSPITAL_ID]))
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
