import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1000px"
  },
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        },
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        },
      },
      {
        name: "体温<br/>（℃）",
        style: {
          minWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        脉搏<br/>（次/分）
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        心率<br/>（次/分）
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        呼吸<br/>（次/分）
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "40px"
        }
      },
      {
        name: `
        血压<br/>（mmHg）
        `,
        style: {
          minWidth: "68px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        病情、护理措施及效果
        `,
        style: {
          minWidth: "150px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: "50px",
        },
      }
    ],
    mid: [],
    bottom: [

    ]
  }
};
