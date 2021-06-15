export default {
  style: {
    width: '1240px'
  },
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
        name: `
        体温<br/>(℃)
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
        脉搏<br/>(次/分)
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
        呼吸<br/>(次/分)
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
        血压<br/>(mmHg)
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
        血氧饱和度
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
        神志
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
          minWidth: '50px',
          maxWidth: '50px',
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
          minWidth: '50px',
          maxWidth: '50px',
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
        name: `标题7`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldSeven',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        }
      },
      {
        name: `标题8`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldEight',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        }
      },
      {
        name: `标题9`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldNine',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        }
      },
      {
        name: `标题10`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldTen',
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
          minWidth: "260px",
          maxWidth: "260px"
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [{
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
      },
    ],
    bottom: []
  }
}
