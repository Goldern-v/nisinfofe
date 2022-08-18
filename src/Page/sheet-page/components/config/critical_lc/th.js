export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "1400px"
  },
  th: {
    top: [{
        name: '日期',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '意识',
        style: {
          minWidth: '60px',
          maxWidth: '60px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: '瞳孔',
      //   style: {
      //     minWidth: '40px',
      //     maxWidth: '40px',
      //   },
      //   colspan: '4',
      //   rowspan: '1'
      // },
      {
        name: '体温',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '心率/<br/>脉搏',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '呼<br/>吸',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '血<br/>压',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '血氧<br/>饱和度',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '1',
        rowspan: '2'
      },
      {
        name: '氧疗<br>（L/min)',
        style: {
          minWidth: '40px',
          maxWidth: '40px',
        },
        colspan: '3',
        rowspan: '2'
      },
      {
        name: `
        入量
        `,
        colspan: '2',
        rowspan: '2',
        style: {
          minWidth: '80px',
        },
      },
      {
        name: `
        出量
        `,
        colspan: '3',
        rowspan: '2',
        style: {
          minWidth: '120px',
        },
      },
      {
        // name: `RASS<br />评分`,
        name: ``,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '53px',
        },
        canSet: true,
        key: 'custom1'
      },
      {
        // name: `标题1`,
        name: ``,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "3",
        canSet: true,
        key: "custom2",
      },
      {
        name: `
        病情观察及护理措施
        `,
        colspan: '1',
        rowspan: '3',
        style: {
          minWidth: '306px',
          maxWidth: '306px',
        }
      },
      {
        name: `
        护士签名
        `,
        // style: {
        //   width: '50px'
        // },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [
    //   {
    //   name: `
    //   左
    //   `,
    //   colspan: '2',
    //   rowspan: '1',
    //   style: {
    //     minWidth: '32px',
    //   },
    // },
    // {
    //   name: `
    //   右
    //   `,
    //   colspan: '2',
    //   rowspan: '1',
    //   style: {
    //     minWidth: '32px',
    //   },
    // },
    ],
    bottom: [
      // {
      //   name: `
      //   直径<br/>(mm）
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px',
      //   },
      // },
      // {
      //   name: `
      //   对光<br/>反应
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px',
      //   },
      // },
      // {
      //   name: `
      //   直径<br/>(mm）
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px',
      //   },
      // },
      // {
      //   name: `
      //   对光<br/>反应
      //   `,
      //   colspan: '1',
      //   rowspan: '1',
      //   style: {
      //     minWidth: '32px',
      //   },
      // },
      {
        name: `
        ℃
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        次/<br/>分
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        次/<br/>分
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        mmHg
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        %
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        鼻<br/>导<br/>管
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        面<br/>罩
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: ``,
        style: {
          minWidth: '53px',
        },
        colspan: "1",
        rowspan: "1",
        canSet: true,
        key: "fieldThree",
      },
      {
        name: `
        名<br/>称
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '60px',
        },
      },
      {
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        名<br/>称
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '60px',
        },
      },
      {
        name: `
        ml
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        },
      },
      {
        name: `
        颜色<br/>性状
        `,
        colspan: '1',
        rowspan: '1',
        style: {
          minWidth: '32px',
        }
      }
    ]
  }
}
