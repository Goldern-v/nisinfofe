import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1100px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        体温<br/>（℃）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        脉搏<br/>（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        呼吸<br/>（次/分）
        `,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血压<br/>（mmHg）
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        意<br/>识
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        宫缩
        `,
        style: {},
        colspan: "3",
        rowspan: "1",
      },
      {
        name: `
        宫口<br/>扩张<br/>cm
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `先<br/>露<br/>Scm`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `宫<br/>底<br/>高<br/>度`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        排<br/>尿<br/>情<br/>况
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `阴<br/>道<br/>流<br/>血`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `健<br/>康<br/>教<br/>育`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `基<br/>础<br/>护<br/>理`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        特殊情况记录
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '150px',
          maxWidth: '150px',
        },
      },
      {
        name: `护士<br/>签名
        `,
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: "强<br/>度",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "持<br/>续<br/>S",
        colspan: "1",
        rowspan: "2",
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
      },
      {
        name: "间<br/>歇<br/>min",
        colspan: "1",
        rowspan: "2"
      },
    ],
    bottom: [

    ]
  }
};
