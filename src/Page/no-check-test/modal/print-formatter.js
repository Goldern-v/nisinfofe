export default function (win, print) {

  // const A4_hegiht_width_rate = 297 / (210 - 2 * 13); // 打印区域长宽比：（A4纸高）比（A4纸宽减去左右侧20mm的边距）
  const A4_hegiht_width_rate = 297 / 210; // 打印区域长宽比：（A4纸高）比（A4纸宽减去左右侧20mm的边距）
  const page_width = 680;// 页面宽度
  const page_height = A4_hegiht_width_rate * page_width;// 页面高度

  let pageEle = document.createElement('div');
  pageEle.className = "pageBox";

  // const root = win.document.body.children[0]
  let tables = document.querySelectorAll('.printable table');
  let boxH = 0, sumPage = 1;
  let divider = document.createElement('div');
  divider.className = 'divider';
  divider.style = 'page-break-after: always;'
  let page = document.createElement('div')
  // 页码
  const pageNum = document.createElement('div')
  pageNum.className = "pageNum";
  pageNum.style = ' text-align: center; font-size: 12px; font-family: SimSun;bottom';

  tables = Array.from(tables);

  tables.forEach(function (table, index) {
    boxH += table.offsetHeight + 20;
    pageEle.appendChild(table);
    if (boxH > page_height - 40) {
      pageEle.appendChild(pageNum);
      pageEle.appendChild(divider);
      sumPage++;
      boxH = 0;
      page.appendChild(pageEle);
      pageEle = document.createElement('div');
      pageEle.className = "pageBox";
    } else if (tables && index == tables.length - 1) {
      page.appendChild(pageEle);
      pageEle.appendChild(pageNum);
    }

  });

  let newTable = document.createElement('div');

  let pageNums = page.querySelectorAll('.pageNum');
  pageNums = Array.from(pageNums);
  pageNums.forEach((page, i) => {
    page.innerHTML = `第 ${i + 1} / ${sumPage} 页`;
  })
  let printable = page.cloneNode(true)
  win.innerHTML = '';
  win.appendChild(printable);
}
