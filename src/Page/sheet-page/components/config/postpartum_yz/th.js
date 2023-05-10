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
        name: `
        体温<br />℃
      `,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        心率<br />次/分`,
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br />mmHg`,
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
      {"name":"护理记录","colspan":"1","rowspan":"3","style":{"minWidth":"250px","maxWidth":"250px"}},
      {
        name: `
        护士签名
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
        量<br />(ml)
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
        量<br />(ml)
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
