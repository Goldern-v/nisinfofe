// 导出文件
export const fileDownload = (res, fileName) => {
  /** 判断是否成功 */
  if (res.headers["cr-download-code"] == "300") {
    let warningMsg = res.headers["cr-download-message"]
      ? decodeURI(res.headers["cr-download-message"])
      : "暂无记录"
    window.applicationCache.$message.warning(warningMsg)
  }

  let filename = fileName
    ? fileName
    : res.headers["content-disposition"]
      ? decodeURIComponent(
        res.headers["content-disposition"].replace("attachment;filename=", "")
      )
      : "导出文件";

  let blob = new Blob([res.data], {
    type: ""  // 'application/vnd.ms-excel;charset=utf-8'
  });

  let a = document.createElement("a");
  let href = window.URL.createObjectURL(blob); // 创建链接对象
  a.href = href;
  a.download = filename; // 自定义文件名
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(href);
  document.body.removeChild(a); // 移除a元素
};
