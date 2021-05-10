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
      {
        name: `
        体<br/>温<br/>(℃)
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '34px',
        }
      },
      {
        name: `
        心<br/>率<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      {
        name: `
        呼<br/>吸<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '2',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '38px',
        }
      },
      {
        name: `
        精<br/>神
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        胃<br/>纳
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        咳<br/>痰
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        咳<br/>嗽
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
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
        colspan: '3',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        护<br/>理<br/>指<br/>导
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        健<br/>康<br/>教<br/>育
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        留<br/>置<br/>针
        `,
        style: {
          minWidth: '38px',
          maxWidth: '38px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `标题1`,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'fieldOne',
        style: {
          minWidth: '46px',
          maxWidth: '46px',
        }
      },
      {
        name: `标题2`,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'fieldTwo',
        style: {
          minWidth: '46px',
          maxWidth: '46px',
        }
      },
      {
        name: `标题3`,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'fieldThree',
        style: {
          minWidth: '46px',
          maxWidth: '46px',
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
        rowspan: '2'
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      }
    ],
    mid: [{
        name: `
        静脉<br>(ml)
        `,
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        进食<br>(ml)
        `,
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        大便<br>(G/<br>性状)
        `,
        colspan: '1',
        rowspan: '1'
      }, {
        name: `
        小便<br>(ml)
        `,
        colspan: '1',
        rowspan: '1'
      }, {
        name: `
        呕吐<br>(ml)
        `,
        colspan: '1',
        rowspan: '1'
      },
    ],
    bottom: []
  }
}
