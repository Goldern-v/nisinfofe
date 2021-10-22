/*
  江门妇幼-儿科护理记录单
*/
// 添加的
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  style: {
    width: '1100px'
  },
  deptType: '',
  th: {
    top: [
      {
        name: currYear(),
        style: {},
        colspan: "2",
        rowspan: "1",
        key:'recordYear'
      },
      // {
      //   name: '日期',
      //   style: {
      //     minWidth: '30px',
      //     maxWidth: '30px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
      // {
      //   name: '时间',
      //   style: {
      //     minWidth: '30px',
      //     maxWidth: '30px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // },
      {
        name: `
        体温<br/>(℃)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: 'nowrap',
          minWidth: '30px',
          maxWidth: '30px',
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
          minWidth: '35px',
          maxWidth: '35px',
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
          minWidth: '35px',
          maxWidth: '35px',
        }
      },
      {
        name: `
        血压<br/>(mm<br/>Hg)
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
          minWidth: '48px',
          maxWidth: '48px',
        }
      },
      {
        name: `标题2`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldTwo',
        style: {
          minWidth: '48px',
          maxWidth: '48px',
        }
      },
      {
        name: `标题3`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldThree',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        }
      },
      {
        name: `标题4`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFour',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        }
      },
      {
        name: `标题5`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldFive',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        }
      },
      {
        name: `标题6`,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldSix',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '160px',
          maxWidth: '160px',
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
          minWidth: '40px',
          maxWidth: '40px',
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
          minWidth: '40px',
          maxWidth: '0px',
        },
      }
    ],
    mid: [
       {
        name: '日期',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '时间',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
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
        尿液
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
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
