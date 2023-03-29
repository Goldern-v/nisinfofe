export default {
  style: {
    width: '1400px'
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
        箱 <br/> 温 <br/>℃
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
        哭<br/> 声
        `,
      style: {},
      colspan: '1',
      rowspan: '3',
      style: {
        whiteSpace: 'nowrap',
        minWidth: '22px',
        maxWidth: '22px',
      }
    },
    {
      name: `
        反<br/>应
        `,
      style: {},
      colspan: '1',
      rowspan: '3',
      style: {
        whiteSpace: 'nowrap',
        minWidth: '22px',
        maxWidth: '22px',
      }
    },
    {
      name: `
        肌<br/>张<br/>力
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
        皮<br/>肤
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
        maxWidth: '22px',
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
        脐<br/>部
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
      血糖<br/>mmol/L
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
        血压<br/>mmHg
        `,
      style: {
        minWidth: '40px',
        maxWidth: '40px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        血<br/>氧<br/>饱<br/>和<br/>度%
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
      吸氧方式
        `,
      colspan: '3',
      rowspan: '1',
      canSet: false,
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
      colspan: '3',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
      颜色性状
        `,
      colspan: '2',
      rowspan: '1',
      canSet: false,
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
    mid: [
      {
        name: `
          流量
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '35px',
          maxWidth: '35px'
        },
      },
      {
        name: `
          浓度
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '35px',
          maxWidth: '35px'
        },
      },
      {
        name: `
          方<br />式
          `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
      },
      
      {
        name: `
          名称
          `,
        style: {
          minWidth: '58px',
          maxWidth: '58px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
          量ml
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
          minWidth: '58px',
          maxWidth: '58px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
          量ml
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
        大<br />便<br />次<br />数
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
        大便
          `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        胃液
          `,
        colspan: '1',
        rowspan: '2',
      },
    ],
    bottom: []
  }
}
