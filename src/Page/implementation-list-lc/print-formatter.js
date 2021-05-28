export default function(win) {
  const root = win.document.body.children[0];

  root.setAttribute("style", "width: 1200px;");

  let header = root.querySelector(".header-con");
  let elHeader = root.querySelector(".el-table__header-wrapper");
  let elFooter = root.querySelector(".el-table__footer-wrapper");

  let wrap = root.querySelector(".el-table__body-wrapper");
  console.log(wrap);
  let tbody = wrap.querySelector("tbody");

  const trs = tbody.querySelectorAll("tr");
  let patients = Array.from(trs); // 病人列表

  // 移除空行
  patients = patients.filter(row => {
    return row.innerText.trim() !== "";
  });
  let page, row, newTbody, box;

  while ((row = patients.shift())) {
    const h = row.offsetHeight;
    if (!page || page.offsetHeight + h > 780) {
      let newWrap = wrap.cloneNode(true);
      let newTable = newWrap.children[0];
      newTbody = newTable.children[1];
      newTbody.innerHTML = "";

      box = document.createElement("div");
      box.className = "el-table";
      box.appendChild(elHeader.cloneNode(true));
      box.appendChild(newWrap);


      page = document.createElement("div");
      page.className = "page-box";
      page.appendChild(header.cloneNode(true));
      page.appendChild(box);
      root.appendChild(page);
    }
    // 病人信息
    try {
      tbody.removeChild(row);
    } catch (error) {}
    newTbody.appendChild(row);
    if(patients.length==0){
      // box.appendChild(elFooter.cloneNode(true));
    }
  }

  root.removeChild(root.children[0]);
  root.removeChild(root.children[0]);
  console.log(root);

  if (root.children.length > 0) {
    const children = Array.from(root.children);
    children.forEach((child, i, children) => {
      const pageNum = document.createElement("div");
      pageNum.style =
        "position: absolute; bottom: 0; left: 0; width: 100%; text-align: center; font-size: 12px; font-family: SimSun";
      pageNum.innerHTML = `第 ${i + 1} / ${children.length} 页`;
      child.style = "position: relative; height: 820px;";
      child.appendChild(pageNum);

      if (i > 0) {
        const divider = document.createElement("div");
        divider.style = "page-break-after: always;";

        root.insertBefore(divider, child);
      }
    });
  }
}
