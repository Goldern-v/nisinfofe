export const keyf1 = function (e, td) {
  if (e.keyCode == 192) {
    td.value = (td.value + '✓')
    e.preventDefault();
  }
  setTimeout(() => {
    td.value = td.value.replace(/·/g, '✓').replace(/`/g, '✓')
  }, 10)
}