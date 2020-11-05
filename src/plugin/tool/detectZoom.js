// 获取屏幕缩放比 100 为正常
export default function detectZoom (){
  var ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase(),
    isMac = /macintosh|mac os x/i.test(navigator.userAgent);;

   if (window.devicePixelRatio !== undefined) {
      ratio = isMac ? window.devicePixelRatio / 2 : window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio){
    ratio = Math.round(ratio * 100);
  }

   return ratio;
};
