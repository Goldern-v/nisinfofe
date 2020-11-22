export default function(win) {
  const root = win.document.body.children[0];
  console.log(root);

  root.setAttribute("style", "width: 1080px;");

  // const header = root.querySelector(".head");
  // const footer = root.querySelector(".foot");

  const trs = root.children;

  let patients = Array.prototype.slice.call(trs, 0);
  // 移除空行
  patients = patients.filter(row => {
    return row.innerText.trim() !== "";
  });

  let page, row;

  while ((row = patients.shift())) {
    if (row && row.offsetHeight > 700) {
      let wrap = row.cloneNode(true);

      let childPage,
        newTable,
        newTableBody,
        header,
        footer,
        childRow,
        table,
        trs;
      header = wrap.querySelector(".head");
      footer = wrap.querySelector(".foot");
      table = wrap.querySelector("table");
      trs = row.querySelectorAll("tbody tr");
      trs = Array.from(trs);
      while ((childRow = trs.shift())) {
        const h = childRow.offsetHeight;
        if (!childPage || page.offsetHeight + h > 700) {
          newTable = table.cloneNode(true);
          newTableBody = newTable.children[2];
          newTableBody.innerHTML = "";

          childPage = document.createElement("div");
          childPage.className = "table";
          childPage.appendChild(newTable);

          page = document.createElement("div");
          page.appendChild(header.cloneNode(true));
          page.appendChild(childPage);
          page.appendChild(footer.cloneNode(true));
          // page.appendChild(footer.cloneNode(true));

          root.appendChild(page);
        }

        newTableBody.appendChild(childRow);
      }
      root.removeChild(root.children[0]);
    } else {
      page = document.createElement("div");
      page.appendChild(row);
      root.appendChild(page);
    }
  }
  console.log(root);

  if (root.children.length > 0) {
    const children = Array.from(root.children);
    children.forEach((child, i, children) => {
      const pageNum = document.createElement("div");
      pageNum.style =
        "position: absolute; bottom: 0; left: 0; width: 100%; text-align: center; font-size: 12px; font-family: SimSun";
      pageNum.innerHTML = `第 ${i + 1} / ${children.length} 页`;
      child.style = "position: relative; height: 780px;";
      child.appendChild(pageNum);

      if (i > 0) {
        const divider = document.createElement("div");
        divider.style = "page-break-after: always;";

        root.insertBefore(divider, child);
      }
    });
  }
}
