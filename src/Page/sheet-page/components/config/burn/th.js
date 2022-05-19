export default {
  // 科室的名称
  deptType: '',
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
          minWidth: '34px',
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
          minWidth: '52px',
          maxWidth: '52px',
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
        SPO<sub>2</sub><br>(%)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
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
          minWidth: '37px',
          maxWidth: '37px',
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
          minWidth: '37px',
          maxWidth: '37px',
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
          minWidth: '37px',
          maxWidth: '37px',
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
          minWidth: '37px',
          maxWidth: '37px',
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
          minWidth: '68px',
          maxWidth: '68px'
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
          minWidth: '28px',
          maxWidth: '28px',
        },
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
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
          minWidth: '28px',
          maxWidth: '28px',
          whiteSpace: 'nowrap'
        },
      }
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