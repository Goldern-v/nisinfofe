/*
  江门妇幼-小儿外科护理记录单
*/
// 年份
import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}

export default {
  style: {
    width: '1400px'
  },
  // 科室的名称
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
    //   {
    //   name: '日期',
    //   style: {
    //     minWidth: '36px',
    //     maxWidth: '36px',
    //   },
    //   colspan: '1',
    //   rowspan: '3'
    // },
    // {
    //   name: '时间',
    //   style: {
    //     minWidth: '36px',
    //     maxWidth: '36px',
    //   },
    //   colspan: '1',
    //   rowspan: '3'
    // },
    {
      name: `
        体<br/>温<br/>(℃)
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
        心<br/>率<br/>(次/分)
        `,
      style: {},
      colspan: '1',
      rowspan: '3',
      style: {
        whiteSpace: 'nowrap',
        minWidth: '36px',
      }
    },
    {
      name: `
        呼<br/>吸<br/>(次/分)
        `,
      style: {},
      colspan: '1',
      rowspan: '3',
      style: {
        whiteSpace: 'nowrap',
        minWidth: '36px',
      }
    },
    {
      name: `
        血压<br/>(mmHg)
        `,
      style: {
        minWidth: '52px',
        maxWidth: '52px',
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        SpO₂<br/>(%)
        `,
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        神志
        `,
      style: {},
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        低流量<br/>吸氧
        `,
      style: {},
      colspan: '1',
      rowspan: '3'
    },
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
      colspan: '7',
      rowspan: '1',
      canSet: false,
    },
    {
      name: `
        伤<br/>口<br/>敷<br/>料
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
        护<br/>理<br/>指<br/>导
        `,
      style: {
        minWidth: '28px',
        maxWidth: '28px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
        健<br/>康<br/>教<br/>育
        `,
      style: {
        minWidth: '28px',
        maxWidth: '28px',
        whiteSpace: 'nowrap'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `标题1`,
      colspan: '1',
      rowspan: '3',
      canSet: true,
      key: 'fieldEleven',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
      }
    },
    {
      name: `标题2`,
      colspan: '1',
      rowspan: '3',
      canSet: true,
      key: 'fieldTwelve',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
      }
    },
    {
      name: `标题3`,
      colspan: '1',
      rowspan: '3',
      canSet: true,
      key: 'fieldThirteen',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
      }
    },
    {
      name: `标题4`,
      colspan: '1',
      rowspan: '3',
      canSet: true,
      key: 'fieldFifteen',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
      }
    },
    {
      name: `标题5`,
      colspan: '1',
      rowspan: '3',
      canSet: true,
      key: 'fieldSixteen',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
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
        签名
        `,
      style: {
        minWidth: '70px',
        maxWidth: '70px',
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: `
      上级护士签名
        `,
      style: {
        minWidth: '60px',
        maxWidth: '60px',
      },
      colspan: '1',
      rowspan: '3'
    }
    ],
    mid: [
        {
      name: '日期',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      },
      colspan: '1',
      rowspan: '2'
    },
    {
      name: '时间',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      },
      colspan: '1',
      rowspan: '2'
    },
      {
      name: `
        静脉<br>(ml)
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      }
    },
    {
      name: `
        进食<br>(ml)
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      }
    },
    {
      name: ``,
      colspan: '1',
      rowspan: '2',
      canSet: true,
      key: 'otherFood',
      style: {
        minWidth: '36px',
        maxWidth: '36px',
      }
    },
    {
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
    }, {
      name: `
        呕吐<br>ml
        `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
      }
    },
    {
      name: `
      其他
      `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
      }
    },
    {
      name: `
      性质
      `,
      colspan: '1',
      rowspan: '2',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
      }
    },
    ],
    bottom: [{
      name: `
      ml
      `,
      colspan: '1',
      rowspan: '1',
      style: {
        minWidth: '28px',
        maxWidth: '28px',
      }
    },
    {
      name: `
      颜色
      `,
      colspan: '1',
      rowspan: '1',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
      }
    },
    {
      name: `
      g/次
      `,
      colspan: '1',
      rowspan: '1',
      style: {
        minWidth: '32px',
        maxWidth: '32px',
      }
    }, {
      name: `
      性质
      `,
      colspan: '1',
      rowspan: '1',
      style: {
        minWidth: '38px',
        maxWidth: '38px',
      }
    },
    ]
  }
}
