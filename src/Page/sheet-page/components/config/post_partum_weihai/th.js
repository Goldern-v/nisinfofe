import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1000px"
  },
  th: {
    top: [
      { name: `日期`, colspan: "1", rowspan: "3" },
      { name: `时间`, colspan: "1", rowspan: "3" },
      { name: `血压`, colspan: "1", rowspan: "3", style: { minWidth: "80px" } },
      { name: "宫缩", colspan: "1", rowspan: "3", style: { minWidth: "80px" } },
      { name: `出血量<br>（ml）`, colspan: "1", rowspan: "3", style: { minWidth: "80px" } },
      { name: `宫底高度`, colspan: "1", rowspan: "3", tyle: { minWidth: "80px" } },
      { name: `膀胱情况`, style: { minWidth: "80px" }, colspan: "1", rowspan: "3" },
      { name: `阴道检查`, colspan: "1", rowspan: "3", style: { minWidth: "80px" } },
      { name: `备注`, colspan: '1', rowspan: '3', style: { minWidth: "350px",  maxWidth: "350px"},  },
      { name: `签名`, style: { minWidth: '60px', maxWidth: '60px' }, colspan: '1',rowspan: '3' },
    ],
    mid: [],
    bottom: []
  }
}
