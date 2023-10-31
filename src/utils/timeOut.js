let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
let timeOut = 10 * 60 * 1000  //设置超时时间: 30分钟

window.onload = function () {
  //这里是检测鼠标点击事件，也可以是鼠标移动事件
  window.document.onmousedown = function () {
    sessionStorage.setItem("lastTime", new Date().getTime())
  }
};
function checkTimeout() {
  currentTime = new Date().getTime()		//更新当前时间
  lastTime = sessionStorage.getItem("lastTime");

  if (currentTime - lastTime > timeOut) { //判断是否超时

    // 清除storage的数据(登陆信息和token)
    sessionStorage.clear()
    localStorage.clear()
    //如果是登录页直接return
    if(window.location.pathname == '/crNursing/login') return
    // 跳到登陆页
    window.location.replace(`/crNursing/login`)
    window.clearInterval(timeOut1)

  }
}

export default function () {
  /* 定时器 间隔1分钟检测是否长时间未操作页面 */
  let time = 1 * 60 * 1000
  var timeOut1 = window.setInterval(checkTimeout, time);
}
