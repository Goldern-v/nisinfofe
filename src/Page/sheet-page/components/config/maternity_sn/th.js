export default {
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
        脉搏<br/>(次/分)
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
        血氧饱和度<br/>%
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
        瞳孔<br/>(mm)
        `,
        style: {
          minWidth: '50px',
          maxWidth: '50px'
        },
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        入量
        `,
        colspan: '2',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        出量
        `,
        colspan: '3',
        rowspan: '1',
        canSet: false,
      },
      {
        name: `
        皮肤<br/>情况
        `,
        colspan: '1',
        rowspan: '3',
        canSet: false,
      },
      {
        name: `
        管路<br/>护理
        `,
        colspan: '1',
        rowspan: '3',
        canSet: false,
      },
      {
        name: `
        病情观察及措施
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
        rowspan: '3'
      }
    ],
    mid: [{
        name: `
        大小<br/>(mm)
        `,
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        对光反射
        `,
        colspan: '2',
        rowspan: '1',
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
        rowspan: '2'
      },
      {
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '2',
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
        rowspan: '2'
      },
      {
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      },
      {
        name: `
        颜色性状
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
      }
    ],
    bottom: [{
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
