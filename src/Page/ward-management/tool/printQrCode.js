function printDir(dir, wid = window) {
  let dirTetx = "";
  if (dir == "h") {
    dirTetx = "3cm 3cm";
  } else {
    dirTetx = "portrait";
  }
  try {
    var child = document.getElementById("printStyle");
    child.parentNode.removeChild(child);
  } catch (e) {}
  var css = `@page { size: ${dirTetx};}`,
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

function addCSS(wid, cssText) {
  var style = wid.document.createElement("style"), //创建一个style元素
    head = wid.document.head || wid.document.getElementsByTagName("head")[0]; //获取head元素
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
}

// 打印
function print(source, beforePrint, selfShow) {
  if (!source) return;
  // 克隆
  // selfShow.show = false
  let clonedEl;
  clonedEl = source.cloneNode(true);

  // 临时插入克隆的dom到相同位置，用于获取样式
  source.parentNode.appendChild(clonedEl);

  const children = clonedEl.children;

  loopStyles(children);

  if (beforePrint && typeof beforePrint === "function") {
    beforePrint(clonedEl);
  }

  // 移除克隆dom
  source.parentNode.removeChild(clonedEl);

  // 创建iframe
  const iframe = document.createElement("iframe");
  iframe.style = "display: block; height: 0; width: 0; overflow: hidden;";
  document.body.appendChild(iframe);

  const iframeDocument = iframe.contentDocument;
  const iframeWindow = iframe.contentWindow;
  // printDir("h", iframeWindow);
  printDir("h", iframeWindow);
  addCSS(
    iframeWindow,
    `
   * {
   font-family: 'SimHei','Microsoft Yahei' !important;
  }
    @page{
      margin: 0mm;
    }
    body {
      margin: 5mm 0 0 4.7mm;
      font-weight: bold;
      overflow: hidden;
    }
  `
  );
  iframeDocument.body.appendChild(clonedEl);
  iframeDocument.body.style.width = "1300px";
  iframeDocument.body.style.height = "3cm";
  iframeDocument.body.style.paddingLeft = "10px";
  // iframeDocument.body.style.height = "3200px";
  // iframeDocument.body.style.width = "3200px";
  const images = iframeDocument.querySelectorAll("img[src]");
  return Promise.all(
    Array.prototype.map.call(images, img => {
      return new Promise(resolve => {
        if (!img.getAttribute("src")) {
          resolve();
        } else {
          img.onerror = () => {
            resolve();
          };
          img.onload = () => {
            resolve();
          };
        }
      });
    })
  ).then(() => {
    // 新建窗口（用于调试）
    // const win = window.open();
    // win.window.document.body.innerHTML = clonedEl.outerHTML;
    iframeWindow.print();
    document.body.removeChild(iframe);
    selfShow.show = true;
  });
}

// 循环获取样式
function loopStyles(elements) {
  for (const el of elements) {
    // todo: 将input, textarea, select转化为TextNode，思路：
    // el.tagName
    // const text = document.createTextNode(el.value)
    // const text = document.createTextNode(el.options[el.selectedIndex].text)
    // el.parentNode.replaceChild(text, el)

    el.setAttribute("style", getStyles(el));

    if (el.children && el.children.length) {
      loopStyles(el.children);
    }
  }
}

const ignoreStyleTags = ["COLGROUP", "COL"];

// 获取并设置行列样式
function getStyles(element) {
  if (ignoreStyleTags.includes(element.tagName)) {
    return "";
  }

  let result = "";

  const styles = window.getComputedStyle(element);

  Object.keys(styles).map(key => {
    const value = styles.getPropertyValue(styles[key]);
    if (value) {
      result += `${styles[key]}: ${value};`;
    }
  });

  const printStyle = element.getAttribute("data-print-style");

  if (printStyle) {
    result += printStyle;
  }
  return result;
}

export default print;
