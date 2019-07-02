import {focusElement} from '../../sheetTable/components/excel/tool.js'
export function next(e, td, nextTd) {
  let [x, y, z] = e.getAttribute("position").split(',')
  var GetLength = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}
  if(GetLength(e.value) > 23) {
    try {
      let curr = ''
      let next = ''
      for(let i = 0; i< e.value.length; i++) {
        if(GetLength(curr) > 23) {
          next += e.value[i]
        } else {
          curr += e.value[i]
        }
      }
      console.log(curr, next)
      setTimeout(() => {
        td.value = curr
        nextTd && (nextTd.value = next + nextTd.value)
      }, 0)
      focusElement(x, Number(y) + 1, z)
    } catch (error) {
      
    }
  }
}