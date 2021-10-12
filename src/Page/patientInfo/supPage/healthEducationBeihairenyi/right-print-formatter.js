export default function (win) {
  const A4_hegiht_width_rate = 297 / 210; // 打印区域长宽比
  const page_width = 740;// 页面宽度
  const page_height = Math.ceil(A4_hegiht_width_rate * page_width);// 页面高度

  // 当前页的打印内容用pageBox包裹
  let pageBox = document.createElement('div');
  pageBox.className = "pageBox";
  pageBox.style = 'height:' + page_height + 'px';

  let rowsArr = document.querySelectorAll('.healthEducation table .health-tr');

  // 获取打印元素
  const root = win.document.body.children[0];
  let tables = root.querySelector('.healthEducation table');
  let pageBoxH = 0;

  // 全部打印内容
  let page = document.createElement('div');

  // 判断是否要分页，页码输出
  let heads = root.querySelector('.healthEducation .health-education-head');
  let tbodys = root.querySelector('.healthEducation tbody');
  let theadH = 33, rowH = 33, gapH = 20;
  let theads = root.querySelector('.healthEducation thead');
  let rows = root.querySelectorAll('.healthEducation tbody tr');
  rows = Array.from(rows);


  let tbody = tbodys.cloneNode();
  let thead = theads.cloneNode(true);
  let head = heads.cloneNode(true);
  pageBoxH = theadH;
  rows.forEach(function (row, index) {
    tbody.appendChild(row);
    rowH = rowsArr[index + 1].offsetHeight || rowH;
    pageBoxH += rowH;
    if (pageBoxH >= page_height - 240) {
      let table = tables.cloneNode();
      tbody.removeChild(row);
      table.appendChild(thead.cloneNode(true));
      table.appendChild(tbody);
      pageBox.appendChild(table);

      tbody = tbodys.cloneNode();
      tbody.appendChild(row);
      pageBoxH = theadH + rowH;

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

      pageBox = document.createElement('div');
      pageBox.className = "pageBox";
      pageBox.style = 'height:' + page_height + 'px';
    }

    if (index == rows.length - 1) {
      let table = tables.cloneNode();
      table.appendChild(thead.cloneNode(true));
      table.appendChild(tbody);
      pageBox.appendChild(table);
      pageBox.className = "pageBox endPageBox";

      // 页码
      let pageNum = document.createElement('div')
      pageNum.className = "pageNum";
      pageNum.style = ' text-align: center; font-size: 12px; font-family: SimSun;';
      pageBox.appendChild(pageNum);

      page.appendChild(pageBox);
    }


  });
  let pageNums = page.querySelectorAll('.pageNum');
  pageNums = Array.from(pageNums);
  pageNums.forEach((pageNum, i) => {
    pageNum.innerHTML = `第 ${i + 1} / ${pageNums.length} 页`;
  })
  root.removeChild(tables);
  root.appendChild(page);
}
