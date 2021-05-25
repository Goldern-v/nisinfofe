export default {
  style: {
    width: "1200px"
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
        T<br/>(℃)
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
        P<br/>/HR
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
        R
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
        Bp<br/>(mmHg)
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
        SPO2<br>(%)
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
        意识
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
        瞳孔
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        入
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        出
        `,
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `翻身扣背`,
        style: {
          minWidth: '20px',
          maxWidth: '20px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `雾化吸入`,
        style: {
          minWidth: '20px',
          maxWidth: '20px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `吸痰`,
        style: {
          minWidth: '20px',
          maxWidth: '20px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `指尖血糖`,
        style: {
          minWidth: '20px',
          maxWidth: '20px',
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `吸氧`,
        style: {
          minWidth: '20px',
          maxWidth: '20px',
        },
        colspan: '2',
        rowspan: '1',
      },
      {
        name: ``,
        style: {},
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "fieldSeven"
      },
      {
        name: `
        病情观察及措施、<br>特殊情况记录
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
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [{
        name: `
        直径(mm)
        `,
        style: {
          whiteSpace: 'nowrap'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        反应
        `,
        style: {
          whiteSpace: 'nowrap'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '68px',
          maxWidth: '68px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
        },
      },
      {
        name: `
        内容
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        量<br/>(ml)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        方式
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        流量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '28px',
          maxWidth: '28px',
          whiteSpace: 'nowrap'
        },
      },
    ],
    bottom: [{
        name: `
        左
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        右
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        左
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
      {
        name: `
        右
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '25px',
          whiteSpace: 'nowrap'
        },
      },
    ]
  }
}
