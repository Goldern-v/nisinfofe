/*
武汉肺科-出入液量记录单
*/
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "800px"
  },
  th: {
    top: [ 
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: "2",
        rowspan: "1",
      },
      // {
      //   name: `
      //   特殊情况
      //   `,
      //   style: {},
      //   colspan: "1",
      //   rowspan: "3",
      // },
      {
        name: `
        签名
        `,
        style: {
          minWidth: "80px",
          maxWidth: "80px",
        },
        colspan: "1",
        rowspan: "3",
      }
    ],
    mid: [
      {
        name: `
        日期
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
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
        项目
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量ml
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        项目
        `,
        style: {},
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        量ml
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
