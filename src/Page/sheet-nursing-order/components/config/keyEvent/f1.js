export const keyf1 = function (e, td) {
  console.log(e.keyCode)
  if(e.keyCode == 192) {
    td.value = td.value + '✓'
    e.preventDefault();
  }
}