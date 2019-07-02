export function mergeTr(tr, data) {
  for(let i = 0; i < tr.length; i ++) {
    if(data[tr[i].key] !== undefined) {
      tr[i].value = data[tr[i].key]
    }
  }
  console.log(tr)
}