export default {
  style: {
    width: '1200px'
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
        体 <br/> 温 <br/>℃
        `,
      colspan: '1',
      rowspan: '3',
      style: {
        whiteSpace: 'nowrap',
        minWidth: '34px',
      }
    },
    {
      name: `
        脉 <br/> 搏 <br/> 次/分
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
        呼<br/>吸<br/>次/分
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
        血<br/>压<br/>mmHg
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
        血氧<br/>饱和<br/>度<br/>(%)
        `,
      style: {
        minWidth: '38px',
        maxWidth: '38px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        神<br/>志
        `,
      style: {
        minWidth: '38px',
        maxWidth: '38px'
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
        入量
        `,
      colspan: '2',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        出量
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
      rowspan: '3',
      style: {
        minWidth: '80px',
        maxWidth: '80px'
      },
    },
    ],
    mid: [{
      name: `
        大小
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
        内容
        `,
      style: {
        minWidth: '52px',
        maxWidth: '52px'
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
        minWidth: '38px',
        maxWidth: '38px',
      },
    },
    {
      name: `
        内容
        `,
      style: {
        minWidth: '52px',
        maxWidth: '52px'
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
        minWidth: '38px',
        maxWidth: '38px',
        whiteSpace: 'nowrap'
      },
    },
    ],
    bottom: [{
      name: `
        左<br/>(mm)
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
        右<br/>(mm)
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
