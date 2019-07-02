import Vue from "vue";
// import dayjs from 'dayjs'

Vue.directive("autoComplete", {
  update(el, bind) {
    let dataList = bind.value.dataList;
    let obj = bind.value.obj;
    let key = bind.value.key;
    let type = bind.value.type;
    if (dataList) {
      el.onfocus = e => {
        if (el.readOnly) return;
        // let scrollTop = document.querySelector('.sheetTable-contain').scrollTop
        // let scrollLeft = document.querySelector('.sheetTable-contain').scrollLeft
        let xy = e.target.getBoundingClientRect();
        setTimeout(() => {
          window.openAutoComplete({
            style: {
              top: `${xy.top + 25}px`,
              left: `${xy.left}px`,
              width: `${xy.width}px`
            },
            data: dataList,
            callback: function(data) {
              // console.log(obj, key)
              if (data) {
                if (type == "add") {
                  obj[key] += data;
                } else {
                  obj[key] = data;
                }
              }
            },
            id: key
          });
        });
      };
      el.onblur = e => {
        setTimeout(() => {
          window.closeAutoComplete(key);
        }, 400);
      };
    }
  }
});

Vue.directive("date-input", {
  bind(el, value) {
    el.onkeydown = e => {
      // 小键盘 0-9 96-105
      // 数字 0-9 48-57
      // 方向键 上下左右 37-40
      // 删除 8
      let k = e.keyCode;
      console.log("date-input-onkeydown", e, k);
      if (
        (k >= 96 && k <= 105) ||
        (k >= 48 && k <= 57) ||
        (k >= 37 && k <= 40) ||
        k === 8 ||
        (e.target.selectionEnd !== e.target.selectionStart &&
          ((k >= 96 && k <= 105) || (k >= 48 && k <= 57)))
      ) {
        e.returnValue = true;
      } else {
        e.returnValue = false;
      }
      if (
        e.target.value.length >= 5 &&
        (k != 8 && (k < 37 || k > 40)) &&
        e.target.selectionEnd === e.target.selectionStart
      ) {
        e.returnValue = false;
      }
      if (
        e.target.value.length == "2" &&
        e.target.value.indexOf("-") == -1 &&
        k != 8
      ) {
        el.value += "-";
      }
      console.log(
        "returnValue",
        e.returnValue,
        e.target.selectionStart,
        e.target.selectionEnd
      );
    };
  }
});
Vue.directive("time-input", {
  bind(el, value) {
    el.onkeydown = e => {
      let k = e.keyCode;
      // if(e.target.selectionEnd === e.target.selectionStart){

      // }
      console.log("time-input-onkeydown", e, k);
      if (
        (k >= 96 && k <= 105) ||
        (k >= 48 && k <= 57) ||
        (k >= 37 && k <= 40) ||
        k === 8 ||
        (e.target.selectionEnd !== e.target.selectionStart &&
          ((k >= 96 && k <= 105) || (k >= 48 && k <= 57)))
      ) {
        e.returnValue = true;
      } else {
        e.returnValue = false;
      }
      if (
        e.target.value.length >= 5 &&
        (k != 8 && (k < 37 || k > 40)) &&
        e.target.selectionEnd === e.target.selectionStart
      ) {
        e.returnValue = false;
      }
      if (
        e.target.value.length == "2" &&
        e.target.value.indexOf("-") == -1 &&
        k != 8
      ) {
        el.value += ":";
      }
      console.log(
        "returnValue",
        e.returnValue,
        e.target.selectionStart,
        e.target.selectionEnd
      );
    };
  }
});
