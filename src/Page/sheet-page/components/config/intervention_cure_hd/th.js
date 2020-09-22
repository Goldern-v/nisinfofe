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
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `心率<br/>（次/分）`,
        style: {
          minWidth: '100px',
          maxWidth: '100px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `呼吸<br/>（次/分）`,
        style: {
          minWidth: '100px',
          maxWidth: '100px'
        },
        colspan: '1',
        rowspan: '3'
      }, {
        name: `血压<br/>mmHg`,
        style: {
          minWidth: '100px',
          maxWidth: '100px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `SPO<br/>（%）`,
        style: {
          minWidth: '100px',
          maxWidth: '100px'
        },
        colspan: '1',
        rowspan: '3'
      }, {
        name: `
        术中特殊护理记录
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
