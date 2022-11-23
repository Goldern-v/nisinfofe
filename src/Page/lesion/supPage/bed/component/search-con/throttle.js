export function _throttle(fn,interval) {
  let last;
  let timer;
  let intervalTime = interval || 200;
  return function () {
      let th = this;
      let now = +new Date();
      if (last && now - last < interval) {
          clearTimeout(timer);
          this.$message.info(`您操作过于频繁，请您等候${interval/1000}秒后再试`)
          timer = setTimeout(function () {
              last = now;
          }, intervalTime);
      } else {
          last = now;
          console.log('同步数据')
          //根据函数名执行函数
          th[`${fn}`]();
      }
  }
}
