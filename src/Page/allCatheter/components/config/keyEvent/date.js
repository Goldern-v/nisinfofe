export function dateKey(e, obj, key) {
  if (e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && e.keyCode != 8) {
    obj[key] += "-"
  }
}
export function timeKey(e, obj, key) {
  if (e.target.value.length == '2' && e.target.value.indexOf(':') == -1 && e.keyCode != 8) {
    obj[key] += ":"
  }
}




// 时间格式新 2018-11-5
function insert_flg(str, flg) {
  str = str.replace(flg, '')
  str = str.replace(/(.{2})/, `$1${flg}`);
  return str
}
export function event_date(e, td) {
  if (td.value.length >= '2' && td.value.indexOf('-') == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, '-')
    }, 10)
  }
}
export function event_time(e, td) {
  if (td.value.length >= '2' && td.value.indexOf(':') == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, ':')
    }, 10)
  }
}