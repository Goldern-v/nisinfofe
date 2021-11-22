/*
威县-重症护理记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
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
        name: "入量（ml）",
        colspan: "4",
        rowspan: "1"
      },
      {
        name: `
        出量(ml)
        `,
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        病情观察及治疗
        `,
        style: {
          minWidth: "240px",
          maxWidth: "240px",
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
          minWidth: "80px",
          maxWidth: "80px"
        },
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: `
        静脉
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        饮食
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        名称
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        性质
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [
      {
        name: `
        性质
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        量
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        性质
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
      {
        name: `
        量
        `,
        style: {},
        colspan: "1",
        rowspan: "1",
      },
    ]
  }
};
