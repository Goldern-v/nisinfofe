export default {
  // 科室的名称
  deptType: '',
  style: {
    width: '1117px'
  },
  th: {
    top: [
      {
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
        T<br/>(℃)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '30px',
        }
      },
      {
        name: `
        P/HR<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      {
        name: `
        R<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      {
        name: `
        Bp<br/>(mmHg)
        `,
        style: {
          minWidth: '48px',
          maxWidth: '48px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        瞳孔
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        入
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        出
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `标题1`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldOne',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        }
      },
      {
        name: `标题2`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldTwo',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        }
      },
      {
        name: `标题3`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldThree',
        style: {
          minWidth: '53px',
          maxWidth: '53px',
        }
      },
      {
        name: `标题4`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFour',
        style: {
          minWidth: '53px',
          maxWidth: '53px',
        }
      },
      {
        name: `标题5`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFive',
        style: {
          minWidth: '53px',
          maxWidth: '53px',
        }
      },
      {
        name: `标题6`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldSix',
        style: {
          minWidth: '53px',
          maxWidth: '53px',
        }
      },
      {
        name: `
        特殊情况记录
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
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        审核签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [
      {
        name: `
        大小(mm)
        `,
        style: {
          whiteSpace: 'nowrap'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        反射
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: '62px',
          maxWidth: '62px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '26px',
          maxWidth: '26px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '26px',
          maxWidth: '26px',
          whiteSpace: 'nowrap'
        },
      },
    ],
    bottom: [
      {
        name: `
        左
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        右
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        左
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        右
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
    ]
  }
}