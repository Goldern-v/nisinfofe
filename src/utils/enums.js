/**
 *
 * @param {arr} arr 原数组
 * @param {string} value 需要选择的值
 * @param {string} key 数组中对应值的属性名
 * @returns
 */
export const searchItem = (arr, value, key) => {
  return arr.find(v => v[key] == value)
}
export const searchKeyByCode = (arr, code) => {
 const item = searchItem(arr, code, 'code')
 return item ? item.key : ''
}
export const filterBC = (arr, filterKey) => {
  return arr.filter(v => filterKey.indexOf(v.code)>-1)
}
