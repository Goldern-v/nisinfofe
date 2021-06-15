export default {
  // 科室的名称
  deptType: '',
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `心率<br/>（次/min）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `血压<br/>（mmHg）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `呼吸<br/>（次/min）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        宫缩
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        浓度<br/>(ml)
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: ``,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFour',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: ``,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFive',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
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
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
      name: `
        持续(s)
        `,
      colspan: '1',
      rowspan: '2'
    }, {
      name: `
        间歇(min)
        `,
      style: {},
      colspan: '1',
      rowspan: '2'
    }, ],
    bottom: []
  }
}
