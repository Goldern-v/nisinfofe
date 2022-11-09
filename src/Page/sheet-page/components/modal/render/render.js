export function mergeTr(tr, data, dataMap) {
  for(let i = 0; i < tr.length; i ++) {
    if(data[tr[i].key] !== undefined && dataMap[tr[i].key] === undefined) {
      tr[i].value = data[tr[i].key]
    }
    if(dataMap[tr[i].key] !== undefined) {
      tr[i].value = dataMap[tr[i].key].value
    }
  }
}
