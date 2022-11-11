let Mark = []
export function matchMark(rowid, fieldEn) {
  try {
    let obj
    for (let i = 0; i < Mark.length; i++) {
      if (fieldEn == Mark[i].fieldEn && rowid == Mark[i].recordId) {
        obj = Mark[i]
      }
    }
    if (obj) {
      return obj
    }
  }
  catch (e) {
    console.log(e)
  }
}
export default Mark
