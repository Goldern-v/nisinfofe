/*
横沥 - 儿科机械通气护理单
*/
export default {
  // style: {
  //   width: '900px'
  // },
  // 科室的名称
  deptType: '',
  th: {
    top: [{
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
        name: 'P',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: 'SPO2',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '通气模式<br/>(MODEO)',
        colspan: '1',
        rowspan: '3'
      },
      
      {
        name: '氧浓度<br/>(Fio2)',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        分钟通气量<br/>(VE)<br/>L/min
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        潮气量<br/>(VT)<br/>ml
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        呼吸频率<br/>(F)<br/>次/分
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        灵敏度<br/>(cmH<sub>2</sub>O)
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        吸气压<br/>(PrP)<br/>cmH<sub>2</sub>O
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        呼吸末正压<br/>(PEEP)<br/>cmH<sub>2</sub>O
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        吸痰
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        痰性质
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        气管深度<br/>(cm)
        `,
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '50px',
          maxWidth: "50px",
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [],
    bottom: []
  }
}
