import {
  wrap
} from "lodash";

export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1250px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '38px',
          maxWidth: '38px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '38px',
          maxWidth: '38px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        台<br/>箱<br/>温<br/>℃
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          whiteSpace: wrap,
          minWidth: '36px',
        }
      },
      {
        name: `
        台<br/>箱<br/>编<br/>号
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
        }
      },
      {
        name: `
        体温<br/>℃
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
        }
      },
      {
        name: `
        心率<br/>次/<br>min
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
        }
      },
      {
        name: `
        呼吸<br/>次/<br>min
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
        }
      },
      {
        name: `
        血压<br/>(mmHg)
        `,
        style: {
          minWidth: '45px',
          maxWidth: '45px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        SPO<sub>2</sub><br>(%)
        `,
        style: {
          minWidth: '36px',
          maxWidth: '36px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        反应
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {
          width: '36px',
        }
      },
      {
        name: `
        哭声
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '36px',
        }
      },
      {
        name: `
        肤色
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '36px',
        }
      },
      {
        name: `
        肌<br>张<br>力
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '36px',
        }
      },
      {
        name: `
        脐部情况
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '45px',
        }
      },
      {
        name: `
        体位
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '36px',
        }
      },
      {
        name: `
        皮测<br>umol<br>/L
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
        }
      },
      {
        name: `
        蓝光治疗
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          width: '36px',
        }
      },
      {
        name: `入量`,
        colspan: '2',
        rowspan: '1',
        style: {
          width: '112px',
        }
      },
      {
        name: `出量`,
        colspan: '3',
        rowspan: '1',
        style: {
          width: '109px',
        }
      },
      {
        name: `用氧方式`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '52px',
          maxWidth: '52px',
        }
      },
      {
        name: `FiO2<br>(%)`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '51px',
          maxWidth: '51px',
        }
      },
      {
        name: `血糖<br>mmol/L`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '51px',
          maxWidth: '51px',
        }
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '180px',
          maxWidth: '180px',
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
        rowspan: '3'
      }
    ],
    mid: [{
        name: `静脉<br>（ml）`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '20px',
        },
      },
      {
        name: `进食<br>（ml）`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
        },
      },
      {
        name: `大便<br>（g/性状）`,
        style: {
          minWidth: '65px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `小便<br>（ml）`,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px',
        },
      },
      {
        name: `标题1`,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
        },
        colspan: "1",
        rowspan: "2",
        canSet: true,
        key: "fieldSeventeen",
      },
    ],
    bottom: []
  }
}
