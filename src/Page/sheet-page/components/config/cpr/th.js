export default {
  // 科室的名称
  deptType: '',
  th: {
    top0: [
      {
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
        生命体征项目
        `,
        style: {},
        colspan: '10',
        rowspan: '1',
      },
      {
        name: `
        抢救措施
        `,
        style: {},
        colspan: '7',
        rowspan: '1',
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
        rowspan: '4'
      },
      {
        name: `
        护士签名
        `,
        style: {},
        colspan: '1',
        rowspan: '4'
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {},
      //   colspan: '1',
      //   rowspan: '3'
      // },
    ],
    top: [
      {
        name: `
        T<br/>(℃)
        `,
        style: {},
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        P/HR<br/>(次/分)
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
        R<br/>(次/分)
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
        SPO<sub>2</sub><br>(%)
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
        name: `CPR`,
        style: {},
        colspan: '1',
        rowspan: '3',
        key: 'fieldOne',
      },
      {
        name: `肾上腺素/iv(mg)`,
        style: {},
        colspan: '1',
        rowspan: '3',
        key: 'fieldOne',
      },
      {
        name: `阿托品/iv(mg)`,
        style: {},
        colspan: '1',
        rowspan: '3',
        key: 'fieldOne',
      },

      {
        name: `标题1`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'field4',

        titleList: ['心律', '胸闷/心悸', '头晕', '气喘']
      },
      {
        name: `标题2`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'field5',

        titleList: ['心律', '胸闷/心悸', '头晕', '气喘']
      },
      {
        name: `标题3`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'field6',

        titleList: ['心律', '胸闷/心悸', '头晕', '气喘']
      },
      {
        name: `标题4`,
        style: {},
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'field7',

        titleList: ['心律', '胸闷/心悸', '头晕', '气喘']
      },

    ],
    mid: [
      {
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
    bottom: [
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
