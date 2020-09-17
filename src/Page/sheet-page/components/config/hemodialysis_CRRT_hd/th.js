export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1001px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      }, {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      }, {
        name: `血压<br/>mmHg`,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `脉搏<br/>（次/分）`,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `超滤率<br/>（ml/h）`,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `血流速<br/>（ml/h）`,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3'
      }, {
        name: `
        动脉压<br/>（mmHg）
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: "1",
        rowspan: "3"
      }, {
        name: `
        静脉压<br/>（mmHg）
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: "1",
        rowspan: "3"
      }, {
        name: `
        跨膜压<br/>（mmHg）
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: "1",
        rowspan: "3"
      }, {
        name: `
        超滤累计<br/>（ml）
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: "1",
        rowspan: "3"
      }, {
        name: `
        特殊情况记录
        `,
        style: {
          width: "200px"
        },
        colspan: "1",
        rowspan: "3"
      },
      // {
      //   name: `
      //   护士签名
      //   `,
      //   style: {
      //     minWidth: '46px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
    ],
    mid: [],
    bottom: []
  }
}
