export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "800px"
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
        name: `
        心率<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        呼吸<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        血压<br/>mmHg
        `,
        style: {
          minWidth: "48px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        血氧<br/>%
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        肝素
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        临床表项及措施
        `,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '38px',
        },
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [],
    bottom: []
  }
}
