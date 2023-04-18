/*
花都-NICU监护单
 */
export default {
  // 科室的名称
  style: {
    width: '1620px'
  },
  deptType: '',
  th: {
    top: [
      {
        name: '日期',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        台<br/>/<br/>箱<br/>温<br/>度<br/>(℃)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        体<br/>温<br/>(℃)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        心<br/>率<br/>(次/<br/>分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        呼<br/>吸<br/>(次/<br/>分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        BP<br/>mmHg
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        SPO<sub>2</sub><br/>(%)
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        反<br/>应
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        哭<br/>声
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        脐<br/>部
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        吸<br/>吮<br/>力
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        体<br/>位
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        回<br/>抽<br/>胃<br/>管
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        微<br/>量<br/>血<br/>糖<br/>(mmol/L)
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: "25px",
          maxWidth: "25px"
        },
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: '3',
        rowspan: '1'
      },
      {
        name: `
        用氧
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        氧<br/>浓<br/>度<br/>(%)
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        痰液<br/>(性质/量ml)
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        基<br/>础<br/>护<br/>理
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: "custom1",
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: "150px",
          maxWidth: "150px"
        },
        colspan: "1",
        rowspan: "3"
      },
      {
        name: `
        护士<br/>签名
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [
      {
        name: `
        名<br/>称
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        名<br/>称
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        颜<br/>色
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `方<br/>式`,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        流<br/>量<br/>(L/分)
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        气道
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        口<br/>鼻<br/>腔
        `,
        colspan: '1',
        rowspan: '2'
      }
    ],
    bottom: [],
  }
}
