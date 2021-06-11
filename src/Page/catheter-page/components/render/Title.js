import sheetInfo from '../config/sheetInfo/index'

export default function Title(data = [], autoData = [], index) {
  let Th
  switch (sheetInfo.sheetType) {
    case 'catheter': {
      Th = JSON.parse(JSON.stringify(require('../config/catheter/th').default))
    }
      break
  }

  for (let i = 0; i < Th.th.top.length; i++) {
    if (Th.th.top[i].canSet) {
      try {
        Th.th.top[i].name = data.find(((item) => {
          return (item.fieldEn == Th.th.top[i].key)
        })).fieldCn
      } catch (e) {
        try {
          let reverseArr = []
          if (sheetInfo.selectBlock.recordTitleCoyeType !== 'no') {
            reverseArr = [...autoData]
          }
          Th.th.top[i].name = reverseArr.find(((item) => {
            return (item.fieldEn == Th.th.top[i].key && (item.pageIndex === index))
          })).fieldCn
        }
        catch (e) {
        }
      }
    }
  }
  for (let i = 0; i < (Th.th.mid || []).length; i++) {
    if (Th.th.mid[i].canSet) {
      try {
        Th.th.mid[i].name = data.find(((item) => {
          return (item.fieldEn == Th.th.mid[i].key)
        })).fieldCn
      } catch (e) {
        try {
          let reverseArr = []
          if (sheetInfo.selectBlock.recordTitleCoyeType !== 'no') {
            reverseArr = [...autoData]
          }
          Th.th.mid[i].name = reverseArr.find(((item) => {
            return (item.fieldEn == Th.th.mid[i].key && (item.pageIndex === index))
          })).fieldCn
        }
        catch (e) { }
      }
    }
  }
  return Th
}
