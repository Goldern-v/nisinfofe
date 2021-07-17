export default function (win, trim = false) {
  const pageHeight = 1060;
  const root = win.document.body.children[0];
  root.setAttribute("style", "width: 700px;");

  const header = root.querySelector(".head");
  const footer = root.querySelector(".foot");

  const table = root.querySelector("table");
  const tbody = table.children[2];
  const trs = tbody.querySelectorAll("tr");

  let patients = Array.from(trs); // 病人列表
  // let rest = Array.prototype.slice.call(trs, -2); // 特殊情况（两行）
  let rest = null;
  const emptyRow = document.createElement("tr");
  emptyRow.innerHTML = '<td style="border: 1px solid black;"></td>'.repeat(7);
  emptyRow.style.height = "30px";

  // 移除空行
  if (!trim) {
    patients = patients.filter(row => {
      return row.innerText.trim() !== "";
    });
  }

  if (patients.length === 0) {
    patients.push(emptyRow.cloneNode(true));
  }

  let page, newTable, newTableBody, row;

  while ((row = patients.shift() || rest)) {
    const h =
      row === rest
        ? row[0].offsetHeight + row[1].offsetHeight
        : row.offsetHeight;

    if (!page || page.offsetHeight + h > pageHeight) {
      if (page && row === rest) {
        while (page.offsetHeight + 30 < pageHeight) {
          newTableBody.appendChild(emptyRow.cloneNode(true));
        }
      }

      newTable = table.cloneNode(true);
      newTableBody = newTable.children[2];
      newTableBody.innerHTML = "";

      if (row === rest) {
        newTable.children[1].innerHTML = "";
      }

      page = document.createElement("div");
      page.appendChild(header.cloneNode(true));
      page.appendChild(newTable);
      page.appendChild(footer.cloneNode(true));

      root.appendChild(page);
    }

    if (row === rest) {
      // 特殊情况（两行）
      newTableBody.appendChild(tbody.removeChild(row.shift()));
      newTableBody.appendChild(tbody.removeChild(row.shift()));
      rest = null;

      const shouldFillRows = newTableBody.children.length > 2; // 大于2行
      //   && newTableBody.children[0].children.length > 1 // 第0行不是空行

      // 移除占位用的空行
      if (newTableBody.children[0].className === "empty-row") {
        newTableBody.removeChild(newTableBody.children[0]);
      }

      if (shouldFillRows) {
        const target = newTableBody.children[newTableBody.children.length - 2];

        while (page.offsetHeight + 30 < pageHeight) {
          newTableBody.insertBefore(emptyRow.cloneNode(true), target);
        }
      }
    } else {
      // 病人信息
      try {
        tbody.removeChild(row);
      } catch (error) {
      }
      if (h > pageHeight - 105) {
        let details = Array.from(row.querySelector(".edit-area").children);
        let newDetailCon, newRow, detail;
        while ((detail = details.shift())) {
          const h = detail.offsetHeight;
          if (!newRow || page.offsetHeight + h > pageHeight - 105) {
            if (page.offsetHeight + h > pageHeight - 105) {
              newTable = table.cloneNode(true);
              newTableBody = newTable.children[2];
              newTableBody.innerHTML = "";

              page = document.createElement("div");
              page.appendChild(header.cloneNode(true));
              page.appendChild(newTable);
              page.appendChild(footer.cloneNode(true));
              root.appendChild(page);
            }
            newRow = row.cloneNode(true);
            newDetailCon = newRow.children[1].children[0];
            newDetailCon.innerHTML = "";
            newTableBody.appendChild(newRow);
          }
          newDetailCon.appendChild(detail);
        }
      } else {
        newTableBody.appendChild(row);
      }
    }
  }

  root.removeChild(root.children[0]);
  root.removeChild(root.children[0]);
  root.removeChild(root.children[0]);
  console.log(root);
  if (root.children.length > 1) {
    const children = Array.from(root.children);
    children.forEach((child, i, children) => {
      const pageNum = document.createElement("div");
      pageNum.style =
        "position: absolute; bottom: 0; left: 0; width: 100%; text-align: center; font-size: 12px; font-family: SimSun";
      pageNum.innerHTML = `第 ${i + 1} / ${children.length} 页`;
      child.style = `position: relative; min-height: ${pageHeight}px;`;
      child.appendChild(pageNum);

      if (i > 0) {
        const divider = document.createElement("div");
        divider.style = "page-break-after: always;";

        root.insertBefore(divider, child);
      }
    });
  }
}
