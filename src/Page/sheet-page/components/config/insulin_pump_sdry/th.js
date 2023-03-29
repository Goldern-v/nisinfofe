export default {
  // 科室的名称
  deptType: '',
  style: {
    width: "740px"
  },
  th: {
    top: [
      {
        name: '日期',
        style: {
          minWidth: '15px',
          maxWidth: '15px',
          // display: 'none',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        style: {
          minWidth: '15px',
          maxWidth: '15px'
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `基础量(u/h) `,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `余量(u) `,
        style: {
          minWidth: '25px',
          maxWidth: '25px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `局部情况 `,
        style: {
          minWidth: '200px',
          maxWidth: '200px'
        },
        colspan: '1',
        rowspan: '3'
      },{
        name: `
        护士签名
        `,
        style: {
          minWidth: '100px',
          // maxWidth: '72px',
        },
        colspan: '1',
        rowspan: '3'
      },
      // {
      //   name: `
      //   审核签名
      //   `,
      //   style: {
      //     minWidth: '46px',
      //     // maxWidth: '72px',
      //   },
      //   colspan: '1',
      //   rowspan: '3'
      // }
    ],
    mid: [
    ],
    bottom: [
    ]
  }
}
