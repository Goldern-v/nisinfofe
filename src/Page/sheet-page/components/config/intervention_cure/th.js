export default {
  style: {
    width: "1100px"
  },
  // 科室的名称
  deptType: '',
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '4'
      },
      {
        name: '时间',
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '4'
      },
      {
        name: `生命体征项目`,
        style: {},
        colspan: '10',
        rowspan: '1',
        style: {}
      },
      {
        name: ``,
        style: {},
        colspan: '10',
        rowspan: '1',
        style: {}
      },
      {
        name: `
        特殊情况记录
        `,
        style: {
          minWidth: '100px',
          maxWidth: '100px',
        },
        colspan: '1',
        rowspan: '4'
      },
      {
        name: `
        护士签名
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '4'
      },
    ],
    mid: [{
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
        P/HR<br/>(次/min)
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
        R<br/>(次/min)
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
        SPO<br/>（%）
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
        瞳孔
        `,
        style: {},
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        敷料描述
        `,
        style: {
          minWidth: '60px',
          maxWidth: '60px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `砂袋 压迫`,
        name2: `观察 描述`,
        style: {
          minWidth: '80px',
          maxWidth: '80px'
        },
        colspan: '1',
        rowspan: '3',
        key: "observeDesc", //沙袋压迫观察描述
      },
      {
        name: `
        标题1
        `,
        key: "fieldOne", //标题1
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldTwo", //标题2
        name: `
        标题2
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldThree", //标题3
        name: `
        标题3
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldFour", //标题4
        name: `
        标题4
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldFive", //标题5
        name: `
        标题5
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldSix", //标题6
        name: `
        标题6
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldSeven", //标题7
        name: `
        标题7
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      },
      {
        key: "fieldEight", //标题8
        name: `
        标题8
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true
      }
    ],
    bottom: [{
        name: `
      大小(mm)
      `,
        style: {
          whiteSpace: 'nowrap'
        },
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
      反射
      `,
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
      }
    ]
  }
}
