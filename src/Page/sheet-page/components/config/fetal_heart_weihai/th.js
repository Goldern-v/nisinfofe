import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  // style: {
  //   width: "1000px"
  // },
  th: {
    top: [
      {
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
      },
      {
        name: '结果（次/分）',
        style: {
          minWidth: '80px',
          maxWidth: '80px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '80px',
          maxWidth: '80px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "1",
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
      },
      {
        name: '结果（次/分）',
        style: {
          minWidth: '80px',
          maxWidth: '80px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '80px',
          maxWidth: '80px',
        },
        colspan: '1',
        rowspan: '1'
      },
    ],
    mid: [],
    bottom: []
  }
}
