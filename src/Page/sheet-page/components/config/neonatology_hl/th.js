import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: "",
  style: {
    width: "1300px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '32px',
          maxWidth: '32px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `T<br/>（℃）`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `HR<br/>（次/分）`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `血压<br/>（mmHg）`,
      //   style: {
      //     minWidth: '32px',
      //     maxWidth: '32px'
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
      {
        name: `R<br/>（次/min）`,
        style: {
          minWidth: '32px',
          maxWidth: '32px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
      反应
      `,
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
      吸吮力
      `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
      脐部
      `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
      臀部
      `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
      大便次
      `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
      小便次
      `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
      肤色
      `,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: `
      喂养方式
      `,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSix", //标题1
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeven", //标题2
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "260px",
          maxWidth: "260px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
        colspan: "1",
        rowspan: "3"
      }
    ],
    mid: [{
        name: `
        正常
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        激怒
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        迟钝
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        强
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        弱
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        无渗血
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        渗血
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        干洁
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        臀红
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        正常
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        发绀
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        黄染
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        母乳<br/>喂养
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        人工<br/>喂养
        `,
        colspan: "1",
        rowspan: "2",
      },
      {
        name: `
        混合<br/>喂养
        `,
        colspan: "1",
        rowspan: "2",
      },
    ],
    bottom: []
  }
};
