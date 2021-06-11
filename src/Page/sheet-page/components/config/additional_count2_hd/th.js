import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "480px"
  },
  th: {
    top: [{
        name: `
        日期
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "28px"
        },
      },
      {
        name: `
        时间
        `,
        colspan: "1",
        rowspan: "1",
        style: {
          width: "28px"
        },
      },
      {
        name: "腹围（cm）",
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: "膀胱充盈",
        style: {
          width: "48px"
        },
        colspan: "1",
        rowspan: "2"
      },
      {
        name: `
        肠胀气
        `,
        colspan: "1",
        rowspan: "2",
        style: {
          width: "48px"
        }
      },
      {
        name: `
        记录人签名
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
        style: {
          width: "52px"
        },
      },
    ],
    mid: []
  }
};
