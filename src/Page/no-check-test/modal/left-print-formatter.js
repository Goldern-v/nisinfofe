export default function (win) {
    const A4_hegiht_width_rate = 297 / 210; // 打印区域长宽比
    const page_width = 740; // 页面宽度
    const page_height = Math.ceil(A4_hegiht_width_rate * page_width); // 页面高度

    // 当前页的打印内容用pageBox包裹
    let pageBox = document.createElement('div');
    pageBox.className = "pageBox";
    pageBox.style = 'height:' + page_height + 'px';

    // 获取打印元素
    const root = win.document.body.children[0];

    // 获取所有行数
    let originalRowsArr = document.querySelectorAll('.left-print-modal .showTableContent tr');
    // 获取打印行数(把每行高度添加进去)
    let printRowsArr = root.querySelectorAll('.printable tr');
    originalRowsArr = Array.from(originalRowsArr);
    originalRowsArr.forEach(function (originalRow, index) {
        if (printRowsArr[index]) {
            printRowsArr[index].height = originalRow.offsetHeight;
        }
    });

    let tables = root.querySelectorAll('.printable table');
    let pageBoxH = 0,
        sumPage = 1;

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
    let theadH = 33,
        rowH = 33,
        gapH = 20;
    let theads = root.querySelector('.printable thead').cloneNode(true);
    let tableNode = root.querySelector('.printable table').cloneNode();
    tbodys.forEach(function (tb, index) {
        pageBox.appendChild(tables[index]);
        // 计算当前tbody高度
        let currentRowsArr = tb.children;
        currentRowsArr = Array.from(currentRowsArr);
        let currentPageBoxH = theadH + gapH;
        currentRowsArr.forEach(function (row) {
            rowH = row.height || rowH;
            currentPageBoxH += rowH;
        });
        pageBoxH += currentPageBoxH;
        // 判断是否要另起一页
        if (pageBoxH >= page_height - 80) {
            pageBox.removeChild(tables[index]);
            // 拆分可以容纳的表格行数及容纳不下则另起一页
            let lastPageBoxH = pageBoxH - currentPageBoxH;
            // 当前页剩余空白处
            let pageGap = page_height - 80 - lastPageBoxH;

            let table = tableNode.cloneNode();
            let thead = theads.cloneNode(true);
            let tbody = tb.cloneNode();
            let rowsArr = tb.querySelectorAll('tr');
            rowsArr = Array.from(rowsArr);

            // 拆分的tbody
            let otherTbody = tbody.cloneNode();

            let otherTable = table.cloneNode();
            let otherTableH = theadH + gapH;
            rowsArr.forEach(function (row, i) {
                otherTbody.appendChild(row);
                rowH = row.height || rowH;
                otherTableH += rowH;

                if (lastPageBoxH + otherTableH >= page_height - 80) {
                    otherTbody.removeChild(row);
                    // 容纳得下的其他表格
                    if (otherTbody.children && otherTbody.children.length >= 1) {
                        otherTable = table.cloneNode();
                        otherTable.appendChild(thead.cloneNode(true));
                        otherTable.appendChild(otherTbody);
                        pageBox.appendChild(otherTable);
                    }

                    otherTbody = tbody.cloneNode();
                    otherTbody.appendChild(row);

                    pageBox.appendChild(pageNum.cloneNode());
                    pageBox.appendChild(divider.cloneNode());
                    page.appendChild(pageBox);

                    pageBoxH = 0;
                    lastPageBoxH = 0;
                    otherTableH = theadH + gapH + rowH;

                    // 清空当前页
                    pageBox = pageBox.cloneNode();
                    otherTable = table.cloneNode();
                }
                if (i === rowsArr.length - 1) {
                    otherTable = table.cloneNode();
                    otherTable.appendChild(thead.cloneNode(true));
                    otherTable.appendChild(otherTbody);
                    // 清空当前页
                    pageBox = pageBox.cloneNode();
                    pageBox.appendChild(otherTable);
                }
            })

            let currentPageBoxBd = pageBox.querySelectorAll('tbody');
            currentPageBoxBd = Array.from(currentPageBoxBd);
            currentPageBoxBd.forEach(function (currentBd, currentBdIndex) {
                let currentRowsArr = currentBd.children;
                currentRowsArr = Array.from(currentRowsArr);
                let currentPageBoxH = theadH + gapH;
                currentRowsArr.forEach(function (row) {
                    rowH = row.height || rowH;
                    currentPageBoxH += rowH;
                });
                pageBoxH += currentPageBoxH;
            })
        }
        if (index == tbodys.length - 1 && pageBox.querySelectorAll('.pageNum') && pageBox.querySelectorAll('.pageNum').length == 0) {
            pageBox.appendChild(pageNum.cloneNode());
            page.appendChild(pageBox);
        }
        if (index == tbodys.length - 1) {
            pageBox.className = "pageBox endPageBox";
        }
    });
    let pageNums = page.querySelectorAll('.pageNum');
    pageNums = Array.from(pageNums);
    pageNums.forEach((pageNum, i) => {
        pageNum.innerHTML = `第 ${i + 1} / ${pageNums.length} 页`;
    })
    console.log(page);

    let sumRows = page.querySelectorAll('tbody tr');
    console.dir(sumRows);

    root.appendChild(page);
    console.log(page);
    console.log(root);

}
