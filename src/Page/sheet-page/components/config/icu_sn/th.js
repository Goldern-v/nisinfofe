export default {
  style: {
    width: '1500px'
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
        生命体征
        `,
        style: {},
        colspan: '4',
        rowspan: '1',
      },
      {
        name: `
        CVP<br/>cmH2O
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        SPO2<br/>%
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3',
      },
      {
        name: `
        意识
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        瞳孔<br/>(mm)
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
        },
        colspan: '4',
        rowspan: '1'
      },
      {
        name: `
        机械通气
        `,
        style: {
          minWidth: '40px',
          maxWidth: '40px'
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
      },
      {
        name: `
        出量
        `,
        colspan: '3',
        rowspan: '1',
      },
      {
        name: `静脉<br/>置管`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `卧位`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `受压<br/>皮肤`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: ``,
        colspan: '1',
        rowspan: '3',
        canSet: true,
        key: 'fieldNine',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `护理措施`,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        }
      },
      {
        name: `
        其他
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
        T<br/>(℃)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '34px',
        }
      },
      {
        name: `
        HR<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        R<br/>(次/分)
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        Bp/ABp<br/>(mmHg)
        `,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
          whiteSpace: 'nowrap'
        },
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        左<br/>mm
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        右<br/>mm
        `,
        style: {},
        colspan: '1',
        rowspan: '2'
      },
      {
        name: `
        对光反射
        `,
        style: {},
        colspan: '2',
        rowspan: '1'
      },
      {
        name: `
        呼吸模式
        `,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
        },
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        FiO2<br/>%
        `,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
        },
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        f<br/>次/分
        `,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
        },
        colspan: '1',
        rowspan: '2',
      },
      {
        name: `
        插管深度<br/>cm
        `,
        style: {
          minWidth: '52px',
          maxWidth: '52px',
        },
        colspan: '1',
        rowspan: '2',
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
        name: `ml
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
        颜色<br/>性状
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
        style: {},
        colspan: '1',
        rowspan: '1'
      },
      {
        name: `
        右
        `,
        style: {},
        colspan: '1',
        rowspan: '1'
      },
    ]
  }
}
