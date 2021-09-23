/*
北海人一-出入量记录单
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
        name: `
        入量情况
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量情况
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        审核签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
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
        量(ml)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
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
        量(ml)
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: [

    ]
  }
};
