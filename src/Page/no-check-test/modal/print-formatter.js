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
  let tables = root.querySelectorAll('.printable table');
  let pageBoxH = 0, sumPage = 1;

  // 另起一页
  let divider = document.createElement('div');
  divider.className = 'divider';
  divider.style = 'page-break-after: always;';

  // 全部打印内容
  let page = document.createElement('div')

  // 页码
  let pageNum = document.createElement('div')
  pageNum.className = "pageNum";
  pageNum.style = ' text-align: center; font-size: 12px; font-family: SimSun;bottom';

  // 判断是否要分页，页码输出
  tables = Array.from(tables);
  let tbodys = root.querySelectorAll('.printable tbody');
  tbodys = Array.from(tbodys);
  let rowH = 33, gapH = 20;
  tbodys.forEach(function (tbody, index) {
    pageBox.appendChild(tables[index]);
    let rows = tbody.children.length;
    pageBoxH += rowH + rows * rowH + gapH;
    if (pageBoxH > page_height - 80) {
      pageBox.removeChild(tables[index]);
      pageBox.appendChild(pageNum);
      pageBox.appendChild(divider);
      page.appendChild(pageBox);
      sumPage++;

      pageBox = document.createElement('div');
      pageBox.className = "pageBox";
      pageBox.style = 'height:' + page_height + 'px';
      pageBox.appendChild(tables[index]);
      pageBoxH = rowH + rows * rowH + gapH;

      pageNum = document.createElement('div')
      pageNum.className = "pageNum";
      pageNum.style = ' text-align: center; font-size: 12px; font-family: SimSun;';

      divider = document.createElement('div');
      divider.className = 'divider';
      divider.style = 'page-break-after: always;'
    }
    if (tables && index == tables.length - 1) {
      page.appendChild(pageBox);
      pageBox.appendChild(pageNum);
    }
  });
  let pageNums = page.querySelectorAll('.pageNum');
  pageNums = Array.from(pageNums);
  pageNums.forEach((pageNum, i) => {
    pageNum.innerHTML = `第 ${i + 1} / ${sumPage} 页`;
  })
  root.appendChild(page);
  console.log(page);
  console.log(root);

}
