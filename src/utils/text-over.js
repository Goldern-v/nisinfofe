/** 处理文本溢出省略号 */
function GetLength(str) {
  var realLength = 0,
    len = str.length,
    charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
}

export function textOver(str, length) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    if (GetLength(result) <= length - GetLength(str[i])) {
      result += str[i];
    }
  }

  return GetLength(result) < GetLength(str)
    ? result.substr(0, result.length - 2) + "..."
    : result;
}
