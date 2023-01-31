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
        minWidth: '25px',
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
        minWidth: '22px',
        maxWidth: '22px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        面<br/>色
        `,
      style: {
        minWidth: '22px',
        maxWidth: '22px'
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
        minWidth: '25px',
        maxWidth: '25px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        血糖<br/>mol/<br/>L
        `,
      style: {
        minWidth: '32px',
        maxWidth: '32px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        瞳孔
        `,
      colspan: '4',
      rowspan: '1'
    },
    {
      name: `
        吸氧<br/>浓度<br/>L/<br/>min
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
        吸<br/>氧<br/>方<br/>式
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
      name: `
        引流管
        `,
      colspan: '3',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        肢端
        `,
      colspan: '3',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        皮肤<br/>情况
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
        minWidth: '50px',
        maxWidth: '50px'
      },
    },
    ],
    // 第二行
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
        量
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '25px',
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
        量
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '25px',
        maxWidth: '25px',
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
        minWidth: '25px',
        maxWidth: '25px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        通畅
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '25px',
        maxWidth: '25px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        长度
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '25px',
        maxWidth: '25px',
        whiteSpace: 'nowrap'
      },
    },
    {
      name: `
        血<br/>运
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
        感<br/>觉
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
        肌<br/>力
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
        whiteSpace: 'nowrap'
      },
    },
    ],
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
