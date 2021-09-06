/*
  江门妇幼-儿科护理记录单
*/
export default {
  style: {
    width: '1300px'
  },
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
        体温<br/>(℃)
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
        心率<br/>(次/分)
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
        呼吸<br/>(次/分)
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
        血压<br/>(mmHg)
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
        SPO<sub>2</sub><br>(%)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        饮食
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   血糖<br>(mmol/L)
      //   `,
      //   style: {},
      //   colspan: '1',
      //   rowspan: '3'
      // },
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
        colspan: '6',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `标题1`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldOne',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: `标题2`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldTwo',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        }
      },
      {
        name: `标题3`,
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
          minWidth: '153px',
          maxWidth: '153px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
      },
      {
        name: `
        上级护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
      }
    ],
    mid: [{
        name: `
        静脉<br>(ml)
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        进食<br>(ml)
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `

        `,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'otherFood',
      }, {
        name: `
        尿量
        `,
        colspan: '2',
        rowspan: '1'
      }, {
        name: `
        大便
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        呕吐<br>(ml)
        `,
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `

        `,
        colspan: '1',
        rowspan: '2',
        canSet: true,
        key: 'otherDischarge',
      },
    ],
    bottom: [{
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        颜色
        `,
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        g/<br>次
        `,
        colspan: '1',
        rowspan: '1'
      }, {
        name: `
        性质
        `,
        colspan: '1',
        rowspan: '1'
      }
    ]
  }
}
