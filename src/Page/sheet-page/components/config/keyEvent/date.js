import moment from "moment";
export function dateKey(e, obj, key) {
  console.log(e);
  if (
    e.target.value.length == "2" &&
    e.target.value.indexOf("-") == -1 &&
    e.keyCode != 8
  ) {
    obj[key] += "-";
  }
}
export function timeKey(e, obj, key) {
  console.log(e);
  if (
    e.target.value.length == "2" &&
    e.target.value.indexOf(":") == -1 &&
    e.keyCode != 8
  ) {
    obj[key] += ":";
  }
}

// 时间格式新 2018-11-5
function insert_flg(str, flg) {
  str = str.replace(flg, "");
  str = str.replace(/(.{2})/, `$1${flg}`);
  return str;
}
export function event_date(e, td) {
  if (td.value.length >= "2" && td.value.indexOf("-") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, "-");
    }, 10);
  }
  if (td.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
    td.value = td.value.substring(0,4);
  }
}
export function event_time(e, td) {
  if (td.value.length >= "2" && td.value.indexOf(":") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, ":");
    }, 10);
  }
  if (td.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) {
    td.value = td.value.substring(0,4);
  }
}

export function click_date(e, td) {
  if (td.value == "") {
    td.value = moment().format("MM-DD");
  }
}
export function click_time(e, td) {
  if (td.value == "") {
    td.value = moment().format("HH:mm");
  }
}
// 点击自动打勾“√”
export function click_check(e, td) {
  if (td.value == "") {
    td.value = '√';
  }
}
