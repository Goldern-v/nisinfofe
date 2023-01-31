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
        minWidth: '32px',
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
        minWidth: '34px',
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
        minWidth: '34px',
      }
    },
    {
      name: `
        心<br/>率<br/>次<br/>/<br/>分
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px',
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
        minWidth: '30px',
        maxWidth: '30px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        血压<br/>mmHg
        `,
      style: {
        minWidth: '34px',
        maxWidth: '34px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        血<br/>氧<br/>饱<br/>和<br/>度
        `,
      style: {
        minWidth: '31px',
        maxWidth: '31px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        面<br/>容
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        基<br/>础<br/>护<br/>理
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        肢端
        `,
      colspan: '2',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        吸氧
        `,
      colspan: '2',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        瞳孔
        `,
      colspan: '4',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        入量
        `,
      colspan: '3',
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
      name: `
        引流管
        `,
      colspan: '4',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        持<br/>续<br/>心<br/>电<br/>监
        `,
      style: {
        minWidth: '30px',
        maxWidth: '30px'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        病情与措施
        `,
      style: {
        minWidth: "220px",
        maxWidth: "220px"
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        签名
        `,
      colspan: '1',
      rowspan: '3',
      style: {
        minWidth: '70px',
        maxWidth: '70px'
      },
    },
    ],
    // 第二行
    mid: [{
      name: `
        颜<br/>色
        `,
      style: {
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        温<br/>度
        `,
      style: {
        whiteSpace: 'nowrap'
      },
      style: {
        minWidth: '20px',
        maxWidth: '20px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        方<br/>式
        `,
      style: {
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        流量<br/>L
        `,
      style: {
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
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
        反应
        `,
      colspan: '2',
      rowspan: '1'
    },
    {
      name: `
        名称
        `,
      style: {
        minWidth: '48px',
        maxWidth: '48px'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        量<br/>ml
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '34px',
        maxWidth: '34px',
      },
    },
    {
      name: `
        途<br/>径
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '34px',
        maxWidth: '34px',
      },
    },
    {
      name: `
        名称
        `,
      style: {
        minWidth: '48px',
        maxWidth: '48px'
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: `
        量<br/>ml
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '34px',
        maxWidth: '34px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        名<br/>称
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '34px',
        maxWidth: '34px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        颜色
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        长<br/>度<br/>cm
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        通<br/>畅
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
        whiteSpace: 'nowrap'
      },
    }],
    bottom: [{
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
