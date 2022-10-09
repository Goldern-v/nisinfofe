export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "800px"
  },
  th: {
    top: [
      {
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
          // display: 'none',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `脉<br/>搏<br/>（次/<br/>min）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `呼<br/>吸<br/>（次/<br/>min）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `血<br/>压<br/>（mm/<br/>Hg）`,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `血氧<br/>饱<br/>和度/<br/>（%）`,
        style: {
          minWidth: '44px',
          maxWidth: '44px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `宫底<br/>U-Fb`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `子宫<br/>收缩`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `出血<br/>量<br/>(mL)`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `膀胱<br/>情况`,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `
        入
        `,
        style: {
          minWidth: '72px',
          maxWidth: '72px'
        },
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        出
        `,
        style: {
          minWidth: '72px',
          maxWidth: '72px'
        },
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },{
        name: `附注`,
        style: {
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `
        护士签名
        `,
        style: {
          minWidth: '46px',
          // maxWidth: '72px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {
      //     minWidth: '46px',
      //     // maxWidth: '72px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
      {
        name: `
        项目
        `,
        style: {
          minWidth: '36px',
        },
        colspan: '1',
        rowspan: '2'
      }, {
          name: `
          量<br/>(ml)
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '36px',
          },
      }, {
          name: `
          项目
          `,
          style: {
            minWidth: '36px',
          },
          colspan: '1',
          rowspan: '2'
      }, {
          name: `
          量<br/>(ml)
          `,
          colspan: '1',
          rowspan: '2',
          style: {
            minWidth: '36px',
          },
        },
    ],
    bottom: [
    ]
  }
}
