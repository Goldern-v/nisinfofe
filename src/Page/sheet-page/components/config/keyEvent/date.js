import moment from "moment";
export function dateKey(e, obj, key) {
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
let numCount = 0;

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
  if (td.value.length >= 2 && td.value.indexOf(":") == -1 && e.keyCode != 8) {
    setTimeout(() => {
      td.value = insert_flg(td.value, ":");
    }, 0);
  }
  //按数字按钮的时候 定义一个numCount = 0 每次去按键盘都截取他的长度，如果长度为4 则满了  重置长度
  //12:33为例  如果长度为2 则添加了:双引号 这时候要判断numCount >2的情况
  if (![8,9,13,16,17,18,20,27,32,37,38,39,40,91,108].includes(e.keyCode)) {
    const smallKeyCode = [96,105]
    const numberKeyCode = [48,57]
    if((e.keyCode>=smallKeyCode[0]&&e.keyCode<=smallKeyCode[1])||(e.keyCode>=numberKeyCode[0]&&e.keyCode<=numberKeyCode[1])){
      numCount = numCount + 1
    }
    td.value = td.value.substring(0, numCount > 2 ? numCount : numCount - 1);
    numCount = numCount === 4 ? 0 : numCount

  }else if([8].includes(e.keyCode)){
    //如果删除了字符串 删到：之前 :字符串长度为2 所以要减掉2  之后就是每次就-1回到下标之前就行 如果完全没有字符串 就从0开始
    numCount = td.value.length > 2 ? td.value.length-2 :td.value.length>=1?td.value.length -1 :0;
    numCount = numCount === 4 ? 0 : numCount
  }else{

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
    numCount = 0
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
