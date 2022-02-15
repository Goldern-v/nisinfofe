export default {
  // 科室的名称
  style:{
    width:'1290px'
  },
  deptType: '',
  th: {
    top: [
      {
        name: '',
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
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
          minWidth: '35px',
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
          minWidth: '53px',
          maxWidth: '53px',
        }
      },
      {
        name: `
        心率<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '53px',
          maxWidth: '53px',
        }
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: '51px',
          maxWidth: '51px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        瞳孔<br/>(mm)
        `,
        style: {
          minWidth: '71px',
          maxWidth: '71px'
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
          minWidth: '51px',
          maxWidth: '51px',
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
          minWidth: '51px',
          maxWidth: '51px',
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
          minWidth: '38px',
          maxWidth: '38px',
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
          minWidth: '38px',
          maxWidth: '38px',
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
          minWidth: '38px',
          maxWidth: '38px',
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
          minWidth: '38px',
          maxWidth: '38px',
        }
      },
      {
        name: `
        病情观察 护理措施
        `,
        style: {
          minWidth: '175px',
          maxWidth: '175px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth:'60px'
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '37px',
          maxWidth: '37px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '159px',
          maxWidth: '159px'
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
          minWidth: '37px',
          maxWidth: '37px',
        },
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '69px',
          maxWidth: '69px'
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
          minWidth: '37px',
          maxWidth: '37px',
        },
      }
    ],
    bottom: [
      
    ]
  }
}
