//新的体温单录入保存提交等操作，做的提交限制，防抖，节流函数
//防抖函数，用来限制体温单快速回车保存或者连续点击保存按钮
// 防抖
export function _debounce(fn, delay) {
  let delayTime = delay || 200;
  let timer;
  return function () {
      let th = this;
      if (timer) {
          clearTimeout(timer);
      }
      timer = setTimeout(function () {
        timer = null;
          //根据函数名执行函数
        th[`${fn}`]();
      }, delayTime);
  };
}
// 节流
export function _throttle(fn, interval) {
  let last;
  let timer;
  let intervalTime = interval || 200;
  return function () {
      let th = this;
      let now = +new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          timer = setTimeout(function () {
              last = now;
              //根据函数名执行函数
              th[`${fn}`]();
          }, intervalTime);
      } else {
          last = now;
          //根据函数名执行函数
          th[`${fn}`]();
      }
  }
}

