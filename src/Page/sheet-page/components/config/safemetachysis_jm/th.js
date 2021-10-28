import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  // 科室的名称 关节骨科
  deptType: "",
  style: {
    width: "1150px"
  },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          minWidth: "62px"
        },
        // canSet: true,
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
        输注部位
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血型
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血液成分
        `,
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `剂量`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `血袋号`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        血液<br/>质量<br/>血袋<br/>完好
        `,
        style: {},
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `交叉<br/>配血<br/>结果`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `输注<br/>速度`,
        style: {},
        colspan: "1",
        rowspan: "3",
      },
      {
        name: `
        不良反应及特殊处理
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '150px',
          maxWidth: '150px',
        },
      },
      {
        name: `执行者
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
      },
      {
        name: `核对者
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
      },
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
    ],
    bottom: []
  }
};
