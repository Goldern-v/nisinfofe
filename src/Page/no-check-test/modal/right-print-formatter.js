export default function (win) {
  const A4_hegiht_width_rate = 297 / 210; // 打印区域长宽比
  const page_width = 750;// 页面宽度
  const page_height = A4_hegiht_width_rate * page_width;// 页面高度

  // 当前页的打印内容用pageBox包裹
  let pageBox = document.createElement('div');
  pageBox.className = "pageBox";
  pageBox.style = 'height:' + page_height + 'px';

  // 获取打印元素
  const root = win.document.body.children[0];
  let tables = root.querySelector('.printable table');
  let pageBoxH = 0, sumPage = 1;

  // 全部打印内容
  let page = document.createElement('div');

  // 判断是否要分页，页码输出
  let tbodys = root.querySelector('.printable tbody');
  let rowH = 33, gapH = 20;
  let theads = root.querySelector('.printable thead');
  let rows = root.querySelectorAll('.printable tr');
  rows = Array.from(rows);


  let tbody = tbodys.cloneNode();
  rows.forEach(function (row, index) {
    tbody.appendChild(row);
    pageBoxH += rowH;
    if (pageBoxH > page_height - 120) {
      let table = tables.cloneNode();
      let thead = theads.cloneNode(true);
      tbody.removeChild(row);
      table.appendChild(thead);
      table.appendChild(tbody);
      pageBox.appendChild(table);

      tbody = tbodys.cloneNode();
      tbody.appendChild(row);
      pageBoxH = rowH + rowH;

      // 页码
      let pageNum = document.createElement('div')
      pageNum.className = "pageNum";
      pageNum.style = ' text-align: center; font-size: 12px; font-family: SimSun;';
      pageBox.appendChild(pageNum);

      // 另起一页
      let divider = document.createElement('div');
      divider.className = 'divider';
      divider.style = 'page-break-after: always;';
      pageBox.appendChild(divider);

      page.appendChild(pageBox);
      sumPage++;

      pageBox = document.createElement('div');
      pageBox.className = "pageBox";
      pageBox.style = 'height:' + page_height + 'px';
    }

    if (index == rows.length - 1) {
      let table = tables.cloneNode();
      let thead = theads.cloneNode(true);
      table.appendChild(thead);
      table.appendChild(tbody);
      pageBox.appendChild(table);

      // 页码
      let pageNum = document.createElement('div')
      pageNum.className = "pageNum";
      pageNum.style = ' text-align: center; font-size: 12px; font-family: SimSun;';
      pageBox.appendChild(pageNum);

      page.appendChild(pageBox);
    }


  });
  console.log(page);

  let pageNums = page.querySelectorAll('.pageNum');
  pageNums = Array.from(pageNums);
  pageNums.forEach((pageNum, i) => {
    pageNum.innerHTML = `第 ${i + 1} / ${sumPage} 页`;
  })
  root.removeChild(tables);
  root.appendChild(page);
  console.log(page);
  console.log(root);
}
