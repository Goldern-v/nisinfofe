import moment from "moment";

function currYear() {
  return moment().format('YYYY')
}
export default {
  // 科室的名称
  deptType: '',
  // style: {
  //   width: "1340px"
  // },
  th: {
    top: [{
        name: currYear(),
        colspan: "2",
        rowspan: "1",
        style: {
          width: "40px"
        },
        canSet: true,
        key: "recordYear",
      },
      {
        name: `
        生命体征
        `,
        colspan: '6',
        rowspan: '1',
        style: {
          minWidth: '242px'
        }
      },
      // {
      //   name: `
      //   睡眠
      //   `,
      //   colspan: '2',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '60px'
      //   }
      // },
      // {
      //   name: `
      //   饮食
      //   `,
      //   colspan: '1',
      //   rowspan: '3',
      //   style: {
      //     minWidth: '30px'
      //   }
      // },
      // {
      //   name: `
      //   食欲
      //   `,
      //   colspan: '1',
      //   rowspan: '3',
      //   style: {
      //     minWidth: '30px'
      //   }
      // },
      {
        name: `
        临床表现（再评估）
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '120px'
        }
      },
      {
        name: `
        化验
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '87px'
        }
      },
      // {
      //   name: `
      //   检查/治疗
      //   `,
      //   colspan: '3',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '84px'
      //   }
      // },
      // {
      //   name: `
      //   出院/转科指导
      //   `,
      //   colspan: '1',
      //   rowspan: '3',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      {
        name: `
        标题1
        `,
        key: "fieldSeventeen", //标题1
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldEighteen", //标题2
        name: `
        标题2
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldNineteen", //标题3
        name: `
        标题3
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        name: `
        护理记录
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '150px'
        },
      },
      {
        name: `
        签名
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        // style: {
        //   minWidth: '52px'
        // }
      }
    ],
    mid: [{
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
        体温
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: '32px'
        }
      },
      {
        name: `
        脉搏<br/>次/<br>分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px'
        }
      },
      {
        name: `
        呼吸<br/>次/<br>分
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '40px'
        }
      },
      {
        name: `
        血压(mmHg)
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        疼痛
        `,
        colspan: '2',
        rowspan: '1'
      },
      // {
      //   name: `
      //   其他症状
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   措施
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   效果
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   VTE
      //   `,
      //   colspan: '3',
      //   rowspan: '1',
      // },
      // {
      //   name: `
      //   压疮评分
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   心理状态
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   营养状况
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   依从性
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   教育需求
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      {
        name: `
        主要阳性项目
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px'
        }
      },
      {
        name: `
        结果
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '32px'
        }
      },
      // {
      //   name: `
      //   措施
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   项目
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   措施
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   效果
      //   `,
      //   colspan: '1',
      //   rowspan: '2',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
    ],
    bottom: [{
        name: `
        数值
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          width: '32px'
        },
      },
      {
        name: `
        措施
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px'
        }
      },
      {
        name: `
        数值
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          width: '50px',
        },
      },
      {
        name: `
        异常处理
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px'
        }
      },
      // {
      //   name: `
      //   状态
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   措施
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      {
        name: `
        部位
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px'
        }
      },
      {
        name: `
        评分
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px'
        }
      },
      // {
      //   name: `
      //   措施
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   选项
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   评分
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
      // {
      //   name: `
      //   措施
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px'
      //   }
      // },
    ]
  }
}
