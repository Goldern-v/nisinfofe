
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
// export function event_date(e, td) {
//   console.log('event_date',e,td)
//   if (td.value.length >= "2" && td.value.indexOf("-") == -1 && e.keyCode != 8) {
//     setTimeout(() => {
//       td.value = insert_flg(td.value, "-");
//     }, 10);
//   }
// }
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
// export function event_time(e, td) {
//   if (td.value.length >= "2" && td.value.indexOf(":") == -1 && e.keyCode != 8) {
//     setTimeout(() => {
//       td.value = insert_flg(td.value, ":");
//     }, 10);
//   }
// }

export function event_time(e, td) {
  console.log(e.keyCode, td.value);
  if (td.value.length >= "2" && td.value.indexOf(":") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, ":");
    }, 10);
  }
  if (td.value.length >= 4 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 13 && e.keyCode != 108 && e.keyCode != 9 && e.keyCode != 16 && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 20 && e.keyCode != 27 && e.keyCode != 91) {
    td.value = td.value.substring(0,4);
  }
}

export function click_date(e, td) {
  if (td.value == "") {
    td.value = moment().format("MM-DD");
  }
}

export function click_time(e, td) {
  console.log('dddddddddddddddddddd',td)
  if (td.value == "") {
    td.value = moment().format("HH:mm");
  }
}





export function dateKey_(e, obj, key) {
  // if(e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && e.keyCode != 8) {
  //   obj[key] += "-"
  // }
  // 小键盘 0-9 96-105
      // 数字 0-9 48-57
      // 方向键 上下左右 37-40
      // 删除 8
      let k = e.keyCode
      console.log('date-input-onkeydown',e,k)
      if( (k>=96 && k<=105) || (k>=48 && k<=57) || (k>=37 && k<=40) || k===8 || (e.target.selectionEnd !== e.target.selectionStart&&((k>=96 && k<=105) || (k>=48 && k<=57)) ) ){
        e.returnValue = true
      }else{
        e.returnValue = false
      }
      if(e.target.value.length>=5&&(k!=8&&(k<37||k>40))&&e.target.selectionEnd===e.target.selectionStart ){e.returnValue = false}
      if(e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && k != 8) {
        obj[key] += "-"
      }
      console.log('returnValue',e.returnValue,e.target.selectionStart,e.target.selectionEnd)

}
export function timeKey_(e, obj, key) {
  // if(e.target.value.length == '2' && e.target.value.indexOf(':') == -1 && e.keyCode != 8) {
  //   obj[key] += ":"
  // }
  let k = e.keyCode
      // if(e.target.selectionEnd === e.target.selectionStart){

      // }
      console.log('time-input-onkeydown',e,k)
      if( (k>=96 && k<=105) || (k>=48 && k<=57) || (k>=37 && k<=40) || k===8 || (e.target.selectionEnd !== e.target.selectionStart&&((k>=96 && k<=105) || (k>=48 && k<=57)) ) ){
        e.returnValue = true
      }else{
        e.returnValue = false
      }
      if(e.target.value.length>=5&&(k!=8&&(k<37||k>40))&&e.target.selectionEnd===e.target.selectionStart ){e.returnValue = false}
      if(e.target.value.length == '2' && e.target.value.indexOf('-') == -1 && k != 8) {
        obj[key] += ":"
      }
      console.log('returnValue',e.returnValue,e.target.selectionStart,e.target.selectionEnd)
}
