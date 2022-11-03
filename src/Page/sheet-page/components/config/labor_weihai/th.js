import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1230px"
  },
  th: {
    top: [
      { name: `日期`, colspan: "1", rowspan: "3" },
      { name: `时间`, colspan: "1", rowspan: "3" },
      { name: `血压<br>（mmHg）`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `宫缩`, colspan: "2", rowspan: "1", style: { minWidth: "80px" } },
      { name: `胎位`, colspan: "1", rowspan: "3", tyle: { minWidth: "90px" } },
      { name: `胎心<br>（次/分）`, style: { minWidth: "60px" }, colspan: "1", rowspan: "3" },
      { name: `先露`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `先露位置`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `宫颈硬度`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `宫颈容受<br>（%）`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `宫颈扩张<br>(cm)`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `胎膜`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `羊水性状`, colspan: "1", rowspan: "3", style: { minWidth: "60px" } },
      { name: `阴道检查`, colspan: "1", rowspan: "3", style: { minWidth: "80px" } },
      { name: `其他处理`, colspan: '1', rowspan: '3', style: { minWidth: "250px",  maxWidth: "250px"},  },
      { name: `检查者`, style: { minWidth: '50px', maxWidth: '50px' }, colspan: '1',rowspan: '3' },
    ],
    mid: [
      { name: "持续时间<br>（s）", colspan: "1", rowspan: "2", style: { minWidth: "40px" } },
      { name: `间隔时间<br>（min）`, colspan: "1", rowspan: "2", style: { minWidth: "40px" } },
    ],
    bottom: []
  }
}
