export default function(win) {
  const root = win.document.body.children[0];

  root.setAttribute("style", "width: 1040px;");

  const header = root.querySelector(".head");
  const footer = root.querySelector(".foot");
  console.log(footer, 666666)

  const table_title = root.querySelectorAll("table")[0];
  const table = root.querySelectorAll("table")[1];
  const tbody = table.children[1];
  const trs = tbody.querySelectorAll("tr");

  let patients = Array.prototype.slice.call(trs, 0); // 病人列表


  // 移除空行
  patients = patients.filter(row => {
    return row.innerText.trim() !== "";
  });

  let page, newTable, newTableBody, row;

  while ((row = patients.shift())) {
    const h = row.offsetHeight;

    if (!page || page.offsetHeight + h > 700) {
      newTable = table.cloneNode(true);
      newTableBody = newTable.children[1];
      newTableBody.innerHTML = "";

      page = document.createElement("div");
      page.appendChild(header.cloneNode(true));
      page.appendChild(table_title.cloneNode(true));
      page.appendChild(newTable);
      page.appendChild(footer.cloneNode(true));

      root.appendChild(page);
    }

    // 病人信息
    try {
      tbody.removeChild(row);
    } catch (error) {}
    newTableBody.appendChild(row);
  }

  root.removeChild(root.children[0]);
  root.removeChild(root.children[0]);
  root.removeChild(root.children[0]);

  if (root.children.length > 1) {
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
