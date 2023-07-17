export default {
  // 科室的名称
  style:{
    width:'1150px'
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
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        }
      },
      {
        name: `
        脉搏<br/>次/分
        `,
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        心率<br/>次/分
        `,
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        呼吸<br/>次/分
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
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
          minWidth: '35px',
          maxWidth: '35px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        瞳孔<br/>mm
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
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
          minWidth: '38px',
          maxWidth: '38px',
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
          minWidth: '38px',
          maxWidth: '38px',
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
      // {
      //   name: `标题5`,
      //   style: {},
      //   colspan: '1',
      //   rowspan: '3',
      //   canSet: true,
      //   key: 'fieldFive',
      //   style: {
      //     minWidth: '38px',
      //     maxWidth: '38px',
      //   }
      // },
      // {
      //   name: `标题6`,
      //   style: {},
      //   colspan: '1',
      //   rowspan: '3',
      //   canSet: true,
      //   key: 'fieldSix',
      //   style: {
      //     minWidth: '38px',
      //     maxWidth: '38px',
      //   }
      // },
      {
        name: `
        病情观察 护理措施
        `,
        style: {
          minWidth: '272px',
          maxWidth: '272px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士<br/>签名
        `,
        style: {
          minWidth:'50px'
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
      {
        name: '日期',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '35px',
          maxWidth: '35px',
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
        量<br/>ml
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '25px',
          maxWidth: '25px',
        },
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '70px',
          maxWidth: '70px'
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
          minWidth: '25px',
          maxWidth: '25px',
        },
      }
    ],
    bottom: [

    ]
  }
}
