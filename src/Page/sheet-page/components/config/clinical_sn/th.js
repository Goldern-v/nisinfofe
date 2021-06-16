export default {
  style: {
    width: '1300px'
  },
  // 科室的名称
  deptType: '',
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '4'
      },
      {
        name: '时间',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '4'
      },
      {
        name: `
        循环系统
        `,
        style: {},
        colspan: '6',
        rowspan: '1',
      },
      {
        name: `
        呼吸系统
        `,
        style: {
          minWidth: '200px'
        },
        colspan: '13',
        rowspan: '1',
      },
      {
        name: `
        基础护理
        `,
        style: {},
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `
        其他
        `,
        style: {},
        colspan: '10',
        rowspan: '1',
      },
      {
        name: `
        喂养方式
        `,
        style: {},
        colspan: '1',
        rowspan: '4',
      },
      {
        name: `
        入量
        `,
        style: {},
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        出量
        `,
        style: {},
        colspan: '2',
        rowspan: '1',
      },
      // {
      //   name: `
      //   病情观察及措施
      //   `,
      //   style: {
      //     minWidth: '153px',
      //     maxWidth: '153px',
      //   },
      //   colspan: '1',
      //   rowspan: '4'
      // },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '4'
      }
    ],
    mid: [{
        name: `
        体温/<br/>温箱<br/>(℃)
        `,
        colspan: '1',
        rowspan: '3',
        style: {}
      },
      {
        name: `
        心率<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '3',
        style: {}
      },
      {
        name: `
        血氧饱和度<br/>%
        `,
        colspan: '1',
        rowspan: '3',
        style: {}
      },
      {
        name: `
        面色
        `,
        colspan: '1',
        rowspan: '3',
        style: {}
      },
      {
        name: `
        肢端
        `,
        colspan: '1',
        rowspan: '3',
        style: {}
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
        呼吸频率<br/>(次/分)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        氧疗方式
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        style: {}
      },
      {
        name: `
        机械通气模式
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        插管深度<br/>cm
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        氧气量<br/>L/分
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        吸入氧浓度<br/>%
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        PIP<br/>PEEP
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        平均气道压
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        RR(机设)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        RR(自主)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        ΔP(高频通气)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        F(频次)
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        吸痰耐受
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        眼部护理
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        口腔护理
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        脐部护理
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        臀部护理
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        意识
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        前卤
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        瞳孔
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        肌张力
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        抽搐
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        腹胀
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        体位
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: '68px',
          maxWidth: '68px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        名称
        `,
        style: {
          minWidth: '68px',
          maxWidth: '68px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
    ],
    bottom: [{
        name: `
        大小<br/>(mm)
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        对光反射<br/>(mm)
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
    ],
    last: [{
        name: `
        左
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        右
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        左
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        右
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
    ]
  }
}
