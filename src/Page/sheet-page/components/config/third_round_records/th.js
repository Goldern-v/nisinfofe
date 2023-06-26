import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "740px"
  },
  th: {
    top: [{
        name: `
      日期
      `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
      时间
      `,
        colspan: "1",
        rowspan: "3",
      },
      {
        "name":"查房记录",
        "colspan":"1",
        "rowspan":"3",
        "style":{"minWidth":"480px","maxWidth":"480px"}
      },
      {
        name: `
        签名
        `,
        colspan: "1",
        rowspan: "3",
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {
      //     minWidth: "80px",
      //     maxWidth: "80px",
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [

    ],
    bottom: [

    ]
  }
};
