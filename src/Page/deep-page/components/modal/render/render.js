export function mergeTr(tr, data, dataMap) {
  console.log(dataMap, 'dataMap')
  for (let i = 0; i < tr.length; i++) {
    if (data[tr[i].key] !== undefined && dataMap[tr[i].key] === undefined) {
      tr[i].value = data[tr[i].key]
    }
    // console.log(dataMap[tr[i].key], 666)
    if (dataMap[tr[i].key] !== undefined) {
      // console.log(dataMap[tr[i].key].value, 777)
      tr[i].value = dataMap[tr[i].key].value
    }
  }
}