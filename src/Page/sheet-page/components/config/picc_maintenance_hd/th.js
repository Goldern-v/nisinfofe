export default {
  // 科室的名称
  deptType: '',
  th: {
    top: [{
      name: '日期',
      style: {
        minWidth: '36px',
        maxWidth: '36px'
      },
      colspan: '1',
      rowspan: '3'
    },
    {
      name: '外露/置管长度cm',
      style: {
        minWidth: '36px',
        maxWidth: '36px'
      },
      colspan: '1',
      rowspan: '3'
    }, {
      name: `手臂周长cm`,
      style: {
        minWidth: '50px',
        maxWidth: '50px'
      },
      colspan: '1',
      rowspan: '3'
    }, {
      name: `维护状态`,
      style: {
        minWidth: '50px',
        maxWidth: '50px'
      },
      colspan: '3',
      rowspan: '1'
    }, {
      name: `置管局部情况`,
      style: {
        minWidth: '50px',
        maxWidth: '50px'
      },
      colspan: '1',
      rowspan: '3'
    }, {
      name: `
        护士签名
        `,
      style: {
        minWidth: '46px',
        maxWidth: '72px',
      },
      colspan: '1',
      rowspan: '3'
    }
    ],
    mid: [
      {
        name: `换敷贴`,
        colspan: '1',
        rowspan: '2'
      }, {
        name: `冲管`,
        colspan: '1',
        rowspan: '2'
      }, {
        name: `换肝素冒`,
        colspan: '1',
        rowspan: '2'
      },
    ],
    bottom: []
  }
}
