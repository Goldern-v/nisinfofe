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
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '30px',
          maxWidth: '30px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
       意识
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: "52px",
          maxWidth: "52px"
        },
      },
      {
        name: `
        T
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
        PR/HR
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
        R
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
        BP
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
        SPO2
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
        氧疗
        `,
        colspan: '2',
        rowspan: '1',
        style: {
          minWidth: "120px",
          maxWidth: "120px"
        },
      },
      {
        name: `
        出入量
        `,
        colspan: '4',
        rowspan: '1',
        style: {
          minWidth: "240px",
          maxWidth: "240px"
        },
      },
      {
        name: `自定义1`,
        canSet:true,
        key:"customTitle",
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: "60px",
          maxWidth: "60px"
        },
      },
      {
        name: `
        特殊处理及病情观察
        `,
        colspan: '1',
        rowspan: '3',
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
        rowspan: '3'
      },
      {
        name: `
        护士签名
        `,
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
        name: `
        ℃
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        次/分
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        次/分
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        mmHg
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        %
        `,
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        方式
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: "80px",
          maxWidth: "80px"
        },
      },
      {
        name: `
        L/min
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: "40px",
          maxWidth: "40px"
        },
      },
      {
        name: `
        入量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: "88px",
          maxWidth: "88px"
        },
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      },
      {
        name: `
        出量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: "88px",
          maxWidth: "88px"
        },
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: "32px",
          maxWidth: "32px"
        },
      }
    ],
    bottom: []
  }
}
