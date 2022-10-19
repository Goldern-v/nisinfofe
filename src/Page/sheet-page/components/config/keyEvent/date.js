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
  if (td.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 108 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 91) {
    td.value = td.value.substring(0,4);
  }
}

export function event_time(e, td) {
  if (td.value.length >= "2" && td.value.indexOf(":") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, ":");
    }, 10);
  }
  if (td.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 108 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 91) {
    td.value = td.value.substring(0,4);
  }
}
//时间格式 02-02 20:20
export function event_date_time(e, td) {
  if (td.value.length >= "2" && td.value.indexOf("-") == -1 && e.keyCode != 8) {
    td.value = td.value + "-"
  }
  if (td.value.length >= "5" && td.value.indexOf(" ") == -1 && e.keyCode != 8) {
    td.value = td.value + " "
  }
  if (td.value.length >= "8" && td.value.indexOf(":") == -1 && e.keyCode != 8) {
    td.value = td.value + ":"
  }

  if (td.value.length >= 10 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 108 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 91) {
    td.value = td.value.substring(0,10);
  }
}

export function event_date_year(e, td) {
  if (td.value.length >= "2" && td.value.indexOf("-") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, "-");
    }, 10);
  }
}

export function click_date(e, td, tr) {
  if (td.value == "") {
    td.value = moment().format("MM-DD");
    tr.isChange = true
  }
}

export function click_date_year(e, td) {
  if (td.value == "") {
    td.value = moment().format("YYYY-MM-DD");
  }
}

export function click_date_time(e, td) {
  if (td.value == "") {
    td.value = moment().format("MM-DD HH:mm");
  }
}

export function click_time(e, td, tr) {
  if (td.value == "") {
    td.value = moment().format("HH:mm");
    tr.isChange = true
  }
}
// 点击自动打勾“√”
export function click_check(e, td) {
  if (td.value == "") {
    td.value = '√';
  }
}

// 点击打勾再次点击取消

export function click_cancel(e, td) {
  if (td.value == "") {
    td.value = '√';
  }else{
    console.log('1111111111111111111111111',td.value);
    td.value = ""
  }
}
