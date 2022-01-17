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
