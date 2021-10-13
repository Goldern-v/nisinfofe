export default {
  style: {
    width: '900px'
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
        name: '体温',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '脉搏',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '呼吸',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '血压',
        style: {
          minWidth: '50px',
          maxWidth: '50px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '血<br/>氧<br/>饱<br/>和<br/>度',
        style: {
          minWidth: '36px',
          maxWidth: '36px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        入量（毫升）
        `,
        style: {},
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        出量（毫升）
        `,
        style: {},
        colspan: '2',
        rowspan: '1',
      },
      {
        name: `
        其他
        `,
        style: {
          minWidth: "350px",
          maxWidth: "350px"
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '50px'
        },
        colspan: '1',
        rowspan: '3'
      }
    ],
    mid: [{
        name: `
        液量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '34px',
        }
      },
      {
        name: `
        其他
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '38px',
        }
      },
      {
        name: `
        尿量
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '34px',
        }
      },
      {
        name: `
        其他
        `,
        colspan: '1',
        rowspan: '2',
        style: {
          minWidth: '38px',
        }
      },
    ],
    bottom: []
  }
}
