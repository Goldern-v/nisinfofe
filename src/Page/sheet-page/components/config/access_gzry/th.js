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
      rowspan: "2",
      style: {
        width: "40px"
      },
    },
    {
      name: `
      时间
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        width: "40px"
      },
    },
    {
      name: `
      入量名称
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "100px"
      },
    },
    // {
    //   name: `
    //   入量方式
    //   `,
    //   colspan: "1",
    //   rowspan: "2",
    //   style: {
    //     minWidth: "100px"
    //   },
    // },
    {
      name: `
      途径
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "100px"
      },
    },
    {
      name: `
      量(ml)
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        width: "50px"
      },
    },
    {
      name: `
      出量名称
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "100px"
      },
    },
    // {
    //   name: `
    //   出量方式
    //   `,
    //   colspan: "1",
    //   rowspan: "2",
    //   style: {
    //     minWidth: "100px"
    //   },
    // },
    {
      name: `
      性质
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        minWidth: "100px"
      },
    },
    {
      name: `
      量(ml)
      `,
      colspan: "1",
      rowspan: "2",
      style: {
        width: "50px"
      },
    },
    {
      name: `
      签名
      `,
      style: {},
      colspan: "1",
      rowspan: "3",
      style: {
        minWidth: "50px",
      },
    }
    ],
    mid: [
    ],
    bottom: [

    ]
  }
};
