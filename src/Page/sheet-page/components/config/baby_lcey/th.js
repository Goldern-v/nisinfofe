export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1200px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: '时间',
        style: {
          minWidth: '38px',
          maxWidth: '38px',
        },
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        体温℃
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `
        脉搏/心率<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "42px",
          maxWidth: "42px"
        },
      },
      {
        name: `
        呼吸<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `
        血压<br/>mmHg
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `
        SPO2<br/>(%)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `
        温箱温度<br/>(℃)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `
        温箱湿度<br/>(%)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "35px",
          maxWidth: "35px"
        },
      },
      {
        name: `
        氧流量<br/>(L/min)
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `
        输液观察
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "45px",
          maxWidth: "45px"
        },
      },
      {
        name: `自定义标题1`,
        canSet:true,
        key:"customTitle",
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: "90px",
          maxWidth: "90px"
        },
      },
      {
        name: `自定义标题2`,
        canSet:true,
        key:"customTitle",
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `
        病情观察及护理措施
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          width: '240px'
        },
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: '1',
        rowspan: '1'
      },
      // {
      //   name: `
      //   护士签名
      //   `,
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [],
    bottom: []
  }
}
