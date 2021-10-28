/*
江门妇幼-深静脉导管置入术后维护单
 */
export default {
  // 科室的名称
  style: {
    width: '1250px'
  },
  deptType: '',
  th: {
    top: [
      {
        name: '日期',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: '时间',
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        外露
        `,
        style: {
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        臂围
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        穿刺点
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        敷料
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        冲管/封管
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        更换敷料
        `,
        style: {},
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        更换接头
        `,
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        特殊情况记录
        `,
        colspan: "1",
        rowspan: "3",
        style: {
          minWidth: '150px',
          maxWidth: '150px',
        },
      },
      {
        name: `
        签名
        `,
        style: {
          minWidth: '100px',
          maxWidth: '100px',
        },
        colspan: '1',
        rowspan: '3'
      },
      {
        name: `
        上级护士签名
        `,
        style: {
          minWidth: '100px',
          maxWidth: '100px',
        },
        colspan: '1',
        rowspan: '3'
      },
    ],
    mid: [],
    bottom: [],
  }
}
