/*
北海人一-产前检查治疗记录表
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
        name: "吸氧记录",
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        胎心音<br/>(次/分)
        `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        胎动
        `,
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "365px",
          maxWidth: "365px",
        },
        colspan: "1",
        rowspan: "3"
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
        时间
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        合计
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
