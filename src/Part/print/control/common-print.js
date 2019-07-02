export const radioToCheckbox = wid => {
  var radio = wid.document.getElementsByTagName("input");
  for (var value of radio) {
    if (value.type == "radio") value.type = "checkbox";
  }
};

export const selectToInput = wid => {
  wid.$("select").replaceWith(() => {
    return `<input type="text" value="${wid
      .$("select")
      .val()}" style="width: 80px">`;
  });
};

// 入院评估单的page
export const setFormPage = (wid, pageSize) => {
  var form = wid.document.getElementById("smartform");
  var tr = form.getElementsByTagName("table")[0].getElementsByTagName("tr");
  let contentHeight = 0; //计算高度
  let startTr = 0; //存储最开始的tr
  let page = 1;
  for (var i = 0; i < tr.length; i++) {
    contentHeight += tr[i].offsetHeight;
    if (contentHeight > 1146) {
      createTable(form, tr, startTr, i, page, pageSize);
      let pageEnd = document.createElement("div"); //一页结束
      pageEnd.setAttribute("class", "pageBreak");
      form.parentNode.appendChild(pageEnd);

      startTr = i;
      contentHeight = 0;
      page++;
    }
  }
  createTable(form, tr, startTr, tr.length, page, pageSize);
};

export const setPage = wid => {
  var pageContent = wid.document.getElementsByClassName("pageContent");
  for (var i = 0; i < pageContent.length; i++) {
    // 造页码
    let pageElement = document.createElement("div"); //页码
    pageElement.setAttribute("class", "page");
    var textnode = document.createTextNode(
      "第 " + (i + 1) + " / " + pageContent.length + " 页"
    );
    pageElement.appendChild(textnode);
    pageContent[i].appendChild(pageElement);
  }
};

export const addCSS = (wid, cssText) => {
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
};

function createTable(form, tr, startTr, endTr, page, pageSize) {
  // 给不同页面的表格加上下边框
  if (startTr != 0) {
    var afterTd = tr[startTr].getElementsByTagName("td")[0];
    afterTd.style.borderTopWidth = "1px";
  }
  var frontTd = tr[endTr - 1].getElementsByTagName("td")[0];
  frontTd.style.borderBottomWidth = "1px";

  // 将一个页面的表格 克隆到 一个div 中
  let pageStart = document.createElement("div");
  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  for (var j = startTr; j < endTr; j++) {
    tbody.appendChild(tr[j].cloneNode(true));
  }
  table.appendChild(tbody);
  pageStart.appendChild(table);
  pageStart.setAttribute("class", "pageContent");
  form.parentNode.appendChild(pageStart);

  // 如果是首页，需要克隆logo。如果是最后一页，需要克隆页尾
  if (endTr == tr.length) {
    pageStart.appendChild(
      form.getElementsByTagName("table")[1].cloneNode(true)
    );
  } else if (startTr == 0) {
    pageStart.appendChild(form.getElementsByTagName("img")[0]);
  }

  // 造页码
  let pageElement = document.createElement("div"); //页码
  pageElement.setAttribute("class", "page");
  var textnode = document.createTextNode(
    "第 " + page + " / " + pageSize + " 页"
  );
  pageElement.appendChild(textnode);
  pageStart.appendChild(pageElement);
}


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
