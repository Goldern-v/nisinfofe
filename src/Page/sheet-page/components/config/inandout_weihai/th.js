import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1150px"
  },
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "25px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "25px"
        },
      },
      {
        name: "入量",
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量
        `,
        colspan: "3",
        rowspan: "1",
      },
      //护理记录
      {
        name: `
        病情观察及护理措施
        `,
        style: {
          minWidth: "155px",
          maxWidth: "155px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   医师签名
      //   `,
      //   style: {
      //     minWidth: '55px',
      //     maxWidth: '55px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: "项目",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "300px"
        },
      },
      {
        name: "量（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: "项目",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "150px"
        },
      },
      {
        name: "量（ml）",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px"
        },
      },
      {
        name: "性状",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: "60px"
        },
      },
    ],
    bottom: []
  }
}
// le y = ''