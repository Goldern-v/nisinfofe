export const addCSS = (wid, cssText) => {
  var style = wid.document.createElement("style"), //创建一个style元素
    head =
      wid.document.head ||
      wid.document.getElementsByTagName("head")[0] ||
      wid.document.body; //获取head元素
  style.type = "text/css"; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
  if (style.styleSheet) {
    //IE
    var func = function() {
      try {
        //防止IE中stylesheet数量超过限制而发生错误
        style.styleSheet.cssText = cssText;
      } catch (e) {}
    };
    //如果当前styleSheet还不能用，则放到异步中则行
    if (style.styleSheet.disabled) {
      setTimeout(func, 10);
    } else {
      func();
    }
  } else {
    //w3c
    //w3c浏览器中只要创建文本节点插入到style元素中就行了
    var textNode = wid.document.createTextNode(cssText);
    style.appendChild(textNode);
  }
  head.appendChild(style); //把创建的style元素插入到head中
};

export function printDir(dir, wid = window) {
  let dirTetx = "";
  if (dir == "h") {
    dirTetx = "landscape";
  } else {
    dirTetx = "portrait";
  }
  try {
    var child = document.getElementById("printStyle");
    child.parentNode.removeChild(child);
  } catch (e) {}
  var css = `@page { size: ${dirTetx}; }`,
    head = wid.document.head || document.getElementsByTagName("head")[0],
    style = wid.document.createElement("style");
  style.type = "text/css";
  style.media = "print";
  style.id = "printStyle";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
}
