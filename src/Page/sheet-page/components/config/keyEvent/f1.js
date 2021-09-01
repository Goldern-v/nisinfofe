export const keyf1 = function (e, td) {
  if (e.keyCode == 192) {
    td.value = (td.value + '✓')
    e.preventDefault();
  }
  setTimeout(() => {
    td.value = td.value.replace(/·/g, '✓').replace(/`/g, '✓')
  }, 10)
}

// 限制输入，最多输入全中文num个字
export const limitChange = function (e, td, num) {
  let maxLength = num;
  if (td.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 108 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 91) {
    td.value = td.value.substring(0,maxLength);
  }
}

// 对值进行切割，这里的maxLength是固定不变的，最多输入全中文8个字，全英文/数字maxLength个
export const calValueChange = function (e, td) {
  let maxLength = 16
  if (td.key === 'food' || td.key === 'discharge') {
    /* 入量、出量最多输入全中文10个 */
    maxLength = 20
  }
  const currentValue = td.value + (e.data || '')
  const length = GetLength(currentValue)
  if (length > maxLength) {
    /* 如果输入长度超出，则将值转为数组 */
    const arr = currentValue.split('')
    const currentStr = arr.reduce((acc, cur) => {
      /* 通过reduce对该数组每个元素累加计算合适的长度，返回对应maxLength的值 */
      if (GetLength(acc) < maxLength) {
        if (GetLength(acc) === (maxLength - 1) && GetLength(cur) === 2) {
          return acc
        }
        return acc + cur
      } else {
        return acc
      }
    }, '')
    td.value = currentStr
  }
}
// 计算输入长度,英文/数字长度为1，中文为2
const GetLength = function (str) {
  let realLength = 0,
    len = str.length,
    charCode = -1;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    // 字符串^(String.fromCharCode([Unicode Value,]);可还原原字符.例如String.fromCharCode(94))
    if (charCode == 94) realLength += 0;
    else if (charCode >= 0 && charCode <= 128) realLength += 1;
    else realLength += 2;
  }
  return realLength;
};
